"use client";

import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  Occluder,
  PATTERN,
  placeCamera,
  setFade,
  setReveal,
  Sheet,
  Sketch,
  Strokes,
  tent,
  useDrawing,
  useStroke,
} from "../primitives/Pattern";
import { smoothstep, useSceneTime } from "../primitives/Timeline";

const PERIOD = 16;
const LEFT = -2.7;
const RIGHT = 2.4;
const K = 1.5;
const FIRST = tent(new Sketch(), [LEFT, 0, 0]);
const SECOND = tent(new Sketch(), [RIGHT, 0, 0], K);
const X0 = RIGHT - 1.5 * K - 0.3;
const X1 = RIGHT + 1.5 * K + 0.3;
const Z = K / 2 + 0.3;
const PLOT = new Sketch().poly(
  [
    [X0, 0, -Z],
    [X1, 0, -Z],
    [X1, 0, Z],
    [X0, 0, Z],
  ],
  true,
);

/** “No occasion to look for a second”: beside the first tent a plot stands marked out and empty, and the larger gold one is raised on it. */
export function SecondScene({ mobile, effects }: SceneProps) {
  const ink = useDrawing();
  const first = useStroke(ink, FIRST, { width: 2 });
  const plot = useStroke(ink, PLOT, { width: 1.8, dash: 4.5 });
  const second = useStroke(ink, SECOND, {
    color: PATTERN.gold,
    width: 2.5,
    halo: !mobile,
  });

  useSceneTime((t, _dt, state) => {
    const p = t % PERIOD;
    setFade(ink, smoothstep(0, 0.8, p) * (1 - smoothstep(14.6, 16, p)));
    placeCamera(state.camera, state, t, {
      dist: 21,
      elevation: 0.33,
      azimuth: 0.12,
      look: [-0.1, -0.7, 0],
    });
    setReveal(first, smoothstep(0.4, 3.6, p));
    setReveal(plot, smoothstep(4, 6.2, p));
    setReveal(second, smoothstep(6.8, 11.5, p));
  });

  return (
    <>
      <Sheet ink={ink} />
      <Occluder position={[LEFT, 0.5, 0]} size={[3, 1, 1]} />
      <Strokes stroke={first} />
      <Strokes stroke={plot} />
      <Strokes stroke={second} />
      {effects && <SceneEffects bloom={0.2} threshold={0.9} vignette={0.25} />}
    </>
  );
}
