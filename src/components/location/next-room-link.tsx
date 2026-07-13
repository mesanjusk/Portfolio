import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LocationEntry } from "@/content/types";
import { LocationIcon } from "@/components/map/location-icon";

export function NextRoomLink({
  currentOrder,
  locations,
}: {
  currentOrder: number;
  locations: LocationEntry[];
}) {
  const ordered = [...locations].sort((a, b) => a.order - b.order);
  const next = ordered.find((l) => l.order > currentOrder) ?? ordered[0];
  const href = next.id === "home" ? "/home" : `/${next.id}`;

  return (
    <div className="border-t border-ink/10 bg-paper px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Continue the walk
          </p>
          <p className="mt-2 font-display text-2xl text-ink">
            Next: {next.name}
          </p>
        </div>
        <Link
          href={href}
          className="group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-paper px-6 py-3.5 transition-colors hover:border-ink/40"
        >
          <LocationIcon id={next.id} className="h-5 w-5 text-ink-soft transition-colors group-hover:text-accent" />
          <span className="text-sm font-semibold text-ink">Enter {next.name}</span>
          <ArrowRight className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
