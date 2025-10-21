import type { VariantContent } from '../../../types';

const sales: VariantContent = {
  hero: {
    eyebrow: 'Training • Excellence Plus Indonesia',
    title: 'Sales Mastery',
    subtitle: 'Consultative selling, pipeline discipline, and closing with confidence.'
  },
  features: {
    items: [
      { title: 'Discovery', text: 'Ask better questions, uncover real needs.' },
      { title: 'Objection Handling', text: 'Reframe, validate, and advance.' },
      { title: 'Closing', text: 'Mutual plans and next steps that stick.' },
    ]
  },
  tabs: {
    title: 'Sales Toolkit',
    tabs: [
      { title: 'Scripts', content: 'Discovery prompts and objection reframes.' },
      { title: 'Templates', content: 'Mutual action plans and proposals.' },
      { title: 'Metrics', content: 'Win rate, cycle time, and stage conversion.' }
    ]
  },
  contactCta: { title: 'Boost your pipeline', subtitle: 'Customize a training path for your team.' }
};

export default sales;
