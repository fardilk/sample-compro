import type { VariantContent } from '../../types';

const content: VariantContent = {
  hero: {
    eyebrow: 'Excellence Plus Indonesia',
    title: 'Modernize and Migrate',
    subtitle: 'Cloud-native, scalable, secure.',
    imageSrc: '/img/hero-image-excellenceplus.jpg'
  },
  features: {
    items: [
      { title: 'App Modernization', text: 'Refactor to services.' },
      { title: 'Platform', text: 'Kubernetes & serverless.' },
      { title: 'Observability', text: 'Measure what matters.' },
      { title: 'FinOps', text: 'Optimize cloud spend.' },
    ]
  },
  process: {
    steps: [
      { title: 'Discovery', text: 'Portfolio and constraints.' },
      { title: 'Migration Plan', text: 'Risks and sequencing.' },
      { title: 'Execute', text: 'Wave-based delivery.' },
      { title: 'Operate', text: 'SRE and autoscale.' },
    ]
  },
  metrics: {
    items: [
      { label: 'Infra Cost', value: '-35%' },
      { label: 'Uptime', value: '99.95%' },
      { label: 'Release Freq', value: 'x4' },
    ]
  },
  caseStudies: {
    items: [
      { title: 'Monolith to Microservices', result: 'Scaled to 10x traffic.', image: '/img/og-default.jpg' },
    ]
  },
  testimonials: { items: [{ name: 'Tech Lead', text: 'Zero-downtime cutover delivered.' }] },
  // New sections (Elementor/Divi style)
  medias: [
    {
      eyebrow: 'Platform Readiness',
      title: 'Blueprint your landing zone',
      text: 'Establish a secure, scalable baseline with network, identity, and guardrails.',
      imageSrc: '/img/og-default.jpg',
      imageSide: 'left'
    },
    {
      eyebrow: 'Change Enablement',
      title: 'Adoption that sticks',
      text: 'Playbooks, communities of practice, and hands-on coaching to embed ways of working.',
      imageSrc: '/img/og-default.jpg',
      imageSide: 'right'
    }
  ],
  cardGrids: [
    {
      title: 'Common Migration Waves',
      subtitle: 'Sequencing patterns we use to reduce risk and maximize value.',
      columns: 3,
      items: [
        { title: 'Lift & Shift', text: 'Quick wins with minimal change.', icon: 'fa-truck', image: '/img/og-default.jpg' },
        { title: 'Replatform', text: 'Managed services for efficiency.', icon: 'fa-cloud', image: '/img/og-default.jpg' },
        { title: 'Refactor', text: 'Break down monoliths incrementally.', icon: 'fa-cubes', image: '/img/og-default.jpg' }
      ]
    }
  ],
  iconLists: [
    {
      title: 'Success Criteria',
      subtitle: 'What we track from day one.',
      columns: 3,
      items: [
        { icon: 'fa-gauge-high', title: 'Performance' },
        { icon: 'fa-shield', title: 'Security posture' },
        { icon: 'fa-scale-balanced', title: 'Cost vs value' },
        { icon: 'fa-users', title: 'Team adoption' },
        { icon: 'fa-diagram-project', title: 'Flow efficiency' },
        { icon: 'fa-circle-nodes', title: 'Reliability' }
      ]
    }
  ],
  timeline: {
    title: 'Journey to Cloud-Native',
    items: [
      { period: 'Phase 1', title: 'Discover & Align', text: 'Goals, constraints, and success metrics.', image: '/img/og-default.jpg' },
      { period: 'Phase 2', title: 'Design & Prepare', text: 'Target state and landing zone.', image: '/img/og-default.jpg' },
      { period: 'Phase 3', title: 'Migrate & Modernize', text: 'Wave-based execution and enablement.', image: '/img/og-default.jpg' },
      { period: 'Phase 4', title: 'Operate & Optimize', text: 'SRE, autoscale, and FinOps.', image: '/img/og-default.jpg' }
    ]
  },
  contactCta: { title: 'Discuss your migration', subtitle: 'We’ll map value, risks and plan.' }
};

export default content;
