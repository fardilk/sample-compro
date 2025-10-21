import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'People, Process, Platform',
    subtitle: 'Enable teams with coaching, playbooks, and tooling.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  features: {
    items: [
      { title: 'Capability Uplift', text: 'Hands-on training.' },
      { title: 'Operating Model', text: 'Clear roles & rituals.' },
      { title: 'Tooling', text: 'DevEx and automation.' },
    ]
  },
  process: {
    steps: [
      { title: 'Assess', text: 'Skills and flow metrics.' },
      { title: 'Uplift', text: 'Workshops and shadowing.' },
      { title: 'Embed', text: 'Coaching and co-delivery.' },
    ]
  },
  metrics: {
    items: [
      { label: 'Cycle Time', value: '-40%' },
      { label: 'Team NPS', value: '+25' },
      { label: 'Onboarding', value: '-50%' },
    ]
  },
  caseStudies: {
    items: [
      { title: 'DevEx Improvement', result: 'Time-to-merge down 45%.', image: '/img/og-default.jpg' },
    ]
  },
  testimonials: { items: [{ name: 'Head of Engineering', text: 'Practical, lasting change.' }] },
  contactCta: { title: 'Enable your teams', subtitle: 'Let’s design a capability plan.' }
};

export default content;
