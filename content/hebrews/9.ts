import type {
  Appendix,
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
    range: "1–5",
    scene: "holyPlaces",
    art: "3D · R3F — one sheet of beaten gold: the lampstand, the table, the second curtain, the altar of incense and the ark rise out of the metal in turn under a moving lamp, and the urn, the budded staff and the tablets show inside the ark.",
    en: {
      title: "An earthly place of holiness",
      quote:
        "“Behind the second curtain was a second section called the Most Holy Place.”",
      sref: "Hebrews 9:3",
      cap: "Scene: the furnishings of the two rooms rise out of the gold one by one, with the curtain standing between them.",
      snips: [
        "Even the first covenant had an earthly place of holiness",
        "The Holy Place: the lampstand, the table and the bread",
        "The Most Holy Place, behind the second curtain",
        "The altar of incense, and the ark with the urn, the staff and the tablets",
        "The cherubim of glory over the mercy seat",
      ],
      verses: [
        [
          1,
          "Now even the first covenant had regulations for worship and an [earthly|earthly place of holiness].",
        ],
        [
          2,
          "For a tent was prepared, the first section, in which were the lampstand and the table and the bread of the Presence. It is called the [holy|Holy Place].",
        ],
        [
          3,
          "Behind the second curtain was a second section called the [mostHoly|Most Holy Place],",
        ],
        [
          4,
          "having the golden altar of incense and the ark of the covenant covered on all sides with gold, in which was a golden urn holding the manna, and [staff|Aaron’s staff that budded], and the tablets of the covenant.",
        ],
        [
          5,
          "Above it were the cherubim of glory overshadowing the [mercy|mercy seat]. Of these things we cannot now speak in detail.",
        ],
      ],
      com: [
        ["h", "The first section"],
        [
          "p",
          "Exodus 25 gives Moses God’s instructions for the ark, the table and the lampstand, and Exodus 26 the building of the tabernacle. The table stood on the north side outside the curtain with the lampstand opposite it on the south (Exodus 26:35). The lampstand’s light symbolised God’s eternal light and spiritual illumination. The twelve loaves, replaced every Sabbath, symbolised continuous fellowship and sustenance before God.",
        ],
        ["h", "Behind the curtain"],
        [
          "p",
          "A curtain separated the Holy Place from the Most Holy Place, and it was entered only once a year on the Day of Atonement. The altar of incense represents acceptable prayer rising to God (Psalm 141:2; Revelation 8:3–4). At the mercy seat, blood was sprinkled on the Day of Atonement to satisfy the demands of the law, turning wrath into grace (Leviticus 16:14–16; Romans 3:25–26).",
        ],
        ["h", "What the ark held"],
        [
          "p",
          "The golden urn of manna recalls God providing bread from heaven for Israel (Exodus 16:31–34; John 6:48–51). Aaron’s staff shows God’s choice of the priestly line: a staff is dead wood, but budding means it is alive again, life brought out of death (Numbers 17:8–10). The stone tablets represent the holy standard of God’s moral law (Exodus 25:16).",
        ],
      ],
    },
    ko: {
      title: "세상에 속한 성소",
      quote: "“그리고 둘째 휘장 뒤에는, '지성소'라고 하는 장막이 있었습니다.”",
      sref: "히브리서 9:3",
      cap: "장면: 두 칸의 기구들이 금판에서 하나씩 솟아오르고, 그 사이에 휘장이 서 있습니다.",
      snips: [
        "첫 번째 언약에도 세상에 속한 성소가 있었습니다",
        "성소: 촛대와 상과 빵",
        "둘째 휘장 뒤의 지성소",
        "분향제단, 그리고 항아리와 지팡이와 돌판이 든 언약궤",
        "속죄판을 덮은 영광의 그룹들",
      ],
      verses: [
        [
          1,
          "첫 번째 언약에도 예배 규정과 [earthly|세상에 속한 성소]가 마련되어 있었습니다.",
        ],
        [
          2,
          "한 장막을 지었는데, 곧 첫째 칸에 해당하는 장막입니다. 그 안에는 촛대와 상이 있고, 빵을 차려 놓았으니, 이 곳을 '[holy|성소]'라고 하였습니다.",
        ],
        [
          3,
          "그리고 둘째 휘장 뒤에는, '[mostHoly|지성소]'라고 하는 장막이 있었습니다.",
        ],
        [
          4,
          "거기에는 금으로 만든 분향제단과 온통 금으로 입힌 언약궤가 있고, 그 안에는 만나를 담은 금항아리와 [staff|싹이 난 아론의 지팡이]와 언약을 새긴 두 돌판이 들어 있었습니다.",
        ],
        [
          5,
          "그리고 그 언약궤 위에는 영광에 빛나는 그룹들이 있어서, [mercy|속죄판]을 그 날개로 내리덮고 있었습니다. 지금은 이것들을 자세히 말할 때가 아닙니다.",
        ],
      ],
      com: [
        ["h", "첫째 칸"],
        [
          "p",
          "출애굽기 25장은 하나님께서 모세에게 언약궤와 상과 촛대에 관해 주신 지시를, 26장은 성막을 짓는 일을 보여 줍니다. 상은 휘장 바깥 북쪽에, 촛대는 그 맞은편 남쪽에 놓았습니다(출 26:35). 촛대의 빛은 하나님의 영원한 빛과 영적인 깨우침을 상징했습니다. 안식일마다 새로 차린 열두 덩이 빵은 하나님 앞에서 이어지는 교제와 공급을 상징했습니다.",
        ],
        ["h", "휘장 뒤"],
        [
          "p",
          "휘장은 성소와 지성소를 나누었고, 지성소에는 한 해에 한 번 속죄일에만 들어갈 수 있었습니다. 분향제단은 하나님께 올라가는 합당한 기도를 나타냅니다(시 141:2; 계 8:3–4). 속죄판에는 속죄일에 피를 뿌려 율법의 요구를 채웠고, 진노가 은혜로 바뀌었습니다(레 16:14–16; 롬 3:25–26).",
        ],
        ["h", "언약궤 안에 있던 것"],
        [
          "p",
          "만나를 담은 금항아리는 하나님께서 이스라엘에게 하늘에서 양식을 주신 일을 떠올리게 합니다(출 16:31–34; 요 6:48–51). 아론의 지팡이는 하나님께서 택하신 제사장 계통을 보여 줍니다. 지팡이는 죽은 나무이지만 싹이 났다는 것은 다시 살아났다는 뜻이니, 죽음에서 생명이 나온 것입니다(민 17:8–10). 돌판은 하나님의 도덕법이라는 거룩한 기준을 나타냅니다(출 25:16).",
        ],
      ],
    },
    words: {
      en: {
        earthly: {
          t: "Earthly place of holiness",
          g: "to te hagion kosmikon · τό τε ἅγιον κοσμικόν",
          v: "9:1",
          s: "Part of this creation",
          d: "A sanctuary belonging to this world, made by people from physical materials, and so part of this creation.",
        },
        holy: {
          t: "Holy Place",
          g: "hagia · Ἅγια",
          v: "9:2",
          s: "The first section",
          d: "성소, the first room of the tent, where the priests served daily.",
        },
        mostHoly: {
          t: "Most Holy Place",
          g: "hagia hagiōn · Ἅγια Ἁγίων",
          v: "9:3",
          s: "Behind the curtain",
          d: "지성소, the second room behind the curtain, entered only once a year on the Day of Atonement.",
        },
        staff: {
          t: "Aaron’s staff that budded",
          g: "hē rhabdos Aarōn · ἡ ῥάβδος Ἀαρὼν",
          v: "9:4",
          s: "Life from death",
          d: "A staff is dead wood, but budding means it is alive again. It marked God’s choice of the priestly line, which brings life out of death.",
        },
        mercy: {
          t: "Mercy seat",
          g: "to hilastērion · τὸ ἱλαστήριον",
          v: "9:5",
          s: "Where blood was sprinkled",
          d: "The place where blood was sprinkled on the Day of Atonement to satisfy the demands of the law, turning wrath into grace.",
        },
      },
      ko: {
        earthly: {
          t: "세상에 속한 성소",
          g: "to te hagion kosmikon · τό τε ἅγιον κοσμικόν",
          v: "9:1",
          s: "이 피조 세계의 일부",
          d: "이 세상에 속한 성소. 사람이 물질로 지은 것이어서 이 피조 세계의 일부입니다.",
        },
        holy: {
          t: "성소",
          g: "hagia · Ἅγια",
          v: "9:2",
          s: "첫째 칸",
          d: "장막의 첫째 칸. 제사장들이 날마다 섬기던 곳입니다.",
        },
        mostHoly: {
          t: "지성소",
          g: "hagia hagiōn · Ἅγια Ἁγίων",
          v: "9:3",
          s: "휘장 뒤",
          d: "휘장 뒤의 둘째 칸. 한 해에 한 번 속죄일에만 들어갈 수 있었습니다.",
        },
        staff: {
          t: "싹이 난 아론의 지팡이",
          g: "hē rhabdos Aarōn · ἡ ῥάβδος Ἀαρὼν",
          v: "9:4",
          s: "죽음에서 나온 생명",
          d: "지팡이는 죽은 나무이지만 싹이 났다는 것은 다시 살아났다는 뜻입니다. 죽음에서 생명을 내는 제사장 계통을 하나님께서 택하셨음을 보여 줍니다.",
        },
        mercy: {
          t: "속죄판",
          g: "to hilastērion · τὸ ἱλαστήριον",
          v: "9:5",
          s: "피를 뿌리던 곳",
          d: "속죄일에 피를 뿌려 율법의 요구를 채우고, 진노를 은혜로 바꾸던 곳입니다.",
        },
      },
    },
    chips: [
      {
        id: "exo26-33",
        tag: "OT",
        en: "Exod 26:33",
        ko: "출 26:33",
        ten: "And you shall hang the veil from the clasps, and bring the ark of the testimony in there within the veil. And the veil shall separate for you the Holy Place from the Most Holy.",
        tko: "너는 그 휘장을 갈고리에 걸어서 늘어뜨리고, 그 휘장 뒤에 증거궤를 들여 놓아라. 그 휘장이 너희에게 성소와 지성소를 구별할 수 있게 할 것이다.",
        wen: "The curtain that divides the two rooms.",
        wko: "두 칸을 나누는 휘장.",
      },
      {
        id: "num17-8",
        tag: "OT",
        en: "Num 17:8",
        ko: "민 17:8",
        ten: "On the next day Moses went into the tent of the testimony, and behold, the staff of Aaron for the house of Levi had sprouted and put forth buds and produced blossoms, and it bore ripe almonds.",
        tko: "이튿날이 되어, 모세가 증거의 장막 안으로 들어갔다. 레위 집안 아론의 지팡이에는 움이 돋았을 뿐 아니라, 싹이 나고, 꽃이 피고, 감복숭아 열매까지 맺은 것이 아닌가!",
        wen: "Dead wood alive again, kept in the ark.",
        wko: "다시 살아난 죽은 나무, 언약궤 안에 간직됨.",
      },
      {
        id: "jhn6-51",
        tag: "NT",
        en: "John 6:51",
        ko: "요 6:51",
        ten: "I am the living bread that came down from heaven. If anyone eats of this bread, he will live forever. And the bread that I will give for the life of the world is my flesh.",
        tko: "나는 하늘에서 내려온 살아 있는 빵이다. 이 빵을 먹는 사람은 누구나 영원히 살 것이다. 내가 줄 빵은 나의 살이다. 그것은 세상에 생명을 준다.",
        wen: "The bread from heaven that the manna pointed to.",
        wko: "만나가 가리키던 하늘의 빵.",
      },
      {
        id: "psa141-2",
        tag: "OT",
        en: "Ps 141:2",
        ko: "시 141:2",
        ten: "Let my prayer be counted as incense before you, and the lifting up of my hands as the evening sacrifice!",
        tko: "내 기도를 주님께 드리는 분향으로 받아 주시고, 손을 위로 들고서 드리는 기도는 저녁 제물로 받아 주십시오.",
        wen: "Incense as prayer rising to God.",
        wko: "하나님께 올라가는 기도인 분향.",
      },
      {
        id: "rev8-4",
        tag: "NT",
        en: "Rev 8:4",
        ko: "계 8:4",
        ten: "and the smoke of the incense, with the prayers of the saints, rose before God from the hand of the angel.",
        tko: "그래서 향의 연기가 성도들의 기도와 함께 천사의 손으로부터 하나님 앞으로 올라갔습니다.",
        wen: "Incense rising with the prayers of the saints.",
        wko: "성도들의 기도와 함께 올라가는 향.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "6–10",
    scene: "notYet",
    art: "3D · R3F — gold relief of the first room: priests pace before the lampstand and the table while tally marks mount along the top. Once, the high priest passes behind the curtain with blood and comes back; one scarlet mark is added, and the curtain stays shut.",
    en: {
      title: "The way not yet opened",
      quote:
        "“…the way into the holy places is not yet opened as long as the first section is still standing.”",
      sref: "Hebrews 9:8",
      cap: "Scene: the priests come and go every day, the high priest goes behind the curtain once a year, and the way stays shut.",
      snips: [
        "The priests go in regularly",
        "The high priest goes in once a year, and not without blood",
        "The way is not yet opened, the Holy Spirit indicates",
        "Gifts that cannot perfect the conscience",
        "Regulations for the body until the time of reformation",
      ],
      verses: [
        [
          6,
          "These preparations having thus been made, the priests go regularly into the first section, performing their ritual duties,",
        ],
        [
          7,
          "but into the second only the high priest goes, and he but once a year, and not without taking blood, which he offers for himself and for the [unintentional|unintentional sins] of the people.",
        ],
        [
          8,
          "By this the Holy Spirit indicates that the way into the holy places is not yet opened as long as the first section is still standing",
        ],
        [
          9,
          "(which is [symbolic|symbolic] for the present age). According to this arrangement, gifts and sacrifices are offered that cannot [perfect|perfect] the [conscience|conscience] of the worshiper,",
        ],
        [
          10,
          "but deal only with food and drink and various washings, regulations for the body imposed until the [reformation|time of reformation].",
        ],
      ],
      com: [
        ["h", "Daily and yearly"],
        [
          "p",
          "Both the priests and the high priests entered the first section daily, morning and evening (Exodus 30:7–8). The priests mainly did the work, with the high priests overseeing. Then once a year, on the Day of Atonement, the high priest offered the annual atonement with the blood of the sin offering (Exodus 30:10; Leviticus 16:2–15).",
        ],
        ["h", "The Holy Spirit in the Old Testament"],
        [
          "p",
          "The author brings in the role of the Holy Spirit. He was part of the Old Testament, we just didn’t know. In Exodus 31:1–3 God filled Bezalel with the Spirit of God to construct the tabernacle, so that the physical construction matched God’s design. The Spirit raised these structures as a prophetic signpost for the better things to come, and he helps people understand what the Old Testament means today.",
        ],
        [
          "p",
          "So the Father commanded the Israelites, Jesus Christ fulfilled it by dying on the cross, and the Holy Spirit explains it to our hearts. The Trinity was working from the beginning.",
        ],
        ["h", "Why the way was not yet open"],
        [
          "p",
          "This is why we needed the Old Testament. The rooms hosted a system of food, drink and cleansing ceremonies, in effect only until a better system could be established. Because these rituals were entirely external, they were never designed to make the worshiper’s inner conscience perfect. Even the high priest’s entry into God’s presence was temporary, not a permanent solution.",
        ],
      ],
    },
    ko: {
      title: "아직 드러나지 않은 길",
      quote:
        "“첫째 칸 장막이 서 있는 동안에는 아직 지성소로 들어가는 길이 드러나지 않았음을…”",
      sref: "히브리서 9:8",
      cap: "장면: 제사장들은 날마다 드나들고 대제사장은 한 해에 한 번 휘장 뒤로 들어가지만, 길은 닫혀 있습니다.",
      snips: [
        "제사장들은 언제나 들어갑니다",
        "대제사장만 일 년에 한 번, 피를 가지고 들어갑니다",
        "성령께서 아직 길이 드러나지 않았음을 보여 주십니다",
        "양심을 완전하게 해 주지 못하는 예물과 제사",
        "개혁의 때까지 부과된 육체의 규칙들",
      ],
      verses: [
        [
          6,
          "이것들이 이렇게 마련되어 있어서 첫째 칸 장막에는 제사장들이 언제나 들어가서 제사의식을 집행합니다.",
        ],
        [
          7,
          "그러나 둘째 칸 장막에는 대제사장만 일 년에 한 번만 들어가는데, 그 때에는 반드시 자기 자신을 위하여, 또 백성이 [unintentional|모르고 지은 죄]를 사하기 위하여 바칠 피를 가지고 들어갑니다.",
        ],
        [
          8,
          "이것은 첫째 칸 장막이 서 있는 동안에는 아직 지성소로 들어가는 길이 드러나지 않았음을 성령께서 보여 주시는 것입니다.",
        ],
        [
          9,
          "이 장막은 현 시대를 [symbolic|상징합니다]. 그 장막 제의를 따라 예물과 제사를 드리지만, 그것이 의식 집례자의 [conscience|양심]을 [perfect|완전하게] 해 주지는 못합니다.",
        ],
        [
          10,
          "이런 것은 다만 먹는 것과 마시는 것과 여러 가지 씻는 예식과 관련된 것이고, [reformation|개혁의 때]까지 육체를 위하여 부과된 규칙들입니다.",
        ],
      ],
      com: [
        ["h", "날마다, 해마다"],
        [
          "p",
          "제사장들과 대제사장들은 날마다 아침저녁으로 첫째 칸에 들어갔습니다(출 30:7–8). 일은 주로 제사장들이 맡았고 대제사장들은 감독했습니다. 그리고 한 해에 한 번 속죄일에 대제사장이 속죄제물의 피를 가지고 해마다의 속죄를 드렸습니다(출 30:10; 레 16:2–15).",
        ],
        ["h", "구약의 성령"],
        [
          "p",
          "저자는 성령의 역할을 소개합니다. 성령께서는 구약에도 함께 계셨는데, 우리가 몰랐을 뿐입니다. 출애굽기 31:1–3에서 하나님은 브살렐에게 하나님의 영을 채워 성막을 짓게 하셔서, 실제 건축이 하나님의 설계와 꼭 맞도록 하셨습니다. 성령께서는 이 구조물을 앞으로 올 더 좋은 것들을 가리키는 예언적 표지판으로 세우셨고, 오늘날에도 구약의 뜻을 사람들이 깨닫도록 도우십니다.",
        ],
        [
          "p",
          "그러므로 성부께서는 이스라엘에게 명령하셨고, 예수 그리스도께서는 십자가에서 죽으심으로 이루셨으며, 성령께서는 그것을 우리 마음에 깨닫게 하십니다. 삼위일체 하나님은 처음부터 일하고 계셨습니다.",
        ],
        ["h", "길이 아직 열리지 않은 이유"],
        [
          "p",
          "이것이 우리에게 구약이 필요했던 이유입니다. 그 방들에서 행한 제도는 먹고 마시는 것과 씻는 예식이었고, 더 좋은 제도가 세워질 때까지만 유효했습니다. 이 의식들은 전적으로 외적인 것이어서 예배자의 내면의 양심을 완전하게 할 수 없었습니다. 대제사장이 하나님 앞에 들어간 것조차 잠시였고, 영구한 해결책이 아니었습니다.",
        ],
      ],
    },
    words: {
      en: {
        unintentional: {
          t: "Unintentional sins",
          g: "agnoēmatōn · ἀγνοημάτων",
          v: "9:7",
          s: "Done without knowing",
          d: "Mistakes due to not knowing: sins or offenses committed without full awareness or deliberate intent, wrongs done through lack of knowledge or understanding.",
        },
        symbolic: {
          t: "Symbolic",
          g: "parabolē · παραβολή",
          v: "9:9",
          s: "Placed beside",
          d: "To place or lay something beside something else for the purpose of comparison.",
        },
        perfect: {
          t: "Perfect",
          g: "teleiōsai · τελειῶσαι",
          v: "9:9",
          s: "Brought to completion",
          d: "Brought to completion, fully cured or completely satisfied. A perfect conscience is a heart that feels totally forgiven, clean and at peace with God, with no lingering sense of condemnation.",
        },
        conscience: {
          t: "Conscience",
          g: "syneidēsin · συνείδησιν",
          v: "9:9",
          s: "Inner awareness",
          d: "Inner, moral awareness of right and wrong.",
        },
        reformation: {
          t: "Time of reformation",
          g: "kairou diorthōseōs · καιροῦ διορθώσεως",
          v: "9:10",
          s: "Until a better system",
          d: "NLT: “physical regulations that were in effect only until a better system could be established.”",
        },
      },
      ko: {
        unintentional: {
          t: "모르고 지은 죄",
          g: "agnoēmatōn · ἀγνοημάτων",
          v: "9:7",
          s: "알지 못하고 지은 잘못",
          d: "알지 못해서 저지른 잘못. 충분히 알지 못하거나 고의 없이 지은 죄, 지식이나 이해가 부족해서 행한 잘못입니다.",
        },
        symbolic: {
          t: "상징",
          g: "parabolē · παραβολή",
          v: "9:9",
          s: "나란히 놓음",
          d: "비교하려고 어떤 것을 다른 것 옆에 나란히 놓는다는 뜻입니다.",
        },
        perfect: {
          t: "완전하게",
          g: "teleiōsai · τελειῶσαι",
          v: "9:9",
          s: "완성에 이름",
          d: "완성에 이르게 함, 온전히 낫거나 완전히 만족시킴. 완전한 양심은 온전히 용서받아 깨끗하고 하나님과 평안을 누리며, 정죄감이 남아 있지 않은 마음입니다.",
        },
        conscience: {
          t: "양심",
          g: "syneidēsin · συνείδησιν",
          v: "9:9",
          s: "내면의 분별",
          d: "옳고 그름에 대한 내면의 도덕적 분별입니다.",
        },
        reformation: {
          t: "개혁의 때",
          g: "kairou diorthōseōs · καιροῦ διορθώσεως",
          v: "9:10",
          s: "더 좋은 제도가 올 때까지",
          d: "더 좋은 제도가 세워질 때까지만 유효한 육체의 규정이라는 뜻입니다.",
        },
      },
    },
    chips: [
      {
        id: "exo30-10",
        tag: "OT",
        en: "Exod 30:10",
        ko: "출 30:10",
        ten: "Aaron shall make atonement on its horns once a year. With the blood of the sin offering of atonement he shall make atonement for it once in the year throughout your generations. It is most holy to the LORD.",
        tko: "아론은 분향단 뿔에 한 해에 한 번씩 속죄예식을 하여야 하고, 한 해에 한 번씩 속죄의 피를 발라서 분향단을 속죄하여야 한다. 너희는 대대로 이와 같이 하여라. 이것은 주에게 가장 거룩한 것이다.",
        wen: "Once a year, and always with blood.",
        wko: "한 해에 한 번, 언제나 피로.",
      },
      {
        id: "lev16-15",
        tag: "OT",
        en: "Lev 16:15",
        ko: "레 16:15",
        ten: "Then he shall kill the goat of the sin offering that is for the people and bring its blood inside the veil and do with its blood as he did with the blood of the bull, sprinkling it over the mercy seat and in front of the mercy seat.",
        tko: "이어서 아론은 백성이 속죄제물로 바친 숫염소를 잡아, 그 피를 휘장 안으로 가지고 들어가서, 수소의 피를 뿌릴 때와 마찬가지로, 덮개 너머와 덮개 앞에 뿌려야 한다.",
        wen: "The Day of Atonement behind the curtain.",
        wko: "휘장 안에서 드린 속죄일.",
      },
      {
        id: "exo31-3",
        tag: "OT",
        en: "Exod 31:3",
        ko: "출 31:3",
        ten: "and I have filled him with the Spirit of God, with ability and intelligence, with knowledge and all craftsmanship,",
        tko: "그에게 하나님의 영을 채워 주어, 지혜와 총명과 지식과 온갖 기술을 갖추게 하겠다.",
        wen: "Bezalel, filled with the Spirit to build the tabernacle.",
        wko: "성막을 짓도록 영으로 채워진 브살렐.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "11–14",
    scene: "onceForAll",
    art: "3D · R3F — a figure of pure light crosses the gold, leaving one scarlet line on the floor. The curtain draws back and stays open, a single drop falls on the mercy seat, and rings of light go out from it. Christ is shown only as light.",
    en: {
      title: "Once for all",
      quote:
        "“…how much more will the blood of Christ… purify our conscience from dead works to serve the living God.”",
      sref: "Hebrews 9:14",
      cap: "Scene: one line of scarlet crosses the gold, the curtain opens and does not close, and the blood falls once.",
      snips: [
        "Christ came through the greater tent, not made with hands",
        "He entered once for all by his own blood",
        "Animal blood purified the flesh",
        "How much more will his blood purify our conscience",
      ],
      verses: [
        [
          11,
          "But when Christ appeared as a high priest of the good things that have come, then through the greater and more perfect tent (not made with hands, that is, not of this creation)",
        ],
        [
          12,
          "he entered [onceForAll|once for all] into the holy places, not by means of the blood of goats and calves but by means of his own blood, thus securing an [redemption|eternal redemption].",
        ],
        [
          13,
          "For if the blood of goats and bulls, and the sprinkling of defiled persons with the ashes of a heifer, sanctify for the purification of the flesh,",
        ],
        [
          14,
          "how much more will the blood of Christ, who through the [spirit|eternal Spirit] offered himself without blemish to God, purify our conscience from [deadWorks|dead works] to serve the living God.",
        ],
      ],
      com: [
        ["h", "Not made with hands"],
        [
          "p",
          "The main difference the author points out is that Jesus, as the sacrifice, did not pour or sprinkle his blood in an area made by human hands. Although Jesus was crucified on the cross, spiritually his blood was offered into heaven (verse 24).",
        ],
        ["h", "Outside and inside"],
        [
          "p",
          "Earthly high priests offered daily and annual offerings to seek forgiveness for a time, through external washings and ceremonies. Blood offered by people was temporary and only purified the outside. Jesus entered once for all into heaven and purified us. His blood purifies the inner life.",
        ],
        [
          "p",
          "Humankind made sin, and human sin cannot be cleansed by human effort.",
        ],
        ["h", "Dead works"],
        [
          "p",
          "Verse 13 says the blood of goats and bulls only purified the outer flesh. The blood of Jesus Christ purifies the inner self from dead works: the repetitive human effort of trying to remove guilt and fix ourselves spiritually.",
        ],
      ],
    },
    ko: {
      title: "단 한 번에",
      quote: "“…그리스도의 피야말로, 더욱더 우리들의 양심을 깨끗하게 해서…”",
      sref: "히브리서 9:14",
      cap: "장면: 한 줄기 붉은 선이 금판을 가로지르고, 휘장이 열려 다시 닫히지 않으며, 피가 단 한 번 떨어집니다.",
      snips: [
        "그리스도께서 손으로 만들지 않은 더 큰 장막을 통과하셨습니다",
        "자기의 피로써 단 한 번에 지성소에 들어가셨습니다",
        "짐승의 피는 육체를 깨끗하게 했습니다",
        "그리스도의 피는 더욱더 우리 양심을 깨끗하게 합니다",
      ],
      verses: [
        [
          11,
          "그러나 그리스도께서는 이미 일어난 좋은 일을 주관하시는 대제사장으로 오셔서 손으로 만들지 않은 장막, 다시 말하면, 이 피조물에 속하지 않은 더 크고 더 완전한 장막을 통과하여",
        ],
        [
          12,
          "[onceForAll|단 한 번에] 지성소에 들어가셨습니다. 그는 염소나 송아지의 피로써가 아니라, 자기의 피로써, 우리에게 [redemption|영원한 구원]을 이루셨습니다.",
        ],
        [
          13,
          "염소나 황소의 피와 암송아지의 재를 더러워진 사람들에게 뿌려도, 그 육체가 깨끗하여져서, 그들이 거룩하게 되거든,",
        ],
        [
          14,
          "하물며 [spirit|영원한 성령]을 힘입어 자기 몸을 흠 없는 제물로 삼아 하나님께 바치신 그리스도의 피야말로, 더욱더 우리들의 양심을 깨끗하게 해서, 우리로 하여금 [deadWorks|죽은 행실]에서 떠나서 살아 계신 하나님을 섬기게 하지 않겠습니까?",
        ],
      ],
      com: [
        ["h", "손으로 만들지 않은 장막"],
        [
          "p",
          "저자가 짚는 가장 큰 차이는 제물이신 예수님께서 사람의 손으로 만든 곳에 피를 쏟거나 뿌리지 않으셨다는 점입니다. 예수님은 십자가에 못 박히셨지만, 영적으로 그 피는 하늘에 드려졌습니다(24절).",
        ],
        ["h", "겉과 속"],
        [
          "p",
          "땅의 대제사장들은 겉을 씻는 예식을 통해 날마다, 해마다 제물을 드려 잠시 동안의 용서를 구했습니다. 사람이 드린 피는 일시적이었고 겉만 깨끗하게 했습니다. 그러나 예수님은 단 한 번에 하늘에 들어가셔서 우리를 깨끗하게 하셨습니다. 그의 피는 속을 깨끗하게 합니다.",
        ],
        [
          "p",
          "죄는 인간이 지었고, 인간의 죄는 인간의 힘으로 씻을 수 없습니다.",
        ],
        ["h", "죽은 행실"],
        [
          "p",
          "13절은 염소와 황소의 피가 겉 육체만 깨끗하게 했다고 말합니다. 예수 그리스도의 피는 죽은 행실에서 속을 깨끗하게 합니다. 죽은 행실은 죄책을 없애고 스스로를 영적으로 고쳐 보려고 되풀이하는 사람의 노력입니다.",
        ],
      ],
    },
    words: {
      en: {
        onceForAll: {
          t: "Once for all",
          g: "ephapax · ἐφάπαξ",
          v: "9:12",
          s: "Never repeated",
          d: "단 한 번에: one entry that never needs repeating, set against the daily and yearly offerings of the earthly priests.",
        },
        redemption: {
          t: "Eternal redemption",
          g: "aiōnian lytrōsin · αἰωνίαν λύτρωσιν",
          v: "9:12",
          s: "Not temporary",
          d: "The old covenant was a temporary solution for sin. This one is eternal.",
        },
        spirit: {
          t: "Eternal Spirit",
          g: "pneumatos aiōniou · Πνεύματος αἰωνίου",
          v: "9:14",
          s: "Through the Spirit",
          d: "Christ offered himself without blemish to God through the eternal Spirit. Verse 8 has already shown the Holy Spirit at work.",
        },
        deadWorks: {
          t: "Dead works",
          g: "nekrōn ergōn · νεκρῶν ἔργων",
          v: "9:14",
          s: "Repetition with no life",
          d: "The repetitive, external ceremonies of the Old Testament that could never actually fix the human heart or remove moral guilt; dead because they produce no true spiritual life.",
        },
      },
      ko: {
        onceForAll: {
          t: "단 한 번에",
          g: "ephapax · ἐφάπαξ",
          v: "9:12",
          s: "되풀이가 필요 없음",
          d: "다시 되풀이할 필요가 없는 한 번의 들어가심. 땅의 제사장들이 날마다, 해마다 드린 제사와 대조됩니다.",
        },
        redemption: {
          t: "영원한 구원",
          g: "aiōnian lytrōsin · αἰωνίαν λύτρωσιν",
          v: "9:12",
          s: "일시적이지 않음",
          d: "옛 언약은 죄에 대한 일시적인 해결책이었습니다. 이 구원은 영원합니다.",
        },
        spirit: {
          t: "영원한 성령",
          g: "pneumatos aiōniou · Πνεύματος αἰωνίου",
          v: "9:14",
          s: "성령을 힘입어",
          d: "그리스도께서는 영원한 성령을 힘입어 자기 몸을 흠 없는 제물로 하나님께 바치셨습니다. 8절에서 이미 성령께서 일하심을 보여 주었습니다.",
        },
        deadWorks: {
          t: "죽은 행실",
          g: "nekrōn ergōn · νεκρῶν ἔργων",
          v: "9:14",
          s: "생명 없는 되풀이",
          d: "사람의 마음을 고치거나 도덕적 죄책을 없앨 수 없었던, 구약의 되풀이되는 외적인 의식들. 참된 영적 생명을 내지 못하므로 죽은 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb7-27",
        tag: "NT",
        en: "Heb 7:27",
        ko: "히 7:27",
        ten: "He has no need, like those high priests, to offer sacrifices daily, first for his own sins and then for those of the people, since he did this once for all when he offered up himself.",
        tko: "그는 다른 대제사장들처럼 날마다 먼저 자기 죄를 위하여 희생제물을 드리고, 그 다음에 백성을 위하여 희생제물을 드릴 필요가 없습니다. 그는 자기 자신을 바치셔서 단 한 번에 이 일을 이루셨기 때문입니다.",
        wen: "“Once for all” has already been said in chapter 7.",
        wko: "7장에서 이미 말한 “단 한 번에”.",
      },
      {
        id: "rom3-25",
        tag: "NT",
        en: "Rom 3:25",
        ko: "롬 3:25",
        ten: "whom God put forward as a propitiation by his blood, to be received by faith. This was to show God’s righteousness, because in his divine forbearance he had passed over former sins.",
        tko: "하나님께서는 이 예수를 속죄제물로 내주셨습니다. 그것은 그의 피를 믿을 때에 유효합니다. 하나님께서 이렇게 하신 것은, 사람들이 이제까지 지은 죄를 너그럽게 보아주심으로써 자기의 의를 나타내시려는 것이었습니다.",
        wen: "Wrath turned into grace by his blood.",
        wko: "그의 피로 진노가 은혜로 바뀜.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "15–22",
    scene: "covenantBlood",
    art: "3D · R3F — gold relief at the foot of Sinai: the twelve pillars stand behind Moses, who holds the bowl and swings the hyssop. Scarlet drops arc out over the open book and then over all the people.",
    en: {
      title: "Not without blood",
      quote: "“Without the shedding of blood there is no forgiveness of sins.”",
      sref: "Hebrews 9:22",
      cap: "Scene: before the twelve pillars Moses sprinkles the book and all the people with the blood of the covenant.",
      snips: [
        "He is the mediator of a new covenant",
        "A will needs the death of the one who made it",
        "A will takes effect only at death",
        "Not even the first covenant began without blood",
        "Moses sprinkled the book and all the people",
        "“This is the blood of the covenant”",
        "He sprinkled the tent and the vessels too",
        "No forgiveness without the shedding of blood",
      ],
      verses: [
        [
          15,
          "Therefore he is the [mediator|mediator] of a new covenant, so that those who are called may receive the promised eternal inheritance, since a death has occurred that redeems them from the transgressions committed under the first covenant.",
        ],
        [
          16,
          "For where a [will|will] is involved, the death of the one who made it must be established.",
        ],
        [
          17,
          "For a will takes effect only at death, since it is not in force as long as the one who made it is alive.",
        ],
        [
          18,
          "Therefore not even the first covenant was inaugurated without blood.",
        ],
        [
          19,
          "For when every commandment of the law had been declared by Moses to all the people, he took the blood of calves and goats, with water and scarlet wool and hyssop, and sprinkled both the book itself and all the people,",
        ],
        [
          20,
          "saying, “This is the blood of the covenant that God commanded for you.”",
        ],
        [
          21,
          "And in the same way he sprinkled with the blood both the tent and all the vessels used in worship.",
        ],
        [
          22,
          "Indeed, under the law almost everything is purified with blood, and without the shedding of blood there is no [forgiveness|forgiveness of sins].",
        ],
      ],
      com: [
        ["h", "Mediator of a new covenant"],
        [
          "p",
          "The new covenant was introduced in chapter 8, where God found fault with the people of the first covenant and declared a new covenant on better promises. Chapter 9 is the reason Jesus is its mediator. The promise of an eternal inheritance still stands for believers because God swore an oath, which he did to give us assurance in hope (6:13–20).",
        ],
        [
          "p",
          "Jesus’ sacrifice also redeems the believers who lived under the first covenant, people like Abraham, Moses and David. Although that covenant was temporary, God remembers the believers. This shows the power of his blood, far above repeated animal blood.",
        ],
        ["h", "Why a death"],
        [
          "p",
          "Blood was required for the covenant, or will, to take effect. Everything in the first covenant was human made, so it was temporary: animal blood cleansed the outside of a person, offered by someone sinful and weak, in a sanctuary made by people.",
        ],
        [
          "p",
          "So God established a new covenant with Jesus Christ as mediator. He was sinless and entered a sanctuary in heaven, so his sacrifice satisfied the conditions of a covenant once and for all. The old covenant was a temporary measure to help people understand they are sinners. The new covenant is an unbreakable agreement, new and eternal.",
        ],
        ["h", "The blood at Sinai"],
        [
          "p",
          "In Exodus 24 Moses built an altar at the foot of the mountain with twelve stone pillars for the twelve tribes. He offered burnt offerings, put half the blood into bowls and splashed the other half on the altar, read the Book of the Covenant to the people, then sprinkled the blood on them. This was the legal signing and execution of the contract of the law.",
        ],
        [
          "p",
          "The sprinkling of the tent and the vessels refers to Exodus 40:9–15 and Leviticus 8:15–19. Exodus uses anointing oil, but the ritual worked to make the man-made tent and all its utensils clean and holy.",
        ],
      ],
    },
    ko: {
      title: "피 없이 세운 것은 아닙니다",
      quote: "“피를 흘림이 없이는, 죄를 사함이 이루어지지 않습니다.”",
      sref: "히브리서 9:22",
      cap: "장면: 열두 기둥 앞에서 모세가 언약의 피를 언약책과 온 백성에게 뿌립니다.",
      snips: [
        "그리스도는 새 언약의 중재자이십니다",
        "유언에는 유언한 사람의 죽음이 필요합니다",
        "유언은 죽어야만 효력을 냅니다",
        "첫 번째 언약도 피 없이 세운 것은 아닙니다",
        "모세가 언약책과 온 백성에게 피를 뿌렸습니다",
        "“이것은 언약의 피입니다”",
        "장막과 모든 기구에도 피를 뿌렸습니다",
        "피를 흘림이 없이는 죄를 사함이 없습니다",
      ],
      verses: [
        [
          15,
          "그러므로 그리스도는 새 언약의 [mediator|중재자]이십니다. 그는 첫 번째 언약 아래에서 저지른 범죄에서 사람들을 구속하시기 위하여 죽으심으로써, 부르심을 받은 사람들로 하여금 약속된 영원한 유업을 차지하게 하셨습니다.",
        ],
        [
          16,
          "[will|유언]의 효력을 논의하는 경우에는, 유언한 사람이 죽었다는 확인이 꼭 필요합니다.",
        ],
        [
          17,
          "유언이라는 것은 유언한 사람이 죽어야만 효력을 냅니다. 유언한 사람이 살아 있는 동안에는 유언은 아무런 효력이 없기 때문입니다.",
        ],
        [18, "이러므로 첫 번째 언약도 피 없이 세운 것은 아닙니다."],
        [
          19,
          "모세가 율법을 따라 모든 계명을 백성에게 말한 뒤에, 물과 붉은 양털과 우슬초와 함께 송아지 피와 염소 피를 취하여 언약책과 온 백성에게 뿌리고서,",
        ],
        [
          20,
          "“이것은 하나님께서 여러분에게 명하신 언약의 피입니다” 하고 말하였습니다.",
        ],
        [
          21,
          "또 같은 방식으로 그는 장막과 제사 의식에 쓰이는 모든 기구에도 피를 뿌렸습니다.",
        ],
        [
          22,
          "율법에 따르면, 거의 모든 것이 피로 깨끗해집니다. 그리고 피를 흘림이 없이는, [forgiveness|죄를 사함]이 이루어지지 않습니다.",
        ],
      ],
      com: [
        ["h", "새 언약의 중재자"],
        [
          "p",
          "새 언약은 8장에서 소개되었습니다. 하나님은 첫 언약의 백성에게서 흠을 찾으시고 더 좋은 약속을 바탕으로 새 언약을 선포하셨습니다. 예수님이 그 중재자이신 이유가 9장입니다. 영원한 유업의 약속이 믿는 사람들에게 여전히 유효한 것은, 하나님께서 소망의 확신을 주시려고 맹세하셨기 때문입니다(6:13–20).",
        ],
        [
          "p",
          "예수님의 희생은 첫 언약 아래 살았던 믿는 사람들, 곧 아브라함과 모세와 다윗 같은 이들도 구속합니다. 그 언약은 일시적이었지만, 하나님은 믿는 사람들을 기억하십니다. 그의 피의 능력은 되풀이되는 짐승의 피보다 훨씬 뛰어납니다.",
        ],
        ["h", "왜 죽음이 필요한가"],
        [
          "p",
          "언약, 곧 유언이 효력을 내려면 피가 필요했습니다. 첫 언약의 모든 것은 사람이 만든 것이어서 일시적이었습니다. 죄 많고 연약한 사람이, 사람이 지은 성소에서 드린 짐승의 피는 겉만 깨끗하게 했습니다.",
        ],
        [
          "p",
          "그래서 하나님은 예수 그리스도를 중재자로 삼아 새 언약을 세우셨습니다. 그는 죄가 없으시고 하늘의 성소에 들어가셨기에, 그의 희생은 단 한 번으로 언약의 조건을 채웠습니다. 옛 언약은 사람들이 자기가 죄인임을 깨닫도록 돕는 일시적인 조치였고, 새 언약은 깨어지지 않는 영원한 약속입니다.",
        ],
        ["h", "시내 산의 피"],
        [
          "p",
          "출애굽기 24장에서 모세는 산기슭에 제단을 쌓고 열두 지파를 나타내는 돌기둥 열두 개를 세웠습니다. 번제를 드리고, 피의 절반은 그릇에 담고 절반은 제단에 뿌린 뒤, 언약책을 백성에게 읽어 주고 그 피를 백성에게 뿌렸습니다. 이것은 율법이라는 계약의 법적인 서명이자 체결이었습니다.",
        ],
        [
          "p",
          "장막과 기구에 뿌린 일은 출애굽기 40:9–15와 레위기 8:15–19를 가리킵니다. 출애굽기에서는 기름을 썼지만, 이 예식은 사람이 만든 장막과 모든 기구를 깨끗하고 거룩하게 하는 일이었습니다.",
        ],
      ],
    },
    words: {
      en: {
        mediator: {
          t: "Mediator",
          g: "mesitēs · μεσίτης",
          v: "9:15",
          s: "The one between",
          d: "God established the new covenant by making Jesus Christ the mediator. He is the pioneer of it (2:10) because of what chapter 9 describes.",
        },
        will: {
          t: "Will",
          g: "diathēkē · διαθήκη",
          v: "9:16",
          s: "Covenant, testament",
          d: "Covenant: a legal document or testament that instructs how a person’s property, assets and minor children are to be distributed or managed after their death.",
        },
        forgiveness: {
          t: "Forgiveness of sins",
          g: "aphesis · ἄφεσις",
          v: "9:22",
          s: "Not without blood",
          d: "Under the law almost everything was purified with blood, and forgiveness never came without its shedding.",
        },
      },
      ko: {
        mediator: {
          t: "중재자",
          g: "mesitēs · μεσίτης",
          v: "9:15",
          s: "사이에 서신 분",
          d: "하나님은 예수 그리스도를 중재자로 삼아 새 언약을 세우셨습니다. 9장이 말하는 일 때문에 그는 구원의 창시자이십니다(2:10).",
        },
        will: {
          t: "유언",
          g: "diathēkē · διαθήκη",
          v: "9:16",
          s: "언약, 유언장",
          d: "언약. 사람이 죽은 뒤 재산과 자산과 어린 자녀를 어떻게 나누고 돌볼지 정해 둔 법적 문서입니다.",
        },
        forgiveness: {
          t: "죄를 사함",
          g: "aphesis · ἄφεσις",
          v: "9:22",
          s: "피 없이는 없음",
          d: "율법에 따르면 거의 모든 것이 피로 깨끗해졌고, 피를 흘림이 없이는 죄를 사함이 없었습니다.",
        },
      },
    },
    chips: [
      {
        id: "exo24-8",
        tag: "OT",
        en: "Exod 24:8",
        ko: "출 24:8",
        ten: "And Moses took the blood and threw it on the people and said, “Behold the blood of the covenant that the LORD has made with you in accordance with all these words.”",
        tko: "모세는 피를 가져다가 백성에게 뿌리며 말하였다. “보십시오, 이것은 주님께서 이 모든 말씀을 따라, 당신들에게 세우신 언약의 피입니다.”",
        wen: "The verse quoted in Hebrews 9:20.",
        wko: "히브리서 9:20이 인용한 말씀.",
      },
      {
        id: "heb8-6",
        tag: "NT",
        en: "Heb 8:6",
        ko: "히 8:6",
        ten: "But as it is, Christ has obtained a ministry that is as much more excellent than the old as the covenant he mediates is better, since it is enacted on better promises.",
        tko: "그러나 이제 그리스도께서는 더욱 훌륭한 직무를 맡으셨습니다. 그가 더 좋은 약속을 바탕으로 하여 세운 더 좋은 언약의 중재자이시기 때문입니다.",
        wen: "The mediator of the better covenant, from chapter 8.",
        wko: "8장에서 말한 더 좋은 언약의 중재자.",
      },
      {
        id: "heb6-18",
        tag: "NT",
        en: "Heb 6:18",
        ko: "히 6:18",
        ten: "so that by two unchangeable things, in which it is impossible for God to lie, we who have fled for refuge might have strong encouragement to hold fast to the hope set before us.",
        tko: "이는 앞에 놓인 소망을 붙잡으려고 세상에서 피하여 나온 사람들인 우리가, 이 두 가지 변할 수 없는 사실 곧 하나님의 약속과 맹세를 의지하여 큰 위로를 받게 하려는 것입니다. 하나님께서는 약속하시고 맹세하실 때에 거짓말을 하실 수 없습니다.",
        wen: "The oath behind the promised inheritance.",
        wko: "약속된 유업 뒤에 있는 맹세.",
      },
      {
        id: "lev8-15",
        tag: "OT",
        en: "Lev 8:15",
        ko: "레 8:15",
        ten: "And he killed it, and Moses took the blood, and with his finger put it on the horns of the altar around it and purified the altar and poured out the blood at the base of the altar and consecrated it to make atonement for it.",
        tko: "모세는 그 수소를 잡고, 그 피를 얼마 받아다가, 손가락으로 찍어서 제단의 뿔에 두루 돌아가며 발랐다. 그렇게 하여서, 모세는 제단을 깨끗하게 하였으며, 또 나머지 피는 제단의 밑바닥에 쏟아서 제단을 속하여 거룩하게 하였다.",
        wen: "The vessels of worship purified with blood.",
        wko: "피로 깨끗하게 된 예배의 기구.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "23–28",
    scene: "secondTime",
    art: "3D · R3F — rows of beaten tally marks fill the gold above a line of people. One scarlet stroke crosses them all and they fade, and the waiting people watch a light rise along the floor.",
    en: {
      title: "A second time",
      quote:
        "“…will appear a second time, not to deal with sin but to save those who are eagerly waiting for him.”",
      sref: "Hebrews 9:28",
      cap: "Scene: one scarlet stroke crosses all the years of sacrifices, and those who wait look toward the rising light.",
      snips: [
        "The heavenly things needed better sacrifices",
        "Christ entered heaven itself, on our behalf",
        "Not to offer himself repeatedly",
        "Once for all at the end of the ages",
        "Man dies once, and then comes judgment",
        "He will appear a second time to save those who wait",
      ],
      verses: [
        [
          23,
          "Thus it was necessary for the [copies|copies] of the heavenly things to be purified with these rites, but the heavenly things themselves with better sacrifices than these.",
        ],
        [
          24,
          "For Christ has entered, not into holy places made with hands, which are copies of the true things, but into heaven itself, now to appear in the presence of God on our behalf.",
        ],
        [
          25,
          "Nor was it to offer himself repeatedly, as the high priest enters the holy places every year with blood not his own,",
        ],
        [
          26,
          "for then he would have had to suffer repeatedly since the foundation of the world. But as it is, he has appeared once for all at the end of the ages to [putAway|put away sin] by the sacrifice of himself.",
        ],
        [
          27,
          "And just as it is appointed for man to die once, and after that comes judgment,",
        ],
        [
          28,
          "so Christ, having been offered once to bear the sins of many, will appear a second time, not to deal with sin but to save those who are [waiting|eagerly waiting] for him.",
        ],
      ],
      com: [
        ["h", "Better sacrifices"],
        [
          "p",
          "Earthly things stand in contrast with heavenly things. Since the true sanctuary is not man-made but heaven itself in the presence of God, animal blood offered by sinful people could not accomplish the covenant.",
        ],
        ["h", "Once for all"],
        [
          "p",
          "“단 한 번에.” The high priest went in every year with blood not his own. If that had been necessary, Christ would have had to die again and again, ever since the world began. But now, once for all time, he has appeared at the end of the age to remove sin by his own death as a sacrifice (NLT).",
        ],
        ["h", "Waiting for him"],
        [
          "p",
          "There are no more sacrifices. We need to wait for Jesus to come. When he appears a second time it will not be to deal with sin, which he has already borne, but to save those who are eagerly waiting for him.",
        ],
      ],
    },
    ko: {
      title: "두 번째로",
      quote:
        "“두 번째로는 죄와는 상관없이, 자기를 기다리고 있는 사람들에게 나타나셔서 구원하실 것입니다.”",
      sref: "히브리서 9:28",
      cap: "장면: 한 줄기 붉은 획이 모든 해의 제사를 가로지르고, 기다리는 사람들이 떠오르는 빛을 바라봅니다.",
      snips: [
        "하늘에 있는 것들은 더 나은 희생제물이 필요합니다",
        "그리스도께서 우리를 위하여 하늘 성소 그 자체에 들어가셨습니다",
        "그 몸을 여러 번 바치실 필요가 없습니다",
        "시대의 종말에 단 한 번 나타나셨습니다",
        "사람이 한 번 죽는 것은 정해진 일입니다",
        "두 번째로는 기다리는 사람들을 구원하러 나타나실 것입니다",
      ],
      verses: [
        [
          23,
          "그러므로 하늘에 있는 것들의 [copies|모형물]은 이런 여러 의식으로 깨끗해져야 할 필요가 있지만, 하늘에 있는 것들은 이보다 나은 희생제물로 깨끗해져야 합니다.",
        ],
        [
          24,
          "그리스도께서는 참 성소의 모형에 지나지 않는, 손으로 만든 성소에 들어가신 것이 아니라, 바로 하늘 성소 그 자체에 들어가셨습니다. 이제 그는 우리를 위하여 하나님 앞에 나타나셨습니다.",
        ],
        [
          25,
          "대제사장은 해마다 짐승의 피를 가지고 성소에 들어가지만, 그리스도께서는 그 몸을 여러 번 바치실 필요가 없습니다.",
        ],
        [
          26,
          "그리스도께서 그 몸을 여러 번 바치셔야 하였다면, 그는 창세 이래로 여러 번 고난을 받아야 하셨을 것입니다. 그러나 이제 그는 자기를 희생 제물로 드려서 [putAway|죄를 없이하시기] 위하여 시대의 종말에 단 한 번 나타나셨습니다.",
        ],
        [
          27,
          "사람이 한 번 죽는 것은 정해진 일이요, 그 뒤에는 심판이 있습니다.",
        ],
        [
          28,
          "이와 같이 그리스도께서도 많은 사람의 죄를 짊어지시려고, 단 한 번 자기 몸을 제물로 바치셨고, 두 번째로는 죄와는 상관없이, 자기를 [waiting|기다리고 있는] 사람들에게 나타나셔서 구원하실 것입니다.",
        ],
      ],
      com: [
        ["h", "더 나은 희생제물"],
        [
          "p",
          "땅의 것과 하늘의 것이 대조됩니다. 참 성소는 사람이 만든 곳이 아니라 하나님 앞, 곧 하늘 그 자체이므로, 죄 많은 사람이 드리는 짐승의 피로는 언약을 이룰 수 없었습니다.",
        ],
        ["h", "단 한 번에"],
        [
          "p",
          "대제사장은 해마다 자기 피가 아닌 피를 가지고 들어갔습니다. 그것이 필요했다면 그리스도께서는 창세 이래로 여러 번 고난을 받아야 하셨을 것입니다. 그러나 이제 그는 자기를 희생 제물로 드려서 죄를 없이하시기 위하여 시대의 종말에 단 한 번 나타나셨습니다.",
        ],
        ["h", "그분을 기다림"],
        [
          "p",
          "이제 더 이상 제사가 없습니다. 우리는 예수님께서 오시기를 기다려야 합니다. 그가 두 번째로 나타나실 때는 이미 짊어지신 죄를 다루기 위해서가 아니라, 자기를 기다리고 있는 사람들을 구원하기 위해서입니다.",
        ],
      ],
    },
    words: {
      en: {
        copies: {
          t: "Copies",
          g: "hypodeigmata · ὑποδείγματα",
          v: "9:23",
          s: "Earthly things",
          d: "The tent and its vessels, made by people. The heavenly things themselves needed better sacrifices than these.",
        },
        putAway: {
          t: "Put away sin",
          g: "athetēsin tēs hamartias · ἀθέτησιν τῆς ἁμαρτίας",
          v: "9:26",
          s: "To remove",
          d: "NLT: “to remove sin by his own death as a sacrifice.”",
        },
        waiting: {
          t: "Eagerly waiting",
          g: "apekdechomenois · ἀπεκδεχομένοις",
          v: "9:28",
          s: "No more sacrifices",
          d: "There are no more sacrifices to offer. What remains for believers is to wait for Jesus to come.",
        },
      },
      ko: {
        copies: {
          t: "모형물",
          g: "hypodeigmata · ὑποδείγματα",
          v: "9:23",
          s: "땅의 것들",
          d: "사람이 만든 장막과 기구들. 하늘에 있는 것들은 이보다 나은 희생제물이 필요했습니다.",
        },
        putAway: {
          t: "죄를 없이하심",
          g: "athetēsin tēs hamartias · ἀθέτησιν τῆς ἁμαρτίας",
          v: "9:26",
          s: "없애 버림",
          d: "자기를 희생 제물로 드려서 죄를 없애 버리신다는 뜻입니다.",
        },
        waiting: {
          t: "기다리고 있는",
          g: "apekdechomenois · ἀπεκδεχομένοις",
          v: "9:28",
          s: "더 이상 제사가 없음",
          d: "더 이상 드릴 제사가 없습니다. 믿는 사람들에게 남은 것은 예수님께서 오시기를 기다리는 일입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb8-5",
        tag: "NT",
        en: "Heb 8:5",
        ko: "히 8:5",
        ten: "They serve a copy and shadow of the heavenly things. For when Moses was about to erect the tent, he was instructed by God, saying, “See that you make everything according to the pattern that was shown you on the mountain.”",
        tko: "그러나 그들은 하늘에 있는 것들의 모형과 그림자에 지나지 않는, 땅에 있는 성전에서 섬깁니다. 모세가 장막을 세우려고 할 때에, “너는 명심하여 내가 산에서 네게 보여준 그 모형을 따라 모든 것을 만들어라” 하고 말씀하신 하나님의 지시를 받은 것입니다.",
        wen: "The copies from chapter 8.",
        wko: "8장에서 말한 모형.",
      },
      {
        id: "heb8-2",
        tag: "NT",
        en: "Heb 8:2",
        ko: "히 8:2",
        ten: "a minister in the holy places, in the true tent that the Lord set up, not man.",
        tko: "그는 성소와 참 장막에서 섬기시는 분입니다. 이 장막은 주님께서 세우신 것이요, 사람이 세운 것이 아닙니다.",
        wen: "The true tent, set up by the Lord and not by people.",
        wko: "사람이 아니라 주님께서 세우신 참 장막.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "The old covenant",
        items: [
          [
            "1–5",
            "An earthly tabernacle made by people, part of this creation and made of physical materials.",
          ],
          [
            "6–7",
            "Only the high priest could enter the Most Holy Place, once a year, behind a curtain.",
          ],
          ["7, 25", "The blood of animals, offered daily and annually."],
          ["9–10, 13", "External cleaning of the outer body."],
          [
            "19–22",
            "A conditional contract, where people needed to perform the acts in compliance with the law.",
          ],
        ],
      },
      {
        h: "The new covenant",
        items: [
          [
            "11, 24",
            "A heavenly sanctuary not made by people: heaven itself, in the presence of God.",
          ],
          [
            "12",
            "Christ entered the Most Holy Place once for all and opened the pathway to God.",
          ],
          ["12, 26", "Jesus’ blood, offered once for all."],
          [
            "14",
            "Inner cleaning of the conscience, which removes guilt and dead works.",
          ],
          [
            "15–17",
            "Satisfied by the death of Jesus, legally releasing the inheritance to the heirs, who are believers.",
          ],
        ],
      },
    ],
    intentH: "Author’s intent",
    intentShort:
      "To show that the temporary, external system of the first covenant pointed to Jesus, whose own blood, offered once for all, opened the way to God.",
    intent: [
      "The old covenant was a temporary measure to help people understand they are sinners. Its tent was made by hands, its blood was repeated, and it could only clean the outside, so the way into God’s presence stayed shut.",
      "The new covenant is an unbreakable agreement established through Jesus Christ. He entered heaven itself by his own blood, once for all, and purified the conscience. His sacrifice also redeems those who lived under the old covenant, which shows that God remembers the believers. Now there are no more sacrifices, and we wait for him.",
    ],
  },
  ko: {
    groups: [
      {
        h: "옛 언약",
        items: [
          [
            "1–5절",
            "사람이 지은 땅의 성막. 물질로 만든, 이 피조 세계의 일부입니다.",
          ],
          [
            "6–7절",
            "휘장 뒤 지성소에는 대제사장만 한 해에 한 번 들어갈 수 있었습니다.",
          ],
          ["7, 25절", "날마다, 해마다 드린 짐승의 피."],
          ["9–10, 13절", "겉 육체를 씻는 외적인 정결."],
          ["19–22절", "사람이 율법을 따라 행해야 하는 조건부 계약."],
        ],
      },
      {
        h: "새 언약",
        items: [
          [
            "11, 24절",
            "사람이 짓지 않은 하늘의 성소, 곧 하나님 앞, 하늘 그 자체입니다.",
          ],
          [
            "12절",
            "그리스도께서 단 한 번에 지성소에 들어가셔서 하나님께 가는 길을 여셨습니다.",
          ],
          ["12, 26절", "단 한 번에 드린 예수님의 피."],
          ["14절", "죄책과 죽은 행실을 없애는 양심의 내적인 정결."],
          [
            "15–17절",
            "예수님의 죽으심으로 조건이 채워져, 상속자인 믿는 사람들에게 유업이 법적으로 주어집니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "첫 언약의 일시적이고 외적인 제도가 예수님을 가리켰고, 단 한 번에 드린 그의 피가 하나님께 가는 길을 열었음을 보여 주는 것.",
    intent: [
      "옛 언약은 사람들이 자기가 죄인임을 깨닫도록 돕는 일시적인 조치였습니다. 장막은 손으로 만든 것이었고, 피는 되풀이되었으며, 겉만 깨끗하게 할 수 있었기에 하나님 앞으로 가는 길은 닫혀 있었습니다.",
      "새 언약은 예수 그리스도를 통해 세워진 깨어지지 않는 약속입니다. 그는 자기의 피로 단 한 번에 하늘 그 자체에 들어가셔서 양심을 깨끗하게 하셨습니다. 그의 희생은 옛 언약 아래 살았던 사람들도 구속하니, 하나님께서 믿는 사람들을 기억하심을 보여 줍니다. 이제 더 이상 제사가 없고, 우리는 그분을 기다립니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 9",
    tagline:
      "“He entered once for all into the holy places… by means of his own blood, thus securing an eternal redemption.”",
    taglineRef: "Hebrews 9:12",
    mapTitle: "Twenty-eight verses, five movements",
    mapIntro:
      "The first tent was furnished with care, yet its priests came and went and the way stayed shut. Then Christ entered once for all by his own blood, not into a place made with hands but into heaven itself. The covenant is sealed, the sacrifices are ended, and we wait for him.",
    summaryTitle: "What Hebrews 9 says",
    footQuote:
      "“…will appear a second time, not to deal with sin but to save those who are eagerly waiting for him.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 9장",
    tagline:
      "“단 한 번에 지성소에 들어가셨습니다… 자기의 피로써, 우리에게 영원한 구원을 이루셨습니다.”",
    taglineRef: "히브리서 9:12",
    mapTitle: "스물여덟 절, 다섯 흐름",
    mapIntro:
      "첫 장막은 정성껏 갖추어졌지만, 제사장들이 드나들어도 길은 닫혀 있었습니다. 그러나 그리스도께서는 자기의 피로 단 한 번에, 손으로 만든 곳이 아니라 하늘 그 자체에 들어가셨습니다. 언약은 세워졌고 제사는 끝났으며, 우리는 그분을 기다립니다.",
    summaryTitle: "히브리서 9장이 말하는 것",
    footQuote:
      "“두 번째로는 죄와는 상관없이, 자기를 기다리고 있는 사람들에게 나타나셔서 구원하실 것입니다.”",
    version: "새번역",
  },
};

const APPENDIX: Appendix = {
  items: [
    {
      scene: "furnTable",
      source:
        "https://www.freebibleimages.org/illustrations/bs-tabernacle-table/",
      en: {
        name: "The table",
        ref: "Exodus 25:23–30",
        note: "Twelve loaves of the bread of the Presence were set on it and replaced every Sabbath, from sunset Friday to sunset Saturday (Leviticus 24:5–9). They symbolised continuous fellowship and sustenance before God.",
      },
      ko: {
        name: "상과 빵",
        ref: "출애굽기 25:23–30",
        note: "상 위에 열두 덩이 빵을 차려 놓고 안식일(금요일 해 질 때부터 토요일 해 질 때까지)마다 새로 바꾸었습니다(레 24:5–9). 하나님 앞에서 이어지는 교제와 공급을 상징했습니다.",
      },
    },
    {
      scene: "furnLampstand",
      source:
        "https://www.freebibleimages.org/illustrations/bs-tabernacle-lampstand/",
      en: {
        name: "The lampstand",
        ref: "Exodus 25:31–39",
        note: "Fuelled with oil topped up by the priests (Exodus 27:20–21), it symbolised God’s eternal light and spiritual illumination.",
      },
      ko: {
        name: "촛대",
        ref: "출애굽기 25:31–39",
        note: "제사장들이 기름을 채워 불을 밝혔으며(출 27:20–21), 하나님의 영원한 빛과 영적인 깨우침을 상징했습니다.",
      },
    },
    {
      scene: "furnCurtain",
      en: {
        name: "The curtain",
        ref: "Exodus 26:31–33",
        note: "Blue, purple and scarlet yarn and fine linen, worked with cherubim. It separated the Holy Place from the Most Holy Place, which was entered only once a year on the Day of Atonement (Leviticus 16:2–17).",
      },
      ko: {
        name: "휘장",
        ref: "출애굽기 26:31–33",
        note: "청색, 자주색, 홍색 실과 고운 모시실로 짜고 그룹들을 수놓았습니다. 성소와 지성소를 나누었고, 지성소에는 한 해에 한 번 속죄일에만 들어갈 수 있었습니다(레 16:2–17).",
      },
    },
    {
      scene: "furnAltar",
      source:
        "https://www.freebibleimages.org/illustrations/bs-tabernacle-altar-incense/",
      en: {
        name: "The altar of incense",
        ref: "Exodus 30:1–10",
        note: "It represents acceptable prayer ascending to God (Psalm 141:2; Revelation 8:3–4).",
      },
      ko: {
        name: "분향제단",
        ref: "출애굽기 30:1–10",
        note: "하나님께 올라가는 합당한 기도를 나타냅니다(시 141:2; 계 8:3–4).",
      },
    },
    {
      scene: "furnArk",
      source: "https://www.freebibleimages.org/illustrations/bs-ark-covenant/",
      en: {
        name: "The ark",
        ref: "Exodus 25:10–22",
        note: "It held the urn of manna, Aaron’s staff and the stone tablets. On the Day of Atonement blood was sprinkled on the mercy seat under the cherubim of glory (Leviticus 16:14–16).",
      },
      ko: {
        name: "언약궤",
        ref: "출애굽기 25:10–22",
        note: "만나 항아리와 아론의 지팡이와 돌판이 들어 있었습니다. 속죄일에는 영광에 빛나는 그룹들 아래의 속죄판에 피를 뿌렸습니다(레 16:14–16).",
      },
    },
  ],
  overview:
    "https://www.freebibleimages.org/illustrations/bs-tabernacle-walkthrough/",
  copy: {
    en: {
      nav: "Appendix",
      eyebrow: "Appendix",
      title: "The furnishings",
      intro:
        "The tent described in verses 1–5, from the study session’s appendix. Choose a piece to see it in gold.",
      original: "See the original illustration",
      overview: "Walk through the whole tabernacle",
      credit:
        "Drawn for this study from the Bible Scenes illustrations by Jeremy Park, Bible-Scenes.com, shared on FreeBibleimages under CC BY 4.0.",
    },
    ko: {
      nav: "부록",
      eyebrow: "부록",
      title: "성소의 기구",
      intro:
        "1–5절이 말하는 장막의 기구들입니다. 공부 시간의 부록에서 가져왔습니다. 하나를 고르면 금판으로 볼 수 있습니다.",
      original: "원본 그림 보기",
      overview: "성막 전체 둘러보기",
      credit:
        "Jeremy Park(Bible-Scenes.com)의 Bible Scenes 그림을 바탕으로 이 공부를 위해 새로 그렸습니다. 원본은 FreeBibleimages에서 CC BY 4.0으로 공유됩니다.",
    },
  },
};

export const chapter9: ChapterContent = {
  number: 9,
  setting: "gold",
  copy: COPY,
  movements: MV,
  summary: SUM,
  appendix: APPENDIX,
};
