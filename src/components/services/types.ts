import type { ReactNode } from 'react';
export interface HeroContent {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  primaryTo?: string;
  primaryText?: string;
  secondaryTo?: string;
  secondaryText?: string;
}

export interface FeatureItem { icon?: string; title: string; text: string | ReactNode; }
export interface FeaturesContent { items: FeatureItem[]; columns?: 2 | 3 | 4; }

export interface ProcessStep { title: string; text: string | ReactNode; }
export interface ProcessContent { steps: ProcessStep[]; }

export interface CaseStudyItem { title: string; result: string | ReactNode; image?: string; }
export interface CaseStudiesContent { items: CaseStudyItem[]; }

export interface TestimonialItem { name: string; role?: string; text: string | ReactNode; }
export interface TestimonialsContent { items: TestimonialItem[]; }

export interface QnAItem { q: string; a: string | ReactNode; }
export interface FAQContent { items: QnAItem[]; }

export interface Plan { name: string; price: string; features: Array<string | ReactNode>; }
export interface PricingContent { plans: Plan[]; }

export interface MetricItem { label: string; value: string; }
export interface MetricsContent { items: MetricItem[]; }

export interface ClientItem { name: string; logo: string; }
export interface ClientsContent { items: ClientItem[]; }

export interface CTAContent { title: string; subtitle?: string; primaryTo?: string; primaryText?: string; secondaryTo?: string; secondaryText?: string; }

// New flexible content blocks
export interface MediaContent {
  eyebrow?: string;
  title?: string;
  text?: string | ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
  // Optional inline statistics (e.g., 40% / 80%) shown beside the text
  stats?: StatsItem[];
  // Decorative background shape behind the image
  shapeBehind?: boolean;
  // Image clipping style (rounded corners by default, or angled for a non-rigid look)
  imageClip?: 'rounded' | 'angled';
}

export interface CardItem { title: string; text: string | ReactNode; icon?: string; image?: string; to?: string; linkText?: string; }
export interface CardGridContent { items: CardItem[]; columns?: 2 | 3 | 4; title?: string; subtitle?: string | ReactNode; }

export interface IconListItem { icon?: string; title: string; text?: string | ReactNode; }
export interface IconListContent { items: IconListItem[]; columns?: 1 | 2 | 3; title?: string; subtitle?: string | ReactNode; }

export interface TimelineItem { period?: string; title: string; text: string | ReactNode; image?: string; }
export interface TimelineContent { items: TimelineItem[]; title?: string; subtitle?: string | ReactNode; }

export interface TabItem { title: string; content: string | ReactNode; }
export interface TabsContent { tabs: TabItem[]; title?: string; subtitle?: string | ReactNode; }

export interface AccordionItem { title: string; content: string | ReactNode; }
export interface AccordionContent { items: AccordionItem[]; title?: string; subtitle?: string | ReactNode; }

export interface StatsItem { label: string; value: string; icon?: string; }
export interface StatsGridContent { items: StatsItem[]; columns?: 2 | 3 | 4; title?: string; subtitle?: string | ReactNode; }

export interface GalleryItem { src: string; alt?: string; caption?: string | ReactNode; }
export interface GalleryContent { items: GalleryItem[]; columns?: 2 | 3 | 4; title?: string; subtitle?: string | ReactNode; }

export interface VariantContent {
  hero?: HeroContent;
  features?: FeaturesContent;
  process?: ProcessContent;
  caseStudies?: CaseStudiesContent;
  testimonials?: TestimonialsContent;
  faq?: FAQContent;
  pricing?: PricingContent;
  metrics?: MetricsContent;
  clients?: ClientsContent;
  contactCta?: CTAContent;
  // Optional additional sections (Elementor/Divi-like)
  medias?: MediaContent[];
  cardGrids?: CardGridContent[];
  iconLists?: IconListContent[];
  timeline?: TimelineContent;
  tabs?: TabsContent;
  accordion?: AccordionContent;
  statsGrid?: StatsGridContent;
  gallery?: GalleryContent;
  testimonialsCarousel?: TestimonialsContent;
}
