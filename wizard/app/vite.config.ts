import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid'; // Changed from React to Solid
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig({
  // Use solidPlugin() here
  plugins: [solidPlugin(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      // Ensure this points to your index file (usually src/index.tsx or src/main.tsx)
      entry: resolve(__dirname, 'src/index.tsx'), 
      name: 'WizardApp',
      formats: ['iife'], 
      fileName: () => 'wizard-bundle.js',
    },
    // SolidJS works best when targeting modern browsers
    target: 'esnext', 
    outDir: 'dist',
    emptyOutDir: true,
  },
});