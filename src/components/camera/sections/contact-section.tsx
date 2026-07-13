"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import type { CameraProfile } from "@/content/camera-content";

export function ContactSection({ profile }: { profile: CameraProfile }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8fc4] to-[#a78bff]"
      >
        <Mail size={22} className="text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          say hello
        </p>
        <h2 className="mt-2 text-xl font-bold">Let&apos;s make something.</h2>
        <p className="mt-2 max-w-[28ch] text-sm text-white/70">
          Got a project, a weird idea, or just want to talk shutter mechanisms?
        </p>
      </motion.div>

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        href={`mailto:${profile.email}`}
        className="cam-btn rounded-full px-4 py-2 text-sm font-semibold text-[#2c1f3d]"
      >
        <Send size={14} />
        {profile.email}
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex gap-2 pt-2"
      >
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white/70 transition hover:bg-white/10"
          >
            {s.label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
