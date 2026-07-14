const JOURNEY_STORAGE_KEY = "mahiiway:journey";

export interface JourneyState {
  /** room ids in the order the visitor actually walked through them */
  visitedRooms: string[];
  /** how many of those rooms the map has already shown fully "grown" */
  lastSeenCount: number;
}

const EMPTY_STATE: JourneyState = { visitedRooms: [], lastSeenCount: 0 };

export function loadJourney(): JourneyState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<JourneyState>;
    if (!Array.isArray(parsed.visitedRooms)) return EMPTY_STATE;
    return {
      visitedRooms: parsed.visitedRooms.filter((id) => typeof id === "string"),
      lastSeenCount:
        typeof parsed.lastSeenCount === "number" ? parsed.lastSeenCount : 0,
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function saveJourney(state: JourneyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(state));
}
