import type { MetadataRoute } from "next";
import { getLocations } from "@/content/locations";

export const dynamic = "force-dynamic";

const BASE_URL = "https://mahiiway.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locations = await getLocations();

  const locationPages = locations.map((location) => ({
    url: `${BASE_URL}/${location.id}`,
    lastModified: new Date(),
  }));

  const caseStudyPages = locations.flatMap((location) =>
    location.caseStudies.map((cs) => ({
      url: `${BASE_URL}/${location.id}/${cs.slug}`,
      lastModified: new Date(),
    }))
  );

  return [{ url: BASE_URL, lastModified: new Date() }, ...locationPages, ...caseStudyPages];
}
