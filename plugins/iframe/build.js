// esbuild '
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/pdf_iframe.mjs'],
  bundle: true,          
  outfile: 'dist/iframe.mjs',
  platform: 'node',
  format: 'esm',          // pure ESM output
  external: ['fs', 'fs/promises', 'os'] // <— do NOT bundle these

}).catch(() => process.exit(1));