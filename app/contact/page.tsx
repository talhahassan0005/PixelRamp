import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us — PixelRamp',
  description:
    'Get in touch with PixelRamp to discuss your project. Book a free consultation or send us a message — we usually respond within 24 hours.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
