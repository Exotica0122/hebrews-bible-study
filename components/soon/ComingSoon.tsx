"use client";

import Link from "next/link";
import { CHAPTER_COUNT, LATEST_LIVE } from "@/content/hebrews";
import { Header, chapterHref } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { BookIndex } from "@/components/book/BookIndex";
import { DoubleFrame } from "@/components/ornaments/Ornaments";
import { CssStarfield } from "@/components/scenes/fallback/CssStarfield";
import { useLang } from "@/lib/lang";
import s from "./soon.module.css";

export function ComingSoon({ chapter }: { chapter: number }) {
  const { lang, t } = useLang();
  const bookName = (n: number) => (lang === "ko" ? `히브리서 ${n}장` : `Hebrews ${n}`);
  return (
    <>
      <Header chapter={chapter} activeLabel={t.comingSoon} />
      <main>
        <section aria-label={bookName(chapter)} className={s.section}>
          <CssStarfield opacity={0.6} second={false} />
          <DoubleFrame />
          <div className={s.inner}>
            <div aria-hidden="true" className={s.point}>
              <div className={s.halo} />
              <div className={s.ring} />
            </div>
            <div className={`hb-eyebrow ${s.eyebrow}`}>{t.soonEyebrow}</div>
            <h1 className={s.title}>{bookName(chapter)}</h1>
            <p className={s.body}>{t.soonBody}</p>
            <div className={s.parts}>
              {t.soonParts.map((p) => (
                <div key={p.k} className={s.part}>
                  <span className={s.partKey}>{p.k}</span>
                  <span className={s.partTitle}>{p.t}</span>
                </div>
              ))}
            </div>
            <div className={s.actions}>
              {chapter - 1 > LATEST_LIVE && (
                <Link href={chapterHref(chapter - 1)} className={`hb-btn hb-btn-outline ${s.link} ${s.prevNext}`}>
                  ← {bookName(chapter - 1)}
                </Link>
              )}
              <Link href={chapterHref(LATEST_LIVE)} className={`hb-btn hb-btn-gold ${s.link} ${s.back}`}>{t.backTo(bookName(LATEST_LIVE))}</Link>
              {chapter < CHAPTER_COUNT && (
                <Link href={chapterHref(chapter + 1)} className={`hb-btn hb-btn-outline ${s.link} ${s.prevNext}`}>
                  {bookName(chapter + 1)} →
                </Link>
              )}
            </div>
          </div>
        </section>
        <BookIndex current={chapter} />
      </main>
      <Footer />
    </>
  );
}
