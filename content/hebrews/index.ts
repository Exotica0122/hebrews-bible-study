import type { ChapterContent, Lang } from "../types";

export const CHAPTER_COUNT = 13;

interface ChapterEntry {
  load: () => Promise<ChapterContent>;
  title: Record<Lang, string>;
}

const chapters: Record<number, ChapterEntry> = {
  1: { load: () => import("./1").then((m) => m.chapter1), title: { en: "God has spoken by his Son", ko: "하나님이 아들로 말씀하셨다" } },
  2: { load: () => import("./2").then((m) => m.chapter2), title: { en: "Such a great salvation", ko: "이렇게도 귀중한 구원" } },
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
