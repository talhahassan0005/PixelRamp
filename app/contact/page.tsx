'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Section from '@/components/ui/Section';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

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

      <div className="max-w-2xl mx-auto">
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-600/30"
          >
            <p className="text-slate-300">
              <span className="text-blue-400 font-semibold">Need to schedule a consultation or send a message?</span> Visit your <a href="/dashboard" className="text-blue-500 hover:text-blue-400 underline">dashboard</a> to access the contact form and book a meeting.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
