// app/long-term-car-rental-rwanda/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

export default function LongTermCarRentalRwanda() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [rentalDuration, setRentalDuration] = useState<string>("monthly");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    fetchLongTermCars();
  }, []);

  const fetchLongTermCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars?longterm=true");
      const data = await response.json();
      let fetchedCars = data.cars || [];
      
      // Only show cars with monthly rates available
      fetchedCars = fetchedCars.filter((car: Car) => car.monthlyRate && car.monthlyRate > 0);
      
      setCars(fetchedCars);

      if (fetchedCars.length > 0) {
        const prices = fetchedCars.map((car: Car) => car.monthlyRate || 0);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching long-term cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate monthly savings vs daily rate
  const calculateMonthlySavings = (car: Car) => {
    if (!car.dailyRate || !car.monthlyRate) return 0;
    const dailyMonthlyCost = car.dailyRate * 30;
    const savings = dailyMonthlyCost - (car.monthlyRate || 0);
    return Math.round((savings / dailyMonthlyCost) * 100);
  };

  // Calculate weekly savings vs daily rate
  const calculateWeeklySavings = (car: Car) => {
    if (!car.dailyRate || !car.weeklyRate) return 0;
    const dailyWeeklyCost = car.dailyRate * 7;
    const savings = dailyWeeklyCost - (car.weeklyRate || 0);
    return Math.round((savings / dailyWeeklyCost) * 100);
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minPrice: 800, maxPrice: 3200 };
    const prices = cars.map((car) => car.monthlyRate || 0);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [cars]);

  // Get unique values for filters
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

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    if (selectedCategory !== "all" && car.category !== selectedCategory) return false;
    if (selectedTransmission !== "all" && car.transmission !== selectedTransmission) return false;
    if (selectedSeats !== "all") {
      const seats = parseInt(selectedSeats);
      if (car.seats !== seats) return false;
    }
    const monthlyRate = car.monthlyRate || 0;
    if (monthlyRate < priceRange[0] || monthlyRate > priceRange[1]) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTransmission("all");
    setSelectedSeats("all");
    if (cars.length > 0) {
      const prices = cars.map((car) => car.monthlyRate || 0);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTransmission !== "all" ||
    selectedSeats !== "all" ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - LONG TERM FOCUSED */}
      <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
        {/* Background Image - Corporate/Long Term vibe */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560178802-11ba993c5238?auto=format&fit=crop&w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            ⭐ SAVE UP TO 40% ON MONTHLY RENTALS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Long Term Car Rental Rwanda
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Monthly & quarterly rentals from <span className="text-blue-300 font-bold text-3xl">$800/month</span>. 
            Perfect for NGOs, embassies, corporate clients, and expats. All-inclusive rates with free maintenance.
          </p>
          
          {/* Savings Calculator Preview */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">30-40%</div>
              <div className="text-xs text-white/80">Monthly Savings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">Free</div>
              <div className="text-xs text-white/80">Maintenance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/80">Roadside</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">Flexible</div>
              <div className="text-xs text-white/80">1-12 Months</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#fleet"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Monthly Rates
            </Link>
            <Link
              href="/corporate-account"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Corporate Accounts
            </Link>
          </div>
        </div>
      </section>

      {/* Long Term Benefits Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-4 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">FREE Maintenance</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">24/7 Roadside</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold">No Contract Fees</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="font-semibold">Flexible Payment</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-semibold">Insurance Included</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="fleet">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Long Term Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vehicle Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Long Term Vehicles" : cat}
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
                  >
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat === "all" ? "All" : `${seat} Seats`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monthly Price Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Monthly Budget (RWF/USD)
                  </label>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-bold text-blue-600">${formatPrice(priceRange[0])}</span>
                    <span className="text-gray-400">—</span>
                    <span className="font-bold text-blue-600">${formatPrice(priceRange[1])}</span>
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
                      className="absolute w-full accent-blue-600 pointer-events-auto"
                      style={{ zIndex: priceRange[0] > maxPrice - 1000 ? 5 : 3 }}
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
                      className="absolute w-full accent-blue-600 pointer-events-auto"
                      style={{ zIndex: priceRange[1] < minPrice + 1000 ? 5 : 4 }}
                    />
                    <div className="h-6"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Economy</span>
                    <span>Mid-Size</span>
                    <span>Luxury</span>
                  </div>
                </div>

                {/* Rental Duration Selector */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Rental Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setRentalDuration("monthly")}
                      className={`px-3 py-2 text-xs font-bold rounded-lg border-2 transition-all ${
                        rentalDuration === "monthly"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
                      }`}
                    >
                      1-3 Months
                    </button>
                    <button
                      onClick={() => setRentalDuration("quarterly")}
                      className={`px-3 py-2 text-xs font-bold rounded-lg border-2 transition-all ${
                        rentalDuration === "quarterly"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
                      }`}
                    >
                      3-6 Months
                    </button>
                    <button
                      onClick={() => setRentalDuration("yearly")}
                      className={`px-3 py-2 text-xs font-bold rounded-lg border-2 transition-all ${
                        rentalDuration === "yearly"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
                      }`}
                    >
                      6-12 Months
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {rentalDuration === "monthly" && "⭐ Best for short-term projects & trials"}
                    {rentalDuration === "quarterly" && "🔥 Save 25% on quarterly packages"}
                    {rentalDuration === "yearly" && "🚀 Save 40% on annual contracts"}
                  </p>
                </div>

                {/* Corporate Discount Badge */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Corporate Accounts</p>
                      <p className="text-xs text-gray-600 mt-1">NGOs, embassies & businesses get additional 10-20% off</p>
                      <Link href="/corporate-account" className="text-xs text-blue-600 font-bold hover:underline mt-2 inline-block">
                        Apply for corporate rates →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="text-3xl font-bold text-blue-600">{filteredCars.length}</span> long-term vehicles
                </p>
                <p className="text-xs text-gray-500 mt-1">All include free maintenance & insurance</p>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading long-term vehicles...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200 shadow-md">
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">No long-term vehicles match</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or contact us for custom packages.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
            >
              View All Long-Term Cars
            </button>
          </div>
        )}

        {/* Car Grid */}
        {!loading && filteredCars.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Long Term Fleet <span className="text-blue-600">${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}/mo</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">All vehicles include free maintenance & 24/7 support</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-bold">
                {filteredCars.length} available
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => {
                const monthlySavings = calculateMonthlySavings(car);
                const weeklySavings = calculateWeeklySavings(car);
                
                return (
                  <div
                    key={car.id}
                    className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-600 transition-all hover:shadow-xl"
                  >
                    {/* Car Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={car.images[0]}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* LONG TERM BADGE */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        LONG TERM
                      </div>
                      
                      {/* SAVINGS BADGE */}
                      {monthlySavings >= 30 && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          SAVE {monthlySavings}%
                        </div>
                      )}
                      
                      {/* YEAR BADGE */}
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                        {car.year}
                      </div>
                    </div>

                    {/* Car Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {car.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {car.brand} • {car.category}
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-bold">
                          ID: {car.id}
                        </span>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-4 gap-2 mb-4 py-3 border-y border-gray-100">
                        <div className="flex flex-col items-center">
                          <svg className="w-5 h-5 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-xs font-bold">{car.seats} Seats</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-5 h-5 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-xs font-bold capitalize">{car.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-5 h-5 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span className="text-xs font-bold capitalize">{car.fuelType}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-5 h-5 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-xs font-bold">{car.category}</span>
                        </div>
                      </div>

                      {/* Pricing - LONG TERM FOCUSED */}
                      <div className="mb-5">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Monthly Rate</div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold text-blue-600">${formatPrice(car.monthlyRate || 0)}</span>
                              <span className="text-sm text-gray-500">/month</span>
                            </div>
                            {car.dailyRate && (
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="line-through">${car.dailyRate}/day</span>
                                <span className="text-green-600 font-bold ml-2">Save {monthlySavings}%</span>
                              </div>
                            )}
                          </div>
                          {car.weeklyRate && weeklySavings > 0 && (
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">Weekly</div>
                              <div className="text-lg font-bold text-gray-900">${car.weeklyRate}</div>
                              <div className="text-xs text-green-600">Save {weeklySavings}%</div>
                            </div>
                          )}
                        </div>
                        
                        {/* Quarterly/Yearly Options */}
                        <div className="flex gap-2 mt-3">
                          {rentalDuration === "quarterly" && (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 flex-1">
                              <div className="text-xs text-purple-600 font-bold">3 Months</div>
                              <div className="text-sm font-bold">${formatPrice((car.monthlyRate || 0) * 3)}</div>
                              <div className="text-xs text-green-600">Save 25%</div>
                            </div>
                          )}
                          {rentalDuration === "yearly" && (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 flex-1">
                              <div className="text-xs text-purple-600 font-bold">12 Months</div>
                              <div className="text-sm font-bold">${formatPrice((car.monthlyRate || 0) * 12)}</div>
                              <div className="text-xs text-green-600">Save 40%</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={`/book-now?car=${car.id}&duration=longterm`}
                          className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Long Term Quote
                        </Link>
                        <Link
                          href={`/cars/${car.id}?longterm=true`}
                          className="flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Long Term Packages Section */}
        {!loading && filteredCars.length > 0 && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 backdrop-blur-sm">
                    🏢 CORPORATE & NGO PACKAGES
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Need Multiple Vehicles Long Term?
                  </h2>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    We offer specialized long-term fleet packages for NGOs, embassies, 
                    mining companies, and corporate clients in Rwanda. Custom contracts, 
                    dedicated account manager, and priority support.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/corporate-account"
                      className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Corporate Account
                    </Link>
                    <a
                      href="tel:+250796077321"
                      className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Fleet Sales: +250 796 077 321
                    </a>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Long Term Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Free scheduled maintenance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>24/7 roadside assistance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Free replacement vehicle</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Comprehensive insurance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Flexible payment terms</span>
                    </li>
                  </ul>
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
