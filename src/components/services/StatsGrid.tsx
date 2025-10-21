import React from 'react';
import type { StatsGridContent } from './types';

const StatsGrid: React.FC<StatsGridContent> = ({ items, columns = 4, title, subtitle }) => {
  const cols = columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4';
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-1">{title}</h2>}
            {subtitle && <div className="text-slate-700">{subtitle}</div>}
          </div>
        )}
        <div className={`grid grid-cols-1 ${cols} gap-6`}>
          {items.map((s, i) => (
            <div key={i} className="bg-slate-900 text-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-md bg-slate-700/50 flex items-center justify-center">
                  <i className={`fa ${s.icon ?? 'fa-bolt'} text-yellow-400`} aria-hidden="true"></i>
                </div>
                <div className="text-2xl font-extrabold">{s.value}</div>
              </div>
              <div className="text-slate-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
