'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, HeadphonesIcon, Sparkles } from 'lucide-react';
import Section from '@/components/ui/Section';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhyChooseUsPage() {
  const { t } = useLanguage();

  const strengths = [
    {
      icon: Award,
      title: t('quality'),
      description: t('quality_desc'),
    },
    {
      icon: HeadphonesIcon,
      title: t('support'),
      description: t('support_desc'),
    },
    {
      icon: Sparkles,
      title: t('innovation'),
      description: t('innovation_desc'),
    },
  ];

  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">{t('why_title')}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t('trust_desc')}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {strengths.map((strength, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-600 transition-all hover:scale-105"
          >
            <strength.icon className="text-blue-600 mb-6" size={56} />
            <h2 className="text-2xl font-bold mb-4">{strength.title}</h2>
            <p className="text-slate-400 leading-relaxed">{strength.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-600/30"
      >
        <h2 className="text-3xl font-bold mb-4">{t('trusted_globally')}</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          {t('trust_desc')}
        </p>
      </motion.div>
    </Section>
  );
}