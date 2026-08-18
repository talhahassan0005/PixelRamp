import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'Our Portfolio — PixelRamp',
  description:
    'Explore real projects PixelRamp has designed, built, and shipped — from enterprise SaaS platforms to e-commerce, marketplaces, and AI-powered logistics.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
