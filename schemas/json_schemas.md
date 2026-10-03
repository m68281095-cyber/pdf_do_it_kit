# JSON স্কিমা ও ফিল্ড বিবরণী (JSON Schemas & Field Contract)

এই নথিতে `batch.json` এবং বিষয়ভিত্তিক প্রশ্ন ফাইলের (`physics.json`, `chemistry.json` ইত্যাদি) প্রতিটি ফিল্ডের ধরন ও নিয়ম বিস্তারিতভাবে দেওয়া হলো।

---

## ১. `batch.json` — ব্যাচ ম্যানিফেস্ট স্কিমা

প্রতিটি ব্যাচ ফোল্ডারে একটিমাত্র `batch.json` থাকবে।

```json
{
  "title": "এইচএসসি পদার্থবিজ্ঞান ১ম পত্র - বুয়েট ২০২৩",
  "destination": "all",
  "rewrite_mode": "verbatim",
  "pin_topic_id": null,
  "default_source": {
    "category": "engineering",
    "university": "BUET",
    "year": 2023,
    "unit": "ক"
  },
  "status": "draft",
  "notes": "যাচাইকৃত ব্যাচ"
}
```

### ফিল্ডসমূহ:
| ফিল্ড | ধরন | আবশ্যক? | বিবরণ |
|---|---|---|---|
| `title` | string | **হ্যাঁ** | ব্যাচের নাম যা UI-তে প্রদর্শন করা হবে। |
| `destination` | string | না | `all` (ডিফল্ট), `mcq`, `cq`, `notes`। |
| `rewrite_mode` | string | না | `verbatim` (ডিফল্ট)। |
| `pin_topic_id` | integer/null | না | পুরো PDF যদি একটি নির্দিষ্ট অধ্যায়ের হয়, তবে এখানে সেই `topic_id` দিলে সব প্রশ্ন সরাসরি সেই অধ্যায়ে চলে যাবে। |
| `default_source` | object/null | না | ডিফল্ট উৎস অবজেক্ট `{ category, university, year, unit }`। |
| `status` | string | না | `draft`, `processing`, বা `verified`। |
| `notes` | string/null | না | অতিরিক্ত কোনো মন্তব্য বা তথ্য। |

---

## ২. বিষয়-ফাইলের কাঠামো (`physics.json`, `chemistry.json` ইত্যাদি)

প্রতিটি বিষয় ফাইলের রুট অবজেক্টে একটি `items` অ্যারে থাকবে:

```json
{
  "page": 1,
  "items": [
    { /* আইটেম ১ */ },
    { /* আইটেম ২ */ }
  ]
}
```

> **নোট:** ফাইল-নাম যাই হোক না কেন, রাউটিং মূলত নির্ধারিত হয় প্রতিটি আইটেমের `subject_id` দিয়ে।
---

## ৩. MCQ আইটেম স্কিমা (বহুনির্বাচনি প্রশ্ন)

```json
{
  "kind": "mcq",
  "subject_id": 2,
  "question_number": "01",
  "question": "একটি সরল দোলকের দোলনকাল দ্বিগুণ করতে হলে এর কার্যকরী দৈর্ঘ্য কত গুণ করতে হবে?",
  "option_a": "২ গুণ",
  "option_b": "৪ গুণ",
  "option_c": "√২ গুণ",
  "option_d": "১/২ গুণ",
  "correct_answer": "B",
  "explanation": "আমরা জানি, $T = 2\\pi \\sqrt{\\frac{L}{g}} \\implies T \\propto \\sqrt{L}$। সুতরাং দোলনকাল দ্বিগুণ ($2T$) করতে হলে কার্যকরী দৈর্ঘ্য $4$ গুণ করতে হবে।",
  "topic_id": 208,
  "topic_name": "পর্যাবৃত্ত গতি",
  "subtopic_hint": "সরল দোলকের সূত্রাবলি",
  "sub_subtopic_hint": "দোলনকাল ও কার্যকরী দৈর্ঘ্যের সম্পর্ক",
  "source": {
    "category": "varsity",
    "university": "ঢাকা বিশ্ববিদ্যালয়",
    "year": 2023,
    "unit": "ক"
  },
  "figure_svg": null,
  "figure_alt": null
}
```

### MCQ ফিল্ড বিবরণী:
| ফিল্ড | ধরন | আবশ্যক? | বিবরণ |
|---|---|---|---|
| `kind` | string | **হ্যাঁ** | `"mcq"` হতে হবে। |
| `subject_id` | integer | **হ্যাঁ** | বিষয়ের আইডি (HM=1, PHY=2, CHEM=3, BIO=4, ICT=5, ENG=6, BAN=7, GK=8)। |
| `question_number` | string/int | **হ্যাঁ** | মুদ্রিত প্রশ্নের ক্রমিক নম্বর (যেমন `"01"` ইত্যাদি)। |
| `question` | string | **হ্যাঁ** | প্রশ্নের মূল টেক্সট (শুরুর নম্বর বাদ দিয়ে)। গণিতের জন্য `$…$`। |
| `option_a` | string | **হ্যাঁ** | ১ম অপশন। |
| `option_b` | string | **হ্যাঁ** | ২য় অপশন (কমপক্ষে ২টি অপশন A ও B আবশ্যক)। |
| `option_c`, `option_d`, `option_e` | string | না | ৩য়, ৪র্থ, ৫ম অপশন। |
| `correct_answer` | string | **হ্যাঁ** | `"A"`, `"B"`, `"C"`, `"D"`, বা `"E"`। |
| `explanation` | string | **হ্যাঁ** | প্রশ্নের সমাধান বা যৌক্তিক ব্যাখ্যা। |
| `topic_id` | integer | **হ্যাঁ\*** | অধ্যায়ের আইডি (যেমন `208`)। (\*ENG/BAN/GK ব্যতীত)। |
| `topic_name` | string | না | অধ্যায়ের নাম। |
| `topic_is_new` | boolean | না | শুধুমাত্র ENG, BAN, GK-এ নতুন অধ্যায়ের জন্য `true`। |
| `subtopic_hint` | string | **হ্যাঁ** | সাব-টপিকের নাম। |
| `sub_subtopic_hint` | string | না | আরও সূক্ষ্ম উপ-টপিক থাকলে তার নাম। |
| `source` | object | **হ্যাঁ** | `{ category, university, year, unit }`। |
| `figure_svg` | string/null | না | রেখাচিত্র থাকলে ইনলাইন `<svg viewBox="...">...</svg>`। |
| `figure_alt` | string/null | না | চিত্রের টেক্সট ক্যাপশন অনূর্ধ্ব ৫০০ অক্ষর। |

---

## ৪. CQ আইটেম স্কিমা (সৃজনশীল ও সরল প্রশ্ন)

### ৪.১ Direct CQ (ক ও খ — সাধারণ/সরল প্রশ্ন — উদ্দীপকহীন):
বোর্ড পরীক্ষার (ক) জ্ঞানমূলক ও (খ) অনুধাবনমূলক প্রশ্ন সরাসরি প্রশ্ন, যা উদ্দীপকের ওপর নির্ভর করে না।

```json
{
  "kind": "cq",
  "cq_type": "direct",
  "subject_id": 2,
  "question_number": "01(ক)",
  "stimulus": "ফার্মির নীতিটি বিবৃত করো।",
  "sub_questions": [],
  "answers": [],
  "topic_id": 201,
  "topic_name": "ভৌতজগৎ ও পরিমাপ",
  "subtopic_hint": "পরিমাপের একক ও নীতি",
  "source": { "category": "board", "university": "ঢাকা বোর্ড", "year": 2023 }
}
```

### ৪.২ Creative CQ (গ ও ঘ — উদ্দীপকযুক্ত সৃজনশীল প্রশ্ন):
প্রয়োগ (গ) এবং উচ্চতর দক্ষতা (ঘ) উদ্দীপকের সাথে সম্পর্কিত।

```json
{
  "kind": "cq",
  "cq_type": "creative",
  "subject_id": 2,
  "question_number": "01(গ-ঘ)",
  "stimulus": "একটি সরল ছন্দিত স্পন্দনে স্পন্দিত কণার সমীকরণ $x = 0.05 \\sin(20\\pi t + \\frac{\\pi}{4})$ মিটার।",
  "sub_questions": [
    { "label": "গ", "text": "কণাটির সর্বোচ্চ বেগ নির্ণয় করো।", "marks": 3 },
    { "label": "ঘ", "text": "কণাটি শক্তি সংরক্ষণশীলতা নীতি মেনে চলে কিনা তা বিশ্লেষণ করো।", "marks": 4 }
  ],
  "answers": [],
  "topic_id": 208,
  "topic_name": "পর্যাবৃত্ত গতি",
  "subtopic_hint": "সরল ছন্দিত স্পন্দন ও শক্তি",
  "source": { "category": "board", "university": "ঢাকা বোর্ড", "year": 2023 }
}
```

> **সতর্কতা:** সমাধান না থাকলে `answers: []`। মনগড়া উত্তর তৈরি সম্পূর্ণ নিষেধ।

---

## ৫. `_old_syllabus.json` স্কিমা

বোর্ড বা ভর্তি পরীক্ষায় `"Old Syllabus"` বক্সের প্রশ্নগুলো এই ফাইলে রাখা হয় (ডাটাবেজে ঢুকবে না):

```json
{
  "page": null,
  "items": [
    {
      "kind": "mcq",
      "syllabus_label": "Old Syllabus",
      "subject_id": 2,
      "question_number": "09",
      "question": "পুরাতন সিলেবাসের প্রশ্ন...",
      "option_a": "ক", "option_b": "খ", "correct_answer": "A",
      "topic_id": 201,
      "source": { "category": "engineering", "university": "BUET", "year": 2015 }
    }
  ]
}
```

---

## ⛔ নিষিদ্ধ ফিল্ডসমূহ (কখনোই হাতে লিখবেন না)

নিচের ফিল্ডগুলো কোর ইঞ্জিন নিজেই হিসাব করে। হাতে লেখা সম্পূর্ণ নিষেধ:
- `fingerprint` (অটো-ডিডুপ হ্যাশ)
- `uid` (ইউনিক আইডি)
- `batch_id` (ব্যাচ অ্যাসাইনমেন্ট)
- `subtopic_id` (ডাটাবেজ ফরেন কি)

