"use client";

import type { Chip } from "@/content/types";
import { useLang } from "@/lib/lang";
import s from "./movement.module.css";

interface ThreadsProps {
  chips: Chip[];
  openId: string | null;
  onToggle: (id: string) => void;
}

export function Threads({ chips, openId, onToggle }: ThreadsProps) {
  const { lang, t } = useLang();
  const open = chips.find((c) => c.id === openId);
  return (
    <div className={s.threads}>
      <div className="hb-eyebrow">{t.threads}</div>
      <div className={s.chips}>
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            className={s.chip}
            aria-expanded={openId === c.id}
            onClick={() => onToggle(c.id)}
          >
            <span className={s.chipTag}>{c.tag}</span>
            {c[lang]}
          </button>
        ))}
      </div>
      {open && (
        <div className={s.chipPanel}>
          <div className={`hb-eyebrow ${s.chipLabel}`}>{open[lang]}</div>
          <p className={s.chipText}>“{lang === "ko" ? open.tko : open.ten}”</p>
          <p className={s.chipWhy}>{lang === "ko" ? open.wko : open.wen}</p>
        </div>
      )}
    </div>
  );
}
