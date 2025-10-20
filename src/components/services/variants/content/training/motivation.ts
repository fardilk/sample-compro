import type { VariantContent } from '../../../types';

const motivation: VariantContent = {
  hero: {
    eyebrow: 'Training • Excellence Plus Indonesia',
    title: 'Motivation & Momentum',
    subtitle: 'Energy, mindset, and habits for sustained performance.'
  },
  features: {
    items: [
      { title: 'Mindset', text: 'Growth mindset and self-efficacy.' },
      { title: 'Habits', text: 'Stacking, triggers, and accountability.' },
      { title: 'Resilience', text: 'Bounce-back plans and stress hygiene.' },
    ]
  },
  iconLists: [
    { title: 'Outcomes', items: [
      { title: 'Clarity of goals', icon: 'fa-bullseye' },
      { title: 'Sustained focus', icon: 'fa-fire' },
      { title: 'Team rituals', icon: 'fa-people-group' }
    ]}
  ],
  contactCta: { title: 'Energize your teams', subtitle: 'We’ll design an engagement playbook.' }
};

export default motivation;
