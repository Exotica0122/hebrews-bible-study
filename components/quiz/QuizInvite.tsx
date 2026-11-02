"use client";

import Link from "next/link";
import { QUIZ_COUNTS, hasQuiz } from "@/content/quiz";
import { quizHref } from "@/lib/chapters";
import { useLang } from "@/lib/lang";
import { knownIn, useQuizProgress } from "@/lib/quizProgress";
import { MasteryBar } from "./MasteryBar";
import s from "./invite.module.css";

/** Closes each chapter page with a way into that chapter's quiz. */
export function QuizInvite({ chapter }: { chapter: number }) {
  const { t } = useLang();
  const progress = useQuizProgress();
  if (!hasQuiz(chapter)) return null;
  const total = QUIZ_COUNTS[chapter];
  const known = knownIn(progress, chapter);
  return (
    <section id="hb-quiz" className={s.section} aria-labelledby="hb-quiz-title">
      <div className={`hb-container ${s.inner}`}>
        <div className={s.copy}>
          <div className={`hb-eyebrow ${s.eyebrow}`}>{t.practice}</div>
          <h2 id="hb-quiz-title" className={`hb-h2 ${s.title}`}>
            {t.testYourself(chapter)}
          </h2>
          <p className={s.body}>{t.testYourselfBody}</p>
        </div>
        <div className={s.side}>
          <Link
            href={quizHref(chapter)}
            className={`hb-btn hb-btn-gold ${s.cta}`}
          >
            {t.startQuiz}
          </Link>
          <MasteryBar
            known={known}
            total={total}
            label={t.mastery(known, total)}
            tone="night"
            showLabel
          />
        </div>
      </div>
    </section>
  );
}
