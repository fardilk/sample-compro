import React from 'react';
import type { TestimonialItem } from './types';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

/**
 * What past participants said.
 *
 * Every quote here comes from a proof row in the CMS. Nothing is generated to
 * fill the band out: a page with no proofs renders no testimonials at all,
 * because a made-up quote attributed to a named person is not a placeholder,
 * it is a fabricated record.
 *
 * The summary score is the participant rating, and it is only shown when a
 * rating exists, next to the count it was averaged over — a bare "4.9" with no
 * denominator tells a reader nothing.
 */

export type Testimonial = TestimonialItem & {
  /** Company, shown under the name. */
  company?: string;
  /** The outcome they reported, if they gave one. */
  result?: string;
  /** Photograph; initials are drawn when there is none. */
  image?: string;
};

interface TestimonialsProps {
  items: Testimonial[];
  title?: string;
  subtitle?: string;
  tone?: Tone;
  rating?: { score: number; count: number };
}

/** Up to two initials, which is enough to read as a person and never as a word. */
const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const Stars: React.FC<{ score: number }> = ({ score }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${score} dari 5`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <Icon
        key={i}
        name="fa-star"
        size={16}
        weight="fill"
        className={i < Math.round(score) ? 'text-amber-400' : 'text-slate-300'}
      />
    ))}
  </span>
);

const Testimonials: React.FC<TestimonialsProps> = ({ items, title, subtitle, tone, rating }) => (
  <Section title={title} subtitle={subtitle} tone={tone}>
    {rating && (
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-200 bg-white px-5 py-4">
        <span className="text-3xl font-extrabold text-slate-900">{rating.score.toFixed(1)}</span>
        <Stars score={rating.score} />
        <span className="text-sm text-slate-600">
          rata-rata dari {rating.count} peserta yang sudah menyelesaikan program
        </span>
      </div>
    )}

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <figure
          key={i}
          className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <Icon name="fa-quote-left" size={22} className="text-orange-200" weight="fill" />

          <blockquote className="mt-2 flex-1 text-slate-800">{t.text}</blockquote>

          {t.result && (
            <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
              {t.result}
            </p>
          )}

          <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
            {t.image ? (
              <img
                src={t.image}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-dark">
                {initialsOf(t.name)}
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate font-semibold text-slate-900">{t.name}</span>
              {(t.role || t.company) && (
                <span className="block truncate text-sm text-slate-600">
                  {[t.role, t.company].filter(Boolean).join(', ')}
                </span>
              )}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  </Section>
);

export default Testimonials;
