import React from 'react';
import Icon from '../global/Icon';

export type ProgramCard = {
  href: string;
  title: string;
  blurb: string;
  /** Formatted at build time; the card itself renders no dates. */
  date?: string;
  price?: string;
  cover?: string;
  icon?: string;
};

export type ProgramGroup = {
  label: string;
  blurb: string;
  items: ProgramCard[];
};

/**
 * The catalogue that replaced the company-profile homepage: every programme we
 * actually have content for, grouped by category, scrolling the length of the
 * page. What a visitor came to find is what the page now leads with.
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
              >
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt=""
                    width={600}
                    height={340}
                    loading="lazy"
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-slate-100">
                    <Icon name={item.icon ?? 'fa-chalkboard-teacher'} size={30} className="text-orange-main" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  {item.date && (
                    <span className="mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-dark">
                      <Icon name="fa-calendar" size={12} color="currentColor" />
                      {item.date}
                    </span>
                  )}
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-slate-600">{item.blurb}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-900">
                      {item.price ?? 'Hubungi kami'}
                    </span>
                    <span className="text-sm font-medium text-orange-main">Lihat detail</span>
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
