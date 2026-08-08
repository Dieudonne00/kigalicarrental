import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

const SITE = "https://kigalicarrental.site";
const OG_IMAGE = "https://kigalicarhire.b-cdn.net/hero%20section%20cars.png";

export const metadata: Metadata = {
  title: "Car Hire Kigali 2026 | Best Car Rental Rwanda 2026 Guide - Kigali Car Rental",
  description:
    "Car hire Kigali 2026 — complete guide to renting a car in Rwanda in 2026. Updated prices, fleet details, 2026 travel tips, and how to book. From $35/day with Kigali Car Rental.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/car-hire-kigali-2026` },
  openGraph: {
    title: "Car Hire Kigali 2026 | Best Car Rental Rwanda 2026 Guide",
    description:
      "Complete 2026 guide to car hire in Kigali. Updated prices, fleet details, booking tips, and Rwanda travel advice. From $35/day.",
    url: `${SITE}/car-hire-kigali-2026`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Car Hire Kigali 2026 — Kigali Car Rental Rwanda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Hire Kigali 2026 | Best Car Rental Rwanda 2026 Guide",
    description: "Complete 2026 guide to car hire in Kigali. Updated prices, fleet details, booking tips. From $35/day.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does car hire in Kigali cost in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Car hire in Kigali in 2026 starts from $35 per day for economy cars. SUVs like the Toyota RAV4 cost from $65 per day, and 4x4 Land Cruisers for safari and upcountry travel cost from $100 per day. Weekly and monthly rates are discounted. All prices include insurance and free hotel delivery in Kigali.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best car hire company in Kigali in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kigali Car Rental offers self-drive cars, chauffeur-driven vehicles, airport transfers, and safari car hire across all of Rwanda and East Africa, with transparent pricing and 24/7 support.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an international driving permit to hire a car in Kigali in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An international driving permit (IDP) is recommended for foreign nationals hiring a self-drive car in Rwanda in 2026. Your home country driving licence is accepted alongside the IDP. Citizens from East African Community countries can use their national driving licence. Minimum age is 23 years.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best car for a road trip in Rwanda in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a Rwanda road trip in 2026, a Toyota RAV4 or Toyota Land Cruiser Prado is ideal. If you are visiting gorilla trekking in Volcanoes National Park, Akagera Game Drive, or Nyungwe Forest, a 4x4 vehicle is strongly recommended for unpaved park roads. For Kigali city use only, an economy saloon or compact sedan is sufficient.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book car hire in Kigali in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend booking your car hire in Kigali at least 2 to 3 days in advance, especially during peak seasons (June to September and December to January). For gorilla trekking trips to Volcanoes National Park in 2026, book the car at the same time as your gorilla permits — vehicles fill up quickly during peak season.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kigali Car Rental", item: SITE },
    { "@type": "ListItem", position: 2, name: "Car Hire Kigali 2026", item: `${SITE}/car-hire-kigali-2026` },
  ],
};

const prices2026 = [
  { vehicle: "Economy Saloon (Vitz / Corolla)", daily: "$35", weekly: "$180", monthly: "$600", best: "City and short trips" },
  { vehicle: "Compact SUV (RAV4 / HR-V)", daily: "$65", weekly: "$350", monthly: "$900", best: "Most popular" },
  { vehicle: "Land Cruiser Prado 120/150", daily: "$100", weekly: "$560", monthly: "$1,400", best: "Safari and parks" },
  { vehicle: "Land Cruiser 70 / 78 Series", daily: "$120", weekly: "$700", monthly: "$1,800", best: "Off-road and field" },
  { vehicle: "Luxury Sedan (Mercedes / BMW)", daily: "$120", weekly: "$700", monthly: "$2,000", best: "Executive travel" },
  { vehicle: "Minibus (14-Seater)", daily: "$100", weekly: "$600", monthly: "$1,600", best: "Groups and tours" },
];

const destinations2026 = [
  { place: "Volcanoes National Park", distance: "110 km", note: "Gorilla trekking capital of Africa — book your 4x4 early", link: "/gorilla-trekking-car-hire" },
  { place: "Akagera National Park", distance: "125 km", note: "Rwanda's Big 5 safari destination — game drives from Kigali", link: "/4x4-car-hire-rwanda" },
  { place: "Lake Kivu and Gisenyi", distance: "165 km", note: "Scenic beach town on the Congo border — great for weekend trips", link: "/lake-kivu-car-hire" },
  { place: "Nyungwe Forest", distance: "225 km", note: "Chimpanzee trekking and canopy walks in the oldest rainforest", link: "/nyungwe-forest-car-hire" },
  { place: "Musanze and Northern Rwanda", distance: "110 km", note: "Twin Lakes, Dian Fossey Gorilla Fund, and Virunga views", link: "/gorilla-trekking-car-hire" },
  { place: "Huye and Southern Rwanda", distance: "135 km", note: "National Museum, Ethnographic Museum, and cultural heritage", link: "/self-drive-rwanda" },
];

const tips2026 = [
  { tip: "Book your car with your gorilla permit", detail: "Gorilla trekking permits for Rwanda in 2026 cost $1,500. Book your 4x4 car hire at the same time — both sell out months in advance during high season." },
  { tip: "Fuel in Rwanda is widely available", detail: "Petrol stations are available throughout Kigali and in all major towns. Rural stations exist in Musanze, Rubavu, Huye, and Kayonza. Fill up before entering national parks." },
  { tip: "Rwanda drives on the right", detail: "Rwanda uses right-hand traffic. Most hire cars are left-hand drive. Roads in Kigali are generally good. Upcountry roads vary — a 4x4 is recommended outside main tarmac routes." },
  { tip: "Free delivery anywhere in Kigali", detail: "Kigali Car Rental delivers and collects your vehicle from any hotel, office, or residential address in Kigali at no extra charge. Airport pickup is also available 24/7." },
  { tip: "Pay in USD, RWF, or mobile money", detail: "We accept US dollars, Rwandan francs, MTN Mobile Money, Airtel Money, and bank transfers. No credit card required. No hidden fees or surprise charges." },
  { tip: "WhatsApp is the fastest way to book", detail: "Send us a message on WhatsApp (+250 787 619 387) with your pickup date, number of days, and vehicle preference. We reply within 30 minutes and confirm your booking same day." },
];

export default function CarHireKigali2026Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#172554] text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white">Car Hire Kigali 2026</li>
            </ol>
          </nav>
          <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full mb-6 border border-white/30">
            Updated for 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Car Hire Kigali 2026
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
            The complete 2026 guide to car hire in Kigali, Rwanda. Updated prices, a full fleet, and everything you need to plan your trip.
          </p>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-10">
            Kigali Car Rental — self-drive and chauffeur-driven car hire across Rwanda. Transparent pricing from $35/day, 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg">
              Book for 2026
            </Link>
            <Link href="/fleet" className="bg-[#172554] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#172554] transition-all border border-white/30">
              View Full Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* 2026 Price Table */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              Car Hire Prices in Kigali 2026
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              2026 car hire rates from Kigali Car Rental. All prices include third-party insurance, unlimited mileage, and free delivery in Kigali. Prices in USD.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="px-5 py-4 text-left font-bold">Vehicle</th>
                  <th className="px-5 py-4 text-center font-bold">Daily</th>
                  <th className="px-5 py-4 text-center font-bold">Weekly</th>
                  <th className="px-5 py-4 text-center font-bold">Monthly</th>
                  <th className="px-5 py-4 text-center font-bold hidden md:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prices2026.map((r, i) => (
                  <tr key={r.vehicle} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-4 font-semibold text-gray-900">{r.vehicle}</td>
                    <td className="px-5 py-4 text-center font-bold text-[#1e3a8a]">{r.daily}</td>
                    <td className="px-5 py-4 text-center text-gray-700">{r.weekly}</td>
                    <td className="px-5 py-4 text-center text-gray-700">{r.monthly}</td>
                    <td className="px-5 py-4 text-center hidden md:table-cell">
                      <span className="bg-blue-50 text-[#1e3a8a] text-xs font-semibold px-3 py-1 rounded-full">{r.best}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/fleet" className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all">
              Browse All Cars
            </Link>
            <Link href="/book-now" className="inline-flex items-center justify-center gap-2 border-2 border-[#1e3a8a] text-[#1e3a8a] px-6 py-3 rounded-lg font-bold hover:bg-[#1e3a8a] hover:text-white transition-all">
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* 2026 destinations */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              Where to Go with Car Hire in Rwanda in 2026
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Top Rwanda destinations to explore with a hired car in 2026. All routes depart from Kigali.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations2026.map((d) => (
              <Link key={d.place} href={d.link} className="group bg-gray-50 rounded-xl border-2 border-gray-200 p-6 hover:border-[#1e3a8a] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1e3a8a] transition-colors">{d.place}</h3>
                  <span className="bg-blue-100 text-[#1e3a8a] text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{d.distance}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{d.note}</p>
                <span className="inline-flex items-center gap-1 text-[#1e3a8a] text-sm font-semibold mt-4">
                  Car hire details
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 tips */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              2026 Car Hire Tips for Rwanda
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Everything you need to know before you rent a car in Kigali in 2026.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips2026.map((t) => (
              <div key={t.tip} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#1e3a8a]/40 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{t.tip}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form keyword content */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Renting a Car in Kigali in 2026 — Complete Guide
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">Car hire in Kigali in 2026</strong> is easier, more affordable, and more flexible than ever before. Kigali Car Rental offers a full range of vehicles across every category — from economy saloons at $35 per day to executive Land Cruisers at $120 per day — all available for self-drive or chauffeur-driven hire anywhere in Rwanda.
            </p>
            <p>
              Rwanda's roads have improved significantly in recent years, and 2026 is an excellent time to explore the country by car. The Kigali to Musanze road (for Volcanoes National Park gorilla trekking) is fully tarmacked and takes 2.5 hours. The Kigali to Gisenyi/Lake Kivu route is scenic and well-maintained. Off the main highways, a 4x4 vehicle is recommended.
            </p>
            <p>
              <strong className="text-gray-900">How to hire a car in Kigali in 2026:</strong> Contact Kigali Car Rental by WhatsApp (+250 787 619 387), phone, or online booking form. Confirm your vehicle, pickup date, and number of days. Present your driving licence and passport. Pay your deposit by mobile money, bank transfer, or cash. We deliver the car to your hotel or Kigali International Airport at no extra cost.
            </p>
            <p>
              Kigali Car Rental is a car hire partner for tourists, business travellers, expatriates, NGO workers, and diplomatic missions in Kigali, with transparent pricing and 24/7 support.
            </p>
            <p>
              Whether you are planning a gorilla trekking safari, an Akagera game drive, a Lake Kivu beach holiday, a Nyungwe chimpanzee trek, or simply need reliable daily transport in Kigali, Kigali Car Rental is your first choice for <strong className="text-gray-900">car hire in Rwanda in 2026</strong>.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { label: "Gorilla Trekking Car Hire", href: "/gorilla-trekking-car-hire" },
              { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
              { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
              { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
              { label: "Luxury Car Hire Kigali", href: "/luxury-car-hire-kigali" },
              { label: "Long Term Car Hire Kigali", href: "/long-term-car-hire-kigali" },
              { label: "Lake Kivu Car Hire", href: "/lake-kivu-car-hire" },
              { label: "Nyungwe Forest Car Hire", href: "/nyungwe-forest-car-hire" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm bg-blue-50 text-[#1e3a8a] border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-plus-jakarta)]">
            Frequently Asked Questions — Car Hire Kigali 2026
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1e3a8a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Book Your Car Hire in Kigali for 2026
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Transparent pricing, free hotel delivery, and 24/7 support. Self-drive from $35/day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg">
              Book Now — 2026
            </Link>
            <a href="tel:+250787619387" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1e3a8a] transition-all">
              Call +250 787 619 387
            </a>
          </div>
        </div>
      </section>
      <ServicePageFooter current="/car-hire-kigali-2026" />
    </div>
  );
}
