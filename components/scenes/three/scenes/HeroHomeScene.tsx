"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { damp } from "maath/easing";
import {
  type Material,
  type Mesh,
  Object3D,
  PCFShadowMap,
  type PointLight,
  type SpotLight,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  ContactShadows,
  Flame,
  HerodianLamp,
  LETTER,
  Papyrus,
  SCROLL_LINES,
  ScrollRoll,
  Table,
} from "../primitives/Letter";
import { cameraSettle, flicker, lineReveal } from "../primitives/letterMotion";
import { setShadowMap } from "../primitives/mutate";
import { STILL, useSceneTime } from "../primitives/Timeline";
import { setLens, useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const LIGHT = 8;
/** Lamp share lit without shadows; Safari blacks out point-light shadow maps, so a spot casts them. */
const GLOW = 0.4;

function useShadows(on: boolean) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useLayoutEffect(() => {
    if (!on) return;
    setShadowMap(gl, true, PCFShadowMap);
    const refresh = () =>
      scene.traverse((o) => {
        const m = (o as Mesh).material as Material | Material[] | undefined;
        [m].flat().forEach((x) => x && (x.needsUpdate = true));
      });
    refresh();
    return () => {
      setShadowMap(gl, false);
      refresh();
    };
  }, [gl, scene, on]);
}

/**
 * Home page: the letter by lamplight. A papyrus of Hebrews 1:1–2, written as
 * P46 has it, lies open by a Herodian lamp; the lines ink in, then the
 * flame alone moves. No figures.
 */
export function HeroHomeScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  useShadows(effects);
  const camera = useThree((s) => s.camera);
  const glow = useRef<PointLight>(null);
  const spot = useRef<SpotLight>(null);
  const target = useMemo(() => {
    const o = new Object3D();
    o.position.set(LETTER.scroll.x - 0.3, 0, LETTER.scroll.z + 0.2);
    return o;
  }, []);
  const reveal = useRef<number[]>(SCROLL_LINES.map(() => 0));
  const flick = useRef(flicker(0));

  useLayoutEffect(() => {
    setLens(camera, mobile ? 44 : 30, 40);
  }, [camera, mobile]);

  useSceneTime((time, dt, state) => {
    const t = STILL ? time + 10 : time;
    SCROLL_LINES.forEach((_, i) => {
      reveal.current[i] = lineReveal(t, i, SCROLL_LINES.length);
    });
    const f = flicker(t);
    flick.current = f;
    for (const [l, share] of [
      [glow.current, GLOW],
      [spot.current, 1 - GLOW],
    ] as const) {
      if (!l) continue;
      l.intensity = LIGHT * share * f.power;
      l.position.set(
        LETTER.flame[0] + f.dx,
        LETTER.flame[1] + 0.07,
        LETTER.flame[2] + f.dy,
      );
    }

    const settle = cameraSettle(t);
    const p = pointer?.current ?? { x: 0, y: 0 };
    const cam = state.camera;
    const lift = (1 - settle) * 0.35;
    if (mobile) {
      damp(cam.position, "x", 0.55 + p.x * 0.08, 0.9, dt);
      cam.position.y = 3.0 + lift - p.y * 0.05;
      cam.position.z = 2.9;
      cam.lookAt(0.55, -0.6, -0.05);
    } else {
      damp(cam.position, "x", -0.05 + p.x * 0.15, 0.9, dt);
      cam.position.y = 3.3 + lift - p.y * 0.08;
      cam.position.z = 3.9;
      cam.lookAt(-0.05, -0.2, 0.55);
    }
  });

  return (
    <>
      <hemisphereLight args={["#1b2233", "#120c07", 0.08]} />
      <pointLight
        ref={glow}
        position={[LETTER.flame[0], LETTER.flame[1] + 0.07, LETTER.flame[2]]}
        color="#ffb766"
        intensity={LIGHT * GLOW}
        decay={1.4}
      />
      <primitive object={target} />
      <spotLight
        ref={spot}
        target={target}
        position={[LETTER.flame[0], LETTER.flame[1] + 0.07, LETTER.flame[2]]}
        color="#ffb766"
        intensity={LIGHT * (1 - GLOW)}
        decay={1.4}
        angle={1.25}
        penumbra={0.9}
        castShadow={effects}
        shadow-mapSize={mobile ? [1024, 1024] : [2048, 2048]}
        shadow-bias={-0.0008}
        shadow-normalBias={0.01}
        shadow-camera-near={0.05}
        shadow-camera-far={8}
      />
      <Table mobile={mobile} />
      <Papyrus mobile={mobile} revealRef={reveal} />
      <ScrollRoll side={-1} />
      <ScrollRoll side={1} />
      <HerodianLamp />
      <Flame flickerRef={flick} />
      {!effects && <ContactShadows />}
      {effects && <SceneEffects bloom={0.55} threshold={0.7} vignette={0.55} />}
    </>
  );
}
