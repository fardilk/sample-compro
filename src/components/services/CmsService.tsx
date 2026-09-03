import React from 'react';
import Hero from './Hero';
import Section from './Section';
import type { Tone } from './Section';
import Metrics from './Metrics';
import Features from './Features';
import IconList from './IconList';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import ContactCTA from './ContactCTA';
import Icon from '../global/Icon';
import { ratingOf } from '../../data/programRatings';
import type { CmsService as Service } from '../../lib/cms';

/**
 * Renders a service page from CMS data.
 *
 * Every section here is static, so the page hydrates nothing and ships no
 * JavaScript. The template only decides the headings and the order: the
 * repeating groups are the same shape in all three, which is why one component
 * covers them.
 *
 * Sections are assembled as a list and given their background afterwards, so
 * no two adjacent bands can share one. Done inline, the page ran six white
 * bands in a row and read as a single undifferentiated column — the same rule
 * the homepage already follows.
 */

type Labels = {
  highlights: string;
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
    steps: 'Silabus',
    outcomes: 'Yang Akan Anda Kuasai',
    proofs: 'Kata Peserta',
    plans: 'Investasi',
    faqs: 'Pertanyaan Umum',
    schedules: 'Jadwal Terdekat',
    metrics: 'Program Ini dalam Angka',
  },
  engagement: {
    highlights: 'Apakah Ini Masalah Anda',
    steps: 'Tahapan Kerja',
    outcomes: 'Yang Anda Terima',
    proofs: 'Hasil di Lapangan',
    plans: 'Model Kerja Sama',
    faqs: 'Pertanyaan Umum',
    schedules: 'Jadwal Terdekat',
    metrics: 'Layanan Ini dalam Angka',
  },
  retainer: {
    highlights: 'Cakupan Layanan',
    steps: 'Proses dan Komitmen Waktu',
    outcomes: 'Kepatuhan dan Jaminan',
    proofs: 'Hasil di Lapangan',
    plans: 'Model Biaya',
    faqs: 'Pertanyaan Umum',
    schedules: 'Jadwal Terdekat',
    metrics: 'Layanan Ini dalam Angka',
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
  const rating = ratingOf(`${service.category}/${service.slug}`);

  // Each entry renders one band. Built as a list so the alternation below is
  // computed rather than hand-maintained, and stays right when a service has
  // no plans, no schedule, or no proofs.
  const blocks: Array<(tone: Tone) => React.ReactNode> = [];

  if (service.intro) {
    blocks.push((tone) => (
      <Section key="intro" tone={tone}>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-700">{service.intro}</p>
      </Section>
    ));
  }

  if (service.metrics.length > 0) {
    blocks.push((tone) => (
      <Metrics
        key="metrics"
        tone={tone}
        title={labels.metrics}
        items={service.metrics.map((m) => ({ label: m.label, value: m.value }))}
      />
    ));
  }

  if (service.highlights.length > 0) {
    blocks.push((tone) => (
      <Features
        key="highlights"
        tone={tone}
        title={labels.highlights}
        items={service.highlights.map((h) => ({ icon: h.icon, title: h.title, text: h.body }))}
        columns={service.highlights.length === 4 ? 4 : 3}
      />
    ));
  }

  if (service.outcomes.length > 0) {
    blocks.push((tone) => (
      <IconList
        key="outcomes"
        tone={tone}
        title={labels.outcomes}
        items={service.outcomes.map((o) => ({ title: o.text, icon: o.icon || 'fa-check' }))}
        columns={2}
      />
    ));
  }

  if (service.steps.length > 0) {
    blocks.push((tone) => (
      <Section key="steps" tone={tone} title={labels.steps}>
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
    ));
  }

  if (service.schedules.length > 0) {
    blocks.push((tone) => (
      <Section
        key="schedules"
        tone={tone}
        title={labels.schedules}
        subtitle="Kursi dikonfirmasi setelah pembayaran diterima."
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
                href={
                  s.register_url ||
                  `/reserve-program?category=${service.category}&program=${service.slug}`
                }
                className="mt-4 inline-block rounded-lg bg-orange-main px-4 py-2.5 text-center font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Reservasi Kursi
              </a>
            </div>
          ))}
        </div>
      </Section>
    ));
  }

  if (service.plans.length > 0) {
    blocks.push((tone) => (
      <Pricing
        key="plans"
        tone={tone}
        title={labels.plans}
        plans={service.plans.map((p) => ({
          name: p.name,
          price: [p.price, p.note].filter(Boolean).join(' — '),
          features: p.features ?? [],
        }))}
        highlightIndex={service.plans.findIndex((p) => p.highlighted)}
      />
    ));
  }

  if (service.proofs.length > 0) {
    blocks.push((tone) => (
      <Testimonials
        key="proofs"
        tone={tone}
        title={labels.proofs}
        rating={rating}
        items={service.proofs.map((p) => ({
          name: p.name,
          role: p.role || undefined,
          company: p.company || undefined,
          text: p.quote || p.result,
          result: p.quote ? p.result || undefined : undefined,
        }))}
      />
    ));
  }

  if (service.faqs.length > 0) {
    blocks.push((tone) => (
      <FAQ
        key="faqs"
        tone={tone}
        title={labels.faqs}
        items={service.faqs.map((f) => ({ q: f.question, a: f.answer }))}
      />
    ));
  }

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

      {blocks.map((render, i) => render(i % 2 === 0 ? 'white' : 'muted'))}

      <ContactCTA
        content={{
          title: `Bicarakan kebutuhan ${service.title} Anda`,
          subtitle: 'Konsultasi awal tanpa biaya. Kami balas dalam 1x24 jam kerja.',
          primaryTo: '/book-consultation',
          primaryText: 'Book Consultation',
          secondaryTo: `/reserve-program?category=${service.category}&program=${service.slug}`,
          secondaryText: 'Reservasi Program',
        }}
      />
    </>
  );
};

export default CmsService;
