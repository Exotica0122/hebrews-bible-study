"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { CssScene } from "./fallback/CssScene";
import type { SceneId } from "./types";
import s from "./scene.module.css";

export const SHIMMER_MS = 1800;

export interface SceneLabels {
  loading: string;
  reduced: string;
}

interface SceneFrameProps {
  scene: SceneId;
  labels: SceneLabels;
  artNote?: string;
  reduceMotion?: boolean;
  children?: React.ReactNode;
}

export function SceneFrame({ scene, labels, artNote, reduceMotion = false, children }: SceneFrameProps) {
  const reduced = useReducedMotion(reduceMotion);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), SHIMMER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={s.panel}>
      <CssScene scene={scene} className={s.cssLayer} />
      <div aria-hidden="true" className={s.bottomFade} />
      {!ready && (
        <div className={s.shimmer}>
          <div className={s.shimmerSweep} />
          <div className={s.loading}>
            <span className={s.loadingBar}><span /></span>
            {labels.loading}
          </div>
        </div>
      )}
      {ready && reduced && (
        <div className={s.badge}>
          <span className={s.badgeDot} />
          {labels.reduced}
        </div>
      )}
      {artNote && <div className={s.artNote}>{artNote}</div>}
      <div className={s.overlay}>{children}</div>
    </div>
  );
}
