'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, Rocket } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden bg-slate-950">
        {/* Background with grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-slate-950"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Trusted by 300+ Companies Worldwide
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            Build Your Digital
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">Future Today</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your vision into reality with enterprise-grade software solutions.
            <br className="hidden md:block" />
            From MVP to scale, we deliver excellence at every stage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/contact">
              <Button className="flex items-center gap-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30">
                Start Your Project <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" className="px-8 py-4 text-lg border-slate-600 hover:border-blue-500 hover:bg-slate-800/50 backdrop-blur-sm">View Our Work</Button>
            </Link>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 items-center text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Features Preview */}
      <Section className="bg-slate-950 border-t border-slate-800">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
          <h2 className="text-5xl font-bold mb-4 mt-3">Premium Solutions</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Enterprise-grade services tailored to your business needs</p>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: 'Web Development', desc: 'Custom websites and web applications', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80' },
            { icon: Palette, title: 'Graphics Design', desc: 'Stunning visual designs for your brand', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
            { icon: Rocket, title: 'SaaS Solutions', desc: 'Scalable software as a service products', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
          ].map((feature, i) => (
            <StaggerItem key={i}>
              <Link href="/services" aria-label={`View ${feature.title} services`} className="block">
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-8 bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-600/50 transition-all overflow-hidden shadow-xl hover:shadow-blue-600/10 cursor-pointer"
                >
                  {/* Gradient overlay on hover */}
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
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Our Impact</span>
          <h2 className="text-5xl font-bold mb-4 mt-3">Trusted Globally</h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Projects Delivered' },
            { number: '300+', label: 'Happy Clients' },
            { number: '50+', label: 'Team Members' },
            { number: '24/7', label: 'Support Available' },
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
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Technology Stack</span>
          <h2 className="text-5xl font-bold mb-4 mt-3">Cutting-Edge Tools</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">We leverage industry-leading technologies to build scalable solutions</p>
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
