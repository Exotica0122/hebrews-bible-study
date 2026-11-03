import { easeInOutCubic, easeOutCubic } from "./Timeline";

export const WRITE_START = 1.6;
export const WRITE_END = 8;
const SETTLE = 3.2;

export function lineReveal(t: number, line: number, count: number): number {
  const span = (WRITE_END - WRITE_START) / count;
  return easeInOutCubic((t - WRITE_START - line * span) / span);
}

export function cameraSettle(t: number): number {
  return easeOutCubic(t / SETTLE);
}

function hash(i: number): number {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

function noise(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  return hash(i) + (hash(i + 1) - hash(i)) * f * f * (3 - 2 * f);
}

export function flicker(t: number): { power: number; dx: number; dy: number } {
  const n =
    0.55 * noise(t * 1.3) +
    0.3 * noise(t * 3.1 + 17) +
    0.15 * noise(t * 7.7 + 41);
  return {
    power: 0.95 + 0.17 * n,
    dx: 0.012 * noise(t * 2.3 + 5),
    dy: 0.012 * noise(t * 1.9 + 83),
  };
}
