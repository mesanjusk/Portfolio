import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations, getLocation } from "@/content/locations";
import { LocationHero } from "@/components/location/location-hero";
import { NextRoomLink } from "@/components/location/next-room-link";
import { HomeSection } from "@/components/location/sections/home-section";
import { StudioSection } from "@/components/location/sections/studio-section";
import { GallerySection } from "@/components/location/sections/gallery-section";
import { ContactSection } from "@/components/location/sections/contact-section";

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocation(slug);
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
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <article>
      <LocationHero location={location} />
      {location.id === "home" && <HomeSection />}
      {location.id === "gallery" && <GallerySection />}
      {location.id === "contact-house" && <ContactSection />}
      {location.caseStudies.length > 0 && <StudioSection location={location} />}
      <NextRoomLink currentOrder={location.order} />
    </article>
  );
}
