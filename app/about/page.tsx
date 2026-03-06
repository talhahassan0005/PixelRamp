'use client';

import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import Section from '@/components/ui/Section';
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Section className="min-h-screen">
      <FadeIn className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">{t('about_title')}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t('our_story_desc')}</p>
      </FadeIn>

      <ScaleIn className="mb-16 rounded-xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
          alt="Our Team" 
          className="w-full h-96 object-cover"
        />
      </ScaleIn>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <SlideIn direction="left">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-8 glass-effect rounded-xl hover:glow-effect transition-all"
          >
            <Eye className="text-blue-600 mb-4 animate-float" size={48} />
            <h2 className="text-3xl font-bold mb-4">{t('our_vision')}</h2>
            <p className="text-slate-400 leading-relaxed">
              {t('our_vision_desc')}
            </p>
          </motion.div>
        </SlideIn>

        <SlideIn direction="right">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-8 glass-effect rounded-xl hover:glow-effect transition-all"
          >
            <Target className="text-blue-600 mb-4 animate-float" size={48} />
            <h2 className="text-3xl font-bold mb-4">{t('our_mission')}</h2>
            <p className="text-slate-400 leading-relaxed">
              {t('our_mission_desc')}
            </p>
          </motion.div>
        </SlideIn>
      </div>

      <FadeIn className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">{t('core_values')}</h2>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            { title: t('innovation'), desc: t('innovation_desc') },
            { title: t('quality'), desc: t('quality_desc') },
            { title: t('support'), desc: t('support_desc') },
          ].map((value, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 glass-effect rounded-xl hover:border-blue-600 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-600">{value.title}</h3>
                <p className="text-slate-400">{value.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>

      <ScaleIn className="text-center p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-600/30 shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">{t('why_businesses_trust')}</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          {t('trust_desc')}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">98%</p>
            <p className="text-slate-400">{t('client_satisfaction')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">15+</p>
            <p className="text-slate-400">{t('years_experience')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">40+</p>
            <p className="text-slate-400">{t('countries_served')}</p>
          </div>
        </div>
      </ScaleIn>
    </Section>
  );
}
