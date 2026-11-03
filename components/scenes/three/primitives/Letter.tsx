"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CanvasTexture,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  LatheGeometry,
  type Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  ShaderMaterial,
  Shape,
  SRGBColorSpace,
  Vector2,
  Vector4,
} from "three";
import {
  clayMap,
  contactShadow,
  inkMap,
  papyrusMaps,
  rollEndMap,
  woodMaps,
} from "./letterArt";
import { SCROLL_TEXT, lines } from "./letterText";
import { copyInto, setUniform } from "./mutate";

const MAX_LINES = 12;

export const LETTER = {
  scroll: { x: -0.15, z: 0, width: 3.2, depth: 1.2 },
  rollRadius: 0.11,
  lamp: { x: 1.25, z: -1.05 },
  flame: [0.975, 0.088, -1.05] as [number, number, number],
};

export const SCROLL_LINES = lines(SCROLL_TEXT);

function texture(c: HTMLCanvasElement, srgb = true) {
  const t = new CanvasTexture(c);
  if (srgb) t.colorSpace = SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function useDispose(...items: { dispose(): void }[]) {
  useEffect(
    () => () => items.forEach((i) => i.dispose()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    items,
  );
}

const half = LETTER.scroll.width / 2;
const R = LETTER.rollRadius;

function sheetGeometry(mobile: boolean) {
  const { width, depth } = LETTER.scroll;
  const geo = new PlaneGeometry(width, depth, mobile ? 64 : 128, 24);
  geo.rotateX(-Math.PI / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const end = half - Math.abs(x);
    const lift = end < 0.22 ? Math.pow(1 - end / 0.22, 2) * R * 0.55 : 0;
    const wave =
      Math.sin(x * 4.1 + 0.6) * 0.004 +
      Math.sin(x * 9.3 + z * 3) * 0.0015 +
      Math.pow(Math.abs(z) / (depth / 2), 6) * 0.012;
    p.setY(i, 0.012 + lift + wave);
  }
  geo.computeVertexNormals();
  return geo;
}

/** The open sheet; the ink appears through a per-line mask as `revealRef` advances. */
export function Papyrus({
  mobile,
  revealRef,
}: {
  mobile: boolean;
  revealRef: RefObject<number[]>;
}) {
  const res = useMemo(() => {
    const [w, h] = mobile ? [1024, 384] : [2048, 768];
    const { color, bump } = papyrusMaps(w, h, 19);
    const maps = { color: texture(color), bump: texture(bump, false) };
    const { canvas, bands } = inkMap(w, h, SCROLL_LINES);
    const ink = texture(canvas);
    const reveal = new Array(MAX_LINES).fill(0);
    const uniforms = {
      uInk: { value: ink },
      uBands: {
        value: Array.from({ length: MAX_LINES }, (_, i) =>
          bands[i] ? new Vector4(...bands[i]) : new Vector4(),
        ),
      },
      uReveal: { value: reveal },
      uLines: { value: bands.length },
    };
    const material = new MeshStandardMaterial({
      map: maps.color,
      bumpMap: maps.bump,
      bumpScale: 0.22,
      roughness: 0.88,
      metalness: 0,
      alphaTest: 0.5,
      side: DoubleSide,
    });
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
uniform sampler2D uInk;
uniform vec4 uBands[${MAX_LINES}];
uniform float uReveal[${MAX_LINES}];
uniform int uLines;`,
        )
        .replace(
          "#include <map_fragment>",
          `#include <map_fragment>
vec4 ink = texture2D(uInk, vMapUv);
float shown = 0.0;
for (int i = 0; i < ${MAX_LINES}; i++) {
  if (i >= uLines) break;
  vec4 b = uBands[i];
  if (vMapUv.y <= b.x && vMapUv.y >= b.y) {
    float edge = mix(b.z, b.w + 0.01, uReveal[i]);
    shown = max(shown, smoothstep(edge, edge - 0.004, vMapUv.x));
  }
}
diffuseColor.rgb = mix(diffuseColor.rgb, ink.rgb, ink.a * shown);`,
        );
    };
    return { ...maps, ink, reveal, material };
  }, [mobile]);
  const geometry = useMemo(() => sheetGeometry(mobile), [mobile]);

  useFrame(() => copyInto(res.reveal, revealRef.current));

  useDispose(res.color, res.bump, res.ink, res.material, geometry);
  return (
    <mesh
      geometry={geometry}
      material={res.material}
      position={[LETTER.scroll.x, 0, LETTER.scroll.z]}
      castShadow
      receiveShadow
    />
  );
}

/** One rolled end of the scroll, its spiral showing on the end faces. */
export function ScrollRoll({ side }: { side: -1 | 1 }) {
  const res = useMemo(() => {
    const { color, bump } = papyrusMaps(512, 256, 23 + side);
    const wall = texture(color);
    wall.wrapS = wall.wrapT = RepeatWrapping;
    const end = texture(rollEndMap(256));
    const geo = new CylinderGeometry(
      R,
      R * 1.04,
      LETTER.scroll.depth * 1.01,
      48,
      1,
    );
    geo.rotateX(Math.PI / 2);
    const mats = [
      new MeshStandardMaterial({
        map: wall,
        bumpMap: texture(bump, false),
        bumpScale: 0.4,
        roughness: 0.9,
        color: "#cdb68c",
      }),
      new MeshStandardMaterial({ map: end, roughness: 0.95 }),
      new MeshStandardMaterial({ map: end, roughness: 0.95 }),
    ];
    return { geo, mats, wall, end };
  }, [side]);
  useDispose(res.geo, res.wall, res.end, ...res.mats);
  return (
    <mesh
      geometry={res.geo}
      material={res.mats}
      position={[
        LETTER.scroll.x + side * (half - R * 0.35),
        R,
        LETTER.scroll.z,
      ]}
      rotation={[0, 0, side * 0.4]}
      castShadow
      receiveShadow
    />
  );
}

function nozzleShape() {
  // Top view of the knife-pared Herodian nozzle: concave sides flaring to a broad, rounded tip.
  const s = new Shape();
  s.moveTo(0, -0.05);
  s.quadraticCurveTo(0.07, -0.026, 0.13, -0.042);
  s.quadraticCurveTo(0.175, -0.04, 0.178, 0);
  s.quadraticCurveTo(0.175, 0.04, 0.13, 0.042);
  s.quadraticCurveTo(0.07, 0.026, 0, 0.05);
  s.closePath();
  return s;
}

/** A 1st-century Herodian lamp: wheel-made body, separately attached nozzle. */
export function HerodianLamp() {
  const res = useMemo(() => {
    const clay = texture(clayMap(512, 512));
    const body = new LatheGeometry(
      [
        [0, 0],
        [0.06, 0],
        [0.07, 0.006],
        [0.118, 0.012],
        [0.15, 0.028],
        [0.162, 0.046],
        [0.155, 0.064],
        [0.128, 0.08],
        [0.09, 0.088],
        [0.058, 0.088],
        [0.05, 0.094],
        [0.042, 0.09],
        [0.036, 0.074],
        [0, 0.07],
      ].map(([x, y]) => new Vector2(x, y)),
      64,
    );
    const nozzle = new ExtrudeGeometry(nozzleShape(), {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.008,
      bevelSegments: 3,
      curveSegments: 16,
    });
    nozzle.rotateX(Math.PI / 2);
    nozzle.translate(0, 0.064, 0);
    nozzle.rotateY(Math.PI);
    nozzle.translate(-0.11, 0, 0);
    const clayMat = new MeshStandardMaterial({
      map: clay,
      roughness: 0.82,
      color: "#c9a48a",
    });
    const sootMat = new MeshStandardMaterial({
      color: "#140c08",
      roughness: 1,
      transparent: true,
      opacity: 0.85,
    });
    const soot = new CylinderGeometry(0.03, 0.034, 0.002, 24);
    const wick = new CylinderGeometry(0.006, 0.007, 0.022, 8);
    const wickMat = new MeshStandardMaterial({
      color: "#1d120a",
      roughness: 1,
    });
    return { clay, body, nozzle, clayMat, sootMat, soot, wick, wickMat };
  }, []);
  useDispose(...Object.values(res));
  return (
    <group position={[LETTER.lamp.x, 0, LETTER.lamp.z]}>
      <mesh
        geometry={res.body}
        material={res.clayMat}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={res.nozzle}
        material={res.clayMat}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={res.soot}
        material={res.sootMat}
        position={[
          LETTER.flame[0] - LETTER.lamp.x + 0.01,
          0.0765,
          LETTER.flame[2] - LETTER.lamp.z,
        ]}
      />
      <mesh
        geometry={res.wick}
        material={res.wickMat}
        position={[
          LETTER.flame[0] - LETTER.lamp.x,
          0.08,
          LETTER.flame[2] - LETTER.lamp.z,
        ]}
        rotation={[0, 0, 0.35]}
      />
    </group>
  );
}

const flameVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  mv.xy += position.xy;
  gl_Position = projectionMatrix * mv;
}`;

const flameFrag = /* glsl */ `
uniform float uTime;
uniform float uPower;
varying vec2 vUv;
float n(float x) { return sin(x) * 0.5 + sin(x * 2.31 + 1.7) * 0.3 + sin(x * 5.13 + 0.4) * 0.2; }
void main() {
  vec2 p = vUv - vec2(0.5, 0.0);
  float y = vUv.y;
  p.x -= n(uTime * 3.0 + y * 4.0) * 0.06 * y * y;
  float w = 0.34 * sqrt(max(y, 0.0)) * (1.0 - smoothstep(0.35, 1.0, y)) + 0.02;
  float d = abs(p.x) / w;
  float body = (1.0 - smoothstep(0.7, 1.0, d)) * smoothstep(0.0, 0.08, y) * (1.0 - smoothstep(0.86, 1.0, y));
  float core = (1.0 - smoothstep(0.0, 0.6, d)) * smoothstep(0.08, 0.25, y) * (1.0 - smoothstep(0.35, 0.7, y));
  vec3 base = mix(vec3(0.35, 0.25, 0.9), vec3(1.0, 0.45, 0.1), smoothstep(0.03, 0.16, y));
  vec3 col = mix(base, vec3(1.0, 0.78, 0.38), smoothstep(0.1, 0.45, y));
  col = mix(col, vec3(1.0, 0.97, 0.86), core);
  float a = body * (0.85 + 0.15 * uPower);
  gl_FragColor = vec4(col * (1.6 + core * 2.4) * uPower, a);
}`;

const haloFrag = /* glsl */ `
uniform float uPower;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 2.6) * 0.3 * uPower;
  gl_FragColor = vec4(vec3(1.0, 0.68, 0.32) * a, a);
}`;

/** The flame, a camera-facing teardrop, with a soft halo. */
export function Flame({
  flickerRef,
}: {
  flickerRef: RefObject<{ power: number; dx: number; dy: number }>;
}) {
  const flame = useRef<Mesh>(null);
  const res = useMemo(() => {
    const uniforms = { uTime: { value: 0 }, uPower: { value: 1 } };
    const flameMat = new ShaderMaterial({
      vertexShader: flameVert,
      fragmentShader: flameFrag,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const haloMat = new ShaderMaterial({
      vertexShader: flameVert,
      fragmentShader: haloFrag,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const flameGeo = new PlaneGeometry(0.04, 0.1);
    flameGeo.translate(0, 0.05, 0);
    const haloGeo = new PlaneGeometry(0.24, 0.24);
    return { uniforms, flameMat, haloMat, flameGeo, haloGeo };
  }, []);
  const time = useRef(0);
  useFrame((_, dt) => {
    const f = flickerRef.current;
    time.current += dt;
    setUniform(res.flameMat, "uTime", time.current);
    setUniform(res.flameMat, "uPower", f.power);
    if (flame.current) {
      flame.current.position.set(f.dx, 0, f.dy * 0.5);
      flame.current.scale.set(1, 0.9 + 0.2 * f.power, 1);
    }
  });
  useDispose(res.flameMat, res.haloMat, res.flameGeo, res.haloGeo);
  return (
    <group position={LETTER.flame}>
      <mesh
        ref={flame}
        geometry={res.flameGeo}
        material={res.flameMat}
        renderOrder={2}
      />
      <mesh
        geometry={res.haloGeo}
        material={res.haloMat}
        position={[0, 0.045, 0]}
        renderOrder={3}
      />
    </group>
  );
}

/** The olive-wood table; it falls into darkness away from the lamp. */
export function Table({ mobile }: { mobile: boolean }) {
  const res = useMemo(() => {
    const { color, rough } = woodMaps(
      mobile ? 1024 : 2048,
      mobile ? 512 : 1024,
    );
    const map = texture(color);
    const roughnessMap = texture(rough, false);
    const geo = new PlaneGeometry(10, 8);
    geo.rotateX(-Math.PI / 2);
    const mat = new MeshStandardMaterial({
      map,
      roughnessMap,
      roughness: 1,
      metalness: 0,
    });
    return { map, roughnessMap, geo, mat };
  }, [mobile]);
  useDispose(...Object.values(res));
  return (
    <mesh
      geometry={res.geo}
      material={res.mat}
      position={[0, 0, -0.5]}
      receiveShadow
    />
  );
}

/** Soft shadow patches under the rolls and lamp, for tiers without shadow maps. */
export function ContactShadows() {
  const res = useMemo(() => {
    const map = new CanvasTexture(contactShadow(128));
    const mat = new MeshStandardMaterial({
      color: "#000",
      opacity: 0.7,
      alphaMap: map,
      transparent: true,
      depthWrite: false,
    });
    const geo = new PlaneGeometry(1, 1);
    geo.rotateX(-Math.PI / 2);
    return { map, mat, geo };
  }, []);
  useDispose(...Object.values(res));
  const rollX = half - R * 0.35;
  const patches: [number, number, number, number][] = [
    [
      LETTER.scroll.x - rollX,
      LETTER.scroll.z,
      0.42,
      LETTER.scroll.depth * 1.15,
    ],
    [
      LETTER.scroll.x + rollX,
      LETTER.scroll.z,
      0.42,
      LETTER.scroll.depth * 1.15,
    ],
    [LETTER.lamp.x - 0.06, LETTER.lamp.z, 0.62, 0.5],
  ];
  return (
    <>
      {patches.map(([x, z, w, d]) => (
        <mesh
          key={`${x}-${z}`}
          geometry={res.geo}
          material={res.mat}
          position={[x, 0.004, z]}
          scale={[w, 1, d]}
        />
      ))}
    </>
  );
}
