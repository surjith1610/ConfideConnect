import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate', 
      injectRegister: 'auto',
      strategies: 'generateSW',
      devOptions : {
        enabled: true
      },
      manifest: ({
        "name": "ConfideConnect",
        "short_name": "ConfideCon",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#000",
        "description": "A platform for patients to connect with doctors",
        "theme_color": "#000000",
        "icons": [
          {
            "src": "public/images/pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "public/images/maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
        }),
        // workbox : {
        //   runtimeCaching: [
        //     {
        //       urlPattern: ({ url }) => {
        //       return url.pathname.includes('confideconnect')
        //       },
        //       handler: 'CacheFirst',
        //       method: 'GET',
        //       options: {
        //       cacheName: 'static-assets',
        //       expiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 60 * 60 * 24
        //       },
        //       cacheableResponse: {
        //       statuses: [0, 200]
              // }
              // }
              // }
          // ]
        // }



     }) // it will automatically update when there is a new version; "propmt" it will give a prompt in the UI to update to the new version

  ],
  
})