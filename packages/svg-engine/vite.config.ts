import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    watch: false,
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'istanbul',
      include: ['src/**/*'],
    },
    typecheck: {
      enabled: true,
    },
    restoreMocks: true,
  },
  plugins: [react()],
});
