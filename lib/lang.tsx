"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { Lang } from "@/content/types";
import { UI, type UiStrings } from "@/content/ui";

const STORAGE_KEY = "hb-lang";
const DEFAULT_LANG: Lang = "en";

const listeners = new Set<() => void>();
let current: Lang | null = null;

function readStored(): Lang {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "ko" || v === "en" ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function getSnapshot(): Lang {
  if (current === null) current = readStored();
  return current;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function setLang(next: Lang) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((l) => l());
}

interface LangContextValue {
  lang: Lang;
  t: UiStrings;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_LANG);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: UI[lang], setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
