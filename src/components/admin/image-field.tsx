"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageField({
  name,
  label,
  currentUrl,
}: {
  name: string;
  label: string;
  currentUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      {preview && (
        <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-ink/10 bg-paper-deep/40">
          <Image src={preview} alt="" fill className="object-cover" sizes="128px" />
        </div>
      )}
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="text-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-paper"
      />
    </div>
  );
}
