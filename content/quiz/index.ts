import type { QuizQuestion } from "./types";

export type { QuizQuestion } from "./types";

const loaders: Record<number, () => Promise<QuizQuestion[]>> = {
  1: () => import("./1").then((m) => m.quiz1),
  2: () => import("./2").then((m) => m.quiz2),
  3: () => import("./3").then((m) => m.quiz3),
  4: () => import("./4").then((m) => m.quiz4),
  5: () => import("./5").then((m) => m.quiz5),
  6: () => import("./6").then((m) => m.quiz6),
  7: () => import("./7").then((m) => m.quiz7),
  8: () => import("./8").then((m) => m.quiz8),
  9: () => import("./9").then((m) => m.quiz9),
  10: () => import("./10").then((m) => m.quiz10),
  11: () => import("./11").then((m) => m.quiz11),
};

/**
 * Questions per chapter, so the home page can show progress without loading
 * every question file. `index.test.ts` keeps this in step with the files.
 */
export const QUIZ_COUNTS: Readonly<Record<number, number>> = {
  1: 9,
  2: 9,
  3: 9,
  4: 9,
  5: 9,
  6: 9,
  7: 9,
  8: 8,
  9: 9,
  10: 9,
  11: 10,
};

export const QUIZ_CHAPTERS: readonly number[] = Object.keys(loaders)
  .map(Number)
  .sort((a, b) => a - b);

export function hasQuiz(n: number): boolean {
  return n in loaders;
}

export function getQuiz(n: number): Promise<QuizQuestion[]> {
  const load = loaders[n];
  return load ? load() : Promise.resolve([]);
}

export async function getQuizzes(
  chapters: readonly number[],
): Promise<QuizQuestion[]> {
  const lists = await Promise.all(chapters.filter(hasQuiz).map(getQuiz));
  return lists.flat();
}

/** The chapter a question belongs to, from its `<chapter>-<slug>` id. */
export function chapterOf(id: string): number {
  return Number.parseInt(id, 10);
}
