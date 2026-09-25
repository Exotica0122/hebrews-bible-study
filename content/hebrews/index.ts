import type { ChapterContent } from "../types";

export const CHAPTER_COUNT = 13;

const chapters: Record<number, () => Promise<ChapterContent>> = {
  1: () => import("./1").then((m) => m.chapter1),
};

export function isLive(n: number): boolean {
  return n in chapters;
}

export function getChapter(n: number): Promise<ChapterContent | null> {
  const load = chapters[n];
  return load ? load() : Promise.resolve(null);
}
