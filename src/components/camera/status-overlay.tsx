"use client";

import { BatteryMedium } from "lucide-react";
import { useCameraClock } from "@/lib/use-camera-clock";

export function StatusOverlay({ mode }: { mode: string }) {
  const clock = useCameraClock();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-1.5 py-1 font-mono text-[7px] text-white/80 sm:text-[8px]">
      <div className="flex items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm">
        <span className="cam-rec-dot h-1 w-1 rounded-full bg-red-500" />
        <span className="tracking-[0.15em]">REC</span>
      </div>

      {clock && (
        <span className="rounded-full bg-black/30 px-1.5 py-0.5 tracking-[0.05em] text-white/60 backdrop-blur-sm">
          {clock}
        </span>
      )}

      <div className="flex items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm">
        <span className="uppercase tracking-[0.1em] text-white/70">{mode}</span>
        <BatteryMedium size={11} />
      </div>
    </div>
  );
}
