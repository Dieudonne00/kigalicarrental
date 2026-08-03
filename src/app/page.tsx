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

const SITE = "https://kigalicarrental.site";
const OG_IMAGE = "https://kigalicarrental.site/opengraph-image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kigali Car Rental | Rent a Car in Rwanda from $30/day",
  description:
    "Kigali Car Rental — Rwanda's trusted car rental company. From $30/day: SUVs, 4x4 Land Cruisers, luxury & economy. Free Kigali hotel delivery. Airport pickup 24/7. Self-drive or chauffeur. Call +250 787 619 387.",
  keywords: "Kigali car rental",
  openGraph: {
    title: "Kigali Car Rental | Rent a Car in Rwanda from $30/day",
    description:
      "Rwanda's trusted car rental from $30/day. 50+ vehicles: SUVs, 4x4 Land Cruisers, luxury & economy. Self-drive or chauffeur. Airport pickup 24/7. Free Kigali delivery.",
    url: SITE,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kigali Car Rental — quality cars for rental in Rwanda from $30 per day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rental | Rent a Car in Rwanda from $30/day",
    description:
      "Rwanda's trusted car rental from $30/day. SUVs, 4x4, luxury & economy. Airport pickup 24/7. Free Kigali delivery.",
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
  description: "Rwanda's most trusted car rental service",
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
    "Kigali Car Rental is Rwanda's trusted car rental service offering self-drive cars, chauffeur-driven vehicles, airport transfers and tours across Rwanda and East Africa. Cars from $30 per day.",
  foundingDate: "1990",
  founder: { "@type": "Person", name: "Obed Dieudonne" },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "KG 648 St",
    addressLocality: "Kigali",
    addressRegion: "Kigali Province",
    postalCode: "0000",
    addressCountry: "RW",
  },
  sameAs: [
    "https://share.google/bagc78zxCxtwqa1ZS",
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
      itemOffered: { "@type": "Service", name: "Chauffeur Service Kigali", url: `${SITE}/self-drive-rwanda` },
      availability: "https://schema.org/InStock",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car Hire & Rental Services in Kigali",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Self-Drive Car Hire Kigali", url: `${SITE}/self-drive-rwanda` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chauffeur Service Kigali", url: `${SITE}/self-drive-rwanda` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfer Kigali International Airport", url: `${SITE}/airport-transfer-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gorilla Trekking Car Hire Rwanda", url: `${SITE}/gorilla-trekking-car-hire` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Car Hire Kigali", url: `${SITE}/luxury-car-hire-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Car Hire Kigali", url: `${SITE}/wedding-car-hire-kigali` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "East Africa Cross-Border Car Hire", url: `${SITE}/self-drive-rwanda` } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "38",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Be Dynamic" },
      datePublished: "2024-06-01",
      reviewBody: "I had a 48-hour layover in Kigali and squeezed every second out of it thanks to Obed. He picked me up from Lemigo Hotel and we spent the entire day exploring Kigali. Safe, punctual, and a lovely driver with deep knowledge of Rwanda history and culture. I have already recommended him to seven people traveling to Kigali.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Donald Swen" },
      datePublished: "2024-07-01",
      reviewBody: "Owner is a nice guy. Car was super clean. Arrived on time. Very flexible. Highly recommend. Will definitely use his service next time.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Geoffrey Mumford" },
      datePublished: "2024-08-01",
      reviewBody: "Obed was an excellent driver and picked me up right on time. Friendly and knowledgeable. I highly recommend him for all your transit needs!",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Paul-Marie PETROCH" },
      datePublished: "2024-12-01",
      reviewBody: "Very easy to reach, the car was available quickly. The car was well maintained and clean. For return it was also fast to give the car back. I recommend this company.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Laura Waters" },
      datePublished: "2024-07-01",
      reviewBody: "Brilliant service! Great driver, knowledgeable guide, recommended.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Emmanuel Manirarora" },
      datePublished: "2024-08-01",
      reviewBody: "Kigali Car Rental is a reliable car rental service in Kigali. I have used their services multiple times, and they have consistently met my needs and expectations.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "TimN" },
      datePublished: "2024-06-01",
      reviewBody: "10 out of 10. Good cars and service. Car and driver. Obed is the best. We did also a multiple day trip with car and driver. It was super. Thank you.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Gisele UWIZEYIMANA" },
      datePublished: "2024-06-01",
      reviewBody: "Rented a car with this company the car was good and the service was good too. I am recommending this company as best car rental company in Rwanda for the best car and service.",
    },
  ],
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
        text: "Car rental prices start from $30 per day for economy cars. SUVs and 4x4s range from $60 to $120 per day. We offer discounted weekly and monthly rates. All prices include third-party insurance and 24/7 roadside support.",
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
        text: "We are Rwanda's most trusted car rental company, rated 4.9/5 by over 38 customers. We offer the widest fleet in Kigali — economy cars, SUVs, 4x4 Land Cruisers and luxury vehicles — with free hotel delivery, 24/7 support and transparent pricing from $30 per day.",
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
    {
      "@type": "Question",
      name: "Is Kigali Car Rental the same as Kigali car rental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Rental and Kigali car rental refer to the same trusted service — renting a vehicle in Kigali, Rwanda. Whichever term you search, you'll find the same fleet, the same rates from $30 per day, and the same 24/7 support.",
      },
    },
  ],
};


export default async function Home() {
  const allCars = await prisma.car.findMany({
    where: { available: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    select: {
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
    },
  });

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
        <HeroSection />
        <FeaturedFleet cars={allCars} />
        <EastAfricaDestinations />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
        <KigaliCarHireContent />
        <FAQSection />
        <FeaturedBlogs />
      </main>
      <WhatsAppChatWidget />
    </>
  );
}
