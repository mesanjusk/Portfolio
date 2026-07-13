"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsDesktop } from "@/lib/use-media-query";

/**
 * Desktop-only smooth scroll. Mobile keeps native momentum scroll since the
 * mobile experience is swipe/paginated, not a long scroll surface, and
 * native touch scrolling is both faster and more accessible there.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  if (reduced || !isDesktop) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.1,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
