"use client";

import { motion } from "framer-motion";
import type { CameraProfile } from "@/content/camera-content";
import { Stickers } from "@/components/camera/stickers";

export function HomeSection({ profile }: { profile: CameraProfile }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-5 py-2 text-center text-white no-scrollbar">
      <Stickers variant="subtle" />

      {/* AF-style viewfinder corners */}
      <div aria-hidden className="pointer-events-none absolute inset-4 opacity-40">
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
          (pos, i) => (
            <span key={i} className={`absolute h-4 w-4 ${pos} border-white/70`} />
          )
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/50"
      >
        {profile.handle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-1.5 text-balance text-xl font-bold leading-tight sm:text-2xl"
      >
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-[#ff8fc4] to-[#a78bff] bg-clip-text text-transparent">
          {profile.name}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.55 }}
        className="mt-1.5 max-w-[26ch] text-[11px] text-white/70 sm:text-xs"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-3 flex flex-col items-center gap-0.5 text-white/40"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.2em]">
          ◀▶ mode · ⬤ shutter
        </span>
      </motion.div>
    </div>
  );
}
