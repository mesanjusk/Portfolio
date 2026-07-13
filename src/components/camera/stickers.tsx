"use client";

interface StickerSpec {
  emoji: string;
  top: string;
  left: string;
  rot: number;
  delay: number;
  size: number;
}

const DEFAULT_STICKERS: StickerSpec[] = [
  { emoji: "✨", top: "12%", left: "14%", rot: -12, delay: 0, size: 28 },
  { emoji: "🌀", top: "18%", left: "78%", rot: 10, delay: 0.15, size: 26 },
  { emoji: "💖", top: "68%", left: "16%", rot: 8, delay: 0.3, size: 24 },
  { emoji: "🎀", top: "72%", left: "76%", rot: -8, delay: 0.45, size: 26 },
  { emoji: "⭐", top: "40%", left: "6%", rot: -6, delay: 0.6, size: 20 },
  { emoji: "⭐", top: "8%", left: "48%", rot: 6, delay: 0.75, size: 18 },
];

/** Cute floating emoji stickers — a lightweight stand-in for animated GIFs. */
export function Stickers({ variant = "boot" }: { variant?: "boot" | "subtle" }) {
  const stickers = variant === "subtle" ? DEFAULT_STICKERS.slice(0, 3) : DEFAULT_STICKERS;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {stickers.map((s, i) => (
        <span
          key={i}
          className="cam-sticker absolute select-none"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            ["--rot" as string]: `${s.rot}deg`,
            animation: `cam-pop-in 0.5s var(--ease-soft, ease) both ${s.delay}s, cam-float 3.4s ease-in-out ${s.delay + 0.5}s infinite`,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}
