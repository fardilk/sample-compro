// Placeholder editorial data. Swap for the CMS API once the Go backend is deployed.
export interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string; // ISO string
  readMinutes: number;
  views: number;
  image: string;
  category: 'Training & Workshops' | 'Consultancy & Operations' | 'Coaching & Leadership';
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: 'leadership-habits',
    title: 'Leadership Habits That Build High-Performing Teams',
    description: 'Practical routines leaders use to align, motivate, and deliver consistent results.',
    author: 'Editorial Team',
    date: '2025-07-15',
    readMinutes: 6,
    views: 1280,
    image: 'https://picsum.photos/seed/leadership/600/400',
    category: 'Training & Workshops',
    featured: true,
  },
  {
    id: 'sales-playbook',
    title: 'Designing a Sales Playbook That Actually Gets Used',
    description: 'Go beyond templates—create plays that fit your funnel, team, and product reality.',
    author: 'Guest Contributor',
    date: '2025-07-03',
    readMinutes: 7,
    views: 1094,
    image: 'https://picsum.photos/seed/sales/600/400',
    category: 'Training & Workshops',
    featured: true,
  },
  {
    id: 'service-excellence-metrics',
    title: 'Service Excellence: Metrics That Matter',
    description: 'Measure the right things to transform customer experience into growth.',
    author: 'Research Desk',
    date: '2025-06-20',
    readMinutes: 5,
    views: 980,
    image: 'https://picsum.photos/seed/service/600/400',
    category: 'Consultancy & Operations',
  },
  {
    id: 'hr-system-blueprint',
    title: 'The HR System Blueprint for Growing Companies',
    description: 'From policies to performance—build HR that scales with your business.',
    author: 'EPI Consultants',
    date: '2025-05-28',
    readMinutes: 8,
    views: 1210,
    image: 'https://picsum.photos/seed/hr/600/400',
    category: 'Consultancy & Operations',
  },
  {
    id: 'coaching-questions',
    title: '10 Coaching Questions That Unlock Breakthroughs',
    description: 'Short, powerful prompts to help teams get unstuck and move forward.',
    author: 'Coaching Practice',
    date: '2025-05-10',
    readMinutes: 4,
    views: 860,
    image: 'https://picsum.photos/seed/coaching/600/400',
    category: 'Coaching & Leadership',
  },
  {
    id: 'entrepreneurship-first-100-days',
    title: 'Entrepreneurship: Your First 100 Days',
    description: 'What to prioritize, what to ignore, and how to learn faster than the market.',
    author: 'Editorial Team',
    date: '2025-04-19',
    readMinutes: 9,
    views: 1320,
    image: 'https://picsum.photos/seed/entre/600/400',
    category: 'Training & Workshops',
  },
  {
    id: 'restaurant-cafe-ops',
    title: 'Restaurant & Café Ops: Systems for Consistency',
    description: 'Consistency is a system. Here’s how to build one for daily operations.',
    author: 'Ops Lab',
    date: '2025-03-30',
    readMinutes: 6,
    views: 740,
    image: 'https://picsum.photos/seed/restaurant/600/400',
    category: 'Consultancy & Operations',
  },
  {
    id: 'public-speaking-frame',
    title: 'A Simple Frame for Confident Public Speaking',
    description: 'Use this three-part structure to engage any audience.',
    author: 'Coaching Practice',
    date: '2025-03-12',
    readMinutes: 5,
    views: 910,
    image: 'https://picsum.photos/seed/speaking/600/400',
    category: 'Coaching & Leadership',
  },
  {
    id: 'train-the-trainer-kit',
    title: 'Building a Train-the-Trainer Toolkit',
    description: 'Create internal capability with a compact, reusable toolkit.',
    author: 'Training Lab',
    date: '2025-02-18',
    readMinutes: 7,
    views: 670,
    image: 'https://picsum.photos/seed/ttt/600/400',
    category: 'Training & Workshops',
  },
  {
    id: 'butler-training-standards',
    title: 'Butler Training Standards for Luxury Service',
    description: 'Rituals, details, and cultural nuance that define luxury service.',
    author: 'Hospitality Desk',
    date: '2025-01-22',
    readMinutes: 6,
    views: 560,
    image: 'https://picsum.photos/seed/butler/600/400',
    category: 'Training & Workshops',
  },
];

export default articles;

/** Shared byline used by both the blog page and the featured slider. */
export function formatMeta(a: Article): string {
  const dateStr = new Date(a.date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return `Written by ${a.author} • ${dateStr} • ${a.readMinutes} min read`;
}
