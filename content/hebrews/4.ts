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
    range: "1–5",
    scene: "seventh",
    art: "3D · R3F — cut paper in daylight. Six marks count six days as the garden is laid in, layer by layer: the sun, sky and water, land and olive trees, the moon, birds, people. The seventh adds nothing to it, and a gate in the wall stands open.",
    en: {
      title: "The promise still stands",
      quote: "“For we who have believed enter that rest.”",
      sref: "Hebrews 4:3",
      cap: "Scene: the garden is made, day by day. On the seventh day nothing is added, and the gate stands open.",
      snips: [
        "While the promise of entering his rest still stands, let us fear",
        "Good news came to us just as to them",
        "We who have believed enter that rest; his works were finished from the foundation of the world",
        "“God rested on the seventh day from all his works”",
        "“They shall not enter my rest”",
      ],
      verses: [
        [
          1,
          "Therefore, while the promise of entering his [rest|rest] [stands|still stands], let us [fear|fear] lest any of you should seem to have failed to reach it.",
        ],
        [
          2,
          "For [goodnews|good news] came to us just as to them, but the message they heard did not benefit them, because they were not [united|united by faith] with those who listened.",
        ],
        [
          3,
          "For we who have believed enter that rest, as he has said, “As I swore in my [wrath|wrath], ‘They shall not enter my rest,’” although his works were [foundation|finished from the foundation of the world].",
        ],
        [
          4,
          "For he has somewhere spoken of the [seventh|seventh day] in this way: “And God rested on the seventh day from all his works.”",
        ],
        [
          5,
          "And again in this passage he said, “They shall not enter my rest.”",
        ],
      ],
      com: [
        ["h", "Therefore, the promise still stands"],
        [
          "p",
          "Chapter 4 begins with “therefore”: it carries on from chapter 3. There the Israelites in the wilderness, after the Exodus, could not enter God’s rest because of their unbelieving, disobedient hearts. Now the author says the promise of entering God’s rest, eternal salvation, still remains. It was not closed off earlier in history, not even when Joshua led Israel into the Promised Land. It was never only a physical destination but an ongoing spiritual reality, open to anyone who looks to God in active faith and trust.",
        ],
        [
          "p",
          "So “let us fear.” The NLT puts it strongly: “we ought to tremble with fear that some of you might fail to experience it.” This is the fear of reverence and awe, a fear that keeps us from treating the promise lightly.",
        ],
        ["h", "Good news, not united by faith"],
        [
          "p",
          "The good news Israel heard was God’s declaration of rescue and his covenant promises, the proclamation of what he was going to do for them. The land of Canaan foreshadowed the ultimate gospel. God’s message to them was to trust him, yet they grumbled and tested him for forty years. Instead of believing God like Joshua and Caleb, they worried about what they saw and what they thought. The ten spies spread their bad report, and the rest of the people caught their doubt. They were not united by faith with those who listened; the NLT reads, “they didn’t share the faith of those who listened to God.”",
        ],
        [
          "p",
          "The author is describing two groups of people. The first have believed and are entering the rest. The second, like Israel in the wilderness, had unbelieving hearts and could not enter.",
        ],
        ["h", "Finished from the foundation of the world"],
        [
          "p",
          "God’s rest began at creation. It was completely finished, established, and waiting from the very beginning of time. After six days God saw everything he had made and it was very good (Gen 1:31). On the seventh day he rested from all his work, and blessed that day and made it holy (Gen 2:2–3). Seven stands for fullness, completion and perfection.",
        ],
        [
          "p",
          "God did not rest because he was tired. His rest declared that the work of creation was totally finished: nothing could be added to improve it and nothing needed fixing. It was a celebration of a completed masterpiece. And unlike the first six days, the seventh has no “evening and morning.” God’s rest was meant to be an eternal, ongoing reality, God inviting humanity to live continually with him in perfection and peace, simply enjoying what he had already provided.",
        ],
        ["h", "As I swore in my wrath"],
        [
          "p",
          "The author quotes Psalm 95:11 again, as he did in 3:11, but the same words now carry a different weight. In 3:11 they portray God’s anger at Israel’s unbelief. In 4:3 and 4:5 they portray God’s wrath, a stronger consequence: not only anger and grief, but the road to his rest shut completely for those who will not believe.",
        ],
      ],
    },
    ko: {
      title: "약속이 아직 남아 있습니다",
      quote: "“그 말씀을 믿은 우리는 안식에 들어갈 것입니다.”",
      sref: "히브리서 4:3",
      cap: "장면: 동산이 하루하루 지어져 갑니다. 일곱째 날에는 더할 것이 없고, 문이 열려 있습니다.",
      snips: [
        "안식에 들어가리라는 약속이 아직 남아 있는 동안에, 두려운 마음으로 조심하십시오",
        "그들이나 우리나 기쁜 소식을 들은 것은 마찬가지입니다",
        "믿은 우리는 안식에 들어갈 것입니다. 그때부터 안식이 있어 온 것입니다",
        "“하나님께서 일곱째 되는 날에는 그 모든 일을 마치고 쉬셨다”",
        "“그들은 결코 내 안식에 들어오지 못할 것이다”",
      ],
      verses: [
        [
          1,
          "그러므로 하나님께서 주시는 [rest|안식]에 들어가리라는 약속이 [stands|아직 남아 있는] 동안에, 여러분 가운데서 거기에 미치지 못하는 사람이 아무도 없도록, [fear|두려운 마음으로] 조심하십시오.",
        ],
        [
          2,
          "그들이나 우리나 [goodnews|기쁜 소식]을 들은 것은 마찬가지입니다. 그런데 들은 그 말씀이 그들에게는 아무런 유익이 되지 못하였습니다. 그들은 그 말씀을 듣고서도, 그것을 [united|믿음과 결합시키지] 않았기 때문입니다.",
        ],
        [
          3,
          "그러나 그 말씀을 믿은 우리는 안식에 들어갈 것입니다. 그것은, “내가 [wrath|진노하여] 맹세한 것과 같이, 그들은 결코 내 안식에 들어오지 못할 것이다” 하고 말씀하신 그대로입니다. 사실상 하나님께서 [foundation|세상을 창조하시고 모든 일을 끝마치셨으므로], 그때부터 안식이 있어온 것입니다.",
        ],
        [
          4,
          "[seventh|일곱째 날]에 관해서는 어딘가에서 “하나님께서 일곱째 되는 날에는 그 모든 일을 마치고 쉬셨다” 하였고,",
        ],
        [
          5,
          "또 이 곳에서는 다시 “그들은 결코 내 안식에 들어오지 못할 것이다” 하셨습니다.",
        ],
      ],
      com: [
        ["h", "그러므로, 약속이 아직 남아 있습니다"],
        [
          "p",
          "4장은 “그러므로”로 시작합니다. 3장에서 이어지는 말입니다. 거기서 출애굽 뒤 광야의 이스라엘 백성은 믿지 않고 순종하지 않는 마음 때문에 하나님의 안식에 들어가지 못했습니다. 이제 저자는 하나님의 안식, 곧 영원한 구원에 들어가리라는 약속이 아직 남아 있다고 말합니다. 그 약속은 역사의 어느 시점에, 여호수아가 이스라엘을 약속의 땅으로 이끌었을 때에도 닫힌 것이 아닙니다. 그것은 처음부터 눈에 보이는 목적지만이 아니라 지금도 이어지는 영적인 실재이며, 살아 있는 믿음과 신뢰로 하나님을 바라보는 사람은 누구나 들어갈 수 있습니다.",
        ],
        [
          "p",
          "그래서 “두려운 마음으로 조심하십시오.” NLT는 이것을 강하게 옮깁니다. “여러분 가운데 누군가 그것을 누리지 못할까 두려워 떨어야 합니다.” 이것은 경외와 두려움으로, 약속을 가볍게 여기지 않게 지켜 주는 두려움입니다.",
        ],
        ["h", "믿음과 결합되지 않은 기쁜 소식"],
        [
          "p",
          "이스라엘이 들은 기쁜 소식은 구원하시겠다는 하나님의 선언과 언약의 약속, 곧 하나님께서 그들을 위해 하실 일에 대한 선포였습니다. 가나안 땅은 궁극적인 복음을 미리 보여 주었습니다. 그들을 향한 하나님의 말씀은 그분을 신뢰하라는 것이었지만, 그들은 사십 년 동안 불평하며 하나님을 시험했습니다. 여호수아와 갈렙처럼 하나님을 믿는 대신, 눈에 보이는 것과 자기 생각을 더 걱정했습니다. 열 명의 정탐꾼이 나쁜 소식을 퍼뜨렸고, 나머지 백성도 그 의심에 물들었습니다. 그들은 들은 말씀을 믿음과 결합시키지 않았습니다. NLT는 “하나님께 귀 기울인 사람들의 믿음을 함께 나누지 않았기 때문”이라고 옮깁니다.",
        ],
        [
          "p",
          "저자는 두 무리의 사람을 말하고 있습니다. 첫째는 믿고 안식에 들어가는 사람들이고, 둘째는 광야의 이스라엘처럼 믿지 않는 마음을 품어 결국 들어가지 못한 사람들입니다.",
        ],
        ["h", "창조 때부터 끝마치신 일"],
        [
          "p",
          "하나님의 안식은 창조 때 시작되었습니다. 시간이 시작될 때부터 완전히 끝마쳐지고, 세워지고, 기다리고 있었습니다. 엿새 동안 하나님은 지으신 모든 것을 보셨고, 보시기에 참 좋았습니다(창 1:31). 이렛날에 하나님은 모든 일에서 손을 떼고 쉬셨으며, 그 날을 복되게 하시고 거룩하게 하셨습니다(창 2:2–3). 일곱은 충만함과 완성과 온전함을 나타냅니다.",
        ],
        [
          "p",
          "하나님이 피곤해서 쉬신 것이 아닙니다. 그분의 쉼은 창조의 일이 완전히 끝났다는 선언이었습니다. 더 낫게 하려고 보탤 것도, 고칠 것도 없었습니다. 완성된 걸작을 기뻐하는 쉼이었습니다. 그리고 앞의 엿새와 달리 이렛날에는 “저녁이 되고 아침이 되니”라는 말이 없습니다. 하나님의 안식은 영원히 이어지는 실재가 되도록 정해졌습니다. 하나님께서 인류를 이 온전함과 평안 속에 늘 함께 살도록, 이미 주신 것을 그저 누리도록 초대하신 것입니다.",
        ],
        ["h", "내가 진노하여 맹세한 것과 같이"],
        [
          "p",
          "저자는 3:11에서처럼 다시 시편 95:11을 인용하지만, 같은 말씀이 이제 다른 무게를 지닙니다. 3:11에서 그것은 이스라엘의 불신에 대한 하나님의 분노를 그립니다. 4:3과 4:5에서는 더 무거운 결과인 하나님의 진노를 그립니다. 그저 화내고 슬퍼하시는 것이 아니라, 믿지 않는 사람들에게 그분의 안식으로 가는 길이 완전히 닫히는 것입니다.",
        ],
      ],
    },
    words: {
      en: {
        rest: {
          t: "His rest",
          g: "katapausis · κατάπαυσις",
          v: "4:1",
          s: "Eternal salvation with God",
          d: "A place of rest. For Israel it was pictured by Canaan; in Hebrews 4 it is God’s own rest since creation, the eternal salvation still open to all who believe.",
        },
        stands: {
          t: "Still stands",
          g: "kataleipomenēs · καταλειπομένης",
          v: "4:1",
          s: "Left remaining, reserved",
          d: "To leave remaining, to reserve. The promise was not used up in Joshua’s day; it is still held open.",
        },
        fear: {
          t: "Fear",
          g: "phobēthōmen · φοβηθῶμεν",
          v: "4:1",
          s: "Tremble, stand in awe",
          d: "To frighten, terrify, be alarmed; also to reverence or be in awe of. NLT: “we ought to tremble with fear that some of you might fail to experience it.”",
        },
        goodnews: {
          t: "Good news",
          g: "euēngelismenoi · εὐηγγελισμένοι",
          v: "4:2",
          s: "God’s declaration of rescue",
          d: "God’s declarations of rescue and his covenant promises: the proclamation of what he was going to do for them. The land of Canaan foreshadowed the ultimate gospel.",
        },
        united: {
          t: "United by faith",
          g: "synkekerasmenous · συγκεκερασμένους",
          v: "4:2",
          s: "Mixed together with faith",
          d: "Mixed or blended together. NLT: “they didn’t share the faith of those who listened to God,” or, read another way, “they didn’t combine what they heard with faith.”",
        },
        wrath: {
          t: "Wrath",
          g: "orgē · ὀργή",
          v: "4:3",
          s: "The road to rest shut",
          d: "The same psalm as 3:11, with a heavier weight. There it shows God’s anger at unbelief; here it shows his wrath, the road to his rest shut completely for those who will not believe.",
        },
        foundation: {
          t: "From the foundation of the world",
          g: "apo katabolēs kosmou · ἀπὸ καταβολῆς κόσμου",
          v: "4:3",
          s: "Since creation",
          d: "Since the creation. God’s rest began when his work of creation was finished: complete, established, and waiting from the very beginning of time.",
        },
        seventh: {
          t: "The seventh day",
          g: "tē hebdomē · τῇ ἑβδόμῃ",
          v: "4:4",
          s: "The day God rested",
          d: "Literally the seventh day of creation (Gen 2:2). Seven stands for fullness, completion and perfection, and the seventh day has no “evening and morning.”",
        },
      },
      ko: {
        rest: {
          t: "안식",
          g: "katapausis · κατάπαυσις",
          v: "4:1",
          s: "하나님과 함께하는 영원한 구원",
          d: "쉼의 자리. 이스라엘에게는 가나안으로 그려졌고, 히브리서 4장에서는 창조 때부터 있어 온 하나님의 안식, 곧 믿는 모든 사람에게 아직 열려 있는 영원한 구원입니다.",
        },
        stands: {
          t: "아직 남아 있다",
          g: "kataleipomenēs · καταλειπομένης",
          v: "4:1",
          s: "남겨 둠, 예비함",
          d: "남겨 두다, 예비하다. 그 약속은 여호수아 때에 다 쓰인 것이 아니라 지금도 열려 있습니다.",
        },
        fear: {
          t: "두려운 마음",
          g: "phobēthōmen · φοβηθῶμεν",
          v: "4:1",
          s: "떨며 경외함",
          d: "두렵게 하다, 겁내다, 놀라다. 또한 경외하다, 두려워하며 우러러보다. NLT: “여러분 가운데 누군가 그것을 누리지 못할까 두려워 떨어야 합니다.”",
        },
        goodnews: {
          t: "기쁜 소식",
          g: "euēngelismenoi · εὐηγγελισμένοι",
          v: "4:2",
          s: "구원하시겠다는 하나님의 선언",
          d: "구원하시겠다는 하나님의 선언과 언약의 약속, 곧 하나님께서 그들을 위해 하실 일에 대한 선포. 가나안 땅은 궁극적인 복음을 미리 보여 주었습니다.",
        },
        united: {
          t: "믿음과 결합하다",
          g: "synkekerasmenous · συγκεκερασμένους",
          v: "4:2",
          s: "믿음과 함께 섞임",
          d: "함께 섞다, 결합하다. NLT: “하나님께 귀 기울인 사람들의 믿음을 함께 나누지 않았다.” 달리 읽으면 “들은 것을 믿음과 결합시키지 않았다.”",
        },
        wrath: {
          t: "진노",
          g: "orgē · ὀργή",
          v: "4:3",
          s: "안식으로 가는 길이 닫힘",
          d: "3:11과 같은 시편이지만 더 무겁습니다. 거기서는 불신에 대한 하나님의 분노를, 여기서는 믿지 않는 사람들에게 안식으로 가는 길을 완전히 닫으시는 진노를 보여 줍니다.",
        },
        foundation: {
          t: "세상을 창조하시고 끝마치심",
          g: "apo katabolēs kosmou · ἀπὸ καταβολῆς κόσμου",
          v: "4:3",
          s: "창조 때부터",
          d: "세상이 창조된 때부터. 하나님의 안식은 창조의 일이 끝났을 때 시작되었습니다. 시간이 시작될 때부터 완성되고, 세워지고, 기다리고 있었습니다.",
        },
        seventh: {
          t: "일곱째 날",
          g: "tē hebdomē · τῇ ἑβδόμῃ",
          v: "4:4",
          s: "하나님이 쉬신 날",
          d: "문자 그대로 창조의 일곱째 날입니다(창 2:2). 일곱은 충만함과 완성과 온전함을 나타내며, 일곱째 날에는 “저녁이 되고 아침이 되니”라는 말이 없습니다.",
        },
      },
    },
    chips: [
      {
        id: "gen2",
        tag: "OT",
        en: "Gen 2:2–3",
        ko: "창 2:2–3",
        ten: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done. So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation.",
        tko: "하나님은 하시던 일을 엿샛날까지 다 마치시고, 이렛날에는 하시던 모든 일에서 손을 떼고 쉬셨다. 이렛날에 하나님이 창조하시던 모든 일에서 손을 떼고 쉬셨으므로, 하나님은 그 날을 복되게 하시고 거룩하게 하셨다.",
        wen: "The verse Hebrews 4:4 quotes: the rest that began when creation was finished.",
        wko: "히브리서 4:4가 인용하는 말씀으로, 창조가 끝났을 때 시작된 안식입니다.",
      },
      {
        id: "ps95",
        tag: "OT",
        en: "Ps 95:11",
        ko: "시 95:11",
        ten: "Therefore I swore in my wrath, “They shall not enter my rest.”",
        tko: "내가 화가 나서 ‘그들은 나의 안식에 들어오지 못할 것이다’ 하고 맹세까지 하였다.",
        wen: "Quoted in 3:11 and again in 4:3 and 4:5.",
        wko: "3:11에 이어 4:3과 4:5에서 다시 인용됩니다.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "6–11",
    scene: "jordan",
    art: "3D · R3F — cut paper in daylight. Twelve stones stand by the Jordan, and the road does not stop there. A strip of gold paper, “Today,” runs on past them to another gate in the far hills.",
    en: {
      title: "There remains a Sabbath rest",
      quote: "“So then, there remains a Sabbath rest for the people of God.”",
      sref: "Hebrews 4:9",
      cap: "Scene: Joshua’s stones stand by the Jordan, and the road runs on past them. “Today,” the way is still open.",
      snips: [
        "It remains for some to enter it",
        "Again he appoints a certain day, “Today”",
        "If Joshua had given them rest, God would not have spoken of another day",
        "There remains a Sabbath rest for the people of God",
        "Whoever has entered God’s rest has rested from his works",
        "Let us strive to enter that rest",
      ],
      verses: [
        [
          6,
          "Since therefore it remains for some to enter it, and those who formerly received the good news failed to enter because of [disobedience|disobedience],",
        ],
        [
          7,
          "again he appoints a certain day, “[today|Today],” saying through David so long afterward, in the words already quoted, “Today, if you hear his voice, do not harden your hearts.”",
        ],
        [
          8,
          "For if [joshua|Joshua] had given them rest, God would not have spoken of another day later on.",
        ],
        [
          9,
          "So then, there remains a [sabbath|Sabbath rest] for the people of God,",
        ],
        [
          10,
          "for whoever has entered God’s rest has also rested from his [works|works] as God did from his.",
        ],
        [
          11,
          "Let us therefore [strive|strive] to enter that rest, so that no one may fall by the same sort of disobedience.",
        ],
      ],
      com: [
        ["h", "Not finished in Joshua’s day"],
        [
          "p",
          "About five hundred years passed between the Exodus and the reign of David. After the unbelieving generation died in the wilderness, Joshua, Caleb and the younger Israelites were allowed to enter Canaan. But their entry was not God’s ultimate rest. What they received was an external, temporary, physical rest from the battles and hardships they had endured. After Joshua died, the book of Judges records cycle after cycle of spiritual decline and restoration.",
        ],
        [
          "p",
          "Then, in David’s time, God spoke again of entering his rest, and he said “Today.” That shows the promise was not fully accomplished in Joshua’s day. Possessing the land was not the same as entering God’s true and final rest; the land was a type, a foreshadowing of the ultimate salvation found in Jesus Christ. Many Jewish people thought Joshua entering Canaan was the end. By speaking through David centuries later, God showed that the invitation was still open.",
        ],
        ["h", "“Today,” for every generation"],
        [
          "p",
          "The opportunity was never limited to one generation, one place or one point in history. God’s rest is still available “Today” to all who respond in faith and believe in him. That is why, in verse 11, the author urges his readers to do their best to enter the Sabbath rest, and not to repeat the mistake of their forefathers in the wilderness.",
        ],
        ["h", "Resting from our works"],
        [
          "p",
          "Here “works” means human attempts to earn righteousness through self-reliance and religious rules. Just as God finished his work and rested on the seventh day, Jesus finished the work of salvation on the cross. So whoever believes in Jesus Christ enters the Sabbath rest, the seventh-day rest, and it is not obtained by works, rituals, rule-keeping or moral performance.",
        ],
        [
          "p",
          "The author ties unbelief and works together. Trying to add our own works says that God’s provision is not enough, that human effort is needed to fill the gap. Self-reliance is a lack of faith and trust.",
        ],
        [
          "q",
          "Living by works, before the rest: obeying God out of fear of rejection or punishment; always worrying whether you have done enough to be saved; a religious life that feels like a heavy, exhausting burden. Living by grace, in the rest: obeying God out of love and appreciation; being secure, knowing Jesus did enough; a religious life that is a natural overflow of gratitude.",
        ],
      ],
    },
    ko: {
      title: "안식하는 일이 아직 남아 있습니다",
      quote: "“그러니 하나님의 백성에게는 안식하는 일이 아직 남아 있습니다.”",
      sref: "히브리서 4:9",
      cap: "장면: 여호수아의 돌들이 요단 강가에 서 있고, 길은 그 너머로 이어집니다. ‘오늘’, 그 길은 아직 열려 있습니다.",
      snips: [
        "어떤 사람들에게는 안식에 들어갈 기회가 아직 남아 있습니다",
        "다시 ‘오늘’이라는 어떤 날을 정하시고",
        "여호수아가 그들에게 안식을 주었더라면",
        "하나님의 백성에게는 안식하는 일이 아직 남아 있습니다",
        "그 사람도 자기 일을 마치고 쉬는 것입니다",
        "이 안식에 들어가기를 힘씁시다",
      ],
      verses: [
        [
          6,
          "그러므로 어떤 사람들에게는 안식에 들어갈 기회가 아직 남아 있습니다. 그런데 기쁜 소식을 먼저 들은 사람들이 [disobedience|순종하지 않았으므로], 들어갈 수 없었습니다.",
        ],
        [
          7,
          "그렇지만 하나님께서는 다시 ‘[today|오늘]’이라는 어떤 날을 정하시고, 이미 인용한 말씀대로, 오랜 뒤에 다윗을 통하여 “오늘 너희가 그의 음성을 듣거든 너희 마음을 완고하게 하지 말아라” 하고 말씀하셨습니다.",
        ],
        [
          8,
          "[joshua|여호수아]가 그들에게 안식을 주었더라면, 하나님께서는 그 뒤에 다른 날이 있으리라는 것을 말씀하시지 않았을 것입니다.",
        ],
        [
          9,
          "그러니 하나님의 백성에게는 [sabbath|안식하는 일]이 아직 남아 있습니다.",
        ],
        [
          10,
          "하나님께서 주실 안식에 들어가는 사람은, 하나님이 자기 일을 마치고 쉬신 것과 같이, 그 사람도 자기 [works|일]을 마치고 쉬는 것입니다.",
        ],
        [
          11,
          "그러므로 우리는 이 안식에 들어가기를 [strive|힘씁시다]. 아무도 그와 같은 불순종의 본을 따르다가 떨어져 나가는 일이 없도록 해야 하겠습니다.",
        ],
      ],
      com: [
        ["h", "여호수아 때에 끝나지 않았습니다"],
        [
          "p",
          "출애굽부터 다윗의 통치까지는 약 오백 년이 흘렀습니다. 믿지 않던 세대가 광야에서 죽은 뒤, 여호수아와 갈렙과 젊은 세대의 이스라엘 백성은 가나안에 들어갈 수 있었습니다. 그러나 그들이 들어간 것은 하나님의 궁극적인 안식이 아니었습니다. 그들이 누린 것은 견뎌 온 싸움과 고난에서 벗어난 바깥의, 일시적인, 육체의 쉼이었습니다. 여호수아가 죽은 뒤 사사기는 영적 쇠퇴와 회복이 되풀이되는 모습을 기록합니다.",
        ],
        [
          "p",
          "그리고 다윗 시대에 하나님은 다시 그분의 안식에 들어가는 것을 말씀하시며 “오늘”이라고 하셨습니다. 이것은 그 약속이 여호수아 때에 다 이루어지지 않았음을 보여 줍니다. 땅을 차지한 것이 하나님의 참되고 마지막 안식에 들어간 것은 아니었습니다. 그 땅은 예수 그리스도 안에서 얻는 궁극적인 구원을 미리 보여 주는 모형이었습니다. 많은 유대인은 여호수아가 가나안에 들어간 것으로 끝났다고 생각했습니다. 수백 년 뒤 다윗을 통해 말씀하심으로, 하나님은 그 초대가 여전히 열려 있음을 보여 주셨습니다.",
        ],
        ["h", "모든 세대를 위한 “오늘”"],
        [
          "p",
          "그 기회는 한 세대나 한 장소나 역사의 한 시점에 묶여 있지 않았습니다. 하나님의 안식은 믿음으로 응답하고 그분을 믿는 모든 사람에게 “오늘”도 열려 있습니다. 그래서 저자는 11절에서 독자들에게, 광야의 조상들과 같은 실수를 하지 말고 안식에 들어가기를 힘쓰라고 권합니다.",
        ],
        ["h", "우리의 일을 마치고 쉼"],
        [
          "p",
          "여기서 “일”은 자기 힘과 종교적 규칙으로 의를 얻으려는 사람의 시도를 뜻합니다. 하나님께서 일을 마치시고 일곱째 날에 쉬셨듯이, 예수님은 십자가에서 구원의 일을 다 이루셨습니다. 그래서 예수 그리스도를 믿는 사람은 누구나 안식, 곧 일곱째 날의 쉼에 들어갑니다. 그것은 행위나 의식이나 규칙 지키기나 도덕적 성과로 얻는 것이 아닙니다.",
        ],
        [
          "p",
          "저자는 불신과 행위를 하나로 묶습니다. 우리의 행위를 보태려는 것은 하나님께서 주신 것이 모자라서 사람의 노력으로 빈틈을 채워야 한다고 말하는 것입니다. 자기 의존은 믿음과 신뢰가 없는 것입니다.",
        ],
        [
          "q",
          "행위로 사는 삶, 안식 이전: 버림받거나 벌받을까 두려워 하나님께 순종함. 구원받기에 충분히 했는지 늘 걱정함. 신앙생활이 무겁고 지치는 짐처럼 느껴짐. 은혜로 사는 삶, 안식 안에서: 사랑과 감사로 하나님께 순종함. 예수님이 충분히 하셨음을 알기에 평안함. 신앙생활이 감사가 자연스럽게 넘쳐 나는 것이 됨.",
        ],
      ],
    },
    words: {
      en: {
        disobedience: {
          t: "Disobedience",
          g: "apeitheian · ἀπείθειαν",
          v: "4:6",
          s: "Refusing to be persuaded",
          d: "Unwillingness to be persuaded; wilful refusal of belief and obedience. The wilderness generation heard the good news and would not trust it.",
        },
        today: {
          t: "Today",
          g: "sēmeron · σήμερον",
          v: "4:7",
          s: "The day still open",
          d: "Spoken through David some five hundred years after the Exodus. God appointed another day, so the rest was not closed in Joshua’s time; it stays open “Today” for every generation.",
        },
        joshua: {
          t: "Joshua",
          g: "Iēsous · Ἰησοῦς",
          v: "4:8",
          s: "A rest that was temporary",
          d: "Joshua son of Nun led the younger generation into Canaan. The land gave them an external, temporary, physical rest from battle, but not God’s true and final rest.",
        },
        sabbath: {
          t: "Sabbath rest",
          g: "sabbatismos · σαββατισμός",
          v: "4:9",
          s: "The seventh-day rest",
          d: "A keeping of Sabbath: the seventh-day rest. Just as God finished his work and rested, Jesus finished the work of salvation, and whoever believes in him enters this rest.",
        },
        works: {
          t: "Works",
          g: "ergōn · ἔργων",
          v: "4:10",
          s: "Earning righteousness ourselves",
          d: "An act, deed, thing done. Here, human attempts to earn righteousness through self-reliance and religious rules: works, rituals, rule-keeping and moral performance.",
        },
        strive: {
          t: "Strive",
          g: "spoudasōmen · σπουδάσωμεν",
          v: "4:11",
          s: "Do your best, make haste",
          d: "To be eager, make every effort, do one’s best. Not working to earn the rest, but taking care not to fall by the same disobedience as the wilderness generation.",
        },
      },
      ko: {
        disobedience: {
          t: "순종하지 않음",
          g: "apeitheian · ἀπείθειαν",
          v: "4:6",
          s: "설득되기를 거부함",
          d: "설득되지 않으려는 것, 믿음과 순종을 고의로 거부하는 것. 광야 세대는 기쁜 소식을 듣고도 그것을 신뢰하지 않았습니다.",
        },
        today: {
          t: "오늘",
          g: "sēmeron · σήμερον",
          v: "4:7",
          s: "아직 열려 있는 날",
          d: "출애굽 뒤 약 오백 년이 지나 다윗을 통해 하신 말씀. 하나님께서 다른 날을 정하셨으니, 안식은 여호수아 때에 닫힌 것이 아니라 모든 세대에게 “오늘” 열려 있습니다.",
        },
        joshua: {
          t: "여호수아",
          g: "Iēsous · Ἰησοῦς",
          v: "4:8",
          s: "일시적인 쉼",
          d: "눈의 아들 여호수아는 젊은 세대를 이끌고 가나안에 들어갔습니다. 그 땅은 싸움에서 벗어난 바깥의, 일시적인, 육체의 쉼을 주었지만, 하나님의 참되고 마지막 안식은 아니었습니다.",
        },
        sabbath: {
          t: "안식하는 일",
          g: "sabbatismos · σαββατισμός",
          v: "4:9",
          s: "일곱째 날의 쉼",
          d: "안식을 지킴, 곧 일곱째 날의 쉼. 하나님께서 일을 마치고 쉬셨듯이 예수님은 구원의 일을 다 이루셨고, 그분을 믿는 사람은 누구나 이 안식에 들어갑니다.",
        },
        works: {
          t: "일",
          g: "ergōn · ἔργων",
          v: "4:10",
          s: "스스로 의를 얻으려 함",
          d: "행위, 행한 일. 여기서는 자기 힘과 종교적 규칙으로 의를 얻으려는 사람의 시도, 곧 행위와 의식과 규칙 지키기와 도덕적 성과입니다.",
        },
        strive: {
          t: "힘쓰다",
          g: "spoudasōmen · σπουδάσωμεν",
          v: "4:11",
          s: "최선을 다함, 서두름",
          d: "열심을 내다, 온 힘을 다하다, 최선을 다하다. 안식을 얻으려고 일하는 것이 아니라, 광야 세대와 같은 불순종으로 떨어지지 않도록 마음을 쓰는 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "josh21",
        tag: "OT",
        en: "Josh 21:44",
        ko: "수 21:44",
        ten: "And the LORD gave them rest on every side just as he had sworn to their fathers. Not one of all their enemies had withstood them, for the LORD had given all their enemies into their hands.",
        tko: "주님께서는 그들의 조상에게 맹세하신 대로, 사방에 평화를 주셨다. 또한 주님께서는 그들의 모든 원수를 그들의 손에 넘기셨으므로, 그들의 원수 가운데서 어느 누구도 그들에게 대항하지 못하였다.",
        wen: "The rest Joshua’s generation received: real, but outward and for a time.",
        wko: "여호수아 세대가 받은 쉼: 참된 것이지만 바깥의, 한때의 쉼이었습니다.",
      },
      {
        id: "gen2",
        tag: "OT",
        en: "Gen 2:2",
        ko: "창 2:2",
        ten: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.",
        tko: "하나님은 하시던 일을 엿샛날까지 다 마치시고, 이렛날에는 하시던 모든 일에서 손을 떼고 쉬셨다.",
        wen: "“As God did from his”: the pattern for resting from our own works.",
        wko: "“하나님이 자기 일을 마치고 쉬신 것과 같이”: 우리의 일을 마치고 쉬는 본입니다.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "12–13",
    scene: "sword",
    art: "3D · R3F — cut paper in daylight. Someone stands hidden inside a dark thicket. A two-edged blade comes down and cuts it open, the halves fall away, and the one standing there is in plain light.",
    en: {
      title: "Living and active",
      quote:
        "“For the word of God is living and active, sharper than any two-edged sword.”",
      sref: "Hebrews 4:12",
      cap: "Scene: a two-edged blade cuts the thicket open. Nothing stays hidden.",
      snips: [
        "The word of God is living and active, sharper than any two-edged sword",
        "All are naked and exposed to the eyes of him to whom we must give account",
      ],
      verses: [
        [
          12,
          "For the word of God is [living|living] and [active|active], [sword|sharper than any two-edged sword], piercing to the division of soul and of spirit, of joints and of marrow, and [discerning|discerning] the [thoughts|thoughts] and [intentions|intentions] of the heart.",
        ],
        [
          13,
          "And no [creature|creature] is hidden from his sight, but all are [naked|naked] and [exposed|exposed] to the eyes of him to whom we must give account.",
        ],
      ],
      com: [
        ["h", "For: the reason to strive"],
        [
          "p",
          "In the verses before, the author urged his readers to do their best to enter the Sabbath rest, because anyone who disobeys God will fall like the people in the wilderness. Verse 12 begins with “for,” which works as “because.” The word of God judges a person not only outwardly but inwardly. “The division of soul and spirit, of joints and marrow” is figurative: it reaches all the way in, to judge the thoughts and intentions a person holds.",
        ],
        ["h", "Sharper than any two-edged sword"],
        [
          "p",
          "A two-edged sword is literally a sword with two mouths, sharpened on both sides. Figuratively it means total exposure, precision and ultimate truth. It cuts not only the outer things, judging the world or the enemies, but the inner things too: the hearts of believers, their secret motives and hidden sins, whether a person’s faith is genuine or superficial.",
        ],
        [
          "p",
          "The hidden motives, attitudes and rationalisations behind everything we do are known by the word of God, however genuinely good they appear. Nothing God created, no person, can be hidden from his sight.",
        ],
        ["h", "Naked and exposed"],
        [
          "p",
          "In the Exodus many “pretended” to follow God, faking true faith or hiding behind outward religious routines, the practices of the law, and in the end received the just consequence. The message holds for believers too: however much we fake it outwardly as “good,” God knows the true intentions. “Exposed” pictures a wrestler seizing an opponent by the throat, or an animal’s neck bent back for the offering. All of us stand before the one to whom we must give account.",
        ],
      ],
    },
    ko: {
      title: "살아 있고 힘이 있습니다",
      quote:
        "“하나님의 말씀은 살아 있고 힘이 있어서, 어떤 양날칼보다도 더 날카롭습니다.”",
      sref: "히브리서 4:12",
      cap: "장면: 양날의 칼이 덤불을 가릅니다. 숨겨진 것은 아무것도 없습니다.",
      snips: [
        "하나님의 말씀은 살아 있고 힘이 있어서, 어떤 양날칼보다도 더 날카롭습니다",
        "모든 것이 그의 눈 앞에 벌거숭이로 드러나 있습니다",
      ],
      verses: [
        [
          12,
          "하나님의 말씀은 [living|살아 있고] [active|힘이 있어서], [sword|어떤 양날칼보다도 더 날카롭습니다]. 그래서, 사람 속을 꿰뚫어 혼과 영을 갈라내고, 관절과 골수를 갈라놓기까지 하며, 마음에 품은 [thoughts|생각]과 [intentions|의도]를 [discerning|밝혀냅니다].",
        ],
        [
          13,
          "하나님 앞에는 아무 [creature|피조물]도 숨겨진 것이 없고, 모든 것이 그의 눈 앞에 [naked|벌거숭이로] [exposed|드러나] 있습니다. 우리는 그의 앞에 모든 것을 드러내 놓아야 합니다.",
        ],
      ],
      com: [
        ["h", "힘써야 하는 까닭"],
        [
          "p",
          "앞 절들에서 저자는 독자들에게 안식에 들어가기를 힘쓰라고 권했습니다. 누구든 하나님께 불순종하면 광야의 백성처럼 떨어져 나갈 것이기 때문입니다. 12절의 원문은 “왜냐하면”의 뜻을 지닌 말로 시작합니다. 하나님의 말씀은 사람을 겉으로만이 아니라 속으로도 판단합니다. “혼과 영을, 관절과 골수를 갈라낸다”는 비유입니다. 말씀은 끝까지 파고들어 사람이 품은 생각과 의도를 판단합니다.",
        ],
        ["h", "어떤 양날칼보다도 더 날카롭습니다"],
        [
          "p",
          "양날칼은 문자 그대로 입이 둘인 칼, 양쪽으로 날을 세운 칼입니다. 비유적으로는 완전한 드러남, 정확함, 궁극적인 진리를 뜻합니다. 세상이나 원수를 심판하는 바깥의 것만이 아니라, 믿는 사람들의 마음, 곧 숨은 동기와 감춰진 죄, 그 사람의 믿음이 참된지 겉치레인지까지 속의 것을 가릅니다.",
        ],
        [
          "p",
          "우리가 하는 모든 일 뒤에 있는 숨은 동기와 태도와 자기 합리화를, 아무리 진심으로 선해 보여도, 하나님의 말씀은 압니다. 하나님께서 지으신 어떤 것도, 어떤 사람도 그분의 눈앞에서 숨을 수 없습니다.",
        ],
        ["h", "벌거숭이로 드러남"],
        [
          "p",
          "출애굽 때 많은 사람이 하나님을 따르는 “척”했습니다. 참된 믿음을 흉내 내거나 율법의 겉모양뿐인 종교적 일과 뒤에 숨었고, 결국 마땅한 결과를 받았습니다. 이 말씀은 믿는 사람들에게도 그렇습니다. 겉으로 아무리 “선하게” 꾸며도, 하나님은 참된 의도를 아십니다. “드러나다”는 씨름꾼이 상대의 목을 움켜쥐는 모습, 또는 제물로 바칠 짐승의 목을 뒤로 젖히는 모습을 그립니다. 우리는 모두 그분 앞에 모든 것을 드러내 놓아야 합니다.",
        ],
      ],
    },
    words: {
      en: {
        living: {
          t: "Living",
          g: "zōn · ζῶν",
          v: "4:12",
          s: "Having life in itself",
          d: "Having vital power in itself and exerting the same upon the soul. Literally the natural, physical life, the opposite of death.",
        },
        active: {
          t: "Active",
          g: "energēs · ἐνεργής",
          v: "4:12",
          s: "At work, effective",
          d: "Working, efficient, effective, operative, powerful.",
        },
        sword: {
          t: "Two-edged sword",
          g: "machairan distomon · μάχαιραν δίστομον",
          v: "4:12",
          s: "Total exposure, precise truth",
          d: "A sword with two mouths, sharpened on both sides. Figuratively, total exposure, precision and ultimate truth, cutting not only outer things but the heart: secret motives, hidden sins, whether faith is genuine or superficial.",
        },
        discerning: {
          t: "Discerning",
          g: "kritikos · κριτικός",
          v: "4:12",
          s: "Skilled in judging",
          d: "Judging, fit for judging, skilled in judging.",
        },
        thoughts: {
          t: "Thoughts",
          g: "enthymēseōn · ἐνθυμήσεων",
          v: "4:12",
          s: "Inward reasoning",
          d: "Inward reasoning or deliberation; the idea of pondering or thinking something out; “reflection.”",
        },
        intentions: {
          t: "Intentions",
          g: "ennoiōn · ἐννοιῶν",
          v: "4:12",
          s: "The mind that shapes our actions",
          d: "Thought; the development of a perspective that gives insight, shapes our attitude and guides our actions.",
        },
        creature: {
          t: "Creature",
          g: "ktisis · κτίσις",
          v: "4:13",
          s: "Anything God made",
          d: "Something which has undergone a process of creation. Nothing and no one God made is hidden from him.",
        },
        naked: {
          t: "Naked",
          g: "gymna · γυμνά",
          v: "4:13",
          s: "Uncovered",
          d: "Not covered; not necessarily fully naked but barely dressed, barely covered.",
        },
        exposed: {
          t: "Exposed",
          g: "tetrachēlismena · τετραχηλισμένα",
          v: "4:13",
          s: "Seized by the throat",
          d: "To seize by the throat: a wrestler grabbing an opponent by the neck. Also used of bending back an animal’s neck to be slaughtered as an offering.",
        },
      },
      ko: {
        living: {
          t: "살아 있다",
          g: "zōn · ζῶν",
          v: "4:12",
          s: "스스로 생명을 지님",
          d: "스스로 생명의 힘을 지니고 그 힘을 영혼에 미치는 것. 문자적으로는 죽음과 반대되는 자연적, 육체적 생명입니다.",
        },
        active: {
          t: "힘이 있다",
          g: "energēs · ἐνεργής",
          v: "4:12",
          s: "일하며 효력 있음",
          d: "일하는, 능률 있는, 효과 있는, 작용하는, 강력한.",
        },
        sword: {
          t: "양날칼",
          g: "machairan distomon · μάχαιραν δίστομον",
          v: "4:12",
          s: "완전한 드러남, 정확한 진리",
          d: "입이 둘인 칼, 양쪽으로 날을 세운 칼. 비유적으로 완전한 드러남과 정확함과 궁극적인 진리를 뜻하며, 바깥의 것만이 아니라 마음, 곧 숨은 동기와 감춰진 죄와 믿음이 참된지 겉치레인지까지 가릅니다.",
        },
        discerning: {
          t: "밝혀내다",
          g: "kritikos · κριτικός",
          v: "4:12",
          s: "판단에 능함",
          d: "판단하는, 판단하기에 알맞은, 판단에 능한.",
        },
        thoughts: {
          t: "생각",
          g: "enthymēseōn · ἐνθυμήσεων",
          v: "4:12",
          s: "속으로 따져 봄",
          d: "속으로 따져 보거나 숙고하는 것. 곰곰이 생각하고 생각해 내는 것, 곧 “성찰”.",
        },
        intentions: {
          t: "의도",
          g: "ennoiōn · ἐννοιῶν",
          v: "4:12",
          s: "행동을 빚는 생각",
          d: "생각. 통찰을 주는 관점이 자라나 우리의 태도를 빚고 행동을 이끄는 것.",
        },
        creature: {
          t: "피조물",
          g: "ktisis · κτίσις",
          v: "4:13",
          s: "하나님이 지으신 모든 것",
          d: "창조의 과정을 거친 것. 하나님께서 지으신 어떤 것도, 어떤 사람도 그분께 숨겨지지 않습니다.",
        },
        naked: {
          t: "벌거숭이",
          g: "gymna · γυμνά",
          v: "4:13",
          s: "가려지지 않음",
          d: "가려지지 않은. 반드시 완전히 벗은 것이 아니라 겨우 걸치고 겨우 가린 상태.",
        },
        exposed: {
          t: "드러나다",
          g: "tetrachēlismena · τετραχηλισμένα",
          v: "4:13",
          s: "목을 움켜잡힘",
          d: "목을 움켜잡다. 씨름꾼이 상대의 목을 움켜쥐는 모습. 제물로 잡을 짐승의 목을 뒤로 젖히는 데에도 쓰였습니다.",
        },
      },
    },
    chips: [
      {
        id: "sam16",
        tag: "OT",
        en: "1 Sam 16:7",
        ko: "삼상 16:7",
        ten: "But the LORD said to Samuel, “Do not look on his appearance or on the height of his stature, because I have rejected him. For the LORD sees not as man sees: man looks on the outward appearance, but the LORD looks on the heart.”",
        tko: "그러나 주님께서 사무엘에게 이르셨다. “너는 그의 준수한 겉모습과 큰 키만을 보아서는 안 된다. 그는 내가 세운 사람이 아니다. 나는 사람이 판단하는 것처럼 그렇게 판단하지는 않는다. 사람은 겉모습만을 따라 판단하지만, 나 주는 중심을 본다.”",
        wen: "Outward appearance and the heart: what God sees.",
        wko: "겉모습과 중심: 하나님께서 보시는 것.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "14–16",
    scene: "mercy",
    art: "3D · R3F — cut paper in daylight. Light passes up through layer after layer of cloud as the heavens part. The seat of the throne holds light alone, and people climb the broad steps to it unafraid. Christ is shown only as light, with no human outline.",
    en: {
      title: "Draw near to the throne of grace",
      quote: "“Let us then with confidence draw near to the throne of grace.”",
      sref: "Hebrews 4:16",
      cap: "Scene: our high priest passes through the heavens. The throne of grace is open, and we climb to it unafraid.",
      snips: [
        "We have a great high priest who has passed through the heavens",
        "Not a high priest unable to sympathize with our weaknesses",
        "With confidence draw near to the throne of grace",
      ],
      verses: [
        [
          14,
          "Since then we have a [priest|great high priest] who has [passed|passed through the heavens], Jesus, the Son of God, let us hold fast our [confession|confession].",
        ],
        [
          15,
          "For we do not have a high priest who is [sympathize|unable to sympathize] with our weaknesses, but one who in every respect has been tempted as we are, yet without sin.",
        ],
        [
          16,
          "Let us then with [confidence|confidence] [draw|draw near] to the [throne|throne of grace], that we may receive mercy and find grace to [help|help in time of need].",
        ],
      ],
      com: [
        ["h", "A great high priest"],
        [
          "p",
          "Here the author adds an adjective to Jesus’ office: great. The high priest already held high status among the Israelites, and “great” says that Jesus is the highest of all. He is not an earthly high priest but the divine one, for he has passed through the heavens.",
        ],
        ["h", "Able to sympathize"],
        [
          "p",
          "In verses 12–13 the author uses strong words so the readers understand that God is just and judges inwardly: nothing can be hidden. But in verse 15 he uses a double negative, “we do not have a high priest who is unable,” to guarantee the empathy of Jesus Christ. He experienced our weaknesses and was tempted in every way, yet did not sin at all on that journey. Our hope is in him alone and not in ourselves. So the author urges us to draw near to Jesus and take care not to drift away, the encouragement that runs through the earlier chapters.",
        ],
        ["h", "With confidence, to the throne of grace"],
        [
          "p",
          "In ancient Greek times, freedom of speech before a king was rare. This confidence described people who could speak openly before him without any fear of execution. The throne is the seat of authority, bound up with God’s absolute holiness, awe and judgement. Yet for those who believe in Jesus, the great high priest, it is a throne of grace.",
        ],
        [
          "p",
          "“Let us draw near” is in the present tense, not past or future. The author assures believers not to drift away or run from God, but to run toward his throne, which gives grace and mercy. To draw near to the throne of grace also means to pray to God with confidence, without fear. The throne does not become our judgement, our law and our execution; it is our source of grace and mercy, help that arrives at the right time, in struggles, temptations, hardship and suffering.",
        ],
      ],
    },
    ko: {
      title: "은혜의 보좌로 나아갑시다",
      quote: "“그러므로 우리는 담대하게 은혜의 보좌로 나아갑시다.”",
      sref: "히브리서 4:16",
      cap: "장면: 우리의 대제사장이 하늘을 지나 올라가십니다. 은혜의 보좌가 열려 있고, 우리는 두려움 없이 그 앞으로 나아갑니다.",
      snips: [
        "하늘에 올라가신 위대한 대제사장이신 하나님의 아들 예수",
        "우리의 연약함을 동정하지 못하시는 분이 아닙니다",
        "담대하게 은혜의 보좌로 나아갑시다",
      ],
      verses: [
        [
          14,
          "그러나 우리에게는 [passed|하늘에 올라가신] [priest|위대한 대제사장]이신 하나님의 아들 예수가 계십니다. 그러므로 우리의 [confession|신앙 고백]을 굳게 지킵시다.",
        ],
        [
          15,
          "우리의 대제사장은 우리의 연약함을 [sympathize|동정하지 못하시는 분이 아닙니다]. 그는 모든 점에서 우리와 마찬가지로 시험을 받으셨지만, 죄는 없으십니다.",
        ],
        [
          16,
          "그러므로 우리는 [confidence|담대하게] [throne|은혜의 보좌]로 [draw|나아갑시다]. 그리하여 우리가 자비를 받고 은혜를 입어서, [help|제때에 주시는 도움]을 받도록 합시다.",
        ],
      ],
      com: [
        ["h", "위대한 대제사장"],
        [
          "p",
          "여기서 저자는 예수님의 대제사장 직분에 “위대한”이라는 꾸밈말을 덧붙입니다. 대제사장은 이스라엘 가운데서 이미 높은 지위였지만, “위대한”은 예수님이 그 모두 가운데 가장 높으신 분이심을 강조합니다. 그분은 땅의 대제사장이 아니라, 하늘을 지나 올라가신 하늘의 대제사장이십니다.",
        ],
        ["h", "동정하실 수 있는 분"],
        [
          "p",
          "12–13절에서 저자는 강한 표현을 써서, 하나님은 의로우시며 속을 판단하시고 아무것도 숨길 수 없다는 것을 독자들이 깨닫게 합니다. 그러나 15절에서는 “동정하지 못하시는 분이 아닙니다”라는 이중 부정을 써서 예수 그리스도의 공감을 확실히 보증합니다. 그분은 우리의 연약함을 겪으시고 모든 점에서 시험을 받으셨지만, 그 길에서 조금도 죄를 짓지 않으셨습니다. 우리의 소망은 우리 자신이 아니라 오직 그분께 있습니다. 그래서 저자는 앞 장들에서 이어 온 권면대로, 예수님께 가까이 나아가고 떠내려가지 않도록 조심하라고 강조합니다.",
        ],
        ["h", "담대하게, 은혜의 보좌로"],
        [
          "p",
          "고대 그리스 시대에 왕 앞에서 말의 자유를 누리는 일은 드물었습니다. 이 담대함은 처형당할 두려움 없이 왕 앞에서 터놓고 말할 수 있는 사람들을 가리켰습니다. 보좌는 권위의 자리이며, 하나님의 절대적인 거룩하심과 경외와 심판과 이어져 있습니다. 그러나 위대한 대제사장이신 예수님을 믿는 사람들에게 그것은 은혜의 보좌입니다.",
        ],
        [
          "p",
          "“나아갑시다”는 과거나 미래가 아니라 현재 시제입니다. 저자는 믿는 사람들에게 하나님에게서 떠내려가거나 달아나지 말고, 은혜와 자비를 주시는 그분의 보좌를 향해 달려가라고 확신을 줍니다. 은혜의 보좌로 나아가는 것은 두려움 없이 담대하게 하나님께 기도하는 것이기도 합니다. 그 보좌는 우리의 심판과 율법과 처형이 되지 않고, 은혜와 자비의 근원, 곧 몸부림과 시험과 어려움과 고난 가운데 꼭 맞는 때에 오는 도움이 됩니다.",
        ],
      ],
    },
    words: {
      en: {
        priest: {
          t: "Great high priest",
          g: "archierea megan · ἀρχιερέα μέγαν",
          v: "4:14",
          s: "The highest of all",
          d: "The high priest already held high status in Israel; “great” says Jesus is the highest of all, not an earthly high priest but the divine one.",
        },
        passed: {
          t: "Passed through the heavens",
          g: "dielēlythota tous ouranous · διεληλυθότα τοὺς οὐρανούς",
          v: "4:14",
          s: "Gone through, into God’s presence",
          d: "To go through, pass through. Jesus did not serve in an earthly sanctuary; he passed through the heavens.",
        },
        confession: {
          t: "Confession",
          g: "homologia · ὁμολογία",
          v: "4:14",
          s: "What we openly declare together",
          d: "To say the same thing, to declare openly: our shared confession that Jesus is Lord. “Hold fast” it, and do not drift away.",
        },
        sympathize: {
          t: "Unable to sympathize",
          g: "mē dynamenon sympathēsai · μὴ δυνάμενον συμπαθῆσαι",
          v: "4:15",
          s: "A double negative: he surely can",
          d: "To suffer with, to feel along with. “We do not have one who is unable”: the double negative guarantees the empathy of Jesus, who was tempted in every way, yet without sin.",
        },
        confidence: {
          t: "Confidence",
          g: "parrēsia · παρρησία",
          v: "4:16",
          s: "Speaking freely, without fear",
          d: "All speech; speaking all things from freedom and lacking in fear. In ancient Greek times freedom of speech before a king was rare; it described those who could speak openly without fear of execution.",
        },
        draw: {
          t: "Draw near",
          g: "proserchōmetha · προσερχώμεθα",
          v: "4:16",
          s: "Come near, to worship",
          d: "To approach, come near, visit; figuratively to worship, to draw near. Present tense: keep coming, now. To draw near is also to pray with confidence.",
        },
        throne: {
          t: "Throne of grace",
          g: "thronos tēs charitos · θρόνος τῆς χάριτος",
          v: "4:16",
          s: "The seat of authority, now of grace",
          d: "The seat of authority, associated with God’s absolute holiness, awe and judgement. For those in Christ it is not judgement and execution but the source of grace and mercy.",
        },
        help: {
          t: "Help in time of need",
          g: "eukairon boētheian · εὔκαιρον βοήθειαν",
          v: "4:16",
          s: "Grace at the right time",
          d: "Grace delivered at the perfect time: when there are struggles, temptations, hardships and suffering.",
        },
      },
      ko: {
        priest: {
          t: "위대한 대제사장",
          g: "archierea megan · ἀρχιερέα μέγαν",
          v: "4:14",
          s: "모두 가운데 가장 높으신 분",
          d: "대제사장은 이스라엘에서 이미 높은 지위였습니다. “위대한”은 예수님이 그 모두 가운데 가장 높으신 분, 땅의 대제사장이 아니라 하늘의 대제사장이심을 말합니다.",
        },
        passed: {
          t: "하늘에 올라가신",
          g: "dielēlythota tous ouranous · διεληλυθότα τοὺς οὐρανούς",
          v: "4:14",
          s: "하늘을 지나 하나님 앞으로",
          d: "지나가다, 꿰뚫고 가다. 예수님은 땅의 성소에서 섬기신 것이 아니라 하늘을 지나 올라가셨습니다.",
        },
        confession: {
          t: "신앙 고백",
          g: "homologia · ὁμολογία",
          v: "4:14",
          s: "함께 드러내어 선포하는 것",
          d: "같은 것을 말하다, 드러내어 선언하다. 예수님이 주님이시라는 우리의 공통된 고백입니다. 그것을 굳게 지키고 떠내려가지 마십시오.",
        },
        sympathize: {
          t: "동정하지 못하시는 분이 아님",
          g: "mē dynamenon sympathēsai · μὴ δυνάμενον συμπαθῆσαι",
          v: "4:15",
          s: "이중 부정: 반드시 동정하심",
          d: "함께 아파하다, 함께 느끼다. “동정하지 못하시는 분이 아닙니다”라는 이중 부정은, 모든 점에서 시험을 받으셨으나 죄는 없으신 예수님의 공감을 확실히 보증합니다.",
        },
        confidence: {
          t: "담대함",
          g: "parrēsia · παρρησία",
          v: "4:16",
          s: "두려움 없이 터놓고 말함",
          d: "모든 말, 자유로움에서 나와 두려움 없이 무엇이든 말하는 것. 고대 그리스 시대에 왕 앞에서 말의 자유는 드물었고, 처형당할 두려움 없이 터놓고 말할 수 있는 사람들을 가리켰습니다.",
        },
        draw: {
          t: "나아가다",
          g: "proserchōmetha · προσερχώμεθα",
          v: "4:16",
          s: "가까이 감, 예배함",
          d: "다가가다, 가까이 오다, 찾아가다. 비유적으로 예배하다, 가까이 나아가다. 현재 시제로, 지금 계속 나아가라는 뜻입니다. 나아가는 것은 담대하게 기도하는 것이기도 합니다.",
        },
        throne: {
          t: "은혜의 보좌",
          g: "thronos tēs charitos · θρόνος τῆς χάριτος",
          v: "4:16",
          s: "권위의 자리, 이제는 은혜의 자리",
          d: "권위의 자리이며, 하나님의 절대적인 거룩하심과 경외와 심판과 이어져 있습니다. 그리스도 안에 있는 사람들에게는 심판과 처형이 아니라 은혜와 자비의 근원입니다.",
        },
        help: {
          t: "제때에 주시는 도움",
          g: "eukairon boētheian · εὔκαιρον βοήθειαν",
          v: "4:16",
          s: "꼭 맞는 때의 은혜",
          d: "꼭 맞는 때에 주시는 은혜. 몸부림과 시험과 어려움과 고난이 있을 때 오는 도움입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb2",
        tag: "NT",
        en: "Heb 2:17–18",
        ko: "히 2:17–18",
        ten: "Therefore he had to be made like his brothers in every respect, so that he might become a merciful and faithful high priest in the service of God, to make propitiation for the sins of the people. For because he himself has suffered when tempted, he is able to help those who are being tempted.",
        tko: "그러므로 그는 모든 점에서 형제자매들과 같아지셔야만 했습니다. 그것은, 그가 하나님 앞에서 자비롭고 성실한 대제사장이 되심으로써, 백성의 죄를 대신 갚으시기 위한 것입니다. 그는 몸소 시험을 받아서 고난을 당하셨으므로, 시험을 받는 사람들을 도우실 수 있습니다.",
        wen: "Where the letter first named Jesus our merciful high priest.",
        wko: "이 편지가 처음으로 예수님을 자비로운 대제사장이라 부른 곳.",
      },
      {
        id: "heb10",
        tag: "NT",
        en: "Heb 10:19–22",
        ko: "히 10:19–22",
        ten: "Therefore, brothers, since we have confidence to enter the holy places by the blood of Jesus, by the new and living way that he opened for us through the curtain, that is, through his flesh, and since we have a great priest over the house of God, let us draw near with a true heart in full assurance of faith, with our hearts sprinkled clean from an evil conscience and our bodies washed with pure water.",
        tko: "그러므로 형제자매 여러분, 우리는 예수의 피를 힘입어서 담대하게 지성소에 들어가게 되었습니다. 예수께서는 휘장을 뚫고 우리에게 새로운 살 길을 열어 주셨습니다. 그런데 그 휘장은 곧 그의 육체입니다. 그리고 우리에게는 하나님의 집을 다스리시는 위대한 제사장이 계십니다. 그러니 우리는 확고한 믿음을 가지고, 참된 마음으로 하나님께 나아갑시다. 우리는 마음에다 예수의 피를 뿌려서 죄책감에서 벗어나고, 맑은 물로 몸을 깨끗이 씻었습니다.",
        wen: "The same confidence and the same call later in the letter: draw near.",
        wko: "편지 뒷부분의 같은 담대함과 같은 부름: 나아갑시다.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "The rest is still open",
        items: [
          [
            "vv1–5",
            "The promise of entering God’s rest still stands. Israel heard the good news but did not join it to faith. God’s rest has existed since creation, when he finished his work and rested on the seventh day.",
          ],
          [
            "vv6–11",
            "Joshua gave the land a temporary rest, but through David God spoke of another day, “Today.” A Sabbath rest remains for God’s people, entered by faith and not by works.",
          ],
        ],
      },
      {
        h: "Laid bare, and welcomed",
        items: [
          [
            "vv12–13",
            "The word of God is living and active, sharper than any two-edged sword. It judges thoughts and intentions; nothing is hidden from his sight.",
          ],
          [
            "vv14–16",
            "We have a great high priest who passed through the heavens and can sympathize with our weaknesses. So we draw near to the throne of grace with confidence.",
          ],
        ],
      },
    ],
    intentH: "The author’s intention",
    intentShort:
      "To show that God’s Sabbath rest, existing since creation, is still open to all who believe, and to urge believers to hold fast to Jesus, the great high priest, and draw near to his throne of grace.",
    intent: [
      "This chapter continues the theme of belief and unbelief by introducing the Sabbath rest. That rest has existed since creation, when God rested on the seventh day. Many Jewish people thought Joshua entering Canaan was the end, but the author shows from God’s own words that the way into the Sabbath rest still exists. It is open to all believers, and whoever does not believe will fall away from it.",
      "God’s word is not only outward guidance. It examines every thought, intention and motive.",
      "But we have Jesus Christ, who experienced our weaknesses yet did not sin at all on that journey, entered heaven and became our great high priest. We hold fast to him, and draw near to his kingdom of righteousness.",
    ],
  },
  ko: {
    groups: [
      {
        h: "안식은 아직 열려 있습니다",
        items: [
          [
            "1–5절",
            "하나님의 안식에 들어가리라는 약속은 아직 남아 있습니다. 이스라엘은 기쁜 소식을 들었지만 믿음과 결합시키지 않았습니다. 하나님의 안식은 그분이 일을 마치고 일곱째 날에 쉬신 창조 때부터 있어 왔습니다.",
          ],
          [
            "6–11절",
            "여호수아는 그 땅에 일시적인 쉼을 주었지만, 하나님은 다윗을 통해 ‘오늘’이라는 다른 날을 말씀하셨습니다. 하나님의 백성에게는 안식하는 일이 아직 남아 있으며, 그것은 행위가 아니라 믿음으로 들어갑니다.",
          ],
        ],
      },
      {
        h: "드러나고, 받아들여짐",
        items: [
          [
            "12–13절",
            "하나님의 말씀은 살아 있고 힘이 있어서, 어떤 양날칼보다도 더 날카롭습니다. 생각과 의도를 판단하며, 그분 앞에 숨겨진 것은 아무것도 없습니다.",
          ],
          [
            "14–16절",
            "우리에게는 하늘에 올라가셔서 우리의 연약함을 동정하시는 위대한 대제사장이 계십니다. 그러므로 우리는 담대하게 은혜의 보좌로 나아갑니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "창조 때부터 있어 온 하나님의 안식이 믿는 모든 사람에게 아직 열려 있음을 보여 주고, 위대한 대제사장이신 예수님을 굳게 붙들고 그분의 은혜의 보좌로 나아가라고 권하는 것.",
    intent: [
      "이 장은 안식을 소개하며 믿음과 불신이라는 주제를 이어 갑니다. 그 안식은 하나님께서 일곱째 날에 쉬신 창조 때부터 있어 왔습니다. 많은 유대인은 여호수아가 가나안에 들어간 것으로 끝났다고 생각했지만, 저자는 하나님께서 하신 말씀으로 안식에 들어가는 길이 아직 있음을 분명히 보여 줍니다. 그 길은 믿는 모든 사람에게 열려 있고, 믿지 않는 사람은 거기서 떨어져 나갈 것입니다.",
      "하나님의 말씀은 겉으로의 인도만이 아닙니다. 모든 생각과 의도와 동기를 살핍니다.",
      "그러나 우리에게는 우리의 연약함을 겪으시고도 그 길에서 조금도 죄를 짓지 않으시고, 하늘에 들어가 우리의 위대한 대제사장이 되신 예수 그리스도가 계십니다. 우리는 그분을 굳게 붙들고, 그분의 의로운 나라로 나아갑니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 4",
    tagline: "“So then, there remains a Sabbath rest for the people of God.”",
    taglineRef: "Hebrews 4:9",
    mapTitle: "Sixteen verses, four movements",
    mapIntro:
      "God’s rest has been waiting since the seventh day of creation, and it is still open “Today.” His word lays every heart bare, and our great high priest welcomes us to the throne of grace.",
    summaryTitle: "What Hebrews 4 says",
    footQuote:
      "“Let us then with confidence draw near to the throne of grace.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 4장",
    tagline: "“그러니 하나님의 백성에게는 안식하는 일이 아직 남아 있습니다.”",
    taglineRef: "히브리서 4:9",
    mapTitle: "열여섯 절, 네 흐름",
    mapIntro:
      "하나님의 안식은 창조의 일곱째 날부터 기다리고 있었고, “오늘”도 열려 있습니다. 그분의 말씀은 모든 마음을 드러내고, 우리의 위대한 대제사장은 우리를 은혜의 보좌로 맞아 주십니다.",
    summaryTitle: "히브리서 4장이 말하는 것",
    footQuote: "“그러므로 우리는 담대하게 은혜의 보좌로 나아갑시다.”",
    version: "새번역",
  },
};

export const chapter4: ChapterContent = {
  number: 4,
  setting: "garden",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
