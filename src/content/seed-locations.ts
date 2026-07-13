import type { LocationEntry } from "./types";

/**
 * Initial content, loaded into MongoDB once on first admin/database access
 * (see src/lib/db.ts `ensureSeeded`). The live site reads from the database
 * from then on — editing this file after launch has no effect; use /admin.
 */
export const seedLocations: LocationEntry[] = [
  {
    id: "home",
    order: 0,
    name: "Mahi's House",
    epithet: "Where the map begins",
    short: "An introduction — who I am, and why this world exists.",
    story:
      "Every visitor starts at the doorstep. This is the room where I keep the plain facts — my name, my year, what I'm studying, and the handful of beliefs that quietly steer everything else on this map.",
    position: { x: 50, y: 90 },
    theme: { ink: "#2B2622", accent: "#A75336", wash: "#F3E7DA" },
    caseStudies: [],
  },
  {
    id: "fashion-atelier",
    order: 1,
    name: "Fashion Atelier",
    epithet: "The room that smells of chalk and muslin",
    short: "Draping, silhouette studies, and the first garments built by hand.",
    story:
      "The Atelier is where flat paper sketches learned to stand up. It's the smallest room on the map and the one with the most pins on the floor.",
    position: { x: 18, y: 72 },
    theme: { ink: "#26333D", accent: "#33475B", wash: "#E4E9ED" },
    caseStudies: [
      {
        slug: "silhouette-studies-in-muslin",
        title: "Silhouette Studies in Muslin",
        year: "2026",
        medium: "Draping · Muslin · Dress form",
        summary:
          "Twelve flat croquis translated onto the stand, testing how a pencil line behaves once gravity gets involved.",
        palette: ["#33475B", "#7E93A6", "#E4E9ED"],
        context:
          "The Foundation drape module asked for one thing: take a silhouette that only exists on paper and prove it can exist on a body. It was my first time pinning fabric instead of drawing it.",
        research: [
          "Studied bias-cut behaviour through swatch tests — how muslin falls differently on the cross-grain versus the straight grain.",
          "Photographed campus statues and doorways for naturally occurring drape and fold.",
          "Logged 12 croquis silhouettes ranging from architectural to fluid, ranked by how achievable they seemed on the stand.",
        ],
        sketches: [
          { caption: "Flat croquis silhouettes, pencil on marker paper — 12 variations, numbered and annotated with seam guesses." },
          { caption: "Fold studies directly on the dress form, charcoal on newsprint, capturing how the muslin actually broke versus how I'd drawn it." },
          { caption: "Corrections in red ink over the original croquis, marking every place the fabric disagreed with the sketch." },
      ],
        iterations: [
          {
            title: "First pin-up",
            description:
              "The first attempt collapsed at the waist — the sketch assumed structure that plain-weave muslin simply doesn't have without support.",
          },
          {
            title: "Adding the underlayer",
            description:
              "Introduced a boned underlayer at the ribcage, which finally let the outer drape fall the way the original sketch intended.",
          },
          {
            title: "Final proportion pass",
            description:
              "Shortened the hemline by four inches after seeing it move on a walking model — stillness and movement read as two different garments.",
          },
        ],
        outcome:
          "Two finished muslin toiles, photographed under natural north light, each paired with its original pencil croquis so the distance between plan and result stays visible.",
        reflection:
          "I learned that draping isn't illustration corrected for reality — it's a conversation. The fabric has opinions, and the best silhouettes are the ones where I actually listened.",
        tools: ["Muslin", "Dress form", "Pins", "Charcoal", "Marker paper"],
      },
      {
        slug: "paper-pattern-play",
        title: "Paper Pattern Play",
        year: "2025",
        medium: "Paper folding · Basic blocks",
        summary:
          "Origami folding techniques applied to a basic bodice block, looking for structure that sewing alone wouldn't give.",
        palette: ["#7E93A6", "#26333D", "#F3E7DA"],
        context:
          "Before touching a sewing machine, our first block exercise had to be provable in paper. I used folding, not cutting, to find shape.",
        research: [
          "Collected classic origami fold families — box pleat, accordion, waterbomb base — and tested which held their form at garment scale.",
          "Cross-referenced with historical pleated garment references from the studio archive.",
        ],
        sketches: [
          { caption: "Full-scale paper block with box-pleat folding tested at the shoulder seam." },
          { caption: "Miniature study folds at 1:4 scale to fail fast before committing to full-scale paper." },
      ],
        iterations: [
          { title: "1:4 study", description: "Tested three fold families in miniature before choosing box-pleat for its structural memory." },
          { title: "Full block", description: "Scaled the chosen fold to a real bodice block and reinforced the crease lines with a bone folder." },
        ],
        outcome:
          "A folded paper bodice panel that holds its silhouette unsupported — proof-of-concept for a pleated construction later revisited in fabric.",
        reflection:
          "Working in paper first removed my fear of 'wasting fabric' and let me fail quickly. Several of my fastest garment ideas since have started on a folded sheet of paper.",
        tools: ["Cartridge paper", "Bone folder", "Craft knife"],
      },
    ],
  },
  {
    id: "digital-lab",
    order: 2,
    name: "Digital Lab",
    epithet: "The room with the glowing screens",
    short: "Where hand studies get translated, tested, and rebuilt on a screen.",
    story:
      "The Lab is the newest room I've moved into. Everything here starts as something I already made by hand — a colour study, a letterform, a texture — and asks: what changes when a cursor draws it instead?",
    position: { x: 15, y: 46 },
    theme: { ink: "#1F3330", accent: "#487472", wash: "#E1EBEA" },
    caseStudies: [
      {
        slug: "color-theory-digitized",
        title: "Color Theory, Digitized",
        year: "2026",
        medium: "Gouache · Adobe Illustrator",
        summary:
          "Painted colour-wheel studies rebuilt as vector palettes, checking whether hand-mixed harmony survives translation to hex.",
        palette: ["#C1613F", "#4C7A78", "#C99A3B"],
        context:
          "Our colour theory unit ended with a simple, harder-than-expected brief: take one painted harmony and prove it works on a screen too.",
        research: [
          "Mixed 24 gouache swatches across the wheel, logging pigment ratios for repeatability.",
          "Compared analogous, complementary, and split-complementary harmonies for a single 'inspiration' photograph of a spice market stall.",
        ],
        sketches: [
          { caption: "Hand-painted colour wheel, gouache on watercolour paper, with mixing ratios noted in pencil margin." },
          { caption: "Digital swatch grid in Illustrator, matched by eye against the physical wheel under consistent daylight." },
      ],
        iterations: [
          { title: "Direct eyedrop match", description: "First attempt used a photographed eyedrop of the gouache — colours read muddy and lost saturation on screen." },
          { title: "Manual recalibration", description: "Rebuilt each swatch manually in HSB, correcting for screen brightness bias rather than trusting the photograph." },
        ],
        outcome:
          "A five-palette digital library derived from the original painted wheel, now used as the starting palette for later Lab projects.",
        reflection:
          "Cameras lie about colour more than I expected. Trusting my eye over the eyedropper tool was the actual lesson of this project.",
        tools: ["Gouache", "Adobe Illustrator", "Colour wheel"],
      },
      {
        slug: "typeface-anatomy-posters",
        title: "Typeface Anatomy Poster Series",
        year: "2025",
        medium: "Adobe Illustrator · Print",
        summary:
          "A four-poster series breaking down serif letterform anatomy, built while learning vector tools from scratch.",
        palette: ["#1F3330", "#4C7A78", "#E1EBEA"],
        context:
          "My first real Illustrator brief — communicate something precise (letterform anatomy) using tools I'd only just learned.",
        research: [
          "Annotated printed specimens of serif typefaces, labelling terminal, bowl, spine, and ear by hand first.",
          "Studied editorial poster layouts for how much white space precise diagrams actually need to breathe.",
        ],
        sketches: [
          { caption: "Hand-labelled letterform anatomy on tracing paper over printed specimens." },
          { caption: "Thumbnail grid layouts testing four different poster compositions at business-card scale." },
      ],
        iterations: [
          { title: "Overcrowded v1", description: "First digital layout tried to label every anatomical term at once and became unreadable." },
          { title: "One term per poster", description: "Split the series into four posters, one dominant term each, which finally let the diagrams breathe." },
        ],
        outcome:
          "A four-poster set, print-ready at A3, each isolating one letterform concept with a single dominant accent colour.",
        reflection:
          "Restraint turned out to be a layout skill, not a personality trait. Saying less per poster said more overall.",
        tools: ["Adobe Illustrator", "Tracing paper", "A3 print stock"],
      },
    ],
  },
  {
    id: "illustration-studio",
    order: 3,
    name: "Illustration Studio",
    epithet: "Pencil shavings on every surface",
    short: "Daily sketchbook practice, figure studies, and loose ideation.",
    story:
      "This is the messiest, most-used room on the map. Nothing here is precious — it's daily practice, kept in full so the map shows process, not just polish.",
    position: { x: 24, y: 20 },
    theme: { ink: "#3A2C12", accent: "#886725", wash: "#F5ECD8" },
    caseStudies: [
      {
        slug: "100-days-of-line",
        title: "100 Days of Line",
        year: "2025–2026",
        medium: "Pencil · Fineliner · Sketchbook",
        summary:
          "A hundred consecutive days of a single daily line drawing, made to build hand speed and honest observation.",
        palette: ["#3A2C12", "#C99A3B", "#F5ECD8"],
        context:
          "A self-set challenge, not a class brief: one drawing a day, no erasing, five minutes maximum, for a hundred days straight.",
        research: [
          "Looked at continuous-line drawing traditions, from Matisse's late line work to contour-drawing exercises from first-term life drawing.",
          "Tracked which subjects (hands, drapery, plants) produced the most confident lines by day 30, and leaned into those.",
        ],
        sketches: [
          { caption: "Days 1–10: tentative, broken lines, heavy pencil pressure." },
          { caption: "Days 40–50: single unbroken contour lines, fineliner, noticeably faster and looser." },
          { caption: "Days 90–100: line drawings held from memory rather than direct observation." },
      ],
        iterations: [
          { title: "Switching tools at day 30", description: "Moved from pencil to fineliner once erasing was clearly working against the point of the exercise." },
          { title: "Subject narrowing at day 60", description: "Narrowed subjects to hands and drapery, the two areas where line quality was improving fastest." },
        ],
        outcome:
          "A bound hundred-page sketchbook, exhibited open to three spreads showing the visible progression from day 1 to day 100.",
        reflection:
          "Consistency did more for my drawing than any single 'good' sketch could. The map keeps the bad early pages on purpose — they're the actual evidence of progress.",
        tools: ["Pencil", "Fineliner", "Sketchbook"],
      },
      {
        slug: "fashion-croquis-sketchbook",
        title: "Fashion Croquis Sketchbook",
        year: "2025",
        medium: "Pencil · Marker",
        summary:
          "A working sketchbook of fashion croquis, developing a personal figure template used across later garment projects.",
        palette: ["#C99A3B", "#B85C7A", "#3A2C12"],
        context:
          "Foundation figure drawing asked for anatomical accuracy first, and a usable 'house' croquis second — a repeatable figure I could sketch garments onto quickly.",
        research: [
          "Studied 9-head and 10-head fashion proportion systems against live model sketches to find a personal in-between.",
          "Cross-referenced pose libraries for croquis that read movement without over-stylising anatomy.",
        ],
        sketches: [
          { caption: "Anatomical proportion studies, 9-head grid, graphite." },
          { caption: "Loosened 'house croquis' poses developed for fast garment sketching, marker fills." },
      ],
        iterations: [
          { title: "Grid-locked figures", description: "Early croquis were too rigid to hang natural drape convincingly." },
          { title: "Weighted-hip revision", description: "Reworked the standing pose with a clearer weight shift, which made every garment sketched on it read more alive." },
        ],
        outcome:
          "A personal ten-pose croquis template, now reused as the base figure for sketches across the Fashion Atelier.",
        reflection:
          "A croquis is a tool, not a portrait — once I stopped trying to make each one beautiful, they finally became useful.",
        tools: ["Graphite", "Marker", "Layout paper"],
      },
    ],
  },
  {
    id: "rangoli-courtyard",
    order: 4,
    name: "Rangoli Courtyard",
    epithet: "Colour laid on stone before sunrise",
    short: "Pattern, symmetry, and colour theory learned from a family tradition.",
    story:
      "Long before Foundation year, rangoli was already teaching me grids and colour. This courtyard is where that inherited practice meets a design-school vocabulary for the first time.",
    position: { x: 50, y: 52 },
    theme: { ink: "#3B1F2B", accent: "#AE4C6C", wash: "#F6E3E9" },
    caseStudies: [
      {
        slug: "rangoli-grid-studies",
        title: "Rangoli Grid Studies",
        year: "2026",
        medium: "Rice flour · Coloured powder · Grid paper",
        summary:
          "Traditional dot-grid rangoli patterns deconstructed into their underlying geometric systems.",
        palette: ["#B85C7A", "#C99A3B", "#3B1F2B"],
        context:
          "I've laid rangoli every festival morning since childhood, by memory and feel. This project asked me to slow that muscle memory down into a documented system.",
        research: [
          "Interviewed my grandmother on the dot-grid method she learned from her mother, recording spacing ratios by hand.",
          "Compared regional rangoli grid systems (dot, free-hand, and stencil-based) for underlying symmetry types — rotational, reflective, and radial.",
        ],
        sketches: [
          { caption: "Dot-grid underlays in pencil, before any colour is placed, showing the pure geometric skeleton." },
          { caption: "Colour-fill studies testing the same grid with three different regional palettes." },
      ],
        iterations: [
          { title: "8-dot rosette", description: "First grid used an 8-point rosette, traditional but visually busy at small scale." },
          { title: "6-dot simplification", description: "Simplified to a 6-point radial grid for a cleaner pattern that still read as authentically rangoli." },
        ],
        outcome:
          "A set of five documented grid systems, each photographed at three stages: bare grid, half-filled, and completed pattern.",
        reflection:
          "Turning a practice I knew 'by hand' into something I could explain on paper changed my relationship to it — I respect the geometry more, not less, for understanding it.",
        tools: ["Rice flour", "Coloured powder (gulal)", "Grid paper", "Pencil"],
      },
      {
        slug: "festival-of-colour-pattern-series",
        title: "Festival of Colour: A Pattern Series",
        year: "2025",
        medium: "Gouache · Repeat pattern",
        summary:
          "Rangoli motifs translated into seamless repeat patterns, tested for potential textile application.",
        palette: ["#B85C7A", "#F6E3E9", "#C1613F"],
        context:
          "A cross-studio brief between the Courtyard and the Atelier: could a floor pattern become a fabric pattern without losing what makes it a rangoli?",
        research: [
          "Selected three motifs — lotus, peacock feather, and diya-flame — most common across family rangoli patterns.",
          "Studied basic repeat-tile construction (block, half-drop, brick) to test which suited radial rangoli motifs best.",
        ],
        sketches: [
          { caption: "Single-motif studies in gouache, isolated from their grid for the first time." },
          { caption: "Repeat-tile testing sheets, marking motif edges that needed adjusting to tile cleanly." },
      ],
        iterations: [
          { title: "Straight block repeat", description: "First repeat attempt created obvious grid lines where motifs met — too mechanical for the original hand-laid feel." },
          { title: "Half-drop revision", description: "Switching to a half-drop repeat broke the visible grid and restored a more organic, hand-laid rhythm." },
        ],
        outcome:
          "Three finished repeat patterns, presented as painted tiles alongside a mocked-up yardage swatch.",
        reflection:
          "The pattern only felt honest once it stopped looking perfectly mechanical — a small, deliberate irregularity did more work than any technical fix.",
        tools: ["Gouache", "Grid paper", "Tracing paper"],
      },
    ],
  },
  {
    id: "process-library",
    order: 5,
    name: "Process Library",
    epithet: "Shelves of half-finished notebooks",
    short: "Research binders, material journals, and the paperwork behind the pretty pictures.",
    story:
      "If the Atelier and Studio are where things get made, the Library is where I explain why. Every binder on this shelf backs up a project shown somewhere else on the map.",
    position: { x: 78, y: 24 },
    theme: { ink: "#26301F", accent: "#626F55", wash: "#EAEDE3" },
    caseStudies: [
      {
        slug: "material-journal-waste-to-wonder",
        title: "Material Journal: Waste to Wonder",
        year: "2026",
        medium: "Mixed media · Found materials",
        summary:
          "A structured material journal cataloguing what packaging, offcuts, and household waste can become in design hands.",
        palette: ["#7C8C6B", "#3A2C12", "#EAEDE3"],
        context:
          "A sustainability-focused research module asking us to log, not just design with, discarded materials over four weeks.",
        research: [
          "Collected and catalogued 30 household waste items — fabric offcuts, newspaper, egg cartons, chai cups — logging texture, strength, and possible manipulation methods.",
          "Tested each material against three basic techniques: folding, layering, and dyeing.",
        ],
        sketches: [
          { caption: "Material swatch pages, one per item, with hand-written notes on strength and manipulation." },
          { caption: "Combination studies pairing two materials to test structural collaboration — newspaper strengthened with fabric scrap glue-lamination." },
      ],
        iterations: [
          { title: "Single-material tests", description: "Early tests judged each material alone, which undersold materials that only got interesting in combination." },
          { title: "Paired testing", description: "Reworked the journal to test deliberate material pairings, which produced the most promising results." },
        ],
        outcome:
          "A 30-entry bound material journal, with five materials flagged as 'ready for a real project' and carried forward into later work.",
        reflection:
          "Documentation felt like the boring half of design before this project. Now I think it's where half the actual ideas are hiding.",
        tools: ["Found materials", "Journal", "Glue lamination", "Natural dye"],
      },
      {
        slug: "craft-documentation-local-artisans",
        title: "Craft Documentation: Local Artisans",
        year: "2025",
        medium: "Field notes · Interview · Photography",
        summary:
          "A short field-documentation project recording a local block-printing workshop's process, tools, and vocabulary.",
        palette: ["#7C8C6B", "#C99A3B", "#26301F"],
        context:
          "Foundation year's first field trip module — go outside the studio, watch someone else's process, and write it down properly.",
        research: [
          "Spent two mornings at a family-run block-printing workshop, observing the full process from block-carving to final wash.",
          "Recorded local vocabulary for tools and techniques, cross-checked with textile glossaries.",
        ],
        sketches: [
          { caption: "Diagrammatic notes of the printing table set-up, drawn on site." },
          { caption: "Tool sketches — wooden printing blocks, dye trays — annotated with dimensions and use notes." },
      ],
        iterations: [
          { title: "Notes-only draft", description: "First write-up was text-only and hard to follow without visual reference to the tools described." },
          { title: "Diagram-led rewrite", description: "Rebuilt the documentation around annotated diagrams first, text second." },
        ],
        outcome:
          "A twelve-page illustrated process document, shared with the workshop as a thank-you alongside the studio submission.",
        reflection:
          "Watching a process I didn't grow up with taught me more about respectful documentation than any style guide could — ask before you draw, and show people what you made of it.",
        tools: ["Field notebook", "Camera", "Interview notes"],
      },
    ],
  },
  {
    id: "inspiration-garden",
    order: 6,
    name: "Inspiration Garden",
    epithet: "Where references are left to grow",
    short: "Mood boards, colour references, and the things I collect before I know why.",
    story:
      "Nothing in the Garden is finished work — it's the compost that later projects grow from. Leaves, clippings, and colour scraps, kept exactly as loose as they were found.",
    position: { x: 86, y: 48 },
    theme: { ink: "#24301F", accent: "#59734A", wash: "#E9EFE1" },
    caseStudies: [
      {
        slug: "botanical-colour-palette",
        title: "Botanical Colour Palette",
        year: "2026",
        medium: "Pressed botanicals · Watercolour",
        summary:
          "A colour-reference archive built from pressed leaves and petals collected around campus over one season.",
        palette: ["#6E8F5C", "#C99A3B", "#E9EFE1"],
        context:
          "An open-ended prompt: build a personal colour library from something other than a screen or a paint chart.",
        research: [
          "Collected and pressed 18 campus botanical specimens across eight weeks, tracking seasonal colour shift.",
          "Mixed watercolour matches for each specimen at time of collection and again two weeks later, to study fading.",
        ],
        sketches: [
          { caption: "Pressed-specimen pages with watercolour match swatches alongside each." },
          { caption: "A seasonal colour-shift chart tracking how five repeat specimens changed hue over eight weeks." },
      ],
        iterations: [
          { title: "Single-match pages", description: "First version paired one swatch per specimen, which lost the seasonal-change story entirely." },
          { title: "Timeline layout", description: "Rebuilt the archive as a horizontal timeline per specimen, finally showing colour drift over time." },
        ],
        outcome:
          "An 18-specimen colour archive, later mined directly for the palette used in the Rangoli Courtyard's pattern series.",
        reflection:
          "This was the least 'designed' project on the map and the one I return to most — proof that collecting without a brief is still design work.",
        tools: ["Watercolour", "Flower press", "Archival paper"],
      },
      {
        slug: "natures-geometry-moodboard",
        title: "Nature's Geometry Moodboard",
        year: "2025",
        medium: "Photography · Collage",
        summary:
          "A photographic study of naturally occurring symmetry, collaged into a working moodboard for pattern projects.",
        palette: ["#6E8F5C", "#33475B", "#F5ECD8"],
        context:
          "Set alongside the Rangoli Grid Studies, this board asked whether radial symmetry in rangoli has any relatives growing outside the courtyard.",
        research: [
          "Photographed naturally radial forms around campus — flower heads, snail shells, banana leaf veining.",
          "Grouped images by symmetry type: radial, bilateral, and spiral, to match against the rangoli grid vocabulary.",
        ],
        sketches: [
          { caption: "Contact-sheet style photo grid, sorted by symmetry type." },
          { caption: "Hand-drawn geometric overlays on printed photographs, tracing the underlying symmetry axis of each." },
      ],
        iterations: [
          { title: "Unsorted collection", description: "The first pinboard was just visually pleasing photos with no organising logic." },
          { title: "Symmetry-sorted board", description: "Reorganised entirely by symmetry type, which made the connection to rangoli grids immediately visible." },
        ],
        outcome:
          "A working moodboard of 24 sorted photographs, now pinned physically in the Courtyard as a live reference.",
        reflection:
          "A moodboard is only useful once it has a filing system. 'Pretty' isn't organisation — symmetry type was.",
        tools: ["Camera", "Print photographs", "Pin board"],
      },
    ],
  },
  {
    id: "gallery",
    order: 7,
    name: "Gallery",
    epithet: "The quiet room at the top of the map",
    short: "A curated cross-section of the year — one piece pulled from every room.",
    story:
      "The Gallery doesn't hold new work. It holds the single piece from each studio I'd choose to show first, hung the way a small museum would hang a first-year retrospective.",
    position: { x: 68, y: 14 },
    theme: { ink: "#201C18", accent: "#4A423A", wash: "#EFEAE2" },
    caseStudies: [],
  },
  {
    id: "contact-house",
    order: 8,
    name: "Contact House",
    epithet: "The last door on the map",
    short: "Where the journey ends, and a conversation can begin.",
    story:
      "You've reached the edge of the map. This is the smallest room of all — just a way to say hello, properly, if any of the rooms behind you left you with something to say.",
    position: { x: 90, y: 82 },
    theme: { ink: "#34211A", accent: "#9E5C3A", wash: "#F1E4D8" },
    caseStudies: [],
  },
];

