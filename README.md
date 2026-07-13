# MahiiWay

MahiiWay is an interactive creative world for **Mahi**, a NIFT Foundation
Course student — built as a small map you walk through, not a portfolio you
scroll. Visitors pass through a loading sequence, a welcome gate, and then
the same illustrated map on every device, scaled to fit rather than swapped
for a different layout, arriving at nine themed "rooms," each holding
process-driven case studies. All text and images are editable from a private
admin panel — see **Admin panel** below.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** for the design system (warm, editorial, paper-textured)
- **Vercel Postgres** for content, **Vercel Blob** for uploaded images — the
  public site reads live from the database so admin edits appear immediately
  (see **Admin panel**)
- **Framer Motion** for cinematic transitions, hover choreography, and
  reduced-motion-aware animation (`MotionConfig reducedMotion="user"` makes
  every animation in the tree respect the OS setting automatically)
- **GSAP** (`ScrollTrigger`), dynamically imported only on the Gallery page,
  for a scroll-triggered reveal — used sparingly and code-split away from the
  main bundle
- **Lenis** for desktop-only smooth scrolling (the map is a fixed canvas
  rather than a long scroll surface, so it opts out on its own)
- Hand-rolled shadcn/ui-style primitives (`Button`, `Sheet`) built on Radix

Sketch/case-study imagery falls back to generated colour-plate placeholders
(`Plate` component) until a real photo is uploaded through the admin panel —
no stock photography is used anywhere.

## Project structure

```
src/
  app/
    (site)/                     Public site — its own layout fetches
                                 locations once and provides the header/nav
      page.tsx                  Loading → Welcome Gate → Map
      [location]/page.tsx       One of the 9 rooms
      [location]/[project]/page.tsx  Case study (Context/Research/Sketches/
                                      Iterations/Final Outcome/Reflection)
    admin/                      Password-gated admin panel (see below)
      login/                    Public login page — no DB dependency
      (dashboard)/              Everything behind the session cookie
    icon.tsx, opengraph-image.tsx, robots.ts, sitemap.ts
  components/
    experience/    Loading screen, welcome gate, phase orchestrator
    map/            The illustrated map, nodes, line-art icons
    location/       Hero, case-study sections, plates, next-room link
    admin/          Reusable admin form pieces (array editor, image
                     upload field, sketches editor)
    providers/      Smooth scroll, cinematic route transition, reduced
                     motion config, chrome (header) visibility
    shared/         Site header/nav drawer, page-enter animation
    ui/             Button, Sheet
  content/
    types.ts              Shared content shapes
    locations.ts, profile.ts   Thin async re-exports of the DB reads —
                                what the app actually imports
    seed-locations.ts, seed-profile.ts   One-time starter content, loaded
                                          into Postgres the first time the
                                          database is queried and empty
  lib/
    db.ts        Postgres client, schema migration/seed, typed CRUD
    auth.ts       Signed session cookie (Web Crypto HMAC, no dependency)
    fonts.ts, utils.ts, use-media-query.ts, smooth-path.ts
  middleware.ts   Protects /admin/* — redirects to /admin/login without a
                  valid session
```

### Content

`src/content/locations.ts` and `src/content/profile.ts` are the only content
imports the app uses — they're thin re-exports of async functions in
`src/lib/db.ts` that read Postgres, request-deduped with React's `cache()`.
`seed-locations.ts` / `seed-profile.ts` hold the original hand-written
content and are only ever read once, to populate an empty database — editing
them after launch has no effect on the live site. Edit content through
`/admin` instead.

## Admin panel

A private, password-gated panel at `/admin` for editing everything without
touching code — profile bio/stats/values/avatar, each room's text, and full
case studies (all fields, sketch/cover images, add/edit/delete).

**How it works**: edits write straight to Postgres and uploaded images go to
Vercel Blob; `revalidatePath` clears the relevant cached pages so changes
appear on the live site immediately, no rebuild or redeploy needed. Auth is
a single shared password (env var) plus an HMAC-signed, httpOnly session
cookie — there's no user database, since this is a one-editor site.

### One-time setup (do this once in the Vercel dashboard)

1. **Database** — Project → Storage → Create Database → **Postgres** →
   connect it to this project. Vercel sets the `POSTGRES_URL` (etc.) env
   vars automatically.
2. **Image storage** — Project → Storage → Create Database → **Blob** →
   connect it to this project. Vercel sets `BLOB_READ_WRITE_TOKEN`
   automatically.
3. **Admin credentials** — Project → Settings → Environment Variables, add:
   - `ADMIN_PASSWORD` — whatever password you want to log in with.
   - `ADMIN_SESSION_SECRET` — any long random string (e.g. generate one with
     `openssl rand -hex 32`); this signs the session cookie.
4. Redeploy (or just push a commit) so the new env vars take effect, then
   visit `/admin`. The first request to the database automatically creates
   the tables and seeds them from the starter content — no migration command
   to run by hand.

Until these are set, the public site and `/admin` dashboard pages will 500
(no database configured yet) — but `/admin/login` itself always works, since
it has no database dependency, so you can confirm the password is wired up
before finishing the rest of the setup.

## Accessibility

- Semantic landmarks, one `<h1>` per view (including a screen-reader-only
  heading on the map, since it has no visible page-title text)
- Full keyboard operability — map nodes are native `<button>` elements in
  narrative tab order, with a visible `:focus-visible` ring site-wide
- "Skip to content" link on every page, including the admin panel
- `prefers-reduced-motion` respected globally via Framer Motion's
  `reducedMotion="user"`, plus explicit skips for the loading sequence and
  page-transition wipe
- All theme accent colours were adjusted to meet WCAG AA (4.5:1) contrast
  against the paper background for text use

## Performance

- No raster images/photography by default — case-study visuals are CSS/SVG
  (gradients, inline line-art icons, an SVG-noise paper-grain texture) until
  real photos are uploaded, so there's no baseline LCP image weight
- `next/font` self-hosts Fraunces (display) and Manrope (body) with
  `display: swap`
- The map is dynamically imported (`next/dynamic`, `ssr: false`) since it's
  only needed after the loading/gate sequence, not on first paint
- GSAP is dynamically imported only where used (Gallery scroll reveal)
- Content pages are dynamically rendered (not statically pre-built) since
  content lives in a database editable from `/admin` — Postgres reads are
  fast and request-deduped, but this is a deliberate trade of some raw
  static-generation speed for instant, no-redeploy content edits

## Development

```bash
npm install
npm run dev      # http://localhost:3000 — needs POSTGRES_URL et al. in .env.local
                  # to render the public site or admin dashboard; /admin/login
                  # works without it
npm run build    # production build
npm run lint
```

To develop against a real database locally, run `vercel env pull` (after
linking the project with `vercel link`) to write `.env.local` from the
Vercel project's environment variables.

## Deployment (Vercel)

1. Import the repository in Vercel. Framework preset: Next.js
   (auto-detected).
2. Follow **Admin panel → One-time setup** above (Postgres, Blob, admin env
   vars) before or after the first deploy — the build itself doesn't need
   the database, since content pages render on demand at request time.

If you deploy to a domain other than `mahiiway.vercel.app`, update
`metadataBase` in `src/app/layout.tsx` and the `BASE_URL` constant in
`src/app/sitemap.ts` / `src/app/robots.ts`.
