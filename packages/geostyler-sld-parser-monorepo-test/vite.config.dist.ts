import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

import {
  sharedBuildConfig,
  sharedPreserveModulesOutput,
} from '../../vite.config.shared.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    ...sharedBuildConfig,
    lib: {
      entry: fileURLToPath(new URL('./src/SldStyleParser.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'SldStyleParser',
    },
    rolldownOptions: {
      external: ['geostyler-style-monorepo-test', 'fast-xml-parser'],
      output: {
        ...sharedPreserveModulesOutput,
        externalLiveBindings: false,
      },
    },
    emptyOutDir: false,
  },
});
