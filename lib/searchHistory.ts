import { useCallback, useSyncExternalStore } from "react";
import type { SearchEntry } from "@/content/search";
import type { Lang } from "@/content/types";

export const MAX_RECENT = 6;
const MAX_TEXT = 160;

export type RecentEntry = Omit<SearchEntry, "also">;

const KEY_PREFIX = "hb-search-history-";
const NONE: RecentEntry[] = [];

const listeners = new Set<() => void>();
const cache = new Map<Lang, RecentEntry[]>();

export const entryKey = (e: RecentEntry) =>
  `${e.chapter}-${e.kind}-${e.target}`;

export function withRecent(
  list: RecentEntry[],
  entry: SearchEntry,
): RecentEntry[] {
  const { kind, chapter, ref, title, text, target } = entry;
  const recent = {
    kind,
    chapter,
    ref,
    title,
    text: text.slice(0, MAX_TEXT),
    target,
  };
  const key = entryKey(recent);
  return [recent, ...list.filter((e) => entryKey(e) !== key)].slice(
    0,
    MAX_RECENT,
  );
}

function isRecentEntry(value: unknown): value is RecentEntry {
  if (typeof value !== "object" || value === null) return false;
  const e = value as Record<string, unknown>;
  return (
    typeof e.kind === "string" &&
    typeof e.chapter === "number" &&
    typeof e.ref === "string" &&
    typeof e.text === "string" &&
    typeof e.target === "string" &&
    (e.title === undefined || typeof e.title === "string")
  );
}

export function parseRecent(raw: string | null): RecentEntry[] {
  try {
    const list: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(list)) return [];
    return list.filter(isRecentEntry).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function getRecent(lang: Lang): RecentEntry[] {
  let list = cache.get(lang);
  if (!list) {
    try {
      list = parseRecent(window.localStorage.getItem(KEY_PREFIX + lang));
    } catch {
      list = [];
    }
    cache.set(lang, list);
  }
  return list;
}

function setRecent(lang: Lang, list: RecentEntry[]) {
  cache.set(lang, list);
  try {
    window.localStorage.setItem(KEY_PREFIX + lang, JSON.stringify(list));
  } catch {}
  listeners.forEach((l) => l());
}

export function rememberEntry(lang: Lang, entry: SearchEntry) {
  setRecent(lang, withRecent(getRecent(lang), entry));
}

export function forgetEntry(lang: Lang, entry: RecentEntry) {
  const key = entryKey(entry);
  setRecent(
    lang,
    getRecent(lang).filter((e) => entryKey(e) !== key),
  );
}

export function clearRecent(lang: Lang) {
  setRecent(lang, []);
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && !e.key.startsWith(KEY_PREFIX)) return;
    cache.clear();
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useRecentEntries(lang: Lang): RecentEntry[] {
  return useSyncExternalStore(
    subscribe,
    useCallback(() => getRecent(lang), [lang]),
    () => NONE,
  );
}
