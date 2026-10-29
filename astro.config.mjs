// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL drives canonical links, OG tags and the generated sitemap.
const site = process.env.SITE_URL ?? 'https://excellenceplus.id';

export default defineConfig({
  site,
  output: 'static',
  // Emit /about-us.html rather than /about-us/index.html so nginx can serve
  // every internal link directly, with no trailing-slash redirect hop.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [react(), sitemap()],
  image: {
    // CMS uploads are served as-is from the API host. Optimising them meant
    // the build downloaded every image over the internet, and one dropped
    // connection from the CI runner failed the whole deploy.
    service: passthroughImageService(),
  },
  vite: { plugins: [tailwindcss()] },
});
