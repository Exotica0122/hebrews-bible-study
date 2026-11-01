"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import {
  altar,
  FLOOR,
  footstool,
  lightSeat,
  person,
  throne,
  withAlpha,
} from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

function paint(t: number) {
  const standing = 1 - 0.94 * smoothstep(7.8, 11.4, t);
  withAlpha(standing, () => {
    for (let i = 0; i < 5; i++) {
      const x = 130 + i * 150;
      altar(x, FLOOR, 0.42, 0.6, t + i);
      person(x + 62, FLOOR, 176, {
        priest: true,
        tone: 0.84,
        face: -1,
        arm: true,
        lift: 0.5 + 0.5 * Math.sin(t * 1.6 + i * 0.8),
      });
    }
  });
  throne(1200, FLOOR, 1.16);
  footstool(958, FLOOR, 96, smoothstep(8, 10, t));
  lightSeat(1200, FLOOR - 14, 1.16, smoothstep(4.6, 8, t));
}

/** Verses 11–18: every priest stands and offers again, then light fills the seat and stays, and the standing shadows fade. */
export function SatDownScene({ mobile, effects }: SceneProps) {
  return (
    <SunWall paint={paint} period={16} mobile={mobile} effects={effects} />
  );
}
