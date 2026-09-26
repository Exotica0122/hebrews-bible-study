"use client";

import { useEffect, useState } from "react";
import type { Movement } from "@/content/types";
import { useLang } from "@/lib/lang";
import { parseWordHash, resumeKey } from "@/lib/share";
import s from "./resume.module.css";

interface ResumePillProps {
  chapter: number;
  movements: Movement[];
  onGo: (id: string) => void;
}

export function ResumePill({ chapter, movements, onGo }: ResumePillProps) {
  const { lang, t } = useLang();
  const [target, setTarget] = useState<Movement | null>(null);

  useEffect(() => {
    if (window.location.hash && (parseWordHash(window.location.hash) || window.location.hash.startsWith("#hb-"))) return;
    try {
      const stored = window.localStorage.getItem(resumeKey(chapter));
      const m = movements.find((mv) => mv.id === stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (m) setTarget(m);
    } catch {}
  }, [chapter, movements]);

  if (!target) return null;
  return (
    <div className={s.wrap}>
      <a
        href={`#hb-${target.id}`}
        className={s.pill}
        onClick={(e) => {
          e.preventDefault();
          setTarget(null);
          onGo(target.id);
        }}
      >
        <span className={s.label}>{t.resume}</span>
        <span className={s.num}>{target.num}</span>
        <span className={s.title}>{target[lang].title} →</span>
      </a>
      <button type="button" className={s.dismiss} aria-label={t.dismiss} onClick={() => setTarget(null)}>×</button>
    </div>
  );
}
