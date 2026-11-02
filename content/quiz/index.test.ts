import { describe, expect, it } from "vitest";
import { getChapter, isLive } from "../hebrews";
import {
  QUIZ_CHAPTERS,
  QUIZ_COUNTS,
  chapterOf,
  getQuiz,
  getQuizzes,
  hasQuiz,
} from "./index";
import type { QuizQuestion } from "./types";

const HANGUL = /[가-힣]/;

function texts(q: QuizQuestion): string[] {
  const out: string[] = [];
  for (const lang of ["en", "ko"] as const) {
    const c = q[lang];
    out.push(c.q, c.why);
    if ("options" in c) out.push(...c.options);
  }
  return out;
}

describe("quiz registry", () => {
  it("has a quiz for every live chapter and none for the rest", () => {
    expect(QUIZ_CHAPTERS).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    for (let n = 1; n <= 13; n++) expect(hasQuiz(n)).toBe(isLive(n));
  });

  it("keeps QUIZ_COUNTS in step with the question files", async () => {
    for (const n of QUIZ_CHAPTERS) {
      expect((await getQuiz(n)).length, `chapter ${n}`).toBe(QUIZ_COUNTS[n]);
    }
  });

  it("returns nothing for a chapter without a quiz", async () => {
    expect(await getQuiz(12)).toEqual([]);
  });

  it("loads several chapters at once", async () => {
    const qs = await getQuizzes([1, 2, 12]);
    expect(qs.length).toBe(QUIZ_COUNTS[1] + QUIZ_COUNTS[2]);
  });
});

describe.each(QUIZ_CHAPTERS.map((n) => [n]))("chapter %i questions", (n) => {
  it("are well formed in both languages", async () => {
    const chapter = await getChapter(n);
    const mids = new Set(chapter?.movements.map((m) => m.id));
    const qs = await getQuiz(n);
    expect(qs.length).toBeGreaterThanOrEqual(8);
    const ids = new Set<string>();
    for (const q of qs) {
      const label = q.id;
      expect(q.id, label).toMatch(new RegExp(`^${n}-[a-z0-9-]+$`));
      expect(chapterOf(q.id), label).toBe(n);
      expect(ids.has(q.id), `${label} is unique`).toBe(false);
      ids.add(q.id);
      expect(mids.has(q.mid), `${label} links to a real movement`).toBe(true);
      expect(q.verses, label).toMatch(/^\d+([–,] ?\d+)*$/);
      for (const t of texts(q))
        expect(t.trim().length, label).toBeGreaterThan(0);
      expect(HANGUL.test(q.ko.q), `${label} has Korean`).toBe(true);
      expect(HANGUL.test(q.ko.why), `${label} has Korean`).toBe(true);
      if (q.kind === "choice") {
        expect(q.en.options.length, label).toBeGreaterThanOrEqual(3);
        expect(q.en.options.length, label).toBeLessThanOrEqual(4);
        expect(q.ko.options.length, label).toBe(q.en.options.length);
        expect(new Set(q.en.options).size, label).toBe(q.en.options.length);
      }
      if (q.kind === "which") {
        expect(q.chapters[0], label).toBe(n);
        expect(new Set(q.chapters).size, label).toBe(4);
        for (const c of q.chapters)
          expect(isLive(c), `${label}: ${c}`).toBe(true);
      }
    }
  });

  it("mix question kinds", async () => {
    const kinds = new Set((await getQuiz(n)).map((q) => q.kind));
    expect(kinds).toEqual(new Set(["choice", "truefalse", "which"]));
  });
});
