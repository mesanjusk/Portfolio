"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  ChromeVisibilityProvider,
  useChromeVisibility,
} from "@/components/providers/chrome-visibility";
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

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ChromeVisibilityProvider>
      <ChromeSync />
      <SiteHeader />
      <main id="main">{children}</main>
    </ChromeVisibilityProvider>
  );
}
