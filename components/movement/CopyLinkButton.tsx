"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { copyCurrentUrl } from "@/lib/share";

export function CopyLinkButton({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const onClick = async () => {
    if (!(await copyCurrentUrl())) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button type="button" className={className} onClick={onClick} aria-live="polite">
      {copied ? t.copied : t.link}
    </button>
  );
}
