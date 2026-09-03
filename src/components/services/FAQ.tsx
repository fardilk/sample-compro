import React from 'react';
import type { QnAItem } from './types';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

interface FAQProps {
  items: QnAItem[];
  title?: string;
  tone?: Tone;
}

/**
 * The band used to render with no heading at all, so a list of questions
 * appeared under nothing. The label existed in the template all along; it was
 * never passed in.
 */
const FAQ: React.FC<FAQProps> = ({ items, title, tone }) => (
  <Section title={title} tone={tone}>
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {items.map((qa, i) => (
        <details key={i} className="group p-4 open:bg-slate-50/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
            {qa.q}
            <Icon
              name="fa-chevron-down"
              size={16}
              className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-2.5 text-slate-700">{qa.a}</p>
        </details>
      ))}
    </div>
  </Section>
);

export default FAQ;
