/**
 * Reports which pages are ready to show a customer and which are still
 * placeholder, so "not ready" is a measured fact rather than a memory.
 *
 * Run: npx tsx src/utils/contentAudit.ts
 */
import { serviceRoutes } from '../data/serviceRoutes';
import { trainingPrograms } from '../data/trainingPrograms';

const API = process.env.CMS_API_URL ?? 'https://excellenceplus.id/admin-api';

/** Wording that belongs to a cloud-migration deck, not to this business. */
// "pipeline" is deliberately absent: a sales pipeline is the right word in a
// sales programme, and matching on it flagged a page that was fine.
const FOREIGN = [
  'landing zone', 'migration wave', 'mttr', 'deployments/week', 'kubernetes',
  'ci/cd', 'devops', 'observability', 'sre', 'infra cost', 'uptime',
];

type Verdict = 'siap' | 'perlu ditinjau' | 'belum siap';

type Row = {
  path: string;
  title: string;
  source: string;
  verdict: Verdict;
  reason: string;
};

const contentOf = (slug: string): string => {
  const program = trainingPrograms.find((p) => p.slug === slug);
  return program ? JSON.stringify(program.content).toLowerCase() : '';
};

async function main() {
  const res = await fetch(`${API}/api/services?published=true`);
  const published: Array<{ category: string; slug: string; steps: unknown[]; highlights: unknown[] }> =
    res.ok ? await res.json() : [];
  const cms = new Map(published.map((s) => [`${s.category}/${s.slug}`, s]));

  const rows: Row[] = serviceRoutes.map((r) => {
    const key = `${r.categorySlug}/${r.idSlug}`;
    const entry = cms.get(key);

    if (entry) {
      const thin = entry.steps.length < 3 || entry.highlights.length < 3;
      return {
        path: `/services/${key}`,
        title: r.title,
        source: 'CMS',
        verdict: thin ? 'perlu ditinjau' : 'siap',
        reason: thin
          ? 'isi CMS masih tipis'
          : 'dari CMS, angka dan testimoni masih placeholder bertanda kurung siku',
      };
    }

    const body = contentOf(r.idSlug);
    if (!body) {
      return {
        path: `/services/${key}`,
        title: r.title,
        source: 'repo',
        verdict: 'belum siap',
        reason: 'memakai konten variant generik, bukan tulisan untuk layanan ini',
      };
    }

    const hit = FOREIGN.find((term) => body.includes(term));
    return {
      path: `/services/${key}`,
      title: r.title,
      source: 'repo',
      verdict: hit ? 'belum siap' : 'perlu ditinjau',
      reason: hit
        ? `copy dari domain lain, mengandung "${hit}"`
        : 'konten asli tapi belum lewat CMS dan belum punya bukti',
    };
  });

  const order: Record<Verdict, number> = { 'belum siap': 0, 'perlu ditinjau': 1, siap: 2 };
  rows.sort((a, b) => order[a.verdict] - order[b.verdict] || a.path.localeCompare(b.path));

  for (const row of rows) {
    console.log(`${row.verdict.padEnd(14)} ${row.source.padEnd(5)} ${row.path.padEnd(50)} ${row.reason}`);
  }

  const tally = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.verdict] = (acc[r.verdict] ?? 0) + 1;
    return acc;
  }, {});
  console.log('\n' + Object.entries(tally).map(([k, v]) => `${k}: ${v}`).join('  |  '));
}

void main();
