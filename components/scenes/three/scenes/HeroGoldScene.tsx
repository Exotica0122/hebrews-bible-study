"use client";

import type { SceneProps } from "../registry";
import { Plate, type Frame } from "../primitives/Beaten";
import {
  curtain,
  floor,
  lampstand,
  scarletOval,
  scarletRect,
  table,
} from "../primitives/beatenArt";
import { smoothstep } from "../primitives/Timeline";

const FRAME: Frame = [110, 30, 1380, 590];
const SAFE = [0.05, 0.6] as const;
const TITLE_BLOCK = 530;

function paint(t: number) {
  floor();
  lampstand(306, 610, 0.8, t);
  table(1294, 610, 0.68);
  curtain(480, 54, 640, 556);
  const run = smoothstep(1.5, 7, t);
  if (run > 0) scarletRect(796, 54, 8, 556 * run);
  const pool = smoothstep(7, 9, t);
  if (pool > 0) scarletOval(800, 613, 90 * pool, 9 * pool);
}

const lamp = (t: number) => [300 + 500 * smoothstep(0, 9, t), 300] as const;

/** Hebrews 9 opening: the second curtain beaten in gold between the lampstand and the table, with one scarlet line running down its seam. */
export function HeroGoldScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Plate
      paint={paint}
      period={12}
      hold={9.5}
      mobile={mobile}
      effects={effects}
      frame={FRAME}
      safe={SAFE}
      reserve={TITLE_BLOCK}
      lamp={lamp}
      pointer={pointer}
    />
  );
}
