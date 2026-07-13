"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { CameraProject } from "@/content/camera-content";

export function ProjectLightbox({
  project,
  onClose,
}: {
  project: CameraProject;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col overflow-y-auto bg-[#120c1c]/98 px-4 py-5 text-white no-scrollbar"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        <span>{project.frame}.JPG</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="cam-btn h-7 w-7 rounded-full !bg-white/10 !shadow-none"
        >
          <X size={14} />
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        className="mt-3 aspect-[4/3] w-full rounded-lg"
        style={{
          background: `linear-gradient(155deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      />

      <div className="mt-4 flex-1 space-y-4">
        <div>
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
            {project.role} · {project.year}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-white/75">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-1.5 border-t border-white/10 pt-3 text-xs text-white/70">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#ff8fc4]">▸</span>
              {h}
            </li>
          ))}
        </ul>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="cam-btn mt-2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#2c1f3d]"
          >
            View project <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
