'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">{t('contact_us')}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t('ready_to_start')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16 rounded-lg overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" 
          alt="Contact Us" 
          className="w-full h-64 object-cover"
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <Mail className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('email')}</h3>
              <p className="text-slate-400">contact@pixelramp.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('phone')}</h3>
              <p className="text-slate-400">+44 (0) 123 456 7890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('address')}</h3>
              <p className="text-slate-400">London, United Kingdom</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold mb-4">{t('business_hours')}</h3>
            <div className="space-y-2 text-slate-400">
              <p>{t('monday_friday')}</p>
              <p>{t('saturday')}</p>
              <p>{t('sunday')}</p>
              <p className="text-blue-600 mt-4">{t('support_24_7')} {t('emergency_support')}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder={t('your_name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder={t('your_email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              placeholder={t('your_message')}
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" className="w-full">{t('send_message')}</Button>
        </motion.form>
      </div>
    </Section>
  );
}
