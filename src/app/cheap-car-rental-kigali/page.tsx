// app/cheap-car-rental-kigali/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

export default function CheapCarRentalKigali() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [yearRange, setYearRange] = useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60]); // Capped at $60 for budget

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars?budget=true");
      const data = await response.json();
      let fetchedCars = data.cars || [];
      
      // Filter to only show budget-friendly cars (under $60/day)
      fetchedCars = fetchedCars.filter((car: Car) => car.dailyRate <= 60);
      
      setCars(fetchedCars);

      // Set initial year range based on available cars
      if (fetchedCars.length > 0) {
        const years = fetchedCars.map((car: Car) => car.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        setYearRange([minYear, maxYear]);

        // Set initial price range based on available cars (capped at $60)
        const prices = fetchedCars.map((car: Car) => car.dailyRate);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.min(Math.max(...prices), 60);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching cheap cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate min and max values from all cars
  const { minYear, maxYear, minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minYear: 2015, maxYear: 2025, minPrice: 25, maxPrice: 60 };

    const years = cars.map((car) => car.year);
    const prices = cars.map((car) => car.dailyRate);

    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
      minPrice: Math.min(...prices),
      maxPrice: Math.min(Math.max(...prices), 60),
    };
  }, [cars]);

  // Get unique values for filters - BUDGET FOCUSED
  const { categories, transmissions, seatOptions } = useMemo(() => {
    // Only show economy-friendly categories
    const budgetCars = cars.filter(car => car.dailyRate <= 60);
    const uniqueCategories = Array.from(new Set(budgetCars.map((car) => car.category)))
      .filter(cat => ['Economy', 'Compact', 'Sedan', 'Hatchback'].includes(cat) || cat.includes('Economy'));
    
    const uniqueTransmissions = Array.from(new Set(budgetCars.map((car) => car.transmission)));
    const uniqueSeats = Array.from(new Set(budgetCars.map((car) => car.seats)))
      .filter(seats => seats <= 7) // Budget cars typically max 7 seats
      .sort((a, b) => a - b);

    return {
      categories: ["all", ...uniqueCategories],
      transmissions: ["all", ...uniqueTransmissions],
      seatOptions: ["all", ...uniqueSeats.map(String)],
    };
  }, [cars]);

  // Filter cars based on selected filters - ONLY BUDGET CARS
  const filteredCars = cars.filter((car) => {
    // Enforce budget limit
    if (car.dailyRate > 60) return false;
    
    if (selectedCategory !== "all" && car.category !== selectedCategory) {
      return false;
    }
    if (selectedTransmission !== "all" && car.transmission !== selectedTransmission) {
      return false;
    }
    if (selectedSeats !== "all") {
      const seats = parseInt(selectedSeats);
      if (car.seats !== seats) return false;
    }
    // Price filter
    if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) {
      return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTransmission("all");
    setSelectedSeats("all");
    if (cars.length > 0) {
      const prices = cars.map((car) => car.dailyRate);
      setPriceRange([Math.min(...prices), Math.min(Math.max(...prices), 60)]);
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
      {/* Hero Section - BUDGET FOCUSED */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image - Economy car */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold mb-6">
            🔥 SAVE UP TO 40% ON RENTALS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Cheap Car Rental Kigali
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Quality cars from <span className="text-green-400 font-bold text-2xl">$25/day</span>. Best budget car rental in Kigali, Rwanda. 
            No hidden fees, free delivery, and full insurance included.
          </p>
          
          {/* Price Guarantee Badge */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white">$25</div>
              <div className="text-xs text-white/80">Economy Cars</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white">$35</div>
              <div className="text-xs text-white/80">Compact SUVs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white">$45</div>
              <div className="text-xs text-white/80">Family Sedans</div>
            </div>
          </div>
          
          <Link
            href="#fleet"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7-7-7m14-6l-7-7-7 7" />
            </svg>
            View Budget Cars Starting $25
          </Link>
        </div>
      </section>

      {/* Budget Savings Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-yellow-900 font-bold flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            ✓ BEST PRICE GUARANTEE - FREE DELIVERY IN KIGALI - NO HIDDEN FEES ✓
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="fleet">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Budget Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Category Filter - BUDGET FOCUSED */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Economy Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#4B5320] focus:outline-none text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Budget Cars" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transmission Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#4B5320] focus:outline-none text-gray-900"
                  >
                    {transmissions.map((trans) => (
                      <option key={trans} value={trans}>
                        {trans === "all" ? "All" : trans}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seats Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Seats
                  </label>
                  <select
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#4B5320] focus:outline-none text-gray-900"
                  >
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat === "all" ? "All" : `${seat} Seats`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter - BUDGET CAPPED AT $60 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Daily Budget (Max $60)
                  </label>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-bold text-[#4B5320]">${priceRange[0]}</span>
                    <span className="text-gray-400">—</span>
                    <span className="font-bold text-[#4B5320]">${priceRange[1]}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < priceRange[1]) {
                          setPriceRange([value, priceRange[1]]);
                        }
                      }}
                      className="absolute w-full accent-[#4B5320] pointer-events-auto"
                      style={{ zIndex: priceRange[0] > maxPrice - 100 ? 5 : 3 }}
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > priceRange[0]) {
                          setPriceRange([priceRange[0], value]);
                        }
                      }}
                      className="absolute w-full accent-[#4B5320] pointer-events-auto"
                      style={{ zIndex: priceRange[1] < minPrice + 100 ? 5 : 4 }}
                    />
                    <div className="h-6"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Economy</span>
                    <span>Budget</span>
                    <span>Value</span>
                  </div>
                </div>

                {/* Budget Tip */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-gray-600">
                      <span className="font-bold text-green-700">Weekly rentals save 15%</span> - Book 7+ days for best value.
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="text-2xl font-bold text-green-600">{filteredCars.length}</span> budget vehicles available
                </p>
                <p className="text-xs text-gray-500 mt-1">All under $60/day with insurance</p>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full mt-4 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Right Content - Cars Grid */}
          <div className="flex-1">

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B5320] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading budget vehicles...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No budget vehicles match</h3>
            <p className="text-gray-600 mb-4">Try adjusting your price range or category.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3d441a] transition-all"
            >
              Show All Budget Cars
            </button>
          </div>
        )}

        {/* Car Grid - 2 columns on mobile */}
        {!loading && filteredCars.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Budget Cars <span className="text-green-600">${priceRange[0]} - ${priceRange[1]}</span>
              </h2>
              <p className="text-sm text-gray-500">
                <span className="font-bold">{filteredCars.length}</span> results
              </p>
            </div>
          
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {filteredCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/cars/${car.id}?budget=true`}
                  className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-green-500 transition-all hover:shadow-lg"
                >
                  {/* Car Image */}
                  <div className="relative h-32 md:h-48 bg-gray-100 overflow-hidden">
                    {car.images && car.images.length > 0 ? (
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* BUDGET BADGE */}
                    <div className="absolute top-1 md:top-2 right-1 md:right-2 bg-green-500 text-white px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-bold flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      BEST VALUE
                    </div>
                    {/* SAVINGS BADGE */}
                    {car.dailyRate <= 35 && (
                      <div className="absolute top-1 md:top-2 left-1 md:left-2 bg-yellow-500 text-white px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-bold">
                        🔥 SAVE 40%
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-3 md:p-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm md:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                        {car.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-[8px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-bold">
                        ${car.dailyRate}
                      </span>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-1 md:gap-2 mb-2 md:mb-4">
                      <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="hidden md:inline">{car.seats} Seats</span>
                        <span className="md:hidden">{car.seats}s</span>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="hidden md:inline">{car.transmission}</span>
                        <span className="md:hidden capitalize">{car.transmission.substring(0, 4)}</span>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-gray-600">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="hidden md:inline capitalize">{car.fuelType}</span>
                        <span className="md:hidden capitalize">{car.fuelType.substring(0, 3)}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-2 md:mb-4">
                      <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-gray-100 text-gray-700 rounded-full text-[9px] md:text-xs font-bold">
                        {car.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between pt-2 md:pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-base md:text-2xl font-bold text-green-600">${car.dailyRate}</span>
                        <span className="text-[10px] md:text-sm text-gray-600">/day</span>
                        {car.weeklyRate && (
                          <div className="text-[8px] md:text-xs text-gray-500">
                            ${car.weeklyRate}/week • Save 15%
                          </div>
                        )}
                      </div>
                      <div className="bg-green-600 text-white p-1 md:p-2 rounded-full group-hover:bg-green-700 transition-colors">
                        <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Budget Tips Section */}
        {!loading && filteredCars.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold mb-4">
                  💰 PRO TIPS
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Save More on Your Kigali Rental
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><span className="font-bold">Weekly rentals:</span> Book 7+ days and save 15%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><span className="font-bold">Manual transmission:</span> Save $5-10/day on economy cars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><span className="font-bold">Free delivery:</span> Airport & hotel delivery included</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Need a better deal?</div>
                  <p className="text-gray-600 mb-4">Contact us for long-term discounts and special offers</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="tel:+250796077321"
                      className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Budget Hotline
                    </a>
                    <Link
                      href="/contact?inquiry=budget"
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-bold hover:bg-green-50 transition-all"
                    >
                      Request Special Rate
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
