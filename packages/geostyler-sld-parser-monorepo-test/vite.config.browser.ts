import { defineConfig } from 'vite';

import { sharedBuildConfig } from '../../vite.config.shared.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    ...sharedBuildConfig,
    manifest: true,
    lib: {
      entry: './src/SldStyleParser.ts',
      name: 'GeoStylerSLDParser',
      formats: ['iife'],
      fileName: 'sldStyleParser',
    },
    rolldownOptions: {
      output: {
        exports: 'named',
      },
    },
  },
  define: {
    appName: 'GeoStyler'
  },
  server: {
    host: '0.0.0.0'
  }
});
