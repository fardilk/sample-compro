# excellenceplusweb

Marketing site for Excellence Plus Indonesia. Astro (static output) with React
islands, Tailwind CSS v4, served by nginx in a container.

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:4321 |
| `npm run build` | Type-check (`astro check`) then build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check only |

## Layout

```
src/
  pages/          file-based routes (.astro)
  layouts/        BaseLayout.astro — head, SEO tags, JSON-LD, header/footer
  sections/       page-sized React blocks rendered at build time (no JS shipped)
  components/     reusable React components; only some are hydrated
  data/           route tables and content collections
  utils/          hoverMenu.ts (navigation tree), serviceLinks.ts (URL helpers)
```

Pages render to static HTML. React ships to the browser only where a component
is marked `client:*` in a page: the header menu, the event countdown, the
contact form, the blog slider, the team/history carousels, and the service
variant blocks (tabs and accordions).

`src/utils/serviceLinks.ts` is the single source of truth for `/services/*`
URLs. The header, the homepage grid, the catalogue and the static route
generator all call it — change slugs there, not in the call sites.

## Configuration

`SITE_URL` (build time) sets canonical links, OG tags and the sitemap. It
defaults to `https://excellenceplus.id`; `.env.production` carries
`VITE_SITE_URL` for compatibility with the previous build.

## Deploy

`Dockerfile` builds the site and serves `dist/` with nginx using `nginx.conf`,
which supplies the SPA-style fallback, gzip and cache headers. GitHub Actions
publishes to GHCR and redeploys the VPS: `dev` branch to port 8080,
`main` branch to port 8081.
