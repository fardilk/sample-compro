import React from 'react';
import Icon from '../global/Icon';
import Section from './Section';
import type { Tone } from './Section';

/**
 * The case for the qualification itself, four blocks, two to a row.
 *
 * Each one leads with a figure rather than an adjective, and names where the
 * figure came from. The link is what separates a claim from an argument: a
 * reader who does not believe "47%" can go and read why, and the block only
 * grows a button when there is somewhere to send them.
 *
 * The hover is the whole card, not the button: the orange ground arrives
 * behind the content and the card lifts a little toward the top left, so the
 * thing under the cursor is obviously one target. It is done with transform
 * and colour only — both composited, so a grid of these does not cost a
 * repaint — and the whole effect is dropped for a visitor who asked for less
 * motion.
 */

export type Reason = {
  icon?: string;
  stat?: string;
  title: string;
  body?: string;
  source?: string;
  linkHref?: string;
  linkText?: string;
};

const Reasons: React.FC<{
  items: Reason[];
  title?: string;
  subtitle?: string;
  tone?: Tone;
}> = ({ items, title, subtitle, tone }) => (
  <Section title={title} subtitle={subtitle} tone={tone}>
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, i) => (
        <article
          key={i}
          className="group relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:border-orange-main hover:bg-orange-main hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50 transition-colors duration-300 group-hover:bg-white/15">
            <Icon
              name={item.icon ?? 'fa-shield'}
              size={26}
              className="text-orange-main transition-colors duration-300 group-hover:text-white"
            />
          </div>

          <div className="min-w-0">
            {item.stat && (
              <p className="text-2xl font-extrabold leading-tight text-orange-main transition-colors duration-300 group-hover:text-white md:text-3xl">
                {item.stat}
              </p>
            )}
            <h3 className="mt-0.5 font-semibold text-slate-900 transition-colors duration-300 group-hover:text-white">
              {item.title}
            </h3>
            {item.body && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white/90">
                {item.body}
              </p>
            )}
            {item.source && (
              <p className="mt-2 text-xs text-slate-500 transition-colors duration-300 group-hover:text-white/75">
                {item.source}
              </p>
            )}

            {item.linkHref && (
              // Stretched so the whole card is the click target, while the
              // link itself stays a real link for a keyboard and a screen
              // reader rather than a click handler on a div.
              <a
                href={item.linkHref}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-main after:absolute after:inset-0 after:content-[''] hover:underline group-hover:text-white"
              >
                {item.linkText || 'Baca selengkapnya'}
                <Icon name="fa-arrow-right" size={14} color="currentColor" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default Reasons;
