'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Code2, Palette, Rocket } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useRef, useState, useEffect } from 'react';

// Draggable Element Component
function DraggableElement({ children, className, initialX, initialY, scatterDistance = 50 }:
  { children: React.ReactNode; className?: string; initialX?: number; initialY?: number; scatterDistance?: number }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);
  
  // Motion values for position
  const x = useMotionValue(initialX || 0);
  const y = useMotionValue(initialY || 0);
  
  // Random scatter positions
  const [scatterX, scatterY] = useState(() => ({
    x: (Math.random() - 0.5) * scatterDistance,
    y: (Math.random() - 0.5) * scatterDistance
  }));

  useEffect(() => {
    if (!isDragging && !isHovered) {
      // Animate back to scatter position
      animate(x, scatterX.x, { type: "spring", stiffness: 100, damping: 20 });
      animate(y, scatterX.y, { type: "spring", stiffness: 100, damping: 20 });
    } else if (!isDragging && isHovered) {
      // Animate back to original position (0,0) when hovered but not dragging
      animate(x, 0, { type: "spring", stiffness: 200, damping: 25 });
      animate(y, 0, { type: "spring", stiffness: 200, damping: 25 });
    }
  }, [isDragging, isHovered, scatterX.x, scatterX.y]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={elementRef}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        // Animate to scatter position after drag ends
        if (!isHovered) {
          animate(x, scatterX.x, { type: "spring", stiffness: 100, damping: 20 });
          animate(y, scatterX.y, { type: "spring", stiffness: 100, damping: 20 });
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      whileTap={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  // Create refs for different sections to apply scattering
  const heroContentRef = useRef(null);
  
  // Generate random scatter values for each element
  const [scatterPositions] = useState(() => ({
    badge: { x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 40 },
    heading1: { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 50 },
    heading2: { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 50 },
    paragraph: { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 60 },
    buttons: { x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 70 },
    badge1: { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 30 },
    badge2: { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 30 },
    badge3: { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 30 },
  }));

  return (
    <>
      {/* Hero Section */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden bg-slate-950">
        {/* Background with grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-slate-950"></div>
          <div className="bg-radial-overlay" />
          <div className="bg-animated-stripes" />
        </div>
        
        {/* Floating elements - Made draggable */}
        <DraggableElement className="absolute top-20 left-10 w-72 h-72" initialX={scatterPositions.badge1.x} initialY={scatterPositions.badge1.y} scatterDistance={40}>
          <div className="w-full h-full bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        </DraggableElement>
        
        <DraggableElement className="absolute bottom-20 right-10 w-96 h-96" initialX={scatterPositions.badge2.x} initialY={scatterPositions.badge2.y} scatterDistance={60}>
          <div className="w-full h-full bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </DraggableElement>
        
        {/* Main content container */}
        <div className="text-center relative z-10 w-full">
          {/* Trust badge - Made draggable */}
          <DraggableElement className="mb-8 flex justify-center" initialX={scatterPositions.badge.x} initialY={scatterPositions.badge.y} scatterDistance={40}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Trusted by 300+ Companies Worldwide
            </div>
          </DraggableElement>
          
          {/* Heading parts - Made draggable individually */}
          <DraggableElement className="flex justify-center" initialX={scatterPositions.heading1.x} initialY={scatterPositions.heading1.y} scatterDistance={50}>
            <h1 className="text-6xl md:text-8xl font-bold mb-2 leading-tight">
              Build Your Digital
            </h1>
          </DraggableElement>
          
          <DraggableElement className="flex justify-center" initialX={scatterPositions.heading2.x} initialY={scatterPositions.heading2.y} scatterDistance={50}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">Future Today</span>
            </h1>
          </DraggableElement>
          
          {/* Paragraph - Made draggable */}
          <DraggableElement className="flex justify-center" initialX={scatterPositions.paragraph.x} initialY={scatterPositions.paragraph.y} scatterDistance={60}>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Transform your vision into reality with enterprise-grade software solutions.
              <br className="hidden md:block" />
              From MVP to scale, we deliver excellence at every stage.
            </p>
          </DraggableElement>
          
          {/* Buttons - Made draggable */}
          <DraggableElement className="flex flex-col sm:flex-row gap-4 justify-center items-center" initialX={scatterPositions.buttons.x} initialY={scatterPositions.buttons.y} scatterDistance={70}>
            <Link href="/contact">
              <Button className="flex items-center gap-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30">
                Start Your Project <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" className="px-8 py-4 text-lg border-slate-600 hover:border-blue-500 hover:bg-slate-800/50 backdrop-blur-sm">View Our Work</Button>
            </Link>
          </DraggableElement>
          
          {/* Trust badges - Made draggable */}
          <DraggableElement className="mt-16 flex flex-wrap justify-center gap-8 items-center text-slate-500 text-sm" initialX={scatterPositions.badge3.x} initialY={scatterPositions.badge3.y} scatterDistance={40}>
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
          </DraggableElement>
        </div>
      </Section>

      {/* Rest of the sections remain the same */}
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