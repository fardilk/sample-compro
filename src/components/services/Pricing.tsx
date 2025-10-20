import React from 'react';

import type { PricingContent } from './types';
type PricingProps = PricingContent;

const Pricing: React.FC<PricingProps> = ({ plans }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="font-bold text-lg mb-1">{p.name}</div>
              <div className="text-3xl font-extrabold mb-3">{p.price}</div>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                {p.features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
