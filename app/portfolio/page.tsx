'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  ShieldCheck,
  Truck,
  Coffee,
  Palette,
  ShoppingBag,
  Ship,
  LucideIcon,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  icon: LucideIcon;
  gradient: string;
};

const projects: Project[] = [
  {
    title: 'TrueSofts Platform',
    category: 'Enterprise SaaS',
    description:
      'Enterprise-grade software solutions platform built on a production Next.js stack with a scalable architecture, modern UI/UX, and a performance-optimized, fully responsive layout.',
    tags: ['Next.js', 'Enterprise', 'Scalable Architecture'],
    url: 'https://truesofts-nine.vercel.app/',
    icon: Layers,
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Visitor Management System',
    category: 'Corporate Security',
    description:
      'Intelligent corporate visitor tracking system with authentication, role-based access control (RBAC), real-time registration, and secure database-driven security workflows.',
    tags: ['Auth + RBAC', 'Real-time DB', 'Security'],
    url: 'https://visitor-management-sa.vercel.app/',
    icon: ShieldCheck,
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'FleetXchange Africa',
    category: 'Marketplace Platform',
    description:
      'A robust marketplace for fleet management and vehicle exchange featuring user dashboards, inventory management, and seamless end-to-end transaction workflows.',
    tags: ['Marketplace', 'Dashboards', 'Inventory'],
    url: 'http://fleetxchange.africa/',
    icon: Truck,
    gradient: 'from-orange-600 to-amber-600',
  },
  {
    title: 'Brewly',
    category: 'E-Commerce',
    description:
      'E-commerce platform for specialty coffee and brewing equipment with a full product catalog, shopping cart, order management, and integrated payment flows.',
    tags: ['E-commerce', 'Payments', 'Order Management'],
    url: 'https://www.brewly.ae/',
    icon: Coffee,
    gradient: 'from-rose-600 to-pink-600',
  },
  {
    title: 'Pixel Ramp',
    category: 'Creative Agency',
    description:
      'Creative agency website with cutting-edge UI/UX, interactive sections, micro-animations, and a fully responsive layout that brings the brand to life.',
    tags: ['UI/UX', 'Animations', 'Responsive'],
    url: 'https://www.pixel-ramp.com/',
    icon: Palette,
    gradient: 'from-fuchsia-600 to-purple-600',
  },
  {
    title: 'BabaHub',
    category: 'Multi-Vendor Marketplace',
    description:
      'Multi-vendor marketplace connecting businesses and consumers with advanced search, secure payment processing, and dedicated vendor dashboards.',
    tags: ['Multi-vendor', 'Advanced Search', 'Secure Payments'],
    url: 'https://babahub.co/',
    icon: ShoppingBag,
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'ShipSense',
    category: 'AI Logistics',
    description:
      'AI-powered logistics intelligence platform with real-time shipment tracking, predictive analytics, an agentic chatbot, automated notifications, and a comprehensive dashboard.',
    tags: ['AI / ML', 'Predictive Analytics', 'Real-time Tracking'],
    url: 'https://ship-sense.vercel.app/',
    icon: Ship,
    gradient: 'from-violet-600 to-purple-600',
  },
];

export default function PortfolioPage() {
  return (
    <Section className="min-h-screen">
      <FadeIn className="text-center mb-16">
        <p className="text-blue-500 font-semibold mb-3 uppercase tracking-wider">Our Work</p>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Our Portfolio
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          A selection of products and platforms we&apos;ve designed, built, and shipped. Explore each one live.
        </p>
      </FadeIn>

      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <StaggerItem key={project.url}>
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-600/50 transition-all backdrop-blur-sm"
              >
                <div className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <Icon className="text-white/90" size={56} />
                  <span className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-white/90 bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">{project.category}</p>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-blue-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    Visit Live Site
                    <ExternalLink size={16} />
                  </span>
                </div>
              </motion.a>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <FadeIn className="mt-20 text-center p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-600/30 shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Have a project in mind?</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s turn your idea into a polished, production-ready product. Get in touch and let&apos;s build something great together.
        </p>
        <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start Your Project
        </a>
      </FadeIn>
    </Section>
  );
}
