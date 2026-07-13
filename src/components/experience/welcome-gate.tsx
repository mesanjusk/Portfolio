"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/button";

export function WelcomeGate({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[290] flex flex-col items-center justify-center overflow-hidden bg-paper bg-grain px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      transition={{ duration: 0.6 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-ink/5 blur-3xl animate-drift"
        style={{ animationDelay: "-6s" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs font-semibold uppercase tracking-[0.35em] text-accent"
      >
        A Foundation Course journey, mapped
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[1.05] text-ink sm:text-7xl"
      >
        Welcome to <span className="italic text-accent">MahiiWay</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink-soft sm:text-lg"
      >
        This isn&apos;t a portfolio you scroll. It&apos;s a small world you walk
        through — {profile.stats[0].label.toLowerCase()}, sketchbooks, and the
        studio {profile.name} spent a whole first year building.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10"
      >
        <Button size="lg" onClick={onEnter}>
          Enter the map
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-6 text-xs uppercase tracking-[0.2em] text-ink-soft/70"
      >
        Best explored with sound off, curiosity on
      </motion.p>
    </motion.div>
  );
}
