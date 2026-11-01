"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import {
  altar,
  bull,
  FLOOR,
  glow,
  goat,
  person,
  smoke,
} from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

function paint(t: number) {
  glow(1720, 300, 560, smoothstep(4, 11, t) * 0.85);
  smoke(800, 400, 1.1, t, 1);
  altar(800, FLOOR, 1.12, 0.55 + 0.45 * Math.sin(t * (Math.PI / 2) - 1.2), t);
  const u = (t * 0.25) % 1;
  const go = u < 0.5 ? u * 2 : 2 - u * 2;
  person(440 + go * 140, FLOOR, 214, {
    priest: true,
    tone: 0.82,
    arm: true,
    lift: go,
  });
  person(1160 - (1 - go) * 140, FLOOR, 214, {
    priest: true,
    tone: 0.82,
    face: -1,
    arm: true,
    lift: 1 - go,
  });
  bull(200 + u * 36, FLOOR, 1.02);
  goat(1370 - u * 30, FLOOR, 1.06, -1);
}

/** Verses 1–4: priests, altar and animals are only shadows on the wall, and the same offering comes round again. */
export function ShadowScene({ mobile, effects }: SceneProps) {
  return (
    <SunWall paint={paint} period={16} mobile={mobile} effects={effects} />
  );
}
