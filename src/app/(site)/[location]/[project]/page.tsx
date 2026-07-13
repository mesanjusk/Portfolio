import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLocation } from "@/content/locations";
import { LocationIcon } from "@/components/map/location-icon";
import { Plate } from "@/components/location/plate";
import { PageEnter } from "@/components/shared/page-enter";

async function findCaseStudy(locationSlug: string, projectSlug: string) {
  const location = await getLocation(locationSlug);
  const caseStudy = location?.caseStudies.find((c) => c.slug === projectSlug);
  return location && caseStudy ? { location, caseStudy } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; project: string }>;
}): Promise<Metadata> {
  const { location, project } = await params;
  const found = await findCaseStudy(location, project);
  if (!found) return {};
  return {
    title: found.caseStudy.title,
    description: found.caseStudy.summary,
    openGraph: {
      title: `${found.caseStudy.title} · MahiiWay`,
      description: found.caseStudy.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ location: string; project: string }>;
}) {
  const { location: locationSlug, project } = await params;
  const found = await findCaseStudy(locationSlug, project);
  if (!found) notFound();
  const { location, caseStudy } = found;

  return (
    <article>
      <header
        className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-36"
        style={{ backgroundColor: location.theme.wash }}
      >
        <div className="relative mx-auto max-w-3xl">
          <Link
            href={`/${location.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {location.name}
          </Link>

          <PageEnter delay={0.05} className="mt-8 flex items-center gap-3">
            <LocationIcon
              id={location.id}
              className="h-5 w-5"
              style={{ color: location.theme.accent }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: location.theme.accent }}
            >
              {caseStudy.year} · {caseStudy.medium}
            </span>
          </PageEnter>

          <PageEnter delay={0.12}>
            <h1 className="mt-4 text-balance font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
              {caseStudy.title}
            </h1>
          </PageEnter>

          <PageEnter delay={0.2}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-soft">
              {caseStudy.summary}
            </p>
          </PageEnter>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
        {caseStudy.coverImage && (
          <PageEnter className="relative mb-14 aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/9]">
            <Image
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </PageEnter>
        )}

        <Section eyebrow="Context" accent={location.theme.accent}>
          <p className="text-lg leading-relaxed text-ink-soft">{caseStudy.context}</p>
        </Section>

        <Section eyebrow="Research" accent={location.theme.accent}>
          <ul className="space-y-4">
            {caseStudy.research.map((item, i) => (
              <li key={i} className="flex gap-4 text-ink-soft">
                <span
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: location.theme.accent }}
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="Sketches" accent={location.theme.accent}>
          <div className="grid gap-6 sm:grid-cols-2">
            {caseStudy.sketches.map((sketch, i) => (
              <Plate
                key={i}
                palette={caseStudy.palette}
                caption={sketch.caption}
                imageUrl={sketch.imageUrl}
                index={i}
              />
            ))}
          </div>
        </Section>

        <Section eyebrow="Iterations" accent={location.theme.accent}>
          <ol className="space-y-8 border-l border-ink/10 pl-6">
            {caseStudy.iterations.map((iteration, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-paper"
                  style={{ backgroundColor: location.theme.accent }}
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-xl text-ink">{iteration.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">
                  {iteration.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Final outcome" accent={location.theme.accent}>
          <p className="text-lg leading-relaxed text-ink-soft">{caseStudy.outcome}</p>
        </Section>

        <div
          className="mt-16 rounded-3xl p-8 sm:p-10"
          style={{ backgroundColor: location.theme.wash }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: location.theme.accent }}>
            Reflection
          </h2>
          <p className="mt-4 font-display text-2xl italic leading-snug text-ink sm:text-3xl">
            &ldquo;{caseStudy.reflection}&rdquo;
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {caseStudy.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
            >
              {tool}
            </span>
          ))}
        </div>

        <Link
          href={`/${location.id}`}
          className="mt-16 inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {location.name}
        </Link>
      </div>
    </article>
  );
}

function Section({
  eyebrow,
  accent,
  children,
}: {
  eyebrow: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <PageEnter className="mt-14 first:mt-0">
      <h2
        className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {eyebrow}
      </h2>
      {children}
    </PageEnter>
  );
}
