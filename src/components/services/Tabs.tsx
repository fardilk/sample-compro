import React, { useState } from 'react';
import type { TabsContent, TabItem } from './types';

const Tabs: React.FC<TabsContent> = ({ tabs, title, subtitle }) => {
  const [active, setActive] = useState(0);
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-1">{title}</h2>}
            {subtitle && <div className="text-slate-700">{subtitle}</div>}
          </div>
        )}
        <div className="border-b border-slate-200 flex gap-4">
          {tabs.map((t: TabItem, i: number) => (
            <button
              key={i}
              className={`py-2 px-3 -mb-px border-b-2 ${active === i ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-600'}`}
              onClick={() => setActive(i)}
            >
              {t.title}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <div className="prose prose-slate max-w-none">{tabs[active]?.content}</div>
        </div>
      </div>
    </section>
  );
};

export default Tabs;
