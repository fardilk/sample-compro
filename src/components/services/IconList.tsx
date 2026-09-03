import React from 'react';
import type { IconListContent } from './types';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

const IconList: React.FC<IconListContent & { tone?: Tone }> = ({
  items,
  columns = 2,
  title,
  subtitle,
  tone,
}) => {
  const cols =
    columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : columns === 1 ? '' : 'md:grid-cols-2';

  return (
    <Section title={title} subtitle={typeof subtitle === 'string' ? subtitle : undefined} tone={tone}>
      <div className={`grid grid-cols-1 ${cols} gap-4`}>
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <Icon name={it.icon ?? 'fa-check'} size={19} className="text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="font-medium leading-snug text-slate-900">{it.title}</div>
              {it.text && <div className="mt-1 text-sm text-slate-600">{it.text}</div>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default IconList;
