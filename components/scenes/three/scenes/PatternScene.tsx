"use client";

import { useRef } from "react";
import type { Material } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  contours,
  figure,
  hatch,
  Occluder,
  PATTERN,
  placeCamera,
  Print,
  setFade,
  setReveal,
  Sheet,
  Sketch,
  Strokes,
  tent,
  usePrint,
  useDrawing,
  useStroke,
} from "../primitives/Pattern";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 16;
const X = 1.7;
const K = 1.2;
const Y = 3.1;
const HILL = new Sketch();
const SUMMIT = contours(HILL, -3.8, -1.4, 2.5, 9, 0.2);
const MOSES = figure(new Sketch(), -3.8, SUMMIT - 0.1, -1.4, 0.72);
const TRUE_TENT = tent(new Sketch(), [X, Y, 0], K);
const COPY = tent(new Sketch(), [X, 0, 0]);
const DROP = (() => {
  const sk = new Sketch();
  const a = 1.5 * K;
  const c = K / 2;
  for (const [u, v] of [
    [-a, -c],
    [a, -c],
    [a, c],
    [-a, c],
  ])
    sk.line([X + u, Y, v], [X + u, 0, v]);
  return sk;
})();
const PRINT_HATCH = hatch(X, 0, 3 * K, K);

/** “According to the pattern that was shown you on the mountain”: Moses on the summit sees the gold pattern; its shadow prints pale on the sheet, and the white copy is drawn inside the shadow. */
export function PatternScene({ mobile, effects }: SceneProps) {
  const ink = useDrawing();
  const hill = useStroke(ink, HILL, { width: 1.5, opacity: 0.55 });
  const moses = useStroke(ink, MOSES, { width: 2.1 });
  const truth = useStroke(ink, TRUE_TENT, {
    color: PATTERN.gold,
    width: 2.4,
    halo: !mobile,
  });
  const drop = useStroke(ink, DROP, {
    color: PATTERN.gold,
    width: 1.5,
    opacity: 0.75,
    dash: 5,
  });
  const lines = usePrint(ink, PRINT_HATCH);
  const copy = useStroke(ink, COPY, { width: 2 });
  const printMat = useRef<Material | null>(null);

  useSceneTime((t, _dt, state) => {
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(14.6, 16, p));
    setFade(ink, fade);
    placeCamera(state.camera, state, t, {
      dist: 31,
      elevation: 0.36,
      azimuth: 0.3,
      look: [-0.2, -0.1, 0],
    });
    setReveal(hill, smoothstep(0, 2, p));
    setReveal(moses, smoothstep(1.2, 2.4, p));
    setReveal(truth, smoothstep(2, 6, p));
    setReveal(drop, smoothstep(5.6, 7.4, p));
    setReveal(lines, smoothstep(6.8, 8.8, p));
    if (printMat.current)
      setOpacity(printMat.current, 0.26 * smoothstep(6.8, 8.8, p) * fade);
    setReveal(copy, smoothstep(8.2, 12, p));
  });

  return (
    <>
      <Sheet ink={ink} />
      <Strokes stroke={hill} />
      <Strokes stroke={moses} />
      <Print
        stroke={lines}
        x={X}
        z={0}
        width={3 * K}
        depth={K}
        onMaterial={(m) => {
          printMat.current = m;
        }}
      />
      <Occluder position={[X, 0.5, 0]} size={[3, 1, 1]} />
      <Strokes stroke={copy} />
      <Strokes stroke={truth} />
      <Strokes stroke={drop} />
      {effects && <SceneEffects bloom={0.2} threshold={0.9} vignette={0.25} />}
    </>
  );
}
