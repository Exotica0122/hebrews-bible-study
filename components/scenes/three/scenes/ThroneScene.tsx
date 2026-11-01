"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  AddEquation,
  CatmullRomCurve3,
  Color,
  CustomBlending,
  DoubleSide,
  OneFactor,
  ShaderMaterial,
  TubeGeometry,
  Vector3,
  type Group,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Flames } from "../primitives/Flames";
import { Squall } from "../primitives/Squall";
import {
  Angel,
  CloudFloor,
  HEAVEN,
  HeavenLights,
  HeavenSky,
  Throne,
  throneSeat,
  useHeavenGold,
} from "../primitives/Heavens";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 15;
const FLOOR = -1.4;
const THRONE: [number, number, number] = [1.7, FLOOR - 0.1, -0.4];
const WIND_ANGEL: [number, number, number] = [-2.6, FLOOR + 0.05, 0.2];
const FIRE_ANGEL: [number, number, number] = [-1.15, FLOOR + 0.05, -0.3];
/** Round the fire angel's robe, low and at the waist, so the flame climbs its whole figure. */
const FIRE_EMITTERS: [number, number, number][] = [
  [-0.28, 0.1, 0.15],
  [0.28, 0.1, 0.15],
  [-0.34, 0.55, 0.05],
  [0.34, 0.55, 0.05],
].map(([x, y, z]) => [FIRE_ANGEL[0] + x, FIRE_ANGEL[1] + y, FIRE_ANGEL[2] + z]);

const WIND_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const WIND_FRAG = /* glsl */ `
uniform float uTime;
uniform float uAlpha;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  float along = vUv.x;
  float dash = smoothstep(0.0, 0.25, fract(along * 2.0 - uTime * 0.55 + uSeed)) * smoothstep(1.0, 0.55, fract(along * 2.0 - uTime * 0.55 + uSeed));
  float ends = smoothstep(0.0, 0.12, along) * (1.0 - smoothstep(0.85, 1.0, along));
  float a = dash * ends * uAlpha;
  gl_FragColor = vec4(uColor * a, a);
}`;

/** Ribbons of wind spiralling up round a point: each is a helix with its own radius, pitch and phase. */
function windCurves() {
  return [0, 1, 2, 3, 4].map((i) => {
    const pts: Vector3[] = [];
    const r = 0.55 + i * 0.12;
    for (let k = 0; k <= 40; k++) {
      const u = k / 40;
      const a = u * Math.PI * 3.2 + i * 1.3;
      pts.push(
        new Vector3(
          Math.cos(a) * r * (0.6 + u * 0.6),
          u * 1.9 - 0.1,
          Math.sin(a) * r * 0.6,
        ),
      );
    }
    return new CatmullRomCurve3(pts);
  });
}

/** “He makes his angels winds, and his ministers a flame of fire … but your throne, O God, is forever and ever”: on the left an angel in a whirl of wind and one wreathed in flame, never still; on the right the throne and the sceptre of uprightness, unmoved. */
export function ThroneScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const flicker = useRef(0);
  const fireGlow = useRef<ShaderMaterial | null>(null);
  const gold = useHeavenGold();
  const curves = useMemo(() => windCurves(), []);
  const ribbons = useMemo(
    () =>
      curves.map(
        (_, i) =>
          new ShaderMaterial({
            vertexShader: WIND_VERT,
            fragmentShader: WIND_FRAG,
            uniforms: {
              uTime: { value: 0 },
              uAlpha: { value: 0.6 },
              uSeed: { value: i * 0.37 },
              uColor: { value: new Color("#DCE4F2") },
            },
            transparent: true,
            depthWrite: false,
            side: DoubleSide,
            blending: CustomBlending,
            blendEquation: AddEquation,
            blendSrc: OneFactor,
            blendDst: OneFactor,
          }),
      ),
    [curves],
  );
  const tubes = useMemo(
    () => curves.map((c) => new TubeGeometry(c, 80, 0.018, 5, false)),
    [curves],
  );
  useEffect(
    () => () => {
      ribbons.forEach((m) => m.dispose());
      tubes.forEach((g) => g.dispose());
    },
    [ribbons, tubes],
  );

  const wind = useRef<Group>(null);

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.06) * 0.3 - 0.3, 1.1, mobile ? 10 : 7.4);
    camera.lookAt(-0.2, -0.3, -0.2);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(13.6, 15, p);
    flicker.current = 0.06 * Math.sin(t * 2.3) + 0.03 * Math.sin(t * 5.1);
    ribbons.forEach((m, i) => {
      setUniform(m, "uTime", t * (1 + i * 0.15));
      setUniform(m, "uAlpha", 0.45 + 0.25 * Math.sin(t * 1.1 + i));
    });
    if (wind.current) wind.current.rotation.y = t * 1.4;
    if (fireGlow.current)
      setUniform(
        fireGlow.current,
        "uAlpha",
        0.5 + 0.15 * Math.sin(t * 7) + 0.08 * Math.sin(t * 13),
      );
  });

  const seat = throneSeat(3);
  return (
    <>
      <fog attach="fog" args={[HEAVEN.haze, 10, 46]} />
      <HeavenSky horizonY={-0.6} stars={mobile ? 260 : 500} />
      <HeavenLights sun={[4, 5, 6]} intensity={1.3} />
      <CloudFloor y={FLOOR - 0.7} warm={[THRONE[0], THRONE[2]]} />
      <Throne position={THRONE} rotationY={-0.35} mobile={mobile} />
      <group
        position={[THRONE[0] + 0.85, THRONE[1] + 0.66, THRONE[2] + 0.45]}
        rotation={[0, 0, -0.12]}
      >
        <mesh material={gold} position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.03, 0.035, 1.7, 10]} />
        </mesh>
        <mesh material={gold} position={[0, 1.75, 0]}>
          <sphereGeometry args={[0.1, 16, 12]} />
        </mesh>
        <mesh material={gold} position={[0, 1.62, 0]}>
          <torusGeometry args={[0.08, 0.02, 8, 20]} />
        </mesh>
      </group>
      <Angel
        position={WIND_ANGEL}
        rotationY={0.5}
        scale={0.78}
        spread={1}
        robe="#D8DEEA"
      />
      <group
        ref={wind}
        position={[WIND_ANGEL[0], WIND_ANGEL[1], WIND_ANGEL[2]]}
      >
        {tubes.map((g, i) => (
          <mesh key={i} geometry={g} material={ribbons[i]} renderOrder={6} />
        ))}
      </group>
      <Angel
        position={FIRE_ANGEL}
        rotationY={0.3}
        scale={0.78}
        spread={0.9}
        robe="#F0CFA0"
      />
      <Flames
        emitters={FIRE_EMITTERS}
        count={mobile ? 110 : 200}
        rise={1}
        size={mobile ? 5 : 7}
        gust={flicker}
      />
      <pointLight
        position={[FIRE_ANGEL[0], FIRE_ANGEL[1] + 0.8, FIRE_ANGEL[2] + 0.8]}
        intensity={4}
        distance={4}
        decay={1.5}
        color="#F09A3E"
      />
      <Glow
        position={[FIRE_ANGEL[0], FIRE_ANGEL[1] + 0.7, FIRE_ANGEL[2] + 0.1]}
        size={2.6}
        scaleY={1.3}
        color="#C2531A"
        inner="#F3B35A"
        alpha={0.5}
        power={2}
        renderOrder={5}
        onMaterial={(m) => {
          fireGlow.current = m;
        }}
      />
      <Glow
        position={[THRONE[0], THRONE[1] + seat, THRONE[2] - 1]}
        size={9}
        color={HEAVEN.gold}
        alpha={0.12}
        power={2.4}
        renderOrder={1}
      />
      <Squall opacity={haze} color={HEAVEN.top} />
      {effects && <SceneEffects bloom={0.45} threshold={0.82} vignette={0.4} />}
    </>
  );
}
