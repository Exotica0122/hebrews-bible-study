import type { Metadata } from "next";
import { getChapter } from "@/content/hebrews";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Hebrews · A verse-by-verse study",
  description:
    "A bilingual (English / 한국어) small-group study of Hebrews, one chapter at a time, with word studies, commentary and a quiz.",
};

/**
 * Chapter 1 lived at "/" before the home page existed, so old shared links
 * such as /#hb-m1-radiance still point here. The server never sees the hash,
 * so forward them to /1 before the home page paints.
 */
const FORWARD_OLD_LINKS = `if(/^#hb-/.test(location.hash))location.replace("/1"+location.hash)`;

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
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: FORWARD_OLD_LINKS }} />
      <HomePage verse={verse} />
    </>
  );
}
