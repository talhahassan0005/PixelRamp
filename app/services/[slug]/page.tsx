import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceById, services } from '@/lib/services-content';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceById(params.slug);

  if (!service) {
    return { title: 'Service Not Found — PixelRamp' };
  }

  const title = `${service.title} — PixelRamp`;
  const description = service.desc;
  const url = `/services/${service.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceById(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient slug={params.slug} />;
}
