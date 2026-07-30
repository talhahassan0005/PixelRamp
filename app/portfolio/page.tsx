'use client';

import Image from 'next/image';
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
  AlertTriangle,
  Lightbulb,
  LucideIcon,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

type Project = {
  title: string;
  category: string;
  problem: string;
  solution: string;
  tags: string[];
  url: string;
  icon: LucideIcon;
  gradient: string;
};

// Live screenshot of the project URL via WordPress's free mshots service.
// On a site's very first request it may briefly return a "generating…" placeholder
// before the real screenshot is cached — reload the page a moment later if so.
function getScreenshotUrl(url: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500`;
}

const projects: Project[] = [
  {
    title: 'TrueSofts Platform',
    category: 'Enterprise SaaS',
    problem:
      'TrueSofts needed a credible, enterprise-grade web presence to sell its software solutions, but their existing site couldn’t scale or perform at the level enterprise buyers expect.',
    solution:
      'We built a production-grade Next.js platform with a scalable architecture, modern UI/UX, and performance-optimized responsive design that positions them as an enterprise-ready vendor.',
    tags: ['Next.js', 'Enterprise', 'Scalable Architecture'],
    url: 'https://truesofts-nine.vercel.app/',
    icon: Layers,
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Visitor Management System',
    category: 'Corporate Security',
    problem:
      'Manual, paper-based visitor logs left the client’s facilities exposed, with no way to verify identities, control access, or audit who entered the building and when.',
    solution:
      'We delivered a secure visitor management system with authentication, role-based access control, and real-time, database-driven registration that gives security teams full visibility and control.',
    tags: ['Auth + RBAC', 'Real-time DB', 'Security'],
    url: 'https://visitor-management-sa.vercel.app/',
    icon: ShieldCheck,
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'FleetXchange Africa',
    category: 'Marketplace Platform',
    problem:
      'Fleet operators across Africa had no centralized platform to list, discover, or exchange vehicles, so deals happened informally, slowly, and without visibility into inventory.',
    solution:
      'We built a marketplace with user dashboards, inventory management, and end-to-end transaction workflows that connects buyers and sellers and moves fleet deals online.',
    tags: ['Marketplace', 'Dashboards', 'Inventory'],
    url: 'http://fleetxchange.africa/',
    icon: Truck,
    gradient: 'from-orange-600 to-amber-600',
  },
  {
    title: 'Brewly',
    category: 'E-Commerce',
    problem:
      'Brewly’s specialty coffee and brewing equipment business had no way to sell online, limiting them to in-person and word-of-mouth sales.',
    solution:
      'We launched a full e-commerce platform with a product catalog, shopping cart, order management, and integrated payments, opening a direct online revenue channel.',
    tags: ['E-commerce', 'Payments', 'Order Management'],
    url: 'https://www.brewly.ae/',
    icon: Coffee,
    gradient: 'from-rose-600 to-pink-600',
  },
  {
    title: 'Pixel Ramp',
    category: 'Creative Agency',
    problem:
      'As an agency, our own site needed to prove our capability on first impression, and a generic template wouldn’t convince clients we could build something distinctive.',
    solution:
      'We designed and built a site with bold UI/UX, interactive sections, and micro-animations that functions as a live portfolio piece in itself.',
    tags: ['UI/UX', 'Animations', 'Responsive'],
    url: 'https://www.pixel-ramp.com/',
    icon: Palette,
    gradient: 'from-fuchsia-600 to-purple-600',
  },
  {
    title: 'BabaHub',
    category: 'Multi-Vendor Marketplace',
    problem:
      'Independent vendors had no shared platform to reach consumers, and buyers had no single place to discover and purchase from multiple sellers with confidence.',
    solution:
      'We built a multi-vendor marketplace with advanced search, secure payment processing, and dedicated vendor dashboards, giving vendors their own storefront and buyers a trusted checkout.',
    tags: ['Multi-vendor', 'Advanced Search', 'Secure Payments'],
    url: 'https://babahub.co/',
    icon: ShoppingBag,
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'ShipSense',
    category: 'AI Logistics',
    problem:
      'Logistics teams lacked real-time visibility into shipments and had no way to anticipate delays before they became costly problems.',
    solution:
      'We built an AI-powered logistics platform with real-time tracking, predictive analytics, an agentic chatbot, and automated notifications that turns raw shipment data into proactive decisions.',
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
                <div className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <Image
                    src={getScreenshotUrl(project.url)}
                    alt={`${project.title} — live site screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-lg bg-black/40 backdrop-blur-sm">
                    <Icon className="text-white" size={18} />
                  </span>
                  <span className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-white/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">{project.category}</p>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h2>

                  <div className="flex-1 space-y-4 mb-4">
                    <div className="pl-3 border-l-2 border-amber-500/60">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-500 mb-1">
                        <AlertTriangle size={13} />
                        The Challenge
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="pl-3 border-l-2 border-emerald-500/60">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-500 mb-1">
                        <Lightbulb size={13} />
                        Our Solution
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

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
