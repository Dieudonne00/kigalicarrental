// app/deals/last-minute/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

// Define Car type locally to avoid import errors
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
  discount?: number;
  lastMinuteAvailable?: boolean;
  availableToday?: boolean;
  availableTomorrow?: boolean;
}

export default function LastMinuteDeals() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [discountFilter, setDiscountFilter] = useState<string>("all");

  useEffect(() => {
    fetchLastMinuteDeals();
  }, []);

  const fetchLastMinuteDeals = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars?lastminute=true");
      const data = await response.json();
      let fetchedCars = data.cars || [];
      
      // Apply last minute discounts (20-40% off)
      fetchedCars = fetchedCars.map((car: Car) => ({
        ...car,
        originalRate: car.dailyRate,
        dailyRate: Math.round(car.dailyRate * (Math.random() * 0.3 + 0.6)),
        discount: Math.floor(Math.random() * 30) + 20,
        lastMinuteAvailable: true,
        availableToday: Math.random() > 0.3,
        availableTomorrow: Math.random() > 0.3,
      }));
      
      setCars(fetchedCars);

      if (fetchedCars.length > 0) {
        const prices = fetchedCars.map((car: Car) => car.dailyRate);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching last minute deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (cars.length === 0) return { minPrice: 25, maxPrice: 120 };
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

  // Discount options
  const discountOptions = [
    { id: "all", name: "All Deals", icon: "🔥" },
    { id: "20plus", name: "20%+ Off", icon: "⚡" },
    { id: "30plus", name: "30%+ Off", icon: "🚀" },
    { id: "40plus", name: "40%+ Off", icon: "💎" },
    { id: "today", name: "Available Today", icon: "⏰" },
  ];

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    if (selectedCategory !== "all" && car.category !== selectedCategory) return false;
    if (selectedTransmission !== "all" && car.transmission !== selectedTransmission) return false;
    if (selectedSeats !== "all") {
      const seats = parseInt(selectedSeats);
      if (car.seats !== seats) return false;
    }
    if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) return false;
    
    if (discountFilter === "20plus" && (car.discount || 0) < 20) return false;
    if (discountFilter === "30plus" && (car.discount || 0) < 30) return false;
    if (discountFilter === "40plus" && (car.discount || 0) < 40) return false;
    if (discountFilter === "today" && !car.availableToday) return false;
    
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTransmission("all");
    setSelectedSeats("all");
    setDiscountFilter("all");
    if (cars.length > 0) {
      const prices = cars.map((car) => car.dailyRate);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTransmission !== "all" ||
    selectedSeats !== "all" ||
    discountFilter !== "all" ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4B5320]/95 to-[#3a4218]/95"></div>
        </div>

        <div className="absolute top-10 left-10 animate-pulse">
          <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            LIVE • {cars.length} ACTIVE DEALS
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg animate-bounce">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10h-1V8h1v2zm0-4h-1v1h1V6zm.5 9.5c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8zm-3-6h-2v5l3.61 2.16.75-1.22-2.36-1.41V6z" />
            </svg>
            ⚡ FLASH SALE • 24 HOURS ONLY ⚡
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)] leading-tight">
            Last Minute Deals
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            <span className="font-bold text-[#D0D98D]">Save up to 50%</span> on vehicles available now. 
            Book today for immediate pickup in Kigali.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-6 py-4 border border-[#D0D98D]/30">
              <div className="text-4xl font-bold text-[#D0D98D]">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs text-white/80">Hours</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-6 py-4 border border-[#D0D98D]/30">
              <div className="text-4xl font-bold text-[#D0D98D]">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs text-white/80">Minutes</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-6 py-4 border border-[#D0D98D]/30">
              <div className="text-4xl font-bold text-[#D0D98D]">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-white/80">Seconds</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#deals"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#4B5320] text-white font-bold rounded-lg hover:bg-[#3a4218] transition-all shadow-lg hover:shadow-xl text-lg border border-[#6B7F3A]/50"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Claim Your Deal
            </Link>
            <Link
              href="#deals"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              🔥 {cars.length} Hot Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDEgNTYgMCAyOCAyOCAwIDEgMS01NiAweiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm animate-pulse">
            <span className="text-white font-bold text-lg">🚨 FLASH SALE</span>
            <span className="text-white">•</span>
            <span className="text-white font-semibold">UP TO 50% OFF</span>
            <span className="text-white">•</span>
            <span className="text-white font-semibold">TODAY ONLY</span>
            <span className="text-white">•</span>
            <span className="text-white font-semibold">NO DEPOSIT REQUIRED</span>
          </div>
        </div>
      </div>

      {/* Discount Categories */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-2 py-4">
            {discountOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setDiscountFilter(option.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  discountFilter === option.id
                    ? "bg-[#4B5320] text-white shadow-md border border-[#6B7F3A]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="deals">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-[#4B5320]/20 p-6 sticky top-24 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center animate-pulse">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Filter Deals</h2>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold ml-auto animate-pulse">
                  LIVE
                </span>
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#4B5320] focus:outline-none text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Deals" : cat}
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

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Deal Price
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
                </div>

                {/* Availability Badges */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Flash Sale Ends In:</p>
                      <div className="flex gap-2 mt-2">
                        <div className="bg-white px-2 py-1 rounded border border-gray-200">
                          <span className="text-lg font-bold text-[#4B5320]">{String(timeLeft.hours).padStart(2, '0')}</span>
                          <span className="text-xs text-gray-500 ml-1">h</span>
                        </div>
                        <div className="bg-white px-2 py-1 rounded border border-gray-200">
                          <span className="text-lg font-bold text-[#4B5320]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                          <span className="text-xs text-gray-500 ml-1">m</span>
                        </div>
                        <div className="bg-white px-2 py-1 rounded border border-gray-200">
                          <span className="text-lg font-bold text-[#4B5320]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                          <span className="text-xs text-gray-500 ml-1">s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#4B5320]/5 border border-[#4B5320]/20 rounded-lg p-3">
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    <span className="font-bold">Limited availability:</span> 8 people viewing this page
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="text-3xl font-bold text-[#4B5320]">{filteredCars.length}</span> hot deals
                </p>
                <p className="text-xs text-gray-500 mt-1">Prices already discounted</p>
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

          {/* Right Content - Deals Grid */}
          <div className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B5320] mx-auto"></div>
                <p className="mt-4 text-gray-600">Finding the best deals for you...</p>
              </div>
            )}

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
                <h3 className="text-xl font-bold text-gray-900 mb-2">No last minute deals match</h3>
                <p className="text-gray-600 mb-4">Try adjusting filters or check back soon for new deals!</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3a4218] transition-all"
                >
                  View All Deals
                </button>
              </div>
            )}

            {!loading && filteredCars.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      🔥 Last Minute Deals <span className="text-[#4B5320]">${priceRange[0]} - ${priceRange[1]}</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Limited time offers • Book now</p>
                  </div>
                  <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-bold animate-pulse">
                    {filteredCars.length} deals ending soon
                  </div>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <div
                      key={car.id}
                      className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#4B5320] transition-all hover:shadow-xl relative"
                    >
                      <div className="absolute top-0 left-0 bg-[#4B5320] text-white px-4 py-2 rounded-br-xl z-10 font-bold shadow-lg">
                        <span className="text-xl mr-1">{car.discount}%</span>
                        <span className="text-xs">OFF</span>
                      </div>
                      
                      <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-bl-xl z-10 font-bold animate-pulse">
                        ⚡ FLASH
                      </div>

                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {car.images && car.images.length > 0 ? (
                          <img
                            src={car.images[0]}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : car.imageUrl ? (
                          <img
                            src={car.imageUrl}
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
                        
                        {car.availableToday ? (
                          <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            AVAILABLE TODAY
                          </div>
                        ) : car.availableTomorrow ? (
                          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            AVAILABLE TOMORROW
                          </div>
                        ) : null}
                        
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                          {car.year}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4B5320] transition-colors">
                              {car.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {car.brand} • {car.transmission} • {car.seats} seats
                            </p>
                          </div>
                        </div>

                        <div className="mb-4 py-3 border-y border-gray-100">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Deal Price</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-[#4B5320]">${car.dailyRate}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">Original</div>
                              <div className="text-lg text-gray-400 line-through">${car.originalRate}</div>
                              <div className="text-xs text-green-600 font-bold mt-1">
                                Save ${(car.originalRate || 0) - car.dailyRate}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{car.seats} seats</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="capitalize">{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="capitalize">{car.category}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-gray-600">Deal ending in:</span>
                            <span className="font-bold text-red-600">24h</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-[#4B5320] h-1.5 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">8 people viewing</span>
                            <span className="text-xs text-gray-500">3 booked today</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/book-now?car=${car.id}&deal=lastminute`}
                            className="flex items-center justify-center px-4 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3a4218] transition-all text-sm border border-[#6B7F3A]/50"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Book Deal
                          </Link>
                          <Link
                            href={`/cars/${car.id}`}
                            className="flex items-center justify-center px-4 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320]/5 transition-all text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {!loading && filteredCars.length > 0 && (
              <div className="mt-16">
                <div className="bg-gradient-to-r from-[#4B5320] to-[#3a4218] rounded-2xl p-8 md:p-12 text-white border border-[#6B7F3A]/30">
                  <div className="text-center mb-8">
                    <div className="inline-block px-3 py-1 bg-[#D0D98D]/20 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-[#D0D98D]/30 text-[#D0D98D]">
                      ⚡ WHY LAST MINUTE?
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Save More When You Book Today
                    </h2>
                    <p className="text-white/90 max-w-2xl mx-auto">
                      Vehicles need to move. We offer deep discounts on cars available for immediate pickup.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                      <div className="w-12 h-12 bg-[#D0D98D] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Same-Day Pickup</h3>
                      <p className="text-white/80 text-sm">Drive away in 30 minutes. No waiting.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                      <div className="w-12 h-12 bg-[#D0D98D] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Up to 50% Off</h3>
                      <p className="text-white/80 text-sm">Deep discounts on select vehicles.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                      <div className="w-12 h-12 bg-[#D0D98D] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">No Deposit</h3>
                      <p className="text-white/80 text-sm">Zero deposit required for last minute bookings.</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <a
                      href="tel:+250796077321"
                      className="inline-flex items-center px-6 py-3 bg-white text-[#4B5320] rounded-lg font-bold hover:bg-gray-100 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call for Last Minute Deals
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
