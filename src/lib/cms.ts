/**
 * Build-time reads from the CMS.
 *
 * Everything here runs during `astro build` and never in the browser, so the
 * published site holds a snapshot: the CMS can be down without the site being
 * down. The trade is that content only changes when a build runs.
 */

const API = import.meta.env.CMS_API_URL ?? 'https://excellenceplus.id/admin-api';

export type CmsRow = { id: number; position: number };
export type CmsHighlight = CmsRow & { icon: string; title: string; body: string };
export type CmsStep = CmsRow & { title: string; body: string; meta: string };
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
  highlights: CmsHighlight[];
  steps: CmsStep[];
  outcomes: CmsOutcome[];
  metrics: CmsMetric[];
  faqs: CmsFaq[];
  plans: CmsPlan[];
  proofs: CmsProof[];
  schedules: CmsSchedule[];
};

/**
 * A build that cannot reach the CMS must fail rather than quietly publish a
 * site with the content missing. The deploy pulls before it swaps containers,
 * so a failed build leaves the previous site serving.
 */
async function get<T>(path: string): Promise<T> {
  const url = `${API}${path}`;
  let res: Response;
  try {
    res = await fetch(url);
  } catch (cause) {
    throw new Error(`CMS unreachable at ${url}. Refusing to build without content.`, { cause });
  }
  if (!res.ok) {
    throw new Error(`CMS returned ${res.status} for ${url}. Refusing to build without content.`);
  }
  return (await res.json()) as T;
}

let servicesCache: Promise<CmsService[]> | null = null;

/** Published service pages, keyed by "category/slug" at the call site. */
export function getServices(): Promise<CmsService[]> {
  // Several pages ask for this during one build; fetch it once.
  servicesCache ??= get<CmsService[]>('/api/services?published=true');
  return servicesCache;
}

/** Absolute URL for an image stored by the CMS, for Astro to download. */
export function mediaURL(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API}${path.startsWith('/') ? '' : '/'}${path}`;
}

export const hasContent = (s: CmsService): boolean =>
  s.highlights.length > 0 ||
  s.steps.length > 0 ||
  s.outcomes.length > 0 ||
  s.faqs.length > 0 ||
  s.plans.length > 0;
