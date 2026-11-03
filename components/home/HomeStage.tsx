"use client";

import { useRef, useState, type RefObject } from "react";
import { HeroStage } from "@/components/scenes/HeroStage";
import { SceneStill } from "@/components/scenes/SceneStill";
import s from "./home.module.css";

/**
 * Backdrop for the home hero: the letter by lamplight. The rendered still shows
 * while the scene loads, under reduced motion and without WebGL.
 */
export function HomeStage({
  hostRef,
}: {
  hostRef: RefObject<HTMLElement | null>;
}) {
  const captionRefs = useRef<(HTMLElement | null)[]>([]);
  const [live, setLive] = useState(false);
  return (
    <div aria-hidden="true" className={s.stage}>
      <div className={`${s.stillLayer} ${live ? s.stillHidden : ""}`}>
        <SceneStill scene="heroHome" priority />
      </div>
      <HeroStage
        scene="heroHome"
        hostRef={hostRef}
        captionRefs={captionRefs}
        onReadyChange={setLive}
      />
      <div className={s.scrim} />
    </div>
  );
}
