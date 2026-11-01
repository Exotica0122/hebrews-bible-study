"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import {
  curtain,
  FLOOR,
  glow,
  person,
  way,
  withAlpha,
} from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

const walkers = (t: number, from: number, step: number, end: number) => {
  const w = smoothstep(2.6, 12, t);
  return (i: number) => from + step * i + w * end * (1 - i * 0.05);
};

function paint(t: number) {
  const open = smoothstep(1.6, 5.2, t);
  const lit = smoothstep(1.2, 5.2, t);
  glow(800, 340, 480, lit);
  way(800, FLOOR, lit);
  curtain(560, 54, 480, FLOOR - 54, open);
  const left = walkers(t, 130, 64, 470);
  for (let i = 0; i < 9; i++) {
    const x = left(i);
    withAlpha(1 - smoothstep(740, 800, x), () =>
      person(x, FLOOR, 152 + ((i * 37) % 22)),
    );
  }
  const right = walkers(t, 1470, -66, -420);
  for (let i = 0; i < 5; i++) {
    const x = right(i);
    withAlpha(smoothstep(800, 860, x), () =>
      person(x, FLOOR, 158 + ((i * 29) % 16), { face: -1 }),
    );
  }
}

/** Verses 19–25: the curtain opens and stays open, light pours through, and the people draw near together and go in. */
export function DrawNearScene({ mobile, effects }: SceneProps) {
  return (
    <SunWall paint={paint} period={16} mobile={mobile} effects={effects} />
  );
}
