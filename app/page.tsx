'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Lightbulb, Target, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* HERO — Outcome-first, not service-first */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-slate-950" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Free 30-Minute Strategy Session — No Commitment
          </div>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            Your Digital Vision,{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Built the Right Way
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Before we talk about services or pricing — let's understand your goal. 
            One free consultation is all it takes to map out exactly what you need.
          </p>

          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Most businesses waste thousands on the wrong solution. We make sure you invest in the right one — 
            by starting with a conversation, not a sales pitch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <CalendlyWidget
              buttonText="Book My Free Consultation"
              className="px-8 py-4 text-lg shadow-lg shadow-blue-600/30"
            />
            <Link href="/how-it-works">
              <Button variant="secondary" className="px-8 py-4 text-lg border-slate-600 hover:border-blue-500">
                See How It Works <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
            {[
              { icon: Users, text: '300+ Businesses Helped' },
              { icon: CheckCircle, text: '500+ Projects Delivered' },
              { icon: Clock, text: 'Response Within 24hrs' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={16} className="text-blue-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROBLEM SECTION — Agitate the pain */}
      <Section className="bg-slate-900 border-t border-slate-800">
        <FadeIn className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Sound Familiar?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-3">
            Why Most Digital Projects Fail
          </h2>
          <p className="text-slate-400 text-lg">
            These are the most common reasons businesses lose time and money on digital projects.
          </p>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              emoji: '😤',
              problem: 'Hired the wrong agency',
              desc: 'They promised everything, delivered a generic template, and disappeared after payment.',
            },
            {
              emoji: '💸',
              problem: 'Overpaid for the wrong solution',
              desc: 'You paid for features you didn\'t need and missed the ones that actually matter for your business.',
            },
            {
              emoji: '⏳',
              problem: 'Months wasted, no results',
              desc: 'The project dragged on, the scope kept changing, and the final product didn\'t match the vision.',
            },
          ].map((item) => (
            <StaggerItem key={item.problem}>
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-100">{item.problem}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="text-center mt-12">
          <p className="text-xl text-slate-300 font-medium">
            The fix? <span className="text-blue-400">Start with a consultation — not a contract.</span>
          </p>
        </FadeIn>
      </Section>

      {/* PROCESS SECTION — How consultation works */}
      <Section className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Our Approach</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-3">
            Consultation First. Everything Else Follows.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We don't sell you a package. We understand your business, then recommend exactly what you need.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          {[
            {
              step: '01',
              icon: Lightbulb,
              title: 'Free Strategy Consultation',
              desc: 'A 30-minute call where we listen — your goals, your challenges, your timeline. No sales pitch, just clarity.',
              highlight: 'This is where we start.',
              color: 'blue',
            },
            {
              step: '02',
              icon: Target,
              title: 'We Map Out Your Solution',
              desc: 'Based on your consultation, we create a tailored roadmap — the right technology, the right scope, the right budget.',
              highlight: 'No guesswork, no upselling.',
              color: 'purple',
            },
            {
              step: '03',
              icon: Zap,
              title: 'We Build & Deliver',
              desc: 'Our team executes with precision. You get regular updates, transparent timelines, and a product that actually works.',
              highlight: 'On time. On budget.',
              color: 'green',
            },
            {
              step: '04',
              icon: TrendingUp,
              title: 'You Grow',
              desc: 'Post-launch support, performance monitoring, and ongoing improvements. We\'re your long-term digital partner.',
              highlight: 'We grow with you.',
              color: 'orange',
            },
          ].map((item, i) => (
            <FadeIn key={item.step}>
              <div className={`flex gap-6 mb-8 p-6 rounded-2xl border transition-all ${
                i === 0 
                  ? 'bg-blue-600/10 border-blue-600/40' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}>
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    i === 0 ? 'bg-blue-600' : 'bg-slate-800'
                  }`}>
                    <item.icon size={24} className={i === 0 ? 'text-white' : 'text-slate-400'} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {item.step}</span>
                    {i === 0 && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Start Here</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 mb-2">{item.desc}</p>
                  <p className={`text-sm font-semibold ${i === 0 ? 'text-blue-400' : 'text-slate-500'}`}>
                    → {item.highlight}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-8">
          <CalendlyWidget
            buttonText="Start with a Free Consultation"
            className="px-10 py-4 text-lg shadow-lg shadow-blue-600/30"
          />
          <p className="text-slate-500 text-sm mt-4">30 minutes. Free. No obligation.</p>
        </FadeIn>
      </Section>

      {/* OUTCOMES SECTION — What they get */}
      <Section className="bg-slate-900 border-t border-slate-800">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">What You Get</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-3">
            The Result You're Looking For
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            After your consultation, we match you with the exact solution your business needs.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
              outcome: 'A Website That Converts',
              desc: 'Not just a pretty site — a digital asset that brings in leads, builds trust, and grows your business.',
              tag: 'Web & App Development',
            },
            {
              img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
              outcome: 'A Brand That Stands Out',
              desc: 'Identity, visuals, and design that make your business memorable and professional from day one.',
              tag: 'Design & Branding',
            },
            {
              img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
              outcome: 'A Product That Scales',
              desc: 'SaaS platforms and mobile apps built for growth — from MVP to enterprise, we handle the complexity.',
              tag: 'SaaS & Mobile',
            },
          ].map((item) => (
            <StaggerItem key={item.outcome}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl border border-slate-800 hover:border-blue-600/50 overflow-hidden bg-slate-900 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={item.img} alt={item.outcome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs bg-blue-600/80 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.outcome}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <Link href="/services" className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center gap-1">
                    See how we do it <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* SOCIAL PROOF */}
      <Section className="bg-slate-950 border-t border-slate-800">
        <StaggerContainer className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            { number: '500+', label: 'Projects Delivered' },
            { number: '300+', label: 'Happy Clients' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-600/50 transition-all">
                <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">{stat.number}</h3>
                <p className="text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-gradient-to-br from-blue-600/10 via-slate-900 to-purple-600/10 border-t border-slate-800">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something That Works?
          </h2>
          <p className="text-xl text-slate-300 mb-4">
            Start with a free 30-minute consultation. We'll tell you exactly what you need — and what you don't.
          </p>
          <p className="text-slate-500 mb-10">
            No pressure. No packages pushed. Just an honest conversation about your goals.
          </p>
          <CalendlyWidget
            buttonText="Book My Free Consultation"
            className="px-10 py-4 text-lg shadow-xl shadow-blue-600/20"
          />
          <p className="text-slate-600 text-sm mt-6">
            Prefer to browse first?{' '}
            <Link href="/services" className="text-slate-400 hover:text-blue-400 underline underline-offset-4">
              View our services & pricing →
            </Link>
          </p>
        </FadeIn>
      </Section>

      {/* MAP */}
      <Section className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="text-center mb-12">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Find Us</span>
          <h2 className="text-4xl font-bold mb-4 mt-3">Visit Our Office</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Based in London — working with clients worldwide.</p>
        </FadeIn>
        <FadeIn className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe
            title="Our location"
            src="https://www.google.com/maps?q=London%2C%20United%20Kingdom&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full block"
          />
        </FadeIn>
      </Section>
    </>
  );
}
