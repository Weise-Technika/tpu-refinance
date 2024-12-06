import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// import cloudflare from '@astrojs/cloudflare';
import dotenv from 'dotenv';
import clearConsole from 'vite-plugin-clear-console';

dotenv.config();

export default defineConfig({
  integrations: [vue()],

  vite: {
    logLevel: 'silent',
    server: {
      plugins: [clearConsole()],
      watch: {
        usePolling: true
      },
    },
    envPrefix: 'PUBLIC_',
    define: {
      'process.env': process.env
    }
  },
  output: 'server',
  adapter: cloudflare({
    certificate: 'cert/certificate.pem',
    key: 'cert/private-key.pem'
  })
  
});
