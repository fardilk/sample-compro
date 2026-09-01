import React from 'react';
import type { Article } from '../../data/articles';
import { formatMeta } from '../../data/articles';

/** The only interactive part of /blog, so it is the only island the page ships. */
const FeaturedSlider: React.FC<{ items: Article[] }> = ({ items }) => {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const current = items[idx];
  if (!current) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">Featured Articles</h2>
        {items.length > 1 && (
          <div className="flex items-center gap-2">
            <button aria-label="Previous" className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setIdx((p) => (p - 1 + items.length) % items.length)}>&larr;</button>
            <button aria-label="Next" className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setIdx((p) => (p + 1) % items.length)}>&rarr;</button>
          </div>
        )}
      </div>

      <article className="grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-5 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-0">
          <img src={current.image} alt={current.title} width={600} height={400} className="w-full h-64 sm:h-full object-cover rounded-lg sm:rounded-none sm:rounded-l-xl" />
        </div>
        <div className="p-5 flex flex-col">
          <span className="uppercase tracking-wide text-blue-600 text-xs font-semibold mb-1">Featured story</span>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{current.title}</h3>
          <p className="text-slate-700 mb-4">{current.description}</p>
          <span className="text-slate-500 text-sm mt-auto">{formatMeta(current)}</span>
        </div>
      </article>

      {items.length > 1 && (
        <div className="flex gap-1 mt-4">
          {items.map((_, i) => (
            <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full ${i === idx ? 'bg-orange-500' : 'bg-slate-300'}`}></button>
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedSlider;
