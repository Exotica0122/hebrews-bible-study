import { CssStarfield } from "@/components/scenes/fallback/CssStarfield";
import s from "./home.module.css";

/**
 * Backdrop for the home hero. This is the CSS night sky every chapter falls
 * back to; the home page's own R3F scene replaces it once its direction is
 * chosen, and this stays as that scene's loading and reduced-motion fallback.
 */
export function HomeStage() {
  return (
    <div aria-hidden="true" className={s.stage}>
      <CssStarfield opacity={0.8} />
      <div className={s.stageGlow} />
    </div>
  );
}
