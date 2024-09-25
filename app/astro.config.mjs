import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [vue()],
  vite: {
    server: {
      watch: {
        usePolling: true
      },
    },
  }
});