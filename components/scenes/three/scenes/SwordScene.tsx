"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MeshBasicMaterial,
  Shape,
  ShapeGeometry,
  type Group,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Squall";
import { Glow } from "../primitives/Glow";
import { Figure } from "../primitives/Sanctuary";
import {
  DAY,
  DayLights,
  DaySky,
  GardenHills,
  OliveTree,
  Soft,
} from "../primitives/Garden";
import { Sand } from "../primitives/Wilderness";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity, setUniform } from "../primitives/mutate";

const PERIOD = 16;
const GROUND = -1.3;
const CUT = 2.2;
const PART = 4.4;
const BLADE_TOP = 3.4;
const BLADE_LOW = -3.6;
/** Patches of shade per side: x offset from the cut, y, size. */
const SHADE: [number, number, number][] = [
  [0.5, -0.9, 3],
  [1.3, -0.5, 3],
  [2.1, -0.9, 3],
  [2.9, -0.4, 3],
  [0.9, -1.4, 2.6],
  [1.9, -1.5, 2.6],
];
const GROVE: [number, number, number][] = [
  [-3.4, -4.2, 1.9],
  [-2.2, -5.2, 1.4],
  [3.2, -4.4, 2],
  [2.1, -5.6, 1.3],
];

/** A two-edged blade pointing down, tip at y = 0: the edges taper to the point, then a crossguard, grip and pommel. */
function bladeGeometry() {
  const s = new Shape();
  s.moveTo(0, 0);
  s.lineTo(0.08, 0.32);
  s.lineTo(0.075, 2.2);
  s.lineTo(0.3, 2.22);
  s.lineTo(0.3, 2.3);
  s.lineTo(0.035, 2.3);
  s.lineTo(0.035, 2.72);
  s.absarc(0, 2.78, 0.07, -Math.PI / 2 + 0.5, Math.PI * 1.5 - 0.5, false);
  s.lineTo(-0.035, 2.72);
  s.lineTo(-0.035, 2.3);
  s.lineTo(-0.3, 2.3);
  s.lineTo(-0.3, 2.22);
  s.lineTo(-0.075, 2.2);
  s.lineTo(-0.08, 0.32);
  s.closePath();
  return new ShapeGeometry(s, 8);
}

/** “Sharper than any two-edged sword … all are naked and exposed”: a blade of cool light cuts down through the shade of the grove, the shade falls away, and the one standing there is in plain light. */
export function SwordScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const fade = useRef(1);
  const blade = useRef<Group>(null);
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const shade = useRef<MeshBasicMaterial[]>([]);
  const bladeGlow = useRef<ShaderMaterial>(null);
  const seam = useRef<ShaderMaterial>(null);
  const clear = useRef<ShaderMaterial>(null);
  const shape = useMemo(() => bladeGeometry(), []);
  const steel = useMemo(
    () =>
      new MeshBasicMaterial({
        color: "#F4F8FF",
        transparent: true,
        opacity: 0,
      }),
    [],
  );
  useEffect(
    () => () => {
      shape.dispose();
      steel.dispose();
    },
    [shape, steel],
  );
  const reach = mobile ? 3 : 4.4;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.06) * 0.1, 0, mobile ? 6.6 : 5.2);
    camera.lookAt(0, -0.2, -3);
    const p = t % PERIOD;
    fade.current = 1 - smoothstep(0, 0.9, p) + smoothstep(14.4, 15.8, p);
    const back = smoothstep(14.4, 16, p);
    const fall = easeInOutCubic((p - CUT) / 2.2);
    const shown =
      smoothstep(CUT - 0.6, CUT, p) * (1 - smoothstep(CUT + 2, CUT + 2.6, p));
    const part = easeOutCubic((p - PART) / 3) * (1 - back);

    blade.current?.position.set(0, lerp(BLADE_TOP, BLADE_LOW, fall), -1.4);
    setOpacity(steel, shown);
    if (bladeGlow.current) setUniform(bladeGlow.current, "uAlpha", 0.7 * shown);
    if (seam.current)
      setUniform(
        seam.current,
        "uAlpha",
        0.6 *
          smoothstep(CUT + 0.3, CUT + 1.2, p) *
          (1 - smoothstep(PART, PART + 1.6, p)),
      );
    left.current?.position.setX(-part * reach);
    right.current?.position.setX(part * reach);
    shade.current.forEach((m) => setOpacity(m, 0.8 * (1 - 0.9 * part)));
    if (clear.current)
      setUniform(
        clear.current,
        "uAlpha",
        0.3 *
          smoothstep(PART, PART + 1, p) *
          (1 - smoothstep(PART + 1.5, PART + 4, p)),
      );
  });

  const puffs = (side: 1 | -1) =>
    SHADE.map(([x, y, s], j) => (
      <Soft
        key={j}
        position={[side * x, y, 0]}
        size={s}
        scaleY={0.7}
        color={DAY.shade}
        opacity={0.8}
        renderOrder={6}
        onMaterial={(m) => {
          if (!shade.current.includes(m)) shade.current.push(m);
        }}
      />
    ));

  return (
    <>
      <DaySky horizonY={-1} />
      <GardenHills />
      <Sand y={GROUND} far={-6} color="#7E9460" />
      <DayLights sun={[-2, 5, 4]} />
      {GROVE.map(([x, z, s]) => (
        <OliveTree key={x} position={[x, GROUND, z]} scale={s} />
      ))}
      <Soft
        position={[0.2, GROUND + 0.005, -2.9]}
        rotation={[-Math.PI / 2, 0, 0]}
        size={1}
        scaleX={0.9}
        scaleY={0.35}
        color={DAY.shade}
        opacity={0.35}
        renderOrder={2}
      />
      <Figure position={[0, GROUND, -3]} scale={0.85} robe="#EFE6D2" />
      <Glow
        depthTest
        position={[0, GROUND + 0.9, -3.4]}
        size={3.4}
        scaleY={1.3}
        color="#9EC3E8"
        inner="#FFFFFF"
        alpha={0}
        power={1.4}
        renderOrder={5}
        onMaterial={(m) => {
          clear.current = m;
        }}
      />
      <group position={[0, 0, -2]}>
        <group ref={left}>{puffs(-1)}</group>
        <group ref={right}>{puffs(1)}</group>
      </group>
      <Glow
        position={[0, -0.2, -1.9]}
        size={1}
        scaleX={0.12}
        scaleY={4.4}
        color="#9EC3E8"
        inner="#FFFFFF"
        alpha={0}
        power={1.1}
        renderOrder={7}
        onMaterial={(m) => {
          seam.current = m;
        }}
      />
      <group ref={blade}>
        <Glow
          position={[0, 1.4, -0.05]}
          size={1}
          scaleX={0.7}
          scaleY={3.4}
          color="#9EC3E8"
          inner="#FFFFFF"
          alpha={0}
          power={1.5}
          renderOrder={8}
          onMaterial={(m) => {
            bladeGlow.current = m;
          }}
        />
        <mesh geometry={shape} material={steel} renderOrder={9} />
      </group>
      <Squall opacity={fade} color={DAY.haze} />
      {effects && <SceneEffects bloom={0.4} threshold={0.92} vignette={0.25} />}
    </>
  );
}
