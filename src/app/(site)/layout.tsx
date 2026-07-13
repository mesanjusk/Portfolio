import { SiteChrome } from "@/components/shared/site-chrome";
import { getLocations } from "@/content/locations";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locations = await getLocations();

  return <SiteChrome locations={locations}>{children}</SiteChrome>;
}
