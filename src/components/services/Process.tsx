import React from 'react';

import type { ProcessStep } from './types';
interface ProcessProps { steps: ProcessStep[]; }

const Process: React.FC<ProcessProps> = ({ steps }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Step {i + 1}</div>
              <div className="font-semibold mb-1">{s.title}</div>
              <p className="text-slate-700 text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
