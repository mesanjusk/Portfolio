"use client";

import { motion } from "framer-motion";
import type { LocationEntry } from "@/content/types";
import { LocationIcon } from "@/components/map/location-icon";
import { useMapTransition } from "@/components/providers/transition-provider";

export function MobileSlide({
  location,
  isActive,
}: {
  location: LocationEntry;
  isActive: boolean;
}) {
  const { travelTo } = useMapTransition();
  const href = location.id === "home" ? "/home" : `/${location.id}`;

  return (
    <section
      className="relative flex h-full w-full shrink-0 snap-center flex-col items-center justify-center gap-6 px-8 pb-28 pt-24"
      style={{ backgroundColor: location.theme.wash }}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-2xl"
        style={{ backgroundColor: location.theme.accent }}
      />

      <motion.div
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0.6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-24 w-24 items-center justify-center rounded-[40%_60%_55%_45%/45%_55%_45%_55%] border bg-paper shadow-lg"
        style={{ borderColor: `color-mix(in srgb, ${location.theme.accent} 45%, transparent)` }}
      >
        <LocationIcon id={location.id} className="h-10 w-10" style={{ color: location.theme.accent }} />
      </motion.div>

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: location.theme.accent }}>
          Room {String(location.order + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-medium text-ink">
          {location.name}
        </h2>
        <p className="mt-2 text-sm font-medium italic text-ink-soft">
          {location.epithet}
        </p>
        <p className="mt-4 text-balance text-[15px] leading-relaxed text-ink-soft">
          {location.story}
        </p>
      </div>

      <button
        type="button"
        onClick={() => travelTo(href, { x: 50, y: 50 }, location.theme.accent)}
        className="mt-2 rounded-full px-7 py-3.5 text-sm font-semibold text-paper shadow-lg transition-transform active:scale-95"
        style={{ backgroundColor: location.theme.accent }}
      >
        Step inside
      </button>
    </section>
  );
}
