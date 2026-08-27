# Atomic Finds ATX — Design System

A working design system for **Atomic Finds ATX** — *"Tiny Time Machines for Your Home"* — the Austin
vintage rattan/bamboo furniture brand. Built from the brand materials in this directory.

Open `index.html` for the living documentation (it needs to be served, not opened as a `file://` URL,
so the relative CSS and font paths resolve):

```bash
python3 -m http.server 8752 --directory design-system
```

**Guiding constraint, above every rule below: furniture is always the hero.** Everything in this system
exists to frame a piece, never to compete with it.

---

## What's here

```
design-system/
├── styles.css              root stylesheet — import this
├── tokens/
│   ├── colors.css          palette, ink, surfaces, status
│   ├── typography.css      Mamba/Pacifico/Poppins, fluid display scale
│   └── space.css           spacing, radius, stamp shadows, motion
├── components.css          Button, Tag, InspectionStamp, ProductCard,
│                           CuratorCard, RecordCard
├── index.html              living documentation
└── assets/
    ├── logos/              3 official lockups
    ├── fonts/Mamba.otf     the brand display face
    ├── characters/         Nacho + the four curators
    ├── motifs/             sparkle.svg, starburst.svg
    └── textures/           botanical pattern, Solihiya weave
```

Use it by importing the root stylesheet:

```html
<link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="design-system/styles.css">
```

---

## Sources this was built from

Everything here traces to material in this directory:

| Source | What it settled |
|---|---|
| `Atomic_Finds_ATX_Brand_Bible_V1.pdf` | positioning, voice, palette by name, card contents, showroom structure |
| `Atomic_Finds_ATX_Website_Creative_Brief_Anthony.pdf` | experience principles, character hierarchy, showroom nav |
| `🛸 ATOMIC FINDS ATX.md` | tagline, Mamba + Pacifico, negative prompts, card front/back copy |
| `brand_system_sheet.png` | **the six palette hex values** — the only place they are written down |
| `Logos/Asset 1–3` | the three official lockups; confirmed set in Mamba |
| `atomic finds assets/fonts/Mamba.otf` | the display face (verified against the logo artwork) |
| `Atomic_Finds_The_Curators_Four.md` | the four curators, their lanes and voices |
| `Copy_Options.md` | slogans, hero headlines, CTAs |
| `🪐 The Atomic Inspection Team_ Official Stamps.md` | stamp verdicts and single-ink treatment |
| `atomic-inspectors/`, `Logo Concepts/` | Nacho and curator artwork |

The palette hexes were cross-checked by sampling the logo PNGs directly. See
**Palette provenance** below — the sampled values run softer than the stated ones, and that is expected.

---

## Decisions worth knowing

**1. Two accessible companion colors were added.**
Cream text on the locked burnt orange `#C8501E` measures **4.13:1** — it fails WCAG AA at button-label
size. Avocado on cream is **3.82:1**, large-text only. Rather than change locked brand values, the system
adds one darker step of each (`--af-orange-deep` 4.91:1, `--af-avocado-deep` 5.07:1) for text-bearing
surfaces. The locked hexes stay the graphic/display colors. **This is the one place the system adds to the
palette, and it is why.**

**2. Ink is olive, not black.** The darkest value in every source artifact is a deep olive — there is no
true black or white anywhere in the brand. So `--af-ink` is `#2B2E14` (11.32:1 on cream, AAA).

**3. Display type is fluid.** Mamba is a wide face; a fixed 80px hero overflows a 375px screen. The three
largest steps use `clamp()`.

**4. Shadows are flat, never blurred.** `--af-shadow-stamp` is a solid ink offset with 0 blur. The brand is
flat vector, so a blurred drop shadow is off-system. Don't add blur to these.

**5. Poppins is an addition.** Source material only ever says "clean sans" for body copy. Mamba and Pacifico
are named brand faces; Poppins is a reasonable stand-in and is freely swappable.

---

## Palette provenance

| Token | Stated (locked) | Sampled from logo art |
|---|---|---|
| `--af-orange` | `#C8501E` | `#CB6536` / `#C46543` |
| `--af-avocado` | `#6B7A32` | `#747A37` / `#7B7D38` |
| `--af-olive-teal` | `#2E5D4E` | `#59674C` |
| `--af-cream` | `#F3E6CE` | `#FDF3E1` |

The logo PNGs carry a paper-grain texture overlay, which lifts and desaturates every sampled value — which
is why they read softer than the stated palette. **The stated values are canonical**; the sampled column is
recorded here only so nobody "corrects" the tokens to match a textured export, or the exports to match the
tokens. If a flat vector master ever supersedes these PNGs, re-sample and revisit.

---

## The rules that make it look like Atomic Finds

- **Cream is the ground.** Most of the surface isn't colored — that's what keeps the palette from reading
  kitschy. Max two background colors per composition.
- **Pink is a minor accent only.** Never a base, never a headline, never the overall impression.
- **One pattern per section, one role only** — (a) tone-on-tone hero background, (b) thin border/divider,
  or (c) card-as-frame. Never mix patterns or scales.
- **Credit the weave.** The Solihiya weave is a real Filipino craft tradition: label it
  *"Solihiya · Philippines"* wherever it appears as a named texture. It is never fused into the logo and
  never presented as brand IP.
- **Sparkle leads, starburst supports.** Both used sparingly; the starburst is never tiled.
- **Max three type levels** in one composition.
- **Nacho guides, the aliens cameo.** Nacho is the site's voice; the Inspection Team appears on stamps,
  tags and cards. Never reverse that hierarchy.
- **Every piece is named** — Orbit, Agnes, Ramona — and sold as an adoption, never as a SKU.
- **No emoji in customer-facing copy.** The 🛸🪐👽 in the planning docs are internal markers only.
- **Motion is warm and subtle**: fade/slide on scroll, 1px hover lift, slow sparkle twinkle. All of it
  honors `prefers-reduced-motion`.

---

## Verified

Checked in-browser at 1280px and 375px:

- All three fonts load; Mamba resolves from the local `.otf`
- All 12 documentation images resolve; no broken assets
- No horizontal overflow at either width
- Stamp renders as a true circle; product media holds a 4:3 ratio
- Stamp shadow confirmed 0-blur
- Record-card fields go two-column on desktop, stacked below 26rem
- Contrast ratios in `index.html` are computed, not estimated

---

## Open questions

These need a decision from the brand owner rather than a guess from me:

1. **Scroll and hover motion beyond the basics** — the source material doesn't define it. Kept minimal
   here. Does bouncier motion suit Nacho's personality, or stay restrained?
2. **A UI icon set.** The brand's "icons" are illustrations (Nacho, curators, sparkle, starburst) — there's
   no icon system in the source. A real site will need one for nav, cart and form affordances. Deliberately
   not invented here.
3. **Illustrated Nacho.** Currently real photos plus the two illustration concepts. A single locked
   illustrated Nacho would firm up the product-card guide slot.
4. **Body typeface.** Confirm Poppins or replace it.
5. **The 7 logo concepts.** `Logos/Asset 1–3` are treated as the final suite here; `Logo Concepts/` is read
   as exploration. Worth confirming that's right.
6. **Dark mode** is not defined. The brand is a cream-ground system, and a dark variant would need real
   design decisions (does cream become ink? does the palette shift?) rather than an inversion.

## Not built

Flagged rather than silently skipped: showroom page templates (Living Room / Kitchen + Dining / Office /
Back Patio), email templates, Instagram post templates, and the Facebook Marketplace listing format. The
`atomic finds assets/PDF Templates/` folder holds PDF renderings of earlier versions of several of these —
the source files for those were not in this directory, so they are not reproduced here. Say the word and
they can be built on top of these tokens.

---

## Rebuild & Accessibility Architecture Updates (August 2026)

The design system, layout multiplier, card interactions, and WCAG accessibility parameters have been rebuilt and verified across the workspace:

### 1. Refactored Design Tokens & Spacing
- **Warm Cream Base (`#F3E6CE`)**: Now acts as the page background canvas ground (`--af-surface`) making up 95% of the visual layout.
- **Header/Secondary Typography**: Set headers (`h1`, `h2`, `h3`) and secondary text to Avocado (`#6B7A32`) and Olive/Teal (`#2E5D4E`).
- **Interactive Burnt Orange (`#C8501E`)**: Strict 5% visual weighting constraint enforced, reserved for primary buttons, active links, and focus rings.
- **8px Layout Grid**: Refactored spacing tokens (`--af-space-1` through `--af-space-9`) to strictly adhere to an 8px multiplier scale (`8px, 16px, 24px, 32px, 48px, 64px, 80px, 120px, 160px`).

### 2. Card-as-Frame Passport Grid
- **Inner Framing**: Product cards float images inside an inner `#F3E6CE` background frame (`.hp-find__image-frame`) with generous padding, separating the product from the borders.
- **Expandable Passports**: Added a sliding data passport to each card featuring:
  - Weave type
  - Origin credit (e.g., *Solihiya · Philippines*)
  - Material list
  - Condition status
  - Finding location
  - Historical quote block
- **Buttery Grid Transition**: Implemented modern CSS transition using `grid-template-rows: 0fr -> 1fr` for a smooth slide-open effect.

### 3. Buttery Animations & Motion
- **Card Hovers**: Cards lift up on hover (`translateY(-4px)`) over `0.25s` with a crisp drop shadow offset.
- **Staggered Scroll-Reveal**: IntersectionObserver queues intersecting elements and staggers their fade-in/slide-up display by `50ms` steps.
- **Reduced Motion**: Respects `prefers-reduced-motion` global directives, immediately adding visual states and bypassing transitions for screen accessibility.

### 4. Accessibility & Bilingual Support
- **Keyboard Traversal**: Clear tab paths enabled for all buttons and interactive controls, highlighting with a prominent `2px Burnt Orange` focus ring offset by `4px`.
- **Screen Readers**: Dynamically toggles `aria-expanded` and `aria-hidden` attributes on expand states.
- **Mobile Tap Targets**: Interactive elements and buttons scale to a minimum touch target of `44x44px` on screen widths under `768px`.
- **Client-Side Translation Hooks**: Natively embedded `data-en` and `data-es` bilingual layout attributes across all navigation links, buttons, and headers, driven by a client-side header toggle widget.
- **Mandatory Compliance Pages**: Created templates for Terms of Service, Privacy Policy, and an Accessibility Statement.
