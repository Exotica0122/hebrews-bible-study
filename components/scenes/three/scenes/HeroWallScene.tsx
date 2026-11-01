"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import type { Frame } from "../primitives/Beaten";
import {
  curtain,
  FLOOR,
  glow,
  person,
  way,
  withAlpha,
} from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

const FRAME: Frame = [90, 50, 1420, FLOOR - 50];
const SAFE = [0.06, 0.6] as const;
const TITLE_BLOCK = 548;

function paint(t: number) {
  const open = smoothstep(1.4, 5, t);
  const lit = smoothstep(1, 5, t);
  glow(800, 330, 620, lit);
  way(800, FLOOR, lit, 110);
  curtain(560, 70, 480, FLOOR - 70, open);
  for (let i = 0; i < 7; i++) {
    const walk = smoothstep(1.8 + i * 0.34, 9.2, t);
    const h = 128 + i * 4;
    withAlpha(1 - smoothstep(0.86, 1, walk) * (i === 6 ? 1 : 0), () => {
      person(120 + i * 66 + walk * 150, FLOOR, h);
      person(1480 - i * 66 - walk * 150, FLOOR, h, { face: -1 });
    });
  }
}

/** Hebrews 10 opening: the shadow of the curtain stands open, and people draw near from both sides toward the light. */
export function HeroWallScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <SunWall
      paint={paint}
      period={12}
      hold={9.5}
      mobile={mobile}
      effects={effects}
      frame={FRAME}
      safe={SAFE}
      reserve={TITLE_BLOCK}
      pointer={pointer}
    />
  );
}
