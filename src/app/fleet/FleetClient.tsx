"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

export default function FleetClient({ initialCars }: { initialCars: Car[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");

  const { categories, transmissions, seatOptions, minPrice, maxPrice } = useMemo(() => {
    const uniqueCategories = Array.from(new Set(initialCars.map((c) => c.category)));
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
    if (selectedCategory !== "all" && car.category !== selectedCategory) return false;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Vehicles</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#1e3a8a] focus:outline-none text-gray-900">
                  {categories.map((cat) => <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Transmission</label>
                <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#1e3a8a] focus:outline-none text-gray-900">
                  {transmissions.map((t) => <option key={t} value={t}>{t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Seats</label>
                <select value={selectedSeats} onChange={(e) => setSelectedSeats(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#1e3a8a] focus:outline-none text-gray-900">
                  {seatOptions.map((s) => <option key={s} value={s}>{s === "all" ? "All" : `${s} Seats`}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="relative">
                  <input type="range" min={minPrice} max={maxPrice} value={priceRange[0]}
                    onChange={(e) => { const v = parseInt(e.target.value); if (v < priceRange[1]) setPriceRange([v, priceRange[1]]); }}
                    className="absolute w-full accent-[#1e3a8a]" style={{ zIndex: priceRange[0] > maxPrice - 100 ? 5 : 3 }} />
                  <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]}
                    onChange={(e) => { const v = parseInt(e.target.value); if (v > priceRange[0]) setPriceRange([priceRange[0], v]); }}
                    className="absolute w-full accent-[#1e3a8a]" style={{ zIndex: priceRange[1] < minPrice + 100 ? 5 : 4 }} />
                  <div className="h-6"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-[#1e3a8a]">{filteredCars.length}</span> of <span className="font-bold">{initialCars.length}</span> vehicles
              </p>
            </div>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="w-full mt-4 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="flex-1">
          {filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
              <button onClick={resetFilters} className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-bold hover:bg-[#172554] transition-all">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {filteredCars.map((car) => (
                <Link key={car.id} href={`/cars/${car.id}`} className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#1e3a8a] transition-all hover:shadow-lg">
                  <div className="relative h-32 md:h-48 bg-gray-100 overflow-hidden">
                    {car.images && car.images.length > 0 ? (
                      <img src={car.images[0]} alt={`${car.name} for hire in Kigali`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg className="w-16 h-16 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {car.featured && <div className="absolute top-2 right-2 bg-[#1e3a8a] text-white px-2 py-0.5 rounded-full text-xs font-bold">Featured</div>}
                    <div className="absolute top-2 left-2 bg-white/90 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">{car.year}</div>
                  </div>
                  <div className="p-3 md:p-6">
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-[#1e3a8a] transition-colors line-clamp-1">{car.name}</h3>
                    <div className="grid grid-cols-3 gap-1 md:gap-2 mb-2 md:mb-4">
                      <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                        <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{car.seats}</span>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600 capitalize">
                        <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span className="truncate">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600 capitalize">
                        <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        <span className="truncate">{car.fuelType}</span>
                      </div>
                    </div>
                    <div className="mb-2 md:mb-4">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[9px] md:text-xs font-bold capitalize">{car.category}</span>
                    </div>
                    <div className="flex items-baseline justify-between pt-2 md:pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-base md:text-2xl font-bold text-[#1e3a8a]">${car.dailyRate}</span>
                        <span className="text-[10px] md:text-sm text-gray-600">/day</span>
                      </div>
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-[#1e3a8a] group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
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
      </div>
    </div>
  );
}




