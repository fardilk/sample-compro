// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL drives canonical links, OG tags and the generated sitemap.
const site = process.env.SITE_URL ?? 'https://excellenceplus.id';

export default defineConfig({
  site,
  // Pages are prerendered unless they opt out with `prerender = false`. The ones
  // that read the CMS opt out, so a publish shows on the next request.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  // Emit /about-us.html rather than /about-us/index.html so nginx can serve
  // every internal link directly, with no trailing-slash redirect hop.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [react()],
  image: {
    // CMS uploads are served as-is from the API host. Optimising them meant
    // the build downloaded every image over the internet, and one dropped
    // connection from the CI runner failed the whole deploy.
    service: passthroughImageService(),
  },
  vite: { plugins: [tailwindcss()] },
});
