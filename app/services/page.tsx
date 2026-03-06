 'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import PricingCard from '@/components/PricingCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <Section className="min-h-screen">
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold mb-4">{t('services')}</h1>
            <p className="text-xl text-slate-400 mb-4">{t('enterprise_services')}</p>
            <div className="flex gap-3">
              <a href="#contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
              <a href="#pricing" className="inline-block border border-slate-700 text-slate-200 px-4 py-2 rounded">{t('view_work')}</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
              alt="Services"
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </div>

      <div className="space-y-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="text-blue-600" size={40} />
            <h2 className="text-3xl font-bold">{t('web_development')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Starter</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £300</p>
              <p className="text-slate-400 mb-4">{t('web_dev_desc')}</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Business</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £1,199</p>
              <p className="text-slate-400 mb-4">Professional websites with CMS</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Enterprise</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £2,200</p>
              <p className="text-slate-400 mb-4">Custom web applications</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Palette className="text-blue-600" size={40} />
            <h2 className="text-3xl font-bold">{t('graphics_design')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Essential</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £149</p>
              <p className="text-slate-400 mb-4">{t('graphics_desc')}</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Corporate</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £299</p>
              <p className="text-slate-400 mb-4">Complete brand identity kit</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Elite</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £600</p>
              <p className="text-slate-400 mb-4">Premium visual systems</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Rocket className="text-blue-600" size={40} />
            <h2 className="text-3xl font-bold">{t('saas_solutions')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">MVP Launch</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £1,500</p>
              <p className="text-slate-400 mb-4">{t('saas_desc')}</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Scale-Up</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £2,300</p>
              <p className="text-slate-400 mb-4">Multi-user SaaS architecture</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Enterprise</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £3,000</p>
              <p className="text-slate-400 mb-4">Large-scale cloud infrastructure</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Smartphone className="text-blue-600" size={40} />
            <h2 className="text-3xl font-bold">{t('mobile_apps')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Basic App</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £500</p>
              <p className="text-slate-400 mb-4">Single-platform mobile applications</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Pro App</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £999</p>
              <p className="text-slate-400 mb-4">Cross-platform applications</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Advanced</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">From £2,000</p>
              <p className="text-slate-400 mb-4">Complex apps with real-time features</p>
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">{t('get_quote')}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
