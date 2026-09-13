#!/usr/bin/env node

/**
 * bin/cli.js — Atomic Finds ATX Design System CLI
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

function printHelp() {
  console.log(`
🪐 Atomic Finds ATX Design System CLI 🛸
"Tiny Time Machines for Your Home"

Commands:
  build                     Compile canonical tokens to all formats (CSS, SCSS, JS, TS, Figma)
  export-figma [outDir]     Export Figma tokens (Tokens Studio JSON & Variables JSON)
  sync-figma                Sync variables directly to a Figma file via REST API
  help                      Show this help message

Options:
  -v, --version             Show version number
  -h, --help                Show help

Examples:
  npx @atomicfindsatx/design-system build
  npx @atomicfindsatx/design-system export-figma ./my-tokens
  npx @atomicfindsatx/design-system sync-figma --token <FIGMA_TOKEN> --file <FILE_KEY>
`);
}

function printVersion() {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  console.log(`@atomicfindsatx/design-system v${pkg.version}`);
}

async function run() {
  switch (command) {
    case 'build':
      await import('../scripts/build-tokens.js');
      break;

    case 'export-figma':
      const outDir = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : path.resolve(process.cwd(), 'tokens');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      const srcTokensDir = path.resolve(__dirname, '..', 'tokens');
      ['figma-tokens.json', 'figma-variables.json', 'tokens.json'].forEach(file => {
        const srcFile = path.join(srcTokensDir, file);
        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, path.join(outDir, file));
          console.log(`✔ Exported ${file} -> ${path.relative(process.cwd(), path.join(outDir, file))}`);
        }
      });
      console.log(`✨ Successfully exported Figma token files to ${outDir}`);
      break;

    case 'sync-figma':
      await import('../scripts/sync-figma.js');
      break;

    case '-v':
    case '--version':
    case 'version':
      printVersion();
      break;

    case '-h':
    case '--help':
    case 'help':
    default:
      printHelp();
      break;
  }
}

run();
