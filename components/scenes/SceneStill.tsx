import { MOBILE_QUERY } from "@/lib/hooks";
import type { SceneId } from "./types";
import s from "./scene.module.css";

/** A rendered frame of the scene, from e2e/tools/scene-stills.mjs: shown while it loads, under reduced motion and without WebGL. */
export function SceneStill({
  scene,
  priority = false,
}: {
  scene: SceneId;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media={MOBILE_QUERY} srcSet={`/scenes/mobile/${scene}.webp`} />
      <img
        className={s.still}
        src={`/scenes/${scene}.webp`}
        alt=""
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
