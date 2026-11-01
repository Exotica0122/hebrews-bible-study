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
    scene: "offering",
    art: "3D · R3F — inside the Holy Place by lamplight. The high priest stands at the altar: smoke rises first for his own sins, then a wider plume for the people waiting behind him.",
    en: {
      title: "Chosen from among men",
      quote:
        "“For every high priest chosen from among men is appointed to act on behalf of men in relation to God.”",
      sref: "Hebrews 5:1",
      cap: "Scene: the high priest offers first for himself, then for the people.",
      snips: [
        "Every high priest is chosen from among men to offer gifts and sacrifices for sins",
        "He can deal gently with the ignorant and wayward",
        "He offers for his own sins as for the people’s",
        "No one takes this honor for himself, but only when called by God",
      ],
      verses: [
        [
          1,
          "For every high priest chosen from among men is appointed to act on behalf of men in relation to God, to offer [gifts|gifts] and [sacrifices|sacrifices] for sins.",
        ],
        [
          2,
          "He can deal gently with the [ignorant|ignorant] and [wayward|wayward], since he himself is beset with [weakness|weakness].",
        ],
        [
          3,
          "Because of this he is obligated to offer sacrifice for his own sins just as he does for those of the people.",
        ],
        [
          4,
          "And no one takes this [honor|honor] for himself, but only when [called|called by God], just as Aaron was.",
        ],
      ],
      com: [
        ["h", "Aaron and the Levitical priesthood"],
        [
          "p",
          "Exodus 25–27 records the building of the tabernacle, where God dwelt among the Israelites. In chapter 28 God appoints Aaron, of the tribe of Levi, and his sons as priests. Leviticus 8 is their ordination: the ceremony that set them apart, consecrated them and authorised them to serve. From then on Aaron and his descendants served as priests and high priests for Israel, the Levitical priesthood.",
        ],
        ["h", "Gifts and sacrifices"],
        [
          "p",
          "Gifts were offered as thanksgiving; sacrifices were offered in repentance, to seek forgiveness. The NLT puts it plainly: “He presents their gifts to God and offers sacrifices for their sins.”",
        ],
        [
          "q",
          "What the high priest offered: the burnt offering, gift and sacrifice (Lev 1; 3:8–13); the grain offering, a gift (Lev 2; 6:14–18); the peace offering, a gift (Lev 3; 7:11–34); the sin offering, a sacrifice (Lev 4:1–5:13); the guilt offering, a sacrifice (Lev 5:14–6:7); his personal daily grain offering (Lev 6:19–23); the daily incense offering (Exod 30:7–8); and once a year, the Day of Atonement (Lev 16).",
        ],
        ["h", "The ignorant and the wayward"],
        [
          "p",
          "The ignorant are those who stumble or wander off course through spiritual weakness, blindness or lack of understanding. They do not rebel against God on purpose; they keep making mistakes because they lack discernment. The wayward are those who deliberately turn aside: they know better, or resist guidance, and leave the right path out of defiance or stubbornness.",
        ],
        [
          "p",
          "A high priest chosen from among men could deal gently with both, because he himself was beset with weakness. That same weakness meant he had to offer sacrifice for his own sins before he offered for the people.",
        ],
        ["h", "Called by God"],
        [
          "p",
          "Honor here is the worth ascribed to a person. No one could take it for himself. The high priest was appointed by God, not by his own ambition or desire, just as Aaron was.",
        ],
      ],
    },
    ko: {
      title: "사람들 가운데서 뽑혀서",
      quote:
        "“각 대제사장은 사람들 가운데서 뽑혀서 하나님과 관계되는 일에 임명받습니다.”",
      sref: "히브리서 5:1",
      cap: "장면: 대제사장이 먼저 자기를 위하여, 그다음 백성을 위하여 드립니다.",
      snips: [
        "각 대제사장은 사람들 가운데서 뽑혀서 예물과 속죄의 희생 제사를 드립니다",
        "그릇된 길을 가는 무지한 사람들을 너그러이 대할 수 있습니다",
        "백성을 위해서와 마찬가지로 자기 자신을 위해서도 드려야 합니다",
        "이 영예는 하나님의 부르심을 받아서 얻는 것입니다",
      ],
      verses: [
        [
          1,
          "각 대제사장은 사람들 가운데서 뽑혀서 하나님과 관계되는 일에 임명받습니다. 그리하여 그는 사람들을 위하여 [gifts|예물]과 [sacrifices|속죄의 희생 제사]를 드립니다.",
        ],
        [
          2,
          "그는 자기도 [weakness|연약함]에 휘말려 있으므로, [wayward|그릇된 길을 가는] [ignorant|무지한] 사람들을 너그러이 대할 수 있습니다.",
        ],
        [
          3,
          "그는 백성을 위해서 속죄의 제사를 드려야 하는 것과 마찬가지로, 그 연약함 때문에 자기 자신을 위해서도 드려야 하는 것입니다.",
        ],
        [
          4,
          "누구든지 이 [honor|영예]는 자기 스스로 얻는 것이 아니라, 아론과 같이 [called|하나님의 부르심]을 받아서 얻는 것입니다.",
        ],
      ],
      com: [
        ["h", "아론과 레위 계통의 제사장 직분"],
        [
          "p",
          "출애굽기 25–27장은 하나님께서 이스라엘 가운데 거하신 성막을 짓는 일을 기록합니다. 28장에서 하나님은 레위 지파의 아론과 그 아들들을 제사장으로 세우십니다. 레위기 8장은 그들의 위임식, 곧 그들을 구별하고 거룩하게 하여 섬기도록 권한을 주는 예식입니다. 그때부터 아론과 그 자손이 이스라엘의 제사장과 대제사장으로 섬겼고, 이것이 레위 계통의 제사장 직분입니다.",
        ],
        ["h", "예물과 희생 제사"],
        [
          "p",
          "예물은 감사로 드렸고, 희생 제사는 용서를 구하며 회개로 드렸습니다. NLT는 이렇게 옮깁니다. “그는 그들의 예물을 하나님께 드리고 그들의 죄를 위하여 희생 제물을 바칩니다.”",
        ],
        [
          "q",
          "대제사장이 드린 것: 번제, 예물이자 희생 제사(레 1장; 3:8–13). 소제, 예물(레 2장; 6:14–18). 화목제, 예물(레 3장; 7:11–34). 속죄제, 희생 제사(레 4:1–5:13). 속건제, 희생 제사(레 5:14–6:7). 자신을 위한 날마다의 소제(레 6:19–23). 날마다 드리는 분향(출 30:7–8). 그리고 해마다 한 번, 속죄일(레 16장).",
        ],
        ["h", "무지한 사람과 그릇된 길을 가는 사람"],
        [
          "p",
          "무지한 사람들은 영적인 연약함과 눈멂과 깨닫지 못함 때문에 넘어지거나 길을 벗어나는 사람들입니다. 일부러 하나님께 반역하는 것이 아니라, 분별력이 없어서 계속 실수하는 것입니다. 그릇된 길을 가는 사람들은 일부러 길을 벗어나는 사람들입니다. 더 잘 알면서도, 또는 인도를 거부하며, 반항과 고집으로 바른길에서 돌아섭니다.",
        ],
        [
          "p",
          "사람들 가운데서 뽑힌 대제사장은 자기도 연약함에 휘말려 있었기에 그 둘을 너그러이 대할 수 있었습니다. 바로 그 연약함 때문에 그는 백성을 위해 드리기 전에 자기 죄를 위해서도 제사를 드려야 했습니다.",
        ],
        ["h", "하나님의 부르심"],
        [
          "p",
          "여기서 영예는 한 사람에게 매겨지는 가치입니다. 아무도 그것을 스스로 차지할 수 없었습니다. 대제사장은 자기의 야망이나 바람이 아니라, 아론처럼 하나님께서 세우셨습니다.",
        ],
      ],
    },
    words: {
      en: {
        gifts: {
          t: "Gifts",
          g: "dōra · δῶρα",
          v: "5:1",
          s: "Offered in thanksgiving",
          d: "Offerings brought as thanksgiving: the grain and peace offerings, and the burnt offering as a gift.",
        },
        sacrifices: {
          t: "Sacrifices",
          g: "thysias · θυσίας",
          v: "5:1",
          s: "Offered in repentance",
          d: "Offerings brought in repentance, to seek forgiveness: the sin and guilt offerings. NLT: “offers sacrifices for their sins.”",
        },
        ignorant: {
          t: "Ignorant",
          g: "agnoousin · ἀγνοοῦσιν",
          v: "5:2",
          s: "Stumbling for lack of insight",
          d: "To err, to sin through mistake; a habitual pattern of faults from a continual want of discernment, knowledge or insight. Not wilful rebellion, but wandering off course through weakness or blindness.",
        },
        wayward: {
          t: "Wayward",
          g: "planōmenois · πλανωμένοις",
          v: "5:2",
          s: "Going astray on purpose",
          d: "To be led aside from the path of virtue, to go astray. Here, those who deliberately rebel: they know better or resist guidance, and turn away out of defiance or stubbornness.",
        },
        weakness: {
          t: "Weakness",
          g: "astheneian · ἀσθένειαν",
          v: "5:2",
          s: "Without strength",
          d: "Lacking strength; figuratively, the weakness of the flesh because of sin. The reason the high priest could deal gently, and the reason he had to offer for himself.",
        },
        honor: {
          t: "Honor",
          g: "timēn · τιμήν",
          v: "5:4",
          s: "Worth ascribed",
          d: "The worth ascribed to a person, or the value ascribed to a thing. No one could take the honor of the priesthood for himself.",
        },
        called: {
          t: "Called by God",
          g: "kaloumenos hypo tou theou · καλούμενος ὑπὸ τοῦ θεοῦ",
          v: "5:4",
          s: "Appointed, not self-chosen",
          d: "The high priest was appointed by God, not by ambition or desire. God called Aaron and his sons (Exod 28:1), and Leviticus 8 records their ordination.",
        },
      },
      ko: {
        gifts: {
          t: "예물",
          g: "dōra · δῶρα",
          v: "5:1",
          s: "감사로 드림",
          d: "감사로 드리는 제물. 소제와 화목제, 그리고 예물로 드리는 번제입니다.",
        },
        sacrifices: {
          t: "속죄의 희생 제사",
          g: "thysias · θυσίας",
          v: "5:1",
          s: "회개로 드림",
          d: "용서를 구하며 회개로 드리는 제물. 속죄제와 속건제입니다. NLT: “그들의 죄를 위하여 희생 제물을 바칩니다.”",
        },
        ignorant: {
          t: "무지한",
          g: "agnoousin · ἀγνοοῦσιν",
          v: "5:2",
          s: "깨닫지 못해 넘어짐",
          d: "그르치다, 실수로 죄를 짓다. 분별력과 지식과 통찰이 늘 모자라서 계속 잘못하는 습관. 일부러 하는 반역이 아니라, 연약함과 눈멂 때문에 길을 벗어나는 것입니다.",
        },
        wayward: {
          t: "그릇된 길을 가는",
          g: "planōmenois · πλανωμένοις",
          v: "5:2",
          s: "일부러 길을 벗어남",
          d: "덕의 길에서 끌려 나가다, 길을 잃다. 여기서는 일부러 반역하는 사람들입니다. 더 잘 알면서도, 또는 인도를 거부하며, 반항과 고집으로 돌아섭니다.",
        },
        weakness: {
          t: "연약함",
          g: "astheneian · ἀσθένειαν",
          v: "5:2",
          s: "힘이 없음",
          d: "힘이 모자람. 비유적으로 죄로 말미암은 육신의 약함. 대제사장이 너그러이 대할 수 있었던 까닭이자, 자기를 위해서도 드려야 했던 까닭입니다.",
        },
        honor: {
          t: "영예",
          g: "timēn · τιμήν",
          v: "5:4",
          s: "매겨진 가치",
          d: "한 사람에게 매겨지는 가치, 또는 어떤 것에 매겨지는 값. 아무도 제사장 직분의 영예를 스스로 차지할 수 없었습니다.",
        },
        called: {
          t: "하나님의 부르심",
          g: "kaloumenos hypo tou theou · καλούμενος ὑπὸ τοῦ θεοῦ",
          v: "5:4",
          s: "스스로가 아니라 세움을 받음",
          d: "대제사장은 야망이나 바람이 아니라 하나님께서 세우셨습니다. 하나님은 아론과 그 아들들을 부르셨고(출 28:1), 레위기 8장은 그들의 위임식을 기록합니다.",
        },
      },
    },
    chips: [
      {
        id: "exo28",
        tag: "OT",
        en: "Exod 28:1",
        ko: "출 28:1",
        ten: "Then bring near to you Aaron your brother, and his sons with him, from among the people of Israel, to serve me as priests—Aaron and Aaron’s sons, Nadab and Abihu, Eleazar and Ithamar.",
        tko: "너는 이스라엘 자손 가운데서 너의 형 아론과 그의 아들, 나답과 아비후와 엘르아살과 이다말을 불러내서, 나를 섬기는 제사장 일을 맡겨라.",
        wen: "Aaron called by God, “just as Aaron was.”",
        wko: "하나님께서 아론을 부르심, “아론과 같이”.",
      },
      {
        id: "lev16",
        tag: "OT",
        en: "Lev 16:6",
        ko: "레 16:6",
        ten: "Aaron shall offer the bull as a sin offering for himself and shall make atonement for himself and for his house.",
        tko: "아론은 자신을 속하는 속죄제물로 수소를 바쳐, 자기와 자기 집안의 죄를 속하여야 한다.",
        wen: "On the Day of Atonement the high priest offered first for himself.",
        wko: "속죄일에 대제사장은 먼저 자기를 위하여 드렸습니다.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "5–6",
    scene: "diadem",
    art: "3D · R3F — the priest’s linen turban with its gold plate rests on a stand by lamplight. A king’s crown comes down and settles over it: one head for both offices.",
    en: {
      title: "A priest forever",
      quote: "“You are a priest forever, after the order of Melchizedek.”",
      sref: "Hebrews 5:6",
      cap: "Scene: a crown settles over the priest’s turban. King and priest, appointed by God.",
      snips: [
        "Christ did not exalt himself; he was appointed by him who said, “You are my Son”",
        "“You are a priest forever, after the order of Melchizedek”",
      ],
      verses: [
        [
          5,
          "So also Christ did not [exalt|exalt himself] to be made a high priest, but was appointed by him who said to him, “You are my [son|Son], today I have begotten you”;",
        ],
        [
          6,
          "as he says also in another place, “You are a [forever|priest forever], after the order of [melchizedek|Melchizedek].”",
        ],
      ],
      com: [
        ["h", "Two psalms, one God"],
        [
          "p",
          "Psalm 2: the kings of the earth rebel against God, but God rebukes them and warns them in his fury. He declares that he has set his Son over all, and that everything will submit to him. Whoever defies the Son will bear the consequence; whoever takes refuge in him will have joy.",
        ],
        [
          "p",
          "Psalm 110 is a royal coronation hymn, possibly addressed to King David or one of his line. It describes God’s promise of victory to the king and the submission of all his enemies. And God declares that this king is a priest forever after the order of Melchizedek.",
        ],
        [
          "p",
          "In verses 5–6 the author sets these two verses side by side to show that the very same God who appointed Jesus as Son also appointed him high priest after the order of Melchizedek.",
        ],
        ["h", "King and priest"],
        [
          "p",
          "In ancient Israel no king could also be a priest. God had declared the two offices separate. Melchizedek was the only official figure who was both: king of Salem and priest of God Most High. So Psalm 110:4 prophesies Jesus as both king and priest, as Melchizedek was. Melchizedek will be discussed in chapter 7.",
        ],
        ["h", "Appointed, not self-exalted"],
        [
          "p",
          "Jesus is far higher than Moses and Aaron, for he is the builder of the house of God. He holds the authority of a priesthood whose order existed long before Aaron was appointed. And his appointment is valid because it came from God’s divine calling, not from human lineage.",
        ],
      ],
    },
    ko: {
      title: "영원한 제사장",
      quote: "“너는 멜기세덱의 계통을 따라 임명받은 영원한 제사장이다.”",
      sref: "히브리서 5:6",
      cap: "장면: 왕관이 제사장의 관 위에 내려앉습니다. 하나님께서 세우신 왕이자 제사장.",
      snips: [
        "그리스도께서도 스스로 높이신 것이 아니라, “너는 내 아들이다” 하고 말씀하신 분이 그렇게 하신 것입니다",
        "“너는 멜기세덱의 계통을 따라 임명받은 영원한 제사장이다”",
      ],
      verses: [
        [
          5,
          "이와 같이 그리스도께서도 [exalt|자기 자신을 스스로 높여서] 대제사장이 되는 영광을 차지하신 것이 아니라, 그에게 “너는 내 [son|아들]이다. 오늘 내가 너를 낳았다” 하고 말씀하신 분이 그렇게 하신 것입니다.",
        ],
        [
          6,
          "또 다른 곳에서 “너는 [melchizedek|멜기세덱의 계통]을 따라 임명받은 [forever|영원한 제사장]이다” 하고 말씀하셨습니다.",
        ],
      ],
      com: [
        ["h", "두 시편, 한 하나님"],
        [
          "p",
          "시편 2편: 세상의 왕들이 하나님께 반역하지만, 하나님은 그들을 꾸짖으시고 진노로 경고하십니다. 하나님은 그분의 아들을 모든 것 위에 세우셨고 모든 것이 그 아들에게 복종할 것이라고 선언하십니다. 아들에게 맞서는 사람은 그 결과를 받고, 그분께 피하는 사람은 기쁨을 얻습니다.",
        ],
        [
          "p",
          "시편 110편은 왕의 즉위 찬가로, 다윗 왕이나 그의 후손에게 한 말씀일 수 있습니다. 하나님께서 왕에게 승리를 약속하시고 모든 원수를 그 발아래 두시겠다고 하십니다. 그리고 이 왕이 멜기세덱을 따른 영원한 제사장이라고 선언하십니다.",
        ],
        [
          "p",
          "5–6절에서 저자는 이 두 구절을 나란히 놓아, 예수님을 아들로 세우신 바로 그 하나님께서 그분을 멜기세덱의 계통을 따른 대제사장으로도 세우셨음을 보여 줍니다.",
        ],
        ["h", "왕이자 제사장"],
        [
          "p",
          "고대 이스라엘에서 왕은 제사장이 될 수 없었습니다. 하나님께서 두 직분을 따로 두셨기 때문입니다. 멜기세덱은 살렘 왕이면서 가장 높으신 하나님의 제사장이었던 유일한 인물이었습니다. 그래서 시편 110:4은 예수님이 멜기세덱처럼 왕이자 제사장이 되실 것을 예언합니다. 멜기세덱은 7장에서 다룹니다.",
        ],
        ["h", "스스로 높이지 않고 세움을 받으심"],
        [
          "p",
          "예수님은 하나님의 집을 지으신 분이시므로 모세와 아론보다 훨씬 높으십니다. 그분은 아론이 세워지기 훨씬 전부터 있던 계통의 제사장 권위를 지니십니다. 그리고 그분의 임명은 사람의 혈통이 아니라 하나님의 부르심에서 왔기에 참됩니다.",
        ],
      ],
    },
    words: {
      en: {
        exalt: {
          t: "Exalt himself",
          g: "heauton edoxasen · ἑαυτὸν ἐδόξασεν",
          v: "5:5",
          s: "Glorify oneself",
          d: "To glorify oneself. Christ did not take the glory of the high priesthood for himself; like Aaron, he was appointed by God.",
        },
        son: {
          t: "You are my Son",
          g: "huios mou ei sy · υἱός μου εἶ σύ",
          v: "5:5",
          s: "Psalm 2:7",
          d: "From Psalm 2, where God sets his Son over the rebellious kings of the earth. Whoever defies the Son bears the consequence; whoever takes refuge in him has joy.",
        },
        forever: {
          t: "A priest forever",
          g: "hiereus eis ton aiōna · ἱερεὺς εἰς τὸν αἰῶνα",
          v: "5:6",
          s: "Psalm 110:4",
          d: "From Psalm 110, a royal coronation hymn. The king God crowns is also declared a priest, and his priesthood has no end.",
        },
        melchizedek: {
          t: "Order of Melchizedek",
          g: "kata tēn taxin Melchisedek · κατὰ τὴν τάξιν Μελχισέδεκ",
          v: "5:6",
          s: "King and priest",
          d: "Melchizedek was king of Salem and priest of God Most High (Gen 14:18), the only official figure to hold both offices. His order existed long before Aaron. Chapter 7 returns to him.",
        },
      },
      ko: {
        exalt: {
          t: "스스로 높이다",
          g: "heauton edoxasen · ἑαυτὸν ἐδόξασεν",
          v: "5:5",
          s: "자기를 영화롭게 함",
          d: "자기를 영화롭게 하다. 그리스도께서는 대제사장의 영광을 스스로 차지하지 않으셨고, 아론처럼 하나님께 세움을 받으셨습니다.",
        },
        son: {
          t: "너는 내 아들이다",
          g: "huios mou ei sy · υἱός μου εἶ σύ",
          v: "5:5",
          s: "시편 2:7",
          d: "하나님께서 반역하는 세상 왕들 위에 아들을 세우시는 시편 2편의 말씀. 아들에게 맞서는 사람은 그 결과를 받고, 그분께 피하는 사람은 기쁨을 얻습니다.",
        },
        forever: {
          t: "영원한 제사장",
          g: "hiereus eis ton aiōna · ἱερεὺς εἰς τὸν αἰῶνα",
          v: "5:6",
          s: "시편 110:4",
          d: "왕의 즉위 찬가인 시편 110편의 말씀. 하나님께서 세우신 왕이 제사장으로도 선언되며, 그 제사장 직분은 끝이 없습니다.",
        },
        melchizedek: {
          t: "멜기세덱의 계통",
          g: "kata tēn taxin Melchisedek · κατὰ τὴν τάξιν Μελχισέδεκ",
          v: "5:6",
          s: "왕이자 제사장",
          d: "멜기세덱은 살렘 왕이면서 가장 높으신 하나님의 제사장으로(창 14:18), 두 직분을 다 지닌 유일한 인물이었습니다. 그의 계통은 아론보다 훨씬 앞섭니다. 7장에서 다시 다룹니다.",
        },
      },
    },
    chips: [
      {
        id: "ps2",
        tag: "OT",
        en: "Ps 2:7",
        ko: "시 2:7",
        ten: "I will tell of the decree: The LORD said to me, “You are my Son; today I have begotten you.”",
        tko: "“나 이제 주님께서 내리신 칙령을 선포한다. 주님께서 나에게 이르시기를 ‘너는 내 아들, 내가 오늘 너를 낳았다.",
        wen: "The Son set over the kings of the earth.",
        wko: "세상 왕들 위에 세워진 아들.",
      },
      {
        id: "ps110",
        tag: "OT",
        en: "Ps 110:4",
        ko: "시 110:4",
        ten: "The LORD has sworn and will not change his mind, “You are a priest forever after the order of Melchizedek.”",
        tko: "주님께서 맹세하시기를 “너는 멜기세덱을 따른 영원한 제사장이다” 하셨으니, 그 뜻을 바꾸지 않으실 것입니다.",
        wen: "The crowned king declared a priest forever.",
        wko: "즉위한 왕이 영원한 제사장으로 선언됨.",
      },
      {
        id: "gen14",
        tag: "OT",
        en: "Gen 14:18",
        ko: "창 14:18",
        ten: "And Melchizedek king of Salem brought out bread and wine. (He was priest of God Most High.)",
        tko: "그 때에 살렘 왕 멜기세덱은 빵과 포도주를 가지고 나왔다. 그는 가장 높으신 하나님의 제사장이다.",
        wen: "Melchizedek, both king and priest.",
        wko: "왕이자 제사장인 멜기세덱.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "7–10",
    scene: "cries",
    art: "3D · R3F — one lamp in the dark. Tears fall in the lamplight; then light answers from above and spreads out across the floor. Christ is not drawn.",
    en: {
      title: "Made perfect through suffering",
      quote:
        "“And being made perfect, he became the source of eternal salvation to all who obey him.”",
      sref: "Hebrews 5:9",
      cap: "Scene: prayers with loud cries and tears, and he was heard. The light spreads out across the floor.",
      snips: [
        "In the days of his flesh, prayers with loud cries and tears; he was heard",
        "Although a son, he learned obedience through what he suffered",
        "Made perfect, the source of eternal salvation to all who obey him",
        "Designated by God a high priest after the order of Melchizedek",
      ],
      verses: [
        [
          7,
          "In the days of his flesh, Jesus offered up prayers and supplications, with [cries|loud cries and tears], to him who was able to save him from death, and he was heard because of his [reverence|reverence].",
        ],
        [
          8,
          "Although he was a son, he [learned|learned] [obedience|obedience] through what he suffered.",
        ],
        [
          9,
          "And being made [perfect|perfect], he became the [source|source of eternal salvation] to all who obey him,",
        ],
        [
          10,
          "being designated by God a high priest after the order of Melchizedek.",
        ],
      ],
      com: [
        ["h", "In the days of his flesh"],
        [
          "p",
          "Jesus lived around thirty-three years on earth. Verses 7–10 explain why he is perfectly qualified to be our high priest. Verse 2 said a high priest chosen from among men can deal gently with the weak because he himself is weak, and that he is appointed by God, not by ambition. So it is with Jesus Christ: in the flesh he experienced the weaknesses humankind feels (2:5–10, 14–18).",
        ],
        ["h", "He learned obedience"],
        [
          "p",
          "The ultimate difference is that he learned obedience through suffering and became the source of eternal salvation, unlike the human high priests, who had to offer sacrifices for themselves before offering for the whole community.",
        ],
        [
          "p",
          "“Learned” here does not mean learning from failing at a task. It is closer to experiencing. Jesus experienced the weaknesses of humankind, and through that suffering he learned to obey God’s words in reverence. He did not escape from it; he obeyed.",
        ],
        ["h", "Made perfect"],
        [
          "p",
          "That is how he was made perfect, as 2:10 says: it was fitting that God should make the founder of their salvation perfect through suffering. With verse 10, Jesus is not only qualified as high priest; he is the best high priest. He went through the very peak of suffering, pain, temptation and difficulty, and he was divinely appointed by God, so he is able to help us.",
        ],
      ],
    },
    ko: {
      title: "고난으로 완전하게 되심",
      quote:
        "“그리고 완전하게 되신 뒤에, 자기에게 순종하는 모든 사람에게 영원한 구원의 근원이 되시고”",
      sref: "히브리서 5:9",
      cap: "장면: 큰 부르짖음과 많은 눈물의 기도, 그리고 들으심. 빛이 바닥으로 퍼져 나갑니다.",
      snips: [
        "육신으로 계실 때에 큰 부르짖음과 많은 눈물로 기도하셨고, 들으심을 얻으셨습니다",
        "아드님이시지만, 고난을 당하심으로써 순종을 배우셨습니다",
        "완전하게 되신 뒤에, 영원한 구원의 근원이 되시고",
        "멜기세덱의 계통을 따라 대제사장으로 임명을 받으셨습니다",
      ],
      verses: [
        [
          7,
          "예수께서 육신으로 세상에 계실 때에, 자기를 죽음에서 구원하실 수 있는 분께 [cries|큰 부르짖음과 많은 눈물]로써 기도와 탄원을 올리셨습니다. 하나님께서는 예수의 [reverence|경외심]을 보시어서, 그 간구를 들어주셨습니다.",
        ],
        [
          8,
          "그는 아드님이시지만, 고난을 당하심으로써 [obedience|순종]을 [learned|배우셨습니다].",
        ],
        [
          9,
          "그리고 [perfect|완전하게 되신] 뒤에, 자기에게 순종하는 모든 사람에게 [source|영원한 구원의 근원]이 되시고,",
        ],
        [
          10,
          "하나님에게서 멜기세덱의 계통을 따라 대제사장으로 임명을 받으셨습니다.",
        ],
      ],
      com: [
        ["h", "육신으로 세상에 계실 때에"],
        [
          "p",
          "예수님은 땅에서 약 서른세 해를 사셨습니다. 7–10절은 그분이 왜 우리의 대제사장으로 완전히 합당하신지를 설명합니다. 2절은 사람들 가운데서 뽑힌 대제사장이 자기도 연약하기에 연약한 사람들을 너그러이 대할 수 있으며, 야망이 아니라 하나님께 세움을 받는다고 했습니다. 예수 그리스도도 그렇습니다. 그분은 육신으로 계실 때 사람이 느끼는 연약함을 몸소 겪으셨습니다(2:5–10, 14–18).",
        ],
        ["h", "순종을 배우셨습니다"],
        [
          "p",
          "결정적인 차이는, 그분이 고난으로 순종을 배우시고 영원한 구원의 근원이 되셨다는 것입니다. 사람 대제사장들은 온 회중을 위해 드리기 전에 먼저 자기를 위해 제사를 드려야 했습니다.",
        ],
        [
          "p",
          "여기서 “배우다”는 어떤 일에 실패하면서 배운다는 뜻이 아닙니다. 오히려 겪어서 아는 것에 가깝습니다. 예수님은 사람의 연약함을 겪으셨고, 그 고난을 통해 경외함으로 하나님의 말씀에 순종하는 법을 배우셨습니다. 그분은 그것을 피하지 않으시고 순종하셨습니다.",
        ],
        ["h", "완전하게 되심"],
        [
          "p",
          "그렇게 그분은 완전하게 되셨습니다. 2:10이 말하는 대로, 하나님께서 구원의 창시자를 고난으로써 완전하게 하신다는 것은 당연한 일입니다. 10절과 함께 보면, 예수님은 대제사장으로 합당하실 뿐 아니라 가장 좋은 대제사장이십니다. 고난과 아픔과 시험과 어려움의 가장 깊은 데까지 겪으셨고, 하나님께 직접 세움을 받으셨기에 우리를 도우실 수 있습니다.",
        ],
      ],
    },
    words: {
      en: {
        cries: {
          t: "Loud cries and tears",
          g: "kraugēs ischyras kai dakryōn · κραυγῆς ἰσχυρᾶς καὶ δακρύων",
          v: "5:7",
          s: "Prayer in the days of his flesh",
          d: "Strong crying and tears. In the flesh Jesus experienced the weaknesses humankind feels (2:14–18), and he brought them to the one able to save him from death.",
        },
        reverence: {
          t: "Reverence",
          g: "eulabeias · εὐλαβείας",
          v: "5:7",
          s: "Godly fear",
          d: "Godly fear, reverent submission; pious and devout toward God. He was heard because of it.",
        },
        learned: {
          t: "Learned",
          g: "emathen · ἔμαθεν",
          v: "5:8",
          s: "Came to know by experience",
          d: "To genuinely understand, accept a teaching as true and apply it in one’s life. Not learning by failing, but by experiencing.",
        },
        obedience: {
          t: "Obedience",
          g: "hypakoēn · ὑπακοήν",
          v: "5:8",
          s: "Hearing, then obeying",
          d: "To obey on the basis of having paid attention to. Jesus did not escape the suffering; he obeyed God’s words in reverence.",
        },
        perfect: {
          t: "Made perfect",
          g: "teleiōtheis · τελειωθείς",
          v: "5:9",
          s: "Brought to completion",
          d: "Brought to the goal. “It was fitting that God … should make the founder of their salvation perfect through suffering” (2:10).",
        },
        source: {
          t: "Source of eternal salvation",
          g: "aitios sōtērias aiōniou · αἴτιος σωτηρίας αἰωνίου",
          v: "5:9",
          s: "Where salvation comes from",
          d: "Unlike the human high priests, who had to offer for themselves first, Jesus became the very source of eternal salvation to all who obey him.",
        },
      },
      ko: {
        cries: {
          t: "큰 부르짖음과 많은 눈물",
          g: "kraugēs ischyras kai dakryōn · κραυγῆς ἰσχυρᾶς καὶ δακρύων",
          v: "5:7",
          s: "육신으로 계실 때의 기도",
          d: "강한 부르짖음과 눈물. 육신으로 계실 때 예수님은 사람이 느끼는 연약함을 겪으셨고(2:14–18), 그것을 죽음에서 구원하실 수 있는 분께 올려 드리셨습니다.",
        },
        reverence: {
          t: "경외심",
          g: "eulabeias · εὐλαβείας",
          v: "5:7",
          s: "하나님을 두려워함",
          d: "하나님을 두려워함, 경외하며 복종함. 경건하고 하나님께 헌신된 마음. 그 때문에 들으심을 얻으셨습니다.",
        },
        learned: {
          t: "배우다",
          g: "emathen · ἔμαθεν",
          v: "5:8",
          s: "겪어서 앎",
          d: "참으로 깨닫다, 가르침을 참되다고 받아들여 삶에 적용하다. 실패해서 배우는 것이 아니라 겪어서 배우는 것입니다.",
        },
        obedience: {
          t: "순종",
          g: "hypakoēn · ὑπακοήν",
          v: "5:8",
          s: "귀 기울이고 따름",
          d: "귀 기울여 들은 것을 바탕으로 따르다. 예수님은 고난을 피하지 않으시고 경외함으로 하나님의 말씀에 순종하셨습니다.",
        },
        perfect: {
          t: "완전하게 되다",
          g: "teleiōtheis · τελειωθείς",
          v: "5:9",
          s: "목표에 이름",
          d: "끝까지 이르게 되다. “구원의 창시자를 고난으로써 완전하게 하신다는 것은 당연한 일입니다”(2:10).",
        },
        source: {
          t: "영원한 구원의 근원",
          g: "aitios sōtērias aiōniou · αἴτιος σωτηρίας αἰωνίου",
          v: "5:9",
          s: "구원이 나오는 곳",
          d: "먼저 자기를 위해 드려야 했던 사람 대제사장들과 달리, 예수님은 자기에게 순종하는 모든 사람에게 영원한 구원의 근원이 되셨습니다.",
        },
      },
    },
    chips: [
      {
        id: "heb2",
        tag: "NT",
        en: "Heb 2:10",
        ko: "히 2:10",
        ten: "For it was fitting that he, for whom and by whom all things exist, in bringing many sons to glory, should make the founder of their salvation perfect through suffering.",
        tko: "하나님께서는 만물을 창조하시고, 만물을 보존하시는 분이십니다. 그러므로 하나님께서 많은 자녀를 영광에 이끌어들이실 때에, 그들의 구원의 창시자를 고난으로써 완전하게 하신다는 것은 당연한 일입니다.",
        wen: "Made perfect through suffering.",
        wko: "고난으로써 완전하게 되심.",
      },
      {
        id: "heb4",
        tag: "NT",
        en: "Heb 4:15",
        ko: "히 4:15",
        ten: "For we do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin.",
        tko: "우리의 대제사장은 우리의 연약함을 동정하지 못하시는 분이 아닙니다. 그는 모든 점에서 우리와 마찬가지로 시험을 받으셨지만, 죄는 없으십니다.",
        wen: "Tempted as we are, yet without sin.",
        wko: "우리와 마찬가지로 시험을 받으셨지만 죄는 없으심.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "11–14",
    scene: "bread",
    art: "3D · R3F — on the table in the Holy Place, a small cup of milk beside a broken loaf. The lamplight lingers on the cup, then moves across to the bread.",
    en: {
      title: "Milk, not solid food",
      quote: "“But solid food is for the mature.”",
      sref: "Hebrews 5:14",
      cap: "Scene: a cup of milk, and beside it the bread. Solid food is for the mature.",
      snips: [
        "Much to say, hard to explain, since you have become dull of hearing",
        "You ought to be teachers, but need the basic principles again: milk, not solid food",
        "Everyone who lives on milk is unskilled, since he is a child",
        "Solid food is for the mature, trained by constant practice",
      ],
      verses: [
        [
          11,
          "About this we have much to say, and it is hard to explain, since you have become [dull|dull of hearing].",
        ],
        [
          12,
          "For though by this time you ought to be teachers, you need someone to teach you again the [principles|basic principles] of the [oracles|oracles of God]. You need [milk|milk], not [solid|solid food],",
        ],
        [
          13,
          "for everyone who lives on milk is unskilled in the word of righteousness, since he is a child.",
        ],
        [
          14,
          "But solid food is for the mature, for those who have their powers of discernment trained by constant practice to distinguish good from evil.",
        ],
      ],
      com: [
        ["h", "A sudden turn"],
        [
          "p",
          "Verses 11–14 are a sudden shift. They show that the readers were drifting away from the truth and growing sluggish to hear God’s words. The heavy persecution and suffering they were undergoing was turning them this way: giving up hope, going back to the old ways, drifting from the truth, as the author has warned several times (2:1–4; 3:12; 4:1–2).",
        ],
        ["h", "By this time"],
        [
          "p",
          "“For though by this time” implies the readers had been exposed to the teaching for a long time, yet still had not come to understand the words of God. That is why the author says they need someone to teach them again the basic principles, the ABCs of Christian doctrine.",
        ],
        ["h", "Milk and solid food"],
        [
          "p",
          "Milk stands for the beginning truths of the faith, as infants drink milk to grow. Solid food is stable and steadfast, firm like a foundation: food for the soul, which is instruction. The mature are those whose discernment has been trained by constant practice to distinguish good from evil.",
        ],
      ],
    },
    ko: {
      title: "단단한 음식이 아니라 젖",
      quote: "“그러나 단단한 음식물은 장성한 사람들의 것입니다.”",
      sref: "히브리서 5:14",
      cap: "장면: 젖 한 잔, 그리고 그 곁의 빵. 단단한 음식물은 장성한 사람들의 것입니다.",
      snips: [
        "할 말이 많지만, 여러분의 귀가 둔해진 까닭에 설명하기 어렵습니다",
        "이미 교사가 되었어야 할 터인데, 다시 초보적 원리를 배워야 합니다",
        "젖을 먹고서 사는 이는 아직 어린아이입니다",
        "단단한 음식물은 장성한 사람들의 것입니다",
      ],
      verses: [
        [
          11,
          "멜기세덱에 관하여는 할 말이 많이 있지만, 여러분의 [dull|귀가 둔해진] 까닭에 설명하기 어렵습니다.",
        ],
        [
          12,
          "시간으로 보면, 여러분은 이미 교사가 되었어야 할 터인데, 다시금 [oracles|하나님의 말씀]의 [principles|초보적 원리]를 남들에게서 배워야 할 처지에 놓여 있습니다. 여러분은 [solid|단단한 음식물]이 아니라, [milk|젖]을 필요로 하는 사람이 되었습니다.",
        ],
        [
          13,
          "젖을 먹고서 사는 이는 아직 어린아이이므로, 올바른 가르침에 익숙하지 못합니다.",
        ],
        [
          14,
          "그러나 단단한 음식물은 장성한 사람들의 것입니다. 그들은 경험으로 선과 악을 분별하는 세련된 지각을 가지고 있는 사람들입니다.",
        ],
      ],
      com: [
        ["h", "갑작스러운 전환"],
        [
          "p",
          "11–14절은 갑작스러운 전환입니다. 이 네 절은 독자들이 진리에서 떠내려가며 하나님의 말씀을 듣는 데 둔해지고 있었음을 보여 줍니다. 그들이 겪던 심한 박해와 고난이 그들을 그렇게 몰아갔습니다. 소망을 포기하고, 옛 길로 돌아가고, 진리에서 떠내려가는 것입니다. 저자는 이미 여러 번 그것을 경고했습니다(2:1–4; 3:12; 4:1–2).",
        ],
        ["h", "시간으로 보면"],
        [
          "p",
          "“시간으로 보면”은 독자들이 오랫동안 가르침을 들어 왔지만 아직도 하나님의 말씀을 깨닫지 못했음을 뜻합니다. 그래서 저자는 그들이 초보적 원리, 곧 그리스도교 교리의 기초를 다시 배워야 한다고 말합니다.",
        ],
        ["h", "젖과 단단한 음식물"],
        [
          "p",
          "젖은 아기가 젖을 먹고 자라듯 믿음의 처음 진리를 나타냅니다. 단단한 음식물은 기초처럼 굳고 든든한 것, 곧 영혼의 양식인 가르침입니다. 장성한 사람들은 꾸준한 연습으로 지각이 훈련되어 선과 악을 분별하는 사람들입니다.",
        ],
      ],
    },
    words: {
      en: {
        dull: {
          t: "Dull of hearing",
          g: "nōthroi tais akoais · νωθροὶ ταῖς ἀκοαῖς",
          v: "5:11",
          s: "Slow, sluggish",
          d: "Slow, sluggish. NLT: “since you are spiritually dull and don’t seem to listen.”",
        },
        principles: {
          t: "Basic principles",
          g: "stoicheia · στοιχεῖα",
          v: "5:12",
          s: "The ABCs",
          d: "Elementary components of something, its ABCs. Here, the basic teachings of Christian doctrine.",
        },
        oracles: {
          t: "Oracles of God",
          g: "logiōn tou theou · λογίων τοῦ θεοῦ",
          v: "5:12",
          s: "God’s words",
          d: "Sayings, pronouncements, declarations. NLT: “God’s words.”",
        },
        milk: {
          t: "Milk",
          g: "galaktos · γάλακτος",
          v: "5:12",
          s: "The beginning truths",
          d: "Figuratively, the beginning truths of the faith, as infants drink milk to grow.",
        },
        solid: {
          t: "Solid food",
          g: "stereas trophēs · στερεᾶς τροφῆς",
          v: "5:12",
          s: "Firm, like a foundation",
          d: "Stable, steadfast, solid like a foundation. Figuratively, food for the soul, which is instruction.",
        },
      },
      ko: {
        dull: {
          t: "귀가 둔해지다",
          g: "nōthroi tais akoais · νωθροὶ ταῖς ἀκοαῖς",
          v: "5:11",
          s: "느리고 굼뜸",
          d: "느리다, 굼뜨다. NLT: “여러분이 영적으로 둔해져서 귀 기울이지 않는 것 같으니.”",
        },
        principles: {
          t: "초보적 원리",
          g: "stoicheia · στοιχεῖα",
          v: "5:12",
          s: "기초, 가나다",
          d: "어떤 것의 기본 요소, 그 가나다. 여기서는 그리스도교 교리의 기초 가르침입니다.",
        },
        oracles: {
          t: "하나님의 말씀",
          g: "logiōn tou theou · λογίων τοῦ θεοῦ",
          v: "5:12",
          s: "하나님께서 하신 말씀",
          d: "말씀, 선포, 선언. NLT: “하나님의 말씀.”",
        },
        milk: {
          t: "젖",
          g: "galaktos · γάλακτος",
          v: "5:12",
          s: "처음 진리",
          d: "비유적으로, 아기가 젖을 먹고 자라듯 믿음의 처음 진리를 뜻합니다.",
        },
        solid: {
          t: "단단한 음식물",
          g: "stereas trophēs · στερεᾶς τροφῆς",
          v: "5:12",
          s: "기초처럼 굳음",
          d: "굳고 든든하며 기초처럼 단단한 것. 비유적으로 영혼의 양식, 곧 가르침입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb2-1",
        tag: "NT",
        en: "Heb 2:1",
        ko: "히 2:1",
        ten: "Therefore we must pay much closer attention to what we have heard, lest we drift away from it.",
        tko: "그러므로 우리는 들은 바를 더욱 굳게 간직하여, 잘못된 길로 빠져드는 일이 없어야 마땅하겠습니다.",
        wen: "The first warning against drifting away.",
        wko: "떠내려가지 말라는 첫 경고.",
      },
      {
        id: "heb3",
        tag: "NT",
        en: "Heb 3:12",
        ko: "히 3:12",
        ten: "Take care, brothers, lest there be in any of you an evil, unbelieving heart, leading you to fall away from the living God.",
        tko: "형제자매 여러분, 여러분 가운데에 믿지 않는 악한 마음을 품고서, 살아 계신 하나님을 떠나는 사람이 아무도 없도록, 여러분은 조심하십시오.",
        wen: "Another warning the author has given before.",
        wko: "저자가 앞서 했던 또 하나의 경고.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "The high priest God calls",
        items: [
          [
            "vv1–4",
            "Every high priest is chosen from among men and appointed by God to offer gifts and sacrifices. Beset with weakness, he deals gently with the ignorant and wayward, and must offer for his own sins too.",
          ],
          [
            "vv5–6",
            "Christ did not exalt himself. The God who said “You are my Son” also said “You are a priest forever, after the order of Melchizedek”: king and priest at once.",
          ],
        ],
      },
      {
        h: "Perfected, and a warning",
        items: [
          [
            "vv7–10",
            "In the days of his flesh Jesus prayed with loud cries and tears and was heard. He learned obedience through suffering and, made perfect, became the source of eternal salvation.",
          ],
          [
            "vv11–14",
            "The readers have become dull of hearing. They should be teachers by now, but need milk again; solid food is for the mature.",
          ],
        ],
      },
    ],
    intentH: "The author’s intention",
    intentShort:
      "To give the evidence that Jesus is the superior, great high priest: appointed by God as Son and as priest after the order of Melchizedek, and made perfect through suffering as the source of eternal salvation.",
    intent: [
      "The author provides objective evidence that Jesus is the most superior, great high priest. Although appointed Son of God, Jesus also received a priesthood after the order of Melchizedek, which no one else in the Bible received, for Melchizedek was both king and priest, which was forbidden for any king. These titles were not given by any human; God appointed Jesus to them.",
      "Jesus also experienced the very weaknesses humankind can experience, on a far more intense scale, yet he did not sin or run from them, but obeyed God’s words with reverence. In his prayers and supplications he was heard by God, and being made perfect through suffering, he became the very source of eternal salvation.",
    ],
  },
  ko: {
    groups: [
      {
        h: "하나님께서 부르시는 대제사장",
        items: [
          [
            "1–4절",
            "각 대제사장은 사람들 가운데서 뽑혀 하나님께 세움을 받고 예물과 희생 제사를 드립니다. 자기도 연약함에 휘말려 있어 무지하고 그릇된 사람들을 너그러이 대하며, 자기 죄를 위해서도 드려야 합니다.",
          ],
          [
            "5–6절",
            "그리스도께서는 스스로 높이지 않으셨습니다. “너는 내 아들이다” 하신 하나님께서 “너는 멜기세덱의 계통을 따라 임명받은 영원한 제사장이다”라고도 하셨습니다. 왕이자 제사장이십니다.",
          ],
        ],
      },
      {
        h: "완전하게 되심, 그리고 경고",
        items: [
          [
            "7–10절",
            "육신으로 계실 때 예수님은 큰 부르짖음과 많은 눈물로 기도하셨고 들으심을 얻으셨습니다. 고난으로 순종을 배우시고, 완전하게 되셔서 영원한 구원의 근원이 되셨습니다.",
          ],
          [
            "11–14절",
            "독자들은 귀가 둔해졌습니다. 이미 교사가 되었어야 하지만 다시 젖이 필요합니다. 단단한 음식물은 장성한 사람들의 것입니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "예수님이 가장 뛰어나신 위대한 대제사장이심을 보여 주는 것. 그분은 하나님께 아들로, 또 멜기세덱의 계통을 따른 제사장으로 세움을 받으셨고, 고난으로 완전하게 되셔서 영원한 구원의 근원이 되셨습니다.",
    intent: [
      "저자는 예수님이 가장 뛰어나신 위대한 대제사장이심을 보여 주는 객관적인 증거를 제시합니다. 예수님은 하나님의 아들로 세움을 받으셨을 뿐 아니라, 멜기세덱의 계통을 따른 제사장 직분도 받으셨습니다. 성경에서 예수님 말고는 아무도 받지 못한 것입니다. 멜기세덱은 왕이면서 제사장이었고, 어떤 왕에게도 그것은 금지되어 있었기 때문입니다. 아들이라는 칭호와 멜기세덱 계통의 제사장 직분은 사람이 준 것이 아니라 하나님께서 예수님께 주신 것입니다.",
      "예수님은 또한 사람이 겪을 수 있는 바로 그 연약함을 훨씬 더 깊이 겪으셨지만, 죄를 짓거나 피하지 않으시고 경외함으로 하나님의 말씀에 순종하셨습니다. 그분의 기도와 간구를 하나님께서 들으셨고, 고난으로 완전하게 되셔서 그분은 영원한 구원의 근원이 되셨습니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 5",
    tagline: "“You are a priest forever, after the order of Melchizedek.”",
    taglineRef: "Hebrews 5:6",
    mapTitle: "Fourteen verses, four movements",
    mapIntro:
      "Every high priest is chosen from among men and called by God. Christ was called as Son and as priest forever, and made perfect through suffering. Then a warning: you need milk again, not solid food.",
    summaryTitle: "What Hebrews 5 says",
    footQuote:
      "“And being made perfect, he became the source of eternal salvation to all who obey him.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 5장",
    tagline: "“너는 멜기세덱의 계통을 따라 임명받은 영원한 제사장이다.”",
    taglineRef: "히브리서 5:6",
    mapTitle: "열네 절, 네 흐름",
    mapIntro:
      "각 대제사장은 사람들 가운데서 뽑혀 하나님의 부르심을 받습니다. 그리스도께서는 아들로, 또 영원한 제사장으로 부르심을 받으셨고, 고난으로 완전하게 되셨습니다. 그리고 경고: 여러분은 단단한 음식물이 아니라 다시 젖이 필요합니다.",
    summaryTitle: "히브리서 5장이 말하는 것",
    footQuote:
      "“그리고 완전하게 되신 뒤에, 자기에게 순종하는 모든 사람에게 영원한 구원의 근원이 되시고”",
    version: "새번역",
  },
};

export const chapter5: ChapterContent = {
  number: 5,
  setting: "sanctuary",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
