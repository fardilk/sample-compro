import React from 'react';
import type { TimelineContent } from './types';

const Timeline: React.FC<TimelineContent> = ({ items, title, subtitle }) => {
  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-1">{title}</h2>}
            {subtitle && <div className="text-slate-700">{subtitle}</div>}
          </div>
        )}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden="true"></div>
          <div className="space-y-8">
            {items.map((it, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={`relative grid md:grid-cols-2 gap-6 items-start`}>
                  <div className={`md:pr-10 ${isLeft ? '' : 'md:order-2 md:pl-10'}`}>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">{it.period ?? `Step ${i + 1}`}</div>
                      <div className="font-semibold mb-1">{it.title}</div>
                      <div className="text-slate-700 text-sm">{it.text}</div>
                    </div>
                  </div>
                  <div className={`hidden md:block ${isLeft ? 'md:pl-10 md:order-2' : 'md:pr-10'}`}>
                    {it.image && (
                      <img src={it.image} alt={it.title} className="w-full h-48 object-cover rounded-xl shadow" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
