import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation } from "@/content/locations";
import { updateLocationAction } from "../../actions";
import { Button } from "@/components/ui/button";

export default async function AdminLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await getLocation(id);
  if (!location) notFound();

  const action = updateLocationAction.bind(null, id);

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-ink-soft hover:text-ink">
        ← Back
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink">{location.name}</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Room {String(location.order + 1).padStart(2, "0")}
      </p>

      <form action={action} className="mt-8 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Epithet (short tagline under the room name)
          </span>
          <input
            name="epithet"
            defaultValue={location.epithet}
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Short description (shown on hover on the map)
          </span>
          <textarea
            name="short"
            defaultValue={location.short}
            rows={2}
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Story (main intro paragraph on the room page)
          </span>
          <textarea
            name="story"
            defaultValue={location.story}
            rows={5}
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        <Button type="submit" className="self-start">
          Save room
        </Button>
      </form>
    </div>
  );
}
