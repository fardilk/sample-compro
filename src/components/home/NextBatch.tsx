import React from 'react';
import Icon from '../global/Icon';

export type NextBatchProps = {
  title: string;
  href: string;
  startsAt: string;
  endsAt?: string | null;
  city?: string;
  format?: string;
  seatsLeft?: number;
  seatsTotal?: number;
  registerUrl?: string;
  image?: string;
};

const remaining = (targetIso: string) => {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const secs = Math.floor(diff / 1000);
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
  };
};

const dateFormat = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

const shortDate = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Asia/Jakarta',
});

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Countdown to the next open batch, driven by the schedule set in the CMS.
 *
 * The previous version counted down to `Date.now() + 1 day`, so it always read
 * "tomorrow" and was visibly false to anyone who looked twice.
 */
const NextBatch: React.FC<NextBatchProps> = ({
  title,
  href,
  startsAt,
  endsAt,
  city,
  format,
  seatsLeft,
  seatsTotal,
  registerUrl,
  image,
}) => {
  const [time, setTime] = React.useState(() => remaining(startsAt));

  // Computed at build and again in the browser, so hold placeholders until
  // mounted rather than hydrating over a stale number.
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const tick = () => setTime(remaining(startsAt));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [startsAt]);

  const started = mounted && time.days === 0 && time.hours === 0 && time.mins === 0;

  const range =
    endsAt && new Date(endsAt).toDateString() !== new Date(startsAt).toDateString()
      ? `${shortDate.format(new Date(startsAt))} – ${dateFormat.format(new Date(endsAt))}`
      : dateFormat.format(new Date(startsAt));

  const units = [
    { value: mounted ? pad(time.days) : '--', label: 'HARI' },
    { value: mounted ? pad(time.hours) : '--', label: 'JAM' },
    { value: mounted ? pad(time.mins) : '--', label: 'MENIT' },
  ];

  return (
    <section className="border-y border-orange-200 bg-orange-50 text-slate-900">
      <div className="mx-auto flex flex-col gap-6 py-8 lg:flex-row lg:items-center" style={{ width: '90%' }}>
        {image && (
          <img
            src={image}
            alt=""
            width={320}
            height={200}
            className="h-40 w-full shrink-0 rounded-xl object-cover lg:h-32 lg:w-56"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Batch terdekat
          </p>
          <h2 className="mt-1 text-xl font-bold leading-snug md:text-2xl">
            <a href={href} className="hover:underline">
              {title}
            </a>
          </h2>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Icon name="fa-calendar" size={16} color="currentColor" />
              {range}
            </span>
            {(city || format) && (
              <span className="flex items-center gap-1.5">
                <Icon name="fa-map-marker-alt" size={16} color="currentColor" />
                {[city, format === 'online' ? 'Online' : null].filter(Boolean).join(' · ')}
              </span>
            )}
            {typeof seatsLeft === 'number' && seatsLeft > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="fa-users" size={16} color="currentColor" />
                Sisa {seatsLeft}
                {seatsTotal ? ` dari ${seatsTotal}` : ''} kursi
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {started ? (
            <p className="text-sm font-semibold text-orange-dark">Sedang berlangsung</p>
          ) : (
            <div className="flex items-stretch">
              {units.map((u, i) => (
                <div
                  key={u.label}
                  className={`px-3 text-center sm:px-4 ${i > 0 ? 'border-l border-orange-200' : ''}`}
                >
                  <div className="text-2xl font-bold tabular-nums">{u.value}</div>
                  <div className="text-[0.625rem] tracking-wide text-slate-500">{u.label}</div>
                </div>
              ))}
            </div>
          )}

          <a
            href={registerUrl || href}
            className="shrink-0 rounded-lg bg-orange-main px-5 py-2.5 font-semibold text-white hover:bg-orange-dark"
          >
            Daftar
          </a>
        </div>
      </div>
    </section>
  );
};

export default NextBatch;
