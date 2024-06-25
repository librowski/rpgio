import { external, getBuildConfig, pluginHotRestart } from './vite.base.config';

import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, mergeConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnvironment = env as ConfigEnv<'build'>;
  const { forgeConfigSelf } = forgeEnvironment;
  const config: UserConfig = {
    build: {
      rollupOptions: {
        external,
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: forgeConfigSelf.entry!,
        output: {
          assetFileNames: '[name].[ext]',
          
          chunkFileNames: '[name].js',
          
entryFileNames: '[name].js',
          
format: 'cjs',
          // It should not be split chunks.
inlineDynamicImports: true,
        },
      },
    },
    plugins: [pluginHotRestart('reload')],
  };

  return mergeConfig(getBuildConfig(forgeEnvironment), config);
});
