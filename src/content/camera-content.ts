/**
 * Placeholder content for the /camera experience. Everything here is
 * static (no database) — swap these values for real copy whenever it's
 * ready, the components don't care where the strings come from.
 */

export interface CameraProject {
  id: string;
  frame: string;
  title: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  highlights: string[];
  gradient: [string, string];
  link?: string;
}

export interface CameraProfile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  location: string;
  aboutParagraphs: string[];
  skills: string[];
  funFacts: { label: string; value: string }[];
  socials: { label: string; href: string }[];
  email: string;
}

export const cameraProfile: CameraProfile = {
  name: "Alex River",
  handle: "@alexriver.codes",
  role: "Creative Developer",
  tagline: "Building playful, interactive things for the internet.",
  location: "Based in India · works worldwide",
  aboutParagraphs: [
    "Hi, I'm Alex — a creative developer who thinks websites should feel like something, not just load like something. I live at the overlap of design and code, where a hover state is a personality trait.",
    "Most days I'm prototyping micro-interactions, breaking grids on purpose, or falling down a rabbit hole about shutter mechanisms for absolutely no reason (see: this website).",
  ],
  skills: [
    "React",
    "TypeScript",
    "Framer Motion",
    "WebGL",
    "UI/UX",
    "Three.js",
    "Design Systems",
  ],
  funFacts: [
    { label: "Coffee : Code ratio", value: "1 : 3" },
    { label: "Side quests shipped", value: "27" },
    { label: "Favorite export format", value: ".gif" },
    { label: "Currently obsessed with", value: "shaders" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  email: "hello@alexriver.codes",
};

export const cameraProjects: CameraProject[] = [
  {
    id: "001",
    frame: "IMG_001",
    title: "Prism Radio",
    role: "Lead Frontend + Motion",
    year: "2026",
    tags: ["React", "WebAudio", "Framer Motion"],
    description:
      "A generative internet radio player where the visualizer is built entirely from the track's live frequency data — no two sessions look alike.",
    highlights: [
      "Realtime audio-reactive canvas running at 60fps on mobile",
      "Custom station-switching transition inspired by tape decks",
      "Shipped to 40k+ monthly listeners",
    ],
    gradient: ["#FFD6E8", "#C9B6FF"],
    link: "https://example.com",
  },
  {
    id: "002",
    frame: "IMG_002",
    title: "Loopline",
    role: "Product Design + Build",
    year: "2025",
    tags: ["Next.js", "Three.js", "Design Systems"],
    description:
      "A collaborative moodboard tool with an infinite 3D canvas — pan, zoom, and pin references the way you'd pin polaroids to a wall.",
    highlights: [
      "Built the full component library from scratch",
      "60% faster board load through custom texture streaming",
      "Featured on a design-tools newsletter roundup",
    ],
    gradient: ["#C7F9E5", "#A6D8FF"],
    link: "https://example.com",
  },
  {
    id: "003",
    frame: "IMG_003",
    title: "Sundial",
    role: "Solo Project",
    year: "2025",
    tags: ["TypeScript", "SVG", "Accessibility"],
    description:
      "A tiny, joyful habit tracker shaped like a clock face instead of a checklist — every streak literally goes around in circles.",
    highlights: [
      "100% keyboard operable, screen-reader tested",
      "Zero-dependency animated SVG engine",
      "Weekend build that turned into a 3-month obsession",
    ],
    gradient: ["#FFE9B8", "#FFC3D6"],
    link: "https://example.com",
  },
  {
    id: "004",
    frame: "IMG_004",
    title: "Static Bloom",
    role: "Creative Coding",
    year: "2024",
    tags: ["p5.js", "Generative Art", "Shaders"],
    description:
      "A generative flower-field that grows differently depending on the visitor's scroll speed and time of day — slow scrollers get slower blooms.",
    highlights: [
      "Exhibited at a local generative-art meetup",
      "Custom shader-based petal rendering",
      "Open-sourced with a full write-up",
    ],
    gradient: ["#D9C4FF", "#BFEFFF"],
    link: "https://example.com",
  },
];
