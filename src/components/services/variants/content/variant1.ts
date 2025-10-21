import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Enable Teams with Confidence',
    subtitle: 'Blueprints, adoption, and sustained performance—delivered with measurable outcomes.',
    imageSrc: '/img/hero-image-excellenceplus.jpg',
  },
  features: {
    items: [
      { title: 'Discovery & Assessment', text: 'Understand current state and goals.' },
      { title: 'Roadmap Design', text: 'Define milestones and outcomes.' },
      { title: 'Enablement & Adoption', text: 'Train, onboard and support teams.' },
    ],
  },
  process: {
    steps: [
      { title: 'Understand', text: 'Deep dive sessions and interviews.' },
      { title: 'Plan', text: 'Prioritize initiatives and timelines.' },
      { title: 'Execute', text: 'Iterate with feedback loops.' },
    ],
  },
  caseStudies: {
    items: [
      { title: 'Retail Expansion Enablement', result: 'Increased adoption to 85% in 6 months.', image: '/img/og-default.jpg' },
      { title: 'Ops Automation', result: 'Saved 2,000+ hours annually.', image: '/img/og-default.jpg' },
    ],
  },
  testimonials: {
    items: [
      { name: 'A. Client', role: 'COO', text: 'Clear execution and measurable outcomes.' },
      { name: 'B. Client', role: 'Head of Ops', text: 'Adoption jumped in weeks.' },
    ],
  },
  faq: {
    items: [
      { q: 'How long does it take?', a: 'Typical engagements run 8–12 weeks.' },
      { q: 'Can you support remote teams?', a: 'Yes, fully remote-friendly.' },
    ],
  },
  contactCta: {
    title: 'Ready to get started?',
    subtitle: 'Talk to our team and plan your first sprint.',
  },
};

export default content;
