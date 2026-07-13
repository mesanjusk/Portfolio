import type { Metadata } from "next";
import { CameraExperience } from "@/components/camera/camera-experience";
import "./camera.css";

export const metadata: Metadata = {
  title: "Alex River — Digicam Portfolio",
  description:
    "An interactive digital-camera-themed portfolio — power it on, look through the lens, and browse the work.",
};

export default function CameraPage() {
  return (
    <div className="digicam">
      <CameraExperience />
    </div>
  );
}
