import Link from "next/link";
import { getLocations } from "@/content/locations";

export default async function AdminDashboard() {
  const locations = [...(await getLocations())].sort((a, b) => a.order - b.order);

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Content</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Edit MahiiWay&apos;s text and images. Changes save instantly to the
        live site.
      </p>

      <Link
        href="/admin/profile"
        className="mt-8 flex items-center justify-between rounded-2xl border border-ink/10 bg-paper px-6 py-5 transition-colors hover:border-accent"
      >
        <div>
          <p className="font-display text-xl text-ink">Profile</p>
          <p className="mt-1 text-sm text-ink-soft">
            Bio, tagline, stats, values, social links, avatar
          </p>
        </div>
        <span className="text-sm font-semibold text-accent">Edit →</span>
      </Link>

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Rooms
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="rounded-2xl border border-ink/10 bg-paper px-6 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-xl text-ink">{location.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{location.epithet}</p>
              </div>
              <Link
                href={`/admin/locations/${location.id}`}
                className="shrink-0 text-sm font-semibold text-accent"
              >
                Edit text →
              </Link>
            </div>
            {location.caseStudies.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
                {location.caseStudies.map((cs) => (
                  <li key={cs.slug} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-ink">{cs.title}</span>
                    <Link
                      href={`/admin/locations/${location.id}/case-studies/${cs.slug}`}
                      className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-soft hover:text-accent"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/admin/locations/${location.id}/case-studies/new`}
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-accent"
            >
              + Add case study
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
