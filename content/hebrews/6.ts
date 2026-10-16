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
    scene: "foundation",
    art: "3D · R3F — on the headland after rain, six cut stones lie in a row: a foundation laid once. Nobody lays them again; course by course a wall rises on them.",
    en: {
      title: "Go on to maturity",
      quote:
        "“Therefore let us leave the elementary doctrine of Christ and go on to maturity.”",
      sref: "Hebrews 6:1",
      cap: "Scene: the foundation is laid once. The wall rises on it.",
      snips: [
        "Leave the elementary doctrine of Christ and go on to maturity",
        "Not laying again a foundation: washings, laying on of hands, resurrection, judgement",
        "And this we will do if God permits",
      ],
      verses: [
        [
          1,
          "Therefore let us [leave|leave] the [elementary|elementary doctrine of Christ] and go on to [maturity|maturity], not [foundation|laying again a foundation] of repentance from [deadworks|dead works] and of faith toward God,",
        ],
        [
          2,
          "and of instruction about [washings|washings], the [hands|laying on of hands], the resurrection of the dead, and eternal judgment.",
        ],
        [3, "And this we will do [permits|if God permits]."],
      ],
      com: [
        ["h", "The elementary doctrine"],
        [
          "p",
          "The elementary doctrine of Christ is spelled out in verses 1b and 2. Repentance from dead works is not merely a change of mind but a complete change of heart, attitude, interest and direction away from fleshly works. Faith toward God goes with it: turning from the sinful self and putting all your trust in God, his grace and his promises.",
        ],
        ["h", "Washings and the laying on of hands"],
        [
          "p",
          "The Greek word for washings is baptismos in the plural. It refers to the Jewish ceremonial purification washings, not Christian baptism. Ceremonial washing was a daily ritual the readers practised before following Jesus, and they were tempted to go back to these old rituals to avoid persecution. So the basic Christian teaching about washings explained why believers must leave them behind: Jesus’ sacrifice cleanses the heart permanently.",
        ],
        [
          "p",
          "The laying on of hands is similar. Under the old practice a person laid hands on an innocent animal to transfer their sin onto it for sacrifice. The basic teaching explained why believers should not go back to animal sacrifices, because Jesus cleansed sins once for all, for the whole world, and not for one person at a time.",
        ],
        ["h", "Resurrection and judgement"],
        [
          "p",
          "The resurrection of the dead is the hope all believers have through Jesus Christ, who rose from the grave and defeated the power of death. In eternal judgement believers will not be in fear, because they have hope in Jesus; unbelievers will receive the just punishment for their sins.",
        ],
        ["h", "Lingering in the basics"],
        [
          "p",
          "The readers already knew all of this, but they were lingering in these basic principles, doing the comfortable thing out of laziness and never challenging themselves to grow. So the author pushes them to grow out of the basics and go on to maturity.",
        ],
        ["h", "If God permits"],
        [
          "p",
          "The author was frustrated and wanted these Jewish Christians to grow, yet he adds “if God permits”, as if maturing from the basics is not easy. This shows two things. First, spiritual growth requires God’s power and grace: everyone depends completely on God to open their minds to deeper truths. Second, 5:11 said the readers had become dull of hearing; their hearts were drifting and growing spiritually lazy. If they go on this way, God may not permit their growth, for a time or for good. It is a warning against spiritual procrastination, and verses 4–6 explain it further.",
        ],
      ],
    },
    ko: {
      title: "성숙한 경지로 나아갑시다",
      quote:
        "“그러므로 우리는 그리스도교의 초보적 교리를 제쳐놓고서, 성숙한 경지로 나아갑시다.”",
      sref: "히브리서 6:1",
      cap: "장면: 기초는 한 번 놓입니다. 그 위로 벽이 올라갑니다.",
      snips: [
        "초보적 교리를 제쳐놓고서, 성숙한 경지로 나아갑시다",
        "세례와 안수와 부활과 심판에 관해서, 또 다시 기초를 놓는 일이 없어야 합니다",
        "하나님께서 허락하시면, 우리는 그렇게 할 수 있을 것입니다",
      ],
      verses: [
        [
          1,
          "그러므로 우리는 그리스도교의 [elementary|초보적 교리]를 [leave|제쳐놓고서], [maturity|성숙한 경지]로 나아갑시다. [deadworks|죽은 행실]에서 벗어나는 회개와 하나님에 대한 믿음과",
        ],
        [
          2,
          "[washings|세례에 관한 가르침]과 [hands|안수]와 죽은 사람의 부활과 영원한 심판과 관련해서, 또 다시 [foundation|기초를 놓는] 일이 없어야 하겠습니다.",
        ],
        [
          3,
          "[permits|하나님께서 허락하시면], 우리는 그렇게 할 수 있을 것입니다.",
        ],
      ],
      com: [
        ["h", "초보적 교리"],
        [
          "p",
          "그리스도교의 초보적 교리는 1절 후반과 2절에 나옵니다. 죽은 행실에서 벗어나는 회개는 단지 생각을 바꾸는 것이 아니라, 육신의 행실에서 마음과 태도와 관심과 방향을 완전히 바꾸는 것입니다. 하나님에 대한 믿음이 그와 함께 갑니다. 죄 된 자아와 길에서 돌아서서 하나님과 그분의 은혜와 약속에 모든 신뢰를 두는 것입니다.",
        ],
        ["h", "세례와 안수"],
        [
          "p",
          "세례로 옮긴 그리스어는 baptismos의 복수형입니다. 이것은 그리스도인의 세례가 아니라 유대인의 정결 예식, 곧 씻는 예식을 가리킵니다. 씻는 예식은 독자들이 예수님을 따르기 전에 날마다 하던 의식이었고, 그들은 박해를 피하려고 이 옛 의식으로 돌아가고 싶은 유혹을 받았습니다. 그래서 씻는 예식에 관한 기초 가르침은 왜 신자들이 그것을 버려야 하는지를 설명했습니다. 예수님의 희생이 마음을 영원히 깨끗하게 하기 때문입니다.",
        ],
        [
          "p",
          "안수도 비슷합니다. 옛 관습에서는 죄 없는 짐승에게 손을 얹어 자기 죄를 그 짐승에게 옮기고 제물로 바쳤습니다. 기초 가르침은 왜 신자들이 짐승의 제사로 돌아가서는 안 되는지를 설명했습니다. 예수님은 한 사람씩이 아니라 온 세상을 위하여 단번에 죄를 깨끗하게 하셨기 때문입니다.",
        ],
        ["h", "부활과 심판"],
        [
          "p",
          "죽은 사람의 부활은 무덤에서 살아나 죽음의 권세를 이기신 예수 그리스도를 통해 모든 신자가 가진 소망입니다. 영원한 심판에서 신자들은 예수님 안에 소망이 있으므로 두려워하지 않지만, 믿지 않는 사람들은 자기 죄에 대한 의로운 형벌을 받습니다.",
        ],
        ["h", "기초에 머무름"],
        [
          "p",
          "독자들은 이것을 모두 이미 알고 있었지만, 이 초보적 원리 안에 머물러 있었습니다. 게을러서 편한 것만 하고 자라도록 자신을 다그치지 않는 것과 같습니다. 그래서 저자는 그들이 기초를 넘어 성숙한 경지로 나아가도록 재촉합니다.",
        ],
        ["h", "하나님께서 허락하시면"],
        [
          "p",
          "저자는 답답한 마음으로 이 유대인 그리스도인들이 자라기를 바랐지만, “하나님께서 허락하시면”이라고 덧붙입니다. 기초에서 성숙으로 나아가는 것이 쉽지 않다는 듯이 말입니다. 여기서 두 가지를 알 수 있습니다. 첫째, 영적 성장에는 하나님의 능력과 은혜가 필요합니다. 누구나 더 깊은 진리에 마음이 열리려면 전적으로 하나님께 의지해야 합니다. 둘째, 5:11은 독자들의 귀가 둔해졌다고 했습니다. 그들의 마음은 떠내려가며 영적으로 게을러지고 있었습니다. 이대로 가면 하나님께서 그들의 성장을 잠시 또는 영영 허락하지 않으실 수도 있습니다. 영적으로 미루는 것에 대한 경고이며, 4–6절이 이것을 더 설명합니다.",
        ],
      ],
    },
    words: {
      en: {
        leave: {
          t: "Leave",
          g: "aphentes · ἀφέντες",
          v: "6:1",
          s: "Put away, move on from",
          d: "To forsake, to hurl away, to put away, to disregard.",
        },
        elementary: {
          t: "Elementary doctrine",
          g: "ton tēs archēs tou Christou logon · τὸν τῆς ἀρχῆς τοῦ Χριστοῦ λόγον",
          v: "6:1",
          s: "The ABCs",
          d: "The basics of a subject, the ABCs of a topic. Here, the teachings listed in verses 1b and 2. NLT: “let us stop going over the basic teachings about Christ again and again.”",
        },
        maturity: {
          t: "Maturity",
          g: "teleiotēta · τελειότητα",
          v: "6:1",
          s: "Full grown",
          d: "A state of completion or perfection in the sense of maturity: complete, fully developed, full grown, finished.",
        },
        foundation: {
          t: "Laying a foundation",
          g: "themelion kataballomenoi · θεμέλιον καταβαλλόμενοι",
          v: "6:1",
          s: "Cast down, set in place",
          d: "To cast down, to throw to the ground; figuratively, a spiritual foundation put or laid down. It is laid once, not again.",
        },
        deadworks: {
          t: "Dead works",
          g: "nekrōn ergōn · νεκρῶν ἔργων",
          v: "6:1",
          s: "Works with no life",
          d: "Works that have no life, for they will not endure the test of God’s refining fire; works done by the flesh.",
        },
        washings: {
          t: "Washings",
          g: "baptismōn · βαπτισμῶν",
          v: "6:2",
          s: "Ceremonial washings",
          d: "The plural of baptismos: the Jewish ceremonial purification washings, not Christian baptism. Believers leave them behind because Jesus’ sacrifice cleanses the heart permanently.",
        },
        hands: {
          t: "Laying on of hands",
          g: "epitheseōs cheirōn · ἐπιθέσεώς χειρῶν",
          v: "6:2",
          s: "The old sacrifice",
          d: "The old practice of laying hands on an innocent animal to transfer sin onto it for sacrifice. Jesus cleansed sins once for all, for the whole world.",
        },
        permits: {
          t: "If God permits",
          g: "epitrepē ho theos · ἐπιτρέπῃ ὁ θεός",
          v: "6:3",
          s: "Consent, entrust",
          d: "To consent, to entrust. Spiritual growth depends on God’s power and grace, and it is a warning against spiritual procrastination.",
        },
      },
      ko: {
        leave: {
          t: "제쳐놓다",
          g: "aphentes · ἀφέντες",
          v: "6:1",
          s: "내려놓고 넘어감",
          d: "버리다, 내던지다, 치워 두다, 개의치 않다.",
        },
        elementary: {
          t: "초보적 교리",
          g: "ton tēs archēs tou Christou logon · τὸν τῆς ἀρχῆς τοῦ Χριστοῦ λόγον",
          v: "6:1",
          s: "기초, 가나다",
          d: "어떤 주제의 기초, 가나다. 여기서는 1절 후반과 2절에 나오는 가르침입니다. NLT: “그리스도에 관한 기초 가르침을 거듭거듭 되풀이하는 것을 그칩시다.”",
        },
        maturity: {
          t: "성숙한 경지",
          g: "teleiotēta · τελειότητα",
          v: "6:1",
          s: "다 자람",
          d: "성숙이라는 뜻에서 완성되거나 온전한 상태. 완전한, 다 발달한, 다 자란, 끝마친.",
        },
        foundation: {
          t: "기초를 놓다",
          g: "themelion kataballomenoi · θεμέλιον καταβαλλόμενοι",
          v: "6:2",
          s: "내려 놓아 세움",
          d: "내려놓다, 땅에 던지다. 비유적으로 놓아 둔 영적 기초. 기초는 한 번 놓는 것이지 다시 놓는 것이 아닙니다.",
        },
        deadworks: {
          t: "죽은 행실",
          g: "nekrōn ergōn · νεκρῶν ἔργων",
          v: "6:1",
          s: "생명이 없는 행위",
          d: "생명이 없는 행위. 하나님의 연단하는 불의 시험을 견디지 못하기 때문입니다. 육신으로 한 행위입니다.",
        },
        washings: {
          t: "세례에 관한 가르침",
          g: "baptismōn · βαπτισμῶν",
          v: "6:2",
          s: "씻는 예식",
          d: "baptismos의 복수형. 그리스도인의 세례가 아니라 유대인의 정결 예식입니다. 예수님의 희생이 마음을 영원히 깨끗하게 하므로 신자들은 그것을 뒤로합니다.",
        },
        hands: {
          t: "안수",
          g: "epitheseōs cheirōn · ἐπιθέσεώς χειρῶν",
          v: "6:2",
          s: "옛 제사",
          d: "죄 없는 짐승에게 손을 얹어 죄를 옮기고 제물로 바치던 옛 관습. 예수님은 온 세상을 위하여 단번에 죄를 깨끗하게 하셨습니다.",
        },
        permits: {
          t: "하나님께서 허락하시면",
          g: "epitrepē ho theos · ἐπιτρέπῃ ὁ θεός",
          v: "6:3",
          s: "허락하다, 맡기다",
          d: "허락하다, 맡기다. 영적 성장은 하나님의 능력과 은혜에 달려 있으며, 영적으로 미루는 것에 대한 경고입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb5-12",
        tag: "NT",
        en: "Heb 5:12",
        ko: "히 5:12",
        ten: "For though by this time you ought to be teachers, you need someone to teach you again the basic principles of the oracles of God. You need milk, not solid food,",
        tko: "시간으로 보면, 여러분은 이미 교사가 되었어야 할 터인데, 다시금 하나님의 말씀의 초보적 원리를 남들에게서 배워야 할 처지에 놓여 있습니다. 여러분은 단단한 음식물이 아니라, 젖을 필요로 하는 사람이 되었습니다.",
        wen: "Still on the basics, and needing milk again.",
        wko: "아직 기초에 머물러 다시 젖이 필요함.",
      },
      {
        id: "heb5-11",
        tag: "NT",
        en: "Heb 5:11",
        ko: "히 5:11",
        ten: "About this we have much to say, and it is hard to explain, since you have become dull of hearing.",
        tko: "멜기세덱에 관하여는 할 말이 많이 있지만, 여러분의 귀가 둔해진 까닭에 설명하기 어렵습니다.",
        wen: "Dull of hearing: why growth may not be permitted.",
        wko: "귀가 둔해짐: 성장이 허락되지 않을 수도 있는 까닭.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "4–8",
    scene: "rain",
    art: "3D · R3F — two plots on the headland under the same rain. One drinks it and comes up in green and then golden grain; the other comes up in thorns and thistles, and its end is to be burned.",
    en: {
      title: "Land that drinks the rain",
      quote:
        "“For land that has drunk the rain that often falls on it, and produces a crop useful to those for whose sake it is cultivated, receives a blessing from God.”",
      sref: "Hebrews 6:7",
      cap: "Scene: the same rain on two plots. One bears a crop; the other bears thorns, and is burned.",
      snips: [
        "Those once enlightened, who have tasted the heavenly gift and shared in the Holy Spirit",
        "Who have tasted the goodness of the word of God and the powers of the age to come",
        "And then have fallen away: impossible to restore them again to repentance",
        "Land that drinks the rain and produces a crop receives a blessing from God",
        "If it bears thorns and thistles, its end is to be burned",
      ],
      verses: [
        [
          4,
          "For it is [impossible|impossible], in the case of those who have once been [enlightened|enlightened], who have [gift|tasted the heavenly gift], and have [shared|shared in the Holy Spirit],",
        ],
        [
          5,
          "and have tasted the [goodness|goodness of the word of God] and the [powers|powers of the age to come],",
        ],
        [
          6,
          "and then have [fallen|fallen away], to restore them again to repentance, since they are [crucifying|crucifying once again the Son of God] to their own harm and [contempt|holding him up to contempt].",
        ],
        [
          7,
          "For land that has drunk the rain that often falls on it, and produces a crop useful to those for whose sake it is cultivated, receives a blessing from God.",
        ],
        [
          8,
          "But if it bears thorns and thistles, it is worthless and near to being cursed, and its end is to be burned.",
        ],
      ],
      com: [
        ["h", "What they have experienced"],
        [
          "p",
          "Verse 4 begins with “for”, giving the reason for verse 3. Verses 4–5 describe what believers experience once they have been enlightened by the gospel: they have tasted God’s free gift of grace and new life in Christ, shared personally in the Holy Spirit’s presence and activity, tasted the goodness of God’s word, which brings forgiveness, peace and divine truth, and tasted the powers of the age to come.",
        ],
        [
          "p",
          "The powers of the age to come are the miracles, signs and wonders of God’s future kingdom overriding the physics of this world. The kingdom has not yet come, but we have experienced “specks” of it, as the Bible also witnesses.",
        ],
        ["h", "Then fallen away"],
        [
          "p",
          "Verses 5–6 mean that if anyone is fully exposed to the truth of Jesus and then deliberately walks away from it, they are declaring that Jesus deserved to die and was a fraud. They side with those who wanted him crucified, and his cross becomes a public humiliation rather than our reconciliation with God. Scholars debate the exact meaning, but it comes close to this: because of their hardened hearts, nothing else is left to lead them to repentance.",
        ],
        ["h", "Two kinds of land"],
        [
          "p",
          "Verse 7 also begins with “for”, giving the reason for verse 6. Having spoken of how hard it is for a hardened heart to repent, the author pictures our hearts as land.",
        ],
        [
          "p",
          "In Matthew 13, Mark 4 and Luke 8 Jesus tells of seed scattered on four kinds of ground: the path, rocky ground, thorny ground and good soil. Verses 7–8 look similar, but the story is slightly different. The parable is about how people respond differently to the gospel; here there are two kinds of people who have both been enlightened by the word. Land that drinks the rain and bears a crop is the true believer, who receives God’s blessing. Land that drinks the same rain but bears only thorns is the counterfeit believer, who ends up cursed and burned.",
        ],
      ],
    },
    ko: {
      title: "비를 흡수하는 땅",
      quote:
        "“땅이 자주 내리는 비를 흡수하여 농사짓는 사람에게 유익한 농작물을 내 주면, 그 땅은 하나님께로부터 복을 받습니다.”",
      sref: "히브리서 6:7",
      cap: "장면: 두 밭에 같은 비. 한 밭은 농작물을 내고, 다른 밭은 가시덤불을 내어 불에 탑니다.",
      snips: [
        "한번 빛을 받아서 하늘의 은사를 맛보고, 성령을 나누어 받은 사람들",
        "하나님의 선한 말씀과 장차 올 세상의 권능을 맛본 사람들이",
        "타락하면, 새롭게 해서 회개에 이르게 할 수 없습니다",
        "비를 흡수하여 유익한 농작물을 내 주면, 그 땅은 복을 받습니다",
        "가시덤불과 엉겅퀴를 내면, 마침내는 불에 타고 말 것입니다",
      ],
      verses: [
        [
          4,
          "한번 [enlightened|빛을 받아서] [gift|하늘의 은사를 맛보고], [shared|성령을 나누어 받고], 또",
        ],
        [
          5,
          "하나님의 [goodness|선한 말씀]과 [powers|장차 올 세상의 권능]을 맛본 사람들이",
        ],
        [
          6,
          "[fallen|타락하면], 그들을 새롭게 해서 회개에 이르게 [impossible|할 수 없습니다]. 그런 사람들이야말로 [crucifying|하나님의 아들을 다시금 십자가에 못박고] [contempt|욕되게 하는] 것이기 때문입니다.",
        ],
        [
          7,
          "땅이 자주 내리는 비를 흡수하여 농사짓는 사람에게 유익한 농작물을 내 주면, 그 땅은 하나님께로부터 복을 받습니다.",
        ],
        [
          8,
          "그러나 가시덤불과 엉겅퀴를 내면, 그 땅은 쓸모가 없어지고, 저주를 받아서 마침내는 불에 타고 말 것입니다.",
        ],
      ],
      com: [
        ["h", "그들이 맛본 것"],
        [
          "p",
          "4절은 “왜냐하면”으로 시작하며 3절의 까닭을 밝힙니다. 4–5절은 신자들이 복음으로 빛을 받은 뒤에 겪는 것을 말합니다. 그리스도 안의 은혜와 새 생명이라는 하나님의 값없는 선물을 맛보고, 성령의 임재와 일하심에 몸소 참여하며, 용서와 평안과 하나님의 진리를 가져다주는 선한 말씀을 맛보고, 장차 올 세상의 권능을 맛보는 것입니다.",
        ],
        [
          "p",
          "장차 올 세상의 권능은 이 세상의 물리 법칙을 넘어서는 하나님 나라의 기적과 표징과 놀라운 일입니다. 그 나라는 아직 오지 않았지만, 성경도 증언하듯 우리는 그 나라의 “조각”들을 맛보았습니다.",
        ],
        ["h", "그리고 타락하면"],
        [
          "p",
          "5–6절은, 누군가 예수님의 진리를 온전히 접하고도 일부러 그것을 떠나면, 예수님이 죽어 마땅했고 사기꾼이었다고 선언하는 것이라는 뜻입니다. 그를 십자가에 못박으려던 사람들 편에 서는 것이며, 그분의 십자가는 우리를 하나님과 화목하게 하는 것이 아니라 공개적인 모욕이 됩니다. 학자들은 정확한 뜻을 두고 논쟁하지만, 대체로 이런 뜻에 가깝습니다. 마음이 굳어져서 더 이상 그들을 회개로 이끌 것이 남아 있지 않다는 것입니다.",
        ],
        ["h", "두 가지 땅"],
        [
          "p",
          "7절도 “왜냐하면”으로 시작하며 6절의 까닭을 밝힙니다. 굳어진 마음이 회개하기 어렵다고 말한 저자는, 이제 우리의 마음을 땅에 빗대어 설명합니다.",
        ],
        [
          "p",
          "마태복음 13장, 마가복음 4장, 누가복음 8장에서 예수님은 네 가지 땅, 곧 길가와 돌밭과 가시덤불과 좋은 땅에 뿌려진 씨 이야기를 하십니다. 7–8절이 비슷해 보이지만 이야기는 조금 다릅니다. 그 비유는 사람들이 복음에 어떻게 다르게 반응하는지에 관한 것이고, 여기서는 둘 다 말씀으로 빛을 받은 두 부류의 사람들입니다. 비를 흡수하여 농작물을 내는 땅은 하나님의 복을 받는 참 신자입니다. 같은 비를 받고도 가시덤불만 내는 땅은 거짓 신자이며, 결국 저주를 받아 불에 탑니다.",
        ],
      ],
    },
    words: {
      en: {
        impossible: {
          t: "Impossible",
          g: "adynaton · ἀδύνατον",
          v: "6:4",
          s: "Cannot be done",
          d: "Incapable of being or of occurring; incapable of being done.",
        },
        enlightened: {
          t: "Enlightened",
          g: "phōtisthentas · φωτισθέντας",
          v: "6:4",
          s: "Brought to light",
          d: "To bring to light, shed light upon. Figuratively, to give guidance or understanding, to make something known by revealing it clearly.",
        },
        gift: {
          t: "Tasted the heavenly gift",
          g: "geusamenous tēs dōreas tēs epouraniou · γευσαμένους τῆς δωρεᾶς τῆς ἐπουρανίου",
          v: "6:4",
          s: "Experienced God’s free gift",
          d: "To taste is, metaphorically, to experience, prove, partake of or come to know. The gift is bestowed freely, without price: God’s grace, salvation, new life in Christ.",
        },
        shared: {
          t: "Shared in the Holy Spirit",
          g: "metochous genēthentas pneumatos hagiou · μετόχους γενηθέντας πνεύματος ἁγίου",
          v: "6:4",
          s: "Partakers",
          d: "One who shares with someone else as an associate in an enterprise: a personal partnership in, and direct experience of, the Holy Spirit’s presence and activity.",
        },
        goodness: {
          t: "Goodness of the word of God",
          g: "kalon theou rhēma · καλὸν θεοῦ ῥῆμα",
          v: "6:5",
          s: "The gospel and its promises",
          d: "The gospel, Christian teaching and God’s promises of grace revealed through Jesus Christ. Good, because the word of God brings forgiveness, peace and divine truth.",
        },
        powers: {
          t: "Powers of the age to come",
          g: "dynameis mellontos aiōnos · δυνάμεις μέλλοντος αἰῶνος",
          v: "6:5",
          s: "Specks of the coming kingdom",
          d: "Miracles, signs, wonders and supernatural acts of God’s future kingdom, overriding the physics of this world. The kingdom has not yet come, but we have experienced specks of it.",
        },
        fallen: {
          t: "Fallen away",
          g: "parapesontas · παραπεσόντας",
          v: "6:6",
          s: "Deliberate renunciation",
          d: "To fall away from the realities and facts of the true faith, to defect: a deliberate, total renunciation of the Christian faith in favour of something else.",
        },
        crucifying: {
          t: "Crucifying once again",
          g: "anastaurountas · ἀνασταυροῦντας",
          v: "6:6",
          s: "Agreeing with the world’s verdict",
          d: "Declaring that Jesus deserved to die and siding with those who wanted him crucified; spiritually re-enacting the crucifixion by agreeing with the world’s verdict that Jesus was a fraud.",
        },
        contempt: {
          t: "Holding him up to contempt",
          g: "paradeigmatizontas · παραδειγματίζοντας",
          v: "6:6",
          s: "Public humiliation",
          d: "Publicly humiliating Jesus Christ, signalling that his sacrifice was insufficient.",
        },
      },
      ko: {
        impossible: {
          t: "할 수 없다",
          g: "adynaton · ἀδύνατον",
          v: "6:6",
          s: "이루어질 수 없음",
          d: "있을 수도 일어날 수도 없는, 해낼 수 없는.",
        },
        enlightened: {
          t: "빛을 받다",
          g: "phōtisthentas · φωτισθέντας",
          v: "6:4",
          s: "빛 가운데 드러남",
          d: "빛 가운데로 드러내다, 빛을 비추다. 비유적으로 인도와 깨달음을 주다, 분명히 드러내어 알게 하다.",
        },
        gift: {
          t: "하늘의 은사를 맛보다",
          g: "geusamenous tēs dōreas tēs epouraniou · γευσαμένους τῆς δωρεᾶς τῆς ἐπουρανίου",
          v: "6:4",
          s: "값없는 선물을 겪음",
          d: "맛보다는 비유적으로 겪다, 증명하다, 참여하다, 알게 되다는 뜻입니다. 은사는 값이나 대가 없이 거저 주신 선물, 곧 하나님의 은혜와 구원과 그리스도 안의 새 생명입니다.",
        },
        shared: {
          t: "성령을 나누어 받다",
          g: "metochous genēthentas pneumatos hagiou · μετόχους γενηθέντας πνεύματος ἁγίου",
          v: "6:4",
          s: "함께 참여하는 사람",
          d: "어떤 일에 동업자로서 다른 이와 함께 나누는 사람. 성령의 임재와 일하심에 몸소 참여하고 직접 겪는 것입니다.",
        },
        goodness: {
          t: "하나님의 선한 말씀",
          g: "kalon theou rhēma · καλὸν θεοῦ ῥῆμα",
          v: "6:5",
          s: "복음과 그 약속",
          d: "복음과 그리스도교의 가르침, 그리고 예수 그리스도를 통해 드러난 하나님의 은혜의 약속. 하나님의 말씀은 용서와 평안과 하나님의 진리를 가져다주기에 선합니다.",
        },
        powers: {
          t: "장차 올 세상의 권능",
          g: "dynameis mellontos aiōnos · δυνάμεις μέλλοντος αἰῶνος",
          v: "6:5",
          s: "다가올 나라의 조각",
          d: "이 세상의 물리 법칙을 넘어서는 하나님의 장차 올 나라의 기적과 표징과 놀라운 일. 그 나라는 아직 오지 않았지만 우리는 그 조각들을 맛보았습니다.",
        },
        fallen: {
          t: "타락하다",
          g: "parapesontas · παραπεσόντας",
          v: "6:6",
          s: "일부러 저버림",
          d: "참 믿음의 실재와 사실에서 떨어져 나가다, 등지다. 다른 무언가를 위해 그리스도교 신앙을 일부러 완전히 저버리는 것입니다.",
        },
        crucifying: {
          t: "다시금 십자가에 못박다",
          g: "anastaurountas · ἀνασταυροῦντας",
          v: "6:6",
          s: "세상의 판결에 동의함",
          d: "예수님이 죽어 마땅했다고 선언하며 그를 십자가에 못박으려던 사람들 편에 서는 것. 예수님이 사기꾼이었다는 세상의 판결에 동의하여 영적으로 십자가 처형을 되풀이하는 것입니다.",
        },
        contempt: {
          t: "욕되게 하다",
          g: "paradeigmatizontas · παραδειγματίζοντας",
          v: "6:6",
          s: "공개적인 모욕",
          d: "그분의 희생이 모자랐다는 듯이 예수 그리스도를 공개적으로 모욕하는 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "mat13",
        tag: "NT",
        en: "Matt 13:7–8",
        ko: "마 13:7–8",
        ten: "Other seeds fell among thorns, and the thorns grew up and choked them. Other seeds fell on good soil and produced grain, some a hundredfold, some sixty, some thirty.",
        tko: "또 더러는 가시덤불에 떨어지니, 가시덤불이 자라서 그 기운을 막았다. 그러나 더러는 좋은 땅에 떨어져서 열매를 맺었는데, 어떤 것은 백 배가 되고, 어떤 것은 육십 배가 되고, 어떤 것은 삼십 배가 되었다.",
        wen: "The parable of the soils: similar, but not the same story.",
        wko: "네 가지 땅의 비유: 비슷하지만 같은 이야기는 아님.",
      },
      {
        id: "luk8",
        tag: "NT",
        en: "Luke 8:14",
        ko: "눅 8:14",
        ten: "And as for what fell among the thorns, they are those who hear, but as they go on their way they are choked by the cares and riches and pleasures of life, and their fruit does not mature.",
        tko: "가시덤불에 떨어진 것들은, 말씀을 들었으나, 살아가는 동안에 근심과 재물과 인생의 향락에 사로잡혀서, 열매를 맺는 데에 이르지 못하는 사람들이다.",
        wen: "Thorny ground: they hear, but the fruit never matures.",
        wko: "가시덤불: 듣지만 열매를 맺는 데에 이르지 못함.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "9–12",
    scene: "footsteps",
    art: "3D · R3F — wet sand along the shore. A line of footprints runs ahead toward a figure far down the beach; one by one new prints are pressed into the old, following the ones who went before.",
    en: {
      title: "Imitators of those who inherit",
      quote:
        "“So that you may not be sluggish, but imitators of those who through faith and patience inherit the promises.”",
      sref: "Hebrews 6:12",
      cap: "Scene: new steps pressed into the old prints, following those who went ahead.",
      snips: [
        "In your case, beloved, we feel sure of better things that belong to salvation",
        "God will not overlook your work and love in serving the saints",
        "Show the same earnestness to have the full assurance of hope until the end",
        "Not sluggish, but imitators of those who inherit the promises",
      ],
      verses: [
        [
          9,
          "Though we speak in this way, yet in your case, beloved, we [sure|feel sure] of better things—things that belong to salvation.",
        ],
        [
          10,
          "For God is not unjust so as to overlook your [work|work] and the [love|love] that you have shown for his name in [serving|serving the saints], as you still do.",
        ],
        [
          11,
          "And we desire each one of you to show the same [earnestness|earnestness] to have the full assurance of hope [end|until the end],",
        ],
        [
          12,
          "so that you may not be [sluggish|sluggish], but [imitators|imitators] of those who through faith and [patience|patience] inherit the promises.",
        ],
      ],
      com: [
        ["h", "Better things"],
        [
          "p",
          "After the warning comes compassion. What are the better things that belong to salvation? Verses 10–12 name them: showing love for God by serving, helping and ministering to other believers; holding fast to a confident, resilient hope that does not fade under pressure; and staying on the course of salvation without becoming spiritually dull and indifferent, so as to inherit God’s promise by faith and endurance.",
        ],
        [
          "p",
          "The NLT puts it this way: “He will not forget how hard you have worked for him and how you have shown your love to him by caring for other believers, as you still do. Our great desire is that you will keep on loving others as long as life lasts, in order to make certain that what you hope for will come true.”",
        ],
        ["h", "Not sluggish"],
        [
          "p",
          "These verses show the author’s compassion and encouragement toward the Jewish Christians. The work here is toil and effort, not the works of the law, and the love is agape. His final instruction is not to become sluggish and lazy in faith, but to imitate those who through faith and patience inherit the promises. Those promises are explained in the verses that follow.",
        ],
      ],
    },
    ko: {
      title: "약속을 상속받는 사람들을 본받는 사람",
      quote:
        "“여러분은 게으른 사람이 되지 말고, 믿음과 인내로 약속을 상속받는 사람들을 본받는 사람이 되어야 합니다.”",
      sref: "히브리서 6:12",
      cap: "장면: 앞서간 사람들의 발자국에 새 발걸음이 하나씩 찍힙니다.",
      snips: [
        "사랑하는 여러분, 여러분에게는 구원에 이르게 하는 더 좋은 것들이 있다는 것을 확신합니다",
        "하나님은 여러분이 성도들을 섬긴 행위와 사랑을 잊지 않으십니다",
        "같은 열성을 끝까지 나타내서, 소망을 이루시기 바랍니다",
        "게으른 사람이 되지 말고, 약속을 상속받는 사람들을 본받으십시오",
      ],
      verses: [
        [
          9,
          "사랑하는 여러분, 우리가 이렇게 말하지만, 여러분에게는 구원에 이르게 하는 더 좋은 것들이 있다는 것을 [sure|확신합니다].",
        ],
        [
          10,
          "하나님은 불의하신 분이 아니므로, 여러분의 [work|행위]와 여러분이 하나님의 이름을 위하여 나타낸 [love|사랑]을 잊지 않으십니다. 여러분은 성도들을 [serving|섬겼으며], 또 지금도 섬기고 있습니다.",
        ],
        [
          11,
          "여러분 각 사람은 같은 [earnestness|열성]을 [end|끝까지] 나타내서, 소망을 이루시기 바랍니다.",
        ],
        [
          12,
          "여러분은 [sluggish|게으른] 사람이 되지 말고, 믿음과 [patience|인내]로 약속을 상속받는 사람들을 [imitators|본받는 사람]이 되어야 합니다.",
        ],
      ],
      com: [
        ["h", "더 좋은 것들"],
        [
          "p",
          "경고 뒤에 긍휼이 옵니다. 구원에 이르게 하는 더 좋은 것들이란 무엇입니까? 10–12절이 그것을 말합니다. 다른 신자들을 섬기고 돕고 보살피며 하나님께 사랑을 보이는 것, 압박 속에서도 흐려지지 않는 굳세고 끈질긴 소망을 붙드는 것, 그리고 영적으로 둔해지거나 무관심해지지 않고 구원의 길에 머물러 믿음과 인내로 하나님의 약속을 상속받는 것입니다.",
        ],
        [
          "p",
          "NLT는 이렇게 옮깁니다. “그분은 여러분이 그분을 위해 얼마나 애써 일했는지, 다른 신자들을 돌보며 그분께 사랑을 보였는지를 잊지 않으십니다. 지금도 그렇게 하고 있듯이 말입니다. 우리의 큰 바람은 여러분이 사는 날 동안 계속 다른 사람들을 사랑하여, 여러분이 바라는 것이 반드시 이루어지게 하는 것입니다.”",
        ],
        ["h", "게으르지 말고"],
        [
          "p",
          "이 구절들은 유대인 그리스도인들을 향한 저자의 긍휼과 격려를 보여 줍니다. 여기서 행위는 율법의 행위가 아니라 수고와 애씀이고, 사랑은 아가페입니다. 저자의 마지막 당부는 믿음에 게으르고 나태해지지 말고, 믿음과 인내로 약속을 상속받는 사람들을 본받으라는 것입니다. 그 약속은 이어지는 구절들에서 설명됩니다.",
        ],
      ],
    },
    words: {
      en: {
        sure: {
          t: "Feel sure",
          g: "pepeismetha · πεπείσμεθα",
          v: "6:9",
          s: "Persuaded",
          d: "To be persuaded, to believe.",
        },
        work: {
          t: "Work",
          g: "ergou · ἔργου",
          v: "6:10",
          s: "Toil",
          d: "Toil as an effort or occupation; not the works of the law.",
        },
        love: {
          t: "Love",
          g: "agapēs · ἀγάπης",
          v: "6:10",
          s: "Agape",
          d: "Unconditional, sacrificial love: supremely the love that God is, that he showed us, and that he enables in his believers.",
        },
        serving: {
          t: "Serving the saints",
          g: "diakonēsantes · διακονήσαντες",
          v: "6:10",
          s: "Caring for their needs",
          d: "To minister, to serve, to wait on; to care for someone’s needs by performing a service. NLT: “by caring for other believers.”",
        },
        earnestness: {
          t: "Earnestness",
          g: "spoudēn · σπουδήν",
          v: "6:11",
          s: "Eager haste",
          d: "Eagerness, willingness; the quick movement or haste that goes with eager interest.",
        },
        end: {
          t: "Until the end",
          g: "achri telous · ἄχρι τέλους",
          v: "6:11",
          s: "To the goal",
          d: "To the goal. NLT: “as long as life lasts.”",
        },
        sluggish: {
          t: "Sluggish",
          g: "nōthroi · νωθροί",
          v: "6:12",
          s: "Slow, numbed",
          d: "Slow, numbed in mind and ears, lazy. The same word as “dull of hearing” in 5:11.",
        },
        imitators: {
          t: "Imitators",
          g: "mimētai · μιμηταί",
          v: "6:12",
          s: "One who does what others do",
          d: "To copy or imitate someone’s behaviour, to mime; one who does what others do.",
        },
        patience: {
          t: "Patience",
          g: "makrothymias · μακροθυμίας",
          v: "6:12",
          s: "Calm under provocation",
          d: "Calm or quietness in the face of provocation, misfortune or unfavourable circumstances; to be wronged and not retaliate.",
        },
      },
      ko: {
        sure: {
          t: "확신하다",
          g: "pepeismetha · πεπείσμεθα",
          v: "6:9",
          s: "설득됨",
          d: "설득되다, 믿다.",
        },
        work: {
          t: "행위",
          g: "ergou · ἔργου",
          v: "6:10",
          s: "수고",
          d: "애씀이나 일로서의 수고. 율법의 행위가 아닙니다.",
        },
        love: {
          t: "사랑",
          g: "agapēs · ἀγάπης",
          v: "6:10",
          s: "아가페",
          d: "조건 없고 희생하는 사랑. 무엇보다 하나님 자신이신 사랑, 우리에게 보이신 사랑, 그리고 신자들이 할 수 있게 하시는 사랑입니다.",
        },
        serving: {
          t: "섬기다",
          g: "diakonēsantes · διακονήσαντες",
          v: "6:10",
          s: "필요를 돌봄",
          d: "섬기다, 시중들다. 봉사하여 다른 사람의 필요를 돌보는 것입니다. NLT: “다른 신자들을 돌보며.”",
        },
        earnestness: {
          t: "열성",
          g: "spoudēn · σπουδήν",
          v: "6:11",
          s: "간절한 서두름",
          d: "간절함, 기꺼움. 간절한 관심에 따르는 재빠른 움직임과 서두름.",
        },
        end: {
          t: "끝까지",
          g: "achri telous · ἄχρι τέλους",
          v: "6:11",
          s: "목표까지",
          d: "목표까지. NLT: “사는 날 동안.”",
        },
        sluggish: {
          t: "게으른",
          g: "nōthroi · νωθροί",
          v: "6:12",
          s: "느리고 무딤",
          d: "느리다, 마음과 귀가 무디다, 게으르다. 5:11의 “귀가 둔해진”과 같은 말입니다.",
        },
        imitators: {
          t: "본받는 사람",
          g: "mimētai · μιμηταί",
          v: "6:12",
          s: "남이 하는 대로 하는 사람",
          d: "다른 사람의 행동을 따라 하거나 본뜨다. 남이 하는 대로 하는 사람입니다.",
        },
        patience: {
          t: "인내",
          g: "makrothymias · μακροθυμίας",
          v: "6:12",
          s: "도발 앞의 잠잠함",
          d: "도발이나 불행이나 어려운 형편 앞에서도 잠잠하고 고요함. 부당한 일을 당하고도 갚지 않는 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb5-11b",
        tag: "NT",
        en: "Heb 5:11",
        ko: "히 5:11",
        ten: "About this we have much to say, and it is hard to explain, since you have become dull of hearing.",
        tko: "멜기세덱에 관하여는 할 말이 많이 있지만, 여러분의 귀가 둔해진 까닭에 설명하기 어렵습니다.",
        wen: "The same word: sluggish, dull of hearing.",
        wko: "같은 말: 게으른, 귀가 둔해진.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "13–15",
    scene: "oath",
    art: "3D · R3F — night on the seashore. Abraham stands alone at the water’s edge; overhead the stars come out until they cannot be counted, and the sand at his feet glints with as many grains.",
    en: {
      title: "He swore by himself",
      quote: "“Surely I will bless you and multiply you.”",
      sref: "Hebrews 6:14",
      cap: "Scene: Abraham under the stars of heaven, on the sand of the seashore.",
      snips: [
        "With no one greater to swear by, God swore by himself",
        "“Surely I will bless you and multiply you”",
        "Having patiently waited, Abraham obtained the promise",
      ],
      verses: [
        [
          13,
          "For when God made a promise to Abraham, since he had no one greater by whom to swear, he [swore|swore by himself],",
        ],
        [14, "saying, “[bless|Surely I will bless you and multiply you].”"],
        [
          15,
          "And thus Abraham, [waited|having patiently waited], obtained the promise.",
        ],
      ],
      com: [
        ["h", "Genesis 22"],
        [
          "p",
          "Genesis 22 is the scene where God tested Abraham, telling him to offer Isaac as a burnt offering in the region of Moriah. As Abraham took the knife to slay his son, the angel of the LORD stopped him, and he offered instead a ram caught nearby. Then the angel said: “By myself I have sworn, declares the LORD, because you have done this and have not withheld your son, your only son, I will surely bless you, and I will surely multiply your offspring as the stars of heaven and as the sand that is on the seashore.”",
        ],
        ["h", "An example to imitate"],
        [
          "p",
          "This was not the first time Abraham showed his faith in God, but the author uses this scene because here God swears by himself that he will bless Abraham. Abraham showed the faith and patience of verse 12, so the author holds him up as an example to imitate, so that the readers too may inherit the promises as Abraham did.",
        ],
        [
          "p",
          "It also shows that receiving the promise still stands for every believer, because God swore by himself that it would be given.",
        ],
      ],
    },
    ko: {
      title: "자기를 두고 맹세하시고",
      quote:
        "“내가 반드시 너에게 복을 주고 복을 줄 것이며, 너를 번성하게 하고 번성하게 하겠다.”",
      sref: "히브리서 6:14",
      cap: "장면: 하늘의 별 아래, 바닷가의 모래 위에 선 아브라함.",
      snips: [
        "자기보다 더 큰 분이 계시지 아니하므로, 자기를 두고 맹세하셨습니다",
        "“내가 반드시 너에게 복을 주고, 너를 번성하게 하겠다”",
        "아브라함은 오래 참은 끝에 그 약속을 받았습니다",
      ],
      verses: [
        [
          13,
          "하나님께서는 아브라함에게 약속하실 때에, 자기보다 더 큰 분이 계시지 아니하므로, [swore|자기를 두고 맹세하시고서],",
        ],
        [
          14,
          "말씀하시기를 “[bless|내가 반드시 너에게 복을 주고 복을 줄 것이며, 너를 번성하게 하고 번성하게 하겠다]” 하셨습니다.",
        ],
        [
          15,
          "그리하여 아브라함은 [waited|오래 참은] 끝에 그 약속을 받은 것입니다.",
        ],
      ],
      com: [
        ["h", "창세기 22장"],
        [
          "p",
          "창세기 22장은 하나님께서 아브라함을 시험하시어 모리아 땅에서 이삭을 번제물로 바치라고 하신 장면입니다. 아브라함이 칼을 들어 아들을 잡으려 할 때, 주님의 천사가 그를 멈추게 했고, 그는 근처에서 찾은 숫양을 대신 바쳤습니다. 그때 천사가 말했습니다. “주님의 말씀이다. 내가 친히 맹세한다. 네가 이렇게 너의 아들까지, 너의 외아들까지 아끼지 않았으니, 내가 반드시 너에게 큰 복을 주며, 너의 자손이 크게 불어나서, 하늘의 별처럼, 바닷가의 모래처럼 많아지게 하겠다.”",
        ],
        ["h", "본받을 본보기"],
        [
          "p",
          "아브라함이 하나님께 믿음을 보인 것은 이때가 처음이 아니지만, 저자가 이 장면을 쓰는 것은 여기서 하나님께서 아브라함에게 복을 주시겠다고 자기를 두고 맹세하시기 때문입니다. 아브라함은 12절의 믿음과 인내를 보였기에, 저자는 독자들도 아브라함처럼 약속을 상속받도록 그를 본받을 본보기로 내세웁니다.",
        ],
        [
          "p",
          "이것은 또한 약속을 받는 일이 모든 신자에게 여전히 유효하다는 것을 보여 줍니다. 하나님께서 그것을 주시겠다고 자기를 두고 맹세하셨기 때문입니다.",
        ],
      ],
    },
    words: {
      en: {
        swore: {
          t: "Swore by himself",
          g: "ōmosen kath’ heautou · ὤμοσεν καθ’ ἑαυτοῦ",
          v: "6:13",
          s: "God validating his own word",
          d: "To swear is to affirm the truth of a statement by calling on a divine being to execute sanctions if it is not true. Here, with no one greater, God himself validates his statement.",
        },
        bless: {
          t: "Surely I will bless you",
          g: "eulogōn eulogēsō se kai plēthynōn plēthynō se · εὐλογῶν εὐλογήσω σε καὶ πληθύνων πληθυνῶ σε",
          v: "6:14",
          s: "Genesis 22:17",
          d: "The promise sworn on Mount Moriah: “I will surely multiply your offspring as the stars of heaven and as the sand that is on the seashore.”",
        },
        waited: {
          t: "Patiently waited",
          g: "makrothymēsas · μακροθυμήσας",
          v: "6:15",
          s: "Faith and patience",
          d: "The verb behind the patience of verse 12. Abraham showed the faith and patience the readers are to imitate.",
        },
      },
      ko: {
        swore: {
          t: "자기를 두고 맹세하다",
          g: "ōmosen kath’ heautou · ὤμοσεν καθ’ ἑαυτοῦ",
          v: "6:13",
          s: "스스로 말씀을 보증하심",
          d: "맹세는 말한 것이 참이 아니면 신적 존재가 벌을 내리기를 청하며 그 말이 참임을 단언하는 것입니다. 여기서는 더 큰 분이 없으므로 하나님께서 친히 그 말씀을 보증하십니다.",
        },
        bless: {
          t: "반드시 너에게 복을 주다",
          g: "eulogōn eulogēsō se kai plēthynōn plēthynō se · εὐλογῶν εὐλογήσω σε καὶ πληθύνων πληθυνῶ σε",
          v: "6:14",
          s: "창세기 22:17",
          d: "모리아 산에서 맹세하신 약속: “너의 자손이 크게 불어나서, 하늘의 별처럼, 바닷가의 모래처럼 많아지게 하겠다.”",
        },
        waited: {
          t: "오래 참다",
          g: "makrothymēsas · μακροθυμήσας",
          v: "6:15",
          s: "믿음과 인내",
          d: "12절의 인내와 같은 뿌리의 동사. 아브라함은 독자들이 본받아야 할 믿음과 인내를 보였습니다.",
        },
      },
    },
    chips: [
      {
        id: "gen22-16",
        tag: "OT",
        en: "Gen 22:16",
        ko: "창 22:16",
        ten: "and said, “By myself I have sworn, declares the LORD, because you have done this and have not withheld your son, your only son,",
        tko: "말하였다. “주님의 말씀이다. 내가 친히 맹세한다. 네가 이렇게 너의 아들까지, 너의 외아들까지 아끼지 않았으니,",
        wen: "God swears by himself on Mount Moriah.",
        wko: "모리아 산에서 하나님께서 친히 맹세하심.",
      },
      {
        id: "gen22-17",
        tag: "OT",
        en: "Gen 22:17",
        ko: "창 22:17",
        ten: "I will surely bless you, and I will surely multiply your offspring as the stars of heaven and as the sand that is on the seashore. And your offspring shall possess the gate of his enemies,",
        tko: "내가 반드시 너에게 큰 복을 주며, 너의 자손이 크게 불어나서, 하늘의 별처럼, 바닷가의 모래처럼 많아지게 하겠다. 너의 자손은 원수의 성을 차지할 것이다.",
        wen: "The promise quoted in verse 14.",
        wko: "14절에 인용된 약속.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "16–20",
    scene: "anchor",
    art: "3D · R3F — beneath a storm swell. The boat above pitches on the waves, but its line runs down taut through the green water to an anchor that has gone in behind a curtain, where the light is.",
    en: {
      title: "An anchor of the soul",
      quote:
        "“We have this as a sure and steadfast anchor of the soul, a hope that enters into the inner place behind the curtain.”",
      sref: "Hebrews 6:19",
      cap: "Scene: the boat pitches on the swell, but the anchor holds behind the curtain.",
      snips: [
        "People swear by something greater; an oath is final for confirmation",
        "God guaranteed the unchangeable character of his purpose with an oath",
        "Two unchangeable things, in which it is impossible for God to lie",
        "A sure and steadfast anchor of the soul, entering behind the curtain",
        "Jesus has gone as a forerunner, a high priest forever",
      ],
      verses: [
        [
          16,
          "For people swear by something greater than themselves, and in all their disputes an [oath|oath] is final for confirmation.",
        ],
        [
          17,
          "So when God desired to show more convincingly to the heirs of the promise the unchangeable character of his purpose, he guaranteed it with an oath,",
        ],
        [
          18,
          "so that by [unchangeable|two unchangeable things], in which it is impossible for God to lie, we who have fled for refuge might have strong encouragement to hold fast to the hope set before us.",
        ],
        [
          19,
          "We have this as a [sure|sure] and [steadfast|steadfast] [anchor|anchor of the soul], a hope that enters into the [curtain|inner place behind the curtain],",
        ],
        [
          20,
          "where Jesus has gone as a [forerunner|forerunner] on our behalf, having become a high priest forever after the order of Melchizedek.",
        ],
      ],
      com: [
        ["h", "Promise and oath"],
        [
          "p",
          "The NLT reads: “God also bound himself with an oath, so that those who received the promise could be perfectly sure that he would never change his mind. So God has given both his promise and his oath. These two things are unchangeable because it is impossible for God to lie.” The author is giving evidence that the hope set before the readers is absolutely true. By holding on to it, the promises God gave are still valid for people now, because he swore and guaranteed them with an oath.",
        ],
        ["h", "An anchor of the soul"],
        [
          "p",
          "“We have this” refers to the promises God has given us. They act as an everlasting, secure and guaranteed hope that will never disappear, an anchor that gives the believer support and safety to stand firm in the face of temptations and difficulties.",
        ],
        ["h", "Behind the curtain"],
        [
          "p",
          "The inner place is the Most Holy Place in the tabernacle, where the high priest offered blood and incense once a year. A high priest could even be killed if he did not follow God’s instructions precisely (Lev 16); chapter 9 explains more. Jesus entered the Most Holy Place, and rather than coming out like the earthly high priests, he remained inside as an anchor of hope. No more blood and incense is required, because of his offering: his body and his blood.",
        ],
        ["h", "Forerunner"],
        [
          "p",
          "Although Jesus came many years after the first instructions to the high priests, he is the forerunner, so we can only follow him. Only Levitical high priests could enter that place, but they could not be forerunners because of their weaknesses and flaws. Jesus received a priesthood that is not of human making but divine, after the order of Melchizedek (5:6–10), and with that appointment he was able to go ahead of us.",
        ],
      ],
    },
    ko: {
      title: "영혼의 닻",
      quote:
        "“우리에게는 이 소망이 있으니, 그것은 안전하고 확실한 영혼의 닻과 같아서, 휘장 안에까지 들어가게 해 줍니다.”",
      sref: "히브리서 6:19",
      cap: "장면: 배는 너울에 흔들려도, 닻은 휘장 안에서 붙잡고 있습니다.",
      snips: [
        "사람들은 더 위대한 이를 두고서 맹세하며, 맹세는 확정을 지어줍니다",
        "하나님께서는 뜻이 변하지 않음을 맹세로써 보증하여 주셨습니다",
        "두 가지 변할 수 없는 사실, 하나님께서는 거짓말을 하실 수 없습니다",
        "안전하고 확실한 영혼의 닻, 휘장 안에까지 들어가게 해 줍니다",
        "예수께서는 앞서서 달려가신 분으로서, 영원히 대제사장이 되셨습니다",
      ],
      verses: [
        [
          16,
          "사람들은 자기보다 더 위대한 이를 두고서 맹세합니다. 그런데 [oath|맹세]는 그들에게 모든 논쟁을 그치게 하여 주고, 확정을 지어줍니다.",
        ],
        [
          17,
          "그래서 하나님께서는, 그 약속을 상속받는 사람들에게 하나님의 뜻이 변하지 않는다는 것을 더욱 환히 나타내 보이시려고, 맹세로써 보증하여 주셨습니다.",
        ],
        [
          18,
          "이는 앞에 놓인 소망을 붙잡으려고 세상에서 피하여 나온 사람들인 우리가, 이 [unchangeable|두 가지 변할 수 없는 사실] 곧 하나님의 약속과 맹세를 의지하여 큰 위로를 받게 하려는 것입니다. 하나님께서는 약속하시고 맹세하실 때에 거짓말을 하실 수 없습니다.",
        ],
        [
          19,
          "우리에게는 이 소망이 있으니, 그것은 [sure|안전하고] [steadfast|확실한] 영혼의 [anchor|닻]과 같아서, [curtain|휘장 안]에까지 들어가게 해 줍니다.",
        ],
        [
          20,
          "예수께서는 [forerunner|앞서서 달려가신 분]으로서, 우리를 위하여 거기에 들어가셔서, 멜기세덱의 계통을 따라 영원히 대제사장이 되셨습니다.",
        ],
      ],
      com: [
        ["h", "약속과 맹세"],
        [
          "p",
          "NLT는 이렇게 옮깁니다. “하나님께서는 맹세로도 자신을 매어, 약속을 받은 사람들이 그분이 결코 마음을 바꾸지 않으실 것을 완전히 확신하게 하셨습니다. 그래서 하나님께서는 약속과 맹세를 둘 다 주셨습니다. 하나님은 거짓말을 하실 수 없으므로 이 두 가지는 변할 수 없습니다.” 저자는 독자들 앞에 놓인 소망이 틀림없이 참되다는 증거를 내놓습니다. 그것을 붙들면, 하나님께서 맹세로 보증하셨기에 그분이 주신 약속은 지금 사람들에게도 여전히 유효합니다.",
        ],
        ["h", "영혼의 닻"],
        [
          "p",
          "“우리에게는 이 소망이 있으니”는 하나님께서 우리에게 주신 약속을 가리킵니다. 그 약속은 결코 사라지지 않는 영원하고 안전하며 보증된 소망이며, 신자가 시험과 어려움 앞에서 굳게 서도록 붙들어 주고 지켜 주는 닻입니다.",
        ],
        ["h", "휘장 안"],
        [
          "p",
          "휘장 안은 성막의 지성소입니다. 그곳에서 대제사장은 해마다 한 번 피와 향을 드렸습니다. 대제사장이라도 하나님의 지시를 정확히 따르지 않으면 죽을 수 있었습니다(레 16장). 9장에서 더 설명합니다. 예수님은 지성소에 들어가셨고, 땅의 대제사장들처럼 나오시지 않고 소망의 닻으로 그 안에 머무르셨습니다. 그분의 드리심, 곧 그분의 몸과 피 때문에 더 이상 피와 향이 필요하지 않습니다.",
        ],
        ["h", "앞서서 달려가신 분"],
        [
          "p",
          "예수님은 대제사장들에게 처음 지시가 주어진 때로부터 오랜 뒤에 오셨지만, 앞서서 달려가신 분이시기에 우리는 그분을 따를 뿐입니다. 레위 계통의 대제사장만 그곳에 들어갈 수 있었지만, 그들은 연약함과 허물 때문에 앞서서 달려가는 분이 될 수 없었습니다. 예수님은 사람이 만든 것이 아니라 하나님께서 주신, 멜기세덱의 계통을 따른 제사장 직분을 받으셨고(5:6–10), 그 임명으로 우리보다 앞서 가실 수 있었습니다.",
        ],
      ],
    },
    words: {
      en: {
        oath: {
          t: "Oath",
          g: "horkos · ὅρκος",
          v: "6:16",
          s: "Solemn attestation",
          d: "A solemn statement used to validate a promise; a solemn attestation of the truth, a pledge affirming that what is said is absolutely true.",
        },
        unchangeable: {
          t: "Two unchangeable things",
          g: "dyo pragmatōn ametathetōn · δύο πραγμάτων ἀμεταθέτων",
          v: "6:18",
          s: "The promise and the oath",
          d: "God has given both his promise and his oath. They cannot change, because it is impossible for God to lie.",
        },
        sure: {
          t: "Sure",
          g: "asphalē · ἀσφαλῆ",
          v: "6:19",
          s: "Safe from loss",
          d: "Certain, secure; emphasises safety from loss.",
        },
        steadfast: {
          t: "Steadfast",
          g: "bebaian · βεβαίαν",
          v: "6:19",
          s: "Firm, guaranteed",
          d: "Firm, stable, reliable, guaranteed.",
        },
        anchor: {
          t: "Anchor of the soul",
          g: "ankyran tēs psychēs · ἄγκυραν τῆς ψυχῆς",
          v: "6:19",
          s: "Security, support, safeguard",
          d: "Used figuratively for security, support and safeguard: the hope generated by faith in the gospel, enabling believers to stand firm in the face of temptations and difficulties.",
        },
        curtain: {
          t: "Behind the curtain",
          g: "to esōteron tou katapetasmatos · τὸ ἐσώτερον τοῦ καταπετάσματος",
          v: "6:19",
          s: "The Most Holy Place",
          d: "The veil of the tabernacle or temple that separated the Most Holy Place from the Holy Place. Jesus went in and remained there as an anchor of hope.",
        },
        forerunner: {
          t: "Forerunner",
          g: "prodromos · πρόδρομος",
          v: "6:20",
          s: "One who goes ahead",
          d: "One who goes on ahead to prepare the way; a scout sent out to explore an area and bring back information.",
        },
      },
      ko: {
        oath: {
          t: "맹세",
          g: "horkos · ὅρκος",
          v: "6:16",
          s: "엄숙한 증언",
          d: "약속을 보증하는 엄숙한 진술. 진리에 대한 엄숙한 증언이며, 말한 것이 틀림없이 참임을 단언하는 서약입니다.",
        },
        unchangeable: {
          t: "두 가지 변할 수 없는 사실",
          g: "dyo pragmatōn ametathetōn · δύο πραγμάτων ἀμεταθέτων",
          v: "6:18",
          s: "약속과 맹세",
          d: "하나님께서는 약속과 맹세를 둘 다 주셨습니다. 하나님은 거짓말을 하실 수 없으므로 그 둘은 변할 수 없습니다.",
        },
        sure: {
          t: "안전한",
          g: "asphalē · ἀσφαλῆ",
          v: "6:19",
          s: "잃을 염려 없음",
          d: "확실하고 안전한. 잃어버릴 염려가 없음을 강조합니다.",
        },
        steadfast: {
          t: "확실한",
          g: "bebaian · βεβαίαν",
          v: "6:19",
          s: "굳고 보증된",
          d: "굳은, 흔들리지 않는, 믿을 만한, 보증된.",
        },
        anchor: {
          t: "영혼의 닻",
          g: "ankyran tēs psychēs · ἄγκυραν τῆς ψυχῆς",
          v: "6:19",
          s: "안전, 버팀, 보호",
          d: "비유적으로 안전과 버팀과 보호. 복음을 믿는 믿음에서 나오는 소망으로, 신자가 시험과 어려움 앞에서 굳게 서게 합니다.",
        },
        curtain: {
          t: "휘장 안",
          g: "to esōteron tou katapetasmatos · τὸ ἐσώτερον τοῦ καταπετάσματος",
          v: "6:19",
          s: "지성소",
          d: "성막이나 성전에서 지성소와 성소를 갈라놓던 휘장. 예수님은 그 안에 들어가셔서 소망의 닻으로 머무르셨습니다.",
        },
        forerunner: {
          t: "앞서서 달려가신 분",
          g: "prodromos · πρόδρομος",
          v: "6:20",
          s: "앞서가는 사람",
          d: "길을 준비하려고 앞서가는 사람. 어떤 지역을 살피고 정보를 얻으려고 먼저 보낸 정찰병입니다.",
        },
      },
    },
    chips: [
      {
        id: "lev16",
        tag: "OT",
        en: "Lev 16:1",
        ko: "레 16:1",
        ten: "The LORD spoke to Moses after the death of the two sons of Aaron, when they drew near before the LORD and died,",
        tko: "아론의 두 아들이 주님 앞에 가까이 갔다가 죽은 일이 있다. 그들이 그렇게 죽은 뒤에, 주님께서 모세에게 말씀하셨다.",
        wen: "Drawing near behind the curtain was deadly for the earthly priests.",
        wko: "땅의 제사장들에게 휘장 안으로 가까이 가는 것은 목숨이 걸린 일이었음.",
      },
      {
        id: "ps110",
        tag: "OT",
        en: "Ps 110:4",
        ko: "시 110:4",
        ten: "The LORD has sworn and will not change his mind, “You are a priest forever after the order of Melchizedek.”",
        tko: "주님께서 맹세하시기를 “너는 멜기세덱을 따른 영원한 제사장이다” 하셨으니, 그 뜻을 바꾸지 않으실 것입니다.",
        wen: "Another oath God will not change: a priest forever.",
        wko: "하나님께서 바꾸지 않으실 또 하나의 맹세: 영원한 제사장.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "A warning",
        items: [
          [
            "vv1–3",
            "Leave the elementary doctrine of Christ and go on to maturity, not laying the foundation again; and this we will do if God permits.",
          ],
          [
            "vv4–8",
            "Those once enlightened who then fall away cannot be restored to repentance. Land that drinks the rain and bears a crop is blessed; land that bears thorns is burned.",
          ],
        ],
      },
      {
        h: "An assurance",
        items: [
          [
            "vv9–12",
            "The author is sure of better things for them. God will not forget their love in serving the saints; they are to be imitators of those who inherit the promises.",
          ],
          [
            "vv13–15",
            "With no one greater to swear by, God swore by himself to Abraham, and Abraham, having patiently waited, obtained the promise.",
          ],
          [
            "vv16–20",
            "By promise and oath, two unchangeable things, we have a sure and steadfast anchor of the soul, entering behind the curtain where Jesus has gone ahead.",
          ],
        ],
      },
    ],
    intentH: "The author’s intention",
    intentShort:
      "To move the readers from the elementary teachings to maturity, and to assure them that the promise God swore to Abraham still stands for everyone who believes.",
    intent: [
      "The author encourages the readers to move from elementary teachings to maturity, hoping that God will permit it. Some people, when they are blessed, fully believe the word and receive the blessings God promised; others, blessed the same, decide not to believe it and end up cursed.",
      "The author is confident in faith that the readers will not be like the latter, because they have kept showing love toward God by working hard, loving and ministering to the believers. This, he assures them, is the path to receiving the promises God gave to Abraham as a result of his faith and patience. God swore by himself with an oath that the promises will be given, and they are still valid for anyone who believes.",
    ],
  },
  ko: {
    groups: [
      {
        h: "경고",
        items: [
          [
            "1–3절",
            "그리스도교의 초보적 교리를 제쳐놓고 성숙한 경지로 나아가며, 다시 기초를 놓지 말아야 합니다. 하나님께서 허락하시면 그렇게 할 수 있습니다.",
          ],
          [
            "4–8절",
            "한번 빛을 받고 타락한 사람들은 새롭게 해서 회개에 이르게 할 수 없습니다. 비를 흡수하여 농작물을 내는 땅은 복을 받고, 가시덤불을 내는 땅은 불에 탑니다.",
          ],
        ],
      },
      {
        h: "확신",
        items: [
          [
            "9–12절",
            "저자는 그들에게 더 좋은 것들이 있음을 확신합니다. 하나님은 성도를 섬긴 그들의 사랑을 잊지 않으시며, 그들은 약속을 상속받는 사람들을 본받아야 합니다.",
          ],
          [
            "13–15절",
            "더 큰 분이 없으므로 하나님께서는 자기를 두고 아브라함에게 맹세하셨고, 아브라함은 오래 참은 끝에 약속을 받았습니다.",
          ],
          [
            "16–20절",
            "약속과 맹세, 이 두 가지 변할 수 없는 사실로 우리에게는 안전하고 확실한 영혼의 닻이 있습니다. 그 닻은 예수께서 앞서 들어가신 휘장 안에까지 들어갑니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "독자들을 초보적 가르침에서 성숙으로 나아가게 하고, 하나님께서 아브라함에게 맹세하신 약속이 믿는 모든 사람에게 여전히 유효하다는 것을 확신시키는 것.",
    intent: [
      "저자는 하나님께서 허락하시기를 바라며, 독자들이 초보적 가르침에서 성숙으로 나아가도록 격려합니다. 어떤 사람들은 복을 받을 때 말씀을 온전히 믿어 하나님께서 약속하신 복을 받지만, 다른 사람들은 똑같이 복을 받고도 말씀을 믿지 않기로 하여 결국 저주를 받습니다.",
      "저자는 독자들이 후자와 같지 않으리라고 믿음으로 확신합니다. 그들은 애써 일하고 사랑하며 신자들을 섬겨 하나님을 향한 사랑을 계속 보여 왔기 때문입니다. 저자는 이것이 아브라함이 믿음과 인내로 받은 하나님의 약속을 받는 길이라고 확신시킵니다. 하나님께서는 그 약속을 주시겠다고 자기를 두고 맹세로 보증하셨고, 그 약속은 믿는 누구에게나 여전히 유효합니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 6",
    tagline: "“We have this as a sure and steadfast anchor of the soul.”",
    taglineRef: "Hebrews 6:19",
    mapTitle: "Twenty verses, five movements",
    mapIntro:
      "Go on to maturity. Land that drinks the rain bears a crop or thorns. Then assurance: imitate those who inherit the promises, for God swore by himself to Abraham, and our hope is an anchor that holds behind the curtain.",
    summaryTitle: "What Hebrews 6 says",
    footQuote:
      "“We have this as a sure and steadfast anchor of the soul, a hope that enters into the inner place behind the curtain.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 6장",
    tagline: "“그것은 안전하고 확실한 영혼의 닻과 같아서”",
    taglineRef: "히브리서 6:19",
    mapTitle: "스무 절, 다섯 흐름",
    mapIntro:
      "성숙한 경지로 나아갑시다. 비를 흡수한 땅은 농작물을 내거나 가시덤불을 냅니다. 그리고 확신: 약속을 상속받는 사람들을 본받으십시오. 하나님께서 자기를 두고 아브라함에게 맹세하셨고, 우리의 소망은 휘장 안에서 붙잡는 닻입니다.",
    summaryTitle: "히브리서 6장이 말하는 것",
    footQuote:
      "“우리에게는 이 소망이 있으니, 그것은 안전하고 확실한 영혼의 닻과 같아서, 휘장 안에까지 들어가게 해 줍니다.”",
    version: "새번역",
  },
};

export const chapter6: ChapterContent = {
  number: 6,
  setting: "coast",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
