import type { QuizQuestion } from "./types";

export const quiz1: QuizQuestion[] = [
  {
    id: "1-why-angels",
    kind: "choice",
    mid: "m1",
    verses: "4–14",
    en: {
      q: "Why does Hebrews 1 spend so long comparing Jesus with the angels?",
      options: [
        "Its readers honoured angels highly, and some saw Jesus as a high-ranking angel",
        "Angels brought the Law at Sinai, so he wants the readers to keep the Law more carefully",
        "Angels serve believers, so he wants the readers to call on them for help in hard times",
        "Some thought angels were evil, so he shows they serve God",
      ],
      why: "Jewish believers honoured angels deeply, holding that the Law of Moses came through angels at Sinai. Some thought of Jesus as a high-ranking angel, and some even worshipped angels. The author draws a clear line: angels are servants, created beings who worship the King. Jesus is the Creator and the Sovereign.",
    },
    ko: {
      q: "히브리서 1장은 왜 예수님과 천사들을 그렇게 길게 비교합니까?",
      options: [
        "독자들이 천사를 매우 높였고, 어떤 이들은 예수님을 높은 천사로 보았기 때문에",
        "천사들이 시내산에서 율법을 전했으니, 율법을 더 잘 지키라고 권하려고",
        "천사들이 신자를 섬기니, 어려울 때 천사에게 도움을 구하라고 권하려고",
        "어떤 이들이 천사를 악하다고 여겨서, 천사도 하나님을 섬김을 보여 주려고",
      ],
      why: "유대인 신자들은 모세의 율법이 시내산에서 천사들을 통해 전해졌다고 믿었기에 천사를 매우 높였습니다. 어떤 이들은 예수님을 높은 계급의 천사로 보았고, 어떤 이들은 천사를 숭배했습니다. 저자는 분명한 선을 긋습니다. 천사는 종이며 피조물이고 왕께 경배하는 자들입니다. 예수 그리스도는 창조주이시며 주권자이십니다.",
    },
  },
  {
    id: "1-radiance",
    kind: "choice",
    mid: "m1",
    verses: "3",
    en: {
      q: "Hebrews 1:3 calls the Son the “radiance” of God’s glory. What does the picture of a sunbeam teach?",
      options: [
        "The Son cannot be separated from God: where the beam is, the sun is there too",
        "He shows God as the moon shows the sun: by reflection",
        "The Son is a second source of light beside God, equal to him but separate",
        "He carries God’s light to the world, as a lamp carries fire",
      ],
      why: "Radiance is brightness beaming out from its source. You cannot separate a sunbeam from the sun, and wherever the beam is, the sun is there too. The Son is not a distant reflection of God. He is God’s own glory shining out.",
    },
    ko: {
      q: "히브리서 1장 3절은 아들을 하나님의 영광의 “광채”라고 부릅니다. 햇살의 그림은 무엇을 가르칩니까?",
      options: [
        "아들은 하나님과 분리될 수 없습니다. 햇살이 있는 곳에 해도 함께 있습니다",
        "달이 해를 보여 주듯, 반사된 빛으로 하나님을 보여 주십니다",
        "아들은 하나님 곁에 있는 두 번째 빛의 근원으로, 동등하지만 따로 있습니다",
        "등잔이 불을 옮기듯, 하나님의 빛을 세상에 옮기십니다",
      ],
      why: "광채는 근원에서 뻗어 나오는 밝은 빛입니다. 햇살은 해와 분리될 수 없고, 햇살이 있는 곳에는 해도 함께 있습니다. 아들은 하나님을 멀리서 비추는 반사가 아닙니다. 하나님 자신의 영광이 비추어 나오는 것입니다.",
    },
  },
  {
    id: "1-imprint",
    kind: "choice",
    mid: "m1",
    verses: "3",
    en: {
      q: "The Son is the “exact imprint” of God’s nature. What picture lies behind that word?",
      options: [
        "An engraver’s stamp and the exact mark it leaves in wax",
        "A face reflected in still water: clear, but only a likeness",
        "A builder’s plan drawn beforehand, showing what will be made",
        "A sundial’s shadow, which follows the sun and tells its hour",
      ],
      why: "The word first meant an engraver’s stamp, and later the mark that stamp leaves on a coin or wax seal. When the seal is pressed, the image matches exactly. So the Son is not a likeness of God made from outside; he bears God’s very nature.",
    },
    ko: {
      q: "아들은 하나님의 “본체대로의 모습”입니다. 이 말 뒤에는 어떤 그림이 있습니까?",
      options: [
        "조각가의 도장과, 그것이 밀랍에 남기는 꼭 같은 자국",
        "잔잔한 물에 비친 얼굴처럼, 또렷하지만 닮은 모습일 뿐인 것",
        "미리 그린 건물의 설계도처럼, 지어질 것을 보여 주는 것",
        "해를 따라 움직이며 시간을 알려 주는 해시계의 그림자",
      ],
      why: "이 단어는 처음에 조각가의 도장을 뜻했고, 나중에는 그 도장이 동전이나 밀랍 인장에 남기는 자국을 뜻했습니다. 인장을 누르면 모양이 정확히 일치합니다. 아들은 밖에서 본떠 만든 하나님의 닮은꼴이 아니라, 하나님의 본성 그 자체를 지니신 분입니다.",
    },
  },
  {
    id: "1-firstborn",
    kind: "truefalse",
    mid: "m2",
    verses: "6",
    answer: false,
    en: {
      q: "Calling the Son “firstborn” means he was the first thing God created.",
      why: "False. “Firstborn” is about rank, not birth order: it names the one with the right of inheritance. That is why, when he enters the world, the angels are commanded to worship him.",
    },
    ko: {
      q: "아들을 “맏아들”이라고 부르는 것은 그가 하나님께서 처음 지으신 존재라는 뜻입니다.",
      why: "틀립니다. “맏아들”은 태어난 순서가 아니라 지위를 말합니다. 상속권을 가진 사람을 가리킵니다. 그래서 그가 세상에 들어오실 때 천사들에게 그에게 경배하라는 명령이 내려집니다.",
    },
  },
  {
    id: "1-coronation",
    kind: "choice",
    mid: "m2",
    verses: "5",
    en: {
      q: "Why does it matter that God says “You are my Son” (Psalm 2) to Jesus?",
      options: [
        "It crowns the Son over all, and God never said it to any angel",
        "It shows that God adopted Jesus as his Son at his baptism, after his faithful life",
        "It was said to David’s line, so Jesus is one more king",
        "It shows that angels are also sons of God, but that Jesus is the eldest of them",
      ],
      why: "Psalm 2 pictures the kings of the earth rebelling, and God answers by setting his Son over all. “You are my Son” is spoken at a coronation. The point of verse 5 is that God never said this to any angel: the name “Son” belongs to Jesus alone.",
    },
    ko: {
      q: "하나님께서 예수님께 “너는 내 아들이다”(시편 2편)라고 하신 것이 왜 중요합니까?",
      options: [
        "아들을 만물 위에 세우는 즉위의 말씀이며, 어떤 천사에게도 하신 적이 없습니다",
        "하나님께서 예수님의 신실한 삶을 보시고 세례 때 그를 양자로 삼으셨다는 뜻입니다",
        "다윗의 자손에게 하신 말씀이니, 예수님도 그런 왕 가운데 한 분입니다",
        "천사들도 하나님의 아들이지만, 예수님이 그중 맏이시라는 뜻입니다",
      ],
      why: "시편 2편은 세상 왕들이 반역할 때 하나님께서 그 아들을 만물 위에 세우시는 모습을 그립니다. “너는 내 아들이다”는 즉위식에서 하는 말입니다. 5절의 요점은 하나님께서 이 말씀을 어떤 천사에게도 하신 적이 없다는 것입니다. “아들”이라는 이름은 오직 예수님의 것입니다.",
    },
  },
  {
    id: "1-winds-flames",
    kind: "choice",
    mid: "m3",
    verses: "7",
    en: {
      q: "God makes his angels “winds” and “flames of fire”. What is the point of that description?",
      options: [
        "They work swiftly and powerfully, yet they are only God’s servants",
        "They change like wind and fire, so God’s word cannot be trusted to them",
        "They are pure spirit, so they stand nearer to God",
        "They bring judgement like fire, so fear them",
      ],
      why: "Like wind and fire, angels work invisibly, swiftly and powerfully, with holy fervour. But Psalm 104 makes a point of calling them ministers: servants of God. Beside them, the Son’s throne lasts forever.",
    },
    ko: {
      q: "하나님은 천사들을 “바람”과 “불꽃”으로 삼으십니다. 이 묘사의 요점은 무엇입니까?",
      options: [
        "빠르고 강력하게 일하지만, 하나님의 종일 뿐입니다",
        "바람과 불처럼 변하기 쉬워서, 하나님의 말씀을 맡길 수 없는 존재입니다",
        "순수한 영이어서, 사람보다 하나님께 더 가까이 섭니다",
        "불처럼 심판을 행하니, 그들을 두려워해야 합니다",
      ],
      why: "천사들은 바람과 불처럼 보이지 않게, 그러나 빠르고 강력하게, 거룩한 열심으로 일합니다. 그러나 시편 104편은 그들을 분명히 일꾼, 곧 하나님의 종이라고 부릅니다. 그들 곁에서 아들의 보좌는 영원히 서 있습니다.",
    },
  },
  {
    id: "1-garment",
    kind: "choice",
    mid: "m4",
    verses: "10–12",
    en: {
      q: "Hebrews 1:10–12 says the heavens will wear out and be rolled up like a robe. What is the contrast?",
      options: [
        "Creation wears out like a garment, but the Son stays the same and never ends",
        "Creation is renewed like a garment in every age, and the Son is the one who keeps it new",
        "The heavens wear out, but the Son’s earth stands forever",
        "Both creation and the Son change over the ages, but the Son changes only for the better",
      ],
      why: "Earth and heavens alike are not eternal. They are wearing out like a garment after long use. The Son can replace this world as easily as you change a piece of clothing. The heavens fold; he does not. He remains the same, untouched by decay.",
    },
    ko: {
      q: "히브리서 1장 10–12절은 하늘이 낡아서 두루마기처럼 말릴 것이라고 말합니다. 무엇과 무엇이 대조됩니까?",
      options: [
        "피조물은 옷처럼 닳아 가지만, 아들은 여전하시고 끝이 없습니다",
        "피조물은 시대마다 옷처럼 새로워지고, 아들은 그것을 늘 새롭게 지키시는 분입니다",
        "하늘은 낡아 가지만, 아들이 지으신 땅은 영원히 섭니다",
        "피조물도 아들도 세월 따라 변하지만, 아들은 언제나 더 좋은 쪽으로만 변하십니다",
      ],
      why: "땅과 하늘은 영원하지 않습니다. 오래 입은 옷처럼 닳아 가고 있습니다. 아들은 옷을 갈아입듯 쉽게 이 세상을 바꾸실 수 있습니다. 하늘은 말려도 그분은 그대로이십니다. 쇠함에 닿지 않고 언제나 같으십니다.",
    },
  },
  {
    id: "1-my-lord",
    kind: "choice",
    mid: "m5",
    verses: "13",
    en: {
      q: "In Psalm 110:1 David writes, “The LORD says to my Lord.” Why must “my Lord” be the Messiah?",
      options: [
        "David was king, so no human was his lord; one greater must be meant",
        "“My Lord” was a courtly title for any king, so David means his heir, Solomon",
        "The priests sang this psalm about David, so “my Lord” is King David himself",
        "It means the angel of the LORD who fought for Israel",
      ],
      why: "This is Yahweh speaking to David’s Adonai: his lord, owner and ruler. David was king of Israel and held the highest authority, so in human terms he had no Adonai. The one greater than David can only be the Messiah, Jesus, seated until every enemy is placed under his feet.",
    },
    ko: {
      q: "시편 110편 1절에서 다윗은 “주님께서 내 주님께 말씀하셨다”라고 씁니다. 왜 “내 주님”은 메시아일 수밖에 없습니까?",
      options: [
        "다윗은 왕이어서 사람 주인이 없었으니, 그보다 크신 분을 가리킵니다",
        "“내 주님”은 왕을 부르는 존칭이었으니, 다윗의 후계자 솔로몬을 뜻합니다",
        "제사장들이 다윗에 대해 부른 시편이니, “내 주님”은 다윗 왕 자신입니다",
        "이스라엘을 위해 싸운 주님의 천사를 뜻합니다",
      ],
      why: "이것은 야훼께서 다윗의 아도나이, 곧 그의 주인이요 다스리는 분에게 하신 말씀입니다. 다윗은 이스라엘의 왕으로서 가장 높은 권위를 가졌으니, 사람의 기준으로는 아도나이가 없었습니다. 다윗보다 크신 분은 메시아 예수님뿐이며, 그분은 모든 원수가 발아래 놓일 때까지 앉아 계십니다.",
    },
  },
  {
    id: "1-which-ministering",
    kind: "which",
    mid: "m5",
    verses: "14",
    chapters: [1, 2, 6, 10],
    en: {
      q: "Angels are ministering spirits, sent out to serve those who will inherit salvation.",
      why: "Hebrews 1:14 closes the chapter where it began: angels are servants and messengers, and Jesus is the Son through whom and for whom the world was made.",
    },
    ko: {
      q: "천사들은 구원의 상속자가 될 사람들을 섬기도록 보내심을 받은 영들입니다.",
      why: "히브리서 1장 14절은 장을 시작한 곳에서 마무리합니다. 천사들은 종이요 심부름꾼이며, 예수님은 세상이 그를 통하여 그리고 그를 위하여 지어진 아들이십니다.",
    },
  },
];
