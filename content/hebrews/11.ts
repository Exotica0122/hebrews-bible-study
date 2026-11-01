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
    range: "1–3",
    scene: "notSeen",
    art: "3D · R3F — bare linen under a raking lamp. Before any thread, a soft gold light; then the stitches spread outward from the middle of the cloth: sun and moon, hills in layers, trees, birds and a small flock.",
    en: {
      title: "Things not seen",
      quote: "“…what is seen was not made out of things that are visible.”",
      sref: "Hebrews 11:3",
      cap: "Scene: nothing on the bare linen, and then the whole visible world stitched out of nothing that was there.",
      snips: [
        "Faith is assurance and conviction",
        "The people of old were commended by it",
        "The universe was created by the word of God",
      ],
      verses: [
        [
          1,
          "Now faith is the [assurance|assurance] of things hoped for, the [conviction|conviction] of things not seen.",
        ],
        [2, "For by it the people of old received their commendation."],
        [
          3,
          "By faith we [understand|understand] that the universe was created by the word of God, so that what is seen was not made out of things that are visible.",
        ],
      ],
      com: [
        ["h", "Where chapter 10 left us"],
        [
          "p",
          "At the end of chapter 10 the author spoke about how the readers should keep their faith in Jesus even at difficult times. In 6:12 he had already told them to imitate those who through faith and patience inherit what has been promised. Chapter 11 now goes through the patriarchs, leaders, judges and prophets who showed faith in the Old Testament.",
        ],
        [
          "p",
          "This chapter teaches the reader how to believe in God with our hearts and with true devotion. It sets true faith against empty religion.",
        ],
        [
          "q",
          "Through their faith, the people in days of old earned a good reputation. (NLT)",
        ],
        ["h", "Out of nothing"],
        [
          "p",
          "Genesis 1 shows God speaking his words and creation following. He did not make something from what already existed, but something out of nothing. The law of conservation of mass and energy says that matter and energy can be neither created nor destroyed, only transformed from one state to another. That was not the case when God created the universe.",
        ],
        [
          "p",
          "True biblical faith gives a real, intelligent insight into things we did not personally witness, such as creation.",
        ],
      ],
    },
    ko: {
      title: "보이지 않는 것들",
      quote: "“…보이는 것은 나타나 있는 것에서 된 것이 아닙니다.”",
      sref: "히브리서 11:3",
      cap: "장면: 빈 삼베 위에 아무것도 없다가, 보이는 온 세상이 없던 데서 수놓아집니다.",
      snips: [
        "믿음은 확신이요 증거입니다",
        "선조들은 믿음으로 증언을 받았습니다",
        "세상은 하나님의 말씀으로 지어졌습니다",
      ],
      verses: [
        [
          1,
          "믿음은 바라는 것들의 [assurance|확신]이요, 보이지 않는 것들의 [conviction|증거]입니다.",
        ],
        [
          2,
          "선조들은 이 믿음으로 살았기 때문에 훌륭한 사람으로 증언되었습니다.",
        ],
        [
          3,
          "믿음으로 우리는 세상이 하나님의 말씀으로 지어졌다는 것을 [understand|깨닫습니다]. 보이는 것은 나타나 있는 것에서 된 것이 아닙니다.",
        ],
      ],
      com: [
        ["h", "10장에서 이어지는 말씀"],
        [
          "p",
          "10장 끝에서 저자는 어려운 때에도 예수님을 향한 믿음을 지키라고 말했습니다. 6장 12절에서도 믿음과 인내로 약속을 상속받는 사람들을 본받으라고 했습니다. 11장은 구약에서 믿음을 보여 준 족장과 지도자와 사사와 예언자들을 차례로 설명합니다.",
        ],
        [
          "p",
          "이 장은 독자에게 마음과 참된 헌신으로 하나님을 믿는 법을 가르칩니다. 참된 믿음과 빈 종교를 대조합니다.",
        ],
        ["h", "없는 데서"],
        [
          "p",
          "창세기 1장에서 하나님께서 말씀하시자 창조가 뒤따릅니다. 이미 있는 것으로 만드신 것이 아니라 없는 데서 지으셨습니다. 질량과 에너지 보존 법칙에 따르면 물질과 에너지는 새로 생기거나 없어지지 않고 형태만 바뀝니다. 하나님께서 세상을 지으실 때는 그렇지 않았습니다.",
        ],
        [
          "p",
          "성경적인 참된 믿음은 창조처럼 우리가 직접 보지 못한 일을 깨닫는 실제적이고 지적인 통찰을 줍니다.",
        ],
      ],
    },
    words: {
      en: {
        assurance: {
          t: "Assurance",
          g: "hypostasis · ὑπόστασις",
          v: "11:1",
          s: "What stands underneath",
          d: "A setting under, a support: substance, confidence, reality.",
        },
        conviction: {
          t: "Conviction",
          g: "elenchos · ἔλεγχος",
          v: "11:1",
          s: "Proof of what is unseen",
          d: "Proof, conviction, evidence.",
        },
        understand: {
          t: "Understand",
          g: "nooumen · νοοῦμεν",
          v: "11:3",
          s: "To grasp with the mind",
          d: "To perceive, grasp mentally or comprehend a reality that cannot be discovered or proven through physical eyesight or experiments.",
        },
      },
      ko: {
        assurance: {
          t: "확신",
          g: "hypostasis · ὑπόστασις",
          v: "11:1",
          s: "아래에서 받치는 것",
          d: "아래에 놓아 받침. 실체, 확신, 실재를 뜻합니다.",
        },
        conviction: {
          t: "증거",
          g: "elenchos · ἔλεγχος",
          v: "11:1",
          s: "보이지 않는 것의 증명",
          d: "증명, 확증, 증거를 뜻합니다.",
        },
        understand: {
          t: "깨닫다",
          g: "nooumen · νοοῦμεν",
          v: "11:3",
          s: "마음으로 파악함",
          d: "눈으로 보거나 실험으로 발견하거나 증명할 수 없는 실재를 알아보고 마음으로 파악하고 이해하는 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb6-12",
        tag: "NT",
        en: "Heb 6:12",
        ko: "히 6:12",
        ten: "so that you may not be sluggish, but imitators of those who through faith and patience inherit the promises.",
        tko: "여러분은 게으른 사람이 되지 말고, 믿음과 인내로 약속을 상속받는 사람들을 본받는 사람이 되어야 합니다.",
        wen: "Imitate those who inherit through faith.",
        wko: "믿음으로 상속받는 사람들을 본받으라.",
      },
      {
        id: "heb10-39",
        tag: "NT",
        en: "Heb 10:39",
        ko: "히 10:39",
        ten: "But we are not of those who shrink back and are destroyed, but of those who have faith and preserve their souls.",
        tko: "우리는 뒤로 물러나서 멸망할 사람들이 아니라, 믿음을 가져 생명을 얻을 사람들입니다.",
        wen: "The verse just before chapter 11.",
        wko: "11장 바로 앞의 말씀.",
      },
      {
        id: "gen1-3",
        tag: "OT",
        en: "Gen 1:3",
        ko: "창 1:3",
        ten: "And God said, “Let there be light,” and there was light.",
        tko: "하나님이 말씀하시기를 “빛이 생겨라” 하시니, 빛이 생겼다.",
        wen: "God spoke, and creation followed.",
        wko: "말씀하시자 창조가 뒤따릅니다.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "4–7",
    scene: "stillSpeaks",
    art: "3D · R3F — three episodes stitched along one ground line. Abel’s smoke goes straight up beside Cain’s low, bent smoke. Enoch walks and is no longer there, leaving footprints. Noah builds the ark plank by plank, and the rain has not yet come when he starts.",
    en: {
      title: "He still speaks",
      quote: "“…through his faith, though he died, he still speaks.”",
      sref: "Hebrews 11:4",
      cap: "Scene: Abel’s offering, Enoch’s footprints that stop, and Noah building under a clear sky until the rain cloud comes.",
      snips: [
        "Abel’s better sacrifice still speaks",
        "Enoch was taken up, having pleased God",
        "Without faith it is impossible to please him",
        "Noah built the ark for what was as yet unseen",
      ],
      verses: [
        [
          4,
          "By faith Abel offered to God a more acceptable sacrifice than Cain, through which he was [commended|commended] as righteous, God commending him by accepting his gifts. And through his faith, though he died, he still speaks.",
        ],
        [
          5,
          "By faith Enoch was taken up so that he should not see death, and he was not found, because God had taken him. Now before he was taken he was commended as having [pleased|pleased] God.",
        ],
        [
          6,
          "And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he [rewards|rewards] those who seek him.",
        ],
        [
          7,
          "By faith Noah, being warned by God concerning events as yet unseen, in [reverent|reverent fear] constructed an ark for the saving of his household. By this he condemned the world and became an heir of the righteousness that comes by faith.",
        ],
      ],
      com: [
        ["h", "Abel: the best of what he had"],
        [
          "p",
          "In Genesis 4 Cain and Abel both make offerings. Abel offered fat portions of the firstborn of his flock, whereas Cain offered some fruits of the soil. Abel offered the best of what he had, and it took trust to give away the firstborn before knowing whether more livestock would be born. Cain simply gave a standard, convenient offering rather than firstfruits or the choice crops.",
        ],
        [
          "p",
          "Abel’s sacrifice directly reflected his inward faith, and Cain’s offering reflected a lack of it. The author adds that though Abel died, he still speaks. He teaches readers how to approach God with a sincere heart and what it looks like to trust God with our absolute best. God notices, values and remembers true devotion. This is the difference between a faith-filled relationship and empty religion.",
        ],
        ["h", "Enoch: he walked with God"],
        [
          "p",
          "Genesis 5 is the genealogy from Adam to Noah. Enoch lived 365 years and fathered Methuselah with other sons and daughters. He is the only person in the whole genealogy of whom it is said that he walked with God, and then he was not, for God took him (Gen 5:21–24).",
        ],
        [
          "p",
          "The Septuagint says that Enoch pleased God, and that was because of his faith. He believed that God exists and that he rewards those who seek him. The reward does not mean earthly possessions. It means intimate fellowship and peace with God, having God himself, and entering his heavenly kingdom.",
        ],
        ["h", "Noah: warned of what could not be seen"],
        [
          "p",
          "Genesis 6 calls Noah a righteous man, blameless in his generation, who walked with God (v9). God commanded precisely how to build the ark and what to take in, and Noah did all that God commanded him (v22).",
        ],
        [
          "p",
          "Noah could not see the coming judgment, but with reverent fear and faith he obeyed. His faith condemned the world, exposing the guilt of a rebellious world, and in contrast secured his own inheritance of right standing with God.",
        ],
      ],
    },
    ko: {
      title: "아직도 말하고 있습니다",
      quote: "“그는 죽었지만, 이 믿음으로 말미암아 아직도 말하고 있습니다.”",
      sref: "히브리서 11:4",
      cap: "장면: 아벨의 제물, 도중에 끊긴 에녹의 발자국, 맑은 하늘 아래 방주를 짓다가 마침내 비구름이 다가오는 노아.",
      snips: [
        "아벨의 더 나은 제물이 아직도 말합니다",
        "에녹은 하나님을 기쁘게 하고 옮겨갔습니다",
        "믿음이 없이는 기쁘게 해드릴 수 없습니다",
        "노아는 보이지 않는 일 때문에 방주를 마련했습니다",
      ],
      verses: [
        [
          4,
          "믿음으로 아벨은 가인보다 더 나은 제물을 하나님께 드렸습니다. 이런 제물을 드림으로써 그는 의인이라는 [commended|증언]을 받았으니, 하나님께서 그의 예물에 대하여 증언하여 주신 것입니다. 그는 죽었지만, 이 믿음으로 말미암아 아직도 말하고 있습니다.",
        ],
        [
          5,
          "믿음으로 에녹은 죽지 않고 하늘로 옮겨갔습니다. 하나님께서 그를 옮기셨으므로, 우리는 그를 찾을 수 없었습니다. 옮겨가기 전에 그는 하나님을 [pleased|기쁘게 해드렸다는] 증언을 받은 것입니다.",
        ],
        [
          6,
          "믿음이 없이는 하나님을 기쁘게 해드릴 수 없습니다. 하나님께 나아가는 사람은, 하나님이 계시다는 것과, 하나님은 자기를 찾는 사람들에게 [rewards|상을 주시는] 분이시라는 것을 믿어야 합니다.",
        ],
        [
          7,
          "믿음으로 노아는, 하나님께서 아직 보이지 않는 일들에 대하여 경고하셨을 때에, 하나님을 [reverent|경외하고] 방주를 마련하여 자기 가족을 구원하였습니다. 이 믿음을 통하여 그는 세상을 단죄하고, 믿음을 따라 얻는 의를 물려받는 상속자가 되었습니다.",
        ],
      ],
      com: [
        ["h", "아벨: 가진 것 중 가장 좋은 것"],
        [
          "p",
          "창세기 4장에서 가인과 아벨이 제물을 드립니다. 아벨은 양 떼의 맏배와 그 기름을 드렸고, 가인은 땅의 소산을 드렸습니다. 아벨은 가진 것 중 가장 좋은 것을 드렸고, 가축이 더 태어날지 알기도 전에 맏배를 내어놓으려면 믿음이 필요했습니다. 가인은 첫 열매나 가장 좋은 소산이 아니라 편한 대로 평범한 제물을 드렸습니다.",
        ],
        [
          "p",
          "아벨의 제물은 그의 속 믿음을 그대로 보여 주었고, 가인의 제물은 믿음이 없음을 보여 주었습니다. 저자는 아벨이 죽었지만 아직도 말하고 있다고 덧붙입니다. 아벨은 진실한 마음으로 하나님께 나아가는 법과, 가장 좋은 것으로 하나님을 신뢰하는 모습을 가르칩니다. 하나님께서는 참된 헌신을 보시고 귀히 여기시고 기억하십니다. 이것이 믿음으로 맺는 관계와 빈 종교의 차이입니다.",
        ],
        ["h", "에녹: 하나님과 동행함"],
        [
          "p",
          "창세기 5장은 아담에서 노아까지의 족보입니다. 에녹은 365년을 살았고 므두셀라와 다른 자녀들을 낳았습니다. 족보 전체에서 에녹만 하나님과 동행하다가 하나님이 데려가셔서 사라졌다고 기록되어 있습니다(창 5:21–24).",
        ],
        [
          "p",
          "칠십인역은 에녹이 하나님을 기쁘게 해드렸다고 말하는데, 이는 그의 믿음 때문입니다. 에녹은 하나님이 계시다는 것과 찾는 사람들에게 상을 주신다는 것을 믿었습니다. 여기서 상은 땅의 재물이 아니라 하나님과 나누는 깊은 교제와 평안, 하나님 자신을 모시는 것, 하늘나라에 들어가는 것을 뜻합니다.",
        ],
        ["h", "노아: 보이지 않는 일에 대한 경고"],
        [
          "p",
          "창세기 6장은 노아를 당대에 의롭고 흠이 없으며 하나님과 동행한 사람이라고 부릅니다(9절). 하나님께서 방주를 어떻게 지을지, 무엇을 태울지 자세히 명하셨고, 노아는 명하신 대로 다 하였습니다(22절).",
        ],
        [
          "p",
          "노아는 다가올 심판을 볼 수 없었지만 경외와 믿음으로 순종했습니다. 그의 믿음은 세상을 단죄하여 반역하는 세상의 죄를 드러냈고, 반대로 그는 하나님 앞에서 의로운 신분을 물려받았습니다.",
        ],
      ],
    },
    words: {
      en: {
        commended: {
          t: "Commended",
          g: "emartyrēthē · ἐμαρτυρήθη",
          v: "11:4",
          s: "Testified to",
          d: "To bear witness, testify, give evidence. God himself is the one who testifies here.",
        },
        pleased: {
          t: "Pleased",
          g: "euarestēkenai · εὐαρεστηκέναι",
          v: "11:5",
          s: "Fully acceptable",
          d: "To please, to be pleasing, to be acceptable.",
        },
        rewards: {
          t: "Rewards",
          g: "misthapodotēs · μισθαποδότης",
          v: "11:6",
          s: "A rewarder",
          d: "One who rewards. Here the reward is fellowship and peace with God and God himself, not earthly possessions.",
        },
        reverent: {
          t: "Reverent fear",
          g: "eulabētheis · εὐλαβηθεὶς",
          v: "11:7",
          s: "Moved with fear",
          d: "To act with reverence, to be cautious, to fear.",
        },
      },
      ko: {
        commended: {
          t: "증언",
          g: "emartyrēthē · ἐμαρτυρήθη",
          v: "11:4",
          s: "증언을 받음",
          d: "증언함, 증거함. 여기서 증언하시는 분은 하나님 자신입니다.",
        },
        pleased: {
          t: "기쁘게 해드리다",
          g: "euarestēkenai · εὐαρεστηκέναι",
          v: "11:5",
          s: "온전히 받으실 만함",
          d: "기쁘게 함, 받으실 만함을 뜻합니다.",
        },
        rewards: {
          t: "상을 주시는 분",
          g: "misthapodotēs · μισθαποδότης",
          v: "11:6",
          s: "갚아 주시는 분",
          d: "상을 주시는 분. 여기서 상은 땅의 재물이 아니라 하나님과의 교제와 평안, 하나님 자신입니다.",
        },
        reverent: {
          t: "경외",
          g: "eulabētheis · εὐλαβηθεὶς",
          v: "11:7",
          s: "두려움으로 움직임",
          d: "경외함, 조심함, 두려워함을 뜻합니다.",
        },
      },
    },
    chips: [
      {
        id: "gen4-4",
        tag: "OT",
        en: "Gen 4:4",
        ko: "창 4:4",
        ten: "and Abel also brought of the firstborn of his flock and of their fat portions. And the Lord had regard for Abel and his offering,",
        tko: "아벨은 양 떼 가운데서 맏배의 기름기를 바쳤다. 주님께서 아벨과 그가 바친 제물은 반기셨으나,",
        wen: "The firstborn, and the fat portions.",
        wko: "맏배와 그 기름.",
      },
      {
        id: "gen5-24",
        tag: "OT",
        en: "Gen 5:24",
        ko: "창 5:24",
        ten: "Enoch walked with God, and he was not, for God took him.",
        tko: "에녹은 하나님과 동행하다가 사라졌다. 하나님이 그를 데려가신 것이다.",
        wen: "Enoch walked with God.",
        wko: "에녹은 하나님과 동행했습니다.",
      },
      {
        id: "gen6-9",
        tag: "OT",
        en: "Gen 6:9",
        ko: "창 6:9",
        ten: "These are the generations of Noah. Noah was a righteous man, blameless in his generation. Noah walked with God.",
        tko: "노아의 역사는 이러하다. 노아는 그 당대에 의롭고 흠이 없는 사람이었다. 노아는 하나님과 동행하는 사람이었다.",
        wen: "Righteous and blameless.",
        wko: "의롭고 흠이 없는 사람.",
      },
      {
        id: "gen6-22",
        tag: "OT",
        en: "Gen 6:22",
        ko: "창 6:22",
        ten: "Noah did this; he did all that God commanded him.",
        tko: "노아는 하나님이 명하신 대로 다 하였다. 꼭 그대로 하였다.",
        wen: "He did all that God commanded.",
        wko: "명하신 대로 다 하였습니다.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "8–16",
    scene: "afar",
    art: "3D · R3F — tents with their ropes on a wide plain, and Abraham and Sarah walking on with the flock. Stars are stitched into the sky one by one, more and more of them, and far along the cloth a city on its foundations appears in gold thread. Abraham lifts his hand toward it and does not reach it.",
    en: {
      title: "Greeted from afar",
      quote: "“…having seen them and greeted them from afar…”",
      sref: "Hebrews 11:13",
      cap: "Scene: tents on the plain, stars past counting, and a city with foundations seen only from far away.",
      snips: [
        "Abraham went out, not knowing where",
        "He lived in tents in the land of promise",
        "He looked for the city with foundations",
        "Sarah received power to conceive",
        "Descendants as many as the stars and sand",
        "They died in faith, greeting the promises from afar",
        "They are seeking a homeland",
        "They could have gone back",
        "God has prepared for them a city",
      ],
      verses: [
        [
          8,
          "By faith Abraham obeyed when he was called to go out to a place that he was to receive as an inheritance. And he went out, not knowing where he was going.",
        ],
        [
          9,
          "By faith he went to live in the land of promise, as in a foreign land, living in tents with Isaac and Jacob, heirs with him of the same promise.",
        ],
        [
          10,
          "For he was looking forward to the city that has [foundations|foundations], whose designer and builder is God.",
        ],
        [
          11,
          "By faith Sarah herself received power to conceive, even when she was past the age, since she considered him faithful who had promised.",
        ],
        [
          12,
          "Therefore from one man, and him as good as dead, were born descendants as many as the stars of heaven and as many as the innumerable grains of sand by the seashore.",
        ],
        [
          13,
          "These all died in faith, not having received the things promised, but having seen them and greeted them from afar, and having acknowledged that they were [strangers|strangers and exiles] on the earth.",
        ],
        [
          14,
          "For people who speak thus make it clear that they are seeking a [homeland|homeland].",
        ],
        [
          15,
          "If they had been thinking of that land from which they had gone out, they would have had opportunity to return.",
        ],
        [
          16,
          "But as it is, they desire a better country, that is, a heavenly one. Therefore God is not ashamed to be called their God, for he has prepared for them a city.",
        ],
      ],
      com: [
        ["h", "Tents and a city"],
        [
          "p",
          "In Genesis 12 God calls Abram: “Go from your country and your kindred and your father’s house to the land that I will show you”, which is Canaan. The key link is Genesis 12:4, where Abraham went as the Lord had told him. The author explains that this going was by faith.",
        ],
        [
          "p",
          "Verses 9 and 10 set a contrast. Abraham lived in mobile, temporary tents, constantly moving, while he sought the city that cannot be shaken, the kingdom of God. All this was possible because of faith.",
        ],
        ["h", "Sarah, and him as good as dead"],
        [
          "p",
          "Genesis 17:15–21 tells of Sarah conceiving Isaac at around 90, with God’s promise that his covenant would be established with Isaac and not with Ishmael, who was born first from Hagar. In Genesis 18 the three visitors said that Sarah would have a son, and she listened and laughed to herself. Although she first laughed at the impossible, she later showed faith in God and became the mother of nations (Gen 17:16).",
        ],
        [
          "p",
          "“As good as dead” means Abraham’s very old age, around 100 or over, when he was almost unable to have children. Yet God blessed him with descendants as numerous as the stars in the sky and the grains of sand (Gen 15:5; 22:17; 32:12). This ties in with what the author said in verse 6.",
        ],
        ["h", "Not having received"],
        [
          "p",
          "The believers listed so far showed faith in God and some were called righteous, yet they did not receive the things promised. They died physically before seeing the true promised land at the second coming of Jesus, but the covenant continues through the generations to those who put their faith in God.",
        ],
        [
          "p",
          "God calls himself the God of Abraham, the God of Isaac and the God of Jacob. This shows that God validates their faith in him, for they did not turn back to their old, comfortable earthly lives.",
        ],
      ],
    },
    ko: {
      title: "멀리서 바라보고",
      quote: "“…그것을 멀리서 바라보고 반겼으며…”",
      sref: "히브리서 11:13",
      cap: "장면: 들판의 장막들, 셀 수 없는 별, 그리고 멀리서만 보이는 튼튼한 기초를 가진 도시.",
      snips: [
        "아브라함은 어디로 가는지 모르고 떠났습니다",
        "약속의 땅에서 장막에 살았습니다",
        "튼튼한 기초를 가진 도시를 바랐습니다",
        "사라는 임신할 능력을 얻었습니다",
        "별과 모래처럼 많은 자손이 태어났습니다",
        "멀리서 바라보고 반기며 믿음으로 죽었습니다",
        "고향을 찾고 있습니다",
        "돌아갈 기회가 있었을 것입니다",
        "하나님께서 한 도시를 마련해 두셨습니다",
      ],
      verses: [
        [
          8,
          "믿음으로 아브라함은, 부르심을 받았을 때에 순종하고, 장차 자기 몫으로 받을 땅을 향해 나갔습니다. 그런데 그는 어디로 가는지를 알지 못했지만, 떠난 것입니다.",
        ],
        [
          9,
          "믿음으로 그는, 약속하신 땅에서 타국에 몸 붙여 사는 나그네처럼 거류하였으며, 같은 약속을 함께 물려받을 이삭과 야곱과 함께 장막에서 살았습니다.",
        ],
        [
          10,
          "그는 하나님께서 설계하시고 세우실 튼튼한 [foundations|기초]를 가진 도시를 바랐던 것입니다.",
        ],
        [
          11,
          "믿음으로 사라는, 나이가 지나서 수태할 수 없는 몸이었는데도, 임신할 능력을 얻었습니다. 그가 약속하신 분을 신실하신 분으로 생각했기 때문입니다.",
        ],
        [
          12,
          "그래서 죽은 사람이나 다름없는 한 사람에게서, 하늘의 별과 같이 많고 바닷가의 모래와 같이 셀 수 없는, 많은 자손이 태어나게 되었습니다.",
        ],
        [
          13,
          "이 사람들은 모두 믿음을 따라 살다가 죽었습니다. 그들은 약속하신 것을 받지는 못했지만, 그것을 멀리서 바라보고 반겼으며, 땅에서는 [strangers|길손과 나그네] 신세임을 고백하였습니다.",
        ],
        [
          14,
          "이런 말을 하는 사람들은 자기네가 [homeland|고향]을 찾고 있다는 것을 나타내는 것입니다.",
        ],
        [
          15,
          "그들이 만일 떠나온 곳을 생각하고 있었더라면, 돌아갈 기회가 있었을 것입니다.",
        ],
        [
          16,
          "그러나 사실은 그들은 더 좋은 곳을 동경하고 있었던 것입니다. 그것은 곧 하늘의 고향입니다. 그래서 하나님께서는 그들의 하나님이라고 불리는 것을 부끄러워하지 않으시고, 그들을 위하여 한 도시를 마련해 두셨습니다.",
        ],
      ],
      com: [
        ["h", "장막과 도시"],
        [
          "p",
          "창세기 12장에서 하나님께서 아브람을 부르시며 그의 땅과 친족과 아버지의 집을 떠나 보여 주실 땅, 곧 가나안으로 가라고 하십니다. 핵심은 창세기 12장 4절입니다. 아브라함은 주님께서 말씀하신 대로 길을 떠났고, 저자는 이것이 믿음으로 한 일이라고 설명합니다.",
        ],
        [
          "p",
          "9절과 10절은 대조를 이룹니다. 아브라함은 임시로 옮겨 다니는 장막에서 살며 끊임없이 움직였고, 흔들리지 않는 도시, 곧 하나님 나라를 찾았습니다. 이 모든 것이 믿음으로 가능했습니다.",
        ],
        ["h", "사라와 죽은 사람이나 다름없는 한 사람"],
        [
          "p",
          "창세기 17장 15–21절은 사라가 약 90세에 이삭을 잉태하는 일과, 하나님의 언약이 먼저 태어난 하갈의 아들 이스마엘이 아니라 이삭과 세워진다는 약속을 전합니다. 창세기 18장에서 세 방문자가 사라가 아들을 낳을 것이라고 하자, 사라는 듣고 속으로 웃었습니다. 처음에는 불가능한 일이라 웃었지만 나중에 하나님을 향한 믿음을 보였고 여러 민족의 어머니가 되었습니다(창 17:16).",
        ],
        [
          "p",
          "“죽은 사람이나 다름없는”은 아이를 낳기 거의 어려운 약 100세 이상의 아브라함의 많은 나이를 뜻합니다. 그러나 하나님께서는 그에게 하늘의 별과 바다의 모래처럼 많은 자손을 주셨습니다(창 15:5; 22:17; 32:12). 이는 저자가 6절에서 한 말과 이어집니다.",
        ],
        ["h", "받지는 못했지만"],
        [
          "p",
          "지금까지 나온 믿는 사람들은 하나님을 향한 믿음을 보였고 어떤 이들은 의인이라 불렸지만, 약속하신 것을 받지는 못했습니다. 그들은 예수님의 재림 때의 참된 약속의 땅을 보기 전에 죽었지만, 언약은 대를 이어 하나님을 믿는 사람들에게 계속됩니다.",
        ],
        [
          "p",
          "하나님께서는 자신을 아브라함의 하나님, 이삭의 하나님, 야곱의 하나님이라고 부르십니다. 그들이 옛날의 편안한 땅의 삶으로 돌아가지 않았기에, 하나님께서 그들의 믿음을 인정하신다는 뜻입니다.",
        ],
      ],
    },
    words: {
      en: {
        foundations: {
          t: "Foundations",
          g: "themelious · θεμελίους",
          v: "11:10",
          s: "Something laid down",
          d: "A foundation, the substructure of a building. Tents have none; the city that cannot be shaken does.",
        },
        strangers: {
          t: "Strangers and exiles",
          g: "xenoi kai parepidēmoi · ξένοι καὶ παρεπίδημοί",
          v: "11:13",
          s: "Foreigners, temporary residents",
          d: "Xenos is a stranger or foreigner. Parepidēmos is a sojourner, a resident foreigner staying for a time.",
        },
        homeland: {
          t: "Homeland",
          g: "patrida · πατρίδα",
          v: "11:14",
          s: "A father-land",
          d: "Homeland, native country; figuratively, the heavenly home.",
        },
      },
      ko: {
        foundations: {
          t: "기초",
          g: "themelious · θεμελίους",
          v: "11:10",
          s: "아래 놓인 것",
          d: "건물의 기초입니다. 장막에는 없고, 흔들리지 않는 도시에는 있습니다.",
        },
        strangers: {
          t: "길손과 나그네",
          g: "xenoi kai parepidēmoi · ξένοι καὶ παρεπίδημοί",
          v: "11:13",
          s: "외국인, 잠시 머무는 사람",
          d: "크세노스는 낯선 사람, 외국인입니다. 파레피데모스는 잠시 머물러 사는 외국인입니다.",
        },
        homeland: {
          t: "고향",
          g: "patrida · πατρίδα",
          v: "11:14",
          s: "조상의 땅",
          d: "고국, 태어난 곳을 뜻하고, 비유적으로는 하늘의 고향을 가리킵니다.",
        },
      },
    },
    chips: [
      {
        id: "gen12-1",
        tag: "OT",
        en: "Gen 12:1",
        ko: "창 12:1",
        ten: "Now the Lord said to Abram, “Go from your country and your kindred and your father’s house to the land that I will show you.",
        tko: "주님께서 아브람에게 말씀하셨다. “너는, 네가 살고 있는 땅과, 네가 난 곳과, 너의 아버지의 집을 떠나서, 내가 보여 주는 땅으로 가거라.",
        wen: "The call to go.",
        wko: "떠나라는 부르심.",
      },
      {
        id: "gen12-4",
        tag: "OT",
        en: "Gen 12:4",
        ko: "창 12:4",
        ten: "So Abram went, as the Lord had told him, and Lot went with him. Abram was seventy-five years old when he departed from Haran.",
        tko: "아브람은 주님께서 말씀하신 대로 길을 떠났다. 롯도 그와 함께 길을 떠났다. 아브람이 하란을 떠날 때에, 나이는 일흔다섯이었다.",
        wen: "He went, as the Lord had told him.",
        wko: "말씀하신 대로 길을 떠났습니다.",
      },
      {
        id: "gen15-5",
        tag: "OT",
        en: "Gen 15:5",
        ko: "창 15:5",
        ten: "And he brought him outside and said, “Look toward heaven, and number the stars, if you are able to number them.” Then he said to him, “So shall your offspring be.”",
        tko: "주님께서 아브람을 데리고 바깥으로 나가서 말씀하셨다. “하늘을 쳐다보아라. 네가 셀 수 있거든, 저 별들을 세어 보아라.” 그리고는 주님께서 아브람에게 말씀하셨다. “너의 자손이 저 별처럼 많아질 것이다.”",
        wen: "Number the stars.",
        wko: "별들을 세어 보아라.",
      },
      {
        id: "gen17-16",
        tag: "OT",
        en: "Gen 17:16",
        ko: "창 17:16",
        ten: "I will bless her, and moreover, I will give you a son by her. I will bless her, and she shall become nations; kings of peoples shall come from her.”",
        tko: "내가 그에게 복을 주어, 너에게 아들을 낳아 주게 하겠다. 내가 너의 아내에게 복을 주어서, 여러 민족의 어머니가 되게 하고, 백성들을 다스리는 왕들이 그에게서 나오게 하겠다.“",
        wen: "Sarah, the mother of nations.",
        wko: "여러 민족의 어머니.",
      },
      {
        id: "gen18-12",
        tag: "OT",
        en: "Gen 18:12",
        ko: "창 18:12",
        ten: "So Sarah laughed to herself, saying, “After I am worn out, and my lord is old, shall I have pleasure?”",
        tko: "그러므로 사라는 “나는 기력이 다 쇠진하였고, 나의 남편도 늙었는데, 어찌 나에게 그런 즐거운 일이 있으랴!” 하고, 속으로 웃으면서 중얼거렸다.",
        wen: "Sarah first laughed.",
        wko: "사라는 처음에 웃었습니다.",
      },
      {
        id: "gen22-17",
        tag: "OT",
        en: "Gen 22:17",
        ko: "창 22:17",
        ten: "I will surely bless you, and I will surely multiply your offspring as the stars of heaven and as the sand that is on the seashore. And your offspring shall possess the gate of his enemies,",
        tko: "내가 반드시 너에게 큰 복을 주며, 너의 자손이 크게 불어나서, 하늘의 별처럼, 바닷가의 모래처럼 많아지게 하겠다. 너의 자손은 원수의 성을 차지할 것이다.",
        wen: "The stars and the sand.",
        wko: "별과 모래.",
      },
      {
        id: "exo3-6",
        tag: "OT",
        en: "Exod 3:6",
        ko: "출 3:6",
        ten: "And he said, “I am the God of your father, the God of Abraham, the God of Isaac, and the God of Jacob.” And Moses hid his face, for he was afraid to look at God.",
        tko: "하나님이 또 말씀하셨다. “나는 너의 조상의 하나님, 곧 아브라함의 하나님, 이삭의 하나님, 야곱의 하나님이다.” 모세는 하나님을 뵙기가 두려워서, 얼굴을 가렸다.",
        wen: "Not ashamed to be called their God.",
        wko: "그들의 하나님이라 불리십니다.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "17–22",
    scene: "receivedBack",
    art: "3D · R3F — Moriah as a green hill. Abraham lifts his hand over Isaac on the altar of stones and wood, a gold light comes from above, the hand comes down and Isaac stands. Along the cloth Isaac and then Jacob, leaning on his staff, bless the next generation, and last Joseph’s bones are carried in a chest.",
    en: {
      title: "He received him back",
      quote: "“…figuratively speaking, he did receive him back.”",
      sref: "Hebrews 11:19",
      cap: "Scene: Isaac given back on Moriah, the blessing passed on, and Joseph’s bones made ready for the road home.",
      snips: [
        "Abraham, when tested, offered up Isaac",
        "Through Isaac shall your offspring be named",
        "God was able to raise him from the dead",
        "Isaac blessed Jacob and Esau",
        "Jacob blessed the sons of Joseph",
        "Joseph gave directions concerning his bones",
      ],
      verses: [
        [
          17,
          "By faith Abraham, when he was [tested|tested], offered up Isaac, and he who had received the promises was in the act of offering up his only son,",
        ],
        [
          18,
          "of whom it was said, “Through Isaac shall your offspring be named.”",
        ],
        [
          19,
          "He considered that God was able even to raise him from the dead, from which, [figuratively|figuratively speaking], he did receive him back.",
        ],
        [20, "By faith Isaac invoked future blessings on Jacob and Esau."],
        [
          21,
          "By faith Jacob, when dying, blessed each of the sons of Joseph, bowing in worship over the head of his staff.",
        ],
        [
          22,
          "By faith Joseph, at the end of his life, made mention of the exodus of the Israelites and gave directions concerning his [bones|bones].",
        ],
      ],
      com: [
        ["h", "On Moriah"],
        [
          "p",
          "Genesis 22 shows Abraham taking Isaac up to the region of Moriah and obeying God to offer him as the sacrifice. This happens after God had said that through Isaac Abraham’s offspring would be reckoned (21:12). After hearing God’s promise, Abraham was tested, and he obeyed because of his faith that God would raise Isaac back from the dead.",
        ],
        [
          "p",
          "With John 8:56 in mind, this scene also foreshadows the death and resurrection of Jesus Christ, of which Abraham had a glimpse.",
        ],
        ["h", "Passing on the blessing"],
        [
          "p",
          "Genesis 27 is the scene where Isaac blesses Jacob, thinking he was Esau, and then Esau. This agrees with God’s answer to Rebekah in Genesis 25:23, “the older shall serve the younger”. Isaac blesses Jacob again in Genesis 28:1–4.",
        ],
        [
          "p",
          "In Genesis 49 Jacob blesses his twelve sons, and in chapter 48 he blesses Joseph’s sons Manasseh and Ephraim, placing his right hand on the younger Ephraim instead of the firstborn Manasseh.",
        ],
        [
          "p",
          "The importance of Isaac’s and Jacob’s blessing is the transfer of the Abrahamic covenant to the next generation. It was not a simple blessing. Through these two men God is blessing the next generation, up until this day and through Jesus at the end. They were passing the baton of God’s covenant promises so that the next generation could keep running with it to the end.",
        ],
        ["h", "Joseph’s bones"],
        [
          "p",
          "In Genesis 50:25 Joseph made the Israelites swear an oath to carry his bones up from Egypt. Joseph was very powerful, wealthy and high in authority there, yet he did not want to be buried in a foreign land, because he did not consider Egypt his true home. He had faith that the Israelites would enter the promised land he had longed for.",
        ],
      ],
    },
    ko: {
      title: "되받은 아들",
      quote:
        "“그러므로 비유하자면, 아브라함은 이삭을 죽은 사람들 가운데서 되받은 것입니다.”",
      sref: "히브리서 11:19",
      cap: "장면: 모리아에서 되받은 이삭, 다음 세대로 이어지는 축복, 집으로 돌아갈 길을 기다리는 요셉의 뼈.",
      snips: [
        "아브라함은 시험을 받을 때에 이삭을 바쳤습니다",
        "이삭에게서 네 자손이 태어날 것입니다",
        "하나님께서 되살리실 수 있다고 생각했습니다",
        "이삭은 야곱과 에서를 축복했습니다",
        "야곱은 요셉의 아들들을 축복했습니다",
        "요셉은 자기 뼈를 어떻게 할지 지시했습니다",
      ],
      verses: [
        [
          17,
          "아브라함은 [tested|시험]을 받을 때에, 믿음으로 이삭을 바쳤습니다. 더구나 약속을 받은 그가 그의 외아들을 기꺼이 바치려 했던 것입니다.",
        ],
        [
          18,
          "일찍이 하나님께서 아브라함에게 말씀하시기를 “이삭에게서 네 자손이라 불릴 자손들이 태어날 것이다” 하셨습니다.",
        ],
        [
          19,
          "하나님께서는 이삭을 죽은 사람들 가운데서도 되살리실 수 있다고 아브라함은 생각했던 것입니다. 그러므로 [figuratively|비유하자면], 아브라함은 이삭을 죽은 사람들 가운데서 되받은 것입니다.",
        ],
        [
          20,
          "믿음으로 이삭은, 또한 장래 일을 놓고 야곱과 에서를 축복해 주었습니다.",
        ],
        [
          21,
          "야곱은 죽을 때에, 믿음으로 요셉의 아들들을 하나하나 축복해 주고, 그의 지팡이를 짚고 서서, 하나님께 경배를 드렸습니다.",
        ],
        [
          22,
          "믿음으로 요셉은 죽을 때에, 이스라엘 자손들이 이집트에서 나갈 일을 언급하고, 자기 [bones|뼈]를 어떻게 할지를 지시하였습니다.",
        ],
      ],
      com: [
        ["h", "모리아에서"],
        [
          "p",
          "창세기 22장에서 아브라함은 이삭을 데리고 모리아 땅으로 올라가 하나님께 순종하여 그를 제물로 바칩니다. 이는 하나님께서 이삭을 통해 아브라함의 자손이 불릴 것이라고 말씀하신 뒤의 일입니다(21:12). 약속을 들은 뒤에 시험을 받았고, 아브라함은 하나님께서 이삭을 죽은 사람들 가운데서 되살리실 것을 믿었기에 순종했습니다.",
        ],
        [
          "p",
          "요한복음 8장 56절과 관련해서 보면, 이 장면은 예수 그리스도의 죽음과 부활도 미리 보여 주며, 아브라함은 그것을 잠시 보았습니다.",
        ],
        ["h", "축복을 이어 줌"],
        [
          "p",
          "창세기 27장에서 이삭은 에서로 생각하고 야곱을 축복한 뒤 에서를 축복합니다. 이는 창세기 25장 23절에서 리브가에게 답하신 “형이 동생을 섬길 것이다”라는 말씀과 일치합니다. 이삭은 창세기 28장 1–4절에서 야곱을 다시 축복합니다.",
        ],
        [
          "p",
          "창세기 49장에서 야곱은 열두 아들을 축복하고, 48장에서는 요셉의 아들 므낫세와 에브라임을 축복하며, 오른손을 맏아들 므낫세가 아니라 작은 아들 에브라임에게 얹습니다.",
        ],
        [
          "p",
          "이삭과 야곱의 축복이 중요한 까닭은 아브라함의 언약이 다음 세대로 넘어가기 때문입니다. 단순한 축복이 아니라, 이 두 사람을 통해 하나님께서 다음 세대를 축복하시고 오늘까지, 마지막에는 예수님을 통해 이어 가십니다. 그들은 하나님의 언약의 약속이라는 바통을 넘겨 주어 다음 세대가 끝까지 달리게 했습니다.",
        ],
        ["h", "요셉의 뼈"],
        [
          "p",
          "창세기 50장 25절에서 요셉은 이스라엘 자손에게 자기 뼈를 이집트에서 옮겨 가겠다고 맹세하게 합니다. 요셉은 이집트에서 큰 권세와 부를 가졌지만 이집트를 참된 고향으로 여기지 않았기에 타국에 묻히기를 원하지 않았습니다. 그는 자신이 그리워한 약속의 땅에 이스라엘 자손이 들어갈 것을 믿었습니다.",
        ],
      ],
    },
    words: {
      en: {
        tested: {
          t: "Tested",
          g: "peirazomenos · πειραζόμενος",
          v: "11:17",
          s: "Put to the test",
          d: "To test, to try, to examine.",
        },
        figuratively: {
          t: "Figuratively speaking",
          g: "en parabolē · ἐν παραβολῇ",
          v: "11:19",
          s: "In a comparison",
          d: "Parabolē is a comparison, an illustration, the word behind “parable”.",
        },
        bones: {
          t: "Bones",
          g: "osteōn · ὀστέων",
          v: "11:22",
          s: "Not to stay in Egypt",
          d: "A bone. Joseph did not consider Egypt his true home.",
        },
      },
      ko: {
        tested: {
          t: "시험",
          g: "peirazomenos · πειραζόμενος",
          v: "11:17",
          s: "시험을 받음",
          d: "시험함, 살펴봄을 뜻합니다.",
        },
        figuratively: {
          t: "비유하자면",
          g: "en parabolē · ἐν παραβολῇ",
          v: "11:19",
          s: "견주어 말하면",
          d: "파라볼레는 비교, 예시를 뜻하며 ‘비유’라는 말의 바탕입니다.",
        },
        bones: {
          t: "뼈",
          g: "osteōn · ὀστέων",
          v: "11:22",
          s: "이집트에 남지 않음",
          d: "뼈입니다. 요셉은 이집트를 참된 고향으로 여기지 않았습니다.",
        },
      },
    },
    chips: [
      {
        id: "gen21-12",
        tag: "OT",
        en: "Gen 21:12",
        ko: "창 21:12",
        ten: "But God said to Abraham, “Be not displeased because of the boy and because of your slave woman. Whatever Sarah says to you, do as she tells you, for through Isaac shall your offspring be named.",
        tko: "하나님이 그에게 말씀하셨다. “그 아들과 그 어머니인 여종의 일로 너무 걱정하지 말아라. 이삭에게서 태어나는 사람이 너의 씨가 될 것이니, 사라가 너에게 말한 대로 다 들어 주어라.",
        wen: "Through Isaac.",
        wko: "이삭에게서.",
      },
      {
        id: "gen22-2",
        tag: "OT",
        en: "Gen 22:2",
        ko: "창 22:2",
        ten: "He said, “Take your son, your only son Isaac, whom you love, and go to the land of Moriah, and offer him there as a burnt offering on one of the mountains of which I shall tell you.”",
        tko: "하나님이 말씀하셨다. “너의 아들, 네가 사랑하는 외아들 이삭을 데리고 모리아 땅으로 가거라. 내가 너에게 일러주는 산에서 그를 번제물로 바쳐라.”",
        wen: "Your only son, whom you love.",
        wko: "네가 사랑하는 외아들.",
      },
      {
        id: "jhn8-56",
        tag: "NT",
        en: "John 8:56",
        ko: "요 8:56",
        ten: "Your father Abraham rejoiced that he would see my day. He saw it and was glad.”",
        tko: "너희의 조상 아브라함은 나의 날을 보리라고 기대하며 즐거워하였고, 마침내 보고 기뻐하였다.“",
        wen: "Abraham saw my day.",
        wko: "아브라함은 나의 날을 보았습니다.",
      },
      {
        id: "gen25-23",
        tag: "OT",
        en: "Gen 25:23",
        ko: "창 25:23",
        ten: "And the Lord said to her, “Two nations are in your womb, and two peoples from within you shall be divided; the one shall be stronger than the other, the older shall serve the younger.”",
        tko: "주님께서 그에게 대답하셨다. “두 민족이 너의 태 안에 들어 있다. 너의 태 안에서 두 백성이 나뉠 것이다. 한 백성이 다른 백성보다 강할 것이다. 형이 동생을 섬길 것이다.”",
        wen: "The older shall serve the younger.",
        wko: "형이 동생을 섬길 것입니다.",
      },
      {
        id: "gen48-14",
        tag: "OT",
        en: "Gen 48:14",
        ko: "창 48:14",
        ten: "And Israel stretched out his right hand and laid it on the head of Ephraim, who was the younger, and his left hand on the head of Manasseh, crossing his hands (for Manasseh was the firstborn).",
        tko: "그런데 이스라엘은, 에브라임이 작은 아들인데도 그의 오른손을 에브라임의 머리 위에 얹고, 므낫세는 맏아들인데도 그의 왼손을 므낫세의 머리 위에 얹었다. 야곱이 그의 팔을 엇갈리게 내민 것이다.",
        wen: "The right hand on the younger.",
        wko: "오른손을 작은 아들에게.",
      },
      {
        id: "gen50-25",
        tag: "OT",
        en: "Gen 50:25",
        ko: "창 50:25",
        ten: "Then Joseph made the sons of Israel swear, saying, “God will surely visit you, and you shall carry up my bones from here.”",
        tko: "요셉은 이스라엘 자손에게 맹세를 시키면서 일렀다. “하나님께서 반드시 너희를 돌보실 날이 온다. 그 때에 너희는 나의 뼈를 이 곳에서 옮겨서, 그리로 가지고 가야 한다.”",
        wen: "Carry up my bones.",
        wko: "나의 뼈를 옮겨 가라.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "23–31",
    scene: "invisible",
    art: "3D · R3F — the basket hidden in the reeds. The sea stands up as two walls of wave stitching and the people cross on dry ground. Beyond them Jericho’s courses of stone slide and fall after the marching, and one piece of wall stays standing with Rahab’s scarlet cord hanging from its window.",
    en: {
      title: "Him who is invisible",
      quote: "“…he endured as seeing him who is invisible.”",
      sref: "Hebrews 11:27",
      cap: "Scene: the basket in the reeds, the sea standing open, and Jericho down with the scarlet cord still hanging.",
      snips: [
        "Moses’ parents hid him, unafraid of the king",
        "He refused to be called the son of Pharaoh’s daughter",
        "He chose mistreatment with God’s people",
        "The reproach of Christ was greater wealth",
        "He endured as seeing him who is invisible",
        "He kept the Passover and sprinkled the blood",
        "The people crossed the Red Sea",
        "The walls of Jericho fell",
        "Rahab did not perish",
      ],
      verses: [
        [
          23,
          "By faith Moses, when he was born, was hidden for three months by his parents, because they saw that the child was [beautiful|beautiful], and they were not afraid of the king’s edict.",
        ],
        [
          24,
          "By faith Moses, when he was grown up, refused to be called the son of Pharaoh’s daughter,",
        ],
        [
          25,
          "choosing rather to be mistreated with the people of God than to enjoy the fleeting pleasures of sin.",
        ],
        [
          26,
          "He considered the [reproach|reproach] of Christ greater wealth than the treasures of Egypt, for he was looking to the reward.",
        ],
        [
          27,
          "By faith he left Egypt, not being afraid of the anger of the king, for he endured as seeing him who is [invisible|invisible].",
        ],
        [
          28,
          "By faith he kept the Passover and sprinkled the blood, so that the Destroyer of the firstborn might not touch them.",
        ],
        [
          29,
          "By faith the people crossed the Red Sea as on dry land, but the Egyptians, when they attempted to do the same, were drowned.",
        ],
        [
          30,
          "By faith the walls of Jericho fell down after they had been encircled for seven days.",
        ],
        [
          31,
          "By faith Rahab the prostitute did not perish with those who were disobedient, because she had given a friendly welcome to the spies.",
        ],
      ],
      com: [
        ["h", "Joseph’s people in Egypt"],
        [
          "p",
          "Exodus 1 explains that a new Pharaoh who did not know Joseph ruled Egypt. As the Israelites grew larger and stronger, he wanted all the male babies killed. In chapter 2 Amram and Jochebed hid Moses for three months because they saw that he was beautiful. Stephen says beautiful in God’s sight (Acts 7:20). The parents recognised something divinely unique and purposed by God: they knew his divine calling. When Moses grew older, he killed an Egyptian who was beating a Hebrew.",
        ],
        ["h", "More afraid of the invisible God"],
        [
          "p",
          "Here we see the definition of faith from verse 1, the conviction of things not seen. “Him who is invisible” means that Moses was more afraid of God, whom we cannot see, than of the visible Pharaoh.",
        ],
        [
          "p",
          "Exodus 12 shows God instructing Moses and Aaron to put the blood of the lamb on the doorposts so that God would not strike the firstborn. So through Moses we see parents fearing God more than Pharaoh, Moses following God rather than worldly pleasures, faith put in the invisible God, and the keeping of the Passover.",
        ],
        ["h", "The sea, the walls and Rahab"],
        [
          "p",
          "Exodus 14 is the scene where God delivers the Israelites out of Egypt through the Red Sea. The people believed in the deliverance from God through Moses, while the Egyptians were swept away by the returning tide.",
        ],
        [
          "p",
          "In Joshua 5:13–6:21 Joshua meets the angel of God and receives instructions to encircle the wall for seven days, and they did as instructed.",
        ],
        [
          "p",
          "In Joshua 6:22–23 Joshua saves Rahab and her family, because she feared God and knew that Jericho was going to be delivered to the Israelites (2:8–21). She helped the spies and in the end received salvation, as the author hints.",
        ],
      ],
    },
    ko: {
      title: "보이지 않는 분을 보는 듯이",
      quote:
        "“그는 보이지 않는 분을 마치 보는 듯이 바라보면서 견디어냈습니다.”",
      sref: "히브리서 11:27",
      cap: "장면: 갈대 사이의 바구니, 갈라져 선 바다, 무너진 여리고와 그대로 걸린 붉은 줄.",
      snips: [
        "모세의 부모는 왕을 두려워하지 않고 숨겼습니다",
        "공주의 아들이라 불리기를 거절했습니다",
        "하나님의 백성과 함께 학대받는 길을 택했습니다",
        "그리스도를 위한 모욕이 더 값졌습니다",
        "보이지 않는 분을 보는 듯이 견뎠습니다",
        "유월절을 행하고 피를 뿌렸습니다",
        "홍해를 마른 땅처럼 건넜습니다",
        "여리고 성벽이 무너졌습니다",
        "라합은 망하지 않았습니다",
      ],
      verses: [
        [
          23,
          "모세가 태어났을 때에, 믿음으로 그 부모는 석 달 동안 아기를 숨겨두었습니다. 그들은 아기가 [beautiful|잘생긴] 것을 보았기 때문입니다. 그들은 왕의 명령을 두려워하지 않았습니다.",
        ],
        [
          24,
          "믿음으로 모세는, 어른이 되었을 때에, 바로 왕의 공주의 아들이라 불리기를 거절하였습니다.",
        ],
        [
          25,
          "오히려 그는 잠시 죄의 향락을 누리는 것보다 하나님의 백성과 함께 학대받는 길을 택하였습니다.",
        ],
        [
          26,
          "모세는 그리스도를 위하여 받는 [reproach|모욕]을 이집트의 재물보다 더 값진 것으로 여겼습니다. 그는 장차 받을 상을 내다보고 있었던 것입니다.",
        ],
        [
          27,
          "믿음으로 그는 왕의 분노를 두려워하지 않고 이집트를 떠났습니다. 그는 [invisible|보이지 않는] 분을 마치 보는 듯이 바라보면서 견디어냈습니다.",
        ],
        [
          28,
          "믿음으로 모세는, 유월절과 피 뿌리는 의식을 행하여서, 모든 맏아들 및 맏배를 멸하는 이가 그들을 건드리지 않게 하였습니다.",
        ],
        [
          29,
          "믿음으로 이스라엘 사람들은 홍해를 마른 땅을 지나가듯이 건넜습니다. 그러나 이집트 사람들은 그렇게 해보다가 빠져 죽었습니다.",
        ],
        [30, "믿음으로 이레 동안 여리고 성을 돌았더니, 성벽이 무너졌습니다."],
        [
          31,
          "믿음으로 창녀 라합은 정탐꾼들을 호의로 영접해 주어서, 순종하지 않은 사람들과 함께 망하지 아니하였습니다.",
        ],
      ],
      com: [
        ["h", "이집트의 이스라엘 자손"],
        [
          "p",
          "출애굽기 1장은 요셉을 알지 못하는 새 왕이 이집트를 다스렸다고 설명합니다. 이스라엘 자손이 많아지고 강해지자, 왕은 남자 아기를 모두 죽이려 했습니다. 2장에서 아므람과 요게벳은 모세가 잘생긴 것을 보고 석 달 동안 숨겼습니다. 스데반은 하나님 보시기에 아름다웠다고 말합니다(행 7:20). 부모는 하나님께서 정하신 특별한 뜻을 알아보았고, 그의 신적인 부르심을 알았습니다. 모세는 자란 뒤에 히브리 사람을 때리는 이집트 사람을 죽였습니다.",
        ],
        ["h", "보이지 않는 하나님을 더 두려워함"],
        [
          "p",
          "여기서 1절의 믿음의 정의, 곧 보이지 않는 것들의 증거를 봅니다. “보이지 않는 분”은 모세가 보이는 바로보다 우리가 볼 수 없는 하나님을 더 두려워했다는 뜻입니다.",
        ],
        [
          "p",
          "출애굽기 12장에서 하나님께서는 모세와 아론에게 어린 양의 피를 문설주에 바르게 하셔서 맏아들을 치지 않으십니다. 이렇게 모세를 통해 우리는 바로보다 하나님을 두려워한 부모, 세상의 향락보다 하나님을 따른 모세, 보이지 않는 하나님을 향한 믿음, 유월절을 지킴을 봅니다.",
        ],
        ["h", "바다와 성벽과 라합"],
        [
          "p",
          "출애굽기 14장에서 하나님께서 홍해를 통해 이스라엘 자손을 이집트에서 구원하십니다. 백성은 모세를 통한 하나님의 구원을 믿었고, 이집트 사람들은 돌아오는 물에 휩쓸렸습니다.",
        ],
        [
          "p",
          "여호수아 5장 13절–6장 21절에서 여호수아는 하나님의 천사를 만나 이레 동안 성을 돌라는 지시를 받고, 그들은 그대로 행합니다.",
        ],
        [
          "p",
          "여호수아 6장 22–23절에서 여호수아는 라합과 그 가족을 살려 줍니다. 라합은 하나님을 두려워했고 여리고가 이스라엘에게 넘어갈 것을 알았습니다(2:8–21). 그는 정탐꾼들을 도왔고, 저자가 암시하듯 마침내 구원을 받았습니다.",
        ],
      ],
    },
    words: {
      en: {
        beautiful: {
          t: "Beautiful",
          g: "asteion · ἀστεῖον",
          v: "11:23",
          s: "More than his looks",
          d: "Comely, fair. The parents recognised a divine calling on the child; Stephen says beautiful in God’s sight (Acts 7:20).",
        },
        reproach: {
          t: "Reproach",
          g: "oneidismon · ὀνειδισμὸν",
          v: "11:26",
          s: "Insult and disgrace",
          d: "Reproach, insult, disgrace.",
        },
        invisible: {
          t: "Invisible",
          g: "aoraton · ἀόρατον",
          v: "11:27",
          s: "The one who cannot be seen",
          d: "Moses was more afraid of God, whom we cannot see, than of the visible Pharaoh.",
        },
      },
      ko: {
        beautiful: {
          t: "잘생긴",
          g: "asteion · ἀστεῖον",
          v: "11:23",
          s: "겉모습 이상의 뜻",
          d: "아름다움. 부모는 아기에게 있는 신적인 부르심을 알아보았고, 스데반은 하나님 보시기에 아름다웠다고 말합니다(행 7:20).",
        },
        reproach: {
          t: "모욕",
          g: "oneidismon · ὀνειδισμὸν",
          v: "11:26",
          s: "욕과 수치",
          d: "모욕, 욕설, 수치를 뜻합니다.",
        },
        invisible: {
          t: "보이지 않는",
          g: "aoraton · ἀόρατον",
          v: "11:27",
          s: "볼 수 없는 분",
          d: "모세는 보이는 바로보다 우리가 볼 수 없는 하나님을 더 두려워했습니다.",
        },
      },
    },
    chips: [
      {
        id: "act7-20",
        tag: "NT",
        en: "Acts 7:20",
        ko: "행 7:20",
        ten: "At this time Moses was born; and he was beautiful in God’s sight. And he was brought up for three months in his father’s house,",
        tko: "바로 이 때에 모세가 태어났습니다. 그는 용모가 아주 잘 생긴 아기였습니다. 그의 부모는 그를 석 달 동안 몰래 집에서 길렀습니다.",
        wen: "Beautiful in God’s sight.",
        wko: "하나님 보시기에.",
      },
      {
        id: "exo12-13",
        tag: "OT",
        en: "Exod 12:13",
        ko: "출 12:13",
        ten: "The blood shall be a sign for you, on the houses where you are. And when I see the blood, I will pass over you, and no plague will befall you to destroy you, when I strike the land of Egypt.",
        tko: "문틀에 피를 발랐으면, 그것은 너희가 살고 있는 집의 표적이니, 내가 이집트 땅을 칠 때에, 문설주에 피를 바른 집은, 그 피를 보고 내가 너희를 치지 않고 넘어갈 터이니, 너희는 재앙을 피하여 살아 남을 것이다.",
        wen: "When I see the blood.",
        wko: "피를 보고.",
      },
      {
        id: "exo14-22",
        tag: "OT",
        en: "Exod 14:22",
        ko: "출 14:22",
        ten: "And the people of Israel went into the midst of the sea on dry ground, the waters being a wall to them on their right hand and on their left.",
        tko: "이스라엘 자손은 바다 한가운데로 마른 땅을 밟으며 지나갔다. 물이 좌우에서 그들을 가리는 벽이 되었다.",
        wen: "A wall on the right and on the left.",
        wko: "좌우의 벽.",
      },
      {
        id: "jos6-20",
        tag: "OT",
        en: "Josh 6:20",
        ko: "수 6:20",
        ten: "So the people shouted, and the trumpets were blown. As soon as the people heard the sound of the trumpet, the people shouted a great shout, and the wall fell down flat, so that the people went up into the city, every man straight before him, and they captured the city.",
        tko: "제사장들이 나팔을 불었다. 그 나팔 소리를 듣고서, 백성이 일제히 큰소리로 외치니, 성벽이 무너져 내렸다. 백성이 일제히 성으로 진격하여 그 성을 점령하였다.",
        wen: "The wall fell.",
        wko: "성벽이 무너졌습니다.",
      },
      {
        id: "jos6-25",
        tag: "OT",
        en: "Josh 6:25",
        ko: "수 6:25",
        ten: "But Rahab the prostitute and her father’s household and all who belonged to her, Joshua saved alive. And she has lived in Israel to this day, because she hid the messengers whom Joshua sent to spy out Jericho.",
        tko: "여호수아는 창녀 라합과 그의 아버지 집과 그에게 딸린 사람을 다 살려 주었다. 라합이 오늘날까지 이스라엘 백성 가운데 살고 있는데, 그것은 여호수아가 여리고를 정탐하도록 보낸 사람들을 그가 숨겨 주었기 때문이다.",
        wen: "Rahab saved alive.",
        wko: "라합은 살았습니다.",
      },
    ],
  },

  {
    id: "m6",
    num: "VI",
    range: "32–38",
    scene: "notWorthy",
    art: "3D · R3F — one rough stretch of cloth. A lion stands with its mouth shut before a raised hand, fire burns in a furnace mouth, and a prisoner stands in chains. Thin figures in skins walk on with staffs toward the caves in a mountain, and one by one they go in and are gone. It is told as a chronicle and shows no wounds.",
    en: {
      title: "Not worthy of them",
      quote: "“…of whom the world was not worthy…”",
      sref: "Hebrews 11:38",
      cap: "Scene: victories and chains on one cloth, and people in skins walking on toward the caves.",
      snips: [
        "Time would fail to tell of them all",
        "They conquered kingdoms and stopped lions",
        "They quenched fire and escaped the sword",
        "Women received back their dead; some refused release",
        "Others suffered mocking, chains and prison",
        "Stoned, sawn in two, in skins of sheep and goats",
        "The world was not worthy of them",
      ],
      verses: [
        [
          32,
          "And what more shall I say? For time would fail me to tell of Gideon, Barak, Samson, Jephthah, of David and Samuel and the prophets—",
        ],
        [
          33,
          "who through faith conquered kingdoms, enforced justice, obtained promises, stopped the mouths of lions,",
        ],
        [
          34,
          "quenched the power of fire, escaped the edge of the sword, were made strong out of weakness, became mighty in war, put foreign armies to flight.",
        ],
        [
          35,
          "Women received back their dead by resurrection. Some were tortured, refusing to accept release, so that they might rise again to a [better|better life].",
        ],
        [
          36,
          "Others suffered mocking and flogging, and even chains and imprisonment.",
        ],
        [
          37,
          "They were stoned, they were sawn in two, they were killed with the sword. They went about in skins of sheep and goats, destitute, afflicted, mistreated—",
        ],
        [
          38,
          "of whom the world was not [worthy|worthy] — wandering about in deserts and mountains, and in dens and caves of the earth.",
        ],
      ],
      com: [
        ["h", "Time would fail"],
        [
          "p",
          "Conquered kingdoms: Joshua, David and the judges defeated pagan nations occupying or threatening Canaan. Enforced justice: Samuel and David were godly rulers and judges who maintained divine justice in Israel. Obtained promises: Joshua and Caleb entered Canaan as promised.",
        ],
        [
          "p",
          "Stopped the mouths of lions: Daniel in the lions’ den, and Samson and David killing lions with their bare hands. Quenched the power of fire: Daniel’s three friends walked out of the furnace unharmed, even their clothing unaffected. Escaped the edge of the sword: Elijah and Elisha survived attempts on their lives from King Ahab and Queen Jezebel.",
        ],
        [
          "p",
          "Made strong out of weakness: Samson lost his strength and regained it when blinded and imprisoned. Mighty in war, putting foreign armies to flight: the judges and David’s mighty men won battles against armies more numerous than they were.",
        ],
        ["h", "Better than release"],
        [
          "p",
          "In 1 Kings 17 Elijah meets a widow at Zarephath during a great drought. Her son died, Elijah cried out to God, and the boy lived again.",
        ],
        [
          "p",
          "The tortured who refused release refers to a non-canonical book, but the point is that believers endure torture because they know they have a better life than their physical life.",
        ],
        ["h", "Whose names we know"],
        [
          "p",
          "Mocking, flogging, chains and imprisonment: Jeremiah, Micaiah (1 Kings 22:24–27) and Hanani the seer (2 Chronicles 16:7–10). Stoned: Zechariah (2 Chronicles 24:20–21) and Naboth (1 Kings 21:13). Sawn in two: the prophet Isaiah, from historical books outside the Bible. Killed by the sword: Uriah (Jeremiah 26:20–23) and the prophets slaughtered in Jezebel’s time (1 Kings 19:10).",
        ],
        [
          "p",
          "Skins of sheep and goats, destitute and mistreated: Elijah and Elisha pursued by Ahab and Jezebel (2 Kings 1:8), and the hundred prophets hidden by Obadiah (1 Kings 18:4).",
        ],
        [
          "q",
          "They were too good for this world, wandering over deserts and mountains, hiding in caves and holes in the ground. (NLT)",
        ],
      ],
    },
    ko: {
      title: "세상이 받아들일 수 없었던 사람들",
      quote: "“세상은 이런 사람들을 받아들일 만한 곳이 못 되었습니다.”",
      sref: "히브리서 11:38",
      cap: "장면: 승리와 쇠사슬이 한 천에 있고, 가죽을 입은 사람들이 동굴을 향해 걸어갑니다.",
      snips: [
        "다 말하려면 시간이 모자랍니다",
        "나라들을 정복하고 사자의 입을 막았습니다",
        "불의 위력을 꺾고 칼날을 피했습니다",
        "여자들은 부활한 가족을 맞이했고, 어떤 이들은 놓여나기를 거부했습니다",
        "조롱과 채찍과 결박과 감옥을 겪었습니다",
        "돌에 맞고 톱질을 당하고 가죽을 입고 떠돌았습니다",
        "세상은 그들을 받아들일 만한 곳이 못 되었습니다",
      ],
      verses: [
        [
          32,
          "내가 무슨 말을 더 하겠습니까? 기드온, 바락, 삼손, 입다, 다윗, 사무엘, 그리고 예언자들의 일을 말하려면, 시간이 모자랄 것입니다.",
        ],
        [
          33,
          "그들은 믿음으로 나라들을 정복하고, 정의를 실천하고, 약속된 것을 받고, 사자의 입을 막고,",
        ],
        [
          34,
          "불의 위력을 꺾고, 칼날을 피하고, 약한 데서 강해지고, 전쟁에서 용맹을 떨치고, 외국 군대를 물리쳤습니다.",
        ],
        [
          35,
          "믿음으로 여자들은 죽었다가 부활한 가족을 다시 맞이하였습니다. 또 어떤 이들은 고문을 당하면서도 [better|더 좋은] 부활의 삶을 얻고자 하여, 구태여 놓여나기를 바라지 않았습니다.",
        ],
        [
          36,
          "또 어떤 이들은 조롱을 받기도 하고, 채찍으로 맞기도 하고, 심지어는 결박을 당하기도 하고, 감옥에 갇히기까지 하면서 시련을 겪었습니다.",
        ],
        [
          37,
          "또 그들은 돌로 맞기도 하고, 톱질을 당하기도 하고, 칼에 맞아 죽기도 하였습니다. 그들은 궁핍을 당하며, 고난을 겪으며, 학대를 받으면서, 양과 염소의 가죽을 입고 떠돌았습니다.",
        ],
        [
          38,
          "세상은 이런 사람들을 [worthy|받아들일 만한] 곳이 못 되었습니다. 그래서 그들은 광야와 산과 동굴과 땅굴을 헤매며 다녔습니다.",
        ],
      ],
      com: [
        ["h", "시간이 모자랍니다"],
        [
          "p",
          "나라들을 정복함: 여호수아와 다윗과 사사들은 가나안을 차지하거나 위협하던 이방 나라들을 물리쳤습니다. 정의를 실천함: 사무엘과 다윗은 경건한 다스리는 사람과 재판관으로서 이스라엘에 하나님의 정의를 세웠습니다. 약속된 것을 받음: 여호수아와 갈렙은 약속대로 가나안에 들어갔습니다.",
        ],
        [
          "p",
          "사자의 입을 막음: 사자 굴의 다니엘, 맨손으로 사자를 죽인 삼손과 다윗입니다. 불의 위력을 꺾음: 다니엘의 세 친구는 풀무불에서 옷조차 상하지 않고 걸어 나왔습니다. 칼날을 피함: 엘리야와 엘리사는 아합 왕과 이세벨 왕비의 살해 위협에서 살아남았습니다.",
        ],
        [
          "p",
          "약한 데서 강해짐: 삼손은 힘을 잃었다가 눈이 멀고 갇혔을 때 힘을 되찾았습니다. 전쟁에서 용맹을 떨치고 외국 군대를 물리침: 사사들과 다윗의 용사들은 수가 더 많은 군대를 이겼습니다.",
        ],
        ["h", "놓여나는 것보다 더 좋은 것"],
        [
          "p",
          "열왕기상 17장에서 엘리야는 큰 가뭄 때 사르밧의 과부를 만납니다. 과부의 아들이 죽자 엘리야가 하나님께 부르짖었고, 아이가 살아났습니다.",
        ],
        [
          "p",
          "고문을 당하면서도 놓여나기를 바라지 않은 사람들은 정경에 없는 책의 내용을 가리키지만, 요점은 믿는 사람들이 육신의 삶보다 더 좋은 삶이 있음을 알기에 고문을 견딘다는 것입니다.",
        ],
        ["h", "우리가 아는 이름들"],
        [
          "p",
          "조롱과 채찍과 결박과 감옥: 예레미야, 미가야(왕상 22:24–27), 선견자 하나니(대하 16:7–10). 돌로 맞음: 스가랴(대하 24:20–21), 나봇(왕상 21:13). 톱질을 당함: 성경 밖의 역사 기록에 나오는 예언자 이사야. 칼에 맞아 죽음: 우리야(렘 26:20–23), 이세벨 때 죽임을 당한 예언자들(왕상 19:10).",
        ],
        [
          "p",
          "양과 염소의 가죽을 입고 궁핍하고 학대받음: 아합과 이세벨에게 쫓긴 엘리야와 엘리사(왕하 1:8), 오바댜가 숨긴 예언자 백 명(왕상 18:4).",
        ],
      ],
    },
    words: {
      en: {
        better: {
          t: "Better life",
          g: "kreittonos anastaseōs · κρείττονος ἀναστάσεως",
          v: "11:35",
          s: "A better resurrection",
          d: "Kreittōn is better, greater. Anastasis is a standing up again, resurrection.",
        },
        worthy: {
          t: "Worthy",
          g: "axios · ἄξιος",
          v: "11:38",
          s: "Deserving",
          d: "Worthy, deserving, suitable. The world did not deserve them.",
        },
      },
      ko: {
        better: {
          t: "더 좋은 부활",
          g: "kreittonos anastaseōs · κρείττονος ἀναστάσεως",
          v: "11:35",
          s: "더 좋은 일어남",
          d: "크레이톤은 더 좋은, 더 큰 것입니다. 아나스타시스는 다시 일어남, 부활입니다.",
        },
        worthy: {
          t: "받아들일 만한",
          g: "axios · ἄξιος",
          v: "11:38",
          s: "자격이 있음",
          d: "합당함, 자격이 있음을 뜻합니다. 세상은 그들을 받을 자격이 없었습니다.",
        },
      },
    },
    chips: [
      {
        id: "1ki17-22",
        tag: "OT",
        en: "1 Kgs 17:22",
        ko: "왕상 17:22",
        ten: "And the Lord listened to the voice of Elijah. And the life of the child came into him again, and he revived.",
        tko: "주님께서 엘리야가 부르짖는 소리를 들으시고, 그 아이의 호흡을 되돌아오게 하여 주셔서, 그 아이가 살아났다.",
        wen: "The widow’s son revived.",
        wko: "과부의 아들이 살아났습니다.",
      },
      {
        id: "2ch24-21",
        tag: "OT",
        en: "2 Chr 24:21",
        ko: "대하 24:21",
        ten: "But they conspired against him, and by command of the king they stoned him with stones in the court of the house of the Lord.",
        tko: "그러나 사람들은 그를 없앨 음모를 꾸몄고, 드디어 왕의 명령에 따라, 주님의 성전 뜰에서 그를 돌로 쳐죽였다.",
        wen: "Zechariah, stoned.",
        wko: "돌로 맞은 스가랴.",
      },
      {
        id: "jer26-23",
        tag: "OT",
        en: "Jer 26:23",
        ko: "렘 26:23",
        ten: "and they took Uriah from Egypt and brought him to King Jehoiakim, who struck him down with the sword and dumped his dead body into the burial place of the common people.",
        tko: "그들이 이집트에서 우리야를 붙잡아 여호야김 왕에게 데려오자, 왕은 그를 칼로 죽이고, 그 시체를 평민의 공동 묘지에 던졌다.)",
        wen: "Uriah, killed by the sword.",
        wko: "칼에 죽은 우리야.",
      },
      {
        id: "1ki19-10",
        tag: "OT",
        en: "1 Kgs 19:10",
        ko: "왕상 19:10",
        ten: "He said, “I have been very jealous for the Lord, the God of hosts. For the people of Israel have forsaken your covenant, thrown down your altars, and killed your prophets with the sword, and I, even I only, am left, and they seek my life, to take it away.”",
        tko: "엘리야가 대답하였다. “나는 이제까지 주 만군의 하나님만 열정적으로 섬겼습니다. 그러나 이스라엘 자손은 주님과 맺은 언약을 버리고, 주님의 제단을 헐었으며, 주님의 예언자들을 칼로 쳐서 죽였습니다. 이제 나만 홀로 남아 있는데, 그들은 내 목숨마저도 없애려고 찾고 있습니다.”",
        wen: "Prophets killed with the sword.",
        wko: "칼로 죽임을 당한 예언자들.",
      },
      {
        id: "2ki1-8",
        tag: "OT",
        en: "2 Kgs 1:8",
        ko: "왕하 1:8",
        ten: "They answered him, “He wore a garment of hair, with a belt of leather about his waist.” And he said, “It is Elijah the Tishbite.”",
        tko: "그들이 왕에게 대답하였다. “털이 많고, 허리에는 가죽 띠를 띠고 있었습니다.” 그러자 왕은 “그는 분명히 디셉 사람 엘리야다” 하고 외쳤다.",
        wen: "A garment of hair.",
        wko: "털옷과 가죽 띠.",
      },
      {
        id: "1ki18-4",
        tag: "OT",
        en: "1 Kgs 18:4",
        ko: "왕상 18:4",
        ten: "and when Jezebel cut off the prophets of the Lord, Obadiah took a hundred prophets and hid them by fifties in a cave and fed them with bread and water.",
        tko: "이세벨이 주님의 예언자들을 학살할 때에, 예언자 백 명을 쉰 명씩 동굴에 숨기고서, 먹을 것과 물을 대준 사람이다.",
        wen: "A hundred prophets in a cave.",
        wko: "동굴의 예언자 백 명.",
      },
    ],
  },

  {
    id: "m7",
    num: "VII",
    range: "39–40",
    scene: "apartFromUs",
    art: "3D · R3F — the line of witnesses stands at the end of the stitching, and past them the cloth is bare linen. A last figure is still being stitched, from the feet up, by a needle on a scarlet thread. Gold light grows at the far edge of the cloth. Christ is shown only as that light, with no human outline.",
    en: {
      title: "Apart from us",
      quote: "“…that apart from us they should not be made perfect.”",
      sref: "Hebrews 11:40",
      cap: "Scene: the line of witnesses waits at the edge of the stitching, with one more figure still being sewn, and the light ahead.",
      snips: [
        "Commended, but they did not receive what was promised",
        "Apart from us they should not be made perfect",
      ],
      verses: [
        [
          39,
          "And all these, though commended through their faith, did not receive what was [promised|promised],",
        ],
        [
          40,
          "since God had provided something better for us, that apart from us they should not be made [perfect|perfect].",
        ],
      ],
      com: [
        ["h", "What was promised"],
        [
          "p",
          "What was promised here refers to the new covenant, the first coming of Jesus Christ. The believers of the Old Testament were commended, yet they did not get to see Jesus in real life, because they physically died. They also did not experience the cleansing of conscience from sin and the permanent indwelling of the Holy Spirit.",
        ],
        [
          "p",
          "But they did see prophecies and shadows of Jesus from God, and they passed on the blessings from generation to generation, so that humanity can with faith reach the second coming of Jesus.",
        ],
        [
          "q",
          "For God had something better in mind for us, so that they would not reach perfection without us. (NLT)",
        ],
      ],
    },
    ko: {
      title: "우리가 없이는",
      quote: "“…우리가 없이는 그들이 완성에 이르지 못하게 하신 것입니다.”",
      sref: "히브리서 11:40",
      cap: "장면: 증인들의 줄이 수놓인 끝자락에서 기다리고, 한 사람이 아직 수놓아지는 중이며, 앞에는 빛이 있습니다.",
      snips: [
        "평판은 받았지만 약속된 것을 받지 못했습니다",
        "우리가 없이는 완성에 이르지 못합니다",
      ],
      verses: [
        [
          39,
          "이 사람들은 모두 믿음으로 말미암아 훌륭한 사람이라는 평판은 받았지만, [promised|약속된 것]을 받지는 못하였습니다.",
        ],
        [
          40,
          "하나님께서 우리를 위하여 더 좋은 계획을 미리 세워두셔서, 우리가 없이는 그들이 [perfect|완성]에 이르지 못하게 하신 것입니다.",
        ],
      ],
      com: [
        ["h", "약속된 것"],
        [
          "p",
          "여기서 약속된 것은 새 언약, 곧 예수 그리스도의 초림을 가리킵니다. 구약의 믿는 사람들은 칭찬을 받았지만 육신으로 죽었기에 예수님을 실제로 보지 못했고, 죄에서 양심이 깨끗해지는 일과 성령께서 영원히 내주하시는 일도 경험하지 못했습니다.",
        ],
        [
          "p",
          "그러나 그들은 하나님께서 주신 예언과 예수님의 그림자를 보았고, 대대로 축복을 물려주어 인류가 믿음으로 예수님의 재림에 이를 수 있게 했습니다.",
        ],
      ],
    },
    words: {
      en: {
        promised: {
          t: "Promised",
          g: "epangelian · ἐπαγγελίαν",
          v: "11:39",
          s: "The promise",
          d: "A promise. Here it refers to the new covenant, the coming of Jesus Christ.",
        },
        perfect: {
          t: "Perfect",
          g: "teleiōthōsin · τελειωθῶσιν",
          v: "11:40",
          s: "Brought to completion",
          d: "To complete, to perfect, to accomplish, to bring to an end.",
        },
      },
      ko: {
        promised: {
          t: "약속된 것",
          g: "epangelian · ἐπαγγελίαν",
          v: "11:39",
          s: "약속",
          d: "약속입니다. 여기서는 새 언약, 곧 예수 그리스도께서 오심을 가리킵니다.",
        },
        perfect: {
          t: "완성",
          g: "teleiōthōsin · τελειωθῶσιν",
          v: "11:40",
          s: "완성에 이름",
          d: "완성함, 온전하게 함, 이룸을 뜻합니다.",
        },
      },
    },
    chips: [
      {
        id: "heb8-8",
        tag: "NT",
        en: "Heb 8:8",
        ko: "히 8:8",
        ten: "For he finds fault with them when he says: “Behold, the days are coming, declares the Lord, when I will establish a new covenant with the house of Israel and with the house of Judah,",
        tko: "그런데 하나님께서는 자기 백성을 나무라시면서 이렇게 말씀하셨습니다. “주님께서 말씀하신다. '보아라, 날이 이를 것이다. 그 때에 내가 이스라엘 집과 유다 집과 더불어 새 언약을 맺을 것이다.'",
        wen: "The new covenant.",
        wko: "새 언약.",
      },
      {
        id: "heb10-36",
        tag: "NT",
        en: "Heb 10:36",
        ko: "히 10:36",
        ten: "For you have need of endurance, so that when you have done the will of God you may receive what is promised.",
        tko: "여러분이 하나님의 뜻을 행하고서, 그 약속해 주신 것을 받으려면, 인내가 필요합니다.",
        wen: "You may receive what is promised.",
        wko: "약속해 주신 것을 받으려면.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "Those who lived by faith",
        items: [
          [
            "1–3",
            "Faith is the assurance of things hoped for and the conviction of things not seen. The universe was created by God’s word out of nothing.",
          ],
          [
            "4–7",
            "Abel offered his best, Enoch pleased God, and Noah obeyed in reverent fear before anything could be seen.",
          ],
          [
            "8–16",
            "Abraham and Sarah lived in tents and looked for the city God builds. They died without receiving it, greeting it from afar.",
          ],
          [
            "17–22",
            "Abraham offered Isaac, and Isaac, Jacob and Joseph passed God’s covenant promises to the next generation.",
          ],
          [
            "23–31",
            "Moses feared the invisible God more than the visible Pharaoh, the sea opened, the walls fell and Rahab was saved.",
          ],
        ],
      },
      {
        h: "What it means for us",
        items: [
          [
            "32–38",
            "Some saw victories and blessings, others persecution and death. What remains valid is their faith in God.",
          ],
          [
            "35–38",
            "Many lived in tents, caves and wilderness. The readers’ confiscated property may seem dreadful, but it is evidence that they are believers.",
          ],
          [
            "39–40",
            "They did not see Jesus Christ in real life. Through his blood every believer from start to finish will receive salvation.",
          ],
        ],
      },
    ],
    intentH: "Author’s intent",
    intentShort:
      "To show that by faith God’s people saw his true plans, and to urge readers who are suffering not to go back to Old Testament ways but to hold on to faith as the patriarchs, judges, kings and prophets did.",
    intent: [
      "The author explains that because of faith these people were able to see the true plans of God. Some encountered victories and blessings, and some experienced severe persecution, punishment and even death, but what remains valid is their faith in God.",
      "They did not see Jesus Christ in real life, and they have yet to enter the kingdom God has planned for believers. But through the blood of Jesus, every believer from start to finish will receive salvation.",
      "Many of these people lived in temporary tents, in caves and in the wilderness. This encourages the readers that the confiscation of their property, dreadful as it may seem, is a blessing and truly shows evidence that they are believers. So it is not right to revert to the Old Testament ways because of what they are enduring. Keep holding on to the faith, just like the patriarchs, judges, kings and prophets, and you too will receive the promise given through Abraham.",
    ],
  },
  ko: {
    groups: [
      {
        h: "믿음으로 산 사람들",
        items: [
          [
            "1–3절",
            "믿음은 바라는 것들의 확신이요 보이지 않는 것들의 증거입니다. 세상은 하나님의 말씀으로 없는 데서 지어졌습니다.",
          ],
          [
            "4–7절",
            "아벨은 가장 좋은 것을 드렸고, 에녹은 하나님을 기쁘게 해드렸고, 노아는 아무것도 보이지 않을 때 경외로 순종했습니다.",
          ],
          [
            "8–16절",
            "아브라함과 사라는 장막에 살며 하나님께서 세우실 도시를 바랐습니다. 받지 못하고 죽었지만 멀리서 바라보고 반겼습니다.",
          ],
          [
            "17–22절",
            "아브라함은 이삭을 바쳤고, 이삭과 야곱과 요셉은 하나님의 언약의 약속을 다음 세대에 넘겨 주었습니다.",
          ],
          [
            "23–31절",
            "모세는 보이는 바로보다 보이지 않는 하나님을 더 두려워했고, 바다가 열리고 성벽이 무너지고 라합이 구원받았습니다.",
          ],
        ],
      },
      {
        h: "우리에게 주는 뜻",
        items: [
          [
            "32–38절",
            "어떤 이들은 승리와 축복을, 어떤 이들은 박해와 죽음을 겪었습니다. 변함없는 것은 하나님을 향한 그들의 믿음입니다.",
          ],
          [
            "35–38절",
            "많은 사람이 장막과 동굴과 광야에서 살았습니다. 독자들이 빼앗긴 재산은 끔찍해 보여도 믿는 사람이라는 증거입니다.",
          ],
          [
            "39–40절",
            "그들은 예수 그리스도를 실제로 보지 못했습니다. 예수님의 피로 처음부터 끝까지 모든 믿는 사람이 구원을 받습니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "믿음으로 하나님의 백성이 그분의 참된 계획을 보았음을 보여 주고, 고난받는 독자들에게 구약의 방식으로 돌아가지 말고 족장과 사사와 왕과 예언자들처럼 믿음을 붙들라고 권하는 것.",
    intent: [
      "저자는 이 사람들이 믿음 때문에 하나님의 참된 계획을 볼 수 있었다고 설명합니다. 어떤 이들은 승리와 축복을 만났고, 어떤 이들은 심한 박해와 형벌과 죽음까지 겪었지만, 변함없는 것은 하나님을 향한 그들의 믿음입니다.",
      "그들은 예수 그리스도를 실제로 보지 못했고, 하나님께서 믿는 사람들을 위해 계획하신 나라에 아직 들어가지 못했습니다. 그러나 예수님의 피로 처음부터 끝까지 모든 믿는 사람이 구원을 받습니다.",
      "이들 가운데 많은 사람이 임시 장막과 동굴과 광야에서 살았습니다. 이는 재산을 빼앗긴 일이 끔찍해 보여도 축복이며 믿는 사람이라는 참된 증거임을 독자들에게 일깨워 줍니다. 그러므로 지금 겪는 일 때문에 구약의 방식으로 돌아가는 것은 옳지 않습니다. 족장과 사사와 왕과 예언자들처럼 믿음을 계속 붙드십시오. 그러면 여러분도 아브라함을 통해 주어진 약속을 받을 것입니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 11",
    tagline:
      "“Now faith is the assurance of things hoped for, the conviction of things not seen.”",
    taglineRef: "Hebrews 11:1",
    mapTitle: "Forty verses, seven movements",
    mapIntro:
      "Faith holds on to what cannot be seen. From Abel to the prophets in the caves, God’s people trusted him and died without receiving what was promised. The line runs on from them to us, for apart from us they should not be made perfect.",
    summaryTitle: "What Hebrews 11 says",
    footQuote:
      "“Therefore God is not ashamed to be called their God, for he has prepared for them a city.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 11장",
    tagline: "“믿음은 바라는 것들의 확신이요, 보이지 않는 것들의 증거입니다.”",
    taglineRef: "히브리서 11:1",
    mapTitle: "마흔 절, 일곱 흐름",
    mapIntro:
      "믿음은 보이지 않는 것을 붙듭니다. 아벨부터 동굴의 예언자들까지, 하나님의 백성은 그분을 신뢰했고 약속된 것을 받지 못한 채 죽었습니다. 그 줄은 우리에게까지 이어집니다. 우리가 없이는 그들이 완성에 이르지 못하기 때문입니다.",
    summaryTitle: "히브리서 11장이 말하는 것",
    footQuote:
      "“그래서 하나님께서는 그들의 하나님이라고 불리는 것을 부끄러워하지 않으시고, 그들을 위하여 한 도시를 마련해 두셨습니다.”",
    version: "새번역",
  },
};

export const chapter11: ChapterContent = {
  number: 11,
  setting: "cloth",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
