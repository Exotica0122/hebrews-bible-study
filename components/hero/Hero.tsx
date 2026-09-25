"use client";

import { Fleuron, DoubleFrame } from "@/components/ornaments/Ornaments";
import { CssStarfield } from "@/components/scenes/fallback/CssStarfield";
import { HeroHalo } from "@/components/scenes/fallback/CssScene";
import { useLang } from "@/lib/lang";
import s from "./hero.module.css";

interface HeroProps {
  onBegin: () => void;
  onMap: () => void;
  artNote?: string;
}

const FRAGMENTS = [
  { key: "fragBush", cls: "bush", left: "16%", top: "24%" },
  { key: "fragFire", cls: "fire", left: "83%", top: "20%" },
  { key: "fragCloud", cls: "cloud", left: "86%", top: "58%" },
  { key: "fragTablet", cls: "tablet", left: "13%", top: "60%" },
] as const;

export function Hero({ onBegin, onMap, artNote }: HeroProps) {
  const { t } = useLang();
  return (
    <section id="hb-top" aria-label={t.heroTitle} className={s.hero}>
      <CssStarfield />
      <DoubleFrame />
      {FRAGMENTS.map((f) => (
        <div key={f.key} className={s.fragment} style={{ left: f.left, top: f.top }}>
          <span className={s[f.cls]} />
          <span className={s.fragCap}>{t[f.key]}</span>
        </div>
      ))}
      <div className={s.stack}>
        <HeroHalo />
        <div className={`hb-eyebrow ${s.eyebrow}`}>{t.heroEyebrow}</div>
        <h1 className={s.title}>{t.heroTitle}</h1>
        <Fleuron />
        <p className={s.tagline}>{t.tagline}</p>
        <div className={s.ref}>{t.taglineRef}</div>
        <div className={s.actions}>
          <button type="button" className={`hb-btn hb-btn-gold ${s.begin}`} onClick={onBegin}>{t.begin}</button>
          <button type="button" className="hb-btn hb-btn-outline" onClick={onMap}>{t.seeMap}</button>
        </div>
      </div>
      <div aria-hidden="true" className={s.scrollCue}>
        <span className={s.scrollText}>{t.scroll}</span>
        <span className={s.scrollLine} />
      </div>
      {artNote && <div className={s.artNote}>{artNote}</div>}
    </section>
  );
}
