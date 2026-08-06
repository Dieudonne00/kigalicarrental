import Image from "next/image";
import Link from "next/link";
import FleetFilterTabs from "./FleetFilterTabs";

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  images: string[];
  videoUrl?: string | null;
  hasActiveBooking?: boolean;
}

// Server-rendered fleet grid (all cards ship as static HTML, no hydration
// cost) plus a small client "island" (FleetFilterTabs) that toggles card
// visibility via direct DOM manipulation - see FleetFilterTabs.tsx for why.
// Layout adapted from carrentalinkigali.com's fleet-section pattern (filter
// tabs, results-grid vehicle cards, sticky "rental requirements" sidebar) -
// our dark blue instead of their orange, same real car data this already had.
export default function FeaturedFleet({ cars }: { cars: Car[] }) {
  if (cars.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
            Our Fleet
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            Cars Available for Rental in Kigali
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Every car in our Kigali car rental fleet is fully insured, regularly serviced, and ready for self-drive or chauffeured hire across Rwanda.
          </p>
        </div>

        <FleetFilterTabs />

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            <p id="fleet-empty-msg" className="text-center text-gray-500 py-10" style={{ display: "none" }}>
              No vehicles in this category right now - check back soon or browse the full fleet.
            </p>
            <div id="fleet-grid" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {cars.map((car, index) => (
                <div
                  key={car.id}
                  data-category={car.category?.toLowerCase()}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#1e3a8a] hover:shadow-[0_16px_36px_rgba(20,30,50,0.14)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden flex-shrink-0 bg-gray-50">
                    <Image
                      src={car.images[0] || "/placeholder-car.jpg"}
                      alt={`Kigali car rental - ${car.name.trim()} for hire in Kigali Rwanda`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index < 4}
                      loading={index < 4 ? undefined : "lazy"}
                    />
                    <div className="absolute bottom-2.5 left-2.5">
                      {car.hasActiveBooking ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white rounded text-[10px] font-bold uppercase tracking-wide">
                          Booked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white rounded text-[10px] font-bold uppercase tracking-wide">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                          Available Now
                        </span>
                      )}
                    </div>
                    {car.videoUrl && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#1e3a8a]/90 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <Link href={`/cars/${car.id}`} className="font-bold text-gray-900 text-sm md:text-base mb-0.5 line-clamp-1 hover:text-[#1e3a8a] transition-colors">
                      {car.name}
                    </Link>
                    <p className="text-xs text-gray-500 mb-3 capitalize">
                      {car.category} &middot; {car.year}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600 font-medium">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {car.seats} Seats
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {car.fuelType}
                      </span>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">from</span>
                        <span className="text-lg font-extrabold text-gray-900">
                          ${car.dailyRate}
                          <span className="text-[10px] font-medium text-gray-400">/day</span>
                        </span>
                      </div>
                      <Link
                        href={`/cars/${car.id}`}
                        className="bg-[#1e3a8a] text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#172554] transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-14">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/fleet"
                  className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all"
                >
                  View Full Fleet
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/250787619387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Ask via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Rental requirements sidebar - sits beside the fleet grid, sticky while scrolling */}
          <aside className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24" aria-label="Requirements to rent a car in Kigali">
            <div className="inline-flex items-center gap-1.5 bg-[#1e3a8a]/10 border border-[#1e3a8a]/25 text-[#1e3a8a] text-xs font-bold px-3 py-1 rounded-full mb-4">
              <svg className="w-3.5 h-3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6m-6 4h6" /></svg>
              Rental Requirements
            </div>
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-gray-900 mb-2 leading-snug">
              What You Need to Rent a Car in Kigali
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Everything required for Kigali car rental — no hidden paperwork, no surprises at pickup.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#1e3a8a] mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <div>
                  <p className="text-sm font-bold text-gray-900">Valid Driving Licence</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Your home-country licence is accepted for self-drive hire.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#1e3a8a] mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <div>
                  <p className="text-sm font-bold text-gray-900">Passport or National ID</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Required for identity verification at pickup.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#1e3a8a] mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <p className="text-sm font-bold text-gray-900">Minimum Age 23</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Applies to all self-drive rentals.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#1e3a8a] mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <div>
                  <p className="text-sm font-bold text-gray-900">International Driving Permit</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Recommended if your licence isn&apos;t in English or French.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#1e3a8a] mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h1m4 6h8a2 2 0 002-2v-6a2 2 0 00-2-2h-8a2 2 0 00-2 2v6a2 2 0 002 2zm4-6a1 1 0 100 2 1 1 0 000-2z" /></svg>
                <div>
                  <p className="text-sm font-bold text-gray-900">Refundable Deposit</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Amount depends on vehicle class, paid by mobile money, bank transfer, or cash.</p>
                </div>
              </li>
            </ul>
            <a href="/faq" className="inline-flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all">
              Full Rental FAQ
              <svg className="w-3.5 h-3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
