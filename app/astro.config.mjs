// import { defineConfig } from 'astro/config';
// import vue from '@astrojs/vue';

// import cloudflare from '@astrojs/cloudflare';
// import dotenv from 'dotenv';
// import clearConsole from 'vite-plugin-clear-console';

// dotenv.config();

// export default defineConfig({
//   integrations: [vue()],

//   vite: {
//     logLevel: 'silent',
//     server: {
//       plugins: [clearConsole()],
//       watch: {
//         usePolling: true
//       },
//     },
//     envPrefix: 'PUBLIC_',
//     define: {
//       'process.env': process.env
//     }
//   },
//   output: 'server',
//   adapter: cloudflare({
//     certificate: 'cert/certificate.pem',
//     key: 'cert/private-key.pem'
//   })
// });

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

  output: 'server',
  adapter: cloudflare({
    // Add your Cloudflare configuration here
    // For example, if you need to specify a certificate:
    certificate: 'cert/certificate.pem',
    key: 'cert/private-key.pem'
  })
});
