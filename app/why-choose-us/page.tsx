'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  HeadphonesIcon,
  Sparkles,
  Clock,
  Wallet,
  Users,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
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
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'We commit to a timeline upfront and hold ourselves to it — no endless delays or shifting deadlines.',
    },
    {
      icon: Wallet,
      title: 'Transparent Pricing',
      description: 'You know the full cost before work begins. No hidden fees, no surprise invoices, no scope creep.',
    },
    {
      icon: Users,
      title: 'Direct Access to Your Team',
      description: 'You talk to the people actually building your product — not a rotating cast of account managers.',
    },
  ];

  const comparison = [
    {
      us: 'Free consultation to understand your actual problem first',
      them: 'Sells you a fixed package before understanding your needs',
    },
    {
      us: 'Fixed scope and transparent pricing agreed upfront',
      them: 'Hidden fees and scope creep once the contract is signed',
    },
    {
      us: 'Direct communication with your development team',
      them: 'Requests filtered through account managers and support tickets',
    },
    {
      us: 'Regular progress updates and a fixed delivery timeline',
      them: 'Radio silence for weeks, then a missed deadline',
    },
    {
      us: 'Ongoing support and iteration after launch',
      them: 'Disappears the moment the invoice is paid',
    },
  ];

  const promises = [
    'A dedicated team assigned to your project from day one',
    'Weekly progress updates — no chasing us for status',
    'Source code and documentation are always yours',
    'Post-launch support included, not billed as an afterthought',
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

      {/* WHAT SETS US APART */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {strengths.map((strength, i) => (
          <motion.div
            key={strength.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 3) * 0.15 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-600 transition-all hover:scale-105"
          >
            <strength.icon className="text-blue-600 mb-6" size={56} />
            <h2 className="text-2xl font-bold mb-4">{strength.title}</h2>
            <p className="text-slate-400 leading-relaxed">{strength.description}</p>
          </motion.div>
        ))}
      </div>

      {/* PIXELRAMP VS. A TYPICAL AGENCY */}
      <FadeInWrapper className="mb-24">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">The Difference</span>
          <h2 className="text-4xl font-bold mt-3">PixelRamp vs. A Typical Agency</h2>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900">
            <div className="p-4 text-center font-bold text-blue-500 border-b sm:border-b-0 sm:border-r border-slate-800">With PixelRamp</div>
            <div className="p-4 text-center font-bold text-slate-500">With a Typical Agency</div>
          </div>
          {comparison.map((row) => (
            <div key={row.us} className="grid grid-cols-1 sm:grid-cols-2 border-t border-slate-800">
              <div className="p-4 flex items-start gap-3 border-b sm:border-b-0 sm:border-r border-slate-800 bg-blue-600/5">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-slate-300">{row.us}</span>
              </div>
              <div className="p-4 flex items-start gap-3">
                <XCircle className="text-slate-600 shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-slate-500">{row.them}</span>
              </div>
            </div>
          ))}
        </div>
      </FadeInWrapper>

      {/* OUR PROMISE */}
      <FadeInWrapper className="mb-24">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Our Promise</span>
          <h2 className="text-4xl font-bold mt-3">What You Can Count On</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {promises.map((promise) => (
            <div
              key={promise}
              className="flex items-start gap-3 p-5 bg-slate-800/50 rounded-lg border border-slate-700"
            >
              <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <span className="text-slate-300">{promise}</span>
            </div>
          ))}
        </div>
      </FadeInWrapper>

      {/* TRUST / STATS BANNER */}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto mb-8">
          <div>
            <p className="text-3xl font-bold text-blue-500">98%</p>
            <p className="text-sm text-slate-400">Client Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-500">15+</p>
            <p className="text-sm text-slate-400">Years Combined Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-500">40+</p>
            <p className="text-sm text-slate-400">Countries Served</p>
          </div>
        </div>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Start a Free Consultation
        </a>
      </motion.div>
    </Section>
  );
}

function FadeInWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}