"use client";

import type { CommentaryBlock } from "@/content/types";
import { useLang } from "@/lib/lang";
import { LabelBar } from "@/components/ornaments/Ornaments";
import s from "./movement.module.css";

export function Commentary({ blocks }: { blocks: CommentaryBlock[] }) {
  const { t } = useLang();
  return (
    <>
      <LabelBar label={t.commentary} className={s.commentaryLabel} />
      <div className={s.commentary}>
        {blocks.map(([type, text], i) => {
          if (type === "h") return <h3 key={i}>{text}</h3>;
          if (type === "q") return <blockquote key={i}>{text}</blockquote>;
          return <p key={i}>{text}</p>;
        })}
      </div>
    </>
  );
}
