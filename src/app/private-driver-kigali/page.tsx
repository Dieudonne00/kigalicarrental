// app/private-driver-kigali/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Car } from "@/types/car";

export default function PrivateDriverKigali() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [serviceType, setServiceType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [includeLuxury, setIncludeLuxury] = useState<boolean>(false);

  useEffect(() => {
    fetchPrivateDriverCars();
  }, []);

  const fetchPrivateDriverCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars?chauffeur=true");
      const data = await response.json();
      let fetchedCars = data.cars || [];
      
      // All cars available for private driver service
      setCars(fetchedCars);

      if (fetchedCars.length > 0) {
        const prices = fetchedCars.map((car: Car) => car.dailyRate);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching private driver cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minPrice: 65, maxPrice: 250 };
    const prices = cars.map((car) => car.dailyRate);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [cars]);

  // Get unique values for filters
  const { categories, seatOptions } = useMemo(() => {
    const uniqueCategories = Array.from(new Set(cars.map((car) => car.category)));
    const uniqueSeats = Array.from(new Set(cars.map((car) => car.seats))).sort((a, b) => a - b);

    return {
      categories: ["all", ...uniqueCategories],
      seatOptions: ["all", ...uniqueSeats.map(String)],
    };
  }, [cars]);

  // Service types
  const serviceTypes = [
    { id: "all", name: "All Services", icon: "🚗" },
    { id: "airport", name: "Airport Transfer", icon: "✈️" },
    { id: "business", name: "Business Travel", icon: "💼" },
    { id: "city", name: "City Tours", icon: "🏙️" },
    { id: "wedding", name: "Wedding/Event", icon: "💍" },
    { id: "safari", name: "Private Safari", icon: "🦁" },
  ];

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    if (selectedCategory !== "all" && car.category !== selectedCategory) return false;
    if (selectedSeats !== "all") {
      const seats = parseInt(selectedSeats);
      if (car.seats !== seats) return false;
    }
    if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) return false;
    if (includeLuxury && car.category !== "Luxury" && !car.category.includes("Luxury") && !car.category.includes("Mercedes") && !car.category.includes("BMW")) {
      return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSeats("all");
    setServiceType("all");
    setIncludeLuxury(false);
    if (cars.length > 0) {
      const prices = cars.map((car) => car.dailyRate);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSeats !== "all" ||
    serviceType !== "all" ||
    includeLuxury ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - PRIVATE DRIVER LUXURY */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image - Luxury chauffeur service */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555215691-9ba3fb4f3e5b?auto=format&fit=crop&w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-purple-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            PROFESSIONAL CHAUFFEUR SERVICE • KIGALI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)] leading-tight">
            Private Driver Kigali
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            <span className="font-bold text-purple-300">Executive class</span> chauffeur service. 
            Professional, punctual, and discreet. Your personal driver in Rwanda's capital.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">5★</div>
              <div className="text-xs text-white/80">Professional</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/80">Availability</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-xs text-white/80">Corporate Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">Fully</div>
              <div className="text-xs text-white/80">Insured</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#fleet"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Find Your Chauffeur
            </Link>
            <Link
              href="/chauffeur-service-rwanda"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Why Choose Us
            </Link>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-2 py-4">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => setServiceType(service.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  serviceType === service.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{service.icon}</span>
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 text-center">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Meet & Greet</h3>
            <p className="text-sm text-gray-600">Airport pickup with name sign</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 text-center">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Flight Monitoring</h3>
            <p className="text-sm text-gray-600">We track delays automatically</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 text-center">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Corporate Accounts</h3>
            <p className="text-sm text-gray-600">Monthly billing available</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 text-center">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Bespoke Service</h3>
            <p className="text-sm text-gray-600">Tailored to your needs</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="fleet">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Private Driver Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Chauffeur Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Service Type Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900"
                  >
                    {serviceTypes.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.icon} {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vehicle Class
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Vehicles" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Luxury Toggle */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Executive Class
                  </label>
                  <button
                    onClick={() => setIncludeLuxury(!includeLuxury)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      includeLuxury
                        ? "bg-purple-50 border-purple-500 text-purple-700"
                        : "bg-white border-gray-200 text-gray-700 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        includeLuxury ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Luxury & Executive</div>
                        <div className="text-xs">Mercedes, BMW, Range Rover</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      includeLuxury ? "bg-purple-500 border-purple-500" : "border-gray-300"
                    }`}>
                      {includeLuxury && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>

                {/* Seats Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Passenger Capacity
                  </label>
                  <select
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900"
                  >
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat === "all" ? "All" : `${seat} Seats`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Daily Rate Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Daily Chauffeur Rate
                  </label>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-bold text-purple-600">${priceRange[0]}</span>
                    <span className="text-gray-400">—</span>
                    <span className="font-bold text-purple-600">${priceRange[1]}</span>
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
                      className="absolute w-full accent-purple-600 pointer-events-auto"
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
                      className="absolute w-full accent-purple-600 pointer-events-auto"
                      style={{ zIndex: priceRange[1] < minPrice + 100 ? 5 : 4 }}
                    />
                    <div className="h-6"></div>
                  </div>
                </div>

                {/* Chauffeur Benefits */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Included with every driver:</p>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li className="flex items-center gap-1">
                          <span className="text-purple-600">•</span> Professional English-speaking driver
                        </li>
                        <li className="flex items-center gap-1">
                          <span className="text-purple-600">•</span> Bottled water & WiFi
                        </li>
                        <li className="flex items-center gap-1">
                          <span className="text-purple-600">•</span> Flight tracking included
                        </li>
                        <li className="flex items-center gap-1">
                          <span className="text-purple-600">•</span> All taxes & insurance
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="text-3xl font-bold text-purple-600">{filteredCars.length}</span> chauffeur vehicles
                </p>
                <p className="text-xs text-gray-500 mt-1">Professional drivers included</p>
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

          {/* Right Content - Private Driver Cars Grid */}
          <div className="flex-1">

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading chauffeur vehicles...</p>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">No chauffeur vehicles match</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or contact us for custom requests.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all"
            >
              View All Chauffeur Cars
            </button>
          </div>
        )}

        {/* Car Grid */}
        {!loading && filteredCars.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Private Driver Fleet <span className="text-purple-600">${priceRange[0]} - ${priceRange[1]}/day</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">Professional chauffeur included • Fully insured</p>
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-bold">
                {filteredCars.length} chauffeur ready
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-purple-500 transition-all hover:shadow-xl"
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
                    
                    {/* PRIVATE DRIVER BADGE */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      CHAUFFEUR
                    </div>
                    
                    {/* LUXURY BADGE */}
                    {(car.category.includes("Luxury") || car.category.includes("Mercedes") || car.category.includes("BMW")) ? (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        EXECUTIVE
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        🚗 PREMIUM
                      </div>
                    )}
                    
                    {/* Service Type Badge */}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                      {serviceType !== "all" 
                        ? serviceTypes.find(s => s.id === serviceType)?.icon + " " + serviceTypes.find(s => s.id === serviceType)?.name
                        : "✈️ Airport Ready"
                      }
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {car.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {car.brand} • {car.year} • {car.transmission}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-purple-100 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="text-xs font-bold text-purple-700">Verified</span>
                      </div>
                    </div>

                    {/* Chauffeur Features */}
                    <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-gray-100">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold">Professional</span>
                        <span className="text-[10px] text-gray-500">Driver</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold">Flight</span>
                        <span className="text-[10px] text-gray-500">Tracking</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold">Fully</span>
                        <span className="text-[10px] text-gray-500">Insured</span>
                      </div>
                    </div>

                    {/* Specs */}
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

                    {/* Chauffeur Pricing */}
                    <div className="flex items-baseline justify-between mb-5">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-purple-600">${car.dailyRate}</span>
                          <span className="text-sm text-gray-500 ml-1">/day</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-bold text-green-600">Includes professional driver</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                          + Driver included
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`/book-now?car=${car.id}&chauffeur=true&service=${serviceType}`}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 transition-all text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Book Chauffeur
                      </Link>
                      <Link
                        href={`/cars/${car.id}?chauffeur=true`}
                        className="flex items-center justify-center px-4 py-3 border-2 border-purple-500 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-all text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Driver Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Private Driver CTA - Corporate & Events */}
        {!loading && filteredCars.length > 0 && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-slate-900 to-purple-900 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 backdrop-blur-sm">
                    👔 CORPORATE CHAUFFEUR SERVICES
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Dedicated Driver for Your Business
                  </h2>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Monthly contracts, corporate accounts, and VIP chauffeur services for 
                    executives, embassies, NGOs, and business travelers in Kigali.
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
                      Chauffeur Hotline
                    </a>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Why Choose Our Drivers:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Professional English-speaking drivers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Background checked & uniformed</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Flight tracking & wait time included</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Bottled water, WiFi, phone chargers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Fully insured & licensed</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-white/80">
                      <span className="font-bold text-purple-300">24/7 Dispatch:</span> +250 796 077 321
                    </p>
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
