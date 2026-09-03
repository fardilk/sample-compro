import React from 'react';
import type { CatalogCategory } from '../../data/programCatalog';
import Icon from '../global/Icon';
import { Honeypot, SelectField, SubmitFailed, TextField, type ChangeEvent } from './leadForm';
import { emailRegex, focusFirstError, submitLead } from '../../lib/leadApi';

/**
 * The discovery form behind "Book consultation!".
 *
 * It is deliberately not a registration: nothing is being booked, so it asks
 * what the problem is and what shape a solution could take, and never for the
 * details that only matter once a seat is paid for.
 */

type Values = {
  program_category: string;
  program_slug: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  participants: string;
  delivery_mode: string;
  preferred_batch: string;
  budget_range: string;
  message: string;
  preferred_contact: string;
  referral_source: string;
};

const empty: Values = {
  program_category: '',
  program_slug: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  participants: '',
  delivery_mode: '',
  preferred_batch: '',
  budget_range: '',
  message: '',
  preferred_contact: '',
  referral_source: '',
};

const PARTICIPANTS = ['1 orang', '2-5 orang', '6-15 orang', '16-30 orang', 'Lebih dari 30 orang'];
const DELIVERY = ['In-house (di tempat Anda)', 'Public class', 'Online', 'Belum tahu'];
const TIMELINE = ['Bulan ini', '1-3 bulan ke depan', '3-6 bulan ke depan', 'Masih menjajaki'];
const BUDGET = [
  'Di bawah 25 juta',
  '25-50 juta',
  '50-100 juta',
  'Di atas 100 juta',
  'Belum ada angka',
];
const CONTACT = ['WhatsApp', 'Telepon', 'Email'];
const REFERRALS = ['Instagram', 'LinkedIn', 'Facebook', 'Google', 'Rekan/kolega', 'Lainnya'];

const asOptions = (values: string[]) => values.map((value) => ({ value, label: value }));

const REQUIRED: Array<[keyof Values, string]> = [
  ['program_category', 'Pilih bidang yang ingin dibahas'],
  ['name', 'Nama lengkap wajib diisi'],
  ['email', 'Email wajib diisi'],
  ['phone', 'Nomor handphone wajib diisi'],
  ['company', 'Instansi/perusahaan wajib diisi'],
  ['position', 'Jabatan wajib diisi'],
  ['message', 'Ceritakan kebutuhan atau tantangan Anda'],
  ['preferred_contact', 'Pilih cara kami menghubungi Anda'],
];

type Props = { catalog: CatalogCategory[] };

const ConsultationForm: React.FC<Props> = ({ catalog }) => {
  const [form, setForm] = React.useState<Values>(empty);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState('');

  // Arriving from a service page, the area is already known. Read after mount
  // so the static HTML stays identical for every query string.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wantedCategory = params.get('category');
    const wantedProgram = params.get('program');
    if (!wantedCategory && !wantedProgram) return;

    // Trust the link only as far as the catalogue confirms it, so a stale URL
    // cannot preselect something the picker no longer offers.
    const found =
      catalog.find((c) => c.slug === wantedCategory) ??
      catalog.find((c) => c.items.some((i) => i.slug === wantedProgram));
    if (!found) return;

    setForm((prev) => ({
      ...prev,
      program_category: found.slug,
      program_slug: found.items.find((i) => i.slug === wantedProgram)?.slug ?? '',
    }));
  }, [catalog]);

  const category = catalog.find((c) => c.slug === form.program_category) ?? null;
  const chosen = category?.items.find((i) => i.slug === form.program_slug) ?? null;

  const onChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // The programme list is rebuilt from the new parent, so a child left over
      // from the previous one would be submitted against the wrong category.
      ...(name === 'program_category' ? { program_slug: '' } : {}),
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Partial<Record<keyof Values, string>> = {};
    for (const [field, message] of REQUIRED) {
      if (!form[field].trim()) next[field] = message;
    }
    if (form.email.trim() && !emailRegex.test(form.email)) {
      next.email = 'Format email tidak valid';
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Wait for the invalid flags to render before hunting for one.
      window.requestAnimationFrame(focusFirstError);
      return;
    }

    setSubmitting(true);
    setFailed(false);
    const result = await submitLead({ ...form, kind: 'consultation', website: honeypot });
    setSubmitting(false);

    if (result.ok) {
      setDone(true);
      return;
    }
    if ('fields' in result) {
      setErrors(result.fields as Partial<Record<keyof Values, string>>);
      window.requestAnimationFrame(focusFirstError);
      return;
    }
    setFailed(true);
  };

  if (done) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-green-600">
          <Icon name="fa-check" size={26} color="currentColor" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900">Permintaan Anda sudah masuk</h2>
        <p className="mt-2 text-slate-700">
          Tim kami membaca kebutuhan Anda dan menghubungi lewat{' '}
          <strong>{form.preferred_contact}</strong> dalam 1x24 jam kerja untuk menjadwalkan sesi
          konsultasi.
        </p>
        <a
          href="/services"
          className="mt-5 inline-block rounded-lg bg-orange-main px-5 py-2.5 font-semibold text-white hover:bg-orange-dark"
        >
          Lihat layanan kami
        </a>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-orange-main">
          1. Apa yang ingin dibahas
        </legend>

        <SelectField
          name="program_category"
          label="Bidang yang ingin dibahas"
          required
          value={form.program_category}
          error={errors.program_category}
          onChange={onChange}
          options={catalog.map((c) => ({ value: c.slug, label: c.label }))}
        />

        <SelectField
          name="program_slug"
          label="Program spesifik"
          hint={category ? '' : '(pilih bidangnya dulu)'}
          value={form.program_slug}
          error={errors.program_slug}
          onChange={onChange}
          disabled={!category}
          placeholder="Belum tahu — bantu pilihkan"
          options={(category?.items ?? []).map((i) => ({ value: i.slug, label: i.title }))}
        />

        {chosen && (chosen.blurb || chosen.audience) && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
            {chosen.blurb && <p className="text-slate-700">{chosen.blurb}</p>}
            {chosen.audience && (
              <p className="mt-1 text-slate-500">
                <strong className="font-semibold text-slate-600">Cocok untuk:</strong>{' '}
                {chosen.audience}
              </p>
            )}
          </div>
        )}

        <TextField
          name="message"
          label="Kebutuhan atau tantangan Anda saat ini"
          required
          rows={4}
          placeholder="Contoh: turnover supervisor tinggi dan tim baru belum siap memimpin. Kami ingin tahu program apa yang paling masuk akal."
          value={form.message}
          error={errors.message}
          onChange={onChange}
        />
      </fieldset>

      <fieldset className="space-y-5 border-t border-slate-200 pt-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-orange-main">
          2. Gambaran pelaksanaan
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="participants"
            label="Perkiraan jumlah peserta"
            value={form.participants}
            error={errors.participants}
            onChange={onChange}
            options={asOptions(PARTICIPANTS)}
          />
          <SelectField
            name="delivery_mode"
            label="Format yang diinginkan"
            value={form.delivery_mode}
            error={errors.delivery_mode}
            onChange={onChange}
            options={asOptions(DELIVERY)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="preferred_batch"
            label="Target waktu pelaksanaan"
            value={form.preferred_batch}
            error={errors.preferred_batch}
            onChange={onChange}
            options={asOptions(TIMELINE)}
          />
          <SelectField
            name="budget_range"
            label="Kisaran anggaran"
            hint="(supaya opsi yang kami susun realistis)"
            value={form.budget_range}
            error={errors.budget_range}
            onChange={onChange}
            options={asOptions(BUDGET)}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-slate-200 pt-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-orange-main">
          3. Cara menghubungi Anda
        </legend>

        <TextField
          name="name"
          label="Nama lengkap"
          required
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={onChange}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="email"
            label="Email"
            required
            type="email"
            autoComplete="email"
            value={form.email}
            error={errors.email}
            onChange={onChange}
          />
          <TextField
            name="phone"
            label="No. handphone"
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            error={errors.phone}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="company"
            label="Instansi/perusahaan"
            required
            autoComplete="organization"
            value={form.company}
            error={errors.company}
            onChange={onChange}
          />
          <TextField
            name="position"
            label="Jabatan"
            required
            autoComplete="organization-title"
            value={form.position}
            error={errors.position}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="preferred_contact"
            label="Kami hubungi lewat"
            required
            value={form.preferred_contact}
            error={errors.preferred_contact}
            onChange={onChange}
            options={asOptions(CONTACT)}
          />
          <SelectField
            name="referral_source"
            label="Mendapat info dari"
            value={form.referral_source}
            error={errors.referral_source}
            onChange={onChange}
            options={asOptions(REFERRALS)}
          />
        </div>
      </fieldset>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      {failed && <SubmitFailed />}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-orange-main px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
      >
        {submitting ? 'Mengirim…' : 'Kirim Permintaan Konsultasi'}
      </button>

      <p className="text-sm text-gray-500">
        Konsultasi awal tidak dipungut biaya dan tidak mengikat. Data ini hanya dipakai untuk
        menyiapkan rekomendasi program Anda.
      </p>
    </form>
  );
};

export default ConsultationForm;
