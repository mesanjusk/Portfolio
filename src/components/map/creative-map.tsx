"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LocationEntry } from "@/content/types";
import { smoothPath } from "@/lib/smooth-path";
import { MapNode } from "@/components/map/map-node";
import { useIsDesktop } from "@/lib/use-media-query";
import { useJourney } from "@/components/providers/journey-provider";

// Virtual canvas the map lays out on for narrow viewports. Small screens
// don't get their own scroll/pan surface — instead the whole map (nodes,
// trail, labels) is rendered at this fixed size and uniformly scaled down to
// fit, the same way a phone's "Request desktop site" zooms the real desktop
// layout out to fit the screen. Sized so the fixed 64px node circles keep
// clear of each other at every position on the map.
const DESIGN_WIDTH = 620;
const DESIGN_HEIGHT = 760;

// Off-canvas anchor the thread emerges from below the map — the visitor's
// entry point into the journey, before Home.
const START_POINT = { x: 50, y: 104 };

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

/** The already-established part of the thread — drawn in, no animation. */
function SettledThread({ pathD }: { pathD: string }) {
  return (
    <path
      d={pathD}
      fill="none"
      stroke="var(--color-ink)"
      strokeOpacity={0.22}
      strokeWidth={0.28}
      strokeDasharray="0.6 1.4"
      strokeLinecap="round"
    />
  );
}

/** The thread as it grows to reach a newly unlocked room. */
function GrowingThread({
  pathD,
  fromFraction,
  reduced,
  onGrown,
}: {
  pathD: string;
  fromFraction: number;
  reduced: boolean;
  onGrown: () => void;
}) {
  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke="var(--color-ink)"
      strokeOpacity={0.22}
      strokeWidth={0.28}
      strokeDasharray="0.6 1.4"
      strokeLinecap="round"
      initial={reduced ? false : { pathLength: fromFraction }}
      animate={{ pathLength: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.3 }
      }
      onAnimationComplete={onGrown}
    />
  );
}

export function CreativeMap({ locations }: { locations: LocationEntry[] }) {
  const isDesktop = useIsDesktop();
  const scale = useFitScale(!isDesktop);
  const reduced = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [justUnlockedId, setJustUnlockedId] = useState<string | null>(null);
  const { visitedRooms, lastSeenCount, acknowledgeSeen } = useJourney();

  const ordered = useMemo(
    () => [...locations].sort((a, b) => a.order - b.order),
    [locations]
  );
  const byId = useMemo(
    () => new Map<string, LocationEntry>(ordered.map((l) => [l.id, l])),
    [ordered]
  );

  // The journey the visitor actually walked, in the order they walked it —
  // Home is always treated as unlocked, since it's the first destination.
  const visitedSequence = useMemo(() => {
    const seq = visitedRooms.filter((id) => byId.has(id));
    return seq.includes("home") ? seq : ["home", ...seq];
  }, [visitedRooms, byId]);

  const unlockedSet = useMemo(() => new Set(visitedSequence), [visitedSequence]);
  const currentId = visitedSequence[visitedSequence.length - 1] ?? "home";

  const totalSegments = visitedSequence.length;
  const revealedCount = Math.min(lastSeenCount, totalSegments);
  const growing = revealedCount < totalSegments;

  const pathD = useMemo(
    () =>
      smoothPath([
        START_POINT,
        ...visitedSequence.map((id) => byId.get(id)!.position),
      ]),
    [visitedSequence, byId]
  );

  // Visitors with reduced motion get the settled state immediately, no
  // growth animation or glow.
  useEffect(() => {
    if (reduced && growing) acknowledgeSeen();
  }, [reduced, growing, acknowledgeSeen]);

  const handleThreadGrown = () => {
    acknowledgeSeen();
    if (reduced) return;
    const newestId = visitedSequence[visitedSequence.length - 1];
    setJustUnlockedId(newestId);
    window.setTimeout(() => setJustUnlockedId(null), 1500);
  };

  const focusNode = justUnlockedId ? byId.get(justUnlockedId) : null;

  const nodes = ordered.map((location, i) => (
    <MapNode
      key={location.id}
      location={location}
      index={i}
      active={activeId === location.id}
      unlocked={unlockedSet.has(location.id)}
      current={location.id === currentId}
      justUnlocked={justUnlockedId === location.id}
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

        <motion.div
          className="relative h-full w-full"
          style={{
            transformOrigin: focusNode
              ? `${focusNode.position.x}% ${focusNode.position.y}%`
              : "50% 50%",
          }}
          animate={{ scale: focusNode && !reduced ? [1, 1.018, 1] : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {growing ? (
              <GrowingThread
                pathD={pathD}
                fromFraction={totalSegments === 0 ? 1 : revealedCount / totalSegments}
                reduced={reduced}
                onGrown={handleThreadGrown}
              />
            ) : (
              <SettledThread pathD={pathD} />
            )}
          </svg>
          {nodes}
        </motion.div>
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
