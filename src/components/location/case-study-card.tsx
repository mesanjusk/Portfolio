import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy, LocationEntry } from "@/content/types";

export function CaseStudyCard({
  caseStudy,
  location,
}: {
  caseStudy: CaseStudy;
  location: LocationEntry;
}) {
  return (
    <Link
      href={`/${location.id}/${caseStudy.slug}`}
      className="group block overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-shadow hover:shadow-[0_20px_45px_-25px_rgba(43,38,34,0.4)]"
    >
      <div
        className="relative flex h-44 items-end p-6 sm:h-56"
        style={
          caseStudy.coverImage
            ? undefined
            : {
                background: `linear-gradient(135deg, ${caseStudy.palette[0]}, ${caseStudy.palette[1]} 55%, ${caseStudy.palette[2]})`,
              }
        }
      >
        {caseStudy.coverImage && (
          <Image
            src={caseStudy.coverImage}
            alt={caseStudy.title}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 480px, 100vw"
          />
        )}
        <span className="relative rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
          {caseStudy.medium}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-medium text-ink">
            {caseStudy.title}
          </h3>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {caseStudy.year}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {caseStudy.summary}
        </p>
      </div>
    </Link>
  );
}
