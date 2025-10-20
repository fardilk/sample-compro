import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'From Strategy to Adoption',
    subtitle: 'Deliver value with measurable outcomes.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  metrics: {
    items: [
      { label: 'Coverage', value: '90%' },
      { label: 'Savings', value: '25%' },
      { label: 'Satisfaction', value: '95%' },
      { label: 'Stability', value: '99.9%' },
    ]
  },
  features: {
    items: [
      { title: 'Strategy', text: 'Vision, roadmap, prioritization.' },
      { title: 'Implementation', text: 'Deliver features quickly.' },
      { title: 'Enablement', text: 'Upskill and transfer knowledge.' },
    ]
  },
  process: {
    steps: [
      { title: 'Discover', text: 'Identify gaps.' },
      { title: 'Deliver', text: 'Iterative sprints.' },
      { title: 'Adopt', text: 'Train and support.' },
    ]
  },
  caseStudies: { items: [{ title: 'Digital Enablement', result: 'Adoption up 80%.', image: '/img/og-default.jpg' }] },
  testimonials: { items: [{ name: 'L. Client', text: 'Made a real difference.' }] },
  faq: { items: [{ q: 'Support model?', a: 'We provide flexible options.' }] },
  contactCta: { title: 'Make the plan real', subtitle: 'Book a working session with our team.' }
};

export default content;
