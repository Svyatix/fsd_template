#!/usr/bin/env node
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ----- paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// ----- args & validation
const TYPES = new Set(['feature', 'entity', 'page', 'widget']);
const [, , typeArg, nameArg] = process.argv;

if (!typeArg || !nameArg || !TYPES.has(typeArg)) {
  console.log('Usage: npm run fsd:gen -- <type> <name>');
  console.log('Types: feature, entity, page, widget');
  process.exit(1);
}

const layerMap = {
  feature: 'features',
  entity: 'entities',
  page: 'pages',
  widget: 'widgets',
};

// поддержка вложенных путей в имени (например, "auth/login")
const layerDir = layerMap[typeArg];
const base = path.join(root, 'src', layerDir, nameArg);

// имя компонента берём из последнего сегмента пути
const componentName = toPascalCase(path.basename(nameArg));

// ----- templates
const files = {
  'index.ts': `export * from './ui';\nexport * as model from './model';\n`,
  'model/index.ts': `// Public API of ${typeArg} ${nameArg}\n`,
  'model/types.ts': `export type ${componentName}Id = string;\n`,
  'ui/index.ts': `export * from './${componentName}.tsx'\n`,
  [`ui/${componentName}.tsx`]: `import React from 'react'\nimport styled from 'styled-components'\n\nconst Box = styled.div\`padding:12px;border:1px solid #e5e7eb;border-radius:12px\`\n\nexport const ${componentName}: React.FC = () => <Box>${componentName} (${typeArg})</Box>\n`,
};

// ----- write files
ensureDir(base);
for (const [rel, content] of Object.entries(files)) {
  const dest = path.join(base, rel);
  ensureDir(path.dirname(dest));
  if (!existsSync(dest)) {
    writeFileSync(dest, content);
    console.log('created', path.relative(root, dest));
  } else {
    console.log('exists ', path.relative(root, dest));
  }
}

// ----- helpers
function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function toPascalCase(s) {
  return s
      .split(/[\\/._-]+/) // делим по / \ . _ -
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join('');
}
