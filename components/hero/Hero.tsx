"use client";

import { useRef, useState, type ComponentType } from "react";
import type { ChapterCopy, Setting } from "@/content/types";
import { Fleuron, DoubleFrame } from "@/components/ornaments/Ornaments";
import { CssStarfield } from "@/components/scenes/fallback/CssStarfield";
import { CssEarthBackdrop, CssWildernessBackdrop, HeroHalo } from "@/components/scenes/fallback/CssScene";
import { HeroStage } from "@/components/scenes/HeroStage";
import type { SceneId } from "@/components/scenes/types";
import { useLang } from "@/lib/lang";
import s from "./hero.module.css";

interface HeroProps {
  copy: ChapterCopy;
  setting: Setting;
  onBegin: () => void;
  onMap: () => void;
  artNote?: string;
  reduceMotion?: boolean;
}

import { HERO_FRAGMENTS } from "./fragments";

const STAGES: Record<Setting, { scene: SceneId; Backdrop: ComponentType }> = {
  heavens: { scene: "hero", Backdrop: CssStarfield },
  earth: { scene: "heroEarth", Backdrop: CssEarthBackdrop },
  wilderness: { scene: "heroCamp", Backdrop: CssWildernessBackdrop },
};

export function Hero({ copy, setting, onBegin, onMap, artNote, reduceMotion }: HeroProps) {
  const { t } = useLang();
  const hostRef = useRef<HTMLElement>(null);
  const captionRefs = useRef<(HTMLElement | null)[]>([]);
  const [live, setLive] = useState(false);
  const { scene, Backdrop } = STAGES[setting];

  return (
    <section id="hb-top" ref={hostRef} aria-label={copy.heroTitle} className={s.hero}>
      <div className={`${s.cssLayers} ${live ? s.cssLayersHidden : ""}`}>
        <Backdrop />
      </div>
      <HeroStage scene={scene} hostRef={hostRef} captionRefs={captionRefs} reduceMotion={reduceMotion} onReadyChange={setLive} />
      <DoubleFrame />
      {copy.fragments &&
        HERO_FRAGMENTS.map((f, i) => (
          <div
            key={f.cls}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className={s.fragment}
            style={{ "--l": `${f.left}%`, "--t": `${f.top}%`, "--lm": `${f.leftMobile}%`, "--tm": `${f.topMobile}%` } as React.CSSProperties}
          >
            <span className={`${s[f.cls]} ${live ? s.dotHidden : ""}`} />
            <span className={s.fragCap}>{copy.fragments?.[i]}</span>
          </div>
        ))}
      <div className={s.stack}>
        <div id="hb-hero-centre" className={live || !copy.fragments ? s.haloHidden : undefined}>
          <HeroHalo />
        </div>
        <div className={`hb-eyebrow ${s.eyebrow}`}>{copy.heroEyebrow}</div>
        <h1 className={s.title}>{copy.heroTitle}</h1>
        <Fleuron />
        <p className={s.tagline}>{copy.tagline}</p>
        <div className={s.ref}>{copy.taglineRef}</div>
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
