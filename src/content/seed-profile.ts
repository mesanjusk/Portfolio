/**
 * Initial content, loaded into MongoDB once on first admin/database access
 * (see src/lib/db.ts `ensureSeeded`). The live site reads from the database
 * from then on — editing this file after launch has no effect; use /admin.
 */
export const seedProfile = {
  name: "Mahi",
  brand: "MahiiWay",
  role: "Foundation Course Student",
  institute: "National Institute of Fashion Technology",
  tagline: "A small world built from a first year of looking closely.",
  bio: "I'm Mahi — a first-year Foundation student learning to see the way designers see: in line, in colour, in the grain of a fabric, in the geometry of a rangoli laid before sunrise. MahiiWay is the map of that year. Every room here holds a study, a sketchbook page, a material I couldn't stop touching, or a question I haven't answered yet.",
  location: "India",
  email: "hello@mahiiway.design",
  avatarUrl: null as string | null,
  social: {
    instagram: "https://instagram.com/",
    behance: "https://behance.net/",
    linkedin: "https://linkedin.com/",
  },
  stats: [
    { value: "07", label: "Studio rooms" },
    { value: "40+", label: "Sketchbook pages kept" },
    { value: "12", label: "Materials tested" },
    { value: "01", label: "Foundation year, fully lived" },
  ],
  values: [
    {
      title: "Look twice",
      body: "Most of what I make starts as an ordinary thing observed for longer than usual — a shadow, a seam, a spice stain.",
    },
    {
      title: "Keep the sketch",
      body: "The rough page matters as much as the final plate. This site keeps both, on purpose.",
    },
    {
      title: "Work with hands first",
      body: "Paper, thread, rice flour, pencil — before pixels. Digital tools arrive once the idea already has a body.",
    },
  ],
};
