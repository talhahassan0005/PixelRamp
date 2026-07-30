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
  AlertTriangle,
  Lightbulb,
  LucideIcon,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

type Visual = 'dashboard' | 'security' | 'marketplace' | 'ecommerce' | 'creative' | 'vendor' | 'logistics';

type Project = {
  title: string;
  category: string;
  problem: string;
  solution: string;
  tags: string[];
  url: string;
  icon: LucideIcon;
  gradient: string;
  visual: Visual;
};

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
    visual: 'dashboard',
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
    visual: 'security',
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
    visual: 'marketplace',
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
    visual: 'ecommerce',
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
    visual: 'creative',
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
    visual: 'vendor',
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
    visual: 'logistics',
  },
];

// Illustrated product mockups — not literal screenshots, but a stylized UI
// matching what each product actually does, so the card gives an honest
// impression of the software without claiming to be a live capture.
function ProjectVisual({ variant }: { variant: Visual }) {
  const chrome = 'fill-white/15';
  const chromeStrong = 'fill-white/30';
  const line = 'fill-white/25';

  switch (variant) {
    case 'dashboard':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect x="16" y="16" width="90" height="218" rx="8" className={chrome} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="30" y={40 + i * 30} width={i === 1 ? 60 : 46} height="8" rx="4" className={i === 1 ? chromeStrong : line} />
          ))}
          <rect x="122" y="16" width="262" height="34" rx="8" className={chrome} />
          <circle cx="360" cy="33" r="10" className={chromeStrong} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={122 + i * 90} y="64" width="78" height="52" rx="8" className={chrome} />
          ))}
          <rect x="122" y="130" width="262" height="104" rx="8" className={chrome} />
          {[38, 62, 48, 74, 56, 82, 44].map((h, i) => (
            <rect key={i} x={140 + i * 32} y={222 - h} width="18" height={h} rx="3" className={chromeStrong} />
          ))}
        </svg>
      );
    case 'security':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <path d="M200 24 L262 46 V108 C262 152 236 186 200 200 C164 186 138 152 138 108 V46 Z" className="fill-white/10" />
          <path d="M182 108 L196 122 L222 92" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="30" y="150" width="150" height="80" rx="10" className={chrome} />
          <circle cx="58" cy="178" r="14" className={chromeStrong} />
          <rect x="82" y="170" width="80" height="7" rx="3.5" className={line} />
          <rect x="82" y="184" width="56" height="7" rx="3.5" className={line} />
          <rect x="46" y="204" width="118" height="14" rx="7" className="fill-emerald-300/40" />
          <rect x="242" y="150" width="128" height="80" rx="10" className={chrome} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="262" cy={172 + i * 18} r="5" className="fill-emerald-300/70" />
              <rect x="276" y={168 + i * 18} width="78" height="7" rx="3.5" className={line} />
            </g>
          ))}
        </svg>
      );
    case 'marketplace':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect x="16" y="16" width="368" height="30" rx="15" className={chrome} />
          <circle cx="34" cy="31" r="7" className={chromeStrong} />
          <rect x="50" y="26" width="120" height="10" rx="5" className={line} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${16 + (i % 2) * 190}, ${64 + Math.floor(i / 2) * 90})`}>
              <rect width="176" height="80" rx="10" className={chrome} />
              <rect x="12" y="12" width="70" height="46" rx="6" className={chromeStrong} />
              <rect x="92" y="16" width="70" height="8" rx="4" className={line} />
              <rect x="92" y="32" width="50" height="8" rx="4" className={line} />
              <rect x="92" y="54" width="42" height="14" rx="7" className="fill-amber-300/40" />
            </g>
          ))}
        </svg>
      );
    case 'ecommerce':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect x="16" y="16" width="220" height="10" rx="5" className={chromeStrong} />
          <circle cx="368" cy="26" r="16" className={chrome} />
          <circle cx="374" cy="20" r="6" className="fill-rose-300/60" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${16 + (i % 2) * 190}, ${52 + Math.floor(i / 2) * 92})`}>
              <rect width="176" height="80" rx="10" className={chrome} />
              <circle cx="40" cy="40" r="26" className={chromeStrong} />
              <rect x="82" y="24" width="80" height="9" rx="4.5" className={line} />
              <rect x="82" y="42" width="56" height="9" rx="4.5" className={line} />
              <rect x="82" y="60" width="38" height="14" rx="7" className="fill-rose-300/40" />
            </g>
          ))}
        </svg>
      );
    case 'creative':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="330" cy="60" r="70" className="fill-white/10" />
          <circle cx="60" cy="200" r="50" className="fill-white/10" />
          <rect x="32" y="70" width="220" height="20" rx="10" className={chromeStrong} />
          <rect x="32" y="100" width="150" height="12" rx="6" className={line} />
          <rect x="32" y="160" width="90" height="34" rx="17" className="fill-white/25" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={230 + i * 44} y="150" width="30" height="30" rx="8" className={chrome} />
          ))}
        </svg>
      );
    case 'vendor':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect x="16" y="16" width="368" height="28" rx="14" className={chrome} />
          <circle cx="32" cy="30" r="6" className={chromeStrong} />
          <rect x="46" y="25" width="140" height="10" rx="5" className={line} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${16 + i * 92}, 62)`}>
              <rect width="80" height="100" rx="10" className={chrome} />
              <circle cx="40" cy="34" r="20" className={chromeStrong} />
              <rect x="14" y="62" width="52" height="8" rx="4" className={line} />
              <rect x="22" y="78" width="36" height="8" rx="4" className="fill-amber-300/40" />
            </g>
          ))}
        </svg>
      );
    case 'logistics':
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect x="16" y="16" width="368" height="218" rx="10" className="fill-white/8" />
          <path d="M40 190 C110 120 150 200 220 110 S330 60 372 40" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
          <circle cx="40" cy="190" r="9" className="fill-white/50" />
          <circle cx="220" cy="110" r="9" className="fill-violet-300/70" />
          <circle cx="372" cy="40" r="9" className="fill-white/50" />
          <rect x="230" y="150" width="140" height="66" rx="10" className={chrome} />
          <rect x="244" y="162" width="60" height="8" rx="4" className={line} />
          <rect x="244" y="178" width="90" height="8" rx="4" className={line} />
          <rect x="244" y="194" width="46" height="12" rx="6" className="fill-violet-300/40" />
        </svg>
      );
  }
}

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
                  <div className="absolute inset-0 p-4 opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500">
                    <ProjectVisual variant={project.visual} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
