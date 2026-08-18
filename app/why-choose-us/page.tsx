import type { Metadata } from 'next';
import WhyChooseUsPageClient from './WhyChooseUsPageClient';

export const metadata: Metadata = {
  title: 'Why Choose PixelRamp',
  description:
    'See what sets PixelRamp apart — transparent pricing, on-time delivery, direct access to your team, and a track record trusted across industries.',
  alternates: { canonical: '/why-choose-us' },
};

export default function WhyChooseUsPage() {
  return <WhyChooseUsPageClient />;
}
