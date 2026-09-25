"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { SceneId } from "../types";
import { registry } from "./registry";

interface SceneCanvasProps {
  scene: SceneId;
  active: boolean;
  mobile: boolean;
  captions?: RefObject<(HTMLElement | null)[]>;
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

export default function SceneCanvas({ scene, active, mobile, captions, onReady, onUnmount, onContextLost }: SceneCanvasProps) {
  const Scene = registry[scene];
  useEffect(() => () => onUnmount(), [onUnmount]);
  return (
    <Canvas
      frameloop="demand"
      dpr={mobile ? [1, 1.5] : [1, 2]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power", stencil: false, preserveDrawingBuffer: testMode }}
      camera={{ fov: 40, position: [0, 0, 8], near: 0.1, far: 80 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ position: "absolute", inset: 0 }}
    >
      <ContextWatch onLost={onContextLost} />
      <SceneLoop active={active}>
        <FirstFrame onReady={onReady} />
        <Scene mobile={mobile} captions={captions} />
      </SceneLoop>
    </Canvas>
  );
}
