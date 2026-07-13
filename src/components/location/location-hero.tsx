import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { LocationEntry } from "@/content/types";
import { LocationIcon } from "@/components/map/location-icon";
import { PageEnter } from "@/components/shared/page-enter";

export function LocationHero({ location }: { location: LocationEntry }) {
  return (
    <header
      className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-36"
      style={{ backgroundColor: location.theme.wash }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: location.theme.accent }}
      />

      <div className="relative mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the map
        </Link>

        <PageEnter delay={0.05} className="mt-8 flex items-start gap-5 sm:items-center">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border bg-paper shadow-sm sm:h-20 sm:w-20"
            style={{ borderColor: `color-mix(in srgb, ${location.theme.accent} 45%, transparent)` }}
          >
            <LocationIcon id={location.id} className="h-8 w-8 sm:h-9 sm:w-9" style={{ color: location.theme.accent }} />
          </span>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em]"
              style={{ color: location.theme.accent }}
            >
              Room {String(location.order + 1).padStart(2, "0")} · {location.epithet}
            </p>
            <h1 className="mt-2 text-balance font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
              {location.name}
            </h1>
          </div>
        </PageEnter>

        <PageEnter delay={0.15}>
          <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ink-soft">
            {location.story}
          </p>
        </PageEnter>
      </div>
    </header>
  );
}
