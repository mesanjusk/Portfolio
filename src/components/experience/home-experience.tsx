"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/experience/loading-screen";
import { WelcomeGate } from "@/components/experience/welcome-gate";
import { useChromeVisibility } from "@/components/providers/chrome-visibility";

const CreativeMap = dynamic(
  () => import("@/components/map/creative-map").then((m) => m.CreativeMap),
  { ssr: false }
);

type Phase = "loading" | "gate" | "explore";

const SESSION_KEY = "mahiiway:entered";

export function HomeExperience() {
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

      {phase === "explore" && <CreativeMap />}
    </div>
  );
}
