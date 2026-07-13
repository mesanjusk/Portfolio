"use client";

import { BatteryMedium } from "lucide-react";
import { useCameraClock } from "@/lib/use-camera-clock";

export function StatusOverlay({ mode }: { mode: string }) {
  const clock = useCameraClock();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 font-mono text-[10px] text-white/80 sm:text-[11px]">
      <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
        <span className="cam-rec-dot h-1.5 w-1.5 rounded-full bg-red-500" />
        <span className="tracking-[0.2em]">REC</span>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
          <span className="uppercase tracking-[0.15em] text-white/70">{mode}</span>
          <BatteryMedium size={13} />
        </div>
        {clock && (
          <span className="rounded-full bg-black/30 px-2 py-0.5 tracking-[0.1em] text-white/60 backdrop-blur-sm">
            {clock}
          </span>
        )}
      </div>
    </div>
  );
}
