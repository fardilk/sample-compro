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
  subtitle?: string;
  tone?: Tone;
}

/** The numbers that make a claim concrete, shown large enough to be the claim. */
const Metrics: React.FC<MetricsProps> = ({ items, title, subtitle, tone }) => (
  <Section title={title} subtitle={subtitle} tone={tone}>
    {/* Three across when the count divides by three, four otherwise, so the
        last row is never a lone card stranded beside empty columns. */}
    <div
      className={`grid gap-4 sm:grid-cols-2 ${
        items.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
      }`}
    >
      {items.map((m, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm"
        >
          <div className="text-2xl font-extrabold text-orange-main md:text-3xl">{m.value}</div>
          <div className="mt-1 text-sm text-slate-600">{m.label}</div>
        </div>
      ))}
    </div>
  </Section>
);

export default Metrics;
