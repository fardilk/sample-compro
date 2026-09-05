/**
 * Ranks every service page by how finished it is, against one definition:
 *
 *   1. style locked   — the page renders the CMS template, not a repo variant.
 *   2. data solid     — real rows in the database, reachable through the API,
 *                       with no editor placeholders left in the copy.
 *   3. signed off     — a human said so. Nothing here can measure that, so it
 *                       is tracked by hand in SIGNED_OFF below.
 *
 * The point is that "belum selesai" is a measured fact with a reason attached,
 * not a memory. Run it before deciding what to work on next:
 *
 *   npx tsx src/utils/serviceReadiness.ts
 */
import { serviceRoutes } from '../data/serviceRoutes';
import { trainingPrograms } from '../data/trainingPrograms';

const API = process.env.CMS_API_URL ?? 'https://excellenceplus.id/admin-api';

/** Pages the user has explicitly called complete. Nothing else may claim it. */
const SIGNED_OFF: string[] = [];

type Group =
  | 'highlights'
  | 'steps'
  | 'outcomes'
  | 'metrics'
  | 'faqs'
  | 'plans'
  | 'proofs'
  | 'schedules';

const GROUPS: Group[] = [
  'highlights',
  'steps',
  'outcomes',
  'metrics',
  'faqs',
  'plans',
  'proofs',
  'schedules',
];

type CmsRow = Record<string, unknown>;
type CmsEntry = Record<Group, CmsRow[]> & {
  category: string;
  slug: string;
  title: string;
  published: boolean;
  intro: string;
  subtitle: string;
  hero_image: string;
  card_image: string;
  audience: string;
  rating_score: number;
  rating_count: number;
  sections: unknown[] | null;
};

/** An editor's note left in the copy, e.g. "[isi investasi]". */
const placeholdersIn = (entry: CmsEntry): string[] => {
  const found = new Set<string>();
  for (const match of JSON.stringify(entry).matchAll(/\[[^"\]{}]{3,60}\]/g)) {
    found.add(match[0]);
  }
  return [...found];
};

const futureSchedules = (entry: CmsEntry) =>
  entry.schedules.filter((s) => {
    const starts = s.starts_at as string | null;
    return starts && new Date(starts).getTime() > Date.now();
  }).length;

type Row = {
  path: string;
  title: string;
  renders: 'CMS' | 'repo: halaman sendiri' | 'repo: variant generik';
  score: number;
  filled: number;
  notes: string[];
};

/**
 * Score is only a sort key, not a grade. It counts the things that have to be
 * true before a page can be argued about at all: it renders the real template,
 * every group has rows, and nothing on it is a placeholder.
 */
async function main() {
  const res = await fetch(`${API}/api/services`);
  if (!res.ok) throw new Error(`CMS returned ${res.status}`);
  const services: CmsEntry[] = await res.json();
  const cms = new Map(services.map((s) => [`${s.category}/${s.slug}`, s]));

  // A CMS page the menu does not link to still exists on the site.
  const keys = new Set([
    ...serviceRoutes.map((r) => `${r.categorySlug}/${r.idSlug}`),
    ...services.map((s) => `${s.category}/${s.slug}`),
  ]);

  const rows: Row[] = [...keys].map((key) => {
    const route = serviceRoutes.find((r) => `${r.categorySlug}/${r.idSlug}` === key);
    const entry = cms.get(key);
    const written = trainingPrograms.find((p) => key === `training/${p.slug}`);
    const notes: string[] = [];

    // The site only switches to the CMS template once the entry has content;
    // an empty draft must not blank a page that already had some.
    const hasContent =
      !!entry &&
      (entry.highlights.length > 0 ||
        entry.steps.length > 0 ||
        entry.outcomes.length > 0 ||
        entry.faqs.length > 0 ||
        entry.plans.length > 0);

    const renders: Row['renders'] = hasContent
      ? 'CMS'
      : written
        ? 'repo: halaman sendiri'
        : 'repo: variant generik';

    let score = 0;
    let filled = 0;

    if (entry && !entry.published) notes.push('masih draft, tidak ikut build');

    if (hasContent) {
      score += 40;
      filled = GROUPS.filter((g) => entry![g].length > 0).length;
      score += filled * 5;

      const empty = GROUPS.filter((g) => entry![g].length === 0);
      if (empty.length) notes.push(`kosong: ${empty.join(', ')}`);

      const holes = placeholdersIn(entry!);
      if (holes.length) {
        score -= holes.length * 6;
        notes.push(`placeholder: ${holes.slice(0, 3).join(' ')}`);
      }

      if (entry!.proofs.length === 0) notes.push('tanpa testimoni');
      if (!(entry!.rating_score > 0 && entry!.rating_count > 0)) notes.push('tanpa rating');
      if (!entry!.audience?.trim()) notes.push('tanpa "cocok untuk"');
      if (!entry!.hero_image && !entry!.card_image) notes.push('tanpa gambar');
      if (!entry!.sections?.length) notes.push('susunan masih bawaan');
      if (entry!.schedules.length > 0 && futureSchedules(entry!) === 0) {
        notes.push('semua jadwal sudah lewat');
      }
    } else if (written) {
      score += 15;
      notes.push('konten asli di repo, belum masuk CMS');
    } else {
      notes.push('isi variant generik, bukan tulisan untuk layanan ini');
    }

    if (!route) notes.push('tidak ada di menu navigasi');
    if (SIGNED_OFF.includes(key)) score += 1000;

    return {
      path: `/services/${key}`,
      title: entry?.title ?? route?.title ?? key,
      renders,
      score,
      filled,
      notes,
    };
  });

  rows.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

  rows.forEach((row, i) => {
    const done = SIGNED_OFF.includes(row.path.replace('/services/', '')) ? ' ✔ COMPLETE' : '';
    console.log(
      `${String(i + 1).padStart(2)}. ${row.title.padEnd(34)} ${row.renders.padEnd(22)} ` +
        `grup ${row.filled}/8${done}`,
    );
    console.log(`    ${row.path}`);
    for (const note of row.notes) console.log(`      - ${note}`);
  });

  const byRender = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.renders] = (acc[r.renders] ?? 0) + 1;
    return acc;
  }, {});
  console.log(
    `\n${rows.length} halaman  |  ` +
      Object.entries(byRender)
        .map(([k, v]) => `${k}: ${v}`)
        .join('  |  ') +
      `  |  complete: ${SIGNED_OFF.length}`,
  );
}

void main();
