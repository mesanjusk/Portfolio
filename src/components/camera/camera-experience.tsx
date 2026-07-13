"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "@/components/camera/boot-sequence";
import { CameraShell } from "@/components/camera/camera-shell";
import { cameraProfile, cameraProjects } from "@/content/camera-content";

export type CameraSection = "home" | "about" | "projects" | "contact";

const SECTION_ORDER: CameraSection[] = ["home", "about", "projects", "contact"];
const SESSION_KEY = "digicam:booted";
const ZOOM_MIN = 0.85;
const ZOOM_MAX = 1.3;
const ZOOM_STEP = 0.15;

export function CameraExperience() {
  const [booted, setBooted] = useState(false);
  const [section, setSection] = useState<CameraSection>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selectedProjectId, setSelectedProjectId] = useState(cameraProjects[0].id);
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [shotCount, setShotCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY)) setBooted(true);
  }, []);

  const finishBoot = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }
    setBooted(true);
  }, []);

  const flashPulse = useCallback((duration = 160) => {
    setFlash(true);
    setTimeout(() => setFlash(false), duration);
  }, []);

  const cycleMode = useCallback(() => {
    setMenuOpen(false);
    setLightboxId(null);
    flashPulse(110);
    setSection((prev) => {
      const idx = SECTION_ORDER.indexOf(prev);
      return SECTION_ORDER[(idx + 1) % SECTION_ORDER.length];
    });
  }, [flashPulse]);

  const cyclePrev = useCallback(() => {
    setMenuOpen(false);
    setLightboxId(null);
    flashPulse(110);
    setSection((prev) => {
      const idx = SECTION_ORDER.indexOf(prev);
      return SECTION_ORDER[(idx - 1 + SECTION_ORDER.length) % SECTION_ORDER.length];
    });
  }, [flashPulse]);

  const goToSection = useCallback(
    (next: CameraSection) => {
      flashPulse(110);
      setSection(next);
      setMenuOpen(false);
      setLightboxId(null);
    },
    [flashPulse]
  );

  const zoomIn = useCallback(() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2))), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2))), []);

  const pressShutter = useCallback(() => {
    if (menuOpen) return;

    if (lightboxId) {
      setLightboxId(null);
      return;
    }

    flashPulse(200);
    setShotCount((c) => c + 1);

    if (section === "projects") {
      setTimeout(() => setLightboxId(selectedProjectId), 140);
    } else {
      const label = `IMG_${String(shotCount + 1).padStart(3, "0")}.JPG saved`;
      setToast(label);
      setTimeout(() => setToast((t) => (t === label ? null : t)), 1300);
    }
  }, [menuOpen, lightboxId, section, selectedProjectId, shotCount, flashPulse]);

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center gap-3 overflow-hidden px-2 py-3">
      <AnimatePresence>
        {!booted && <BootSequence onDone={finishBoot} />}
      </AnimatePresence>

      {booted && (
        <CameraShell
          profile={cameraProfile}
          projects={cameraProjects}
          section={section}
          menuOpen={menuOpen}
          zoom={zoom}
          selectedProjectId={selectedProjectId}
          lightboxId={lightboxId}
          flash={flash}
          toast={toast}
          onSelectProject={setSelectedProjectId}
          onCloseLightbox={() => setLightboxId(null)}
          onCycleMode={cycleMode}
          onCyclePrev={cyclePrev}
          onToggleMenu={() => setMenuOpen((v) => !v)}
          onGoToSection={goToSection}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onShutter={pressShutter}
        />
      )}
    </div>
  );
}
