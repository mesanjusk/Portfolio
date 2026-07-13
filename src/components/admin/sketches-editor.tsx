"use client";

import { useState } from "react";
import Image from "next/image";
import type { Sketch } from "@/content/types";

let uid = 0;
function nextId() {
  uid += 1;
  return uid;
}

export function SketchesEditor({ initialSketches }: { initialSketches: Sketch[] }) {
  const [rows, setRows] = useState(
    initialSketches.map((s) => ({ id: nextId(), ...s, preview: s.imageUrl ?? null }))
  );

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="sketchCount" value={rows.length} />
      {rows.map((row, i) => (
        <div key={row.id} className="rounded-xl border border-ink/10 bg-paper p-4">
          <input type="hidden" name={`sketch_existing_${i}`} value={row.imageUrl ?? ""} />
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Caption
            </span>
            <textarea
              name={`sketch_caption_${i}`}
              defaultValue={row.caption}
              rows={2}
              className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </label>

          <div className="mt-3 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Image
            </span>
            {row.preview && (
              <div className="relative h-28 w-40 overflow-hidden rounded-lg border border-ink/10 bg-paper-deep/40">
                <Image src={row.preview} alt="" fill className="object-cover" sizes="160px" />
              </div>
            )}
            <input
              type="file"
              name={`sketch_image_${i}`}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setRows((prev) =>
                  prev.map((r, ri) => (ri === i ? { ...r, preview: url } : r))
                );
              }}
              className="text-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-paper"
            />
          </div>

          <button
            type="button"
            onClick={() => setRows((prev) => prev.filter((_, ri) => ri !== i))}
            className="mt-3 text-xs font-semibold uppercase tracking-wide text-red-700"
          >
            Remove plate
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setRows((prev) => [...prev, { id: nextId(), caption: "", imageUrl: null, preview: null }])
        }
        className="self-start text-xs font-semibold uppercase tracking-wide text-accent"
      >
        + Add plate
      </button>
    </div>
  );
}
