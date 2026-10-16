import type { ChapterContent, Lang } from "../types";

export const CHAPTER_COUNT = 13;

interface ChapterEntry {
  load: () => Promise<ChapterContent>;
  title: Record<Lang, string>;
}

const chapters: Record<number, ChapterEntry> = {
  1: { load: () => import("./1").then((m) => m.chapter1), title: { en: "God has spoken by his Son", ko: "하나님이 아들로 말씀하셨다" } },
  2: { load: () => import("./2").then((m) => m.chapter2), title: { en: "Such a great salvation", ko: "이렇게도 귀중한 구원" } },
  3: { load: () => import("./3").then((m) => m.chapter3), title: { en: "Consider Jesus", ko: "예수를 깊이 생각하십시오" } },
  4: { load: () => import("./4").then((m) => m.chapter4), title: { en: "A Sabbath rest remains", ko: "안식하는 일이 아직 남아 있습니다" } },
  5: { load: () => import("./5").then((m) => m.chapter5), title: { en: "A priest forever", ko: "영원한 제사장" } },
  6: { load: () => import("./6").then((m) => m.chapter6), title: { en: "An anchor of the soul", ko: "영혼의 닻" } },
  7: { load: () => import("./7").then((m) => m.chapter7), title: { en: "After the order of Melchizedek", ko: "멜기세덱의 계통을 따라" } },
};

export const LIVE_COUNT = Object.keys(chapters).length;
export const LATEST_LIVE = Math.max(...Object.keys(chapters).map(Number));

export function isLive(n: number): boolean {
  return n in chapters;
}

export function chapterTitle(n: number, lang: Lang): string | undefined {
  return chapters[n]?.title[lang];
}

export function getChapter(n: number): Promise<ChapterContent | null> {
  const entry = chapters[n];
  return entry ? entry.load() : Promise.resolve(null);
}
