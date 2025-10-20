import type { VariantContent } from '../../../types';

const ttt: VariantContent = {
  hero: {
    eyebrow: 'Training • Excellence Plus Indonesia',
    title: 'Train The Trainer',
    subtitle: 'Design and deliver training that sticks.'
  },
  features: {
    items: [
      { title: 'Adult Learning', text: 'Principles that drive retention.' },
      { title: 'Design', text: 'Objectives, sequencing, and practice.' },
      { title: 'Facilitation', text: 'Energize rooms and manage dynamics.' },
    ]
  },
  tabs: {
    title: 'Trainer Toolkit',
    tabs: [
      { title: 'Lesson Plans', content: 'Templates and examples.' },
      { title: 'Activities', content: 'Role plays, case studies, and games.' },
      { title: 'Assessment', content: 'Rubrics and feedback forms.' }
    ]
  },
  contactCta: { title: 'Build internal trainers', subtitle: 'Scale learning with your own faculty.' }
};

export default ttt;
