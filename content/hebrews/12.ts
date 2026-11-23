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
    range: "1–4",
    en: {
      title: "The race set before us",
      quote:
        "“…let us run with endurance the race that is set before us, looking to Jesus…”",
      sref: "Hebrews 12:1–2",
      cap: "Surrounded by a great cloud of witnesses, we lay aside every weight and run our faith marathon, looking to Jesus.",
      snips: [
        "A cloud of witnesses surrounds us: run with endurance",
        "Look to Jesus, who endured the cross and sat down",
        "Consider him, so that you do not grow weary",
        "You have not yet resisted to the point of blood",
      ],
      verses: [
        [
          1,
          "Therefore, since we are surrounded by so great a [cloud|cloud] of [witnesses|witnesses], let us also lay aside every [weight|weight], and [clings|sin which clings so closely], and let us run with [endurance|endurance] the race that is set before us,",
        ],
        [
          2,
          "[looking|looking to Jesus], the founder and perfecter of our faith, who for the joy that was set before him endured the cross, despising the shame, and is seated at the right hand of the throne of God.",
        ],
        [
          3,
          "[consider|Consider] him who endured from sinners such [hostility|hostility] against himself, so that you may not [weary|grow weary] or [fainthearted|fainthearted].",
        ],
        [
          4,
          "In your struggle against sin you have not yet resisted to the point of shedding your blood.",
        ],
      ],
      com: [
        ["h", "Not alone in the race"],
        [
          "p",
          "At the end of chapter 10 the author talks about how in the earlier days the Jewish Christians endured great suffering from persecutions, public shaming, confiscated properties and insults. Chapter 11 then talks about the believers in the Old Testament, showing how they endured all their hardships, struggles, suffering and persecution with faith. Even though they did not receive the final realisation of the promise in their lifetimes, they overcame all difficulties because they held on to faith.",
        ],
        [
          "p",
          "In chapter 12 the author delivers a hopeful message: the readers are not alone in their suffering. Surrounded by this massive historical crowd of witnesses, who prove that a life of faith is possible, they are to lay aside every hindrance and the sin that is continually trying to disrupt their “faith marathon”.",
        ],
        ["h", "The founder and perfecter"],
        [
          "p",
          "In verse 2 the author again calls Jesus the founder and perfecter of our faith. This echoes chapter 2, where God made the pioneer of their salvation perfect through what he suffered. Because Jesus experienced all the temptations, difficulties, hardships and weaknesses of humankind, he is the perfect Saviour to help people draw near to God.",
        ],
        [
          "p",
          "Jesus endured the cross, the physical agony and pain, and the psychological shame behind it. The cross was a curse (Gal 3:13), designed to shame a person, usually a criminal. Although Jesus did no wrong, he accepted the cross.",
        ],
        [
          "p",
          "The “joy set before him” can mean the crown God gives, which is glory and honour (2:9), but also the fulfilment of God’s will (10:5–10), bringing the spiritual family to glory and sharing in the inheritance (chapter 2). In this context joy also means sacrificial obedience and doing the will of God.",
        ],
        [
          "p",
          "Being seated at the right hand of God means that the work Jesus was given had been finished once and for all. It also signifies his ultimate victory, reigning as King over all his enemies.",
        ],
        ["h", "Weighing it up"],
        [
          "p",
          "Here the author weighs up what the Jewish Christians are experiencing against what Jesus experienced. The trials they face are bearable compared with what Jesus had to undergo. Jesus went “to the point of shedding blood”, which is death. The readers suffered persecution and hardship to a great extent, but it had not cost their lives as it cost Christ his. So the author urges them to endure the hardship and not fall away.",
        ],
      ],
    },
    ko: {
      title: "우리 앞에 놓인 달음질",
      quote:
        "“…우리 앞에 놓인 달음질을 참으면서 달려갑시다. 믿음의 창시자요 완성자이신 예수를 바라봅시다.”",
      sref: "히브리서 12:1–2",
      cap: "구름 떼와 같은 증인들에게 둘러싸여, 우리는 모든 무거운 짐을 벗고 예수를 바라보며 믿음의 마라톤을 달립니다.",
      snips: [
        "수많은 증인이 둘러싸고 있으니 참으면서 달려갑시다",
        "십자가를 참고 보좌 오른쪽에 앉으신 예수를 바라봅시다",
        "그분을 생각하면 지치지 않습니다",
        "아직 피를 흘리기까지 대항하지는 않았습니다",
      ],
      verses: [
        [
          1,
          "그러므로 이렇게 [cloud|구름 떼]와 같이 수많은 [witnesses|증인]이 우리를 둘러싸고 있으니, 우리도 갖가지 [weight|무거운 짐]과 [clings|얽매는 죄]를 벗어버리고, 우리 앞에 놓인 달음질을 [endurance|참으면서] 달려갑시다.",
        ],
        [
          2,
          "믿음의 창시자요 완성자이신 예수를 [looking|바라봅시다]. 그는 자기 앞에 놓여 있는 기쁨을 내다보고서, 부끄러움을 마음에 두지 않으시고, 십자가를 참으셨습니다. 그리하여 그는 하나님의 보좌 오른쪽에 앉으셨습니다.",
        ],
        [
          3,
          "자기에 대한 죄인들의 이러한 [hostility|반항]을 참아내신 분을 [consider|생각하십시오]. 그리하면 여러분은 [fainthearted|낙심하여] [weary|지치는] 일이 없을 것입니다.",
        ],
        [
          4,
          "여러분은 죄와 맞서서 싸우지만, 아직 피를 흘리기까지 대항한 일은 없습니다.",
        ],
      ],
      com: [
        ["h", "혼자 달리지 않습니다"],
        [
          "p",
          "10장 끝에서 저자는 유대 그리스도인들이 처음 시절에 박해와 공개적인 모욕과 재산을 빼앗기는 일과 비난을 견디어 냈다고 말했습니다. 11장은 구약의 믿는 사람들이 모든 고난과 싸움과 박해를 믿음으로 견딘 모습을 보여 줍니다. 그들은 살아 있는 동안 약속이 이루어지는 것을 보지 못했지만, 믿음을 붙들었기에 모든 어려움을 이겨냈습니다.",
        ],
        [
          "p",
          "12장에서 저자는 희망의 말씀을 전합니다. 독자들은 고난 가운데 혼자가 아닙니다. 믿음의 삶이 가능하다는 것을 증명하는 거대한 역사 속의 증인들이 그들을 둘러싸고 있습니다. 그러니 모든 방해물과 그들의 “믿음의 마라톤”을 끊임없이 흐트러뜨리려는 죄를 벗어버리라고 말합니다.",
        ],
        ["h", "믿음의 창시자요 완성자"],
        [
          "p",
          "2절에서 저자는 다시 예수님을 믿음의 창시자요 완성자라고 부릅니다. 이는 하나님께서 구원의 창시자를 고난으로써 완전하게 하셨다는 2장의 가르침과 이어집니다. 예수님께서 인간의 모든 유혹과 어려움과 고난과 연약함을 겪으셨기 때문에, 사람들이 하나님께 나아가도록 돕는 완전한 구원자이십니다.",
        ],
        [
          "p",
          "예수님께서는 십자가의 육체적 고통과 그 뒤에 있는 정신적 수치를 참으셨습니다. 십자가는 저주였고(갈 3:13), 보통 죄인을 부끄럽게 하려고 만든 형벌이었습니다. 예수님께서는 아무 잘못도 하지 않으셨지만 십자가를 받아들이셨습니다.",
        ],
        [
          "p",
          "“자기 앞에 놓여 있는 기쁨”은 하나님께서 주시는 영광과 존귀의 면류관(2:9)일 수도 있고, 하나님의 뜻을 이루는 것(10:5–10), 곧 영적인 가족을 영광으로 이끌고 함께 유업을 받는 것(2장)일 수도 있습니다. 이 문맥에서 기쁨은 희생적인 순종과 하나님의 뜻을 행하는 것을 뜻하기도 합니다.",
        ],
        [
          "p",
          "하나님의 오른쪽에 앉으셨다는 것은 예수님께 맡겨진 일이 단번에 영원히 끝났다는 뜻이며, 그분의 궁극적인 승리와 모든 원수 위에 왕으로 다스리심을 나타냅니다.",
        ],
        ["h", "견주어 보기"],
        [
          "p",
          "여기서 저자는 유대 그리스도인들이 겪는 일과 예수님께서 겪으신 일을 견주어 봅니다. 지금 겪는 시련은 예수님께서 겪으셔야 했던 일에 비하면 견딜 만하다는 것입니다. 예수님께서는 “피를 흘리기까지”, 곧 죽음에 이르셨습니다. 독자들은 큰 박해와 고난을 겪었지만, 그리스도처럼 목숨을 잃지는 않았습니다. 그래서 저자는 고난을 견디고 떨어져 나가지 말라고 힘써 권합니다.",
        ],
      ],
    },
    words: {
      en: {
        cloud: {
          t: "Cloud",
          g: "nephos · νέφος",
          v: "12:1",
          s: "A great crowd",
          d: "Used figuratively to describe a crowd or throng, emphasising a large number.",
        },
        witnesses: {
          t: "Witnesses",
          g: "martyrōn · μαρτύρων",
          v: "12:1",
          s: "Witnesses of faith",
          d: "All the believers listed in Hebrews 11; witnesses of faith.",
        },
        weight: {
          t: "Weight",
          g: "onkon · ὄγκον",
          v: "12:1",
          s: "A hindrance",
          d: "Used figuratively of whatever hinders or prevents someone from doing something: a hindrance, an impediment.",
        },
        clings: {
          t: "Sin which clings so closely",
          g: "euperistaton · εὐπερίστατον",
          v: "12:1",
          s: "Surrounding the runner",
          d: "To surround, to place itself around a racer in every direction to thwart. Sin is described as constantly present, persistently attacking, tempting and harassing.",
        },
        endurance: {
          t: "Run with endurance",
          g: "hypomonēs · ὑπομονῆς",
          v: "12:1",
          s: "Hang in there",
          d: "The race is a lifelong, steady journey of faith, not a quick sprint. Endurance means “hang in there”: stay under pressure and refuse to quit despite fatigue, trials or suffering.",
        },
        looking: {
          t: "Looking to Jesus",
          g: "aphorōntes · ἀφορῶντες",
          v: "12:2",
          s: "Looking away to him",
          d: "To look away from everything else and look steadfastly, intently towards Jesus; to direct one’s attention without distraction.",
        },
        consider: {
          t: "Consider",
          g: "analogisasthe · ἀναλογίσασθε",
          v: "12:3",
          s: "Weigh it up",
          d: "Analogy; to calculate, to weigh one thing against another.",
        },
        hostility: {
          t: "Hostility",
          g: "antilogian · ἀντιλογίαν",
          v: "12:3",
          s: "Speaking against",
          d: "A word spoken against, speaking against, talking back; opposition.",
        },
        weary: {
          t: "Weary",
          g: "kamēte · κάμητε",
          v: "12:3",
          s: "Worn down",
          d: "To grow fatigued and so become discouraged.",
        },
        fainthearted: {
          t: "Fainthearted",
          g: "eklyomenoi · ἐκλυόμενοι",
          v: "12:3",
          s: "Coming loose",
          d: "To loosen out, to untie, dissolve, release.",
        },
      },
      ko: {
        cloud: {
          t: "구름 떼",
          g: "nephos · νέφος",
          v: "12:1",
          s: "큰 무리",
          d: "많은 수를 강조하여 무리나 군중을 비유적으로 나타내는 말입니다.",
        },
        witnesses: {
          t: "증인",
          g: "martyrōn · μαρτύρων",
          v: "12:1",
          s: "믿음의 증인",
          d: "히브리서 11장에 나온 모든 믿는 사람들, 곧 믿음의 증인들입니다.",
        },
        weight: {
          t: "무거운 짐",
          g: "onkon · ὄγκον",
          v: "12:1",
          s: "방해물",
          d: "어떤 일을 하지 못하도록 막거나 방해하는 것을 비유적으로 나타냅니다. 방해물, 장애물입니다.",
        },
        clings: {
          t: "얽매는 죄",
          g: "euperistaton · εὐπερίστατον",
          v: "12:1",
          s: "달리는 사람을 에워쌈",
          d: "둘러쌈. 달리는 사람을 사방에서 에워싸 가로막는 것입니다. 죄는 늘 곁에 있으면서 끊임없이 공격하고 유혹하고 괴롭히는 것으로 묘사됩니다.",
        },
        endurance: {
          t: "참으면서 달림",
          g: "hypomonēs · ὑπομονῆς",
          v: "12:1",
          s: "버티는 것",
          d: "이 달음질은 짧은 전력 질주가 아니라 평생에 걸친 꾸준한 믿음의 여정입니다. 인내는 “버티는 것”, 곧 피로와 시련과 고난 속에서도 압박을 견디며 포기하지 않는 것입니다.",
        },
        looking: {
          t: "예수를 바라봄",
          g: "aphorōntes · ἀφορῶντες",
          v: "12:2",
          s: "다른 것에서 눈을 돌려 바라봄",
          d: "다른 모든 것에서 눈을 돌려 예수님을 꾸준히, 골똘히 바라보는 것, 흐트러짐 없이 주의를 기울이는 것입니다.",
        },
        consider: {
          t: "생각하다",
          g: "analogisasthe · ἀναλογίσασθε",
          v: "12:3",
          s: "견주어 봄",
          d: "유비, 헤아림. 하나를 다른 것과 견주어 보는 것입니다.",
        },
        hostility: {
          t: "반항",
          g: "antilogian · ἀντιλογίαν",
          v: "12:3",
          s: "거슬러 말함",
          d: "거슬러 하는 말, 말대꾸, 맞서는 것입니다.",
        },
        weary: {
          t: "지치다",
          g: "kamēte · κάμητε",
          v: "12:3",
          s: "기진함",
          d: "지쳐서 낙심하게 되는 것입니다.",
        },
        fainthearted: {
          t: "낙심하다",
          g: "eklyomenoi · ἐκλυόμενοι",
          v: "12:3",
          s: "풀어짐",
          d: "느슨해짐, 풀림, 녹아 없어짐, 놓아 버림을 뜻합니다.",
        },
      },
    },
    chips: [
      {
        id: "heb10-32",
        tag: "NT",
        en: "Heb 10:32",
        ko: "히 10:32",
        ten: "But recall the former days when, after you were enlightened, you endured a hard struggle with sufferings,",
        tko: "여러분은 빛을 받은 뒤에, 고난의 싸움을 많이 견디어 낸 그 처음 시절을 되새기십시오.",
        wen: "What the readers had already endured.",
        wko: "독자들이 이미 견디어 낸 일.",
      },
      {
        id: "heb2-10",
        tag: "NT",
        en: "Heb 2:10",
        ko: "히 2:10",
        ten: "For it was fitting that he, for whom and by whom all things exist, in bringing many sons to glory, should make the founder of their salvation perfect through suffering.",
        tko: "하나님께서는 만물을 창조하시고, 만물을 보존하시는 분이십니다. 그러므로 하나님께서 많은 자녀를 영광에 이끌어들이실 때에, 그들의 구원의 창시자를 고난으로써 완전하게 하신다는 것은 당연한 일입니다.",
        wen: "The founder made perfect through suffering.",
        wko: "고난으로써 완전하게 된 창시자.",
      },
      {
        id: "gal3-13",
        tag: "NT",
        en: "Gal 3:13",
        ko: "갈 3:13",
        ten: "Christ redeemed us from the curse of the law by becoming a curse for us—for it is written, “Cursed is everyone who is hanged on a tree”—",
        tko: "그리스도께서 우리를 위하여 저주를 받은 사람이 되심으로써, 우리를 율법의 저주에서 속량해 주셨습니다. 기록된 바 “나무에 달린 자는 모두 저주를 받은 자이다” 하였기 때문입니다.",
        wen: "The cross was a curse.",
        wko: "십자가는 저주였습니다.",
      },
      {
        id: "heb2-9",
        tag: "NT",
        en: "Heb 2:9",
        ko: "히 2:9",
        ten: "But we see him who for a little while was made lower than the angels, namely Jesus, crowned with glory and honor because of the suffering of death, so that by the grace of God he might taste death for everyone.",
        tko: "예수께서 다만 잠시 동안 천사들보다 낮아지셔서, 죽음의 고난을 당하심으로써, 영광과 존귀의 면류관을 받아쓰신 것을, 우리가 봅니다. 그는 하나님의 은혜로 모든 사람을 위하여 죽음을 맛보셔야 했습니다.",
        wen: "The joy set before him: glory and honour.",
        wko: "그 앞에 놓인 기쁨: 영광과 존귀.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "5–11",
    en: {
      title: "The Lord disciplines the one he loves",
      quote: "“For the Lord disciplines the one he loves…”",
      sref: "Hebrews 12:6",
      cap: "Hardship is not punishment or abandonment but a Father’s training, and the proof that we are his true sons.",
      snips: [
        "Do not regard lightly the Lord’s discipline",
        "The Lord disciplines the one he loves",
        "God is treating you as sons",
        "Without discipline you would not be sons",
        "Shall we not be subject to the Father of spirits?",
        "He disciplines us to share his holiness",
        "Later it yields the peaceful fruit of righteousness",
      ],
      verses: [
        [
          5,
          "And have you forgotten the exhortation that addresses you as sons? “My son, do not [regard|regard lightly] the [discipline|discipline] of the Lord, nor be weary when [reproved|reproved] by him.",
        ],
        [
          6,
          "For the Lord disciplines the one he loves, and chastises every son whom he receives.”",
        ],
        [
          7,
          "It is for discipline that you have to endure. God is treating you as sons. For what son is there whom his father does not discipline?",
        ],
        [
          8,
          "If you are left without discipline, in which all have participated, then you are [illegitimate|illegitimate children] and not sons.",
        ],
        [
          9,
          "Besides this, we have had earthly fathers who disciplined us and we respected them. Shall we not much more be subject to the Father of spirits and live?",
        ],
        [
          10,
          "For they disciplined us for a short time as it seemed best to them, but he disciplines us for our good, that we may share his holiness.",
        ],
        [
          11,
          "For the moment all discipline seems painful rather than pleasant, but later it yields the peaceful fruit of righteousness to those who have been trained by it.",
        ],
      ],
      com: [
        ["h", "“My son”: Proverbs 3"],
        [
          "p",
          "Proverbs 3 is one of the nine chapters in Proverbs that serve as an intimate instructional guide to the practical application of godly wisdom. Its recurring phrase “My son” works both as a literal father training his heir for the complexities of life and leadership, and as a royal tutor mentoring young disciples in the court. In the end people flourish through total surrender to divine guidance rather than human intellect.",
        ],
        [
          "p",
          "The author uses Proverbs 3:11–12 to comfort the Jewish Christians. The difficulties they face are not punishment, victimisation or a sign of God forsaking them, but discipline: training for spiritual maturity and a chance to grow, because God has called them sons. God disciplines his sons, which shows that they have been divinely adopted and are true heirs of the inheritance. So the persecution the readers are undergoing is divine discipline, a parent’s training from God, rather than divine punishment.",
        ],
        ["h", "Proof of sonship"],
        [
          "p",
          "In ancient Jewish and Roman culture, discipline was proof of legitimate sonship. Without discipline a son would not be a son but an illegitimate child. The author comforts the readers with another proof that they are certainly legitimate children of God.",
        ],
        ["h", "Earthly fathers and the Father of spirits"],
        [
          "p",
          "Hebrews has made many comparisons between earthly things and heavenly things. Here it compares earthly fathers with the heavenly Father. Earthly fathers disciplined us for a short time and in the way they thought best, which could be imperfect or flawed, and still they were respected.",
        ],
        [
          "p",
          "God, on the other hand, disciplines us to become perfect, sharing his holiness. He allows hardship for our absolute benefit, to shape our character to become pure and holy just like him.",
        ],
        [
          "q",
          "For our earthly fathers disciplined us for a few years, doing the best they knew how. But God’s discipline is always good for us, so that we might share in his holiness. (NLT)",
        ],
        ["h", "The peaceful fruit"],
        [
          "p",
          "The fruit of righteousness cannot be obtained through human will or effort. It is given through Jesus Christ (Phil 1:11). In the end the pain the readers are experiencing will yield a transformation that brings them closer to God’s character of holiness.",
        ],
      ],
    },
    ko: {
      title: "주님께서는 사랑하시는 사람을 징계하십니다",
      quote: "“주님께서는 사랑하시는 사람을 징계하시고…”",
      sref: "히브리서 12:6",
      cap: "고난은 벌이나 버림받음이 아니라 아버지의 훈련이며, 우리가 그분의 참 자녀라는 증거입니다.",
      snips: [
        "주님의 징계를 가볍게 여기지 마십시오",
        "주님께서는 사랑하시는 사람을 징계하십니다",
        "하나님께서는 자녀에게 대하시듯 대하십니다",
        "징계가 없다면 참 자녀가 아닙니다",
        "영들의 아버지께 복종하고 살아야 하지 않겠습니까",
        "그분의 거룩하심에 참여하게 하시려고 징계하십니다",
        "나중에는 정의의 평화로운 열매를 맺습니다",
      ],
      verses: [
        [
          5,
          "또 여러분은, 하나님께서 여러분을 향하여 자녀에게 말하듯이 하신 이 권면을 잊었습니다. “내 아들아, 주님의 [discipline|징계]를 [regard|가볍게 여기지] 말고, 그에게 [reproved|꾸지람을 들을] 때에 낙심하지 말아라.",
        ],
        [
          6,
          "주님께서는 사랑하시는 사람을 징계하시고, 받아들이시는 아들마다 채찍질하신다.”",
        ],
        [
          7,
          "징계를 받을 때에 참아내십시오. 하나님께서는 자녀에게 대하시듯이 여러분에게 대하십니다. 아버지가 징계하지 않는 자녀가 어디에 있겠습니까?",
        ],
        [
          8,
          "모든 자녀가 받은 징계를 여러분이 받지 않는다고 하면, 여러분은 [illegitimate|사생아]이지, 참 자녀가 아닙니다.",
        ],
        [
          9,
          "우리가 육신의 아버지도 훈육자로 모시고 공경하거든, 하물며 영들의 아버지께 복종하고 살아야 한다는 것은 더욱더 당연한 일이 아니겠습니까?",
        ],
        [
          10,
          "육신의 아버지는 잠시 동안 자기들의 생각대로 우리를 징계하였지만, 하나님께서는 우리를 자기의 거룩하심에 참여하게 하시려고, 우리에게 유익이 되도록 징계하십니다.",
        ],
        [
          11,
          "무릇 징계는 어떤 것이든지 그 당시에는 즐거움이 아니라 괴로움으로 여겨지지만, 나중에는 이것으로 훈련받은 사람들에게 정의의 평화로운 열매를 맺게 합니다.",
        ],
      ],
      com: [
        ["h", "“내 아들아”: 잠언 3장"],
        [
          "p",
          "잠언 3장은 경건한 지혜를 실제 삶에 적용하도록 가까이에서 가르치는 잠언의 아홉 장 가운데 하나입니다. 되풀이되는 “내 아들아”라는 말은 삶과 지도력의 복잡한 일들을 위해 상속자를 훈련하는 실제 아버지의 말이기도 하고, 궁정에서 젊은 제자들을 가르치는 왕실 스승의 말이기도 합니다. 결국 사람은 인간의 지성이 아니라 하나님의 인도하심에 온전히 맡길 때 번성합니다.",
        ],
        [
          "p",
          "저자는 잠언 3장 11–12절로 유대 그리스도인들을 위로합니다. 그들이 겪는 어려움은 벌이나 억울한 피해나 하나님께서 버리셨다는 표시가 아니라 징계, 곧 영적 성숙을 위한 훈련이며 자랄 기회입니다. 하나님께서 그들을 자녀로 부르셨기 때문입니다. 하나님께서 자녀를 징계하신다는 것은 그들이 하나님의 양자가 되었고 유업의 참 상속자라는 것을 확인해 줍니다. 그러므로 독자들이 겪는 박해는 하나님의 벌이 아니라 하나님의 징계, 곧 아버지의 훈련입니다.",
        ],
        ["h", "자녀라는 증거"],
        [
          "p",
          "고대 유대와 로마 문화에서 징계는 정당한 아들이라는 증거였습니다. 징계가 없다면 그 아들은 참 아들이 아니라 사생아였습니다. 저자는 독자들이 분명히 하나님의 참 자녀라는 또 하나의 증거로 그들을 위로합니다.",
        ],
        ["h", "육신의 아버지와 영들의 아버지"],
        [
          "p",
          "히브리서는 땅의 것과 하늘의 것을 여러 번 견주어 왔습니다. 여기서는 육신의 아버지와 하늘 아버지를 견줍니다. 육신의 아버지는 잠시 동안 자기들이 가장 좋다고 생각하는 방식으로 징계했고, 그 방식은 불완전하거나 잘못되었을 수 있지만 그래도 공경을 받았습니다.",
        ],
        [
          "p",
          "그러나 하나님께서는 우리가 완전해지도록, 곧 그분의 거룩하심에 참여하도록 징계하십니다. 하나님께서는 우리에게 온전히 유익이 되도록 고난을 허락하시고, 우리의 성품을 하나님처럼 깨끗하고 거룩하게 빚으십니다.",
        ],
        ["h", "평화로운 열매"],
        [
          "p",
          "의의 열매는 사람의 의지나 노력으로 얻을 수 없고, 예수 그리스도를 통해 주어집니다(빌 1:11). 결국 독자들이 겪는 고통은 그들을 하나님의 거룩한 성품에 더 가까워지게 하는 변화를 맺을 것입니다.",
        ],
      ],
    },
    words: {
      en: {
        regard: {
          t: "Regard lightly",
          g: "oligōrei · ὀλιγώρει",
          v: "12:5",
          s: "To think little of",
          d: "To regard something as of little value, to look down on it.",
        },
        discipline: {
          t: "Discipline",
          g: "paideias · παιδείας",
          v: "12:5",
          s: "Training a child",
          d: "To provide instruction with the intent of forming proper habits of behaviour, giving guidance for responsible living and guiding a child to maturity.",
        },
        reproved: {
          t: "Reproved",
          g: "elenchomenos · ἐλεγχόμενος",
          v: "12:5",
          s: "Shown the wrong",
          d: "To show someone they have done something wrong and summon them to repent or correct their wayward ways.",
        },
        illegitimate: {
          t: "Illegitimate",
          g: "nothoi · νόθοι",
          v: "12:8",
          s: "Not a lawful son",
          d: "Born not from lawful wedlock but of a concubine or female slave.",
        },
      },
      ko: {
        regard: {
          t: "가볍게 여기다",
          g: "oligōrei · ὀλιγώρει",
          v: "12:5",
          s: "하찮게 여김",
          d: "어떤 것을 가치가 적은 것으로 여기고 업신여기는 것입니다.",
        },
        discipline: {
          t: "징계",
          g: "paideias · παιδείας",
          v: "12:5",
          s: "자녀를 기름",
          d: "바른 행동 습관을 기르려는 뜻으로 가르치고, 책임 있는 삶으로 이끌며, 자녀를 성숙하게 기르는 것입니다.",
        },
        reproved: {
          t: "꾸지람",
          g: "elenchomenos · ἐλεγχόμενος",
          v: "12:5",
          s: "잘못을 보여 줌",
          d: "잘못한 것을 보여 주고 회개하거나 그릇된 길을 바로잡으라고 부르는 것입니다.",
        },
        illegitimate: {
          t: "사생아",
          g: "nothoi · νόθοι",
          v: "12:8",
          s: "정당한 아들이 아님",
          d: "정식 혼인이 아니라 첩이나 여종에게서 난 자녀입니다.",
        },
      },
    },
    chips: [
      {
        id: "pro3-11",
        tag: "OT",
        en: "Prov 3:11–12",
        ko: "잠 3:11–12",
        ten: "My son, do not despise the Lord’s discipline or be weary of his reproof, for the Lord reproves him whom he loves, as a father the son in whom he delights.",
        tko: "아이들아, 주님의 훈계를 거부하지 말고, 그의 책망을 싫어하지 말아라. 주님은, 당신이 사랑하시는 사람을 꾸짖으시니, 마치 귀여워하는 아들을 꾸짖는 아버지와 같으시다.",
        wen: "The passage the author quotes.",
        wko: "저자가 인용한 말씀.",
      },
      {
        id: "php1-11",
        tag: "NT",
        en: "Phil 1:11",
        ko: "빌 1:11",
        ten: "filled with the fruit of righteousness that comes through Jesus Christ, to the glory and praise of God.",
        tko: "예수 그리스도께서 주시는 의의 열매로 가득 차서 하나님께 영광과 찬양을 드리게 되기를, 나는 기도합니다.",
        wen: "The fruit of righteousness comes through Christ.",
        wko: "의의 열매는 그리스도께서 주십니다.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "12–17",
    en: {
      title: "See to it that no one fails",
      quote:
        "“Strive for peace with everyone, and for the holiness without which no one will see the Lord.”",
      sref: "Hebrews 12:14",
      cap: "Stand up again, pursue peace and holiness, and look after one another, so that no one trades the birthright away like Esau.",
      snips: [
        "Lift your drooping hands and weak knees",
        "Make straight paths so the lame may be healed",
        "Strive for peace and for holiness",
        "Let no root of bitterness spring up",
        "No one unholy like Esau, who sold his birthright",
        "Afterward he was rejected, though he sought it with tears",
      ],
      verses: [
        [
          12,
          "Therefore lift your [drooping|drooping hands] and [strengthen|strengthen] your weak knees,",
        ],
        [
          13,
          "and “make straight paths for your feet”, so that what is lame may not be put out of joint but rather be healed.",
        ],
        [
          14,
          "[strive|Strive] for [peace|peace] with everyone, and for the [holiness|holiness] without which no one will see the Lord.",
        ],
        [
          15,
          "See to it that no one fails to obtain the [grace|grace of God]; that no “[root|root of bitterness]” springs up and causes trouble, and by it many become defiled;",
        ],
        [
          16,
          "that no one is [immoral|sexually immoral] or [unholy|unholy] like Esau, who sold his birthright for a single meal.",
        ],
        [
          17,
          "For you know that afterward, when he desired to inherit the blessing, he was rejected, for he found no chance to repent, though he sought it with tears.",
        ],
      ],
      com: [
        ["h", "Stand up straight again"],
        [
          "p",
          "The author first tells each person to stand up strong again: to put energy back into their spiritually exhausted state by removing obstacles and distractions, so that they keep walking straight and stay committed to Jesus. Otherwise they will also cause the weak and lame around them to stumble along with them. It can lead to a wavering relationship with God, and it can make the spiritually weak stumble.",
        ],
        [
          "q",
          "Mark out a straight path for your feet so that those who are weak and lame will not fall but become strong. (NLT)",
        ],
        ["h", "Peace and holiness"],
        [
          "p",
          "Amid the persecution and difficulties the readers were facing, the author tells them to be at peace with everyone. It meant living quietly and cooperatively where possible, so that if they were punished, it was strictly for their faith in Christ, and not as civil rebels or disruptors of society.",
        ],
        [
          "p",
          "Remaining holy would have been difficult for the readers at this time. But the author instructs them, and has been proving, that if they revert to the old ways for the sake of comfort and to escape persecution, they will displease God.",
        ],
        [
          "q",
          "Work at living in peace with everyone, and work at living a holy life, for those who are not holy will not see the Lord. (NLT)",
        ],
        ["h", "A root of bitterness"],
        [
          "p",
          "After the command to stay at peace with everyone and keep holiness, the author tells believers to look after each other so that no one fails to obtain the grace God gives. Failing to rely on God’s grace lets a root of bitterness grow and spring up.",
        ],
        [
          "p",
          "The idea comes from Deuteronomy 29:18, where Moses warns the community to make sure no heart turns away from the Lord to worship other gods, producing “bitter poison”. In the life of a community this means looking out for everyone around you so that they do not turn their hearts away from God; otherwise that single poisonous root will grow and infect the whole community.",
        ],
        ["h", "Esau"],
        [
          "p",
          "Esau is the ultimate example of this root of bitterness and the risk it poses to a holy community. He lived entirely for his physical senses, trading his sacred birthright, the Abrahamic covenant passed down to Isaac, for a single bowl of stew. He treated something deeply sacred as profane or common.",
        ],
        [
          "p",
          "This mirrored the temptation facing the Jewish Christians, who were considering trading their eternal inheritance in Christ for immediate, temporary relief from Roman persecution. If one prominent believer deserted the Christian community to escape danger, others would watch, follow the example and eventually desert Jesus too.",
        ],
        ["h", "No revolving door"],
        [
          "p",
          "Verse 17 looks back to Genesis 27:30–40, where Esau burst out with a loud and bitter cry, begging Isaac to bless him as well after Jacob had already taken the blessing. Isaac made it clear that the covenant decree was final and could not be reversed. Esau foolishly thought selling his birthright was just a quick, temporary fix for an immediate crisis.",
        ],
        [
          "p",
          "This was a stark warning to the Jewish Christians who wanted to revert to the Old Testament system. Temporary apostasy is not a revolving door where you can step out of the faith and simply walk back in when the political climate settles down. You cannot throw away the grace of God for short-term physical relief and expect to reclaim it easily when you feel safe. By then the cries will not be true godly sorrow, but tears of panic over impending divine judgment.",
        ],
      ],
    },
    ko: {
      title: "아무도 떨어져 나가지 않도록",
      quote:
        "“모든 사람과 더불어 화평하게 지내고, 거룩하게 살기를 힘쓰십시오. 거룩해지지 않고서는, 아무도 주님을 뵙지 못할 것입니다.”",
      sref: "히브리서 12:14",
      cap: "다시 일어나 화평과 거룩함을 좇고, 서로 돌보아 아무도 에서처럼 장자권을 팔아넘기지 않게 하십시오.",
      snips: [
        "나른한 손과 힘 빠진 무릎을 일으켜 세우십시오",
        "똑바로 걸어서 절름거리는 다리가 낫게 하십시오",
        "화평과 거룩함을 힘쓰십시오",
        "쓴 뿌리가 돋아나지 않게 하십시오",
        "장자권을 팔아넘긴 에서 같은 속된 사람이 없게 하십시오",
        "에서는 눈물로 구했지만 거절당했습니다",
      ],
      verses: [
        [
          12,
          "그러므로 여러분은 [drooping|나른한 손]과 힘 빠진 무릎을 [strengthen|일으켜 세우고],",
        ],
        [
          13,
          "똑바로 걸으십시오. 그래서 절름거리는 다리로 하여금 삐지 않게 하고, 오히려 낫게 하십시오.",
        ],
        [
          14,
          "모든 사람과 더불어 [peace|화평하게] 지내고, [holiness|거룩하게] 살기를 [strive|힘쓰십시오]. 거룩해지지 않고서는, 아무도 주님을 뵙지 못할 것입니다.",
        ],
        [
          15,
          "하나님의 [grace|은혜]에서 떨어져 나가는 사람이 아무도 없도록 주의하십시오. 또 [root|쓴 뿌리]가 돋아나서 괴롭게 하고, 그것으로 많은 사람이 더러워지는 일이 없도록 주의하십시오.",
        ],
        [
          16,
          "또 [immoral|음행하는 자]나, 음식 한 그릇에 장자권을 팔아넘긴 에서와 같은 [unholy|속된 사람]이 생기지 않도록 주의하십시오.",
        ],
        [
          17,
          "여러분이 알다시피, 에서는 그 뒤에 축복을 상속받기를 원하였으나, 거절당하였습니다. 그는 눈물을 흘리면서 구하였건만, 회개할 기회를 얻지 못하였습니다.",
        ],
      ],
      com: [
        ["h", "다시 바로 서기"],
        [
          "p",
          "저자는 먼저 각 사람에게 다시 굳게 일어서라고 말합니다. 방해물과 흐트러지게 하는 것들을 치워서 영적으로 지친 상태에 다시 힘을 불어넣고, 계속 똑바로 걸으며 예수님께 헌신하라는 것입니다. 그렇지 않으면 주변의 약하고 절름거리는 사람들까지 함께 넘어지게 합니다. 하나님과의 관계가 흔들리게 되고, 영적으로 약한 사람들을 넘어지게 할 수 있습니다.",
        ],
        ["h", "화평과 거룩함"],
        [
          "p",
          "독자들이 박해와 어려움을 겪는 가운데, 저자는 모든 사람과 화평하게 지내라고 말합니다. 될 수 있는 대로 조용하고 협조하며 사는 것입니다. 그래서 벌을 받더라도 사회를 어지럽히는 반역자로서가 아니라 오직 그리스도를 믿는 믿음 때문에 받게 하라는 것입니다.",
        ],
        [
          "p",
          "이때 독자들에게 거룩함을 지키기는 어려웠을 것입니다. 그러나 저자는 편안함을 위해, 박해를 피하려고 옛 방식으로 돌아가면 하나님을 기쁘시게 하지 못한다고 가르치며, 그것을 계속 증명해 왔습니다.",
        ],
        ["h", "쓴 뿌리"],
        [
          "p",
          "모든 사람과 화평하고 거룩함을 지키라는 명령에 이어, 저자는 아무도 하나님께서 주시는 은혜를 놓치지 않도록 서로 돌보라고 말합니다. 하나님의 은혜를 의지하지 않으면 쓴 뿌리가 자라 돋아납니다.",
        ],
        [
          "p",
          "이 말은 신명기 29장 18절에서 왔습니다. 모세는 공동체 안에 주님에게서 마음을 돌려 다른 신들을 섬기는 사람이 없도록 하라고, 그래서 “쓴 독”을 맺지 않게 하라고 경고합니다. 공동체의 삶에서 이것은 주변 사람들이 하나님에게서 마음을 돌리지 않도록 서로 살피는 것을 뜻합니다. 그렇지 않으면 그 하나의 독한 뿌리가 자라 공동체 전체를 병들게 합니다.",
        ],
        ["h", "에서"],
        [
          "p",
          "에서는 이 쓴 뿌리와 그것이 거룩한 공동체에 끼치는 큰 위험을 보여 주는 대표적인 예입니다. 그는 오로지 육신의 감각을 위해 살았고, 이삭에게 이어져 내려온 아브라함 언약인 거룩한 장자권을 팥죽 한 그릇과 바꾸었습니다. 깊이 거룩한 것을 속되고 흔한 것처럼 여긴 것입니다.",
        ],
        [
          "p",
          "이는 유대 그리스도인들이 마주한 유혹을 그대로 비춥니다. 그들은 로마의 박해에서 당장 잠시 벗어나려고 그리스도 안에서 받은 영원한 유업을 바꾸려 하고 있었습니다. 앞장서던 믿는 사람 하나가 위험을 피하려고 그리스도인 공동체를 떠나면, 다른 사람들도 그것을 보고 따라가 결국 예수님을 떠나게 될 것입니다.",
        ],
        ["h", "회전문이 아닙니다"],
        [
          "p",
          "17절은 창세기 27장 30–40절을 가리킵니다. 야곱이 이미 축복을 받은 뒤에, 에서는 크고 서럽게 울부짖으며 자기에게도 복을 빌어 달라고 이삭에게 애원했습니다. 이삭은 언약의 선언이 최종적이어서 되돌릴 수 없다고 분명히 말했습니다. 에서는 장자권을 파는 일을 눈앞의 위기를 넘기는 잠깐의 해결책으로 어리석게 생각했습니다.",
        ],
        [
          "p",
          "이는 구약의 제도로 돌아가려는 유대 그리스도인들에게 주는 엄중한 경고였습니다. 잠깐의 배교는 정치적 상황이 가라앉으면 다시 걸어 들어올 수 있는 회전문이 아닙니다. 당장의 육신적인 안도를 위해 하나님의 은혜를 내던지고, 안전해졌을 때 쉽게 되찾기를 기대할 수는 없습니다. 그때의 울음은 하나님의 뜻에 맞는 참된 슬픔이 아니라 다가오는 심판 앞에서 당황하여 흘리는 눈물일 것입니다.",
        ],
      ],
    },
    words: {
      en: {
        drooping: {
          t: "Drooping hands and weak knees",
          g: "pareimenas cheiras · παρειμένας χεῖρας",
          v: "12:12",
          s: "An athlete near collapse",
          d: "The imagery of athletes whose arms are dropping and knees shaking, on the verge of collapsing from fatigue.",
        },
        strengthen: {
          t: "Strengthen",
          g: "anorthōsate · ἀνορθώσατε",
          v: "12:12",
          s: "Upright again",
          d: "To make straight or upright again.",
        },
        strive: {
          t: "Strive",
          g: "diōkete · διώκετε",
          v: "12:14",
          s: "Run after",
          d: "To pursue, hunt down, run after.",
        },
        peace: {
          t: "Peace",
          g: "eirēnēn · εἰρήνην",
          v: "12:14",
          s: "Joined together again",
          d: "The binding or joining together again of what had been separated or divided.",
        },
        holiness: {
          t: "Holiness",
          g: "hagiasmon · ἁγιασμόν",
          v: "12:14",
          s: "Set apart",
          d: "Sanctification: to be set apart from the secular and sinful for a sacred purpose.",
        },
        grace: {
          t: "Grace of God",
          g: "charitos · χάριτος",
          v: "12:15",
          s: "Favour that enables",
          d: "God’s unmerited favour, power and continuous spiritual help to believers, enabling them to live holy lives, endure trials and remain faithful.",
        },
        root: {
          t: "Root of bitterness",
          g: "rhiza pikrias · ῥίζα πικρίας",
          v: "12:15",
          s: "A hidden poison",
          d: "A hidden, toxic attitude (deep-seated resentment, unyielding anger or spiritual rebellion) that grows quietly before bursting into the open to corrupt an entire community.",
        },
        immoral: {
          t: "Sexually immoral",
          g: "pornos · πόρνος",
          v: "12:16",
          s: "Selling oneself",
          d: "One who “sells himself” to sexual sin or to passion. Fundamentally self-selling: exchanging purity for sensual gratification, which connects with Esau selling his birthright for physical gain.",
        },
        unholy: {
          t: "Unholy",
          g: "bebēlos · βέβηλος",
          v: "12:16",
          s: "Treating the sacred as common",
          d: "A godless, profane, worldly person who treats sacred things as common.",
        },
      },
      ko: {
        drooping: {
          t: "나른한 손과 힘 빠진 무릎",
          g: "pareimenas cheiras · παρειμένας χεῖρας",
          v: "12:12",
          s: "쓰러지기 직전의 선수",
          d: "팔이 축 처지고 무릎이 떨려 지쳐서 쓰러지기 직전인 운동선수의 모습입니다.",
        },
        strengthen: {
          t: "일으켜 세우다",
          g: "anorthōsate · ἀνορθώσατε",
          v: "12:12",
          s: "다시 곧게",
          d: "다시 곧게, 똑바로 세우는 것입니다.",
        },
        strive: {
          t: "힘쓰다",
          g: "diōkete · διώκετε",
          v: "12:14",
          s: "뒤쫓아 달려감",
          d: "추구함, 끝까지 쫓아감, 뒤따라 달려감을 뜻합니다.",
        },
        peace: {
          t: "화평",
          g: "eirēnēn · εἰρήνην",
          v: "12:14",
          s: "다시 이어 붙임",
          d: "갈라지고 나뉘었던 것을 다시 묶고 이어 붙이는 것입니다.",
        },
        holiness: {
          t: "거룩함",
          g: "hagiasmon · ἁγιασμόν",
          v: "12:14",
          s: "구별됨",
          d: "성화. 세속적이고 죄된 것에서 떠나 거룩한 목적을 위해 구별되는 것입니다.",
        },
        grace: {
          t: "하나님의 은혜",
          g: "charitos · χάριτος",
          v: "12:15",
          s: "힘을 주는 호의",
          d: "믿는 사람들이 거룩하게 살고 시련을 견디며 신실하게 남도록 하시는 하나님의 값없는 호의와 능력과 끊임없는 영적 도우심입니다.",
        },
        root: {
          t: "쓴 뿌리",
          g: "rhiza pikrias · ῥίζα πικρίας",
          v: "12:15",
          s: "숨은 독",
          d: "깊이 박힌 원한, 풀리지 않는 분노, 영적인 반역 같은 숨은 독한 태도입니다. 조용히 자라다가 드러나 공동체 전체를 더럽힙니다.",
        },
        immoral: {
          t: "음행하는 자",
          g: "pornos · πόρνος",
          v: "12:16",
          s: "자기를 팔아넘김",
          d: "성적인 죄나 정욕에 “자기를 파는” 사람입니다. 근본적으로 자기를 팔아 순결을 육체의 만족과 바꾸는 것이며, 육신의 이익을 위해 장자권을 판 에서와 이어집니다.",
        },
        unholy: {
          t: "속된 사람",
          g: "bebēlos · βέβηλος",
          v: "12:16",
          s: "거룩한 것을 흔하게 여김",
          d: "거룩한 것을 흔한 것처럼 여기는, 경건하지 않고 세속적인 사람입니다.",
        },
      },
    },
    chips: [
      {
        id: "deu29-18",
        tag: "OT",
        en: "Deut 29:18",
        ko: "신 29:18",
        ten: "Beware lest there be among you a man or woman or clan or tribe whose heart is turning away today from the Lord our God to go and serve the gods of those nations. Beware lest there be among you a root bearing poisonous and bitter fruit,",
        tko: "당신들 가운데 남자나 여자나 가족이나 지파가, 주 우리 하나님으로부터 마음을 멀리하여, 다른 민족의 신들을 섬기려고 해서는 안 됩니다. 당신들 가운데 독초나 쓴 열매를 맺는 뿌리가 있어서는 안 됩니다.",
        wen: "Where the root of bitterness comes from.",
        wko: "쓴 뿌리라는 말이 나온 곳.",
      },
      {
        id: "gen25-34",
        tag: "OT",
        en: "Gen 25:34",
        ko: "창 25:34",
        ten: "Then Jacob gave Esau bread and lentil stew, and he ate and drank and rose and went his way. Thus Esau despised his birthright.",
        tko: "야곱이 빵과 팥죽 얼마를 에서에게 주니, 에서가 먹고 마시고, 일어나서 나갔다. 에서는 이와 같이 맏아들의 권리를 가볍게 여겼다.",
        wen: "The birthright sold for a meal.",
        wko: "음식 한 그릇에 판 장자권.",
      },
      {
        id: "gen27-34",
        tag: "OT",
        en: "Gen 27:34",
        ko: "창 27:34",
        ten: "As soon as Esau heard the words of his father, he cried out with an exceedingly great and bitter cry and said to his father, “Bless me, even me also, O my father!”",
        tko: "아버지의 말을 들은 에서는 소리치며 울면서, 아버지에게 애원하였다. “저에게 축복하여 주십시오. 아버지, 저에게도 똑같이 복을 빌어 주십시오.”",
        wen: "He sought the blessing with tears.",
        wko: "눈물로 축복을 구했습니다.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "18–24",
    en: {
      title: "You have come to Mount Zion",
      quote:
        "“But you have come to Mount Zion and to the city of the living God, the heavenly Jerusalem…”",
      sref: "Hebrews 12:22",
      cap: "Not Sinai’s fire, darkness and dread, but Zion: the city of the living God, the firstborn, and Jesus’ blood that speaks a better word.",
      snips: [
        "Not a mountain that may be touched, with fire and darkness",
        "The trumpet and the voice they begged to stop",
        "Even a beast that touched the mountain was stoned",
        "Moses said, “I tremble with fear”",
        "But you have come to Mount Zion, the heavenly Jerusalem",
        "The assembly of the firstborn enrolled in heaven",
        "Jesus’ blood speaks a better word than Abel’s",
      ],
      verses: [
        [
          18,
          "For you have not come to what may be touched, a blazing fire and darkness and gloom and a tempest",
        ],
        [
          19,
          "and the sound of a trumpet and a voice whose words made the hearers beg that no further messages be spoken to them.",
        ],
        [
          20,
          "For they could not endure the order that was given, “If even a beast touches the mountain, it shall be stoned.”",
        ],
        [
          21,
          "Indeed, so terrifying was the sight that Moses said, “I tremble with fear.”",
        ],
        [
          22,
          "But you have come to Mount Zion and to the city of the living God, the heavenly Jerusalem, and to innumerable angels in festal gathering,",
        ],
        [
          23,
          "and to the assembly of the [firstborn|firstborn] who are [enrolled|enrolled] in heaven, and to God, the judge of all, and to the spirits of the righteous made perfect,",
        ],
        [
          24,
          "and to Jesus, the mediator of a new covenant, and to the sprinkled blood that speaks a better word than the blood of Abel.",
        ],
      ],
      com: [
        ["h", "Why a mountain now?"],
        [
          "p",
          "It may seem odd that the author suddenly talks about a mountain described as fearful, fenced off and terrifying. But this ties in with Esau selling his birthright for temporary relief. The Jewish Christians were trying to trade their eternal inheritance for temporary relief from harsh persecution.",
        ],
        ["h", "Mount Sinai"],
        [
          "p",
          "The author uses Exodus 19 to describe the terrifying but holy Mount Sinai, where God dwelt in thick clouds and descended in fire, and only Moses was allowed to go up the mountain. God warned that anyone who approached the mountain or touched its foot would be put to death, stoned or shot with arrows. There was thunder and lightning, a thick cloud over the mountain, a loud trumpet blast, and the whole mountain trembled violently. Everyone in the camp trembled with fear.",
        ],
        [
          "p",
          "This was the nature of the Old Testament system the Jewish Christians were trying to go back to. Jesus Christ became the path of salvation by removing God’s wrath against us as sinners, so that we can draw near to God with confidence, not in fear of his throne of judgment. If they traded their eternal inheritance, they would be approaching God as if at Mount Sinai: with no confidence or freedom, only fear, condemnation and spiritual dread.",
        ],
        ["h", "Mount Zion"],
        [
          "p",
          "Mount Zion was a physical hill in Jerusalem where David built his palace. It later foreshadows the spiritual sanctuary of all nations, the Lord’s house. Isaiah 2:2–3 shows the mountain of the Lord’s temple, Zion, established, with all nations streaming to it to walk in God’s paths.",
        ],
        [
          "p",
          "In ancient Jewish times the firstborn received the entire inheritance from the father, but in Zion everyone has the standing of a firstborn and receives an eternal inheritance. “The spirits of the righteous made perfect” recalls the cloud of witnesses in chapter 11, who did not receive what was promised but through Mount Zion have been made perfect by the blood of Jesus Christ.",
        ],
        ["h", "A better word than Abel’s blood"],
        [
          "p",
          "The author compares the blood of Abel with Jesus’ blood. In Genesis 4, after Cain kills Abel, Abel’s blood cries out to God from the ground for vengeance, retribution and justice. As a result a curse came on Cain, and he was exiled from God’s presence.",
        ],
        [
          "p",
          "But the blood of Jesus cries out from the heavenly sanctuary for mercy, forgiveness and cleansing (Matt 26:28), bringing reconciliation between people and God and giving believers free and confident access to his presence. Abel’s blood represents the old covenant system, and Jesus’ blood the new covenant, where any believer can approach God through unconditional grace.",
        ],
      ],
    },
    ko: {
      title: "여러분은 시온 산에 이르렀습니다",
      quote:
        "“그러나 여러분이 나아가서 이른 곳은 시온 산, 곧 살아 계신 하나님의 도성인 하늘의 예루살렘입니다.”",
      sref: "히브리서 12:22",
      cap: "불과 흑암과 두려움의 시내 산이 아니라 시온입니다. 살아 계신 하나님의 도성, 장자들, 그리고 더 훌륭하게 말하는 예수님의 피.",
      snips: [
        "만져 볼 수 있고 불이 타오르는 곳이 아닙니다",
        "나팔과 말소리를 그만 듣기를 간청했습니다",
        "짐승이라도 산에 닿으면 돌로 쳐야 했습니다",
        "모세도 “나는 두려워서 떨린다” 하였습니다",
        "여러분은 시온 산, 하늘의 예루살렘에 이르렀습니다",
        "하늘에 등록된 장자들의 집회",
        "예수님의 피는 아벨의 피보다 더 훌륭하게 말합니다",
      ],
      verses: [
        [
          18,
          "여러분이 나아가서 이른 곳은 시내 산 같은 곳이 아닙니다. 곧 만져 볼 수 있고, 불이 타오르고, 흑암과 침침함이 뒤덮고, 폭풍이 일고,",
        ],
        [
          19,
          "나팔이 울리고, 무서운 말소리가 들리는 그러한 곳이 아닙니다. 그 말소리를 들은 사람들은 자기들에게 더 말씀하시지 않기를 간청하였습니다.",
        ],
        [
          20,
          "“비록 짐승이라도 그 산에 닿으면, 돌로 쳐죽여야 한다” 하신 명령을 그들이 견디어내지 못했기 때문입니다.",
        ],
        [
          21,
          "그 광경이 얼마나 무서웠던지, 모세도 말하기를 “나는 두려워서 떨린다” 하였습니다.",
        ],
        [
          22,
          "그러나 여러분이 나아가서 이른 곳은 시온 산, 곧 살아 계신 하나님의 도성인 하늘의 예루살렘입니다. 여러분은 축하 행사에 모인 수많은 천사들과",
        ],
        [
          23,
          "하늘에 [enrolled|등록된] [firstborn|장자들]의 집회와 만민의 심판자이신 하나님과 완전하게 된 의인의 영들과",
        ],
        [
          24,
          "새 언약의 중재자이신 예수와 그가 뿌리신 피 앞에 나아왔습니다. 그 피는 아벨의 피보다 더 훌륭하게 말해 줍니다.",
        ],
      ],
      com: [
        ["h", "왜 갑자기 산 이야기일까요"],
        [
          "p",
          "저자가 갑자기 두렵고 경계가 둘러쳐진 무시무시한 산을 이야기하는 것이 이상해 보일 수 있습니다. 그러나 이것은 잠깐의 안도를 위해 장자권을 판 에서의 예와 이어집니다. 유대 그리스도인들은 혹독한 박해에서 벗어나려고 영원한 유업을 잠깐의 안도와 바꾸려 하고 있었습니다.",
        ],
        ["h", "시내 산"],
        [
          "p",
          "저자는 출애굽기 19장을 들어 두렵지만 거룩한 시내 산을 묘사합니다. 하나님께서는 짙은 구름 속에 계시고 불 가운데 내려오셨으며, 모세만 산에 오를 수 있었습니다. 하나님께서는 누구든지 산에 다가가거나 산기슭에 닿으면 돌로 치거나 활로 쏘아 죽이라고 경고하셨습니다. 천둥과 번개가 치고, 짙은 구름이 산을 덮고, 큰 나팔 소리가 울리고, 산 전체가 크게 흔들렸습니다. 진에 있는 모든 사람이 두려워 떨었습니다.",
        ],
        [
          "p",
          "이것이 유대 그리스도인들이 돌아가려던 구약 제도의 모습이었습니다. 예수 그리스도께서는 죄인인 우리를 향한 하나님의 진노를 없애시고 구원의 길이 되셔서, 우리가 심판의 보좌 앞에서 두려워하지 않고 담대하게 하나님께 나아가게 하셨습니다. 그들이 영원한 유업을 바꾼다면, 시내 산을 지나가듯 하나님께 나아가게 될 것입니다. 담대함도 자유도 없이 두려움과 정죄와 영적인 공포만 있을 것입니다.",
        ],
        ["h", "시온 산"],
        [
          "p",
          "시온 산은 다윗이 왕궁을 지은 예루살렘의 실제 언덕이었습니다. 이것은 나중에 모든 민족의 영적인 성소, 곧 주님의 집을 미리 보여 줍니다. 이사야 2장 2–3절은 주님의 성전이 있는 산, 시온이 굳게 서고 모든 민족이 그리로 몰려와 하나님의 길을 걷는 모습을 보여 줍니다.",
        ],
        [
          "p",
          "고대 유대 시대에는 장자가 아버지의 유산을 모두 물려받았지만, 시온에서는 모든 사람이 장자의 자리에 있고 영원한 유업을 받습니다. “완전하게 된 의인의 영들”은 11장의 구름 떼 같은 증인들을 가리킵니다. 그들은 약속된 것을 받지 못했지만 시온 산을 통해 예수 그리스도의 피로 완전하게 되었습니다.",
        ],
        ["h", "아벨의 피보다 더 훌륭한 말"],
        [
          "p",
          "저자는 아벨의 피와 예수님의 피를 견줍니다. 창세기 4장에서 가인이 아벨을 죽인 뒤, 아벨의 피는 땅에서 하나님께 복수와 보응과 정의를 부르짖습니다. 그 결과 가인에게 저주가 내렸고 그는 하나님 앞에서 쫓겨났습니다.",
        ],
        [
          "p",
          "그러나 예수님의 피는 하늘 성소에서 자비와 용서와 깨끗하게 하심을 부르짖으며(마 26:28), 사람과 하나님을 화해시키고 믿는 사람들이 거리낌 없이 담대하게 하나님 앞에 나아가게 합니다. 아벨의 피는 옛 언약의 제도를, 예수님의 피는 누구든지 조건 없는 은혜로 하나님께 나아가는 새 언약을 나타냅니다.",
        ],
      ],
    },
    words: {
      en: {
        firstborn: {
          t: "Firstborn",
          g: "prōtotokōn · πρωτοτόκων",
          v: "12:23",
          s: "First in rank",
          d: "Refers primarily to position, rank and priority of position; it emphasises quality or kind.",
        },
        enrolled: {
          t: "Enrolled",
          g: "apogegrammenōn · ἀπογεγραμμένων",
          v: "12:23",
          s: "Registered in heaven",
          d: "Literally enrolled or registered to enter heaven.",
        },
      },
      ko: {
        firstborn: {
          t: "장자",
          g: "prōtotokōn · πρωτοτόκων",
          v: "12:23",
          s: "첫째가는 자리",
          d: "주로 지위와 서열, 우선하는 자리를 가리키며, 품질이나 종류를 강조합니다.",
        },
        enrolled: {
          t: "등록된",
          g: "apogegrammenōn · ἀπογεγραμμένων",
          v: "12:23",
          s: "하늘에 이름이 올라감",
          d: "문자 그대로 하늘에 들어가도록 이름이 올라 등록되었다는 뜻입니다.",
        },
      },
    },
    chips: [
      {
        id: "exo19-16",
        tag: "OT",
        en: "Exod 19:16",
        ko: "출 19:16",
        ten: "On the morning of the third day there were thunders and lightnings and a thick cloud on the mountain and a very loud trumpet blast, so that all the people in the camp trembled.",
        tko: "마침내 셋째 날 아침이 되었다. 번개가 치고, 천둥소리가 나며, 짙은 구름이 산을 덮은 가운데, 산양 뿔나팔 소리가 우렁차게 울려퍼지자, 진에 있는 모든 백성이 두려워서 떨었다.",
        wen: "The terror at Sinai.",
        wko: "시내 산의 두려움.",
      },
      {
        id: "exo19-12",
        tag: "OT",
        en: "Exod 19:12–13",
        ko: "출 19:12–13",
        ten: "…Whoever touches the mountain shall be put to death. No hand shall touch him, but he shall be stoned or shot; whether beast or man, he shall not live.",
        tko: "…산에 들어서면, 누구든지 죽음을 면하지 못할 것이다. 그러한 사람은 아무도 손을 대지 말고, 반드시 돌로 치거나 활을 쏘아서 죽여야 한다. 짐승이든지 사람이든지, 아무도 살아 남지 못할 것이라고 일러라.",
        wen: "The order they could not endure.",
        wko: "그들이 견디지 못한 명령.",
      },
      {
        id: "deu9-19",
        tag: "OT",
        en: "Deut 9:19",
        ko: "신 9:19",
        ten: "For I was afraid of the anger and hot displeasure that the Lord bore against you, so that he was ready to destroy you. But the Lord listened to me that time also.",
        tko: "주님께서 당신들을 두고 크게 분노하셔서 당신들을 죽이려고 하셨으므로, 나는 두려웠습니다. 그러나 주님께서는 다시 한 번 나의 애원을 들어주셨습니다.",
        wen: "Moses trembled with fear.",
        wko: "모세도 두려워 떨었습니다.",
      },
      {
        id: "isa2-3",
        tag: "OT",
        en: "Isa 2:3",
        ko: "사 2:3",
        ten: "and many peoples shall come, and say: “Come, let us go up to the mountain of the Lord, to the house of the God of Jacob, that he may teach us his ways and that we may walk in his paths.” For out of Zion shall go forth the law, and the word of the Lord from Jerusalem.",
        tko: "백성들이 오면서 이르기를 “자, 가자. 우리 모두 주님의 산으로 올라가자. 야곱의 하나님이 계신 성전으로 어서 올라가자. 주님께서 우리에게 주님의 길을 가르치실 것이니, 주님께서 가르치시는 길을 따르자” 할 것이다. 율법이 시온에서 나오며, 주님의 말씀이 예루살렘에서 나온다.",
        wen: "All nations streaming to Zion.",
        wko: "시온으로 몰려오는 모든 민족.",
      },
      {
        id: "gen4-10",
        tag: "OT",
        en: "Gen 4:10",
        ko: "창 4:10",
        ten: "…The voice of your brother’s blood is crying to me from the ground.",
        tko: "…너의 아우의 피가 땅에서 나에게 울부짖는다.",
        wen: "Abel’s blood cried out for justice.",
        wko: "아벨의 피는 정의를 부르짖었습니다.",
      },
      {
        id: "mat26-28",
        tag: "NT",
        en: "Matt 26:28",
        ko: "마 26:28",
        ten: "for this is my blood of the covenant, which is poured out for many for the forgiveness of sins.",
        tko: "이것은 죄를 사하여 주려고 많은 사람을 위하여 흘리는 나의 피, 곧 언약의 피다.",
        wen: "Jesus’ blood speaks forgiveness.",
        wko: "예수님의 피는 용서를 말합니다.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "25–29",
    en: {
      title: "A kingdom that cannot be shaken",
      quote:
        "“…let us be grateful for receiving a kingdom that cannot be shaken…”",
      sref: "Hebrews 12:28",
      cap: "Everything made will be shaken and removed. What remains is the kingdom we are receiving, so worship God with reverence and awe.",
      snips: [
        "Do not refuse him who warns from heaven",
        "Yet once more I will shake the earth and the heavens",
        "Shaken things are removed; unshakable things remain",
        "Receive the kingdom with gratitude, reverence and awe",
        "Our God is a consuming fire",
      ],
      verses: [
        [
          25,
          "See that you do not refuse him who is speaking. For if they did not escape when they refused him who warned them on earth, much less will we escape if we reject him who warns from heaven.",
        ],
        [
          26,
          "At that time his voice shook the earth, but now he has promised, “Yet once more I will shake not only the earth but also the heavens.”",
        ],
        [
          27,
          "This phrase, “Yet once more,” indicates the removal of things that are shaken—that is, things that have been made—in order that the things that cannot be shaken may remain.",
        ],
        [
          28,
          "Therefore let us be grateful for receiving a kingdom that cannot be shaken, and thus let us offer to God acceptable worship, with [reverence|reverence] and [awe|awe],",
        ],
        [29, "for our God is a consuming fire."],
      ],
      com: [
        ["h", "Him who warns from heaven"],
        [
          "p",
          "The law served to show the consequences of not following it. By contrasting those consequences, the author shows that the consequence is far worse if anyone decides to reject Jesus Christ.",
        ],
        [
          "q",
          "Be careful that you do not refuse to listen to the One who is speaking. For if the people of Israel did not escape when they refused to listen to Moses, the earthly messenger, we will certainly not escape if we reject the One who speaks to us from heaven! (NLT)",
        ],
        ["h", "Yet once more: Haggai 2"],
        [
          "p",
          "The original temple in Jerusalem, built by Solomon, was destroyed by the Babylonians, so the Israelites were building a second temple. But the people were deeply discouraged, because the former temple had been far grander and its wealth great. The second temple went up slowly, with scarce resources, under Persian rule. Through Haggai, God promises a greater glory to come, and that he will surely bless the nation again.",
        ],
        [
          "p",
          "By referring to Haggai 2:6, the author contrasts the old covenant, which is to be done away with, against the unshakable, permanent new covenant.",
        ],
        [
          "q",
          "When God spoke from Mount Sinai his voice shook the earth, but now he makes another promise: “Once again I will shake not only the earth but the heavens also.” This means that all of creation will be shaken and removed, so that only unshakable things will remain. (NLT)",
        ],
        ["h", "What remains"],
        [
          "p",
          "The shaking of earthly things means that the old Levitical system, the physical temple, the physical world, everything vulnerable to decay or judgment, will be dismantled. Once these are sifted out, the unshakable things remain: the ultimate, unchanging realities of the new covenant established by Jesus. That is his finished work, the sacrifice once for all through a single offering; his eternal priesthood, for he lives forever by the power of an indestructible life; and his seat at the right hand of God. All this comes through God’s promise.",
        ],
        ["h", "A consuming fire"],
        [
          "p",
          "Because believers are receiving an unshakable kingdom, they must respond with gratitude and offer God acceptable worship marked by reverence and awe. To reinforce this, the author points back to Deuteronomy 4:24: God is a “consuming fire”, a phrase first used to warn Israel against idolatry.",
        ],
        [
          "p",
          "In this context, if the readers turn away from Christ to cling to the temporary, passing things of the earth, they will face God’s holy judgment. The author uses this warning to shake them out of complacency and drive their hope deeper into Jesus.",
        ],
      ],
    },
    ko: {
      title: "흔들리지 않는 나라",
      quote: "“그러므로 우리는 흔들리지 않는 나라를 받으니, 감사를 드립시다.”",
      sref: "히브리서 12:28",
      cap: "지어진 모든 것은 흔들려 없어집니다. 남는 것은 우리가 받는 나라이니, 경건함과 두려움으로 하나님을 섬기십시오.",
      snips: [
        "하늘로부터 경고하시는 분을 거역하지 마십시오",
        "한 번 더 땅뿐만 아니라 하늘까지도 흔들겠다",
        "흔들리는 것은 없어지고 흔들리지 않는 것이 남습니다",
        "감사와 경건함과 두려움으로 나라를 받읍시다",
        "우리 하나님은 태워 없애는 불이십니다",
      ],
      verses: [
        [
          25,
          "여러분은 말씀하시는 분을 거역하지 않도록 조심하십시오. 그 사람들이 땅에서 경고하는 사람을 거역하였을 때에, 그 벌을 피할 수 없었거든, 하물며 우리가 하늘로부터 경고하시는 분을 배척하면, 더욱더 피할 길이 없지 않겠습니까?",
        ],
        [
          26,
          "그 때에는 그의 음성이 땅을 뒤흔들었지만, 이번에는 그가 약속하시기를, “내가 한 번 더, 땅뿐만 아니라 하늘까지도 흔들겠다” 하셨습니다.",
        ],
        [
          27,
          "이 ‘한 번 더’라는 말은 흔들리는 것들 곧 피조물들을 없애버리는 것을 뜻합니다. 그렇게 하는 것은 흔들리지 않는 것들이 남아 있게 하시려는 것입니다.",
        ],
        [
          28,
          "그러므로 우리는 흔들리지 않는 나라를 받으니, 감사를 드립시다. 그리하여, [reverence|경건함]과 [awe|두려움]으로 하나님이 기뻐하시도록 그를 섬깁시다.",
        ],
        [29, "우리 하나님은 태워 없애는 불이십니다."],
      ],
      com: [
        ["h", "하늘로부터 경고하시는 분"],
        [
          "p",
          "율법은 지키지 않았을 때의 결과를 보여 주었습니다. 저자는 그 결과를 견주어, 누구든지 예수 그리스도를 거부하면 그 결과가 훨씬 더 무겁다는 것을 밝힙니다.",
        ],
        ["h", "한 번 더: 학개 2장"],
        [
          "p",
          "솔로몬이 지은 예루살렘의 첫 성전은 바빌로니아 사람들에게 무너졌고, 이스라엘 사람들은 두 번째 성전을 짓고 있었습니다. 그러나 이전 성전이 훨씬 웅장하고 부유했기 때문에 백성은 크게 낙심했습니다. 두 번째 성전은 부족한 자원으로 페르시아의 지배 아래 더디게 지어졌습니다. 하나님께서는 학개를 통해 나중에 더 큰 영광이 있을 것이며 이 민족에게 반드시 다시 복을 주시겠다고 약속하십니다.",
        ],
        [
          "p",
          "저자는 학개 2장 6절을 들어, 없어질 옛 언약과 흔들리지 않는 영원한 새 언약을 대조합니다.",
        ],
        ["h", "남는 것"],
        [
          "p",
          "땅의 것들이 흔들린다는 것은 옛 레위 제도와 눈에 보이는 성전과 물질 세계, 곧 썩거나 심판받을 수 있는 모든 것이 허물어진다는 뜻입니다. 이것들이 걸러지고 나면 흔들리지 않는 것들이 남습니다. 예수님께서 세우신 새 언약의 궁극적이고 변하지 않는 실재입니다. 곧 단 한 번의 제물로 단번에 이루신 그분의 완성된 일, 썩지 않는 생명의 능력으로 영원히 사시는 그분의 영원한 제사장직, 그리고 하나님 오른쪽에 앉으심입니다. 이 모든 것은 하나님의 약속으로 주어집니다.",
        ],
        ["h", "태워 없애는 불"],
        [
          "p",
          "믿는 사람들은 흔들리지 않는 나라를 받고 있으므로 감사로 응답하고, 경건함과 두려움으로 하나님께서 기뻐하시는 예배를 드려야 합니다. 이를 강조하려고 저자는 신명기 4장 24절을 가리킵니다. 하나님은 “삼키는 불”이시라는 말은 본래 이스라엘에게 우상 숭배를 경고하던 말이었습니다.",
        ],
        [
          "p",
          "이 문맥에서, 독자들이 그리스도를 떠나 땅의 잠깐 지나가는 것들을 붙든다면 하나님의 거룩한 심판을 마주하게 될 것입니다. 저자는 이 경고로 그들을 안일함에서 흔들어 깨우고, 그들의 소망을 예수님께 더 깊이 두게 합니다.",
        ],
      ],
    },
    words: {
      en: {
        reverence: {
          t: "Reverence",
          g: "eulabeias · εὐλαβείας",
          v: "12:28",
          s: "Holy caution",
          d: "Profound respect; holy caution towards God, in recognition of his holiness.",
        },
        awe: {
          t: "Awe",
          g: "deous · δέους",
          v: "12:28",
          s: "Holy fear",
          d: "Holy fear.",
        },
      },
      ko: {
        reverence: {
          t: "경건함",
          g: "eulabeias · εὐλαβείας",
          v: "12:28",
          s: "거룩한 조심성",
          d: "깊은 존경. 하나님의 거룩하심을 알고 그분 앞에서 갖는 거룩한 조심성입니다.",
        },
        awe: {
          t: "두려움",
          g: "deous · δέους",
          v: "12:28",
          s: "거룩한 두려움",
          d: "거룩한 두려움입니다.",
        },
      },
    },
    chips: [
      {
        id: "hag2-6",
        tag: "OT",
        en: "Hag 2:6",
        ko: "학 2:6",
        ten: "For thus says the Lord of hosts: Yet once more, in a little while, I will shake the heavens and the earth and the sea and the dry land.",
        tko: "나 만군의 주가 말한다. 머지 않아서 내가 다시 하늘과 땅, 바다와 뭍을 뒤흔들어 놓겠다.",
        wen: "The promise to shake once more.",
        wko: "한 번 더 흔들겠다는 약속.",
      },
      {
        id: "deu4-24",
        tag: "OT",
        en: "Deut 4:24",
        ko: "신 4:24",
        ten: "For the Lord your God is a consuming fire, a jealous God.",
        tko: "주 당신들의 하나님은 삼키는 불이시며, 질투하는 하나님이십니다.",
        wen: "First said as a warning against idolatry.",
        wko: "본래 우상 숭배를 경고하던 말.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "Running the race",
        items: [
          [
            "1–4",
            "A cloud of witnesses proves a life of faith is possible. Lay aside every weight, look to Jesus who endured the cross, and remember you have not yet resisted to the point of blood.",
          ],
          [
            "5–11",
            "Hardship is not punishment or abandonment but the Father’s discipline, proof that you are true sons, shaping you to share his holiness.",
          ],
          [
            "12–17",
            "Stand up again, pursue peace and holiness, and watch over one another. Don’t trade the inheritance for temporary relief like Esau.",
          ],
        ],
      },
      {
        h: "Where we have come",
        items: [
          [
            "18–24",
            "Not to Sinai’s fire, darkness and dread, but to Mount Zion, the heavenly Jerusalem, and to Jesus, whose blood speaks a better word than Abel’s.",
          ],
          [
            "25–29",
            "Everything made will be shaken and removed. We receive a kingdom that cannot be shaken, so worship with reverence and awe: our God is a consuming fire.",
          ],
        ],
      },
    ],
    intentH: "Author’s intent",
    intentShort:
      "To show that the readers’ persecution is God’s loving discipline as his true children, and to warn them not to trade their eternal inheritance for temporary relief like Esau, but to hold fast to Jesus and the unshakable kingdom.",
    intent: [
      "The author encourages the readers by explaining that their current persecutions are not a sign of abandonment, but proof of God’s loving discipline as his true children. While running this spiritual race, they must remember that Old Testament saints faced similar hardships, and some even faced death, whereas the readers have not yet resisted to the point of shedding blood.",
      "Because of this pressure, the author warns them not to casually trade away their eternal inheritance for temporary relief like Esau did, assuming they can simply reclaim it later when things settle down.",
      "Instead, they must hold fast to Jesus, because the flawed, shakable old covenant system is being entirely dismantled and consumed by God’s holy fire. In its place believers are receiving an unshakable new kingdom, the heavenly Mount Zion and the new Jerusalem, where they can draw near with boldness, gratitude and reverent awe because of Jesus’ blood. To turn back now is to reject this enduring reality and run straight toward Mount Sinai, returning to a legal barrier of fear, condemnation and spiritual dread.",
    ],
  },
  ko: {
    groups: [
      {
        h: "달음질하기",
        items: [
          [
            "1–4절",
            "구름 떼 같은 증인들은 믿음의 삶이 가능하다는 것을 증명합니다. 모든 무거운 짐을 벗고, 십자가를 참으신 예수를 바라보십시오. 여러분은 아직 피를 흘리기까지 대항하지 않았습니다.",
          ],
          [
            "5–11절",
            "고난은 벌이나 버림받음이 아니라 아버지의 징계이며, 여러분이 참 자녀라는 증거이고, 그분의 거룩하심에 참여하도록 빚으시는 일입니다.",
          ],
          [
            "12–17절",
            "다시 일어나 화평과 거룩함을 좇고 서로 돌보십시오. 에서처럼 잠깐의 안도를 위해 유업을 바꾸지 마십시오.",
          ],
        ],
      },
      {
        h: "우리가 이른 곳",
        items: [
          [
            "18–24절",
            "불과 흑암과 두려움의 시내 산이 아니라 시온 산, 하늘의 예루살렘, 그리고 아벨의 피보다 더 훌륭하게 말하는 피를 뿌리신 예수께 이르렀습니다.",
          ],
          [
            "25–29절",
            "지어진 모든 것은 흔들려 없어집니다. 우리는 흔들리지 않는 나라를 받으니, 경건함과 두려움으로 섬깁시다. 우리 하나님은 태워 없애는 불이십니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "독자들이 겪는 박해가 참 자녀를 향한 하나님의 사랑의 징계임을 보여 주고, 에서처럼 잠깐의 안도를 위해 영원한 유업을 바꾸지 말고 예수님과 흔들리지 않는 나라를 굳게 붙들라고 경고하는 것.",
    intent: [
      "저자는 독자들이 지금 겪는 박해가 버림받았다는 표시가 아니라 참 자녀를 향한 하나님의 사랑의 징계라는 증거라고 설명하며 그들을 격려합니다. 이 영적인 달음질을 하는 동안, 구약의 성도들도 비슷한 고난을 겪었고 어떤 이들은 죽음까지 맞았지만, 독자들은 아직 피를 흘리기까지 대항하지 않았다는 것을 기억해야 합니다.",
      "이런 압박 때문에, 저자는 나중에 상황이 가라앉으면 쉽게 되찾을 수 있으리라 생각하고 에서처럼 잠깐의 안도를 위해 영원한 유업을 가볍게 팔아넘기지 말라고 경고합니다.",
      "오히려 그들은 예수님을 굳게 붙들어야 합니다. 결함 있고 흔들리는 옛 언약의 제도는 완전히 허물어지고 하나님의 거룩한 불에 타 없어지고 있기 때문입니다. 그 대신 믿는 사람들은 흔들리지 않는 새 나라, 곧 하늘의 시온 산과 새 예루살렘을 받고 있으며, 예수님의 피 덕분에 그곳에 담대함과 감사와 경건한 두려움으로 나아갈 수 있습니다. 지금 돌아서는 것은 이 영원한 실재를 거부하고 곧장 시내 산으로 달려가 두려움과 정죄와 영적 공포의 율법적 장벽으로 돌아가는 것입니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 12",
    tagline:
      "“…let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith…”",
    taglineRef: "Hebrews 12:1–2",
    mapTitle: "Twenty-nine verses, five movements",
    mapIntro:
      "The witnesses of chapter 11 now surround the readers as they run. Their suffering is the Father’s discipline, not his rejection, so they must not sell their birthright like Esau. They have not come to Sinai but to Zion, and they are receiving a kingdom that cannot be shaken.",
    summaryTitle: "What Hebrews 12 says",
    footQuote: "“…for our God is a consuming fire.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 12장",
    tagline:
      "“…우리 앞에 놓인 달음질을 참으면서 달려갑시다. 믿음의 창시자요 완성자이신 예수를 바라봅시다.”",
    taglineRef: "히브리서 12:1–2",
    mapTitle: "스물아홉 절, 다섯 흐름",
    mapIntro:
      "11장의 증인들이 이제 달리는 독자들을 둘러싸고 있습니다. 그들의 고난은 하나님께서 버리신 것이 아니라 아버지의 징계이니, 에서처럼 장자권을 팔아서는 안 됩니다. 그들이 이른 곳은 시내 산이 아니라 시온이며, 그들은 흔들리지 않는 나라를 받고 있습니다.",
    summaryTitle: "히브리서 12장이 말하는 것",
    footQuote: "“우리 하나님은 태워 없애는 불이십니다.”",
    version: "새번역",
  },
};

export const chapter12: ChapterContent = {
  number: 12,
  copy: COPY,
  movements: MV,
  summary: SUM,
};
