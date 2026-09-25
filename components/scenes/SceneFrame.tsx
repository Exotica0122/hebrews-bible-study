"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";
import { CssScene } from "./fallback/CssScene";
import { useSceneVisibility } from "./hooks/useSceneVisibility";
import { useWebGLSupport } from "./hooks/useWebGLSupport";
import { useSceneSlot } from "./hooks/useSceneBudget";
import type { SceneId } from "./types";
import s from "./scene.module.css";

export const SHIMMER_MS = 1800;

const SceneCanvas = dynamic(() => import("./three/SceneCanvas"), { ssr: false, loading: () => null });

export interface SceneLabels {
  loading: string;
  reduced: string;
}

interface SceneFrameProps {
  id: string;
  scene: SceneId;
  labels: SceneLabels;
  artNote?: string;
  reduceMotion?: boolean;
  children?: React.ReactNode;
}

export function useSceneGate(id: string, ref: React.RefObject<HTMLElement | null>, reduceMotion: boolean) {
  const reduced = useReducedMotion(reduceMotion);
  const mobile = useIsMobile();
  const webgl = useWebGLSupport();
  const { near, visible } = useSceneVisibility(ref);
  const [lost, setLost] = useState(false);
  const wants = near && webgl === true && !reduced && !lost;
  const held = useSceneSlot(id, wants, ref, mobile ? 2 : 3, visible ? 1 : 0);
  return { reduced, mobile, webgl, near, visible, lost, setLost, mount: wants && held };
}

export function SceneFrame({ id, scene, labels, artNote, reduceMotion = false, children }: SceneFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const gate = useSceneGate(id, ref, reduceMotion);
  const [shimmerDone, setShimmerDone] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const lastScene = useRef(scene);

  useEffect(() => {
    if (!gate.near || shimmerDone) return;
    const t = setTimeout(() => setShimmerDone(true), SHIMMER_MS);
    return () => clearTimeout(t);
  }, [gate.near, shimmerDone]);

  useEffect(() => {
    if (lastScene.current === scene) return;
    lastScene.current = scene;
    setSwapping(true);
    const t = setTimeout(() => setSwapping(false), 250);
    return () => clearTimeout(t);
  }, [scene]);

  const onReady = useCallback(() => setCanvasReady(true), []);
  const onUnmount = useCallback(() => setCanvasReady(false), []);
  const { setLost } = gate;
  const onLost = useCallback(() => setLost(true), [setLost]);

  const showCanvas = gate.mount && canvasReady;

  return (
    <div ref={ref} className={s.panel} data-scene={id}>
      <CssScene scene={scene} className={`${s.cssLayer} ${showCanvas ? s.cssHidden : ""}`} />
      {gate.mount && (
        <div className={`${s.canvasWrap} ${showCanvas ? s.canvasReady : ""} ${swapping ? s.canvasSwap : ""}`}>
          <SceneCanvas
            scene={scene}
            active={gate.visible}
            mobile={gate.mobile}
            onReady={onReady}
            onUnmount={onUnmount}
            onContextLost={onLost}
          />
        </div>
      )}
      <div aria-hidden="true" className={s.bottomFade} />
      {!shimmerDone && (
        <div className={s.shimmer}>
          <div className={s.shimmerSweep} />
          <div className={s.loading}>
            <span className={s.loadingBar}><span /></span>
            {labels.loading}
          </div>
        </div>
      )}
      {shimmerDone && gate.reduced && (
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
