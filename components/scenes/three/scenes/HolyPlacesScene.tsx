"use client";

import type { SceneProps } from "../registry";
import { Plate } from "../primitives/Beaten";
import {
  altar,
  ark,
  arkContents,
  curtain,
  floor,
  lampstand,
  rise,
  smoke,
  table,
} from "../primitives/beatenArt";
import { smoothstep } from "../primitives/Timeline";

function paint(t: number) {
  floor();
  rise(t, 0.4, () => lampstand(266, 610, 0.62, t));
  rise(t, 2, () => table(556, 610, 0.5));
  rise(t, 3.8, () => curtain(752, 70, 70, 540, 0, 2));
  rise(t, 5.4, () => altar(950, 610, 0.8));
  if (t > 7) smoke(950, 415, 0.8, t);
  rise(t, 7, () => ark(1250, 610, 0.76));
  if (t > 9.6) arkContents(1250, 526, 0.92, smoothstep(9.6, 11, t));
}

const lamp = (t: number) => [200 + t * 75, 240] as const;

/** Verses 1–5: the furnishings rise out of the gold one by one, across the two rooms and the curtain between them. */
export function HolyPlacesScene({ mobile, effects }: SceneProps) {
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
