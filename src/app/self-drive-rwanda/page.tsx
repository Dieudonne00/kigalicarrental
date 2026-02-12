// app/self-drive-rwanda/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

export default function SelfDriveRwanda() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [include4x4, setInclude4x4] = useState<boolean>(false);

  useEffect(() => {
    fetchSelfDriveCars();
  }, []);

  const fetchSelfDriveCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars?selfdrive=true");
      const data = await response.json();
      let fetchedCars = data.cars || [];
      
      // All cars available for self drive
      setCars(fetchedCars);

      if (fetchedCars.length > 0) {
        const prices = fetchedCars.map((car: Car) => car.dailyRate);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching self-drive cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minPrice: 35, maxPrice: 150 };
    const prices = cars.map((car) => car.dailyRate);
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
    if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) return false;
    if (include4x4 && car.category !== "4x4" && !car.category.includes("4x4") && !car.category.includes("SUV")) {
      return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTransmission("all");
    setSelectedSeats("all");
    setInclude4x4(false);
    if (cars.length > 0) {
      const prices = cars.map((car) => car.dailyRate);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTransmission !== "all" ||
    selectedSeats !== "all" ||
    include4x4 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - SELF DRIVE ADVENTURE */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image - Scenic Rwanda road */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-emerald-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            DRIVE YOURSELF • NO CHAUFFEUR NEEDED
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)] leading-tight">
            Self Drive Rwanda
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore the Land of a Thousand Hills <span className="font-bold text-amber-400">at your own pace</span>. 
            Freedom, flexibility, and adventure await.
          </p>
          
          {/* Adventure Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">4x4</div>
              <div className="text-xs text-white/80">Safari Ready</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">GPS</div>
              <div className="text-xs text-white/80">Navigation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/80">Roadside</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">Unlimited</div>
              <div className="text-xs text-white/80">Mileage</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#fleet"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Find Your Adventure
            </Link>
            <Link
              href="/self-drive-rwanda-guide"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Self Drive Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Self Drive Benefits */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-4 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">No Driver Required</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold">Free Driving Guide</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-semibold">Offline Maps</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="font-semibold">Unlimited Mileage</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Self Drive Routes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Self Drive Routes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hit the road and discover Rwanda's most scenic drives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span>KIGALI • 2 HOURS</span>
                </div>
                <h3 className="text-xl font-bold text-white">Kigali to Musanze</h3>
                <p className="text-white/80 text-sm mt-1">Volcanoes National Park, Gorilla trekking</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-white/70">
                  <span className="px-2 py-1 bg-white/20 rounded-full">Scenic hills</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full">Gorilla view</span>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span>EASTERN • 3 HOURS</span>
                </div>
                <h3 className="text-xl font-bold text-white">Kigali to Akagera</h3>
                <p className="text-white/80 text-sm mt-1">Big Five safari, game drives, bush camping</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-white/70">
                  <span className="px-2 py-1 bg-white/20 rounded-full">Wildlife</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full">4x4 recommended</span>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525425514-59bd992c8a4d?auto=format&fit=crop&w=600)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span>WESTERN • 5 HOURS</span>
                </div>
                <h3 className="text-xl font-bold text-white">Kigali to Lake Kivu</h3>
                <p className="text-white/80 text-sm mt-1">Gisenyi, Kibuye, beach resorts, coffee tours</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-white/70">
                  <span className="px-2 py-1 bg-white/20 rounded-full">Beach</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full">Scenic drive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="fleet">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Self Drive Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Self Drive Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Self Drive Vehicles" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4x4 Safari Toggle */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Adventure Ready
                  </label>
                  <button
                    onClick={() => setInclude4x4(!include4x4)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      include4x4
                        ? "bg-amber-50 border-amber-500 text-amber-700"
                        : "bg-white border-gray-200 text-gray-700 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        include4x4 ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold">4x4 Safari Vehicles</div>
                        <div className="text-xs">For Akagera, Volcanoes & off-road</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      include4x4 ? "bg-amber-500 border-amber-500" : "border-gray-300"
                    }`}>
                      {include4x4 && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>

                {/* Transmission Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-gray-900"
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-gray-900"
                  >
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat === "all" ? "All" : `${seat} Seats`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Daily Price Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Daily Budget
                  </label>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-bold text-amber-600">${priceRange[0]}</span>
                    <span className="text-gray-400">—</span>
                    <span className="font-bold text-amber-600">${priceRange[1]}</span>
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
                      className="absolute w-full accent-amber-500 pointer-events-auto"
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
                      className="absolute w-full accent-amber-500 pointer-events-auto"
                      style={{ zIndex: priceRange[1] < minPrice + 100 ? 5 : 4 }}
                    />
                    <div className="h-6"></div>
                  </div>
                </div>

                {/* Self Drive Tips */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Self Drive Tips</p>
                      <p className="text-xs text-gray-600 mt-1">Valid driver's license required. International license recommended.</p>
                      <Link href="/self-drive-rwanda-guide" className="text-xs text-amber-600 font-bold hover:underline mt-2 inline-block">
                        Read our complete guide →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="text-3xl font-bold text-amber-600">{filteredCars.length}</span> self drive vehicles
                </p>
                <p className="text-xs text-gray-500 mt-1">All with unlimited mileage</p>
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

          {/* Right Content - Self Drive Cars Grid */}
          <div className="flex-1">

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading self drive vehicles...</p>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">No self drive vehicles match</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or check our 4x4 safari vehicles.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all"
            >
              Show All Self Drive Cars
            </button>
          </div>
        )}

        {/* Car Grid */}
        {!loading && filteredCars.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Self Drive Fleet <span className="text-amber-600">${priceRange[0]} - ${priceRange[1]}/day</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">Unlimited mileage • Free GPS • 24/7 support</p>
              </div>
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-bold">
                {filteredCars.length} ready to drive
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-amber-500 transition-all hover:shadow-xl"
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
                    
                    {/* SELF DRIVE BADGE */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      SELF DRIVE
                    </div>
                    
                    {/* 4x4 BADGE */}
                    {car.category.includes("4x4") || car.category.includes("SUV") || car.category.includes("Land Cruiser") ? (
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        🚙 4x4 READY
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        🚗 CITY DRIVE
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {car.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {car.brand} • {car.year}
                        </p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-bold">
                        {car.transmission}
                      </span>
                    </div>

                    {/* Self Drive Features */}
                    <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-gray-100">
                      <div className="flex flex-col items-center">
                        <svg className="w-5 h-5 text-amber-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="text-xs font-bold">Unlimited</span>
                        <span className="text-[10px] text-gray-500">Mileage</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className="w-5 h-5 text-amber-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-bold">Free GPS</span>
                        <span className="text-[10px] text-gray-500">Navigation</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className="w-5 h-5 text-amber-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-bold">24/7</span>
                        <span className="text-[10px] text-gray-500">Roadside</span>
                      </div>
                    </div>

                    {/* Specs Icons */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{car.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="capitalize">{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="capitalize">{car.category}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-5">
                      <div>
                        <span className="text-3xl font-bold text-amber-600">${car.dailyRate}</span>
                        <span className="text-sm text-gray-500 ml-1">/day</span>
                        {car.weeklyRate && (
                          <div className="text-xs text-gray-500 mt-1">
                            <span className="font-bold text-green-600">${car.weeklyRate}/week</span> • Save 15%
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Free cancellation</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`/book-now?car=${car.id}&selfdrive=true`}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-bold hover:from-amber-600 hover:to-orange-700 transition-all text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        Self Drive Now
                      </Link>
                      <Link
                        href={`/cars/${car.id}`}
                        className="flex items-center justify-center px-4 py-3 border-2 border-amber-500 text-amber-600 rounded-lg font-bold hover:bg-amber-50 transition-all text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Vehicle Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Self Drive Guide CTA */}
        {!loading && filteredCars.length > 0 && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 backdrop-blur-sm">
                    🗺️ FIRST TIME SELF DRIVE IN RWANDA?
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Download Our Free Self Drive Guide
                  </h2>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Everything you need to know about driving in Rwanda: road rules, 
                    safety tips, scenic routes, parking, fuel stations, and emergency contacts.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/self-drive-rwanda-guide"
                      className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Read the Guide
                    </Link>
                    <a
                      href="tel:+250796077321"
                      className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Self Drive Hotline
                    </a>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 text-xs font-bold">✓</span>
                      </div>
                      <span>Rwanda road rules & regulations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 text-xs font-bold">✓</span>
                      </div>
                      <span>Top 10 scenic self drive routes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 text-xs font-bold">✓</span>
                      </div>
                      <span>Parking guide for Kigali city</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 text-xs font-bold">✓</span>
                      </div>
                      <span>Emergency contacts & fuel stations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 text-xs font-bold">✓</span>
                      </div>
                      <span>4x4 off-road driving tips</span>
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
