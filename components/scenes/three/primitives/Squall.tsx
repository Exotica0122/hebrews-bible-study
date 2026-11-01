"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshBasicMaterial, type Mesh } from "three";
import { setOpacity } from "./mutate";

const MIST = "#C7D1CD";

/** A squall of mist across the whole view, held just in front of the camera; covers the loop's reset. */
export function Squall({
  opacity,
  color = MIST,
}: {
  opacity: RefObject<number>;
  color?: string;
}) {
  const ref = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        fog: false,
      }),
    [color],
  );
  useEffect(() => () => material.dispose(), [material]);
  useFrame(({ camera }) => {
    const m = ref.current;
    if (!m) return;
    m.position.copy(camera.position);
    m.quaternion.copy(camera.quaternion);
    m.translateZ(-0.5);
    setOpacity(material, opacity.current);
    m.visible = opacity.current > 0.001;
  });
  return (
    <mesh ref={ref} material={material} renderOrder={100} frustumCulled={false}>
      <planeGeometry args={[4, 4]} />
    </mesh>
  );
}
