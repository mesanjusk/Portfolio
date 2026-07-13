"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/experience/loading-screen";
import { WelcomeGate } from "@/components/experience/welcome-gate";
import { useIsDesktop } from "@/lib/use-media-query";
import { useChromeVisibility } from "@/components/providers/chrome-visibility";

const DesktopMap = dynamic(
  () => import("@/components/map/desktop-map").then((m) => m.DesktopMap),
  { ssr: false }
);
const MobileJourney = dynamic(
  () => import("@/components/mobile/mobile-journey").then((m) => m.MobileJourney),
  { ssr: false }
);

type Phase = "loading" | "gate" | "explore";

const SESSION_KEY = "mahiiway:entered";

export function HomeExperience() {
  const isDesktop = useIsDesktop();
  const { setVisible } = useChromeVisibility();
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

  const enterExplore = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("explore");
  };

  return (
    <div className="relative h-dvh w-full">
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onDone={() => setPhase("gate")} />
        )}
        {phase === "gate" && (
          <WelcomeGate key="gate" onEnter={enterExplore} />
        )}
      </AnimatePresence>

      {phase === "explore" &&
        (isDesktop ? <DesktopMap /> : <MobileJourney />)}
    </div>
  );
}
