"use client";

import { Menu, Aperture, ZoomIn, ZoomOut, Circle } from "lucide-react";
import { CameraScreen } from "@/components/camera/camera-screen";
import type { CameraSection } from "@/components/camera/camera-experience";
import type { CameraProfile, CameraProject } from "@/content/camera-content";

const SECTION_ORDER: CameraSection[] = ["home", "about", "projects", "contact"];

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
  onToggleMenu: () => void;
  onGoToSection: (s: CameraSection) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onShutter: () => void;
}) {
  const modeIndex = SECTION_ORDER.indexOf(section);

  return (
    <div className="cam-body">
      {/* strap loops */}
      <span className="cam-strap-loop -left-1 top-6" />
      <span className="cam-strap-loop -right-1 top-6" />

      {/* shutter button, protruding from the top edge like a real digicam */}
      <button
        type="button"
        onClick={onShutter}
        aria-label="Shutter — capture"
        className="cam-shutter absolute -top-5 right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white"
      >
        <Circle size={16} fill="currentColor" />
      </button>

      {/* top trim: lens + speaker holes, decorative */}
      <div className="mb-3 flex items-center justify-between px-1 pt-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#2a2035] to-[#0d0814] shadow-inner">
          <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#2be3b0] opacity-80" />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#d9c7ee]" />
          ))}
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
      </div>

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

      {/* control cluster */}
      <div className="mt-4 flex items-center justify-between gap-2 px-1">
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
          onClick={onCycleMode}
          aria-label="Switch mode"
          className="cam-btn flex h-10 flex-1 items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.15em]"
        >
          <Aperture size={15} />
          <span>{section}</span>
          <span className="text-[10px] text-[color:var(--cam-ink-soft)]">
            {modeIndex + 1}/{SECTION_ORDER.length}
          </span>
        </button>

        <div className="flex gap-1.5">
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
        </div>
      </div>
    </div>
  );
}
