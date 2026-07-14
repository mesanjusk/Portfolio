"use client";

import { useEffect } from "react";
import { useJourney } from "@/components/providers/journey-provider";

/** Marks a room as visited the moment its page mounts. Renders nothing. */
export function JourneyTracker({ id }: { id: string }) {
  const { visit } = useJourney();

  useEffect(() => {
    visit(id);
  }, [id, visit]);

  return null;
}
