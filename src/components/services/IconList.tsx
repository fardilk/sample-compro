import React from 'react';
import type { IconListContent } from './types';

const IconList: React.FC<IconListContent> = ({ items, columns = 2, title, subtitle }) => {
  const cols = columns === 3 ? 'lg:grid-cols-3' : columns === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
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
          {items.map((it, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl shadow-sm bg-white">
              <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <i className={`fa ${it.icon ?? 'fa-check'} text-emerald-700`} aria-hidden="true"></i>
              </div>
              <div>
                <div className="font-semibold mb-1">{it.title}</div>
                {it.text && <div className="text-slate-700 text-sm">{it.text}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconList;
