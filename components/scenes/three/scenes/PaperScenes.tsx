"use client";

import type { SceneProps } from "../registry";
import { PaperStack } from "../primitives/Paper";
import {
  ascent,
  bird,
  cairn,
  cloud,
  dayMark,
  FLOOR,
  gate,
  hills,
  LAYER,
  moon,
  olive,
  person,
  rising,
  river,
  road,
  steps,
  sun,
  sword,
  thicket,
  throne,
  today,
  wall,
} from "../primitives/paperArt";
import type { Route } from "../primitives/route";
import { smoothstep } from "../primitives/Timeline";

const PERIOD = 16;
const HERO_HOLD = 9.5;
const TITLE_BLOCK = 556;
const DAY = 1.5;

const ROUTES: Record<string, Route> = {
  seventh: [
    [0, 0.25],
    [8.6, 0.25],
    [11, 0.5],
  ],
  jordan: [
    [0, 0],
    [4, 0],
    [10, 1],
  ],
};

function paintHero() {
  sun(1250, 320, 50);
  hills(1.2, 420, 90, LAYER.far);
  hills(4.1, 490, 70, LAYER.hill);
  hills(2.6, 556, 50, LAYER.grass);
  road(760, 880, 500, 150);
  wall(-1000, 740, 510, 96);
  wall(1030, 2600, 510, 96);
  gate(880, 510, 1, 0.84);
  olive(240, FLOOR, 1.25);
  olive(470, FLOOR + 10, 0.9, LAYER.deep);
  olive(1250, FLOOR, 1.15, LAYER.deep);
  olive(1480, FLOOR + 10, 0.95);
}

/** Hebrews 4 opening: the finished garden in layers of cut paper, still in full daylight, with its gate standing open. */
export function HeroPaperScene({ mobile, effects }: SceneProps) {
  return (
    <PaperStack
      paint={paintHero}
      period={12}
      hold={HERO_HOLD}
      mobile={mobile}
      effects={effects}
      reserve={TITLE_BLOCK}
      reach={330}
      focus={880}
    />
  );
}

function paintSeventh(t: number) {
  const day = (i: number) => smoothstep(0.6 + i * DAY, 1.6 + i * DAY, t);
  const rest = smoothstep(9.6, 10.8, t);
  for (let i = 0; i < 6; i++)
    if (day(i) > 0.02) dayMark(620 + i * 60, 246, 14 * day(i), false);
  if (rest > 0.02) dayMark(980, 246, 17 * rest, true);
  sun(250, 290, 48 * day(0));
  rising(day(1), () => {
    hills(1.2, 420, 100, LAYER.far);
    river(476);
  });
  rising(day(2), () => {
    hills(2.6, 540, 60, LAYER.grass);
    olive(280, FLOOR, 1.2);
    olive(1320, FLOOR, 1.15, LAYER.deep);
    olive(1500, FLOOR + 10, 0.9);
  });
  if (day(3) > 0.3) moon(1370, 280, 32 * day(3));
  if (day(4) > 0.3)
    for (let i = 0; i < 5; i++) bird(520 + i * 74, 310 + ((i * 43) % 50));
  rising(day(5), () => {
    person(640, FLOOR, 150);
    person(704, FLOOR, 136, { tint: 1 });
  });
  rising(rest, () => wall(1000, 1180, FLOOR, 96));
  rising(rest, () => gate(900, FLOOR, smoothstep(11, 13, t)));
}

/** Verses 1–5: six days build the garden, the seventh adds nothing to it, and a gate stands open, for the promise of rest still stands. */
export function SeventhScene({ mobile, effects }: SceneProps) {
  return (
    <PaperStack
      paint={paintSeventh}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={ROUTES.seventh}
      phoneReach={430}
    />
  );
}

function paintJordan(t: number) {
  sun(1500, 280, 46);
  hills(3.2, 380, 90, LAYER.far);
  hills(0.7, 440, 66, LAYER.hill);
  hills(0.1, 476, 4, LAYER.grass);
  river(500);
  cairn(250, 590, 1);
  road(760, 1320, 410, 140);
  today(760, 1320, 410, 36, smoothstep(4, 11.4, t));
  gate(1320, 414, 1, 0.8);
  person(570, FLOOR + 10, 150, { arm: 0.5 });
}

/** Verses 6–11: Joshua’s stones stand by the Jordan, and the road runs on past them toward the rest that still remains, lit “Today.” */
export function JordanScene({ mobile, effects }: SceneProps) {
  return (
    <PaperStack
      paint={paintJordan}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={ROUTES.jordan}
      phoneReach={380}
    />
  );
}

function paintSword(t: number) {
  const x = 800;
  sun(1330, 300, 34);
  hills(2.1, 430, 56, LAYER.far);
  hills(1.3, 530, 20, LAYER.grass);
  const fall = smoothstep(4.8, 9, t);
  person(1040, FLOOR, 190, { face: -1, arm: 0.4 });
  thicket(x, -1, fall);
  thicket(x, 1, fall);
  sword(x, -200 + smoothstep(2.6, 4.7, t) * 800);
}

/** Verses 12–13: a two-edged sword drives down and cuts the thicket open, the halves fall away, and the one hiding inside stands in plain light. */
export function SwordScene({ mobile, effects }: SceneProps) {
  return (
    <PaperStack
      paint={paintSword}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      phoneReach={460}
    />
  );
}

const RISE = 40;
const TREAD = 60;
const STEPS = 4;

/** Walks in from off the cloth along the ground, then climbs `up` steps; each step lifts smoothly. */
function climb(side: number, up: number, k: number) {
  const walk = smoothstep(0, 0.46, k);
  const base = 450;
  const climbed = Math.max(0, (k - 0.46) / 0.54) * up;
  const step = Math.min(Math.floor(climbed), up - 1);
  const part = Math.min(climbed - step, 1);
  const lift = smoothstep(0, 1, part);
  const moved = step + lift;
  return {
    x: 800 + side * (base + (1 - walk) * 620 - moved * TREAD),
    y: FLOOR - moved * RISE - Math.sin(part * Math.PI) * 9,
  };
}

function paintMercy(t: number) {
  const x = 800;
  hills(0.9, 570, 34, LAYER.grass);
  const part = smoothstep(1, 6, t);
  cloud(400, LAYER.far, 40 + part * 200, x);
  cloud(330, LAYER.far + 0.06, 40 + part * 240, x);
  cloud(260, LAYER.hill, 40 + part * 280, x);
  cloud(190, LAYER.hill + 0.08, 40 + part * 320, x);
  const up = smoothstep(0.8, 6.4, t);
  const base = FLOOR - STEPS * RISE;
  ascent(x, base - 200, base - 200 - up * 420, 18 + part * 40);
  steps(x, FLOOR, STEPS);
  throne(x, base, 0.86);
  const climbers: readonly (readonly [
    number,
    number,
    number,
    number,
    number,
    number,
  ])[] = [
    [-1, 4, 3.4, 8.6, 128, 0.62],
    [1, 3, 4.6, 9.6, 116, 0.46],
    [-1, 2, 6, 10.8, 92, 0.34],
    [1, 2, 7.2, 12, 124, 0.7],
  ];
  climbers.forEach(([side, count, from, to, h, arm], i) => {
    const k = Math.min(1, Math.max(0, (t - from) / (to - from)));
    if (k <= 0) return;
    const at = climb(side, count, k);
    person(at.x, at.y, h, { face: -side, arm, tint: i % 2 });
  });
}

/** Verses 14–16: light passes up through the layers of the heavens and the seat of the throne holds light alone, as people climb to it unafraid. Christ is shown only as light. */
export function MercyScene({ mobile, effects }: SceneProps) {
  return (
    <PaperStack
      paint={paintMercy}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      reach={560}
      phoneReach={500}
    />
  );
}
