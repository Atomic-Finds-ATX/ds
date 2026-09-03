# Atomic Finds ATX — File Naming System (Product Photos & AI-Generated Assets)

**Last updated: August 31, 2026**
*(Update this date each time the SKU range or naming rules below change.)*

Paste the section below into any AI tool's instructions so it knows the naming rules, the required file format, and which SKUs are already spoken for.

---

## Instructions block (copy from here down)

You are managing product photos and AI-generated assets for Atomic Finds ATX, a vintage furniture resale shop. Follow this naming system exactly.

**File format: PNG (`.png`) for all files — never JPEG.** This applies to product photos and every AI-generated asset (marketing graphics, social images, etc.). Even if a source image arrives as a JPEG, convert it to PNG before saving/naming it into this system.

**General filename format (applies to every file — product photos AND AI-generated assets):** `{slug}-{tag}-{n}.png`

- `slug` — a lowercase, hyphen-separated short name for the subject. Use the item's nickname if it has one (e.g., a piece the seller calls "Ringo" becomes `ringo`); otherwise use a short kebab-case description (e.g., `bamboo-side-table-oct`, `wire-cart`, `spring-sale-banner`). Keep slugs unique — if the same nickname is reused for two different physical items (this seller does reuse names), append a distinguishing word or check the photo before assuming a match.
- `tag` — an identifier for the middle segment. What this identifier IS depends on the file type:
  - **Product photos:** a 4-digit, zero-padded SKU number (e.g., `0001`, `0037`). One SKU per physical item, never reused for two different pieces.
  - **AI-generated / marketing / other non-product assets:** does NOT need to be a SKU number. Use whatever short word, tag, or number best identifies that file's type or batch instead — e.g., `insta-post`, `flyer`, `banner-v2`, `holiday2026`. Pick something short, consistent, and descriptive rather than forcing a SKU into files that aren't tied to a specific inventory item.
- `n` — sequential number for that slug+tag combination, starting at `1` (e.g., `-1.png`, `-2.png`, `-3.png`).

Examples:
- Product photo: `ramona-0008-1.png`, `ramona-0008-2.png` (two photos of the item nicknamed "Ramona," SKU 0008).
- AI-generated asset (not tied to a SKU): `spring-sale-banner-flyer-1.png`, `atomicfindsatx-insta-post-3.png`.

**SKU range already used (product photos only): 0000–0049 (all 50 numbers currently assigned — no gaps remain open).**

- 0001–0049: originally assigned to 49 items sourced from the Facebook Marketplace catalog.
- 0000: a special out-of-sequence number assigned to one item ("Bianca") whose photos existed before it was formally catalogued.
- Of 0001–0049, 13 numbers were freed when items were removed from the active product list, then reassigned to new items sourced from Instagram: 0004, 0005, 0011, 0015, 0021, 0023, 0027, 0029, 0037, 0045, 0046, 0047, 0049.

**Next available SKU: start new inventory items at 0050 and count up.** Do not reuse any number in 0000–0049 — all of them are currently assigned to an active or archived item. This SKU range only applies to actual inventory items — AI-generated/marketing assets use a descriptive tag instead, not a number from this range.

**Other fields to track per inventory item, if adding to a catalog/spreadsheet:**
- Status: `Available` or `Sold`.
- Source: `Facebook Marketplace` or `Instagram` (or add new sources as needed, e.g., `In-Person`, `Estate Sale`).
- Listing URL: link to the original Facebook listing or Instagram post.

---

## Notes (not part of the instructions block — for your own reference)

- The photos downloaded during the last Instagram catalog update landed as JPEGs (`.jpg`) — you've since manually converted those specific files to PNG. Anything downloaded or generated going forward should be saved as PNG directly.
- If an item gets removed from the active list later, its SKU becomes available for reuse — just update the "SKU range already used" note above and cross it off, or list it separately as a freed number.
- When you next add a batch of new inventory items, update two things in this doc: the "Last updated" date at the top, and the starting SKU number (move it past whatever range you just used).
- Current full inventory: 50 items (36 from Facebook Marketplace, 14 from Instagram), tracked in `AtomicFindsATX_Furniture_Listings.xlsx`.
