"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import {
  altar,
  FLOOR,
  lightShaft,
  niche,
  scroll,
  smoke,
  withAlpha,
} from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

function paint(t: number) {
  const fading = 1 - smoothstep(5.8, 10, t);
  smoke(330, 420, 1, t, fading);
  withAlpha(0.08 + 0.92 * fading, () =>
    altar(330, FLOOR, 1.05, fading * (0.6 + 0.3 * Math.sin(t * 2)), t),
  );
  scroll(1210, FLOOR - 40, 380, smoothstep(1.4, 4.6, t));
  niche(790, FLOOR, 240, 100, smoothstep(4.2, 7.6, t));
  lightShaft(790, FLOOR, 330, smoothstep(5.6, 8.4, t));
}

/** Verses 5–10: the altar fades from the wall, the scroll opens, and light stands where the sacrifices stood. */
export function BodyPreparedScene({ mobile, effects }: SceneProps) {
  return (
    <SunWall paint={paint} period={16} mobile={mobile} effects={effects} />
  );
}
