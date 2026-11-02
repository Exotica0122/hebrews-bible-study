import { useSyncExternalStore } from "react";

/** Where the reader last was, so the home page can offer to continue. */
export interface LastRead {
  chapter: number;
  /** Section id from the scroll spy, e.g. "hb-m3"; "hb-top" for the hero. */
  section: string;
}

const KEY = "hb-last-read";
const listeners = new Set<() => void>();
let cache: LastRead | null | undefined;

export function parseLastRead(raw: string | null): LastRead | null {
  try {
    const v: unknown = JSON.parse(raw ?? "null");
    if (typeof v !== "object" || v === null) return null;
    const { chapter, section } = v as Record<string, unknown>;
    if (typeof chapter !== "number" || !Number.isInteger(chapter)) return null;
    return {
      chapter,
      section:
        typeof section === "string" && /^hb-[\w-]+$/.test(section)
          ? section
          : "hb-top",
    };
  } catch {
    return null;
  }
}

function read(): LastRead | null {
  if (cache === undefined) {
    try {
      cache = parseLastRead(window.localStorage.getItem(KEY));
    } catch {
      cache = null;
    }
  }
  return cache;
}

export function rememberReading(chapter: number, section: string) {
  const prev = read();
  if (prev?.chapter === chapter && prev.section === section) return;
  cache = { chapter, section };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function useLastRead(): LastRead | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
