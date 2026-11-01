"use client";

import type { SceneProps } from "../registry";
import { Plate } from "../primitives/Beaten";
import {
  ark,
  curtain,
  floor,
  lampstand,
  person,
  scarletDot,
  scarletRect,
  table,
  tally,
  withAlpha,
} from "../primitives/beatenArt";
import { smoothstep } from "../primitives/Timeline";

function paint(t: number) {
  floor();
  lampstand(228, 610, 0.5, t);
  table(516, 610, 0.46);
  ark(1176, 610, 0.66);
  const inside = smoothstep(7.6, 9.6, t) - smoothstep(11, 13, t);
  if (inside > 0) {
    const x = 700 + inside * 300;
    person(x, 610, 205, { high: true, tone: 0.84, reach: 1 });
    scarletDot(x + 28, 492, 11);
  }
  curtain(800, 70, 72, 540, 0, 2);
  for (let i = 0; i < 3; i++) {
    const u = (t * 0.34 + i * 0.37) % 1;
    const walk = u < 0.5 ? u * 2 : 2 - u * 2;
    person(300 + walk * 390, 610, 165, { tone: 0.68 });
  }
  tally(336, 66, Math.min(280, Math.floor(t * 18)), 70, 6.4, 34, 24);
  if (t > 11.6)
    withAlpha(smoothstep(11.6, 12.4, t), () => scarletRect(752, 66, 8, 92));
}

const lamp = (t: number) => [620 + Math.sin(t * 0.5) * 240, 260] as const;

/** Verses 6–10: priests pace the first room while the days mount up; once a year the high priest passes behind the curtain with blood and comes back, and the curtain stays shut. */
export function NotYetScene({ mobile, effects }: SceneProps) {
  return (
    <Plate
      paint={paint}
      period={16}
      mobile={mobile}
      effects={effects}
      lamp={lamp}
    />
  );
}
