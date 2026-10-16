"use client";

import { useRef } from "react";
import type { Group, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Squall } from "../primitives/Coast";
import { Carved, City, Cup, Ground, Loaf, SALEM, SalemHills, SalemLights, SalemSky, Terraces } from "../primitives/Salem";
import { easeInOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const STOP = -0.7;
/** Abraham’s men behind him: offset from Abraham along x, z. */
const MEN: [number, number][] = [[-1.1, -0.5], [-1.7, 0.3], [-2.3, -0.3]];

/** “Melchizedek, king of Salem, priest of the Most High God, met Abraham returning from the slaughter of the kings and blessed him”: below the gate the priest-king holds out bread and wine; Abraham climbs the road with his men and kneels to be blessed. */
export function MeetingScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const party = useRef<Group>(null);
  const standing = useRef<Group>(null);
  const kneeling = useRef<Group>(null);
  const blessing = useRef<ShaderMaterial | null>(null);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    camera.position.set(Math.sin(t * 0.06) * 0.2, 1.5, mobile ? 9 : 6.5);
    camera.lookAt(0, 1, 0);
    const walk = easeInOutCubic((p - 1) / 6);
    if (party.current) {
      party.current.position.x = lerp(-5.5, STOP, walk);
      party.current.position.y = walk < 1 ? Math.abs(Math.sin(p * 5)) * 0.03 : 0;
    }
    const knelt = p > 7.6;
    if (standing.current) standing.current.visible = !knelt;
    if (kneeling.current) kneeling.current.visible = knelt;
    if (blessing.current) setUniform(blessing.current, "uAlpha", 0.5 * smoothstep(8, 10.5, p) * (1 - smoothstep(14, 15.5, p)));
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 12, 45]} />
      <SalemSky horizonY={0} />
      <SalemHills />
      <SalemLights />
      <Ground />
      <Terraces position={[3, 0, -9]} levels={[[4, 0.5], [3.1, 0.5]]} />
      <City position={[3, 1, -9]} radius={2.2} />
      <Carved position={[1.1, 0, 0]} rotationY={-1.1} crown />
      <Loaf position={[0.72, 1.02, 0.18]} />
      <Cup position={[0.82, 0.98, -0.18]} scale={0.9} />
      <Glow position={[0.4, 1.3, 0]} size={2.6} color={SALEM.blush} inner="#FFF4E0" alpha={0} power={1.6} renderOrder={6} onMaterial={(m) => { blessing.current = m; }} />
      <group ref={party}>
        <group ref={standing}>
          <Carved position={[0, 0, 0]} robe={SALEM.mantle} rotationY={1.2} />
        </group>
        <group ref={kneeling} visible={false}>
          <Carved position={[0, 0, 0]} robe={SALEM.mantle} rotationY={1.2} pose="kneeling" />
        </group>
        {MEN.map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <Carved position={[0, 0, 0]} robe="#A58E70" rotationY={1.3} scale={0.97} />
            <mesh position={[0.22, 1.1, 0]} rotation={[0, 0, 0.08]}>
              <cylinderGeometry args={[0.015, 0.015, 2.2, 5]} />
              <meshStandardMaterial color="#6E5A44" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
      <Squall opacity={haze} color={SALEM.haze} />
      {effects && <SceneEffects bloom={0.3} threshold={0.9} vignette={0.3} />}
    </>
  );
}
