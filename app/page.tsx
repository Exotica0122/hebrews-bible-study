import type { Metadata } from "next";
import { getChapter } from "@/content/hebrews";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Hebrews · A verse-by-verse study",
  description:
    "A bilingual (English / 한국어) small-group study of Hebrews, one chapter at a time, with word studies, commentary and a quiz.",
};

export default async function Home() {
  const chapter1 = await getChapter(1);
  if (!chapter1) throw new Error("Chapter 1 content is missing");
  const verse = {
    en: {
      text: chapter1.copy.en.tagline,
      ref: chapter1.copy.en.taglineRef,
    },
    ko: {
      text: chapter1.copy.ko.tagline,
      ref: chapter1.copy.ko.taglineRef,
    },
  };
  return <HomePage verse={verse} />;
}
