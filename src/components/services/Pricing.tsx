import React from 'react';
import type { PricingContent } from './types';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

type PricingProps = PricingContent & { title?: string; tone?: Tone; highlightIndex?: number };

/**
 * Plans sit on a shared baseline: the name and the figure line up across every
 * card whatever the feature list does, so the eye compares prices rather than
 * hunting for them.
 */
const Pricing: React.FC<PricingProps> = ({ plans, title, tone, highlightIndex }) => (
  <Section title={title} tone={tone}>
    <div
      className={`grid gap-5 ${plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
    >
      {plans.map((p, i) => {
        const featured = i === highlightIndex;
        return (
          <div
            key={i}
            className={`flex flex-col rounded-xl border bg-white p-6 shadow-sm ${
              featured ? 'border-orange-main ring-1 ring-orange-main' : 'border-slate-200'
            }`}
          >
            {featured && (
              <span className="mb-2 w-fit rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-dark">
                Paling banyak dipilih
              </span>
            )}
            <div className="font-semibold text-slate-900">{p.name}</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {p.features.map((f, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <Icon
                    name="fa-check"
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600"
                    weight="fill"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="/reserve-program"
              className="mt-5 inline-block rounded-lg bg-orange-main px-5 py-2.5 text-center font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Reservasi Kursi
            </a>
          </div>
        );
      })}
    </div>
  </Section>
);

export default Pricing;
