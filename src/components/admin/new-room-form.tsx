"use client";

import { createLocationAction } from "@/app/admin/(dashboard)/actions";
import { Button } from "@/components/ui/button";

export function NewRoomForm() {
  return (
    <form action={createLocationAction} className="mt-8 flex flex-col gap-6">
      <Field
        label="Room name"
        name="name"
        onValue={(v, form) => {
          const idInput = form.elements.namedItem("id") as HTMLInputElement | null;
          if (idInput && !idInput.dataset.touched) idInput.value = v;
        }}
      />

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Room ID (used in the URL — only letters, numbers, dashes)
        </span>
        <input
          name="id"
          onChange={(e) => {
            e.target.dataset.touched = "1";
          }}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      </label>

      <Field label="Epithet (short tagline under the room name)" name="epithet" />
      <Field
        label="Short description (shown on hover on the map)"
        name="short"
        multiline
        rows={2}
      />
      <Field
        label="Story (main intro paragraph on the room page)"
        name="story"
        multiline
        rows={5}
      />

      <Button type="submit" className="self-start">
        Create room
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  multiline,
  rows,
  onValue,
}: {
  label: string;
  name: string;
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
          rows={rows ?? 3}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      ) : (
        <input
          name={name}
          onChange={(e) => onValue?.(e.target.value, e.target.form as HTMLFormElement)}
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      )}
    </label>
  );
}
