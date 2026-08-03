"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Vehicles",
  suv: "SUV & 4x4",
  luxury: "Luxury",
  van: "Vans & Minibus",
  sedan: "Sedan",
  economy: "Economy",
};

export default function FleetClient({ initialCars }: { initialCars: Car[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");

  const { categories, transmissions, seatOptions, minPrice, maxPrice } = useMemo(() => {
    const uniqueCategories = Array.from(new Set(initialCars.map((c) => c.category?.toLowerCase())));
    const uniqueTransmissions = Array.from(new Set(initialCars.map((c) => c.transmission)));
    const uniqueSeats = Array.from(new Set(initialCars.map((c) => c.seats))).sort((a, b) => a - b);
    const prices = initialCars.map((c) => c.dailyRate);
    return {
      categories: ["all", ...uniqueCategories],
      transmissions: ["all", ...uniqueTransmissions],
      seatOptions: ["all", ...uniqueSeats.map(String)],
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 500,
    };
  }, [initialCars]);

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const filteredCars = initialCars.filter((car) => {
    if (selectedCategory !== "all" && car.category?.toLowerCase() !== selectedCategory) return false;
    if (selectedTransmission !== "all" && car.transmission !== selectedTransmission) return false;
    if (selectedSeats !== "all" && car.seats !== parseInt(selectedSeats)) return false;
    if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) return false;
    return true;
  });

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTransmission !== "all" ||
    selectedSeats !== "all" ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTransmission("all");
    setSelectedSeats("all");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div id="fleet-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-8 md:mb-10">
        <span className="inline-block text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
          Our Fleet
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
          Kigali Car Rental Fleet — Available Now
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Every vehicle in our Kigali car rental fleet is fully insured, regularly serviced, and ready for self-drive or chauffeured hire across Rwanda.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all capitalize ${
              selectedCategory === cat
                ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
            }`}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 bg-white border border-gray-200 rounded-xl px-4 py-3 max-w-3xl mx-auto">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          Transmission
          <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-[#1e3a8a] focus:outline-none text-gray-900 text-sm capitalize">
            {transmissions.map((t) => <option key={t} value={t}>{t === "all" ? "All" : t}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          Seats
          <select value={selectedSeats} onChange={(e) => setSelectedSeats(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-[#1e3a8a] focus:outline-none text-gray-900 text-sm">
            {seatOptions.map((s) => <option key={s} value={s}>{s === "all" ? "All" : `${s} Seats`}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          Max Price
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="accent-[#1e3a8a] w-28"
          />
          <span className="font-semibold text-[#1e3a8a] w-14 text-right">${priceRange[1]}</span>
        </label>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid + sticky requirements sidebar, matching a two-column fleet layout */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div>
          {filteredCars.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
              <button onClick={resetFilters} className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-bold hover:bg-[#172554] transition-all">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {filteredCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/cars/${car.id}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#1e3a8a] hover:shadow-[0_16px_36px_rgba(20,30,50,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-32 md:h-44 bg-gray-50 overflow-hidden flex-shrink-0">
                    {car.images && car.images.length > 0 ? (
                      <img src={car.images[0]} alt={`Kigali car rental - ${car.name.trim()} for hire in Kigali Rwanda`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg className="w-12 h-12 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wide">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        Available Now
                      </span>
                    </div>
                    {car.featured && <div className="absolute top-2 right-2 bg-[#1e3a8a] text-white px-2 py-0.5 rounded-full text-[9px] md:text-xs font-bold">Featured</div>}
                  </div>
                  <div className="p-3 md:p-4 flex flex-col flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-0.5 line-clamp-1 group-hover:text-[#1e3a8a] transition-colors">{car.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 capitalize">{car.category} &middot; {car.year}</p>
                    <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-600 font-medium">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {car.seats} Seats
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <svg className="w-3 h-3 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        {car.transmission}
                      </span>
                    </div>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">from</span>
                        <span className="text-lg font-extrabold text-gray-900">
                          ${car.dailyRate}<span className="text-[10px] font-medium text-gray-400">/day</span>
                        </span>
                      </div>
                      <span className="bg-[#1e3a8a] text-white px-3 py-2 rounded-lg text-xs font-bold group-hover:bg-[#172554] transition-all">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredCars.length > 0 && (
            <div className="mt-16 bg-white rounded-xl border-2 border-gray-200 p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Can&apos;t Find What You&apos;re Looking For?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Contact us for special requests, long-term rentals, or custom packages tailored to your needs.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-[#1e3a8a] text-white rounded-lg font-bold hover:bg-[#172554] transition-all">Contact Us</Link>
                <a href="tel:+250787619387" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-lg font-bold hover:bg-[#1e3a8a] hover:text-white transition-all">Call +250 787 619 387</a>
              </div>
            </div>
          )}
        </div>

        {/* Rental requirements sidebar - sits beside the car list, sticky while scrolling */}
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
  );
}
