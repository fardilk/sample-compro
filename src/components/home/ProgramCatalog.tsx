import React from 'react';
import Icon from '../global/Icon';
import ProgramCover from './ProgramCover';

export type ProgramCard = {
  /** "category/slug" — the card's identity, and the seed for its cover art. */
  key: string;
  href: string;
  title: string;
  blurb: string;
  /** Formatted at build time; the card itself renders no dates. */
  date?: string;
  cover?: string;
  icon?: string;
  /** Who the programme is for, in one line. */
  audience?: string;
  /** "3 hari", computed from the batch that is open. */
  duration?: string;
  /** Public class, in-house, online. */
  format?: string;
  seatsLeft?: number;
  rating?: { score: number; count: number };
};

export type ProgramGroup = {
  label: string;
  blurb: string;
  items: ProgramCard[];
};

/**
 * One line of facts under the blurb. Anything we do not hold is left out
 * rather than printed blank, so a sparse card stays tidy instead of showing
 * a row of dashes.
 */
const Meta: React.FC<{ item: ProgramCard }> = ({ item }) => {
  const facts = [item.duration, item.format].filter(Boolean);
  if (!item.rating && facts.length === 0) return null;

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
      {item.rating && (
        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
          <Icon name="fa-star" size={13} weight="fill" className="text-amber-400" />
          {item.rating.score.toFixed(1)}
          <span className="font-normal text-slate-500">({item.rating.count})</span>
        </span>
      )}
      {facts.map((fact) => (
        <React.Fragment key={fact}>
          <span aria-hidden="true">·</span>
          <span>{fact}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * The catalogue that replaced the company-profile homepage: every programme we
 * actually have content for, grouped by category, scrolling the length of the
 * page. What a visitor came to find is what the page now leads with.
 *
 * Four to a row on a laptop, so a whole category is one glance rather than a
 * scroll. Prices are deliberately absent: most programmes are quoted per
 * cohort, and a card that shows a figure for two of them and "hubungi kami"
 * for the rest reads as the cheap ones being hidden.
 */
const ProgramCatalog: React.FC<{ groups: ProgramGroup[] }> = ({ groups }) => (
  <>
    {groups.map((group, index) => (
      <section
        key={group.label}
        id={`kategori-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        className={index % 2 === 0 ? 'bg-white py-14' : 'bg-slate-50 py-14'}
      >
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold md:text-3xl">{group.label}</h2>
            <p className="mt-2 text-slate-600">{group.blurb}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.items.map((item, position) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="relative">
                  {item.cover ? (
                    <img
                      src={item.cover}
                      alt=""
                      width={600}
                      height={488}
                      loading="lazy"
                      className="w-full object-cover"
                      style={{ aspectRatio: '16 / 13' }}
                    />
                  ) : (
                    <ProgramCover seed={item.key} index={position} icon={item.icon} />
                  )}

                  {item.date && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-orange-dark shadow-sm">
                      <Icon name="fa-calendar" size={12} color="currentColor" />
                      {item.date}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.blurb}</p>

                  <Meta item={item} />

                  {item.audience && (
                    <p className="mt-2 line-clamp-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-600">Cocok untuk:</span>{' '}
                      {item.audience}
                    </p>
                  )}

                  {/* Pushed to the bottom so every card in a row ends on the
                      same line however short its blurb is. */}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    {item.seatsLeft !== undefined && item.seatsLeft > 0 ? (
                      <span className="text-xs font-semibold text-orange-dark">
                        Sisa {item.seatsLeft} kursi
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-main">
                      Lihat detail
                      <Icon name="fa-arrow-right" size={13} color="currentColor" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    ))}
  </>
);

export default ProgramCatalog;
