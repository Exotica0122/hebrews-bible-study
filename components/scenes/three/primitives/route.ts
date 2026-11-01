import { smoothstep } from "./Timeline";

/** Time in seconds, and how far along the scene the phone's window sits, from 0 to 1. */
export type Route = readonly (readonly [number, number])[];

export function along(route: Route, t: number) {
  for (let i = 1; i < route.length; i++) {
    const [a, from] = route[i - 1];
    const [b, to] = route[i];
    if (t <= b) return from + (to - from) * smoothstep(a, b, t);
  }
  return route[route.length - 1][1];
}
