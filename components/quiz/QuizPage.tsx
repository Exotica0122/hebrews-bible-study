"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  QUIZ_CHAPTERS,
  QUIZ_COUNTS,
  chapterOf,
  getQuizzes,
  type QuizQuestion,
} from "@/content/quiz";
import { CHAPTER_COUNT, LATEST_LIVE, chapterTitle } from "@/content/hebrews";
import type { Lang } from "@/content/types";
import type { UiStrings } from "@/content/ui";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { useLang } from "@/lib/lang";
import {
  knownIn,
  saveRound,
  useQuizProgress,
  type QuizProgress,
} from "@/lib/quizProgress";
import {
  ROUND_LENGTHS,
  buildRound,
  correctIndex,
  isCorrect,
  whyNot,
  type RoundItem,
  type RoundLength,
} from "@/lib/quizRound";
import s from "./quiz.module.css";

type Mode = "new" | "review";
type Phase = "setup" | "loading" | "play" | "results";
/** A number of questions, or every question in the chosen chapters. */
type Length = RoundLength | "all";

/** Everything needed to build a round again: "Retake this quiz" replays it. */
interface Plan {
  mode: Mode;
  chapters: number[];
  length: Length;
  /** For a review, the exact questions it covers. */
  only?: string[];
}

interface SavedRound {
  path: string;
  plan: Plan;
  basePlan: Plan | null;
  mode: Mode;
  phase: "play" | "results";
  items: { id: string; order: number[] }[];
  answers: number[];
  index: number;
}

/** The round in progress survives a trip to read the passage and back. */
const SESSION_KEY = "hb-quiz-round";
/** Set by a passage link; any other way back to the quiz starts fresh. */
const RESUME_KEY = "hb-quiz-resume";

function markResume() {
  try {
    window.sessionStorage.setItem(RESUME_KEY, "1");
  } catch {}
}

function takeResume(): boolean {
  try {
    const on = window.sessionStorage.getItem(RESUME_KEY) === "1";
    window.sessionStorage.removeItem(RESUME_KEY);
    return on;
  } catch {
    return false;
  }
}

function readSaved(path: string): SavedRound | null {
  if (!takeResume()) {
    writeSaved(null);
    return null;
  }
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
  // A chapter's own quiz takes the whole chapter by default.
  const [length, setLength] = useState<Length>(chapter ? "all" : 5);
  const [plan, setPlan] = useState<Plan | null>(null);
  /** The last chapter round, so a review can still be retaken as the full quiz. */
  const [basePlan, setBasePlan] = useState<Plan | null>(null);
  /** The answer picked but not yet checked. */
  const [selected, setSelected] = useState<number | null>(null);
  const [items, setItems] = useState<RoundItem[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const missed = progress.missed;

  const start = useCallback(
    async (next: Plan) => {
      setPhase("loading");
      setMode(next.mode);
      let pool: QuizQuestion[];
      let only = next.only;
      if (next.mode === "review") {
        const ids = new Set(only ?? missed);
        only = [...ids];
        pool = (await getQuizzes([...new Set(only.map(chapterOf))])).filter(
          (q) => ids.has(q.id),
        );
      } else pool = await getQuizzes(next.chapters);
      const round = buildRound(
        pool,
        next.length === "all" ? pool.length : next.length,
      );
      setPlan({ ...next, only });
      if (next.mode === "new") setBasePlan(next);
      setSelected(null);
      setItems(round);
      setAnswers([]);
      setIndex(0);
      setOpen(null);
      setPhase(round.length ? "play" : "setup");
      window.scrollTo({ top: 0 });
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
          if (chapter)
            void start({ mode: "new", chapters: [chapter], length: "all" });
          else setPhase("setup");
          return;
        }
        setMode(saved.mode);
        setPlan(saved.plan ?? null);
        setBasePlan(saved.basePlan ?? null);
        setItems(restored);
        setAnswers(saved.answers);
        setIndex(saved.index);
        setPhase(saved.phase);
      })();
    } else if (chapter) {
      // Deferred so the first paint is the "preparing" state, not a cascade.
      queueMicrotask(
        () => void start({ mode: "new", chapters: [chapter], length: "all" }),
      );
    } else if (new URLSearchParams(window.location.search).has("quick")) {
      window.history.replaceState(null, "", path);
      queueMicrotask(
        () =>
          void start({ mode: "new", chapters: [...QUIZ_CHAPTERS], length: 5 }),
      );
    }
  }, [path, chapter, start]);

  useEffect(() => {
    if ((phase === "play" || phase === "results") && plan) {
      writeSaved({
        path,
        plan,
        basePlan,
        mode,
        phase,
        items: items.map((i) => ({ id: i.question.id, order: i.order })),
        answers,
        index,
      });
    }
  }, [path, plan, basePlan, mode, phase, items, answers, index]);

  // Move focus with the reader: to each new question, then to "Next".
  useEffect(() => {
    if (phase === "play" && answers[index] === undefined)
      headingRef.current?.focus({ preventScroll: true });
  }, [phase, index, answers]);

  const answered = answers[index] !== undefined;
  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: true });
  }, [answered]);

  const check = () => {
    if (answers[index] !== undefined || selected === null) return;
    const next = [...answers];
    next[index] = selected;
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
      setSelected(null);
      setIndex(index + 1);
      window.scrollTo({ top: 0 });
    } else finish();
  };

  // The key handler reads the latest check/next without re-subscribing.
  const keys = useRef({ check: () => {}, next: () => {} });
  useEffect(() => {
    keys.current = { check, next };
  });
  const optionCount = items[index]?.order.length ?? 0;
  useEffect(() => {
    if (phase !== "play") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [role=dialog]")) return;
      const n = Number(e.key);
      if (!answered && n >= 1 && n <= optionCount) {
        e.preventDefault();
        setSelected(items[index].order[n - 1]);
        return;
      }
      if (e.key !== "Enter") return;
      // Buttons and links other than the answers handle Enter themselves.
      const control = target?.closest("a, button");
      if (control && control.getAttribute("role") !== "radio") return;
      e.preventDefault();
      if (answered) keys.current.next();
      else keys.current.check();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answered, optionCount, items, index]);

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
              progress={progress}
              onStart={(len) =>
                void start(
                  mode === "review" && missed.length
                    ? { mode: "review", chapters: [], length: "all" }
                    : { mode: "new", chapters: picked, length: len },
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
              selected={selected}
              onSelect={setSelected}
              onCheck={check}
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
                void start({
                  mode: "review",
                  chapters: [],
                  length: "all",
                  only: items
                    .filter((item, i) => !isCorrect(item, answers[i]))
                    .map((item) => item.question.id),
                });
              }}
              review={plan?.mode === "review"}
              onRetake={() => {
                writeSaved(null);
                if (plan) void start(plan);
                else backToSetup("new");
              }}
              onRetakeFull={() => {
                writeSaved(null);
                void start(
                  basePlan ?? { mode: "new", chapters: picked, length },
                );
              }}
              onChange={() => backToSetup("new")}
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
  progress,
  onStart,
}: {
  t: UiStrings;
  mode: Mode;
  setMode: (m: Mode) => void;
  picked: number[];
  setPicked: (p: number[]) => void;
  length: Length;
  setLength: (l: Length) => void;
  missedCount: number;
  progress: QuizProgress;
  onStart: (length: Length) => void;
}) {
  const { lang } = useLang();
  const review = mode === "review" && missedCount > 0;
  const pool = picked.reduce((n, c) => n + (QUIZ_COUNTS[c] ?? 0), 0);
  // A length the selection can't fill becomes "all".
  const effective: Length = length !== "all" && length >= pool ? "all" : length;
  const count = effective === "all" ? pool : effective;
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
            <div className={s.fieldHead}>
              <span className={s.label} id="hb-quiz-chapters">
                {t.chaptersLabel(picked.length)}
              </span>
              <span className={s.quick}>
                <button
                  type="button"
                  className={s.textBtn}
                  disabled={picked.length === QUIZ_CHAPTERS.length}
                  onClick={() => setPicked([...QUIZ_CHAPTERS])}
                >
                  {t.selectAll}
                </button>
                <button
                  type="button"
                  className={s.textBtn}
                  disabled={picked.length === 0}
                  onClick={() => setPicked([])}
                >
                  {t.clearAll}
                </button>
              </span>
            </div>
            <div
              className={s.cards}
              role="group"
              aria-labelledby="hb-quiz-chapters"
            >
              {QUIZ_CHAPTERS.map((n) => {
                const on = picked.includes(n);
                const known = knownIn(progress, n);
                return (
                  <button
                    key={n}
                    type="button"
                    className={s.card}
                    aria-pressed={on}
                    onClick={() => toggle(n)}
                  >
                    <span className={s.cardNum}>
                      <span className="hb-sr">{t.chapterName(n)} · </span>
                      {n}
                    </span>
                    <span className={s.check} aria-hidden="true">
                      {on ? "✓" : ""}
                    </span>
                    <span className={s.cardTitle}>{chapterTitle(n, lang)}</span>
                    <span className={s.cardMeta}>
                      {t.chapterQs(QUIZ_COUNTS[n], known)}
                    </span>
                  </button>
                );
              })}
            </div>
            {LATEST_LIVE < CHAPTER_COUNT && (
              <p className={s.note}>
                {t.searchLater(LATEST_LIVE + 1, CHAPTER_COUNT)}
              </p>
            )}
          </div>

          <div className={s.field}>
            <span className={s.label} id="hb-quiz-length">
              {t.lengthLabel}
            </span>
            <div
              className={`${s.seg} ${s.seg3}`}
              role="group"
              aria-labelledby="hb-quiz-length"
            >
              {ROUND_LENGTHS.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={effective === n}
                  disabled={n >= pool}
                  onClick={() => setLength(n)}
                >
                  <b>{t.lengthOpt(n)}</b>
                  <small>{t.lengthSub(n)}</small>
                </button>
              ))}
              <button
                type="button"
                aria-pressed={effective === "all"}
                disabled={pool === 0}
                onClick={() => setLength("all")}
              >
                <b>{t.lengthAll(pool)}</b>
                <small>{t.lengthAllSub}</small>
              </button>
            </div>
          </div>
        </>
      )}

      <div className={`${s.actions} ${s.startBar}`}>
        <button
          type="button"
          className={`hb-btn hb-btn-gold ${s.primary}`}
          disabled={!review && pool === 0}
          onClick={() => onStart(effective)}
        >
          {review
            ? t.startReview
            : pool === 0
              ? t.pickChapter
              : t.startCount(count, picked.length)}
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
  selected,
  onSelect,
  onCheck,
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
  selected: number | null;
  onSelect: (i: number) => void;
  onCheck: () => void;
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
  const note = done ? whyNot(q, picked, lang) : null;
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (done)
      feedbackRef.current?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
  }, [done]);
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
        {done && <span className={s.ref}>{verseRef(q, t)}</span>}
        {q.kind !== "choice" && (
          <span className={s.kind}>{t.kinds[q.kind]}</span>
        )}
      </div>
      <h1 ref={headingRef} tabIndex={-1} className={s.question}>
        {q.kind === "which" ? t.whichPrompt : q[lang].q}
      </h1>
      {q.kind === "which" && <p className={s.quote}>{q[lang].q}</p>}

      <div
        role="radiogroup"
        aria-label={t.chooseAnswer}
        className={`${s.options} ${q.kind === "truefalse" ? s.tf : ""} ${q.kind === "which" ? s.which : ""}`}
      >
        {item.order.map((i, pos) => {
          let cls = s.option;
          if (done) {
            if (i === right) cls += ` ${s.right}`;
            else if (i === picked) cls += ` ${s.wrong}`;
            else cls += ` ${s.dim}`;
          } else if (i === selected) cls += ` ${s.selected}`;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              className={cls}
              aria-checked={done ? i === picked : i === selected}
              aria-disabled={done || undefined}
              onClick={() => !done && onSelect(i)}
            >
              <span className={s.letter} aria-hidden="true">
                {pos + 1}
              </span>
              <span>{answerLabel(item, i, lang, t)}</span>
            </button>
          );
        })}
      </div>

      {done ? (
        <div
          ref={feedbackRef}
          className={`${s.feedback} ${ok ? s.feedbackOk : s.feedbackNo}`}
        >
          <div role="status" aria-live="polite">
            <p className={s.verdict}>{ok ? t.correct : t.incorrect}</p>
            {!ok && (
              <p className={s.barAnswer}>
                {t.answerIs}: {rightAnswer(item, lang, t)}
              </p>
            )}
          </div>
          {note && (
            <p className={s.whyNot}>
              <b>{t.whyNot}</b> {note}
            </p>
          )}
          <p className={s.why}>{q[lang].why}</p>
          <Link href={readHref(q)} className={s.read} onClick={markResume}>
            {t.readPassage(verseRef(q, t))} →
          </Link>
          <button
            ref={nextRef}
            type="button"
            className={`hb-btn ${s.barBtn} ${ok ? s.barBtnOk : s.barBtnNo}`}
            onClick={onNext}
          >
            {last ? t.seeResults : t.continueQuiz}
          </button>
        </div>
      ) : (
        <div className={s.checkBar}>
          <div className={s.checkInner}>
            <div className={s.barMsg}>
              <p className={s.hint}>
                {selected === null ? t.chooseAnswer : t.checkHint}
              </p>
            </div>
            <button
              type="button"
              className={`hb-btn hb-btn-gold ${s.barBtn}`}
              disabled={selected === null}
              onClick={onCheck}
            >
              {t.checkAnswer}
            </button>
          </div>
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
  review,
  onRetake,
  onRetakeFull,
  onChange,
}: {
  t: UiStrings;
  lang: Lang;
  items: RoundItem[];
  answers: number[];
  open: number | null;
  setOpen: (i: number | null) => void;
  onReview: () => void;
  review: boolean;
  onRetake: () => void;
  onRetakeFull: () => void;
  onChange: () => void;
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
                    {!ok && answers[i] !== undefined && (
                      <p className={s.chose}>
                        {t.youChose}: {answerLabel(item, answers[i], lang, t)}
                      </p>
                    )}
                    <p className={s.answer}>
                      {t.answerIs}: {rightAnswer(item, lang, t)}
                    </p>
                    {!ok &&
                      answers[i] !== undefined &&
                      whyNot(q, answers[i], lang) && (
                        <p className={s.whyNot}>
                          <b>{t.whyNot}</b> {whyNot(q, answers[i], lang)}
                        </p>
                      )}
                    <p className={s.why}>{q[lang].why}</p>
                    <Link
                      href={readHref(q)}
                      className={s.read}
                      onClick={markResume}
                    >
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
          onClick={onRetake}
        >
          {review ? t.retakeReview : t.retake}
        </button>
        {review && (
          <button
            type="button"
            className={`hb-btn ${s.ghost} ${s.primary}`}
            onClick={onRetakeFull}
          >
            {t.retakeFull}
          </button>
        )}
        <button
          type="button"
          className={`hb-btn ${s.ghost} ${s.primary}`}
          onClick={onChange}
        >
          {t.changeSelection}
        </button>
      </div>
    </div>
  );
}
