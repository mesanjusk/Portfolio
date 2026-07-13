import Image from "next/image";
import { cn } from "@/lib/utils";

export function Plate({
  palette,
  caption,
  imageUrl,
  index,
  className,
}: {
  palette: [string, string, string];
  caption?: string;
  imageUrl?: string | null;
  index?: number;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-ink/10 bg-paper", className)}>
      <div
        className="relative aspect-[4/3]"
        style={
          imageUrl
            ? undefined
            : {
                background: `linear-gradient(${125 + (index ?? 0) * 35}deg, ${palette[0]}, ${palette[1]} 55%, ${palette[2]})`,
              }
        }
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={caption ?? "Sketch plate"}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 384px, 100vw"
          />
        ) : (
          <div className="bg-grain absolute inset-0 opacity-40" />
        )}
        {typeof index === "number" && (
          <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink">
            Plate {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-ink/10 px-4 py-3 text-sm leading-snug text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
