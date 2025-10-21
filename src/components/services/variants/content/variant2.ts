import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Scale with Technology',
    subtitle: 'Architecture, DevOps and integration for speed and reliability.'
  },
  metrics: {
    items: [
      { label: 'Projects', value: '10,000+' },
      { label: 'Clients', value: '1,000+' },
      { label: 'Years', value: '15+' },
      { label: 'Countries', value: '5+' },
    ]
  },
  features: {
    items: [
      { title: 'Blueprint', text: 'Clear technology roadmap.' },
      { title: 'Integration', text: 'Seamless platform connections.' },
      { title: 'Governance', text: 'Security and change management.' },
    ]
  },
  caseStudies: {
    items: [
      { title: 'Platform Upgrade', result: 'Downtime reduced by 90%.', image: '/img/og-default.jpg' },
      { title: 'Data Lake Setup', result: 'Unified analytics across teams.', image: '/img/og-default.jpg' },
    ]
  },
  testimonials: {
    items: [
      { name: 'C. Client', role: 'CTO', text: 'Great execution.' },
      { name: 'D. Client', role: 'Product Lead', text: 'Strong collaboration.' },
    ]
  },
  faq: {
    items: [
      { q: 'Do you work with SMEs?', a: 'Yes, and also enterprises.' },
      { q: 'How do you measure success?', a: 'We set clear KPIs per initiative.' },
    ]
  },
  contactCta: { title: 'Let’s talk technology', subtitle: 'Modernize and move faster with confidence.' }
};

export default content;
