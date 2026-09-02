import React from 'react';

type EventItem = {
  id: string;
  title: string;
  description?: string;
  datetime: string; // ISO string
  image?: string;
  registerUrl?: string;
};

const computeRemaining = (targetIso: string) => {
  const now = new Date();
  const target = new Date(targetIso);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const secs = Math.floor(diff / 1000);
  const days = Math.floor(secs / (3600 * 24));
  const hours = Math.floor((secs % (3600 * 24)) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  return { days, hours, mins };
};

// Fixed locale and time zone: the default formatter uses the server's locale at
// build time and the visitor's in the browser, which produces two different
// strings for the same instant and a hydration mismatch.
const dateFormat = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

const pad = (n: number) => String(n).padStart(2, '0');

const Unit: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="px-2 py-2 text-center sm:px-4 sm:py-3">
    <div className="text-xl font-bold tabular-nums sm:text-2xl">{value}</div>
    <div className="text-[0.625rem] tracking-wide text-white/80 sm:text-xs">{label}</div>
  </div>
);

const UpcomingEventCard: React.FC<{ event: EventItem }> = ({ event }) => {
  const [time, setTime] = React.useState(() => computeRemaining(event.datetime));

  // The countdown is computed once at build time and again in the browser, so
  // the two never agree. Hold placeholders until mounted rather than hydrating
  // over a stale number.
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const tick = () => setTime(computeRemaining(event.datetime));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [event.datetime]);

  const units = [
    { value: mounted ? pad(time.days) : '--', label: 'DAYS' },
    { value: mounted ? pad(time.hours) : '--', label: 'HOURS' },
    { value: mounted ? pad(time.mins) : '--', label: 'MINS' },
  ];

  return (
    <div className="upcoming-event-card overflow-hidden rounded-md bg-blue-800 text-white">
      {/* Stacks on phones and becomes a single row from sm up. As one rigid row
          the countdown and the Register button were pushed off-screen. */}
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="flex items-center gap-3 p-4 sm:flex-1 sm:gap-0 sm:p-0">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-white/10 sm:h-32 sm:w-32 sm:rounded-none">
            <img
              src={event.image ?? '/img/mr-edi.png'}
              alt=""
              width={80}
              height={80}
              className="h-12 w-12 object-contain sm:h-20 sm:w-20"
            />
          </div>

          <div className="min-w-0 sm:flex-1 sm:px-4 sm:py-4">
            <h3 className="text-base font-semibold leading-snug sm:text-lg">{event.title}</h3>
            {event.description && (
              <p className="mt-0.5 text-sm text-white/80">{event.description}</p>
            )}
            <div className="mt-1.5 flex items-center gap-2 text-xs text-white/70 sm:mt-2 sm:text-sm">
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{dateFormat.format(new Date(event.datetime))}</span>
            </div>
          </div>
        </div>

        <div className="flex items-stretch justify-around border-t border-white/20 sm:justify-start sm:border-t-0">
          {units.map((u) => (
            <div key={u.label} className="border-white/20 sm:border-l [&:not(:first-child)]:border-l">
              <Unit value={u.value} label={u.label} />
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 p-4 sm:flex sm:items-center sm:border-l sm:border-t-0 sm:px-4 sm:py-3">
          <a
            href={event.registerUrl ?? '/home/contact'}
            className="block w-full rounded-md bg-yellow-400 px-4 py-2.5 text-center font-semibold text-blue-900 hover:opacity-95 sm:w-auto sm:py-2"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

const UpcomingEvent: React.FC = () => {
  // ponytail: hardcoded until the schedule comes from the CMS. The date is
  // always "tomorrow", which is visibly fake if anyone looks twice.
  const sample: EventItem = {
    id: '1',
    title: 'NEXT SCHEDULE: SERTIFIKASI BNSP',
    description: '09:00 - 16:30',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    image: '/img/mr-edi.png',
    registerUrl: '/home/contact',
  };

  return (
    <section className="upcoming-events-area container mx-auto px-4 py-6">
      <UpcomingEventCard event={sample} />
    </section>
  );
};

export default UpcomingEvent;
