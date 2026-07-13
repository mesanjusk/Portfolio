"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const start = performance.now();
    const duration = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      role="status"
      aria-label="MahiiWay is loading"
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-8 bg-paper bg-grain"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.02em" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl font-medium text-ink sm:text-5xl"
      >
        Mahii<span className="text-accent italic">Way</span>
      </motion.div>

      <div className="relative h-px w-48 overflow-hidden bg-ink/10 sm:w-64">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xs uppercase tracking-[0.3em] text-ink-soft"
      >
        unfolding a first year of looking
      </motion.p>
    </motion.div>
  );
}
