"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  CHAPTER_COUNT,
  LIVE_COUNT,
  chapterTitle,
  isLive,
} from "@/content/hebrews";
import { QUIZ_COUNTS, hasQuiz } from "@/content/quiz";
import type { Lang } from "@/content/types";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { MasteryBar } from "@/components/quiz/MasteryBar";
import { chapterHref, QUIZ_HREF } from "@/lib/chapters";
import { useLang } from "@/lib/lang";
import { useLastRead } from "@/lib/lastRead";
import { knownIn, useQuizProgress } from "@/lib/quizProgress";
import { HomeStage } from "./HomeStage";
import s from "./home.module.css";

interface HomePageProps {
  /** Hebrews 1:1–2 in both languages, from chapter 1's own copy. */
  verse: Record<Lang, { text: string; ref: string }>;
}

export function HomePage({ verse }: HomePageProps) {
  const { lang, t } = useLang();
  const lastRead = useLastRead();
  const progress = useQuizProgress();
  const heroRef = useRef<HTMLElement>(null);

  const reading =
    lastRead && isLive(lastRead.chapter) ? lastRead.chapter : null;
  const readHref =
    reading === null
      ? chapterHref(1)
      : chapterHref(reading) +
        (lastRead && lastRead.section !== "hb-top"
          ? `#${lastRead.section}`
          : "");
  const readChapter = reading ?? 1;

  const quizSub = progress.last
    ? t.quizLast(
        progress.last.score,
        progress.last.total,
        progress.missed.length,
      )
    : t.quizNew;

  return (
    <>
      <Header />
      <main>
        <section
          id="hb-top"
          ref={heroRef}
          className={s.hero}
          aria-labelledby="hb-home-title"
        >
          <HomeStage hostRef={heroRef} />
          <div className={`hb-container ${s.heroInner}`}>
            <div className={`hb-eyebrow ${s.heroEyebrow}`}>
              {t.introEyebrow}
            </div>
            <h1 id="hb-home-title" className={s.heroTitle}>
              {t.brand}
            </h1>
            <blockquote className={s.verse}>
              <p>{verse[lang].text}</p>
              <cite>{verse[lang].ref}</cite>
            </blockquote>
          </div>
        </section>

        <section className={s.paths} aria-label={t.home}>
          <div className={`hb-container ${s.pathsInner}`}>
            <p className={s.lede}>{t.homeLede}</p>
            <div className={s.pathGrid}>
              <Link href={readHref} className={`${s.path} ${s.pathRead}`}>
                <span className={s.pathKicker}>
                  {reading === null ? t.startReading : t.continueReading}
                </span>
                <span className={s.pathTitle}>
                  {t.chapterName(readChapter)}
                </span>
                <span className={s.pathSub}>
                  {chapterTitle(readChapter, lang)}
                </span>
                <span aria-hidden="true" className={s.pathArrow}>
                  →
                </span>
              </Link>
              <Link href={QUIZ_HREF} className={`${s.path} ${s.pathQuiz}`}>
                <span className={s.pathKicker}>{t.practice}</span>
                <span className={s.pathTitle}>{t.takeQuiz}</span>
                <span className={s.pathSub}>{quizSub}</span>
                <span aria-hidden="true" className={s.pathArrow}>
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="hb-book"
          className="hb-section"
          aria-labelledby="hb-home-chapters"
        >
          <div className={`hb-container ${s.chaptersInner}`}>
            <div className={s.chaptersHead}>
              <h2 id="hb-home-chapters" className="hb-h2">
                {t.chaptersTitle}
              </h2>
              <span className={s.chaptersCount}>{t.chLegend(LIVE_COUNT)}</span>
            </div>
            <ol className={s.grid}>
              {Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1).map(
                (n) => {
                  const title = chapterTitle(n, lang);
                  if (!isLive(n))
                    return (
                      <li key={n}>
                        <Link
                          href={chapterHref(n)}
                          className={`${s.tile} ${s.tileSoon}`}
                          aria-label={`${t.chapterName(n)} · ${t.comingSoon}`}
                        >
                          <span className={s.tileNum}>{n}</span>
                          <span className={s.tileTitle}>{t.comingSoon}</span>
                        </Link>
                      </li>
                    );
                  const total = hasQuiz(n) ? QUIZ_COUNTS[n] : 0;
                  const known = knownIn(progress, n);
                  return (
                    <li key={n}>
                      <Link href={chapterHref(n)} className={s.tile}>
                        <span className={s.tileNum}>
                          <span className="hb-sr">{t.chapterName(n)} · </span>
                          {n}
                        </span>
                        <span className={s.tileTitle}>{title}</span>
                        {total > 0 && (
                          <span className={s.tileBar}>
                            <MasteryBar
                              known={known}
                              total={total}
                              label={t.mastery(known, total)}
                            />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                },
              )}
            </ol>
            <p className={s.key}>
              <span aria-hidden="true" className={s.keyBar}>
                <MasteryBar known={3} total={9} label="" />
              </span>
              <span>{t.masteryKey}</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
