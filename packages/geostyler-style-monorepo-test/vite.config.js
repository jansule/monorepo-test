import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import {
  sharedBuildConfig,
  sharedPreserveModulesOutput,
} from '../../vite.config.shared.mjs';
import pkg from './package.json';

const externalDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      entryRoot: 'src',
      compilerOptions: {
        declarationDir: 'dist'
      },
    }),
  ],
  build: {
    ...sharedBuildConfig,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        ...sharedPreserveModulesOutput,
      },
      external: (id) => {
        return externalDeps.some(
          dep => id === dep || id.startsWith(`${dep}/`)
        );
      }
    },
  },
});
