"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface TransitionOrigin {
  x: number;
  y: number;
}

interface TransitionContextValue {
  travelTo: (href: string, origin?: TransitionOrigin, color?: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useMapTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useMapTransition must be used inside TransitionProvider");
  }
  return ctx;
}

type Phase = "idle" | "covering" | "revealing";

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<TransitionOrigin>({ x: 50, y: 50 });
  const [color, setColor] = useState("#2b2622");
  const pendingHref = useRef<string | null>(null);

  const travelTo = useCallback(
    (href: string, o?: TransitionOrigin, c?: string) => {
      if (reducedMotion) {
        router.push(href);
        return;
      }
      pendingHref.current = href;
      if (o) setOrigin(o);
      if (c) setColor(c);
      setPhase("covering");
    },
    [reducedMotion, router]
  );

  useEffect(() => {
    if (phase !== "covering") return;
    const t = setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current);
        pendingHref.current = null;
      }
      setPhase("revealing");
    }, 640);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => setPhase("idle"), 620);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <TransitionContext.Provider value={{ travelTo }}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[200]"
            style={{ backgroundColor: color }}
            initial={{
              clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
            }}
            animate={{
              clipPath:
                phase === "covering"
                  ? `circle(150% at ${origin.x}% ${origin.y}%)`
                  : `circle(0% at ${origin.x}% ${origin.y}%)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.64, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
