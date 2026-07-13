"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { locations } from "@/content/locations";
import { smoothPath } from "@/lib/smooth-path";
import { MapNode } from "@/components/map/map-node";
import { useIsDesktop } from "@/lib/use-media-query";

// Fixed pixel canvas mobile pans around, sized so the 64px node circles
// never crowd each other at percentage-based positions designed for a wide
// desktop viewport.
const MOBILE_CANVAS = { width: 900, height: 1050 };

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

export function CreativeMap() {
  const isDesktop = useIsDesktop();
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const ordered = useMemo(
    () => [...locations].sort((a, b) => a.order - b.order),
    []
  );
  const pathD = useMemo(
    () => smoothPath(ordered.map((l) => l.position)),
    [ordered]
  );

  // Mobile: open the map centered on its middle, so it reads as "you're
  // standing inside the map" rather than pinned to a random corner.
  useEffect(() => {
    if (isDesktop) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [isDesktop]);

  const nodes = ordered.map((location, i) => (
    <MapNode
      key={location.id}
      location={location}
      index={i}
      active={activeId === location.id}
      alwaysShowLabel={!isDesktop}
      onHoverStart={() => setActiveId(location.id)}
      onHoverEnd={() => setActiveId(null)}
    />
  ));

  return (
    <div className="relative h-full w-full overflow-hidden bg-grain">
      <h1 className="sr-only">
        MahiiWay — an interactive map of Mahi&apos;s creative journey
      </h1>

      {isDesktop ? (
        <>
          <AmbientAtmosphere />
          <MapPath pathD={pathD} />
          <div className="relative h-full w-full">{nodes}</div>
        </>
      ) : (
        <div
          ref={scrollRef}
          className="no-scrollbar absolute inset-0 overflow-auto"
          style={{ touchAction: "pan-x pan-y" }}
        >
          <div
            className="relative"
            style={{ width: MOBILE_CANVAS.width, height: MOBILE_CANVAS.height }}
          >
            <AmbientAtmosphere />
            <MapPath pathD={pathD} />
            {nodes}
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-6 text-center sm:bottom-10">
        <p className="rounded-full bg-paper/85 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-ink-soft shadow-sm backdrop-blur">
          {isDesktop
            ? "Hover a room to peek in · Click to walk through the door"
            : "Pan around the map · Tap a room to step inside"}
        </p>
      </div>
    </div>
  );
}
