'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const services = [
  'Web Development',
  'Graphics Design',
  'SaaS Solutions',
  'Mobile App',
  'Other',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function HeroContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: services[0],
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', email: '', service: services[0], message: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md mx-auto lg:mx-0 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl"
    >
      {status === 'success' ? (
        <div className="text-center py-8">
          <CheckCircle2 className="text-green-500 mx-auto mb-4" size={56} />
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-slate-400 mb-6">
            Thank you for reaching out. We&apos;ll be in touch within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-1">Get a Free Quote</h3>
            <p className="text-slate-400 text-sm">
              Tell us about your project and we&apos;ll get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="hero-name" className="sr-only">
                Your Name
              </label>
              <input
                id="hero-name"
                type="text"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={update('name')}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="hero-email" className="sr-only">
                Your Email
              </label>
              <input
                id="hero-email"
                type="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={update('email')}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="hero-service" className="sr-only">
                Service
              </label>
              <select
                id="hero-service"
                value={form.service}
                onChange={update('service')}
                className={inputClass}
              >
                {services.map((s) => (
                  <option key={s} value={s} className="bg-slate-900">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hero-message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="hero-message"
                required
                rows={3}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={update('message')}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p className="text-rose-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Get Free Quote <Send size={18} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
