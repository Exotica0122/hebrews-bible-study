"use client";

import type { SceneProps } from "../registry";
import { Plate } from "../primitives/Beaten";
import {
  ark,
  curtain,
  floor,
  glow,
  lightFigure,
  lightRing,
  scarletDrop,
  scarletOval,
  scarletRect,
} from "../primitives/beatenArt";
import { smoothstep } from "../primitives/Timeline";

const SAFE = [0.03, 0.6] as const;

function paint(t: number) {
  floor();
  const open = smoothstep(4.2, 7.2, t);
  const lit = smoothstep(3.6, 7.2, t);
  glow(800, 330, 300, lit);
  ark(800, 610, 0.86);
  curtain(560, 70, 480, 540, open);
  const x = 170 + 630 * smoothstep(0.8, 7.6, t);
  scarletRect(170, 617, x - 170, 7);
  lightFigure(
    x,
    610,
    200,
    smoothstep(0.6, 1.4, t) * (1 - 0.9 * smoothstep(9.5, 11.5, t)),
  );
  const fall = smoothstep(7.8, 9, t);
  if (fall > 0 && fall < 1) scarletDrop(800, 200 + fall * 200, 14);
  if (t < 9) return;
  scarletOval(800, 402, 56, 7);
  for (let i = 0; i < 3; i++) {
    const u = smoothstep(9 + i * 0.9, 13.5 + i * 0.9, t);
    if (u > 0) lightRing(800, 402, 60 + u * 720, (1 - u) * 0.9);
  }
}

const lamp = (t: number) => [240 + 560 * smoothstep(0.8, 7.6, t), 260] as const;

/** Verses 11–14: one figure of light crosses the gold leaving a single scarlet line, the curtain draws back and does not close, and the blood falls once on the mercy seat. */
export function OnceForAllScene({ mobile, effects }: SceneProps) {
  return (
    <Plate
      paint={paint}
      period={16}
      mobile={mobile}
      effects={effects}
      safe={SAFE}
      lamp={lamp}
    />
  );
}
