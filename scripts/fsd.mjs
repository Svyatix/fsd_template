#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const TYPES = ['feature', 'entity', 'page', 'widget']

const [,, typeArg, nameArg] = process.argv
if (!typeArg || !nameArg || !TYPES.includes(typeArg)) {
  console.log('Usage: npm run fsd:gen -- <type> <name>')
  console.log('Types:', TYPES.join(', '))
  process.exit(1)
}

const layerMap = { feature: 'features', entity: 'entities', page: 'pages', widget: 'widgets' }
const layer = layerMap[typeArg]
const base = path.join(root, 'src', layer, nameArg)

ensureDir(base)
const C = pascal(nameArg)
const files = {
  'index.ts': `export * from './ui';\nexport * as model from './model';\n`,
  'model/index.ts': `// Public API of ${typeArg} ${nameArg}\n`,
  'model/types.ts': `export type ${C}Id = string;\n`,
  'ui/index.ts': `export * from './${C}.tsx'\n`,
  'ui/'+C+'.tsx': `import React from 'react'\nimport styled from 'styled-components'\nconst Box = styled.div\`padding:12px;border:1px solid #e5e7eb;border-radius:12px\`\nexport const ${C}: React.FC = () => <Box>${C} (${typeArg})</Box>\n`
}

for (const [rel, content] of Object.entries(files)) {
  const dest = path.join(base, rel)
  ensureDir(path.dirname(dest))
  if (!fs.existsSync(dest)) {
    fs.writeFileSync(dest, content)
    console.log('created', path.relative(root, dest))
  } else {
    console.log('exists ', path.relative(root, dest))
  }
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }) }
function pascal(str) { return str.split(/[-_\s]+/).map(s => s.charAt(0).toUpperCase()+s.slice(1)).join('') }