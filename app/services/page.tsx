import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Our Services — PixelRamp',
  description:
    "Explore PixelRamp's development and consultancy services — web, mobile & SaaS development, graphics & branding, and business, AI, and digital transformation consulting.",
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
