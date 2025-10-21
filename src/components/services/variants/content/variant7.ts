import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Customer-Centric Experiences',
    subtitle: 'Blend design, product, and technology.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  features: {
    items: [
      { title: 'Discovery', text: 'Jobs-to-be-done, journey maps.' },
      { title: 'Experience Design', text: 'Design systems & accessibility.' },
      { title: 'Experimentation', text: 'A/B and feature flags.' },
    ]
  },
  process: {
    steps: [
      { title: 'Understand', text: 'Research & synthesis.' },
      { title: 'Prototype', text: 'Test with users.' },
      { title: 'Deliver', text: 'Incremental releases.' },
    ]
  },
  metrics: {
    items: [
      { label: 'Conversion', value: '+15%' },
      { label: 'CSAT', value: '+20%' },
      { label: 'Time-to-Value', value: '-30%' },
    ]
  },
  caseStudies: {
    items: [
      { title: 'Mobile UX Revamp', result: 'Checkout drop-off down 25%.', image: '/img/og-default.jpg' },
    ]
  },
  testimonials: { items: [{ name: 'CX Lead', text: 'From insights to outcomes.' }] },
  contactCta: { title: 'Design your next win', subtitle: 'Book a discovery session.' }
};

export default content;
