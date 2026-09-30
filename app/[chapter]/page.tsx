import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CHAPTER_COUNT, getChapter, isLive } from "@/content/hebrews";
import { ChapterPage } from "@/components/ChapterPage";
import { ComingSoon } from "@/components/soon/ComingSoon";

function parseChapter(raw: string): number | null {
  if (!/^\d{1,2}$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 1 && n <= CHAPTER_COUNT ? n : null;
}

export function generateStaticParams() {
  return Array.from({ length: CHAPTER_COUNT - 1 }, (_, i) => ({ chapter: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps<"/[chapter]">): Promise<Metadata> {
  const { chapter } = await params;
  const n = parseChapter(chapter);
  if (!n) return { title: "Not found" };
  if (!isLive(n)) return { title: `Hebrews ${n} · Coming soon` };
  return {
    title: `Hebrews ${n} · A verse-by-verse study`,
    description: `A bilingual (English / 한국어) small-group study of Hebrews ${n}: word studies, commentary and cross-references.`,
  };
}

export default async function Chapter({ params }: PageProps<"/[chapter]">) {
  const { chapter } = await params;
  const n = parseChapter(chapter);
  if (n === null) notFound();
  if (n === 1) redirect("/");
  const content = await getChapter(n);
  if (content) return <ChapterPage chapter={content} />;
  return <ComingSoon chapter={n} />;
}
