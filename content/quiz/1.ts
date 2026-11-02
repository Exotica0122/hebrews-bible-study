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
        "Its Jewish readers held angels very high, and some saw Jesus as a high-ranking angel",
        "Angels had stopped serving God’s people, and the readers needed to know why",
        "To warn the readers that angels are enemies of God",
        "To show that Jesus became an angel before he became a man",
      ],
      why: "Jewish believers honoured angels deeply, holding that the Law of Moses came through angels at Sinai. Some thought of Jesus as a high-ranking angel, and some even worshipped angels. The author draws a clear line: angels are servants, created beings who worship the King. Jesus is the Creator and the Sovereign.",
    },
    ko: {
      q: "히브리서 1장은 왜 예수님과 천사들을 그렇게 길게 비교합니까?",
      options: [
        "유대인 독자들이 천사를 매우 높였고, 어떤 이들은 예수님을 높은 계급의 천사로 보았기 때문에",
        "천사들이 하나님의 백성을 더 이상 섬기지 않게 된 이유를 설명하려고",
        "천사들이 하나님의 원수라고 경고하려고",
        "예수님이 사람이 되시기 전에 천사였음을 보여 주려고",
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
        "The Son cannot be separated from God: wherever the beam is, the sun is there too",
        "The Son reflects God from a distance, the way a mirror reflects light",
        "The Son is the first light God created, before the sun and stars",
        "God’s glory passed from the Father to the Son and left the Father",
      ],
      why: "Radiance is brightness beaming out from its source. You cannot separate a sunbeam from the sun, and wherever the beam is, the sun is there too. The Son is not a distant reflection of God. He is God’s own glory shining out.",
    },
    ko: {
      q: "히브리서 1장 3절은 아들을 하나님의 영광의 “광채”라고 부릅니다. 햇살의 그림은 무엇을 가르칩니까?",
      options: [
        "아들은 하나님과 분리될 수 없습니다. 햇살이 있는 곳에는 해도 함께 있습니다",
        "아들은 거울이 빛을 비추듯 멀리서 하나님을 비춥니다",
        "아들은 해와 별보다 먼저 하나님이 지으신 첫 빛입니다",
        "하나님의 영광이 아버지에게서 아들에게로 옮겨 가 아버지를 떠났습니다",
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
        "An engraver’s stamp and the mark it leaves on a coin or wax seal, matching exactly",
        "A shadow cast on a wall, showing the rough outline of an object",
        "A painter’s portrait, made as close to the sitter as an artist can manage",
        "A footprint in sand, showing that someone once passed by",
      ],
      why: "The word first meant an engraver’s stamp, and later the mark that stamp leaves on a coin or wax seal. When the seal is pressed, the image matches exactly. So the Son is not a likeness of God made from outside; he bears God’s very nature.",
    },
    ko: {
      q: "아들은 하나님의 “본체대로의 모습”입니다. 이 말 뒤에는 어떤 그림이 있습니까?",
      options: [
        "조각가의 도장과, 그것이 동전이나 밀랍 인장에 남기는 꼭 같은 자국",
        "벽에 비친 그림자처럼 대략의 윤곽만 보여 주는 모습",
        "화가가 할 수 있는 만큼 닮게 그린 초상화",
        "누군가 지나갔다는 것만 알려 주는 모래 위의 발자국",
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
        "It is a coronation word setting the Son over all, and God never said it to an angel",
        "It shows Jesus was adopted by God because of his good life",
        "It was said to every angel at creation, and Jesus is simply one of them",
        "It means the Son began to exist on the day it was spoken",
      ],
      why: "Psalm 2 pictures the kings of the earth rebelling, and God answers by setting his Son over all. “You are my Son” is spoken at a coronation. The point of verse 5 is that God never said this to any angel: the name “Son” belongs to Jesus alone.",
    },
    ko: {
      q: "하나님께서 예수님께 “너는 내 아들이다”(시편 2편)라고 하신 것이 왜 중요합니까?",
      options: [
        "아들을 만물 위에 세우는 즉위의 말씀이며, 하나님은 어떤 천사에게도 이렇게 말씀하신 적이 없습니다",
        "예수님이 선한 삶 때문에 하나님의 양자가 되셨음을 보여 줍니다",
        "창조 때 모든 천사에게 하신 말씀이며, 예수님은 그중 하나일 뿐입니다",
        "아들이 그 말씀을 들은 날부터 존재하기 시작했다는 뜻입니다",
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
        "They work swiftly and powerfully, but they are servants of God and nothing more",
        "They are so powerful that they rule the world alongside the Son",
        "They are eternal and unchanging, just like God",
        "They should be called on in prayer when we need help",
      ],
      why: "Like wind and fire, angels work invisibly, swiftly and powerfully, with holy fervour. But Psalm 104 makes a point of calling them ministers: servants of God. Beside them, the Son’s throne lasts forever.",
    },
    ko: {
      q: "하나님은 천사들을 “바람”과 “불꽃”으로 삼으십니다. 이 묘사의 요점은 무엇입니까?",
      options: [
        "그들은 빠르고 강력하게 일하지만, 하나님의 종일 뿐입니다",
        "그들은 매우 강력해서 아들과 함께 세상을 다스립니다",
        "그들은 하나님처럼 영원하고 변하지 않습니다",
        "도움이 필요할 때 그들에게 기도해야 합니다",
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
        "Creation decays like an old garment, but the Son stays the same and his years never end",
        "Creation will last forever because the Son holds it together",
        "The Son grows old with creation and is renewed with it",
        "The heavens are eternal, but the earth will be rolled up",
      ],
      why: "Earth and heavens alike are not eternal. They are wearing out like a garment after long use. The Son can replace this world as easily as you change a piece of clothing. The heavens fold; he does not. He remains the same, untouched by decay.",
    },
    ko: {
      q: "히브리서 1장 10–12절은 하늘이 낡아서 두루마기처럼 말릴 것이라고 말합니다. 무엇과 무엇이 대조됩니까?",
      options: [
        "피조물은 낡은 옷처럼 쇠하지만, 아들은 여전하시고 그 연대는 끝이 없습니다",
        "아들이 붙들고 계시기 때문에 피조물은 영원히 남습니다",
        "아들도 피조물과 함께 늙고 함께 새로워집니다",
        "하늘은 영원하지만 땅은 말려 올라갑니다",
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
        "David was king and had no human lord above him, so the one greater than David can only be the Messiah",
        "“My Lord” is the angel who led Israel through the wilderness",
        "“My Lord” is Solomon, David’s son, who would sit on his throne",
        "David was speaking about himself in the third person",
      ],
      why: "This is Yahweh speaking to David’s Adonai: his lord, owner and ruler. David was king of Israel and held the highest authority, so in human terms he had no Adonai. The one greater than David can only be the Messiah, Jesus, seated until every enemy is placed under his feet.",
    },
    ko: {
      q: "시편 110편 1절에서 다윗은 “주님께서 내 주님께 말씀하셨다”라고 씁니다. 왜 “내 주님”은 메시아일 수밖에 없습니까?",
      options: [
        "다윗은 왕이어서 그 위에 사람 주인이 없었으니, 다윗보다 크신 분은 메시아뿐입니다",
        "“내 주님”은 광야에서 이스라엘을 인도한 천사입니다",
        "“내 주님”은 다윗의 왕위를 이을 아들 솔로몬입니다",
        "다윗이 자기 자신을 3인칭으로 부른 것입니다",
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
