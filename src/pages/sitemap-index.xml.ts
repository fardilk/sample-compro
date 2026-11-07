import type { APIRoute } from 'astro';

import { getArticles, getServices } from '../lib/cms';

export const prerender = false;

// ponytail: static pages are listed by hand; add one here when a page is added.
const STATIC = ['/', '/about-us', '/services', '/blog', '/schedule', '/registration', '/book-consultation', '/reserve-program', '/home/contact', '/workshop-kelola-produk-dengan-ai'];

export const GET: APIRoute = async ({ site }) => {
  const [services, articles] = await Promise.all([getServices(), getArticles()]);
  const paths = [
    ...STATIC,
    ...services.map((s) => `/services/${s.category}/${s.slug}`),
    ...articles.filter((a) => a.slug).map((a) => `/blog/${a.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`)
    .join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
