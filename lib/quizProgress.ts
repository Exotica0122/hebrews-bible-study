import { useSyncExternalStore } from "react";
import { chapterOf } from "@/content/quiz";

/**
 * Quiz progress lives only in this browser. There are no accounts, so it does
 * not follow the reader between devices.
 */
export interface QuizProgress {
  /** Questions answered correctly the last time they came up. */
  known: string[];
  /** Questions answered wrongly the last time: the review pile. */
  missed: string[];
  last: { score: number; total: number; at: number } | null;
}

export interface AnswerResult {
  id: string;
  correct: boolean;
}

const KEY = "hb-quiz-v1";
export const EMPTY_PROGRESS: QuizProgress = {
  known: [],
  missed: [],
  last: null,
};

const listeners = new Set<() => void>();
let cache: QuizProgress | null = null;

const isStringList = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

export function parseProgress(raw: string | null): QuizProgress {
  try {
    const v: unknown = JSON.parse(raw ?? "null");
    if (typeof v !== "object" || v === null) return EMPTY_PROGRESS;
    const p = v as Record<string, unknown>;
    const last = p.last as Record<string, unknown> | null | undefined;
    return {
      known: isStringList(p.known) ? p.known : [],
      missed: isStringList(p.missed) ? p.missed : [],
      last:
        last &&
        typeof last.score === "number" &&
        typeof last.total === "number" &&
        typeof last.at === "number"
          ? { score: last.score, total: last.total, at: last.at }
          : null,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

/** Folds one finished round into the saved progress. */
export function withRound(
  progress: QuizProgress,
  results: readonly AnswerResult[],
  at: number,
): QuizProgress {
  const known = new Set(progress.known);
  const missed = new Set(progress.missed);
  for (const r of results) {
    if (r.correct) {
      known.add(r.id);
      missed.delete(r.id);
    } else {
      missed.add(r.id);
      known.delete(r.id);
    }
  }
  return {
    known: [...known],
    missed: [...missed],
    last: {
      score: results.filter((r) => r.correct).length,
      total: results.length,
      at,
    },
  };
}

/** How many of a chapter's questions were answered right the last time. */
export function knownIn(progress: QuizProgress, chapter: number): number {
  return progress.known.filter((id) => chapterOf(id) === chapter).length;
}

function read(): QuizProgress {
  if (cache === null) {
    try {
      cache = parseProgress(window.localStorage.getItem(KEY));
    } catch {
      cache = EMPTY_PROGRESS;
    }
  }
  return cache;
}

export function saveRound(results: readonly AnswerResult[]) {
  cache = withRound(read(), results, Date.now());
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== KEY) return;
    cache = null;
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useQuizProgress(): QuizProgress {
  return useSyncExternalStore(subscribe, read, () => EMPTY_PROGRESS);
}
