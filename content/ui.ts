import type { Lang } from "./types";

// UI strings copied verbatim from the design handoff prototype (T constant).
const T = {
  en: { brand: 'Hebrews', chapter: 'Chapter 1', map: 'Map', summary: 'Summary', heroEyebrow: 'A verse-by-verse study · ESV', heroTitle: 'Hebrews 1',
    tagline: '“Long ago, at many times and in many ways… but in these last days he has spoken to us by his Son.”', taglineRef: 'Hebrews 1:1–2', begin: 'Begin the study', seeMap: 'See the chapter map', scroll: 'Scroll',
    fragBush: 'burning bush · Ex 3', fragFire: 'fire · Ex 19', fragCloud: 'cloud · Ex 13', fragTablet: 'stone tablet · Ex 34',
    mapEyebrow: 'Chapter map', mapTitle: 'Fourteen verses, five movements', mapIntro: 'God speaks, the Son is named, the angels bow, creation wears out, and the Son sits enthroned.',
    hint: 'Tap a gold word for its meaning. Chips open the passages it draws on.', words: 'Word studies', open: 'open', scripture: 'Scripture', version: 'ESV', commentary: 'Commentary', threads: 'Old & New Testament threads', wordStudy: 'Word study', close: 'Close',
    loading: 'Preparing scene…', reduced: 'Motion reduced · still image', altA: 'Radiance', altB: 'Exact imprint',
    summaryEyebrow: 'Summary', summaryTitle: 'What Hebrews 1 says', footQuote: '“But you are the same, and your years will have no end.”', footCredit: 'Hebrews 1 group study · Scripture: ESV · 개역한글',
    footLegal: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. Korean text: 개역한글 (public domain).',
    chapters: 'Chapters of Hebrews', chLegend: '1 of 13 ready', soonEyebrow: 'Coming soon',
    soonBody: 'Our class hasn’t reached this chapter yet. When we do, its scenes, word studies and commentary will appear here.',
    soonParts: [{ k: '01', t: 'Opening scene' }, { k: '02', t: 'Chapter map' }, { k: '03', t: 'Word studies & commentary' }, { k: '04', t: 'Summary' }],
    backCh1: 'Back to Hebrews 1', bookEyebrow: 'The letter to the Hebrews', bookTitle: 'Thirteen chapters, one at a time',
    bookIntro: 'New chapters appear here as the class reaches them.', studying: 'Studying now', comingSoon: 'Coming soon',
    link: 'Link', copied: 'Copied', resume: 'Continue from', dismiss: 'Dismiss', backToTop: 'Back to top' },
  ko: { brand: '히브리서', chapter: '1장', map: '지도', summary: '요약', heroEyebrow: '한 절씩 읽는 성경 공부 · 개역한글', heroTitle: '히브리서 1장',
    tagline: '“옛적에 선지자들로 여러 부분과 여러 모양으로… 이 모든 날 마지막에 아들로 우리에게 말씀하셨으니”', taglineRef: '히브리서 1:1–2', begin: '공부 시작하기', seeMap: '장 지도 보기', scroll: '스크롤',
    fragBush: '떨기나무 불꽃 · 출 3', fragFire: '불 · 출 19', fragCloud: '구름 · 출 13', fragTablet: '돌판 · 출 34',
    mapEyebrow: '장 지도', mapTitle: '열네 절, 다섯 흐름', mapIntro: '하나님이 말씀하시고, 아들의 이름이 선포되며, 천사들이 엎드리고, 피조물은 낡아지며, 아들은 보좌에 앉으십니다.',
    hint: '금색 단어를 누르면 뜻이 열립니다. 칩을 누르면 관련 본문이 펼쳐집니다.', words: '단어 연구', open: '열림', scripture: '본문', version: '개역한글', commentary: '주석', threads: '구약·신약 연결', wordStudy: '단어 연구', close: '닫기',
    loading: '장면을 준비하는 중…', reduced: '움직임 줄임 · 정지 이미지', altA: '광채', altB: '본체의 형상',
    summaryEyebrow: '요약', summaryTitle: '히브리서 1장이 말하는 것', footQuote: '“주는 여전하여 연대가 다함이 없으리라”', footCredit: '히브리서 1장 그룹 성경 공부 · 본문: ESV · 개역한글',
    footLegal: '영어 본문: ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. 한국어 본문: 개역한글 (저작권 만료).',
    chapters: '히브리서 장', chLegend: '13장 중 1장 준비됨', soonEyebrow: '준비 중',
    soonBody: '우리 모임은 아직 이 장에 이르지 않았습니다. 공부하게 되면 장면, 단어 연구, 주석이 이곳에 나타납니다.',
    soonParts: [{ k: '01', t: '여는 장면' }, { k: '02', t: '장 지도' }, { k: '03', t: '단어 연구와 주석' }, { k: '04', t: '요약' }],
    backCh1: '히브리서 1장으로 돌아가기', bookEyebrow: '히브리서', bookTitle: '열세 장, 한 장씩',
    bookIntro: '모임이 진도를 나가면 새 장이 이곳에 추가됩니다.', studying: '공부 중', comingSoon: '준비 중',
    link: '링크', copied: '복사됨', resume: '이어서 보기', dismiss: '닫기', backToTop: '맨 위로' }
};

export type UiStrings = typeof T.en;
export const UI: Record<Lang, UiStrings> = T;

export const ORD_KO = ["첫째", "둘째", "셋째", "넷째", "다섯째"];
