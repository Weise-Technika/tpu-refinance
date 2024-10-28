import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [vue()],

  vite: {
    server: {
      watch: {
        usePolling: true
      },
    },
  },
  base: '/app/',

  output: 'server',
  adapter: cloudflare({
    certificate: 'cert/certificate.pem',
    key: 'cert/private-key.pem'
  })
});