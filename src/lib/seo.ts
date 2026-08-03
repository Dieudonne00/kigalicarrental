// SEO Configuration for Next.js App Router (using Metadata API)
// "Kigali car rental" is the one and only declared target keyword for this
// site - every page's metadata should reinforce this exact phrase rather
// than splitting focus across loosely related variants.
export const defaultSEO = {
  title: {
    template: '%s | Kigali Car Rental',
    default: 'Kigali Car Rental - Premium Car Rental Services in Rwanda',
  },
  description:
    'Kigali Car Rental - rent quality vehicles in Kigali, Rwanda. Affordable pricing, local expertise, and flexible rental solutions for all your transportation needs.',
  keywords: ['Kigali car rental'],
  authors: [{ name: 'Kigali Car Rental' }],
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: 'https://kigalicarrental.site',
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
  // No real Twitter/X account exists for this business - never fabricate a
  // handle, same standard applied to every other trust signal on this site.
};
