"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  ShaderMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Squall } from "../primitives/Squall";
import {
  HillField,
  Lamp,
  MoonLights,
  NIGHT,
  NightSky,
  terrainHeight,
  type Terrain,
} from "../primitives/Road";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 15;
const WATER_Y = -1;
const ROPE_SEGMENTS = 22;
const SHORE_LIGHTS: [number, number, number][] = [
  [8.4, 0.2, -25],
  [9.1, 0.35, -25.5],
  [10.2, 0.25, -24.8],
  [-13, 0.1, -24],
  [-12.2, 0.3, -24.6],
];
const SHORE: Terrain = {
  amp: 0.8,
  rises: [
    [-14, -26, 7, 2.6],
    [10, -30, 8, 3.2],
  ],
};

/** [dirX, dirZ, amplitude, wavenumber, speed]: mostly running toward +x, the way the current pulls. */
const WAVES: [number, number, number, number, number][] = [
  [1, 0.15, 0.07, 0.9, 1.1],
  [0.8, -0.6, 0.045, 1.7, 1.6],
  [0.95, 0.3, 0.025, 3.4, 2.3],
  [0.3, 1, 0.02, 2.6, 1.3],
];
function waveHeight(x: number, z: number, t: number) {
  let h = 0;
  for (const [dx, dz, a, k, w] of WAVES) {
    const len = Math.hypot(dx, dz);
    h += a * Math.sin(((dx * x + dz * z) / len) * k + t * w);
  }
  return h;
}

const WAVE_GLSL = WAVES.map(([dx, dz, a, k, w]) => {
  const len = Math.hypot(dx, dz);
  return `wave(p, vec2(${(dx / len).toFixed(4)}, ${(dz / len).toFixed(4)}), ${a.toFixed(4)}, ${k.toFixed(4)}, ${w.toFixed(4)}, h, grad);`;
}).join("\n  ");

const WATER_VERT = /* glsl */ `
uniform float uTime;
varying vec3 vWorld;
varying vec3 vNormal;
void wave(vec2 p, vec2 d, float a, float k, float w, inout float h, inout vec2 grad) {
  float ph = dot(d, p) * k + uTime * w;
  h += a * sin(ph);
  grad += d * a * k * cos(ph);
}
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec2 p = world.xz;
  float h = 0.0;
  vec2 grad = vec2(0.0);
  ${WAVE_GLSL}
  world.y += h;
  vWorld = world.xyz;
  vNormal = normalize(vec3(-grad.x, 1.0, -grad.y));
  gl_Position = projectionMatrix * viewMatrix * world;
}`;

const WATER_FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uDeep;
uniform vec3 uSky;
uniform vec3 uHorizon;
uniform vec3 uLampColor;
uniform vec3 uLamp;
varying vec3 vWorld;
varying vec3 vNormal;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
void main() {
  vec3 n = normalize(vNormal);
  vec3 view = normalize(cameraPosition - vWorld);
  float dist = length(cameraPosition - vWorld);
  float fres = pow(1.0 - max(dot(n, view), 0.0), 3.0);
  vec3 c = uDeep + uSky * fres * 0.9;

  vec3 toLamp = uLamp - vWorld;
  vec3 L = normalize(toLamp);
  vec3 H = normalize(L + view);
  float falloff = 1.0 / (1.0 + dot(toLamp, toLamp) * 0.06);
  float spec = pow(max(dot(n, H), 0.0), 160.0) * 5.0 * (1.0 - smoothstep(2.0, 4.5, vWorld.z));
  c += uLampColor * spec * falloff;
  c += uLampColor * 0.08 * falloff;

  float dx = vWorld.x - uLamp.x;
  float column = exp(-dx * dx * 2.2) * smoothstep(uLamp.z - 1.2, uLamp.z + 0.3, vWorld.z) * (1.0 - smoothstep(3.5, 8.0, vWorld.z));
  float ripple = smoothstep(0.5, 0.9, noise(vec2(vWorld.x * 3.0, vWorld.z * 7.0 - uTime * 0.9)));
  c += uLampColor * column * (0.12 + 0.9 * ripple) * 0.55;

  float streak = noise(vec2(vWorld.x * 0.7 - uTime * 0.9, vWorld.z * 5.0));
  c += vec3(0.9, 0.85, 0.75) * smoothstep(0.78, 0.95, streak) * 0.05 * (1.0 - smoothstep(4.0, 14.0, dist));

  c = mix(c, uHorizon, smoothstep(9.0, 30.0, dist));
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  c += (grain - 0.5) * (2.0 / 255.0);
  gl_FragColor = vec4(c, 1.0);
}`;

/** 0 = moored near the post, 1 = pulled furthest by the current; drawn back late in each cycle. */
function driftAt(t: number) {
  const p = t % PERIOD;
  return easeInOutCubic((p - 1.2) / 6) * (1 - easeInOutCubic((p - 8.8) / 3.6));
}

/** Where the hull's rim runs at fraction `a` round it: a pointed bow and stern with the sheer rising toward the ends. */
function rimPoint(a: number, out: Vector3) {
  const x = Math.cos(a);
  return out.set(
    x * 1.1,
    0.14 * x * x,
    Math.sin(a) * 0.42 * Math.sqrt(1 - x ** 4 * 0.85),
  );
}

/** A small open boat, bow toward −x, waterline at the origin: a pinched planked hull, its rim, two thwarts and a short mast with the sail furled. */
function useBoat() {
  return useMemo(() => {
    const hull = new SphereGeometry(
      1,
      40,
      14,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2,
    );
    const pos = hull.getAttribute("position");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      pos.setXYZ(
        i,
        x * 1.1,
        y * 0.42 + 0.14 * x * x,
        z * 0.42 * Math.sqrt(1 - x ** 4 * 0.85),
      );
    }
    hull.computeVertexNormals();
    const pts = Array.from({ length: 49 }, (_, i) =>
      rimPoint((i / 48) * Math.PI * 2, new Vector3()),
    );
    const rim = new TubeGeometry(
      new CatmullRomCurve3(pts, true),
      96,
      0.035,
      6,
      true,
    );
    const strakes = [0.55, 0.78].map((k) => {
      const ring = Array.from({ length: 49 }, (_, i) => {
        const p = rimPoint((i / 48) * Math.PI * 2, new Vector3());
        return new Vector3(p.x * (0.6 + 0.4 * k), p.y - (1 - k) * 0.3, p.z * k);
      });
      return new TubeGeometry(
        new CatmullRomCurve3(ring, true),
        96,
        0.012,
        4,
        true,
      );
    });
    return { hull, rim, strakes };
  }, []);
}

/** “Pay much closer attention to what we have heard, lest we drift away from it”: a boat moored to a lamp-lit post by the jetty; the current pulls it out until the rope is taut, and the rope draws it back. */
export function DriftScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const boat = useRef<Group>(null);
  const rope = useRef<InstancedMesh>(null);
  const boatGeo = useBoat();

  const postX = mobile ? -2 : -3.2;
  const lamp = useMemo(() => new Vector3(postX + 0.36, 0.9, 0.4), [postX]);
  const moored = useMemo(() => ({ x: postX + 2.2, z: 0.9 }), [postX]);
  const adrift = useMemo(() => ({ x: mobile ? 2 : 3.4, z: -1.4 }), [mobile]);
  const scratch = useMemo(
    () => ({
      bow: new Vector3(),
      a: new Vector3(),
      b: new Vector3(),
      d: new Vector3(),
      up: new Vector3(0, 1, 0),
      q: new Quaternion(),
      s: new Vector3(),
      m: new Matrix4(),
    }),
    [],
  );

  const mats = useMemo(
    () => ({
      hull: new MeshStandardMaterial({
        color: "#7A5638",
        roughness: 0.8,
        side: DoubleSide,
      }),
      trim: new MeshStandardMaterial({ color: "#A07A4E", roughness: 0.6 }),
      wood: new MeshStandardMaterial({ color: "#4A3626", roughness: 0.95 }),
      iron: new MeshStandardMaterial({
        color: "#3A342E",
        roughness: 0.5,
        metalness: 0.6,
      }),
      sail: new MeshStandardMaterial({ color: "#CFC4AA", roughness: 1 }),
      rope: new MeshStandardMaterial({ color: "#B89A68", roughness: 1 }),
    }),
    [],
  );
  const ropeGeo = useMemo(() => new CylinderGeometry(0.018, 0.018, 1, 5), []);

  const water = useMemo(() => {
    const g = new PlaneGeometry(70, 40, mobile ? 140 : 220, mobile ? 70 : 110);
    g.rotateX(-Math.PI / 2);
    const m = new ShaderMaterial({
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uDeep: { value: new Color("#0B1220") },
        uSky: { value: new Color("#4A5C86") },
        uHorizon: { value: new Color(NIGHT.haze) },
        uLampColor: { value: new Color("#F3C77A") },
        uLamp: { value: lamp },
      },
    });
    return { g, m };
  }, [mobile, lamp]);
  useEffect(
    () => () => {
      water.g.dispose();
      water.m.dispose();
      ropeGeo.dispose();
      Object.values(mats).forEach((m) => m.dispose());
      boatGeo.hull.dispose();
      boatGeo.rim.dispose();
      boatGeo.strakes.forEach((g) => g.dispose());
    },
    [water, ropeGeo, mats, boatGeo],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, 1.4, mobile ? 10.5 : 8.5);
    camera.lookAt(0, -0.4, 0);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(13.8, 15, p);
    setUniform(water.m, "uTime", t);

    const d = driftAt(t);
    const bx = lerp(moored.x, adrift.x, d);
    const bz = lerp(moored.z, adrift.z, d);
    const h = waveHeight(bx, bz, t);
    const roll =
      (waveHeight(bx, bz + 0.3, t) - waveHeight(bx, bz - 0.3, t)) * 1.4;
    const pitch =
      (waveHeight(bx + 0.6, bz, t) - waveHeight(bx - 0.6, bz, t)) * 0.9;
    const b = boat.current;
    if (b) {
      b.position.set(bx, WATER_Y + h + 0.12, bz);
      b.rotation.set(roll, lerp(0.05, -0.35, d), pitch);
      scratch.bow
        .set(-1.08, 0.18, 0)
        .multiplyScalar(1.15)
        .applyEuler(b.rotation)
        .add(b.position);
    }

    const sag = lerp(0.25, 0.02, smoothstep(0.2, 1, d));
    const sx = postX + 0.13;
    const sy = -0.55;
    const sz = 0.4;
    const r = rope.current;
    if (r) {
      for (let i = 0; i < ROPE_SEGMENTS; i++) {
        const k0 = i / ROPE_SEGMENTS;
        const k1 = (i + 1) / ROPE_SEGMENTS;
        const at = (k: number, out: Vector3) => {
          const x = lerp(sx, scratch.bow.x, k);
          const z = lerp(sz, scratch.bow.z, k);
          const y = lerp(sy, scratch.bow.y, k) - sag * Math.sin(k * Math.PI);
          return out.set(
            x,
            Math.max(y, WATER_Y + waveHeight(x, z, t) + 0.03),
            z,
          );
        };
        at(k0, scratch.a);
        at(k1, scratch.b);
        scratch.d.subVectors(scratch.b, scratch.a);
        const len = scratch.d.length();
        scratch.q.setFromUnitVectors(scratch.up, scratch.d.normalize());
        scratch.s.set(1, len, 1);
        scratch.m.compose(
          scratch.a.add(scratch.b).multiplyScalar(0.5),
          scratch.q,
          scratch.s,
        );
        r.setMatrixAt(i, scratch.m);
      }
      r.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <fog attach="fog" args={[NIGHT.haze, 12, 45]} />
      <NightSky
        horizonY={WATER_Y + 0.2}
        glow={0.45}
        stars={mobile ? 120 : 220}
        moon={mobile ? [5, 6.5, -45] : [12, 5.5, -45]}
      />
      <MoonLights moon={[6, 6, -4]} intensity={1.4} fill={0.7} />
      <HillField y={WATER_Y - 0.4} terrain={SHORE} near={-16} far={-60} />
      <pointLight
        position={[lamp.x, lamp.y, lamp.z]}
        intensity={9}
        distance={12}
        decay={1.6}
        color="#F3C77A"
      />
      {SHORE_LIGHTS.map(([x, y, z], i) => (
        <Glow
          key={i}
          position={[x, WATER_Y - 0.35 + terrainHeight(x, z, SHORE) + y, z]}
          size={0.35}
          color={NIGHT.lamp}
          inner={NIGHT.core}
          alpha={0.8}
          power={1.2}
          renderOrder={-5}
          depthTest
        />
      ))}
      <mesh
        geometry={water.g}
        material={water.m}
        position={[0, WATER_Y, -12]}
        frustumCulled={false}
      />

      <group position={[postX, 0, 0.4]}>
        <mesh material={mats.wood} position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 2.4, 10]} />
        </mesh>
        {[-0.15, -0.65].map((y) => (
          <mesh key={y} material={mats.iron} position={[0, y, 0]}>
            <cylinderGeometry args={[0.135, 0.135, 0.05, 12]} />
          </mesh>
        ))}
        <mesh
          material={mats.iron}
          position={[0.13, -0.55, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.06, 0.016, 6, 16]} />
        </mesh>
        <mesh
          material={mats.wood}
          position={[0.18, 0.62, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.035, 0.035, 0.42, 6]} />
        </mesh>
        <mesh material={mats.iron} position={[0.36, 0.76, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.26, 4]} />
        </mesh>
        <mesh material={mats.iron} position={[0.36, 0.86, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.14, 8, 1, true]} />
        </mesh>
        <Lamp position={[0.36, 0.88, 0.02]} size={2.4} />
      </group>
      <group position={[postX - 2.4, 0, 0.1]}>
        {[0, 1.2].map((x) =>
          [-0.5, 0.5].map((z) => (
            <mesh
              key={`${x}${z}`}
              material={mats.wood}
              position={[x, -0.55, z]}
            >
              <cylinderGeometry args={[0.08, 0.1, 1.5, 8]} />
            </mesh>
          )),
        )}
        {Array.from({ length: 9 }, (_, i) => (
          <mesh
            key={i}
            material={mats.wood}
            position={[-0.6 + i * 0.26, 0.22, 0]}
            rotation={[0, 0.02 * (i % 3), 0]}
          >
            <boxGeometry args={[0.24, 0.05, 1.3]} />
          </mesh>
        ))}
      </group>

      <instancedMesh
        ref={rope}
        args={[ropeGeo, mats.rope, ROPE_SEGMENTS]}
        frustumCulled={false}
      />

      <group ref={boat} position={[moored.x, WATER_Y, moored.z]} scale={1.15}>
        <mesh geometry={boatGeo.hull} material={mats.hull} />
        <mesh geometry={boatGeo.rim} material={mats.trim} />
        {boatGeo.strakes.map((g, i) => (
          <mesh key={i} geometry={g} material={mats.trim} />
        ))}
        {[-0.35, 0.4].map((x) => (
          <mesh key={x} material={mats.trim} position={[x, 0.05, 0]}>
            <boxGeometry args={[0.1, 0.03, 0.78]} />
          </mesh>
        ))}
        <mesh material={mats.wood} position={[-0.3, 0.62, 0]}>
          <cylinderGeometry args={[0.02, 0.026, 1.2, 6]} />
        </mesh>
        <mesh
          material={mats.sail}
          position={[0.05, 0.28, 0]}
          rotation={[0, 0, Math.PI / 2 - 0.12]}
        >
          <cylinderGeometry args={[0.045, 0.035, 0.75, 8]} />
        </mesh>
      </group>
      <Squall opacity={haze} color="#0A0E18" />
      {effects && <SceneEffects bloom={0.5} threshold={0.8} />}
    </>
  );
}
