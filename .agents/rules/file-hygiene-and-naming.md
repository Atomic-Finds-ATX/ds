# Repository File Hygiene & Naming Conventions

> **Core Philosophy**: A place for everything, and everything in its place. Never dump loose files or stray folders into the repository root. Keep tooling and assets strictly nested under the subsystem they serve.

---

## 1. Root & Subsystem Containment

### Root Whitelist
Only root-level website HTML entry points and standard repository configuration are permitted in the workspace root:
- **Site Entry Points**: `index.html`, `contact.html`, `privacy-policy.html`, `terms-of-service.html`, `sitemap.html`, `accessibility-statement.html`
- **Core Config**: `package.json`, `.gitignore`, `README.md`, `CNAME`, `robots.txt`

### Subsystem Boundaries
- **Tooling & Plugins**: All developer tooling and editor/app plugins must live inside the subsystem they serve under `tools/`.
  - *Example*: Figma plugin & guide → `design-system/tools/figma-plugin/`
- **Design System**: All production assets, canonical tokens, styles, and living documentation live in `design-system/`:
  - `design-system/tokens/` — canonical tokens & CSS sources
  - `design-system/assets/` — production brand assets (logos, textures, motifs, product photos, fonts, masters)
  - `design-system/tools/` — developer & designer tools
- **Agent Skills & Rules**: Internal agent knowledge and skill packages belong in `.agents/` (`.agents/skills/`, `.agents/rules/`, `.agents/logs/`). Never place agent metadata or skills inside production asset folders.
- **Compiled Artifacts**: All compiled distribution bundles, exports, and generated tokens live in `dist/`.

---

## 2. Design Tokens — Single Source of Truth

- **Canonical Source**: `design-system/tokens/canonical-tokens.json` is the sole source of truth for all design tokens.
- **Token Compilation**: Running `npm run build` compiles `canonical-tokens.json` into `dist/`:
  - `dist/tokens.css` (CSS custom properties)
  - `dist/tokens.scss` (SCSS variables & maps)
  - `dist/tokens.js`, `dist/tokens.mjs`, `dist/tokens.d.ts` (ESM, CJS & TS types)
  - `dist/figma-tokens.json` (Tokens Studio for Figma)
  - `dist/figma-variables.json` (Figma Native Variables)
  - `dist/tokens.json` (W3C DTCG format)
  - `dist/tailwind-preset.js` (Tailwind CSS preset)
  - `dist/styles.css` (Bundled production CSS)
- **No Duplicate Token Roots**: Never create or restore top-level `tokens/` or `src/tokens/`.

---

## 3. Universal Naming Conventions (Strict Kebab-Case)

Every file and directory in this repository must follow strict kebab-case:
1. **Lowercase alphanumeric only**: `[a-z0-9-]+`
2. **Hyphens only**: Always use hyphens (`-`) as separators.
3. **No underscores**: Never use underscores (`_`) in file or folder names (e.g., `masters/`, not `_masters/`).
4. **No spaces or special characters**: Zero tolerance for spaces, parentheses, brackets, or punctuation.
5. **Lowercase extensions**: Always use lowercase file extensions (`.png`, `.jpg`, `.webp`, `.svg`, `.json`, `.css`, `.js`, `.jsx`, `.md`).
6. *Exception*: Proper noun font family files (e.g., `Mamba.otf`) keep capital proper nouns as font-family identifiers.

---

## 4. Product Photo & Asset Naming Schema

### Product Photos
All product photos follow the official Atomic Finds ATX inventory structure:

```
[slug]-[sku]-[date]-[shot-type].png
```

- **`[slug]`**: Lowercase item name in kebab-case (e.g. `ramona`, `betty`, `bamboo-lounge-set`, `peacock-chair`).
- **`[sku]`**: 4-digit unique inventory SKU (e.g. `0014`, `0045`). *Note: New inventory SKUs start at `0050`*.
- **`[date]`**: ISO year-first date format `YY-MM-DD` (2 digits each, e.g. `26-09-12` for Sept 12, 2026).
- **`[shot-type]`**: Descriptive angle or view (e.g. `front`, `side`, `angle`, `detail`, `back`, `overhead`, `lifestyle`, `scale`).

#### Examples:
- `ramona-0014-26-09-12-front.png`
- `bamboo-lounge-set-0030-26-09-12-detail.png`
- `peacock-chair-0010-26-09-12-side.png`

### Marketing & Brand Assets
For non-inventory marketing assets, social assets, or promotional graphics:

```
[category]-[piece-name]-[date]-[index].png
```

- **`[category]`**: Asset type (`banner`, `social-story`, `reel-cover`, `flyer`, `campaign`).
- **`[piece-name]`**: Campaign or subject descriptor (e.g. `spring-sale`, `retro-patio`, `meet-nacho`).
- **`[date]`**: ISO date format `YY-MM-DD`.
- **`[index]`**: 2-digit sequential index (`01`, `02`, `03`).

#### Examples:
- `social-story-spring-sale-26-09-12-01.png`
- `banner-retro-patio-26-09-12-01.png`

---

## 5. Safe Operations & Atomic Path Resolution

- **Reference Scanning**: Before moving or renaming any file or folder, perform a repository-wide grep for all references across HTML, JSX, CSS, JSON, Markdown, and build scripts.
- **Atomic Commits**: Always update file paths in the same atomic change as the file rename or move so the repository never enters a broken state.
- **Changelog Logging**: Document all file renames and moves in a markdown log file under `.agents/logs/` (e.g. `.agents/logs/cleanup-YYYY-MM-DD.md`) rather than leaving inline annotations in production code.
