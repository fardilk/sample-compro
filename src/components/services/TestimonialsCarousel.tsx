import React, { useState } from 'react';
import type { TestimonialsContent } from './types';

const TestimonialsCarousel: React.FC<TestimonialsContent> = ({ items }) => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % items.length);
  const prev = () => setIdx((p) => (p - 1 + items.length) % items.length);
  if (!items.length) return null;
  const t = items[idx];
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="bg-slate-100 rounded-xl p-6 shadow-sm text-center">
          <div className="text-slate-700 italic mb-3">“{t.text}”</div>
          <div className="text-slate-900 font-semibold">{t.name}</div>
          {t.role && <div className="text-slate-600 text-sm">{t.role}</div>}
          <div className="flex justify-center gap-4 mt-4">
            <button aria-label="Previous" onClick={prev} className="px-3 py-1 rounded bg-white border border-slate-300 shadow-sm">‹</button>
            <button aria-label="Next" onClick={next} className="px-3 py-1 rounded bg-white border border-slate-300 shadow-sm">›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
