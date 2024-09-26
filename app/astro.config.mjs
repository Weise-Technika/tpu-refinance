import { defineConfig } from 'astro/config';
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@astrojs/vue';
import { readFileSync } from 'fs';
import { join } from 'path';

const certPath = join('cert/certificate.pem');
const keyPath = join('cert/private-key.pem');

export default defineConfig({
  integrations: [vue()],
  vite: {
    server: {
      https: {
        cert: readFileSync(certPath),
        key: readFileSync(keyPath)
      },
      port: 4321,
      strictPort: true
    },
    plugins: [basicSsl()]
  }
});