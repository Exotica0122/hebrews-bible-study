"use client";

import type { SceneProps } from "../registry";
import { Plate } from "../primitives/Beaten";
import {
  book,
  bowl,
  floor,
  hyssop,
  person,
  pillar,
  rnd,
  scarletDot,
} from "../primitives/beatenArt";
import { smoothstep } from "../primitives/Timeline";

const DROPS = 90;
const TO_BOOK = Math.floor(DROPS * 0.36);

function paint(t: number) {
  floor();
  for (let i = 0; i < 12; i++) pillar(330 + i * 85.5, 610, 238);
  book(450, 610);
  person(780, 610, 250, { tone: 0.82, reach: -1 });
  bowl(838, 480);
  const sway =
    Math.sin(t * 2.4) *
    0.34 *
    smoothstep(4, 5, t) *
    (1 - smoothstep(11, 12, t));
  hyssop(712, 470, sway + 0.6);
  for (let r = 0; r < 3; r++) {
    for (let i = 0; i < 7 - (r % 2); i++) {
      const x = 985 + i * 72 + (r % 2) * 36 + rnd(i + r * 11) * 8;
      person(x, 610 - (2 - r) * 34, 118 + r * 14, { tone: 0.4 + r * 0.17 });
    }
  }
  for (let i = 0; i < DROPS; i++) {
    const near = i < TO_BOOK;
    const start = near
      ? 4.6 + (i / TO_BOOK) * 2.6
      : 7.4 + ((i - TO_BOOK) / (DROPS - TO_BOOK)) * 4;
    const f = (t - start) / 0.75;
    if (f <= 0) continue;
    const e = Math.min(1, f);
    const tx = near ? 372 + rnd(i) * 158 : 970 + rnd(i) * 450;
    const ty = near ? 474 + rnd(i + 3) * 40 : 480 + rnd(i + 5) * 130;
    scarletDot(
      640 + (tx - 640) * e,
      425 + (ty - 425) * e - Math.sin(e * Math.PI) * 120,
      f < 1 ? 5.5 : 4.5,
    );
  }
}

const lamp = (t: number) => [460 + t * 40, 250] as const;

/** Verses 19–20: before the twelve pillars Moses sprinkles the book and all the people with the blood of the covenant. */
export function CovenantBloodScene({ mobile, effects }: SceneProps) {
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
