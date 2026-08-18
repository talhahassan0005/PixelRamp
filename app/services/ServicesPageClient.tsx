'use client';

import Link from 'next/link';
import { ArrowRight, Target, Lightbulb, ClipboardList } from 'lucide-react';
import Section from '@/components/ui/Section';
import CalendlyWidget from '@/components/CalendlyWidget';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { services } from '@/lib/services-content';

const buildServices = services.filter((s) => s.category === 'Build');
const consultingServices = services.filter((s) => s.category === 'Consulting');

export default function ServicesPage() {
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
            { icon: Target, title: 'Clarity on What You Need', desc: 'We help you define the right scope before spending a penny.' },
            { icon: Lightbulb, title: 'Honest Recommendation', desc: 'We tell you what will work — and what won\'t. No upselling.' },
            { icon: ClipboardList, title: 'A Clear Roadmap', desc: 'You leave with a plan: timeline, budget range, and next steps.' },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <item.icon className="text-blue-500" size={22} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Build services */}
      <Section id="services" className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="text-center mb-12">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Build</span>
          <h2 className="text-4xl font-bold mt-3">Development &amp; Design</h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {buildServices.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Consultancy services */}
      <Section className="bg-slate-900 border-t border-slate-800">
        <FadeIn className="text-center mb-12">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Consultancy</span>
          <h2 className="text-4xl font-bold mt-3">Advisory &amp; Strategy</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Not ready to build yet? We help you figure out what to build, and how to run what you already have.
          </p>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {consultingServices.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

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

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group flex flex-col h-full p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-600/50 transition-all"
    >
      <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4">
        <service.icon className="text-blue-500" size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{service.title}</h3>
      <p className="text-slate-400 text-sm mb-6 flex-1">{service.tagline}</p>
      <span className="inline-flex items-center gap-2 text-blue-500 font-semibold text-sm group-hover:gap-3 transition-all">
        Learn More <ArrowRight size={16} />
      </span>
    </Link>
  );
}
