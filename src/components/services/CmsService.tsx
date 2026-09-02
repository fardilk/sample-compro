import React from 'react';
import Hero from './Hero';
import Metrics from './Metrics';
import Features from './Features';
import IconList from './IconList';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import ContactCTA from './ContactCTA';
import type { CmsService as Service } from '../../lib/cms';

/**
 * Renders a service page from CMS data.
 *
 * Every section here is static, so the page hydrates nothing and ships no
 * JavaScript. The template only decides the headings and the order: the
 * repeating groups are the same shape in all three, which is why one component
 * covers them.
 */

type Labels = {
  highlights: string;
  steps: string;
  outcomes: string;
  proofs: string;
  plans: string;
  faqs: string;
};

const LABELS: Record<string, Labels> = {
  program: {
    highlights: 'Untuk Siapa Program Ini',
    steps: 'Silabus',
    outcomes: 'Yang Akan Anda Kuasai',
    proofs: 'Kata Peserta',
    plans: 'Investasi',
    faqs: 'Pertanyaan Umum',
  },
  engagement: {
    highlights: 'Apakah Ini Masalah Anda',
    steps: 'Tahapan Kerja',
    outcomes: 'Yang Anda Terima',
    proofs: 'Hasil di Lapangan',
    plans: 'Model Kerja Sama',
    faqs: 'Pertanyaan Umum',
  },
  retainer: {
    highlights: 'Cakupan Layanan',
    steps: 'Proses dan Komitmen Waktu',
    outcomes: 'Kepatuhan dan Jaminan',
    proofs: 'Hasil di Lapangan',
    plans: 'Model Biaya',
    faqs: 'Pertanyaan Umum',
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

const CmsService: React.FC<{ service: Service; heroImage?: string }> = ({ service, heroImage }) => {
  const labels = LABELS[service.template] ?? LABELS.program;

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

      {service.intro && (
        <section className="bg-white py-10">
          <div className="mx-auto" style={{ width: '90%' }}>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700">{service.intro}</p>
          </div>
        </section>
      )}

      {service.metrics.length > 0 && (
        <Metrics items={service.metrics.map((m) => ({ label: m.label, value: m.value }))} />
      )}

      {service.highlights.length > 0 && (
        <section className="bg-white pt-12">
          <div className="mx-auto" style={{ width: '90%' }}>
            <h2 className="text-2xl font-bold md:text-3xl">{labels.highlights}</h2>
          </div>
          <Features
            items={service.highlights.map((h) => ({ icon: h.icon, title: h.title, text: h.body }))}
            columns={service.highlights.length === 4 ? 4 : 3}
          />
        </section>
      )}

      {service.outcomes.length > 0 && (
        <IconList
          title={labels.outcomes}
          items={service.outcomes.map((o) => ({ title: o.text, icon: o.icon || 'fa-check' }))}
          columns={2}
        />
      )}

      {service.steps.length > 0 && (
        <section className="bg-slate-50 py-12">
          <div className="mx-auto" style={{ width: '90%' }}>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">{labels.steps}</h2>
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
                      {step.meta && (
                        <span className="text-sm text-slate-500">{step.meta}</span>
                      )}
                    </div>
                    {step.body && <p className="mt-1 text-slate-700">{step.body}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.schedules.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto" style={{ width: '90%' }}>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Jadwal Terdekat</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.schedules.map((s, i) => (
                <div key={s.id ?? i} className="rounded-xl border border-slate-200 p-5">
                  <p className="font-semibold text-slate-900">{formatRange(s.starts_at, s.ends_at)}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {[s.city, s.format].filter(Boolean).join(' · ')}
                  </p>
                  {s.price && <p className="mt-2 font-medium text-slate-800">{s.price}</p>}
                  {s.seats_total > 0 && (
                    <p className="mt-1 text-sm text-slate-500">
                      Sisa {s.seats_left} dari {s.seats_total} kursi
                    </p>
                  )}
                  <a
                    href={s.register_url || '/home/contact'}
                    className="mt-4 inline-block rounded-md bg-orange-main px-4 py-2 font-semibold text-white hover:bg-orange-dark"
                  >
                    Daftar
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.plans.length > 0 && (
        <section className="bg-white pt-12">
          <div className="mx-auto" style={{ width: '90%' }}>
            <h2 className="text-2xl font-bold md:text-3xl">{labels.plans}</h2>
          </div>
        </section>
      )}

      {service.plans.length > 0 && (
        <Pricing
          plans={service.plans.map((p) => ({
            name: p.name,
            price: [p.price, p.note].filter(Boolean).join(' — '),
            features: p.features ?? [],
          }))}
        />
      )}

      {service.proofs.length > 0 && (
        <section className="bg-white pt-12">
          <div className="mx-auto" style={{ width: '90%' }}>
            <h2 className="text-2xl font-bold md:text-3xl">{labels.proofs}</h2>
          </div>
        </section>
      )}

      {service.proofs.length > 0 && (
        <Testimonials
          items={service.proofs.map((p) => ({
            name: p.name,
            role: [p.role, p.company].filter(Boolean).join(', ') || undefined,
            text: p.quote || p.result,
          }))}
        />
      )}

      {service.faqs.length > 0 && (
        <FAQ items={service.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      )}

      <ContactCTA
        content={{
          title: `Bicarakan kebutuhan ${service.title} Anda`,
          subtitle: 'Konsultasi awal tanpa biaya. Kami balas dalam 1x24 jam kerja.',
          primaryTo: '/home/contact',
          primaryText: 'Hubungi Kami',
          secondaryTo: '/services',
          secondaryText: 'Lihat Layanan Lain',
        }}
      />
    </>
  );
};

export default CmsService;
