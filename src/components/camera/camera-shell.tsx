"use client";

import { Menu, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check, Circle } from "lucide-react";
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
    <div className="cam-body">
      <div className="cam-screen-col">
        <div className="cam-screen-bezel">
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

      <div className="cam-control-col">
        {/* grip texture + power LED, decorative */}
        <div className="flex w-full flex-col items-center gap-2">
          <div className="cam-grip-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="cam-led-row">
            <span className="cam-led" />
            <span className="cam-slider" />
          </div>
        </div>

        {/* shutter + menu */}
        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={onShutter}
            aria-label="Shutter — capture"
            className="cam-round-btn cam-shutter flex h-11 w-11 items-center justify-center text-white"
          >
            <Circle size={14} fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="Menu"
            aria-pressed={menuOpen}
            className="cam-round-btn flex h-9 w-9 items-center justify-center"
          >
            <Menu size={14} />
          </button>
        </div>

        {/* jog dial: zoom + section navigation */}
        <div className="cam-dial" role="group" aria-label="Navigation dial">
          <button
            type="button"
            onClick={onZoomIn}
            aria-label="Zoom in"
            className="cam-dial-btn cam-dial-up"
          >
            <ChevronUp size={15} />
          </button>
          <button
            type="button"
            onClick={onZoomOut}
            aria-label="Zoom out"
            className="cam-dial-btn cam-dial-down"
          >
            <ChevronDown size={15} />
          </button>
          <button
            type="button"
            onClick={onCyclePrev}
            aria-label="Previous section"
            className="cam-dial-btn cam-dial-left"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={onCycleMode}
            aria-label="Next section"
            className="cam-dial-btn cam-dial-right"
          >
            <ChevronRight size={15} />
          </button>
          <button
            type="button"
            onClick={onShutter}
            aria-label="OK — select"
            className="cam-dial-center"
          >
            <Check size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
