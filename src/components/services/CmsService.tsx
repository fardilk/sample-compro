import React from 'react';
import Hero from './Hero';
import Section from './Section';
import type { Tone } from './Section';
import Metrics from './Metrics';
import Features from './Features';
import Reasons from './Reasons';
import IconList from './IconList';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import ContactCTA from './ContactCTA';
import Icon from '../global/Icon';
import type { CmsSection, CmsService as Service } from '../../lib/cms';

/**
 * Renders a service page from CMS data.
 *
 * Every section here is static, so the page hydrates nothing and ships no
 * JavaScript. The repeating groups are the same shape in all three templates,
 * which is why one component covers them.
 *
 * The arrangement — which bands appear, in what order, under what heading and
 * on what background — comes from the CMS, so laying out a new service is done
 * in the panel rather than here. A service that has never been arranged falls
 * back to the order and wording below, which is what every page did before the
 * panel could express it, so nothing had to be migrated.
 *
 * A band set to "auto" takes its background from its position among the other
 * auto bands, so no two adjacent ones match. Pinned inline, the page ran six
 * white bands in a row and read as one undifferentiated column.
 */

/** The arrangement used when the CMS holds none. */
const DEFAULT_ORDER = [
  'intro',
  'metrics',
  'highlights',
  'reasons',
  'outcomes',
  'steps',
  'schedules',
  'plans',
  'proofs',
  'faqs',
  'cta',
];

type Labels = {
  highlights: string;
  reasons: string;
  steps: string;
  outcomes: string;
  proofs: string;
  plans: string;
  faqs: string;
  schedules: string;
  metrics: string;
};

const LABELS: Record<string, Labels> = {
  program: {
    highlights: 'Untuk Siapa Program Ini',
    reasons: 'Kenapa Anda Harus Tersertifikasi?',
    steps: 'Silabus',
    outcomes: 'Yang Akan Anda Kuasai',
    proofs: 'Apa yang mereka katakan tentang program ini',
    plans: 'Pilih Cara Anda Ikut',
    faqs: 'Pertanyaan Umum',
    schedules: 'Jadwal Terdekat',
    metrics: 'Info Umum Pelatihan',
  },
  engagement: {
    highlights: 'Apakah Ini Masalah Anda',
    reasons: 'Kenapa Ini Layak Dikerjakan',
    steps: 'Tahapan Kerja',
    outcomes: 'Yang Anda Terima',
    proofs: 'Hasil di Lapangan',
    plans: 'Pilih Cara Kita Bekerja Sama',
    faqs: 'Pertanyaan Umum',
    schedules: 'Jadwal Terdekat',
    metrics: 'Info Umum Layanan',
  },
  retainer: {
    highlights: 'Cakupan Layanan',
    reasons: 'Kenapa Lewat Kami',
    steps: 'Proses dan Komitmen Waktu',
    outcomes: 'Kepatuhan dan Jaminan',
    proofs: 'Hasil di Lapangan',
    plans: 'Model Biaya',
    faqs: 'Pertanyaan Umum',
    schedules: 'Jadwal Terdekat',
    metrics: 'Info Umum Layanan',
  },
};

const dateFormat = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

const formatRange = (start: string | null, end: string | null) => {
  if (!start) return 'Jadwal menyusul';
  const from = dateFormat.format(new Date(start));
  if (!end) return from;
  return `${from} – ${dateFormat.format(new Date(end))}`;
};

const shortDate = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

/** Bracketed text is an editor's note in the panel, never a figure to publish. */
const usable = (value: string | null | undefined) =>
  value && value.trim() && !value.includes('[') ? value.trim() : undefined;

/** Inclusive day count, so 15–17 September reads as three days. */
const dayCount = (start: string, end?: string | null) => {
  const from = new Date(start);
  const to = end ? new Date(end) : from;
  return Math.round((to.setHours(0, 0, 0, 0) - from.setHours(0, 0, 0, 0)) / 86_400_000) + 1;
};

/**
 * The general facts about a programme, taken from the batch that is open.
 *
 * These are already in the CMS as structured fields — the dates, the seat
 * count, the format, the price — so asking an editor to retype them as metric
 * rows would only create a second copy to keep in step. Whatever they did
 * write wins: a derived fact whose label is already covered is dropped.
 */
const derivedInfo = (service: Service) => {
  const next = service.schedules
    .filter((s) => s.starts_at)
    .sort((a, b) => new Date(a.starts_at!).getTime() - new Date(b.starts_at!).getTime())
    .find((s) => new Date(s.starts_at!).getTime() > Date.now());
  if (!next) return [];

  const days = dayCount(next.starts_at!, next.ends_at);

  // The city field is already written for a reader ("Daring via Zoom"); the
  // format beside it is the raw enum, so pairing them prints the same thing
  // twice. Only fall back to the enum when there is no city.
  const place = next.city?.trim() || next.format?.trim() || '';

  return [
    { label: 'Durasi', value: days > 0 ? `${days} hari` : '' },
    { label: 'Batch berikutnya', value: shortDate.format(new Date(next.starts_at!)) },
    { label: 'Kuota per batch', value: next.seats_total > 0 ? `${next.seats_total} peserta` : '' },
    { label: 'Pelaksanaan', value: place ? place[0].toUpperCase() + place.slice(1) : '' },
    { label: 'Investasi', value: usable(next.price) ?? '' },
  ].filter((item) => item.value);
};

const CmsService: React.FC<{ service: Service; heroImage?: string }> = ({ service, heroImage }) => {
  const labels = LABELS[service.template] ?? LABELS.program;
  const reserveHref = `/reserve-program?category=${service.category}&program=${service.slug}`;

  // Only shown when the CMS holds both halves. A score with no count says
  // nothing, and neither half is invented here.
  const rating =
    service.rating_score > 0 && service.rating_count > 0
      ? { score: service.rating_score, count: service.rating_count }
      : undefined;

  const asDefault = (key: string): CmsSection => ({
    key,
    title: '',
    subtitle: '',
    tone: 'auto',
    enabled: true,
  });

  // A saved arrangement is followed as given, then any band it does not mention
  // is appended. Omission is not the same as switching a band off: without
  // this, a section added to the template after a page was last arranged would
  // hold content that never appears and gives no clue why.
  //
  // The closing block is pulled to the end regardless. It is the page's sign
  // off, and an appended band landing under it would read as a mistake.
  const saved = service.sections ?? [];
  const named = new Set(saved.map((section) => section.key));
  const missing = DEFAULT_ORDER.filter((key) => key !== 'cta' && !named.has(key)).map(asDefault);
  const arranged: CmsSection[] = saved.length
    ? [
        ...saved.filter((section) => section.key !== 'cta'),
        ...missing,
        ...(saved.filter((section) => section.key === 'cta').length
          ? saved.filter((section) => section.key === 'cta')
          : [asDefault('cta')]),
      ]
    : DEFAULT_ORDER.map(asDefault);

  /** A band's heading: the CMS override, else the template's own wording. */
  const titleOf = (section: CmsSection, fallback?: string) => section.title || fallback;

  // One renderer per band. A band whose group is empty returns null, so
  // switching it on in the panel cannot produce an empty heading on the page.
  const renderers: Record<string, (section: CmsSection, tone: Tone) => React.ReactNode> = {
    intro: (section, tone) =>
      service.intro ? (
        <Section key="intro" tone={tone} title={section.title} subtitle={section.subtitle}>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700">{service.intro}</p>
        </Section>
      ) : null,

    metrics: (section, tone) => {
      const authored = service.metrics.map((m) => ({ label: m.label, value: m.value }));

      // A derived fact is dropped when the editor already wrote it, matched on
      // either half: "3 hari — Durasi" and "3 hari — Pembekalan, bimbingan dan
      // asesmen" are the same fact under two names, and printing both looks
      // like a bug.
      const covered = new Set(
        authored.flatMap((m) => [m.label.trim().toLowerCase(), m.value.trim().toLowerCase()]),
      );
      const items = [
        ...authored,
        ...derivedInfo(service).filter(
          (m) =>
            !covered.has(m.label.toLowerCase()) && !covered.has(m.value.toLowerCase()),
        ),
      ];
      return items.length > 0 ? (
        <Metrics
          key="metrics"
          tone={tone}
          title={titleOf(section, labels.metrics)}
          subtitle={section.subtitle}
          items={items}
        />
      ) : null;
    },

    highlights: (section, tone) =>
      service.highlights.length > 0 ? (
        <Features
          key="highlights"
          tone={tone}
          title={titleOf(section, labels.highlights)}
          subtitle={section.subtitle}
          items={service.highlights.map((h) => ({ icon: h.icon, title: h.title, text: h.body }))}
          columns={service.highlights.length === 4 ? 4 : 3}
        />
      ) : null,

    reasons: (section, tone) =>
      service.reasons.length > 0 ? (
        <Reasons
          key="reasons"
          tone={tone}
          title={titleOf(section, labels.reasons)}
          subtitle={section.subtitle}
          items={service.reasons.map((r) => ({
            icon: r.icon || undefined,
            stat: usable(r.stat),
            title: r.title,
            body: usable(r.body),
            source: usable(r.source),
            linkHref: r.link_href || undefined,
            linkText: r.link_text || undefined,
          }))}
        />
      ) : null,

    outcomes: (section, tone) =>
      service.outcomes.length > 0 ? (
        <IconList
          key="outcomes"
          tone={tone}
          title={titleOf(section, labels.outcomes)}
          subtitle={section.subtitle}
          items={service.outcomes.map((o) => ({ title: o.text, icon: o.icon || 'fa-check' }))}
          columns={2}
        />
      ) : null,

    steps: (section, tone) =>
      service.steps.length > 0 ? (
        <Section
          key="steps"
          tone={tone}
          title={titleOf(section, labels.steps)}
          subtitle={section.subtitle}
        >
          <ol className="space-y-3">
            {service.steps.map((step, i) => (
              <li
                key={step.id ?? i}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-main font-semibold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    {step.meta && <span className="text-sm text-slate-500">{step.meta}</span>}
                  </div>
                  {step.body && <p className="mt-1 text-slate-700">{step.body}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      ) : null,

    schedules: (section, tone) =>
      service.schedules.length > 0 ? (
        <Section
          key="schedules"
          tone={tone}
          title={titleOf(section, labels.schedules)}
          subtitle={section.subtitle || 'Kursi dikonfirmasi setelah pembayaran diterima.'}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.schedules.map((s, i) => (
              <div
                key={s.id ?? i}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="inline-flex items-center gap-2 font-semibold text-slate-900">
                  <Icon name="fa-calendar" size={16} className="text-orange-main" />
                  {formatRange(s.starts_at, s.ends_at)}
                </p>
                <p className="mt-1.5 text-sm text-slate-600">
                  {[s.city, s.format].filter(Boolean).join(' · ')}
                </p>
                {s.price && <p className="mt-2 font-semibold text-slate-900">{s.price}</p>}
                {s.seats_total > 0 && (
                  <p className="mt-1 text-sm text-orange-dark">
                    Sisa {s.seats_left} dari {s.seats_total} kursi
                  </p>
                )}
                <a
                  href={s.register_url || reserveHref}
                  className="mt-4 inline-block rounded-lg bg-orange-main px-4 py-2.5 text-center font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  Reservasi Kursi
                </a>
              </div>
            ))}
          </div>
        </Section>
      ) : null,

    plans: (section, tone) =>
      service.plans.length > 0 ? (
        <Pricing
          key="plans"
          tone={tone}
          title={titleOf(section, labels.plans)}
          reserveHref={reserveHref}
          plans={service.plans.map((p) => ({
            name: p.name,
            price: p.price,
            note: p.note,
            features: p.features ?? [],
          }))}
          highlightIndex={service.plans.findIndex((p) => p.highlighted)}
        />
      ) : null,

    proofs: (section, tone) => {
      // A proof still holding its editor's prompt is not a testimonial. Three
      // live pages were printing "[Ganti dengan testimoni asli...]" under a
      // "Kata Peserta" heading, attributed to "[Nama peserta]", which is worse
      // for a reader than showing no testimonials at all.
      const items = service.proofs
        .map((p) => ({
          name: usable(p.name) ?? '',
          role: usable(p.role),
          company: usable(p.company),
          text: usable(p.quote) ?? usable(p.result) ?? '',
          result: usable(p.quote) ? usable(p.result) : undefined,
          image: p.image || undefined,
        }))
        .filter((p) => p.text && p.name);

      return items.length > 0 ? (
        <Testimonials
          key="proofs"
          tone={tone}
          title={titleOf(section, labels.proofs)}
          subtitle={section.subtitle}
          rating={rating}
          items={items}
        />
      ) : null;
    },

    faqs: (section, tone) =>
      service.faqs.length > 0 ? (
        <FAQ
          key="faqs"
          tone={tone}
          title={titleOf(section, labels.faqs)}
          items={service.faqs.map((f) => ({ q: f.question, a: f.answer }))}
        />
      ) : null,

    // The closing block brings its own colour, so it takes no tone and does not
    // count towards the alternation.
    cta: (section) => (
      <ContactCTA
        key="cta"
        content={{
          title: section.title || service.cta_title || `Bicarakan kebutuhan ${service.title} Anda`,
          subtitle:
            section.subtitle ||
            service.cta_subtitle ||
            'Konsultasi awal tanpa biaya. Kami balas dalam 1x24 jam kerja.',
          primaryTo: '/book-consultation',
          primaryText: 'Book Consultation',
          secondaryTo: reserveHref,
          secondaryText: 'Reservasi Program',
        }}
      />
    ),
  };

  // Rendered first so the alternation counts only the bands that survived: a
  // band whose group is empty must not consume a colour and leave two visible
  // neighbours sharing one.
  let autoIndex = 0;
  const bands = arranged
    .filter((section) => section.enabled !== false && renderers[section.key])
    .map((section) => {
      const fixed = section.tone && section.tone !== 'auto' ? (section.tone as Tone) : null;
      const node = renderers[section.key](section, fixed ?? (autoIndex % 2 === 0 ? 'white' : 'muted'));
      if (node && !fixed && section.key !== 'cta') autoIndex += 1;
      return node;
    })
    .filter(Boolean);

  return (
    <>
      <Hero
        eyebrow={service.hero_eyebrow || undefined}
        title={service.hero_headline || service.title}
        subtitle={service.hero_subheadline || service.subtitle || undefined}
        imageSrc={heroImage}
        primaryText={service.primary_cta_text || undefined}
        primaryTo={service.primary_cta_href || undefined}
        secondaryText={service.secondary_cta_text || undefined}
        secondaryTo={service.secondary_cta_href || undefined}
      />
      {bands}
    </>
  );
};

export default CmsService;
