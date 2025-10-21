import React from 'react';
import type { CardGridContent } from './types';
import { Link } from 'react-router-dom';

const CardGrid: React.FC<CardGridContent> = ({ items, columns = 3, title, subtitle }) => {
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
        <div className={`grid grid-cols-1 ${cols} gap-6`}>
          {items.map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
              {c.image && <img src={c.image} alt={c.title} className="w-full h-40 object-cover rounded-md mb-3" />}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center">
                  <i className={`fa ${c.icon ?? 'fa-star'} text-blue-600`} aria-hidden="true"></i>
                </div>
                <div className="font-semibold">{c.title}</div>
              </div>
              <div className="text-slate-700 text-sm flex-1">{c.text}</div>
              {(c.to || c.linkText) && (
                <div className="mt-4">
                  <Link to={c.to ?? '#'} className="text-blue-600 hover:underline font-medium">
                    {c.linkText ?? 'Learn more'}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
