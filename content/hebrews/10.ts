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
    scene: "shadow",
    art: "3D · R3F — a limewashed wall in hard sun, where everything is a cast shadow: the horned altar with its smoke, priests going to it and back, a bull and a goat. The offering comes round again and again, and a far light grows at the edge of the wall.",
    en: {
      title: "Only a shadow",
      quote:
        "“…the law has but a shadow of the good things to come instead of the true form of these realities…”",
      sref: "Hebrews 10:1",
      cap: "Scene: the priests, the altar and the animals are only shadows on the wall, and the same offering comes round again.",
      snips: [
        "The law is a shadow and can never make perfect",
        "Otherwise the offerings would have ceased",
        "A reminder of sins every year",
        "The blood of bulls and goats cannot take away sins",
      ],
      verses: [
        [
          1,
          "For since the law has but a [shadow|shadow] of the good things to come instead of the true form of these realities, it can never, by the same sacrifices that are continually offered every year, make [perfect|perfect] those who draw near.",
        ],
        [
          2,
          "Otherwise, would they not have ceased to be offered, since the worshipers, having once been cleansed, would no longer have any consciousness of sins?",
        ],
        [
          3,
          "But in these sacrifices there is a [reminder|reminder] of sins every year.",
        ],
        [
          4,
          "For it is impossible for the blood of bulls and goats to take away sins.",
        ],
      ],
      com: [
        ["h", "Where chapter 9 left us"],
        [
          "p",
          "Hebrews 9:24–26 said that Christ entered heaven itself, not holy places made with hands, which are copies of the true things. He did not offer himself repeatedly as the earthly high priests did every year with the blood of animals. Once for all he put away sin by his sacrifice. Chapter 10 continues from there: the law is only a shadow of the good things to come, and it can never perfect anyone who draws near to God.",
        ],
        [
          "q",
          "The old system under the law of Moses was only a shadow, a dim preview of the good things to come, not the good things themselves. (NLT)",
        ],
        ["h", "Reminder or cleansing"],
        [
          "p",
          "Jesus did not sacrifice yearly like the high priest; he did it once and for all. If the sacrifices could have provided perfect cleansing they would have stopped, for the worshipers would have been purified once for all time and their feelings of guilt would have disappeared (NLT).",
        ],
        [
          "p",
          "Animal sacrifices only served as a reminder of sins every year. Jesus’ sacrifice was the cleansing of sins, of the consciousness of sins.",
        ],
      ],
    },
    ko: {
      title: "그림자일 뿐",
      quote: "“율법은 장차 올 좋은 것들의 그림자일 뿐이요, 실체가 아니므로…”",
      sref: "히브리서 10:1",
      cap: "장면: 제사장과 제단과 짐승은 벽에 비친 그림자일 뿐이고, 같은 제사가 다시 돌아옵니다.",
      snips: [
        "율법은 그림자이고 완전하게 할 수 없습니다",
        "그렇지 않다면 제사는 중단되었을 것입니다",
        "해마다 죄를 회상시킵니다",
        "황소와 염소의 피는 죄를 없애 줄 수 없습니다",
      ],
      verses: [
        [
          1,
          "율법은 장차 올 좋은 것들의 [shadow|그림자]일 뿐이요, 실체가 아니므로, 해마다 반복해서 드리는 똑같은 희생제사로써는 하나님께로 나오는 사람들을 [perfect|완전하게] 할 수 없습니다.",
        ],
        [
          2,
          "만일 완전하게 할 수 있었더라면, 제사를 드리는 사람들이 한 번 깨끗하여진 뒤에는, 더 이상 죄의식을 가지지 않을 것이고, 따라서 제사 드리는 일을 중단하지 않았겠습니까?",
        ],
        [
          3,
          "그러나 제사에는 해마다 죄를 [reminder|회상시키는] 효력은 있습니다.",
        ],
        [4, "황소와 염소의 피가 죄를 없애 줄 수는 없습니다."],
      ],
      com: [
        ["h", "9장에서 이어지는 말씀"],
        [
          "p",
          "히브리서 9:24–26은 그리스도께서 참 성소의 모형에 지나지 않는, 손으로 만든 성소가 아니라 하늘 성소 그 자체에 들어가셨다고 말했습니다. 그리스도께서는 땅의 대제사장들이 해마다 짐승의 피를 가지고 드린 것처럼 자기를 여러 번 바치지 않으시고, 단 한 번의 희생으로 죄를 없이하셨습니다. 10장은 여기서 이어집니다. 율법은 장차 올 좋은 것들의 그림자일 뿐이어서, 하나님께 나오는 사람을 완전하게 할 수 없습니다. 모세의 율법 아래 있던 옛 제도는 앞으로 올 좋은 것들을 희미하게 미리 보여 주었을 뿐, 그 좋은 것들 자체가 아니었습니다.",
        ],
        ["h", "회상과 정결"],
        [
          "p",
          "예수님은 대제사장처럼 해마다 제사를 드리지 않으시고 단 한 번에 드리셨습니다. 제사가 완전한 정결을 줄 수 있었다면 벌써 그쳤을 것입니다. 예배자들이 단번에 깨끗해져 죄책감이 사라졌을 것이기 때문입니다.",
        ],
        [
          "p",
          "짐승의 제사는 해마다 죄를 떠올리게 할 뿐이었습니다. 예수님의 희생은 죄와 죄의식을 깨끗하게 하는 것이었습니다.",
        ],
      ],
    },
    words: {
      en: {
        shadow: {
          t: "Shadow",
          g: "skian · σκιάν",
          v: "10:1",
          s: "Not the thing itself",
          d: "The shape cast by an object as it blocks rays of light.",
        },
        perfect: {
          t: "Perfect",
          g: "teleiōsai · τελειῶσαι",
          v: "10:1",
          s: "Brought to completion",
          d: "To complete: mature, fully developed, full grown.",
        },
        reminder: {
          t: "Reminder",
          g: "anamnēsis · ἀνάμνησις",
          v: "10:3",
          s: "Remembered, not removed",
          d: "Causing someone to remember. Each sacrifice was a fresh reminder of sins to be atoned for.",
        },
      },
      ko: {
        shadow: {
          t: "그림자",
          g: "skian · σκιάν",
          v: "10:1",
          s: "실체가 아님",
          d: "물체가 빛을 가릴 때 드리워지는 모양입니다.",
        },
        perfect: {
          t: "완전하게",
          g: "teleiōsai · τελειῶσαι",
          v: "10:1",
          s: "완성에 이름",
          d: "완성함. 성숙하고 온전히 자라 다 이룬 상태입니다.",
        },
        reminder: {
          t: "회상",
          g: "anamnēsis · ἀνάμνησις",
          v: "10:3",
          s: "없어지지 않고 떠오름",
          d: "떠올리게 함. 제사를 드릴 때마다 속죄해야 할 죄가 새로 떠올랐습니다.",
        },
      },
    },
    chips: [
      {
        id: "heb9-24",
        tag: "NT",
        en: "Heb 9:24",
        ko: "히 9:24",
        ten: "For Christ has entered, not into holy places made with hands, which are copies of the true things, but into heaven itself, now to appear in the presence of God on our behalf.",
        tko: "그리스도께서는 참 성소의 모형에 지나지 않는, 손으로 만든 성소에 들어가신 것이 아니라, 바로 하늘 성소 그 자체에 들어가셨습니다. 이제 그는 우리를 위하여 하나님 앞에 나타나셨습니다.",
        wen: "Heaven itself, not the copies.",
        wko: "모형이 아니라 하늘 그 자체.",
      },
      {
        id: "heb9-26",
        tag: "NT",
        en: "Heb 9:26",
        ko: "히 9:26",
        ten: "for then he would have had to suffer repeatedly since the foundation of the world. But as it is, he has appeared once for all at the end of the ages to put away sin by the sacrifice of himself.",
        tko: "그리스도께서 그 몸을 여러 번 바치셔야 하였다면, 그는 창세 이래로 여러 번 고난을 받아야 하셨을 것입니다. 그러나 이제 그는 자기를 희생 제물로 드려서 죄를 없이하시기 위하여 시대의 종말에 단 한 번 나타나셨습니다.",
        wen: "Once for all, not every year.",
        wko: "해마다가 아니라 단 한 번.",
      },
      {
        id: "heb8-5",
        tag: "NT",
        en: "Heb 8:5",
        ko: "히 8:5",
        ten: "They serve a copy and shadow of the heavenly things. For when Moses was about to erect the tent, he was instructed by God, saying, “See that you make everything according to the pattern that was shown you on the mountain.”",
        tko: "그러나 그들은 하늘에 있는 것들의 모형과 그림자에 지나지 않는, 땅에 있는 성전에서 섬깁니다. 모세가 장막을 세우려고 할 때에, “너는 명심하여 내가 산에서 네게 보여준 그 모형을 따라 모든 것을 만들어라” 하고 말씀하신 하나님의 지시를 받은 것입니다.",
        wen: "The same word for shadow, in chapter 8.",
        wko: "8장에도 나오는 그림자.",
      },
    ],
  },

  {
    id: "m2",
    num: "II",
    range: "5–10",
    scene: "bodyPrepared",
    art: "3D · R3F — the shadow of the altar and its smoke fade from the wall while a scroll unrolls beside it. A dark niche opens and fills with light. Christ is shown only as light, with no human outline.",
    en: {
      title: "A body prepared",
      quote: "“Behold, I have come to do your will, O God…”",
      sref: "Hebrews 10:7",
      cap: "Scene: the altar fades from the wall, the scroll opens, and light stands where the sacrifices stood.",
      snips: [
        "“A body have you prepared for me”",
        "No pleasure in burnt offerings",
        "“Behold, I have come to do your will”",
        "Offerings made according to the law",
        "He does away with the first to establish the second",
        "Sanctified by the offering of Christ’s body once for all",
      ],
      verses: [
        [
          5,
          "Consequently, when Christ came into the world, he said, “Sacrifices and offerings you have not desired, but a [body|body] have you prepared for me;",
        ],
        [6, "in burnt offerings and sin offerings you have taken no pleasure."],
        [
          7,
          "Then I said, ‘Behold, I have come to do your [will|will], O God, as it is written of me in the scroll of the book.’”",
        ],
        [
          8,
          "When he said above, “You have neither desired nor taken pleasure in sacrifices and offerings and burnt offerings and sin offerings” (these are offered according to the law),",
        ],
        [
          9,
          "then he added, “Behold, I have come to do your will.” He does away with the first in order to establish the second.",
        ],
        [
          10,
          "And by that will we have been sanctified through the offering of the body of Jesus Christ [onceForAll|once for all].",
        ],
      ],
      com: [
        ["h", "David and Psalm 40"],
        [
          "p",
          "Verses 5–7 cite Psalm 40:6–8. The psalm is King David’s reflection on God’s rescue from his personal crisis, which led him to realise that outward animal rituals could never repay God or substitute for genuine spiritual devotion. What God truly desired was a heart submitted to his will.",
        ],
        [
          "p",
          "David himself failed to satisfy this because of his sins. The author applies the psalm to Jesus Christ, who perfectly fulfilled the call to total obedience. Through David we can see why the old covenant was flawed.",
        ],
        ["h", "A body prepared"],
        [
          "p",
          "Body here means Jesus’ human nature. Jesus came to earth in flesh and blood, because God did not desire the blood of animals, which could not cleanse the conscience of sins and so could not perfect the worshiper.",
        ],
        ["h", "The scroll of the book"],
        [
          "p",
          "This most likely refers to the Book of the Law. So the verse says that the whole law is talking about Jesus Christ: the Messianic prophecies, the shadow of the true form.",
        ],
        ["h", "The first and the second"],
        [
          "p",
          "Verses 5–9 mean that God has officially put an end to the old way of repeated animal sacrifices and replaced it, divinely, with Jesus’ sacrifice.",
        ],
        [
          "q",
          "For God’s will was for us to be made holy by the sacrifice of the body of Jesus Christ, once for all time. (NLT)",
        ],
      ],
    },
    ko: {
      title: "마련하신 몸",
      quote: "“…나는 주님의 뜻을 행하러 왔습니다.”",
      sref: "히브리서 10:7",
      cap: "장면: 제단이 벽에서 사라지고 두루마리가 펼쳐지며, 제사가 있던 자리에 빛이 섭니다.",
      snips: [
        "“나에게 입히실 몸을 마련하셨습니다”",
        "번제와 속죄제를 기뻐하지 않으셨습니다",
        "“나는 주님의 뜻을 행하러 왔습니다”",
        "율법을 따라 드리는 제사들",
        "두 번째 것을 세우시려고 첫 번째 것을 폐하셨습니다",
        "자기 몸을 단번에 드리심으로 거룩하게 되었습니다",
      ],
      verses: [
        [
          5,
          "그러므로 그리스도께서 세상에 오실 때에, 하나님께 이렇게 말씀하셨습니다. “주님은 제사와 예물을 원하지 않으셨습니다. 그래서 나에게 입히실 [body|몸]을 마련하셨습니다.",
        ],
        [6, "주님은 번제와 속죄제를 기뻐하지 않으셨습니다."],
        [
          7,
          "그래서 내가 말하였습니다. ‘보십시오, 하나님! 나를 두고 성경에 기록되어 있는 대로 나는 [will|주님의 뜻]을 행하러 왔습니다.’”",
        ],
        [
          8,
          "위에서 그리스도께서 “주님은 제사와 예물과 번제와 속죄제를 원하지도 기뻐하지도 않으셨습니다” 하고 말씀하셨습니다. 이런 것들은 율법을 따라 드리는 것들입니다.",
        ],
        [
          9,
          "그 다음에 말씀하시기를 “보십시오, 나는 주님의 뜻을 행하러 왔습니다” 하셨습니다. 그리스도께서는 두 번째 것을 세우시려고, 첫 번째 것을 폐하셨습니다.",
        ],
        [
          10,
          "이 뜻을 따라 예수 그리스도께서 자기 몸을 [onceForAll|단번에] 드리심으로써 우리는 거룩하게 되었습니다.",
        ],
      ],
      com: [
        ["h", "다윗과 시편 40편"],
        [
          "p",
          "5–7절은 시편 40:6–8을 인용합니다. 이 시편은 다윗 왕이 개인적인 위기에서 하나님께 구원받은 일을 돌아본 노래입니다. 다윗은 겉으로 드리는 짐승의 의식이 하나님께 보답할 수도, 참된 헌신을 대신할 수도 없음을 깨달았습니다. 하나님께서 진정으로 원하시는 것은 그의 뜻에 복종하는 마음이었습니다.",
        ],
        [
          "p",
          "다윗 자신은 죄 때문에 이것을 이루지 못했습니다. 저자는 이 시편을 온전한 순종을 완벽하게 이루신 예수 그리스도께 적용합니다. 다윗을 통해 옛 언약에 왜 흠이 있었는지 볼 수 있습니다.",
        ],
        ["h", "마련하신 몸"],
        [
          "p",
          "여기서 몸은 예수님의 인성을 뜻합니다. 하나님께서 짐승의 피를 원하지 않으셨기에 예수님은 살과 피를 입고 세상에 오셨습니다. 짐승의 피는 죄의 양심을 깨끗하게 할 수 없었고, 그래서 예배자를 완전하게 할 수 없었습니다.",
        ],
        ["h", "두루마리 책"],
        [
          "p",
          "이것은 율법책을 가리키는 것으로 보입니다. 곧 율법 전체가 예수 그리스도에 관해 말하고 있다는 뜻입니다. 메시아 예언들은 실체의 그림자입니다.",
        ],
        ["h", "첫 번째 것과 두 번째 것"],
        [
          "p",
          "5–9절은 하나님께서 되풀이되는 짐승 제사라는 옛 방식을 공식적으로 끝내시고, 예수님의 희생으로 대신하셨다는 뜻입니다.",
        ],
        [
          "p",
          "하나님의 뜻은 예수 그리스도의 몸을 단 한 번 영원히 드리심으로 우리를 거룩하게 하시는 것이었습니다.",
        ],
      ],
    },
    words: {
      en: {
        body: {
          t: "A body",
          g: "sōma · σῶμα",
          v: "10:5",
          s: "Jesus’ human nature",
          d: "Jesus coming to earth in flesh and blood, as the blood of animals was not desired by God.",
        },
        will: {
          t: "Will",
          g: "thelēma · θέλημα",
          v: "10:7",
          s: "God’s sovereign purpose",
          d: "A different meaning to Hebrews 9. There it is a legal testament or covenant (diathēkē). Here it is God’s sovereign desire or purpose: Jesus came to carry out God’s redemption plan and obey his commands.",
        },
        onceForAll: {
          t: "Once for all",
          g: "ephapax · ἐφάπαξ",
          v: "10:10",
          s: "One offering",
          d: "NLT: “For God’s will was for us to be made holy by the sacrifice of the body of Jesus Christ, once for all time.”",
        },
      },
      ko: {
        body: {
          t: "몸",
          g: "sōma · σῶμα",
          v: "10:5",
          s: "예수님의 인성",
          d: "하나님께서 짐승의 피를 원하지 않으셨기에, 예수님께서 살과 피를 입고 세상에 오셨습니다.",
        },
        will: {
          t: "뜻",
          g: "thelēma · θέλημα",
          v: "10:7",
          s: "하나님의 주권적인 뜻",
          d: "히브리서 9장의 유언(diathēkē)과는 다른 말입니다. 9장은 법적인 유언이나 언약이고, 10장은 하나님의 주권적인 소원과 목적입니다. 예수님은 하나님의 구속 계획을 이루시고 그 명령에 순종하러 오셨습니다.",
        },
        onceForAll: {
          t: "단번에",
          g: "ephapax · ἐφάπαξ",
          v: "10:10",
          s: "한 번의 제물",
          d: "하나님의 뜻은 예수 그리스도의 몸을 단 한 번 드리심으로 우리를 거룩하게 하시는 것이었습니다.",
        },
      },
    },
    chips: [
      {
        id: "psa40-6",
        tag: "OT",
        en: "Ps 40:6",
        ko: "시 40:6",
        ten: "In sacrifice and offering you have not delighted, but you have given me an open ear. Burnt offering and sin offering you have not required.",
        tko: "주님께서는 내 두 귀를 열어 주셨습니다. 주님은 제사나 예물도 기뻐하지 아니합니다. 번제나 속죄제도 원하지 않습니다.",
        wen: "The psalm the author cites.",
        wko: "저자가 인용한 시편.",
      },
      {
        id: "psa40-7",
        tag: "OT",
        en: "Ps 40:7",
        ko: "시 40:7",
        ten: "Then I said, “Behold, I have come; in the scroll of the book it is written of me:",
        tko: "그 때에 나는 주님께 아뢰었습니다. “나에 관하여 기록한 두루마리 책에 따라 내가 지금 왔습니다.",
        wen: "The scroll of the book.",
        wko: "두루마리 책.",
      },
      {
        id: "psa40-8",
        tag: "OT",
        en: "Ps 40:8",
        ko: "시 40:8",
        ten: "I delight to do your will, O my God; your law is within my heart.”",
        tko: "나의 하나님, 내가 주님의 뜻 행하기를 즐거워합니다. 주님의 법을 제 마음 속에 간직하고 있습니다.”",
        wen: "A heart submitted to God’s will.",
        wko: "하나님의 뜻에 복종하는 마음.",
      },
    ],
  },

  {
    id: "m3",
    num: "III",
    range: "11–18",
    scene: "satDown",
    art: "3D · R3F — a row of priests stands at a row of altars, arms rising and falling. Then the seat of the throne fills with light and stays lit, a footstool comes to rest before it, and the standing shadows fade from the wall. Christ is shown only as light, with no human outline.",
    en: {
      title: "He sat down",
      quote: "“…he sat down at the right hand of God…”",
      sref: "Hebrews 10:12",
      cap: "Scene: every priest stands and offers again, then light fills the seat and the standing shadows fade.",
      snips: [
        "Every priest stands daily, offering the same sacrifices",
        "Christ offered one sacrifice and sat down",
        "Waiting until his enemies are his footstool",
        "One offering has perfected for all time",
        "The Holy Spirit bears witness to us",
        "“I will put my laws on their hearts”",
        "“I will remember their sins and their lawless deeds no more”",
        "Where there is forgiveness, no more offering",
      ],
      verses: [
        [
          11,
          "And every priest stands daily at his service, offering repeatedly the same sacrifices, which can never take away sins.",
        ],
        [
          12,
          "But when Christ had offered for all time a single sacrifice for sins, he [satDown|sat down] at the right hand of God,",
        ],
        [
          13,
          "waiting from that time until his enemies should be made a [footstool|footstool] for his feet.",
        ],
        [
          14,
          "For by a single offering he has [perfected|perfected] for all time those who are being sanctified.",
        ],
        [
          15,
          "And the Holy Spirit also [witness|bears witness] to us; for after saying,",
        ],
        [
          16,
          "“This is the covenant that I will make with them after those days, declares the Lord: I will put my laws on their hearts, and write them on their minds,”",
        ],
        [
          17,
          "then he adds, “I will remember their sins and their lawless deeds no more.”",
        ],
        [
          18,
          "Where there is forgiveness of these, there is no longer any offering for sin.",
        ],
      ],
      com: [
        ["h", "Standing and sitting"],
        [
          "p",
          "Here is another big contrast between the earthly priests and Jesus Christ. Jesus offered for all time a single sacrifice for sins, and he now sits at the right hand of God (1:3; 8:1). Sitting down was a sign of ultimate completion. “Sat down at the right hand of God” means it is complete: Jesus’ work has finished, whereas the work of the earthly priests could never be completed or fulfilled.",
        ],
        [
          "p",
          "Jesus now waits for all his enemies to become his footstool, which means his ultimate victory and reign over everything.",
        ],
        ["h", "The grand climax"],
        [
          "p",
          "Verses 14–18 reach the grand climax of what the author intends to say about the priesthood and sacrifice of Jesus. After everything said about the cross, the Holy Spirit and the Old Testament prophecies, this is the conclusion: through one single sacrifice, believers are permanently perfected, internally transformed and totally forgiven, making all future sin offerings completely obsolete.",
        ],
        ["h", "The Holy Spirit bears witness"],
        [
          "p",
          "“The Holy Spirit also bears witness to us” has a similar nuance to Hebrews 9:8: the Holy Spirit helps us understand Jeremiah 31:33–34.",
        ],
        [
          "p",
          "The same passage is used in Hebrews 8:10–11, but with a different nuance. Chapter 8 says the old covenant has become obsolete and has been replaced with a new covenant on better promises. Chapter 10 says the single sacrifice of Jesus perfected those who are being sanctified: there is internal transformation (verse 16) and the legal record of sin is erased (verse 17). So the old covenant of sacrifices is no longer effective and no longer needed.",
        ],
      ],
    },
    ko: {
      title: "하나님 오른쪽에 앉으셨습니다",
      quote:
        "“…단 한 번의 영원히 유효한 제사를 드리신 뒤에 하나님 오른쪽에 앉으셨습니다.”",
      sref: "히브리서 10:12",
      cap: "장면: 제사장마다 서서 다시 제사를 드리고, 빛이 보좌를 채우자 서 있던 그림자들이 사라집니다.",
      snips: [
        "모든 제사장은 날마다 서서 똑같은 제사를 드립니다",
        "그리스도께서는 한 번의 제사를 드리고 앉으셨습니다",
        "원수들이 발 아래에 굴복할 때까지 기다리십니다",
        "한 번의 희생제사로 영원히 완전하게 하셨습니다",
        "성령도 우리에게 증언하여 주십니다",
        "“나는 내 율법을 그들의 마음에 박아주고”",
        "“그들의 죄와 불법을 더 이상 기억하지 않겠다”",
        "용서되었으니 제사가 더 이상 필요 없습니다",
      ],
      verses: [
        [
          11,
          "모든 제사장은 날마다 제단에 서서 직무를 수행하면서 똑같은 제사를 거듭 드리지만, 그러한 제사가 죄를 없앨 수는 없습니다.",
        ],
        [
          12,
          "그러나 그리스도께서는 죄를 사하시려고, 단 한 번의 영원히 유효한 제사를 드리신 뒤에 하나님 오른쪽에 [satDown|앉으셨습니다].",
        ],
        [
          13,
          "그리고서 그는 그의 원수들이 그의 [footstool|발 아래에 굴복할] 때까지 기다리고 계십니다.",
        ],
        [
          14,
          "그는 거룩하게 되는 사람들을 단 한 번의 희생제사로 영원히 [perfected|완전하게] 하셨습니다.",
        ],
        [
          15,
          "그리고 성령도 우리에게 [witness|증언하여] 주십니다. 먼저 이렇게 말씀하셨습니다.",
        ],
        [
          16,
          "“주님께서 말씀하신다. ‘그날 이후에, 내가 그들에게 세워 줄 언약은 이것이다. 나는 내 율법을 그들의 마음에 박아주고, 그들의 생각에 새겨주겠다.",
        ],
        [17, "또 나는 그들의 죄와 불법을 더 이상 기억하지 않겠다.’”"],
        [
          18,
          "죄와 불법이 용서되었으니, 죄를 사하는 제사가 더 이상 필요 없습니다.",
        ],
      ],
      com: [
        ["h", "서 있음과 앉으심"],
        [
          "p",
          "땅의 제사장들과 예수 그리스도 사이의 또 하나의 큰 대조입니다. 예수님은 죄를 위해 단 한 번의 영원한 제사를 드리시고, 지금 하나님 오른쪽에 앉아 계십니다(1:3; 8:1). 앉는다는 것은 완전한 마침의 표시였습니다. “하나님 오른쪽에 앉으셨다”는 말은 다 이루셨다는 뜻입니다. 예수님의 일은 끝났지만, 땅의 제사장들의 일은 결코 마치거나 이룰 수 없었습니다.",
        ],
        [
          "p",
          "이제 예수님은 모든 원수가 그의 발 아래 굴복하기를 기다리십니다. 이것은 만물 위에 뛰어난 그의 최종 승리와 통치를 뜻합니다.",
        ],
        ["h", "절정"],
        [
          "p",
          "14–18절은 예수님의 제사장 직분과 희생에 관해 저자가 말하려는 내용의 절정입니다. 십자가와 성령과 구약 예언에 관해 말한 모든 것의 결론은 이것입니다. 단 한 번의 희생으로 믿는 사람들은 영원히 완전하게 되고, 속에서부터 변화되며, 온전히 용서받습니다. 그래서 앞으로의 속죄 제사는 모두 필요 없게 되었습니다.",
        ],
        ["h", "성령의 증언"],
        [
          "p",
          "“성령도 우리에게 증언하여 주십니다”는 히브리서 9:8과 비슷한 뉘앙스입니다. 성령께서는 우리가 예레미야 31:33–34을 깨닫도록 도우십니다.",
        ],
        [
          "p",
          "같은 말씀이 히브리서 8:10–11에도 쓰였지만 뉘앙스가 다릅니다. 8장은 옛 언약이 낡아 더 좋은 약속의 새 언약으로 대체되었다고 말합니다. 10장은 예수님의 단 한 번의 희생이 거룩하게 되는 사람들을 완전하게 했다고 말합니다. 속에서 변화가 일어나고(16절) 죄의 법적 기록이 지워집니다(17절). 그러므로 제사의 옛 언약은 더 이상 효력이 없고 필요하지 않습니다.",
        ],
      ],
    },
    words: {
      en: {
        satDown: {
          t: "Sat down",
          g: "ekathisen · ἐκάθισεν",
          v: "10:12",
          s: "The work is complete",
          d: "Sitting down was a sign of ultimate completion. Jesus’ work has finished, whereas the work of the earthly priests could never be completed.",
        },
        footstool: {
          t: "Footstool",
          g: "hypopodion · ὑποπόδιον",
          v: "10:13",
          s: "Ultimate victory",
          d: "Jesus awaits all his enemies becoming his footstool, meaning his ultimate victory and reign over everything.",
        },
        perfected: {
          t: "Perfected",
          g: "teteleiōken · τετελείωκεν",
          v: "10:14",
          s: "Through one sacrifice",
          d: "Through one single sacrifice, believers are permanently perfected, internally transformed and totally forgiven.",
        },
        witness: {
          t: "Bears witness",
          g: "martyrei · μαρτυρεῖ",
          v: "10:15",
          s: "Helps us understand",
          d: "As in Hebrews 9:8, the Holy Spirit helps us understand Jeremiah 31:33–34.",
        },
      },
      ko: {
        satDown: {
          t: "앉으셨습니다",
          g: "ekathisen · ἐκάθισεν",
          v: "10:12",
          s: "다 이루심",
          d: "앉는다는 것은 완전한 마침의 표시였습니다. 예수님의 일은 끝났지만, 땅의 제사장들의 일은 결코 마칠 수 없었습니다.",
        },
        footstool: {
          t: "발 아래",
          g: "hypopodion · ὑποπόδιον",
          v: "10:13",
          s: "최종 승리",
          d: "모든 원수가 그의 발등상이 되기를 기다리신다는 말은 만물 위에 뛰어난 그의 최종 승리와 통치를 뜻합니다.",
        },
        perfected: {
          t: "완전하게 하셨습니다",
          g: "teteleiōken · τετελείωκεν",
          v: "10:14",
          s: "단 한 번의 희생으로",
          d: "단 한 번의 희생으로 믿는 사람들은 영원히 완전하게 되고, 속에서부터 변화되며, 온전히 용서받습니다.",
        },
        witness: {
          t: "증언",
          g: "martyrei · μαρτυρεῖ",
          v: "10:15",
          s: "깨닫도록 도우심",
          d: "히브리서 9:8처럼, 성령께서는 우리가 예레미야 31:33–34을 깨닫도록 도우십니다.",
        },
      },
    },
    chips: [
      {
        id: "heb1-3",
        tag: "NT",
        en: "Heb 1:3",
        ko: "히 1:3",
        ten: "He is the radiance of the glory of God and the exact imprint of his nature, and he upholds the universe by the word of his power. After making purification for sins, he sat down at the right hand of the Majesty on high,",
        tko: "그는 하나님의 영광의 광채시요, 하나님의 본체대로의 모습이십니다. 그는 자기의 능력 있는 말씀으로 만물을 보존하시는 분이십니다. 그는 죄를 깨끗하게 하시고서 높은 곳에 계신 존엄하신 분의 오른쪽에 앉으셨습니다.",
        wen: "He sat down, from the first chapter.",
        wko: "1장에서 이미 말한 앉으심.",
      },
      {
        id: "heb8-1",
        tag: "NT",
        en: "Heb 8:1",
        ko: "히 8:1",
        ten: "Now the point in what we are saying is this: we have such a high priest, one who is seated at the right hand of the throne of the Majesty in heaven,",
        tko: "지금 말한 것들의 요점은 이러합니다. 곧 우리에게는 이와 같은 대제사장이 한 분 계시다는 것입니다. 그는 하늘에서 지엄하신 분의 보좌 오른쪽에 앉으셨습니다.",
        wen: "Seated at the right hand.",
        wko: "오른쪽에 앉으신 분.",
      },
      {
        id: "jer31-33",
        tag: "OT",
        en: "Jer 31:33",
        ko: "렘 31:33",
        ten: "For this is the covenant that I will make with the house of Israel after those days, declares the LORD: I will put my law within them, and I will write it on their hearts. And I will be their God, and they shall be my people.",
        tko: "그러나 그 시절이 지난 뒤에, 내가 이스라엘 가문과 언약을 세울 것이니, 나는 나의 율법을 그들의 가슴 속에 넣어 주며, 그들의 마음 판에 새겨 기록하여, 나는 그들의 하나님이 되고, 그들은 나의 백성이 될 것이다. 나 주의 말이다.",
        wen: "The law written on the heart, verse 16.",
        wko: "16절이 인용한, 마음에 새긴 율법.",
      },
      {
        id: "jer31-34",
        tag: "OT",
        en: "Jer 31:34",
        ko: "렘 31:34",
        ten: "And no longer shall each one teach his neighbor and each his brother, saying, ‘Know the LORD,’ for they shall all know me, from the least of them to the greatest, declares the LORD. For I will forgive their iniquity, and I will remember their sin no more.”",
        tko: "그 때에는 이웃이나 동포끼리 서로 ‘너는 주님을 알아라’ 하지 않을 것이니, 이것은 작은 사람으로부터 큰 사람에 이르기까지, 그들이 모두 나를 알 것이기 때문이다. 내가 그들의 허물을 용서하고, 그들의 죄를 다시는 기억하지 않겠다. 나 주의 말이다.”",
        wen: "Sin remembered no more, verse 17.",
        wko: "17절이 인용한, 다시 기억하지 않으심.",
      },
      {
        id: "heb9-8",
        tag: "NT",
        en: "Heb 9:8",
        ko: "히 9:8",
        ten: "By this the Holy Spirit indicates that the way into the holy places is not yet opened as long as the first section is still standing",
        tko: "이것은 첫째 칸 장막이 서 있는 동안에는 아직 지성소로 들어가는 길이 드러나지 않았음을 성령께서 보여 주시는 것입니다.",
        wen: "The Holy Spirit showing what the text means.",
        wko: "말씀의 뜻을 보여 주시는 성령.",
      },
      {
        id: "heb8-10",
        tag: "NT",
        en: "Heb 8:10",
        ko: "히 8:10",
        ten: "For this is the covenant that I will make with the house of Israel after those days, declares the Lord: I will put my laws into their minds, and write them on their hearts, and I will be their God, and they shall be my people.",
        tko: "또 주님께서 말씀하신다. '그 날 뒤에, 내가 이스라엘 집과 맺을 언약은 이것이니, 나는 내 율법을 그들의 생각에 넣어 주고, 그들의 마음에다가 새겨 주겠다. 그리하여 나는 그들의 하나님이 되고, 그들은 내 백성이 될 것이다.",
        wen: "The same promise in chapter 8, with a different nuance.",
        wko: "8장의 같은 약속, 다른 뉘앙스.",
      },
    ],
  },

  {
    id: "m4",
    num: "IV",
    range: "19–25",
    scene: "drawNear",
    art: "3D · R3F — the curtain’s shadow parts and stays open, and light pours through it and along the ledge. People come in from both sides, close together, and go through. The curtain parts rather than tears, because verse 20 says through.",
    en: {
      title: "Let us draw near",
      quote:
        "“…let us draw near with a true heart in full assurance of faith…”",
      sref: "Hebrews 10:22",
      cap: "Scene: the curtain opens and light comes through, and the people draw near together.",
      snips: [
        "Confidence to enter by the blood of Jesus",
        "A new and living way through the curtain",
        "A great priest over the house of God",
        "Let us draw near with a true heart",
        "Let us hold fast the confession of our hope",
        "Let us stir up one another to love and good works",
        "Do not neglect to meet together",
      ],
      verses: [
        [
          19,
          "Therefore, brothers, since we have [confidence|confidence] to enter the holy places by the blood of Jesus,",
        ],
        [
          20,
          "by the new and living way that he opened for us through the curtain, that is, through his flesh,",
        ],
        [21, "and since we have a great priest over the house of God,"],
        [
          22,
          "let us [drawNear|draw near] with a [trueHeart|true heart] in [assurance|full assurance] of faith, with our hearts [sprinkled|sprinkled clean from an evil conscience] and our [washed|bodies washed with pure water].",
        ],
        [
          23,
          "Let us [holdFast|hold fast] the [confession|confession of our hope] without wavering, for he who promised is faithful.",
        ],
        [
          24,
          "And let us [consider|consider] how to [stir|stir up] one another to [love|love] and [goodWorks|good works],",
        ],
        [
          25,
          "not neglecting to meet together, as is the habit of some, but [encourage|encouraging] one another, and all the more as you see the Day drawing near.",
        ],
      ],
      com: [
        ["h", "Therefore"],
        [
          "p",
          "With “therefore”, the author sums up two points. First, all believers have confidence to draw near to God through his flesh, that is, his sacrifice. Second, Jesus Christ is the great high priest over the house of God.",
        ],
        ["h", "A great priest over the house of God"],
        [
          "p",
          "This gathers up the letter so far. Jesus is the Son of God and holds divine authority, better than the angels (chapter 1). He fully tasted the weaknesses of humankind, even up to death (chapter 2). He is faithful over God’s house as a son, not a servant (chapter 3). He received the divine calling of priesthood in the order of Melchizedek (chapters 5 and 7). He has an indestructible life (7:16–17). He ministers not in an earthly tabernacle but in the real heavenly sanctuary (chapters 8–9). He offered himself rather than the temporary blood of animals (chapters 9–10).",
        ],
        ["h", "Three instructions"],
        [
          "p",
          "Understanding that Jesus is our hope, the author gives three instructions on how believers should live, and they touch on faith, hope and love.",
        ],
        [
          "p",
          "First, draw near. There is no longer fear of judgment but confidence of salvation and blessing from God. The inner doubts are gone, because Jesus’ blood purifies the inner self of those who draw near. In the Old Testament cleansing went from the outside in; in the New Testament it goes from the inside out.",
        ],
        [
          "p",
          "Second, hold fast without wavering, for God is faithful. What he says will be kept. So the author wants believers to keep hold of all his promises unswervingly, with no doubt, fully trusting the path he has given us. The Jewish Christians were holding on to their belief against a current of difficulties, persecutions and struggles.",
        ],
        [
          "p",
          "Third, consider how to stir up one another to love and good works, not neglecting to meet together, as the Day draws near. This is how to show Jesus’ love to each other and physically help those in need, whether their difficulty is physical or emotional.",
        ],
      ],
    },
    ko: {
      title: "나아갑시다",
      quote: "“…확고한 믿음을 가지고, 참된 마음으로 하나님께 나아갑시다.”",
      sref: "히브리서 10:22",
      cap: "장면: 휘장이 열리고 빛이 들어오며, 사람들이 함께 가까이 나아갑니다.",
      snips: [
        "예수의 피를 힘입어 담대하게 들어갑니다",
        "휘장을 뚫고 열어 주신 새로운 살 길",
        "하나님의 집을 다스리시는 위대한 제사장",
        "참된 마음으로 하나님께 나아갑시다",
        "우리가 고백하는 소망을 굳게 지킵시다",
        "사랑과 선한 일을 하도록 격려합시다",
        "모이기를 그만하지 맙시다",
      ],
      verses: [
        [
          19,
          "그러므로 형제자매 여러분, 우리는 예수의 피를 힘입어서 [confidence|담대하게] 지성소에 들어가게 되었습니다.",
        ],
        [
          20,
          "예수께서는 휘장을 뚫고 우리에게 새로운 살 길을 열어 주셨습니다. 그런데 그 휘장은 곧 그의 육체입니다.",
        ],
        [
          21,
          "그리고 우리에게는 하나님의 집을 다스리시는 위대한 제사장이 계십니다.",
        ],
        [
          22,
          "그러니 우리는 [assurance|확고한 믿음]을 가지고, [trueHeart|참된 마음]으로 하나님께 [drawNear|나아갑시다]. 우리는 [sprinkled|마음에다 예수의 피를 뿌려서] 죄책감에서 벗어나고, [washed|맑은 물로 몸을 깨끗이 씻었습니다].",
        ],
        [
          23,
          "또 우리에게 약속하신 분은 신실하시니, 우리는 흔들리지 말고, [confession|우리가 고백하는 그 소망]을 [holdFast|굳게 지킵시다].",
        ],
        [
          24,
          "그리고 [consider|서로 마음을 써서] [love|사랑]과 [goodWorks|선한 일]을 하도록 [stir|격려합시다].",
        ],
        [
          25,
          "어떤 사람들의 습관처럼, 우리는 모이기를 그만하지 말고, [encourage|서로 격려하여] 그 날이 가까워 오는 것을 볼수록, 더욱 힘써 모입시다.",
        ],
      ],
      com: [
        ["h", "그러므로"],
        [
          "p",
          "“그러므로”로 저자는 두 가지를 정리합니다. 첫째, 믿는 사람들은 그의 육체, 곧 그의 희생을 통해 담대하게 하나님께 나아갑니다. 둘째, 예수 그리스도께서 하나님의 집을 다스리시는 위대한 대제사장이십니다.",
        ],
        ["h", "하나님의 집을 다스리시는 위대한 제사장"],
        [
          "p",
          "지금까지의 말씀을 모은 것입니다. 예수님은 하나님의 아들로서 천사보다 뛰어난 신적 권위를 가지셨습니다(1장). 죽음에 이르기까지 인간의 연약함을 온전히 맛보셨습니다(2장). 종이 아니라 아들로서 하나님의 집에 신실하셨습니다(3장). 멜기세덱의 계통을 따르는 제사장직의 신적 부르심을 받으셨습니다(5, 7장). 썩지 않는 생명을 가지셨습니다(7:16–17). 땅의 성막이 아니라 참된 하늘 성소에서 섬기십니다(8–9장). 일시적인 짐승의 피가 아니라 자기 자신을 드리셨습니다(9–10장).",
        ],
        ["h", "세 가지 권면"],
        [
          "p",
          "예수님이 우리의 소망이심을 알기에, 저자는 믿는 사람들이 어떻게 살아야 하는지 세 가지로 권면합니다. 이 권면은 믿음과 소망과 사랑에 관한 것입니다.",
        ],
        [
          "p",
          "첫째, 나아갑시다. 이제는 심판의 두려움이 아니라 하나님의 구원과 복에 대한 확신이 있습니다. 예수님의 피가 나아오는 사람의 속을 깨끗하게 하므로 내면의 의심이 사라집니다. 구약의 정결은 겉에서 속으로, 신약의 정결은 속에서 겉으로 이루어집니다.",
        ],
        [
          "p",
          "둘째, 하나님은 신실하시니 흔들리지 말고 굳게 지킵시다. 그분이 하신 말씀은 지켜집니다. 그래서 저자는 믿는 사람들이 그분의 모든 약속을 의심 없이 붙들고, 주신 길을 온전히 신뢰하기를 바랍니다. 유대인 그리스도인들은 어려움과 박해와 싸움이라는 물살을 거슬러 믿음을 붙들고 있었습니다.",
        ],
        [
          "p",
          "셋째, 그 날이 가까워 오는 것을 보며, 모이기를 그만두지 말고 서로 사랑과 선한 일을 하도록 격려합시다. 이것이 서로에게 예수님의 사랑을 보여 주고, 육체적으로나 정서적으로 어려운 사람을 실제로 돕는 길입니다.",
        ],
      ],
    },
    words: {
      en: {
        confidence: {
          t: "Confidence",
          g: "parrēsian · παρρησίαν",
          v: "10:19",
          s: "Fearless courage",
          d: "Free, fearless, cheerful courage.",
        },
        drawNear: {
          t: "Draw near",
          g: "proserchōmetha · προσερχώμεθα",
          v: "10:22",
          s: "Prayer and worship",
          d: "Coming to God through prayer and worship.",
        },
        trueHeart: {
          t: "True heart",
          g: "alēthinēs kardias · ἀληθινῆς καρδίας",
          v: "10:22",
          s: "Without hypocrisy",
          d: "Sincere, genuine, authentic, without hypocrisy.",
        },
        assurance: {
          t: "Full assurance",
          g: "plērophoria · πληροφορίᾳ",
          v: "10:22",
          s: "Unshakable certainty",
          d: "Complete, unshakable certainty in faith.",
        },
        sprinkled: {
          t: "Hearts sprinkled clean",
          g: "rherantismenoi · ῥεραντισμένοι",
          v: "10:22",
          s: "No more condemnation",
          d: "No longer having the inner conscience of guilt, shame and condemnation that drives people away from God, because of the blood of Jesus Christ.",
        },
        washed: {
          t: "Bodies washed",
          g: "lelousmenoi · λελουσμένοι",
          v: "10:22",
          s: "Total cleansing",
          d: "Figuratively, total spiritual cleansing and sanctification: inward purification through God’s word and the Holy Spirit.",
        },
        holdFast: {
          t: "Hold fast",
          g: "katechōmen · κατέχωμεν",
          v: "10:23",
          s: "Holding a ship’s course",
          d: "To hold a ship’s course tightly and steer directly toward a destination; to grip something so firmly that it is not swept away. It means active, intentional effort against a strong opposing current.",
        },
        confession: {
          t: "Confession of our hope",
          g: "homologian tēs elpidos · ὁμολογίαν τῆς ἐλπίδος",
          v: "10:23",
          s: "Not wishful thinking",
          d: "To speak the same thing, declaring public agreement with God’s truth. Hope here is not wishful thinking but a concrete, objective expectation of future reward, bodily resurrection and ultimate victory through Jesus.",
        },
        consider: {
          t: "Consider",
          g: "katanoōmen · κατανοῶμεν",
          v: "10:24",
          s: "Observe intensely",
          d: "To observe attentively, fix your mind upon, continuously study someone.",
        },
        stir: {
          t: "Stir up",
          g: "paroxysmon · παροξυσμόν",
          v: "10:24",
          s: "A good provocation",
          d: "To provoke, stimulate, spur on. Here the word is used with positive intention.",
        },
        love: {
          t: "Love",
          g: "agapēs · ἀγάπης",
          v: "10:24",
          s: "Agape",
          d: "Here, to protect, provide for and stand by fellow believers.",
        },
        goodWorks: {
          t: "Good works",
          g: "kalōn ergōn · καλῶν ἔργων",
          v: "10:24",
          s: "Such as hospitality",
          d: "Actions with a compelling moral beauty, such as sharing possessions, hospitality and physically caring for the vulnerable.",
        },
        encourage: {
          t: "Encouraging",
          g: "parakalountes · παρακαλοῦντες",
          v: "10:25",
          s: "Comfort and urging",
          d: "To comfort, to strongly urge.",
        },
      },
      ko: {
        confidence: {
          t: "담대하게",
          g: "parrēsian · παρρησίαν",
          v: "10:19",
          s: "두려움 없는 용기",
          d: "자유롭고 두려움 없으며 기쁨에 찬 용기입니다.",
        },
        drawNear: {
          t: "나아갑시다",
          g: "proserchōmetha · προσερχώμεθα",
          v: "10:22",
          s: "기도와 예배",
          d: "기도와 예배로 하나님께 나아가는 것입니다.",
        },
        trueHeart: {
          t: "참된 마음",
          g: "alēthinēs kardias · ἀληθινῆς καρδίας",
          v: "10:22",
          s: "위선이 없음",
          d: "진실하고 거짓이 없으며 위선이 없는 마음입니다.",
        },
        assurance: {
          t: "확고한 믿음",
          g: "plērophoria · πληροφορίᾳ",
          v: "10:22",
          s: "흔들리지 않는 확신",
          d: "믿음에 대한 완전하고 흔들리지 않는 확신입니다.",
        },
        sprinkled: {
          t: "마음에 뿌림",
          g: "rherantismenoi · ῥεραντισμένοι",
          v: "10:22",
          s: "더 이상 정죄가 없음",
          d: "예수 그리스도의 피로 말미암아, 사람을 하나님에게서 멀어지게 하는 죄책과 수치와 정죄의 양심이 더 이상 없다는 뜻입니다.",
        },
        washed: {
          t: "몸을 씻음",
          g: "lelousmenoi · λελουσμένοι",
          v: "10:22",
          s: "온전한 정결",
          d: "온전한 영적 정결과 성화를 비유로 말한 것입니다. 하나님의 말씀과 성령으로 속이 깨끗해지는 일입니다.",
        },
        holdFast: {
          t: "굳게 지킵시다",
          g: "katechōmen · κατέχωμεν",
          v: "10:23",
          s: "배의 항로를 붙듦",
          d: "배의 항로를 단단히 잡고 목적지를 향해 곧게 나아가는 것, 휩쓸려 가지 않도록 꽉 붙드는 것입니다. 거센 물살을 거슬러 애쓰는 의도적인 노력을 뜻합니다.",
        },
        confession: {
          t: "고백하는 소망",
          g: "homologian tēs elpidos · ὁμολογίαν τῆς ἐλπίδος",
          v: "10:23",
          s: "막연한 바람이 아님",
          d: "같은 것을 말함, 곧 하나님의 진리에 공개적으로 동의한다고 선언하는 것입니다. 소망은 막연한 바람이 아니라 장래의 상과 몸의 부활과 예수님을 통한 최종 승리에 대한 구체적이고 객관적인 기대입니다.",
        },
        consider: {
          t: "서로 마음을 써서",
          g: "katanoōmen · κατανοῶμεν",
          v: "10:24",
          s: "깊이 살핌",
          d: "주의 깊게 살피고, 마음을 쏟고, 어떤 사람을 계속해서 살피는 것입니다.",
        },
        stir: {
          t: "격려합시다",
          g: "paroxysmon · παροξυσμόν",
          v: "10:24",
          s: "좋은 뜻의 자극",
          d: "자극하고 북돋우고 재촉하는 것입니다. 여기서는 좋은 뜻으로 쓰였습니다.",
        },
        love: {
          t: "사랑",
          g: "agapēs · ἀγάπης",
          v: "10:24",
          s: "아가페",
          d: "여기서는 믿는 형제자매를 보호하고, 돌보고, 곁에 서 주는 것입니다.",
        },
        goodWorks: {
          t: "선한 일",
          g: "kalōn ergōn · καλῶν ἔργων",
          v: "10:24",
          s: "대접과 같은 일",
          d: "소유를 나누고, 대접하고, 연약한 사람을 실제로 돌보는 것처럼 도덕적 아름다움을 지닌 행동입니다.",
        },
        encourage: {
          t: "서로 격려하여",
          g: "parakalountes · παρακαλοῦντες",
          v: "10:25",
          s: "위로와 권면",
          d: "위로하고, 간곡히 권하는 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "heb3-6",
        tag: "NT",
        en: "Heb 3:6",
        ko: "히 3:6",
        ten: "but Christ is faithful over God’s house as a son. And we are his house, if indeed we hold fast our confidence and our boasting in our hope.",
        tko: "그러나 그리스도는 아들로서, 하나님의 집안 사람을 성실하게 돌보셨습니다. 우리가 그 소망에 대하여 확신과 자부심을 지니고 있으면, 우리는 하나님의 집안 사람입니다.",
        wen: "Over God’s house as a son.",
        wko: "하나님의 집을 돌보시는 아들.",
      },
      {
        id: "heb7-16",
        tag: "NT",
        en: "Heb 7:16",
        ko: "히 7:16",
        ten: "who has become a priest, not on the basis of a legal requirement concerning bodily descent, but by the power of an indestructible life.",
        tko: "그는 제사장의 혈통에 대해서 규정한 율법을 따라 제사장이 되신 것이 아니라, 썩지 않는 생명의 능력을 따라 되셨습니다.",
        wen: "An indestructible life.",
        wko: "썩지 않는 생명.",
      },
      {
        id: "heb9-12",
        tag: "NT",
        en: "Heb 9:12",
        ko: "히 9:12",
        ten: "he entered once for all into the holy places, not by means of the blood of goats and calves but by means of his own blood, thus securing an eternal redemption.",
        tko: "단 한 번에 지성소에 들어가셨습니다. 그는 염소나 송아지의 피로써가 아니라, 자기의 피로써, 우리에게 영원한 구원을 이루셨습니다.",
        wen: "His own blood, not that of animals.",
        wko: "짐승의 피가 아니라 자기의 피.",
      },
    ],
  },

  {
    id: "m5",
    num: "V",
    range: "26–31",
    scene: "fearful",
    art: "3D · R3F — the sun fades from the wall. An altar stands with no fire on it, three witnesses stand to one side and one figure turns away, while fire rises from both ends of the wall toward the empty altar. God’s hands are not drawn.",
    en: {
      title: "A fearful thing",
      quote:
        "“It is a fearful thing to fall into the hands of the living God.”",
      sref: "Hebrews 10:31",
      cap: "Scene: the altar stands empty and no sacrifice remains, while the fire comes in from both sides.",
      snips: [
        "No sacrifice remains for deliberate sin",
        "A fearful expectation of judgment",
        "Death on the evidence of two or three witnesses",
        "How much worse for trampling the Son of God",
        "“Vengeance is mine; I will repay”",
        "A fearful thing to fall into God’s hands",
      ],
      verses: [
        [
          26,
          "For if we go on [deliberately|sinning deliberately] after receiving the knowledge of the truth, there no longer remains a sacrifice for sins,",
        ],
        [
          27,
          "but a [expectation|fearful expectation of judgment], and a [fury|fury of fire] that will consume the [adversaries|adversaries].",
        ],
        [
          28,
          "Anyone who has set aside the law of Moses dies without mercy on the evidence of two or three witnesses.",
        ],
        [
          29,
          "How much worse punishment, do you think, will be deserved by the one who has trampled underfoot the Son of God, and has [profaned|profaned] the blood of the covenant by which he was sanctified, and has [outraged|outraged] the Spirit of grace?",
        ],
        [
          30,
          "For we know him who said, “[vengeance|Vengeance] is mine; I will repay.” And again, “The Lord will judge his people.”",
        ],
        [31, "It is a fearful thing to fall into the hands of the living God."],
      ],
      com: [
        ["h", "Sinning deliberately"],
        [
          "p",
          "The “knowledge of the truth” refers to what the author explained in verses 1–18. “Sinning deliberately” does not mean someone who slips up or struggles with an old habit or sin.",
        ],
        [
          "p",
          "It means a person who fully understands that Jesus is the ultimate, divine sacrifice who permanently cleanses us, and that the old religious systems are completely obsolete, yet makes a settled, continuous decision to reject Christ and abandon the faith. They have walked away from the only Savior who can rescue them, and they are left with nothing but facing God’s judgment on their own.",
        ],
        ["h", "Two or three witnesses"],
        [
          "p",
          "Verse 28 points to Deuteronomy 19:15, where one witness is not enough to convict anyone; a matter must be established by two or three.",
        ],
        ["h", "Profaned"],
        [
          "p",
          "To profane the blood is not to acknowledge it: to take the blood of Jesus for granted (예수님의 피를 당연시 하다).",
        ],
        ["h", "The song of Moses"],
        [
          "p",
          "Deuteronomy 32 is a song recited by Moses before his death (Deuteronomy 31:30). God commanded Moses to write and teach it to the Israelites as a permanent legal witness against them when they would turn away. God shows his righteous jealousy, wrath and disciplinary punishment using foreign nations, then shows mercy once they are humbled, while executing justice against Israel’s adversaries.",
        ],
        [
          "p",
          "“Vengeance is mine; I will repay” means that anyone who wilfully walks away from the cross will face a court where God is the ultimate executioner of justice.",
        ],
        [
          "p",
          "“The Lord will judge his people” meant in Deuteronomy that God would deliver Israel from the hands of their enemies. Here the author uses it to mean that continued renunciation leads to being an enemy of God, and so judgment will fall on those people.",
        ],
      ],
    },
    ko: {
      title: "무서운 일",
      quote:
        "“살아 계신 하나님의 징벌하시는 손에 떨어지는 것은 무서운 일입니다.”",
      sref: "히브리서 10:31",
      cap: "장면: 제단은 비어 있고 남은 제사가 없는데, 불이 양쪽에서 다가옵니다.",
      snips: [
        "짐짓 죄를 지으면 속죄의 제사가 남아 있지 않습니다",
        "남아 있는 것은 무서운 심판뿐입니다",
        "두세 증인의 증언이 있으면 사형을 받습니다",
        "하나님의 아들을 짓밟은 사람은 얼마나 더 무서운 벌을",
        "“원수를 갚는 것은 내가 할 일이니”",
        "하나님의 손에 떨어지는 것은 무서운 일입니다",
      ],
      verses: [
        [
          26,
          "우리가 진리에 대한 지식을 얻은 뒤에도 [deliberately|짐짓 죄를 짓고] 있으면, 속죄의 제사가 더 이상 남아 있지 않습니다.",
        ],
        [
          27,
          "남아 있다고 예상할 수 있는 것은 [expectation|무서운 심판]과 [adversaries|반역자들]을 삼킬 [fury|맹렬한 불]뿐입니다.",
        ],
        [
          28,
          "모세의 율법을 어긴 사람도 두세 증인의 증언이 있으면 가차없이 사형을 받는데,",
        ],
        [
          29,
          "하나님의 아들을 짓밟고, 자기를 거룩하게 해 준 언약의 피를 [profaned|대수롭지 않게 여기고], 은혜의 성령을 [outraged|모욕한] 사람은, 얼마나 더 무서운 벌을 받아야 하겠는가를 생각해 보십시오.",
        ],
        [
          30,
          "“[vengeance|원수를 갚는 것]은 내가 할 일이니, 내가 갚아 주겠다” 하고 말씀하시고, 또 “주님께서 그의 백성을 심판하실 것이다” 하신 분을, 우리는 알고 있습니다.",
        ],
        [
          31,
          "살아 계신 하나님의 징벌하시는 손에 떨어지는 것은 무서운 일입니다.",
        ],
      ],
      com: [
        ["h", "짐짓 죄를 지음"],
        [
          "p",
          "“진리에 대한 지식”은 저자가 1–18절에서 설명한 내용을 가리킵니다. “짐짓 죄를 짓는다”는 말은 실수하거나 옛 습관과 죄로 씨름하는 사람을 뜻하지 않습니다.",
        ],
        [
          "p",
          "예수님이 우리를 영원히 깨끗하게 하시는 궁극의 신적인 제물이심을 온전히 알고, 옛 종교 제도가 완전히 끝났음을 알면서도, 그리스도를 거부하고 믿음을 버리기로 굳게 또 계속해서 결정하는 사람을 뜻합니다. 그는 자기를 구할 수 있는 유일한 구주를 떠났고, 남은 것은 혼자서 하나님의 심판을 마주하는 일뿐입니다.",
        ],
        ["h", "두세 증인"],
        [
          "p",
          "28절은 신명기 19:15을 가리킵니다. 한 사람의 증언만으로는 판정할 수 없고, 두세 사람의 증언이 있어야 합니다.",
        ],
        ["h", "대수롭지 않게 여김"],
        [
          "p",
          "피를 대수롭지 않게 여긴다는 것은 그 피를 인정하지 않는 것, 곧 예수님의 피를 당연시하는 것입니다.",
        ],
        ["h", "모세의 노래"],
        [
          "p",
          "신명기 32장은 모세가 죽기 전에 부른 노래입니다(신 31:30). 하나님은 모세에게 이 노래를 써서 이스라엘에게 가르치게 하셨고, 그들이 돌아설 때 그들을 향한 영원한 법적 증인이 되게 하셨습니다. 하나님은 의로운 질투와 진노로 이방 나라를 들어 징계하시고, 그들이 낮아지면 긍휼을 베푸시면서 이스라엘의 대적에게 공의를 행하십니다.",
        ],
        [
          "p",
          "“원수를 갚는 것은 내가 할 일이니”는 십자가를 고의로 떠나는 사람은 누구나 하나님께서 공의를 집행하시는 법정에 서게 된다는 뜻입니다.",
        ],
        [
          "p",
          "“주님께서 그의 백성을 심판하실 것이다”는 신명기에서 하나님께서 이스라엘을 원수의 손에서 건지신다는 뜻이었습니다. 여기서 저자는 계속해서 믿음을 버리면 하나님의 원수가 되고, 그 사람들에게 심판이 임한다는 뜻으로 씁니다.",
        ],
      ],
    },
    words: {
      en: {
        deliberately: {
          t: "Sinning deliberately",
          g: "hekousiōs · Ἑκουσίως",
          v: "10:26",
          s: "Persistent",
          d: "Persistent: an unyielding lifestyle of choosing sin and rejecting God.",
        },
        expectation: {
          t: "Fearful expectation of judgment",
          g: "phobera ekdochē kriseōs · φοβερὰ ἐκδοχὴ κρίσεως",
          v: "10:27",
          s: "Peace lost",
          d: "The internal fear of knowing that guilt and judgment are to be received, losing peace and “full assurance”.",
        },
        fury: {
          t: "Fury of fire",
          g: "pyros zēlos · πυρὸς ζῆλος",
          v: "10:27",
          s: "God’s holiness",
          d: "God’s holiness passing judgment on the adversaries.",
        },
        adversaries: {
          t: "Adversaries",
          g: "hypenantious · ὑπεναντίους",
          v: "10:27",
          s: "In direct defiance",
          d: "Enemies, opponents, those who stand in direct defiance against God.",
        },
        profaned: {
          t: "Profaned",
          g: "koinon hēgēsamenos · κοινὸν ἡγησάμενος",
          v: "10:29",
          s: "Treated as common",
          d: "Ordinary, cheap, unclean: to treat as common. Not to acknowledge it; to take the blood of Jesus for granted.",
        },
        outraged: {
          t: "Outraged",
          g: "enybrisas · ἐνυβρίσας",
          v: "10:29",
          s: "Arrogant mockery",
          d: "To treat with arrogant mockery, spite or malicious insult.",
        },
        vengeance: {
          t: "Vengeance",
          g: "ekdikēsis · ἐκδίκησις",
          v: "10:30",
          s: "Holy justice",
          d: "God’s holy, retributive justice.",
        },
      },
      ko: {
        deliberately: {
          t: "짐짓 죄를 지음",
          g: "hekousiōs · Ἑκουσίως",
          v: "10:26",
          s: "끈질기게",
          d: "끈질기게 죄를 택하고 하나님을 거부하는 굽히지 않는 삶의 방식입니다.",
        },
        expectation: {
          t: "무서운 심판",
          g: "phobera ekdochē kriseōs · φοβερὰ ἐκδοχὴ κρίσεως",
          v: "10:27",
          s: "평안을 잃음",
          d: "죄책과 심판을 받게 될 것을 아는 내면의 두려움으로, 평안과 “확고한 믿음”을 잃은 상태입니다.",
        },
        fury: {
          t: "맹렬한 불",
          g: "pyros zēlos · πυρὸς ζῆλος",
          v: "10:27",
          s: "하나님의 거룩하심",
          d: "대적을 심판하시는 하나님의 거룩하심입니다.",
        },
        adversaries: {
          t: "반역자들",
          g: "hypenantious · ὑπεναντίους",
          v: "10:27",
          s: "정면으로 맞섬",
          d: "원수, 적대자, 하나님께 정면으로 맞서는 사람들입니다.",
        },
        profaned: {
          t: "대수롭지 않게 여김",
          g: "koinon hēgēsamenos · κοινὸν ἡγησάμενος",
          v: "10:29",
          s: "흔한 것으로 여김",
          d: "평범하고 값싸고 부정한 것, 곧 흔한 것으로 여김. 인정하지 않고 예수님의 피를 당연시하는 것입니다.",
        },
        outraged: {
          t: "모욕한",
          g: "enybrisas · ἐνυβρίσας",
          v: "10:29",
          s: "오만한 조롱",
          d: "오만하게 조롱하고, 악의로 멸시하고 모욕하는 것입니다.",
        },
        vengeance: {
          t: "원수를 갚는 것",
          g: "ekdikēsis · ἐκδίκησις",
          v: "10:30",
          s: "거룩한 공의",
          d: "하나님의 거룩하고 응보적인 공의입니다.",
        },
      },
    },
    chips: [
      {
        id: "deu19-15",
        tag: "OT",
        en: "Deut 19:15",
        ko: "신 19:15",
        ten: "A single witness shall not suffice against a person for any crime or for any wrong in connection with any offense that he has committed. Only on the evidence of two witnesses or of three witnesses shall a charge be established.",
        tko: "“어떤 잘못이나 어떤 범죄라도, 한 사람의 증언만으로는 판정할 수 없습니다. 두세 사람의 증언이 있어야만 그 일을 확정할 수 있습니다.",
        wen: "The two or three witnesses of verse 28.",
        wko: "28절의 두세 증인.",
      },
      {
        id: "deu32-35",
        tag: "OT",
        en: "Deut 32:35",
        ko: "신 32:35",
        ten: "Vengeance is mine, and recompense, for the time when their foot shall slip; for the day of their calamity is at hand, and their doom comes swiftly.",
        tko: "원수 갚는 것은 내가 하는 일이니, 내가 갚는다. 원수들이 넘어질 때가 곧 온다. 재난의 날이 가깝고, 멸망의 때가 그들에게 곧 덮친다.’",
        wen: "The source of verse 30.",
        wko: "30절이 인용한 말씀.",
      },
      {
        id: "deu32-36",
        tag: "OT",
        en: "Deut 32:36",
        ko: "신 32:36",
        ten: "For the LORD will vindicate his people and have compassion on his servants, when he sees that their power is gone and there is none remaining, bond or free.",
        tko: "그들이 기진맥진 하고, 갇힌 사람도 놓인 사람도 하나도 남지 않았을 때에, 주님께서는 당신의 백성을 심판하시고, 당신의 종들을 불쌍히 여기실 것이다.",
        wen: "In Deuteronomy, God delivers Israel.",
        wko: "신명기에서는 이스라엘을 건지심.",
      },
      {
        id: "psa135-14",
        tag: "OT",
        en: "Ps 135:14",
        ko: "시 135:14",
        ten: "For the LORD will vindicate his people and have compassion on his servants.",
        tko: "주님께서 당신의 백성을 변호해 주시고, 당신의 종들을 위로하여 주신다.",
        wen: "The same line in the Psalms.",
        wko: "시편에 나오는 같은 말씀.",
      },
    ],
  },

  {
    id: "m6",
    num: "VI",
    range: "32–39",
    scene: "spectacle",
    art: "3D · R3F — tiers of spectators curve across the wall above a small group set on show. One of them carries bread to a barred prison window. Another is pushed back a step, and comes forward again. A light rises at the end of the wall.",
    en: {
      title: "Those who do not shrink back",
      quote:
        "“But we are not of those who shrink back and are destroyed, but of those who have faith and preserve their souls.”",
      sref: "Hebrews 10:39",
      cap: "Scene: they are put on show before the tiers, one brings bread to the prison, and they stay as the light comes.",
      snips: [
        "Recall the former days of hard struggle",
        "Publicly exposed, and partners of those so treated",
        "Compassion on prisoners, a better possession",
        "Do not throw away your confidence",
        "You have need of endurance",
        "“Yet a little while”",
        "“My righteous one shall live by faith”",
        "We are not of those who shrink back",
      ],
      verses: [
        [
          32,
          "But recall the former days when, after you were [enlightened|enlightened], you endured a hard struggle with sufferings,",
        ],
        [
          33,
          "sometimes being [exposed|publicly exposed] to reproach and affliction, and sometimes being [partners|partners] with those so treated.",
        ],
        [
          34,
          "For you had compassion on those in prison, and you joyfully accepted the plundering of your property, since you knew that you yourselves had a better possession and an abiding one.",
        ],
        [
          35,
          "Therefore do not throw away your confidence, which has a great reward.",
        ],
        [
          36,
          "For you have need of [endurance|endurance], so that when you have done the [willOfGod|will of God] you may receive what is [promised|promised].",
        ],
        [
          37,
          "For, “Yet a little while, and the coming one will come and will not delay;",
        ],
        [
          38,
          "but my righteous one shall live by faith, and if he [shrink|shrinks back], my soul has no pleasure in him.”",
        ],
        [
          39,
          "But we are not of those who shrink back and are destroyed, but of those who have faith and preserve their souls.",
        ],
      ],
      com: [
        ["h", "Put on a stage"],
        [
          "p",
          "At that time criminals were sometimes exposed and punished in the theatre. The readers were put up on a stage and publicly exposed to shame. Many Christians hid from the persecutions to avoid arrest, but these readers showed courage by standing alongside the believers dragged into prison, bringing them food and comfort at their own personal risk.",
        ],
        ["h", "Why they wanted to go back"],
        [
          "p",
          "In Roman times Judaism was a legally recognised religion, so Jewish people were exempt from worshipping the emperor and the pagan gods. Christianity was illegal. Rome first viewed Christians as a subset of Judaism, but as more Gentiles joined it became clear that this was its own movement. Because it was new, Rome viewed it as an illegal superstition and a threat to government, authority and social order.",
        ],
        [
          "p",
          "So the readers were exhausted by persecution, by the imprisonment of their brothers and sisters and by public humiliation. They wanted to go back to Judaism because it was the safer route, with legal protection under Roman law. They would no longer have their property seized, be publicly humiliated or risk their lives.",
        ],
        ["h", "Habakkuk 2"],
        [
          "p",
          "Habakkuk wrote as the Babylonian empire was rising, immediately after the fall of Assyria, under King Nabopolassar and his son Nebuchadnezzar II. Chapter 2 is God’s answer to Habakkuk’s question in chapter 1 about why he tolerates the corruption in Judah: he will punish Judah through Babylon’s growing power.",
        ],
        [
          "p",
          "God promises that the revelation awaits an appointed time and will come without delay. The enemy is full of pride, but the righteous will live by faith. God was saying that faith is the only way to endure difficult times, and this applies in Hebrews as well. The line “if he shrinks back, my soul has no pleasure in him” comes from the Greek Septuagint.",
        ],
        ["h", "Yet a little while"],
        [
          "p",
          "“Yet a little while” can also be translated “for in just a little while”: Jesus, the coming one, will come without delay. So keep your endurance in doing the will of God, to receive what is promised (5:9; 9:15). What is promised is salvation.",
        ],
        [
          "p",
          "Verse 38 is spiritual encouragement to live by faith and not throw it away because of difficulties, for God takes no pleasure in those who turn their backs on the gospel. Even in hard times, keep believing the Bible and Jesus.",
        ],
      ],
    },
    ko: {
      title: "뒤로 물러나지 않는 사람들",
      quote:
        "“우리는 뒤로 물러나서 멸망할 사람들이 아니라, 믿음을 가져 생명을 얻을 사람들입니다.”",
      sref: "히브리서 10:39",
      cap: "장면: 그들이 층층이 앉은 구경꾼 앞에 세워지고, 한 사람이 감옥에 빵을 가져가며, 빛이 올 때까지 그들은 서 있습니다.",
      snips: [
        "고난의 싸움을 견디어 낸 처음 시절을 되새기십시오",
        "구경거리가 되고, 그런 사람들의 친구가 되었습니다",
        "갇힌 사람들과 함께 나누고, 더 좋은 재산을 알았습니다",
        "여러분의 확신을 버리지 마십시오",
        "여러분에게는 인내가 필요합니다",
        "“아주 조금만 있으면”",
        "“나의 의인은 믿음으로 살 것이다”",
        "우리는 뒤로 물러날 사람들이 아닙니다",
      ],
      verses: [
        [
          32,
          "여러분은 [enlightened|빛을 받은] 뒤에, 고난의 싸움을 많이 견디어 낸 그 처음 시절을 되새기십시오.",
        ],
        [
          33,
          "여러분은 때로는 모욕과 환난을 당하여, [exposed|구경거리]가 되기도 하고, 그런 처지에 놓인 사람들의 [partners|친구]가 되기도 하였습니다.",
        ],
        [
          34,
          "여러분은 감옥에 갇힌 사람들과 고통을 함께 나누었고, 또한 자기 소유를 빼앗기는 일이 있어도, 그보다 더 좋고 더 영구한 재산이 있다는 것을 알고서, 그런 일을 기쁘게 당하였습니다.",
        ],
        [
          35,
          "그러므로 여러분의 확신을 버리지 마십시오. 그 확신에는 큰 상이 붙어 있습니다.",
        ],
        [
          36,
          "여러분이 [willOfGod|하나님의 뜻]을 행하고서, 그 [promised|약속해 주신 것]을 받으려면, [endurance|인내]가 필요합니다.",
        ],
        [
          37,
          "이제 “아주 조금만 있으면, 오실 분이 오실 것이요, 지체하지 않으실 것이다.",
        ],
        [
          38,
          "나의 의인은 믿음으로 살 것이다. 그가 [shrink|뒤로 물러서면], 내 마음이 그를 기뻐하지 않을 것이다.”",
        ],
        [
          39,
          "우리는 뒤로 물러나서 멸망할 사람들이 아니라, 믿음을 가져 생명을 얻을 사람들입니다.",
        ],
      ],
      com: [
        ["h", "무대에 세워짐"],
        [
          "p",
          "그 시대에는 죄인들을 극장에서 드러내어 벌하기도 했습니다. 독자들은 무대 위에 세워져 사람들 앞에서 수치를 당했습니다. 많은 그리스도인이 체포를 피해 숨었지만, 이 독자들은 감옥에 끌려간 믿는 사람들 곁에 서서, 자기의 위험을 무릅쓰고 음식과 위로를 가져다주는 용기를 보였습니다.",
        ],
        ["h", "그들이 돌아가고 싶어 한 이유"],
        [
          "p",
          "로마 시대에 유대교는 법으로 인정된 종교였기 때문에, 유대인들은 황제와 이방 신들을 섬기는 일에서 면제되었습니다. 기독교는 불법이었습니다. 로마는 처음에는 그리스도인을 유대교의 한 부류로 보았지만, 이방인이 많이 들어오면서 별개의 운동임이 드러났습니다. 새로운 것이었기에 로마는 이를 불법적인 미신이자 정부와 권위와 사회 질서를 위협하는 것으로 보았습니다.",
        ],
        [
          "p",
          "그래서 독자들은 박해와 형제자매의 투옥과 공개적인 수치로 지쳐 있었습니다. 그들이 유대교로 돌아가고 싶어 한 것은, 그 길이 더 안전하고 로마법의 보호를 받았기 때문입니다. 재산을 빼앗기지도, 공개적으로 수치를 당하지도, 목숨을 걸지도 않아도 되었습니다.",
        ],
        ["h", "하박국 2장"],
        [
          "p",
          "하박국은 앗시리아가 무너진 직후 바빌로니아 제국이 나보폴라사르 왕과 그의 아들 느부갓네살 2세 아래에서 일어나던 때에 기록했습니다. 2장은 1장에서 하나님께서 왜 유다의 부패를 내버려 두시느냐고 물은 하박국에게 주신 답입니다. 하나님은 커져 가는 바빌로니아의 힘으로 유다를 벌하시겠다고 하십니다.",
        ],
        [
          "p",
          "하나님은 묵시가 정한 때를 기다리며 늦어지지 않을 것이라고 약속하십니다. 원수는 교만으로 가득하지만 의인은 믿음으로 삽니다. 어려운 때를 견디는 길은 믿음뿐이라는 말씀이며, 이것은 히브리서에도 해당됩니다. “그가 뒤로 물러서면, 내 마음이 그를 기뻐하지 않을 것이다”는 그리스어 칠십인역에 있는 말입니다.",
        ],
        ["h", "아주 조금만 있으면"],
        [
          "p",
          "“아주 조금만 있으면”은 곧 조금 뒤에 오실 분, 곧 예수님께서 지체하지 않고 오신다는 뜻입니다. 그러므로 하나님의 뜻을 행하는 인내를 지켜 약속하신 것을 받으십시오(5:9; 9:15). 약속하신 것은 구원입니다.",
        ],
        [
          "p",
          "38절은 어려움 때문에 믿음을 버리지 말고 믿음으로 살라는 영적 격려입니다. 하나님은 복음을 등지는 사람을 기뻐하지 않으십니다. 어려운 때에도 성경과 예수님을 믿는 믿음을 지키십시오.",
        ],
      ],
    },
    words: {
      en: {
        enlightened: {
          t: "Enlightened",
          g: "phōtisthentes · φωτισθέντες",
          v: "10:32",
          s: "Conversion",
          d: "A metaphor for conversion: being born again, coming to know the truth of the gospel.",
        },
        exposed: {
          t: "Publicly exposed",
          g: "theatrizomenoi · θεατριζόμενοι",
          v: "10:33",
          s: "Set on a stage",
          d: "From theatrizo: to bring upon the stage, to set forth as a spectacle. Here, publicly exposed to shame and affliction, as criminals sometimes were in the theatre. Reproach means insult, abuse, disgrace.",
        },
        partners: {
          t: "Partners",
          g: "koinōnoi · κοινωνοί",
          v: "10:33",
          s: "Standing with the imprisoned",
          d: "Many Christians hid to avoid arrest, but the readers stood alongside the believers dragged into prison, bringing them food and comfort at their own risk.",
        },
        endurance: {
          t: "Endurance",
          g: "hypomonēs · ὑπομονῆς",
          v: "10:36",
          s: "Remaining under pressure",
          d: "Steadfastness, remaining under pressure, refusing to quit when life or faith becomes difficult.",
        },
        willOfGod: {
          t: "Will of God",
          g: "to thelēma tou Theou · τὸ θέλημα τοῦ Θεοῦ",
          v: "10:36",
          s: "Remaining loyal",
          d: "Here, holding on to faith in Jesus Christ and remaining loyal to him even in difficult times.",
        },
        promised: {
          t: "Promised",
          g: "tēn epangelian · τὴν ἐπαγγελίαν",
          v: "10:36",
          s: "Salvation",
          d: "What is promised is salvation.",
        },
        shrink: {
          t: "Shrink back",
          g: "hyposteilētai · ὑποστείληται",
          v: "10:38",
          s: "Quietly withdrawing",
          d: "To withdraw, retreat, quietly abandon commitment to Christ to avoid trouble.",
        },
      },
      ko: {
        enlightened: {
          t: "빛을 받음",
          g: "phōtisthentes · φωτισθέντες",
          v: "10:32",
          s: "회심",
          d: "회심, 곧 거듭나서 복음의 진리를 알게 된 것을 비유로 말한 것입니다.",
        },
        exposed: {
          t: "구경거리",
          g: "theatrizomenoi · θεατριζόμενοι",
          v: "10:33",
          s: "무대에 세워짐",
          d: "theatrizo에서 온 말로, 무대에 올리다, 구경거리로 내놓다는 뜻입니다. 죄인들을 극장에서 드러내어 벌하던 것처럼 공개적으로 수치와 고난을 당했다는 말입니다. 모욕은 욕설과 학대와 치욕을 뜻합니다.",
        },
        partners: {
          t: "친구",
          g: "koinōnoi · κοινωνοί",
          v: "10:33",
          s: "갇힌 사람들 곁에 섬",
          d: "많은 그리스도인이 체포를 피해 숨었지만, 독자들은 감옥에 끌려간 믿는 사람들 곁에 서서 자기의 위험을 무릅쓰고 음식과 위로를 가져다주었습니다.",
        },
        endurance: {
          t: "인내",
          g: "hypomonēs · ὑπομονῆς",
          v: "10:36",
          s: "압박 아래 머무름",
          d: "꿋꿋함, 압박 아래 머무름, 삶이나 믿음이 어려워져도 그만두지 않는 것입니다.",
        },
        willOfGod: {
          t: "하나님의 뜻",
          g: "to thelēma tou Theou · τὸ θέλημα τοῦ Θεοῦ",
          v: "10:36",
          s: "충성을 지킴",
          d: "여기서는 어려운 때에도 예수 그리스도를 믿는 믿음을 붙들고 그분께 충성하는 것입니다.",
        },
        promised: {
          t: "약속해 주신 것",
          g: "tēn epangelian · τὴν ἐπαγγελίαν",
          v: "10:36",
          s: "구원",
          d: "약속해 주신 것은 구원입니다.",
        },
        shrink: {
          t: "뒤로 물러섬",
          g: "hyposteilētai · ὑποστείληται",
          v: "10:38",
          s: "조용히 물러남",
          d: "어려움을 피하려고 그리스도께 대한 헌신을 조용히 버리고 물러나는 것입니다.",
        },
      },
    },
    chips: [
      {
        id: "isa26-20",
        tag: "OT",
        en: "Isa 26:20",
        ko: "사 26:20",
        ten: "Come, my people, enter your chambers, and shut your doors behind you; hide yourselves for a little while until the fury has passed by.",
        tko: "“나의 백성아! 집으로 가서, 방 안으로 들어가거라. 들어가서 문을 닫고, 나의 진노가 풀릴 때까지 잠시 숨어 있어라.”",
        wen: "“A little while”, behind verse 37.",
        wko: "37절 뒤에 있는 “잠시”.",
      },
      {
        id: "hab2-3",
        tag: "OT",
        en: "Hab 2:3",
        ko: "합 2:3",
        ten: "For still the vision awaits its appointed time; it hastens to the end—it will not lie. If it seems slow, wait for it; it will surely come; it will not delay.",
        tko: "이 묵시는, 정한 때가 되어야 이루어진다. 끝이 곧 온다는 것을 말하고 있다. 이것은 공연한 말이 아니니, 비록 더디더라도 그 때를 기다려라. 반드시 오고야 만다. 늦어지지 않을 것이다.",
        wen: "It will surely come, and will not delay.",
        wko: "반드시 오고, 늦어지지 않음.",
      },
      {
        id: "hab2-4",
        tag: "OT",
        en: "Hab 2:4",
        ko: "합 2:4",
        ten: "Behold, his soul is puffed up; it is not upright within him, but the righteous shall live by his faith.",
        tko: "마음이 한껏 부푼 교만한 자를 보아라. 그는 정직하지 못하다. 그러나 의인은 믿음으로 산다.",
        wen: "The source of verse 38.",
        wko: "38절이 인용한 말씀.",
      },
      {
        id: "heb5-9",
        tag: "NT",
        en: "Heb 5:9",
        ko: "히 5:9",
        ten: "And being made perfect, he became the source of eternal salvation to all who obey him,",
        tko: "그리고 완전하게 되신 뒤에, 자기에게 순종하는 모든 사람에게 영원한 구원의 근원이 되시고,",
        wen: "The eternal salvation that was promised.",
        wko: "약속된 영원한 구원.",
      },
      {
        id: "heb9-15",
        tag: "NT",
        en: "Heb 9:15",
        ko: "히 9:15",
        ten: "Therefore he is the mediator of a new covenant, so that those who are called may receive the promised eternal inheritance, since a death has occurred that redeems them from the transgressions committed under the first covenant.",
        tko: "그러므로 그리스도는 새 언약의 중재자이십니다. 그는 첫 번째 언약 아래에서 저지른 범죄에서 사람들을 구속하시기 위하여 죽으심으로써, 부르심을 받은 사람들로 하여금 약속된 영원한 유업을 차지하게 하셨습니다.",
        wen: "The promised eternal inheritance.",
        wko: "약속된 영원한 유업.",
      },
    ],
  },
];

const SUM: Record<Lang, Summary> = {
  en: {
    groups: [
      {
        h: "What Christ has done",
        items: [
          [
            "1–4",
            "Earthly priests offered sacrifices regularly that could not perfect those drawing near to God.",
          ],
          [
            "5–10",
            "God took no pleasure in the offerings of bulls and goats, so Jesus became the ultimate sacrifice to fulfil God’s will.",
          ],
          [
            "11–14",
            "Jesus offered himself once for all and sat down at the right hand of God.",
          ],
          [
            "15–18",
            "Believers are permanently perfected, internally transformed and totally forgiven, so no further offering is needed.",
          ],
          [
            "19–21",
            "He entered heaven itself and serves as the great high priest.",
          ],
        ],
      },
      {
        h: "What we are told to do",
        items: [
          ["22", "Draw near with a true heart: faith."],
          ["23", "Hold fast the confession without wavering: hope."],
          ["24–25", "Stir up one another to love and good works: love."],
          [
            "26–31",
            "If they keep sinning deliberately, the only thing awaiting is judgment from God.",
          ],
          [
            "32–39",
            "Even in very difficult times, do not shrink back. Live fully in faith and endure in doing the will of God.",
          ],
        ],
      },
    ],
    intentH: "Author’s intent",
    intentShort:
      "To show that Jesus’ one sacrifice has finished what the repeated sacrifices never could, and to urge exhausted believers to keep their faith and hope in him and not shrink back.",
    intent: [
      "Earthly priests and high priests needed to offer sacrifices regularly, and these could not perfect those drawing near to God. Since God took no pleasure in the offerings of bulls and goats, Jesus became the ultimate sacrifice to fulfil God’s will. He offered himself once for all into the better sanctuary and sat down at the right hand of God.",
      "Because Jesus entered heaven itself and serves as the great high priest, the author encourages the readers to keep their faith and hope in him without wavering, and to continue to love and do good works. If they continue to sin deliberately, the only thing awaiting is judgment from God.",
      "Even though they are in very difficult times, the author continues to encourage them to remain in faith, not to shrink back but to live fully in faith, and to endure in the will of God to receive what was promised.",
    ],
  },
  ko: {
    groups: [
      {
        h: "그리스도께서 하신 일",
        items: [
          [
            "1–4절",
            "땅의 제사장들은 정기적으로 제사를 드렸지만, 하나님께 나오는 사람들을 완전하게 할 수 없었습니다.",
          ],
          [
            "5–10절",
            "하나님께서 황소와 염소의 제물을 기뻐하지 않으셨기에, 예수님께서 하나님의 뜻을 이루시려고 궁극의 제물이 되셨습니다.",
          ],
          [
            "11–14절",
            "예수님께서 자기를 단 한 번에 드리시고 하나님 오른쪽에 앉으셨습니다.",
          ],
          [
            "15–18절",
            "믿는 사람들은 영원히 완전하게 되고 속에서부터 변화되며 온전히 용서받아, 더 이상의 제사가 필요 없습니다.",
          ],
          [
            "19–21절",
            "그는 하늘 그 자체에 들어가셔서 위대한 대제사장으로 섬기십니다.",
          ],
        ],
      },
      {
        h: "우리가 할 일",
        items: [
          ["22절", "참된 마음으로 나아갑시다. 믿음입니다."],
          ["23절", "흔들리지 말고 고백을 굳게 지킵시다. 소망입니다."],
          ["24–25절", "서로 사랑과 선한 일을 격려합시다. 사랑입니다."],
          ["26–31절", "짐짓 죄를 계속 지으면 남는 것은 하나님의 심판뿐입니다."],
          [
            "32–39절",
            "매우 어려운 때에도 뒤로 물러나지 말고, 온전히 믿음으로 살며 하나님의 뜻을 행하는 인내를 지킵시다.",
          ],
        ],
      },
    ],
    intentH: "저자의 의도",
    intentShort:
      "되풀이되는 제사가 이루지 못한 일을 예수님의 단 한 번의 희생이 끝내셨음을 보여 주고, 지친 믿는 사람들에게 그분을 향한 믿음과 소망을 지키고 뒤로 물러나지 말라고 권하는 것.",
    intent: [
      "땅의 제사장들과 대제사장들은 정기적으로 제사를 드려야 했고, 그 제사는 하나님께 나오는 사람들을 완전하게 할 수 없었습니다. 하나님께서 황소와 염소의 제물을 기뻐하지 않으셨기에, 예수님께서 하나님의 뜻을 이루시려고 궁극의 제물이 되셨습니다. 그는 더 좋은 성소에 자기를 단 한 번에 드리시고 하나님 오른쪽에 앉으셨습니다.",
      "예수님께서 하늘 그 자체에 들어가셔서 위대한 대제사장으로 섬기시므로, 저자는 독자들에게 흔들리지 말고 그분을 향한 믿음과 소망을 지키며, 계속해서 사랑하고 선한 일을 하라고 권합니다. 짐짓 죄를 계속 지으면 남는 것은 하나님의 심판뿐입니다.",
      "매우 어려운 때를 지나고 있지만, 저자는 그들이 믿음에 머물러 뒤로 물러나지 말고 온전히 믿음으로 살며, 하나님의 뜻을 행하는 인내를 지켜 약속하신 것을 받으라고 계속 격려합니다.",
    ],
  },
};

const COPY: Record<Lang, ChapterCopy> = {
  en: {
    heroEyebrow: "A verse-by-verse study · ESV",
    heroTitle: "Hebrews 10",
    tagline:
      "“For by a single offering he has perfected for all time those who are being sanctified.”",
    taglineRef: "Hebrews 10:14",
    mapTitle: "Thirty-nine verses, six movements",
    mapIntro:
      "The law was only a shadow, and its priests stood and offered the same sacrifices year after year. Christ came to do God’s will, offered one sacrifice and sat down. So let us draw near, hold fast and stir up one another, for there is no other sacrifice, and let us not shrink back.",
    summaryTitle: "What Hebrews 10 says",
    footQuote:
      "“Let us hold fast the confession of our hope without wavering, for he who promised is faithful.”",
    version: "ESV",
  },
  ko: {
    heroEyebrow: "한 절씩 읽는 성경 공부 · 새번역",
    heroTitle: "히브리서 10장",
    tagline:
      "“그는 거룩하게 되는 사람들을 단 한 번의 희생제사로 영원히 완전하게 하셨습니다.”",
    taglineRef: "히브리서 10:14",
    mapTitle: "서른아홉 절, 여섯 흐름",
    mapIntro:
      "율법은 그림자일 뿐이었고, 제사장들은 해마다 서서 똑같은 제사를 드렸습니다. 그리스도께서는 하나님의 뜻을 행하러 오셔서 단 한 번의 제사를 드리시고 앉으셨습니다. 그러므로 다른 제사가 없으니 나아가고, 굳게 지키고, 서로 격려하며, 뒤로 물러나지 맙시다.",
    summaryTitle: "히브리서 10장이 말하는 것",
    footQuote:
      "“또 우리에게 약속하신 분은 신실하시니, 우리는 흔들리지 말고, 우리가 고백하는 그 소망을 굳게 지킵시다.”",
    version: "새번역",
  },
};

export const chapter10: ChapterContent = {
  number: 10,
  setting: "wall",
  copy: COPY,
  movements: MV,
  summary: SUM,
};
