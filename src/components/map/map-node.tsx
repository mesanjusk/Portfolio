"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LocationEntry } from "@/content/types";
import { LocationIcon } from "@/components/map/location-icon";
import { useMapTransition } from "@/components/providers/transition-provider";

const blobRadii = [
  "62% 38% 55% 45% / 45% 55% 45% 55%",
  "45% 55% 40% 60% / 55% 40% 60% 45%",
  "55% 45% 62% 38% / 40% 60% 40% 60%",
];

export function MapNode({
  location,
  index,
  active,
  unlocked,
  current,
  justUnlocked,
  onHoverStart,
  onHoverEnd,
}: {
  location: LocationEntry;
  index: number;
  active: boolean;
  unlocked: boolean;
  current: boolean;
  justUnlocked: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const reduced = useReducedMotion();
  const { travelTo } = useMapTransition();
  const href = location.id === "home" ? "/home" : `/${location.id}`;
  const radius = blobRadii[index % blobRadii.length];

  return (
    <motion.button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const origin = {
          x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
          y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
        };
        travelTo(href, origin, location.theme.accent);
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
      style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
      initial={reduced ? undefined : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: unlocked ? 1 : 0.4, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { scale: 1.08, rotate: index % 2 === 0 ? -2 : 2, opacity: 1 }}
      whileFocus={reduced ? undefined : { scale: 1.08, opacity: 1 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`${location.name} — ${unlocked ? location.short : "Not yet explored"}`}
    >
      <span
        className="relative flex h-16 w-16 items-center justify-center border shadow-[0_10px_24px_-12px_rgba(43,38,34,0.35)] transition-all duration-300 sm:h-20 sm:w-20"
        style={{
          borderRadius: radius,
          borderColor: `color-mix(in srgb, ${location.theme.accent} ${unlocked ? 45 : 20}%, transparent)`,
          backgroundColor: active
            ? location.theme.wash
            : "color-mix(in srgb, var(--color-paper) 88%, white)",
          filter: unlocked ? "none" : "grayscale(0.65)",
          boxShadow: current
            ? `0 0 0 4px color-mix(in srgb, ${location.theme.accent} 35%, transparent)`
            : undefined,
        }}
      >
        {current && !reduced && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ borderRadius: radius, border: `1px solid ${location.theme.accent}` }}
            animate={{ scale: [1, 1.22, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {justUnlocked && !reduced && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ borderRadius: radius, border: `2px solid ${location.theme.accent}` }}
            initial={{ scale: 0.85, opacity: 0.9 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}

        <LocationIcon
          id={location.id}
          className="h-7 w-7 sm:h-8 sm:w-8"
          style={{ color: location.theme.accent }}
        />
      </span>

      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 4 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none mt-3 w-40 text-center"
      >
        <span className="block font-display text-sm font-medium text-ink sm:text-base">
          {location.name}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-ink-soft">
          {unlocked ? location.epithet : "Undiscovered"}
        </span>
      </motion.span>
    </motion.button>
  );
}
