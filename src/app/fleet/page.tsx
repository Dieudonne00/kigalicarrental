"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

export default function FleetPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [yearRange, setYearRange] = useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars");
      const data = await response.json();
      const fetchedCars = data.cars || [];
      setCars(fetchedCars);

      if (fetchedCars.length > 0) {
        const years = fetchedCars.map((car: Car) => car.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        setYearRange([minYear, maxYear]);

        const prices = fetchedCars.map((car: Car) => car.dailyRate);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const { minYear, maxYear, minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minYear: 2000, maxYear: 2025, minPrice: 0, maxPrice: 500 };

    const years = cars.map((car) => car.year);
    const prices = cars.map((car) => car.dailyRate);

    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [cars]);

  const { categories, transmissions, seatOptions } = useMemo(() => {
    const uniqueCategories = Array.from(new Set(cars.map((car) => car.category)));
    const uniqueTransmissions = Array.from(new Set(cars.map((car) => car.transmission)));
    const uniqueSeats = Array.from(new Set(cars.map((car) => car.seats))).sort((a, b) => a - b);

    return {
      categories: ["all", ...uniqueCategories],
      transmissions: ["all", ...uniqueTransmissions],
      seatOptions: ["all", ...uniqueSeats.map(String)],
    };
  }, [cars]);

  const filteredCars = cars.filter((car) => {
    if (selectedCategory !== "all" && car.category !== selectedCategory) return false;
    if (selectedTransmission !== "all" && car.transmission !== selectedTransmission) return false;
    if (selectedSeats !== "all") {
      const seats = parseInt(selectedSeats);
      if (car.seats !== seats) return false;
    }
    if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTransmission("all");
    setSelectedSeats("all");
    if (cars.length > 0) {
      const prices = cars.map((car) => car.dailyRate);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTransmission !== "all" ||
    selectedSeats !== "all" ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* ✅ CHANGED: BunnyCDN → cPanel */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://carrentalinkigali.com/images/cars/hero-fleet.webp)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Our Fleet
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose from our diverse collection of premium vehicles. From compact sedans to luxury SUVs,
            we have the perfect car for your journey in Rwanda.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#01B000] text-white font-bold rounded-lg hover:bg-[#019500] transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need Help? Contact Us
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Vehicles</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900">
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Transmission</label>
                  <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900">
                    {transmissions.map((trans) => (
                      <option key={trans} value={trans}>{trans.charAt(0).toUpperCase() + trans.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Seats</label>
                  <select value={selectedSeats} onChange={(e) => setSelectedSeats(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900">
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>{seat === "all" ? "All" : `${seat} Seats`}</option>
                    ))}
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
                      onChange={(e) => { const value = parseInt(e.target.value); if (value < priceRange[1]) setPriceRange([value, priceRange[1]]); }}
                      className="absolute w-full accent-[#01B000] pointer-events-auto"
                      style={{ zIndex: priceRange[0] > maxPrice - 100 ? 5 : 3 }} />
                    <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]}
                      onChange={(e) => { const value = parseInt(e.target.value); if (value > priceRange[0]) setPriceRange([priceRange[0], value]); }}
                      className="absolute w-full accent-[#01B000] pointer-events-auto"
                      style={{ zIndex: priceRange[1] < minPrice + 100 ? 5 : 4 }} />
                    <div className="h-6"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-bold text-[#01B000]">{filteredCars.length}</span> of{" "}
                  <span className="font-bold">{cars.length}</span> vehicles
                </p>
              </div>

              {hasActiveFilters && (
                <button onClick={resetFilters} className="w-full mt-4 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all">
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Right Content - Cars Grid */}
          <div className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading vehicles...</p>
              </div>
            )}

            {!loading && filteredCars.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <button onClick={resetFilters} className="px-6 py-2 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] transition-all">Clear Filters</button>
              </div>
            )}

            {!loading && filteredCars.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filteredCars.map((car) => (
                  <Link key={car.id} href={`/cars/${car.id}`} className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#01B000] transition-all hover:shadow-lg">
                    <div className="relative h-32 md:h-48 bg-gray-100 overflow-hidden">
                      {car.images && car.images.length > 0 ? (
                        <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {car.featured && (
                        <div className="absolute top-1 md:top-2 right-1 md:right-2 bg-[#01B000] text-white px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-bold">Featured</div>
                      )}
                      <div className="absolute top-1 md:top-2 left-1 md:left-2 bg-white/90 text-gray-900 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-bold">{car.year}</div>
                    </div>

                    <div className="p-3 md:p-6">
                      <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-[#01B000] transition-colors line-clamp-1">{car.name}</h3>

                      <div className="grid grid-cols-3 gap-1 md:gap-2 mb-2 md:mb-4">
                        <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          <span className="hidden md:inline">{car.seats} Seats</span>
                          <span className="md:hidden">{car.seats}</span>
                        </div>
                        <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          <span className="hidden md:inline">{car.transmission}</span>
                          <span className="md:hidden capitalize">{car.transmission.substring(0, 4)}</span>
                        </div>
                        <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                          <span className="hidden md:inline capitalize">{car.fuelType}</span>
                          <span className="md:hidden capitalize">{car.fuelType.substring(0, 3)}</span>
                        </div>
                      </div>

                      <div className="mb-2 md:mb-4">
                        <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-gray-100 text-gray-700 rounded-full text-[9px] md:text-xs font-bold">{car.category}</span>
                      </div>

                      <div className="flex items-baseline justify-between pt-2 md:pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-base md:text-2xl font-bold text-[#01B000]">${car.dailyRate}</span>
                          <span className="text-[10px] md:text-sm text-gray-600">/day</span>
                        </div>
                        <div className="text-[#01B000] group-hover:translate-x-1 transition-transform">
                          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loading && filteredCars.length > 0 && (
              <div className="mt-16 bg-white rounded-xl border-2 border-gray-200 p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Contact us for special requests, long-term rentals, or custom packages tailored to your needs.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] transition-all">
                    <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Contact Us
                  </Link>
                  <a href="tel:+250788892976" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#01B000] text-[#01B000] rounded-lg font-bold hover:bg-[#01B000] hover:text-white transition-all">
                    <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Call +250 788 892 976
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
