import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation } from "@/content/locations";
import { CaseStudyForm } from "@/components/admin/case-study-form";

export default async function NewCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await getLocation(id);
  if (!location) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="text-sm font-semibold text-ink-soft hover:text-ink"
      >
        ← Back
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink">
        New case study — {location.name}
      </h1>
      <CaseStudyForm
        locationId={location.id}
        initial={null}
        locationAccent={location.theme.accent}
      />
    </div>
  );
}
