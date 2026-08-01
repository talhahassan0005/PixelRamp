'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Section from '@/components/ui/Section';
import CalendlyWidget from '@/components/CalendlyWidget';
import { FadeIn } from '@/components/ui/AnimatedSection';
import { getServiceById, services } from '@/lib/services-content';

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const service = getServiceById(slug);
  if (!service) return null;

  const otherServices = services.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);

  return (
    <>
      <Section className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="max-w-4xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            All Services
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
              <service.icon className="text-blue-500" size={24} />
            </div>
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              {service.category === 'Consulting' ? 'Consultancy' : service.title}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.tagline}</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">{service.desc}</p>
          <CalendlyWidget
            buttonText={`Discuss Your ${service.title} Project`}
            className="px-8 py-4 text-lg shadow-lg shadow-blue-600/30"
          />
        </FadeIn>
      </Section>

      <Section className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-6">What You Get</h2>
            <ul className="space-y-4">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{outcome}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-4">
              Typical Investment Range
            </p>
            <div className="space-y-3">
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
            </div>
            <p className="text-slate-600 text-xs mt-4 text-center">
              * Exact pricing determined after your free consultation
            </p>
          </FadeIn>
        </div>
      </Section>

      {otherServices.length > 0 && (
        <Section className="bg-slate-950 border-t border-slate-800">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group p-5 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-600/50 transition-all"
                >
                  <s.icon className="text-blue-500 mb-3" size={20} />
                  <p className="font-semibold group-hover:text-blue-500 transition-colors">{s.title}</p>
                </Link>
              ))}
            </div>
          </FadeIn>
        </Section>
      )}

      <Section className="bg-gradient-to-br from-blue-600/10 via-slate-900 to-purple-600/10 border-t border-slate-800">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Talk?</h2>
          <p className="text-xl text-slate-300 mb-3">
            Book a free consultation and we'll tell you exactly how we can help.
          </p>
          <p className="text-slate-500 mb-8">30 minutes. No cost. No obligation. Just clarity.</p>
          <CalendlyWidget
            buttonText="Book My Free Consultation"
            className="px-10 py-4 text-lg shadow-xl shadow-blue-600/20"
          />
        </FadeIn>
      </Section>
    </>
  );
}
