import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Design. Pilot. Adopt.',
    subtitle: 'Target architecture with validated pilots and change enablement.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  features: {
    items: [
      { title: 'Assessment', text: 'Current stack & gaps.' },
      { title: 'Design', text: 'Target architecture.' },
      { title: 'Pilot', text: 'Validate in low-risk scope.' },
    ]
  },
  process: {
    steps: [
      { title: 'Plan', text: 'Timeline and owners.' },
      { title: 'Build', text: 'Sprints and demos.' },
      { title: 'Adopt', text: 'Change enablement.' },
    ]
  },
  metrics: {
    items: [
      { label: 'Deployments/Week', value: '20+' },
      { label: 'MTTR', value: '-60%' },
      { label: 'Adoption', value: '85%' },
      { label: 'Coverage', value: '90%' },
    ]
  },
  caseStudies: {
    items: [
      { title: 'CI/CD Rollout', result: 'Lead time improved 70%.', image: '/img/og-default.jpg' },
    ]
  },
  testimonials: { items: [{ name: 'E. Client', text: 'Reliable and practical.' }] },
  contactCta: { title: 'Pilot with us', subtitle: 'Validate value before scaling.' }
};

export default content;
