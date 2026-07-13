export type LocationId =
  | "home"
  | "fashion-atelier"
  | "digital-lab"
  | "illustration-studio"
  | "rangoli-courtyard"
  | "process-library"
  | "inspiration-garden"
  | "gallery"
  | "contact-house";

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

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  medium: string;
  summary: string;
  palette: [string, string, string];
  context: string;
  research: string[];
  sketches: string[];
  iterations: { title: string; description: string }[];
  outcome: string;
  reflection: string;
  tools: string[];
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
  caseStudies: CaseStudy[];
}
