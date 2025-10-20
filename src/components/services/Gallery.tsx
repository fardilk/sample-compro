import React from 'react';
import type { GalleryContent } from './types';

const Gallery: React.FC<GalleryContent> = ({ items, columns = 3, title, subtitle }) => {
  const cols = columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';
  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-1">{title}</h2>}
            {subtitle && <div className="text-slate-700">{subtitle}</div>}
          </div>
        )}
        <div className={`grid grid-cols-1 ${cols} gap-4`}>
          {items.map((g, i) => (
            <figure key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <img src={g.src} alt={g.alt ?? ''} className="w-full h-48 object-cover" />
              {(g.caption) && (
                <figcaption className="p-3 text-slate-700 text-sm">{g.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
