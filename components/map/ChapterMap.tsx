"use client";

import type { ChapterCopy, Movement, Summary } from "@/content/types";
import { Fleuron } from "@/components/ornaments/Ornaments";
import { useLang } from "@/lib/lang";
import s from "./map.module.css";

interface ChapterMapProps {
  copy: ChapterCopy;
  movements: Movement[];
  summary: Summary;
  onGo: (id: string) => void;
}

export function ChapterMap({ copy, movements, summary, onGo }: ChapterMapProps) {
  const { lang, t } = useLang();
  return (
    <section id="hb-map" className="hb-section">
      <div className={`hb-container ${s.inner}`}>
        <div className={s.intro}>
          <div className="hb-eyebrow">{t.mapEyebrow}</div>
          <h2 className="hb-h2">{copy.mapTitle}</h2>
          <p className={s.introText}>{copy.mapIntro}</p>
          <Fleuron variant="rule" />
          <div className="hb-eyebrow">{summary.intentH}</div>
          <p className={s.intent}>{summary.intentShort}</p>
        </div>
        <div className={s.list}>
          {movements.map((m) => {
            const c = m[lang];
            const studyLabel = lang === "ko" ? `${m.range}절 공부하기 →` : `Study vv. ${m.range} →`;
            return (
              <div key={m.id} className={s.row}>
                <div className={s.num}>{m.num}</div>
                <div style={{ minWidth: 0 }}>
                  <button type="button" className={s.title} onClick={() => onGo(m.id)}>{c.title}</button>
                  <div className={s.snips}>
                    {c.verses.map(([n], i) => (
                      <div key={n} className={s.snip}>
                        <span className={s.snipNum}>{n}</span>
                        <span>{c.snips[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="button" className={s.study} onClick={() => onGo(m.id)}>{studyLabel}</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
