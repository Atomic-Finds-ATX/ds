#!/usr/bin/env node

/**
 * build-tokens.js — Atomic Finds ATX Design System Token Compiler
 * Compiles canonical-tokens.json into:
 *  - tokens/figma-tokens.json (Tokens Studio for Figma)
 *  - tokens/figma-variables.json (Native Figma Variables REST API schema)
 *  - tokens/tokens.json (W3C DTCG format)
 *  - dist/tokens.css (CSS Custom Properties)
 *  - dist/tokens.scss (SCSS Variables & Maps)
 *  - dist/tokens.js & dist/tokens.mjs (JS ESM/CJS)
 *  - dist/tokens.d.ts (TypeScript typings)
 *  - dist/tailwind-preset.js (Tailwind CSS preset)
 *  - dist/styles.css (Compiled bundle)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const TOKENS_SRC = path.join(ROOT_DIR, 'src', 'tokens', 'canonical-tokens.json');
const TOKENS_DIR = path.join(ROOT_DIR, 'tokens');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Ensure output directories exist
[TOKENS_DIR, DIST_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const rawData = fs.readFileSync(TOKENS_SRC, 'utf8');
const tokens = JSON.parse(rawData);

/* ==========================================================================
   1. Build Tokens Studio for Figma (figma-tokens.json)
   ========================================================================== */
function buildTokensStudioFormat(t) {
  const global = {
    color: {},
    spacing: {},
    borderRadius: {},
    borderWidth: {},
    boxShadow: {},
    fontFamilies: {},
    fontSizes: {},
    lineHeights: {},
    letterSpacing: {},
    typography: {}
  };

  // Colors
  ['palette', 'accessible', 'surfaces', 'ink', 'status', 'semantic'].forEach(group => {
    if (t.color[group]) {
      global.color[group] = {};
      Object.entries(t.color[group]).forEach(([key, item]) => {
        global.color[group][key] = {
          value: item.value,
          type: 'color',
          description: item.description || ''
        };
      });
    }
  });

  // Spacing (8px grid scale)
  Object.entries(t.spacing).forEach(([key, item]) => {
    global.spacing[key] = {
      value: `${item.value}px`,
      type: 'spacing',
      description: item.description || ''
    };
  });

  // Border Radius
  Object.entries(t.radii).forEach(([key, item]) => {
    global.borderRadius[key] = {
      value: `${item.value}px`,
      type: 'borderRadius',
      description: item.description || ''
    };
  });

  // Border Width
  Object.entries(t.borders).forEach(([key, item]) => {
    global.borderWidth[key] = {
      value: `${item.value}px`,
      type: 'borderWidth',
      description: item.description || ''
    };
  });

  // Shadows
  Object.entries(t.shadows).forEach(([key, item]) => {
    global.boxShadow[key] = {
      value: {
        x: item.value.x,
        y: item.value.y,
        blur: item.value.blur,
        spread: item.value.spread,
        color: item.value.color,
        type: 'dropShadow'
      },
      type: 'boxShadow',
      description: item.description || ''
    };
  });

  // Typography Families
  Object.entries(t.typography.families).forEach(([key, item]) => {
    global.fontFamilies[key] = {
      value: item.value,
      type: 'fontFamilies',
      description: item.description || ''
    };
  });

  // Typography Sizes
  Object.entries(t.typography.sizes).forEach(([key, item]) => {
    global.fontSizes[key] = {
      value: `${item.value}px`,
      type: 'fontSizes',
      description: item.description || ''
    };
  });

  // Typography Line Heights
  Object.entries(t.typography.lineHeights).forEach(([key, item]) => {
    global.lineHeights[key] = {
      value: `${item.value}`,
      type: 'lineHeights'
    };
  });

  // Typography Letter Spacing
  Object.entries(t.typography.letterSpacing).forEach(([key, item]) => {
    global.letterSpacing[key] = {
      value: item.value,
      type: 'letterSpacing'
    };
  });

  // Composite Typography Styles for Tokens Studio
  global.typography['display-h1'] = {
    value: {
      fontFamily: '{fontFamilies.display}',
      fontWeight: 'Regular',
      fontSize: '{fontSizes.3xl}',
      lineHeight: '{lineHeights.tight}',
      letterSpacing: '{letterSpacing.display}'
    },
    type: 'typography',
    description: 'Display H1 headline (Mamba)'
  };

  global.typography['display-h2'] = {
    value: {
      fontFamily: '{fontFamilies.display}',
      fontWeight: 'Regular',
      fontSize: '{fontSizes.2xl}',
      lineHeight: '{lineHeights.tight}',
      letterSpacing: '{letterSpacing.display}'
    },
    type: 'typography',
    description: 'Display H2 section title (Mamba)'
  };

  global.typography['subhead-script'] = {
    value: {
      fontFamily: '{fontFamilies.script}',
      fontWeight: 'Regular',
      fontSize: '{fontSizes.lg}',
      lineHeight: '{lineHeights.snug}',
      letterSpacing: '{letterSpacing.display}'
    },
    type: 'typography',
    description: 'Subhead accent (Pacifico)'
  };

  global.typography['body-base'] = {
    value: {
      fontFamily: '{fontFamilies.body}',
      fontWeight: 'Regular',
      fontSize: '{fontSizes.base}',
      lineHeight: '{lineHeights.body}',
      letterSpacing: '{letterSpacing.display}'
    },
    type: 'typography',
    description: 'Standard body text (Poppins)'
  };

  return {
    $themes: [],
    $metadata: {
      tokenSetOrder: ['global']
    },
    global
  };
}

/* ==========================================================================
   2. Build Figma Native Variables Format (figma-variables.json)
   ========================================================================== */
function hexToFigmaRgba(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return { r: Number(r.toFixed(4)), g: Number(g.toFixed(4)), b: Number(b.toFixed(4)), a: 1 };
}

function buildFigmaVariablesFormat(t) {
  const collections = [
    {
      name: "Atomic Finds / Colors",
      modes: [{ modeId: "mode:default", name: "Default" }],
      defaultModeId: "mode:default",
      variables: []
    },
    {
      name: "Atomic Finds / Spacing",
      modes: [{ modeId: "mode:default", name: "Default" }],
      defaultModeId: "mode:default",
      variables: []
    },
    {
      name: "Atomic Finds / Radii",
      modes: [{ modeId: "mode:default", name: "Default" }],
      defaultModeId: "mode:default",
      variables: []
    },
    {
      name: "Atomic Finds / Border Width",
      modes: [{ modeId: "mode:default", name: "Default" }],
      defaultModeId: "mode:default",
      variables: []
    }
  ];

  // Populate Colors Collection
  const colorColl = collections[0];
  ['palette', 'accessible', 'surfaces', 'ink', 'status', 'semantic'].forEach(group => {
    if (t.color[group]) {
      Object.entries(t.color[group]).forEach(([key, item]) => {
        colorColl.variables.push({
          name: `${group}/${key}`,
          resolvedType: "COLOR",
          description: item.description || "",
          valuesByMode: {
            "mode:default": hexToFigmaRgba(item.value)
          },
          scopes: ["ALL_FILLS", "STROKE_COLOR"],
          codeSyntax: {
            WEB: `var(--af-${key.replace(/([A-Z])/g, "-$1").toLowerCase()})`
          }
        });
      });
    }
  });

  // Populate Spacing Collection (8px multiplier scale)
  const spacingColl = collections[1];
  Object.entries(t.spacing).forEach(([key, item]) => {
    spacingColl.variables.push({
      name: key,
      resolvedType: "FLOAT",
      description: item.description || "",
      valuesByMode: {
        "mode:default": item.value
      },
      scopes: ["GAP", "AUTO_LAYOUT_PADDING"],
      codeSyntax: {
        WEB: `var(--af-${key.replace(/([A-Z])/g, "-$1").toLowerCase()})`
      }
    });
  });

  // Populate Radii Collection
  const radiiColl = collections[2];
  Object.entries(t.radii).forEach(([key, item]) => {
    radiiColl.variables.push({
      name: key,
      resolvedType: "FLOAT",
      description: item.description || "",
      valuesByMode: {
        "mode:default": item.value
      },
      scopes: ["CORNER_RADIUS"],
      codeSyntax: {
        WEB: `var(--af-radius-${key})`
      }
    });
  });

  // Populate Border Width Collection
  const borderColl = collections[3];
  Object.entries(t.borders).forEach(([key, item]) => {
    borderColl.variables.push({
      name: key,
      resolvedType: "FLOAT",
      description: item.description || "",
      valuesByMode: {
        "mode:default": item.value
      },
      scopes: ["STROKE_FLOAT"],
      codeSyntax: {
        WEB: `var(--af-border-${key})`
      }
    });
  });

  return {
    version: "1.0.0",
    name: "Atomic Finds ATX Design Tokens",
    collections
  };
}

/* ==========================================================================
   3. Build W3C DTCG Format (tokens.json)
   ========================================================================== */
function buildDTCGFormat(t) {
  return {
    $schema: "https://design-tokens.github.io/community-group/format/tokens.json",
    ...t
  };
}

/* ==========================================================================
   4. Build CSS Custom Properties (dist/tokens.css)
   ========================================================================== */
function buildCSSFormat(t) {
  let css = `/* ==========================================================================
   Atomic Finds ATX — Design Tokens
   Auto-generated from canonical-tokens.json
   ========================================================================== */

:root {
  /* --- Colors: Locked Brand Palette --- */
  --af-orange: ${t.color.palette.orange.value};
  --af-avocado: ${t.color.palette.avocado.value};
  --af-olive-teal: ${t.color.palette.oliveTeal.value};
  --af-cream: ${t.color.palette.cream.value};
  --af-mustard: ${t.color.palette.mustard.value};
  --af-pink: ${t.color.palette.pink.value};

  /* --- Colors: Accessible Companions --- */
  --af-orange-deep: ${t.color.accessible.orangeDeep.value};
  --af-orange-btn: ${t.color.accessible.orangeBtn.value};
  --af-avocado-deep: ${t.color.accessible.avocadoDeep.value};

  /* --- Colors: Surfaces --- */
  --af-surface: ${t.color.surfaces.surface.value};
  --af-surface-sunk: ${t.color.surfaces.surfaceSunk.value};
  --af-surface-raised: ${t.color.surfaces.surfaceRaised.value};

  /* --- Colors: Ink --- */
  --af-ink: ${t.color.ink.ink.value};
  --af-ink-soft: ${t.color.ink.inkSoft.value};
  --af-hairline: ${t.color.ink.hairline.value};

  /* --- Status --- */
  --af-available: var(--af-avocado-deep);
  --af-sold: var(--af-orange-deep);

  /* --- Semantic Aliases --- */
  --af-text: var(--af-ink);
  --af-text-muted: var(--af-ink-soft);
  --af-text-invert: var(--af-surface);
  --af-border: var(--af-ink);
  --af-focus: var(--af-olive-teal);

  /* --- Spacing (8px Multiplier Grid) --- */
  --af-space-1: ${t.spacing.space1.rem}; /* 8px */
  --af-space-2: ${t.spacing.space2.rem}; /* 16px */
  --af-space-3: ${t.spacing.space3.rem}; /* 24px */
  --af-space-4: ${t.spacing.space4.rem}; /* 32px */
  --af-space-5: ${t.spacing.space5.rem}; /* 48px */
  --af-space-6: ${t.spacing.space6.rem}; /* 64px */
  --af-space-7: ${t.spacing.space7.rem}; /* 80px */
  --af-space-8: ${t.spacing.space8.rem}; /* 120px */
  --af-space-9: ${t.spacing.space9.rem}; /* 160px */

  /* --- Radius --- */
  --af-radius-sm: ${t.radii.sm.value}px;
  --af-radius-button: ${t.radii.button.value}px;
  --af-radius-card: ${t.radii.card.value}px;
  --af-radius-lg: ${t.radii.lg.value}px;
  --af-radius-pill: ${t.radii.pill.value}px;

  /* --- Borders --- */
  --af-border-width: ${t.borders.width.value}px;
  --af-border-heavy: ${t.borders.heavy.value}px;

  /* --- Elevation / Flat Stamp Shadows --- */
  --af-shadow-stamp-sm: ${t.shadows.stampSm.css};
  --af-shadow-stamp: ${t.shadows.stamp.css};
  --af-shadow-stamp-lift: ${t.shadows.stampLift.css};

  /* --- Typography: Families --- */
  --af-font-display: "${t.typography.families.display.value}", ${t.typography.families.display.fallback};
  --af-font-script: "${t.typography.families.script.value}", ${t.typography.families.script.fallback};
  --af-font-body: "${t.typography.families.body.value}", ${t.typography.families.body.fallback};

  /* --- Typography: Scale --- */
  --af-text-xs: ${t.typography.sizes.xs.rem};
  --af-text-sm: ${t.typography.sizes.sm.rem};
  --af-text-base: ${t.typography.sizes.base.rem};
  --af-text-lg: ${t.typography.sizes.lg.rem};
  --af-text-xl: ${t.typography.sizes.xl.rem};
  --af-text-2xl: clamp(2rem, 1.40rem + 2.6vw, 2.5rem);
  --af-text-3xl: clamp(2.4rem, 1.50rem + 4.0vw, 3.5rem);
  --af-text-4xl: clamp(3rem, 1.60rem + 6.4vw, 5rem);

  /* --- Typography: Line Height --- */
  --af-leading-tight: ${t.typography.lineHeights.tight.value};
  --af-leading-snug: ${t.typography.lineHeights.snug.value};
  --af-leading-body: ${t.typography.lineHeights.body.value};

  /* --- Typography: Tracking --- */
  --af-tracking-display: ${t.typography.letterSpacing.display.value};
  --af-tracking-label: ${t.typography.letterSpacing.label.value};
  --af-tracking-stamp: ${t.typography.letterSpacing.stamp.value};

  /* --- Motion --- */
  --af-ease: ${t.motion.ease};
  --af-duration-fast: ${t.motion.durationFast};
  --af-duration: ${t.motion.duration};
  --af-duration-slow: ${t.motion.durationSlow};

  /* --- Layout --- */
  --af-container: ${t.layout.container};
  --af-measure: ${t.layout.measure};
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --af-duration-fast: 1ms;
    --af-duration: 1ms;
    --af-duration-slow: 1ms;
  }
}
`;
  return css;
}

/* ==========================================================================
   5. Build SCSS Variables (dist/tokens.scss)
   ========================================================================== */
function buildSCSSFormat(t) {
  return `// Atomic Finds ATX Design Tokens (SCSS)
$af-orange: ${t.color.palette.orange.value};
$af-avocado: ${t.color.palette.avocado.value};
$af-olive-teal: ${t.color.palette.oliveTeal.value};
$af-cream: ${t.color.palette.cream.value};
$af-mustard: ${t.color.palette.mustard.value};
$af-pink: ${t.color.palette.pink.value};

$af-orange-deep: ${t.color.accessible.orangeDeep.value};
$af-orange-btn: ${t.color.accessible.orangeBtn.value};
$af-avocado-deep: ${t.color.accessible.avocadoDeep.value};

$af-surface: ${t.color.surfaces.surface.value};
$af-surface-sunk: ${t.color.surfaces.surfaceSunk.value};
$af-surface-raised: ${t.color.surfaces.surfaceRaised.value};

$af-ink: ${t.color.ink.ink.value};
$af-ink-soft: ${t.color.ink.inkSoft.value};
$af-hairline: ${t.color.ink.hairline.value};

$af-space-1: ${t.spacing.space1.value}px;
$af-space-2: ${t.spacing.space2.value}px;
$af-space-3: ${t.spacing.space3.value}px;
$af-space-4: ${t.spacing.space4.value}px;
$af-space-5: ${t.spacing.space5.value}px;
$af-space-6: ${t.spacing.space6.value}px;
$af-space-7: ${t.spacing.space7.value}px;
$af-space-8: ${t.spacing.space8.value}px;
$af-space-9: ${t.spacing.space9.value}px;

$af-radius-sm: ${t.radii.sm.value}px;
$af-radius-card: ${t.radii.card.value}px;
$af-radius-lg: ${t.radii.lg.value}px;
$af-radius-pill: ${t.radii.pill.value}px;

$af-shadow-stamp: ${t.shadows.stamp.css};
$af-shadow-stamp-sm: ${t.shadows.stampSm.css};
$af-shadow-stamp-lift: ${t.shadows.stampLift.css};
`;
}

/* ==========================================================================
   6. Build JS & TypeScript Tokens (dist/tokens.js, dist/tokens.d.ts)
   ========================================================================== */
function buildJSFormat(t) {
  return `/**
 * Atomic Finds ATX Design Tokens
 * Auto-generated token constants
 */

export const colors = {
  palette: {
    orange: "${t.color.palette.orange.value}",
    avocado: "${t.color.palette.avocado.value}",
    oliveTeal: "${t.color.palette.oliveTeal.value}",
    cream: "${t.color.palette.cream.value}",
    mustard: "${t.color.palette.mustard.value}",
    pink: "${t.color.palette.pink.value}"
  },
  accessible: {
    orangeDeep: "${t.color.accessible.orangeDeep.value}",
    orangeBtn: "${t.color.accessible.orangeBtn.value}",
    avocadoDeep: "${t.color.accessible.avocadoDeep.value}"
  },
  surfaces: {
    surface: "${t.color.surfaces.surface.value}",
    surfaceSunk: "${t.color.surfaces.surfaceSunk.value}",
    surfaceRaised: "${t.color.surfaces.surfaceRaised.value}"
  },
  ink: {
    ink: "${t.color.ink.ink.value}",
    inkSoft: "${t.color.ink.inkSoft.value}",
    hairline: "${t.color.ink.hairline.value}"
  },
  status: {
    available: "${t.color.status.available.value}",
    sold: "${t.color.status.sold.value}"
  }
};

export const spacing = {
  1: ${t.spacing.space1.value},
  2: ${t.spacing.space2.value},
  3: ${t.spacing.space3.value},
  4: ${t.spacing.space4.value},
  5: ${t.spacing.space5.value},
  6: ${t.spacing.space6.value},
  7: ${t.spacing.space7.value},
  8: ${t.spacing.space8.value},
  9: ${t.spacing.space9.value}
};

export const radii = {
  sm: ${t.radii.sm.value},
  button: ${t.radii.button.value},
  card: ${t.radii.card.value},
  lg: ${t.radii.lg.value},
  pill: ${t.radii.pill.value}
};

export const borders = {
  width: ${t.borders.width.value},
  heavy: ${t.borders.heavy.value}
};

export const shadows = {
  stampSm: "${t.shadows.stampSm.css}",
  stamp: "${t.shadows.stamp.css}",
  stampLift: "${t.shadows.stampLift.css}"
};

export const typography = {
  families: {
    display: "${t.typography.families.display.value}",
    script: "${t.typography.families.script.value}",
    body: "${t.typography.families.body.value}"
  },
  sizes: {
    xs: ${t.typography.sizes.xs.value},
    sm: ${t.typography.sizes.sm.value},
    base: ${t.typography.sizes.base.value},
    lg: ${t.typography.sizes.lg.value},
    xl: ${t.typography.sizes.xl.value},
    "2xl": ${t.typography.sizes["2xl"].value},
    "3xl": ${t.typography.sizes["3xl"].value},
    "4xl": ${t.typography.sizes["4xl"].value}
  }
};

export const tokens = {
  colors,
  spacing,
  radii,
  borders,
  shadows,
  typography
};

export default tokens;
`;
}

function buildDTSFormat() {
  return `export interface ColorGroup {
  [key: string]: string;
}

export interface ColorsToken {
  palette: {
    orange: string;
    avocado: string;
    oliveTeal: string;
    cream: string;
    mustard: string;
    pink: string;
  };
  accessible: {
    orangeDeep: string;
    orangeBtn: string;
    avocadoDeep: string;
  };
  surfaces: {
    surface: string;
    surfaceSunk: string;
    surfaceRaised: string;
  };
  ink: {
    ink: string;
    inkSoft: string;
    hairline: string;
  };
  status: {
    available: string;
    sold: string;
  };
}

export interface SpacingToken {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
}

export interface RadiiToken {
  sm: number;
  button: number;
  card: number;
  lg: number;
  pill: number;
}

export interface BordersToken {
  width: number;
  heavy: number;
}

export interface ShadowsToken {
  stampSm: string;
  stamp: string;
  stampLift: string;
}

export interface TypographyToken {
  families: {
    display: string;
    script: string;
    body: string;
  };
  sizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
}

export interface DesignTokens {
  colors: ColorsToken;
  spacing: SpacingToken;
  radii: RadiiToken;
  borders: BordersToken;
  shadows: ShadowsToken;
  typography: TypographyToken;
}

export declare const colors: ColorsToken;
export declare const spacing: SpacingToken;
export declare const radii: RadiiToken;
export declare const borders: BordersToken;
export declare const shadows: ShadowsToken;
export declare const typography: TypographyToken;
export declare const tokens: DesignTokens;
export default tokens;
`;
}

/* ==========================================================================
   7. Build Tailwind CSS Preset (dist/tailwind-preset.js)
   ========================================================================== */
function buildTailwindPreset(t) {
  return `/**
 * Tailwind CSS preset for Atomic Finds ATX Design System
 * Usage in tailwind.config.js:
 *   presets: [require('@atomicfindsatx/design-system/tailwind')]
 */

export default {
  theme: {
    extend: {
      colors: {
        'af-orange': '${t.color.palette.orange.value}',
        'af-avocado': '${t.color.palette.avocado.value}',
        'af-olive-teal': '${t.color.palette.oliveTeal.value}',
        'af-cream': '${t.color.palette.cream.value}',
        'af-mustard': '${t.color.palette.mustard.value}',
        'af-pink': '${t.color.palette.pink.value}',
        'af-orange-deep': '${t.color.accessible.orangeDeep.value}',
        'af-orange-btn': '${t.color.accessible.orangeBtn.value}',
        'af-avocado-deep': '${t.color.accessible.avocadoDeep.value}',
        'af-surface': '${t.color.surfaces.surface.value}',
        'af-surface-sunk': '${t.color.surfaces.surfaceSunk.value}',
        'af-surface-raised': '${t.color.surfaces.surfaceRaised.value}',
        'af-ink': '${t.color.ink.ink.value}',
        'af-ink-soft': '${t.color.ink.inkSoft.value}',
        'af-hairline': '${t.color.ink.hairline.value}'
      },
      spacing: {
        'af-1': '8px',
        'af-2': '16px',
        'af-3': '24px',
        'af-4': '32px',
        'af-5': '48px',
        'af-6': '64px',
        'af-7': '80px',
        'af-8': '120px',
        'af-9': '160px'
      },
      borderRadius: {
        'af-sm': '8px',
        'af-button': '12px',
        'af-card': '18px',
        'af-lg': '24px',
        'af-pill': '999px'
      },
      boxShadow: {
        'af-stamp-sm': '2px 2px 0 #2B2E14',
        'af-stamp': '4px 4px 0 #2B2E14',
        'af-stamp-lift': '6px 6px 0 #2B2E14'
      },
      fontFamily: {
        'af-display': ['Mamba', 'Cooper Black', 'serif'],
        'af-script': ['Pacifico', 'cursive'],
        'af-body': ['Poppins', 'system-ui', 'sans-serif']
      }
    }
  }
};
`;
}

/* ==========================================================================
   Execution
   ========================================================================== */
console.log('📦 Compiling Atomic Finds ATX Design Tokens...');

// 1. Tokens Studio for Figma
const tokensStudioJSON = buildTokensStudioFormat(tokens);
fs.writeFileSync(path.join(TOKENS_DIR, 'figma-tokens.json'), JSON.stringify(tokensStudioJSON, null, 2));
fs.writeFileSync(path.join(DIST_DIR, 'figma-tokens.json'), JSON.stringify(tokensStudioJSON, null, 2));
console.log('  ✔ tokens/figma-tokens.json');

// 2. Figma Native Variables
const figmaVariablesJSON = buildFigmaVariablesFormat(tokens);
fs.writeFileSync(path.join(TOKENS_DIR, 'figma-variables.json'), JSON.stringify(figmaVariablesJSON, null, 2));
fs.writeFileSync(path.join(DIST_DIR, 'figma-variables.json'), JSON.stringify(figmaVariablesJSON, null, 2));
console.log('  ✔ tokens/figma-variables.json');

// 3. W3C DTCG
const dtcgJSON = buildDTCGFormat(tokens);
fs.writeFileSync(path.join(TOKENS_DIR, 'tokens.json'), JSON.stringify(dtcgJSON, null, 2));
fs.writeFileSync(path.join(DIST_DIR, 'tokens.json'), JSON.stringify(dtcgJSON, null, 2));
console.log('  ✔ tokens/tokens.json');

// 4. CSS Custom Properties
const cssContent = buildCSSFormat(tokens);
fs.writeFileSync(path.join(DIST_DIR, 'tokens.css'), cssContent);
console.log('  ✔ dist/tokens.css');

// 5. SCSS
const scssContent = buildSCSSFormat(tokens);
fs.writeFileSync(path.join(DIST_DIR, 'tokens.scss'), scssContent);
console.log('  ✔ dist/tokens.scss');

// 6. JS / TS
const jsContent = buildJSFormat(tokens);
fs.writeFileSync(path.join(DIST_DIR, 'tokens.js'), jsContent);
fs.writeFileSync(path.join(DIST_DIR, 'tokens.mjs'), jsContent);
const dtsContent = buildDTSFormat();
fs.writeFileSync(path.join(DIST_DIR, 'tokens.d.ts'), dtsContent);
console.log('  ✔ dist/tokens.js, dist/tokens.mjs & dist/tokens.d.ts');

// 7. Tailwind preset
const tailwindContent = buildTailwindPreset(tokens);
fs.writeFileSync(path.join(DIST_DIR, 'tailwind-preset.js'), tailwindContent);
console.log('  ✔ dist/tailwind-preset.js');

// 8. Bundle full styles.css
const componentsCssPath = path.join(ROOT_DIR, 'design-system', 'components.css');
let fullStyles = cssContent;
if (fs.existsSync(componentsCssPath)) {
  fullStyles += '\n\n' + fs.readFileSync(componentsCssPath, 'utf8');
}
fs.writeFileSync(path.join(DIST_DIR, 'styles.css'), fullStyles);
console.log('  ✔ dist/styles.css');

console.log('✨ All tokens and Figma formats compiled successfully!\n');
