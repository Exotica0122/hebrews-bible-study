import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const easeInOutCubic = (x: number) => {
  const t = clamp01(x);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const easeInSine = (x: number) => 1 - Math.cos((clamp01(x) * Math.PI) / 2);
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const MAX_DELTA = 0.05;

/** Accumulated scene time in seconds, clamped so background tabs do not jump. */
export function useSceneTime(onFrame: (t: number, dt: number) => void) {
  const time = useRef(0);
  useFrame((_, delta) => {
    const dt = Math.min(delta, MAX_DELTA);
    time.current += dt;
    onFrame(time.current, dt);
  });
  return time;
}
