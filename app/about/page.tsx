'use client';

import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import Section from '@/components/ui/Section';
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

export default function AboutPage() {
  return (
    <Section className="min-h-screen">
      <FadeIn className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">We are a passionate team of developers, designers, and innovators dedicated to transforming businesses through technology. With years of experience and hundreds of successful projects, we've become a trusted partner for startups and enterprises worldwide.</p>
      </FadeIn>

      {/* Team Image */}
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
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To be the leading software development agency that empowers businesses worldwide with innovative digital solutions, transforming ideas into reality and driving the future of technology.
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
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              Deliver high-quality, scalable, and user-centric software solutions that drive business growth and exceed client expectations through innovation, excellence, and unwavering commitment to success.
            </p>
          </motion.div>
        </SlideIn>
      </div>

      {/* Core Values */}
      <FadeIn className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Our Core Values</h2>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Innovation First', desc: 'We stay ahead of technology trends and implement cutting-edge solutions that give your business a competitive advantage.' },
            { title: 'Client Success', desc: 'Your success is our success. We go beyond development to ensure your project achieves its business objectives.' },
            { title: 'Quality Excellence', desc: 'Every line of code, every design element is crafted with precision and tested rigorously to ensure flawless performance.' },
            { title: 'Transparent Communication', desc: 'We believe in open, honest communication throughout the project lifecycle, keeping you informed every step of the way.' },
            { title: 'Agile Delivery', desc: 'Fast, iterative development cycles that allow for flexibility and ensure timely delivery without compromising quality.' },
            { title: 'Long-term Partnership', desc: 'We build lasting relationships, providing ongoing support and evolving your solution as your business grows.' },
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

      {/* Team Stats */}
      <ScaleIn className="text-center p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-600/30 shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Why Businesses Trust Us</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          From startups to Fortune 500 companies, we've delivered exceptional results across industries including fintech, healthcare, e-commerce, education, and SaaS.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">98%</p>
            <p className="text-slate-400">Client Satisfaction Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">15+</p>
            <p className="text-slate-400">Years Combined Experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">40+</p>
            <p className="text-slate-400">Countries Served</p>
          </div>
        </div>
      </ScaleIn>
    </Section>
  );
}
