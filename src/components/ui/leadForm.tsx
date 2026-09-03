import React from 'react';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../../lib/leadApi';

/**
 * The inputs every public lead form is built from: one look for a field, one
 * way of showing its error, and the honeypot.
 *
 * RegistrationForm predates this and still carries its own copies. It works and
 * is not being touched here; fold it in the next time it changes.
 */

const fieldClass = (invalid: boolean) =>
  `w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
    invalid ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'
  }`;

const labelClass = 'mb-1 block text-sm font-medium text-gray-700';

export type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
};

const Label: React.FC<{ htmlFor: string; label: string; required?: boolean; hint?: string }> = ({
  htmlFor,
  label,
  required,
  hint,
}) => (
  <label htmlFor={htmlFor} className={labelClass}>
    {label}
    {required ? (
      <span className="text-red-500"> *</span>
    ) : (
      <span className="font-normal text-gray-500"> (opsional)</span>
    )}
    {hint && <span className="ml-1 font-normal text-gray-500">{hint}</span>}
  </label>
);

const Error: React.FC<{ error?: string }> = ({ error }) =>
  error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null;

/**
 * Declared at module scope, not inside a form body: a component defined during
 * render is a new type on every keystroke, which unmounts the input and drops
 * the caret after the first character.
 */
export const TextField: React.FC<
  BaseProps & { type?: string; autoComplete?: string; rows?: number; placeholder?: string }
> = ({
  name,
  label,
  required,
  hint,
  error,
  value,
  onChange,
  type = 'text',
  autoComplete,
  rows,
  placeholder,
}) => (
  <div>
    <Label htmlFor={name} label={label} required={required} hint={hint} />
    {rows ? (
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={fieldClass(Boolean(error))}
      />
    )}
    <Error error={error} />
  </div>
);

export const SelectField: React.FC<
  BaseProps & {
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    disabled?: boolean;
  }
> = ({
  name,
  label,
  required,
  hint,
  error,
  value,
  onChange,
  options,
  placeholder = '— Pilih —',
  disabled,
}) => (
  <div>
    <Label htmlFor={name} label={label} required={required} hint={hint} />
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={Boolean(error)}
      className={`${fieldClass(Boolean(error))} disabled:bg-gray-100 disabled:text-gray-400`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <Error error={error} />
  </div>
);

/** The hidden input a person never sees and a script always fills. */
export const Honeypot: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => (
  <div className="absolute left-[-9999px]" aria-hidden="true">
    <label htmlFor="website">Website</label>
    <input
      id="website"
      name="website"
      type="text"
      tabIndex={-1}
      autoComplete="off"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const SubmitFailed: React.FC = () => (
  <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
    Formulir gagal terkirim. Coba lagi, atau hubungi kami di{' '}
    <a className="font-semibold underline" href={`https://wa.me/${WHATSAPP_NUMBER}`}>
      {WHATSAPP_DISPLAY}
    </a>
    .
  </p>
);
