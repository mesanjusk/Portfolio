import type { LocationEntry } from "@/content/types";
import { CaseStudyCard } from "@/components/location/case-study-card";
import { PageEnter } from "@/components/shared/page-enter";

export function StudioSection({ location }: { location: LocationEntry }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
      <PageEnter>
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
          Case studies from this room
        </h2>
      </PageEnter>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {location.caseStudies.map((cs, i) => (
          <PageEnter key={cs.slug} delay={0.06 * i}>
            <CaseStudyCard caseStudy={cs} location={location} />
          </PageEnter>
        ))}
      </div>
    </div>
  );
}
