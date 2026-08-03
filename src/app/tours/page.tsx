import { Metadata } from "next";
import Link from "next/link";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Rwanda Tours & Safaris | Kigali Car Rental",
  description:
    "Plan your Rwanda tour with Kigali Car Rental — self-drive or chauffeur-driven itineraries to Akagera, Volcanoes National Park, Nyungwe Forest and Lake Kivu. Vehicle and driver-guide, built around your dates.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/tours` },
  openGraph: {
    title: "Rwanda Tours & Safaris | Kigali Car Rental",
    description:
      "Self-drive or chauffeur-driven Rwanda tour itineraries to Akagera, Volcanoes National Park, Nyungwe Forest and Lake Kivu.",
    url: `${SITE}/tours`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
  },
};

const tours = [
  {
    name: "Akagera Safari",
    duration: "1–2 Days",
    from: "Kigali → Akagera National Park (125 km, ~2 hrs)",
    summary:
      "A self-drive or chauffeur-driven game drive through Akagera's savannah — lions, elephants, rhinos, giraffes and hippos, all within a morning's drive of Kigali.",
    itinerary: [
      "Day 1: Depart Kigali early morning, arrive Akagera by mid-morning, full-day game drive, overnight near the park or return to Kigali by evening.",
      "Day 2 (optional): Second game drive at dawn — the best time to spot predators — before heading back to Kigali.",
    ],
    href: "/akagera-game-drive",
    cta: "Plan Your Akagera Trip",
  },
  {
    name: "Volcanoes National Park — Gorilla Trekking",
    duration: "2–3 Days",
    from: "Kigali → Musanze / Volcanoes NP (110 km, ~2.5 hrs)",
    summary:
      "Rwanda's signature experience. A 4x4 handles the Musanze roads comfortably, with time built in for the trek itself and the drive back.",
    itinerary: [
      "Day 1: Drive Kigali to Musanze, check in, briefing on trekking logistics for the next morning.",
      "Day 2: Early departure to park headquarters for gorilla trekking permit check-in and the trek itself (permit booked separately).",
      "Day 3 (optional): Golden monkey trekking or Musanze caves before returning to Kigali.",
    ],
    href: "/gorilla-trekking-car-hire",
    cta: "Plan Your Gorilla Trek",
  },
  {
    name: "Nyungwe Forest — Chimpanzee Trek",
    duration: "2–3 Days",
    from: "Kigali → Nyungwe Forest (225 km, ~4 hrs)",
    summary:
      "Rwanda's oldest rainforest, home to chimpanzees and the canopy walkway. The longer drive rewards you with some of the best mountain scenery in the country.",
    itinerary: [
      "Day 1: Drive Kigali to Nyungwe, arriving afternoon — time for the canopy walkway before sunset.",
      "Day 2: Early-morning chimpanzee trek, afternoon free or a nature walk to one of the forest's waterfalls.",
      "Day 3: Return drive to Kigali, with an optional stop in Butare (Huye) at the national museum.",
    ],
    href: "/nyungwe-forest-car-hire",
    cta: "Plan Your Nyungwe Trip",
  },
  {
    name: "Lake Kivu Getaway",
    duration: "2–3 Days",
    from: "Kigali → Gisenyi / Lake Kivu (165 km, ~2.5 hrs)",
    summary:
      "A relaxed lakeside break — swimming, boat trips, and some of Rwanda's best sunsets, an easy drive from Kigali on a good tarmac road.",
    itinerary: [
      "Day 1: Drive to Gisenyi or Kibuye, check in, afternoon at the lake.",
      "Day 2: Boat trip to Napoleon Island or Amahoro Island, or a coffee/tea plantation tour nearby.",
      "Day 3: Return drive to Kigali, or continue on to Volcanoes National Park (a scenic 1.5-hour connecting drive).",
    ],
    href: "/lake-kivu-car-hire",
    cta: "Plan Your Lake Kivu Trip",
  },
];

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-b from-blue-50 to-blue-50/40 pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-[5%]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#1e3a8a]/10 border border-[#1e3a8a]/25 text-[#1e3a8a] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            Rwanda Tours &amp; Safaris
          </span>
          <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
            Kigali Car Rental Tours &amp; Itineraries
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every tour below is built around a Kigali car rental vehicle — self-drive, or with a professional driver-guide. Use these itineraries as a starting point, then tell us your dates and we&apos;ll tailor the details.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {tours.map((tour) => (
            <div key={tour.name} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:border-[#1e3a8a]/40 hover:shadow-md transition-all flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                  {tour.name}
                </h2>
                <span className="flex-shrink-0 bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {tour.duration}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-4">{tour.from}</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{tour.summary}</p>

              <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-6 flex-1">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Sample Itinerary</p>
                <ul className="space-y-2.5">
                  {tour.itinerary.map((day, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                      <svg className="w-3.5 h-3.5 text-[#1e3a8a] mt-1 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                      {day}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tour.href}
                className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-[#172554] transition-all"
              >
                {tour.cta}
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            Want to Combine Destinations?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Many travellers combine two or three of these into a single Rwanda road trip — for example Volcanoes National Park then Lake Kivu, or Akagera then Nyungwe. Tell us your travel dates and how many days you have, and we&apos;ll put together a route and a quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/250787619387?text=Hi%2C+I%27d+like+help+planning+a+Rwanda+tour+itinerary."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all"
            >
              Plan My Itinerary on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
