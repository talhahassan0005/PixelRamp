import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us — PixelRamp',
  description:
    'We are a passionate team of developers, designers, and innovators dedicated to transforming businesses through technology. Learn about our mission, vision, and values.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
