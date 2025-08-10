import React from 'react';
import { Header, Footer, FontAwesome } from '../components/global';

interface Article {
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

const articles: Article[] = [
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

const BlogPage: React.FC = () => {
  // Sort helpers
  const featuredRaw = articles.filter(a => a.featured);
  const topStories = [...articles].sort((a, b) => b.views - a.views).slice(0, 6);

  const featuredList = (featuredRaw.length ? featuredRaw : topStories).slice(0, 5);
  const [featIdx, setFeatIdx] = React.useState(0);
  React.useEffect(() => {
    if (featuredList.length <= 1) return;
    const t = setInterval(() => setFeatIdx((p) => (p + 1) % featuredList.length), 5000);
    return () => clearInterval(t);
  }, [featuredList.length]);

  const catA = articles.filter(a => a.category === 'Training & Workshops').slice(0, 6);
  const catB = articles.filter(a => a.category === 'Consultancy & Operations').slice(0, 6);
  const catC = articles.filter(a => a.category === 'Coaching & Leadership').slice(0, 6);

  const formatMeta = (a: Article) => {
    const d = new Date(a.date);
    const dateStr = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return `Written by ${a.author} • ${dateStr} • ${a.readMinutes} min read`;
  };

  const current = featuredList[featIdx];

  return (
    <div className="blog-page">
      <FontAwesome />
      <Header />

      {/* Hero */}
      <section className="pt-16 pb-10 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="mx-auto" style={{ width: '90%' }}>
          <h1 className="text-4xl md:text-5xl font-extrabold">Insights & Stories</h1>
          <p className="text-slate-200 mt-2">Practical ideas from training, consultancy, and coaching—built for real-world results.</p>
        </div>
      </section>

      {/* Featured Articles - single card slider */}
      <section className="py-10 bg-white">
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            {featuredList.length > 1 && (
              <div className="flex items-center gap-2">
                <button aria-label="Previous" className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setFeatIdx(p => (p - 1 + featuredList.length) % featuredList.length)}>&larr;</button>
                <button aria-label="Next" className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setFeatIdx(p => (p + 1) % featuredList.length)}>&rarr;</button>
              </div>
            )}
          </div>

          {current && (
            <article className="grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-5 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 sm:p-0">
                <img src={current.image} alt={current.title} className="w-full h-64 sm:h-full object-cover rounded-lg sm:rounded-none sm:rounded-l-xl" />
              </div>
              <div className="p-5 flex flex-col">
                <span className="uppercase tracking-wide text-blue-600 text-xs font-semibold mb-1">Featured story</span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{current.title}</h3>
                <p className="text-slate-700 mb-4">{current.description}</p>
                <span className="text-slate-500 text-sm mt-auto">{formatMeta(current)}</span>
              </div>
            </article>
          )}

          {/* Dots */}
          {featuredList.length > 1 && (
            <div className="flex gap-1 mt-4">
              {featuredList.map((_, i) => (
                <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => setFeatIdx(i)} className={`w-2.5 h-2.5 rounded-full ${i === featIdx ? 'bg-orange-500' : 'bg-slate-300'}`}></button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Stories */}
      <section className="py-10 bg-orange-50">
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Top Stories</h2>
            <span className="text-slate-500 text-sm">Based on views</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStories.map(a => (
              <article key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <img src={a.image} alt={a.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold mb-1">{a.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{a.description.slice(0, 100)}{a.description.length > 100 ? '…' : ''}</p>
                <span className="text-slate-500 text-xs">{formatMeta(a)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category A - Training & Workshops */}
      <section className="py-10 bg-white">
        <div className="mx-auto" style={{ width: '90%' }}>
          <h2 className="text-2xl font-bold mb-6">Training & Workshops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catA.map(a => (
              <article key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <img src={a.image} alt={a.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold mb-1">{a.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{a.description}</p>
                <span className="text-slate-500 text-xs">{formatMeta(a)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category B */}
      <section className="py-10 bg-orange-50">
        <div className="mx-auto" style={{ width: '90%' }}>
          <h2 className="text-2xl font-bold mb-6">Consultancy & Operations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catB.map(a => (
              <article key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <img src={a.image} alt={a.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold mb-1">{a.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{a.description}</p>
                <span className="text-slate-500 text-xs">{formatMeta(a)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category C */}
      <section className="py-10 bg-white">
        <div className="mx-auto" style={{ width: '90%' }}>
          <h2 className="text-2xl font-bold mb-6">Coaching & Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catC.map(a => (
              <article key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <img src={a.image} alt={a.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold mb-1">{a.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{a.description}</p>
                <span className="text-slate-500 text-xs">{formatMeta(a)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Stories - one row per article */}
      <section className="py-10 bg-orange-50">
        <div className="mx-auto" style={{ width: '90%' }}>
          <h2 className="text-2xl font-bold mb-6">All Stories</h2>
          <div className="space-y-4">
            {articles.map(a => (
              <article key={a.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex items-start gap-4">
                <img src={a.image} alt={a.title} className="w-28 h-28 object-cover rounded-lg flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{a.title}</h3>
                  <p className="text-slate-600 text-sm mb-2 line-clamp-2">{a.description}</p>
                  <span className="text-slate-500 text-xs">{formatMeta(a)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Newsletter */}
      <section className="py-12 bg-white">
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold">Subscribe to our newsletter</h3>
              <p className="text-slate-600 text-sm">Get new stories on training, consultancy, and coaching—straight to your inbox.</p>
            </div>
            <form className="w-full md:w-auto flex gap-2">
              <input type="email" required placeholder="you@company.com" className="w-full md:w-80 px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <button type="submit" className="px-4 py-2 rounded-md bg-orange-main text-white shadow hover:shadow-md">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
