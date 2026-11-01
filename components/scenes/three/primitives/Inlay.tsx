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
import { bindArt, clearGround, FLOOR } from "./inlayArt";
import { setUniform, touch } from "./mutate";
import { along, type Route } from "./route";
import { SceneEffects } from "./SceneEffects";
import { smoothstep, STILL, useSceneTime } from "./Timeline";

export const INLAY = {
  lapis: "#1C2B61",
  bitumen: "#09090F",
  shell: "#EDDEBD",
  limestone: "#C7944D",
  carnelian: "#99241A",
  gold: "#E6B047",
};

const FLOOR_WIDE = 0.6;
const FLOOR_MOBILE = 0.47;
const ART_WIDTH = 1600;
const PAINT_STEP = 1 / 30;
const MAX_ART = 1600;
const BASE_HEIGHT = 576;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uArt, uTiles, uStone;
  uniform vec2 uUnits, uEdge;
  uniform float uFade, uLod, uFloor, uPan;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * uUnits + vec2(uPan, 0.0);
    vec4 tile = texture2D(uTiles, p * 1.05);
    vec4 stone = texture2D(uStone, p * 0.9);
    vec4 grain = texture2D(uStone, p * 3.3 + 0.21);

    vec3 lapis = mix(vec3(0.07, 0.11, 0.27), vec3(0.11, 0.17, 0.38), tile.r);
    lapis = mix(lapis, vec3(0.72, 0.56, 0.26), step(0.5, tile.a));
    lapis *= (0.84 + 0.22 * stone.r) * (0.9 + 0.2 * grain.b);
    float set = step(tile.r, uFade * 1.04);
    vec3 c = mix(vec3(0.035, 0.05, 0.11), lapis, smoothstep(0.0, 0.2, tile.g) * set);

    vec4 a = textureLod(uArt, vUv, uLod);
    float h = a.r;
    float form = smoothstep(0.15, 0.2, h) * step(tile.b, uFade * 1.05);
    vec3 shell = vec3(0.05, 0.05, 0.07);
    shell = mix(shell, vec3(0.42, 0.38, 0.3), smoothstep(0.38, 0.42, h));
    shell = mix(shell, vec3(0.78, 0.58, 0.3), smoothstep(0.54, 0.58, h));
    shell = mix(shell, vec3(0.6, 0.14, 0.09), smoothstep(0.7, 0.74, h));
    shell = mix(shell, vec3(0.93, 0.87, 0.74), smoothstep(0.86, 0.9, h));
    shell = mix(shell, vec3(0.56, 0.1, 0.08), smoothstep(0.3, 0.6, a.g));
    shell *= (0.8 + 0.3 * stone.r + 0.08 * grain.b) * (1.0 - 0.22 * (1.0 - smoothstep(0.0, 0.1, stone.g)));

    float dx = textureLod(uArt, vUv + vec2(uEdge.x, 0.0), uLod).r - textureLod(uArt, vUv - vec2(uEdge.x, 0.0), uLod).r;
    float dy = textureLod(uArt, vUv + vec2(0.0, uEdge.y), uLod).r - textureLod(uArt, vUv - vec2(0.0, uEdge.y), uLod).r;
    float edge = smoothstep(0.05, 0.18, length(vec2(dx, dy)));
    float bevel = clamp((dx - dy) * 2.6, -0.26, 0.34);
    c = mix(c, shell * (1.0 + bevel), form);
    c = mix(c, vec3(0.02, 0.018, 0.03), edge * 0.92 * step(tile.b, uFade * 1.05));

    float gold = smoothstep(0.3, 0.6, a.b) * uFade;
    c = mix(c, vec3(0.9, 0.69, 0.28) * (0.74 + 0.46 * grain.r), gold);

    // The bitumen ground below the register carries the page's pale type.
    float at = (uFloor - vUv.y) * uUnits.y;
    float tri = step(fract(p.x * 18.0 + at * 16.0), 0.5);
    vec3 trim = mix(vec3(0.93, 0.87, 0.74), vec3(0.6, 0.14, 0.09), tri) * (0.84 + 0.3 * stone.r);
    c = mix(c, trim, step(0.0, at) * step(at, 0.03));
    vec3 pitch = vec3(0.03, 0.03, 0.06) * (0.9 + 0.3 * stone.b);
    c = mix(c, pitch, step(0.03, at));

    float top = (1.0 - vUv.y) * uUnits.y;
    float slant = step(fract((p.x + top) * 18.0), 0.5);
    vec3 rim = mix(vec3(0.05, 0.1, 0.3), vec3(0.78, 0.58, 0.3), slant) * (0.84 + 0.3 * stone.r);
    c = mix(c, rim, step(0.028, top) * step(top, 0.058));

    gl_FragColor = vec4(pow(clamp(c, 0.0, 1.0), vec3(2.2)), 1.0);
    #include <colorspace_fragment>
  }`;

let tiles: DataTexture | null = null;
let stone: DataTexture | null = null;

function repeating(data: Uint8Array, size: number) {
  const texture = new DataTexture(data, size, size, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  texture.colorSpace = NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const hash = (x: number, y: number, k: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453;
  return n - Math.floor(n);
};

/** A wrapping pattern of cells: each pixel asks for its nearest cell and how far it is from the joint. */
function cellPattern(n: number) {
  const px = new Float32Array(n * n);
  const py = new Float32Array(n * n);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      px[y * n + x] = hash(x, y, 1);
      py[y * n + x] = hash(x, y, 2);
    }
  }
  const found = { id: 0, gap: 0 };
  return (u: number, v: number) => {
    const x = u * n;
    const y = v * n;
    const cx = Math.floor(x);
    const cy = Math.floor(y);
    let first = 9;
    let second = 9;
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        const id = ((cy + j + n) % n) * n + ((cx + i + n) % n);
        const dx = cx + i + px[id] - x;
        const dy = cy + j + py[id] - y;
        const d = dx * dx + dy * dy;
        if (d < first) {
          second = first;
          first = d;
          found.id = id;
        } else if (d < second) second = d;
      }
    }
    found.gap = Math.sqrt(second) - Math.sqrt(first);
    return found;
  };
}

/** Small lapis tiles baked once (red shade, green distance from the joint, blue the larger piece a shape is cut into, alpha pyrite flecks). */
function tileTexture() {
  if (tiles) return tiles;
  const size = 768;
  const count = 100;
  const fine = cellPattern(count);
  const coarse = cellPattern(22);
  const shade = new Uint8Array(count * count);
  const fleck = new Uint8Array(count * count);
  for (let i = 0; i < shade.length; i++) {
    shade[i] = hash(i, 0, 3) * 255;
    fleck[i] = hash(i, 0, 5) > 0.992 ? 255 : 0;
  }
  const piece = new Uint8Array(22 * 22).map((_, i) => hash(i, 0, 4) * 255);
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const tile = fine(u, v);
      const i = (y * size + x) * 4;
      data[i] = shade[tile.id];
      data[i + 1] = Math.min(tile.gap * 2, 1) * 255;
      data[i + 3] = fleck[tile.id];
      data[i + 2] = piece[coarse(u, v).id];
    }
  }
  tiles = repeating(data, size);
  return tiles;
}

/** Shell and stone baked once (red broad tone, green veins, blue fine grain). */
function stoneTexture() {
  if (stone) return stone;
  const size = 512;
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
      const broad = value(u, v, 7, 7, 1) * 0.6 + value(u, v, 14, 14, 2) * 0.4;
      const vein = value(u, v, 16, 70, 3) * 0.6 + value(u, v, 32, 140, 4) * 0.4;
      const i = (y * size + x) * 4;
      data[i] = broad * 255;
      data[i + 1] = Math.min(Math.abs(vein - 0.5) * 5, 1) * 255;
      data[i + 2] = value(u, v, 160, 160, 5) * 255;
      data[i + 3] = 255;
    }
  }
  stone = repeating(data, size);
  return stone;
}

function inlayMaterial(art: Texture) {
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
      uTiles: { value: tileTexture() },
      uStone: { value: stoneTexture() },
      uUnits: { value: [1, 1] },
      uEdge: { value: [0.001, 0.002] },
      uFade: { value: 0 },
      uLod: { value: 0 },
      uFloor: { value: 0.34 },
      uPan: { value: 0 },
    },
  });
}

interface LapisPanelProps {
  /** Draws the shell pieces for scene time `t`; `clock` keeps running through a hold. */
  paint: (t: number, clock: number) => void;
  period: number;
  mobile: boolean;
  effects: boolean;
  /** Stops the loop here and stays, for the hero. */
  hold?: number;
  /** CSS pixels kept clear below the register for the hero's title block. */
  reserve?: number;
  /** Logical height to keep in view above FLOOR. */
  reach?: number;
  /** Logical x held at the centre of the view. */
  focus?: number;
  phoneFocus?: number;
  /** On phones, a closer view that travels along the scene. */
  route?: Route;
  phoneReach?: number;
  pointer?: RefObject<PointerState>;
}

/** Shell and carnelian set into lapis tiles in bitumen: red picks the stone, green is carnelian and blue is gold. */
export function LapisPanel({
  paint,
  period,
  mobile,
  effects,
  hold,
  reserve,
  reach = 540,
  focus = ART_WIDTH / 2,
  phoneFocus = focus,
  route,
  phoneReach = 340,
}: LapisPanelProps) {
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
  const material = useMemo(() => inlayMaterial(art.texture), [art]);

  const floorAt = reserve
    ? Math.max(0.3, 1 - reserve / Math.max(size.height, 1))
    : mobile
      ? FLOOR_MOBILE
      : FLOOR_WIDE;
  const land = floorAt * height;
  const travelling = mobile && route !== undefined;
  const scale = Math.max(
    width / ART_WIDTH,
    land / (travelling ? phoneReach : reach),
  );
  const travel = travelling ? ART_WIDTH - width / scale : 0;
  const close = travel > 0;
  const left = close ? 0 : width / 2 - (mobile ? phoneFocus : focus) * scale;
  const top = land - FLOOR * scale;

  useEffect(
    () => () => {
      art.texture.dispose();
      material.dispose();
    },
    [art, material],
  );

  const painted = useRef(-1);

  useSceneTime((t) => {
    const p = hold === undefined ? t % period : Math.min(t, hold);
    const fade =
      hold === undefined
        ? smoothstep(0, 1.6, p) * (1 - smoothstep(period - 1.8, period, p))
        : smoothstep(0, 1.4, t);
    const moved = close && route ? along(route, p) * travel : 0;
    const unit = 900 * scale;
    setUniform(material, "uFade", fade);
    setUniform(material, "uLod", Math.log2(height / BASE_HEIGHT));
    setUniform(material, "uFloor", 1 - floorAt);
    setUniform(material, "uPan", moved / 900);
    setVector(material, "uUnits", width / unit, height / unit);
    setVector(material, "uEdge", (1.9 * scale) / width, (1.9 * scale) / height);

    if (!STILL && painted.current >= 0 && t - painted.current < PAINT_STEP)
      return;
    painted.current = t;
    bindArt(art.ctx);
    clearGround(width, height);
    art.ctx.setTransform(scale, 0, 0, scale, left - moved * scale, top);
    paint(p, t);
    touch(art.texture);
  });

  return (
    <>
      <mesh material={material} frustumCulled={false} renderOrder={-10}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {effects && (
        <SceneEffects bloom={0.12} threshold={0.96} vignette={0.24} />
      )}
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
