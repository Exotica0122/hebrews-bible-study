"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  QUIZ_CHAPTERS,
  chapterOf,
  getQuizzes,
  type QuizQuestion,
} from "@/content/quiz";
import { CHAPTER_COUNT } from "@/content/hebrews";
import type { Lang } from "@/content/types";
import type { UiStrings } from "@/content/ui";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { useLang } from "@/lib/lang";
import { saveRound, useQuizProgress } from "@/lib/quizProgress";
import {
  ROUND_LENGTHS,
  buildRound,
  correctIndex,
  isCorrect,
  type RoundItem,
  type RoundLength,
} from "@/lib/quizRound";
import s from "./quiz.module.css";

type Mode = "new" | "review";
type Phase = "setup" | "loading" | "play" | "results";

interface SavedRound {
  path: string;
  mode: Mode;
  phase: "play" | "results";
  items: { id: string; order: number[] }[];
  answers: number[];
  index: number;
}

/** The round in progress survives a trip to read the passage and back. */
const SESSION_KEY = "hb-quiz-round";

function readSaved(path: string): SavedRound | null {
  try {
    const v = JSON.parse(
      window.sessionStorage.getItem(SESSION_KEY) ?? "null",
    ) as SavedRound | null;
    return v && v.path === path && Array.isArray(v.items) ? v : null;
  } catch {
    return null;
  }
}

function writeSaved(v: SavedRound | null) {
  try {
    if (v) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(v));
    else window.sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

function answerLabel(item: RoundItem, i: number, lang: Lang, t: UiStrings) {
  const q = item.question;
  if (q.kind === "choice") return q[lang].options[i];
  if (q.kind === "which") return t.chapterName(q.chapters[i]);
  return i === 0 ? t.trueLabel : t.falseLabel;
}

function rightAnswer(item: RoundItem, lang: Lang, t: UiStrings) {
  return answerLabel(item, correctIndex(item.question), lang, t);
}

function readHref(q: QuizQuestion) {
  return `/${chapterOf(q.id)}#hb-${q.mid}`;
}

function verseRef(q: QuizQuestion, t: UiStrings) {
  return t.verseRef(chapterOf(q.id), q.verses);
}

interface QuizPageProps {
  /** Set on /quiz/<n>: start a round on that chapter straight away. */
  chapter?: number;
}

export function QuizPage({ chapter }: QuizPageProps) {
  const { lang, t } = useLang();
  const progress = useQuizProgress();
  const path = chapter ? `/quiz/${chapter}` : "/quiz";

  const [phase, setPhase] = useState<Phase>(chapter ? "loading" : "setup");
  const [mode, setMode] = useState<Mode>("new");
  const [picked, setPicked] = useState<number[]>(
    chapter ? [chapter] : [...QUIZ_CHAPTERS],
  );
  const [length, setLength] = useState<RoundLength>(5);
  const [items, setItems] = useState<RoundItem[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const missed = progress.missed;

  const start = useCallback(
    async (
      nextMode: Mode,
      chapters: number[],
      len: number,
      only?: string[],
    ) => {
      setPhase("loading");
      setMode(nextMode);
      const missedNow = new Set(only ?? missed);
      const pool =
        nextMode === "review"
          ? (
              await getQuizzes([...new Set([...missedNow].map(chapterOf))])
            ).filter((q) => missedNow.has(q.id))
          : await getQuizzes(chapters);
      const round = buildRound(
        pool,
        nextMode === "review" ? Math.min(pool.length, 10) : len,
      );
      setItems(round);
      setAnswers([]);
      setIndex(0);
      setOpen(null);
      setPhase(round.length ? "play" : "setup");
    },
    [missed],
  );

  // On load: resume a round left to read a passage, or start /quiz/<n>.
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const saved = readSaved(path);
    if (saved) {
      void (async () => {
        const ids = saved.items.map((i) => i.id);
        const pool = await getQuizzes([...new Set(ids.map(chapterOf))]);
        const byId = new Map(pool.map((q) => [q.id, q]));
        const restored = saved.items.flatMap((i) => {
          const q = byId.get(i.id);
          return q ? [{ question: q, order: i.order }] : [];
        });
        if (restored.length !== saved.items.length) {
          writeSaved(null);
          if (chapter) void start("new", [chapter], 5);
          else setPhase("setup");
          return;
        }
        setMode(saved.mode);
        setItems(restored);
        setAnswers(saved.answers);
        setIndex(saved.index);
        setPhase(saved.phase);
      })();
    } else if (chapter) {
      // Deferred so the first paint is the "preparing" state, not a cascade.
      queueMicrotask(() => void start("new", [chapter], 5));
    }
  }, [path, chapter, start]);

  useEffect(() => {
    if (phase === "play" || phase === "results") {
      writeSaved({
        path,
        mode,
        phase,
        items: items.map((i) => ({ id: i.question.id, order: i.order })),
        answers,
        index,
      });
    }
  }, [path, mode, phase, items, answers, index]);

  // Move focus with the reader: to each new question, then to "Next".
  useEffect(() => {
    if (phase === "play" && answers[index] === undefined)
      headingRef.current?.focus({ preventScroll: true });
  }, [phase, index, answers]);

  const answered = answers[index] !== undefined;
  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: true });
  }, [answered]);

  const choose = (i: number) => {
    if (answers[index] !== undefined) return;
    const next = [...answers];
    next[index] = i;
    setAnswers(next);
  };

  const finish = () => {
    saveRound(
      items.map((item, i) => ({
        id: item.question.id,
        correct: isCorrect(item, answers[i]),
      })),
    );
    const firstMiss = items.findIndex(
      (item, i) => !isCorrect(item, answers[i]),
    );
    setOpen(firstMiss === -1 ? null : firstMiss);
    setPhase("results");
    window.scrollTo({ top: 0 });
  };

  const next = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      window.scrollTo({ top: 0 });
    } else finish();
  };

  const backToSetup = (nextMode: Mode = "new") => {
    writeSaved(null);
    setMode(nextMode);
    setItems([]);
    setAnswers([]);
    setIndex(0);
    setPhase("setup");
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Header chapter={chapter} />
      <main className={s.main}>
        <div className={s.column}>
          {phase === "loading" && (
            <p className={s.loading} role="status">
              {t.preparing}
            </p>
          )}
          {phase === "setup" && (
            <Setup
              t={t}
              mode={mode}
              setMode={setMode}
              picked={picked}
              setPicked={setPicked}
              length={length}
              setLength={setLength}
              missedCount={missed.length}
              onStart={() =>
                void start(
                  mode === "review" && missed.length ? "review" : "new",
                  picked,
                  length,
                )
              }
            />
          )}
          {phase === "play" && items[index] && (
            <Question
              t={t}
              lang={lang}
              item={items[index]}
              index={index}
              items={items}
              answers={answers}
              onChoose={choose}
              onNext={next}
              onEnd={() => backToSetup()}
              headingRef={headingRef}
              nextRef={nextRef}
            />
          )}
          {phase === "results" && (
            <Results
              t={t}
              lang={lang}
              items={items}
              answers={answers}
              open={open}
              setOpen={setOpen}
              onReview={() => {
                writeSaved(null);
                void start(
                  "review",
                  [],
                  10,
                  items
                    .filter((item, i) => !isCorrect(item, answers[i]))
                    .map((item) => item.question.id),
                );
              }}
              onAgain={() => backToSetup("new")}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Setup({
  t,
  mode,
  setMode,
  picked,
  setPicked,
  length,
  setLength,
  missedCount,
  onStart,
}: {
  t: UiStrings;
  mode: Mode;
  setMode: (m: Mode) => void;
  picked: number[];
  setPicked: (p: number[]) => void;
  length: RoundLength;
  setLength: (l: RoundLength) => void;
  missedCount: number;
  onStart: () => void;
}) {
  const review = mode === "review" && missedCount > 0;
  const all = picked.length === QUIZ_CHAPTERS.length;
  const toggle = (n: number) =>
    setPicked(
      picked.includes(n)
        ? picked.filter((p) => p !== n)
        : [...picked, n].sort((a, b) => a - b),
    );
  return (
    <div className={s.setup}>
      <div className={s.intro}>
        <div className="hb-eyebrow">{t.quiz}</div>
        <h1 className={s.title}>{t.quizTitle}</h1>
        <p className={s.lede}>{t.quizLede}</p>
      </div>

      <div className={s.field}>
        <span className={s.label} id="hb-quiz-mode">
          {t.roundLabel}
        </span>
        <div className={s.seg} role="group" aria-labelledby="hb-quiz-mode">
          <button
            type="button"
            aria-pressed={!review}
            onClick={() => setMode("new")}
          >
            <b>{t.newRound}</b>
            <small>{t.newRoundSub}</small>
          </button>
          <button
            type="button"
            aria-pressed={review}
            disabled={missedCount === 0}
            onClick={() => setMode("review")}
          >
            <b>{t.reviewRound}</b>
            <small>{t.reviewSub(missedCount)}</small>
          </button>
        </div>
      </div>

      {review ? (
        <p className={s.lede}>{t.reviewNote}</p>
      ) : (
        <>
          <div className={s.field}>
            <span className={s.label} id="hb-quiz-chapters">
              {t.chaptersLabel(picked.length)}
            </span>
            <div
              className={s.chips}
              role="group"
              aria-labelledby="hb-quiz-chapters"
            >
              {Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1).map(
                (n) => {
                  const live = QUIZ_CHAPTERS.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      className={s.chip}
                      aria-pressed={live ? picked.includes(n) : undefined}
                      aria-label={
                        live
                          ? t.chapterName(n)
                          : `${t.chapterName(n)} · ${t.comingSoon}`
                      }
                      disabled={!live}
                      onClick={() => toggle(n)}
                    >
                      {n}
                    </button>
                  );
                },
              )}
            </div>
            <button
              type="button"
              className={s.textBtn}
              onClick={() => setPicked(all ? [] : [...QUIZ_CHAPTERS])}
            >
              {all ? t.clearAll : t.selectAll}
            </button>
          </div>

          <div className={s.field}>
            <span className={s.label} id="hb-quiz-length">
              {t.lengthLabel}
            </span>
            <div
              className={s.seg}
              role="group"
              aria-labelledby="hb-quiz-length"
            >
              {ROUND_LENGTHS.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={length === n}
                  onClick={() => setLength(n)}
                >
                  <b>{t.lengthOpt(n)}</b>
                  <small>{t.lengthSub(n)}</small>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className={s.actions}>
        <button
          type="button"
          className={`hb-btn hb-btn-gold ${s.primary}`}
          disabled={!review && picked.length === 0}
          onClick={onStart}
        >
          {review ? t.startReview : t.startRound}
        </button>
      </div>
    </div>
  );
}

function Question({
  t,
  lang,
  item,
  index,
  items,
  answers,
  onChoose,
  onNext,
  onEnd,
  headingRef,
  nextRef,
}: {
  t: UiStrings;
  lang: Lang;
  item: RoundItem;
  index: number;
  items: RoundItem[];
  answers: number[];
  onChoose: (i: number) => void;
  onNext: () => void;
  onEnd: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const q = item.question;
  const picked = answers[index];
  const done = picked !== undefined;
  const right = correctIndex(q);
  const ok = picked === right;
  const last = index === items.length - 1;
  return (
    <div className={s.play}>
      <div className={s.playBar}>
        <span className={s.counter}>{t.counter(index + 1, items.length)}</span>
        <button type="button" className={s.textBtn} onClick={onEnd}>
          {t.endRound}
        </button>
      </div>
      <div className={s.progress} aria-hidden="true">
        {items.map((it, i) => {
          const a = answers[i];
          const cls =
            a === undefined
              ? i === index
                ? s.cur
                : ""
              : isCorrect(it, a)
                ? s.ok
                : s.no;
          return <i key={it.question.id} className={cls} />;
        })}
      </div>

      <div className={s.meta}>
        <span className={s.ref}>{verseRef(q, t)}</span>
        <span className={s.kind}>{t.kinds[q.kind]}</span>
      </div>
      <h1 ref={headingRef} tabIndex={-1} className={s.question}>
        {q.kind === "which" ? t.whichPrompt : q[lang].q}
      </h1>
      {q.kind === "which" && <p className={s.quote}>{q[lang].q}</p>}

      <div
        className={`${s.options} ${q.kind === "truefalse" ? s.tf : ""} ${q.kind === "which" ? s.which : ""}`}
      >
        {item.order.map((i, pos) => {
          let cls = s.option;
          if (done) {
            if (i === right) cls += ` ${s.right}`;
            else if (i === picked) cls += ` ${s.wrong}`;
            else cls += ` ${s.dim}`;
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              aria-disabled={done || undefined}
              aria-pressed={done ? i === picked : undefined}
              onClick={() => onChoose(i)}
            >
              {q.kind === "choice" && (
                <span className={s.letter} aria-hidden="true">
                  {"ABCD"[pos]}
                </span>
              )}
              <span>{answerLabel(item, i, lang, t)}</span>
            </button>
          );
        })}
      </div>

      <div role="status" aria-live="polite">
        {done && (
          <div className={s.explain}>
            <p className={`${s.verdict} ${ok ? s.verdictOk : s.verdictNo}`}>
              {ok ? t.correct : t.incorrect}
            </p>
            {!ok && (
              <p className={s.answer}>
                {t.answerIs}: {rightAnswer(item, lang, t)}
              </p>
            )}
            <p className={s.why}>{q[lang].why}</p>
            <Link href={readHref(q)} className={s.read}>
              {t.readPassage(verseRef(q, t))} →
            </Link>
          </div>
        )}
      </div>

      {done && (
        <div className={s.actions}>
          <button
            ref={nextRef}
            type="button"
            className={`hb-btn hb-btn-gold ${s.primary}`}
            onClick={onNext}
          >
            {last ? t.seeResults : t.nextQuestion}
          </button>
        </div>
      )}
    </div>
  );
}

function Results({
  t,
  lang,
  items,
  answers,
  open,
  setOpen,
  onReview,
  onAgain,
}: {
  t: UiStrings;
  lang: Lang;
  items: RoundItem[];
  answers: number[];
  open: number | null;
  setOpen: (i: number | null) => void;
  onReview: () => void;
  onAgain: () => void;
}) {
  const score = items.filter((item, i) => isCorrect(item, answers[i])).length;
  const missedNow = items.length - score;
  return (
    <div className={s.results}>
      <div className={s.score}>
        <div className="hb-eyebrow">{t.resultsEyebrow}</div>
        <h1 className={s.big}>
          {score}
          <small> / {items.length}</small>
        </h1>
        <p className={s.lede}>{t.resultMsg(score, items.length)}</p>
      </div>

      <div className={s.field}>
        <span className={s.label}>{t.tapToSee}</span>
        <ul className={s.review}>
          {items.map((item, i) => {
            const q = item.question;
            const ok = isCorrect(item, answers[i]);
            const isOpen = open === i;
            const panel = `hb-quiz-why-${i}`;
            return (
              <li key={q.id} className={s.row}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={`${s.mark} ${ok ? s.markOk : s.markNo}`}>
                    <span aria-hidden="true">{ok ? "✓" : "✕"}</span>
                    <span className="hb-sr">
                      {ok ? t.markRight : t.markWrong}
                    </span>
                  </span>
                  <span className={s.rowQ}>
                    {q.kind === "which"
                      ? `${t.whichPrompt} ${q[lang].q}`
                      : q[lang].q}
                  </span>
                  <span className={s.rowRef}>{verseRef(q, t)}</span>
                </button>
                {isOpen && (
                  <div id={panel} className={s.rowWhy}>
                    <p className={s.answer}>
                      {t.answerIs}: {rightAnswer(item, lang, t)}
                    </p>
                    <p className={s.why}>{q[lang].why}</p>
                    <Link href={readHref(q)} className={s.read}>
                      {t.readPassage(verseRef(q, t))} →
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={s.actions}>
        {missedNow > 0 && (
          <button
            type="button"
            className={`hb-btn hb-btn-gold ${s.primary}`}
            onClick={onReview}
          >
            {t.reviewMissed(missedNow)}
          </button>
        )}
        <button
          type="button"
          className={`hb-btn ${missedNow > 0 ? s.ghost : "hb-btn-gold"} ${s.primary}`}
          onClick={onAgain}
        >
          {t.anotherRound}
        </button>
      </div>
    </div>
  );
}
