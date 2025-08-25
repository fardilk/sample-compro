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
  const s = secs % 60;
  return { days, hours, mins, secs: s };
};

const UpcomingEventCard: React.FC<{ event: EventItem }> = ({ event }) => {
  const [time, setTime] = React.useState(() => computeRemaining(event.datetime));

  React.useEffect(() => {
    const t = setInterval(() => setTime(computeRemaining(event.datetime)), 1000);
    return () => clearInterval(t);
  }, [event.datetime]);

  return (
    <div className="upcoming-event-card bg-blue-800 text-white rounded-md overflow-hidden flex items-center">
      {/* 1. Image */}
      <div className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 bg-white/10 flex items-center justify-center">
        <img src={event.image ?? '/img/mr-edi.png'} alt={event.title} className="w-20 h-20 object-contain" />
      </div>

      {/* 2. Title / Desc / Date */}
      <div className="flex-1 px-4 py-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {event.description && <p className="text-sm text-white/80 mt-1">{event.description}</p>}
        <div className="text-sm mt-2 flex items-center gap-3 text-white/70">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>{new Date(event.datetime).toLocaleString()}</span>
        </div>
      </div>

      {/* 3. Countdown */}
      <div className="px-4 py-3 text-center border-l border-white/20">
        <div className="text-2xl font-bold">{String(time.days).padStart(2, '0')}</div>
        <div className="text-xs text-white/80">DAYS</div>
      </div>

      <div className="px-4 py-3 text-center border-l border-white/20">
        <div className="text-2xl font-bold">{String(time.hours).padStart(2, '0')}</div>
        <div className="text-xs text-white/80">HOURS</div>
      </div>

      <div className="px-4 py-3 text-center border-l border-white/20">
        <div className="text-2xl font-bold">{String(time.mins).padStart(2, '0')}</div>
        <div className="text-xs text-white/80">MINS</div>
      </div>

      {/* 4. Register button */}
      <div className="px-4 py-3 border-l border-white/20">
        <a
          href={event.registerUrl ?? '#'}
          className="inline-block bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-md hover:opacity-95"
        >
          Register
        </a>
      </div>
    </div>
  );
};

const UpcomingEvent: React.FC = () => {
  const sample: EventItem = {
    id: '1',
    title: 'NEXT SCHEDULE: SERTIFIKASI BNSP',
    description: '09:00 - 16:30',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 day
    image: '/img/mr-edi.png',
    registerUrl: '#'
  };

  return (
    <section className="upcoming-events-area container mx-auto px-4 py-6">
      <UpcomingEventCard event={sample} />
    </section>
  );
};

export default UpcomingEvent;
