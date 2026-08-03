import { Metadata } from "next";
import Link from "next/link";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Pricing | Kigali Car Rental — Car Rental Rates from $30/day",
  description:
    "Kigali Car Rental pricing — economy cars from $30/day, SUVs and 4x4 Land Cruisers from $80/day, chauffeur service from $60/day, airport transfers from $30/trip. Weekly and monthly discounts available.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/pricing` },
  openGraph: {
    title: "Pricing | Kigali Car Rental",
    description: "Transparent car rental rates in Kigali, Rwanda — from $30/day.",
    url: `${SITE}/pricing`,
    siteName: "Kigali Car Rental",
    images: [{ url: `${SITE}/opengraph-image`, width: 1200, height: 630, alt: "Kigali Car Rental Pricing" }],
  },
};

const tiers = [
  {
    name: "Economy",
    price: "$30",
    unit: "/ day",
    description: "Compact cars ideal for city driving and short trips around Kigali.",
    features: ["Third-party insurance included", "Free Kigali hotel delivery", "24/7 roadside support"],
    href: "/fleet",
  },
  {
    name: "SUV / 4x4",
    price: "$80",
    unit: "/ day",
    description: "4x4 Land Cruisers built for safaris, national parks and off-road trips.",
    features: ["Ideal for Akagera, Volcanoes, Nyungwe", "Third-party insurance included", "Free Kigali hotel delivery"],
    href: "/4x4-car-hire-rwanda",
    highlighted: true,
  },
  {
    name: "Chauffeur Service",
    price: "$60",
    unit: "/ day",
    description: "Professional chauffeur-driven car hire for business, tours and events.",
    features: ["Experienced local driver", "Available 24/7", "Ideal for weddings & corporate travel"],
    href: "/self-drive-rwanda",
  },
  {
    name: "Airport Transfer",
    price: "$30",
    unit: "/ trip",
    description: "24/7 pickup and drop-off at Kigali International Airport.",
    features: ["Fixed pricing, no surprise fees", "Meet & greet with name board", "Luggage assistance"],
    href: "/airport-transfer-kigali",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Car Hire Pricing in Kigali
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent rates with no hidden fees. All rentals include third-party insurance and 24/7
            support. Weekly and monthly discounts available on request.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border-2 p-6 flex flex-col bg-white ${
                tier.highlighted ? "border-[#1e3a8a] shadow-lg" : "border-gray-100"
              }`}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h2>
              <p className="text-3xl font-extrabold text-[#1e3a8a] mb-1">
                {tier.price}
                <span className="text-sm font-medium text-gray-500">{tier.unit}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[#1e3a8a] font-bold">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className="text-center px-4 py-2.5 bg-[#1e3a8a] text-white font-semibold rounded-lg hover:bg-[#172554] transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Prices vary by vehicle and rental duration. See live rates and availability for our full fleet.
          </p>
          <Link
            href="/fleet"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Full Fleet &amp; Live Rates
          </Link>
        </div>
      </div>
    </div>
  );
}
