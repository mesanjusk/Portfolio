import Link from "next/link";
import { getProfile } from "@/content/profile";
import { updateProfileAction } from "../actions";
import { ArrayEditor } from "@/components/admin/array-editor";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-ink-soft hover:text-ink">
        ← Back
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink">Profile</h1>

      <form action={updateProfileAction} className="mt-8 flex flex-col gap-6">
        <ImageField name="avatar" label="Avatar" currentUrl={profile.avatarUrl} />
        <input type="hidden" name="existingAvatar" value={profile.avatarUrl ?? ""} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={profile.name} />
          <Field label="Brand / site name" name="brand" defaultValue={profile.brand} />
        </div>

        <Field label="Tagline" name="tagline" defaultValue={profile.tagline} />
        <Field label="Bio" name="bio" defaultValue={profile.bio} multiline rows={5} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Role" name="role" defaultValue={profile.role} />
          <Field label="Institute" name="institute" defaultValue={profile.institute} />
          <Field label="Location" name="location" defaultValue={profile.location} />
          <Field label="Email" name="email" defaultValue={profile.email} />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="Instagram URL" name="instagram" defaultValue={profile.social.instagram} />
          <Field label="Behance URL" name="behance" defaultValue={profile.social.behance} />
          <Field label="LinkedIn URL" name="linkedin" defaultValue={profile.social.linkedin} />
        </div>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Stats
          </p>
          <div className="mt-3">
            <ArrayEditor
              name="stats"
              initialItems={profile.stats}
              fields={[
                { key: "value", label: "Value" },
                { key: "label", label: "Label" },
              ]}
              emptyItem={{ value: "", label: "" }}
              addLabel="+ Add stat"
            />
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Values
          </p>
          <div className="mt-3">
            <ArrayEditor
              name="values"
              initialItems={profile.values}
              fields={[
                { key: "title", label: "Title" },
                { key: "body", label: "Body", multiline: true },
              ]}
              emptyItem={{ title: "", body: "" }}
              addLabel="+ Add value"
            />
          </div>
        </section>

        <Button type="submit" className="self-start">
          Save profile
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  multiline,
  rows,
}: {
  label: string;
  name: string;
  defaultValue: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={rows ?? 3}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      )}
    </label>
  );
}
