"use client";

import { useState } from "react";
import type { CaseStudy } from "@/content/types";
import { upsertCaseStudyAction, deleteCaseStudyAction } from "@/app/admin/(dashboard)/actions";
import { ArrayEditor } from "@/components/admin/array-editor";
import { SketchesEditor } from "@/components/admin/sketches-editor";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";

const DEFAULT_PALETTE: [string, string, string] = ["#A75336", "#E4E9ED", "#2B2622"];

export function CaseStudyForm({
  locationId,
  initial,
  locationAccent,
}: {
  locationId: string;
  initial: CaseStudy | null;
  locationAccent: string;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const action = upsertCaseStudyAction.bind(null, locationId, initial?.slug ?? null);
  const palette = initial?.palette ?? [locationAccent, ...DEFAULT_PALETTE.slice(1)];

  return (
    <form action={action} className="mt-8 flex flex-col gap-6">
      <input type="hidden" name="palette" value={JSON.stringify(palette)} />

      <Field
        label="Title"
        name="title"
        defaultValue={initial?.title ?? ""}
        onValue={(v, form) => {
          const slugInput = form.elements.namedItem("slug") as HTMLInputElement | null;
          if (slugInput && !slugInput.dataset.touched) slugInput.value = v;
        }}
      />
      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Slug (used in the URL — only letters, numbers, dashes)
        </span>
        <input
          name="slug"
          defaultValue={initial?.slug ?? ""}
          onChange={(e) => {
            e.target.dataset.touched = "1";
          }}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Year" name="year" defaultValue={initial?.year ?? ""} />
        <Field label="Medium" name="medium" defaultValue={initial?.medium ?? ""} />
      </div>

      <Field
        label="Summary (one or two sentences, shown on cards)"
        name="summary"
        defaultValue={initial?.summary ?? ""}
        multiline
        rows={2}
      />

      <ImageField name="cover" label="Cover image (optional)" currentUrl={initial?.coverImage} />
      <input type="hidden" name="existingCover" value={initial?.coverImage ?? ""} />

      <Field label="Context" name="context" defaultValue={initial?.context ?? ""} multiline rows={4} />

      <Field
        label="Research (one point per line)"
        name="research"
        defaultValue={(initial?.research ?? []).join("\n")}
        multiline
        rows={4}
      />

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Sketches / plates
        </p>
        <div className="mt-3">
          <SketchesEditor initialSketches={initial?.sketches ?? []} />
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Iterations
        </p>
        <div className="mt-3">
          <ArrayEditor
            name="iterations"
            initialItems={initial?.iterations ?? []}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", multiline: true },
            ]}
            emptyItem={{ title: "", description: "" }}
            addLabel="+ Add iteration"
          />
        </div>
      </section>

      <Field label="Final outcome" name="outcome" defaultValue={initial?.outcome ?? ""} multiline rows={3} />
      <Field label="Reflection" name="reflection" defaultValue={initial?.reflection ?? ""} multiline rows={3} />
      <Field
        label="Tools (one per line)"
        name="tools"
        defaultValue={(initial?.tools ?? []).join("\n")}
        multiline
        rows={3}
      />

      <div className="flex items-center gap-4">
        <Button type="submit">{initial ? "Save case study" : "Create case study"}</Button>
        {initial && (
          <DeleteButton
            locationId={locationId}
            slug={initial.slug}
            confirming={confirmingDelete}
            onConfirm={() => setConfirmingDelete(true)}
          />
        )}
      </div>
    </form>
  );
}

function DeleteButton({
  locationId,
  slug,
  confirming,
  onConfirm,
}: {
  locationId: string;
  slug: string;
  confirming: boolean;
  onConfirm: () => void;
}) {
  if (!confirming) {
    return (
      <button
        type="button"
        onClick={onConfirm}
        className="text-xs font-semibold uppercase tracking-wide text-red-700"
      >
        Delete
      </button>
    );
  }
  return (
    <form action={deleteCaseStudyAction.bind(null, locationId, slug)}>
      <button
        type="submit"
        className="text-xs font-semibold uppercase tracking-wide text-red-700 underline"
      >
        Confirm delete — this can&apos;t be undone
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  multiline,
  rows,
  onValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
  multiline?: boolean;
  rows?: number;
  onValue?: (value: string, form: HTMLFormElement) => void;
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
          onChange={(e) => onValue?.(e.target.value, e.target.form as HTMLFormElement)}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      )}
    </label>
  );
}
