"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("all");

  const carTypes = [
    { value: "all", label: "Any Vehicle Type" },
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "luxury", label: "Luxury" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
    { value: "electric", label: "Electric" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (carType && carType !== "all") params.set("category", carType);
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (returnDate) params.set("returnDate", returnDate);
    router.push(`/fleet?${params.toString()}`);
  };

  return (
    <section className="relative">
      {/* Sky + hills backdrop - "Land of a Thousand Hills" motif, no dependency on external photos */}
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50">
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d="M0 320 Q 180 220 360 300 T 720 280 T 1080 310 T 1440 260 V 500 H 0 Z" fill="#1e3a8a" opacity="0.25" />
          <path d="M0 380 Q 220 300 480 360 T 960 340 T 1440 370 V 500 H 0 Z" fill="#1d4ed8" opacity="0.35" />
          <path d="M0 430 Q 260 380 520 420 T 1000 410 T 1440 430 V 500 H 0 Z" fill="#1e40af" opacity="0.55" />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-24 sm:pb-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-sm">
            Kigali Car Rental from $25/day
          </h1>
          <p className="text-base sm:text-lg text-blue-950/80 max-w-2xl mx-auto font-medium">
            Compare SUVs, 4x4s, and luxury cars for rent in Kigali, Rwanda — free airport pickup, self-drive or chauffeur, 24/7 support.
          </p>
        </div>
      </div>

      {/* Compact inline search bar - overlaps the hero, single row on desktop */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-8">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl shadow-xl border border-gray-200 p-3 sm:p-3 flex flex-col sm:flex-row gap-2 sm:gap-2 sm:items-stretch"
        >
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-transparent focus-within:border-blue-500">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-gray-400 uppercase leading-none">Pickup Location</div>
              <div className="text-sm font-medium text-gray-900 truncate">Kigali, Rwanda</div>
            </div>
          </div>

          <label className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-transparent focus-within:border-blue-500 cursor-pointer">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 17h14M5 17a2 2 0 01-2-2v-2.5a1 1 0 01.3-.7l2.1-2.1A2 2 0 016.8 9h10.4a2 2 0 011.4.6l2.1 2.1a1 1 0 01.3.7V15a2 2 0 01-2 2M5 17a2 2 0 002 2h1a2 2 0 002-2m8 0a2 2 0 002 2h1a2 2 0 002-2" />
            </svg>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase leading-none">Vehicle Type</div>
              <select
                name="carType"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="text-sm font-medium text-gray-900 bg-transparent outline-none w-full cursor-pointer"
              >
                {carTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-transparent focus-within:border-blue-500 cursor-pointer">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase leading-none">Pickup Date</div>
              <input
                type="date"
                name="pickupDate"
                autoComplete="off"
                value={pickupDate}
                min={today}
                onChange={(e) => setPickupDate(e.target.value)}
                className="text-sm font-medium text-gray-900 bg-transparent outline-none w-full"
              />
            </div>
          </label>

          <label className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-transparent focus-within:border-blue-500 cursor-pointer">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase leading-none">Return Date</div>
              <input
                type="date"
                name="returnDate"
                autoComplete="off"
                value={returnDate}
                min={pickupDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
                className="text-sm font-medium text-gray-900 bg-transparent outline-none w-full"
              />
            </div>
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 sm:px-8 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5 sm:mt-6 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Free airport pickup
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
            24/7 support
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
            No hidden fees
          </span>
        </div>
      </div>
    </section>
  );
}
