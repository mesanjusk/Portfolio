"use client";

import { AnimatePresence, motion } from "framer-motion";
import { StatusOverlay } from "@/components/camera/status-overlay";
import { MenuOverlay } from "@/components/camera/menu-overlay";
import { ProjectLightbox } from "@/components/camera/project-lightbox";
import { HomeSection } from "@/components/camera/sections/home-section";
import { AboutSection } from "@/components/camera/sections/about-section";
import { ProjectsSection } from "@/components/camera/sections/projects-section";
import { ContactSection } from "@/components/camera/sections/contact-section";
import type { CameraSection } from "@/components/camera/camera-experience";
import type { CameraProfile, CameraProject } from "@/content/camera-content";

export function CameraScreen({
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
  onGoToSection,
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
  onGoToSection: (s: CameraSection) => void;
}) {
  const lightboxProject = lightboxId ? projects.find((p) => p.id === lightboxId) ?? null : null;

  return (
    <div className="cam-screen">
      <div className="cam-scanlines" />
      <div className="cam-grain" />
      <StatusOverlay mode={section} />

      <div
        className="h-full w-full pt-12 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            {section === "home" && <HomeSection profile={profile} />}
            {section === "about" && <AboutSection profile={profile} />}
            {section === "projects" && (
              <ProjectsSection
                projects={projects}
                selectedId={selectedProjectId}
                onSelect={onSelectProject}
              />
            )}
            {section === "contact" && <ContactSection profile={profile} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxProject && (
          <ProjectLightbox project={lightboxProject} onClose={onCloseLightbox} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && <MenuOverlay active={section} onSelect={onGoToSection} />}
      </AnimatePresence>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-[60] bg-white"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-x-0 bottom-3 z-[60] flex justify-center"
          >
            <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-white/90 backdrop-blur-sm">
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
