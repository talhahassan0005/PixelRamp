'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code2, Palette, Rocket, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import CalendlyWidget from '@/components/CalendlyWidget';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  {
    icon: Code2,
    id: 'web',
    title: 'Web Development',
    tagline: 'Your business deserves more than a template.',
    desc: 'From landing pages to complex web applications — we build fast, scalable, and conversion-focused websites tailored to your goals.',
    outcomes: ['More leads from organic & paid traffic', 'Professional credibility that builds trust', 'Scalable architecture that grows with you'],
    packages: [
      { name: 'Starter', price: 'From £300', for: 'New businesses & MVPs' },
      { name: 'Business', price: 'From £1,199', for: 'Growing companies' },
      { name: 'Enterprise', price: 'From £2,200', for: 'Complex web applications' },
    ],
  },
  {
    icon: Palette,
    id: 'design',
    title: 'Graphics & Branding',
    tagline: 'First impressions are built on design.',
    desc: 'A strong brand identity sets you apart. We create visual systems that communicate your value instantly and consistently.',
    outcomes: ['Brand recognition that sticks', 'Consistent identity across all channels', 'Design that attracts your ideal client'],
    packages: [
      { name: 'Essential', price: 'From £149', for: 'Startups & solo founders' },
      { name: 'Corporate', price: 'From £299', for: 'Established businesses' },
      { name: 'Elite', price: 'From £600', for: 'Premium brand systems' },
    ],
  },
  {
    icon: Rocket,
    id: 'saas',
    title: 'SaaS Solutions',
    tagline: 'Turn your idea into a product people pay for.',
    desc: 'We build SaaS platforms from scratch — authentication, billing, dashboards, APIs. Everything you need to launch and scale.',
    outcomes: ['Launch faster with a validated MVP', 'Recurring revenue from day one', 'Architecture built to handle growth'],
    packages: [
      { name: 'MVP Launch', price: 'From £1,500', for: 'First-time SaaS founders' },
      { name: 'Scale-Up', price: 'From £2,300', for: 'Growing SaaS products' },
      { name: 'Enterprise', price: 'From £3,000', for: 'Large-scale platforms' },
    ],
  },
  {
    icon: Smartphone,
    id: 'apps',
    title: 'Mobile Apps',
    tagline: 'Your customers are on their phones. Be there.',
    desc: 'Native and cross-platform mobile apps that deliver real value. Built for performance, designed for engagement.',
    outcomes: ['Reach users on iOS & Android', 'Higher engagement than mobile web', 'App Store presence that builds authority'],
    packages: [
      { name: 'Basic App', price: 'From £500', for: 'Single-platform apps' },
      { name: 'Pro App', price: 'From £999', for: 'Cross-platform apps' },
      { name: 'Advanced', price: 'From £2,000', for: 'Complex real-time apps' },
    ],
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero — Consultation first */}
      <Section className="bg-slate-950 min-h-[50vh] flex items-center">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-3 mb-6">
            Not Sure Where to Start?{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              That's What We're Here For.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            Every project starts with a free consultation. We listen to your goals and recommend 
            the right solution — not the most expensive one.
          </p>
          <p className="text-slate-500 mb-10">
            Browse our services below, but remember: the best starting point is always a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalendlyWidget
              buttonText="Book Free Consultation First"
              className="px-8 py-4 text-lg shadow-lg shadow-blue-600/30"
            />
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-slate-300 rounded-lg hover:border-slate-500 transition-colors text-lg"
            >
              Browse Services <ArrowRight size={18} />
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* Consultation value prop */}
      <Section className="bg-slate-900 border-t border-slate-800 py-12">
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          {[
            { icon: '🎯', title: 'Clarity on What You Need', desc: 'We help you define the right scope before spending a penny.' },
            { icon: '💡', title: 'Honest Recommendation', desc: 'We tell you what will work — and what won\'t. No upselling.' },
            { icon: '📋', title: 'A Clear Roadmap', desc: 'You leave with a plan: timeline, budget range, and next steps.' },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Services — shown as outcomes, packages secondary */}
      <div id="services">
        {services.map((service, idx) => (
          <Section
            key={service.id}
            className={`border-t border-slate-800 ${idx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900'}`}
          >
            <div className="max-w-5xl mx-auto">
              <FadeIn className="grid md:grid-cols-2 gap-12 items-center mb-12">
                {/* Left: outcome-focused copy */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                      <service.icon className="text-blue-500" size={24} />
                    </div>
                    <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">{service.title}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">{service.tagline}</h2>
                  <p className="text-slate-400 mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <CalendlyWidget
                    buttonText={`Discuss Your ${service.title} Project`}
                    className="px-6 py-3"
                  />
                </div>

                {/* Right: packages as reference, not primary CTA */}
                <div className="space-y-3">
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-4">
                    Typical Investment Range
                  </p>
                  {service.packages.map((pkg) => (
                    <motion.div
                      key={pkg.name}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-4 bg-slate-800/60 rounded-xl border border-slate-700 hover:border-blue-600/40 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-slate-100">{pkg.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{pkg.for}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-bold">{pkg.price}</p>
                        <p className="text-xs text-slate-600 mt-0.5">after consultation</p>
                      </div>
                    </motion.div>
                  ))}
                  <p className="text-slate-600 text-xs mt-4 text-center">
                    * Exact pricing determined after your free consultation
                  </p>
                </div>
              </FadeIn>
            </div>
          </Section>
        ))}
      </div>

      {/* Bottom CTA */}
      <Section className="bg-gradient-to-br from-blue-600/10 via-slate-900 to-purple-600/10 border-t border-slate-800">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Still Deciding?</h2>
          <p className="text-xl text-slate-300 mb-3">
            Book a free consultation and we'll tell you exactly which service fits your situation.
          </p>
          <p className="text-slate-500 mb-8">
            30 minutes. No cost. No obligation. Just clarity.
          </p>
          <CalendlyWidget
            buttonText="Book My Free Consultation"
            className="px-10 py-4 text-lg shadow-xl shadow-blue-600/20"
          />
        </FadeIn>
      </Section>
    </>
  );
}
