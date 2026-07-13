import { cache } from "react";
import { sql } from "@vercel/postgres";
import { seedLocations } from "@/content/seed-locations";
import { seedProfile } from "@/content/seed-profile";
import type { CaseStudy, LocationEntry } from "@/content/types";

let schemaReady: Promise<void> | null = null;

/** Creates tables on first use and seeds them from the bundled starter content. Safe to call on every request — cheap no-op once the schema exists. */
export function ensureSchema() {
  if (!schemaReady) schemaReady = migrateAndSeed();
  return schemaReady;
}

async function migrateAndSeed() {
  await sql`
    CREATE TABLE IF NOT EXISTS profile (
      id INT PRIMARY KEY DEFAULT 1,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      role TEXT NOT NULL,
      institute TEXT NOT NULL,
      tagline TEXT NOT NULL,
      bio TEXT NOT NULL,
      location TEXT NOT NULL,
      email TEXT NOT NULL,
      avatar_url TEXT,
      social_instagram TEXT,
      social_behance TEXT,
      social_linkedin TEXT,
      stats JSONB NOT NULL DEFAULT '[]',
      core_values JSONB NOT NULL DEFAULT '[]'
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS locations (
      id TEXT PRIMARY KEY,
      sort_order INT NOT NULL,
      name TEXT NOT NULL,
      epithet TEXT NOT NULL,
      short TEXT NOT NULL,
      story TEXT NOT NULL,
      position_x REAL NOT NULL,
      position_y REAL NOT NULL,
      theme_ink TEXT NOT NULL,
      theme_accent TEXT NOT NULL,
      theme_wash TEXT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS case_studies (
      slug TEXT PRIMARY KEY,
      location_id TEXT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      sort_order INT NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      year TEXT NOT NULL,
      medium TEXT NOT NULL,
      summary TEXT NOT NULL,
      palette JSONB NOT NULL DEFAULT '[]',
      cover_image TEXT,
      context TEXT NOT NULL,
      research JSONB NOT NULL DEFAULT '[]',
      sketches JSONB NOT NULL DEFAULT '[]',
      iterations JSONB NOT NULL DEFAULT '[]',
      outcome TEXT NOT NULL,
      reflection TEXT NOT NULL,
      tools JSONB NOT NULL DEFAULT '[]'
    )
  `;

  const { rows } = await sql`SELECT count(*)::int AS count FROM locations`;
  if (rows[0].count > 0) return;

  for (const location of seedLocations) {
    await sql`
      INSERT INTO locations (id, sort_order, name, epithet, short, story, position_x, position_y, theme_ink, theme_accent, theme_wash)
      VALUES (${location.id}, ${location.order}, ${location.name}, ${location.epithet}, ${location.short}, ${location.story}, ${location.position.x}, ${location.position.y}, ${location.theme.ink}, ${location.theme.accent}, ${location.theme.wash})
      ON CONFLICT (id) DO NOTHING
    `;
    for (const [i, cs] of location.caseStudies.entries()) {
      await sql`
        INSERT INTO case_studies (slug, location_id, sort_order, title, year, medium, summary, palette, cover_image, context, research, sketches, iterations, outcome, reflection, tools)
        VALUES (${cs.slug}, ${location.id}, ${i}, ${cs.title}, ${cs.year}, ${cs.medium}, ${cs.summary}, ${JSON.stringify(cs.palette)}, ${cs.coverImage ?? null}, ${cs.context}, ${JSON.stringify(cs.research)}, ${JSON.stringify(cs.sketches)}, ${JSON.stringify(cs.iterations)}, ${cs.outcome}, ${cs.reflection}, ${JSON.stringify(cs.tools)})
        ON CONFLICT (slug) DO NOTHING
      `;
    }
  }

  await sql`
    INSERT INTO profile (id, name, brand, role, institute, tagline, bio, location, email, avatar_url, social_instagram, social_behance, social_linkedin, stats, core_values)
    VALUES (1, ${seedProfile.name}, ${seedProfile.brand}, ${seedProfile.role}, ${seedProfile.institute}, ${seedProfile.tagline}, ${seedProfile.bio}, ${seedProfile.location}, ${seedProfile.email}, ${seedProfile.avatarUrl}, ${seedProfile.social.instagram}, ${seedProfile.social.behance}, ${seedProfile.social.linkedin}, ${JSON.stringify(seedProfile.stats)}, ${JSON.stringify(seedProfile.values)})
    ON CONFLICT (id) DO NOTHING
  `;
}

function rowToLocation(row: Record<string, unknown>): Omit<LocationEntry, "caseStudies"> {
  return {
    id: row.id as LocationEntry["id"],
    order: row.sort_order as number,
    name: row.name as string,
    epithet: row.epithet as string,
    short: row.short as string,
    story: row.story as string,
    position: { x: row.position_x as number, y: row.position_y as number },
    theme: {
      ink: row.theme_ink as string,
      accent: row.theme_accent as string,
      wash: row.theme_wash as string,
    },
  };
}

function rowToCaseStudy(row: Record<string, unknown>): CaseStudy {
  return {
    slug: row.slug as string,
    title: row.title as string,
    year: row.year as string,
    medium: row.medium as string,
    summary: row.summary as string,
    palette: row.palette as CaseStudy["palette"],
    coverImage: (row.cover_image as string | null) ?? null,
    context: row.context as string,
    research: row.research as string[],
    sketches: row.sketches as CaseStudy["sketches"],
    iterations: row.iterations as CaseStudy["iterations"],
    outcome: row.outcome as string,
    reflection: row.reflection as string,
    tools: row.tools as string[],
  };
}

export const dbGetLocations = cache(async (): Promise<LocationEntry[]> => {
  await ensureSchema();
  const { rows: locationRows } = await sql`SELECT * FROM locations ORDER BY sort_order`;
  const { rows: caseStudyRows } = await sql`SELECT * FROM case_studies ORDER BY sort_order`;
  return locationRows.map((row) => {
    const base = rowToLocation(row);
    return {
      ...base,
      caseStudies: caseStudyRows
        .filter((cs) => cs.location_id === base.id)
        .map(rowToCaseStudy),
    };
  });
});

export const dbGetLocation = cache(async (id: string): Promise<LocationEntry | null> => {
  await ensureSchema();
  const { rows: locationRows } = await sql`SELECT * FROM locations WHERE id = ${id}`;
  if (locationRows.length === 0) return null;
  const { rows: caseStudyRows } = await sql`
    SELECT * FROM case_studies WHERE location_id = ${id} ORDER BY sort_order
  `;
  return { ...rowToLocation(locationRows[0]), caseStudies: caseStudyRows.map(rowToCaseStudy) };
});

export async function dbUpdateLocation(
  id: string,
  data: { epithet: string; short: string; story: string }
) {
  await ensureSchema();
  await sql`
    UPDATE locations SET epithet = ${data.epithet}, short = ${data.short}, story = ${data.story}
    WHERE id = ${id}
  `;
}

export const dbGetCaseStudy = cache(
  async (
    locationId: string,
    slug: string
  ): Promise<{ location: LocationEntry; caseStudy: CaseStudy } | null> => {
    const location = await dbGetLocation(locationId);
    const caseStudy = location?.caseStudies.find((cs) => cs.slug === slug);
    if (!location || !caseStudy) return null;
    return { location, caseStudy };
  }
);

export const dbAllCaseStudySlugs = cache(
  async (): Promise<{ locationId: string; slug: string }[]> => {
    await ensureSchema();
    const { rows } = await sql`SELECT location_id, slug FROM case_studies`;
    return rows.map((r) => ({ locationId: r.location_id as string, slug: r.slug as string }));
  }
);

export const dbGalleryHighlights = cache(
  async (): Promise<{ location: LocationEntry; caseStudy: CaseStudy }[]> => {
    const locations = await dbGetLocations();
    return locations
      .filter((l) => l.caseStudies.length > 0)
      .map((l) => ({ location: l, caseStudy: l.caseStudies[0] }));
  }
);

export interface DbProfile {
  name: string;
  brand: string;
  role: string;
  institute: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string | null;
  social: { instagram: string; behance: string; linkedin: string };
  stats: { value: string; label: string }[];
  values: { title: string; body: string }[];
}

function rowToProfile(row: Record<string, unknown>): DbProfile {
  return {
    name: row.name as string,
    brand: row.brand as string,
    role: row.role as string,
    institute: row.institute as string,
    tagline: row.tagline as string,
    bio: row.bio as string,
    location: row.location as string,
    email: row.email as string,
    avatarUrl: (row.avatar_url as string | null) ?? null,
    social: {
      instagram: (row.social_instagram as string) ?? "",
      behance: (row.social_behance as string) ?? "",
      linkedin: (row.social_linkedin as string) ?? "",
    },
    stats: row.stats as DbProfile["stats"],
    values: row.core_values as DbProfile["values"],
  };
}

export const dbGetProfile = cache(async (): Promise<DbProfile> => {
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM profile WHERE id = 1`;
  return rowToProfile(rows[0]);
});

export async function dbUpdateProfile(data: {
  bio: string;
  tagline: string;
  role: string;
  institute: string;
  location: string;
  email: string;
  avatarUrl: string | null;
  social: { instagram: string; behance: string; linkedin: string };
  stats: { value: string; label: string }[];
  values: { title: string; body: string }[];
}) {
  await ensureSchema();
  await sql`
    UPDATE profile SET
      bio = ${data.bio},
      tagline = ${data.tagline},
      role = ${data.role},
      institute = ${data.institute},
      location = ${data.location},
      email = ${data.email},
      avatar_url = ${data.avatarUrl},
      social_instagram = ${data.social.instagram},
      social_behance = ${data.social.behance},
      social_linkedin = ${data.social.linkedin},
      stats = ${JSON.stringify(data.stats)},
      core_values = ${JSON.stringify(data.values)}
    WHERE id = 1
  `;
}

export async function dbUpsertCaseStudy(
  locationId: string,
  original: CaseStudy,
  sortOrder: number
) {
  await ensureSchema();
  await sql`
    INSERT INTO case_studies (slug, location_id, sort_order, title, year, medium, summary, palette, cover_image, context, research, sketches, iterations, outcome, reflection, tools)
    VALUES (${original.slug}, ${locationId}, ${sortOrder}, ${original.title}, ${original.year}, ${original.medium}, ${original.summary}, ${JSON.stringify(original.palette)}, ${original.coverImage ?? null}, ${original.context}, ${JSON.stringify(original.research)}, ${JSON.stringify(original.sketches)}, ${JSON.stringify(original.iterations)}, ${original.outcome}, ${original.reflection}, ${JSON.stringify(original.tools)})
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      year = EXCLUDED.year,
      medium = EXCLUDED.medium,
      summary = EXCLUDED.summary,
      palette = EXCLUDED.palette,
      cover_image = EXCLUDED.cover_image,
      context = EXCLUDED.context,
      research = EXCLUDED.research,
      sketches = EXCLUDED.sketches,
      iterations = EXCLUDED.iterations,
      outcome = EXCLUDED.outcome,
      reflection = EXCLUDED.reflection,
      tools = EXCLUDED.tools
  `;
}

export async function dbDeleteCaseStudy(slug: string) {
  await ensureSchema();
  await sql`DELETE FROM case_studies WHERE slug = ${slug}`;
}
