"use client";

import type { KeyboardEvent } from "react";
import type { WordStudy } from "@/content/types";
import { useLang } from "@/lib/lang";
import s from "./movement.module.css";

interface GlossAsideProps {
  keys: string[];
  words: Record<string, WordStudy>;
  openKey: string | null;
  onToggle: (key: string) => void;
}

export function GlossAside({ keys, words, openKey, onToggle }: GlossAsideProps) {
  const { t } = useLang();
  const onKey = (key: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(key);
    }
  };
  return (
    <aside aria-label={t.words} className={s.aside}>
      <div className={`hb-eyebrow ${s.asideLabel}`}>{t.words}</div>
      <p className={s.hint}>{t.hint}</p>
      {keys.map((k) => {
        const w = words[k];
        if (!w) return null;
        return (
          <div
            key={k}
            role="button"
            tabIndex={0}
            aria-pressed={openKey === k}
            className={s.note}
            onClick={() => onToggle(k)}
            onKeyDown={onKey(k)}
          >
            <div className={s.noteRef}>{w.v}</div>
            <div className={s.noteTitle}>{w.t}</div>
            <div className={s.noteGloss}>{w.s}</div>
          </div>
        );
      })}
    </aside>
  );
}
