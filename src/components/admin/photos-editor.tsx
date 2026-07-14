"use client";

import { useState } from "react";
import Image from "next/image";
import type { RoomPhoto } from "@/content/types";

let uid = 0;
function nextId() {
  uid += 1;
  return uid;
}

export function PhotosEditor({ initialPhotos }: { initialPhotos: RoomPhoto[] }) {
  const [rows, setRows] = useState<
    { id: number; url: string; caption?: string; preview: string | null }[]
  >(initialPhotos.map((p) => ({ id: nextId(), ...p, preview: p.url || null })));

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="photoCount" value={rows.length} />
      {rows.map((row, i) => (
        <div key={row.id} className="rounded-xl border border-ink/10 bg-paper p-4">
          <input type="hidden" name={`photo_existing_${i}`} value={row.url ?? ""} />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Photo
            </span>
            {row.preview && (
              <div className="relative h-28 w-40 overflow-hidden rounded-lg border border-ink/10 bg-paper-deep/40">
                <Image src={row.preview} alt="" fill className="object-cover" sizes="160px" />
              </div>
            )}
            <input
              type="file"
              name={`photo_image_${i}`}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setRows((prev) => prev.map((r, ri) => (ri === i ? { ...r, preview: url } : r)));
              }}
              className="text-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-paper"
            />
          </div>

          <label className="mt-3 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Caption (optional)
            </span>
            <input
              name={`photo_caption_${i}`}
              defaultValue={row.caption ?? ""}
              className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </label>

          <button
            type="button"
            onClick={() => setRows((prev) => prev.filter((_, ri) => ri !== i))}
            className="mt-3 text-xs font-semibold uppercase tracking-wide text-red-700"
          >
            Remove photo
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setRows((prev) => [...prev, { id: nextId(), url: "", caption: "", preview: null }])
        }
        className="self-start text-xs font-semibold uppercase tracking-wide text-accent"
      >
        + Add photo
      </button>
    </div>
  );
}
