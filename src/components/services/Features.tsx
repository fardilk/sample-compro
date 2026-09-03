import React from 'react';
import type { FeatureItem } from './types';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

interface FeaturesProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  title?: string;
  subtitle?: string;
  tone?: Tone;
}

const Features: React.FC<FeaturesProps> = ({ items, columns = 3, title, subtitle, tone }) => {
  const cols =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
        ? 'md:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <Section title={title} subtitle={subtitle} tone={tone}>
      <div className={`grid grid-cols-1 ${cols} gap-5`}>
        {items.map((f, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50">
              <Icon name={f.icon ?? 'fa-check'} size={22} className="text-orange-main" />
            </div>
            <div className="font-semibold text-slate-900">{f.title}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Features;
