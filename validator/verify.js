#!/usr/bin/env node
/**
 * verify.js — Standalone Batch Validator (Zero-Dependency)
 *
 * কোনো ডাটাবেজ (SQLite) বা বহিরাগত লাইব্রেরি ছাড়াই চলে।
 * ব্যবহার:
 *   node validator/verify.js <path-to-batch-folder>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HIERARCHY_DIR = path.resolve(__dirname, '..', 'hierarchy');
let subjects = [];
let topics = [];

try {
  subjects = JSON.parse(fs.readFileSync(path.join(HIERARCHY_DIR, 'subjects.json'), 'utf8'));
  topics = JSON.parse(fs.readFileSync(path.join(HIERARCHY_DIR, 'topics.json'), 'utf8'));
} catch (err) {
  console.warn('⚠️ Warning: hierarchy files could not be loaded from:', HIERARCHY_DIR);
}

const subjectIdSet = new Set(subjects.map(s => Number(s.id)));
const topicIdSet = new Set(topics.map(t => Number(t.id)));
const autocreateSubjectIds = new Set([6, 7, 8]); // ENG, BAN, GK

const FORBIDDEN_KEYS = ['fingerprint', 'uid', 'batch_id', 'subtopic_id'];
const FIGURE_SVG_MAX = 20000;
const SVG_OPEN = /<svg[\s>]/i;
const SVG_CLOSE = /<\/svg\s*>/i;
const FORBIDDEN_SVG_TAGS = /<\s*(script|foreignObject)[\s>/]/i;

function inspectSvg(raw) {
  if (raw == null || raw === '') return { ok: true, svg: null, reason: null };
  if (typeof raw !== 'string') return { ok: false, svg: null, reason: 'figure_svg must be a string.' };
  const s = raw.trim();
  if (s === '') return { ok: true, svg: null, reason: null };
  if (!SVG_OPEN.test(s) || !SVG_CLOSE.test(s)) {
    return { ok: false, svg: null, reason: 'figure_svg does not contain valid <svg>...</svg> elements.' };
  }
  if (FORBIDDEN_SVG_TAGS.test(s)) {
    return { ok: false, svg: null, reason: 'figure_svg contains forbidden <script> or <foreignObject>.' };
  }
  if (s.length > FIGURE_SVG_MAX) {
    return { ok: false, svg: null, reason: `figure_svg is too large (${s.length} > ${FIGURE_SVG_MAX} chars).` };
  }
  return { ok: true, svg: s, reason: null };
}

function nonEmpty(v) {
  return typeof v === 'string' ? v.trim().length > 0 : v != null && String(v).trim().length > 0;
}
function validateBatch(batchDir) {
  const errors = [];
  const warnings = [];
  const counts = { total: 0, mcq: 0, cq: 0, note: 0 };
  const subjectCounts = {};

  if (!fs.existsSync(batchDir) || !fs.statSync(batchDir).isDirectory()) {
    return { ok: false, errors: [{ scope: 'Directory', reason: `Directory not found: ${batchDir}` }], warnings, counts };
  }

  // 1. batch.json
  const batchFile = path.join(batchDir, 'batch.json');
  let batchCfg = {};
  if (!fs.existsSync(batchFile)) {
    errors.push({ scope: 'batch.json', reason: 'batch.json is missing.' });
  } else {
    try {
      batchCfg = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
      if (!nonEmpty(batchCfg.title)) {
        errors.push({ scope: 'batch.json', reason: '"title" field is required.' });
      }
      if (batchCfg.pin_topic_id != null) {
        const pin = Number(batchCfg.pin_topic_id);
        if (!topicIdSet.has(pin)) {
          errors.push({ scope: 'batch.json', reason: `pin_topic_id ${pin} does not exist in seed topics.` });
        }
      }
    } catch (err) {
      errors.push({ scope: 'batch.json', reason: `Invalid JSON in batch.json: ${err.message}` });
    }
  }

  // 2. Scan content files
  const files = fs.readdirSync(batchDir)
    .filter(n => n.endsWith('.json') && n.toLowerCase() !== 'batch.json' && !n.startsWith('.') && !n.startsWith('_'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    warnings.push({ scope: 'Files', reason: 'No subject content JSON files found in batch directory.' });
  }

  const seenQuestionNumbers = new Map();

  for (const file of files) {
    const filePath = path.join(batchDir, file);
    let content;
    try {
      content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      errors.push({ scope: file, reason: `Invalid JSON: ${err.message}` });
      continue;
    }

    if (!content || !Array.isArray(content.items)) {
      errors.push({ scope: file, reason: 'Root object must have an "items" array.' });
      continue;
    }

    let itemIdx = 0;
    for (const it of content.items) {
      itemIdx++;
      const where = `${file} [item ${itemIdx}, q_num: ${it && it.question_number != null ? it.question_number : '?'}]`;

      if (!it || typeof it !== 'object' || Array.isArray(it)) {
        errors.push({ scope: where, reason: 'Item must be a non-null object.' });
        continue;
      }

      for (const fk of FORBIDDEN_KEYS) {
        if (it[fk] !== undefined) {
          errors.push({ scope: where, reason: `Forbidden key "${fk}" must not be hand-crafted.` });
        }
      }

      const kind = it.kind || 'mcq';
      counts.total++;
      if (kind === 'cq') counts.cq++;
      else if (kind === 'note') counts.note++;
      else counts.mcq++;

      const sid = it.subject_id != null ? Number(it.subject_id) : null;
      if (sid) {
        subjectCounts[sid] = (subjectCounts[sid] || 0) + 1;
        if (!subjectIdSet.has(sid)) {
          warnings.push({ scope: where, reason: `subject_id ${sid} is not recognized in seed subjects.` });
        }
      }

      if (it.question_number != null && sid) {
        const qNumStr = String(it.question_number).trim();
        if (!seenQuestionNumbers.has(sid)) seenQuestionNumbers.set(sid, new Set());
        const sSet = seenQuestionNumbers.get(sid);
        if (sSet.has(qNumStr)) {
          warnings.push({ scope: where, reason: `Duplicate question_number "${qNumStr}" found in subject ${sid}.` });
        } else {
          sSet.add(qNumStr);
        }
      }

      if (kind === 'note') {
        if (!nonEmpty(it.content)) errors.push({ scope: where, reason: 'Note content is empty.' });
      } else if (kind === 'cq') {
        if (!nonEmpty(it.stimulus)) errors.push({ scope: where, reason: 'CQ stimulus/question is empty.' });
        if (it.cq_type === 'creative' && (!Array.isArray(it.sub_questions) || it.sub_questions.length === 0)) {
          warnings.push({ scope: where, reason: 'Creative CQ specified without sub_questions array.' });
        }
      } else {
        if (!nonEmpty(it.question)) errors.push({ scope: where, reason: 'MCQ question is empty.' });
        const opts = [it.option_a, it.option_b, it.option_c, it.option_d, it.option_e].filter(nonEmpty);
        if (opts.length < 2) {
          errors.push({ scope: where, reason: `MCQ requires at least 2 options (found ${opts.length}).` });
        }
        if (!nonEmpty(it.correct_answer)) {
          warnings.push({ scope: where, reason: 'Missing correct_answer (will require review flag).' });
        } else {
          const ans = String(it.correct_answer).trim().toUpperCase();
          if (!['A', 'B', 'C', 'D', 'E'].includes(ans)) {
            warnings.push({ scope: where, reason: `Unusual correct_answer "${ans}". Expected A/B/C/D/E.` });
          }
        }
        if (!nonEmpty(it.explanation)) {
          warnings.push({ scope: where, reason: 'Missing explanation in MCQ.' });
        }
      }

      const fig = inspectSvg(it.figure_svg);
      if (!fig.ok) {
        errors.push({ scope: where, reason: fig.reason });
      } else if (fig.svg && !nonEmpty(it.figure_alt)) {
        warnings.push({ scope: where, reason: 'figure_svg is provided without figure_alt description.' });
      }

      const effectiveTopic = (batchCfg && batchCfg.pin_topic_id) || it.topic_id;
      if (effectiveTopic != null) {
        const tid = Number(effectiveTopic);
        if (!topicIdSet.has(tid)) {
          errors.push({ scope: where, reason: `topic_id ${tid} does not exist in seed topics.` });
        }
      } else if (it.topic_is_new === true) {
        const isAutocreate = sid && autocreateSubjectIds.has(sid);
        if (!isAutocreate) {
          warnings.push({ scope: where, reason: 'topic_is_new is only supported for ENG (6), BAN (7), GK (8).' });
        }
        if (!nonEmpty(it.topic_name)) {
          warnings.push({ scope: where, reason: 'topic_is_new requested but topic_name is empty.' });
        }
      } else if (!nonEmpty(it.topic_name) && !sid) {
        warnings.push({ scope: where, reason: 'No topic or subject specified.' });
      }
    }
  }

  return { ok: errors.length === 0, errors, warnings, counts, subjectCounts };
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isDirectRun) {
  const targetDir = process.argv[2] || path.join(__dirname, '..', 'sample_output', 'sample-phy-buet-2023');
  console.log('🔍 Checking batch:', path.resolve(targetDir));

  const result = validateBatch(targetDir);

  console.log('\n📊 সারসংক্ষেপ (Summary):');
  console.log(`   মোট প্রশ্ন: ${result.counts.total} (MCQ: ${result.counts.mcq} · CQ: ${result.counts.cq} · নোট: ${result.counts.note})`);
  console.log('   বিষয়ভিত্তিক প্রশ্ন সংখ্যা:', JSON.stringify(result.subjectCounts));

  if (result.errors.length > 0) {
    console.log(`\n❌ ${result.errors.length}টি ত্রুটি পাওয়া গেছে (Errors):`);
    for (const e of result.errors) console.log(`   • ${e.scope}: ${e.reason}`);
  }

  if (result.warnings.length > 0) {
    console.log(`\n⚠️  ${result.warnings.length}টি সতর্কতা (Warnings):`);
    for (const w of result.warnings) console.log(`   • ${w.scope}: ${w.reason}`);
  }

  if (result.ok) {
    console.log('\n✅ পরিষ্কার — কোনো ব্লকিং ত্রুটি নেই। ব্যাচটি স্টেজিংয়ের জন্য প্রস্তুত!');
    process.exit(0);
  } else {
    console.log('\n❌ কিছু ত্রুটি রয়েছে। দয়া করে সংশোধন করে পুনরায় যাচাই করুন।');
    process.exit(1);
  }
}

export { validateBatch };


