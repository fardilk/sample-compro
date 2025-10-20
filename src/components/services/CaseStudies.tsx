import React from 'react';

import type { CaseStudyItem } from './types';
interface CaseStudiesProps { items: CaseStudyItem[]; }

const CaseStudies: React.FC<CaseStudiesProps> = ({ items }) => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              {c.image && <img src={c.image} alt={c.title} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <div className="font-semibold mb-1">{c.title}</div>
                <p className="text-slate-700 text-sm">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
