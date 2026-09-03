import React from 'react';
import Section from './Section';
import type { Tone } from './Section';

interface Metric {
  label: string;
  value: string;
}
interface MetricsProps {
  items: Metric[];
  title?: string;
  tone?: Tone;
}

/** The numbers that make a claim concrete, shown large enough to be the claim. */
const Metrics: React.FC<MetricsProps> = ({ items, title, tone }) => (
  <Section title={title} tone={tone}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="text-3xl font-extrabold text-orange-main md:text-4xl">{m.value}</div>
          <div className="mt-1 text-sm text-slate-600">{m.label}</div>
        </div>
      ))}
    </div>
  </Section>
);

export default Metrics;
