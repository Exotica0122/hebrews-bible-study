"use client";

import type { Summary as SummaryData } from "@/content/types";
import { useLang } from "@/lib/lang";
import s from "./summary.module.css";

export function Summary({
  summary,
  title,
}: {
  summary: SummaryData;
  title: string;
}) {
  const { t } = useLang();
  return (
    <section id="hb-summary" className={s.section}>
      <div className={`hb-container ${s.inner}`}>
        <div className="hb-eyebrow">{t.summaryEyebrow}</div>
        <h2 className={`hb-h2 ${s.title}`}>{title}</h2>
        <div className={s.grid}>
          {summary.groups.map((g, gi) => (
            <div key={g.h}>
              <h3 className={s.groupTitle}>{g.h}</h3>
              {g.items.map(([v, text], ii) => (
                <div
                  key={v}
                  id={`hb-s-${gi}-${ii}`}
                  className={`${s.item} hb-anchor`}
                >
                  <span className={s.itemRef}>{v}</span>
                  <span className={s.itemText}>{text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={s.intent}>
          <div className="hb-eyebrow">{summary.intentH}</div>
          {summary.intent.map((p, i) => (
            <p key={p} id={`hb-s-i-${i}`} className={`${s.intentP} hb-anchor`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
