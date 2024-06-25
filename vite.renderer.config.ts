import { pluginExposeRenderer } from './vite.base.config';
import path from "node:path";

import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnvironment = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnvironment;
  const name = forgeConfigSelf.name ?? '';

  return {
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    clearScreen: false,
    mode,
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
    root,
  } as UserConfig;
});
