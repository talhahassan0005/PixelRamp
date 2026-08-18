import type { Metadata } from 'next';
import HowItWorksPageClient from './HowItWorksPageClient';

export const metadata: Metadata = {
  title: 'How It Works — PixelRamp',
  description:
    "See PixelRamp's process from free consultation to delivery — how we turn your idea into a scalable, production-ready product.",
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  return <HowItWorksPageClient />;
}
