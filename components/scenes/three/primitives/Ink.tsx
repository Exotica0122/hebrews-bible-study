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
import { bindArt, clearPaper, FLOOR } from "./inkArt";
import { setUniform, touch } from "./mutate";
import { along, type Route } from "./route";
import { SceneEffects } from "./SceneEffects";
import { smoothstep, STILL, useSceneTime } from "./Timeline";

export const INK = {
  paper: "#EBE2CC",
  ink: "#17161A",
  vermilion: "#BD2C17",
};

const FLOOR_WIDE = 0.66;
const FLOOR_MOBILE = 0.52;
const ART_WIDTH = 1600;
const PAINT_STEP = 1 / 30;
const MAX_ART = 1600;
const BASE_HEIGHT = 576;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uArt, uPaper;
  uniform vec2 uUnits;
  uniform float uFade, uLod, uFloor, uPan;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * uUnits + vec2(uPan, 0.0);
    vec4 sheet = texture2D(uPaper, p * 1.3);
    vec4 fine = texture2D(uPaper, p * 1.5 + 0.37);
    vec4 cloud = texture2D(uPaper, p.yx * 0.83 + 0.11);
    float tooth = texture2D(uPaper, p * 6.7 + 0.19).b;
    vec3 c = vec3(0.92, 0.885, 0.8) * (0.945 + 0.08 * sheet.r + 0.03 * sheet.g);

    vec2 wander = vec2(fine.a, sheet.a) - 0.5;
    vec4 a = textureLod(uArt, vUv + wander * 0.012, uLod + 0.6);
    float wash = textureLod(uArt, vUv + wander * 0.03, uLod + 2.8).r;
    float bleed = smoothstep(0.04, 0.4, a.r + fine.b * 0.1 - 0.05);
    float ink = max(a.r * bleed, wash * 0.55);
    ink *= 1.0 + (1.0 - ink) * ((fine.b - 0.5) * 0.3 + (tooth - 0.5) * 0.24);
    ink = pow(clamp(ink, 0.0, 1.0), 1.25) * 1.12;

    // The pooled wash below the land carries the page's pale type.
    float at = (uFloor - vUv.y) * uUnits.y;
    float pool = smoothstep(-0.05, 0.05, at + (cloud.g - 0.5) * 0.09 + 0.012 * sin(p.x * 4.0));
    ink = mix(ink, max(ink, 0.96 * (0.86 + 0.14 * sheet.g + 0.1 * cloud.g)), pool);

    ink *= smoothstep(1.0 - uFade, 1.1 - uFade * 0.4 + 0.01, sheet.g + ink * 0.4 + 0.2);

    float light = smoothstep(0.05, 0.5, max(textureLod(uArt, vUv, uLod + 1.2).b, textureLod(uArt, vUv, uLod).b));
    float fire = smoothstep(0.3, 0.6, a.g) * smoothstep(0.2, 0.5, a.b) * uFade * (1.0 - pool);
    ink *= 1.0 - light * (1.0 - fire) * (1.0 - pool);
    c = mix(c, vec3(0.09, 0.085, 0.1), clamp(ink, 0.0, 0.97));
    c = mix(c, c * vec3(1.0, 0.86, 0.66), a.g * (1.0 - fire) * 0.5 * uFade * (1.0 - pool));
    c = mix(c, vec3(0.74, 0.17, 0.09) * (0.82 + 0.3 * fine.b), fire);

    vec2 stamp = (vec2(vUv.x * uUnits.x, vUv.y * uUnits.y) - vec2(uUnits.x - 0.12, uUnits.y - 0.16)) / 0.03;
    float seal = step(abs(stamp.x), 1.0) * step(abs(stamp.y), 1.0) * step(0.26, tooth);
    seal *= 1.0 - step(abs(stamp.x), 0.8) * step(abs(stamp.y), 0.8)
      * (1.0 - step(abs(stamp.x), 0.68) * step(abs(stamp.y), 0.68));
    c = mix(c, vec3(0.68, 0.13, 0.09), seal * 0.9 * uFade);

    gl_FragColor = vec4(pow(clamp(c, 0.0, 1.0), vec3(2.2)), 1.0);
    #include <colorspace_fragment>
  }`;

let paper: DataTexture | null = null;

/** Hanji baked once into a tiling map (red fibre, green broad tone, blue granulation, alpha drift), so phones do not pay for noise per pixel. */
function paperTexture() {
  if (paper) return paper;
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
  const octaves = (u: number, v: number, base: number, k: number) =>
    value(u, v, base, base, k) * 0.5 +
    value(u, v, base * 2, base * 2, k + 1) * 0.3 +
    value(u, v, base * 4, base * 4, k + 2) * 0.2;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const i = (y * size + x) * 4;
      data[i] =
        (value(u, v, 18, 240, 1) * 0.5 + value(u, v, 240, 18, 2) * 0.5) * 255;
      data[i + 1] = octaves(u, v, 4, 3) * 255;
      data[i + 2] = octaves(u, v, 60, 6) * 255;
      data[i + 3] = octaves(u, v, 11, 9) * 255;
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
  paper = texture;
  return texture;
}

function inkMaterial(art: Texture) {
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
      uPaper: { value: paperTexture() },
      uUnits: { value: [1, 1] },
      uFade: { value: 0 },
      uLod: { value: 0 },
      uFloor: { value: 0.34 },
      uPan: { value: 0 },
    },
  });
}

interface InkWashProps {
  /** Draws the wash for scene time `t`; `clock` keeps running through a hold. */
  paint: (t: number, clock: number) => void;
  period: number;
  mobile: boolean;
  effects: boolean;
  /** Stops the loop here and stays, for the hero. */
  hold?: number;
  /** CSS pixels kept clear below the land for the hero's title block. */
  reserve?: number;
  /** Logical height to keep in view above FLOOR. */
  reach?: number;
  /** Logical width to keep in view. */
  span?: number;
  /** Logical x held at the centre of the view. */
  focus?: number;
  /** On phones, a closer view that travels along the scene. */
  route?: Route;
  phoneReach?: number;
  pointer?: RefObject<PointerState>;
}

/** Sumi ink on hanji: red is ink, green warms it toward earth, blue keeps the paper bare, and blue with green is vermilion. */
export function InkWash({
  paint,
  period,
  mobile,
  effects,
  hold,
  reserve,
  reach = 560,
  span = ART_WIDTH,
  focus = ART_WIDTH / 2,
  route,
  phoneReach = 340,
}: InkWashProps) {
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
  const material = useMemo(() => inkMaterial(art.texture), [art]);

  const floorAt = reserve
    ? Math.max(0.3, 1 - reserve / Math.max(size.height, 1))
    : mobile
      ? FLOOR_MOBILE
      : FLOOR_WIDE;
  const land = floorAt * height;
  const travelling = mobile && route !== undefined;
  const scale = Math.max(
    width / span,
    land / (travelling ? phoneReach : reach),
  );
  const travel = travelling ? ART_WIDTH - width / scale : 0;
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

    if (!STILL && painted.current >= 0 && t - painted.current < PAINT_STEP)
      return;
    painted.current = t;
    bindArt(art.ctx);
    clearPaper(width, height);
    art.ctx.setTransform(scale, 0, 0, scale, left - moved * scale, top);
    paint(p, t);
    touch(art.texture);
  });

  return (
    <>
      <mesh material={material} frustumCulled={false} renderOrder={-10}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {effects && <SceneEffects bloom={0.12} threshold={0.97} vignette={0.2} />}
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
