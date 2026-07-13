import { MongoClient, type Db } from "mongodb";
import { cache } from "react";
import { seedLocations } from "@/content/seed-locations";
import { seedProfile } from "@/content/seed-profile";
import type { CaseStudy, LocationEntry } from "@/content/types";

let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "MONGODB_URI is not set. Add your MongoDB connection string as an environment variable."
      );
    }
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db();
}

interface LocationDoc {
  _id: string;
  order: number;
  name: string;
  epithet: string;
  short: string;
  story: string;
  position: { x: number; y: number };
  theme: { ink: string; accent: string; wash: string };
  caseStudies: CaseStudy[];
}

interface ProfileDoc {
  _id: "profile";
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

let seedReady: Promise<void> | null = null;

/** Seeds Mongo from the bundled starter content the first time the database is empty. Safe to call on every request — cheap no-op once seeded. */
function ensureSeeded() {
  if (!seedReady) seedReady = seedIfEmpty();
  return seedReady;
}

async function seedIfEmpty() {
  const db = await getDb();
  const locations = db.collection<LocationDoc>("locations");

  if ((await locations.estimatedDocumentCount()) === 0) {
    const docs: LocationDoc[] = seedLocations.map((l) => ({
      _id: l.id,
      order: l.order,
      name: l.name,
      epithet: l.epithet,
      short: l.short,
      story: l.story,
      position: l.position,
      theme: l.theme,
      caseStudies: l.caseStudies,
    }));
    if (docs.length) await locations.insertMany(docs);
  }

  const profiles = db.collection<ProfileDoc>("profile");
  if ((await profiles.estimatedDocumentCount()) === 0) {
    await profiles.insertOne({
      _id: "profile",
      name: seedProfile.name,
      brand: seedProfile.brand,
      role: seedProfile.role,
      institute: seedProfile.institute,
      tagline: seedProfile.tagline,
      bio: seedProfile.bio,
      location: seedProfile.location,
      email: seedProfile.email,
      avatarUrl: seedProfile.avatarUrl,
      social: seedProfile.social,
      stats: seedProfile.stats,
      values: seedProfile.values,
    });
  }
}

function docToLocation(doc: LocationDoc): LocationEntry {
  return {
    id: doc._id as LocationEntry["id"],
    order: doc.order,
    name: doc.name,
    epithet: doc.epithet,
    short: doc.short,
    story: doc.story,
    position: doc.position,
    theme: doc.theme,
    caseStudies: doc.caseStudies ?? [],
  };
}

export const dbGetLocations = cache(async (): Promise<LocationEntry[]> => {
  await ensureSeeded();
  const db = await getDb();
  const docs = await db
    .collection<LocationDoc>("locations")
    .find()
    .sort({ order: 1 })
    .toArray();
  return docs.map(docToLocation);
});

export const dbGetLocation = cache(async (id: string): Promise<LocationEntry | null> => {
  await ensureSeeded();
  const db = await getDb();
  const doc = await db.collection<LocationDoc>("locations").findOne({ _id: id });
  return doc ? docToLocation(doc) : null;
});

export async function dbUpdateLocation(
  id: string,
  data: { name: string; epithet: string; short: string; story: string }
) {
  const db = await getDb();
  await db.collection<LocationDoc>("locations").updateOne({ _id: id }, { $set: data });
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
    const locations = await dbGetLocations();
    return locations.flatMap((l) =>
      l.caseStudies.map((cs) => ({ locationId: l.id, slug: cs.slug }))
    );
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

function docToProfile(doc: ProfileDoc): DbProfile {
  return {
    name: doc.name,
    brand: doc.brand,
    role: doc.role,
    institute: doc.institute,
    tagline: doc.tagline,
    bio: doc.bio,
    location: doc.location,
    email: doc.email,
    avatarUrl: doc.avatarUrl ?? null,
    social: doc.social ?? { instagram: "", behance: "", linkedin: "" },
    stats: doc.stats ?? [],
    values: doc.values ?? [],
  };
}

export const dbGetProfile = cache(async (): Promise<DbProfile> => {
  await ensureSeeded();
  const db = await getDb();
  const doc = await db.collection<ProfileDoc>("profile").findOne({ _id: "profile" });
  if (!doc) throw new Error("Profile document missing after seed");
  return docToProfile(doc);
});

export async function dbUpdateProfile(data: {
  name: string;
  brand: string;
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
  const db = await getDb();
  await db.collection<ProfileDoc>("profile").updateOne(
    { _id: "profile" },
    {
      $set: {
        name: data.name,
        brand: data.brand,
        bio: data.bio,
        tagline: data.tagline,
        role: data.role,
        institute: data.institute,
        location: data.location,
        email: data.email,
        avatarUrl: data.avatarUrl,
        social: data.social,
        stats: data.stats,
        values: data.values,
      },
    },
    { upsert: true }
  );
}

export async function dbUpsertCaseStudy(
  locationId: string,
  caseStudy: CaseStudy,
  sortOrder: number
) {
  const db = await getDb();
  const collection = db.collection<LocationDoc>("locations");
  const doc = await collection.findOne({ _id: locationId });
  if (!doc) throw new Error("Unknown room");

  const existing = doc.caseStudies ?? [];
  const index = existing.findIndex((cs) => cs.slug === caseStudy.slug);
  let next: CaseStudy[];
  if (index >= 0) {
    next = existing.map((cs, i) => (i === index ? caseStudy : cs));
  } else {
    next = [...existing];
    next.splice(Math.min(sortOrder, next.length), 0, caseStudy);
  }

  await collection.updateOne({ _id: locationId }, { $set: { caseStudies: next } });
}

export async function dbDeleteCaseStudy(locationId: string, slug: string) {
  const db = await getDb();
  await db
    .collection<LocationDoc>("locations")
    .updateOne({ _id: locationId }, { $pull: { caseStudies: { slug } } });
}
