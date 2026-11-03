import type { QuizQuestion } from "./types";

export const quiz8: QuizQuestion[] = [
  {
    id: "8-true-tent",
    kind: "choice",
    mid: "m1",
    verses: "1–2",
    en: {
      q: "Where does Jesus serve as high priest, according to Hebrews 8?",
      options: [
        "In heaven, the true tent that the Lord set up, not man",
        "In a heavenly copy of Moses’ tent, with angels serving beside him",
        "In the Most Holy Place of the temple, which he entered at his death",
        "At the right hand of the throne only, where no sanctuary is needed",
      ],
      why: "The place where Jesus serves is not the earthly things the Levitical priests served, but heaven, a holy place no human can enter but Jesus himself. He is seated at the right hand of the Majesty, with the same authority as the one on the throne.",
    },
    ko: {
      q: "히브리서 8장에 따르면, 예수님은 어디에서 대제사장으로 섬기십니까?",
      options: [
        "하늘, 곧 사람이 아니라 주님께서 세우신 참 장막에서",
        "천사들이 곁에서 섬기는, 모세의 장막을 본뜬 하늘의 복제품에서",
        "그분이 죽으실 때 들어가신 성전의 지성소에서",
        "보좌 오른쪽에서만. 그곳에는 성소가 필요 없습니다",
      ],
      why: "예수님이 섬기시는 곳은 레위 계통의 제사장들이 섬기던 땅의 것이 아니라, 예수님 외에는 아무도 들어갈 수 없는 거룩한 곳인 하늘입니다. 그분은 지엄하신 분의 오른쪽에 앉으셔서, 보좌에 앉으신 분과 같은 권위를 가지십니다.",
    },
  },
  {
    id: "8-copy-shadow",
    kind: "choice",
    mid: "m2",
    verses: "5",
    en: {
      q: "God told Moses to build everything “according to the pattern shown on the mountain”. What does Hebrews draw from that?",
      options: [
        "The earthly tent was a copy and shadow, completed only in Jesus",
        "The heavenly tent was built afterwards to match the one Moses made on earth",
        "Every detail of worship must be kept exactly, or the copy loses its meaning",
        "Moses saw heaven, so the tent was heaven on earth",
      ],
      why: "God gave Moses very specific instructions and said to make it all according to the pattern he was shown. The author stresses that because the earthly tabernacle was only a copy and shadow of the heavenly one, it was intentionally incomplete. Its completion came in Jesus Christ.",
    },
    ko: {
      q: "하나님은 모세에게 “산에서 보여 준 그 모형을 따라” 모든 것을 만들라고 하셨습니다. 히브리서는 여기서 무엇을 끌어냅니까?",
      options: [
        "땅의 장막은 모형과 그림자였고, 예수님 안에서만 완성됩니다",
        "하늘의 장막은 나중에 모세가 땅에 만든 장막에 맞추어 지어졌습니다",
        "예배의 모든 세부를 정확히 지켜야 하며, 그렇지 않으면 모형이 뜻을 잃습니다",
        "모세가 하늘을 보았으니, 장막은 땅 위의 하늘이었습니다",
      ],
      why: "하나님은 모세에게 매우 구체적인 지시를 주시고, 보여 주신 모형을 따라 모든 것을 만들라고 하셨습니다. 저자는 땅의 성막이 하늘에 있는 것의 모형과 그림자일 뿐이었기에 일부러 미완성이었다고 강조합니다. 그것은 예수 그리스도 안에서 완성되었습니다.",
    },
  },
  {
    id: "8-not-on-earth",
    kind: "truefalse",
    mid: "m2",
    verses: "4",
    answer: true,
    en: {
      q: "By the law of Moses, Jesus could not have been a priest on earth at all.",
      why: "True. Only Levi’s line could be priests, and Jesus descended from Judah. He is still a priest, but not on earthly terms. It would also be pointless for him to offer animals, grain and incense: those offerings foreshadowed what he would do.",
    },
    ko: {
      q: "모세의 율법대로라면 예수님은 땅에서는 제사장이 전혀 될 수 없으셨습니다.",
      why: "맞습니다. 레위 계통만 제사장이 될 수 있었고, 예수님은 유다의 후손이셨습니다. 그분은 여전히 제사장이시지만, 땅의 조건에 따른 제사장이 아니십니다. 그분이 짐승과 곡식과 향을 드리는 것도 의미가 없었을 것입니다. 그 제물들은 그분이 하실 일을 미리 보여 주었기 때문입니다.",
    },
  },
  {
    id: "8-inside-out",
    kind: "choice",
    mid: "m3",
    verses: "6",
    en: {
      q: "How does the new covenant work differently from the old?",
      options: [
        "From the inside out: the Spirit changes the heart, and good works follow",
        "From the outside in: right worship shapes the heart until obedience comes naturally",
        "By removing commands: love replaces the Law, so outward acts no longer matter",
        "As before, but with forgiveness given more freely",
      ],
      why: "The old covenant relied on outside-to-inside: external acts done to earn God’s favour and trigger inner change. The new covenant is inside-to-outside: the Holy Spirit transforms people through faith. Good works still happen, but as the natural fruit of a heart already changed, not a checklist to get right with God.",
    },
    ko: {
      q: "새 언약은 옛 언약과 어떻게 다르게 작동합니까?",
      options: [
        "안에서 밖으로: 성령께서 마음을 바꾸시고, 선한 일이 뒤따릅니다",
        "밖에서 안으로: 바른 예배가 마음을 빚어, 순종이 자연스러워질 때까지 이끕니다",
        "계명을 없애는 방식: 사랑이 율법을 대신하니, 겉의 행동은 더 이상 중요하지 않습니다",
        "전과 같지만, 용서를 더 넉넉히 베푸는 방식입니다",
      ],
      why: "옛 언약은 밖에서 안으로 가는 방식, 곧 하나님의 은혜를 얻고 속의 변화를 일으키려고 겉으로 행하는 방식에 기댔습니다. 새 언약은 안에서 밖으로 갑니다. 성령께서 믿음으로 사람을 변화시키십니다. 선한 일은 여전히 일어나지만, 하나님과 바른 관계를 맺기 위한 점검표가 아니라 이미 바뀐 마음의 자연스러운 열매입니다.",
    },
  },
  {
    id: "8-why-not-first",
    kind: "choice",
    mid: "m3",
    verses: "6–7",
    en: {
      q: "If the old covenant was always going to be replaced, why didn’t God send Jesus in the first place?",
      options: [
        "People needed the diagnosis before the cure, and God had a set time",
        "God first wanted to see whether Israel could keep the Law if they tried harder",
        "The prophets’ words had to be gathered into Scripture before Jesus could come",
        "The nations needed one common language first",
      ],
      why: "The study gives three reasons. The old covenant was a mirror that showed people they were too weak for God’s standards and needed a Saviour. Its tent, priests and sacrifices were a visual aid for abstract ideas like holiness, atonement and substitution. And God waited for the right moment, laying some 1,400 years of foundation so people could recognise Jesus when he came.",
    },
    ko: {
      q: "옛 언약이 결국 바뀔 것이었다면, 하나님은 왜 처음부터 예수님을 보내지 않으셨습니까?",
      options: [
        "사람들에게 치료 전에 진단이 필요했고, 하나님께는 정하신 때가 있었습니다",
        "하나님은 이스라엘이 더 애쓰면 율법을 지킬 수 있는지 먼저 보고 싶으셨습니다",
        "예수님이 오시기 전에 예언자들의 말씀이 성경으로 모여야 했습니다",
        "민족들에게 먼저 하나의 공통 언어가 필요했습니다",
      ],
      why: "공부에서는 세 가지 이유를 듭니다. 옛 언약은 사람들이 하나님의 기준에 미치기에 너무 약하고 구원자가 필요하다는 것을 보여 주는 거울이었습니다. 그 장막과 제사장과 제사는 거룩함, 속죄, 대속 같은 추상적인 개념을 위한 시각 자료였습니다. 그리고 하나님은 알맞은 때를 기다리시며, 예수님이 오셨을 때 사람들이 그분을 알아볼 수 있도록 약 1,400년의 기초를 놓으셨습니다.",
    },
  },
  {
    id: "8-jeremiah",
    kind: "choice",
    mid: "m4",
    verses: "8–12",
    en: {
      q: "Jeremiah 31 promised a new covenant. What was happening when God gave that promise?",
      options: [
        "The covenant was broken and exile had come; God promised restoration",
        "Israel was home from exile, rebuilding the temple",
        "The kingdom had split in two, and God promised to reunite it under one king",
        "Josiah had found the Book of the Law, and the people were renewing the covenant",
      ],
      why: "The old covenant was conditional on obedience. Through centuries of idolatry and injustice the people broke it, and judgement came: Assyria took the north, and Babylon was taking the south. In that despair God promised to regather them and make a new covenant, writing his laws on their hearts: a permanent solution, not another condition.",
    },
    ko: {
      q: "예레미야 31장은 새 언약을 약속했습니다. 하나님께서 그 약속을 주실 때 무슨 일이 일어나고 있었습니까?",
      options: [
        "언약이 깨지고 포로기가 닥쳤을 때, 하나님은 회복을 약속하셨습니다",
        "이스라엘이 포로에서 돌아와 성전을 다시 짓고 있었습니다",
        "나라가 둘로 갈라져 있었고, 하나님은 한 왕 아래 다시 하나 되게 하겠다고 약속하셨습니다",
        "요시야가 율법책을 찾아냈고, 백성이 언약을 새롭게 하고 있었습니다",
      ],
      why: "옛 언약은 순종을 조건으로 했습니다. 수백 년 동안 우상 숭배와 불의로 백성은 그것을 깨뜨렸고, 심판이 왔습니다. 앗시리아가 북쪽을 무너뜨렸고, 바빌로니아가 남쪽을 삼키고 있었습니다. 그 절망 속에서 하나님은 그들을 다시 모으시고, 그분의 율법을 그들의 마음에 새기는 새 언약을 맺겠다고 약속하셨습니다. 또 하나의 조건이 아니라 영구한 해결책이었습니다.",
    },
  },
  {
    id: "8-obsolete",
    kind: "truefalse",
    mid: "m5",
    verses: "13",
    answer: false,
    en: {
      q: "Because the old covenant is obsolete, it has no meaning for believers today.",
      why: "False. Obsolete does not mean meaningless. The old covenant was a copy and shadow of the true things, and it laid the foundation for understanding God’s plan and why Jesus came.",
    },
    ko: {
      q: "옛 언약은 낡은 것이 되었으므로 오늘날 신자들에게 아무 의미가 없습니다.",
      why: "틀립니다. 낡았다는 것이 의미가 없다는 뜻은 아닙니다. 옛 언약은 참된 것들의 모형과 그림자였고, 하나님의 계획과 예수님이 오신 이유를 이해하는 기초를 놓았습니다.",
    },
  },
  {
    id: "8-which-faultless",
    kind: "which",
    mid: "m3",
    verses: "7",
    chapters: [8, 4, 6, 11],
    en: {
      q: "If the first covenant had been faultless, there would have been no occasion to look for a second.",
      why: "This is Hebrews 8:7. The chapter goes on to quote Jeremiah’s promise of a new covenant written on the heart.",
    },
    ko: {
      q: "첫 번째 언약에 결함이 없었더라면, 두 번째 언약이 생길 여지가 없었을 것입니다.",
      why: "히브리서 8장 7절입니다. 이 장은 이어서 마음에 새겨질 새 언약에 대한 예레미야의 약속을 인용합니다.",
    },
  },
];
