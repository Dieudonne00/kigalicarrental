"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (returnDate) params.set("returnDate", returnDate);
    router.push(`/fleet?${params.toString()}`);
  };

  return (
    <section className="relative">
      {/* Full-bleed background photo */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dxn12qcje/image/upload/cars/2024-toyota-land-cruiser-164-6616f45021cc9.avif)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-28 sm:pb-32 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Kigali car rentals from $25/day
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Compare SUVs, 4x4s, and luxury cars with free airport pickup and 24/7 local support in Rwanda.
          </p>
        </div>
      </div>

      {/* Search widget - overlaps the hero image, like a booking-site search bar */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-14">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 items-end"
        >
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Pickup Location
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Kigali, Rwanda
            </div>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="pickupDate" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Pickup Date
            </label>
            <input
              id="pickupDate"
              type="date"
              value={pickupDate}
              min={today}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="returnDate" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Return Date
            </label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              min={pickupDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Cars
            </button>
          </div>
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
