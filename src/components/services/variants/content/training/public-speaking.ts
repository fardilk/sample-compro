import type { VariantContent } from '../../../types';

const publicSpeaking: VariantContent = {
  hero: {
    eyebrow: 'Training • Excellence Plus Indonesia',
    title: 'Public Speaking',
    subtitle: 'Presence, structure, and delivery that lands.'
  },
  features: {
    items: [
      { title: 'Structure', text: 'Hooks, narrative, and clear takeaways.' },
      { title: 'Delivery', text: 'Voice, pace, and body language.' },
      { title: 'Handling Q&A', text: 'Bridging, reframing, and clarity.' },
    ]
  },
  gallery: {
    title: 'On-stage Moments',
    items: [
      { src: '/img/og-default.jpg', caption: 'Executive keynote' },
      { src: '/img/og-default.jpg', caption: 'Team presentation' },
      { src: '/img/og-default.jpg', caption: 'Investor pitch' }
    ]
  },
  contactCta: { title: 'Speak with impact', subtitle: 'We’ll tailor a practice-driven program.' }
};

export default publicSpeaking;
