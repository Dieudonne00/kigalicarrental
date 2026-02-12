// app/long-term/monthly/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface MonthlyRentalCar {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  monthlyRate: number;
  dailyRate: number;
  weeklyRate?: number | null;
  securityDeposit: number;
  mileageLimit: string;
  maintenanceIncluded: boolean;
  insuranceIncluded: boolean;
  minCommitment: number; // in months
  imageUrl: string;
  available: boolean;
  location: string;
}

export default function MonthlyRentalPage() {
  const [vehicles, setVehicles] = useState<MonthlyRentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommitment, setSelectedCommitment] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([400, 1500]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch real monthly rental vehicles from DB
  useEffect(() => {
    const fetchMonthlyRentals = async () => {
      try {
        setLoading(true);
        // REAL API CALL - fetches only cars with monthly rates
        const response = await fetch("/api/cars?rentalType=monthly");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Only include cars that have monthly rates
          const monthlyCars = data.cars.filter((car: any) => car.monthlyRate && car.monthlyRate > 0);
          setVehicles(monthlyCars);
          
          if (monthlyCars.length > 0) {
            const rates = monthlyCars.map((c: any) => c.monthlyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching monthly rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyRentals();
  }, []);

  // Get unique categories from real data
  const categories = ["all", ...Array.from(new Set(vehicles.map(v => v.category)))];

  // Filter vehicles based on real criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedCategory !== "all" && vehicle.category !== selectedCategory) return false;
    if (vehicle.monthlyRate < priceRange[0] || vehicle.monthlyRate > priceRange[1]) return false;
    if (vehicle.minCommitment > selectedCommitment) return false;
    return vehicle.available;
  });

  // Calculate monthly savings vs daily rate
  const calculateSavings = (vehicle: MonthlyRentalCar) => {
    if (!vehicle.dailyRate) return 0;
    const dailyMonthly = vehicle.dailyRate * 30;
    return Math.round(((dailyMonthly - vehicle.monthlyRate) / dailyMonthly) * 100);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Commitment options (in months)
  const commitmentOptions = [1, 3, 6, 12];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION - CLEAN, MODERN, INFORMATIVE */}
      <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Monthly Car Rental Rwanda
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Flexible monthly subscriptions. No long-term commitment. 
              All-inclusive rates with maintenance and insurance.
            </p>
            
            {/* KEY METRICS - REAL DATA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{vehicles.length}+</div>
                <div className="text-xs text-gray-300 mt-1">Vehicles Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">1-12 mo</div>
                <div className="text-xs text-gray-300 mt-1">Flexible Terms</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">15-30%</div>
                <div className="text-xs text-gray-300 mt-1">Monthly Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">All Inc.</div>
                <div className="text-xs text-gray-300 mt-1">Maintenance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUOTE BANNER - DIRECT CONTACT */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4B5320]/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Need a custom quote for 6+ months?</p>
                <p className="text-sm font-bold text-gray-900">Corporate & NGO rates available</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a 
                href="tel:+250796077321"
                className="px-5 py-2.5 bg-[#4B5320] text-white rounded-lg font-semibold hover:bg-[#3A4218] transition-colors text-sm"
              >
                Call Monthly Desk
              </a>
              <Link
                href="/corporate-inquiry"
                className="px-5 py-2.5 border border-[#4B5320] text-[#4B5320] rounded-lg font-semibold hover:bg-[#4B5320]/5 transition-colors text-sm"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FILTER BAR - CLEAN & FUNCTIONAL */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Show Filters
              </button>
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Commitment:</span>
                <div className="flex gap-1">
                  {commitmentOptions.map(months => (
                    <button
                      key={months}
                      onClick={() => setSelectedCommitment(months)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        selectedCommitment === months
                          ? 'bg-[#4B5320] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {months} {months === 1 ? 'mo' : 'mos'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                <span className="font-bold text-[#4B5320]">{filteredVehicles.length}</span> vehicles available
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* EXPANDABLE FILTERS */}
          {(showFilters || true) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Budget: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  </label>
                  <div className="relative pt-1">
                    <div className="flex justify-between">
                      <input
                        type="range"
                        min={400}
                        max={2000}
                        step={50}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full accent-[#4B5320]"
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">{formatCurrency(400)}</span>
                      <span className="text-xs text-gray-500">{formatCurrency(2000)}+</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedCommitment(1);
                      if (vehicles.length > 0) {
                        const rates = vehicles.map(v => v.monthlyRate);
                        setPriceRange([Math.min(...rates), Math.max(...rates)]);
                      }
                    }}
                    className="text-sm text-[#4B5320] hover:text-[#3A4218] font-medium"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B5320]"></div>
            <p className="mt-4 text-gray-600">Loading available monthly rentals...</p>
          </div>
        )}

        {/* NO RESULTS STATE */}
        {!loading && filteredVehicles.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles match your criteria</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or contact our monthly rental desk.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCommitment(1);
                  if (vehicles.length > 0) {
                    const rates = vehicles.map(v => v.monthlyRate);
                    setPriceRange([Math.min(...rates), Math.max(...rates)]);
                  }
                }}
                className="px-6 py-2 bg-[#4B5320] text-white rounded-lg font-medium hover:bg-[#3A4218] transition-colors"
              >
                Reset Filters
              </button>
              <a
                href="tel:+250796077321"
                className="px-6 py-2 border border-[#4B5320] text-[#4B5320] rounded-lg font-medium hover:bg-[#4B5320]/5 transition-colors"
              >
                Call +250 796 077 321
              </a>
            </div>
          </div>
        )}

        {/* VEHICLE GRID - CLEAN, MODERN, DATA-DRIVEN */}
        {!loading && filteredVehicles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => {
              const savingsPercent = calculateSavings(vehicle);
              
              return (
                <div
                  key={vehicle.id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#4B5320] hover:shadow-lg transition-all duration-300"
                >
                  {/* IMAGE SECTION */}
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={vehicle.imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback if image fails
                        (e.target as HTMLImageElement).src = '/images/car-placeholder.jpg';
                      }}
                    />
                    
                    {/* AVAILABILITY BADGE */}
                    {vehicle.available ? (
                      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Available Now
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-gray-500 text-white text-xs px-2.5 py-1.5 rounded-full font-medium">
                        Coming Soon
                      </div>
                    )}
                    
                    {/* YEAR BADGE */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-2.5 py-1.5 rounded-full font-medium shadow-md">
                      {vehicle.year}
                    </div>
                    
                    {/* SAVINGS BUBBLE */}
                    {savingsPercent > 0 && (
                      <div className="absolute bottom-4 right-4 bg-[#4B5320] text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                        Save {savingsPercent}%
                      </div>
                    )}
                  </div>
                  
                  {/* CONTENT SECTION */}
                  <div className="p-6">
                    {/* TITLE & CATEGORY */}
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4B5320] transition-colors">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1.5 rounded-full font-medium">
                          {vehicle.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {vehicle.transmission} • {vehicle.seats} seats • {vehicle.fuelType}
                      </p>
                    </div>
                    
                    {/* MONTHLY RATE */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl md:text-3xl font-bold text-[#4B5320]">
                            {formatCurrency(vehicle.monthlyRate)}
                          </span>
                          <span className="text-sm text-gray-600 ml-1">/mo</span>
                        </div>
                        {vehicle.dailyRate > 0 && (
                          <div className="text-right">
                            <span className="text-xs text-gray-500">Daily rate</span>
                            <div className="text-sm text-gray-400 line-through">
                              {formatCurrency(vehicle.dailyRate)}/day
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* KEY FEATURES GRID */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">Min. {vehicle.minCommitment} mo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">{vehicle.mileageLimit}</span>
                      </div>
                      {vehicle.insuranceIncluded && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">Insurance</span>
                        </div>
                      )}
                      {vehicle.maintenanceIncluded && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">Maintenance</span>
                        </div>
                      )}
                    </div>
                    
                    {/* SECURITY DEPOSIT */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Security deposit</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(vehicle.securityDeposit)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Fully refundable</p>
                    </div>
                    
                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`/booking/monthly?vehicle=${vehicle.id}`}
                        className="flex items-center justify-center px-4 py-3 bg-[#4B5320] text-white text-sm font-semibold rounded-lg hover:bg-[#3A4218] transition-colors"
                      >
                        Select Plan
                      </Link>
                      <Link
                        href={`/vehicles/${vehicle.id}?rental=monthly`}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* WHY MONTHLY SECTION - CLEAN VALUE PROPOSITION */}
        {!loading && vehicles.length > 0 && (
          <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why rent monthly?
              </h2>
              <p className="text-gray-600">
                No annual contracts. No hidden fees. Cancel anytime.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1-month minimum</h3>
                <p className="text-sm text-gray-600">No long-term commitment. Stay flexible.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">All-inclusive</h3>
                <p className="text-sm text-gray-600">Maintenance, insurance, 24/7 support.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dedicated support</h3>
                <p className="text-sm text-gray-600">Monthly rental desk. Priority service.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
