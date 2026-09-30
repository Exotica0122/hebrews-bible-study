"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  Shape,
  Vector3,
  type Mesh,
  type PointLight,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { DUSK, DuskSky, Dunes, Sand } from "../primitives/Wilderness";
import { easeOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setEmissive, setOpacity } from "../primitives/mutate";

const PERIOD = 12;
const GROUND = -1.2;
/** Courtyard half-length (east–west) and half-width; the gate opens east, toward the camera’s right. */
const CL = 2.2;
const CW = 1;
const GATE = 0.45;
const POST_H = 0.46;
const TENT_X = -1.05;
const TENT_L = 1.3;
const ALTAR_X = 0.95;
const POSTS_AT = 0.3;
const POSTS_END = 1.4;
const LINEN_AT = 1.1;
const TENT_AT = 1.8;
const GLORY_AT = 2.9;

/** Posts around the courtyard, in the order they go up: along the north side, across the west, back along the south, then the gate. */
function postSpots(): [number, number][] {
  const spots: [number, number][] = [];
  const along = 10;
  for (let i = 0; i <= along; i++) spots.push([CL - (i * 2 * CL) / along, -CW]);
  for (let i = 1; i < 4; i++) spots.push([-CL, -CW + (i * 2 * CW) / 4]);
  for (let i = 0; i <= along; i++) spots.push([-CL + (i * 2 * CL) / along, CW]);
  for (const z of [0.5, 0, -0.5]) spots.push([CL, z * CW * 2 * 0.9]);
  return spots;
}

/** The tent’s draped covering in cross-section: a low ridge whose skins fall almost to the ground (Exod 26:7–14). */
function tentGeometry() {
  const s = new Shape();
  s.moveTo(-0.36, 0);
  s.lineTo(-0.3, 0.46);
  s.quadraticCurveTo(-0.26, 0.6, -0.14, 0.64);
  s.lineTo(0.14, 0.64);
  s.quadraticCurveTo(0.26, 0.6, 0.3, 0.46);
  s.lineTo(0.36, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, { depth: TENT_L, bevelEnabled: false });
  g.translate(0, 0, -TENT_L / 2);
  return g;
}

/** “Moses was faithful in all God’s house”: the tabernacle’s courtyard and tent go up in the wilderness, and the glory settles on it (Exod 40:33–34). */
export function TabernacleScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const site = useRef<Group>(null);
  const postsMesh = useRef<InstancedMesh>(null);
  const linen = useRef<Group>(null);
  const tent = useRef<Group>(null);
  const altar = useRef<Mesh>(null);
  const key = useRef<PointLight>(null);
  const glory = useRef<ShaderMaterial>(null);
  const door = useRef<ShaderMaterial>(null);
  const fire = useRef<ShaderMaterial>(null);

  const spots = useMemo(() => postSpots(), []);
  const geo = useMemo(
    () => ({
      post: new CylinderGeometry(0.022, 0.028, POST_H, 6),
      tent: tentGeometry(),
      altar: new BoxGeometry(0.3, 0.17, 0.3),
      pillar: new CylinderGeometry(0.018, 0.018, 0.5, 6),
      panelLong: new PlaneGeometry(CL * 2, POST_H * 0.9),
      panelShort: new PlaneGeometry(CW * 2, POST_H * 0.9),
      panelSide: new PlaneGeometry(CW - GATE, POST_H * 0.9),
      gate: new PlaneGeometry(GATE * 2, POST_H * 0.9),
      veil: new PlaneGeometry(0.5, 0.5),
    }),
    [],
  );
  const mat = useMemo(
    () => ({
      post: new MeshStandardMaterial({ color: "#B08A58", roughness: 0.5, metalness: 0.3, transparent: true }),
      linen: new MeshStandardMaterial({ color: DUSK.linen, roughness: 0.9, emissive: "#F3D38A", emissiveIntensity: 0.05, side: DoubleSide, transparent: true }),
      screen: new MeshStandardMaterial({ color: "#3A3470", roughness: 0.85, emissive: "#6E2A4E", emissiveIntensity: 0.15, side: DoubleSide, transparent: true }),
      skins: new MeshStandardMaterial({ color: "#5A3028", roughness: 0.95, transparent: true }),
      gold: new MeshStandardMaterial({ color: "#D9B45E", roughness: 0.4, metalness: 0.3, emissive: "#F09A3E", emissiveIntensity: 0.1, transparent: true }),
      bronze: new MeshStandardMaterial({ color: "#8A5A2E", roughness: 0.6, metalness: 0.3, transparent: true }),
    }),
    [],
  );
  const scratch = useMemo(() => ({ m: new Matrix4(), p: new Vector3(), q: new Quaternion(), s: new Vector3() }), []);
  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mat).forEach((m) => m.dispose());
    },
    [geo, mat],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, mobile ? 1.3 : 0.95, mobile ? 6.4 : 4.9);
    camera.lookAt(0.3, -1.1, -0.4);
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.5, p) * (1 - smoothstep(10.8, 12, p));
    const hung = easeOutCubic((p - LINEN_AT) / 0.9);
    const pitched = easeOutCubic((p - TENT_AT) / 0.9);
    const lit = smoothstep(GLORY_AT, GLORY_AT + 1.4, p);

    if (site.current) site.current.rotation.y = -0.55 + Math.sin(t * 0.2) * 0.08;
    const m = postsMesh.current;
    if (m) {
      spots.forEach(([x, z], i) => {
        const at = lerp(POSTS_AT, POSTS_END, i / (spots.length - 1));
        const k = Math.max(0.001, easeOutCubic((p - at) / 0.35));
        scratch.p.set(x, GROUND + (POST_H * k) / 2, z);
        scratch.s.set(1, k, 1);
        scratch.m.compose(scratch.p, scratch.q, scratch.s);
        m.setMatrixAt(i, scratch.m);
      });
      m.instanceMatrix.needsUpdate = true;
    }
    linen.current?.children.forEach((panel) => {
      panel.scale.y = Math.max(0.001, hung);
      panel.position.y = GROUND + POST_H * (1 - 0.45 * hung) - 0.01;
    });
    if (tent.current) tent.current.position.y = (1 - pitched) * 0.9;
    if (altar.current) altar.current.scale.setScalar(Math.max(0.001, hung));

    Object.values(mat).forEach((mm) => setOpacity(mm, fade));
    setOpacity(mat.skins, pitched * fade);
    setOpacity(mat.gold, pitched * fade);
    setEmissive(mat.linen, (0.05 + 0.12 * lit) * fade);
    setEmissive(mat.gold, (0.1 + 0.3 * lit) * fade);
    if (key.current) key.current.intensity = (4 + lit * 6) * fade;
    if (glory.current) glory.current.uniforms.uAlpha.value = 0.7 * lit * fade * (0.92 + Math.sin(t * 1.2) * 0.08);
    if (door.current) door.current.uniforms.uAlpha.value = 0.6 * lit * fade;
    if (fire.current) fire.current.uniforms.uAlpha.value = 0.5 * hung * fade * (0.85 + Math.sin(t * 7) * 0.1 + Math.sin(t * 11) * 0.05);
  });

  const top = GROUND + POST_H;
  const tentFront = TENT_X + TENT_L / 2;
  return (
    <>
      <DuskSky horizonY={-1.6} glowStrength={0.6} stars={mobile ? 90 : 180} />
      <Dunes />
      <Sand y={GROUND} far={-10} />
      <hemisphereLight args={["#6E74B8", "#2B2022", 0.9]} />
      <directionalLight position={[-3, 4, 3]} intensity={0.7} color="#C9C3E0" />
      <pointLight ref={key} position={[0.9, GROUND + 0.8, 0.8]} intensity={4} distance={6} decay={1.6} color={DUSK.fire} />
      <group ref={site} position={[0.25, 0, -0.4]} scale={mobile ? 0.8 : 1}>
        <instancedMesh ref={postsMesh} args={[geo.post, mat.post, spots.length]} frustumCulled={false} />
        <group ref={linen}>
          <mesh geometry={geo.panelLong} material={mat.linen} position={[0, top, -CW]} />
          <mesh geometry={geo.panelLong} material={mat.linen} position={[0, top, CW]} />
          <mesh geometry={geo.panelShort} material={mat.linen} position={[-CL, top, 0]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={geo.panelSide} material={mat.linen} position={[CL, top, -(CW + GATE) / 2]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={geo.panelSide} material={mat.linen} position={[CL, top, (CW + GATE) / 2]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={geo.gate} material={mat.screen} position={[CL + 0.12, top, 0]} rotation={[0, Math.PI / 2, 0]} />
        </group>
        <mesh ref={altar} geometry={geo.altar} material={mat.bronze} position={[ALTAR_X, GROUND + 0.085, 0]} />
        <Glow position={[ALTAR_X, GROUND + 0.25, 0]} size={0.5} color={DUSK.fire} inner="#FFE3B0" alpha={0} power={1.6} renderOrder={5} billboard onMaterial={(g) => { fire.current = g; }} />
        <Embers count={mobile ? 8 : 14} box={[0.2, 1.4, 0.2]} position={[ALTAR_X, GROUND + 0.2, 0]} rise={0.12} size={1.4} alpha={0.55} />
        <group ref={tent}>
          <mesh geometry={geo.tent} material={mat.skins} position={[TENT_X, GROUND, 0]} rotation={[0, Math.PI / 2, 0]} />
          {[-0.24, -0.12, 0, 0.12, 0.24].map((z) => (
            <mesh key={z} geometry={geo.pillar} material={mat.gold} position={[tentFront + 0.03, GROUND + 0.25, z]} />
          ))}
          <mesh geometry={geo.veil} material={mat.screen} position={[tentFront + 0.01, GROUND + 0.25, 0]} rotation={[0, Math.PI / 2, 0]} />
        </group>
        <Glow position={[tentFront + 0.1, GROUND + 0.3, 0]} size={0.9} color="#F3D38A" inner="#FFF8E8" alpha={0} power={1.8} renderOrder={6} billboard onMaterial={(g) => { door.current = g; }} />
        <Glow position={[TENT_X, GROUND + 1.05, 0]} size={1} scaleX={2.8} scaleY={1.5} color="#E8DFCB" inner="#FFF8E8" alpha={0} power={1.6} renderOrder={7} billboard onMaterial={(g) => { glory.current = g; }} />
      </group>
      {effects && <SceneEffects bloom={0.45} />}
    </>
  );
}
