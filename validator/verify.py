#!/usr/bin/env python3
"""
verify.py — Standalone Batch Validator in Python (Zero-Dependency)

ব্যবহার:
    python validator/verify.py <path-to-batch-folder>
"""

import sys
import os
import json
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HIERARCHY_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, '..', 'hierarchy'))

subjects = []
topics = []

try:
    with open(os.path.join(HIERARCHY_DIR, 'subjects.json'), 'r', encoding='utf-8') as f:
        subjects = json.load(f)
    with open(os.path.join(HIERARCHY_DIR, 'topics.json'), 'r', encoding='utf-8') as f:
        topics = json.load(f)
except Exception as e:
    print(f"⚠️ Warning: Could not load hierarchy files from {HIERARCHY_DIR}: {e}")

subject_id_set = {int(s['id']) for s in subjects if 'id' in s}
topic_id_set = {int(t['id']) for t in topics if 'id' in t}
autocreate_subject_ids = {6, 7, 8}

FORBIDDEN_KEYS = ['fingerprint', 'uid', 'batch_id', 'subtopic_id']
FIGURE_SVG_MAX = 20000
SVG_OPEN = re.compile(r'<svg[\s>]', re.IGNORECASE)
SVG_CLOSE = re.compile(r'</svg\s*>', re.IGNORECASE)
FORBIDDEN_SVG_TAGS = re.compile(r'<\s*(script|foreignObject)[\s>/]', re.IGNORECASE)

def inspect_svg(raw):
    if raw is None or raw == '':
        return True, None, None
    if not isinstance(raw, str):
        return False, None, 'figure_svg must be a string.'
    s = raw.strip()
    if not s:
        return True, None, None
    if not SVG_OPEN.search(s) or not SVG_CLOSE.search(s):
        return False, None, 'figure_svg does not contain valid <svg>...</svg> elements.'
    if FORBIDDEN_SVG_TAGS.search(s):
        return False, None, 'figure_svg contains forbidden <script> or <foreignObject>.'
    if len(s) > FIGURE_SVG_MAX:
        return False, None, f'figure_svg is too large ({len(s)} > {FIGURE_SVG_MAX} chars).'
    return True, s, None

def non_empty(v):
    if v is None:
        return False
    if isinstance(v, str):
        return len(v.strip()) > 0
    return len(str(v).strip()) > 0
def validate_batch(batch_dir):
    errors = []
    warnings = []
    counts = {'total': 0, 'mcq': 0, 'cq': 0, 'note': 0}
    subject_counts = {}

    if not os.path.exists(batch_dir) or not os.path.isdir(batch_dir):
        return {
            'ok': False,
            'errors': [{'scope': 'Directory', 'reason': f'Directory not found: {batch_dir}'}],
            'warnings': warnings,
            'counts': counts,
            'subject_counts': subject_counts
        }

    # 1. batch.json
    batch_file = os.path.join(batch_dir, 'batch.json')
    batch_cfg = {}
    if not os.path.exists(batch_file):
        errors.append({'scope': 'batch.json', 'reason': 'batch.json is missing.'})
    else:
        try:
            with open(batch_file, 'r', encoding='utf-8') as f:
                batch_cfg = json.load(f)
            if not non_empty(batch_cfg.get('title')):
                errors.append({'scope': 'batch.json', 'reason': '"title" field is required.'})
            if batch_cfg.get('pin_topic_id') is not None:
                pin = int(batch_cfg['pin_topic_id'])
                if pin not in topic_id_set:
                    errors.append({'scope': 'batch.json', 'reason': f'pin_topic_id {pin} does not exist in seed topics.'})
        except Exception as e:
            errors.append({'scope': 'batch.json', 'reason': f'Invalid JSON in batch.json: {e}'})

    # 2. Content files
    files = sorted([
        f for f in os.listdir(batch_dir)
        if f.endswith('.json') and f.lower() != 'batch.json' and not f.startswith('.') and not f.startswith('_')
    ])

    if not files:
        warnings.append({'scope': 'Files', 'reason': 'No subject content JSON files found in batch directory.'})

    seen_q_nums = {}

    for file_name in files:
        file_path = os.path.join(batch_dir, file_name)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = json.load(f)
        except Exception as e:
            errors.append({'scope': file_name, 'reason': f'Invalid JSON: {e}'})
            continue

        if not isinstance(content, dict) or not isinstance(content.get('items'), list):
            errors.append({'scope': file_name, 'reason': 'Root object must have an "items" array.'})
            continue

        for idx, it in enumerate(content['items'], start=1):
            q_num_display = it.get('question_number') if isinstance(it, dict) else '?'
            where = f"{file_name} [item {idx}, q_num: {q_num_display}]"

            if not isinstance(it, dict):
                errors.append({'scope': where, 'reason': 'Item must be a dictionary/object.'})
                continue

            for fk in FORBIDDEN_KEYS:
                if fk in it:
                    errors.append({'scope': where, 'reason': f'Forbidden key "{fk}" must not be hand-crafted.'})

            kind = it.get('kind', 'mcq')
            counts['total'] += 1
            if kind == 'cq':
                counts['cq'] += 1
            elif kind == 'note':
                counts['note'] += 1
            else:
                counts['mcq'] += 1

            sid = None
            if it.get('subject_id') is not None:
                try:
                    sid = int(it['subject_id'])
                    subject_counts[sid] = subject_counts.get(sid, 0) + 1
                    if sid not in subject_id_set:
                        warnings.append({'scope': where, 'reason': f'subject_id {sid} is not recognized in seed subjects.'})
                except (ValueError, TypeError):
                    errors.append({'scope': where, 'reason': f'Invalid subject_id: {it.get("subject_id")}'})

            if it.get('question_number') is not None and sid:
                q_num_str = str(it['question_number']).strip()
                if sid not in seen_q_nums:
                    seen_q_nums[sid] = set()
                if q_num_str in seen_q_nums[sid]:
                    warnings.append({'scope': where, 'reason': f'Duplicate question_number "{q_num_str}" found in subject {sid}.'})
                else:
                    seen_q_nums[sid].add(q_num_str)

            if kind == 'note':
                if not non_empty(it.get('content')):
                    errors.append({'scope': where, 'reason': 'Note content is empty.'})
            elif kind == 'cq':
                if not non_empty(it.get('stimulus')):
                    errors.append({'scope': where, 'reason': 'CQ stimulus/question is empty.'})
                if it.get('cq_type') == 'creative' and (not isinstance(it.get('sub_questions'), list) or len(it['sub_questions']) == 0):
                    warnings.append({'scope': where, 'reason': 'Creative CQ specified without sub_questions array.'})
            else:
                if not non_empty(it.get('question')):
                    errors.append({'scope': where, 'reason': 'MCQ question is empty.'})
                opts = [it.get(k) for k in ['option_a', 'option_b', 'option_c', 'option_d', 'option_e'] if non_empty(it.get(k))]
                if len(opts) < 2:
                    errors.append({'scope': where, 'reason': f'MCQ requires at least 2 options (found {len(opts)}).'})
                if not non_empty(it.get('correct_answer')):
                    warnings.append({'scope': where, 'reason': 'Missing correct_answer (will require review flag).'})
                else:
                    ans = str(it['correct_answer']).strip().upper()
                    if ans not in ['A', 'B', 'C', 'D', 'E']:
                        warnings.append({'scope': where, 'reason': f'Unusual correct_answer "{ans}". Expected A/B/C/D/E.'})
                if not non_empty(it.get('explanation')):
                    warnings.append({'scope': where, 'reason': 'Missing explanation in MCQ.'})

            svg_ok, _, svg_reason = inspect_svg(it.get('figure_svg'))
            if not svg_ok:
                errors.append({'scope': where, 'reason': svg_reason})
            elif it.get('figure_svg') and not non_empty(it.get('figure_alt')):
                warnings.append({'scope': where, 'reason': 'figure_svg is provided without figure_alt description.'})

            effective_topic = batch_cfg.get('pin_topic_id') or it.get('topic_id')
            if effective_topic is not None:
                try:
                    tid = int(effective_topic)
                    if tid not in topic_id_set:
                        errors.append({'scope': where, 'reason': f'topic_id {tid} does not exist in seed topics.'})
                except (ValueError, TypeError):
                    errors.append({'scope': where, 'reason': f'Invalid topic_id: {effective_topic}'})
            elif it.get('topic_is_new') is True:
                if sid and sid not in autocreate_subject_ids:
                    warnings.append({'scope': where, 'reason': 'topic_is_new is only supported for ENG (6), BAN (7), GK (8).'})
                if not non_empty(it.get('topic_name')):
                    warnings.append({'scope': where, 'reason': 'topic_is_new requested but topic_name is empty.'})
            elif not non_empty(it.get('topic_name')) and not sid:
                warnings.append({'scope': where, 'reason': 'No topic or subject specified.'})


    return {
        'ok': len(errors) == 0,
        'errors': errors,
        'warnings': warnings,
        'counts': counts,
        'subject_counts': subject_counts
    }

if __name__ == '__main__':
    target_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(SCRIPT_DIR, '..', 'sample_output', 'sample-phy-buet-2023')
    target_dir = os.path.abspath(target_dir)
    print(f"🔍 Checking batch: {target_dir}")

    result = validate_batch(target_dir)

    print("\n📊 সারসংক্ষেপ (Summary):")
    print(f"   মোট প্রশ্ন: {result['counts']['total']} (MCQ: {result['counts']['mcq']} · CQ: {result['counts']['cq']} · নোট: {result['counts']['note']})")
    print(f"   বিষয়ভিত্তিক প্রশ্ন সংখ্যা: {json.dumps(result['subject_counts'])}")

    if result['errors']:
        print(f"\n❌ {len(result['errors'])}টি ত্রুটি পাওয়া গেছে (Errors):")
        for e in result['errors']:
            print(f"   • {e['scope']}: {e['reason']}")

    if result['warnings']:
        print(f"\n⚠️  {len(result['warnings'])}টি সতর্কতা (Warnings):")
        for w in result['warnings']:
            print(f"   • {w['scope']}: {w['reason']}")

    if result['ok']:
        print("\n✅ পরিষ্কার — কোনো ব্লকিং ত্রুটি নেই। ব্যাচটি স্টেজিংয়ের জন্য প্রস্তুত!")
        sys.exit(0)
    else:
        print("\n❌ কিছু ত্রুটি রয়েছে। দয়া করে সংশোধন করে পুনরায় যাচাই করুন।")
        sys.exit(1)


