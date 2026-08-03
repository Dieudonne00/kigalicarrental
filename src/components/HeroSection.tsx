"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

// Layout adapted from carrentalinkigali.com's proven booking-search hero
// pattern (light panel, single-row search bar, trust row, photo banner) -
// same brand's dark blue instead of their orange, and no fabricated stats:
// the previous version claimed "1,000+ Happy Customers" and "Since 1990,"
// neither of which is true for this business.
export default function HeroSection() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const vehicleType = form.get("vehicle_type");
    const pickupDate = form.get("pickup_date");
    const returnDate = form.get("return_date");
    if (vehicleType) params.set("category", String(vehicleType));
    if (pickupDate) params.set("pickup", String(pickupDate));
    if (returnDate) params.set("return", String(returnDate));
    router.push(`/fleet${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative" aria-label="Kigali Car Rental - Hero">
      <div className="bg-gradient-to-b from-blue-50 to-blue-50/40 pt-28 sm:pt-32 pb-10 sm:pb-11 px-4 sm:px-[5%]">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 flex flex-wrap items-center gap-2">
            Kigali Car Rental{" "}
            <span className="underline decoration-gray-400 underline-offset-4">from $35/day</span>
          </h1>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row bg-white rounded-xl shadow-[0_2px_14px_rgba(20,30,50,0.14)] overflow-hidden"
            aria-label="Check availability"
          >
            <label className="flex items-center gap-2.5 px-5 py-4 flex-1 min-w-[180px] border-b sm:border-b-0 sm:border-r border-gray-200">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <select name="vehicle_type" aria-label="Vehicle type" className="w-full outline-none text-sm text-gray-700 bg-transparent">
                <option value="">All Vehicles</option>
                <option value="suv">SUV - RAV4, Prado</option>
                <option value="luxury">Luxury - Land Cruiser</option>
                <option value="van">Minibus &amp; Vans</option>
                <option value="sedan">Economy Sedan</option>
              </select>
            </label>
            <label className="flex items-center gap-2.5 px-5 py-4 flex-1 min-w-[180px] border-b sm:border-b-0 sm:border-r border-gray-200">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input type="date" name="pickup_date" aria-label="Pickup date" className="w-full outline-none text-sm text-gray-700 bg-transparent" />
            </label>
            <label className="flex items-center gap-2.5 px-5 py-4 flex-1 min-w-[180px]">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <input type="date" name="return_date" aria-label="Return date" className="w-full outline-none text-sm text-gray-700 bg-transparent" />
            </label>
            <button
              type="submit"
              className="bg-[#1e3a8a] hover:bg-[#172554] text-white font-bold px-10 py-4 flex items-center justify-center gap-2 transition-colors min-h-[56px]"
            >
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Free Airport Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Insurance Included
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" />
              </svg>
              24/7 Support
            </span>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-blue-50/60 border-y border-blue-100 py-5 px-4 sm:px-[5%]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-700">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Kigali Car Rental - Free Airport Delivery
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Insurance Included - All Cars
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            24/7 Roadside Support Across Rwanda
          </span>
        </div>
      </div>

      {/* Photo banner */}
      <div className="w-full h-[200px] sm:h-[280px] md:h-[340px] overflow-hidden bg-blue-50">
        <Image
          src="https://kigalicarhire.b-cdn.net/hero%20section%20cars.png"
          alt="Kigali Car Rental fleet - quality cars available for rental in Rwanda"
          width={1600}
          height={340}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>
  );
}
