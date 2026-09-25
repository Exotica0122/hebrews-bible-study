"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
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

const FOCUSABLE = "button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";

export function WordSheet({ word, prev, next, onPrev, onNext, onClose }: WordSheetProps) {
  const { t } = useLang();
  const sheet = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    close.current?.focus({ preventScroll: true });
  }, [word]);

  const trapTab = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !sheet.current) return;
    const items = [...sheet.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <div className={s.backdrop} onClick={onClose} />
      <div ref={sheet} role="dialog" aria-modal="true" aria-label={word.t} className={s.sheet} onKeyDown={trapTab}>
        <div className={s.handle} />
        <div className={s.head}>
          <span className={`hb-eyebrow ${s.label}`}>{t.wordStudy} · {word.v}</span>
          <button ref={close} type="button" className={s.close} aria-label={t.close} onClick={onClose}>×</button>
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
