import type { Lang } from "../types";

/**
 * Quiz questions test the ideas of each chapter, not word-for-word recall.
 * Every question is grounded in that chapter's commentary, summary and
 * "author's intention", and links back to the movement it comes from.
 *
 * Authoring rule: the correct option is always written FIRST. Options are
 * shuffled when a round is built, so the order here never reaches the reader.
 */
interface QuizBase {
  /** Stable id, `<chapter>-<slug>`. Saved in progress, so never rename one. */
  id: string;
  /** Movement the question comes from; the "read" link opens `/<n>#hb-<mid>`. */
  mid: string;
  /** Verses within the chapter, e.g. "4–14" or "3". */
  verses: string;
}

export interface ChoiceCopy {
  q: string;
  /** Correct answer first, then 2–3 believable misreadings. */
  options: string[];
  /** Why each misreading is wrong, one per option after the first. */
  notes: string[];
  why: string;
}

export interface ChoiceQuestion extends QuizBase {
  kind: "choice";
  en: ChoiceCopy;
  ko: ChoiceCopy;
}

export interface TrueFalseCopy {
  /** A statement the reader marks true or false. */
  q: string;
  why: string;
}

export interface TrueFalseQuestion extends QuizBase {
  kind: "truefalse";
  answer: boolean;
  en: TrueFalseCopy;
  ko: TrueFalseCopy;
}

export interface WhichCopy {
  /** An idea in plain words (paraphrase, never a quotation). */
  q: string;
  why: string;
}

export interface WhichQuestion extends QuizBase {
  kind: "which";
  /** The right chapter first, then three others. */
  chapters: [number, number, number, number];
  en: WhichCopy;
  ko: WhichCopy;
}

export type QuizQuestion = ChoiceQuestion | TrueFalseQuestion | WhichQuestion;

export type QuizCopyOf<Q extends QuizQuestion> = Q[Lang];
