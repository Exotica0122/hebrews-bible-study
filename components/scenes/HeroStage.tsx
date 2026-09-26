"use client";

import dynamic from "next/dynamic";
import { useMove } from "@use-gesture/react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useSceneGate } from "./SceneFrame";
import s from "./scene.module.css";

const SceneCanvas = dynamic(() => import("./three/SceneCanvas"), { ssr: false, loading: () => null });

interface HeroStageProps {
  hostRef: RefObject<HTMLElement | null>;
  captionRefs: RefObject<(HTMLElement | null)[]>;
  reduceMotion?: boolean;
  onReadyChange?: (ready: boolean) => void;
}

export function HeroStage({ hostRef, captionRefs, reduceMotion = false, onReadyChange }: HeroStageProps) {
  const gate = useSceneGate("hero", hostRef, reduceMotion);
  const [idle, setIdle] = useState(false);
  const [ready, setReady] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  useMove(
    ({ xy: [px, py], currentTarget }) => {
      const r = (currentTarget as HTMLElement).getBoundingClientRect();
      pointer.current = { x: (px - r.left) / r.width - 0.5, y: (py - r.top) / r.height - 0.5 };
    },
    { target: hostRef },
  );

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setIdle(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    onReadyChange?.(ready);
  }, [ready, onReadyChange]);

  const onReady = useCallback(() => setReady(true), []);
  const onUnmount = useCallback(() => setReady(false), []);
  const { setLost } = gate;
  const onLost = useCallback(() => setLost(true), [setLost]);

  if (!gate.mount || !idle) return null;
  return (
    <div className={`${s.canvasWrap} ${ready ? s.canvasReady : ""}`}>
      <SceneCanvas
        scene="hero"
        active={gate.visible}
        mobile={gate.mobile}
        effects={gate.effects}
        captions={captionRefs}
        pointer={pointer}
        onReady={onReady}
        onUnmount={onUnmount}
        onContextLost={onLost}
      />
    </div>
  );
}
