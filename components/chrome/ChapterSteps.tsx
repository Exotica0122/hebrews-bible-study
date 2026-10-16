"use client";

import Link from "next/link";
import { chapterTitle, isLive } from "@/content/hebrews";
import { chapterHref } from "@/components/chrome/Header";
import { useLang } from "@/lib/lang";
import s from "./steps.module.css";

interface ChapterStepsProps {
  chapter: number;
  visible: boolean;
}

export function ChapterSteps({ chapter, visible }: ChapterStepsProps) {
  const { lang, t } = useLang();
  const bookName = (n: number) =>
    lang === "ko" ? `히브리서 ${n}장` : `Hebrews ${n}`;

  const step = (n: number, dir: "prev" | "next") => {
    if (!isLive(n)) return null;
    const title = chapterTitle(n, lang);
    const name = `${dir === "prev" ? t.prevChapter : t.nextChapter} · ${bookName(n)}`;
    return (
      <Link
        href={chapterHref(n)}
        className={`${s.step} ${s[dir]}`}
        aria-label={name}
        data-visible={visible}
        tabIndex={visible ? undefined : -1}
      >
        <span aria-hidden="true" className={s.arrow}>
          {dir === "prev" ? "←" : "→"}
        </span>
        <span aria-hidden="true" className={s.label}>
          <span className={s.num}>{bookName(n)}</span>
          {title && <span className={s.title}>{title}</span>}
        </span>
      </Link>
    );
  };

  return (
    <nav aria-label={t.chapters} className={s.nav}>
      {step(chapter - 1, "prev")}
      {step(chapter + 1, "next")}
    </nav>
  );
}
