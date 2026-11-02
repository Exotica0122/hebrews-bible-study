import { useCallback, useSyncExternalStore } from "react";
import type { Lang } from "@/content/types";

export const MAX_RECENT = 6;

const KEY_PREFIX = "hb-search-history-";
const NONE: string[] = [];

const listeners = new Set<() => void>();
const cache = new Map<Lang, string[]>();

export function withRecent(list: string[], query: string): string[] {
  const q = query.trim();
  if (!q) return list;
  const lower = q.toLowerCase();
  return [q, ...list.filter((item) => item.toLowerCase() !== lower)].slice(
    0,
    MAX_RECENT,
  );
}

export function parseRecent(raw: string | null): string[] {
  try {
    const list: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(list)) return [];
    return list
      .filter((item): item is string => typeof item === "string")
      .slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function getRecent(lang: Lang): string[] {
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

function setRecent(lang: Lang, list: string[]) {
  cache.set(lang, list);
  try {
    window.localStorage.setItem(KEY_PREFIX + lang, JSON.stringify(list));
  } catch {}
  listeners.forEach((l) => l());
}

export function rememberSearch(lang: Lang, query: string) {
  setRecent(lang, withRecent(getRecent(lang), query));
}

export function forgetSearch(lang: Lang, query: string) {
  setRecent(
    lang,
    getRecent(lang).filter((item) => item !== query),
  );
}

export function clearSearches(lang: Lang) {
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

export function useRecentSearches(lang: Lang): string[] {
  return useSyncExternalStore(
    subscribe,
    useCallback(() => getRecent(lang), [lang]),
    () => NONE,
  );
}
