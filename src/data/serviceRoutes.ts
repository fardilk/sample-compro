import { mainMenu } from '../utils/hoverMenu';

import { categorySlug, slugify } from '../utils/serviceLinks';

export interface ServiceRoute {
  categorySlug: string;
  categoryLabel: string;
  idSlug: string;
  title: string;
  description: string;
  /** Topic glyph from the navigation tree, used when a programme has no photo. */
  icon?: string;
}

const servicesRoot = mainMenu.find((m) => m.label === 'Our Services');

export const serviceRoutes: ServiceRoute[] = (servicesRoot?.children ?? []).flatMap((cat) => {
  const catSlug = categorySlug(cat.label);
  return (cat.children ?? []).map((leaf) => ({
    categorySlug: catSlug,
    categoryLabel: cat.label,
    idSlug: slugify(leaf.label),
    title: leaf.label,
    description:
      leaf.description ??
      `Explore our ${leaf.label} program, built around measurable outcomes.`,
    icon: leaf.icon,
  }));
});

export default serviceRoutes;
