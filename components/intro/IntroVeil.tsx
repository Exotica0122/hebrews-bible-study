"use client";

import { useEffect, useState } from "react";
import { INTRO_COOKIE, setCookie } from "@/lib/cookies";
import { useLang } from "@/lib/lang";
import { CssStarfield } from "@/components/scenes/fallback/CssStarfield";
import s from "./intro.module.css";

const PLAY_MS = 2200;
const EXIT_MS = 600;

/** First-visit veil: a gold rule draws across the night, the illuminated H ignites, then the page is revealed. */
export function IntroVeil() {
  const { t } = useLang();
  const [phase, setPhase] = useState<"play" | "exit" | "done">("play");

  useEffect(() => {
    setCookie(INTRO_COOKIE, "1");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.location.hash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setPhase("exit"), PLAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => setPhase("done"), EXIT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const skip = () => setPhase("exit");
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [phase]);

  if (phase === "done") return null;
  return (
    <div
      data-intro=""
      aria-hidden="true"
      className={`${s.veil} ${phase === "exit" ? s.exit : ""}`}
      onClick={() => setPhase("exit")}
    >
      <CssStarfield opacity={0.7} />
      <div className={s.stage}>
        <span className={`${s.rule} ${s.ruleLeft}`} />
        <span className={s.tile}>
          <span className={s.tileInner} />
          <span className={s.letter}>H</span>
          <span className={s.glow} />
        </span>
        <span className={`${s.rule} ${s.ruleRight}`} />
      </div>
      <div className={s.eyebrow}>{t.introEyebrow}</div>
    </div>
  );
}
