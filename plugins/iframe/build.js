// esbuild '
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/pdf_iframe.mjs'],
  bundle: true,          // includes dependencies
  outfile: 'dist/iframe.mjs',
  platform: 'node',
  format: 'esm',
}).catch(() => process.exit(1));