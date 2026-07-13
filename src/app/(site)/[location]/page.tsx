import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocation, getLocations, galleryHighlights } from "@/content/locations";
import { getProfile } from "@/content/profile";
import { LocationHero } from "@/components/location/location-hero";
import { NextRoomLink } from "@/components/location/next-room-link";
import { HomeSection } from "@/components/location/sections/home-section";
import { StudioSection } from "@/components/location/sections/studio-section";
import { GallerySection } from "@/components/location/sections/gallery-section";
import { ContactSection } from "@/components/location/sections/contact-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = await getLocation(slug);
  if (!location) return {};
  return {
    title: location.name,
    description: location.short,
    openGraph: { title: `${location.name} · MahiiWay`, description: location.short },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = await getLocation(slug);
  if (!location) notFound();

  const needsProfile = location.id === "home" || location.id === "contact-house";

  const [allLocations, profile, highlights] = await Promise.all([
    getLocations(),
    needsProfile ? getProfile() : Promise.resolve(null),
    location.id === "gallery" ? galleryHighlights() : Promise.resolve(null),
  ]);

  return (
    <article>
      <LocationHero location={location} />
      {location.id === "home" && profile && <HomeSection profile={profile} />}
      {location.id === "gallery" && highlights && (
        <GallerySection highlights={highlights} />
      )}
      {location.id === "contact-house" && profile && (
        <ContactSection profile={profile} />
      )}
      {location.caseStudies.length > 0 && <StudioSection location={location} />}
      <NextRoomLink currentOrder={location.order} locations={allLocations} />
    </article>
  );
}
