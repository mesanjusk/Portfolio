"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LocationEntry } from "@/content/types";
import { smoothPath } from "@/lib/smooth-path";
import { MapNode } from "@/components/map/map-node";
import { useIsDesktop } from "@/lib/use-media-query";

// Virtual canvas the map lays out on for narrow viewports. Small screens
// don't get their own scroll/pan surface — instead the whole map (nodes,
// trail, labels) is rendered at this fixed size and uniformly scaled down to
// fit, the same way a phone's "Request desktop site" zooms the real desktop
// layout out to fit the screen. Sized so the fixed 64px node circles keep
// clear of each other at every position on the map.
const DESIGN_WIDTH = 620;
const DESIGN_HEIGHT = 760;

function useFitScale(active: boolean) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!active) return;
    const compute = () => {
      const s = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT,
        1
      );
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [active]);

  return scale;
}

function AmbientAtmosphere() {
  return (
    <>
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
    </>
  );
}

function MapPath({ pathD }: { pathD: string }) {
  const reduced = useReducedMotion();
  return (
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
  );
}

export function CreativeMap({ locations }: { locations: LocationEntry[] }) {
  const isDesktop = useIsDesktop();
  const scale = useFitScale(!isDesktop);
  const [activeId, setActiveId] = useState<string | null>(null);
  const ordered = useMemo(
    () => [...locations].sort((a, b) => a.order - b.order),
    [locations]
  );
  const pathD = useMemo(
    () => smoothPath(ordered.map((l) => l.position)),
    [ordered]
  );

  const nodes = ordered.map((location, i) => (
    <MapNode
      key={location.id}
      location={location}
      index={i}
      active={activeId === location.id}
      onHoverStart={() => setActiveId(location.id)}
      onHoverEnd={() => setActiveId(null)}
    />
  ));

  return (
    <div className="relative h-full w-full overflow-hidden bg-grain">
      <h1 className="sr-only">
        MahiiWay — an interactive map of Mahi&apos;s creative journey
      </h1>

      <div
        className="absolute"
        style={
          isDesktop
            ? { inset: 0 }
            : {
                left: "50%",
                top: "50%",
                width: DESIGN_WIDTH,
                height: DESIGN_HEIGHT,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }
        }
      >
        <AmbientAtmosphere />
        <MapPath pathD={pathD} />
        <div className="relative h-full w-full">{nodes}</div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-6 text-center sm:bottom-10">
        <p className="rounded-full bg-paper/85 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-ink-soft shadow-sm backdrop-blur">
          {isDesktop
            ? "Hover a room to peek in · Click to walk through the door"
            : "Tap a room to step inside"}
        </p>
      </div>
    </div>
  );
}
