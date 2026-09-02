import type { HoverMenuItem } from './hoverMenu';
import { serviceHref } from './serviceLinks';

/**
 * Resolves a menu entry to its URL. Desktop and mobile navigation render the
 * same tree, so they must resolve it the same way; four call sites each having
 * their own slug logic is exactly what broke /services links before.
 *
 * `group` is the top-level label the item sits under, which is what decides
 * how a child is addressed.
 */
export function menuHref(group: string, item: HoverMenuItem, parent?: HoverMenuItem): string {
  if (group === 'Our Services') {
    return serviceHref(parent ? parent.label : item.label, parent ? item.label : undefined);
  }

  if (group === 'Who We Are') {
    const map: Record<string, string> = {
      'vision & mission': 'vision-mission',
      'our team': 'our-team',
      history: 'history',
      values: 'values',
    };
    const label = item.label.toLowerCase();
    return `/about-us#${map[label] ?? label.replace(/[^a-z0-9]+/g, '-')}`;
  }

  if (group === 'Consultation Program') {
    const map: Record<string, string> = {
      schedule: '/schedule',
      reserve: '/registration',
      'contact us': '/home/contact?type=konsultasi',
    };
    return map[item.label.toLowerCase()] ?? item.href ?? '#';
  }

  if (group === 'Resources' && item.label.toLowerCase() === 'blog') {
    return '/blog';
  }

  return item.href ?? '#';
}

/**
 * True when a menu entry has no destination yet. Several items carry a leftover
 * fragment like '#schedule' with no matching anchor anywhere, which is just as
 * dead as a bare '#' but looks like a real link.
 */
export const isPlaceholder = (href: string) => href.startsWith('#');
