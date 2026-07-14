"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { LocationEntry } from "@/content/types";
import {
  ChromeVisibilityProvider,
  useChromeVisibility,
} from "@/components/providers/chrome-visibility";
import { JourneyProvider } from "@/components/providers/journey-provider";
import { SiteHeader } from "@/components/shared/site-header";
import { useEffect } from "react";

function ChromeSync() {
  const pathname = usePathname();
  const { setVisible } = useChromeVisibility();

  useEffect(() => {
    if (pathname !== "/") setVisible(true);
  }, [pathname, setVisible]);

  return null;
}

export function SiteChrome({
  children,
  locations,
}: {
  children: ReactNode;
  locations: LocationEntry[];
}) {
  return (
    <JourneyProvider>
      <ChromeVisibilityProvider>
        <ChromeSync />
        <SiteHeader locations={locations} />
        <main id="main">{children}</main>
      </ChromeVisibilityProvider>
    </JourneyProvider>
  );
}
