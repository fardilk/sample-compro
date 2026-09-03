import React from 'react';
import type { CatalogCategory } from '../../data/programCatalog';
import { Honeypot, SelectField, SubmitFailed, TextField, type ChangeEvent } from './leadForm';
import { emailRegex, focusFirstError, submitLead } from '../../lib/leadApi';

/**
 * The booking form behind "Reserve Program".
 *
 * A reservation holds a seat; it is not yet a registration. The certificate
 * details are collected later, on /registration, once payment is agreed — this
 * form only has to establish which programme, how many people, and when.
 */

type Values = {
  program_category: string;
  program_slug: string;
  preferred_batch: string;
  delivery_mode: string;
  participants: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  city: string;
  preferred_contact: string;
  referral_source: string;
  message: string;
};

const empty: Values = {
  program_category: '',
  program_slug: '',
  preferred_batch: '',
  delivery_mode: '',
  participants: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  city: '',
  preferred_contact: '',
  referral_source: '',
  message: '',
};

const THANK_YOU = '/registration/terima-kasih';

const PARTICIPANTS = ['1 orang', '2-5 orang', '6-15 orang', '16-30 orang', 'Lebih dari 30 orang'];
const DELIVERY = ['Public class', 'In-house (di tempat Anda)', 'Online'];
const CONTACT = ['WhatsApp', 'Telepon', 'Email'];
const REFERRALS = ['Instagram', 'LinkedIn', 'Facebook', 'Google', 'Rekan/kolega', 'Lainnya'];

/** Offered when no batch fits, so a reservation is never blocked by the calendar. */
const OPEN_DATE = 'Jadwal lain — hubungi saya';

const asOptions = (values: string[]) => values.map((value) => ({ value, label: value }));

const REQUIRED: Array<[keyof Values, string]> = [
  ['program_category', 'Pilih kategori program'],
  ['program_slug', 'Pilih program yang ingin direservasi'],
  ['delivery_mode', 'Pilih format pelaksanaan'],
  ['participants', 'Pilih jumlah peserta'],
  ['name', 'Nama lengkap wajib diisi'],
  ['email', 'Email wajib diisi'],
  ['phone', 'Nomor handphone wajib diisi'],
  ['company', 'Instansi/perusahaan wajib diisi'],
  ['preferred_contact', 'Pilih cara kami menghubungi Anda'],
];

type Props = { catalog: CatalogCategory[] };

const ReserveProgramForm: React.FC<Props> = ({ catalog }) => {
  const [form, setForm] = React.useState<Values>(empty);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState('');

  // Arriving from a programme page, both levels are already decided. Read after
  // mount so the static HTML stays identical for every query string.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wantedProgram = params.get('program');
    const wantedCategory = params.get('category');
    if (!wantedProgram && !wantedCategory) return;

    // Trust the link only as far as the catalogue confirms it, so a stale URL
    // cannot preselect a programme that no longer exists.
    const category =
      catalog.find((c) => c.slug === wantedCategory) ??
      catalog.find((c) => c.items.some((i) => i.slug === wantedProgram));
    if (!category) return;

    const item = category.items.find((i) => i.slug === wantedProgram);
    setForm((prev) => ({
      ...prev,
      program_category: category.slug,
      program_slug: item?.slug ?? '',
    }));
  }, [catalog]);

  const category = catalog.find((c) => c.slug === form.program_category) ?? null;
  const chosen = category?.items.find((i) => i.slug === form.program_slug) ?? null;
  const batches = chosen?.batches ?? [];

  const onChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // The child list is rebuilt from the new parent, and the batches from the
      // new child; either left over would be submitted against the wrong thing.
      ...(name === 'program_category' ? { program_slug: '', preferred_batch: '' } : {}),
      ...(name === 'program_slug' ? { preferred_batch: '' } : {}),
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
    const result = await submitLead({ ...form, kind: 'reservation', website: honeypot });
    setSubmitting(false);

    if (result.ok) {
      window.location.href = `${THANK_YOU}?program=${encodeURIComponent(form.program_slug)}`;
      return;
    }
    if ('fields' in result) {
      setErrors(result.fields as Partial<Record<keyof Values, string>>);
      window.requestAnimationFrame(focusFirstError);
      return;
    }
    setFailed(true);
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-orange-main">
          1. Program yang direservasi
        </legend>

        <SelectField
          name="program_category"
          label="Kategori program"
          required
          value={form.program_category}
          error={errors.program_category}
          onChange={onChange}
          options={catalog.map((c) => ({ value: c.slug, label: c.label }))}
        />

        <SelectField
          name="program_slug"
          label="Program"
          required
          hint={category ? '' : '(pilih kategorinya dulu)'}
          value={form.program_slug}
          error={errors.program_slug}
          onChange={onChange}
          disabled={!category}
          options={(category?.items ?? []).map((i) => ({ value: i.slug, label: i.title }))}
        />

        {chosen && (
          <div className="rounded-md border border-orange-200 bg-orange-50 p-4 text-sm">
            <p className="font-semibold text-slate-900">{chosen.title}</p>
            {chosen.blurb && <p className="mt-1 text-slate-700">{chosen.blurb}</p>}
            {chosen.audience && (
              <p className="mt-2 text-slate-600">
                <strong className="font-semibold">Cocok untuk:</strong> {chosen.audience}
              </p>
            )}
            <a
              href={`/services/${form.program_category}/${chosen.slug}`}
              className="mt-2 inline-block font-semibold text-orange-dark hover:underline"
            >
              Lihat detail program
            </a>
          </div>
        )}
      </fieldset>

      <fieldset className="space-y-5 border-t border-slate-200 pt-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-orange-main">
          2. Jadwal dan peserta
        </legend>

        <SelectField
          name="preferred_batch"
          label="Batch yang dipilih"
          hint={
            chosen && batches.length === 0
              ? '(belum ada batch terjadwal — kami hubungi begitu dibuka)'
              : ''
          }
          value={form.preferred_batch}
          error={errors.preferred_batch}
          onChange={onChange}
          disabled={!chosen}
          placeholder={OPEN_DATE}
          options={asOptions(batches)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="delivery_mode"
            label="Format pelaksanaan"
            required
            value={form.delivery_mode}
            error={errors.delivery_mode}
            onChange={onChange}
            options={asOptions(DELIVERY)}
          />
          <SelectField
            name="participants"
            label="Jumlah peserta"
            required
            value={form.participants}
            error={errors.participants}
            onChange={onChange}
            options={asOptions(PARTICIPANTS)}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-slate-200 pt-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-orange-main">
          3. Data pemesan
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
            autoComplete="organization-title"
            value={form.position}
            error={errors.position}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="city"
            label="Kota"
            autoComplete="address-level2"
            value={form.city}
            error={errors.city}
            onChange={onChange}
          />
          <SelectField
            name="preferred_contact"
            label="Kami hubungi lewat"
            required
            value={form.preferred_contact}
            error={errors.preferred_contact}
            onChange={onChange}
            options={asOptions(CONTACT)}
          />
        </div>

        <SelectField
          name="referral_source"
          label="Mendapat info dari"
          value={form.referral_source}
          error={errors.referral_source}
          onChange={onChange}
          options={asOptions(REFERRALS)}
        />

        <TextField
          name="message"
          label="Catatan"
          rows={3}
          placeholder="Nama peserta lain, permintaan invoice atas nama perusahaan, kebutuhan khusus, dan sebagainya."
          value={form.message}
          error={errors.message}
          onChange={onChange}
        />
      </fieldset>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      {failed && <SubmitFailed />}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-orange-main px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
      >
        {submitting ? 'Mengirim…' : 'Reservasi Program'}
      </button>

      <p className="text-sm text-gray-500">
        Reservasi belum mengikat pembayaran. Kami konfirmasi ketersediaan kursi dan mengirim invoice
        dalam 1x24 jam kerja; data sertifikat diisi setelah pembayaran.
      </p>
    </form>
  );
};

export default ReserveProgramForm;
