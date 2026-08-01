import {
  Code2,
  Palette,
  Rocket,
  Smartphone,
  Workflow,
  Bot,
  Compass,
  ClipboardList,
  Users,
  Gauge,
  LucideIcon,
} from 'lucide-react';

export type ServicePackage = { name: string; price: string; for: string };

export type ServiceContent = {
  id: string;
  category: 'Build' | 'Consulting';
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  outcomes: string[];
  packages: ServicePackage[];
};

export const services: ServiceContent[] = [
  {
    id: 'web-development',
    category: 'Build',
    icon: Code2,
    title: 'Web Development',
    tagline: 'Your business deserves more than a template.',
    desc: 'From landing pages to complex web applications — we build fast, scalable, and conversion-focused websites tailored to your goals.',
    outcomes: [
      'More leads from organic & paid traffic',
      'Professional credibility that builds trust',
      'Scalable architecture that grows with you',
    ],
    packages: [
      { name: 'Starter', price: 'From £300', for: 'New businesses & MVPs' },
      { name: 'Business', price: 'From £1,199', for: 'Growing companies' },
      { name: 'Enterprise', price: 'From £2,200', for: 'Complex web applications' },
    ],
  },
  {
    id: 'graphics-branding',
    category: 'Build',
    icon: Palette,
    title: 'Graphics & Branding',
    tagline: 'First impressions are built on design.',
    desc: 'A strong brand identity sets you apart. We create visual systems that communicate your value instantly and consistently.',
    outcomes: [
      'Brand recognition that sticks',
      'Consistent identity across all channels',
      'Design that attracts your ideal client',
    ],
    packages: [
      { name: 'Essential', price: 'From £149', for: 'Startups & solo founders' },
      { name: 'Corporate', price: 'From £299', for: 'Established businesses' },
      { name: 'Elite', price: 'From £600', for: 'Premium brand systems' },
    ],
  },
  {
    id: 'saas-solutions',
    category: 'Build',
    icon: Rocket,
    title: 'SaaS Solutions',
    tagline: 'Turn your idea into a product people pay for.',
    desc: 'We build SaaS platforms from scratch — authentication, billing, dashboards, APIs. Everything you need to launch and scale.',
    outcomes: [
      'Launch faster with a validated MVP',
      'Recurring revenue from day one',
      'Architecture built to handle growth',
    ],
    packages: [
      { name: 'MVP Launch', price: 'From £1,500', for: 'First-time SaaS founders' },
      { name: 'Scale-Up', price: 'From £2,300', for: 'Growing SaaS products' },
      { name: 'Enterprise', price: 'From £3,000', for: 'Large-scale platforms' },
    ],
  },
  {
    id: 'mobile-apps',
    category: 'Build',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Your customers are on their phones. Be there.',
    desc: 'Native and cross-platform mobile apps that deliver real value. Built for performance, designed for engagement.',
    outcomes: [
      'Reach users on iOS & Android',
      'Higher engagement than mobile web',
      'App Store presence that builds authority',
    ],
    packages: [
      { name: 'Basic App', price: 'From £500', for: 'Single-platform apps' },
      { name: 'Pro App', price: 'From £999', for: 'Cross-platform apps' },
      { name: 'Advanced', price: 'From £2,000', for: 'Complex real-time apps' },
    ],
  },
  {
    id: 'business-process-analysis',
    category: 'Consulting',
    icon: Workflow,
    title: 'Business Process Analysis & Improvement',
    tagline: 'Your operations shouldn’t be working against you.',
    desc: 'We analyze how your business actually runs — bottlenecks, manual work, and inefficiencies — and redesign the process to save time and cost.',
    outcomes: [
      'A clear picture of where time and money leak',
      'Streamlined workflows your team can actually follow',
      'Measurable efficiency gains within weeks',
    ],
    packages: [
      { name: 'Discovery Session', price: 'From £150', for: 'A single-session process audit' },
      { name: 'Strategic Advisory', price: 'From £600', for: 'Ongoing guidance & roadmap' },
      { name: 'Full Engagement', price: 'From £1,500', for: 'Hands-on redesign & rollout' },
    ],
  },
  {
    id: 'ai-business-automation',
    category: 'Consulting',
    icon: Bot,
    title: 'AI & Business Automation',
    tagline: 'Let AI handle the repetitive work.',
    desc: 'We identify where AI and automation can replace manual, repetitive tasks — from customer support to data entry — and implement solutions that actually fit your workflow.',
    outcomes: [
      'Hours saved every week on repetitive tasks',
      'AI tools tailored to your business, not a generic chatbot',
      'Faster response times for customers and internal teams',
    ],
    packages: [
      { name: 'Discovery Session', price: 'From £150', for: 'Automation opportunity assessment' },
      { name: 'Strategic Advisory', price: 'From £600', for: 'Ongoing guidance & roadmap' },
      { name: 'Full Engagement', price: 'From £1,500', for: 'End-to-end automation build' },
    ],
  },
  {
    id: 'digital-transformation-strategy',
    category: 'Consulting',
    icon: Compass,
    title: 'Digital Transformation Strategy',
    tagline: 'Modernize without the guesswork.',
    desc: 'We assess your current systems and build a practical roadmap for going digital — the right tools, in the right order, at the right pace for your business.',
    outcomes: [
      'A prioritized digital roadmap, not a wishlist',
      'Technology decisions backed by your actual needs',
      'A clear budget and timeline before you commit to anything',
    ],
    packages: [
      { name: 'Discovery Session', price: 'From £150', for: 'Current-state assessment' },
      { name: 'Strategic Advisory', price: 'From £600', for: 'Ongoing guidance & roadmap' },
      { name: 'Full Engagement', price: 'From £1,500', for: 'Roadmap plus implementation oversight' },
    ],
  },
  {
    id: 'custom-software-planning',
    category: 'Consulting',
    icon: ClipboardList,
    title: 'Custom Software & Web Solution Planning',
    tagline: 'Plan it right before you build it.',
    desc: 'Before writing a line of code, we help you define scope, architecture, and requirements — so your custom software project starts on solid ground.',
    outcomes: [
      'A detailed spec your developers can actually build from',
      'Avoided scope creep and budget overruns',
      'Technical decisions made before the money is spent',
    ],
    packages: [
      { name: 'Discovery Session', price: 'From £150', for: 'Requirements-gathering session' },
      { name: 'Strategic Advisory', price: 'From £600', for: 'Ongoing guidance & roadmap' },
      { name: 'Full Engagement', price: 'From £1,500', for: 'Full spec, architecture & vendor brief' },
    ],
  },
  {
    id: 'crm-business-systems',
    category: 'Consulting',
    icon: Users,
    title: 'CRM & Business System Consulting',
    tagline: 'Your customer data should work for you.',
    desc: 'We help you choose, configure, or fix your CRM and business systems so your team can actually use the data you’re collecting.',
    outcomes: [
      'A CRM your team actually adopts',
      'Cleaner data and more reliable reporting',
      'Systems that talk to each other instead of working in silos',
    ],
    packages: [
      { name: 'Discovery Session', price: 'From £150', for: 'CRM & systems audit' },
      { name: 'Strategic Advisory', price: 'From £600', for: 'Ongoing guidance & roadmap' },
      { name: 'Full Engagement', price: 'From £1,500', for: 'Setup, migration & configuration' },
    ],
  },
  {
    id: 'operational-efficiency',
    category: 'Consulting',
    icon: Gauge,
    title: 'Operational Efficiency & Cost Optimisation',
    tagline: 'Do more with what you already have.',
    desc: 'We review your operations end-to-end and identify concrete opportunities to cut costs and improve efficiency without sacrificing quality.',
    outcomes: [
      'Identified cost savings with a clear ROI',
      'Leaner operations without cutting corners',
      'A prioritized action plan, not just a report',
    ],
    packages: [
      { name: 'Discovery Session', price: 'From £150', for: 'Operations & cost audit' },
      { name: 'Strategic Advisory', price: 'From £600', for: 'Ongoing guidance & roadmap' },
      { name: 'Full Engagement', price: 'From £1,500', for: 'Full optimisation rollout' },
    ],
  },
];

export function getServiceById(id: string) {
  return services.find((s) => s.id === id);
}
