import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Data-Driven Decisions',
    subtitle: 'From data plumbing to insight and action.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  features: {
    items: [
      { title: 'Data Platform', text: 'Pipelines, lakehouse.' },
      { title: 'BI & Analytics', text: 'Dashboards that matter.' },
      { title: 'MLOps', text: 'Model lifecycle at scale.' },
    ]
  },
  process: {
    steps: [
      { title: 'Ingest', text: 'Reliable source capture.' },
      { title: 'Model', text: 'Governed semantic layers.' },
      { title: 'Activate', text: 'Insights in the flow of work.' },
    ]
  },
  metrics: {
    items: [
      { label: 'Freshness', value: 'Near real-time' },
      { label: 'Adoption', value: '80%+' },
      { label: 'Run Cost', value: '-30%' },
    ]
  },
  caseStudies: {
    items: [
      { title: '360° Customer View', result: 'Lifted cross-sell 18%.', image: '/img/og-default.jpg' },
    ]
  },
  testimonials: { items: [{ name: 'Product Director', text: 'Insights where we need them.' }] },
  tabs: {
    title: 'Analytics Modules',
    tabs: [
      { title: 'Ingestion', content: 'Batch and streaming pipelines from major sources.' },
      { title: 'Modeling', content: 'Semantic layers and governed data marts.' },
      { title: 'Activation', content: 'Reverse ETL and embedded insights.' }
    ]
  },
  statsGrid: {
    title: 'Platform Highlights',
    items: [
      { label: 'Connectors', value: '50+' },
      { label: 'Latency', value: '< 5m' },
      { label: 'SLAs', value: '99.9%' },
      { label: 'Ops Cost', value: '-30%' }
    ]
  },
  gallery: {
    title: 'Sample Dashboards',
    items: [
      { src: '/img/og-default.jpg', caption: 'KPI Overview' },
      { src: '/img/og-default.jpg', caption: 'Sales Trends' },
      { src: '/img/og-default.jpg', caption: 'Customer Cohorts' }
    ]
  },
  contactCta: { title: 'Unlock your data', subtitle: 'We’ll map quick wins and a roadmap.' }
};

export default content;
