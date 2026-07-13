"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth";
import {
  dbUpdateLocation,
  dbUpdateProfile,
  dbUpsertCaseStudy,
  dbDeleteCaseStudy,
  dbGetLocation,
} from "@/lib/db";
import type { CaseStudy } from "@/content/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadIfPresent(file: FormDataEntryValue | null, prefix: string) {
  if (!(file instanceof File) || file.size === 0) return null;
  const blob = await put(`${prefix}-${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

export async function updateProfileAction(formData: FormData) {
  await requireAdmin();

  const uploadedAvatar = await uploadIfPresent(formData.get("avatar"), "avatar");
  const existingAvatar = String(formData.get("existingAvatar") ?? "");

  await dbUpdateProfile({
    name: String(formData.get("name") ?? ""),
    brand: String(formData.get("brand") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    role: String(formData.get("role") ?? ""),
    institute: String(formData.get("institute") ?? ""),
    location: String(formData.get("location") ?? ""),
    email: String(formData.get("email") ?? ""),
    avatarUrl: uploadedAvatar ?? existingAvatar ?? null,
    social: {
      instagram: String(formData.get("instagram") ?? ""),
      behance: String(formData.get("behance") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
    },
    stats: JSON.parse(String(formData.get("stats") ?? "[]")),
    values: JSON.parse(String(formData.get("values") ?? "[]")),
  });

  revalidatePath("/", "layout");
  redirect("/admin?saved=profile");
}

export async function updateLocationAction(locationId: string, formData: FormData) {
  await requireAdmin();

  await dbUpdateLocation(locationId, {
    name: String(formData.get("name") ?? ""),
    epithet: String(formData.get("epithet") ?? ""),
    short: String(formData.get("short") ?? ""),
    story: String(formData.get("story") ?? ""),
  });

  revalidatePath("/", "layout");
  redirect(`/admin?saved=${locationId}`);
}

export async function upsertCaseStudyAction(
  locationId: string,
  originalSlug: string | null,
  formData: FormData
) {
  await requireAdmin();

  const location = await dbGetLocation(locationId);
  if (!location) throw new Error("Unknown room");

  const uploadedCover = await uploadIfPresent(formData.get("cover"), "cover");
  const existingCover = String(formData.get("existingCover") ?? "");

  const sketchCount = Number(formData.get("sketchCount") ?? 0);
  const sketches: CaseStudy["sketches"] = [];
  for (let i = 0; i < sketchCount; i++) {
    const caption = String(formData.get(`sketch_caption_${i}`) ?? "").trim();
    const existing = String(formData.get(`sketch_existing_${i}`) ?? "");
    const uploaded = await uploadIfPresent(formData.get(`sketch_image_${i}`), `sketch-${i}`);
    if (!caption && !existing && !uploaded) continue;
    sketches.push({ caption, imageUrl: uploaded || existing || null });
  }

  const rawSlug = String(formData.get("slug") ?? "");
  const slug = slugify(rawSlug);
  if (!slug) throw new Error("Title/slug is required");

  const caseStudy: CaseStudy = {
    slug,
    title: String(formData.get("title") ?? ""),
    year: String(formData.get("year") ?? ""),
    medium: String(formData.get("medium") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    palette: JSON.parse(String(formData.get("palette") ?? "[]")),
    coverImage: uploadedCover ?? existingCover ?? null,
    context: String(formData.get("context") ?? ""),
    research: String(formData.get("research") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    sketches,
    iterations: JSON.parse(String(formData.get("iterations") ?? "[]")),
    outcome: String(formData.get("outcome") ?? ""),
    reflection: String(formData.get("reflection") ?? ""),
    tools: String(formData.get("tools") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  if (originalSlug && originalSlug !== slug) {
    await dbDeleteCaseStudy(locationId, originalSlug);
  }

  const existingIndex = originalSlug
    ? location.caseStudies.findIndex((cs) => cs.slug === originalSlug)
    : -1;
  const sortOrder = existingIndex === -1 ? location.caseStudies.length : existingIndex;

  await dbUpsertCaseStudy(locationId, caseStudy, sortOrder);

  revalidatePath("/", "layout");
  redirect(`/admin?saved=${slug}`);
}

export async function deleteCaseStudyAction(locationId: string, slug: string) {
  await requireAdmin();
  await dbDeleteCaseStudy(locationId, slug);
  revalidatePath("/", "layout");
  redirect("/admin?deleted=1");
}
