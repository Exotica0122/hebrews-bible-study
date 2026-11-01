"use client";

import { useState } from "react";
import type { Appendix as AppendixData } from "@/content/types";
import { useLang } from "@/lib/lang";
import { SceneFrame } from "@/components/scenes/SceneFrame";
import s from "./appendix.module.css";

export function Appendix({
  appendix,
  reduceMotion,
}: {
  appendix: AppendixData;
  reduceMotion?: boolean;
}) {
  const { lang, t } = useLang();
  const [picked, setPicked] = useState(appendix.items[0].scene);
  const copy = appendix.copy[lang];
  const item =
    appendix.items.find((i) => i.scene === picked) ?? appendix.items[0];

  return (
    <section
      id="hb-appendix"
      className={s.section}
      aria-labelledby="hb-appendix-title"
    >
      <div className={`hb-container ${s.inner}`}>
        <div className="hb-eyebrow">{copy.eyebrow}</div>
        <h2 id="hb-appendix-title" className={`hb-h2 ${s.title}`}>
          {copy.title}
        </h2>
        <p className={s.intro}>{copy.intro}</p>
        <div className={s.layout}>
          <div className={s.mat}>
            <SceneFrame
              id="appendix"
              scene={item.scene}
              labels={{ loading: t.loading, reduced: t.reduced }}
              reduceMotion={reduceMotion}
              bare
            />
          </div>
          <div>
            <div role="group" aria-label={copy.title} className={s.picker}>
              {appendix.items.map((i) => (
                <button
                  key={i.scene}
                  type="button"
                  data-furnishing={i.scene}
                  aria-pressed={i.scene === item.scene}
                  className={s.pick}
                  onClick={() => setPicked(i.scene)}
                >
                  {i[lang].name}
                </button>
              ))}
            </div>
            <h3 className={s.name}>{item[lang].name}</h3>
            <div className={s.ref}>{item[lang].ref}</div>
            <p className={s.note}>{item[lang].note}</p>
            {item.source && (
              <a
                className={s.link}
                href={item.source}
                target="_blank"
                rel="noreferrer"
              >
                {copy.original}
              </a>
            )}
          </div>
        </div>
        <p className={s.credit}>
          {copy.credit}{" "}
          <a href={appendix.overview} target="_blank" rel="noreferrer">
            {copy.overview}
          </a>
        </p>
      </div>
    </section>
  );
}
