import type { QuizQuestion } from "@/content/quiz/types";
import type { Lang } from "@/content/types";
import { chapterOf } from "@/content/quiz";

export const ROUND_LENGTHS = [5, 10] as const;
export type RoundLength = (typeof ROUND_LENGTHS)[number];

export interface RoundItem {
  question: QuizQuestion;
  /**
   * Display order, as indices into the question's source answers: `options`
   * for a choice, `chapters` for "which chapter", and [true, false] for a
   * true/false statement. Index 0 is the right answer for choice and which.
   */
  order: number[];
}

type Rand = () => number;

export function shuffle<T>(list: readonly T[], rand: Rand = Math.random): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The right answer, as an index into the question's source answers. */
export function correctIndex(q: QuizQuestion): number {
  if (q.kind === "truefalse") return q.answer ? 0 : 1;
  return 0;
}

/** Why a picked answer is wrong, when the question says; null otherwise. */
export function whyNot(
  q: QuizQuestion,
  picked: number,
  lang: Lang,
): string | null {
  if (q.kind !== "choice" || picked === 0) return null;
  return q[lang].notes[picked - 1] ?? null;
}

export function isCorrect(item: RoundItem, picked: number): boolean {
  return picked === correctIndex(item.question);
}

function orderFor(q: QuizQuestion, rand: Rand): number[] {
  if (q.kind === "truefalse") return [0, 1];
  if (q.kind === "which") {
    // Chapters read best in book order, which also hides the right one.
    return [0, 1, 2, 3].sort((a, b) => q.chapters[a] - q.chapters[b]);
  }
  return shuffle(
    q.en.options.map((_, i) => i),
    rand,
  );
}

/**
 * Picks `length` questions from `pool`, spread as evenly as possible across
 * the chapters in it, then shuffles both the questions and their answers.
 */
export function buildRound(
  pool: readonly QuizQuestion[],
  length: number,
  rand: Rand = Math.random,
): RoundItem[] {
  const byChapter = new Map<number, QuizQuestion[]>();
  for (const q of pool) {
    const n = chapterOf(q.id);
    byChapter.set(n, [...(byChapter.get(n) ?? []), q]);
  }
  const queues = shuffle([...byChapter.values()], rand).map((qs) =>
    shuffle(qs, rand),
  );
  const picked: QuizQuestion[] = [];
  while (picked.length < length && queues.some((q) => q.length > 0)) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next && picked.length < length) picked.push(next);
    }
  }
  return shuffle(picked, rand).map((question) => ({
    question,
    order: orderFor(question, rand),
  }));
}
