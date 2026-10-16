"use client";

import { useRef } from "react";
import type { Group, Mesh, PointLight, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Cloth, Figure, Flame, Floor, FLOOR, HOLY } from "../primitives/Sanctuary";
import { lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 17;
const HEARD = 7.8;
const RISE = 9.6;
const SPREAD = 10.6;
/** Each tear’s start time. */
const TEARS = [2, 3.1, 4.3, 5.2, 6.3];
const X = 0.9;
const FACE: [number, number, number] = [X, FLOOR + 1.0, 0.2];

/** “Prayers and supplications, with loud cries and tears … and he was heard”: tears fall in the lamplight, light answers from above, he stands, and the light spreads out from where he is. */
export function CriesScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const level = useRef(0);
  const kneel = useRef<Group>(null);
  const stand = useRef<Group>(null);
  const tears = useRef<(Mesh | null)[]>([]);
  const tearGlow = useRef<(ShaderMaterial | null)[]>([]);
  const shaft = useRef<ShaderMaterial | null>(null);
  const pool = useRef<ShaderMaterial | null>(null);
  const poolMesh = useRef<Mesh | null>(null);
  const above = useRef<PointLight>(null);

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(mobile ? 1.6 : 1.9 + Math.sin(t * 0.05) * 0.1, -0.2, mobile ? 4.2 : 3.4);
    camera.lookAt(mobile ? X : 0.5, -0.6, -0.4);
    const p = t % PERIOD;
    const out = 1 - smoothstep(15.4, 17, p);
    level.current = smoothstep(0, 1.2, p) * out;
    TEARS.forEach((start, i) => {
      const k = (p - start) / 0.9;
      tears.current[i]?.position.set(FACE[0] + 0.02 * i - 0.04, lerp(FACE[1], FLOOR + 0.02, Math.min(1, Math.max(0, k)) ** 2), FACE[2]);
      const m = tearGlow.current[i];
      if (m) setUniform(m, "uAlpha", k > 0 && k < 1 ? 0.9 : 0);
    });
    const heard = smoothstep(HEARD, HEARD + 1.4, p) * out;
    if (shaft.current) setUniform(shaft.current, "uAlpha", 0.55 * heard * (1 - 0.5 * smoothstep(SPREAD + 1, SPREAD + 3, p)));
    if (above.current) above.current.intensity = 9 * heard;
    const up = p > RISE;
    if (kneel.current) kneel.current.visible = !up;
    if (stand.current) stand.current.visible = up;
    const spread = smoothstep(SPREAD, SPREAD + 3.4, p);
    poolMesh.current?.scale.set(lerp(0.6, 9, spread), lerp(0.6, 9, spread), 1);
    if (pool.current) setUniform(pool.current, "uAlpha", 0.5 * spread * out);
  });

  return (
    <>
      <Cloth kind="veil" width={20} height={5} position={[0, FLOOR, -3.4]} folds={22} depth={0.1} repeat={5} />
      <Floor color="#2E231C" />
      <hemisphereLight args={["#2A2030", "#0E0A08", 0.6]} />
      <Flame position={[X + 0.75, FLOOR + 0.12, 0.55]} size={0.07} seed={2} level={level} light={8} distance={6} />
      <group ref={kneel}>
        <Figure position={[X, FLOOR, 0]} robe="#8C7B66" pose="kneeling" />
      </group>
      <group ref={stand} visible={false}>
        <Figure position={[X, FLOOR, 0]} robe="#8C7B66" />
      </group>
      {TEARS.map((_, i) => (
        <Glow key={i} size={0.07} scaleY={1.4} color="#9EC3E8" inner="#FFFFFF" alpha={0} power={1} renderOrder={12} billboard onMaterial={(m) => { tearGlow.current[i] = m; }} onMesh={(m) => { tears.current[i] = m; }} />
      ))}
      <pointLight ref={above} position={[X, 2.4, 0.2]} color="#FFE8C2" intensity={0} distance={7} decay={1.4} />
      <Glow position={[X, 1.2, -0.1]} size={1} scaleX={0.9} scaleY={6} color="#E9B982" inner={HOLY.core} alpha={0} power={1.3} renderOrder={8} onMaterial={(m) => { shaft.current = m; }} />
      <group position={[X, FLOOR + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Glow size={1} color="#B8652A" inner="#FFE8C2" alpha={0} power={1.6} renderOrder={3} depthTest onMaterial={(m) => { pool.current = m; }} onMesh={(m) => { poolMesh.current = m; }} />
      </group>
      {effects && <SceneEffects bloom={0.8} threshold={0.55} vignette={0.55} />}
    </>
  );
}
