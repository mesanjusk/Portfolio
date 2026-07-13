# MahiiWay

MahiiWay is an interactive creative world for **Mahi**, a NIFT Foundation
Course student — built as a small map you walk through, not a portfolio you
scroll. Visitors pass through a loading sequence, a welcome gate, and then
the same illustrated map on every device, scaled to fit rather than swapped
for a different layout, arriving at nine themed "rooms," each holding
process-driven case studies.

## Stack

- **Next.js 15** (App Router, TypeScript, static generation)
- **Tailwind CSS v4** for the design system (warm, editorial, paper-textured)
- **Framer Motion** for cinematic transitions, hover choreography, and
  reduced-motion-aware animation (`MotionConfig reducedMotion="user"` makes
  every animation in the tree respect the OS setting automatically)
- **GSAP** (`ScrollTrigger`), dynamically imported only on the Gallery page,
  for a scroll-triggered reveal — used sparingly and code-split away from the
  main bundle
- **Lenis** for desktop-only smooth scrolling (the map is a fixed canvas
  rather than a long scroll surface, so it opts out on its own)
- Hand-rolled shadcn/ui-style primitives (`Button`, `Sheet`) built on Radix

No third-party photography or stock imagery is used. Sketch/plate imagery is
represented with generated colour-plate placeholders (`Plate` component) —
swap these for real photography of Mahi's actual work before shipping.

## Project structure

```
src/
  app/
    page.tsx                    Loading → Welcome Gate → Map/Journey
    [location]/page.tsx         One of the 9 rooms
    [location]/[project]/page.tsx  Case study (Context/Research/Sketches/
                                    Iterations/Final Outcome/Reflection)
    icon.tsx, opengraph-image.tsx, robots.ts, sitemap.ts
  components/
    experience/    Loading screen, welcome gate, phase orchestrator
    map/            The illustrated map, nodes, line-art icons
    location/       Hero, case-study sections, plates, next-room link
    providers/      Smooth scroll, cinematic route transition, reduced
                     motion config, chrome (header) visibility
    shared/         Site header/nav drawer, page-enter animation
    ui/             Button, Sheet
  content/           All copy — profile.ts, locations.ts, types.ts
  lib/               cn(), media query hook, smooth SVG path helper
```

### Content

Everything text-related — Mahi's bio, the nine rooms, and every case study's
Context / Research / Sketches / Iterations / Final Outcome / Reflection — lives
in `src/content/locations.ts` and `src/content/profile.ts`, fully typed via
`src/content/types.ts`. Editing the site's content never requires touching a
component.

## Desktop vs. mobile UX

Both share one map (`components/map/creative-map.tsx`, `map-node.tsx`) — the
same nodes, the same hand-drawn connecting trail, the same click/tap-to-travel
circular-reveal transition (`providers/transition-provider.tsx`):

- **Desktop** (≥900px): the map fills the viewport at its natural size. Node
  labels reveal on hover, with a scale/rotate/wash animation, since a mouse
  can hover before committing.
- **Mobile**: rather than a scroll/pan surface, the whole map is laid out on
  a fixed 620×760 virtual canvas and uniformly scaled down with a CSS
  `transform: scale()` to fit the viewport in one screen — the same effect as
  a browser's "Request desktop site" zoom, so the full map, trail, and every
  node are visible at once with no panning. The canvas size is tuned so the
  fixed-size node circles stay clear of each other at the percentage
  positions shared with desktop. Labels stay hover-only, matching desktop,
  since at mobile's scale-down factor always-on text would be illegibly
  small; the header's "Rooms" drawer lists every room by name as the
  text-first way to find one.

## Accessibility

- Semantic landmarks, one `<h1>` per view (including a screen-reader-only
  heading on the map, since it has no visible page-title text)
- Full keyboard operability — map nodes are native `<button>` elements in
  narrative tab order, with a visible `:focus-visible` ring site-wide
- "Skip to content" link on every page
- `prefers-reduced-motion` respected globally via Framer Motion's
  `reducedMotion="user"`, plus explicit skips for the loading sequence and
  page-transition wipe
- All theme accent colours were adjusted to meet WCAG AA (4.5:1) contrast
  against the paper background for text use

## Performance

- Static generation for every route (`generateStaticParams` for all 9 rooms
  and every case study — verify with `npm run build`)
- No raster images/photography — all visuals are CSS/SVG (gradients, inline
  line-art icons, an SVG-noise paper-grain texture), so there's no LCP image
  weight to optimize
- `next/font` self-hosts Fraunces (display) and Manrope (body) with
  `display: swap`
- The map is dynamically imported (`next/dynamic`, `ssr: false`) since it's
  only needed after the loading/gate sequence, not on first paint
- GSAP is dynamically imported only where used (Gallery scroll reveal)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + static generation check
npm run lint
```

## Deployment (Vercel)

This is a standard Next.js App Router project — no configuration beyond the
default is required:

1. Import the repository in Vercel.
2. Framework preset: Next.js (auto-detected).
3. Deploy. `sitemap.xml`, `robots.txt`, the favicon, and the Open Graph image
   are all generated at build time.

If you deploy to a domain other than `mahiiway.vercel.app`, update
`metadataBase` in `src/app/layout.tsx` and the `BASE_URL` constant in
`src/app/sitemap.ts` / `src/app/robots.ts`.
