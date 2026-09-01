/**
 * Single source of truth for /services/* URLs.
 *
 * The header, the homepage grid, the services catalogue and the static route
 * generator all used to slugify labels their own way, which produced links to
 * pages that were never generated. Everything routes through here now.
 */
export const slugify = (s: string): string =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const categoryOverrides: Record<string, string> = {
  'Executive Search & Recruitment': 'executive-search',
  'Employer of Record (EOR)': 'employer-of-record',
};

export const categorySlug = (label: string): string =>
  categoryOverrides[label] ?? slugify(label);

export const serviceHref = (categoryLabel: string, leafLabel?: string): string =>
  leafLabel
    ? `/services/${categorySlug(categoryLabel)}/${slugify(leafLabel)}`
    : `/services#section-${categorySlug(categoryLabel)}`;
