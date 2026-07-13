"use client";

import { motion } from "framer-motion";
import type { CameraProject } from "@/content/camera-content";

export function ProjectsSection({
  projects,
  selectedId,
  onSelect,
}: {
  projects: CameraProject[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto px-4 py-6 no-scrollbar">
      <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        gallery — tap a frame, press shutter
      </p>
      <div className="grid grid-cols-2 gap-3">
        {projects.map((p, i) => {
          const active = p.id === selectedId;
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className={`relative aspect-[4/5] overflow-hidden rounded-lg text-left ring-2 transition-all ${
                active ? "ring-white/90 scale-[1.03]" : "ring-white/10"
              }`}
              style={{
                background: `linear-gradient(155deg, ${p.gradient[0]}, ${p.gradient[1]})`,
              }}
            >
              <span className="absolute left-1.5 top-1.5 rounded bg-black/30 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] text-white/80 backdrop-blur-sm">
                {p.frame}
              </span>
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-1 rounded-md border border-dashed border-white/80"
                />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-black/40 px-2 py-1.5 backdrop-blur-sm">
                <span className="block font-semibold text-[11px] leading-tight text-white">
                  {p.title}
                </span>
                <span className="block font-mono text-[8px] uppercase tracking-[0.1em] text-white/60">
                  {p.year}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
