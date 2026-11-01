"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import { altar, FLOOR, fireLine, person } from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

const sun = (t: number) => 1 - smoothstep(2, 9, t);

function paint(t: number) {
  const rise = smoothstep(2.4, 10, t);
  altar(800, FLOOR, 1.1, 0, t);
  for (let i = 0; i < 3; i++) person(490 + i * 62, FLOOR, 190, { tone: 0.5 });
  person(1090, FLOOR, 200, { tone: 0.84 });
  fireLine(
    20,
    1580,
    FLOOR + 2,
    (u, i) => {
      const edge = Math.abs(u - 0.5) * 2;
      const reach = smoothstep(0.82 - rise * 0.34, 1.02 - rise * 0.4, edge);
      return (120 + ((i * 53) % 110)) * reach * (0.45 + edge * 0.95);
    },
    t,
  );
}

/** Verses 26–31: the sun leaves the wall, the altar stands empty, and fire comes in from both ends. God's hands are not drawn. */
export function FearfulScene({ mobile, effects }: SceneProps) {
  return (
    <SunWall
      paint={paint}
      period={16}
      mobile={mobile}
      effects={effects}
      sun={sun}
    />
  );
}
