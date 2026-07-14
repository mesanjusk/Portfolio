"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/experience/loading-screen";
import { WelcomeGate } from "@/components/experience/welcome-gate";
import { useChromeVisibility } from "@/components/providers/chrome-visibility";
import { useMapTransition } from "@/components/providers/transition-provider";
import type { LocationEntry } from "@/content/types";
import type { Profile } from "@/content/profile";

const CreativeMap = dynamic(
  () => import("@/components/map/creative-map").then((m) => m.CreativeMap),
  { ssr: false }
);

type Phase = "loading" | "gate" | "explore";

const SESSION_KEY = "mahiiway:entered";

export function HomeExperience({
  locations,
  profile,
}: {
  locations: LocationEntry[];
  profile: Profile;
}) {
  const { setVisible } = useChromeVisibility();
  const { travelTo } = useMapTransition();
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY)) {
      setPhase("explore");
    }
  }, []);

  useEffect(() => {
    setVisible(phase === "explore");
  }, [phase, setVisible]);

  const enterJourney = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    const home = locations.find((l) => l.id === "home");
    travelTo("/home", { x: 50, y: 50 }, home?.theme.accent);
  };

  return (
    <div className="relative h-dvh w-full">
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onDone={() => setPhase("gate")} />
        )}
        {phase === "gate" && (
          <WelcomeGate key="gate" profile={profile} onEnter={enterJourney} />
        )}
      </AnimatePresence>

      {phase === "explore" && <CreativeMap locations={locations} />}
    </div>
  );
}
