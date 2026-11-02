import { describe, expect, it } from "vitest";
import { getQuizzes } from "@/content/quiz";
import type { QuizQuestion } from "@/content/quiz/types";
import { buildRound, correctIndex, isCorrect, shuffle } from "./quizRound";

/** Deterministic random numbers, so rounds can be compared. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2 ** 31;
    return s / 2 ** 31;
  };
}

describe("shuffle", () => {
  it("keeps every item", () => {
    const out = shuffle([1, 2, 3, 4, 5], seeded(1));
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("buildRound", () => {
  it("draws the requested number of distinct questions", async () => {
    const pool = await getQuizzes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const round = buildRound(pool, 10, seeded(2));
    expect(round).toHaveLength(10);
    expect(new Set(round.map((r) => r.question.id)).size).toBe(10);
  });

  it("spreads a round across the chosen chapters", async () => {
    const pool = await getQuizzes([1, 4, 6, 7, 9]);
    const round = buildRound(pool, 5, seeded(3));
    const chapters = round.map((r) => Number.parseInt(r.question.id, 10));
    expect(new Set(chapters)).toEqual(new Set([1, 4, 6, 7, 9]));
  });

  it("returns fewer questions when the pool is small", async () => {
    const pool = (await getQuizzes([1])).slice(0, 3);
    expect(buildRound(pool, 10, seeded(4))).toHaveLength(3);
  });

  it("orders answers so the right one can be found and is not always first", async () => {
    const pool = await getQuizzes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const round = buildRound(pool, 40, seeded(5));
    const firsts = new Set<number>();
    for (const item of round) {
      const q = item.question;
      const right = item.order.indexOf(correctIndex(q));
      expect(right).toBeGreaterThanOrEqual(0);
      expect(isCorrect(item, item.order[right])).toBe(true);
      if (q.kind === "choice") {
        expect([...item.order].sort()).toEqual(q.en.options.map((_, i) => i));
        firsts.add(right);
      }
      if (q.kind === "which") {
        const shown = item.order.map((i) => q.chapters[i]);
        expect(shown).toEqual([...shown].sort((a, b) => a - b));
      }
      if (q.kind === "truefalse") expect(item.order).toEqual([0, 1]);
    }
    expect(firsts.size).toBeGreaterThan(1);
  });
});

describe("correctIndex", () => {
  it("maps a false statement to the second button", () => {
    const q = {
      kind: "truefalse",
      answer: false,
    } as QuizQuestion;
    expect(correctIndex(q)).toBe(1);
  });
});
