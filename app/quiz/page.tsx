import type { Metadata } from "next";
import { QuizPage } from "@/components/quiz/QuizPage";

export const metadata: Metadata = {
  title: "Quiz · Hebrews",
  description:
    "Short rounds on the ideas of each chapter of Hebrews, with an explanation for every answer.",
};

export default function Quiz() {
  return <QuizPage />;
}
