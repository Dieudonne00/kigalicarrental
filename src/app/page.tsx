import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedFleet from "@/components/FeaturedFleet";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import EastAfricaDestinations from "@/components/EastAfricaDestinations";
import KigaliCarHireContent from "@/components/KigaliCarHireContent";
import Testimonials from "@/components/Testimonials";
import WhatsAppChatWidget from "@/components/WhatsAppChatWidget";
import HowToBook from "@/components/HowToBook";
import PriceList from "@/components/PriceList";

const SITE = "https://kigalicarrental.site";
const OG_IMAGE = "https://kigalicarrental.site/opengraph-image";

// Static ISR (revalidate) baked a bad build-time DB read into the cached HTML
// and never self-healed across many regeneration windows. Force-dynamic
// guarantees every request - including Googlebot's - gets a fresh read from
// the database, same as /api/cars already does reliably.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kigali Car Rental | Kigali Car Hire | Free Airport Delivery",
  description:
    "Kigali Car Rental — self-drive & chauffeur car hire in Kigali from $35/day. Free airport delivery, full insurance, 24/7 support. Book online or WhatsApp.",
  keywords: "Kigali car rental",
  openGraph: {
    title: "Kigali Car Rental | Kigali Car Hire | Free Airport Delivery",
    description:
      "Self-drive & chauffeur car hire in Kigali from $35/day. Free airport delivery, full insurance, 24/7 support.",
    url: SITE,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kigali Car Rental — quality cars for rental in Rwanda from $35 per day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rental | Kigali Car Hire | Free Airport Delivery",
    description:
      "Self-drive & chauffeur car hire in Kigali from $35/day. Free airport delivery, full insurance, 24/7 support.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Kigali Car Rental",
  description: "Self-drive and chauffeur-driven car rental in Kigali, Rwanda",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/fleet?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CarRental"],
  "@id": `${SITE}/#business`,
  name: "Kigali Car Rental",
  alternateName: ["Kigali Car Rental", "Car Rental Kigali Rwanda", "Kigali Car Rentals"],
  url: SITE,
  telephone: "+250787619387",
  email: "info@kigalicarrental.site",
  image: "https://media.kigalicarhire.rw/cars/car_4c54f821-ab5c-4922-af5b-f9c668468133.jpg",
  logo: { "@type": "ImageObject", url: "/logo.svg", width: 200, height: 60 },
  description:
    "Kigali Car Rental is Rwanda's trusted car rental service offering self-drive cars, chauffeur-driven vehicles, airport transfers and tours across Rwanda and East Africa. Cars from $35 per day.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "KG 648 St",
    addressLocality: "Kigali",
    addressRegion: "Kigali Province",
    postalCode: "0000",
    addressCountry: "RW",
  },
  sameAs: [
    "https://share.google/7TUI877vpCFKLLU0a",
    "https://www.google.com/maps/search/?api=1&query=Kigali+car+hire+car+rental+in+Rwanda+KG+648+St+Kigali",
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.9440727,
    longitude: 30.0618851,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "$",
  currenciesAccepted: "USD, RWF",
  paymentAccepted: "Cash, Mobile Money, Bank Transfer",
  areaServed: [
    { "@type": "City", name: "Kigali", containedInPlace: { "@type": "Country", name: "Rwanda" } },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Burundi" },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Economy Car Rental Kigali",
      description: "Economy and compact cars for rental in Kigali — ideal for city driving and short trips.",
      price: "30",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "30", priceCurrency: "USD", unitText: "DAY" },
      itemOffered: { "@type": "Service", name: "Economy Car Rental Kigali", url: `${SITE}/fleet` },
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    },
    {
      "@type": "Offer",
      name: "4x4 SUV Car Hire Rwanda",
      description: "4x4 SUVs and Land Cruisers for rental or hire — perfect for safari, national parks and off-road trips in Rwanda.",
      price: "80",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "80", priceCurrency: "USD", unitText: "DAY" },
      itemOffered: { "@type": "Service", name: "4x4 Car Hire Rwanda", url: `${SITE}/4x4-car-hire-rwanda` },
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Airport Transfer Kigali",
      description: "24/7 airport pickup and drop-off at Kigali International Airport. Fixed rates, meet and greet.",
      price: "30",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "30", priceCurrency: "USD", unitText: "TRIP" },
      itemOffered: { "@type": "Service", name: "Airport Transfer Kigali", url: `${SITE}/airport-transfer-kigali` },
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Chauffeur Car Rental Kigali",
      description: "Professional chauffeur-driven car rental in Kigali for business, tours and special occasions.",
      price: "60",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "60", priceCurrency: "USD", unitText: "DAY" },
      itemOffered: { "@type": "Service", name: "Chauffeur Service Kigali", url: `${SITE}/corporate-car-hire-kigali` },
      availability: "https://schema.org/InStock",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car Hire & Rental Services in Kigali",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Self-Drive Car Hire Kigali", url: `${SITE}/self-drive-rwanda` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chauffeur Service Kigali", url: `${SITE}/corporate-car-hire-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfer Kigali International Airport", url: `${SITE}/airport-transfer-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gorilla Trekking Car Hire Rwanda", url: `${SITE}/gorilla-trekking-car-hire` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Car Hire Kigali", url: `${SITE}/luxury-car-hire-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Car Hire Kigali", url: `${SITE}/wedding-car-hire-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "East Africa Cross-Border Car Hire", url: `${SITE}/tours` } },
    ],
  },
  // No aggregateRating or review array here - there's no real review
  // system wired up in this codebase yet, and these were previously 8
  // fabricated reviews attributed to invented names plus a made-up
  // 4.9/38 rating. Never publish invented trust signals - add this back
  // only once genuine, verifiable reviews exist.
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does car rental in Kigali cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Car rental prices start from $35 per day for economy cars. SUVs and 4x4s range from $60 to $120 per day. We offer discounted weekly and monthly rates. All prices include third-party insurance and 24/7 roadside support.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer self-drive car rental in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer self-drive rentals to customers with a valid driving licence. You can rent a car in Kigali and explore Rwanda at your own pace — Akagera National Park, Volcanoes National Park, Lake Kivu, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get an airport pickup from Kigali International Airport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide 24/7 airport pickup and drop-off at Kigali International Airport. Our drivers meet you at arrivals with a name board and assist with luggage. Fixed pricing with no surprise fees.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need to rent a car in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To rent a car with us you need a valid driving licence (an international driving permit is recommended for foreign visitors), a passport or national ID, and a deposit paid by mobile money, bank transfer or cash.",
      },
    },
    {
      "@type": "Question",
      name: "Do you deliver the rental car to my hotel in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer free car delivery to any hotel or address in Kigali city. Delivery outside Kigali is available for a small additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "Is Kigali car rental available 24/7?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We are available 24 hours a day, 7 days a week for bookings, airport pickups, and roadside assistance. You can reach us by phone, WhatsApp or email at any time.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer cross-border car rental from Rwanda to Uganda, Tanzania or Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer cross-border car rental and chauffeured transfers from Rwanda to Uganda, Tanzania, Kenya, Burundi, and DRC. We handle all border crossing permits and insurance. Contact us for a custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best car rental company in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer one of the widest fleets in Kigali — economy cars, SUVs, 4x4 Land Cruisers and luxury vehicles — with free hotel delivery, 24/7 support and transparent pricing from $35 per day.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire a car in Kigali without a credit card?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We accept payment by MTN Mobile Money, Airtel Money, bank transfer and cash. No credit card is required. A refundable deposit is required for self-drive rentals.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a car rental in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a car rental in Kigali through three ways: (1) online via our booking form at kigalicarrental.site/book-now, (2) by calling or WhatsApp at +250 787 619 387, or (3) by email at info@kigalicarrental.site. We confirm all bookings within 30 minutes.",
      },
    },
  ],
};


const CARS_SELECT = {
  id: true,
  name: true,
  brand: true,
  model: true,
  year: true,
  category: true,
  transmission: true,
  seats: true,
  fuelType: true,
  dailyRate: true,
  weeklyRate: true,
  monthlyRate: true,
  images: true,
  videoUrl: true,
} as const;

async function getAvailableCars() {
  // Supabase's connection pooler has intermittently rejected connections
  // throughout this project ("max clients reached"). A single retry lets a
  // request recover from that within itself. We deliberately never throw
  // here: throwing during a live request (not just a background ISR
  // revalidation) returns a hard 500 to whoever asked for the page -
  // including Googlebot - which is worse than briefly showing stale data.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const cars = await prisma.car.findMany({
        where: { available: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        select: CARS_SELECT,
      });
      if (cars.length > 0) return cars;
    } catch {
      // fall through to retry
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 400));
  }
  return [];
}

export default async function Home() {
  const allCars = await getAvailableCars();

  const minPrice = allCars.length > 0 ? Math.min(...allCars.map((c) => c.dailyRate)) : 30;

  const priceByCategory = new Map<string, { fromDaily: number; fromWeekly: number | null; fromMonthly: number | null; example: string }>();
  for (const car of allCars) {
    const cat = (car.category || "other").toLowerCase();
    const existing = priceByCategory.get(cat);
    if (!existing || car.dailyRate < existing.fromDaily) {
      priceByCategory.set(cat, {
        fromDaily: car.dailyRate,
        fromWeekly: car.weeklyRate,
        fromMonthly: car.monthlyRate,
        example: car.name.trim(),
      });
    }
  }
  const categoryOrder = ["sedan", "economy", "suv", "van", "luxury"];
  const categoryPrices = Array.from(priceByCategory.entries())
    .sort((a, b) => categoryOrder.indexOf(a[0]) - categoryOrder.indexOf(b[0]))
    .map(([category, v]) => ({ category, ...v }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <HeroSection minPrice={minPrice} />
        <FeaturedFleet cars={allCars} />
        <HowToBook />
        <EastAfricaDestinations />
        <ServicesSection />
        <WhyChooseUs />
        <PriceList prices={categoryPrices} />
        <Testimonials fleetCount={allCars.length} />
        <KigaliCarHireContent />
        <FAQSection />
        <FeaturedBlogs />
      </main>
      <WhatsAppChatWidget />
    </>
  );
}
