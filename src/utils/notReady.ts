/**
 * Prints what each not-ready service page currently shows a visitor, so a brief
 * can be written against the real thing rather than against a page name.
 *
 * Run: npx tsx src/utils/notReady.ts
 */
import v1 from '../components/services/variants/content/variant1';
import v2 from '../components/services/variants/content/variant2';
import v3 from '../components/services/variants/content/variant3';
import v4 from '../components/services/variants/content/variant4';
import v5 from '../components/services/variants/content/variant5';
import v6 from '../components/services/variants/content/variant6';
import v7 from '../components/services/variants/content/variant7';
import v8 from '../components/services/variants/content/variant8';
import v9 from '../components/services/variants/content/variant9';
import sales from '../components/services/variants/content/training/sales';
import type { VariantContent } from '../components/services/types';

/** Mirrors the picker in ServiceDetail.tsx, which decides what each page shows. */
const PAGES: Array<{ path: string; label: string; variant: string; content: VariantContent }> = [
  { path: '/services/coaching/executive-coaching', label: 'Executive Coaching', variant: 'variant7', content: v7 },
  { path: '/services/coaching/team-coaching', label: 'Team Coaching', variant: 'variant2', content: v2 },
  { path: '/services/consultancy/hr-system', label: 'HR System', variant: 'variant4', content: v4 },
  { path: '/services/consultancy/restaurant-and-caf', label: 'Restaurant & Café', variant: 'variant5', content: v5 },
  { path: '/services/consultancy/digital-enablement', label: 'Digital Enablement', variant: 'variant6', content: v6 },
  { path: '/services/consultancy/technology-solutions', label: 'Technology Solutions', variant: 'variant9', content: v9 },
  { path: '/services/executive-search/senior-positions', label: 'Senior Positions', variant: 'variant8', content: v8 },
  { path: '/services/employer-of-record/global-expansion', label: 'Global Expansion', variant: 'variant2', content: v2 },
  { path: '/services/employer-of-record/entity-management', label: 'Entity Management', variant: 'variant4', content: v4 },
  { path: '/services/training/sales', label: 'Sales', variant: 'sales.ts', content: sales },
];

const text = (v: unknown): string => (typeof v === 'string' ? v : '[bukan teks]');

const summarise = (c: VariantContent) => ({
  headline: c.hero?.title ?? '(tanpa judul)',
  sub: c.hero?.subtitle ?? '',
  features: (c.features?.items ?? []).slice(0, 3).map((f) => f.title),
  metrics: (c.metrics?.items ?? []).slice(0, 4).map((m) => `${m.value} ${m.label}`),
  faq: (c.faq?.items ?? []).slice(0, 2).map((q) => q.q),
});

// Two variants are each used by two different services, so those pages are
// byte-identical to one another on the public site.
const reuse = new Map<string, string[]>();
for (const p of PAGES) {
  reuse.set(p.variant, [...(reuse.get(p.variant) ?? []), p.label]);
}

for (const page of PAGES) {
  const s = summarise(page.content);
  const shared = (reuse.get(page.variant) ?? []).filter((l) => l !== page.label);

  console.log('─'.repeat(78));
  console.log(`${page.label}   ${page.path}`);
  console.log(`sumber   : ${page.variant}${shared.length ? `  (dipakai juga oleh: ${shared.join(', ')})` : ''}`);
  console.log(`judul    : ${s.headline}`);
  if (s.sub) console.log(`subjudul : ${text(s.sub)}`);
  if (s.features.length) console.log(`bagian   : ${s.features.map(text).join(' | ')}`);
  if (s.metrics.length) console.log(`angka    : ${s.metrics.join(' · ')}`);
  if (s.faq.length) console.log(`faq      : ${s.faq.map(text).join(' | ')}`);
}

console.log('─'.repeat(78));
console.log(`\n${PAGES.length} halaman. Variant kosong tak terpakai: v1=${!!v1} v3=${!!v3}`);
