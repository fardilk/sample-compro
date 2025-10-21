import type { VariantContent } from '../../../types';

const entrepreneurship: VariantContent = {
  hero: {
    eyebrow: 'Training • Excellence Plus Indonesia',
    title: 'Entrepreneurship',
    subtitle: 'From idea to first customers with lean validation.'
  },
  features: {
    items: [
      { title: 'Problem Discovery', text: 'Customer interviews and insights.' },
      { title: 'Validation', text: 'MVPs, prototypes, and experiments.' },
      { title: 'Go-To-Market', text: 'Positioning, channels, and pricing.' },
    ]
  },
  timeline: {
    title: 'Startup Journey',
    items: [
      { period: 'Phase 1', title: 'Explore', text: 'Jobs-to-be-done, pains and gains.' },
      { period: 'Phase 2', title: 'Validate', text: 'Smoke tests and concierge MVPs.' },
      { period: 'Phase 3', title: 'Launch', text: 'Acquire first 100 customers.' },
    ]
  },
  contactCta: { title: 'Launch your venture', subtitle: 'We’ll build your validation plan.' }
};

export default entrepreneurship;
