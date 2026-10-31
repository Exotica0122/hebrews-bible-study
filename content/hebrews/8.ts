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
    range: "1–2",
    scene: "trueTent",
    art: "3D · R3F — on a blue cyanotype sheet, seen from the door: the gold tent raises itself with no hands on it, its cords pull taut, and one sits at the right hand of the throne.",
    en: {
      title: "A minister in the true tent",
      quote:
        "“A minister in the holy places, in the true tent that the Lord set up, not man.”",
      sref: "Hebrews 8:2",
      cap: "Scene: the true tent rises with no hand on it, and the high priest is seated at the right hand of the throne.",
      snips: [
        "We have such a high priest, seated at the right hand of the Majesty",
        "A minister in the true tent that the Lord set up, not man",
      ],
      verses: [
        [
          1,
          "Now the point in what we are saying is this: we have such a high priest, one who is [seated|seated at the right hand] of the throne of the Majesty in heaven,",
        ],
        [
          2,
          "a [minister|minister] in the [holy|holy places], in the [tent|true tent] that the Lord set up, not man.",
        ],
      ],
      com: [
        ["h", "Seated at the right hand"],
        [
          "p",
          "Verse 1 links with Hebrews 1:3: “After making purification for sins, he sat down at the right hand of the Majesty on high.” This highlights Jesus’ authority: he has the same authority as the Majesty sitting on the throne.",
        ],
        ["h", "Where he serves"],
        [
          "p",
          "Verse 2 continues that the place where Jesus Christ serves as a minister is not the earthly things that the Levitical priests were serving, but heaven, a holy, consecrated place where no humans can enter but Jesus himself.",
        ],
        ["h", "Angels and the Great High Priest"],
        [
          "p",
          "The word “minister” was also used in 1:7 to mention angels. Angels serve God as messengers, like winds and flames of fire. In chapter 8, Jesus Christ serves the true tabernacle as the Great High Priest.",
        ],
      ],
    },
    ko: {
      title: "참 장막에서 섬기시는 분",
      quote:
        "“그는 성소와 참 장막에서 섬기시는 분입니다. 이 장막은 주님께서 세우신 것이요, 사람이 세운 것이 아닙니다.”",
      sref: "히브리서 8:2",
      cap: "장면: 참 장막이 사람의 손 없이 세워지고, 대제사장이 보좌 오른쪽에 앉으십니다.",
      snips: [
        "우리에게는 지엄하신 분의 보좌 오른쪽에 앉으신 대제사장이 계십니다",
        "주님께서 세우신, 사람이 세운 것이 아닌 참 장막에서 섬기시는 분",
      ],
      verses: [
        [
          1,
          "지금 말한 것들의 요점은 이러합니다. 곧 우리에게는 이와 같은 대제사장이 한 분 계시다는 것입니다. 그는 하늘에서 지엄하신 분의 [seated|보좌 오른쪽에 앉으셨습니다].",
        ],
        [
          2,
          "그는 [holy|성소]와 [tent|참 장막]에서 [minister|섬기시는 분]입니다. 이 장막은 주님께서 세우신 것이요, 사람이 세운 것이 아닙니다.",
        ],
      ],
      com: [
        ["h", "오른쪽에 앉으심"],
        [
          "p",
          "1절은 히브리서 1:3과 이어집니다. “그는 죄를 깨끗하게 하시고서 높은 곳에 계신 존엄하신 분의 오른쪽에 앉으셨습니다.” 이것은 예수님의 권위를 강조합니다. 예수님은 보좌에 앉으신 지엄하신 분과 같은 권위를 가지셨습니다.",
        ],
        ["h", "섬기시는 곳"],
        [
          "p",
          "2절은 예수 그리스도께서 섬기시는 곳이 레위 계통의 제사장들이 섬기던 땅의 것들이 아니라, 하늘, 곧 예수님 외에는 어떤 사람도 들어갈 수 없는 거룩하게 구별된 곳이라고 이어 갑니다.",
        ],
        ["h", "천사들과 큰 대제사장"],
        [
          "p",
          "“섬기는 사람”이라는 말은 1:7에서 천사들을 가리킬 때도 쓰였습니다. 천사들은 바람과 불꽃처럼 하나님을 섬기는 사자들입니다. 8장에서 예수 그리스도는 큰 대제사장으로서 참 장막을 섬기십니다.",
        ],
      ],
    },
    words: {
      en: {
        seated: {
          t: "Seated at the right hand",
          g: "ekathisen en dexia · ἐκάθισεν ἐν δεξιᾷ",
          v: "8:1",
          s: "The same authority",
          d: "Links with 1:3: Jesus has the same authority as the Majesty sitting on the throne.",
        },
        minister: {
          t: "Minister",
          g: "leitourgos · λειτουργός",
          v: "8:2",
          s: "Public servant",
          d: "A public servant, one who performs a sacred service. Also used of the angels in 1:7.",
        },
        holy: {
          t: "Holy places",
          g: "tōn hagiōn · τῶν ἁγίων",
          v: "8:2",
          s: "The sanctuary",
          d: "The sanctuary. Figuratively refers to heaven: set apart, sanctified, consecrated.",
        },
        tent: {
          t: "True tent",
          g: "tēs skēnēs tēs alēthinēs · τῆς σκηνῆς τῆς ἀληθινῆς",
          v: "8:2",
          s: "The true tabernacle",
          d: "True means conforming to the facts, hence correct and dependable. Tent or tabernacle means any covered or shaded place.",
        },
      },
      ko: {
        seated: {
          t: "보좌 오른쪽에 앉으심",
          g: "ekathisen en dexia · ἐκάθισεν ἐν δεξιᾷ",
          v: "8:1",
          s: "같은 권위",
          d: "1:3과 이어집니다. 예수님은 보좌에 앉으신 지엄하신 분과 같은 권위를 가지셨습니다.",
        },
        minister: {
          t: "섬기시는 분",
          g: "leitourgos · λειτουργός",
          v: "8:2",
          s: "공적으로 섬기는 사람",
          d: "공적으로 섬기는 사람, 거룩한 일을 맡아 행하는 사람. 1:7에서 천사들에게도 쓰였습니다.",
        },
        holy: {
          t: "성소",
          g: "tōn hagiōn · τῶν ἁγίων",
          v: "8:2",
          s: "거룩한 곳",
          d: "성소. 비유적으로 하늘을 가리키며, 구별되고 거룩하게 되고 바쳐진 곳을 뜻합니다.",
        },
        tent: {
          t: "참 장막",
          g: "tēs skēnēs tēs alēthinēs · τῆς σκηνῆς τῆς ἀληθινῆς",
          v: "8:2",
          s: "참된 성막",
          d: "참은 사실에 맞아서 옳고 믿을 만하다는 뜻입니다. 장막은 지붕이 있거나 그늘진 곳을 뜻합니다.",
        },
      },
    },
    chips: [
      {
        id: "heb1-3",
        tag: "NT",
        en: "Heb 1:3",
        ko: "히 1:3",
        ten: "After making purification for sins, he sat down at the right hand of the Majesty on high.",
        tko: "그는 죄를 깨끗하게 하시고서 높은 곳에 계신 존엄하신 분의 오른쪽에 앉으셨습니다.",
        wen: "The same seat, already named in chapter 1.",
        wko: "1장에서 이미 말한 바로 그 자리.",
      },
      {
        id: "heb1-7",
        tag: "NT",
        en: "Heb 1:7",
        ko: "히 1:7",
        ten: "Of the angels he says, “He makes his angels winds, and his ministers a flame of fire.”",
        tko: "또 천사들에 관해서는 성경에 이르기를 “하나님께서는 천사들을 바람으로 삼으시고, 시중꾼들을 불꽃으로 삼으신다” 하였고,",
        wen: "Angels as ministers, set beside the Great High Priest.",
        wko: "섬기는 천사들, 큰 대제사장과 나란히 놓임.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "3–5",
    scene: "pattern",
    art: "3D · R3F — Moses stands on Sinai, drawn in survey contours, and sees the gold pattern. Its shadow falls and prints pale on the sheet, and the white copy is drawn inside the shadow.",
    en: {
      title: "A copy and shadow",
      quote:
        "“See that you make everything according to the pattern that was shown you on the mountain.”",
      sref: "Hebrews 8:5",
      cap: "Scene: the pattern shown on the mountain casts its shadow, and the earthly tent is drawn inside it.",
      snips: [
        "Every high priest offers gifts and sacrifices, so this priest must have something to offer",
        "On earth he would not be a priest at all",
        "They serve a copy and shadow; Moses was told to follow the pattern shown on the mountain",
      ],
      verses: [
        [
          3,
          "For every high priest is appointed to offer [gifts|gifts and sacrifices]; thus it is necessary for this priest also to have something to offer.",
        ],
        [
          4,
          "Now if he were on earth, he would [earth|not be a priest at all], since there are priests who offer gifts according to the law.",
        ],
        [
          5,
          "They [serve|serve] a [copy|copy] and [shadow|shadow] of the heavenly things. For when Moses was about to erect the tent, he was instructed by God, saying, “See that you make everything according to the [pattern|pattern] that was shown you on the mountain.”",
        ],
      ],
      com: [
        ["h", "What the high priests offered"],
        [
          "p",
          "The burnt offering, a gift or sacrifice (Lev 1; 3:8–13). The grain offering, a gift (Lev 2; 6:14–18). The peace offering, a gift (Lev 3; 7:11–34). The sin offering, a sacrifice (Lev 4:1–5:13). The guilt offering, a sacrifice (Lev 5:14–6:7). The personal daily grain offering (Lev 6:19–23). The daily incense offering (Exod 30:7–8). And each year, the Day of Atonement (Lev 16).",
        ],
        ["h", "This priest also has an offering"],
        [
          "p",
          "Verses 3–4 mean that Jesus Christ is also a high priest, so just as the earthly high priests needed to bring an offering, Jesus Christ also had an offering. The offerings of the earthly high priests were animals, scents and grains, in accordance with the law, and those offerings were foreshadowing what Jesus would do.",
        ],
        ["h", "Not a priest on earthly terms"],
        [
          "p",
          "Only Levi’s line were priests. By the law Jesus could not be a priest, as he was not a descendant of Levi but of Judah; he is still a priest, but not on earthly terms. It would also be pointless for Jesus to offer animal, grain and scent offerings.",
        ],
        ["h", "The pattern on the mountain"],
        [
          "p",
          "“They” in verse 5 are the priests of the earthly tent. In Exodus 25 God tells Moses to receive offerings from any Israelites willing to give: gold, silver and bronze; blue, purple and scarlet yarn and fine linen; goat hair, ram skins dyed red and another durable leather; acacia wood; olive oil for the lights; spices for the anointing oil and fragrant incense; and onyx and other gems for the ephod and breastplate. Then God tells him to build a sanctuary, with very specific instructions for the ark, the table and the lampstand.",
        ],
        [
          "p",
          "God then says in verse 40, “See that you make them according to the pattern shown you on the mountain.” Referencing this verse, the author emphasises that because the earthly tabernacle was only a copy and shadow, it was intentionally incomplete. Its completion was fulfilled by Jesus Christ.",
        ],
      ],
    },
    ko: {
      title: "모형과 그림자",
      quote:
        "“너는 명심하여 내가 산에서 네게 보여준 그 모형을 따라 모든 것을 만들어라”",
      sref: "히브리서 8:5",
      cap: "장면: 산에서 보여 주신 모형이 그림자를 드리우고, 그 안에 땅의 장막이 그려집니다.",
      snips: [
        "모든 대제사장은 예물과 제사를 드리므로, 이 대제사장도 드릴 것이 있어야 합니다",
        "땅에 계신다면 제사장이 되지 못하실 것입니다",
        "그들은 모형과 그림자를 섬기고, 모세는 산에서 본 모형을 따르라는 지시를 받았습니다",
      ],
      verses: [
        [
          3,
          "모든 대제사장은 [gifts|예물과 제사]를 드리는 일을 맡게 하려고 세우신 사람입니다. 그러므로 이 대제사장도 무엇인가 드릴 것을 가지고 있어야 합니다.",
        ],
        [
          4,
          "그런데 그가 땅에 계신다고 하면, [earth|제사장이 되지는 못하실 것입니다]. 땅에서는 율법을 따라 이미 예물을 드리는 사람들이 있기 때문입니다.",
        ],
        [
          5,
          "그러나 그들은 하늘에 있는 것들의 [copy|모형]과 [shadow|그림자]에 지나지 않는, 땅에 있는 성전에서 [serve|섬깁니다]. 모세가 장막을 세우려고 할 때에, “너는 명심하여 내가 산에서 네게 보여준 그 [pattern|모형]을 따라 모든 것을 만들어라” 하고 말씀하신 하나님의 지시를 받은 것입니다.",
        ],
      ],
      com: [
        ["h", "대제사장들이 드린 것"],
        [
          "p",
          "번제는 예물이자 제사입니다(레 1장, 3:8–13). 곡식제물은 예물입니다(레 2장, 6:14–18). 화목제물은 예물입니다(레 3장, 7:11–34). 속죄제물은 제사입니다(레 4:1–5:13). 속건제물은 제사입니다(레 5:14–6:7). 날마다 드리는 개인의 곡식제물(레 6:19–23), 날마다 드리는 분향(출 30:7–8), 그리고 해마다 돌아오는 속죄일(레 16장)이 있습니다.",
        ],
        ["h", "이 대제사장에게도 드릴 것이 있습니다"],
        [
          "p",
          "3–4절의 뜻은 예수 그리스도께서도 대제사장이시므로, 땅의 대제사장들이 제물을 가져와야 했던 것처럼 예수 그리스도께도 드릴 제물이 있었다는 것입니다. 땅의 대제사장들이 드린 제물은 율법을 따른 짐승과 향과 곡식이었고, 그 제물들은 예수님께서 이루실 일을 미리 보여 주는 것이었습니다.",
        ],
        ["h", "땅의 조건으로는 제사장이 아니심"],
        [
          "p",
          "레위 계통만 제사장이었습니다. 예수님은 레위가 아니라 유다의 자손이셨으므로 율법으로는 제사장이 되실 수 없었습니다. 그래도 그분은 제사장이시되, 땅의 조건을 따른 제사장이 아니십니다. 또한 예수님께서 짐승과 곡식과 향을 제물로 드리는 것은 아무 의미가 없었을 것입니다.",
        ],
        ["h", "산에서 보여 주신 모형"],
        [
          "p",
          "5절의 “그들”은 땅의 장막을 섬기는 제사장들입니다. 출애굽기 25장에서 하나님은 모세에게, 기꺼이 드리려는 이스라엘 사람들에게서 예물을 받으라고 하십니다. 금과 은과 동, 청색과 자주색과 홍색 실과 고운 모시, 염소 털, 붉게 물들인 숫양 가죽과 또 다른 질긴 가죽, 아카시아 나무, 등불에 쓸 기름, 기름 부을 때 쓰는 기름과 향에 넣을 향료, 에봇과 가슴받이에 박을 홍옥수와 그 밖의 보석입니다. 그리고 성소를 지으라고 하시면서, 궤와 상과 등잔대를 만드는 방법을 아주 자세히 알려 주십니다.",
        ],
        [
          "p",
          "이어서 40절에서 하나님은 산에서 보여 주신 모양 그대로 만들라고 말씀하십니다. 저자는 이 구절을 들어, 땅의 장막은 모형과 그림자일 뿐이므로 일부러 불완전하게 두어졌다는 것을 강조합니다. 그 완성은 예수 그리스도로 이루어졌습니다.",
        ],
      ],
    },
    words: {
      en: {
        gifts: {
          t: "Gifts and sacrifices",
          g: "dōra te kai thysias · δῶρά τε καὶ θυσίας",
          v: "8:3",
          s: "What a high priest offers",
          d: "Burnt, grain, peace, sin and guilt offerings, the daily incense, and the Day of Atonement each year.",
        },
        earth: {
          t: "Not a priest at all",
          g: "oud’ an ēn hiereus · οὐδ’ ἂν ἦν ἱερεύς",
          v: "8:4",
          s: "Judah, not Levi",
          d: "By law Jesus could not be a priest, as he was descended from Judah and not from Levi.",
        },
        serve: {
          t: "Serve",
          g: "latreuousin · λατρεύουσιν",
          v: "8:5",
          s: "Work for hire",
          d: "To work for reward, for hire or for pay; to be in servitude, to work for wages.",
        },
        copy: {
          t: "Copy",
          g: "hypodeigma · ὑπόδειγμα",
          v: "8:5",
          s: "An outline",
          d: "An example, pattern or illustration; an outline.",
        },
        shadow: {
          t: "Shadow",
          g: "skia · σκιά",
          v: "8:5",
          s: "A silhouette",
          d: "A faint outline or silhouette, an imperfect reflection of a real object.",
        },
        pattern: {
          t: "Pattern",
          g: "typos · τύπος",
          v: "8:5",
          s: "What a thing is made to",
          d: "A copy of the original of something; a pattern in conformity to which a thing must be made (Exod 25:40).",
        },
      },
      ko: {
        gifts: {
          t: "예물과 제사",
          g: "dōra te kai thysias · δῶρά τε καὶ θυσίας",
          v: "8:3",
          s: "대제사장이 드리는 것",
          d: "번제, 곡식제물, 화목제물, 속죄제물, 속건제물, 날마다 드리는 분향, 그리고 해마다 돌아오는 속죄일.",
        },
        earth: {
          t: "제사장이 되지는 못하실 것입니다",
          g: "oud’ an ēn hiereus · οὐδ’ ἂν ἦν ἱερεύς",
          v: "8:4",
          s: "레위가 아닌 유다",
          d: "예수님은 레위가 아니라 유다의 자손이셨으므로 율법으로는 제사장이 되실 수 없었습니다.",
        },
        serve: {
          t: "섬기다",
          g: "latreuousin · λατρεύουσιν",
          v: "8:5",
          s: "삯을 받고 일함",
          d: "보수나 삯을 받고 일하는 것. 종살이하는 것, 품삯을 받고 일하는 것.",
        },
        copy: {
          t: "모형",
          g: "hypodeigma · ὑπόδειγμα",
          v: "8:5",
          s: "윤곽",
          d: "본보기, 틀, 실례, 윤곽.",
        },
        shadow: {
          t: "그림자",
          g: "skia · σκιά",
          v: "8:5",
          s: "실루엣",
          d: "희미한 윤곽이나 실루엣, 실제 사물의 불완전한 반영.",
        },
        pattern: {
          t: "그 모형",
          g: "typos · τύπος",
          v: "8:5",
          s: "따라 만드는 본",
          d: "어떤 것의 원본을 옮긴 것. 그대로 따라 만들어야 하는 본(출 25:40).",
        },
      },
    },
    chips: [
      {
        id: "exo25-40",
        tag: "OT",
        en: "Exod 25:40",
        ko: "출 25:40",
        ten: "And see that you make them after the pattern for them, which is being shown you on the mountain.",
        tko: "이 모든 것을, 내가 이 산에서 너에게 보여 준 모양 그대로 만들도록 하여라.",
        wen: "The instruction the author quotes.",
        wko: "저자가 인용하는 지시.",
      },
      {
        id: "exo25-9",
        tag: "OT",
        en: "Exod 25:9",
        ko: "출 25:9",
        ten: "Exactly as I show you concerning the pattern of the tabernacle, and of all its furniture, so you shall make it.",
        tko: "내가 너에게 보여 주는 모양과 똑같은 모양으로 성막과 거기에서 쓸 모든 기구를 만들어라.",
        wen: "The same chapter, before the ark, table and lampstand.",
        wko: "같은 장, 궤와 상과 등잔대를 말씀하시기 전.",
      },
      {
        id: "col2-17",
        tag: "NT",
        en: "Col 2:17",
        ko: "골 2:17",
        ten: "These are a shadow of the things to come, but the substance belongs to Christ.",
        tko: "이런 것은 장차 올 것들의 그림자일 뿐이요, 그 실체는 그리스도에게 있습니다.",
        wen: "Shadow and substance.",
        wko: "그림자와 실체.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "6–7",
    scene: "second",
    art: "3D · R3F — the first tent stands in white beside a plot marked out in dashes and left empty. A larger tent is raised on it in gold.",
    en: {
      title: "Room for a second",
      quote:
        "“For if that first covenant had been faultless, there would have been no occasion to look for a second.”",
      sref: "Hebrews 8:7",
      cap: "Scene: beside the first tent a place is marked out and left empty, and a better one is raised on it.",
      snips: [
        "Christ has a more excellent ministry and mediates a better covenant on better promises",
        "If the first had been faultless, there would be no occasion for a second",
      ],
      verses: [
        [
          6,
          "But as it is, Christ has obtained a ministry that is as much [excellent|more excellent] than the old as the covenant he [mediates|mediates] is better, since it is enacted on [better|better promises].",
        ],
        [
          7,
          "For if that first covenant had been [faultless|faultless], there would have been no [occasion|occasion] to look for a second.",
        ],
      ],
      com: [
        ["h", "The contrast with verse 5"],
        [
          "p",
          "Verse 6 acts as a contrast to verse 5. The old, first covenant is the temporary, preparatory framework, a temporary guardian, which uses earthly priests, physical buildings and external laws to point toward a spiritual reality. Although these were all given by God, they had weaknesses which humans could not maintain or complete. So Jesus Christ enters the stage with the new covenant, the better thing to come, built on better promises.",
        ],
        ["h", "Outside to inside, inside to outside"],
        [
          "p",
          "The old covenant relied on an outside-to-inside system, where people often performed external acts in an attempt to earn God’s favour and trigger internal change. Because the old covenant was only a shadow of the true things, this system was inherently limited.",
        ],
        [
          "p",
          "The new covenant is an inside-to-outside system, where the Holy Spirit transforms people through faith. There are no longer external acts performed to obtain salvation or favour from God; salvation is received entirely through faith. Good works and external actions still happen, but they are no longer a checklist to get right with God. They are the natural, outward fruit of a heart that has already been changed from the inside.",
        ],
        ["h", "Why not Jesus in the first place?"],
        [
          "p",
          "A common question: why didn’t God give us Jesus Christ or the true tabernacle in the first place, if he knew the old covenant would be flawed and incomplete?",
        ],
        [
          "p",
          "First, humanity needed diagnostics before the cure. If you knew you were sick, you would want diagnostics before taking the medicine or having surgery. The old covenant acted as a spiritual mirror, forcing humanity to realise that they are too weak to comply with God’s holy standards, and that they were desperate for a Saviour.",
        ],
        [
          "p",
          "Second, humanity needed a visual aid. Spiritual concepts like holiness, atonement, substitution and judgment are highly abstract, so God gave physical representations, such as the earthly tabernacle and the priests and high priests, to teach them and help them understand salvation. Paul calls the law a paidagogos, a guardian, tutor or nanny (Gal 3:24), set to prepare people for the arrival of faith in Christ.",
        ],
        [
          "p",
          "Third, there was a set time in history. God waited for the perfect moment. The old covenant, approximately 1400 years, laid a massive, undeniable foundation of prophecies, sacrifices and structures, which helped people understand when Jesus came to earth. Even with this grand plan, many people, especially high priests and others in high places, did not understand God’s intentions when Jesus came.",
        ],
      ],
    },
    ko: {
      title: "두 번째 언약이 생길 여지",
      quote:
        "“그 첫 번째 언약에 결함이 없었더라면, 두 번째 언약이 생길 여지가 없었을 것입니다.”",
      sref: "히브리서 8:7",
      cap: "장면: 첫 번째 장막 곁에 빈자리가 표시되어 있고, 그 자리에 더 좋은 장막이 세워집니다.",
      snips: [
        "그리스도께서는 더 훌륭한 직무를 맡으셨고, 더 좋은 약속으로 세운 더 좋은 언약의 중재자이십니다",
        "첫 번째 언약에 결함이 없었더라면, 두 번째 언약이 생길 여지가 없었을 것입니다",
      ],
      verses: [
        [
          6,
          "그러나 이제 그리스도께서는 [excellent|더욱 훌륭한 직무]를 맡으셨습니다. 그가 [better|더 좋은 약속]을 바탕으로 하여 세운 더 좋은 언약의 [mediates|중재자]이시기 때문입니다.",
        ],
        [
          7,
          "그 첫 번째 언약에 [faultless|결함이 없었더라면], 두 번째 언약이 생길 [occasion|여지]가 없었을 것입니다.",
        ],
      ],
      com: [
        ["h", "5절과의 대조"],
        [
          "p",
          "6절은 5절과 대조를 이룹니다. 옛 첫 번째 언약은 땅의 제사장들과 눈에 보이는 건물과 바깥으로 지키는 율법을 써서 영적 실체를 가리키는, 임시로 준비하는 틀이자 임시 후견인입니다. 이 모든 것은 하나님께서 주신 것이지만, 사람이 지키거나 완성할 수 없는 약함이 있었습니다. 그래서 예수 그리스도께서 더 좋은 약속 위에 세워진 새 언약, 곧 앞으로 올 더 좋은 것을 가지고 오십니다.",
        ],
        ["h", "밖에서 안으로, 안에서 밖으로"],
        [
          "p",
          "옛 언약은 밖에서 안으로 향하는 체계에 기대었습니다. 사람들은 하나님의 호의를 얻고 내면의 변화를 일으키려고 바깥 행위를 행하곤 했습니다. 옛 언약은 참된 것들의 그림자일 뿐이었으므로, 이 체계에는 본래 한계가 있었습니다.",
        ],
        [
          "p",
          "새 언약은 안에서 밖으로 향하는 체계입니다. 성령께서 믿음을 통해 사람을 변화시키십니다. 구원이나 하나님의 호의를 얻으려고 행하는 바깥 행위는 더 이상 없고, 구원은 온전히 믿음으로 받습니다. 선한 일과 바깥 행동은 여전히 따르지만, 더 이상 하나님 앞에 바로 서기 위한 점검표가 아닙니다. 이미 안에서부터 변화된 마음이 자연스럽게 맺는 바깥 열매입니다.",
        ],
        ["h", "왜 처음부터 예수님이 아니었을까?"],
        [
          "p",
          "흔히 이런 질문을 합니다. 옛 언약에 흠이 있고 불완전할 줄 아셨다면, 왜 하나님은 처음부터 예수 그리스도와 참 장막을 주지 않으셨을까요?",
        ],
        [
          "p",
          "첫째, 사람에게는 치료 전에 진단이 필요했습니다. 자기가 아프다는 것을 알면, 약을 먹거나 수술을 받기 전에 진단부터 받으려 할 것입니다. 옛 언약은 영적인 거울이 되어, 사람이 하나님의 거룩한 기준을 지키기에 너무 약하다는 것과 구주가 간절히 필요하다는 것을 깨닫게 했습니다.",
        ],
        [
          "p",
          "둘째, 사람에게는 눈으로 볼 수 있는 교재가 필요했습니다. 거룩함, 속죄, 대속, 심판 같은 영적 개념은 매우 추상적이어서, 하나님은 땅의 장막과 제사장과 대제사장 같은 눈에 보이는 것들로 가르쳐 구원을 이해하게 하셨습니다. 바울은 율법을 파이다고고스, 곧 후견인이나 개인교사나 돌보는 사람이라고 부릅니다(갈 3:24). 그리스도를 믿는 믿음이 오기를 준비하게 하려는 것이었습니다.",
        ],
        [
          "p",
          "셋째, 역사 속에 정해진 때가 있었습니다. 하나님은 가장 알맞은 때를 기다리셨습니다. 약 1400년에 걸친 옛 언약은 예언과 제사와 제도로 크고 분명한 기초를 놓았고, 예수님께서 이 땅에 오셨을 때 그것을 이해하는 실마리가 되었습니다. 이렇게 큰 계획이 있었는데도, 많은 사람, 특히 대제사장과 높은 자리에 있는 사람들은 예수님께서 오셨을 때 하나님의 뜻을 깨닫지 못했습니다.",
        ],
      ],
    },
    words: {
      en: {
        excellent: {
          t: "More excellent",
          g: "diaphorōteras · διαφορωτέρας",
          v: "8:6",
          s: "Better by as much",
          d: "His ministry is better than the old by as much as the covenant he mediates is better.",
        },
        mediates: {
          t: "Mediates",
          g: "mesitēs · μεσίτης",
          v: "8:6",
          s: "The one between",
          d: "Jesus Christ enters the stage with the new covenant, built on better promises.",
        },
        better: {
          t: "Better promises",
          g: "kreittosin epangeliais · κρείττοσιν ἐπαγγελίαις",
          v: "8:6",
          s: "Promise, not law",
          d: "The difference between when God set the law for the old covenant and when God promised the new covenant.",
        },
        faultless: {
          t: "Faultless",
          g: "amemptos · ἄμεμπτος",
          v: "8:7",
          s: "Without deficiency",
          d: "The first covenant had weaknesses which humans could not maintain or complete.",
        },
        occasion: {
          t: "Occasion",
          g: "topos · τόπος",
          v: "8:7",
          s: "A place, room",
          d: "Literally a place. 새번역 reads 여지, room: had the first been faultless, no room would have been left for a second.",
        },
      },
      ko: {
        excellent: {
          t: "더욱 훌륭한 직무",
          g: "diaphorōteras · διαφορωτέρας",
          v: "8:6",
          s: "그만큼 더 나음",
          d: "그분의 직무는, 그분이 중재하시는 언약이 더 좋은 만큼 옛것보다 더 훌륭합니다.",
        },
        mediates: {
          t: "중재자",
          g: "mesitēs · μεσίτης",
          v: "8:6",
          s: "사이에 서는 분",
          d: "예수 그리스도께서 더 좋은 약속 위에 세워진 새 언약을 가지고 오십니다.",
        },
        better: {
          t: "더 좋은 약속",
          g: "kreittosin epangeliais · κρείττοσιν ἐπαγγελίαις",
          v: "8:6",
          s: "율법이 아닌 약속",
          d: "하나님께서 옛 언약의 율법을 세우신 때와 새 언약을 약속하신 때의 차이.",
        },
        faultless: {
          t: "결함이 없음",
          g: "amemptos · ἄμεμπτος",
          v: "8:7",
          s: "모자람이 없음",
          d: "첫 번째 언약에는 사람이 지키거나 완성할 수 없는 약함이 있었습니다.",
        },
        occasion: {
          t: "여지",
          g: "topos · τόπος",
          v: "8:7",
          s: "자리, 틈",
          d: "문자적으로 자리입니다. 첫 번째에 결함이 없었더라면 두 번째가 들어설 자리가 남지 않았을 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "gal3-24",
        tag: "NT",
        en: "Gal 3:24",
        ko: "갈 3:24",
        ten: "So then, the law was our guardian until Christ came, in order that we might be justified by faith.",
        tko: "그래서 율법은, 그리스도께서 오실 때까지, 우리에게 개인교사 역할을 하였습니다. 그것은, 우리로 하여금 믿음으로 의롭다고 하심을 받게 하시려고 한 것입니다.",
        wen: "The guardian, until faith came.",
        wko: "믿음이 올 때까지의 개인교사.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "8–12",
    scene: "hearts",
    art: "3D · R3F — the writing lifts off two stone tablets and crosses the sheet to a line of people, from the least of them to the greatest, and each heart is written in gold.",
    en: {
      title: "Written on their hearts",
      quote:
        "“I will put my laws into their minds, and write them on their hearts, and I will be their God, and they shall be my people.”",
      sref: "Hebrews 8:10",
      cap: "Scene: the writing leaves the stone for the heart, from the least of them to the greatest.",
      snips: [
        "He finds fault with them: the days are coming, a new covenant",
        "Not like the covenant of the day I took them by the hand out of Egypt",
        "I will write my laws on their hearts; I will be their God",
        "They shall all know me, from the least to the greatest",
        "I will remember their sins no more",
      ],
      verses: [
        [
          8,
          "For he [fault|finds fault] with them when he says: “Behold, the days are coming, declares the Lord, when I will establish a [new|new covenant] with the house of Israel and with the house of Judah,",
        ],
        [
          9,
          "not like the covenant that I made with their fathers on the day when I [hand|took them by the hand] to bring them out of the land of Egypt. For they [continue|did not continue in my covenant], and so I showed no concern for them, declares the Lord.",
        ],
        [
          10,
          "For this is the covenant that I will make with the house of Israel after those days, declares the Lord: I will put my laws into their minds, and [hearts|write them on their hearts], and I will be their God, and they shall be my people.",
        ],
        [
          11,
          "And they shall not teach, each one his neighbour and each one his brother, saying, ‘Know the Lord,’ for they shall all [know|know me], from the least of them to the greatest.",
        ],
        [
          12,
          "For I will be merciful toward their iniquities, and I will [remember|remember their sins no more].”",
        ],
      ],
      com: [
        ["h", "Background of Jeremiah 31"],
        [
          "p",
          "Along with chapter 30, these chapters talk about the restoration of Israel. Historically the nation had been split into two kingdoms, Northern Israel and Southern Judah. At the time of writing, Northern Israel had already been exiled by the Assyrian Empire, and the Babylonian Empire was at its peak, threatening and exiling Southern Judah.",
        ],
        [
          "p",
          "Chapter 31 talks about God’s everlasting love and restoration for the scattered people of both kingdoms: he promises to regather them, rebuild the land, turn their mourning into joy, and establish a new covenant. To regather is to return your faith to God.",
        ],
        ["h", "A conditional covenant"],
        [
          "p",
          "The old covenant was conditional, based on the people’s obedience to the law given by God. Through centuries of idolatry, social injustice and corruption, the people broke these conditions. As a result they faced judgment, first by the Assyrian Empire (Northern Israel) and later by the Babylonian Empire (Southern Judah).",
        ],
        [
          "p",
          "The exile served as a temporary discipline. In this time of deep despair, God promised a future restoration and established a new covenant to give the people lasting hope, a permanent solution to bring the Israelites back.",
        ],
      ],
    },
    ko: {
      title: "마음에다가 새겨 주겠다",
      quote:
        "“나는 내 율법을 그들의 생각에 넣어 주고, 그들의 마음에다가 새겨 주겠다. 그리하여 나는 그들의 하나님이 되고, 그들은 내 백성이 될 것이다.”",
      sref: "히브리서 8:10",
      cap: "장면: 작은 사람으로부터 큰 사람에 이르기까지, 글이 돌을 떠나 마음에 새겨집니다.",
      snips: [
        "하나님께서 나무라십니다. 날이 이를 것이다, 새 언약을 맺을 것이다",
        "조상들의 손을 잡고 이집트에서 인도하여 내던 날의 언약과 같지 않다",
        "내 율법을 그들의 마음에 새겨 주겠다. 나는 그들의 하나님이 될 것이다",
        "작은 사람으로부터 큰 사람에 이르기까지 모두 나를 알 것이다",
        "더 이상 그들의 죄를 기억하지 않겠다",
      ],
      verses: [
        [
          8,
          "그런데 하나님께서는 자기 백성을 [fault|나무라시면서] 이렇게 말씀하셨습니다. “주님께서 말씀하신다. ‘보아라, 날이 이를 것이다. 그 때에 내가 이스라엘 집과 유다 집과 더불어 [new|새 언약]을 맺을 것이다.’",
        ],
        [
          9,
          "또 주님께서 말씀하신다. ‘이 새 언약은, 내가 그들의 조상들의 [hand|손을 잡고], 이집트 땅에서 인도하여 내던 날에, 그 조상들과 맺은 언약과 같은 것이 아니다. 그들은 [continue|내 언약을 지키지 않았으므로], 나도 그들을 돌보지 않았다.’",
        ],
        [
          10,
          "또 주님께서 말씀하신다. ‘그 날 뒤에, 내가 이스라엘 집과 맺을 언약은 이것이니, 나는 내 율법을 그들의 생각에 넣어 주고, 그들의 [hearts|마음에다가 새겨 주겠다]. 그리하여 나는 그들의 하나님이 되고, 그들은 내 백성이 될 것이다.",
        ],
        [
          11,
          "그리고 그들은 각각 자기 이웃과 자기 동족을 가르치려고, 주님을 알라고 말하는 일이 없을 것이니, 작은 사람으로부터 큰 사람에 이르기까지, [know|모두 나를 알 것]이기 때문이다.",
        ],
        [
          12,
          "내가 그들의 불의함을 긍휼히 여기겠고, 더 이상 그들의 [remember|죄를 기억하지 않겠다].’”",
        ],
      ],
      com: [
        ["h", "예레미야 31장의 배경"],
        [
          "p",
          "30장과 함께 이 장들은 이스라엘의 회복을 말합니다. 역사적으로 나라는 북 이스라엘과 남 유다, 두 왕국으로 나뉘어 있었습니다. 이 글이 쓰일 때 북 이스라엘은 이미 앗시리아 제국에 사로잡혀 갔고, 바빌로니아 제국은 전성기에 이르러 남 유다를 위협하고 사로잡아 가고 있었습니다.",
        ],
        [
          "p",
          "31장은 흩어진 두 왕국 백성을 향한 하나님의 영원한 사랑과 회복을 말합니다. 하나님은 그들을 다시 모으고, 땅을 다시 세우고, 슬픔을 기쁨으로 바꾸고, 새 언약을 세우겠다고 약속하십니다. 다시 모은다는 것은 믿음을 하나님께로 되돌리는 것입니다.",
        ],
        ["h", "조건이 있는 언약"],
        [
          "p",
          "옛 언약은 하나님께서 주신 율법에 대한 백성의 순종을 조건으로 했습니다. 여러 세기에 걸친 우상 숭배와 사회의 불의와 부패로 백성은 이 조건을 깨뜨렸습니다. 그 결과 먼저 앗시리아 제국에게(북 이스라엘), 나중에 바빌로니아 제국에게(남 유다) 심판을 받았습니다.",
        ],
        [
          "p",
          "포로 생활은 임시의 징계였습니다. 깊은 절망의 때에 하나님은 앞날의 회복을 약속하시고, 백성에게 오래 갈 소망을 주시려고 새 언약을 세우셨습니다. 이것은 이스라엘 백성을 다시 데려오시는 영구한 해결책이었습니다.",
        ],
      ],
    },
    words: {
      en: {
        fault: {
          t: "Finds fault",
          g: "memphomenos · μεμφόμενος",
          v: "8:8",
          s: "Deficiency, failure",
          d: "Fault means deficiency, failure. In verse 8 he finds it “with them”.",
        },
        new: {
          t: "New covenant",
          g: "diathēkēn kainēn · διαθήκην καινήν",
          v: "8:8",
          s: "Promised to both houses",
          d: "Jeremiah 31 promises it to the scattered people of both kingdoms, Israel and Judah.",
        },
        hand: {
          t: "Took them by the hand",
          g: "epilabomenou mou tēs cheiros · ἐπιλαβομένου μου τῆς χειρὸς",
          v: "8:9",
          s: "The day of the exodus",
          d: "The first covenant, made on the day God brought their fathers out of Egypt.",
        },
        continue: {
          t: "Did not continue",
          g: "ouk enemeinan · οὐκ ἐνέμειναν",
          v: "8:9",
          s: "The conditions broken",
          d: "The old covenant was conditional on obedience, and through centuries of idolatry, injustice and corruption the people broke it.",
        },
        hearts: {
          t: "Write them on their hearts",
          g: "epi kardias autōn epigrapsō · ἐπὶ καρδίας αὐτῶν ἐπιγράψω",
          v: "8:10",
          s: "Inside to outside",
          d: "The new covenant is an inside-to-outside system: the Holy Spirit transforms people through faith.",
        },
        know: {
          t: "They shall all know me",
          g: "pantes eidēsousin me · πάντες εἰδήσουσίν με",
          v: "8:11",
          s: "Least to greatest",
          d: "From the least of them to the greatest, with no one needing to be told, “Know the Lord.”",
        },
        remember: {
          t: "Remember no more",
          g: "ou mē mnēsthō eti · οὐ μὴ μνησθῶ ἔτι",
          v: "8:12",
          s: "A permanent solution",
          d: "God’s promise of lasting hope in the deep despair of the exile.",
        },
      },
      ko: {
        fault: {
          t: "나무라다",
          g: "memphomenos · μεμφόμενος",
          v: "8:8",
          s: "모자람, 실패",
          d: "결함은 모자람과 실패를 뜻합니다. 8절에서 하나님은 자기 백성을 나무라십니다.",
        },
        new: {
          t: "새 언약",
          g: "diathēkēn kainēn · διαθήκην καινήν",
          v: "8:8",
          s: "두 집에 주신 약속",
          d: "예레미야 31장은 흩어진 두 왕국 백성, 이스라엘과 유다에게 이것을 약속합니다.",
        },
        hand: {
          t: "손을 잡고",
          g: "epilabomenou mou tēs cheiros · ἐπιλαβομένου μου τῆς χειρὸς",
          v: "8:9",
          s: "출애굽의 날",
          d: "하나님께서 조상들을 이집트에서 인도하여 내신 날에 맺으신 첫 번째 언약.",
        },
        continue: {
          t: "지키지 않음",
          g: "ouk enemeinan · οὐκ ἐνέμειναν",
          v: "8:9",
          s: "깨어진 조건",
          d: "옛 언약은 순종을 조건으로 했고, 백성은 여러 세기에 걸친 우상 숭배와 불의와 부패로 그것을 깨뜨렸습니다.",
        },
        hearts: {
          t: "마음에다가 새겨 주겠다",
          g: "epi kardias autōn epigrapsō · ἐπὶ καρδίας αὐτῶν ἐπιγράψω",
          v: "8:10",
          s: "안에서 밖으로",
          d: "새 언약은 안에서 밖으로 향하는 체계입니다. 성령께서 믿음을 통해 사람을 변화시키십니다.",
        },
        know: {
          t: "모두 나를 알 것",
          g: "pantes eidēsousin me · πάντες εἰδήσουσίν με",
          v: "8:11",
          s: "작은 사람부터 큰 사람까지",
          d: "작은 사람으로부터 큰 사람에 이르기까지, 주님을 알라고 말할 필요가 없습니다.",
        },
        remember: {
          t: "죄를 기억하지 않겠다",
          g: "ou mē mnēsthō eti · οὐ μὴ μνησθῶ ἔτι",
          v: "8:12",
          s: "영구한 해결책",
          d: "포로 생활의 깊은 절망 속에서 주신, 오래 갈 소망의 약속.",
        },
      },
    },
    chips: [
      {
        id: "jer31-33",
        tag: "OT",
        en: "Jer 31:33",
        ko: "렘 31:33",
        ten: "For this is the covenant that I will make with the house of Israel after those days, declares the Lord: I will put my law within them, and I will write it on their hearts. And I will be their God, and they shall be my people.",
        tko: "그러나 그 시절이 지난 뒤에, 내가 이스라엘 가문과 언약을 세울 것이니, 나는 나의 율법을 그들의 가슴 속에 넣어 주며, 그들의 마음 판에 새겨 기록하여, 나는 그들의 하나님이 되고, 그들은 나의 백성이 될 것이다. 나 주의 말이다.",
        wen: "The promise the author quotes at length.",
        wko: "저자가 길게 인용하는 약속.",
      },
      {
        id: "jer31-34",
        tag: "OT",
        en: "Jer 31:34",
        ko: "렘 31:34",
        ten: "And no longer shall each one teach his neighbor and each his brother, saying, ‘Know the Lord,’ for they shall all know me, from the least of them to the greatest, declares the Lord. For I will forgive their iniquity, and I will remember their sin no more.",
        tko: "그 때에는 이웃이나 동포끼리 서로 ‘너는 주님을 알아라’ 하지 않을 것이니, 이것은 작은 사람으로부터 큰 사람에 이르기까지, 그들이 모두 나를 알 것이기 때문이다. 내가 그들의 허물을 용서하고, 그들의 죄를 다시는 기억하지 않겠다. 나 주의 말이다.",
        wen: "The end of Jeremiah’s promise.",
        wko: "예레미야의 약속의 끝.",
      },
      {
        id: "luk22-20",
        tag: "NT",
        en: "Luke 22:20",
        ko: "눅 22:20",
        ten: "And likewise the cup after they had eaten, saying, “This cup that is poured out for you is the new covenant in my blood.”",
        tko: "그리고 저녁을 먹은 뒤에, 잔을 그와 같이 하시고서 말씀하셨다. “이 잔은 너희를 위하여 흘리는 내 피로 세우는 새 언약이다.",
        wen: "Jesus names the new covenant.",
        wko: "예수님께서 새 언약을 말씀하심.",
      },
      {
        id: "2co3-3",
        tag: "NT",
        en: "2 Cor 3:3",
        ko: "고후 3:3",
        ten: "And you show that you are a letter from Christ delivered by us, written not with ink but with the Spirit of the living God, not on tablets of stone but on tablets of human hearts.",
        tko: "여러분은 분명히 그리스도께서 쓰신 편지입니다. 우리는 그것을 작성하는 데에 봉사하였습니다. 그것은 먹물로 쓴 것이 아니라 살아 계신 하나님의 영으로 쓴 것이요, 돌판에 쓴 것이 아니라 가슴 판에 쓴 것입니다.",
        wen: "From tablets of stone to tablets of the heart.",
        wko: "돌판에서 가슴 판으로.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "13",
    scene: "vanish",
    art: "3D · R3F — the white copy and its court wear away stitch by stitch until only a faint pale print is left, beneath the gold tent that remains.",
    en: {
      title: "Ready to vanish",
      quote:
        "“What is becoming obsolete and growing old is ready to vanish away.”",
      sref: "Hebrews 8:13",
      cap: "Scene: the copy wears away and its print fades, beneath the tent that remains.",
      snips: [
        "Speaking of a new covenant makes the first obsolete, ready to vanish",
      ],
      verses: [
        [
          13,
          "In speaking of a new covenant, he makes the first one [obsolete|obsolete]. And what is becoming obsolete and [old|growing old] is ready to [vanish|vanish away].",
        ],
      ],
      com: [
        ["h", "Obsolete, not meaningless"],
        [
          "p",
          "God spoke through Jeremiah that the old covenant would be made obsolete because of its flaws. It was only a copy and shadow of the true things to come. With the establishment of the new covenant the old has become obsolete, and the new is completed by a better High Priest, Jesus Christ.",
        ],
        [
          "p",
          "This does not mean that the old covenant is meaningless. It laid the foundation for understanding God’s plan and why Jesus came.",
        ],
      ],
    },
    ko: {
      title: "곧 사라집니다",
      quote: "“낡고 오래된 것은 곧 사라집니다.”",
      sref: "히브리서 8:13",
      cap: "장면: 남아 있는 장막 아래에서 모형은 닳아 없어지고 그 자국도 희미해집니다.",
      snips: [
        "새 언약이라는 말씀으로 첫 번째 언약은 낡은 것이 되어 곧 사라집니다",
      ],
      verses: [
        [
          13,
          "하나님께서 ‘새 언약’이라고 말씀하심으로써, 첫 번째 언약을 [obsolete|낡은 것]으로 만드셨습니다. [old|낡고 오래된 것]은 곧 [vanish|사라집니다].",
        ],
      ],
      com: [
        ["h", "낡았지만 무의미하지 않습니다"],
        [
          "p",
          "하나님은 예레미야를 통해, 옛 언약이 그 흠 때문에 낡은 것이 되리라고 말씀하셨습니다. 그것은 앞으로 올 참된 것들의 모형과 그림자일 뿐이었습니다. 새 언약이 세워지면서 옛것은 낡은 것이 되었고, 새것은 더 좋은 대제사장이신 예수 그리스도로 완성됩니다.",
        ],
        [
          "p",
          "그렇다고 옛 언약이 무의미하다는 뜻은 아닙니다. 옛 언약은 하나님의 계획과 예수님께서 오신 까닭을 이해하는 기초를 놓았습니다.",
        ],
      ],
    },
    words: {
      en: {
        obsolete: {
          t: "Obsolete",
          g: "pepalaiōken · πεπαλαίωκεν",
          v: "8:13",
          s: "Made old",
          d: "To become old, to make ancient, to be worn out.",
        },
        old: {
          t: "Growing old",
          g: "gēraskon · γηράσκον",
          v: "8:13",
          s: "Ageing",
          d: "The old covenant, approximately 1400 years, had done its work as a temporary guardian.",
        },
        vanish: {
          t: "Vanish away",
          g: "aphanismou · ἀφανισμοῦ",
          v: "8:13",
          s: "Disappearance",
          d: "Disappearance, destruction.",
        },
      },
      ko: {
        obsolete: {
          t: "낡은 것",
          g: "pepalaiōken · πεπαλαίωκεν",
          v: "8:13",
          s: "낡게 됨",
          d: "낡아지다, 오래되게 하다, 닳아 없어지다.",
        },
        old: {
          t: "낡고 오래된 것",
          g: "gēraskon · γηράσκον",
          v: "8:13",
          s: "늙어 감",
          d: "약 1400년의 옛 언약은 임시 후견인으로서 할 일을 마쳤습니다.",
        },
        vanish: {
          t: "사라지다",
          g: "aphanismou · ἀφανισμοῦ",
          v: "8:13",
          s: "없어짐",
          d: "없어짐, 멸망.",
        },
      },
    },
    chips: [
      {
        id: "heb10-9",
        tag: "NT",
        en: "Heb 10:9",
        ko: "히 10:9",
        ten: "then he added, “Behold, I have come to do your will.” He does away with the first in order to establish the second.",
        tko: "그 다음에 말씀하시기를 “보십시오, 나는 주님의 뜻을 행하러 왔습니다” 하셨습니다. 그리스도께서는 두 번째 것을 세우시려고, 첫 번째 것을 폐하셨습니다.",
        wen: "The first set aside for the second.",
        wko: "두 번째를 세우시려고 폐하신 첫 번째.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "The true tent",
        items: [
          [
            "vv1–2",
            "We have a high priest seated at the right hand of the Majesty, a minister in the true tent that the Lord set up, not man.",
          ],
          [
            "vv3–5",
            "On earth he would not be a priest at all. The earthly priests serve a copy and shadow, made to the pattern shown on the mountain.",
          ],
        ],
      },
      {
        h: "The better covenant",
        items: [
          [
            "vv6–7",
            "Christ mediates a better covenant on better promises. Had the first been faultless, there would have been no occasion for a second.",
          ],
          [
            "vv8–12",
            "Through Jeremiah God promises a new covenant: his laws written on hearts, all knowing him from the least to the greatest, and sins remembered no more.",
          ],
          [
            "v13",
            "To speak of a new covenant makes the first obsolete, and what is growing old is ready to vanish away.",
          ],
        ],
      },
    ],
    intentH: "The author’s intention",
    intentShort:
      "To show that the old covenant was a copy and shadow, made obsolete by the new covenant completed by a better High Priest, Jesus Christ.",
    intent: [
      "God spoke through Jeremiah that the old covenant would be made obsolete because of its flaws. The old covenant was only a copy and the shadow of the true things to come.",
      "With the establishment of the new covenant the old has become obsolete, and the new is completed by a better High Priest, Jesus Christ. Jesus Christ is the new covenant, through better promises spoken by God.",
    ],
  },
  ko: {
    groups: [
      {
        h: "참 장막",
        items: [
          [
            "1–2절",
            "우리에게는 지엄하신 분의 오른쪽에 앉으신 대제사장이 계십니다. 그분은 사람이 아니라 주님께서 세우신 참 장막에서 섬기십니다.",
          ],
          [
            "3–5절",
            "땅에 계신다면 그분은 제사장이 되지 못하실 것입니다. 땅의 제사장들은 산에서 보여 주신 모형을 따라 만든 모형과 그림자를 섬깁니다.",
          ],
        ],
      },
      {
        h: "더 좋은 언약",
        items: [
          [
            "6–7절",
            "그리스도께서는 더 좋은 약속 위에 세운 더 좋은 언약의 중재자이십니다. 첫 번째 언약에 결함이 없었더라면, 두 번째 언약이 생길 여지가 없었을 것입니다.",
          ],
          [
            "8–12절",
            "하나님은 예레미야를 통해 새 언약을 약속하십니다. 율법을 마음에 새기시고, 작은 사람부터 큰 사람까지 모두 그분을 알고, 죄를 더 이상 기억하지 않으십니다.",
          ],
          [
            "13절",
            "새 언약을 말씀하심으로 첫 번째 언약은 낡은 것이 되었고, 낡고 오래된 것은 곧 사라집니다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "옛 언약은 모형과 그림자였고, 더 좋은 대제사장이신 예수 그리스도로 완성되는 새 언약으로 낡은 것이 되었음을 보여 주는 것.",
    intent: [
      "하나님은 예레미야를 통해, 옛 언약이 그 흠 때문에 낡은 것이 되리라고 말씀하셨습니다. 옛 언약은 앞으로 올 참된 것들의 모형과 그림자일 뿐이었습니다.",
      "새 언약이 세워지면서 옛것은 낡은 것이 되었고, 새것은 더 좋은 대제사장이신 예수 그리스도로 완성됩니다. 예수 그리스도는 하나님께서 말씀하신 더 좋은 약속을 통한 새 언약이십니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 8",
    tagline:
      "“I will put my laws into their minds, and write them on their hearts.”",
    taglineRef: "Hebrews 8:10",
    mapTitle: "Thirteen verses, five movements",
    mapIntro:
      "Our high priest serves in the true tent. The earthly one was a copy and shadow of it, made to the pattern shown on the mountain. Then, through Jeremiah, God promises a new covenant written on the heart, and the old grows old and is ready to vanish.",
    summaryTitle: "What Hebrews 8 says",
    footQuote:
      "“I will be merciful toward their iniquities, and I will remember their sins no more.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 8장",
    tagline:
      "“나는 내 율법을 그들의 생각에 넣어 주고, 그들의 마음에다가 새겨 주겠다.”",
    taglineRef: "히브리서 8:10",
    mapTitle: "열세 절, 다섯 흐름",
    mapIntro:
      "우리 대제사장은 참 장막에서 섬기십니다. 땅의 장막은 산에서 보여 주신 모형을 따라 만든, 그 모형과 그림자였습니다. 그리고 하나님은 예레미야를 통해 마음에 새기는 새 언약을 약속하시고, 옛것은 낡아서 곧 사라집니다.",
    summaryTitle: "히브리서 8장이 말하는 것",
    footQuote:
      "“내가 그들의 불의함을 긍휼히 여기겠고, 더 이상 그들의 죄를 기억하지 않겠다.”",
    version: "새번역",
  },
};

export const chapter8: ChapterContent = {
  number: 8,
  setting: "pattern",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
