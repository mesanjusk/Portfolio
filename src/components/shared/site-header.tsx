"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Map as MapIcon } from "lucide-react";
import { locations } from "@/content/locations";
import { useChromeVisibility } from "@/components/providers/chrome-visibility";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export function SiteHeader() {
  const { visible } = useChromeVisibility();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const inMap = pathname === "/";

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6"
        >
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-ink transition-opacity hover:opacity-70 sm:text-xl"
          >
            Mahii<span className="text-accent italic">Way</span>
          </Link>

          <div className="flex items-center gap-2">
            {!inMap && (
              <Link
                href="/"
                className="hidden items-center gap-2 rounded-full border border-ink/15 bg-paper/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur transition-colors hover:border-ink/40 sm:flex"
              >
                <MapIcon className="h-3.5 w-3.5" aria-hidden />
                Map
              </Link>
            )}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur transition-colors hover:border-ink/40"
                  aria-label="Open site navigation"
                >
                  <Menu className="h-3.5 w-3.5" aria-hidden />
                  Rooms
                </button>
              </SheetTrigger>
              <SheetContent open={open}>
                <nav aria-label="All rooms" className="mt-10 flex flex-1 flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    The map
                  </p>
                  <ol className="mt-6 flex flex-1 flex-col gap-1">
                    {locations.map((loc) => (
                      <li key={loc.id}>
                        <Link
                          href={loc.id === "home" ? "/home" : `/${loc.id}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5 transition-colors hover:border-ink/30"
                        >
                          <span className="font-display text-xl text-ink transition-colors group-hover:text-accent">
                            {loc.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                            {String(loc.order + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="mt-8 text-sm font-semibold text-accent underline underline-offset-4"
                  >
                    ← Back to the illustrated map
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
