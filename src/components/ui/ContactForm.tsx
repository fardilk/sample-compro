import React from 'react';
import SuccessModal from './SuccessModal';

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormProps = {
  className?: string;
  buttonLabel?: string;
  onSuccess?: (values: ContactFormValues) => void;
};

const initialForm: ContactFormValues = { name: '', email: '', message: '' };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const ContactForm: React.FC<ContactFormProps> = ({ className = '', buttonLabel = 'Send Message', onSuccess }) => {
  const [form, setForm] = React.useState<ContactFormValues>(initialForm);
  const [errors, setErrors] = React.useState<Partial<ContactFormValues>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<ContactFormValues> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!emailRegex.test(form.email)) next.email = 'Please enter a valid email address';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Mock async submit - replace with real API integration as needed
      await new Promise(r => setTimeout(r, 600));
      onSuccess?.(form);
      setShowSuccess(true);
      setForm(initialForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}`}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}`}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}`}
            required
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : buttonLabel}
        </button>
      </form>

      <SuccessModal
        open={showSuccess}
        title="Message sent!"
        message={
          <span>
            Thanks for reaching out. We'll get back to you at <strong>{form.email || 'your email'}</strong> soon.
          </span>
        }
        onClose={() => setShowSuccess(false)}
        actionLabel="Done"
      />
    </div>
  );
};

export default ContactForm;
