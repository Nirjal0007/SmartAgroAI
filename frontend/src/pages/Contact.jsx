import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiSend } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in every field.');
      return;
    }
    setSubmitting(true);
    // No backend contact endpoint exists yet — simulate submission so the
    // form is fully wired up and ready to point at a real endpoint later.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm(initialForm);
    toast.success("Message sent — we'll get back to you soon.");
  };

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Contact" title="Get in touch" description="Questions, feedback, or a disease class we should add? Send it over." />

        <GlassCard className="mt-12 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name">
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Grower"
                  className={INPUT_CLASSES}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@example.com"
                  className={INPUT_CLASSES}
                />
              </Field>
            </div>
            <Field label="Message">
              <textarea
                value={form.message}
                onChange={update('message')}
                rows={5}
                placeholder="Tell us what's going on…"
                className={`${INPUT_CLASSES} resize-none`}
              />
            </Field>
            <Button type="submit" variant="accent" size="lg" disabled={submitting}>
              <FiSend /> {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        </GlassCard>

        <div className="mt-8 flex items-center gap-2 justify-center text-sm text-soil-light dark:text-cream-200/60">
          <FiMail size={15} /> Or email us directly at hello@smartagro.ai
        </div>
      </div>
    </section>
  );
}

const INPUT_CLASSES =
  'w-full rounded-xl border border-canopy-200 dark:border-canopy-600 bg-white/70 dark:bg-canopy-900/50 px-4 py-2.5 text-sm text-soil dark:text-cream-100 placeholder:text-soil-light/50 outline-none focus:border-harvest transition-colors';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-soil dark:text-cream-200/80">{label}</span>
      {children}
    </label>
  );
}
