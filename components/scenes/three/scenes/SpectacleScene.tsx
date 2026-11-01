"use client";

import type { SceneProps } from "../registry";
import { SunWall } from "../primitives/Wall";
import { bars, FLOOR, glow, person, tiers } from "../primitives/wallArt";
import { smoothstep } from "../primitives/Timeline";

const SAFE = [0.05, 0.54] as const;
const SAFE_MOBILE = [0.05, 0.42] as const;

function paint(t: number) {
  const dawn = smoothstep(6.4, 12.6, t);
  tiers();
  glow(1500, 380, 200 + dawn * 380, dawn);
  bars(92, 300, 240, FLOOR - 300);
  person(660 - smoothstep(1.6, 6, t) * 268, FLOOR, 180, {
    tone: 0.86,
    face: -1,
    carry: true,
  });
  const pushed =
    Math.max(0, Math.sin((t - 3.2) * 0.62)) * (1 - smoothstep(7.8, 8.8, t));
  for (let i = 0; i < 5; i++)
    person(780 + i * 88 - (i === 0 ? pushed * 64 : 0), FLOOR, 188 + i * 3, {
      tone: 0.92,
      arm: true,
      lift: smoothstep(7 + i * 0.4, 10 + i * 0.3, t) * 0.7,
    });
}

/** Verses 32–39: they are set on show before the tiers, one carries bread to the prison, one is pushed back and comes forward again, and the light rises. */
export function SpectacleScene({ mobile, effects }: SceneProps) {
  return (
    <SunWall
      paint={paint}
      period={16}
      mobile={mobile}
      effects={effects}
      safe={mobile ? SAFE_MOBILE : SAFE}
    />
  );
}
