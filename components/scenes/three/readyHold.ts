import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";

/** Scenes still preparing; the canvas reports ready only when none are. */
export class ReadyHolds {
  private count = 0;
  /** Returns a release that only counts once. */
  hold(): () => void {
    this.count += 1;
    let done = false;
    return () => {
      if (done) return;
      done = true;
      this.count -= 1;
    };
  }
  get busy() {
    return this.count > 0;
  }
}

export const ReadyHoldContext = createContext<ReadyHolds | null>(null);

/** Holds the canvas's "ready" until the returned release is called. */
export function useReadyHold(): () => void {
  const holds = useContext(ReadyHoldContext);
  const release = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    if (!holds) return;
    const r = holds.hold();
    release.current = r;
    return r;
  }, [holds]);
  return useCallback(() => release.current(), []);
}
