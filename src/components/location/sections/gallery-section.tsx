"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { galleryHighlights } from "@/content/locations";
import { useReducedMotion } from "framer-motion";

export function GallerySection() {
  const highlights = galleryHighlights();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !gridRef.current) return;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const cards = gridRef.current?.querySelectorAll("[data-plate]");
      if (!cards?.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }) as unknown as { revert: () => void };
    })();

    return () => ctx?.revert();
  }, [reduced]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
        One piece, from every room
      </h2>
      <div ref={gridRef} className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map(({ location, caseStudy }) => (
          <Link
            key={caseStudy.slug}
            href={`/${location.id}/${caseStudy.slug}`}
            data-plate
            className="group block overflow-hidden rounded-3xl border border-ink/10 bg-paper"
          >
            <div
              className="flex h-52 items-end p-6"
              style={{
                background: `linear-gradient(150deg, ${caseStudy.palette[0]}, ${caseStudy.palette[1]} 55%, ${caseStudy.palette[2]})`,
              }}
            >
              <span className="rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                {location.name}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-medium text-ink">
                  {caseStudy.title}
                </h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {caseStudy.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
