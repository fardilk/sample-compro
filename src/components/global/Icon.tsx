import React from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import {
  ArrowRight,
  Bell,
  Bookmark,
  Buildings,
  CalendarBlank,
  CaretDown,
  CaretRight,
  CaretUp,
  ChalkboardTeacher,
  ChartLineUp,
  ChatsCircle,
  CheckCircle,
  Strategy,
  CloudArrowUp,
  Cube,
  DownloadSimple,
  Envelope,
  Eye,
  Fire,
  Flask,
  ForkKnife,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  HandHeart,
  Heart,
  IdentificationBadge,
  Lightbulb,
  List,
  MagnifyingGlass,
  MapPin,
  Newspaper,
  PenNib,
  Question,
  Quotes,
  Rocket,
  Scales,
  ShareNetwork,
  ShieldCheck,
  Star,
  Target,
  Truck,
  UserCheck,
  UsersThree,
  X,
} from '@phosphor-icons/react';

/**
 * Icons for the site.
 *
 * The names stored in the navigation tree and in CMS content are Font Awesome
 * names, and they stay that way: mapping happens here so the icon set can be
 * swapped again without editing content or asking anyone in the panel to learn
 * a new vocabulary. An unmapped name falls back rather than rendering nothing.
 *
 * Phosphor duotone at the brand orange gives the set a silhouette that is not
 * the Font Awesome solid everyone else uses, and being inline SVG it drops the
 * 107 kB stylesheet and 113 kB webfont the old set required.
 */
const MAP: Record<string, PhosphorIcon> = {
  'fa-bars': List,
  'fa-blog': Newspaper,
  'fa-bolt': Rocket,
  'fa-bookmark': Bookmark,
  'fa-briefcase': IdentificationBadge,
  'fa-building': Buildings,
  'fa-bullseye': Target,
  'fa-calendar': CalendarBlank,
  'fa-calendar-alt': CalendarBlank,
  'fa-chalkboard-teacher': ChalkboardTeacher,
  'fa-chart-line': ChartLineUp,
  'fa-check': CheckCircle,
  'fa-chess': Strategy,
  'fa-chevron-down': CaretDown,
  'fa-chevron-right': CaretRight,
  'fa-chevron-up': CaretUp,
  'fa-circle-nodes': ShareNetwork,
  'fa-cloud': CloudArrowUp,
  'fa-comments': ChatsCircle,
  'fa-concierge-bell': Bell,
  'fa-cubes': Cube,
  'fa-diagram-project': ShareNetwork,
  'fa-download': DownloadSimple,
  'fa-envelope': Envelope,
  'fa-eye': Eye,
  'fa-feather-pointed': PenNib,
  'fa-fire': Fire,
  'fa-gauge-high': Gauge,
  'fa-globe': Globe,
  'fa-hands-helping': HandHeart,
  'fa-handshake': Handshake,
  'fa-heart': Heart,
  'fa-history': CalendarBlank,
  'fa-hotel': Buildings,
  'fa-laptop-code': Flask,
  'fa-lightbulb': Lightbulb,
  'fa-map-marker-alt': MapPin,
  'fa-newspaper': Newspaper,
  'fa-people-group': UsersThree,
  'fa-person-chalkboard': ChalkboardTeacher,
  'fa-question-circle': Question,
  'fa-quote-left': Quotes,
  'fa-rocket': Rocket,
  'fa-scale-balanced': Scales,
  'fa-search': MagnifyingGlass,
  'fa-shield': ShieldCheck,
  'fa-shield-alt': ShieldCheck,
  'fa-star': Star,
  'fa-truck': Truck,
  'fa-user-check': UserCheck,
  'fa-user-tie': GraduationCap,
  'fa-users': UsersThree,
  'fa-users-cog': UsersThree,
  'fa-utensils': ForkKnife,
  'fa-xmark': X,
  'fa-arrow-right': ArrowRight,
};

export type IconProps = {
  /** Font Awesome style name, e.g. "fa-user-tie". */
  name?: string;
  size?: number;
  className?: string;
  /** Defaults to the surrounding text colour; pass a value to override. */
  color?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  'aria-hidden'?: boolean;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = '',
  color,
  weight = 'duotone',
  ...rest
}) => {
  const Glyph = (name && MAP[name.trim()]) || Star;
  return (
    <Glyph
      size={size}
      weight={weight}
      // Inherits the surrounding text colour, so a chevron follows its label
      // and a decorative icon follows whatever accent class it carries.
      // Duotone draws the secondary shape from the same colour at low opacity.
      color={color ?? 'currentColor'}
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
};

export default Icon;
