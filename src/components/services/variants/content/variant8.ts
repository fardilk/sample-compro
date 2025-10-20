import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Recruit, Ramp, Perform',
    subtitle: 'Executive search and enablement for lasting impact.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  process: {
    steps: [
      { title: 'Assess', text: 'People, process, tools.' },
      { title: 'Recommend', text: 'Right-sized plan.' },
      { title: 'Deliver', text: 'Outcomes and capability.' },
    ]
  },
  features: {
    items: [
      { title: 'Ops Excellence', text: 'Reliability and speed.' },
      { title: 'Data-Driven', text: 'Inform decisions.' },
      { title: 'Security', text: 'Protect and comply.' },
    ]
  },
  caseStudies: {
    items: [
      { title: 'Enablement Sprint', result: 'Teams self-serve within 4 weeks.', image: '/img/og-default.jpg' },
    ]
  },
  metrics: {
    items: [
      { label: 'Cycle Time', value: '-30%' },
      { label: 'Adoption', value: '80%' },
      { label: 'Issues', value: '-25%' },
      { label: 'Satisfaction', value: '93%' },
    ]
  },
  testimonials: { items: [{ name: 'J. Client', text: 'Professional and thorough.' }] },
  contactCta: { title: 'Hire and enable leaders', subtitle: 'Let’s align on profiles and outcomes.' }
};

export default content;
