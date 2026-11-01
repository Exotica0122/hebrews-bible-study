"use client";

import { useRef, useState } from "react";
import type { ChapterCopy, Setting } from "@/content/types";
import { Fleuron, DoubleFrame } from "@/components/ornaments/Ornaments";
import { HeroStage } from "@/components/scenes/HeroStage";
import { SceneStill } from "@/components/scenes/SceneStill";
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

/** `scrim` shades the title area for daylit heroes, where the parchment type would otherwise sit on a bright sky. */
const STAGES: Record<Setting, { scene: SceneId; scrim?: boolean }> = {
  heavens: { scene: "hero" },
  earth: { scene: "heroEarth" },
  wilderness: { scene: "heroCamp" },
  garden: { scene: "heroGarden", scrim: true },
  sanctuary: { scene: "heroSanctuary", scrim: true },
  coast: { scene: "heroCoast", scrim: true },
  salem: { scene: "heroSalem", scrim: true },
  pattern: { scene: "heroPattern" },
  gold: { scene: "heroGold", scrim: true },
};

export function Hero({
  copy,
  setting,
  onBegin,
  onMap,
  artNote,
  reduceMotion,
}: HeroProps) {
  const { t } = useLang();
  const hostRef = useRef<HTMLElement>(null);
  const captionRefs = useRef<(HTMLElement | null)[]>([]);
  const [live, setLive] = useState(false);
  const { scene, scrim } = STAGES[setting];

  return (
    <section
      id="hb-top"
      ref={hostRef}
      aria-label={copy.heroTitle}
      className={s.hero}
    >
      <div className={`${s.stillLayer} ${live ? s.stillHidden : ""}`}>
        <SceneStill scene={scene} priority />
      </div>
      <HeroStage
        scene={scene}
        hostRef={hostRef}
        captionRefs={captionRefs}
        reduceMotion={reduceMotion}
        onReadyChange={setLive}
      />
      {scrim && <div aria-hidden="true" className={s.scrim} />}
      <DoubleFrame />
      {copy.fragments &&
        HERO_FRAGMENTS.map((f, i) => (
          <div
            key={f.left}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className={s.fragment}
            style={
              {
                "--l": `${f.left}%`,
                "--t": `${f.top}%`,
                "--lm": `${f.leftMobile}%`,
                "--tm": `${f.topMobile}%`,
              } as React.CSSProperties
            }
          >
            <span className={s.fragCap}>{copy.fragments?.[i]}</span>
          </div>
        ))}
      <div className={s.stack}>
        <div id="hb-hero-centre" className={s.centre} />
        <div className={`hb-eyebrow ${s.eyebrow}`}>{copy.heroEyebrow}</div>
        <h1 className={s.title}>{copy.heroTitle}</h1>
        <Fleuron />
        <p className={s.tagline}>{copy.tagline}</p>
        <div className={s.ref}>{copy.taglineRef}</div>
        <div className={s.actions}>
          <button
            type="button"
            className={`hb-btn hb-btn-gold ${s.begin}`}
            onClick={onBegin}
          >
            {t.begin}
          </button>
          <button
            type="button"
            className="hb-btn hb-btn-outline"
            onClick={onMap}
          >
            {t.seeMap}
          </button>
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
