/** Room/location slug. The starter rooms use fixed ids, but admins can add more. */
export type LocationId = string;

export interface LocationTheme {
  /** deep accent used for text/ink on paper */
  ink: string;
  /** primary accent used for CTAs, active states */
  accent: string;
  /** soft tint used for backgrounds/washes */
  wash: string;
}

export interface MapPosition {
  x: number;
  y: number;
}

export interface Sketch {
  caption: string;
  imageUrl?: string | null;
}

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  medium: string;
  summary: string;
  palette: [string, string, string];
  coverImage?: string | null;
  context: string;
  research: string[];
  sketches: Sketch[];
  iterations: { title: string; description: string }[];
  outcome: string;
  reflection: string;
  tools: string[];
}

export interface RoomPhoto {
  url: string;
  caption?: string;
}

export interface LocationEntry {
  id: LocationId;
  order: number;
  name: string;
  epithet: string;
  short: string;
  story: string;
  position: MapPosition;
  theme: LocationTheme;
  photos?: RoomPhoto[];
  caseStudies: CaseStudy[];
}
