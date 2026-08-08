import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import FleetClient from "./FleetClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Car Hire Fleet Kigali | SUVs, 4x4, Luxury & Economy Cars — Kigali Car Rental",
  description: "Browse our full fleet of cars available for hire in Kigali, Rwanda. Economy cars from $35/day, SUVs from $60/day, 4x4 Land Cruisers from $90/day. All fully insured. Book online now.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/fleet" },
  openGraph: {
    title: "Car Hire Fleet Kigali | SUVs, 4x4, Luxury & Economy Cars",
    description: "Browse all cars available for hire in Kigali. Economy from $35/day, 4x4 Land Cruisers from $90/day. Fully insured. Book online or WhatsApp.",
    url: "https://kigalicarrental.site/fleet",
  },
};

export default async function FleetPage() {
  const cars = await prisma.car.findMany({
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
      featured: true,
      available: true,
    },
  });

  const minRate = cars.length ? Math.min(...cars.map((c) => c.dailyRate)) : 35;

  const SITE = "https://kigalicarrental.site";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Fleet", item: `${SITE}/fleet` },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kigali Car Rental Fleet",
    description: "Full fleet of cars available for hire in Kigali, Rwanda.",
    url: `${SITE}/fleet`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cars.length,
      itemListElement: cars.map((car, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/cars/${car.id}`,
        name: car.name.trim(),
      })),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-50/40 pt-28 sm:pt-32 pb-10 px-4 sm:px-[5%]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 bg-[#1e3a8a]/10 border border-[#1e3a8a]/25 text-[#1e3a8a] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <svg className="w-3.5 h-3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
            {cars.length} Vehicles Available Now
          </span>
          <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
            Kigali Car Rental Fleet <span className="text-[#1e3a8a]">— From ${minRate}/Day</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Browse our full <strong>Kigali car rental</strong> fleet — economy sedans, SUVs, 4x4 Land Cruisers and minibuses, available for self-drive or with a professional driver. Free delivery to Kigali Airport or your hotel.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#fleet-grid" className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all">
              Browse Full Fleet
            </a>
            <a
              href="https://wa.me/250787619387?text=Hi%2C+I%27m+browsing+the+Kigali+Car+Rental+fleet+and+want+to+check+availability."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-blue-50/60 border-y border-blue-100 py-5 px-4 sm:px-[5%]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-700">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Free Airport Delivery — KGL
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Full Insurance Included
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            24/7 Roadside Support Across Rwanda
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            No Hidden Fees — Transparent Pricing
          </span>
        </div>
      </div>

      {/* Server-rendered car list passed to client for filtering */}
      <FleetClient initialCars={cars as any} />
    </div>
  );
}



