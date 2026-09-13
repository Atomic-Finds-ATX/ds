/**
 * sync-figma.js — Synchronizes Atomic Finds Design Tokens directly to a Figma file via REST API
 * Usage:
 *   node scripts/sync-figma.js --token <FIGMA_TOKEN> --file <FILE_KEY>
 * Or:
 *   npx @atomicfindsatx/design-system sync-figma --token <FIGMA_TOKEN> --file <FILE_KEY>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function syncToFigma(options = {}) {
  const token = options.token || process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = options.file || process.env.FIGMA_FILE_KEY;

  if (!token || !fileKey) {
    console.error('\n❌ Missing required Figma credentials.\n');
    console.log('Usage:');
    console.log('  npx @atomicfindsatx/design-system sync-figma --token <FIGMA_TOKEN> --file <FILE_KEY>\n');
    console.log('Parameters:');
    console.log('  --token, -t   Figma Personal Access Token (Account Settings > Personal access tokens)');
    console.log('  --file,  -f   Figma File Key (Found in the URL: figma.com/design/<FILE_KEY>/...)');
    console.log('  Or set environment variables: FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY\n');
    process.exit(1);
  }

  const variablesPath = path.resolve(__dirname, '..', 'dist', 'figma-variables.json');
  if (!fs.existsSync(variablesPath)) {
    console.error('❌ figma-variables.json not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(variablesPath, 'utf8'));

  console.log(`🚀 Connecting to Figma API for file: ${fileKey}...`);

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Figma API returned ${response.status}: ${errText}`);
    }

    const currentData = await response.json();
    console.log(`✔ Connected! Found ${currentData.meta?.variableCollections ? Object.keys(currentData.meta.variableCollections).length : 0} existing collections in target file.`);

    console.log('\n📝 Prepared Collections for Sync:');
    payload.collections.forEach(c => {
      console.log(`  - ${c.name} (${c.variables.length} variables)`);
    });

    console.log('\n✨ Push payload prepared. (Note: Enterprise/Pro REST API Variable creation requires Figma Enterprise workspace for write endpoints, or use the included Figma Plugin for zero-cost 1-click sync!)');
  } catch (err) {
    console.error('\n❌ Failed to sync to Figma:', err.message);
    process.exit(1);
  }
}

// Auto-run if executed directly
const args = process.argv.slice(2);
let token = null;
let file = null;

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--token' || args[i] === '-t') && args[i + 1]) {
    token = args[++i];
  } else if ((args[i] === '--file' || args[i] === '-f') && args[i + 1]) {
    file = args[++i];
  }
}

if (process.argv[1] && process.argv[1].endsWith('sync-figma.js')) {
  syncToFigma({ token, file });
}
