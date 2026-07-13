import type { Metadata, Viewport } from "next";
import { fraunces, manrope } from "@/lib/fonts";
import { MotionRoot } from "@/components/providers/motion-root";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { TransitionProvider } from "@/components/providers/transition-provider";
import { SiteChrome } from "@/components/shared/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mahiiway.vercel.app"),
  title: {
    default: "MahiiWay — Mahi's Creative Journey",
    template: "%s · MahiiWay",
  },
  description:
    "MahiiWay is an interactive creative world by Mahi, a NIFT Foundation Course student — explore an illustrated map of studios, sketchbooks, and process instead of scrolling a portfolio.",
  keywords: [
    "MahiiWay",
    "Mahi",
    "NIFT",
    "Foundation Course",
    "fashion design portfolio",
    "textile design",
    "illustration portfolio",
  ],
  openGraph: {
    title: "MahiiWay — Mahi's Creative Journey",
    description:
      "An interactive illustrated world of a NIFT Foundation Course student's first year — walk through it, don't scroll it.",
    type: "website",
    siteName: "MahiiWay",
  },
  twitter: {
    card: "summary_large_image",
    title: "MahiiWay — Mahi's Creative Journey",
    description:
      "An interactive illustrated world of a NIFT Foundation Course student's first year.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionRoot>
          <SmoothScroll>
            <TransitionProvider>
              <SiteChrome>{children}</SiteChrome>
            </TransitionProvider>
          </SmoothScroll>
        </MotionRoot>
      </body>
    </html>
  );
}
