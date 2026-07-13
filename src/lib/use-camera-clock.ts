"use client";

import { useEffect, useState } from "react";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function format(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year}  ${hours}:${minutes}`;
}

/** Old-camera-style OSD timestamp, ticking client-side only (avoids hydration mismatch). */
export function useCameraClock() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(format(new Date()));
    const id = setInterval(() => setLabel(format(new Date())), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  return label;
}
