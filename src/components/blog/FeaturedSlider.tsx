import React from 'react';

export type FeaturedItem = {
  slug: string;
  title: string;
  excerpt: string;
  meta: string;
  image?: string;
};

/** The only interactive part of /blog, so it is the only island the page ships. */
const FeaturedSlider: React.FC<{ items: FeaturedItem[] }> = ({ items }) => {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const current = items[idx];
  if (!current) return null;

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Artikel Pilihan</h2>
        {items.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              aria-label="Sebelumnya"
              className="cursor-pointer rounded-md border border-slate-300 px-3 py-1"
              onClick={() => setIdx((p) => (p - 1 + items.length) % items.length)}
            >
              &larr;
            </button>
            <button
              aria-label="Berikutnya"
              className="cursor-pointer rounded-md border border-slate-300 px-3 py-1"
              onClick={() => setIdx((p) => (p + 1) % items.length)}
            >
              &rarr;
            </button>
          </div>
        )}
      </div>

      <a
        href={`/blog/${current.slug}`}
        className="grid grid-cols-1 gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:grid-cols-[18rem_1fr]"
      >
        <div className="p-4 sm:p-0">
          {current.image ? (
            <img
              src={current.image}
              alt={current.title}
              width={600}
              height={400}
              className="h-64 w-full rounded-lg object-cover sm:h-full sm:rounded-none sm:rounded-l-xl"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-lg bg-slate-100 text-slate-300 sm:h-full sm:rounded-none">
              <i className="fa fa-newspaper text-3xl" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="flex flex-col p-5">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-main">
            Artikel pilihan
          </span>
          <h3 className="mb-2 text-xl font-bold md:text-2xl">{current.title}</h3>
          <p className="mb-4 text-slate-700">{current.excerpt}</p>
          <span className="mt-auto text-sm text-slate-500">{current.meta}</span>
        </div>
      </a>

      {items.length > 1 && (
        <div className="mt-4 flex gap-1">
          {items.map((item, i) => (
            <button
              key={item.slug}
              aria-label={`Ke slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 w-2.5 rounded-full ${i === idx ? 'bg-orange-main' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedSlider;
