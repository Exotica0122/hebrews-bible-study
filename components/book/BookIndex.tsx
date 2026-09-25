"use client";

import Link from "next/link";
import { CHAPTER_COUNT, isLive } from "@/content/hebrews";
import { chapterHref } from "@/components/chrome/Header";
import { useLang } from "@/lib/lang";
import s from "./book.module.css";

interface BookIndexProps {
  current: number;
  liveSubtitle?: string;
}

export function BookIndex({ current, liveSubtitle }: BookIndexProps) {
  const { lang, t } = useLang();
  const bookName = (n: number) => (lang === "ko" ? `히브리서 ${n}장` : `Hebrews ${n}`);
  return (
    <section id="hb-book" className="hb-section">
      <div className={`hb-container ${s.inner}`}>
        <div className={s.head}>
          <div className={s.copy}>
            <div className="hb-eyebrow">{t.bookEyebrow}</div>
            <h2 className={`hb-h2 ${s.title}`}>{t.bookTitle}</h2>
            <p className={s.intro}>{t.bookIntro}</p>
          </div>
          <div className={s.legend}>
            <span><span className={s.swatchLive} />{t.studying}</span>
            <span><span className={s.swatchSoon} />{t.comingSoon}</span>
          </div>
        </div>
        <div className={s.grid}>
          {Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1).map((n) => {
            const live = isLive(n);
            const cls = live ? s.live : n === current ? s.viewing : s.soon;
            return (
              <Link
                key={n}
                href={chapterHref(n)}
                className={`${s.tile} ${cls}`}
                aria-label={live ? undefined : `${bookName(n)} · ${t.comingSoon}`}
              >
                <span className={s.num}>{n}</span>
                <span className={s.status}>{live ? t.studying : t.comingSoon}</span>
                {live && liveSubtitle && <span className={s.sub}>{liveSubtitle}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
