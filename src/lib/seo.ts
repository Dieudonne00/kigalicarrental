// SEO Configuration for Next.js App Router (using Metadata API)
export const defaultSEO = {
  title: {
    template: '%s | Kigali Car Rental',
    default: 'Kigali Car Rental - Premium Car Rental Services in Rwanda',
  },
  description:
    'Kigali car rental with quality vehicles in Rwanda. Affordable pricing, local expertise, and flexible rental solutions for all your transportation needs.',
  keywords: [
    'Kigali car rental',
    'car rental Kigali',
    'car hire Rwanda',
    'rent a car Kigali',
    'vehicle rental Rwanda',
    'affordable car rental',
  ],
  authors: [{ name: 'Kigali Car Rental' }],
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'Kigali Car Rental',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kigali Car Rental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kigalicarhire',
    creator: '@kigalicarhire',
  },
};
