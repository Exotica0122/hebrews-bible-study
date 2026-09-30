import type { Lang } from "./types";

// UI strings copied verbatim from the design handoff prototype (T constant).
const T = {
  en: { brand: 'Hebrews', map: 'Map', summary: 'Summary', introEyebrow: 'A verse-by-verse study',
    begin: 'Begin the study', seeMap: 'See the chapter map', scroll: 'Scroll',
    mapEyebrow: 'Chapter map',
    hint: 'Tap a gold word for its meaning. Chips open the passages it draws on.', words: 'Word studies', open: 'open', scripture: 'Scripture', commentary: 'Commentary', threads: 'Old & New Testament threads', wordStudy: 'Word study', close: 'Close',
    loading: 'Preparing scene…', reduced: 'Motion reduced · still image', altA: 'Radiance', altB: 'Exact imprint',
    summaryEyebrow: 'Summary', footCredit: 'Hebrews group study · Scripture: ESV · 새번역',
    footLegal: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. Brief NIV® quotation: © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide. Korean text: 새번역 © 1993, 2001 Korean Bible Society.',
    chapters: 'Chapters of Hebrews', chLegend: (n: number) => `${n} of 13 ready`, soonEyebrow: 'Coming soon',
    soonBody: 'Our class hasn’t reached this chapter yet. When we do, its scenes, word studies and commentary will appear here.',
    soonParts: [{ k: '01', t: 'Opening scene' }, { k: '02', t: 'Chapter map' }, { k: '03', t: 'Word studies & commentary' }, { k: '04', t: 'Summary' }],
    backTo: (name: string) => `Back to ${name}`, bookEyebrow: 'The letter to the Hebrews', bookTitle: 'Thirteen chapters, one at a time',
    bookIntro: 'New chapters appear here as the class reaches them.', studying: 'Studying now', comingSoon: 'Coming soon',
    link: 'Link', copied: 'Copied', resume: 'Continue from', dismiss: 'Dismiss', backToTop: 'Back to top' },
  ko: { brand: '히브리서', map: '지도', summary: '요약', introEyebrow: '한 절씩 읽는 성경 공부',
    begin: '공부 시작하기', seeMap: '장 지도 보기', scroll: '스크롤',
    mapEyebrow: '장 지도',
    hint: '금색 단어를 누르면 뜻이 열립니다. 칩을 누르면 관련 본문이 펼쳐집니다.', words: '단어 연구', open: '열림', scripture: '본문', commentary: '주석', threads: '구약·신약 연결', wordStudy: '단어 연구', close: '닫기',
    loading: '장면을 준비하는 중…', reduced: '움직임 줄임 · 정지 이미지', altA: '광채', altB: '본체대로의 모습',
    summaryEyebrow: '요약', footCredit: '히브리서 그룹 성경 공부 · 본문: ESV · 새번역',
    footLegal: '영어 본문: ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. Brief NIV® quotation: © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide. 한국어 본문: 새번역 © 1993, 2001 대한성서공회.',
    chapters: '히브리서 장', chLegend: (n: number) => `13장 중 ${n}장 준비됨`, soonEyebrow: '준비 중',
    soonBody: '우리 모임은 아직 이 장에 이르지 않았습니다. 공부하게 되면 장면, 단어 연구, 주석이 이곳에 나타납니다.',
    soonParts: [{ k: '01', t: '여는 장면' }, { k: '02', t: '장 지도' }, { k: '03', t: '단어 연구와 주석' }, { k: '04', t: '요약' }],
    backTo: (name: string) => `${name}으로 돌아가기`, bookEyebrow: '히브리서', bookTitle: '열세 장, 한 장씩',
    bookIntro: '모임이 진도를 나가면 새 장이 이곳에 추가됩니다.', studying: '공부 중', comingSoon: '준비 중',
    link: '링크', copied: '복사됨', resume: '이어서 보기', dismiss: '닫기', backToTop: '맨 위로' }
};

export type UiStrings = typeof T.en;
export const UI: Record<Lang, UiStrings> = T;

export const ORD_KO = ["첫째", "둘째", "셋째", "넷째", "다섯째"];
