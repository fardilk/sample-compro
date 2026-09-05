import React from 'react';
import type { PricingContent } from './types';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

type PricingProps = PricingContent & {
  title?: string;
  tone?: Tone;
  highlightIndex?: number;
  /** Where a plan's button books a seat; the catalogue page when unset. */
  reserveHref?: string;
};

/**
 * The price columns.
 *
 * The figure and the note used to be joined with an em dash and printed at
 * 30px together, so a plan read "[isi investasi] — 15–17 September 2026,
 * daring via Zoom. Kuota terbatas." in one enormous line. They are separate
 * things and are laid out as such: the price large, the note beneath it in
 * body text.
 *
 * A price that is not a figure is not printed as one. "Hubungi kami" is an
 * invitation, not an amount, and a bracketed value is an editor's note — both
 * are shown in ordinary type so the eye does not read them as a number.
 */

/** True when the text is an actual amount rather than an invitation or a note. */
const isAmount = (value: string) => /\d/.test(value) && !value.includes('[');

const Pricing: React.FC<PricingProps> = ({
  plans,
  title,
  tone,
  highlightIndex,
  reserveHref = '/reserve-program',
}) => (
  <Section title={title} tone={tone}>
    <div
      className={`grid gap-5 ${plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
    >
      {plans.map((plan, i) => {
        const featured = i === highlightIndex;
        const amount = typeof plan.price === 'string' ? plan.price : '';

        return (
          <div
            key={i}
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white ${
              featured ? 'border-orange-main shadow-lg' : 'border-slate-200 shadow-sm'
            }`}
          >
            {featured && (
              <div className="bg-orange-main px-6 py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-white">
                Paling banyak dipilih
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-semibold text-slate-900">{plan.name}</h3>

              <p
                className={
                  isAmount(amount)
                    ? 'mt-2 text-3xl font-extrabold leading-tight text-slate-900'
                    : 'mt-2 text-lg font-semibold text-slate-700'
                }
              >
                {amount}
              </p>

              {plan.note && <p className="mt-2 text-sm text-slate-600">{plan.note}</p>}

              <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <Icon
                      name="fa-check"
                      size={17}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={reserveHref}
                className={`mt-6 inline-block rounded-lg px-5 py-3 text-center font-semibold transition-colors ${
                  featured
                    ? 'bg-orange-main text-white hover:bg-orange-dark'
                    : 'border border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                Ambil Kursi Ini
              </a>
            </div>
          </div>
        );
      })}
    </div>
  </Section>
);

export default Pricing;
