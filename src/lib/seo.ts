// SEO Configuration for Next.js App Router (using Metadata API)
export const defaultSEO = {
  title: {
    template: '%s | Kigali Car Hire',
    default: 'Kigali Car Hire - Premium Car Rental Services in Rwanda',
  },
  description:
    'Rent quality vehicles in Kigali, Rwanda. Affordable pricing, local expertise, and flexible rental solutions for all your transportation needs.',
  keywords: [
    'car rental Kigali',
    'car hire Rwanda',
    'rent a car Kigali',
    'vehicle rental Rwanda',
    'affordable car rental',
    'luxury car hire',
  ],
  authors: [{ name: 'Kigali Car Hire' }],
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'Kigali Car Hire',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kigali Car Hire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kigalicarhire',
    creator: '@kigalicarhire',
  },
};
