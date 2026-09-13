# Atomic Finds ATX — Brand Rules & Store Information

## Official Contact & Business Details
- **Email**: `atomicfindsatx@gmail.com` *(Never use placeholder/invented emails like hello@atomicfindsatx.com)*
- **Phone**: `865-244-8130`
- **Hours**: Available by appointment and online (Tue – Sat, 10am – 6pm)
- **Location**: Austin, Texas
- **Instagram**: `https://www.instagram.com/atomicfindsatx/`
- **Facebook Marketplace Profile**: `https://www.facebook.com/marketplace/profile/100050731036665/?ref=permalink&mibextid=6ojiHh`

## Team Roles & Attribution
- **Founder & Restorer**: **Jennyfer** (Atomic Finds ATX is a one-woman operation start-to-finish; Jennyfer sources every 1970s rattan & bamboo piece from Austin estate sales, markets, and private collections, restoring each item by hand).
- **Designer**: **Anthony** (Web & Design System Lead).

## Strict Design System Rules
1. **Design System Adherence**: Always reference `design-system/styles.css` and `components.css` for canonical scales and proportions.
2. **Shadow Rule**: Images OUTSIDE of cards (e.g. Hero image) DO NOT get drop shadows. Drop shadows (`box-shadow: 5px 5px 0 var(--af-ink);`) belong ONLY on cards and interactive plates.
3. **Button Proportions**: Buttons must remain slender and proportional to text labels (`padding: 0.5rem 1rem; font-size: 0.875rem; border-radius: 12px;`).
4. **Header Logo**: Header uses `logo-wordmark-stacked.png` + Tagline (no monogram roundel in header).
5. **Footer Monogram**: Footer uses `logo-monogram-roundel.png` at natural proportions (`width: 140px; height: auto;`).
6. **Product Cards**: Large, stacked cards whose frame is
    `assets/textures/pattern-botanical-cream.png` (the cream-ground file, at full
    strength — NOT the faded green background pattern from rule 11), framing an
    inner mat plate (`.hp-find-card__mat`). Pattern scale must shrink with the
    card (`background-size: clamp(...)`) so it stays a thin frame on mobile
    instead of becoming a wide stripe. Cards are **compact by default**: the
    description clamps to two lines and releases on expand. No left callout
    border or corner radius curves on text.
7. **Animated Yellow Marquee**: Continuous smooth scrolling marquee strip underneath the Hero section.
8. **Meet Nacho**: Centered layout with a subtle, playful idle floating/bounce micro-animation.
9. **NO CURATORS / MASCOTS**: Do not include a Curators section.
10. **NO GALAXY / SPACE THEMES**: Filter out and drop all galaxy, alien, space, or sci-fi theme elements and copy.
11. **Site Background Pattern**: Every tone-on-tone section background uses
    `assets/textures/pattern-botanical-green.png` at **7% opacity**, set by the
    single token `--af-pattern-ghost` in `design-system/tokens/space.css`.
    - Change the background strength by editing **that token only** — never by
      hard-coding an opacity on a section.
    - Use the **green** file for backgrounds: its ground is transparent, so it
      fades over cream. `pattern-botanical-cream.png` has its cream ground baked
      into the image and **cannot** be faded — that one is for card frames only.
    - Ghost layers carry `.af-pattern .af-pattern--<name> .af-pattern--ghost` and
      nothing else. **Never add inline positioning** (`inset:0`, `left`, `top`):
      the class already handles full-bleed via `width:100vw; left:50%;
      transform:translateX(-50%)`, and an inline `inset:0` overrides `left` while
      leaving the transform, which shifts the whole pattern half a viewport
      sideways. The only permitted inline style is `background-color:transparent`.
12. **Asset Naming**: Lowercase kebab-case, strictly no spaces / underscores / capitals. Reference `.agents/rules/file-hygiene-and-naming.md`.
    - **Product Photos**: `[slug]-[sku]-[date:YY-MM-DD]-[shot-type].png` (e.g., `ramona-0014-26-09-12-front.png`). Existing 4-digit SKUs are retained; next new SKU starts at `0050`.
    - **Marketing Assets**: `[category]-[piece-name]-[date:YY-MM-DD]-[index:01].png` (e.g., `banner-spring-sale-26-09-12-01.png`).
    - **Category Prefixes**: `logo-`, `motif-`, `icon-`, `pattern-`, `texture-`, `weave-`, `heritage-`, `stamp-`, `ui-`, `reference-`, `*-badge`.
    - `Mamba.otf` keeps its capital as a font-family proper noun.
    - Renaming an asset requires atomically updating every reference across all HTML, CSS, JS, and JSON files in the repository.
13. **Typography Hierarchy** (locked):
    - H1, H2 → **Mamba** (`--af-font-display`)
    - Subheadings, h3 → **Pacifico** (`--af-font-script`) — kept short, never body copy
    - Body, captions → **Poppins** (`--af-font-body`)
    Do not reintroduce Inter.
14. **Missing Assets**: Never substitute a different file for one that is absent.
    Mark it `TODO(asset-missing)` in place, leave the slot empty, and say so.
    Known gaps: `watercolor-style-background-001.png`,
    `pattern-trailing-greenery.png`, `pattern-palma-ginkgo.png`, a third Flora photo.
15. **File Hygiene & Root Containment**: Never dump loose files or stray folders into the root directory.
    - Only root site HTML pages and base config (`package.json`, `.gitignore`, `README.md`, `CNAME`, `robots.txt`) belong in root.
    - Tools live under their parent subsystem (e.g. `design-system/tools/figma-plugin/`).
    - Skills live in `.agents/skills/`.
    - All token definitions stem from `design-system/tokens/canonical-tokens.json` and compile to `dist/`. Full details in `.agents/rules/file-hygiene-and-naming.md`.
