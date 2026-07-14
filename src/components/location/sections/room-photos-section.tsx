import Image from "next/image";
import type { RoomPhoto } from "@/content/types";

export function RoomPhotosSection({ photos }: { photos: RoomPhoto[] }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
      <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
        Photos from this room
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <figure key={i} className="overflow-hidden rounded-3xl border border-ink/10 bg-paper">
            <div className="relative aspect-[4/3]">
              <Image
                src={photo.url}
                alt={photo.caption ?? ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 480px, 100vw"
              />
            </div>
            {photo.caption && (
              <figcaption className="px-4 py-3 text-sm text-ink-soft">{photo.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
