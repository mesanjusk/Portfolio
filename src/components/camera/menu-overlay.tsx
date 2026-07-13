"use client";

import { motion } from "framer-motion";
import { Home, User, Grid, Send } from "lucide-react";
import type { CameraSection } from "@/components/camera/camera-experience";

const ITEMS: { id: CameraSection; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Grid },
  { id: "contact", label: "Contact", icon: Send },
];

export function MenuOverlay({
  active,
  onSelect,
}: {
  active: CameraSection;
  onSelect: (id: CameraSection) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-[#120c1c]/97 px-2 py-2 text-white"
    >
      <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/40">
        quick menu
      </p>
      <div className="grid w-full grid-cols-4 gap-1.5">
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 transition ${
              active === id
                ? "border-white/60 bg-white/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <Icon size={13} />
            <span className="font-mono text-[6px] uppercase tracking-[0.05em]">{label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
