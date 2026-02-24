 'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, HeadphonesIcon, Sparkles, Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';

const strengths = [
  {
    icon: Award,
    title: 'Proven Expertise',
    description: 'Our team of seasoned developers, designers, and architects brings years of experience in cutting-edge technologies, modern frameworks, and industry best practices. We have successfully delivered 500+ projects across diverse industries.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Dedicated Support',
    description: 'Round-the-clock support to ensure your business runs smoothly without interruptions. Our support team is always available to address issues, answer questions, and provide technical assistance whenever you need it.',
  },
  {
    icon: Sparkles,
    title: 'Quality Assurance',
    description: 'Rigorous testing protocols including unit testing, integration testing, security audits, and performance optimization to deliver flawless, production-ready solutions that exceed industry standards.',
  },
];

export default function WhyChooseUsPage() {
  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">Why Choose Us</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">We don't just build software—we build partnerships. Here's what makes us the preferred choice for businesses worldwide.</p>
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

      {/* Additional Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold text-center mb-12">More Reasons to Partner With Us</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Transparent Pricing', desc: 'No hidden costs. Clear, upfront pricing with detailed breakdowns so you know exactly what you are paying for.' },
            { title: 'Agile Methodology', desc: 'Flexible, iterative development with regular updates and the ability to adapt to changing requirements.' },
            { title: 'Scalable Solutions', desc: 'Architecture designed to grow with your business, from MVP to enterprise-level applications.' },
            { title: 'Security First', desc: 'Industry-standard security practices, data encryption, and compliance with GDPR, HIPAA, and other regulations.' },
            { title: 'Fast Turnaround', desc: 'Efficient project management and streamlined workflows ensure timely delivery without compromising quality.' },
            { title: 'Post-Launch Support', desc: 'Comprehensive maintenance, updates, and feature enhancements to keep your solution running optimally.' },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-600 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-600">{benefit.title}</h3>
              <p className="text-slate-400">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Case Study Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?w=1200&q=80" alt="Case study" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-3">Case Study: Speeding an MVP to Market</h3>
            <p className="text-slate-400 mb-4">We partnered with a UK fintech startup to build an investor-ready MVP in just 8 weeks. Our focused delivery and iterative testing reduced time-to-market while preserving flexibility for future scaling.</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-slate-800 rounded text-center">
                <p className="text-2xl font-bold">8w</p>
                <p className="text-sm text-slate-400">Time to MVP</p>
              </div>
              <div className="p-4 bg-slate-800 rounded text-center">
                <p className="text-2xl font-bold">+42%</p>
                <p className="text-sm text-slate-400">Conversion Lift</p>
              </div>
              <div className="p-4 bg-slate-800 rounded text-center">
                <p className="text-2xl font-bold">£120k</p>
                <p className="text-sm text-slate-400">ARR after 6mo</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Talk About Your Project</a>
              <button className="inline-block border border-slate-700 text-slate-200 px-4 py-2 rounded" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>See More</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials (4-up slider; autoplay one-step left every 3s with loop) */}
      {(() => {
        const testimonials = [
          {
            quote: 'They built our MVP in record time and the team was incredibly responsive. Helped us secure our first round of funding.',
            name: 'Aisha Khan',
            role: 'Founder, FinStart',
          },
          {
            quote: 'Professional, reliable and technically excellent — the results speak for themselves. Highly recommended for serious startups.',
            name: 'Tom Bennett',
            role: 'CTO, RetailCo',
          },
          {
            quote: 'Excellent communication and a clear roadmap. Post-launch support was prompt and helpful.',
            name: 'Sophie Turner',
            role: 'Head of Product, HealthPlus',
          },
          {
            quote: 'The design and UX work lifted our conversion rates significantly — skilled designers and great collaboration.',
            name: 'Liam O\'Connor',
            role: 'Product Lead, ShopEase',
          },
          {
            quote: 'They delivered on time and provided excellent post-launch support. Highly professional team.',
            name: 'Nina Patel',
            role: 'COO, MediServe',
          },
          {
            quote: 'Clear process, responsive communication, and measurable improvements in site performance.',
            name: 'George Mills',
            role: 'Head of Engineering, FleetTrack',
          },
        ];

        const VISIBLE = 4;
        const INTERVAL = 10000; // 10s (user requested slower autoplay)
        const TRANSITION_MS = 800; // smoother transition

        const [index, setIndex] = useState(0);
        const [animating, setAnimating] = useState(true);
        const intervalRef = useRef<number | null>(null);
        const wrapperRef = useRef<HTMLDivElement | null>(null);
        const trackRef = useRef<HTMLDivElement | null>(null);
        const [stepPx, setStepPx] = useState<number | null>(null);

        useEffect(() => {
          intervalRef.current = window.setInterval(() => {
            setIndex((p) => p + 1);
            setAnimating(true);
          }, INTERVAL);
          return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
          };
        }, []);

        const resetInterval = () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = window.setInterval(() => {
            setIndex((p) => p + 1);
            setAnimating(true);
          }, INTERVAL);
        };

        // measure per-step distance (distance between adjacent items) so we can translate by pixels
        useEffect(() => {
          const compute = () => {
            const track = trackRef.current;
            if (!track) return;
            const children = track.children;
            if (children.length < 2) return;
            const a = children[0] as HTMLElement;
            const b = children[1] as HTMLElement;
            const step = b.getBoundingClientRect().left - a.getBoundingClientRect().left;
            setStepPx(Math.round(step));
          };
          compute();
          window.addEventListener('resize', compute);
          return () => window.removeEventListener('resize', compute);
        }, []);

        // seamless reset when we've advanced by testimonials.length steps
        useEffect(() => {
          if (index === testimonials.length) {
            // wait for transition to finish, then jump back to 0 without animation
            const t = window.setTimeout(() => {
              setAnimating(false);
              setIndex(0);
              // re-enable animation on next frame
              requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
            }, TRANSITION_MS);
            return () => clearTimeout(t);
          }
        }, [index, testimonials.length]);

        const handleNext = () => {
          setIndex((p) => p + 1);
          setAnimating(true);
          resetInterval();
        };

        const handlePrev = () => {
          setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
          setAnimating(true);
          resetInterval();
        };

        const totalSlides = testimonials.length * 2;
        // Use pixel-based step (measured) so we move exactly one card at a time
        const translatePx = stepPx != null ? index * stepPx : 0;

        return (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-8">What Our Clients Say</h2>

            <div className="relative overflow-hidden" ref={wrapperRef}>
              <button aria-label="Previous testimonial" onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-slate-700/60 hover:bg-slate-700 text-white rounded-full p-2">
                <ChevronLeft size={18} />
              </button>
              <button aria-label="Next testimonial" onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-slate-700/60 hover:bg-slate-700 text-white rounded-full p-2">
                <ChevronRight size={18} />
              </button>
              <div
                ref={trackRef}
                className="flex gap-6"
                style={{
                  transform: `translateX(-${translatePx}px)`,
                  transition: animating ? `transform ${TRANSITION_MS}ms linear` : 'none',
                }}
              >
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div
                    key={i}
                    style={{ flex: `0 0 calc(${100 / VISIBLE}% - 1rem)`, maxWidth: '360px' }}
                    className="flex-shrink-0 p-8 bg-slate-800 rounded-lg border border-slate-700 shadow-lg"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-white">{t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                      <MessageSquare className="text-blue-500" />
                    </div>
                    <blockquote className="text-slate-300 mb-4 text-lg leading-relaxed pl-4 border-l-4 border-blue-600">“{t.quote}”</blockquote>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="font-semibold text-slate-100">{t.name}</p>
                        <p className="text-sm text-slate-400">{t.role}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="text-amber-400" size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })()}

      {/* Client Success Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-600/30"
      >
        <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          From funded startups to established enterprises, our clients choose us for our reliability, expertise, and commitment to excellence.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {['E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'SaaS', 'Real Estate', 'Logistics', 'Entertainment'].map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
            >
              <p className="font-semibold text-slate-300">{industry}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
