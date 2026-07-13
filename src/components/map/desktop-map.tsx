"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { locations } from "@/content/locations";
import { smoothPath } from "@/lib/smooth-path";
import { MapNode } from "@/components/map/map-node";

export function DesktopMap() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const ordered = useMemo(
    () => [...locations].sort((a, b) => a.order - b.order),
    []
  );
  const pathD = useMemo(
    () => smoothPath(ordered.map((l) => l.position)),
    [ordered]
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-grain">
      <h1 className="sr-only">
        MahiiWay — an interactive map of Mahi&apos;s creative journey
      </h1>
      {/* ambient atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-[8%] h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] blur-3xl animate-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[45%] h-[28rem] w-[28rem] rounded-full bg-[#6E8F5C]/10 blur-3xl animate-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[35%] h-96 w-96 rounded-full bg-[#33475B]/10 blur-3xl animate-drift"
        style={{ animationDelay: "-3s" }}
      />

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={0.22}
          strokeWidth={0.28}
          strokeDasharray="0.6 1.4"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
        />
      </svg>

      <div className="relative h-full w-full">
        {ordered.map((location, i) => (
          <MapNode
            key={location.id}
            location={location}
            index={i}
            active={activeId === location.id}
            onHoverStart={() => setActiveId(location.id)}
            onHoverEnd={() => setActiveId(null)}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-6 text-center sm:bottom-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">
          Hover a room to peek in · Click to walk through the door
        </p>
      </div>
    </div>
  );
}
