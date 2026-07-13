import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center gap-6 bg-paper bg-grain px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        Off the map
      </p>
      <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
        There&apos;s no room here yet
      </h1>
      <p className="max-w-md text-ink-soft">
        This path doesn&apos;t lead anywhere in MahiiWay. Let&apos;s walk back
        to the map.
      </p>
      <Link
        href="/"
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent"
      >
        Back to the map
      </Link>
    </div>
  );
}
