# বিষয়, পত্র ও অধ্যায় রেফারেন্স ক্যাটালগ (Hierarchy Reference Catalog)

> এই ফাইলটি দেখে যেকোনো প্রশ্নের সঠিক **subject_id** এবং **topic_id** নির্ধারণ করতে হবে।
> বিজ্ঞান বিষয়ে (গণিত, পদার্থ, রসায়ন, জীববিজ্ঞান, আইসিটি) seed-বহির্ভূত কোনো topic_id বানানো **কঠোরভাবে নিষিদ্ধ**।
> শুধুমাত্র ইংরেজি (ENG), বাংলা (BAN), এবং সাধারণ জ্ঞান (GK) বিষয়ে নতুন অধ্যায়ের জন্য `topic_name` + `topic_is_new: true` প্রযোজ্য।

## ১. বিষয়সমূহ (Subjects — মোট ৮টি)

| subject_id | কোড (code) | বাংলা নাম | ইংরেজি নাম | পত্র সংখ্যা |
|---|---|---|---|---|
| 1 | HM | উচ্চতর গণিত | Higher Mathematics | 2 |
| 2 | PHY | পদার্থবিজ্ঞান | Physics | 2 |
| 3 | CHEM | রসায়ন | Chemistry | 2 |
| 4 | BIO | জীববিজ্ঞান | Biology | 2 |
| 5 | ICT | তথ্য ও যোগাযোগ প্রযুক্তি | ICT | 1 |
| 6 | ENG | ইংরেজি | English | 2 |
| 7 | BAN | বাংলা | Bangla | 2 |
| 8 | GK | সাধারণ জ্ঞান | General Knowledge | 1 |

## ২. পত্রসমূহ (Papers — মোট ১৪টি)

| paper_id | subject_id | বিষয় কোড | পত্র নং | নাম (বাংলা) | নাম (English) |
|---|---|---|---|---|---|
| 1 | 1 | HM | 1 | উচ্চতর গণিত ১ম পত্র | Higher Math 1st Paper |
| 2 | 1 | HM | 2 | উচ্চতর গণিত ২য় পত্র | Higher Math 2nd Paper |
| 3 | 2 | PHY | 1 | পদার্থবিজ্ঞান ১ম পত্র | Physics 1st Paper |
| 4 | 2 | PHY | 2 | পদার্থবিজ্ঞান ২য় পত্র | Physics 2nd Paper |
| 5 | 3 | CHEM | 1 | রসায়ন ১ম পত্র | Chemistry 1st Paper |
| 6 | 3 | CHEM | 2 | রসায়ন ২য় পত্র | Chemistry 2nd Paper |
| 7 | 4 | BIO | 1 | জীববিজ্ঞান ১ম পত্র (উদ্ভিদবিজ্ঞান) | Botany |
| 8 | 4 | BIO | 2 | জীববিজ্ঞান ২য় পত্র (প্রাণীবিজ্ঞান) | Zoology |
| 9 | 5 | ICT | 1 | আইসিটি | ICT |
| 10 | 6 | ENG | 1 | ইংরেজি ১ম পত্র | English 1st Paper |
| 11 | 6 | ENG | 2 | ইংরেজি ২য় পত্র | English 2nd Paper |
| 12 | 7 | BAN | 1 | বাংলা ১ম পত্র | Bangla 1st Paper |
| 13 | 7 | BAN | 2 | বাংলা ২য় পত্র | Bangla 2nd Paper |
| 14 | 8 | GK | 1 | সাধারণ জ্ঞান | General Knowledge |

## ৩. অধ্যায়সমূহ (Topics — মোট ৯৩টি বিদ্যমান সিড অধ্যায়)

### উচ্চতর গণিত (HM — subject_id: 1)

#### উচ্চতর গণিত ১ম পত্র (paper_id: 1)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **101** | 1 | ম্যাট্রিক্স ও নির্ণায়ক | Matrices & Determinants |
| **102** | 2 | ভেক্টর | Vectors |
| **103** | 3 | সরলরেখা | Straight Lines |
| **104** | 4 | বৃত্ত | Circles |
| **105** | 5 | বিন্যাস ও সমাবেশ | Permutation & Combination |
| **106** | 6 | ত্রিকোণমিতিক অনুপাত | Trigonometric Ratios |
| **107** | 7 | সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত | Trigonometric Ratios of Associated Angles |
| **108** | 8 | ফাংশন ও ফাংশনের লেখচিত্র | Functions & Graphs |
| **109** | 9 | অন্তরীকরণ | Differentiation |
| **110** | 10 | যোগজীকরণ | Integration |

#### উচ্চতর গণিত ২য় পত্র (paper_id: 2)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **111** | 1 | বাস্তব সংখ্যা ও অসমতা | Real Numbers & Inequalities |
| **112** | 2 | যোগাশ্রয়ী প্রোগ্রাম | Linear Programming |
| **113** | 3 | জটিল সংখ্যা | Complex Numbers |
| **114** | 4 | বহুপদী ও বহুপদী সমীকরণ | Polynomials & Equations |
| **115** | 5 | দ্বিপদী বিস্তৃতি | Binomial Expansion |
| **116** | 6 | কনিক | Conics |
| **117** | 7 | বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ | Inverse Trigonometric Functions |
| **118** | 8 | স্থিতিবিদ্যা | Statics |
| **119** | 9 | সমতলে বস্তুকণার গতি | Particle Dynamics |
| **120** | 10 | বিস্তারের পরিমাপ ও সম্ভাবনা | Measures of Dispersion & Probability |

### পদার্থবিজ্ঞান (PHY — subject_id: 2)

#### পদার্থবিজ্ঞান ১ম পত্র (paper_id: 3)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **201** | 1 | ভৌতজগৎ ও পরিমাপ | Physical World & Measurement |
| **202** | 2 | ভেক্টর | Vector |
| **203** | 3 | গতিবিদ্যা | Dynamics |
| **204** | 4 | নিউটনীয় বলবিদ্যা | Newtonian Mechanics |
| **205** | 5 | কাজ, ক্ষমতা ও শক্তি | Work, Energy & Power |
| **206** | 6 | মহাকর্ষ ও অভিকর্ষ | Gravitation & Gravity |
| **207** | 7 | পদার্থের গাঠনিক ধর্ম | Structural Properties of Matter |
| **208** | 8 | পর্যাবৃত্ত গতি | Periodic Motion |
| **209** | 9 | তরঙ্গ | Waves |
| **210** | 10 | আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব | Ideal Gas & Kinetic Theory |

#### পদার্থবিজ্ঞান ২য় পত্র (paper_id: 4)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **211** | 1 | তাপগতিবিদ্যা | Thermodynamics |
| **212** | 2 | স্থির তড়িৎ | Static Electricity |
| **213** | 3 | চল তড়িৎ | Current Electricity |
| **214** | 4 | তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চৌম্বকত্ব | Magnetic Effect of Current |
| **215** | 5 | তাড়িতচৌম্বকীয় আবেশ ও পরিবর্তী প্রবাহ | Electromagnetic Induction |
| **216** | 6 | জ্যামিতিক আলোকবিজ্ঞান | Geometrical Optics |
| **217** | 7 | ভৌত আলোকবিজ্ঞান | Physical Optics |
| **218** | 8 | আধুনিক পদার্থবিজ্ঞানের সূচনা | Modern Physics |
| **219** | 9 | পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান | Atomic Model & Nuclear Physics |
| **220** | 10 | সেমিকন্ডাক্টর ও ইলেকট্রনিক্স | Semiconductor & Electronics |
| **221** | 11 | জ্যোতির্বিজ্ঞান | Astronomy |

### রসায়ন (CHEM — subject_id: 3)

#### রসায়ন ১ম পত্র (paper_id: 5)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **301** | 1 | ল্যাবরেটরির নিরাপদ ব্যবহার | Safe Use of Laboratory |
| **302** | 2 | গুণগত রসায়ন | Qualitative Chemistry |
| **303** | 3 | মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন | Periodic Properties & Chemical Bonding |
| **304** | 4 | রাসায়নিক পরিবর্তন | Chemical Changes |
| **305** | 5 | কর্মমুখী রসায়ন | Practical Chemistry |

#### রসায়ন ২য় পত্র (paper_id: 6)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **311** | 1 | পরিবেশ রসায়ন | Environmental Chemistry |
| **312** | 2 | জৈব রসায়ন | Organic Chemistry |
| **313** | 3 | পরিমাণগত রসায়ন | Quantitative Chemistry |
| **314** | 4 | তড়িৎ রসায়ন | Electrochemistry |
| **315** | 5 | অর্থনৈতিক রসায়ন | Economic Chemistry |

### জীববিজ্ঞান (BIO — subject_id: 4)

#### জীববিজ্ঞান ১ম পত্র (উদ্ভিদবিজ্ঞান) (paper_id: 7)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **401** | 1 | কোষ ও এর গঠন | Cell & Its Structure |
| **402** | 2 | কোষ বিভাজন | Cell Division |
| **403** | 3 | কোষ রসায়ন | Cell Chemistry |
| **404** | 4 | অণুজীব | Microorganisms |
| **405** | 5 | শৈবাল ও ছত্রাক | Algae & Fungi |
| **406** | 6 | ব্রায়োফাইটা ও টেরিডোফাইটা | Bryophyta & Pteridophyta |
| **407** | 7 | নগ্নবীজী ও আবৃতবীজী উদ্ভিদ | Gymnosperms & Angiosperms |
| **408** | 8 | টিস্যু ও টিস্যুতন্ত্র | Tissue & Tissue System |
| **409** | 9 | উদ্ভিদ শারীরতত্ত্ব | Plant Physiology |
| **410** | 10 | উদ্ভিদ প্রজনন | Plant Reproduction |
| **411** | 11 | জীব প্রযুক্তি | Biotechnology |
| **412** | 12 | জীবের পরিবেশ, বিস্তার ও সংরক্ষণ | Organism Environment & Conservation |

#### জীববিজ্ঞান ২য় পত্র (প্রাণীবিজ্ঞান) (paper_id: 8)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **413** | 1 | প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস | Animal Diversity & Classification |
| **414** | 2 | প্রাণীর পরিচিতি (হাইড্রা, ঘাসফড়িং, রুই মাছ) | Animal Types (Hydra, Grasshopper, Rohu) |
| **415** | 3 | মানব শারীরতত্ত্ব: পরিপাক ও শোষণ | Digestion & Absorption |
| **416** | 4 | মানব শারীরতত্ত্ব: রক্ত ও সংবহন | Blood & Circulation |
| **417** | 5 | মানব শারীরতত্ত্ব: শ্বাসক্রিয়া ও শ্বসন | Breathing & Respiration |
| **418** | 6 | মানব শারীরতত্ত্ব: বর্জ্য ও নিষ্কাশন | Excretion & Elimination |
| **419** | 7 | মানব শারীরতত্ত্ব: চলন ও অঙ্গচালনা | Locomotion & Movement |
| **420** | 8 | মানব শারীরতত্ত্ব: সমন্বয় ও নিয়ন্ত্রণ | Coordination & Control |
| **421** | 9 | মানব জীবনের ধারাবাহিকতা | Continuity of Human Life |
| **422** | 10 | মানবদেহের প্রতিরক্ষা (ইমিউনিটি) | Human Body Defense Immunity |
| **423** | 11 | জিনতত্ত্ব ও বিবর্তন | Genetics & Evolution |
| **424** | 12 | প্রাণীর আচরণ | Animal Behavior |

### তথ্য ও যোগাযোগ প্রযুক্তি (ICT — subject_id: 5)

#### আইসিটি (paper_id: 9)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **501** | 1 | তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত | ICT Global & Bangladesh Context |
| **502** | 2 | কম্যুনিকেশন সিস্টেমস ও নেটওয়ার্কিং | Communication Systems & Networking |
| **503** | 3 | সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস | Number System & Digital Devices |
| **504** | 4 | ওয়েব ডিজাইন পরিচিতি এবং HTML | Web Design & HTML |
| **505** | 5 | প্রোগ্রামিং ভাষা (C Language) | Programming Language (C) |
| **506** | 6 | ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS) | Database Management System |

### ইংরেজি (ENG — subject_id: 6)

#### ইংরেজি ১ম পত্র (paper_id: 10)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **601** | 1 | Unit 1: People or Institutions Making History | People or Institutions Making History |
| **602** | 2 | Unit 2: Traffic Education | Traffic Education |
| **603** | 3 | Unit 3: Food Adulteration | Food Adulteration |
| **604** | 4 | Unit 4: Human Relationships | Human Relationships |
| **605** | 5 | Unit 5: Environment & Nature | Environment & Nature |
| **606** | 6 | Unit 6: Art & Music | Art & Music |

#### ইংরেজি ২য় পত্র (paper_id: 11)

| topic_id | অধ্যায় নং | অধ্যায়ের নাম (বাংলা) | Chapter Name (English) |
|---|---|---|---|
| **607** | 1 | Grammar: Prepositions & Articles | Prepositions & Articles |
| **608** | 2 | Grammar: Right Forms of Verbs | Right Forms of Verbs |
| **609** | 3 | Grammar: Transformation of Sentences | Transformation of Sentences |
| **610** | 4 | Grammar: Narration (Direct/Indirect) | Narration |
| **611** | 5 | Grammar: Modifiers & Punctuation | Modifiers & Punctuation |
| **612** | 6 | Composition: Paragraphs, Letters & Essays | Composition Writing |

### বাংলা (BAN — subject_id: 7)

#### বাংলা ১ম পত্র (paper_id: 12)

_কোনো পূর্বনির্ধারিত সিড অধ্যায় নেই। এই বিষয়ে নতুন অধ্যায় 	opic_name + 	opic_is_new: true দিয়ে অটো-তৈরি হয়।_

#### বাংলা ২য় পত্র (paper_id: 13)

_কোনো পূর্বনির্ধারিত সিড অধ্যায় নেই। এই বিষয়ে নতুন অধ্যায় 	opic_name + 	opic_is_new: true দিয়ে অটো-তৈরি হয়।_

### সাধারণ জ্ঞান (GK — subject_id: 8)

#### সাধারণ জ্ঞান (paper_id: 14)

_কোনো পূর্বনির্ধারিত সিড অধ্যায় নেই। এই বিষয়ে নতুন অধ্যায় 	opic_name + 	opic_is_new: true দিয়ে অটো-তৈরি হয়।_

## ৪. সাবটপিক ও সাব-সাবটপিক ব্যবহারের নিয়ম

১. প্রতিটি প্রশ্নে অধ্যায় (	opic_id), সাব-টপিক (subtopic_hint) এবং পারলে সাব-সাব-টপিক (sub_subtopic_hint) অবশ্যই দিতে হবে।
২. সাবটপিকের ক্ষেত্রে কোনো সংখ্যাগত id হাতে দেওয়া যাবে না — শুধুমাত্র পাঠ্য নাম (string) দিতে হবে।
৩. **সাব-টপিক তৈরিতে কোনো বাধা নেই:** যেকোনো বিষয়ে (পদার্থ, রসায়ন, গণিত, জীব ইত্যাদি) যদি আপনার সাব-টপিকটি বিদ্যমান তালিকায় না মিলে, সিস্টেম নিজ থেকেই সেই অধ্যায়ের অধীনে নতুন সাব-টপিক বা সাব-সাব-টপিক তৈরি করে নেবে।
