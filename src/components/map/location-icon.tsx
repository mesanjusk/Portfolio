import type { LocationId } from "@/content/types";
import type { SVGProps } from "react";

const paths: Partial<Record<LocationId, React.ReactNode>> = {
  home: (
    <>
      <path d="M6 19V11.5L16 5l10 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 6 19Z" />
      <path d="M13 20.5v-6h6v6" />
    </>
  ),
  "fashion-atelier": (
    <>
      <path d="M16 4c-1.4 0-2.5 1.1-2.5 2.5S14.6 9 16 9s2.5-1.1 2.5-2.5S17.4 4 16 4Z" />
      <path d="M11.5 7 6 12l3 3 2.5-2M20.5 7 26 12l-3 3-2.5-2" />
      <path d="M13 10.5 9 27h14l-4-16.5" />
    </>
  ),
  "digital-lab": (
    <>
      <rect x="6" y="7" width="20" height="13" rx="1.5" />
      <path d="M12 24.5h8M16 20v4.5" />
      <path d="M10.5 12.5 13 15l-2.5 2.5M17 17.5h4.5" />
    </>
  ),
  "illustration-studio": (
    <>
      <path d="M7 25 22 10a2.1 2.1 0 0 1 3 3L10 28l-4.5 1.5L7 25Z" />
      <path d="M19 13l3 3" />
    </>
  ),
  "rangoli-courtyard": (
    <>
      <circle cx="16" cy="16" r="2.4" />
      <path d="M16 5.5c1.8 0 3.2 2 3.2 4.5s-1.4 4.5-3.2 4.5-3.2-2-3.2-4.5S14.2 5.5 16 5.5Z" />
      <path d="M16 26.5c1.8 0 3.2-2 3.2-4.5s-1.4-4.5-3.2-4.5-3.2 2-3.2 4.5 1.4 4.5 3.2 4.5Z" />
      <path d="M5.5 16c0-1.8 2-3.2 4.5-3.2s4.5 1.4 4.5 3.2-2 3.2-4.5 3.2-4.5-1.4-4.5-3.2Z" />
      <path d="M26.5 16c0-1.8-2-3.2-4.5-3.2s-4.5 1.4-4.5 3.2 2 3.2 4.5 3.2 4.5-1.4 4.5-3.2Z" />
    </>
  ),
  "process-library": (
    <>
      <path d="M6 7.5A1.5 1.5 0 0 1 7.5 6H14v20H7.5A1.5 1.5 0 0 1 6 24.5v-17Z" />
      <path d="M26 7.5A1.5 1.5 0 0 0 24.5 6H18v20h6.5A1.5 1.5 0 0 0 26 24.5v-17Z" />
      <path d="M14 6v20M9.5 11h1M9.5 15h1M21 11h1M21 15h1" />
    </>
  ),
  "inspiration-garden": (
    <>
      <path d="M16 27V13" />
      <path d="M16 13c0-4.5-3.5-8-8-8 0 4.5 3.5 8 8 8Z" />
      <path d="M16 17c0-4.5 3.5-8 8-8 0 4.5-3.5 8-8 8Z" />
    </>
  ),
  gallery: (
    <>
      <rect x="5.5" y="6" width="21" height="17" rx="1" />
      <circle cx="11.5" cy="12" r="1.8" />
      <path d="M5.5 20 12 14l4 4 4.5-5 6 7" />
    </>
  ),
  "contact-house": (
    <>
      <rect x="6" y="9.5" width="20" height="14" rx="1.5" />
      <path d="M6.5 10.5 16 18l9.5-7.5" />
    </>
  ),
};

// Fallback for rooms added after launch, which don't have a hand-drawn icon of their own yet.
const defaultPath = paths.home;

export function LocationIcon({
  id,
  ...props
}: { id: LocationId } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {paths[id] ?? defaultPath}
    </svg>
  );
}
