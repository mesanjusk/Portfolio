"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    setReady(true);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return ready ? matches : false;
}

export const DESKTOP_QUERY = "(min-width: 900px)";

export function useIsDesktop() {
  return useMediaQuery(DESKTOP_QUERY);
}
