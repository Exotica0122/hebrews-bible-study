"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import type { SceneId } from "../types";
import { registry, type DragState, type PointerState } from "./registry";

interface SceneCanvasProps {
  scene: SceneId;
  active: boolean;
  mobile: boolean;
  effects: boolean;
  captions?: RefObject<(HTMLElement | null)[]>;
  drag?: RefObject<DragState>;
  pointer?: RefObject<PointerState>;
  onReady: () => void;
  onUnmount: () => void;
  onContextLost: () => void;
}

function SceneLoop({ active, children }: { active: boolean; children: React.ReactNode }) {
  const activeRef = useRef(active);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    activeRef.current = active;
    if (active) invalidate();
  }, [active, invalidate]);
  useFrame((state) => {
    if (activeRef.current) state.invalidate();
  });
  return <>{children}</>;
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
}

function ContextWatch({ onLost }: { onLost: () => void }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const el = gl.domElement;
    const handler = (e: Event) => {
      e.preventDefault();
      onLost();
    };
    el.addEventListener("webglcontextlost", handler);
    return () => el.removeEventListener("webglcontextlost", handler);
  }, [gl, onLost]);
  return null;
}

const testMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("scenetest");

export default function SceneCanvas({ scene, active, mobile, effects, captions, drag, pointer, onReady, onUnmount, onContextLost }: SceneCanvasProps) {
  const Scene = registry[scene];
  const maxDpr = mobile ? 1.5 : 2;
  const [dpr, setDpr] = useState(() => Math.min(maxDpr, typeof window === "undefined" ? 1 : window.devicePixelRatio || 1));
  const sceneElement = useMemo(() => <Scene mobile={mobile} effects={effects} captions={captions} drag={drag} pointer={pointer} />, [Scene, mobile, effects, captions, drag, pointer]);
  useEffect(() => () => onUnmount(), [onUnmount]);
  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power", stencil: false, preserveDrawingBuffer: testMode }}
      camera={{ fov: 40, position: [0, 0, 8], near: 0.1, far: 80 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => setDpr((d) => Math.max(0.75, d - 0.25))}
        onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.25))}
        onFallback={() => setDpr(0.75)}
      />
      <ContextWatch onLost={onContextLost} />
      <SceneLoop active={active}>
        <FirstFrame onReady={onReady} />
        {sceneElement}
      </SceneLoop>
    </Canvas>
  );
}
