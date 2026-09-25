import { getChapter } from "@/content/hebrews";
import { ChapterPage } from "@/components/ChapterPage";

export default async function Home() {
  const chapter = await getChapter(1);
  if (!chapter) throw new Error("Chapter 1 content is missing");
  return <ChapterPage chapter={chapter} />;
}
