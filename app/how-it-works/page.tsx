'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Code, Rocket } from 'lucide-react';
import Section from '@/components/ui/Section';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HowItWorksPage() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageSquare,
      title: t('step_1'),
      description: 'We start with an in-depth consultation to understand your business goals and requirements.',
    },
    {
      icon: Code,
      title: t('step_3'),
      description: 'Our expert team designs and builds robust, scalable solutions using the latest technologies.',
    },
    {
      icon: Rocket,
      title: t('step_4'),
      description: 'We conduct comprehensive testing and deploy your solution with ongoing support.',
    },
  ];

  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">{t('how_title')}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">Our proven 3-step process ensures seamless project delivery from concept to launch.</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex items-start gap-6 mb-12"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {i + 1}
            </div>
            <div className="flex-1 p-6 bg-slate-800 rounded-lg border border-slate-700">
              <step.icon className="text-blue-600 mb-4" size={40} />
              <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-4">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-slate-800 rounded-lg border border-slate-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8">{t('typical_timeline')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">1-2 Weeks</p>
            <p className="text-slate-400">{t('discovery_planning')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">4-12 Weeks</p>
            <p className="text-slate-400">{t('design_development')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">1-2 Weeks</p>
            <p className="text-slate-400">{t('testing_launch')}</p>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-6">*{t('timeline_note')}</p>
      </motion.div>
    </Section>
  );
}