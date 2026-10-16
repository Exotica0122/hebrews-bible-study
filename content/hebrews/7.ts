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
    scene: "meeting",
    art: "3D · R3F — below the gate of Salem in the first light, the priest-king comes down with bread and a cup of wine. Abraham, back from the battle, climbs the road toward him and kneels to be blessed.",
    en: {
      title: "King of righteousness, king of peace",
      quote:
        "“For this Melchizedek, king of Salem, priest of the Most High God, met Abraham returning from the slaughter of the kings and blessed him.”",
      sref: "Hebrews 7:1",
      cap: "Scene: the priest-king of Salem comes out with bread and wine, and blesses Abraham.",
      snips: [
        "Melchizedek, king of Salem and priest of the Most High God, met Abraham and blessed him",
        "Abraham gave him a tenth; his name means king of righteousness, and king of peace",
        "Without genealogy, resembling the Son of God, he continues a priest forever",
      ],
      verses: [
        [
          1,
          "For this Melchizedek, [salem|king of Salem], [priest|priest of the Most High God], met Abraham returning from the slaughter of the kings and [blessed|blessed him],",
        ],
        [
          2,
          "and to him Abraham apportioned a [tenth|tenth part] of everything. He is first, by translation of his name, [righteousness|king of righteousness], and then he is also king of Salem, that is, [peace|king of peace].",
        ],
        [
          3,
          "He is [genealogy|without father or mother or genealogy], having neither beginning of days nor end of life, but [resembling|resembling the Son of God] he [forever|continues a priest forever].",
        ],
      ],
      com: [
        ["h", "Genesis 14"],
        [
          "p",
          "Melchizedek is mentioned in Genesis 14:18–20. Genesis 14 is about Abraham defeating Kedorlaomer after Lot, his nephew, was captured while living in Sodom. The kings of Sodom and Gomorrah, with three other kings, had been subject to Kedorlaomer and three other kings (five against four) for twelve years. In the thirteenth year they rebelled, and Kedorlaomer and his allies retaliated and seized all the goods of Sodom and Gomorrah, taking Lot as well. Abraham heard of it, took 318 trained men, rescued Lot and defeated Kedorlaomer and the three other kings.",
        ],
        [
          "p",
          "After Abraham won the campaign, on his way home, Melchizedek came out to him with bread and wine and blessed him, and Abraham gave Melchizedek a tithe.",
        ],
        ["h", "King of Salem"],
        [
          "p",
          "Salem is the ancient root of shalom, peace. Salem was also an ancient city that later became Jerusalem. So Melchizedek is king of righteousness by his name and king of peace by his city.",
        ],
        ["h", "King and priest"],
        [
          "p",
          "Melchizedek has no birth, death or genealogy in the Bible, yet he was the only figure to be both a king and a priest in service to God. No one else in the Bible, not even Abraham himself, received the priesthood in the order of Melchizedek. Because the Bible puts no end to his order, his order “lives on”. The only person ever to receive this order is Jesus Christ, so the figure of Melchizedek was an ultimate prophecy of Jesus.",
        ],
      ],
    },
    ko: {
      title: "정의의 왕, 평화의 왕",
      quote:
        "“이 멜기세덱은 살렘 왕이요, 지극히 높으신 하나님의 제사장이었습니다. 그는 아브라함이 여러 왕을 무찌르고 돌아올 때에, 그를 만나서 축복해 주었습니다.”",
      sref: "히브리서 7:1",
      cap: "장면: 살렘의 제사장이자 왕이 빵과 포도주를 가지고 나와 아브라함을 축복합니다.",
      snips: [
        "살렘 왕이요, 지극히 높으신 하나님의 제사장인 멜기세덱이 아브라함을 만나 축복했습니다",
        "아브라함은 십분의 일을 바쳤고, 그 이름은 정의의 왕, 평화의 왕이라는 뜻입니다",
        "족보도 없이, 하나님의 아들과 같아서, 언제까지나 제사장으로 계신 분",
      ],
      verses: [
        [
          1,
          "이 멜기세덱은 [salem|살렘 왕]이요, [priest|지극히 높으신 하나님의 제사장]이었습니다. 그는 아브라함이 여러 왕을 무찌르고 돌아올 때에, 그를 만나서 [blessed|축복해 주었습니다].",
        ],
        [
          2,
          "아브라함은 모든 것의 [tenth|십분의 일]을 그에게 나누어 주었습니다. 첫째로, 멜기세덱이란 이름은 [righteousness|정의의 왕]이라는 뜻이요, 다음으로, 그는 또한 살렘 왕인데, 그것은 [peace|평화의 왕]이라는 뜻입니다.",
        ],
        [
          3,
          "그에게는 [genealogy|아버지도 없고, 어머니도 없고, 족보도 없고], 생애의 시작도 없고, 생명의 끝도 없습니다. 그는 [resembling|하나님의 아들과 같아서], [forever|언제까지나 제사장으로 계신 분]입니다.",
        ],
      ],
      com: [
        ["h", "창세기 14장"],
        [
          "p",
          "멜기세덱은 창세기 14:18–20에 나옵니다. 창세기 14장은 아브라함의 조카 롯이 소돔에 살다가 사로잡히자 아브라함이 그돌라오멜을 무찌른 이야기입니다. 소돔 왕과 고모라 왕은 다른 세 왕과 함께 열두 해 동안 그돌라오멜과 다른 세 왕(다섯 대 넷)을 섬겼습니다. 열셋째 해에 그들이 반역하자, 그돌라오멜과 그 동맹들이 보복하여 소돔과 고모라의 재물을 모두 빼앗고 롯까지 사로잡아 갔습니다. 아브라함은 이 소식을 듣고 훈련된 사람 318명을 데리고 가서 롯을 구하고, 그돌라오멜과 다른 세 왕을 무찔렀습니다.",
        ],
        [
          "p",
          "아브라함이 싸움에 이기고 집으로 돌아오는 길에, 멜기세덱이 빵과 포도주를 가지고 나와 그를 축복했고, 아브라함은 멜기세덱에게 십분의 일을 바쳤습니다.",
        ],
        ["h", "살렘 왕"],
        [
          "p",
          "살렘은 평화를 뜻하는 샬롬의 옛 어근입니다. 살렘은 또한 나중에 예루살렘이 된 옛 성읍이기도 합니다. 그러므로 멜기세덱은 그 이름으로는 정의의 왕이요, 그 성읍으로는 평화의 왕입니다.",
        ],
        ["h", "왕이자 제사장"],
        [
          "p",
          "성경에는 멜기세덱의 출생도 죽음도 족보도 나오지 않지만, 그는 하나님을 섬기는 왕이자 제사장인 유일한 인물이었습니다. 성경에서 다른 누구도, 아브라함조차도 멜기세덱의 계통을 따른 제사장 직분을 받지 않았습니다. 성경이 그의 계통에 끝을 두지 않으므로, 그의 계통은 “살아 있습니다”. 이 계통을 받은 유일한 분은 예수 그리스도이십니다. 그러므로 멜기세덱이라는 인물은 예수님에 대한 궁극적인 예언이었습니다.",
        ],
      ],
    },
    words: {
      en: {
        salem: {
          t: "King of Salem",
          g: "basileus Salēm · βασιλεὺς Σαλήμ",
          v: "7:1",
          s: "Shalom; later Jerusalem",
          d: "Salem is the ancient root of shalom, peace. Salem was also an ancient city that later became Jerusalem.",
        },
        priest: {
          t: "Priest of the Most High God",
          g: "hiereus tou theou tou hypsistou · ἱερεὺς τοῦ θεοῦ τοῦ ὑψίστου",
          v: "7:1",
          s: "King and priest",
          d: "The only figure in the Bible to be both a king and a priest in service to God (Gen 14:18).",
        },
        blessed: {
          t: "Blessed him",
          g: "eulogēsas · εὐλογήσας",
          v: "7:1",
          s: "Spoke a blessing over",
          d: "Melchizedek came out with bread and wine and blessed Abraham on his way home from the battle (Gen 14:19–20).",
        },
        tenth: {
          t: "A tenth part",
          g: "dekatēn · δεκάτην",
          v: "7:2",
          s: "The tithe",
          d: "A tenth of everything: Abraham gave Melchizedek a tithe of the spoils (Gen 14:20).",
        },
        righteousness: {
          t: "King of righteousness",
          g: "basileus dikaiosynēs · βασιλεὺς δικαιοσύνης",
          v: "7:2",
          s: "His name",
          d: "The meaning of the name Melchizedek.",
        },
        peace: {
          t: "King of peace",
          g: "basileus eirēnēs · βασιλεὺς εἰρήνης",
          v: "7:2",
          s: "His city",
          d: "King of Salem, the root of shalom.",
        },
        genealogy: {
          t: "Without genealogy",
          g: "agenealogētos · ἀγενεαλόγητος",
          v: "7:3",
          s: "No recorded line",
          d: "The Bible gives Melchizedek no birth, death or genealogy, and puts no end to his order, so his order lives on.",
        },
        resembling: {
          t: "Resembling",
          g: "aphōmoiōmenos · ἀφωμοιωμένος",
          v: "7:3",
          s: "Made like",
          d: "To be made like, rendered similar to.",
        },
        forever: {
          t: "A priest forever",
          g: "menei hiereus eis to diēnekes · μένει ἱερεὺς εἰς τὸ διηνεκές",
          v: "7:3",
          s: "Continues without break",
          d: "His order has no end. The only person ever to receive it is Jesus Christ.",
        },
      },
      ko: {
        salem: {
          t: "살렘 왕",
          g: "basileus Salēm · βασιλεὺς Σαλήμ",
          v: "7:1",
          s: "샬롬, 훗날 예루살렘",
          d: "살렘은 평화를 뜻하는 샬롬의 옛 어근입니다. 살렘은 또한 나중에 예루살렘이 된 옛 성읍입니다.",
        },
        priest: {
          t: "지극히 높으신 하나님의 제사장",
          g: "hiereus tou theou tou hypsistou · ἱερεὺς τοῦ θεοῦ τοῦ ὑψίστου",
          v: "7:1",
          s: "왕이자 제사장",
          d: "성경에서 하나님을 섬기는 왕이자 제사장인 유일한 인물(창 14:18).",
        },
        blessed: {
          t: "축복하다",
          g: "eulogēsas · εὐλογήσας",
          v: "7:1",
          s: "복을 빌어 줌",
          d: "멜기세덱은 싸움에서 돌아오는 아브라함에게 빵과 포도주를 가지고 나와 그를 축복했습니다(창 14:19–20).",
        },
        tenth: {
          t: "십분의 일",
          g: "dekatēn · δεκάτην",
          v: "7:2",
          s: "십일조",
          d: "모든 것의 십분의 일. 아브라함은 전리품의 십분의 일을 멜기세덱에게 바쳤습니다(창 14:20).",
        },
        righteousness: {
          t: "정의의 왕",
          g: "basileus dikaiosynēs · βασιλεὺς δικαιοσύνης",
          v: "7:2",
          s: "그의 이름",
          d: "멜기세덱이라는 이름의 뜻.",
        },
        peace: {
          t: "평화의 왕",
          g: "basileus eirēnēs · βασιλεὺς εἰρήνης",
          v: "7:2",
          s: "그의 성읍",
          d: "샬롬의 어근인 살렘의 왕.",
        },
        genealogy: {
          t: "족보도 없고",
          g: "agenealogētos · ἀγενεαλόγητος",
          v: "7:3",
          s: "기록된 혈통이 없음",
          d: "성경은 멜기세덱의 출생도 죽음도 족보도 기록하지 않고, 그의 계통에 끝을 두지 않으므로 그의 계통은 살아 있습니다.",
        },
        resembling: {
          t: "같아서",
          g: "aphōmoiōmenos · ἀφωμοιωμένος",
          v: "7:3",
          s: "닮게 됨",
          d: "같게 되다, 비슷하게 되다.",
        },
        forever: {
          t: "언제까지나 제사장",
          g: "menei hiereus eis to diēnekes · μένει ἱερεὺς εἰς τὸ διηνεκές",
          v: "7:3",
          s: "끊이지 않고 이어짐",
          d: "그의 계통에는 끝이 없습니다. 그것을 받은 유일한 분은 예수 그리스도이십니다.",
        },
      },
    },
    chips: [
      {
        id: "gen14-18",
        tag: "OT",
        en: "Gen 14:18",
        ko: "창 14:18",
        ten: "And Melchizedek king of Salem brought out bread and wine. (He was priest of God Most High.)",
        tko: "그 때에 살렘 왕 멜기세덱은 빵과 포도주를 가지고 나왔다. 그는 가장 높으신 하나님의 제사장이다.",
        wen: "Bread and wine on the road home from the battle.",
        wko: "싸움에서 돌아오는 길의 빵과 포도주.",
      },
      {
        id: "gen14-20",
        tag: "OT",
        en: "Gen 14:20",
        ko: "창 14:20",
        ten: "and blessed be God Most High, who has delivered your enemies into your hand!” And Abram gave him a tenth of everything.",
        tko: "아브람은 들으시오. 그대는, 원수들을 그대의 손에 넘겨 주신 가장 높으신 하나님을 찬양하시오.” 아브람은 가지고 있는 모든 것에서 열의 하나를 멜기세덱에게 주었다.",
        wen: "The blessing, and the tenth of everything.",
        wko: "축복과 모든 것의 십분의 일.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "4–10",
    scene: "tithe",
    art: "3D · R3F — the spoils lie on the road in ten bundles; one is carried forward and laid at Melchizedek’s feet. Behind Abraham his line appears, pale as carved stone: Isaac, Jacob and Levi, not yet born.",
    en: {
      title: "See how great this man was",
      quote:
        "“See how great this man was to whom Abraham the patriarch gave a tenth of the spoils!”",
      sref: "Hebrews 7:4",
      cap: "Scene: one bundle in ten goes to the priest-king, and Levi, still in Abraham’s loins, pays it too.",
      snips: [
        "Abraham the patriarch gave him a tenth of the spoils",
        "The sons of Levi take tithes from their brothers by the law",
        "Melchizedek, not of their descent, blessed the one who had the promises",
        "The inferior is blessed by the superior",
        "Mortal men receive tithes; he is one of whom it is testified that he lives",
        "Levi himself paid tithes through Abraham",
        "He was still in the loins of his ancestor",
      ],
      verses: [
        [
          4,
          "See [great|how great this man was] to whom Abraham the patriarch gave a tenth of the spoils!",
        ],
        [
          5,
          "And those [levi|descendants of Levi who receive the priestly office] have a [commandment|commandment in the law to take tithes] from the people, that is, from their brothers, though these also are descended from Abraham.",
        ],
        [
          6,
          "But this man who [descent|does not have his descent from them] received tithes from Abraham and blessed [promises|him who had the promises].",
        ],
        [
          7,
          "It is beyond dispute that the [superior|inferior is blessed by the superior].",
        ],
        [
          8,
          "In the one case tithes are received by [mortal|mortal men], but in the other case, by one of whom it is testified that [lives|he lives].",
        ],
        [
          9,
          "One might even say that Levi himself, who receives tithes, paid tithes through Abraham,",
        ],
        [
          10,
          "for he was still in the [loins|loins of his ancestor] when Melchizedek met him.",
        ],
      ],
      com: [
        ["h", "The tithe of the Levites"],
        [
          "p",
          "In Leviticus 27:30–34 God commands a tithe of everything from the land: grain, fruit, livestock. In Numbers 18:21–24 God directs that tithe to the Levites as their inheritance, in return for their work at the tent of meeting. So the sons of Levi received tithes from their own brothers, who were also descendants of Abraham.",
        ],
        ["h", "The one who had the promises"],
        [
          "p",
          "Abraham had received great promises from God: that he would become a great nation, that God would bless him and make his name great, and bless those who bless him (Gen 12:2–3); that Canaan would be given to him and his descendants after him (Gen 17:8); and that his descendants would be delivered from their enemies (Gen 22:17). Yet Melchizedek, who was not of Levi’s line, blessed even this man, and the inferior is blessed by the superior.",
        ],
        ["h", "Mortal men, and one who lives"],
        [
          "p",
          "The NLT reads verse 8: “The priests who collect tithes are men who die, so Melchizedek is greater than they are, because we are told that he lives on.” The author compares Jesus with many human figures, and with angels too. The Levitical priesthood had received a divine responsibility from God, but it had its limits: the high priests were mortal men who did not live forever, and a replacement had to be found whenever one finished. Melchizedek may have been a mortal person who died physically, but his order remains open. Order means rank, sequence, line of succession, or a characteristic arrangement.",
        ],
        ["h", "In the loins of Abraham"],
        [
          "p",
          "The NLT reads verse 10: “For although Levi wasn’t born yet, the seed from which he came was in Abraham’s body when Melchizedek collected the tithe from him.” The line runs Abraham, Isaac, Jacob (Israel), Levi, Kohath, Amram (who married Jochebed), and then Aaron and Moses: roughly 460 to 520 years. Levi, who would receive tithes, paid them through Abraham centuries before he was born.",
        ],
      ],
    },
    ko: {
      title: "얼마나 위대한가를 생각해 보십시오",
      quote:
        "“멜기세덱이 얼마나 위대한가를 생각해 보십시오. 족장인 아브라함까지도 가장 좋은 전리품의 십분의 일을 그에게 바쳤습니다.”",
      sref: "히브리서 7:4",
      cap: "장면: 열 몫 가운데 한 몫이 제사장이자 왕에게 가고, 아직 아브라함의 허리 속에 있던 레위도 그것을 바칩니다.",
      snips: [
        "족장인 아브라함까지도 전리품의 십분의 일을 그에게 바쳤습니다",
        "레위 자손은 율법을 따라 동족에게서 십분의 일을 받습니다",
        "그들의 족보에 들지 않은 멜기세덱이 약속을 받은 사람을 축복했습니다",
        "축복은 아랫사람이 윗사람에게서 받는 법입니다",
        "죽을 사람들이 십분의 일을 받지만, 그는 살아 계시다고 입증되시는 분입니다",
        "레위까지도 아브라함을 통해서 십분의 일을 바쳤습니다",
        "레위는 아직 조상 아브라함의 허리 속에 있었습니다",
      ],
      verses: [
        [
          4,
          "멜기세덱이 [great|얼마나 위대한가]를 생각해 보십시오. 족장인 아브라함까지도 가장 좋은 전리품의 십분의 일을 그에게 바쳤습니다.",
        ],
        [
          5,
          "[levi|레위 자손 가운데서 제사장 직분을 맡는 사람들]은, 자기네 동족인 이스라엘 백성에게서, 비록 그 백성도 아브라함의 자손이지만, [commandment|율법을 따라 십분의 일을 받아들이라는 명령]을 받았습니다.",
        ],
        [
          6,
          "그러나 멜기세덱은 [descent|그들의 족보에 들지도 않았지만], 아브라함에게서 십분의 일을 받았고, [promises|하나님의 약속을 받은 그 사람]을 축복해 주었습니다.",
        ],
        [
          7,
          "두말할 것 없이, 축복은 [superior|아랫사람이 윗사람에게서 받는] 법입니다.",
        ],
        [
          8,
          "한 편에서는 [mortal|죽을 수밖에 없는 사람들]이 십분의 일을 받고, 다른 한 편에서는 [lives|살아 계시다고 입증되시는 분]이 그것을 받습니다.",
        ],
        [
          9,
          "말하자면, 십분의 일을 받는 레위까지도 아브라함을 통해서 십분의 일을 바친 셈이 됩니다.",
        ],
        [
          10,
          "멜기세덱이 아브라함을 만났을 때에는, 레위는 아직 자기 조상 아브라함의 [loins|허리 속]에 있었으니 말입니다.",
        ],
      ],
      com: [
        ["h", "레위 사람의 십일조"],
        [
          "p",
          "레위기 27:30–34에서 하나님은 땅에서 나는 모든 것, 곧 곡식과 열매와 가축의 십분의 일을 바치라고 명령하십니다. 민수기 18:21–24에서 하나님은 그 십분의 일을 레위 사람들이 회막에서 하는 일의 대가로 그들의 유산으로 주라고 하십니다. 그래서 레위 자손은 역시 아브라함의 자손인 자기 동족에게서 십분의 일을 받았습니다.",
        ],
        ["h", "약속을 받은 사람"],
        [
          "p",
          "아브라함은 하나님께 큰 약속들을 받았습니다. 그가 큰 민족이 되고, 하나님께서 그에게 복을 주어 그 이름을 떨치게 하시며, 그를 축복하는 사람에게 복을 베푸시리라는 약속(창 12:2–3), 가나안 땅을 그와 그 뒤의 자손에게 주시리라는 약속(창 17:8), 그리고 그 자손이 원수의 손에서 건져지리라는 약속(창 22:17)입니다. 그런데 레위 계통이 아닌 멜기세덱이 바로 이 사람을 축복했고, 축복은 아랫사람이 윗사람에게서 받는 법입니다.",
        ],
        ["h", "죽을 사람들과 살아 계신 분"],
        [
          "p",
          "NLT는 8절을 이렇게 옮깁니다. “십분의 일을 거두는 제사장들은 죽는 사람들이므로, 멜기세덱이 그들보다 위대합니다. 그가 살아 있다고 우리에게 전해지기 때문입니다.” 저자는 예수님을 여러 사람과, 또 천사들과도 견줍니다. 레위 계통의 제사장 직분은 하나님께 거룩한 책임을 받았지만 한계가 있었습니다. 대제사장들은 영원히 살지 못하는 죽을 사람들이었고, 한 사람이 직무를 마칠 때마다 뒤를 이을 사람을 찾아야 했습니다. 멜기세덱은 죽을 사람이어서 몸으로는 죽었을지 모르지만, 그의 계통은 열려 있습니다. 계통은 서열, 차례, 계승의 줄, 또는 고유한 배열을 뜻합니다.",
        ],
        ["h", "아브라함의 허리 속"],
        [
          "p",
          "NLT는 10절을 이렇게 옮깁니다. “레위는 아직 태어나지 않았지만, 멜기세덱이 아브라함에게서 십분의 일을 거둘 때 레위가 나올 씨가 아브라함의 몸 안에 있었습니다.” 그 줄은 아브라함, 이삭, 야곱(이스라엘), 레위, 고핫, 아므람(요게벳과 결혼), 그리고 아론과 모세로 이어지며, 대략 460년에서 520년의 세월입니다. 십분의 일을 받게 될 레위가, 태어나기 수백 년 전에 아브라함을 통해서 그것을 바친 것입니다.",
        ],
      ],
    },
    words: {
      en: {
        great: {
          t: "How great",
          g: "pēlikos · πηλίκος",
          v: "7:4",
          s: "Of what size",
          d: "Even Abraham the patriarch gave him a tenth of the spoils.",
        },
        levi: {
          t: "Descendants of Levi",
          g: "hoi ek tōn huiōn Leui · οἱ ἐκ τῶν υἱῶν Λευὶ",
          v: "7:5",
          s: "The priestly tribe",
          d: "God selected Levi’s tribe to serve as priests; Aaron was of that line.",
        },
        commandment: {
          t: "A commandment to take tithes",
          g: "entolēn apodekatoun · ἐντολὴν ἀποδεκατοῦν",
          v: "7:5",
          s: "The tithe law",
          d: "God commanded a tithe of everything from the land (Lev 27:30–34) and gave it to the Levites as their inheritance for their service at the tent of meeting (Num 18:21–24).",
        },
        descent: {
          t: "Not of their descent",
          g: "mē genealogoumenos ex autōn · μὴ γενεαλογούμενος ἐξ αὐτῶν",
          v: "7:6",
          s: "Outside Levi’s line",
          d: "Melchizedek was not of Levi’s genealogy, yet he received tithes from Abraham.",
        },
        promises: {
          t: "Him who had the promises",
          g: "ton echonta tas epangelias · τὸν ἔχοντα τὰς ἐπαγγελίας",
          v: "7:6",
          s: "Abraham",
          d: "A great nation and a great name (Gen 12:2–3), the land of Canaan (Gen 17:8), and deliverance from enemies (Gen 22:17).",
        },
        superior: {
          t: "Blessed by the superior",
          g: "to elatton hypo tou kreittonos eulogeitai · τὸ ἔλαττον ὑπὸ τοῦ κρείττονος εὐλογεῖται",
          v: "7:7",
          s: "The lesser by the greater",
          d: "By blessing Abraham, Melchizedek is shown to be greater than he.",
        },
        mortal: {
          t: "Mortal men",
          g: "apothnēskontes anthrōpoi · ἀποθνῄσκοντες ἄνθρωποι",
          v: "7:8",
          s: "Men who die",
          d: "NLT: “The priests who collect tithes are men who die.” A replacement had to be found whenever one finished.",
        },
        lives: {
          t: "He lives",
          g: "zē · ζῇ",
          v: "7:8",
          s: "His order lives on",
          d: "NLT: “Melchizedek is greater than they are, because we are told that he lives on.” The Bible puts no end to his order.",
        },
        loins: {
          t: "In the loins of his ancestor",
          g: "en tē osphyi tou patros · ἐν τῇ ὀσφύϊ τοῦ πατρὸς",
          v: "7:10",
          s: "Not yet born",
          d: "NLT: “the seed from which he came was in Abraham’s body.” Abraham to Aaron spans roughly 460 to 520 years.",
        },
      },
      ko: {
        great: {
          t: "얼마나 위대한가",
          g: "pēlikos · πηλίκος",
          v: "7:4",
          s: "얼마나 큰가",
          d: "족장 아브라함까지도 전리품의 십분의 일을 그에게 바쳤습니다.",
        },
        levi: {
          t: "레위 자손 가운데서 제사장 직분을 맡는 사람들",
          g: "hoi ek tōn huiōn Leui · οἱ ἐκ τῶν υἱῶν Λευὶ",
          v: "7:5",
          s: "제사장 지파",
          d: "하나님은 레위 지파를 택하여 제사장으로 섬기게 하셨고, 아론이 그 계통이었습니다.",
        },
        commandment: {
          t: "십분의 일을 받아들이라는 명령",
          g: "entolēn apodekatoun · ἐντολὴν ἀποδεκατοῦν",
          v: "7:5",
          s: "십일조 율법",
          d: "하나님은 땅에서 나는 모든 것의 십분의 일을 명령하시고(레 27:30–34), 그것을 회막 일의 대가로 레위 사람들에게 유산으로 주셨습니다(민 18:21–24).",
        },
        descent: {
          t: "그들의 족보에 들지도 않았지만",
          g: "mē genealogoumenos ex autōn · μὴ γενεαλογούμενος ἐξ αὐτῶν",
          v: "7:6",
          s: "레위 계통 밖",
          d: "멜기세덱은 레위의 족보에 들지 않았는데도 아브라함에게서 십분의 일을 받았습니다.",
        },
        promises: {
          t: "약속을 받은 그 사람",
          g: "ton echonta tas epangelias · τὸν ἔχοντα τὰς ἐπαγγελίας",
          v: "7:6",
          s: "아브라함",
          d: "큰 민족과 큰 이름(창 12:2–3), 가나안 땅(창 17:8), 원수에게서 건지심(창 22:17).",
        },
        superior: {
          t: "아랫사람이 윗사람에게서 받는",
          g: "to elatton hypo tou kreittonos eulogeitai · τὸ ἔλαττον ὑπὸ τοῦ κρείττονος εὐλογεῖται",
          v: "7:7",
          s: "작은 이가 큰 이에게",
          d: "아브라함을 축복함으로써 멜기세덱이 그보다 크다는 것이 드러납니다.",
        },
        mortal: {
          t: "죽을 수밖에 없는 사람들",
          g: "apothnēskontes anthrōpoi · ἀποθνῄσκοντες ἄνθρωποι",
          v: "7:8",
          s: "죽는 사람들",
          d: "NLT: “십분의 일을 거두는 제사장들은 죽는 사람들입니다.” 한 사람이 직무를 마칠 때마다 뒤를 이을 사람을 찾아야 했습니다.",
        },
        lives: {
          t: "살아 계시다고 입증되시는 분",
          g: "zē · ζῇ",
          v: "7:8",
          s: "그의 계통은 살아 있음",
          d: "NLT: “그가 살아 있다고 전해지므로 멜기세덱이 그들보다 위대합니다.” 성경은 그의 계통에 끝을 두지 않습니다.",
        },
        loins: {
          t: "허리 속",
          g: "en tē osphyi tou patros · ἐν τῇ ὀσφύϊ τοῦ πατρὸς",
          v: "7:10",
          s: "아직 태어나지 않음",
          d: "NLT: “레위가 나올 씨가 아브라함의 몸 안에 있었습니다.” 아브라함에서 아론까지는 대략 460년에서 520년입니다.",
        },
      },
    },
    chips: [
      {
        id: "num18-21",
        tag: "OT",
        en: "Num 18:21",
        ko: "민 18:21",
        ten: "To the Levites I have given every tithe in Israel for an inheritance, in return for their service that they do, their service in the tent of meeting,",
        tko: "“나는 레위 자손에게는 이스라엘 안에서 바치는 열의 하나를 모두 그들이 받을 유산으로 준다. 이것은 그들이 회막 일을 거드는 것에 대한 보수이다.",
        wen: "Why the sons of Levi take tithes.",
        wko: "레위 자손이 십분의 일을 받는 까닭.",
      },
      {
        id: "gen12-2",
        tag: "OT",
        en: "Gen 12:2–3",
        ko: "창 12:2–3",
        ten: "And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing. I will bless those who bless you, and him who dishonors you I will curse, and in you all the families of the earth shall be blessed.",
        tko: "내가 너로 큰 민족이 되게 하고, 너에게 복을 주어서, 네가 크게 이름을 떨치게 하겠다. 너는 복의 근원이 될 것이다. 너를 축복하는 사람에게는 내가 복을 베풀고, 너를 저주하는 사람에게는 내가 저주를 내릴 것이다. 땅에 사는 모든 민족이 너로 말미암아 복을 받을 것이다.",
        wen: "The promises Abraham had.",
        wko: "아브라함이 받은 약속.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "11–19",
    scene: "arise",
    art: "3D · R3F — Aaron’s priests stand by the altar of Levi. Across from them, Judah’s sceptre stands on its stone, and no one from that tribe has served at the altar. Out of Judah’s ground another priest rises, lit, and stands.",
    en: {
      title: "Another priest arises",
      quote:
        "“Who has become a priest, not on the basis of a legal requirement concerning bodily descent, but by the power of an indestructible life.”",
      sref: "Hebrews 7:16",
      cap: "Scene: from Judah, not Levi, another priest rises by the power of an indestructible life.",
      snips: [
        "If perfection had come through Levi, why another priest after the order of Melchizedek?",
        "A change in the priesthood is a change in the law",
        "He belonged to another tribe, from which no one has served at the altar",
        "Our Lord was descended from Judah",
        "Another priest arises in the likeness of Melchizedek",
        "Not by bodily descent, but by the power of an indestructible life",
        "“You are a priest forever, after the order of Melchizedek”",
        "The former commandment is set aside for its weakness",
        "The law made nothing perfect; a better hope, through which we draw near to God",
      ],
      verses: [
        [
          11,
          "Now if [perfection|perfection] had been attainable through the Levitical priesthood (for under it the people received the law), what further need would there have been for another priest to arise [order|after the order of Melchizedek], rather than one named after the order of Aaron?",
        ],
        [
          12,
          "For when there is a [change|change in the priesthood], there is necessarily a change in the law as well.",
        ],
        [
          13,
          "For the one of whom these things are spoken belonged to another tribe, from which no one has ever served at the altar.",
        ],
        [
          14,
          "For it is evident that our Lord [judah|was descended from Judah], and in connection with that tribe Moses said nothing about priests.",
        ],
        [
          15,
          "This becomes even more evident when another priest arises in the likeness of Melchizedek,",
        ],
        [
          16,
          "who has become a priest, not on the basis of [descent|a legal requirement concerning bodily descent], but by [indestructible|the power of an indestructible life].",
        ],
        [
          17,
          "For it is witnessed of him, “You are a priest forever, after the order of Melchizedek.”",
        ],
        [
          18,
          "For on the one hand, a former commandment is [setaside|set aside] because of its weakness and uselessness",
        ],
        [
          19,
          "(for the law made nothing perfect); but on the other hand, a [hope|better hope] is introduced, through which we [near|draw near to God].",
        ],
      ],
      com: [
        ["h", "Levi and Judah"],
        [
          "p",
          "God selected Levi’s tribe to serve as priests, but Jesus Christ is from the tribe of Judah, and no one from a tribe other than Levi could be a priest. Moses said nothing about priests for the tribe of Judah. God appointed Judah to serve as the kings and rulers of Israel, which was firmly established through King David (Gen 49:8–12; 2 Sam 7:12–16).",
        ],
        [
          "p",
          "God allocating the Levites to serve as priests was a temporary role for the Israelites to be with God, but appointing Jesus in the order of Melchizedek bypasses the Mosaic law completely. This does not mean that what God created was imperfect and so he needed another order. It shows that the old system has been set aside to make way for a completely new order, in which Jesus serves as both king and priest.",
        ],
        ["h", "A change in the law"],
        [
          "p",
          "The change of the law in verse 12 is a change from a law based on flesh, genealogy and weakness to a new covenant based on a divine oath, spiritual power and eternal life.",
        ],
        ["h", "The power of an indestructible life"],
        [
          "p",
          "The NLT reads verse 16: “Jesus became a priest, not by meeting the physical requirement of belonging to the tribe of Levi, but by the power of a life that cannot be destroyed.” The new and better covenant is established by the power of an indestructible life: Jesus lives forever and is not limited by death, because he overcame it and rose from the dead.",
        ],
        [
          "p",
          "So verse 17 says Jesus is a priest forever after the order of Melchizedek. The author quotes Psalm 110:4 again, after Hebrews 5:6. There the quotation showed that Jesus did not take the honour of high priest for himself but was appointed by God; here it stresses the power of an indestructible life, so that Jesus is a priest forever, not for a time.",
        ],
        ["h", "The law made nothing perfect"],
        [
          "p",
          "The Mosaic law with the Levitical priesthood could not make anyone perfect. It was given and instructed by God, but it was weak because of human weakness: the priests were sinful and mortal, and had to cleanse their own sins before cleansing the community. Even so, it served to point out sin. Through the better hope we draw near to God: believers have the privilege of going near to God through Jesus Christ, the Great High Priest.",
        ],
      ],
    },
    ko: {
      title: "다른 제사장이 생겨나다",
      quote:
        "“그는 제사장의 혈통에 대해서 규정한 율법을 따라 제사장이 되신 것이 아니라, 썩지 않는 생명의 능력을 따라 되셨습니다.”",
      sref: "히브리서 7:16",
      cap: "장면: 레위가 아닌 유다에서, 썩지 않는 생명의 능력으로 다른 제사장이 일어섭니다.",
      snips: [
        "레위 계통으로 완전해질 수 있었다면, 왜 멜기세덱의 계통을 따른 다른 제사장이 필요하겠습니까?",
        "제사직분에 변화가 생기면 율법에도 변화가 생깁니다",
        "그는 아무도 제단에 종사한 적이 없는 다른 지파에 속한 분입니다",
        "우리 주님께서는 유다 지파에서 나셨습니다",
        "멜기세덱과 같은 모양으로 다른 제사장이 생겨났습니다",
        "혈통의 율법이 아니라 썩지 않는 생명의 능력을 따라",
        "“너는 멜기세덱의 계통을 따라서, 영원히 제사장이다”",
        "전에 있던 계명은 무력하고 무익하므로 폐하게 되었습니다",
        "율법은 아무것도 완전하게 하지 못했고, 더 좋은 소망으로 하나님께 가까이 나아갑니다",
      ],
      verses: [
        [
          11,
          "그런데 이 레위 계통의 제사직과 관련하여, 이스라엘 백성은 율법으로 지령을 받기는 하였습니다. 그러나 만일 그 제사직으로 [perfection|완전한 것]이 이루어질 수 있었다면, 아론의 계통이 아닌 [order|멜기세덱의 계통]을 따른 다른 제사장이 생겨날 필요가 어디에 있겠습니까?",
        ],
        [
          12,
          "[change|제사직분에 변화가 생기면], 율법에도 반드시 변화가 생기기 마련입니다.",
        ],
        [
          13,
          "이런 말이 가리키는 분은 레위 지파가 아닌 다른 지파에 속한 분입니다. 그 지파에 속한 사람으로서는 아무도 제단에 종사한 적이 없습니다.",
        ],
        [
          14,
          "우리 주님께서는 [judah|유다 지파에서 나신] 것이 명백합니다. 그런데 모세는 제사장들에 관하여 말할 때에, 이 지파와 관련해서는 말한 것이 아무것도 없습니다.",
        ],
        [
          15,
          "멜기세덱과 같은 모양으로 다른 제사장이 생겨난 것을 보면, 이 사실은 더욱더 명백합니다.",
        ],
        [
          16,
          "그는 [descent|제사장의 혈통에 대해서 규정한 율법]을 따라 제사장이 되신 것이 아니라, [indestructible|썩지 않는 생명의 능력]을 따라 되셨습니다.",
        ],
        [
          17,
          "그를 두고서 말하기를 “너는 멜기세덱의 계통을 따라서, 영원히 제사장이다” 한 증언이 있습니다.",
        ],
        [
          18,
          "전에 있던 계명은 무력하고 무익하므로 [setaside|폐하게 되었습니다].",
        ],
        [
          19,
          "율법은 아무것도 완전하게 하지 못하였습니다. 그래서 하나님께서는 [hope|더 좋은 소망]을 우리에게 주셨습니다. 우리는 이 소망을 힘입어서 [near|하나님께 가까이 나아갑니다].",
        ],
      ],
      com: [
        ["h", "레위와 유다"],
        [
          "p",
          "하나님은 레위 지파를 택하여 제사장으로 섬기게 하셨지만, 예수 그리스도는 유다 지파에서 나셨고, 레위 지파가 아닌 다른 지파에서는 아무도 제사장이 될 수 없었습니다. 모세는 유다 지파의 제사장에 관해서는 아무 말도 하지 않았습니다. 하나님은 유다 지파를 이스라엘의 왕과 통치자로 세우셨고, 그것은 다윗 왕을 통해 굳게 세워졌습니다(창 49:8–12, 삼하 7:12–16).",
        ],
        [
          "p",
          "하나님께서 레위 사람들을 제사장으로 세우신 것은 이스라엘 백성이 하나님과 함께하도록 하신 “임시” 역할이었지만, 예수님을 멜기세덱의 계통으로 세우신 것은 모세의 율법을 완전히 건너뜁니다. 이것은 하나님께서 만드신 것이 불완전해서 다른 계통이 필요했다는 뜻이 아닙니다. “옛” 제도가 폐하여지고, 예수님께서 왕이자 제사장으로 섬기시는 완전히 새로운 계통이 들어섰음을 보여 주는 것입니다.",
        ],
        ["h", "율법의 변화"],
        [
          "p",
          "12절의 율법의 변화는 육신과 혈통과 연약함에 근거한 율법에서, 하나님의 맹세와 영적 능력과 영원한 생명에 근거한 새 언약으로 바뀌는 것을 뜻합니다.",
        ],
        ["h", "썩지 않는 생명의 능력"],
        [
          "p",
          "NLT는 16절을 이렇게 옮깁니다. “예수님은 레위 지파에 속해야 한다는 육체의 요건을 채워서가 아니라, 멸할 수 없는 생명의 능력으로 제사장이 되셨습니다.” 새롭고 더 좋은 언약은 썩지 않는 생명의 능력으로 세워졌습니다. 예수님은 영원히 사시며, 죽음을 이기고 다시 살아나셨으므로 죽음에 매이지 않으십니다.",
        ],
        [
          "p",
          "그래서 17절은 예수님이 멜기세덱의 계통을 따라 영원히 제사장이라고 말합니다. 저자는 히브리서 5:6에 이어 시편 110:4를 다시 인용합니다. 5:6에서 그 인용은 예수님이 대제사장의 영예를 스스로 취하지 않으시고 하나님께 임명받으셨음을 보여 주었고, 여기서는 썩지 않는 생명의 능력을 강조하여 예수님이 한때가 아니라 영원히 제사장이심을 말합니다.",
        ],
        ["h", "율법은 아무것도 완전하게 하지 못하였습니다"],
        [
          "p",
          "레위 계통의 제사장 직분과 함께한 모세의 율법은 아무도 완전하게 할 수 없었습니다. 하나님께서 주시고 가르치신 것이지만, 사람의 연약함 때문에 약했습니다. 제사장들은 죄 있고 죽을 사람들이었고, 공동체를 깨끗하게 하기 전에 먼저 자기 죄를 씻어야 했습니다. 그래도 율법은 죄를 드러내는 역할을 했습니다. 우리는 더 좋은 소망으로 하나님께 가까이 나아갑니다. 신자들은 큰 대제사장이신 예수 그리스도를 통해 하나님께 가까이 나아가는 특권을 가졌습니다.",
        ],
      ],
    },
    words: {
      en: {
        perfection: {
          t: "Perfection",
          g: "teleiōsis · τελείωσις",
          v: "7:11",
          s: "Brought to completion",
          d: "The state of being brought to completion: fulfilment, accomplishment, achievement, completing.",
        },
        order: {
          t: "After the order of Melchizedek",
          g: "kata tēn taxin Melchisedek · κατὰ τὴν τάξιν Μελχισέδεκ",
          v: "7:11",
          s: "Rank, line of succession",
          d: "Order means rank, sequence, line of succession or characteristic arrangement. The only person ever to receive this order is Jesus Christ.",
        },
        change: {
          t: "A change in the priesthood",
          g: "metatithemenēs tēs hierōsynēs · μετατιθεμένης τῆς ἱερωσύνης",
          v: "7:12",
          s: "Flesh to oath",
          d: "From a law based on flesh, genealogy and weakness to a new covenant based on a divine oath, spiritual power and eternal life.",
        },
        judah: {
          t: "Descended from Judah",
          g: "ex Iouda anatetalken · ἐξ Ἰούδα ἀνατέταλκεν",
          v: "7:14",
          s: "The royal tribe",
          d: "God appointed Judah to be the kings and rulers of Israel, established through King David (Gen 49:8–12; 2 Sam 7:12–16). Moses said nothing about priests from it.",
        },
        descent: {
          t: "Bodily descent",
          g: "kata nomon entolēs sarkinēs · κατὰ νόμον ἐντολῆς σαρκίνης",
          v: "7:16",
          s: "The requirement of the flesh",
          d: "NLT: “not by meeting the physical requirement of belonging to the tribe of Levi.”",
        },
        indestructible: {
          t: "An indestructible life",
          g: "dynamin zōēs akatalytou · δύναμιν ζωῆς ἀκαταλύτου",
          v: "7:16",
          s: "A life that cannot be destroyed",
          d: "NLT: “by the power of a life that cannot be destroyed.” Jesus lives forever, not limited by death, because he overcame it and rose.",
        },
        setaside: {
          t: "Set aside",
          g: "athetēsis · ἀθέτησις",
          v: "7:18",
          s: "Made void",
          d: "The old system set aside to make way for a completely new order, in which Jesus serves as king and priest.",
        },
        hope: {
          t: "A better hope",
          g: "kreittonos elpidos · κρείττονος ἐλπίδος",
          v: "7:19",
          s: "Through which we draw near",
          d: "The law made nothing perfect, though it pointed out sin; the better hope brings us near to God.",
        },
        near: {
          t: "Draw near to God",
          g: "engizomen tō theō · ἐγγίζομεν τῷ θεῷ",
          v: "7:19",
          s: "The privilege of approach",
          d: "Believers possessing the privilege of going near to God through Jesus Christ the Great High Priest.",
        },
      },
      ko: {
        perfection: {
          t: "완전한 것",
          g: "teleiōsis · τελείωσις",
          v: "7:11",
          s: "완성에 이름",
          d: "완성에 이른 상태. 성취, 이룸, 달성, 완결.",
        },
        order: {
          t: "멜기세덱의 계통",
          g: "kata tēn taxin Melchisedek · κατὰ τὴν τάξιν Μελχισέδεκ",
          v: "7:11",
          s: "서열, 계승의 줄",
          d: "계통은 서열, 차례, 계승의 줄, 또는 고유한 배열을 뜻합니다. 이 계통을 받은 유일한 분은 예수 그리스도이십니다.",
        },
        change: {
          t: "제사직분의 변화",
          g: "metatithemenēs tēs hierōsynēs · μετατιθεμένης τῆς ἱερωσύνης",
          v: "7:12",
          s: "육신에서 맹세로",
          d: "육신과 혈통과 연약함에 근거한 율법에서, 하나님의 맹세와 영적 능력과 영원한 생명에 근거한 새 언약으로.",
        },
        judah: {
          t: "유다 지파에서 나심",
          g: "ex Iouda anatetalken · ἐξ Ἰούδα ἀνατέταλκεν",
          v: "7:14",
          s: "왕의 지파",
          d: "하나님은 유다를 이스라엘의 왕과 통치자로 세우셨고, 다윗 왕을 통해 굳게 하셨습니다(창 49:8–12, 삼하 7:12–16). 모세는 그 지파의 제사장에 관해 아무 말도 하지 않았습니다.",
        },
        descent: {
          t: "제사장의 혈통에 대한 율법",
          g: "kata nomon entolēs sarkinēs · κατὰ νόμον ἐντολῆς σαρκίνης",
          v: "7:16",
          s: "육신의 요건",
          d: "NLT: “레위 지파에 속해야 한다는 육체의 요건을 채워서가 아니라.”",
        },
        indestructible: {
          t: "썩지 않는 생명의 능력",
          g: "dynamin zōēs akatalytou · δύναμιν ζωῆς ἀκαταλύτου",
          v: "7:16",
          s: "멸할 수 없는 생명",
          d: "NLT: “멸할 수 없는 생명의 능력으로.” 예수님은 죽음을 이기고 다시 살아나셨으므로, 죽음에 매이지 않고 영원히 사십니다.",
        },
        setaside: {
          t: "폐하다",
          g: "athetēsis · ἀθέτησις",
          v: "7:18",
          s: "무효가 됨",
          d: "옛 제도가 폐하여지고, 예수님께서 왕이자 제사장으로 섬기시는 완전히 새로운 계통이 들어섬.",
        },
        hope: {
          t: "더 좋은 소망",
          g: "kreittonos elpidos · κρείττονος ἐλπίδος",
          v: "7:19",
          s: "가까이 나아가게 함",
          d: "율법은 죄를 드러냈지만 아무것도 완전하게 하지 못했고, 더 좋은 소망은 우리를 하나님께 가까이 나아가게 합니다.",
        },
        near: {
          t: "하나님께 가까이 나아가다",
          g: "engizomen tō theō · ἐγγίζομεν τῷ θεῷ",
          v: "7:19",
          s: "나아가는 특권",
          d: "신자들이 큰 대제사장이신 예수 그리스도를 통해 하나님께 가까이 나아가는 특권을 가짐.",
        },
      },
    },
    chips: [
      {
        id: "gen49-10",
        tag: "OT",
        en: "Gen 49:10",
        ko: "창 49:10",
        ten: "The scepter shall not depart from Judah, nor the ruler’s staff from between his feet, until tribute comes to him; and to him shall be the obedience of the peoples.",
        tko: "임금의 지휘봉이 유다를 떠나지 않고, 통치자의 지휘봉이 자손 만대에까지 이를 것이다. 권능으로 그 자리에 앉을 분이 오시면, 만민이 그에게 순종할 것이다.",
        wen: "Judah, the tribe of kings.",
        wko: "왕의 지파 유다.",
      },
      {
        id: "2sa7-16",
        tag: "OT",
        en: "2 Sam 7:16",
        ko: "삼하 7:16",
        ten: "And your house and your kingdom shall be made sure forever before me. Your throne shall be established forever.",
        tko: "네 집과 네 나라가 내 앞에서 영원히 이어 갈 것이며, 네 왕위가 영원히 튼튼하게 서 있을 것이다.",
        wen: "The throne established through David.",
        wko: "다윗을 통해 세워진 왕위.",
      },
      {
        id: "heb5-6",
        tag: "NT",
        en: "Heb 5:6",
        ko: "히 5:6",
        ten: "as he says also in another place, “You are a priest forever, after the order of Melchizedek.”",
        tko: "또 다른 곳에서 “너는 멜기세덱의 계통을 따라 임명받은 영원한 제사장이다” 하고 말씀하셨습니다.",
        wen: "The same psalm, first used to show he was appointed.",
        wko: "같은 시편, 처음에는 임명받으셨음을 보이려고 쓰임.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "20–22",
    scene: "sworn",
    art: "3D · R3F — a soft clay tablet lies on a stone. A cylinder seal rolls across it and leaves the oath pressed in; the clay hardens in the light and the seal is set, never to be changed.",
    en: {
      title: "Not without an oath",
      quote:
        "“The Lord has sworn and will not change his mind, ‘You are a priest forever.’”",
      sref: "Hebrews 7:21",
      cap: "Scene: the oath is sealed into the clay, and it will not change.",
      snips: [
        "It was not without an oath; the former priests were made without one",
        "This one was made a priest with an oath: “The Lord has sworn and will not change his mind”",
        "This makes Jesus the guarantor of a better covenant",
      ],
      verses: [
        [
          20,
          "And it was not [oath|without an oath]. For those who formerly became priests were made such without an oath,",
        ],
        [
          21,
          "but this one was made a priest with an oath by the one who said to him: “The Lord has sworn and [mind|will not change his mind], ‘You are a priest forever.’”",
        ],
        [
          22,
          "This makes Jesus the [guarantor|guarantor] of a [covenant|better covenant].",
        ],
      ],
      com: [
        ["h", "Promise and oath"],
        [
          "p",
          "A promise is a declaration that something will be given or done. An oath is a guarantee that a promise cannot and will not be changed, no matter what happens; it acts as an absolute legal lock. The Levitical priests were made priests without any oath, but Jesus was made a priest with one.",
        ],
        ["h", "The beginning of the verse"],
        [
          "p",
          "The author uses Psalm 110:4 again, but this time he uses the beginning of the verse, which says God has sworn to himself that Jesus Christ will be a priest forever. This refers back to 6:16–18, where God swore by himself to make the unchanging nature of his purpose very clear.",
        ],
        ["h", "The word of the oath"],
        [
          "p",
          "Verse 28 returns to it. The NLT reads: “The law appointed high priests who were limited by human weakness. But after the law was given, God appointed his Son with an oath, and his Son has been made the perfect High Priest forever.” The better covenant rests on a divine oath, not on genealogy, and Jesus himself guarantees it.",
        ],
      ],
    },
    ko: {
      title: "맹세 없이 되신 것이 아닙니다",
      quote:
        "“주님께서 맹세하셨으니, 주님은 마음을 바꾸지 않으실 것이다. 너는 영원히 제사장이다.”",
      sref: "히브리서 7:21",
      cap: "장면: 맹세가 진흙에 찍혀 봉인되고, 바뀌지 않습니다.",
      snips: [
        "예수께서는 맹세 없이 제사장이 되신 것이 아닙니다",
        "“주님께서 맹세하셨으니, 주님은 마음을 바꾸지 않으실 것이다”",
        "예수께서는 더 좋은 언약을 보증하시는 분이 되셨습니다",
      ],
      verses: [
        [
          20,
          "그리고 예수께서는 [oath|하나님의 맹세] 없이 제사장이 되신 것이 아닙니다. 레위 계통의 사람들은 맹세 없이 제사장이 되었습니다.",
        ],
        [
          21,
          "그러나 예수께서는 자기에게 말씀하시는 분의 맹세로 제사장이 되신 것입니다. “주님께서 맹세하셨으니, [mind|주님은 마음을 바꾸지 않으실 것이다]. 너는 영원히 제사장이다” 하셨습니다.",
        ],
        [
          22,
          "이렇게 해서, 예수께서는 [covenant|더 좋은 언약]을 [guarantor|보증하시는 분]이 되셨습니다.",
        ],
      ],
      com: [
        ["h", "약속과 맹세"],
        [
          "p",
          "약속은 무언가를 주거나 하겠다는 선언입니다. 맹세는 무슨 일이 있어도 그 약속이 바뀔 수 없고 바뀌지 않으리라는 보증이며, 절대적인 법적 잠금 장치와 같습니다. 레위 계통의 제사장들은 아무 맹세 없이 제사장이 되었지만, 예수님은 맹세로 제사장이 되셨습니다.",
        ],
        ["h", "구절의 앞부분"],
        [
          "p",
          "저자는 시편 110:4를 다시 쓰지만, 이번에는 하나님께서 예수 그리스도가 영원히 제사장이 되리라고 친히 맹세하셨다는 구절의 앞부분을 씁니다. 이것은 하나님께서 자기 뜻이 변하지 않음을 분명히 하시려고 자기를 두고 맹세하셨다는 6:16–18을 가리킵니다.",
        ],
        ["h", "맹세하신 말씀"],
        [
          "p",
          "28절이 이것을 다시 말합니다. NLT는 이렇게 옮깁니다. “율법은 사람의 연약함에 매인 대제사장들을 세웠습니다. 그러나 율법이 주어진 뒤에 하나님께서는 맹세로 그 아들을 세우셨고, 그 아들은 영원히 완전한 대제사장이 되셨습니다.” 더 좋은 언약은 혈통이 아니라 하나님의 맹세에 근거하며, 예수님께서 친히 그것을 보증하십니다.",
        ],
      ],
    },
    words: {
      en: {
        oath: {
          t: "Oath",
          g: "horkōmosias · ὁρκωμοσίας",
          v: "7:20",
          s: "A solemn declaration",
          d: "A solemn declaration binding a promise: a guarantee that the promise cannot and will not be changed, no matter what happens; an absolute legal lock.",
        },
        mind: {
          t: "Will not change his mind",
          g: "ou metamelēthēsetai · οὐ μεταμεληθήσεται",
          v: "7:21",
          s: "Psalm 110:4",
          d: "The beginning of Psalm 110:4: God has sworn to himself that Jesus will be a priest forever (cf. 6:16–18).",
        },
        guarantor: {
          t: "Guarantor",
          g: "engyos · ἔγγυος",
          v: "7:22",
          s: "Surety",
          d: "One who stands surety that an agreement will be kept. Jesus himself guarantees the better covenant.",
        },
        covenant: {
          t: "A better covenant",
          g: "kreittonos diathēkēs · κρείττονος διαθήκης",
          v: "7:22",
          s: "Based on a divine oath",
          d: "A new covenant based on a divine oath, spiritual power and eternal life, rather than on flesh, genealogy and weakness.",
        },
      },
      ko: {
        oath: {
          t: "맹세",
          g: "horkōmosias · ὁρκωμοσίας",
          v: "7:20",
          s: "엄숙한 선언",
          d: "약속을 묶어 두는 엄숙한 선언. 무슨 일이 있어도 그 약속이 바뀔 수 없고 바뀌지 않으리라는 보증이며, 절대적인 법적 잠금 장치입니다.",
        },
        mind: {
          t: "마음을 바꾸지 않으실 것이다",
          g: "ou metamelēthēsetai · οὐ μεταμεληθήσεται",
          v: "7:21",
          s: "시편 110:4",
          d: "시편 110:4의 앞부분. 하나님께서 예수님이 영원히 제사장이 되리라고 친히 맹세하셨습니다(6:16–18 참조).",
        },
        guarantor: {
          t: "보증하시는 분",
          g: "engyos · ἔγγυος",
          v: "7:22",
          s: "보증인",
          d: "약속이 지켜지도록 보증을 서는 사람. 예수님께서 친히 더 좋은 언약을 보증하십니다.",
        },
        covenant: {
          t: "더 좋은 언약",
          g: "kreittonos diathēkēs · κρείττονος διαθήκης",
          v: "7:22",
          s: "하나님의 맹세에 근거함",
          d: "육신과 혈통과 연약함이 아니라, 하나님의 맹세와 영적 능력과 영원한 생명에 근거한 새 언약.",
        },
      },
    },
    chips: [
      {
        id: "ps110-4",
        tag: "OT",
        en: "Ps 110:4",
        ko: "시 110:4",
        ten: "The LORD has sworn and will not change his mind, “You are a priest forever after the order of Melchizedek.”",
        tko: "주님께서 맹세하시기를 “너는 멜기세덱을 따른 영원한 제사장이다” 하셨으니, 그 뜻을 바꾸지 않으실 것입니다.",
        wen: "The oath, quoted from its beginning.",
        wko: "앞부분부터 인용된 맹세.",
      },
      {
        id: "heb6-17",
        tag: "NT",
        en: "Heb 6:17",
        ko: "히 6:17",
        ten: "So when God desired to show more convincingly to the heirs of the promise the unchangeable character of his purpose, he guaranteed it with an oath,",
        tko: "그래서 하나님께서는, 그 약속을 상속받는 사람들에게 하나님의 뜻이 변하지 않는다는 것을 더욱 환히 나타내 보이시려고, 맹세로써 보증하여 주셨습니다.",
        wen: "God swore by himself to make his purpose clear.",
        wko: "뜻을 분명히 하시려고 자기를 두고 맹세하심.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "23–28",
    scene: "forever",
    art: "3D · R3F — before the altar, high priests stand one after another, each fading as death takes him and the next steps in. Then one stands who does not fade, his hands raised in intercession, and the light above him stays.",
    en: {
      title: "He always lives to make intercession",
      quote:
        "“Consequently, he is able to save to the uttermost those who draw near to God through him, since he always lives to make intercession for them.”",
      sref: "Hebrews 7:25",
      cap: "Scene: one priest after another is taken by death. One stands, and does not fade.",
      snips: [
        "The former priests were many, prevented by death from continuing",
        "He holds his priesthood permanently, because he continues forever",
        "He saves to the uttermost, and always lives to make intercession",
        "Holy, innocent, unstained, separated from sinners, exalted above the heavens",
        "No daily sacrifices; he did this once for all when he offered up himself",
        "The law appoints weak men; the oath appoints a Son made perfect forever",
      ],
      verses: [
        [
          23,
          "The former priests were many in number, because they were [death|prevented by death from continuing in office],",
        ],
        [
          24,
          "but he [permanently|holds his priesthood permanently], because he continues forever.",
        ],
        [
          25,
          "Consequently, he is able to [uttermost|save to the uttermost] those who [near|draw near to God] through him, since he always lives to [intercession|make intercession] for them.",
        ],
        [
          26,
          "For it was indeed fitting that we should have such a high priest, [holy|holy, innocent, unstained], separated from sinners, and exalted above the heavens.",
        ],
        [
          27,
          "He has no need, like those high priests, to offer sacrifices daily, first for his own sins and then for those of the people, since he did this [once|once for all] when he offered up himself.",
        ],
        [
          28,
          "For the law appoints men [weakness|in their weakness] as high priests, but the word of the oath, which came later than the law, appoints [perfect|a Son who has been made perfect forever].",
        ],
      ],
      com: [
        ["h", "Many priests, and one"],
        [
          "p",
          "Verse 23 echoes verse 8. The high priests were mortal men who did not live forever, so a replacement had to be found whenever one finished, and they became many in number. Jesus holds his priesthood permanently, because he continues forever by the power of an indestructible life.",
        ],
        ["h", "He always lives to make intercession"],
        [
          "p",
          "Intercession is making an earnest request through contact with the one approached: bringing a petition to a king on behalf of someone, pleading, begging. Because Jesus always lives, he is always pleading for those who draw near to God through him, and he is able to save them to the uttermost.",
        ],
        ["h", "Once for all"],
        [
          "p",
          "Mortal high priests had to offer sacrifices for their own sins before offering for the sins of the Israelites (Lev 16:6). Jesus did not need to, because he was holy, innocent, unstained, separated from sinners and exalted above the heavens. He offered up himself, once for all.",
        ],
        ["h", "Weak men, and a Son made perfect"],
        [
          "p",
          "The NLT reads verse 28: “The law appointed high priests who were limited by human weakness. But after the law was given, God appointed his Son with an oath, and his Son has been made the perfect High Priest forever.” The law could not make anyone perfect, but the word of the oath appoints a Son who is perfect forever: our ultimate Great High Priest.",
        ],
      ],
    },
    ko: {
      title: "늘 살아 계셔서 중재의 간구를 하십니다",
      quote:
        "“따라서 그는 자기를 통하여 하나님께 나아오는 사람들을 완전하게 구원하실 수 있습니다. 그는 늘 살아 계셔서 그들을 위하여 중재의 간구를 하십니다.”",
      sref: "히브리서 7:25",
      cap: "장면: 제사장이 차례로 죽음에 막혀 사라집니다. 한 분이 서서, 사라지지 않으십니다.",
      snips: [
        "레위 계통의 제사장들은 죽음 때문에 직무를 계속할 수 없어서 그 수가 많아졌습니다",
        "예수는 영원히 계시므로 제사장직을 영구히 간직하십니다",
        "완전하게 구원하시며, 늘 살아 계셔서 중재의 간구를 하십니다",
        "거룩하시고, 순진하시고, 순결하시고, 죄인들과 구별되시고, 하늘보다 높이 되신 분",
        "날마다 제물을 드릴 필요가 없이, 자기 자신을 바쳐 단 한 번에 이루셨습니다",
        "율법은 약점 있는 사람들을 세우지만, 맹세의 말씀은 영원히 완전하게 되신 아들을 세웠습니다",
      ],
      verses: [
        [
          23,
          "또한 레위 계통의 제사장들은 [death|죽음 때문에 그 직무를 계속할 수 없어서], 그 수가 많아졌습니다.",
        ],
        [
          24,
          "그러나 예수는 영원히 계시는 분이므로, [permanently|제사장직을 영구히 간직하십니다].",
        ],
        [
          25,
          "따라서 그는 자기를 통하여 [near|하나님께 나아오는] 사람들을 [uttermost|완전하게 구원하실] 수 있습니다. 그는 늘 살아 계셔서 그들을 위하여 [intercession|중재의 간구]를 하십니다.",
        ],
        [
          26,
          "예수는 이러한 제사장으로 우리에게 적격이십니다. 그는 [holy|거룩하시고, 순진하시고, 순결하시고], 죄인들과 구별되시고, 하늘보다 높이 되신 분입니다.",
        ],
        [
          27,
          "그는 다른 대제사장들처럼 날마다 먼저 자기 죄를 위하여 희생제물을 드리고, 그 다음에 백성을 위하여 희생제물을 드릴 필요가 없습니다. 그는 자기 자신을 바치셔서 [once|단 한 번에] 이 일을 이루셨기 때문입니다.",
        ],
        [
          28,
          "[weakness|사람들에게 약점이 있어도] 율법은 어쩔 수 없이 그들을 대제사장으로 세우지만, 율법이 생긴 이후에 하나님께서 맹세하신 말씀은 [perfect|영원히 완전하게 되신 아들]을 대제사장으로 세웠습니다.",
        ],
      ],
      com: [
        ["h", "많은 제사장과 한 분"],
        [
          "p",
          "23절은 8절을 되울립니다. 대제사장들은 영원히 살지 못하는 죽을 사람들이어서, 한 사람이 직무를 마칠 때마다 뒤를 이을 사람을 찾아야 했고, 그래서 그 수가 많아졌습니다. 예수님은 썩지 않는 생명의 능력으로 영원히 계시므로 제사장직을 영구히 간직하십니다.",
        ],
        ["h", "늘 살아 계셔서 중재의 간구를 하십니다"],
        [
          "p",
          "중재의 간구는 상대에게 나아가 간절히 청하는 것, 곧 누군가를 위하여 왕에게 청원을 올리고 탄원하며 간청하는 것입니다. 예수님은 늘 살아 계시므로, 자기를 통하여 하나님께 나아오는 사람들을 위해 늘 간구하시며, 그들을 완전하게 구원하실 수 있습니다.",
        ],
        ["h", "단 한 번에"],
        [
          "p",
          "죽을 대제사장들은 이스라엘 백성의 죄를 위하여 제물을 드리기 전에 먼저 자기 죄를 위하여 제물을 드려야 했습니다(레 16:6). 예수님은 그럴 필요가 없으셨습니다. 그는 거룩하시고, 순진하시고, 순결하시고, 죄인들과 구별되시고, 하늘보다 높이 되신 분이기 때문입니다. 그는 자기 자신을 단 한 번에 바치셨습니다.",
        ],
        ["h", "약점 있는 사람들과 완전하게 되신 아들"],
        [
          "p",
          "NLT는 28절을 이렇게 옮깁니다. “율법은 사람의 연약함에 매인 대제사장들을 세웠습니다. 그러나 율법이 주어진 뒤에 하나님께서는 맹세로 그 아들을 세우셨고, 그 아들은 영원히 완전한 대제사장이 되셨습니다.” 율법은 아무도 완전하게 할 수 없었지만, 맹세하신 말씀은 영원히 완전하신 아들, 곧 우리의 궁극적인 큰 대제사장을 세웁니다.",
        ],
      ],
    },
    words: {
      en: {
        death: {
          t: "Prevented by death",
          g: "thanatō kōlyesthai paramenein · θανάτῳ κωλύεσθαι παραμένειν",
          v: "7:23",
          s: "Hindered from staying",
          d: "The high priests did not live forever; a replacement had to be found whenever one finished.",
        },
        permanently: {
          t: "Permanently",
          g: "aparabaton · ἀπαράβατον",
          v: "7:24",
          s: "Passing to no successor",
          d: "He continues forever, so his priesthood never passes to another.",
        },
        uttermost: {
          t: "To the uttermost",
          g: "eis to panteles · εἰς τὸ παντελὲς",
          v: "7:25",
          s: "Completely, for all time",
          d: "Because he always lives, he is able to save completely those who draw near to God through him.",
        },
        near: {
          t: "Draw near to God",
          g: "proserchomenous tō theō · προσερχομένους τῷ θεῷ",
          v: "7:25",
          s: "Through him",
          d: "Believers possessing the privilege of going near to God through Jesus Christ the Great High Priest.",
        },
        intercession: {
          t: "Make intercession",
          g: "entynchanein · ἐντυγχάνειν",
          v: "7:25",
          s: "Petition a king for someone",
          d: "Making an earnest request through contact with the one approached; to bring petition to a king on behalf of someone, to plead, to beg.",
        },
        holy: {
          t: "Holy, innocent, unstained",
          g: "hosios, akakos, amiantos · ὅσιος, ἄκακος, ἀμίαντος",
          v: "7:26",
          s: "No sin of his own",
          d: "So he did not need to offer sacrifices first for his own sins.",
        },
        once: {
          t: "Once for all",
          g: "ephapax · ἐφάπαξ",
          v: "7:27",
          s: "A single offering",
          d: "He offered up himself, once; no daily sacrifices are needed.",
        },
        weakness: {
          t: "In their weakness",
          g: "echontas astheneian · ἔχοντας ἀσθένειαν",
          v: "7:28",
          s: "Limited by human weakness",
          d: "NLT: “high priests who were limited by human weakness”: sinful and mortal, cleansing their own sins first.",
        },
        perfect: {
          t: "Made perfect forever",
          g: "eis ton aiōna teteleiōmenon · εἰς τὸν αἰῶνα τετελειωμένον",
          v: "7:28",
          s: "The perfect High Priest",
          d: "NLT: “his Son has been made the perfect High Priest forever.”",
        },
      },
      ko: {
        death: {
          t: "죽음 때문에 직무를 계속할 수 없음",
          g: "thanatō kōlyesthai paramenein · θανάτῳ κωλύεσθαι παραμένειν",
          v: "7:23",
          s: "머물지 못하게 막힘",
          d: "대제사장들은 영원히 살지 못했고, 한 사람이 직무를 마칠 때마다 뒤를 이을 사람을 찾아야 했습니다.",
        },
        permanently: {
          t: "영구히 간직하다",
          g: "aparabaton · ἀπαράβατον",
          v: "7:24",
          s: "뒤를 넘겨주지 않음",
          d: "그분은 영원히 계시므로 그 제사장직이 다른 이에게 넘어가지 않습니다.",
        },
        uttermost: {
          t: "완전하게 구원하다",
          g: "eis to panteles · εἰς τὸ παντελὲς",
          v: "7:25",
          s: "온전히, 영원히",
          d: "늘 살아 계시므로, 자기를 통하여 하나님께 나아오는 사람들을 온전히 구원하실 수 있습니다.",
        },
        near: {
          t: "하나님께 나아오다",
          g: "proserchomenous tō theō · προσερχομένους τῷ θεῷ",
          v: "7:25",
          s: "그를 통하여",
          d: "신자들이 큰 대제사장이신 예수 그리스도를 통해 하나님께 가까이 나아가는 특권을 가짐.",
        },
        intercession: {
          t: "중재의 간구",
          g: "entynchanein · ἐντυγχάνειν",
          v: "7:25",
          s: "누군가를 위해 왕에게 청원함",
          d: "상대에게 나아가 간절히 청하는 것. 누군가를 위하여 왕에게 청원을 올리고, 탄원하고, 간청하는 것입니다.",
        },
        holy: {
          t: "거룩하시고, 순진하시고, 순결하시고",
          g: "hosios, akakos, amiantos · ὅσιος, ἄκακος, ἀμίαντος",
          v: "7:26",
          s: "자기 죄가 없음",
          d: "그래서 먼저 자기 죄를 위하여 제물을 드릴 필요가 없으셨습니다.",
        },
        once: {
          t: "단 한 번에",
          g: "ephapax · ἐφάπαξ",
          v: "7:27",
          s: "한 번의 드림",
          d: "그는 자기 자신을 단 한 번 바치셨고, 날마다 드리는 제물은 필요하지 않습니다.",
        },
        weakness: {
          t: "사람들에게 약점이 있어도",
          g: "echontas astheneian · ἔχοντας ἀσθένειαν",
          v: "7:28",
          s: "사람의 연약함에 매임",
          d: "NLT: “사람의 연약함에 매인 대제사장들.” 죄 있고 죽을 사람들이어서 먼저 자기 죄를 씻어야 했습니다.",
        },
        perfect: {
          t: "영원히 완전하게 되신 아들",
          g: "eis ton aiōna teteleiōmenon · εἰς τὸν αἰῶνα τετελειωμένον",
          v: "7:28",
          s: "완전한 대제사장",
          d: "NLT: “그 아들은 영원히 완전한 대제사장이 되셨습니다.”",
        },
      },
    },
    chips: [
      {
        id: "lev16-6",
        tag: "OT",
        en: "Lev 16:6",
        ko: "레 16:6",
        ten: "Aaron shall offer the bull as a sin offering for himself and shall make atonement for himself and for his house.",
        tko: "아론은 자신을 속하는 속죄제물로 수소를 바쳐, 자기와 자기 집안의 죄를 속하여야 한다.",
        wen: "The high priest’s offering for his own sins first.",
        wko: "대제사장이 먼저 자기 죄를 위하여 드리는 제물.",
      },
      {
        id: "heb9-12",
        tag: "NT",
        en: "Heb 9:12",
        ko: "히 9:12",
        ten: "he entered once for all into the holy places, not by means of the blood of goats and calves but by means of his own blood, thus securing an eternal redemption.",
        tko: "단 한 번에 지성소에 들어가셨습니다. 그는 염소나 송아지의 피로써가 아니라, 자기의 피로써, 우리에게 영원한 구원을 이루셨습니다.",
        wen: "Once for all, by his own blood.",
        wko: "자기의 피로써, 단 한 번에.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "Melchizedek",
        items: [
          [
            "vv1–3",
            "Melchizedek, king of Salem and priest of the Most High God, blessed Abraham. King of righteousness and king of peace, without genealogy, he resembles the Son of God and continues a priest forever.",
          ],
          [
            "vv4–10",
            "Abraham gave him a tenth, and the superior blesses the inferior. Mortal men receive tithes; he lives on. Even Levi paid tithes through Abraham.",
          ],
        ],
      },
      {
        h: "A better priest",
        items: [
          [
            "vv11–19",
            "Levi could not bring perfection, so another priest arises from Judah after the order of Melchizedek, by the power of an indestructible life. The law made nothing perfect; a better hope draws us near to God.",
          ],
          [
            "vv20–22",
            "He was made priest with an oath God will not change, so Jesus is the guarantor of a better covenant.",
          ],
          [
            "vv23–28",
            "The many priests were stopped by death; he continues forever, saves to the uttermost and always lives to intercede. He offered himself once for all, a Son made perfect forever.",
          ],
        ],
      },
    ],
    intentH: "The author’s intention",
    intentShort:
      "To show that Jesus, a priest forever in the order of Melchizedek, is greater than the Levitical priesthood and is our ultimate Great High Priest.",
    intent: [
      "Jesus Christ was appointed to the priesthood in the order of Melchizedek, which has no start or finish and no genealogy; the order lives forever, extending to Jesus alone, both king and priest of God.",
      "The Levitical priesthood could not make the people perfect because of its limitations, but the one who lives forever is our ultimate Great High Priest, because he has the power of an indestructible life. Mortal high priests had to offer sacrifices for their own sins before offering for the sins of the Israelites, but Jesus did not need to, as he was holy, innocent, unstained, separated from sinners and exalted above the heavens.",
    ],
  },
  ko: {
    groups: [
      {
        h: "멜기세덱",
        items: [
          [
            "1–3절",
            "살렘 왕이요 지극히 높으신 하나님의 제사장인 멜기세덱이 아브라함을 축복했습니다. 정의의 왕이요 평화의 왕이며 족보도 없는 그는 하나님의 아들과 같아서 언제까지나 제사장으로 계십니다.",
          ],
          [
            "4–10절",
            "아브라함이 그에게 십분의 일을 바쳤고, 축복은 아랫사람이 윗사람에게서 받습니다. 죽을 사람들이 십분의 일을 받지만, 그는 살아 계십니다. 레위까지도 아브라함을 통해서 십분의 일을 바쳤습니다.",
          ],
        ],
      },
      {
        h: "더 좋은 제사장",
        items: [
          [
            "11–19절",
            "레위 계통으로는 완전해질 수 없었기에, 유다에서 멜기세덱의 계통을 따라 썩지 않는 생명의 능력으로 다른 제사장이 생겨났습니다. 율법은 아무것도 완전하게 하지 못했고, 더 좋은 소망이 우리를 하나님께 가까이 나아가게 합니다.",
          ],
          [
            "20–22절",
            "그분은 하나님께서 바꾸지 않으실 맹세로 제사장이 되셨고, 그래서 예수께서는 더 좋은 언약을 보증하시는 분이 되셨습니다.",
          ],
          [
            "23–28절",
            "많은 제사장들은 죽음에 막혔지만, 그분은 영원히 계시며 완전하게 구원하시고 늘 살아 계셔서 간구하십니다. 그분은 자기 자신을 단 한 번에 바치신, 영원히 완전하게 되신 아들이십니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "멜기세덱의 계통을 따라 영원한 제사장이신 예수님이 레위 계통의 제사장 직분보다 크시며, 우리의 궁극적인 큰 대제사장이심을 보여 주는 것.",
    intent: [
      "예수 그리스도는 멜기세덱의 계통을 따라 제사장으로 임명되셨습니다. 그 계통에는 시작도 끝도 족보도 없지만, 그 계통은 영원히 살아 있어 하나님의 왕이자 제사장이신 예수님께만 이어집니다.",
      "레위 계통의 제사장 직분은 그 한계 때문에 백성을 완전하게 할 수 없었지만, 영원히 사시는 분은 썩지 않는 생명의 능력을 가지셨으므로 우리의 궁극적인 큰 대제사장이십니다. 죽을 대제사장들은 이스라엘 백성의 죄를 위해 드리기 전에 먼저 자기 죄를 위해 제물을 드려야 했지만, 예수님은 거룩하시고, 순진하시고, 순결하시고, 죄인들과 구별되시고, 하늘보다 높이 되신 분이므로 그럴 필요가 없으셨습니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 7",
    tagline: "“You are a priest forever, after the order of Melchizedek.”",
    taglineRef: "Hebrews 7:17",
    mapTitle: "Twenty-eight verses, five movements",
    mapIntro:
      "Melchizedek, king of Salem, blesses Abraham and receives his tithe. Then another priest arises, not from Levi but from Judah, by the power of an indestructible life, sworn in with an oath, who always lives to make intercession.",
    summaryTitle: "What Hebrews 7 says",
    footQuote:
      "“He is able to save to the uttermost those who draw near to God through him, since he always lives to make intercession for them.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 7장",
    tagline: "“너는 멜기세덱의 계통을 따라서, 영원히 제사장이다”",
    taglineRef: "히브리서 7:17",
    mapTitle: "스물여덟 절, 다섯 흐름",
    mapIntro:
      "살렘 왕 멜기세덱이 아브라함을 축복하고 그의 십분의 일을 받습니다. 그리고 레위가 아닌 유다에서, 썩지 않는 생명의 능력으로, 맹세로 세워지신 다른 제사장이 생겨납니다. 그분은 늘 살아 계셔서 중재의 간구를 하십니다.",
    summaryTitle: "히브리서 7장이 말하는 것",
    footQuote:
      "“그는 자기를 통하여 하나님께 나아오는 사람들을 완전하게 구원하실 수 있습니다. 그는 늘 살아 계셔서 그들을 위하여 중재의 간구를 하십니다.”",
    version: "새번역",
  },
};

export const chapter7: ChapterContent = {
  number: 7,
  setting: "salem",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
