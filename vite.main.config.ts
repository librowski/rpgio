import { external, getBuildConfig, getBuildDefine, pluginHotRestart } from './vite.base.config';
import path from "node:path";

import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, mergeConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnvironment = env as ConfigEnv<'build'>;
  const { forgeConfigSelf } = forgeEnvironment;
  const define = getBuildDefine(forgeEnvironment);
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => '[name].js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external,
      },
    },
    define,
    plugins: [pluginHotRestart('restart')],
    resolve: {
      // Load the Node.js entry.
      mainFields: ['module', 'jsnext:main', 'jsnext'],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
  };

  return mergeConfig(getBuildConfig(forgeEnvironment), config);
});
