import React, { useState } from 'react';
import type { AccordionContent, AccordionItem } from './types';

const Accordion: React.FC<AccordionContent> = ({ items, title, subtitle }) => {
  const [open, setOpen] = useState<number | null>(0);
  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));
  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-1">{title}</h2>}
            {subtitle && <div className="text-slate-700">{subtitle}</div>}
          </div>
        )}
        <div className="divide-y divide-slate-200 bg-white border border-slate-200 rounded-xl shadow-sm">
          {items.map((it: AccordionItem, i: number) => (
            <div key={i}>
              <button onClick={() => toggle(i)} className="w-full text-left p-4 flex justify-between items-center">
                <span className="font-medium">{it.title}</span>
                <i className={`fa ${open === i ? 'fa-chevron-up' : 'fa-chevron-down'} text-slate-500`}></i>
              </button>
              {open === i && (
                <div className="p-4 pt-0 text-slate-700 text-sm">{it.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
