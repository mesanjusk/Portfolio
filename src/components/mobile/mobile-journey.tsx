"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { locations } from "@/content/locations";
import { MobileSlide } from "@/components/mobile/mobile-slide";
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav";

export function MobileJourney() {
  const ordered = useMemo(
    () => [...locations].sort((a, b) => a.order - b.order),
    []
  );
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    if (!slideWidth) return;
    const next = Math.round(el.scrollLeft / slideWidth);
    setIndex((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(ordered.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }, [ordered.length]);

  return (
    <div className="fixed inset-0 flex flex-col bg-paper">
      <h1 className="sr-only">
        MahiiWay — a swipeable story journey through Mahi&apos;s creative year
      </h1>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center px-5 pt-[max(1.1rem,env(safe-area-inset-top))]"
      >
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink-soft">
          Room {index + 1} of {ordered.length}
        </span>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
        style={{ scrollSnapType: "x mandatory" }}
        role="region"
        aria-label="MahiiWay story journey"
      >
        {ordered.map((location, i) => (
          <MobileSlide
            key={location.id}
            location={location}
            isActive={i === index}
          />
        ))}
      </div>

      <MobileBottomNav
        count={ordered.length}
        index={index}
        onSelect={goTo}
      />
    </div>
  );
}
