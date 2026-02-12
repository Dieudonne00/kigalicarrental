// app/deals/last-minute/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

// Define Car type locally
interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  imageUrl: string;
  images?: string[];
  originalRate?: number;
  premiumRate?: number;
  deliveryTime: string;
  availableNow: boolean;
  driverIncluded?: boolean;
  location: string;
}

export default function LastMinuteDeals() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    fetchPremiumFastTrack();
  }, []);

  const fetchPremiumFastTrack = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars?fasttrack=true");
      const data = await response.json();
      let fetchedCars = data.cars || [];
      
      // PREMIUM FAST-TRACK SERVICE - INCREASED PRICES
      fetchedCars = fetchedCars.map((car: Car) => ({
        ...car,
        originalRate: car.dailyRate,
        // 30-50% HIGHER for instant delivery
        dailyRate: Math.round(car.dailyRate * 1.4), // 40% premium
        premiumRate: Math.round(car.dailyRate * 1.4),
        deliveryTime: "30 min",
        availableNow: true,
        driverIncluded: true,
        location: "Anywhere in Kigali",
      }));
      
      setCars(fetchedCars);

      if (fetchedCars.length > 0) {
        const prices = fetchedCars.map((car: Car) => car.dailyRate);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching premium fast-track:", error);
    } finally {
      setLoading(false);
    }
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minPrice: 85, maxPrice: 250 };
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

  // Filter cars
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

  // Countdown timer for next available slot
  const [timeLeft, setTimeLeft] = useState({
    minutes: 14,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO - FLAGSHIP PREMIUM FAST-TRACK */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555215691-9ba3fb4f3e5b?auto=format&fit=crop&w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4B5320]/95 to-[#1A1F0E]/95"></div>
        </div>

        {/* PREMIUM BADGE - CROWN */}
        <div className="absolute top-10 left-10 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-600 to-amber-700 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg border border-yellow-400/30">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            FLAGSHIP SERVICE • 30 MIN DELIVERY
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            ✓ RWANDA'S FASTEST CAR DELIVERY ✓
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)] leading-tight">
            Need a Car <span className="text-yellow-400">NOW?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            <span className="font-bold text-yellow-400 text-3xl">30 MINUTES</span> delivery. <br />
            Anywhere in Kigali. Premium vehicles. Professional driver included.
          </p>
          
          {/* PREMIUM TIMER */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="bg-black/60 backdrop-blur-md rounded-2xl px-8 py-5 border-2 border-yellow-400/50 shadow-xl">
              <div className="text-5xl font-bold text-yellow-400">{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-white/80 mt-1">Next available slot</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">30 min</div>
              <div className="text-xs text-white/80">Max delivery</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-white">KGL</div>
              <div className="text-xs text-white/80">Anywhere city</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#deals"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Car in 30min
            </Link>
            <a
              href="tel:+250796077321"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#4B5320] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg border-2 border-[#4B5320]"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Concierge Line
            </a>
          </div>
        </div>
      </section>

      {/* FLAGSHIP GUARANTEE BANNER */}
      <div className="bg-gradient-to-r from-[#4B5320] to-[#2E3518] py-4 relative overflow-hidden border-y border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="font-bold">30 MIN DELIVERY GUARANTEE</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="font-bold">PROFESSIONAL DRIVER INCLUDED</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="font-bold">PREMIUM FLEET • HIGHER STANDARDS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="deals">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTER SIDEBAR */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-[#4B5320]/20 p-6 sticky top-24 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Flagship Filter</h2>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold ml-auto">
                  PREMIUM
                </span>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vehicle Class
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Premium Vehicles" : cat}
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-900"
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-900"
                  >
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat === "all" ? "All" : `${seat} Seats`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range - HIGHER PRICES */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Premium Rate
                  </label>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-bold text-yellow-600">${priceRange[0]}</span>
                    <span className="text-gray-400">—</span>
                    <span className="font-bold text-yellow-600">${priceRange[1]}</span>
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
                      className="absolute w-full accent-yellow-500 pointer-events-auto"
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
                      className="absolute w-full accent-yellow-500 pointer-events-auto"
                    />
                    <div className="h-6"></div>
                  </div>
                </div>

                {/* 30 MIN DELIVERY BADGE */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">30 MIN DELIVERY</p>
                      <p className="text-xs text-gray-600 mt-1">Anywhere in Kigali. Guaranteed.</p>
                      <p className="text-xs font-bold text-yellow-700 mt-2">Next slot: {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#4B5320]/5 border border-[#4B5320]/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    <span className="font-bold">Flagship status:</span> Priority dispatch
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="text-3xl font-bold text-yellow-600">{filteredCars.length}</span> premium vehicles
                </p>
                <p className="text-xs text-gray-500 mt-1">30 min delivery • Driver included</p>
              </div>

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

          {/* VEHICLE GRID */}
          <div className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading flagship fleet...</p>
              </div>
            )}

            {!loading && filteredCars.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200 shadow-md">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No premium vehicles available</h3>
                <p className="text-gray-600 mb-4">Try our concierge line for immediate assistance.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700 transition-all"
                >
                  View All
                </button>
              </div>
            )}

            {!loading && filteredCars.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      ⚡ Flagship Fleet <span className="text-yellow-600">${priceRange[0]} - ${priceRange[1]}</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">30 min delivery • Premium service</p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-bold">
                    {filteredCars.length} ready now
                  </div>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <div
                      key={car.id}
                      className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-yellow-500 transition-all hover:shadow-xl relative"
                    >
                      {/* 30 MIN BADGE - PREMIUM YELLOW */}
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-br-xl z-10 font-bold shadow-lg flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        30 MIN
                      </div>
                      
                      {/* FLAGSHIP BADGE */}
                      <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-2 rounded-bl-xl z-10 font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        FLAGSHIP
                      </div>

                      {/* CAR IMAGE */}
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {car.images && car.images.length > 0 ? (
                          <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : car.imageUrl ? (
                          <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* AVAILABLE NOW */}
                        <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          READY NOW
                        </div>
                        
                        {/* YEAR */}
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                          {car.year}
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                              {car.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {car.brand} • {car.transmission} • {car.seats} seats
                            </p>
                          </div>
                        </div>

                        {/* PREMIUM PRICING - HIGHER */}
                        <div className="mb-4 py-3 border-y border-gray-100">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Flagship Rate</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-yellow-600">${car.dailyRate}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">Standard</div>
                              <div className="text-lg text-gray-400 line-through">${car.originalRate}</div>
                              <div className="text-xs text-[#4B5320] font-bold mt-1">
                                Premium +40%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* SPECS */}
                        <div className="flex items-center gap-3 mb-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{car.seats} seats</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="capitalize">{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="capitalize">{car.category}</span>
                          </div>
                        </div>

                        {/* FLAGSHIP FEATURES */}
                        <div className="flex gap-2 mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            30 MIN DELIVERY
                          </span>
                          <span className="bg-[#4B5320]/10 text-[#4B5320] text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            DRIVER INCLUDED
                          </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/book-now?car=${car.id}&flagship=true&delivery=30min`}
                            className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-bold hover:from-yellow-600 hover:to-amber-700 transition-all text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Get in 30min
                          </Link>
                          <Link
                            href={`/cars/${car.id}`}
                            className="flex items-center justify-center px-4 py-3 border-2 border-yellow-500 text-yellow-600 rounded-lg font-bold hover:bg-yellow-50 transition-all text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* FLAGSHIP VALUE PROPOSITION */}
            {!loading && filteredCars.length > 0 && (
              <div className="mt-16">
                <div className="bg-gradient-to-r from-[#4B5320] to-[#2E3518] rounded-2xl p-8 md:p-12 text-white border border-yellow-400/20">
                  <div className="text-center mb-8">
                    <div className="inline-block px-3 py-1 bg-yellow-500/20 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-yellow-400/30 text-yellow-400">
                      👑 FLAGSHIP SERVICE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Need a Car in 30 Minutes?
                    </h2>
                    <p className="text-white/90 max-w-2xl mx-auto">
                      Rwanda's fastest car delivery. Premium vehicles, professional drivers, 
                      anywhere in Kigali. You call. We deliver. You drive.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">30 Min Delivery</h3>
                      <p className="text-white/80 text-sm">Guaranteed. Anywhere in Kigali.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Driver Included</h3>
                      <p className="text-white/80 text-sm">Professional English-speaking chauffeur.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Premium Fleet</h3>
                      <p className="text-white/80 text-sm">Latest models, well-maintained.</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <a
                      href="tel:+250796077321"
                      className="inline-flex items-center px-6 py-3 bg-yellow-500 text-[#4B5320] rounded-lg font-bold hover:bg-yellow-400 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Flagship Concierge: +250 796 077 321
                    </a>
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
