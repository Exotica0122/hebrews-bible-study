"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { CopyLinkButton } from "@/components/movement/CopyLinkButton";
import type { MovementCopy, WordStudy } from "@/content/types";
import { parseMarked } from "@/content/parse";
import { useLang } from "@/lib/lang";
import { LabelBar } from "@/components/ornaments/Ornaments";
import s from "./movement.module.css";

interface ScriptureProps {
  movementId: string;
  copy: MovementCopy;
  version: string;
  words: Record<string, WordStudy>;
  openKey: string | null;
  showPopover: boolean;
  dropCap: boolean;
  ruled: boolean;
  onToggle: (key: string) => void;
  onClose: () => void;
}

function activate(fn: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };
}

function Popover({ word, onClose }: { word: WordStudy; onClose: () => void }) {
  const { t } = useLang();
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    close.current?.focus({ preventScroll: true });
  }, []);
  return (
    <span role="dialog" aria-label={word.t} className={s.popover}>
      <span className={s.popHead}>
        <span className={`hb-eyebrow ${s.popLabel}`}>{t.wordStudy} · {word.v}</span>
        <span className={s.popActions}>
          <CopyLinkButton className={s.popLink} />
          <button ref={close} type="button" className={s.popClose} aria-label={t.close} onClick={onClose}>×</button>
        </span>
      </span>
      <span className={s.popTitle}>{word.t}</span>
      <span className={s.popGreek}>{word.g}</span>
      <span className={s.popRule} />
      <span className={s.popDef}>{word.d}</span>
    </span>
  );
}

export function Scripture({ movementId, copy, version, words, openKey, showPopover, dropCap, ruled, onToggle, onClose }: ScriptureProps) {
  const { t } = useLang();
  return (
    <>
      <LabelBar label={t.scripture} aside={version} className={s.label} />
      <div className={s.scripture}>
        {ruled && <div aria-hidden="true" className={s.rules} />}
        <div className={s.verses}>
          {copy.verses.map(([n, text], vi) => {
            const segs = parseMarked(text);
            let cap = "";
            if (dropCap && vi === 0 && segs[0] && !segs[0].key) {
              cap = segs[0].text[0];
              segs[0] = { text: segs[0].text.slice(1) };
            }
            return (
              <div key={n} className={s.verse}>
                <span aria-hidden="true" className={s.verseNum}>{n}</span>
                <div>
                  {cap && <span aria-hidden="true" className={s.dropCap}>{cap}</span>}
                  {segs.map((seg, i) => {
                    if (!seg.key) return <span key={i}>{seg.text}</span>;
                    const key = seg.key;
                    const open = openKey === key;
                    const w = words[key];
                    return (
                      <span key={i} className={s.keyWrap}>
                        <span
                          role="button"
                          tabIndex={0}
                          aria-haspopup="dialog"
                          aria-expanded={open}
                          data-word={`${movementId}:${key}`}
                          className={s.key}
                          onClick={() => onToggle(key)}
                          onKeyDown={activate(() => onToggle(key))}
                        >
                          {seg.text}
                        </span>
                        {open && showPopover && w && <Popover word={w} onClose={onClose} />}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
