/**
 * Reads from the CMS, made per request and cached briefly.
 *
 * A publish or unpublish in the panel shows within CACHE_MS. If the CMS is down
 * the last good copy keeps serving, so the site outlives the panel.
 */

const API = process.env.CMS_API_URL ?? import.meta.env.CMS_API_URL ?? 'https://excellenceplus.id/admin-api';
const CACHE_MS = 15_000;

export type CmsRow = { id: number; position: number };
export type CmsHighlight = CmsRow & { icon: string; title: string; body: string };
export type CmsStep = CmsRow & { title: string; body: string; meta: string };
export type CmsReason = CmsRow & {
  icon: string;
  stat: string;
  title: string;
  body: string;
  source: string;
  link_href: string;
  link_text: string;
};
export type CmsOutcome = CmsRow & { icon: string; text: string };
export type CmsMetric = CmsRow & { label: string; value: string };
export type CmsFaq = CmsRow & { question: string; answer: string };
export type CmsPlan = CmsRow & {
  name: string;
  price: string;
  note: string;
  highlighted: boolean;
  features: string[] | null;
};
export type CmsProof = CmsRow & {
  kind: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  result: string;
  image: string;
};
export type CmsSchedule = CmsRow & {
  starts_at: string | null;
  ends_at: string | null;
  city: string;
  format: string;
  seats_total: number;
  seats_left: number;
  price: string;
  register_url: string;
};

/** One band on a service page, as arranged in the CMS. */
export type CmsSection = {
  key: string;
  title: string;
  subtitle: string;
  tone: 'auto' | 'white' | 'muted' | 'dark' | string;
  enabled: boolean;
};

export type CmsService = {
  id: number;
  slug: string;
  category: string;
  category_label: string;
  template: 'program' | 'engagement' | 'retainer' | string;
  title: string;
  subtitle: string;
  published: boolean;
  sort_order: number;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image: string;
  hero_eyebrow: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_image: string;
  primary_cta_text: string;
  primary_cta_href: string;
  secondary_cta_text: string;
  secondary_cta_href: string;
  intro: string;
  /** Null or empty means the template's own default arrangement. */
  sections: CmsSection[] | null;
  audience: string;
  card_image: string;
  rating_score: number;
  rating_count: number;
  cta_title: string;
  cta_subtitle: string;
  highlights: CmsHighlight[];
  reasons: CmsReason[];
  steps: CmsStep[];
  outcomes: CmsOutcome[];
  metrics: CmsMetric[];
  faqs: CmsFaq[];
  plans: CmsPlan[];
  proofs: CmsProof[];
  schedules: CmsSchedule[];
};

const cache = new Map<string, { at: number; value: unknown }>();
const inflight = new Map<string, Promise<unknown>>();

async function fetchJSON<T>(url: string): Promise<T> {
  let failure: unknown;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) return (await res.json()) as T;
      failure = new Error(`CMS returned ${res.status} for ${url}`);
    } catch (cause) {
      failure = cause;
    }
  }
  throw failure;
}

async function get<T>(path: string): Promise<T> {
  const hit = cache.get(path);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value as T;
  // Concurrent requests share one upstream call.
  let pending = inflight.get(path) as Promise<T> | undefined;
  if (!pending) {
    pending = fetchJSON<T>(`${API}${path}`)
      .then((value) => {
        cache.set(path, { at: Date.now(), value });
        return value;
      })
      .finally(() => inflight.delete(path));
    inflight.set(path, pending);
  }
  try {
    return await pending;
  } catch (err) {
    if (hit) return hit.value as T; // stale beats down
    throw err;
  }
}

/** Published service pages, keyed by "category/slug" at the call site. */
export function getServices(): Promise<CmsService[]> {
  return get<CmsService[]>('/api/services?published=true');
}

/** Absolute URL for an image stored by the CMS, for Astro to download. */
export function mediaURL(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  // Art shipped with the site rather than uploaded to the CMS. Prefixing the
  // API base turns these into 404s, so leave them pointing at public/.
  if (path.startsWith('/img/')) return path;
  return `${API}${path.startsWith('/') ? '' : '/'}${path}`;
}

export const hasContent = (s: CmsService): boolean =>
  s.highlights.length > 0 ||
  s.steps.length > 0 ||
  s.outcomes.length > 0 ||
  s.faqs.length > 0 ||
  s.plans.length > 0;

export type CmsArticleBlock = {
  type: string;
  data: {
    text?: string;
    level?: 2 | 3;
    icon?: string;
    language?: string;
    url?: string;
    caption?: string;
    alt?: string;
  };
};

export type CmsArticle = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  featured_image: string;
  alt_text: string;
  reading_time: number;
  is_featured: boolean;
  published_at: string | null;
  content: { blocks?: CmsArticleBlock[] } | null;
  categories: Array<{ id: number; name: string; slug: string }> | null;
  tags: Array<{ id: number; name: string; slug: string }> | null;
};

/** Published articles, newest first. Drafts never reach the build. */
export function getArticles(): Promise<CmsArticle[]> {
  return get<CmsArticle[]>('/api/articles?published=true');
}

export const articleBlocks = (a: CmsArticle): CmsArticleBlock[] =>
  Array.isArray(a.content?.blocks) ? a.content!.blocks! : [];
