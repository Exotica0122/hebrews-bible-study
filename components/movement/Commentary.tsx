"use client";

import type { CommentaryBlock } from "@/content/types";
import { useLang } from "@/lib/lang";
import { LabelBar } from "@/components/ornaments/Ornaments";
import s from "./movement.module.css";

interface CommentaryProps {
  movementId: string;
  blocks: CommentaryBlock[];
}

export function Commentary({ movementId, blocks }: CommentaryProps) {
  const { t } = useLang();
  return (
    <>
      <LabelBar label={t.commentary} className={s.commentaryLabel} />
      <div className={s.commentary}>
        {blocks.map(([type, text], i) => {
          const props = {
            id: `hb-c-${movementId}-${i}`,
            className: "hb-anchor",
          };
          if (type === "h")
            return (
              <h3 key={i} {...props}>
                {text}
              </h3>
            );
          if (type === "q")
            return (
              <blockquote key={i} {...props}>
                {text}
              </blockquote>
            );
          return (
            <p key={i} {...props}>
              {text}
            </p>
          );
        })}
      </div>
    </>
  );
}
