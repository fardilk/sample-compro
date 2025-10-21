import React from 'react';

interface Metric { label: string; value: string; }
interface MetricsProps { items: Metric[]; }

const Metrics: React.FC<MetricsProps> = ({ items }) => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {items.map((m, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="text-3xl font-bold mb-1">{m.value}</div>
              <div className="text-slate-600">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
