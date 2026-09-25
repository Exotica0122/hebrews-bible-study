"use client";

import { useEffect, useState } from "react";

let cached: boolean | null = null;

function probe(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") ?? c.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function useWebGLSupport(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(cached);
  useEffect(() => {
    if (cached === null) cached = probe();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOk(cached);
  }, []);
  return ok;
}
