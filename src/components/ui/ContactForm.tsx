import React from 'react';
import SuccessModal from './SuccessModal';
import Icon from '../global/Icon';

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export type ContactFormProps = {
  className?: string;
  buttonLabel?: string;
  onSuccess?: (values: ContactFormValues) => void;
};

// Same origin as the site, so this is a plain first-party request with no CORS
// involved.
const LEADS_ENDPOINT = '/admin-api/api/leads';

const WHATSAPP =
  'https://wa.me/6281292934488?text=Halo%20Excellence%20Plus%20Indonesia%2C%20saya%20ingin%20bertanya%20soal%20program%20training%20dan%20coaching.';

const initialForm: ContactFormValues = { name: '', email: '', phone: '', company: '', message: '' };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const fieldClass = (invalid: boolean) =>
  `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
    invalid ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'
  }`;

const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  buttonLabel = 'Kirim Pesan',
  onSuccess,
}) => {
  const [form, setForm] = React.useState<ContactFormValues>(initialForm);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // Hidden from people, so anything that fills it is automated. The value is
  // posted as-is and the API drops the submission.
  const [honeypot, setHoneypot] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = 'Nama wajib diisi';
    if (!form.email.trim()) next.email = 'Email wajib diisi';
    else if (!emailRegex.test(form.email)) next.email = 'Format email tidak valid';
    if (!form.phone.trim()) next.phone = 'Nomor telepon wajib diisi';
    if (!form.message.trim()) next.message = 'Pesan wajib diisi';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setFailed(false);

    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          website: honeypot,
          source_path: window.location.pathname,
        }),
      });

      if (!res.ok) {
        // The API returns per-field messages for a rejected submission; show
        // those rather than a generic failure.
        const data = await res.json().catch(() => null);
        if (res.status === 400 && data?.fields) {
          setErrors(data.fields as FieldErrors);
          return;
        }
        setFailed(true);
        return;
      }

      onSuccess?.(form);
      setShowSuccess(true);
      setForm(initialForm);
    } catch {
      // Offline, or the API is down. Never swallow this: the visitor is told,
      // and handed a channel that does not depend on our server.
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form className="relative space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={onChange}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              className={fieldClass(!!errors.email)}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="08xx xxxx xxxx"
              value={form.phone}
              onChange={onChange}
              className={fieldClass(!!errors.phone)}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Perusahaan <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={onChange}
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Ceritakan kebutuhan Anda, jumlah peserta, dan perkiraan waktu."
            value={form.message}
            onChange={onChange}
            className={fieldClass(!!errors.message)}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {failed && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm">
            <p className="font-medium text-amber-900">Pesan belum terkirim.</p>
            <p className="mt-1 text-amber-800">
              Koneksi ke server sedang bermasalah. Silakan hubungi kami langsung lewat WhatsApp
              agar pesan Anda tidak hilang.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 font-semibold text-white hover:bg-green-700"
            >
              <Icon name="fa-comments" />
              Chat WhatsApp
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-orange-main px-4 py-2.5 font-semibold text-white transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Mengirim…' : buttonLabel}
        </button>
      </form>

      <SuccessModal
        open={showSuccess}
        title="Pesan terkirim"
        message={
          <span>
            Terima kasih. Tim kami akan menghubungi Anda melalui WhatsApp atau email dalam 1x24 jam
            kerja.
          </span>
        }
        onClose={() => setShowSuccess(false)}
        actionLabel="Selesai"
      />
    </div>
  );
};

export default ContactForm;
