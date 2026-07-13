"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function MobileBottomNav({
  count,
  index,
  onSelect,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Journey progress"
      className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-paper/90 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur"
    >
      <button
        type="button"
        onClick={() => onSelect(index - 1)}
        disabled={index === 0}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink disabled:opacity-30"
        aria-label="Previous room"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center justify-center gap-2 overflow-x-auto">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to room ${i + 1}`}
            aria-current={i === index}
            className="flex h-11 w-6 shrink-0 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/20"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSelect(index + 1)}
        disabled={index === count - 1}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink disabled:opacity-30"
        aria-label="Next room"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
