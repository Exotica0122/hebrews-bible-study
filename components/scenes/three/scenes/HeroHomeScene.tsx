"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { damp } from "maath/easing";
import {
  Color,
  type DirectionalLight,
  type Fog,
  type HemisphereLight,
  type InstancedMesh,
  type Mesh,
  type MeshStandardMaterial,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  Birds,
  City,
  DAWN,
  DawnSky,
  Land,
  MOUNT,
  OliveGrove,
  TempleMount,
  placeBird,
} from "../primitives/Jerusalem";
import { setEmissive, setUniform } from "../primitives/mutate";
import { STILL, smoothstep, useSceneTime } from "../primitives/Timeline";
import { setLens, useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const BIRDS = 5;
const SUN_EARLY = new Color(DAWN.sunEarly);
const SUN_DAY = new Color(DAWN.sunDay);
const HAZE_EARLY = new Color(DAWN.hazeEarly);
const HAZE_DAY = new Color(DAWN.haze);

/**
 * Home page: Jerusalem at dawn from the Mount of Olives. The sun rises behind
 * the viewer, reaches the temple's gilded front first, then the roofs and the
 * walls, and the morning holds. No figures; nothing stands for Christ here.
 */
export function HeroHomeScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const camera = useThree((s) => s.camera);
  const sunRef = useRef<DirectionalLight>(null);
  const hemiRef = useRef<HemisphereLight>(null);
  const fogRef = useRef<Fog>(null);
  const skyRef = useRef<Mesh>(null);
  const goldRef = useRef<MeshStandardMaterial>(null);
  const birdsRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    setLens(camera, mobile ? 50 : 36, 120);
  }, [camera, mobile]);

  useSceneTime((time, dt, state) => {
    // A still is the morning hold, however slowly the renderer reaches it.
    const t = STILL ? time + 9 : time;
    const dawn = smoothstep(0.5, 8, t);
    const sun = sunRef.current;
    if (sun) {
      sun.color.lerpColors(SUN_EARLY, SUN_DAY, dawn);
      sun.intensity = 0.8 + 2.6 * dawn;
      sun.position.set(-4, 2 + dawn * 12, 28);
    }
    if (hemiRef.current) hemiRef.current.intensity = 0.9 + 0.7 * dawn;
    fogRef.current?.color.lerpColors(HAZE_EARLY, HAZE_DAY, dawn);
    const sky = skyRef.current?.children[0] as Mesh | undefined;
    if (sky) setUniform(sky.material as ShaderMaterial, "dawn", dawn);
    if (goldRef.current)
      setEmissive(goldRef.current, smoothstep(2.5, 6, t) * 0.5);
    const birds = birdsRef.current;
    if (birds)
      for (let i = 0; i < BIRDS; i++)
        placeBird(
          birds,
          i,
          -10 + ((t * 0.55 + i * 3.7) % 22),
          6.4 + Math.sin(t * 0.9 + i * 2.1) * 0.3 + ((i * 7) % 5) * 0.35,
          -3 - ((i * 3) % 5) * 1.1,
        );

    const p = pointer?.current ?? { x: 0, y: 0 };
    const cam = state.camera;
    damp(
      cam.position,
      "x",
      -1.6 + Math.sin(t * 0.05) * 0.5 + p.x * 0.6,
      0.9,
      dt,
    );
    damp(cam.position, "y", (mobile ? 7 : 6.2) - p.y * 0.3, 0.9, dt);
    cam.position.z = mobile ? 17 : 15;
    cam.lookAt(mobile ? MOUNT.x - 1.4 : 1.2, mobile ? 3.2 : 0.6, -7);
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={[DAWN.hazeEarly, 18, 72]} />
      <group ref={skyRef}>
        <DawnSky />
      </group>
      <hemisphereLight ref={hemiRef} args={[DAWN.shade, DAWN.ground, 0.9]} />
      <directionalLight
        ref={sunRef}
        position={[-4, 2, 28]}
        intensity={0.8}
        color={DAWN.sunEarly}
      />
      <Land segments={mobile ? 100 : 150} />
      <City houses={mobile ? 380 : 560} />
      <TempleMount goldRef={goldRef} />
      <OliveGrove count={mobile ? 10 : 16} />
      <Birds birdsRef={birdsRef} count={BIRDS} />
      {effects && <SceneEffects bloom={0.3} threshold={0.88} vignette={0.35} />}
    </>
  );
}
