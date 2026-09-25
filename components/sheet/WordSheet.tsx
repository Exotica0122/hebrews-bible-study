"use client";

import type { WordStudy } from "@/content/types";
import { useLang } from "@/lib/lang";
import s from "./sheet.module.css";

interface WordSheetProps {
  word: WordStudy;
  prev?: WordStudy;
  next?: WordStudy;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function WordSheet({ word, prev, next, onPrev, onNext, onClose }: WordSheetProps) {
  const { t } = useLang();
  return (
    <>
      <div className={s.backdrop} onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={word.t} className={s.sheet}>
        <div className={s.handle} />
        <div className={s.head}>
          <span className={`hb-eyebrow ${s.label}`}>{t.wordStudy} · {word.v}</span>
          <button type="button" className={s.close} aria-label={t.close} onClick={onClose}>×</button>
        </div>
        <div className={s.title}>{word.t}</div>
        <div className={s.greek}>{word.g}</div>
        <div className={s.rule} />
        <p className={s.def}>{word.d}</p>
        {(prev || next) && (
          <div className={s.nav}>
            {prev && <button type="button" className={s.navBtn} onClick={onPrev}>← {prev.t}</button>}
            {next && <button type="button" className={s.navBtn} onClick={onNext}>{next.t} →</button>}
          </div>
        )}
      </div>
    </>
  );
}
