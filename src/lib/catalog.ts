import { programCatalog, type CatalogCategory, type CatalogItem } from '../data/programCatalog';
import { getServices, type CmsService } from './cms';

/**
 * The programme picker both forms render, built once at build time.
 *
 * The navigation tree decides what exists and who each programme is for; the
 * CMS refines the description and supplies the open batches. A programme that
 * only exists in the CMS is appended rather than dropped, so the picker cannot
 * be narrower than the site.
 */

const dateRange = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

const dayOnly = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Asia/Jakarta',
});

const span = (startsAt: string, endsAt?: string | null) => {
  if (!endsAt || new Date(endsAt).toDateString() === new Date(startsAt).toDateString()) {
    return dateRange.format(new Date(startsAt));
  }
  return `${dayOnly.format(new Date(startsAt))} – ${dateRange.format(new Date(endsAt))}`;
};

/** Batches that have not started yet, soonest first, as one line each. */
const openBatches = (service: CmsService | undefined): string[] => {
  if (!service) return [];
  return service.schedules
    .filter((s) => s.starts_at && new Date(s.starts_at).getTime() > Date.now())
    .sort((a, b) => new Date(a.starts_at!).getTime() - new Date(b.starts_at!).getTime())
    .map((s) => [span(s.starts_at!, s.ends_at), s.city, s.format].filter(Boolean).join(' · '));
};

export async function buildCatalog(): Promise<CatalogCategory[]> {
  const services = await getServices();
  const byPath = new Map(services.map((s) => [`${s.category}/${s.slug}`, s]));

  const merged: CatalogCategory[] = programCatalog.map((category) => ({
    ...category,
    items: category.items.map((item): CatalogItem => {
      const cms = byPath.get(`${category.slug}/${item.slug}`);
      return {
        ...item,
        blurb: cms?.subtitle?.trim() || item.blurb,
        // The CMS is where this is edited; the in-repo line covers the
        // programmes that have no panel row to edit.
        audience: cms?.audience?.trim() || item.audience,
        batches: openBatches(cms),
      };
    }),
  }));

  const known = new Set(
    merged.flatMap((c) => c.items.map((i) => `${c.slug}/${i.slug}`)),
  );

  for (const service of services) {
    if (known.has(`${service.category}/${service.slug}`)) continue;

    let category = merged.find((c) => c.slug === service.category);
    if (!category) {
      category = {
        slug: service.category,
        label: service.category_label || service.category,
        items: [],
      };
      merged.push(category);
    }

    category.items.push({
      slug: service.slug,
      title: service.title,
      blurb: service.subtitle ?? '',
      audience: service.audience ?? '',
      batches: openBatches(service),
    });
  }

  return merged.filter((c) => c.items.length > 0);
}
