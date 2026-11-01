"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useThree } from "@react-three/fiber";
import {
  CanvasTexture,
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  RepeatWrapping,
  RGBAFormat,
  ShaderMaterial,
  type Texture,
} from "three";
import type { PointerState } from "../registry";
import { bindArt, clearSheet, FLOOR } from "./paperArt";
import { setUniform, touch } from "./mutate";
import { along, type Route } from "./route";
import { SceneEffects } from "./SceneEffects";
import { smoothstep, STILL, useSceneTime } from "./Timeline";

export const PAPER = {
  sky: "#EFE6D2",
  hill: "#A7B6A1",
  grass: "#7D9465",
  leaf: "#3F6349",
  deep: "#284639",
  ground: "#131C19",
  gold: "#E8BE5C",
};

const FLOOR_WIDE = 0.6;
const FLOOR_MOBILE = 0.47;
const ART_WIDTH = 1600;
const PAINT_STEP = 1 / 30;
const MAX_ART = 1600;
const BASE_HEIGHT = 576;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uArt, uFibre;
  uniform vec2 uUnits, uEdge, uLight;
  uniform float uFade, uLod, uFloor, uPan;
  varying vec2 vUv;

  vec3 stock(float h) {
    vec3 c = vec3(0.93, 0.89, 0.8);
    c = mix(c, vec3(0.69, 0.75, 0.66), smoothstep(0.14, 0.16, h));
    c = mix(c, vec3(0.57, 0.66, 0.53), smoothstep(0.25, 0.27, h));
    c = mix(c, vec3(0.47, 0.57, 0.4), smoothstep(0.36, 0.38, h));
    c = mix(c, vec3(0.76, 0.67, 0.51), smoothstep(0.48, 0.5, h));
    c = mix(c, vec3(0.26, 0.4, 0.31), smoothstep(0.6, 0.62, h));
    c = mix(c, vec3(0.16, 0.28, 0.24), smoothstep(0.72, 0.74, h));
    c = mix(c, vec3(0.74, 0.48, 0.28), smoothstep(0.85, 0.87, h));
    return mix(c, vec3(0.93, 0.89, 0.8), smoothstep(0.94, 0.955, h));
  }

  void main() {
    vec2 p = vUv * uUnits + vec2(uPan, 0.0);
    vec4 fibre = texture2D(uFibre, p * 1.4);
    vec4 a = textureLod(uArt, vUv, uLod);

    // Layers lift away nearest first as the scene fades, and settle back far to near.
    float seat = uFade * 1.08;
    float h = a.r * step(a.r, seat);
    float tint = step(a.r, seat);

    vec3 c = stock(h);
    float water = smoothstep(0.25, 0.45, a.g) * (1.0 - smoothstep(0.7, 0.9, a.g)) * tint;
    float wine = smoothstep(0.7, 0.9, a.g) * tint;
    c = mix(c, vec3(0.5, 0.65, 0.72), water);
    c = mix(c, vec3(0.57, 0.2, 0.18), wine);
    c *= 0.92 + 0.11 * fibre.r + 0.04 * fibre.g;

    float shade = 0.0;
    for (float i = 1.0; i < 7.0; i += 1.0) {
      vec4 near = textureLod(uArt, vUv + uLight * i, uLod + 0.6);
      float over = near.r * step(near.r, seat);
      shade = max(shade, smoothstep(0.02, 0.06, over - h - 0.02) * (1.0 - i / 8.0));
    }
    c *= 1.0 - 0.42 * shade;

    float dx = textureLod(uArt, vUv + vec2(uEdge.x, 0.0), uLod).r - textureLod(uArt, vUv - vec2(uEdge.x, 0.0), uLod).r;
    float dy = textureLod(uArt, vUv + vec2(0.0, uEdge.y), uLod).r - textureLod(uArt, vUv - vec2(0.0, uEdge.y), uLod).r;
    float cut = smoothstep(0.01, 0.08, length(vec2(dx, dy))) * tint;
    c += vec3(0.13, 0.12, 0.1) * cut * (dx - dy > 0.0 ? 1.0 : 0.2);

    float gold = smoothstep(0.3, 0.6, a.b) * step(0.3, uFade);
    c = mix(c, vec3(0.91, 0.75, 0.38) * (0.92 + 0.12 * fibre.r), gold);

    // The dark torn sheet below the land carries the page's pale type.
    float at = (uFloor - vUv.y) * uUnits.y + 0.012 * sin(p.x * 3.0) + 0.008 * sin(p.x * 11.0) + (fibre.b - 0.5) * 0.008;
    c *= 1.0 - 0.4 * smoothstep(-0.014, 0.0, at);
    vec3 ground = vec3(0.075, 0.11, 0.1) * (0.9 + 0.14 * fibre.r);
    c = mix(c, ground, smoothstep(0.0, 0.002, at));
    c = mix(c, vec3(0.8, 0.76, 0.66), (1.0 - smoothstep(0.0, 0.004, abs(at - 0.003))) * 0.5);

    gl_FragColor = vec4(pow(clamp(c, 0.0, 1.0), vec3(2.2)), 1.0);
    #include <colorspace_fragment>
  }`;

let fibre: DataTexture | null = null;

/** Paper fibre baked once (red long fibre, green broad tone, blue tooth), so phones do not pay for noise per pixel. */
function fibreTexture() {
  if (fibre) return fibre;
  const size = 512;
  const hash = (x: number, y: number, k: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const value = (u: number, v: number, nx: number, ny: number, k: number) => {
    const x = u * nx;
    const y = v * ny;
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const at = (i: number, j: number) => hash((ix + i) % nx, (iy + j) % ny, k);
    const top = at(0, 0) + (at(1, 0) - at(0, 0)) * sx;
    const low = at(0, 1) + (at(1, 1) - at(0, 1)) * sx;
    return top + (low - top) * sy;
  };
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const i = (y * size + x) * 4;
      data[i] =
        (value(u, v, 24, 180, 1) * 0.5 + value(u, v, 180, 24, 2) * 0.5) * 255;
      data[i + 1] =
        (value(u, v, 5, 5, 3) * 0.6 + value(u, v, 11, 11, 4) * 0.4) * 255;
      data[i + 2] = value(u, v, 90, 90, 5) * 255;
      data[i + 3] = 255;
    }
  }
  const texture = new DataTexture(data, size, size, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  texture.colorSpace = NoColorSpace;
  texture.needsUpdate = true;
  fibre = texture;
  return texture;
}

function paperMaterial(art: Texture) {
  return new ShaderMaterial({
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 1.0, 1.0);
      }`,
    fragmentShader: FRAG,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uArt: { value: art },
      uFibre: { value: fibreTexture() },
      uUnits: { value: [1, 1] },
      uEdge: { value: [0.001, 0.002] },
      uLight: { value: [-0.001, 0.002] },
      uFade: { value: 0 },
      uLod: { value: 0 },
      uFloor: { value: 0.4 },
      uPan: { value: 0 },
    },
  });
}

interface PaperStackProps {
  /** Draws the layers for scene time `t`, far to near. */
  paint: (t: number) => void;
  period: number;
  mobile: boolean;
  effects: boolean;
  /** Stops the loop here and stays, for the hero. */
  hold?: number;
  /** CSS pixels kept clear below the land for the hero's title block. */
  reserve?: number;
  /** Logical height to keep in view above FLOOR. */
  reach?: number;
  /** Logical x held at the centre of the view. */
  focus?: number;
  /** On phones, a closer view that travels along the scene. */
  route?: Route;
  phoneReach?: number;
  pointer?: RefObject<PointerState>;
}

/** Cut paper in daylight: red is the layer from far to near, green tints it, blue is gold paper. */
export function PaperStack({
  paint,
  period,
  mobile,
  effects,
  hold,
  reserve,
  reach = 540,
  focus = ART_WIDTH / 2,
  route,
  phoneReach = reach,
  pointer,
}: PaperStackProps) {
  const size = useThree((s) => s.size);
  const dpr = useThree((s) => s.viewport.dpr);
  const limit = mobile ? 1024 : MAX_ART;
  const ratio = Math.min(limit / Math.max(size.width * dpr, 1), 1) * dpr;
  const width = Math.max(2, Math.round(size.width * ratio));
  const height = Math.max(2, Math.round(size.height * ratio));

  const art = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = NoColorSpace;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = true;
    return { ctx, texture };
  }, [width, height]);
  const material = useMemo(() => paperMaterial(art.texture), [art]);

  const floorAt = reserve
    ? Math.max(0.3, 1 - reserve / Math.max(size.height, 1))
    : mobile
      ? FLOOR_MOBILE
      : FLOOR_WIDE;
  const land = floorAt * height;
  const scale = Math.max(
    width / ART_WIDTH,
    land / (mobile ? phoneReach : reach),
  );
  const travel = mobile && route ? ART_WIDTH - width / scale : 0;
  const close = travel > 0;
  const left = close ? 0 : width / 2 - focus * scale;
  const top = land - FLOOR * scale;

  useEffect(
    () => () => {
      art.texture.dispose();
      material.dispose();
    },
    [art, material],
  );

  const painted = useRef(-1);
  const sway = useRef(0);

  useSceneTime((t) => {
    const p = hold === undefined ? t % period : Math.min(t, hold);
    const fade =
      hold === undefined
        ? smoothstep(0, 1.8, p) * (1 - smoothstep(period - 1.8, period, p))
        : smoothstep(0, 1.6, t);
    sway.current += ((pointer?.current?.x ?? 0) - sway.current) * 0.06;
    const moved = close && route ? along(route, p) * travel : 0;
    const unit = 900 * scale;
    const shift = (1.5 * scale) / height;
    setUniform(material, "uFade", fade);
    setUniform(material, "uLod", Math.log2(height / BASE_HEIGHT));
    setUniform(material, "uFloor", 1 - floorAt);
    setUniform(material, "uPan", moved / 900);
    setVector(material, "uUnits", width / unit, height / unit);
    setVector(material, "uEdge", (1.6 * scale) / width, (1.6 * scale) / height);
    setVector(
      material,
      "uLight",
      ((-1.1 - sway.current * 0.8) * shift * height) / width,
      shift * 1.3,
    );

    if (!STILL && painted.current >= 0 && t - painted.current < PAINT_STEP)
      return;
    painted.current = t;
    bindArt(art.ctx);
    clearSheet(width, height);
    art.ctx.setTransform(scale, 0, 0, scale, left - moved * scale, top);
    paint(p);
    touch(art.texture);
  });

  return (
    <>
      <mesh material={material} frustumCulled={false} renderOrder={-10}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {effects && <SceneEffects bloom={0.1} threshold={0.97} vignette={0.2} />}
    </>
  );
}

function setVector(
  material: ShaderMaterial,
  name: string,
  x: number,
  y: number,
) {
  const value = material.uniforms[name].value as number[];
  value[0] = x;
  value[1] = y;
}
