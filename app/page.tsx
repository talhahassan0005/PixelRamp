'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, Rocket } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-slate-950"></div>
        </div>
        
        <div className="text-center relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Trusted by 300+ Companies Worldwide
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">{t('hero_title')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button className="flex items-center gap-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30">
                {t('start_project')} <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" className="px-8 py-4 text-lg border-slate-600 hover:border-blue-500 hover:bg-slate-800/50 backdrop-blur-sm">{t('view_work')}</Button>
            </Link>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 items-center text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span>{t('iso_certified')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span>{t('gdpr_compliant')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span>{t('support_24_7')}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Preview */}
      <Section className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">{t('our_expertise')}</span>
          <h2 className="text-5xl font-bold mb-4 mt-3">{t('premium_solutions')}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t('enterprise_services')}</p>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: t('web_development'), desc: t('web_dev_desc'), img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80' },
            { icon: Palette, title: t('graphics_design'), desc: t('graphics_desc'), img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
            { icon: Rocket, title: t('saas_solutions'), desc: t('saas_desc'), img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
          ].map((feature, i) => (
            <StaggerItem key={i}>
              <Link href="/services" aria-label={`View ${feature.title} services`} className="block">
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-8 bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-600/50 transition-all overflow-hidden shadow-xl hover:shadow-blue-600/10 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500"></div>
                  
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                      <feature.icon className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Stats Section */}
      <Section className="bg-gradient-to-b from-slate-950 to-slate-900">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">{t('our_impact')}</span>
          <h2 className="text-5xl font-bold mb-4 mt-3">{t('trusted_globally')}</h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: t('projects_delivered') },
            { number: '300+', label: t('happy_clients') },
            { number: '50+', label: t('team_members') },
            { number: '24/7', label: t('support_available') },
          ].map((stat, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-600/50 transition-all backdrop-blur-sm"
              >
                <h3 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">{stat.number}</h3>
                <p className="text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Technologies Section */}
      <Section className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">{t('technology_stack')}</span>
          <h2 className="text-5xl font-bold mb-4 mt-3">{t('cutting_edge')}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t('tech_desc')}</p>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Flutter', 'React Native'].map((tech, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 text-center hover:border-blue-600/50 transition-all backdrop-blur-sm group"
              >
                <p className="font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">{tech}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}