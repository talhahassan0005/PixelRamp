 'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import PricingCard from '@/components/PricingCard';

interface ServiceTier {
  name: string;
  features: string[];
  price?: string;
  short?: string;
  cta?: string;
  recommended?: boolean;
}

interface Service {
  icon: typeof Code2;
  title: string;
  tiers: ServiceTier[];
}

const services: Service[] = [
  {
    icon: Code2,
    title: 'Web Development',
    tiers: [
      {
        name: 'Starter',
        price: 'From £300',
        short: 'Ideal for small businesses, personal brands & one-page launches.',
        cta: 'Book a free consult',
        features: ['Single Page Responsive Landing', 'Basic Contact Form', 'Social Media Integration', '1 Month Free Support', 'Basic on-page SEO', 'Optimised images for performance'],
      },
      {
        name: 'Business',
        price: 'From £1,199',
        short: 'For growing businesses needing CMS, pages & lead capture.',
        cta: 'Request a quote',
        recommended: true,
        features: ['Up to 10 Custom Pages', 'SEO Friendly Structure', 'CMS Integration', 'Speed Optimization', 'CRM / lead capture integration', '3 rounds of content revisions'],
      },
      {
        name: 'Enterprise',
        price: 'From £2,200',
        short: 'Scalable custom web apps, SaaS starters and e-comm platforms.',
        cta: 'Get a custom proposal',
        features: ['Custom Full-Stack Application', 'E-commerce Integration', 'User Authentication & Dashboards', 'High-End Security & API', 'Performance monitoring & SLA', 'Uptime & error monitoring'],
      },
    ],
  },
  {
    icon: Palette,
    title: 'Graphics & Creative Design',
    tiers: [
      {
        name: 'Essential',
        price: 'From £149',
        short: 'Logo, stationery and basic brand assets — perfect for new businesses.',
        cta: 'Start Branding',
        features: ['Professional Logo (2 Concepts)', 'Business Card Design', 'Letterhead & Stationery', 'Favicon & social logo versions', '2 revisions included'],
      },
      {
        name: 'Corporate',
        price: 'From £299',
        short: 'Complete brand identity kit and social assets for growing companies.',
        cta: 'Request Brand Kit',
        recommended: true,
        features: ['Complete Brand Identity Kit', 'Social Media Branding (10 Posts)', 'Flyer/Brochure Design', 'Vector Source Files', 'Basic brand guidelines PDF', 'Source files (AI / PSD)'],
      },
      {
        name: 'Elite',
        price: 'From £600',
        short: 'Premium visual systems, motion graphics and UI assets.',
        cta: 'Get Premium Proposal',
        features: ['3D Brand Assets & Motion Graphics', 'Premium UI/UX Design', 'Complete Brand Style Guide', 'Custom Illustrations', 'Animated logo / intro', 'Prototype screens for web & mobile'],
      },
    ],
  },
  {
    icon: Rocket,
    title: 'SaaS & Software Solutions',
    tiers: [
      {
        name: 'MVP Launch',
        price: 'From £1,500',
        short: 'Build a focussed MVP to validate product-market fit quickly.',
        cta: 'Discuss MVP',
        features: ['Core Feature Development (1-2 Functions)', 'Basic Database Management', 'Standard UI Design', 'Market Validation Ready', 'Staging deployment', 'Basic analytics setup'],
      },
      {
        name: 'Scale-Up',
        price: 'From £2,300',
        short: 'Scale your product with multi-user architecture and subscription billing.',
        cta: 'Scale with Us',
        recommended: true,
        features: ['Multi-User SaaS Architecture', 'Subscription Management (Stripe/PayPal)', 'Advanced User Dashboard', 'Email & Notification System', 'Monitoring & alerts', 'User roles & permissions'],
      },
      {
        name: 'Custom Enterprise',
        price: 'From £3,000',
        short: 'Enterprise-grade solutions with cloud infra, analytics and ML.',
        cta: 'Enterprise Quote',
        features: ['Large-Scale Cloud Infrastructure', 'AI & ML Integration', 'Data Analytics Dashboard', 'Multi-Tenant & Unlimited Scaling', 'Dedicated support & SLA', 'Advanced security review'],
      },
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    tiers: [
      {
        name: 'Basic App',
        price: 'From £500',
        short: 'Single-platform apps to launch your idea quickly.',
        cta: 'Start a Basic App',
        features: ['Single Platform (Android or iOS)', 'Simple UI/UX', 'Push Notifications', 'App Store submission support', 'Crash reporting setup'],
      },
      {
        name: 'Pro App',
        price: 'From £999',
        short: 'Cross-platform apps with API integration and in-app payments.',
        cta: 'Request Pro Quote',
        recommended: true,
        features: ['Cross-Platform (Flutter/React Native)', 'API Integration', 'In-App Purchases', 'Push notification segmentation', 'Analytics integration'],
      },
      {
        name: 'Advanced App',
        price: 'From £2,000',
        short: 'Complex apps with real-time features, offline support and scaling.',
        cta: 'Discuss Advanced App',
        features: ['Real-time Features (Chat/Live Tracking)', 'Complex Backend Architecture', 'Offline Functionality', 'Offline data sync strategy', 'Real-time push & presence'],
      },
    ],
  },
];

// Animation variants for a more professional feel
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const headerVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.99 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'circOut' } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const badgeVariant = {
  hover: { scale: 1.03, boxShadow: '0 8px 24px rgba(99,102,241,0.12)' },
};

const buttonVariant = {
  hover: { scale: 1.03 },
  tap: { scale: 0.98 },
};

export default function ServicesPage() {
  return (
    <Section className="min-h-screen">
      {/* Primary hero and pricing info below — removed duplicate header above */}

      {/* Services Hero Image */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={headerVariant} initial="hidden" animate="show">
            <h1 className="text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-slate-400 mb-4">Affordable but professional packages for UK startups, SMEs and founders.</p>
            <p className="text-sm text-slate-400 mb-6">Prices start from £599 · 50% upfront / 50% on completion · Hosting & domain not included.</p>
            <div className="flex gap-3">
              <a href="#contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Book a Free Call</a>
              <a href="#pricing" className="inline-block border border-slate-700 text-slate-200 px-4 py-2 rounded">View Pricing</a>
            </div>
          </motion.div>

          <motion.div variants={imageVariant} initial="hidden" animate="show" className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
              alt="Services"
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="space-y-16">
        {services.map((service, idx) => (
          <motion.div key={idx} variants={itemVariant} className="">
            <div className="flex items-center gap-3 mb-8">
              <service.icon className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold">{service.title}</h2>
            </div>
            <div id="pricing" className="grid md:grid-cols-3 gap-6">
              {service.tiers.map((tier, i) => (
                <PricingCard key={i} tier={tier as any} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
