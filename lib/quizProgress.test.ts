import { describe, expect, it } from "vitest";
import {
  EMPTY_PROGRESS,
  knownIn,
  parseProgress,
  withRound,
} from "./quizProgress";

describe("withRound", () => {
  it("adds right answers to known and wrong ones to the review pile", () => {
    const p = withRound(
      EMPTY_PROGRESS,
      [
        { id: "1-radiance", correct: true },
        { id: "7-oath", correct: false },
      ],
      100,
    );
    expect(p.known).toEqual(["1-radiance"]);
    expect(p.missed).toEqual(["7-oath"]);
    expect(p.last).toEqual({ score: 1, total: 2, at: 100 });
  });

  it("moves a question between piles when the answer changes", () => {
    let p = withRound(EMPTY_PROGRESS, [{ id: "7-oath", correct: false }], 1);
    p = withRound(p, [{ id: "7-oath", correct: true }], 2);
    expect(p.missed).toEqual([]);
    expect(p.known).toEqual(["7-oath"]);
    p = withRound(p, [{ id: "7-oath", correct: false }], 3);
    expect(p.known).toEqual([]);
    expect(p.missed).toEqual(["7-oath"]);
  });
});

describe("knownIn", () => {
  it("counts only the chapter asked for, including two-digit chapters", () => {
    const p = { ...EMPTY_PROGRESS, known: ["1-a", "1-b", "10-a", "11-a"] };
    expect(knownIn(p, 1)).toBe(2);
    expect(knownIn(p, 10)).toBe(1);
  });
});

describe("parseProgress", () => {
  it("survives missing, broken or foreign data", () => {
    expect(parseProgress(null)).toEqual(EMPTY_PROGRESS);
    expect(parseProgress("{nope")).toEqual(EMPTY_PROGRESS);
    expect(parseProgress("[1,2]")).toEqual(EMPTY_PROGRESS);
    expect(
      parseProgress('{"known":[1],"missed":"x","last":{"score":"2"}}'),
    ).toEqual(EMPTY_PROGRESS);
  });

  it("reads saved progress back", () => {
    const saved = {
      known: ["2-drift"],
      missed: ["3-house"],
      last: { score: 4, total: 5, at: 9 },
    };
    expect(parseProgress(JSON.stringify(saved))).toEqual(saved);
  });
});
