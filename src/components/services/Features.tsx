import React from 'react';

import type { FeatureItem } from './types';
interface FeaturesProps { items: FeatureItem[]; columns?: 2 | 3 | 4; }

const Features: React.FC<FeaturesProps> = ({ items, columns = 3 }) => {
  const cols = columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className={`grid grid-cols-1 ${cols} gap-6`}>
          {items.map((f, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center">
                  <i className={`fa ${f.icon ?? 'fa-check'} text-blue-600`} aria-hidden="true"></i>
                </div>
                <div className="font-semibold">{f.title}</div>
              </div>
              <p className="text-slate-700 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
