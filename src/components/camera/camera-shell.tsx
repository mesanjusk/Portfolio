"use client";

import { Menu, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Circle } from "lucide-react";
import { CameraScreen } from "@/components/camera/camera-screen";
import type { CameraSection } from "@/components/camera/camera-experience";
import type { CameraProfile, CameraProject } from "@/content/camera-content";

export function CameraShell({
  profile,
  projects,
  section,
  menuOpen,
  zoom,
  selectedProjectId,
  lightboxId,
  flash,
  toast,
  onSelectProject,
  onCloseLightbox,
  onCycleMode,
  onCyclePrev,
  onToggleMenu,
  onGoToSection,
  onZoomIn,
  onZoomOut,
  onShutter,
}: {
  profile: CameraProfile;
  projects: CameraProject[];
  section: CameraSection;
  menuOpen: boolean;
  zoom: number;
  selectedProjectId: string;
  lightboxId: string | null;
  flash: boolean;
  toast: string | null;
  onSelectProject: (id: string) => void;
  onCloseLightbox: () => void;
  onCycleMode: () => void;
  onCyclePrev: () => void;
  onToggleMenu: () => void;
  onGoToSection: (s: CameraSection) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onShutter: () => void;
}) {
  return (
    <>
      <div className="cam-photo-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/camera-frame.jpg" alt="" className="cam-photo-img" draggable={false} />
        <div className="cam-photo-screen">
          <CameraScreen
            profile={profile}
            projects={projects}
            section={section}
            menuOpen={menuOpen}
            zoom={zoom}
            selectedProjectId={selectedProjectId}
            lightboxId={lightboxId}
            flash={flash}
            toast={toast}
            onSelectProject={onSelectProject}
            onCloseLightbox={onCloseLightbox}
            onGoToSection={onGoToSection}
          />
        </div>
      </div>

      <div className="cam-photo-controls">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label="Menu"
          aria-pressed={menuOpen}
          className="cam-btn h-10 w-10 rounded-full"
        >
          <Menu size={16} />
        </button>

        <button
          type="button"
          onClick={onCyclePrev}
          aria-label="Previous section"
          className="cam-btn h-10 w-10 rounded-full"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="cam-btn h-10 min-w-[84px] rounded-full px-3 text-xs font-semibold uppercase tracking-[0.15em]">
          {section}
        </span>

        <button
          type="button"
          onClick={onCycleMode}
          aria-label="Next section"
          className="cam-btn h-10 w-10 rounded-full"
        >
          <ChevronRight size={16} />
        </button>

        <button
          type="button"
          onClick={onZoomOut}
          aria-label="Zoom out"
          className="cam-btn h-10 w-10 rounded-full"
        >
          <ZoomOut size={15} />
        </button>
        <button
          type="button"
          onClick={onZoomIn}
          aria-label="Zoom in"
          className="cam-btn h-10 w-10 rounded-full"
        >
          <ZoomIn size={15} />
        </button>

        <button
          type="button"
          onClick={onShutter}
          aria-label="Shutter — capture"
          className="cam-shutter flex h-11 w-11 items-center justify-center rounded-full text-white"
        >
          <Circle size={14} fill="currentColor" />
        </button>
      </div>
    </>
  );
}
