"use client";

import { useEffect, useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  PointsMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  figure,
  heart,
  PATTERN,
  placeCamera,
  setFade,
  setPoint,
  setReveal,
  setWear,
  Sheet,
  Sketch,
  Strokes,
  tablet,
  touch,
  useDrawing,
  useStroke,
  type V3,
} from "../primitives/Pattern";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 18;
const STONE_Z = -1;
const COUNT = 70;
const OFFSTAGE = -99;
/** From the least of them to the greatest: x and height. */
const PEOPLE: [number, number][] = [
  [-1.4, 1.1],
  [0.2, 1.55],
  [1.75, 1.95],
  [3.3, 2.3],
  [4.9, 2.65],
];
const TABLETS = [-5.1, -3.9];

const STONE = new Sketch();
const WRITING = new Sketch();
const LETTERS: V3[] = [];
TABLETS.forEach((x) => {
  tablet(STONE, x, STONE_Z);
  for (let row = 0; row < 7; row++) {
    const y = 2.15 - row * 0.28;
    let at = x - 0.4;
    while (at < x + 0.3) {
      const w = 0.09 + ((row * 7 + Math.round(at * 37)) % 5) * 0.025;
      WRITING.line([at, y, STONE_Z], [Math.min(at + w, x + 0.42), y, STONE_Z]);
      LETTERS.push([at + w / 2, y, STONE_Z]);
      at += w + 0.05;
    }
  }
});
const CROWD = new Sketch();
const HEARTS = new Sketch();
const TARGETS: V3[] = PEOPLE.map(([x, h]) => {
  figure(CROWD, x, 0, 0, h);
  heart(HEARTS, x, 0.6 * h, 0.02, 0.1 + h * 0.03);
  return [x, 0.6 * h, 0];
});

/** “Write them on their hearts”: the writing lifts off the stone and crosses to the people, from the least of them to the greatest, and each heart is written in gold. */
export function HeartsScene({ mobile, effects }: SceneProps) {
  const ink = useDrawing();
  const stone = useStroke(ink, STONE, { width: 2 });
  const writing = useStroke(ink, WRITING, { width: 1.8 });
  const crowd = useStroke(ink, CROWD, { width: 2 });
  const hearts = useStroke(ink, HEARTS, {
    color: PATTERN.gold,
    width: 2.4,
    halo: !mobile,
  });
  const sparks = useMemo(() => {
    const attribute = new BufferAttribute(new Float32Array(COUNT * 3), 3);
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", attribute);
    const material = new PointsMaterial({
      color: new Color(PATTERN.gold),
      size: 0.08,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    const points = new Points(geometry, material);
    points.frustumCulled = false;
    points.renderOrder = 4;
    return { attribute, geometry, material, points };
  }, []);
  useEffect(
    () => () => {
      sparks.geometry.dispose();
      sparks.material.dispose();
    },
    [sparks],
  );

  useSceneTime((t, _dt, state) => {
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(16.6, 18, p));
    setFade(ink, fade);
    placeCamera(state.camera, state, t, {
      dist: mobile ? 20 : 21,
      elevation: 0.2,
      azimuth: 0.1,
      look: [-0.1, -0.2, 0],
      sway: 0.05,
    });
    setReveal(stone, smoothstep(0, 1.8, p));
    setReveal(writing, smoothstep(1.2, 3.2, p));
    setReveal(crowd, smoothstep(2.2, 5, p));
    setWear(writing, smoothstep(5, 12, p) * 0.97);
    setReveal(hearts, smoothstep(6.6, 13, p));
    for (let i = 0; i < COUNT; i++) {
      const from = LETTERS[Math.floor((i / COUNT) * LETTERS.length)];
      const to = TARGETS[i % TARGETS.length];
      const f = (p - 5 - (i / COUNT) * 6.5) / 2.2;
      if (f <= 0 || f >= 1) {
        setPoint(sparks.attribute, i, 0, OFFSTAGE, 0);
        continue;
      }
      const e = smoothstep(0, 1, f);
      setPoint(
        sparks.attribute,
        i,
        from[0] + (to[0] - from[0]) * e,
        from[1] + (to[1] - from[1]) * e + Math.sin(e * Math.PI) * 1.7,
        from[2] + (to[2] - from[2]) * e,
      );
    }
    touch(sparks.attribute);
    setOpacity(sparks.material, fade);
  });

  return (
    <>
      <Sheet ink={ink} />
      <Strokes stroke={stone} />
      <Strokes stroke={writing} />
      <Strokes stroke={crowd} />
      <Strokes stroke={hearts} />
      <primitive object={sparks.points} />
      {effects && <SceneEffects bloom={0.2} threshold={0.9} vignette={0.25} />}
    </>
  );
}
