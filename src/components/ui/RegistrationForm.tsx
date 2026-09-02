import React from "react";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  company_address: string;
  division: string;
  position: string;
  city: string;
  certificate_address: string;
  referral_source: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof Values, string>>;

const LEADS_ENDPOINT = "/admin-api/api/leads";
const THANK_YOU = "/registration/terima-kasih";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  company_address: "",
  division: "",
  position: "",
  city: "",
  certificate_address: "",
  referral_source: "",
  message: "",
};

const REFERRALS = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "Rekan/kolega",
  "Lainnya",
];

const fieldClass = (invalid: boolean) =>
  `w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
    invalid
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-orange-400"
  }`;

const labelClass = "mb-1 block text-sm font-medium text-gray-700";

type FieldProps = {
  name: keyof Values;
  label: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  rows?: number;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
};

/**
 * Defined here rather than inside the form: a component declared in a render
 * body is a new type on every keystroke, which unmounts the input and drops
 * the caret after the first character.
 */
const Field: React.FC<FieldProps> = ({
  name,
  label,
  hint,
  type = "text",
  autoComplete,
  rows,
  value,
  error,
  onChange,
}) => (
  <div>
    <label htmlFor={name} className={labelClass}>
      {label} <span className="text-red-500">*</span>
      {hint && <span className="ml-1 font-normal text-gray-500">{hint}</span>}
    </label>
    {rows ? (
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={fieldClass(Boolean(error))}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={fieldClass(Boolean(error))}
      />
    )}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

type Props = {
  /** slug -> title, so the page can name the programme being registered for. */
  programs?: Record<string, string>;
};

const RegistrationForm: React.FC<Props> = ({ programs = {} }) => {
  const [form, setForm] = React.useState<Values>(empty);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // Hidden from people, so anything that fills it is automated. The API drops
  // the submission and answers as though it succeeded.
  const [honeypot, setHoneypot] = React.useState("");

  // Which programme this registration is for, taken from the link followed.
  const [program, setProgram] = React.useState("");

  React.useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("program");
    if (slug) setProgram(slug);
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    const required: Array<[keyof Values, string]> = [
      ["name", "Nama lengkap wajib diisi"],
      ["email", "Email wajib diisi"],
      ["phone", "Nomor handphone wajib diisi"],
      ["company", "Instansi/perusahaan wajib diisi"],
      ["company_address", "Alamat perusahaan wajib diisi"],
      ["division", "Divisi/departemen wajib diisi"],
      ["position", "Jabatan wajib diisi"],
      ["city", "Kota domisili wajib diisi"],
      ["certificate_address", "Alamat pengiriman sertifikat wajib diisi"],
      ["referral_source", "Mohon pilih salah satu"],
    ];

    for (const [field, message] of required) {
      if (!form[field].trim()) next[field] = message;
    }
    if (form.email.trim() && !emailRegex.test(form.email)) {
      next.email = "Format email tidak valid";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Send the visitor to the first thing they need to correct, rather than
      // leaving them to hunt for it in a form this long.
      document
        .querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ block: "center" });
      return;
    }

    setSubmitting(true);
    setFailed(false);

    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          kind: "registration",
          website: honeypot,
          source_path: window.location.pathname + window.location.search,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (res.status === 400 && data?.fields) {
          setErrors(data.fields as FieldErrors);
          return;
        }
        setFailed(true);
        return;
      }

      const target = program
        ? `${THANK_YOU}?program=${encodeURIComponent(program)}`
        : THANK_YOU;
      window.location.href = target;
    } catch {
      // Offline, or the API is down. Never swallow this: the visitor is told,
      // and handed a channel that does not depend on our server.
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      {program && (
        <div className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-dark">
          Pendaftaran: <strong>{programs[program] ?? program}</strong>
        </div>
      )}

      <Field
        name="name"
        label="Nama lengkap"
        hint="(sesuai yang dicetak di sertifikat)"
        autoComplete="name"
        value={form.name}
        error={errors.name}
        onChange={onChange}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={onChange}
        />
        <Field
          name="phone"
          label="No. handphone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          error={errors.phone}
          onChange={onChange}
        />
      </div>

      <Field
        name="company"
        label="Instansi/perusahaan"
        autoComplete="organization"
        value={form.company}
        error={errors.company}
        onChange={onChange}
      />
      <Field
        name="company_address"
        label="Alamat perusahaan"
        rows={2}
        value={form.company_address}
        error={errors.company_address}
        onChange={onChange}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="division"
          label="Divisi/departemen"
          value={form.division}
          error={errors.division}
          onChange={onChange}
        />
        <Field
          name="position"
          label="Jabatan saat ini"
          autoComplete="organization-title"
          value={form.position}
          error={errors.position}
          onChange={onChange}
        />
      </div>

      <Field
        name="city"
        label="Kota domisili saat ini"
        autoComplete="address-level2"
        value={form.city}
        error={errors.city}
        onChange={onChange}
      />
      <Field
        name="certificate_address"
        label="Alamat pengiriman sertifikat"
        hint="(lengkap dengan kode pos)"
        rows={2}
        value={form.certificate_address}
        error={errors.certificate_address}
        onChange={onChange}
      />

      <div>
        <label htmlFor="referral_source" className={labelClass}>
          Mendapat info dari <span className="text-red-500">*</span>
        </label>
        <select
          id="referral_source"
          name="referral_source"
          value={form.referral_source}
          onChange={onChange}
          aria-invalid={Boolean(errors.referral_source)}
          className={fieldClass(Boolean(errors.referral_source))}
        >
          <option value="">— Pilih —</option>
          {REFERRALS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.referral_source && (
          <p className="mt-1 text-sm text-red-600">{errors.referral_source}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Catatan <span className="font-normal text-gray-500">(opsional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={form.message}
          onChange={onChange}
          placeholder="Mendaftarkan beberapa peserta, permintaan invoice, atau hal lain yang perlu kami tahu."
          className={fieldClass(false)}
        />
      </div>

      {/* Hidden from people; only a script fills this in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {failed && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Pendaftaran gagal terkirim. Coba lagi, atau hubungi kami di{" "}
          <a
            className="font-semibold underline"
            href="https://wa.me/6281292934488"
          >
            0812 9293 4488
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-orange-main px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
      >
        {submitting ? "Mengirim…" : "Kirim Pendaftaran"}
      </button>

      <p className="text-sm text-gray-500">
        Kami menghubungi Anda dalam 1x24 jam kerja untuk konfirmasi kuota dan
        pembayaran. Data ini hanya dipakai untuk keperluan pendaftaran dan
        penerbitan sertifikat.
      </p>
    </form>
  );
};

export default RegistrationForm;
