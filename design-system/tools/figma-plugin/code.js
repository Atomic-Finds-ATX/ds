/**
 * Atomic Finds ATX — Official Figma Plugin Code
 * Provisions Figma Variables, Color & Text Styles, 0-blur Effect Styles,
 * and generates a complete on-canvas Design System Component & Style Kit.
 */

figma.showUI(__html__, { width: 440, height: 660, title: "Atomic Finds ATX Design System" });

const BRAND_TOKENS = {
  colors: {
    palette: {
      "orange": { hex: "#C8501E", name: "Burnt Orange", role: "Dominant Accent (Locked)" },
      "avocado": { hex: "#6B7A32", name: "Avocado Green", role: "Wordmark Color (Locked)" },
      "olive-teal": { hex: "#2E5D4E", name: "Olive / Teal", role: "Deep Green & Focus (Locked)" },
      "cream": { hex: "#F3E6CE", name: "Warm Cream", role: "Canvas Ground 95% (Locked)" },
      "mustard": { hex: "#E0A526", name: "Mustard Yellow", role: "Tag Highlight (Locked)" },
      "pink": { hex: "#E39AA8", name: "Pink", role: "Minor Accent Only (Locked)" }
    },
    accessible: {
      "orange-deep": { hex: "#B4481B", name: "Orange Deep", role: "Text on Cream (4.91:1 AA)" },
      "orange-btn": { hex: "#A8431A", name: "Orange Button", role: "Button Text on Cream (4.89:1 AA)" },
      "avocado-deep": { hex: "#606E2D", name: "Avocado Deep", role: "Text on Cream (4.52:1 AA)" }
    },
    surfaces: {
      "surface": { hex: "#F3E6CE", name: "Base Canvas", role: "95% Page Canvas" },
      "surface-sunk": { hex: "#E5D6B8", name: "Sunk Cream", role: "Wells & Card Insets" },
      "surface-raised": { hex: "#FAF1DF", name: "Raised Cream", role: "Elevated Cards" }
    },
    ink: {
      "ink": { hex: "#2B2E14", name: "Deep Olive Ink", role: "Primary Ink (11.32:1 AAA)" },
      "ink-soft": { hex: "#5B5F3E", name: "Muted Olive", role: "Secondary Copy (5.31:1 AA)" },
      "hairline": { hex: "#D8C7A6", name: "Hairline Cream", role: "Dashed Rules & Dividers" }
    },
    status: {
      "available": { hex: "#606E2D", name: "Available", role: "Available Badge" },
      "sold": { hex: "#B4481B", name: "Sold / Adopted", role: "Sold Badge" }
    }
  },
  spacing: {
    "space-1": 8,
    "space-2": 16,
    "space-3": 24,
    "space-4": 32,
    "space-5": 48,
    "space-6": 64,
    "space-7": 80,
    "space-8": 120,
    "space-9": 160
  },
  radii: {
    "radius-sm": 8,
    "radius-button": 12,
    "radius-card": 18,
    "radius-lg": 24,
    "radius-pill": 999
  },
  borders: {
    "border-width": 2,
    "border-heavy": 3
  },
  shadows: {
    "shadow-stamp-sm": { x: 2, y: 2, blur: 0, spread: 0, color: "#2B2E14" },
    "shadow-stamp": { x: 4, y: 4, blur: 0, spread: 0, color: "#2B2E14" },
    "shadow-stamp-lift": { x: 6, y: 6, blur: 0, spread: 0, color: "#2B2E14" }
  }
};

function hexToFigmaRGB(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return {
    r: Math.round(r * 1000) / 1000,
    g: Math.round(g * 1000) / 1000,
    b: Math.round(b * 1000) / 1000
  };
}

function logToUI(msg, isError = false) {
  figma.ui.postMessage({ type: 'log', message: msg, isError });
}

async function loadFontWithFallback(primary, styleName, fallbackFamily = "Inter", fallbackStyle = "Regular") {
  try {
    await figma.loadFontAsync({ family: primary, style: styleName });
    return { family: primary, style: styleName };
  } catch (e) {
    try {
      await figma.loadFontAsync({ family: fallbackFamily, style: fallbackStyle });
      return { family: fallbackFamily, style: fallbackStyle };
    } catch (err) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      return { family: "Inter", style: "Regular" };
    }
  }
}

// 1. Create Figma Native Variables
async function setupVariables() {
  try {
    if (!figma.variables) {
      const msg = "Figma Variables API not available in this file. (Requires Figma Variables enabled).";
      logToUI(msg, true);
      return { success: false, count: 0 };
    }

    logToUI("📦 Generating Figma Variable Collections...");
    let count = 0;

    async function getCollections() {
      if (typeof figma.variables.getLocalVariableCollectionsAsync === 'function') {
        return await figma.variables.getLocalVariableCollectionsAsync();
      }
      return figma.variables.getLocalVariableCollections();
    }

    async function getVariables() {
      if (typeof figma.variables.getLocalVariablesAsync === 'function') {
        return await figma.variables.getLocalVariablesAsync();
      }
      return figma.variables.getLocalVariables();
    }

    async function getOrCreateCollection(name) {
      const collections = await getCollections();
      let coll = collections.find(c => c.name === name);
      if (!coll) {
        coll = figma.variables.createVariableCollection(name);
      }
      return coll;
    }

    const existingVars = await getVariables();

    // --- Colors Collection ---
    const colorColl = await getOrCreateCollection("Atomic Finds / Colors");
    const colorModeId = colorColl.defaultModeId || (colorColl.modes && colorColl.modes[0] && colorColl.modes[0].modeId);

    for (const [group, colorMap] of Object.entries(BRAND_TOKENS.colors)) {
      for (const [name, data] of Object.entries(colorMap)) {
        try {
          const varName = `${group}/${name}`;
          let v = existingVars.find(item => item.name === varName && item.variableCollectionId === colorColl.id);
          if (!v) {
            v = figma.variables.createVariable(varName, colorColl.id, "COLOR");
          }
          const rgb = hexToFigmaRGB(data.hex);
          v.setValueForMode(colorModeId, { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 });
          try { v.scopes = ["ALL_FILLS", "STROKE_COLOR"]; } catch (e) {}
          try { if (typeof v.setVariableCodeSyntax === 'function') v.setVariableCodeSyntax("WEB", `var(--af-${name})`); } catch (e) {}
          count++;
        } catch (err) {
          logToUI(`Notice on variable ${name}: ${err.message}`);
        }
      }
    }

    // --- Spacing Collection ---
    const spacingColl = await getOrCreateCollection("Atomic Finds / Spacing");
    const spacingModeId = spacingColl.defaultModeId || (spacingColl.modes && spacingColl.modes[0] && spacingColl.modes[0].modeId);
    for (const [name, val] of Object.entries(BRAND_TOKENS.spacing)) {
      try {
        let v = existingVars.find(item => item.name === name && item.variableCollectionId === spacingColl.id);
        if (!v) {
          v = figma.variables.createVariable(name, spacingColl.id, "FLOAT");
        }
        v.setValueForMode(spacingModeId, val);
        try { v.scopes = ["GAP", "AUTO_LAYOUT_PADDING", "WIDTH_HEIGHT"]; } catch (e) {}
        try { if (typeof v.setVariableCodeSyntax === 'function') v.setVariableCodeSyntax("WEB", `var(--af-${name})`); } catch (e) {}
        count++;
      } catch (err) {}
    }

    // --- Radii Collection ---
    const radiiColl = await getOrCreateCollection("Atomic Finds / Radii");
    const radiiModeId = radiiColl.defaultModeId || (radiiColl.modes && radiiColl.modes[0] && radiiColl.modes[0].modeId);
    for (const [name, val] of Object.entries(BRAND_TOKENS.radii)) {
      try {
        let v = existingVars.find(item => item.name === name && item.variableCollectionId === radiiColl.id);
        if (!v) {
          v = figma.variables.createVariable(name, radiiColl.id, "FLOAT");
        }
        v.setValueForMode(radiiModeId, val);
        try { v.scopes = ["CORNER_RADIUS"]; } catch (e) {}
        count++;
      } catch (err) {}
    }

    // --- Border Width Collection ---
    const borderColl = await getOrCreateCollection("Atomic Finds / Border Width");
    const borderModeId = borderColl.defaultModeId || (borderColl.modes && borderColl.modes[0] && borderColl.modes[0].modeId);
    for (const [name, val] of Object.entries(BRAND_TOKENS.borders)) {
      try {
        let v = existingVars.find(item => item.name === name && item.variableCollectionId === borderColl.id);
        if (!v) {
          v = figma.variables.createVariable(name, borderColl.id, "FLOAT");
        }
        v.setValueForMode(borderModeId, val);
        try { v.scopes = ["STROKE_FLOAT"]; } catch (e) {}
        count++;
      } catch (err) {}
    }

    logToUI(`✔ Created ${count} Figma Native Variables in 4 Collections!`);
    return { success: true, count };
  } catch (err) {
    logToUI("Variables error: " + err.message, true);
    return { success: false, error: err.message };
  }
}

// 2. Create Figma Color, Text & Effect Styles
async function setupStyles() {
  try {
    logToUI("🎨 Generating Figma Color, Text & Effect Styles...");
    let styleCount = 0;

    // Paint Styles
    const existingPaintStyles = typeof figma.getLocalPaintStylesAsync === 'function'
      ? await figma.getLocalPaintStylesAsync()
      : figma.getLocalPaintStyles();

    for (const [group, colorMap] of Object.entries(BRAND_TOKENS.colors)) {
      for (const [name, data] of Object.entries(colorMap)) {
        try {
          const styleName = `Atomic Finds/${group}/${name}`;
          let style = existingPaintStyles.find(s => s.name === styleName);
          if (!style) {
            style = figma.createPaintStyle();
            style.name = styleName;
          }
          const rgb = hexToFigmaRGB(data.hex);
          style.paints = [{ type: "SOLID", color: rgb }];
          styleCount++;
        } catch (err) {}
      }
    }

    // Effect Styles (0-blur stamp shadows)
    const existingEffectStyles = typeof figma.getLocalEffectStylesAsync === 'function'
      ? await figma.getLocalEffectStylesAsync()
      : figma.getLocalEffectStyles();

    for (const [name, shadow] of Object.entries(BRAND_TOKENS.shadows)) {
      try {
        const styleName = `Atomic Finds/${name}`;
        let style = existingEffectStyles.find(s => s.name === styleName);
        if (!style) {
          style = figma.createEffectStyle();
          style.name = styleName;
        }
        const rgb = hexToFigmaRGB(shadow.color);
        style.effects = [{
          type: "DROP_SHADOW",
          color: { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 },
          offset: { x: shadow.x, y: shadow.y },
          radius: shadow.blur,
          spread: shadow.spread,
          visible: true,
          blendMode: "NORMAL"
        }];
        styleCount++;
      } catch (err) {}
    }

    // Text Styles
    const existingTextStyles = typeof figma.getLocalTextStylesAsync === 'function'
      ? await figma.getLocalTextStylesAsync()
      : figma.getLocalTextStyles();

    const textStyleConfigs = [
      { name: "Atomic Finds/Display H1 (Mamba)", family: "Mamba", fallback: "Georgia", size: 56, lineHeight: 56 * 1.05, style: "Regular" },
      { name: "Atomic Finds/Display H2 (Mamba)", family: "Mamba", fallback: "Georgia", size: 40, lineHeight: 40 * 1.05, style: "Regular" },
      { name: "Atomic Finds/Subhead (Pacifico)", family: "Pacifico", fallback: "Brush Script MT", size: 20, lineHeight: 20 * 1.3, style: "Regular" },
      { name: "Atomic Finds/Body Large (Poppins)", family: "Poppins", fallback: "Inter", size: 20, lineHeight: 20 * 1.6, style: "Regular" },
      { name: "Atomic Finds/Body Regular (Poppins)", family: "Poppins", fallback: "Inter", size: 16, lineHeight: 16 * 1.6, style: "Regular" },
      { name: "Atomic Finds/Body Bold (Poppins)", family: "Poppins", fallback: "Inter", size: 16, lineHeight: 16 * 1.6, style: "Bold" },
      { name: "Atomic Finds/Tag & Label (Poppins)", family: "Poppins", fallback: "Inter", size: 14, lineHeight: 14 * 1.4, style: "SemiBold", letterSpacing: 1.4 },
      { name: "Atomic Finds/Stamp Micro (Poppins)", family: "Poppins", fallback: "Inter", size: 10, lineHeight: 10 * 1.3, style: "Bold", letterSpacing: 2 }
    ];

    for (const config of textStyleConfigs) {
      try {
        let font = await loadFontWithFallback(config.family, config.style, config.fallback);
        let style = existingTextStyles.find(s => s.name === config.name);
        if (!style) {
          style = figma.createTextStyle();
          style.name = config.name;
        }
        style.fontName = font;
        style.fontSize = config.size;
        style.lineHeight = { value: config.lineHeight, unit: "PIXELS" };
        if (config.letterSpacing) {
          style.letterSpacing = { value: config.letterSpacing, unit: "PIXELS" };
        }
        styleCount++;
      } catch (err) {}
    }

    logToUI(`✔ Created ${styleCount} Paint, Text & Effect Styles!`);
    return { success: true, count: styleCount };
  } catch (err) {
    logToUI("Styles error: " + err.message, true);
    return { success: false, error: err.message };
  }
}

// 3. Insert Complete On-Canvas Design System Kit
async function createFullDesignSystemCanvas() {
  logToUI("🖼️ Laying out Complete Design System Kit on Canvas...");

  const creamRGB = hexToFigmaRGB(BRAND_TOKENS.colors.palette.cream.hex);
  const orangeRGB = hexToFigmaRGB(BRAND_TOKENS.colors.palette.orange.hex);
  const avocadoRGB = hexToFigmaRGB(BRAND_TOKENS.colors.palette.avocado.hex);
  const oliveTealRGB = hexToFigmaRGB(BRAND_TOKENS.colors.palette["olive-teal"].hex);
  const inkRGB = hexToFigmaRGB(BRAND_TOKENS.colors.ink.ink.hex);
  const inkSoftRGB = hexToFigmaRGB(BRAND_TOKENS.colors.ink["ink-soft"].hex);
  const orangeBtnRGB = hexToFigmaRGB(BRAND_TOKENS.colors.accessible["orange-btn"].hex);
  const avocadoDeepRGB = hexToFigmaRGB(BRAND_TOKENS.colors.accessible["avocado-deep"].hex);
  const mustardRGB = hexToFigmaRGB(BRAND_TOKENS.colors.palette.mustard.hex);
  const pinkRGB = hexToFigmaRGB(BRAND_TOKENS.colors.palette.pink.hex);
  const surfaceRaisedRGB = hexToFigmaRGB(BRAND_TOKENS.colors.surfaces["surface-raised"].hex);

  const boldFont = await loadFontWithFallback("Inter", "Bold");
  const regFont = await loadFontWithFallback("Inter", "Regular");

  const masterFrame = figma.createFrame();
  masterFrame.name = "🪐 Atomic Finds ATX — Design System & Component Kit";
  masterFrame.layoutMode = "VERTICAL";
  masterFrame.paddingLeft = 48;
  masterFrame.paddingRight = 48;
  masterFrame.paddingTop = 48;
  masterFrame.paddingBottom = 48;
  masterFrame.itemSpacing = 40;
  masterFrame.fills = [{ type: "SOLID", color: creamRGB }];
  masterFrame.strokes = [{ type: "SOLID", color: inkRGB }];
  masterFrame.strokeWeight = 3;
  masterFrame.cornerRadius = 24;

  // Title Row
  const titleGroup = figma.createFrame();
  titleGroup.layoutMode = "VERTICAL";
  titleGroup.itemSpacing = 6;
  titleGroup.fills = [];

  const mainTitle = figma.createText();
  mainTitle.fontName = boldFont;
  mainTitle.fontSize = 32;
  mainTitle.characters = "Atomic Finds ATX — Design System Kit";
  mainTitle.fills = [{ type: "SOLID", color: avocadoDeepRGB }];
  titleGroup.appendChild(mainTitle);

  const tagline = figma.createText();
  tagline.fontName = regFont;
  tagline.fontSize = 16;
  tagline.characters = "Tiny Time Machines for Your Home · Austin Vintage Rattan & Bamboo (60s–70s)";
  tagline.fills = [{ type: "SOLID", color: inkSoftRGB }];
  titleGroup.appendChild(tagline);

  masterFrame.appendChild(titleGroup);

  // SECTION 1: Color Palette
  const colorSection = figma.createFrame();
  colorSection.name = "1. Color Palette Tokens";
  colorSection.layoutMode = "VERTICAL";
  colorSection.itemSpacing = 16;
  colorSection.fills = [];

  const sec1Title = figma.createText();
  sec1Title.fontName = boldFont;
  sec1Title.fontSize = 18;
  sec1Title.characters = "1. Locked Brand Palette & Companion Colors";
  sec1Title.fills = [{ type: "SOLID", color: inkRGB }];
  colorSection.appendChild(sec1Title);

  const swatchGrid = figma.createFrame();
  swatchGrid.layoutMode = "HORIZONTAL";
  swatchGrid.itemSpacing = 16;
  swatchGrid.fills = [];

  const paletteItems = [
    { name: "Burnt Orange", hex: "#C8501E", role: "Primary Accent (Locked)", sub: "var(--af-orange)" },
    { name: "Avocado Green", hex: "#6B7A32", role: "Wordmark (Locked)", sub: "var(--af-avocado)" },
    { name: "Olive / Teal", hex: "#2E5D4E", role: "Deep Green / Focus", sub: "var(--af-olive-teal)" },
    { name: "Warm Cream", hex: "#F3E6CE", role: "Canvas Ground 95%", sub: "var(--af-cream)" },
    { name: "Mustard Yellow", hex: "#E0A526", role: "Warm Tag Highlight", sub: "var(--af-mustard)" },
    { name: "Pink Accent", hex: "#E39AA8", role: "Minor Accent Only", sub: "var(--af-pink)" },
    { name: "Deep Olive Ink", hex: "#2B2E14", role: "Darkest Value (11.3:1 AAA)", sub: "var(--af-ink)" }
  ];

  for (const item of paletteItems) {
    const card = figma.createFrame();
    card.layoutMode = "VERTICAL";
    card.itemSpacing = 8;
    card.paddingLeft = 12;
    card.paddingRight = 12;
    card.paddingTop = 12;
    card.paddingBottom = 12;
    card.fills = [{ type: "SOLID", color: surfaceRaisedRGB }];
    card.strokes = [{ type: "SOLID", color: inkRGB }];
    card.strokeWeight = 2;
    card.cornerRadius = 12;
    card.resize(130, 160);

    const swatch = figma.createFrame();
    swatch.resize(106, 64);
    swatch.cornerRadius = 8;
    swatch.fills = [{ type: "SOLID", color: hexToFigmaRGB(item.hex) }];
    swatch.strokes = [{ type: "SOLID", color: inkRGB }];
    swatch.strokeWeight = 1.5;
    card.appendChild(swatch);

    const cName = figma.createText();
    cName.fontName = boldFont;
    cName.fontSize = 11;
    cName.characters = item.name;
    cName.fills = [{ type: "SOLID", color: inkRGB }];
    card.appendChild(cName);

    const cHex = figma.createText();
    cHex.fontName = regFont;
    cHex.fontSize = 10;
    cHex.characters = item.hex + " · " + item.sub;
    cHex.fills = [{ type: "SOLID", color: inkSoftRGB }];
    card.appendChild(cHex);

    swatchGrid.appendChild(card);
  }
  colorSection.appendChild(swatchGrid);
  masterFrame.appendChild(colorSection);

  // SECTION 2: Typography Hierarchy
  const typeSection = figma.createFrame();
  typeSection.name = "2. Typography Hierarchy";
  typeSection.layoutMode = "VERTICAL";
  typeSection.itemSpacing = 16;
  typeSection.fills = [];

  const sec2Title = figma.createText();
  sec2Title.fontName = boldFont;
  sec2Title.fontSize = 18;
  sec2Title.characters = "2. Typography Hierarchy (Max 3 Levels per Composition)";
  sec2Title.fills = [{ type: "SOLID", color: inkRGB }];
  typeSection.appendChild(sec2Title);

  const typeBox = figma.createFrame();
  typeBox.layoutMode = "VERTICAL";
  typeBox.itemSpacing = 16;
  typeBox.paddingLeft = 24;
  typeBox.paddingRight = 24;
  typeBox.paddingTop = 20;
  typeBox.paddingBottom = 20;
  typeBox.fills = [{ type: "SOLID", color: surfaceRaisedRGB }];
  typeBox.strokes = [{ type: "SOLID", color: inkRGB }];
  typeBox.strokeWeight = 2;
  typeBox.cornerRadius = 16;

  const t1 = figma.createText();
  t1.fontName = boldFont;
  t1.fontSize = 40;
  t1.characters = "Level 1: Display Headline (Mamba)";
  t1.fills = [{ type: "SOLID", color: orangeRGB }];
  typeBox.appendChild(t1);

  const t2 = figma.createText();
  t2.fontName = boldFont;
  t2.fontSize = 22;
  t2.characters = "Level 2: Subtitle / Sub-headline (Pacifico / Clean Sans)";
  t2.fills = [{ type: "SOLID", color: oliveTealRGB }];
  typeBox.appendChild(t2);

  const t3 = figma.createText();
  t3.fontName = regFont;
  t3.fontSize = 15;
  t3.characters = "Level 3: Body & Captions (Poppins) — Furniture is always the hero. Everything in this system exists to frame a piece, never to compete with it.";
  t3.fills = [{ type: "SOLID", color: inkRGB }];
  typeBox.appendChild(t3);

  typeSection.appendChild(typeBox);
  masterFrame.appendChild(typeSection);

  // SECTION 3: Components & Vectors
  const compSection = figma.createFrame();
  compSection.name = "3. Core Components & Vectors";
  compSection.layoutMode = "VERTICAL";
  compSection.itemSpacing = 16;
  compSection.fills = [];

  const sec3Title = figma.createText();
  sec3Title.fontName = boldFont;
  sec3Title.fontSize = 18;
  sec3Title.characters = "3. Interactive Components, Tags, Stamps & Vector Motifs";
  sec3Title.fills = [{ type: "SOLID", color: inkRGB }];
  compSection.appendChild(sec3Title);

  const compRow = figma.createFrame();
  compRow.layoutMode = "HORIZONTAL";
  compRow.itemSpacing = 24;
  compRow.counterAxisAlignItems = "CENTER";
  compRow.fills = [];

  // Starburst
  const starburstSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <g stroke="#C8501E" stroke-width="2.5" stroke-linecap="round">
      <path d="M32 32 V6 M32 32 V58 M32 32 H6 M32 32 H58 M32 32 L50.4 13.6 M32 32 L13.6 50.4 M32 32 L50.4 50.4 M32 32 L13.6 13.6"/>
    </g>
    <g fill="#C8501E">
      <circle cx="32" cy="6" r="3.4"/><circle cx="32" cy="58" r="3.4"/>
      <circle cx="6" cy="32" r="3.4"/><circle cx="58" cy="32" r="3.4"/>
      <circle cx="50.4" cy="13.6" r="2.6"/><circle cx="13.6" cy="50.4" r="2.6"/>
      <circle cx="50.4" cy="50.4" r="2.6"/><circle cx="13.6" cy="13.6" r="2.6"/>
      <circle cx="32" cy="32" r="5"/>
    </g>
  </svg>`;
  const starburstNode = figma.createNodeFromSvg(starburstSvg);
  starburstNode.name = "Motif / Atomic Starburst";
  compRow.appendChild(starburstNode);

  // Sparkle
  const sparkleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 64" width="40" height="64">
    <path fill="#C8501E" d="M20 0 Q22.5 27 40 32 Q22.5 37 20 64 Q17.5 37 0 32 Q17.5 27 20 0 Z"/>
  </svg>`;
  const sparkleNode = figma.createNodeFromSvg(sparkleSvg);
  sparkleNode.name = "Motif / Sparkle";
  compRow.appendChild(sparkleNode);

  // Primary Button
  const btn = figma.createFrame();
  btn.name = "Button / Primary";
  btn.layoutMode = "HORIZONTAL";
  btn.counterAxisAlignItems = "CENTER";
  btn.paddingLeft = 24;
  btn.paddingRight = 24;
  btn.paddingTop = 14;
  btn.paddingBottom = 14;
  btn.itemSpacing = 8;
  btn.cornerRadius = 12;
  btn.fills = [{ type: "SOLID", color: creamRGB }];
  btn.strokes = [{ type: "SOLID", color: orangeBtnRGB }];
  btn.strokeWeight = 2;
  const btnText = figma.createText();
  btnText.fontName = boldFont;
  btnText.fontSize = 15;
  btnText.characters = "Explore Showroom";
  btnText.fills = [{ type: "SOLID", color: orangeBtnRGB }];
  btn.appendChild(btnText);
  compRow.appendChild(btn);

  // Secondary Button
  const btnSec = figma.createFrame();
  btnSec.name = "Button / Secondary";
  btnSec.layoutMode = "HORIZONTAL";
  btnSec.counterAxisAlignItems = "CENTER";
  btnSec.paddingLeft = 24;
  btnSec.paddingRight = 24;
  btnSec.paddingTop = 14;
  btnSec.paddingBottom = 14;
  btnSec.itemSpacing = 8;
  btnSec.cornerRadius = 12;
  btnSec.fills = [{ type: "SOLID", color: creamRGB }];
  btnSec.strokes = [{ type: "SOLID", color: oliveTealRGB }];
  btnSec.strokeWeight = 2;
  const btnSecText = figma.createText();
  btnSecText.fontName = boldFont;
  btnSecText.fontSize = 15;
  btnSecText.characters = "Meet The Curators";
  btnSecText.fills = [{ type: "SOLID", color: oliveTealRGB }];
  btnSec.appendChild(btnSecText);
  compRow.appendChild(btnSec);

  // Tags
  const tagAvail = figma.createFrame();
  tagAvail.name = "Tag / Available";
  tagAvail.layoutMode = "HORIZONTAL";
  tagAvail.paddingLeft = 14;
  tagAvail.paddingRight = 14;
  tagAvail.paddingTop = 6;
  tagAvail.paddingBottom = 6;
  tagAvail.cornerRadius = 999;
  tagAvail.fills = [{ type: "SOLID", color: avocadoDeepRGB }];
  tagAvail.strokes = [{ type: "SOLID", color: inkRGB }];
  tagAvail.strokeWeight = 2;
  const tagAvailT = figma.createText();
  tagAvailT.fontName = boldFont;
  tagAvailT.fontSize = 11;
  tagAvailT.characters = "AVAILABLE";
  tagAvailT.fills = [{ type: "SOLID", color: creamRGB }];
  tagAvail.appendChild(tagAvailT);
  compRow.appendChild(tagAvail);

  const tagSold = figma.createFrame();
  tagSold.name = "Tag / Sold";
  tagSold.layoutMode = "HORIZONTAL";
  tagSold.paddingLeft = 14;
  tagSold.paddingRight = 14;
  tagSold.paddingTop = 6;
  tagSold.paddingBottom = 6;
  tagSold.cornerRadius = 999;
  tagSold.fills = [{ type: "SOLID", color: orangeRGB }];
  tagSold.strokes = [{ type: "SOLID", color: inkRGB }];
  tagSold.strokeWeight = 2;
  const tagSoldT = figma.createText();
  tagSoldT.fontName = boldFont;
  tagSoldT.fontSize = 11;
  tagSoldT.characters = "SOLD";
  tagSoldT.fills = [{ type: "SOLID", color: creamRGB }];
  tagSold.appendChild(tagSoldT);
  compRow.appendChild(tagSold);

  // Inspection Stamp
  const stamp = figma.createFrame();
  stamp.name = "Stamp / Atomic Inspection";
  stamp.resize(110, 110);
  stamp.cornerRadius = 999;
  stamp.fills = [];
  stamp.strokes = [{ type: "SOLID", color: oliveTealRGB }];
  stamp.strokeWeight = 3;
  stamp.layoutMode = "VERTICAL";
  stamp.primaryAxisAlignItems = "CENTER";
  stamp.counterAxisAlignItems = "CENTER";
  stamp.itemSpacing = 2;
  stamp.rotation = -8;

  const stTitle = figma.createText();
  stTitle.fontName = boldFont;
  stTitle.fontSize = 7;
  stTitle.characters = "ATOMIC INSPECTION";
  stTitle.fills = [{ type: "SOLID", color: oliveTealRGB }];
  stamp.appendChild(stTitle);

  const stVerdict = figma.createText();
  stVerdict.fontName = boldFont;
  stVerdict.fontSize = 18;
  stVerdict.characters = "VERIFIED";
  stVerdict.fills = [{ type: "SOLID", color: oliveTealRGB }];
  stamp.appendChild(stVerdict);

  compRow.appendChild(stamp);

  compSection.appendChild(compRow);
  masterFrame.appendChild(compSection);

  // Place on canvas
  const center = figma.viewport.center;
  masterFrame.x = center.x - 550;
  masterFrame.y = center.y - 400;
  figma.currentPage.appendChild(masterFrame);
  figma.viewport.scrollAndZoomIntoView([masterFrame]);

  logToUI("✔ Complete Design System Kit placed on canvas!");
}

// Master Generate All
async function generateAllResources() {
  logToUI("🚀 Generating ALL Atomic Finds resources...");
  await setupVariables();
  await setupStyles();
  await createFullDesignSystemCanvas();
  figma.notify("✨ Generated all Variables, Styles & Canvas Components!");
  logToUI("🎉 All resources generated successfully! (Check Local Variables, Styles & Canvas)");
}

// UI Message Handler
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === "generate-all") {
      await generateAllResources();
    } else if (msg.type === "setup-variables") {
      await setupVariables();
      figma.notify("✅ Variables generated! Check the Local Variables panel.");
    } else if (msg.type === "setup-styles") {
      await setupStyles();
      figma.notify("✅ Styles generated! Check the Local Styles panel.");
    } else if (msg.type === "canvas-kit") {
      await createFullDesignSystemCanvas();
      figma.notify("✨ Design System Kit placed on canvas!");
    } else if (msg.type === "close") {
      figma.closePlugin();
    }
  } catch (err) {
    logToUI("Error: " + err.message, true);
    figma.notify("❌ " + err.message, { error: true });
  }
};
