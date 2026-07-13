import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation } from "@/content/locations";
import { CaseStudyForm } from "@/components/admin/case-study-form";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;
  const location = await getLocation(id);
  const caseStudy = location?.caseStudies.find((cs) => cs.slug === slug);
  if (!location || !caseStudy) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="text-sm font-semibold text-ink-soft hover:text-ink"
      >
        ← Back
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink">{caseStudy.title}</h1>
      <p className="mt-1 text-sm text-ink-soft">{location.name}</p>
      <CaseStudyForm
        locationId={location.id}
        initial={caseStudy}
        locationAccent={location.theme.accent}
      />
    </div>
  );
}
