import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QUIZ_CHAPTERS, hasQuiz } from "@/content/quiz";
import { QuizPage } from "@/components/quiz/QuizPage";

function parseChapter(raw: string): number | null {
  if (!/^\d{1,2}$/.test(raw)) return null;
  const n = Number(raw);
  return hasQuiz(n) ? n : null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return QUIZ_CHAPTERS.map((n) => ({ chapter: String(n) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/quiz/[chapter]">): Promise<Metadata> {
  const { chapter } = await params;
  const n = parseChapter(chapter);
  if (!n) return { title: "Not found" };
  return {
    title: `Hebrews ${n} quiz · Hebrews`,
    description: `Test yourself on the ideas of Hebrews ${n}, with an explanation for every answer.`,
  };
}

export default async function ChapterQuiz({
  params,
}: PageProps<"/quiz/[chapter]">) {
  const { chapter } = await params;
  const n = parseChapter(chapter);
  if (n === null) notFound();
  return <QuizPage key={n} chapter={n} />;
}
