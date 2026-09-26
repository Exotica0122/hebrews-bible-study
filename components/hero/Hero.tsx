"use client";

import { useRef, useState } from "react";
import { Fleuron, DoubleFrame } from "@/components/ornaments/Ornaments";
import { CssStarfield } from "@/components/scenes/fallback/CssStarfield";
import { HeroHalo } from "@/components/scenes/fallback/CssScene";
import { HeroStage } from "@/components/scenes/HeroStage";
import { useLang } from "@/lib/lang";
import s from "./hero.module.css";

interface HeroProps {
  onBegin: () => void;
  onMap: () => void;
  artNote?: string;
  reduceMotion?: boolean;
}

import { HERO_FRAGMENTS } from "./fragments";

export function Hero({ onBegin, onMap, artNote, reduceMotion }: HeroProps) {
  const { t } = useLang();
  const hostRef = useRef<HTMLElement>(null);
  const captionRefs = useRef<(HTMLElement | null)[]>([]);
  const [live, setLive] = useState(false);

  return (
    <section id="hb-top" ref={hostRef} aria-label={t.heroTitle} className={s.hero}>
      <div className={`${s.cssLayers} ${live ? s.cssLayersHidden : ""}`}>
        <CssStarfield />
      </div>
      <HeroStage hostRef={hostRef} captionRefs={captionRefs} reduceMotion={reduceMotion} onReadyChange={setLive} />
      <DoubleFrame />
      {HERO_FRAGMENTS.map((f, i) => (
        <div
          key={f.key}
          ref={(el) => {
            captionRefs.current[i] = el;
          }}
          className={s.fragment}
          style={{ "--l": `${f.left}%`, "--t": `${f.top}%`, "--lm": `${f.leftMobile}%`, "--tm": `${f.topMobile}%` } as React.CSSProperties}
        >
          <span className={`${s[f.cls]} ${live ? s.dotHidden : ""}`} />
          <span className={s.fragCap}>{t[f.key]}</span>
        </div>
      ))}
      <div className={s.stack}>
        <div id="hb-hero-centre" className={live ? s.haloHidden : undefined}>
          <HeroHalo />
        </div>
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
