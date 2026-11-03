import type {
  Color,
  Material,
  MeshStandardMaterial,
  ShaderMaterial,
  ShadowMapType,
  Texture,
  WebGLRenderer,
} from "three";

// Frame-loop writes to memoised three.js objects go through these so the React Compiler lint allows them.

export function setOpacity(material: Material, opacity: number) {
  material.opacity = opacity;
}

export function touch(texture: Texture) {
  texture.needsUpdate = true;
}

export function setUniform(
  material: ShaderMaterial,
  name: string,
  value: number,
) {
  material.uniforms[name].value = value;
}

export function setEmissive(material: MeshStandardMaterial, intensity: number) {
  material.emissiveIntensity = intensity;
}

export function lerpColor(
  material: MeshStandardMaterial,
  from: Color,
  to: Color,
  t: number,
) {
  material.color.lerpColors(from, to, t);
}

export function copyInto(target: number[], from: readonly number[]) {
  for (let i = 0; i < from.length && i < target.length; i++)
    target[i] = from[i];
}

export function setShadowMap(
  gl: WebGLRenderer,
  enabled: boolean,
  type?: ShadowMapType,
) {
  gl.shadowMap.enabled = enabled;
  if (type !== undefined) gl.shadowMap.type = type;
}
