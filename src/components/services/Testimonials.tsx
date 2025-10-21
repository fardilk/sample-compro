import React from 'react';

import type { TestimonialItem } from './types';
interface TestimonialsProps { items: TestimonialItem[]; }

const Testimonials: React.FC<TestimonialsProps> = ({ items }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <i className="fa fa-quote-left text-amber-500" aria-hidden="true"></i>
              <p className="text-slate-800 my-3">{t.text}</p>
              <div className="text-sm text-slate-600">{t.name}{t.role ? `, ${t.role}` : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
