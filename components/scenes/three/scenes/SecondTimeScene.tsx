"use client";

import type { SceneProps } from "../registry";
import { Plate } from "../primitives/Beaten";
import {
  aboveFloor,
  floor,
  glow,
  person,
  rnd,
  scarletRect,
  tally,
  withAlpha,
} from "../primitives/beatenArt";
import { smoothstep } from "../primitives/Timeline";

function paint(t: number) {
  floor();
  withAlpha(1 - 0.92 * smoothstep(5.4, 10, t), () =>
    tally(190, 96, 480, 120, 10.2, 39, 29),
  );
  const strike = smoothstep(2.6, 4.8, t);
  if (strike > 0) scarletRect(170, 171, 1260 * strike, 12);
  const dawn = smoothstep(8.6, 13.4, t);
  aboveFloor(() => glow(800, 610, 260 + dawn * 400, dawn));
  for (let i = 0; i < 15; i++) {
    person(270 + i * 75 + rnd(i) * 10, 610, 118 + rnd(i + 2) * 34, {
      tone: 0.62 + rnd(i + 8) * 0.16,
    });
  }
}

const lamp = (t: number) => [300 + t * 60, 300] as const;

/** Verses 23–28: one scarlet stroke crosses every year's sacrifices and they fade, while those who wait watch the light rise for his second appearing. */
export function SecondTimeScene({ mobile, effects }: SceneProps) {
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
