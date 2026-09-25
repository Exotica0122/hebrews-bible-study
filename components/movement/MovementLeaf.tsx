"use client";

import { useMemo } from "react";
import type { Movement } from "@/content/types";
import { keysOf } from "@/content/parse";
import { ORD_KO } from "@/content/ui";
import { useLang } from "@/lib/lang";
import { SceneFrame } from "@/components/scenes/SceneFrame";
import { Scripture } from "./Scripture";
import { Commentary } from "./Commentary";
import { Threads } from "./Threads";
import { GlossAside } from "./GlossAside";
import s from "./movement.module.css";

export interface MovementLeafProps {
  movement: Movement;
  index: number;
  chapter: number;
  openKey: string | null;
  showPopover: boolean;
  onToggleWord: (key: string) => void;
  onCloseWord: () => void;
  openChip: string | null;
  onToggleChip: (id: string) => void;
  alt: boolean;
  onAlt: (alt: boolean) => void;
  ruled: boolean;
  artNote?: string;
  reduceMotion?: boolean;
}

export function MovementLeaf(p: MovementLeafProps) {
  const { lang, t } = useLang();
  const m = p.movement;
  const c = m[lang];
  const words = m.words[lang];
  const hasAlt = m.scene === "radiance";
  const alt = hasAlt && p.alt;
  const eyebrow =
    lang === "ko"
      ? `${ORD_KO[p.index]} 흐름 · 히브리서 ${p.chapter}:${m.range}`
      : `Movement ${m.num} · Hebrews ${p.chapter}:${m.range}`;
  const folio = lang === "ko" ? `${p.index + 1}면` : `fol. ${p.index + 1}`;
  const labels = useMemo(() => ({ loading: t.loading, reduced: t.reduced }), [t.loading, t.reduced]);

  return (
    <section id={`hb-${m.id}`} aria-label={c.cap} className="hb-section">
      <div className={`hb-container ${s.inner}`}>
        <div className={`hb-eyebrow ${s.runningHead}`}>
          <span>{eyebrow}</span>
          <span className={s.folio}>{folio}</span>
        </div>

        <div className={s.mat}>
          <SceneFrame
            id={m.id}
            scene={alt ? "seal" : m.scene}
            labels={labels}
            artNote={p.artNote}
            reduceMotion={p.reduceMotion}
          >
            <div className={s.quoteBlock}>
              <div className={`hb-eyebrow ${s.sref}`}>{c.sref}</div>
              <p className={s.quote}>{alt ? c.altQuote : c.quote}</p>
            </div>
            {hasAlt && (
              <div role="group" aria-label="Scene view" className={s.altGroup}>
                <button type="button" className={s.altBtn} aria-pressed={!alt} onClick={() => p.onAlt(false)}>{t.altA}</button>
                <button type="button" className={s.altBtn} aria-pressed={alt} onClick={() => p.onAlt(true)}>{t.altB}</button>
              </div>
            )}
          </SceneFrame>
        </div>
        <p className={s.caption}>{alt ? c.altCap : c.cap}</p>

        <div className={s.body}>
          <article className={s.article}>
            <h2 className="hb-h2">{c.title}</h2>
            <Scripture
              movementId={m.id}
              copy={c}
              words={words}
              openKey={p.openKey}
              showPopover={p.showPopover}
              dropCap={lang === "en"}
              ruled={p.ruled}
              onToggle={p.onToggleWord}
              onClose={p.onCloseWord}
            />
            <Commentary blocks={c.com} />
            <Threads chips={m.chips} openId={p.openChip} onToggle={p.onToggleChip} />
          </article>
          <GlossAside keys={keysOf(c.verses)} words={words} openKey={p.openKey} onToggle={p.onToggleWord} />
        </div>
      </div>
    </section>
  );
}
