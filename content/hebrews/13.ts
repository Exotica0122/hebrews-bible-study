import type {
  ChapterContent,
  ChapterCopy,
  Lang,
  Movement,
  Summary,
} from "../types";

// Verse strings mark key words as [key|display text]; see content/parse.ts.
const MV: Movement[] = [
  {
    id: "m1",
    num: "I",
    range: "1–6",
    en: {
      title: "Let brotherly love continue",
      quote: "“I will never leave you nor forsake you.”",
      sref: "Hebrews 13:5",
      cap: "Love as a family, welcome strangers, remember prisoners, honour marriage and be content, because the Lord is our helper.",
      snips: [
        "Let brotherly love continue",
        "Show hospitality: some have entertained angels",
        "Remember prisoners as though bound with them",
        "Let marriage be held in honour",
        "Be content: he will never leave you",
        "The Lord is my helper; I will not fear",
      ],
      verses: [
        [1, "Let [brotherly|brotherly love] continue."],
        [
          2,
          "[neglect|Do not neglect] to show hospitality to strangers, for thereby some have entertained angels unawares.",
        ],
        [
          3,
          "Remember those who are in prison, as though in prison with them, and those who are mistreated, since you also are in the body.",
        ],
        [
          4,
          "Let marriage be held in [honour|honour] among all, and let the [bed|marriage bed] be [undefiled|undefiled], for God will judge the [immoral|sexually immoral] and [adulterous|adulterous].",
        ],
        [
          5,
          "Keep your life free from love of money, and be content with what you have, for he has said, “I will never leave you nor forsake you.”",
        ],
        [
          6,
          "So we can confidently say, “The Lord is my [helper|helper]; I will not fear; what can man do to me?”",
        ],
      ],
      com: [
        ["h", "Strangers and prisoners"],
        [
          "p",
          "Verse 2 means that showing hospitality to strangers is treating them with a generous heart, dignity and kindness, as if God had sent them.",
        ],
        [
          "p",
          "Verse 3 echoes Hebrews 10:32–34, where the Jewish Christians once endured suffering, helped those in prison and brought them food and drink at the risk of their own lives. The readers are reminded again not to become “spiritually dull”.",
        ],
        [
          "q",
          "Remember those in prison, as if you were there yourself. Remember also those being mistreated, as if you felt their pain in your own bodies. (NLT)",
        ],
        ["h", "Marriage held in honour"],
        [
          "p",
          "This may seem a sudden shift, but it is no surprise given the culture the readers lived in. In the pagan world many Romans and Greeks followed asceticism, in which marriage was forbidden. At the other extreme, sexual immorality was normalised in that society. So the author tells the readers to keep the marriage bed holy and not violate the covenant of marriage, whether by sexual acts before marriage or with other people after it.",
        ],
        ["h", "He will never leave you: Deuteronomy 31"],
        [
          "p",
          "In Deuteronomy 31 Joshua succeeds Moses as Israel marches toward the promised land of Canaan. At the handover Moses encourages Joshua not to be afraid, because God himself will be with him and the Israelites: God will never leave him nor forsake him.",
        ],
        [
          "p",
          "Behind Hebrews, many readers had financial anxiety, their properties confiscated along with other financial difficulties. It is only natural to love money in financial hardship, but the author is saying that greed is also a sign of fear, like Joshua’s fear as he looked at the armies of Canaan.",
        ],
        ["h", "The Lord is my helper: Psalm 118"],
        [
          "p",
          "Verse 6 links well with verse 5, because God is always there to help believers. It is a statement of bold confidence: there is nothing to fear, because God is always there for us.",
        ],
        [
          "p",
          "Psalm 118’s author is unknown, but it speaks of a king or worship leader. It was written as a dramatic, call-and-response processional hymn for great crowds marching up to Mount Zion. In verses 1–18 the king or worship leader marches toward Jerusalem with a vast throng of pilgrims, shouting his testimony of how God rescued him and the Israelites from death and pagan enemies on the battlefield. In this context it comforts the readers: the same God who rescued the king will rescue them in their hardship.",
        ],
      ],
    },
    ko: {
      title: "서로 사랑하기를 계속하십시오",
      quote: "“내가 결코 너를 떠나지도 않고, 버리지도 않겠다.”",
      sref: "히브리서 13:5",
      cap: "가족처럼 사랑하고, 나그네를 대접하고, 갇힌 사람들을 기억하고, 혼인을 귀하게 여기고 만족하십시오. 주님께서 우리를 도우십니다.",
      snips: [
        "서로 사랑하기를 계속하십시오",
        "나그네를 대접하십시오. 어떤 이들은 천사들을 대접했습니다",
        "함께 갇혀 있는 심정으로 갇힌 사람들을 생각하십시오",
        "혼인을 귀하게 여기십시오",
        "만족하십시오. 주님께서 결코 떠나지 않으십니다",
        "주님께서 나를 도우시니 두려움이 없습니다",
      ],
      verses: [
        [1, "[brotherly|서로 사랑하기]를 계속하십시오."],
        [
          2,
          "나그네를 대접하기를 [neglect|소홀히 하지 마십시오]. 어떤 이들은 나그네를 대접하다가, 자기들도 모르는 사이에 천사들을 대접하였습니다.",
        ],
        [
          3,
          "감옥에 갇혀 있는 사람들을 생각하되, 여러분도 함께 갇혀 있는 심정으로 생각하십시오. 여러분도 몸이 있는 사람이니, 학대받는 사람들을 생각해 주십시오.",
        ],
        [
          4,
          "모두 혼인을 [honour|귀하게] 여겨야 하고, [bed|잠자리]를 [undefiled|더럽히지 말아야] 합니다. [immoral|음행하는 자]와 [adulterous|간음하는 자]는 하나님의 심판을 받을 것입니다.",
        ],
        [
          5,
          "돈을 사랑함이 없이 살아야 하고, 지금 가지고 있는 것으로 만족해야 합니다. 주님께서 친히 말씀하시기를 “내가 결코 너를 떠나지도 않고, 버리지도 않겠다” 하셨습니다.",
        ],
        [
          6,
          "그래서 우리는 담대하게 이렇게 말합니다. “주님께서는 나를 [helper|도우시는 분]이시니, 내게는 두려움이 없다. 누가 감히 내게 손댈 수 있으랴?”",
        ],
      ],
      com: [
        ["h", "나그네와 갇힌 사람들"],
        [
          "p",
          "2절은 나그네를 대접하는 것이 하나님께서 보내신 사람처럼 너그러운 마음과 존중과 친절로 대하는 것임을 뜻합니다.",
        ],
        [
          "p",
          "3절은 히브리서 10장 32–34절과 이어집니다. 그때 유대 그리스도인들은 고난을 견디며, 목숨을 걸고 갇힌 사람들을 돕고 먹을 것과 마실 것을 가져다주었습니다. 독자들은 다시 “영적으로 둔해지지” 말라는 일깨움을 받습니다.",
        ],
        ["h", "혼인을 귀하게"],
        [
          "p",
          "갑작스러운 주제 전환처럼 보일 수 있지만, 독자들이 살던 문화를 생각하면 놀라운 일이 아닙니다. 이방 세계에서 많은 로마와 그리스 사람들은 혼인을 금하는 금욕주의를 따랐습니다. 반대쪽 극단에서는 성적인 부도덕이 그 사회에서 당연하게 여겨졌습니다. 그래서 저자는 혼인 전의 성관계나 혼인 뒤 다른 사람과의 관계로 혼인 언약을 어기지 말고 잠자리를 거룩하게 지키라고 말합니다.",
        ],
        ["h", "결코 떠나지 않으신다: 신명기 31장"],
        [
          "p",
          "신명기 31장에서 이스라엘이 가나안 약속의 땅을 향해 나아갈 때 여호수아가 모세의 뒤를 잇습니다. 모세는 여호수아에게 두려워하지 말라고 격려합니다. 하나님께서 친히 그와 이스라엘과 함께하시며 결코 떠나지도 버리지도 않으실 것이기 때문입니다.",
        ],
        [
          "p",
          "히브리서의 배경에서 많은 사람이 재산을 빼앗기고 여러 경제적 어려움을 겪어 돈 걱정이 컸습니다. 경제적으로 어려울 때 돈을 사랑하게 되는 것은 사람에게 자연스러운 일이지만, 저자는 탐욕도 두려움의 표시라고 말합니다. 여호수아가 가나안의 군대를 보며 두려워했던 것처럼 말입니다.",
        ],
        ["h", "주님은 나를 도우시는 분: 시편 118편"],
        [
          "p",
          "6절은 5절과 잘 이어집니다. 하나님께서는 언제나 믿는 사람들을 도우시기 때문입니다. 6절은 하나님께서 늘 우리와 함께 계시니 두려워할 것이 없다는 담대한 확신의 고백입니다.",
        ],
        [
          "p",
          "시편 118편의 저자는 알려지지 않았지만 왕이나 예배 인도자에 관한 노래이며, 시온 산으로 행진해 올라가는 큰 무리를 위해 주고받는 형식으로 지은 극적인 행진 찬송입니다. 1–18절에서 왕이나 예배 인도자는 수많은 순례자와 함께 예루살렘으로 행진하며, 하나님께서 전쟁터에서 죽음과 이방 원수들로부터 자기와 이스라엘을 구하신 일을 외쳐 간증합니다. 이 문맥에서 이 말씀은 독자들을 위로합니다. 왕을 구하신 그 하나님께서 고난 가운데 있는 독자들도 구하실 것입니다.",
        ],
      ],
    },
    words: {
      en: {
        brotherly: {
          t: "Brotherly love",
          g: "philadelphia · φιλαδελφία",
          v: "13:1",
          s: "Love within a family",
          d: "The love members of a family hold for each other; not used of love between members of different families.",
        },
        neglect: {
          t: "Do not neglect",
          g: "mē epilanthanesthe · μὴ ἐπιλανθάνεσθε",
          v: "13:2",
          s: "Do not forget",
          d: "Do not completely forget.",
        },
        honour: {
          t: "Honour",
          g: "timios · τίμιος",
          v: "13:4",
          s: "Precious",
          d: "Things which are costly, precious or valuable.",
        },
        bed: {
          t: "Marriage bed",
          g: "koitē · κοίτη",
          v: "13:4",
          s: "Husband and wife",
          d: "Used figuratively of the sexual relationship between a husband and wife.",
        },
        undefiled: {
          t: "Undefiled",
          g: "amiantos · ἀμίαντος",
          v: "13:4",
          s: "Unstained",
          d: "Without contamination: unpolluted, untainted, unstained.",
        },
        immoral: {
          t: "Sexually immoral",
          g: "pornous · πόρνους",
          v: "13:4",
          s: "Outside the covenant",
          d: "Fornicators: sexual acts outside the covenant of marriage.",
        },
        adulterous: {
          t: "Adulterous",
          g: "moichous · μοιχοὺς",
          v: "13:4",
          s: "Breaking the covenant",
          d: "Someone violating the marriage covenant by sexual relations with someone other than their spouse.",
        },
        helper: {
          t: "The Lord is my helper",
          g: "boēthos · βοηθός",
          v: "13:6",
          s: "One who runs to rescue",
          d: "Someone who hears a cry of distress and runs to give immediate, protective rescue. This is what God does for believers: he is an active, present guard on the battlefield of life.",
        },
      },
      ko: {
        brotherly: {
          t: "서로 사랑",
          g: "philadelphia · φιλαδελφία",
          v: "13:1",
          s: "가족 안의 사랑",
          d: "한 가족의 식구들이 서로에게 품는 사랑입니다. 다른 가족 사이의 사랑에는 쓰지 않습니다.",
        },
        neglect: {
          t: "소홀히 하지 말라",
          g: "mē epilanthanesthe · μὴ ἐπιλανθάνεσθε",
          v: "13:2",
          s: "잊지 말라",
          d: "완전히 잊어버리지 말라는 뜻입니다.",
        },
        honour: {
          t: "귀하게",
          g: "timios · τίμιος",
          v: "13:4",
          s: "값진 것",
          d: "값비싸고 소중하고 귀한 것입니다.",
        },
        bed: {
          t: "잠자리",
          g: "koitē · κοίτη",
          v: "13:4",
          s: "남편과 아내",
          d: "남편과 아내 사이의 성관계를 비유적으로 가리킵니다.",
        },
        undefiled: {
          t: "더럽히지 않음",
          g: "amiantos · ἀμίαντος",
          v: "13:4",
          s: "얼룩 없음",
          d: "오염되지 않음, 더럽혀지지 않음, 흠 없음, 얼룩 없음입니다.",
        },
        immoral: {
          t: "음행하는 자",
          g: "pornous · πόρνους",
          v: "13:4",
          s: "언약 밖의 관계",
          d: "혼인 언약 밖에서 성관계를 하는 사람입니다.",
        },
        adulterous: {
          t: "간음하는 자",
          g: "moichous · μοιχοὺς",
          v: "13:4",
          s: "언약을 어김",
          d: "배우자가 아닌 사람과 성관계를 하여 혼인 언약을 어기는 사람입니다.",
        },
        helper: {
          t: "도우시는 분",
          g: "boēthos · βοηθός",
          v: "13:6",
          s: "구하러 달려오시는 분",
          d: "고통 속의 부르짖음을 듣고 곧바로 달려와 지켜 구해 주는 분입니다. 하나님께서 믿는 사람들에게 이렇게 하십니다. 그분은 삶의 전쟁터에서 늘 곁에 계시며 지키시는 분입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb10-34",
        tag: "NT",
        en: "Heb 10:34",
        ko: "히 10:34",
        ten: "For you had compassion on those in prison, and you joyfully accepted the plundering of your property, since you knew that you yourselves had a better possession and an abiding one.",
        tko: "여러분은 감옥에 갇힌 사람들과 고통을 함께 나누었고, 또한 자기 소유를 빼앗기는 일이 있어도, 그보다 더 좋고 더 영구한 재산이 있다는 것을 알고서, 그런 일을 기쁘게 당하였습니다.",
        wen: "What the readers once did for prisoners.",
        wko: "독자들이 전에 갇힌 사람들에게 한 일.",
      },
      {
        id: "deu31-6",
        tag: "OT",
        en: "Deut 31:6",
        ko: "신 31:6",
        ten: "Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you.",
        tko: "마음을 강하게 하고 용기를 내십시오. 그들 앞에서, 두려워하지도 말고 무서워하지도 마십시오. 주 당신들의 하나님이 당신들과 함께 가시면서, 당신들을 떠나지도 않으시고 버리지도 않으실 것입니다.",
        wen: "Moses to Joshua at the handover.",
        wko: "모세가 여호수아에게 한 말.",
      },
      {
        id: "psa118-6",
        tag: "OT",
        en: "Ps 118:6",
        ko: "시 118:6",
        ten: "The Lord is on my side; I will not fear. What can man do to me?",
        tko: "주님은 내 편이시므로, 나는 두렵지 않다. 사람이 나에게 무슨 해를 끼칠 수 있으랴?",
        wen: "The pilgrims’ song up to Zion.",
        wko: "시온으로 올라가는 순례자의 노래.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "7–8",
    en: {
      title: "The same yesterday and today and forever",
      quote: "“Jesus Christ is the same yesterday and today and forever.”",
      sref: "Hebrews 13:8",
      cap: "Leaders who taught us the word may not always stay, but Jesus Christ always has been, is, and always will be there.",
      snips: [
        "Remember your leaders and imitate their faith",
        "Jesus Christ is the same yesterday, today and forever",
      ],
      verses: [
        [
          7,
          "Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and imitate their faith.",
        ],
        [8, "Jesus Christ is the same yesterday and today and forever."],
      ],
      com: [
        ["h", "Remember your leaders"],
        [
          "p",
          "The leaders here are the close leaders the Jewish Christians had in their own faith journey, not the leaders listed in Hebrews 11. Some scholars add that many of these leaders had been martyred, leaving behind a legacy of faithfulness to the very end.",
        ],
        [
          "q",
          "Remember your leaders who taught you the word of God. Think of all the good that has come from their lives, and follow the examples of their faith. (NLT)",
        ],
        ["h", "Always the same"],
        [
          "p",
          "Verse 8 is a direct contrast between the earthly leaders and Jesus Christ. The earthly leaders taught the word of God well, but they do not always stay, whether because of weakness, martyrdom or some other circumstance. Jesus Christ, though, has always been there, is here now, and will always be here for the readers and for every believer.",
        ],
      ],
    },
    ko: {
      title: "어제나 오늘이나 영원히 한결같은 분",
      quote:
        "“예수 그리스도께서는 어제나 오늘이나 영원히 한결같은 분이십니다.”",
      sref: "히브리서 13:8",
      cap: "하나님의 말씀을 일러준 지도자들은 늘 머물지 못해도, 예수 그리스도께서는 언제나 계셨고, 지금 계시고, 영원히 계십니다.",
      snips: [
        "지도자들을 기억하고 그 믿음을 본받으십시오",
        "예수 그리스도는 어제나 오늘이나 영원히 한결같으십니다",
      ],
      verses: [
        [
          7,
          "여러분의 지도자들을 기억하십시오. 그들은 여러분에게 하나님의 말씀을 일러주었습니다. 그들이 어떻게 살고 죽었는지를 살펴보고, 그 믿음을 본받으십시오.",
        ],
        [8, "예수 그리스도께서는 어제나 오늘이나 영원히 한결같은 분이십니다."],
      ],
      com: [
        ["h", "지도자들을 기억하십시오"],
        [
          "p",
          "여기서 지도자들은 히브리서 11장에 나온 지도자들이 아니라, 유대 그리스도인들이 믿음의 길에서 가까이 만난 지도자들을 가리킵니다. 어떤 학자들은 이 지도자들 가운데 많은 이가 순교하여 마지막까지 신실했던 유산을 남겼다고 덧붙입니다.",
        ],
        ["h", "언제나 한결같으신 분"],
        [
          "p",
          "8절은 땅의 지도자들과 예수 그리스도를 바로 대조합니다. 땅의 지도자들은 하나님의 말씀을 잘 가르쳤지만, 연약함이나 순교나 다른 어떤 사정 때문에 늘 머물지는 못합니다. 그러나 예수 그리스도께서는 언제나 계셨고, 지금도 계시고, 독자들과 모든 믿는 사람을 위해 영원히 계실 것입니다.",
        ],
      ],
    },
    words: { en: {}, ko: {} },
    chips: [],
  },

  {
    id: "m3",
    num: "III",
    range: "9–14",
    en: {
      title: "Outside the camp",
      quote:
        "“Therefore let us go to him outside the camp and bear the reproach he endured.”",
      sref: "Hebrews 13:13",
      cap: "The heart is strengthened by grace, not foods. Jesus suffered outside the gate, so we go to him outside the camp.",
      snips: [
        "Be strengthened by grace, not by strange teachings about foods",
        "We have an altar the tent’s servants may not eat from",
        "The sin offering’s bodies are burned outside the camp",
        "Jesus suffered outside the gate to sanctify the people",
        "Go to him outside the camp and bear his reproach",
        "Here we have no lasting city; we seek the one to come",
      ],
      verses: [
        [
          9,
          "Do not be [led|led away] by [diverse|diverse] and [strange|strange] teachings, for it is good for the heart to be strengthened by grace, not by [foods|foods], which have not benefited those devoted to them.",
        ],
        [
          10,
          "We have an altar from which those who serve the tent have no right to eat.",
        ],
        [
          11,
          "For the bodies of those animals whose blood is brought into the holy places by the high priest as a sacrifice for sin are burned outside the camp.",
        ],
        [
          12,
          "So Jesus also suffered outside the gate in order to sanctify the people through his own blood.",
        ],
        [
          13,
          "Therefore let us go to him outside the camp and bear the reproach he endured.",
        ],
        [
          14,
          "For here we have no lasting city, but we seek the city that is to come.",
        ],
      ],
      com: [
        ["h", "Strange teachings"],
        [
          "p",
          "The readers would have been exposed to many diverse and strange teachings, not only the pull back to the Old Testament system. One example the author gives is ceremonial foods. Many believed that asceticism in food would bring its devotees closer to God, but the author confirms these are completely useless and do nothing for faith.",
        ],
        [
          "p",
          "The only thing that matters is the grace God gives, which is the “altar from which those who serve the tent have no right to eat”. Those who serve the tent are the people following the old system, relying on physical things rather than on spiritual things, on faith.",
        ],
        ["h", "Burned outside the camp"],
        [
          "p",
          "Verses 11–12 refer to the Day of Atonement, the High Priest’s annual sin offering. The High Priest took the blood of animals into the Most Holy Place. Afterwards the carcasses could not be left in the community; they were taken outside and burned, because they were contaminated with the people’s sins. No one was allowed to eat them.",
        ],
        [
          "p",
          "This carries over to verse 12. The animal sacrifices, the sprinkling of blood and the burning of the animals outside the camp all foreshadow Jesus Christ. Jesus also died outside the city gates of Jerusalem, at Golgotha. His blood was not sprinkled in the earthly Most Holy Place but in the heavenly sanctuary, which was a far better sacrifice.",
        ],
        ["h", "Go to him outside the camp"],
        [
          "p",
          "This also moves true holiness: it is found in Jesus outside the camp, far from the Most Holy Place, which is no longer “holy”. So the author tells the readers that spiritually we should go outside the camp to Jesus Christ and endure the difficulties, not go back to the physical Most Holy Place, because it is no longer holy.",
        ],
        ["h", "No lasting city"],
        [
          "p",
          "Verse 14 echoes Hebrews 11, where many faithful people wandered the earth as strangers and exiles, seeking and longing for a better, heavenly country. So the short physical persecution is bearable, and its weight is nothing compared with the kingdom to come with Jesus Christ, eternal salvation.",
        ],
      ],
    },
    ko: {
      title: "진영 밖으로",
      quote:
        "“그러하므로 우리도 진영 밖으로 나가 그에게로 나아가서, 그가 겪으신 치욕을 짊어집시다.”",
      sref: "히브리서 13:13",
      cap: "마음은 음식이 아니라 은혜로 튼튼해집니다. 예수께서 성문 밖에서 고난을 받으셨으니, 우리도 진영 밖으로 그분께 나아갑니다.",
      snips: [
        "이상한 음식 규정이 아니라 은혜로 튼튼해지십시오",
        "우리에게는 성전에서 섬기는 사람들이 먹을 수 없는 제단이 있습니다",
        "속죄제물의 몸은 진영 밖에서 태워집니다",
        "예수께서 백성을 거룩하게 하시려고 성문 밖에서 고난받으셨습니다",
        "진영 밖으로 나가 그분의 치욕을 짊어집시다",
        "이 땅에는 영원한 도시가 없고, 장차 올 도시를 찾습니다",
      ],
      verses: [
        [
          9,
          "[diverse|여러 가지] [strange|이상한] 교훈에 [led|끌려 다니지] 마십시오. [foods|음식 규정]을 지키는 것으로 마음이 튼튼해지는 것이 아니라, 은혜로 튼튼해지는 것이 좋습니다. 음식 규정에 매여서 사는 사람들은 유익을 얻지 못했습니다.",
        ],
        [
          10,
          "우리에게는 한 제단이 있습니다. 그런데 유대교의 성전에서 섬기는 사람들은 우리의 이 제단에 놓은 제물을 먹을 권리가 없습니다.",
        ],
        [
          11,
          "유대교의 제사의식에서 대제사장은 속죄제물로 드리려고 짐승의 피를 지성소에 가지고 들어가고, 그 몸은 진영 밖에서 태워버립니다.",
        ],
        [
          12,
          "그러므로 예수께서도 자기의 피로 백성을 거룩하게 하시려고 성문 밖에서 고난을 받으셨습니다.",
        ],
        [
          13,
          "그러하므로 우리도 진영 밖으로 나가 그에게로 나아가서, 그가 겪으신 치욕을 짊어집시다.",
        ],
        [
          14,
          "사실, 우리에게는 이 땅 위에 영원한 도시가 없고, 우리는 장차 올 도시를 찾고 있습니다.",
        ],
      ],
      com: [
        ["h", "이상한 교훈"],
        [
          "p",
          "독자들은 구약의 제도로 돌아가려는 유혹뿐만 아니라 여러 가지 이상한 교훈에도 노출되어 있었을 것입니다. 저자가 드는 예 가운데 하나가 의식에 쓰는 음식입니다. 많은 사람이 음식을 금하는 금욕이 하나님께 더 가까이 가게 한다고 믿었지만, 저자는 그것이 전혀 쓸모없고 믿음에 아무 도움이 되지 않는다고 확인합니다.",
        ],
        [
          "p",
          "중요한 것은 오직 하나님께서 주시는 은혜이며, 그것이 “성전에서 섬기는 사람들이 먹을 권리가 없는 제단”입니다. 이는 믿음이라는 영적인 것이 아니라 물질적인 것에 의지하는 옛 제도를 따르는 사람들을 가리킵니다.",
        ],
        ["h", "진영 밖에서 태움"],
        [
          "p",
          "11–12절은 대속죄일, 곧 대제사장이 해마다 드리는 속죄제를 말합니다. 대제사장은 짐승의 피를 지성소로 가지고 들어갔고, 그 뒤에 짐승의 몸은 백성의 죄로 더럽혀졌기 때문에 공동체 안에 둘 수 없어 밖으로 가져가 태웠습니다. 아무도 그것을 먹을 수 없었습니다.",
        ],
        [
          "p",
          "이것이 12절로 이어집니다. 짐승 제사와 피 뿌림과 진영 밖에서 짐승을 태우는 일은 모두 예수 그리스도를 미리 보여 줍니다. 예수님께서도 예루살렘 성문 밖 골고다에서 죽으셨습니다. 그분의 피는 땅의 지성소가 아니라 하늘 성소에 뿌려졌고, 그것은 훨씬 더 나은 제사였습니다.",
        ],
        ["h", "진영 밖으로 그분께"],
        [
          "p",
          "이로써 참된 거룩함이 있는 곳이 바뀝니다. 참된 거룩함은 더 이상 “거룩하지” 않은 지성소에서 멀리 떨어진, 진영 밖의 예수님께 있습니다. 그래서 저자는 우리가 영적으로 진영 밖의 예수 그리스도께 나아가 어려움을 견뎌야 하며, 더 이상 거룩하지 않은 눈에 보이는 지성소로 돌아가서는 안 된다고 말합니다.",
        ],
        ["h", "영원한 도시가 없습니다"],
        [
          "p",
          "14절은 히브리서 11장과 이어집니다. 그곳에서 많은 신실한 사람들이 더 좋은 하늘의 고향을 찾고 바라며 땅에서 길손과 나그네로 떠돌았습니다. 그러니 잠깐의 육신적인 박해는 견딜 만하며, 예수 그리스도와 함께 올 나라, 곧 영원한 구원에 비하면 아무것도 아닙니다.",
        ],
      ],
    },
    words: {
      en: {
        led: {
          t: "Led away",
          g: "parapheresthe · παραφέρεσθε",
          v: "13:9",
          s: "Blown off course",
          d: "The image of a ship caught by a sudden gust of wind and driven helplessly off course.",
        },
        diverse: {
          t: "Diverse",
          g: "poikilais · ποικίλαις",
          v: "13:9",
          s: "Many-coloured",
          d: "Used to describe a leopard’s skin: various, diversified, many colours.",
        },
        strange: {
          t: "Strange",
          g: "xenais · ξέναις",
          v: "13:9",
          s: "Foreign to the gospel",
          d: "Not previously known: unheard of, unfamiliar, foreign to the teachings of the gospel.",
        },
        foods: {
          t: "Foods",
          g: "brōmasin · βρώμασιν",
          v: "13:9",
          s: "Ceremonial meals",
          d: "Ceremonial foods and outward dietary rituals. Many held that eating or avoiding certain sacred meals was necessary to keep holy or stay right with God.",
        },
      },
      ko: {
        led: {
          t: "끌려 다니다",
          g: "parapheresthe · παραφέρεσθε",
          v: "13:9",
          s: "바람에 밀려 항로를 잃음",
          d: "갑작스러운 돌풍을 만나 어쩔 수 없이 항로에서 밀려나는 배의 모습입니다.",
        },
        diverse: {
          t: "여러 가지",
          g: "poikilais · ποικίλαις",
          v: "13:9",
          s: "얼룩덜룩함",
          d: "표범 가죽을 묘사할 때 쓰던 말로, 갖가지, 여러 갈래, 여러 빛깔을 뜻합니다.",
        },
        strange: {
          t: "이상한",
          g: "xenais · ξέναις",
          v: "13:9",
          s: "복음에 낯선",
          d: "전에 알려지지 않은 것, 처음 듣는 것, 낯선 것, 복음의 가르침과 거리가 먼 것입니다.",
        },
        foods: {
          t: "음식 규정",
          g: "brōmasin · βρώμασιν",
          v: "13:9",
          s: "의식에 쓰는 음식",
          d: "의식에 쓰는 음식과 겉으로 지키는 음식 예식입니다. 많은 사람이 어떤 거룩한 음식을 먹거나 피해야 거룩함을 지키고 하나님 앞에 바로 설 수 있다고 여겼습니다.",
        },
      },
    },
    chips: [
      {
        id: "lev16-27",
        tag: "OT",
        en: "Lev 16:27",
        ko: "레 16:27",
        ten: "And the bull for the sin offering and the goat for the sin offering, whose blood was brought in to make atonement in the Holy Place, shall be carried outside the camp. Their skin and their flesh and their dung shall be burned up with fire.",
        tko: "속죄제물로 희생된 수소와 숫염소의 피를 가져다가, 성소에서 죄를 속하는 예식을 마친 다음에는, 그것들을 진 바깥으로 끌어내고, 그 가죽과 살코기와 똥을 불에 태워야 한다.",
        wen: "The Day of Atonement offering.",
        wko: "대속죄일의 제물.",
      },
      {
        id: "heb11-13",
        tag: "NT",
        en: "Heb 11:13",
        ko: "히 11:13",
        ten: "These all died in faith, not having received the things promised, but having seen them and greeted them from afar, and having acknowledged that they were strangers and exiles on the earth.",
        tko: "이 사람들은 모두 믿음을 따라 살다가 죽었습니다. 그들은 약속하신 것을 받지는 못했지만, 그것을 멀리서 바라보고 반겼으며, 땅에서는 길손과 나그네 신세임을 고백하였습니다.",
        wen: "Strangers and exiles on the earth.",
        wko: "땅에서 길손과 나그네.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "15–19",
    en: {
      title: "A sacrifice of praise",
      quote:
        "“Through him then let us continually offer up a sacrifice of praise to God…”",
      sref: "Hebrews 13:15",
      cap: "The new sacrifices are praise on our lips, doing good and sharing what we have, and a church that works with its leaders.",
      snips: [
        "Continually offer a sacrifice of praise",
        "Do good and share: such sacrifices please God",
        "Obey your leaders; they keep watch over your souls",
        "Pray for us; we have a clear conscience",
        "Pray that I may be restored to you sooner",
      ],
      verses: [
        [
          15,
          "Through him then let us continually offer up a sacrifice of praise to God, that is, the fruit of lips that acknowledge his name.",
        ],
        [
          16,
          "Do not neglect to do good and to share what you have, for such sacrifices are pleasing to God.",
        ],
        [
          17,
          "Obey your leaders and submit to them, for they are keeping watch over your souls, as those who will have to give an account. Let them do this with joy and not with groaning, for that would be of no advantage to you.",
        ],
        [
          18,
          "Pray for us, for we are sure that we have a clear conscience, desiring to act honourably in all things.",
        ],
        [
          19,
          "I urge you the more earnestly to do this in order that I may be restored to you the sooner.",
        ],
      ],
      com: [
        ["h", "The fruit of lips"],
        [
          "p",
          "The author uses the word sacrifice in spiritual terms: worship and praise from the lips, not animal sacrifices. Under the new covenant the old system is now useless. Sacrifice now means constantly praying, singing, testifying and openly confessing Jesus as Lord, even in times of persecution and difficulty.",
        ],
        [
          "p",
          "On top of this, relationships with others matter too, so the author tells the readers to do good and share what they have. That means deep fellowship, partnership, and tangible financial and material generosity.",
        ],
        ["h", "Leaders who keep watch"],
        [
          "p",
          "Verse 17 means that church members should cooperate with and trust their pastors or leaders, because God has given them the job of protecting their spiritual lives. These leaders carry a heavy responsibility, because they will have to answer directly to God for how well they cared for the church.",
        ],
        [
          "p",
          "Church members should make the leaders’ work a joy rather than a stressful burden, because fighting against them only hurts the church’s own spiritual growth. So leaders and members need to work together, so that everyone stays safe and strong in their faith.",
        ],
      ],
    },
    ko: {
      title: "찬미의 제사",
      quote: "“…끊임없이 하나님께 찬미의 제사를 드립시다.”",
      sref: "히브리서 13:15",
      cap: "새 제사는 입술의 찬미와, 선을 행하고 가진 것을 나누는 것과, 지도자들과 함께 일하는 교회입니다.",
      snips: [
        "끊임없이 찬미의 제사를 드립시다",
        "선을 행하고 나누십시오. 하나님께서 기뻐하십니다",
        "지도자들에게 복종하십시오. 그들은 영혼을 지킵니다",
        "우리를 위해 기도해 주십시오",
        "내가 속히 돌아가도록 기도해 주십시오",
      ],
      verses: [
        [
          15,
          "그러니 우리는 예수로 말미암아 끊임없이 하나님께 찬미의 제사를 드립시다. 이것은 곧 그의 이름을 고백하는 입술의 열매입니다.",
        ],
        [
          16,
          "선을 행함과 가진 것을 나눠주기를 소홀히 하지 마십시오. 하나님께서는 이런 제사를 기뻐하십니다.",
        ],
        [
          17,
          "여러분의 지도자들의 말을 곧이듣고, 그들에게 복종하십시오. 그들은 여러분의 영혼을 지키는 사람들이요, 이 일을 장차 하나님께 보고드릴 사람들입니다. 그러므로 여러분은 그들이 기쁜 마음으로 이 일을 하게 하고, 탄식하면서 하지 않게 해 주십시오. 그들이 탄식하면서 일하는 것은 여러분에게 유익이 되지 못합니다.",
        ],
        [
          18,
          "우리를 위하여 기도해 주십시오. 우리는 양심에 거리끼는 것이 한 점도 없다고 확신합니다. 모든 일에 바르게 처신하려고 합니다.",
        ],
        [
          19,
          "내가 여러분에게 좀더 속히 돌아가게 되도록 기도하여 주시기를 더욱 간곡히 부탁드립니다.",
        ],
      ],
      com: [
        ["h", "입술의 열매"],
        [
          "p",
          "저자는 제사라는 말을 영적인 뜻으로 씁니다. 짐승 제사가 아니라 입술로 드리는 예배와 찬양입니다. 새 언약 아래에서 옛 제도는 이제 쓸모가 없습니다. 이제 제사는 박해와 어려움 가운데서도 끊임없이 기도하고, 찬양하고, 간증하고, 예수님을 주님으로 드러내어 고백하는 것입니다.",
        ],
        [
          "p",
          "그 위에 다른 사람들과의 관계도 중요하기에, 저자는 선을 행하고 가진 것을 나누라고 말합니다. 이는 깊은 교제와 동역, 그리고 실제적인 재정적, 물질적 너그러움을 뜻합니다.",
        ],
        ["h", "영혼을 지키는 지도자들"],
        [
          "p",
          "17절은 교회 성도들이 목회자나 지도자들과 협력하고 그들을 신뢰해야 한다는 뜻입니다. 하나님께서 그들에게 성도들의 영적인 삶을 지키는 일을 맡기셨기 때문입니다. 이 지도자들은 교회를 얼마나 잘 돌보았는지 하나님께 직접 보고해야 하므로 무거운 책임을 집니다.",
        ],
        [
          "p",
          "성도들은 지도자들의 일이 힘겨운 짐이 아니라 기쁨이 되게 해야 합니다. 그들과 맞서 싸우는 것은 교회 자신의 영적 성장을 해칠 뿐이기 때문입니다. 그러므로 지도자들과 성도들이 함께 일하여 모두가 믿음 안에서 안전하고 굳게 서야 합니다.",
        ],
      ],
    },
    words: { en: {}, ko: {} },
    chips: [],
  },

  {
    id: "m5",
    num: "V",
    range: "20–25",
    en: {
      title: "The God of peace",
      quote:
        "“Now may the God of peace… equip you with everything good that you may do his will…”",
      sref: "Hebrews 13:20–21",
      cap: "A closing blessing from the God who raised Jesus, the great shepherd, and greetings to the church, likely in Rome.",
      snips: [
        "The God of peace brought again the great shepherd",
        "May he equip you with everything good to do his will",
        "Bear with my word of exhortation",
        "Timothy has been released",
        "Those from Italy send greetings",
        "Grace be with all of you",
      ],
      verses: [
        [
          20,
          "Now may the God of peace who brought again from the dead our Lord Jesus, the great shepherd of the sheep, by the blood of the eternal covenant,",
        ],
        [
          21,
          "equip you with everything good that you may do his will, working in us that which is pleasing in his sight, through Jesus Christ, to whom be glory forever and ever. Amen.",
        ],
        [
          22,
          "I appeal to you, brothers, bear with my word of exhortation, for I have written to you briefly.",
        ],
        [
          23,
          "You should know that our brother Timothy has been released, with whom I shall see you if he comes soon.",
        ],
        [
          24,
          "Greet all your leaders and all the saints. Those who come from Italy send you greetings.",
        ],
        [25, "Grace be with all of you."],
      ],
      com: [
        ["h", "A blessing"],
        [
          "p",
          "Verses 20–21 are a blessing on the readers: a prayer that God, who raised Jesus Christ from the dead, may equip believers with everything good to fulfil his will through Jesus Christ.",
        ],
        ["h", "Timothy and Italy"],
        [
          "p",
          "There are also clues that the readers knew who Timothy was, a very close disciple of Paul, like a son, because the author mentions his release from prison. The author also says that those from Italy send greetings, which suggests the readers were Jewish Christians living in Rome.",
        ],
      ],
    },
    ko: {
      title: "평화의 하나님",
      quote:
        "“…평화의 하나님이 여러분을 온갖 좋은 일에 어울리게 다듬질해 주셔서 자기의 뜻을 행하게 해 주시기를 빕니다.”",
      sref: "히브리서 13:20–21",
      cap: "위대한 목자 예수를 살리신 하나님께서 주시는 마지막 축복, 그리고 아마도 로마에 있는 교회에 보내는 문안.",
      snips: [
        "평화의 하나님이 위대한 목자를 이끌어내셨습니다",
        "온갖 좋은 일에 어울리게 하셔서 그분의 뜻을 행하게 하시기를",
        "이 권면의 말을 받아들이십시오",
        "디모데가 풀려났습니다",
        "이탈리아에서 온 사람들이 문안합니다",
        "여러분 모두에게 은혜가 있기를 빕니다",
      ],
      verses: [
        [
          20,
          "영원한 언약의 피를 흘려서 양들의 위대한 목자가 되신 우리 주 예수를 죽은 사람들 가운데서 이끌어내신 평화의 하나님이",
        ],
        [
          21,
          "여러분을 온갖 좋은 일에 어울리게 다듬질해 주셔서 자기의 뜻을 행하게 해 주시기를 빕니다. 또 하나님께서 예수 그리스도로 말미암아 우리 가운데 자기가 기뻐하시는 바를 이루시기를 빕니다. 예수 그리스도께 영광이 영원무궁히 있기를 빕니다. 아멘.",
        ],
        [
          22,
          "형제자매 여러분, 부디 이 권면의 말을 받아들이기를 권유합니다. 나는 여러분에게 짤막하게 썼습니다.",
        ],
        [
          23,
          "우리 형제 디모데가 풀려나온 것을 알려드립니다. 그가 속히 오면, 내가 그와 함께 여러분을 만나보게 될 것입니다.",
        ],
        [
          24,
          "여러분의 모든 지도자와 성도에게 문안하여 주십시오. 이탈리아에서 온 사람들이 여러분에게 문안합니다.",
        ],
        [25, "여러분 모두에게 은혜가 있기를 빕니다."],
      ],
      com: [
        ["h", "축복"],
        [
          "p",
          "20–21절은 독자들을 위한 축복입니다. 예수 그리스도를 죽은 사람들 가운데서 살리신 하나님께서, 믿는 사람들이 예수 그리스도를 통해 하나님의 뜻을 이루도록 온갖 좋은 것으로 갖추어 주시기를 비는 기도입니다.",
        ],
        ["h", "디모데와 이탈리아"],
        [
          "p",
          "저자가 디모데가 감옥에서 풀려났다고 말하는 것을 보면, 독자들은 바울의 아들 같은 아주 가까운 제자 디모데를 알고 있었던 것 같습니다. 또 저자는 이탈리아에서 온 사람들이 문안한다고 말하는데, 이는 독자들이 로마에 사는 유대 그리스도인들이었음을 짐작하게 합니다.",
        ],
      ],
    },
    words: { en: {}, ko: {} },
    chips: [],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "Life together",
        items: [
          [
            "1–6",
            "Love one another as family, welcome strangers, remember prisoners, honour marriage and be content without love of money. The Lord will never leave you; he is your helper.",
          ],
          [
            "7–8",
            "Remember the leaders who taught you and imitate their faith. They may not stay, but Jesus Christ is the same yesterday, today and forever.",
          ],
          [
            "9–14",
            "The heart is strengthened by grace, not ceremonial foods. Jesus suffered outside the gate, so go to him outside the camp and seek the city to come.",
          ],
        ],
      },
      {
        h: "Worship and farewell",
        items: [
          [
            "15–19",
            "Offer the sacrifice of praise, do good and share what you have, and let your leaders keep watch over you with joy.",
          ],
          [
            "20–25",
            "The God of peace who raised the great shepherd equips you to do his will. Timothy is released, and those from Italy send greetings.",
          ],
        ],
      },
    ],
    intentH: "Author’s intent",
    intentShort:
      "To close the letter with practical instructions for a community under persecution: keep loving one another, trust the Lord who never leaves, be strengthened by grace rather than strange teachings, and go to Jesus outside the camp with a sacrifice of praise.",
    intent: [
      "The author turns to how the readers should live together. Brotherly love, hospitality and care for prisoners recall what they once did in the earlier days (10:32–34), and they must not become spiritually dull. Marriage is to be kept holy against both pagan asceticism and normalised immorality.",
      "Many had lost property and felt financial anxiety, but love of money is also a sign of fear. The God who never left Joshua and who rescued the king of Psalm 118 is their helper too. Their leaders may be gone, some perhaps martyred, but Jesus Christ is always the same.",
      "True holiness is no longer found in the earthly Most Holy Place or in ceremonial foods, but in Jesus, who suffered outside the gate. So the readers are to go to him outside the camp, bear his reproach, and offer the new sacrifices of praise, doing good and sharing, as they seek the city that is to come.",
    ],
  },
  ko: {
    groups: [
      {
        h: "함께 사는 삶",
        items: [
          [
            "1–6절",
            "가족처럼 서로 사랑하고, 나그네를 대접하고, 갇힌 사람들을 기억하고, 혼인을 귀하게 여기고, 돈을 사랑하지 말고 만족하십시오. 주님께서 결코 떠나지 않으시고 도우십니다.",
          ],
          [
            "7–8절",
            "말씀을 일러준 지도자들을 기억하고 그 믿음을 본받으십시오. 그들은 늘 머물지 못해도 예수 그리스도는 어제나 오늘이나 영원히 한결같으십니다.",
          ],
          [
            "9–14절",
            "마음은 의식의 음식이 아니라 은혜로 튼튼해집니다. 예수께서 성문 밖에서 고난을 받으셨으니, 진영 밖으로 그분께 나아가 장차 올 도시를 찾으십시오.",
          ],
        ],
      },
      {
        h: "예배와 작별 인사",
        items: [
          [
            "15–19절",
            "찬미의 제사를 드리고, 선을 행하고 가진 것을 나누고, 지도자들이 기쁨으로 여러분을 지키게 하십시오.",
          ],
          [
            "20–25절",
            "위대한 목자를 살리신 평화의 하나님께서 그분의 뜻을 행하도록 갖추어 주십니다. 디모데가 풀려났고, 이탈리아에서 온 사람들이 문안합니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "박해받는 공동체에게 실제적인 가르침으로 편지를 맺는 것. 서로 사랑하기를 계속하고, 결코 떠나지 않으시는 주님을 신뢰하고, 이상한 교훈이 아니라 은혜로 튼튼해지고, 찬미의 제사를 드리며 진영 밖의 예수께 나아가라는 것.",
    intent: [
      "저자는 독자들이 어떻게 함께 살아야 하는지로 넘어갑니다. 서로 사랑하고, 나그네를 대접하고, 갇힌 사람들을 돌보는 일은 그들이 처음 시절에 했던 일을 떠올리게 하며(10:32–34), 그들은 영적으로 둔해져서는 안 됩니다. 혼인은 이방의 금욕주의와 당연시된 부도덕 모두에 맞서 거룩하게 지켜야 합니다.",
      "많은 사람이 재산을 잃고 돈 걱정을 했지만, 돈을 사랑하는 것은 두려움의 표시이기도 합니다. 여호수아를 결코 떠나지 않으시고 시편 118편의 왕을 구하신 하나님께서 그들도 도우십니다. 그들의 지도자들은 떠났고 어떤 이들은 순교했을지 모르지만, 예수 그리스도께서는 언제나 한결같으십니다.",
      "참된 거룩함은 더 이상 땅의 지성소나 의식의 음식에 있지 않고, 성문 밖에서 고난을 받으신 예수님께 있습니다. 그러므로 독자들은 진영 밖으로 그분께 나아가 그분의 치욕을 짊어지고, 장차 올 도시를 찾으며, 찬미와 선행과 나눔이라는 새 제사를 드려야 합니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 13",
    tagline: "“Jesus Christ is the same yesterday and today and forever.”",
    taglineRef: "Hebrews 13:8",
    mapTitle: "Twenty-five verses, five movements",
    mapIntro:
      "The letter ends with how to live: love as a family, be content, remember your leaders and hold to the Christ who never changes. Holiness is found with Jesus outside the camp, and its sacrifices are now praise, good works and sharing. A blessing and greetings close the word of exhortation.",
    summaryTitle: "What Hebrews 13 says",
    footQuote: "“Grace be with all of you.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 13장",
    tagline:
      "“예수 그리스도께서는 어제나 오늘이나 영원히 한결같은 분이십니다.”",
    taglineRef: "히브리서 13:8",
    mapTitle: "스물다섯 절, 다섯 흐름",
    mapIntro:
      "편지는 어떻게 살아야 하는지로 끝맺습니다. 가족처럼 사랑하고, 만족하고, 지도자들을 기억하고, 변하지 않으시는 그리스도를 붙드십시오. 거룩함은 진영 밖의 예수님께 있고, 이제 그 제사는 찬미와 선행과 나눔입니다. 축복과 문안으로 이 권면의 말이 끝납니다.",
    summaryTitle: "히브리서 13장이 말하는 것",
    footQuote: "“여러분 모두에게 은혜가 있기를 빕니다.”",
    version: "새번역",
  },
};

export const chapter13: ChapterContent = {
  number: 13,
  copy: COPY,
  movements: MV,
  summary: SUM,
};
