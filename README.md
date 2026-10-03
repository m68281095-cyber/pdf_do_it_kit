# 📦 PDF "do it" Kit — Maktum Portable HSC Staging Toolkit

**PDF "do it" Kit** হলো HSC প্রশ্নব্যাংক PDF থেকে প্রশ্ন নিষ্কাশন এবং Maktum স্টেজিং ব্যাচে রূপান্তরের একটি সম্পূর্ণ স্বয়ংসম্পূর্ণ (Self-Contained) ও পোর্টেবল টুলকিট।

এই কিটটির উদ্দেশ্য হলো মূল অ্যাপের ডাটাবেজ বা ব্যাকএন্ড ছাড়াই যেকোনো বহিরাগত এআই এজেন্ট (Claude, ChatGPT, Gemini, Cursor) বা মানব কন্ট্রিবিউটর যেন যেকোনো HSC প্রশ্নব্যাংক PDF থেকে নিখুঁতভাবে প্রশ্ন নিষ্কাশন করে একটি ভ্যালিডেট করা ব্যাচ তৈরি করতে পারে — যা সরাসরি মূল Maktum অ্যাপের `pdf_staging/` ফোল্ডারে রাখলেই ১-ক্লিকে ডাটাবেজে ইমপোর্ট হয়ে যাবে।

---

## 📁 ফোল্ডার কাঠামো (Directory Structure)

```text
pdf_do_it_kit/
├── README.md               # কিটের প্রধান পরিচিতি ও সারসংক্ষেপ
├── HOW_TO_USE_THIS_KIT.md  # ব্যবহারকারী ও ডেভেলপারদের বিস্তারিত ব্যবহারের নিয়ম
├── INSTRUCTIONS_FOR_AI.md  # এআই এজেন্টের জন্য ১৭টি বাধ্যতামূলক পাইপলাইন নীতি
├── PROMPTS_FOR_USER.md     # এআই চ্যাটে কপি করার রেডিমেড প্রম্পটসমূহ
├── package.json            # জিরো-ডিপেন্ডেন্সি প্যাকেজ মেটাডাটা
│
├── hierarchy/              # বিষয় ও অধ্যায়ের আইডি রেফারেন্স (ডাটাবেজ মুক্ত)
│   ├── subjects.json       # ৮টি অনুমোদিত বিষয়ের তালিকা ও আইডি
│   ├── papers.json         # ১ম ও ২য় পত্রের ম্যাপিং
│   ├── topics.json         # অধ্যায়ের আইডি (Topic ID) ও নাম
│   └── hierarchy_reference.md # মানব ও এআই বান্ধব অধ্যায় তালিকা
│
├── schemas/                # JSON ডেটা স্কিমা নির্দেশিকা
│   └── json_schemas.md     # batch.json, MCQ, CQ, Note স্কিমা
│
├── templates/              # রেডিমেড স্কেলেটন টেমপ্লেট
│   ├── batch.json          # ব্যাচ মেটাডাটা টেমপ্লেট
│   ├── physics.json        # বিষয়ভিত্তিক প্রশ্ন টেমপ্লেট
│   ├── _old_syllabus.json  # ওল্ড সিলেবাস সংরক্ষণ টেমপ্লেট
│   └── _checklist.md       # ভেরিফিকেশন চেকলিস্ট টেমপ্লেট
│
├── validator/              # জিরো-ডিপেন্ডেন্সি ব্যাচ ভ্যালিডেটর
│   ├── verify.js           # Node.js (ESM) / Bun ভ্যালিডেটর
│   ├── verify.cjs          # Node.js (CommonJS) ভ্যালিডেটর
│   └── verify.py           # Pure Python 3 ভ্যালিডেটর
│
└── sample_output/          # সম্পূর্ণ প্রস্তুতকৃত নমুনা ব্যাচ
    └── sample-phy-buet-2023/
        ├── batch.json
        ├── physics.json
        └── _checklist.md
```

---

## ⚡ দ্রুত শুরু (Quick Start)

### ১. এআই দিয়ে সম্পূর্ণ PDF কনভার্ট করতে চান?
- কোনো পাতা কাটা বা ছবি ক্রপ করার দরকার নেই; পুরো PDF একবারে দিন।
- [`PROMPTS_FOR_USER.md`](./PROMPTS_FOR_USER.md) থেকে প্রম্পট কপি করে Claude বা ChatGPT-তে আপনার সম্পূর্ণ PDF ফাইলের সাথে দিন।
- এআই-কে নির্দেশ দিতে [`INSTRUCTIONS_FOR_AI.md`](./INSTRUCTIONS_FOR_AI.md) সংযুক্ত করুন যাতে এআই অন্তত ১০ বার পুনরাবৃত্তিমূলক ভেরিফিকেশন লুপ চালিয়ে ভুল, বাদ পড়া প্রশ্ন ও টপিক তৎক্ষণাৎ সংশোধন করে নেয়।

### ২. ব্যাচ ভ্যালিডেট করুন:
কোনো এক্সটারনাল প্যাকেজ ইনস্টল ছাড়াই রান করুন:
```bash
# Node.js
node validator/verify.js <path-to-batch-folder>

# Bun
bun validator/verify.js <path-to-batch-folder>

# Python
python validator/verify.py <path-to-batch-folder>
```

### ৩. মূল অ্যাপে যুক্ত করুন:
যাচাইকৃত ফোল্ডারটি মূল Maktum অ্যাপের `pdf_staging/<slug>/`-এ রেখে UI থেকে **"সব ডাটাবেজে যুক্ত করুন"** চাপুন।

বিস্তারিত জানতে দেখুন [`HOW_TO_USE_THIS_KIT.md`](./HOW_TO_USE_THIS_KIT.md)।
