"use client";

import { motion } from "framer-motion";
import type { CameraProfile } from "@/content/camera-content";

export function AboutSection({ profile }: { profile: CameraProfile }) {
  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-y-auto px-5 py-8 text-white no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto w-32 rotate-[-3deg] rounded-sm bg-white p-2 pb-6 shadow-lg"
      >
        <div className="aspect-square w-full rounded-sm bg-gradient-to-br from-[#ffd6e8] to-[#c9b6ff]" />
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-black/50">
          {profile.role}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="space-y-3 text-center text-sm leading-relaxed text-white/80"
      >
        {profile.aboutParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="flex flex-wrap justify-center gap-1.5"
      >
        {profile.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/70"
          >
            {s}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="grid grid-cols-2 gap-2"
      >
        {profile.funFacts.map((f) => (
          <div
            key={f.label}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-center"
          >
            <p className="font-mono text-[13px] font-bold text-[#ff8fc4]">{f.value}</p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/50">
              {f.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
