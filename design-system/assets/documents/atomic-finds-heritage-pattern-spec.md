# Atomic Finds ATX — Heritage Pattern Spec

**Last updated: September 6, 2026**

Per-SKU weave naming lives in the inventory sheet's "Weave Pattern" column —
that column is the source of truth for which name a specific piece gets. See
`atomic-finds-atx-weave-pattern-spec-sheet-DRAFT-2026-09-06.md` for the
per-SKU findings and `atomic-finds-atx-weave-pattern-image-gen-spec-DRAFT-2026-09-06.md`
for the asset prompts.

How to pick the right heritage asset for a product card, an origin badge, or a
provenance block. Written because the library holds five *different kinds* of
asset per material, and picking the wrong kind is the easy mistake.

---

## The model — two separate questions

Picking an asset is never one decision. It is always two:

1. **Which family?** — decided by the piece's **material**.
2. **Which asset inside that family?** — decided by **which slot** you are
   filling, and whether the piece actually has **visible weave**.

Getting these confused is what makes a card look wrong. A rattan piece always
belongs to the rattan family — but that does *not* mean the card shows the
rattan weave.

---

## 1. The three families

| Family (folder) | Craft names that actually appear inside it, per real photos | Origin | Use for |
|---|---|---|---|
| **Rattan** (`heritage-library-rattan-weave/`) | Open Rattan Lattice (most common) · Solihiya Weave (only #0008, #0043 — verified) · Coiled Basket Wicker · Wrapped Reed Drum · Sunburst Wrap | Philippines (Solihiya only) | rattan, cane, wicker |
| **Bamboo** (`heritage-library-cane-webbing/`) | Cane Webbing (verified: #0012, #0021, #0041) · Tight Wicker Sheet | Austin-curated | bamboo, split bamboo |
| **Palma** (`heritage-library-palma-weave/`) | Palma Weave — **zero real matches to date**, family stays defined but unused | Mexico | palm frond, petate reed (not yet sourced) |

> **"Cane webbing" is the bamboo family's folder name**, not a name every
> bamboo piece gets — only pieces whose photo shows the actual square-grid
> cane weave carry that credit line. Check the inventory sheet's Weave
> Pattern column per SKU before naming anything on a card.

---

## 2. The five roles inside every family

Each family carries the same five kinds of asset. They are **not**
interchangeable.

| Role | What it looks like | Where it belongs |
|---|---|---|
| **PATTERN** | Repeating botanical line art. Sage/olive on cream. Quiet. | **Card backdrops.** 1440×1024, tiles seamlessly. |
| **ACCENT** | A single sprig or frond, line art, on white. | Origin badge icon, small marks, dividers. |
| **PLANT** | Full botanical illustration of the source plant. | Origin badge, heritage block. |
| **WEAVE** | Photographic woven texture. Bold, high contrast, tan/orange. | **Provenance swatch only.** Never a backdrop. |
| **HERITAGE CARD** | Finished credit card: weave swatch, source plants, craft attribution. | The heritage / provenance section. |

### The rule that prevents the most common mistake

> **A product card's backdrop is ALWAYS the family's PATTERN — never its WEAVE.**

The weave files are bold and photographic. Behind a product they compete with
the furniture and break the first brand rule (*furniture is always the hero*).
The pattern files are quiet line art designed to sit behind something else.

The weave earns its place only where you are **crediting the craft** — the
provenance block, the heritage card, the swatch beside the origin text.

---

## 3. Choosing the backdrop

| Piece material | Family | Backdrop pattern |
|---|---|---|
| Rattan, cane, wicker | Rattan | `rattan-leaf-pattern.png` or `rattan-vine-pattern.png` |
| Bamboo, split bamboo | Bamboo | `bamboo-pattern.png` |
| Palm frond, petate | Palma | `palma-pattern.png` |
| **No weave material** — wood, formica, acrylic, glass, metal | — | **UNDECIDED — see below** |

The rattan family has two patterns — **leaf** (small, feathery fronds) and
**vine** (longer trailing stems). Either is correct for a rattan piece; vary
them across a grid so adjacent cards do not look identical.

### The open question: what do non-weave pieces get?

**Card backdrops come from `heritage-library/` only.** The botanical patterns in
`textures/` are NOT card backdrops — they are section backgrounds and the ghost
overlay. Do not reach for them here.

That leaves 16 of the 50 current inventory items — wood, formica, acrylic,
glass, metal — with no material family and therefore no backdrop. This is
**unresolved and needs an owner decision.** The options:

1. **Plain cream, no pattern.** Honest: the piece has no weave heritage, so it
   makes no claim to one. Costs the card some texture.
2. **A default heritage pattern.** Rattan is 29 of 50, so `rattan-leaf-pattern`
   would be the house default. Risk: it implies a material the piece is not.
3. **New artwork for non-weave pieces** — a wood-grain or neutral family added
   to `heritage-library/`.

Until this is decided, non-weave pieces render on plain cream. Do not
substitute a `textures/` pattern to fill the gap.

---

## 4. When does the weave actually appear?

Only when the piece **has visible woven material**.

- **Woven piece** (cane-back chair, webbed shelf, solihiya panel) → show the
  family's WEAVE in the provenance block, plus the matching HERITAGE CARD.
- **Same material, no weave** (a bentwood rattan frame, a bamboo pole table) →
  the piece is still in that family, but show the **PLANT** or **ACCENT**
  instead. No weave swatch.

This is the distinction that matters: *material* decides the family, *
construction* decides whether a weave is shown at all.

---

## 5. Attribution — non-negotiable

A named credit line is earned per piece, not assumed per family. Check the
inventory sheet's Weave Pattern + confidence columns first, then use:

- `Solihiya Weave` → credit `Solihiya · Philippines` — **only** on
  [VERIFIED]/[LIKELY] Solihiya SKUs (currently #0008, #0043)
- `Cane Webbing` → credit `Cane Webbing · Austin-curated` — only on confirmed
  square-grid SKUs (currently #0012, #0021, #0041)
- `Palma Weave` → credit `Palma Weave · Mexico` — unused, zero real matches
- Everything else (Open Rattan Lattice, Tight Wicker Sheet, Coiled Basket
  Wicker, Wrapped Reed Drum, Sunburst Wrap) gets its own plain descriptive
  label — none of these are Solihiya or Cane Webbing.

A named weave, once its use is verified, is credited, never fused into the
logo, and never presented as Atomic Finds IP. This is Rule 11's sibling and
applies even when the weave is decorative.

---

## 6. Known problems in the current library

Flagged rather than silently worked around.

1. **Typo baked into artwork.** `heritage-solihiya.png` reads **"Solhiiya
   Weave"** — should be *Solihiya*. It is rendered into the image, it is
   customer-facing, and it cannot be fixed in CSS. Needs a new export.

2. **Two near-identical hexagonal weaves.** `cane-webbing-weave.png` (bamboo
   family) and `weave-solihiya.png` (rattan family) show the same six-way
   hexagonal lattice, because solihiya *is* the hexagonal cane weave. They are
   different files, not duplicates — but they will read as the same texture.
   Decide which is canonical for which family.

3. **Reversed filenames that mean different things.** Within a family,
   `cane-webbing-weave.png` and `weave-cane-webbing.png` are two *different*
   images (hexagonal vs. plain basket). Same for `palma-weave.png` and
   `weave-palma.png`. This is a trap — verify visually before referencing.

4. **The rattan family has no `-plant` file.** Bamboo and palma both do. A
   rattan piece with no visible weave currently has to fall back to an accent.

5. **No inventory item is palma.** 7 distinct real weave patterns exist
   across the rattan/bamboo pieces (see the spec sheet linked at the top of
   this doc for the per-SKU breakdown). Palma stays at zero.

---

## 7. Where patterns live

- `heritage-library/` — **material patterns. Card UI pulls ONLY from here.**
- `textures/` — botanical, atomic, sparkle, starburst. Section backgrounds and
  the 7% ghost overlay behind page sections. **Never a card backdrop**, and
  never a stand-in when no material pattern applies.
