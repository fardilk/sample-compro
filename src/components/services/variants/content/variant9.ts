import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Technology Solutions',
    subtitle: 'Architecture, DevOps and observability.',
  },
  features: {
    items: [
      { title: 'Architecture', text: 'Design for scale and maintainability.' },
      { title: 'DevOps', text: 'CI/CD pipelines and environments.' },
      { title: 'Observability', text: 'Logging, tracing, and monitoring.' },
    ]
  },
  faq: {
    items: [
      { q: 'Tech stack?', a: 'We adapt to yours.' },
      { q: 'Engagement size?', a: 'Flexible from sprint to program.' },
    ]
  },
  metrics: {
    items: [
      { label: 'Deploy Frequency', value: 'Daily' },
      { label: 'Lead Time', value: '-70%' },
      { label: 'Change Failure Rate', value: '-50%' },
      { label: 'Restore Time', value: '-60%' },
    ]
  },
  testimonials: { items: [{ name: 'K. Client', text: 'Reduced bottlenecks significantly.' }] },
  caseStudies: { items: [{ title: 'Tech Solutions Rollout', result: 'Scaled to 100+ teams.', image: '/img/og-default.jpg' }] },
  accordion: {
    title: 'Architecture Choices',
    items: [
      { title: 'Containers vs Serverless', content: 'Choose based on workload patterns, latency and cost.' },
      { title: 'Observability Stack', content: 'Correlate logs, metrics, traces to accelerate MTTR.' },
      { title: 'Platform Boundaries', content: 'Clear contracts improve autonomy and speed.' }
    ]
  },
  testimonialsCarousel: {
    items: [
      { name: 'Eng Manager', text: 'The new pipelines cut our lead time in half.' },
      { name: 'SRE Lead', text: 'Reliability improved while costs went down.' }
    ]
  },
  contactCta: { title: 'Ship better, faster', subtitle: 'We’ll align on outcomes and plan the path.' }
};

export default content;
