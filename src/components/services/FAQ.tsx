import React from 'react';

import type { QnAItem } from './types';
interface FAQProps { items: QnAItem[]; }

const FAQ: React.FC<FAQProps> = ({ items }) => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="divide-y divide-slate-200 border border-slate-200 rounded-md bg-white">
          {items.map((qa, i) => (
            <details key={i} className="p-4">
              <summary className="font-semibold cursor-pointer">{qa.q}</summary>
              <p className="text-slate-700 mt-2">{qa.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
