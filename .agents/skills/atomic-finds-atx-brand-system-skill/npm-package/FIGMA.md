# 🪐 Using the Atomic Finds ATX Design System in Figma 🛸

This package (`@atomicfindsatx/design-system`) provides native, plug-and-play support for Figma. You can use it in Figma using any of the four methods below.

---

## ⚡ Method 1: Included Built-in Figma Plugin (Fastest & 1-Click)

The package includes a local Figma Plugin with a warm Atomic Finds branded UI that automatically generates all Figma Variables, Color/Text/Effect Styles, and inserts vector assets onto the canvas.

### Steps:
1. In the Figma desktop app, open any file.
2. Go to the menu: **Plugins** → **Development** → **Import plugin from manifest...** (or right-click canvas → *Plugins > Development > Import plugin from manifest*).
3. Select the `figma-plugin/manifest.json` file from this repository or inside `node_modules/@atomicfindsatx/design-system/figma-plugin/manifest.json`.
4. Run the **Atomic Finds ATX Design System** plugin.
5. In the plugin window:
   - Click **⚡ Generate Figma Variables** to provision all Colors, 8px Spacing scale, Radii, and Border Widths.
   - Click **🎨 Generate Color, Text & Effect Styles** to create Paint, Typography (Mamba, Pacifico, Poppins), and flat 0-blur Stamp Shadow effect styles.
   - Click any component (Starburst, Sparkle, Button, Tag, Stamp) in the **Components** tab to insert it onto your canvas!

---

## 📦 Method 2: Tokens Studio for Figma (Continuous Git Sync)

If your team uses **Tokens Studio for Figma** (formerly Figma Tokens):

### Steps:
1. In Figma, open the **Tokens Studio for Figma** plugin.
2. Go to **Settings** → **Add New** (under Sync Providers) or click **Load from file / Load Token Set**.
3. Point to `tokens/figma-tokens.json` in this package.
4. **Git Sync (Optional)**: If syncing via GitHub/GitLab repository:
   - Provider: **GitHub**
   - Repository: `Atomic-Finds-ATX/ds`
   - File Path: `tokens/figma-tokens.json`
5. Click **Apply to Document** to sync all colors, spacing, typography, radii, and shadows!

---

## 🔌 Method 3: Figma REST API CLI Sync

If you have a Figma Personal Access Token and want to sync tokens to a team library file automatically:

```bash
# Export tokens locally
npx @atomicfindsatx/design-system export-figma

# Sync directly to a Figma file
npx @atomicfindsatx/design-system sync-figma --token <YOUR_FIGMA_TOKEN> --file <YOUR_FIGMA_FILE_KEY>
```

> **Where to find credentials:**
> - `FIGMA_TOKEN`: Figma Account Settings → Personal access tokens
> - `FIGMA_FILE_KEY`: In the URL of your Figma file: `https://www.figma.com/design/<FILE_KEY>/My-File`

---

## 📁 Method 4: Native Figma Variables Import

If you use Figma's official Variables Import/Export or custom variable loaders:

1. Import `tokens/figma-variables.json` directly.
2. It contains 4 pre-configured collections:
   - **Atomic Finds / Colors**: Locked palette (`#C8501E`, `#6B7A32`, `#2E5D4E`, `#F3E6CE`, `#E0A526`, `#E39AA8`), accessible companion steps, surfaces, ink, and status.
   - **Atomic Finds / Spacing**: 8px multiplier scale (`space-1` = 8px through `space-9` = 160px).
   - **Atomic Finds / Radii**: `sm` (8px), `button` (12px), `card` (18px), `lg` (24px), `pill` (999px).
   - **Atomic Finds / Border Width**: `width` (2px), `heavy` (3px).

---

## 🎨 Token Reference Summary for Designers

### 1. Palette
| Token | Hex | Role |
|---|---|---|
| `orange` | `#C8501E` | Burnt Orange — dominant brand accent (locked) |
| `avocado` | `#6B7A32` | Avocado Green — wordmark & graphic accent (locked) |
| `olive-teal` | `#2E5D4E` | Olive / Teal — deepest brand green & focus (locked) |
| `cream` | `#F3E6CE` | Warm Cream — base canvas ground (95% visual area) |
| `mustard` | `#E0A526` | Mustard Yellow — highlight tags & badges |
| `pink` | `#E39AA8` | Pink — minor accent ONLY, never a base surface |
| `orange-deep` | `#B4481B` | Accessible text companion (4.91:1 AA on cream) |
| `orange-btn` | `#A8431A` | Button label text on cream plates (4.89:1 AA) |
| `avocado-deep` | `#606E2D` | Accessible text companion (4.52:1 AA) |
| `ink` | `#2B2E14` | Deep Olive ink — darkest brand value (11.32:1 AAA) |
| `ink-soft` | `#5B5F3E` | Secondary body copy (5.31:1 AA) |

### 2. Spacing Scale (8px Grid)
`space-1`: 8px · `space-2`: 16px · `space-3`: 24px · `space-4`: 32px · `space-5`: 48px · `space-6`: 64px · `space-7`: 80px · `space-8`: 120px · `space-9`: 160px

### 3. Elevation (0-Blur Stamp Shadows)
- `shadow-stamp`: `4px 4px 0 #2B2E14`
- `shadow-stamp-sm`: `2px 2px 0 #2B2E14`
- `shadow-stamp-lift`: `6px 6px 0 #2B2E14`

### 4. Typography Hierarchy
1. **Level 1 (Headline / Piece Name)**: Mamba Display
2. **Level 2 (Subtitle / Sub-headline)**: Pacifico Script
3. **Level 3 (Body / Captions)**: Poppins Sans (max 3 type levels per composition)
