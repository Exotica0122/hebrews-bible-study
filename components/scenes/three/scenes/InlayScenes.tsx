"use client";

import type { SceneProps } from "../registry";
import { LapisPanel } from "../primitives/Inlay";
import {
  altar,
  bundle,
  cup,
  FLOOR,
  ground,
  impression,
  loaf,
  mound,
  panel,
  person,
  rays,
  salem,
  sceptre,
  seal,
  setUp,
  STONE,
  sun,
  tablet,
} from "../primitives/inlayArt";
import type { Route } from "../primitives/route";
import { smoothstep } from "../primitives/Timeline";

const PERIOD = 16;
const HERO_HOLD = 9.5;
const TITLE_BLOCK = 556;
const LINE = [STONE.grey, STONE.limestone, STONE.carnelian];
const PRIESTS = 5;
const TERM = 2;

const ROUTES: Record<string, Route> = {
  meeting: [
    [0, 0],
    [4, 0],
    [8, 0.6],
  ],
  tithe: [
    [0, 0.15],
    [6, 0.15],
    [10, 0.8],
  ],
  arise: [
    [0, 0],
    [3, 0],
    [8, 1],
  ],
  forever: [
    [0, 0],
    [8, 0.5],
    [11, 0.2],
  ],
};

function paintHero(t: number, clock: number) {
  ground();
  salem(1020, FLOOR, 1);
  sun(1400, 440, 58);
  const walk = smoothstep(0.6, HERO_HOLD, t);
  for (let i = 0; i < 5; i++)
    person(190 + i * 66 + walk * 230, FLOOR, 126 + (i % 2) * 8, {
      tone: LINE[i % 3],
      staff: i % 2 === 1,
      arm: 0.34 + Math.sin(clock + i) * 0.01,
    });
}

/** Hebrews 7 opening: Salem on its terraces in shell and limestone, and Abraham’s company coming up the road toward it. */
export function HeroInlayScene({ mobile, effects }: SceneProps) {
  return (
    <LapisPanel
      paint={paintHero}
      period={12}
      hold={HERO_HOLD}
      mobile={mobile}
      effects={effects}
      reserve={TITLE_BLOCK}
      reach={330}
      focus={760}
      phoneFocus={600}
    />
  );
}

function paintMeeting(t: number) {
  ground();
  const go = smoothstep(1.6, 6, t);
  for (let i = 0; i < 6; i++)
    person(70 + i * 76, FLOOR, 150 + (i % 2) * 12, {
      tone: LINE[i % 3],
      staff: i % 3 === 1,
    });
  person(590 + go * 150, FLOOR, 188, {
    tone: STONE.limestone,
    arm: 0.3 + go * 0.25,
    kneel: smoothstep(5.4, 7.4, t),
  });
  person(1060, FLOOR, 220, { wine: true, face: -1, arm: 0.62 });
  loaf(1146, FLOOR - 118, 1);
  cup(964, FLOOR - 156, 1.1);
  sun(1440, 250, 54);
}

/** Verses 1–3: Abraham comes with his line behind him, and the priest-king stands alone with bread and wine, with no line behind him at all. */
export function MeetingScene({ mobile, effects }: SceneProps) {
  return (
    <LapisPanel
      paint={paintMeeting}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={ROUTES.meeting}
    />
  );
}

function paintTithe(t: number) {
  ground();
  const go = smoothstep(3, 7, t);
  for (let i = 0; i < 9; i++) bundle(90 + i * 62, FLOOR, 0.9);
  bundle(650 + go * 490, FLOOR, 1.1, STONE.shell);
  const ax = 850;
  person(ax, FLOOR, 350, { tone: STONE.limestone, arm: 0.3 + go * 0.16 });
  setUp(ax - 90, 180, FLOOR - 20, 240, smoothstep(7, 10.6, t), () => {
    panel(ax - 54, FLOOR - 216, 108, 196);
    for (let i = 0; i < 2; i++) {
      const y = FLOOR - 32 - i * 92;
      person(ax - 26, y, 78, { tone: STONE.shell });
      person(ax + 26, y, 78, { tone: STONE.carnelian });
    }
  });
  person(1320, FLOOR, 240, { wine: true, face: -1, arm: 0.5 });
}

/** Verses 4–10: one bundle in ten is carried to the priest-king, and inside Abraham Levi’s line appears, still in his loins as he gives. */
export function TitheScene({ mobile, effects }: SceneProps) {
  return (
    <LapisPanel
      paint={paintTithe}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={ROUTES.tithe}
      reach={540}
    />
  );
}

function paintArise(t: number) {
  ground();
  for (let i = 0; i < 4; i++)
    person(84 + i * 108, FLOOR, 178, { tone: STONE.shell, arm: 0.42 });
  altar(600, FLOOR, 1, t);
  sceptre(960, FLOOR, 0.78);
  const up = smoothstep(3, 9.6, t);
  rays(1300, FLOOR - 120 - up * 130, 200, up);
}

/** Verses 11–19: Levi’s line stops at its altar, and across from it a light rises from Judah’s ground, where no priest has stood. Christ is shown only as light. */
export function AriseScene({ mobile, effects }: SceneProps) {
  return (
    <LapisPanel
      paint={paintArise}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={ROUTES.arise}
    />
  );
}

function paintSworn(t: number) {
  ground();
  tablet(800, FLOOR, 1000, 300);
  const y = FLOOR - 92;
  const h = 170;
  const x0 = 340;
  const x1 = 1260;
  const x = x0 + smoothstep(1.4, 9.2, t) * (x1 - x0);
  impression(x0, x1, y, h, x);
  if (t < 11) seal(x, y, h, x / 240);
}

/** Verses 20–22: a cylinder seal rolls once across the clay and leaves the oath pressed in, not to be changed. */
export function SwornScene({ mobile, effects }: SceneProps) {
  return (
    <LapisPanel
      paint={paintSworn}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      reach={480}
    />
  );
}

function paintForever(t: number) {
  ground();
  altar(250, FLOOR, 0.9, t);
  const place = 520;
  for (let i = 0; i < PRIESTS; i++) {
    const start = 0.5 + i * TERM;
    const come = smoothstep(start, start + 0.6, t);
    const go = smoothstep(start + TERM - 0.6, start + TERM - 0.1, t);
    if (come > 0 && go < 1)
      setUp(place - 70, 180, FLOOR + 14, 320, come * (1 - go), () =>
        person(place, FLOOR, 188, { tone: STONE.shell, face: -1, arm: 0.5 }),
      );
    if (go > 0)
      setUp(700 + i * 150, 140, FLOOR + 14, 70, go, () =>
        mound(770 + i * 150, FLOOR, 1),
      );
  }
  rays(place, FLOOR - 180, 170, smoothstep(0.5 + PRIESTS * TERM, 13, t));
}

/** Verses 23–28: priest after priest serves and goes to his grave until the graves stand in a row, and then a light stands at the altar and stays. Christ is shown only as light. */
export function ForeverScene({ mobile, effects }: SceneProps) {
  return (
    <LapisPanel
      paint={paintForever}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={ROUTES.forever}
    />
  );
}
