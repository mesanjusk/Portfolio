"use client";

import { useState } from "react";

interface FieldSpec<T> {
  key: keyof T;
  label: string;
  multiline?: boolean;
}

export function ArrayEditor<T extends Record<string, string>>({
  name,
  initialItems,
  fields,
  emptyItem,
  addLabel = "+ Add",
}: {
  name: string;
  initialItems: T[];
  fields: FieldSpec<T>[];
  emptyItem: T;
  addLabel?: string;
}) {
  const [items, setItems] = useState<T[]>(initialItems);

  const update = (index: number, key: keyof T, value: string) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const remove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-ink/10 bg-paper p-4">
          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <label key={String(field.key)} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {field.label}
                </span>
                {field.multiline ? (
                  <textarea
                    value={item[field.key] as string}
                    onChange={(e) => update(i, field.key, e.target.value)}
                    rows={2}
                    className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                  />
                ) : (
                  <input
                    value={item[field.key] as string}
                    onChange={(e) => update(i, field.key, e.target.value)}
                    className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                  />
                )}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-3 text-xs font-semibold uppercase tracking-wide text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, emptyItem])}
        className="self-start text-xs font-semibold uppercase tracking-wide text-accent"
      >
        {addLabel}
      </button>
    </div>
  );
}
