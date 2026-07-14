"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { loadJourney, saveJourney, type JourneyState } from "@/lib/journey";

interface JourneyContextValue extends JourneyState {
  /** true once localStorage has been read on the client */
  hydrated: boolean;
  /** marks a room as visited, appending it to the journey if it's new */
  visit: (id: string) => void;
  /** marks the journey's thread as fully grown up to the current visit count */
  acknowledgeSeen: () => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error("useJourney must be used inside JourneyProvider");
  }
  return ctx;
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  // Read localStorage synchronously on the very first client render, rather
  // than in an effect — a child's mount effect (JourneyTracker.visit) can
  // otherwise fire before this provider's own effect, saving an "optimistic"
  // empty-based state that clobbers previously saved progress.
  const [state, setState] = useState<JourneyState>(() => loadJourney());
  const [hydrated] = useState(() => typeof window !== "undefined");

  const visit = useCallback((id: string) => {
    setState((prev) => {
      if (prev.visitedRooms.includes(id)) return prev;
      const next = { ...prev, visitedRooms: [...prev.visitedRooms, id] };
      saveJourney(next);
      return next;
    });
  }, []);

  const acknowledgeSeen = useCallback(() => {
    setState((prev) => {
      if (prev.lastSeenCount === prev.visitedRooms.length) return prev;
      const next = { ...prev, lastSeenCount: prev.visitedRooms.length };
      saveJourney(next);
      return next;
    });
  }, []);

  return (
    <JourneyContext.Provider value={{ ...state, hydrated, visit, acknowledgeSeen }}>
      {children}
    </JourneyContext.Provider>
  );
}
