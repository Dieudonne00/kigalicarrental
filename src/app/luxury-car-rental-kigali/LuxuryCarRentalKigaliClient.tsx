"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LuxuryCar {
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
  securityDeposit: number;
  features: string[];
  interior: string;
  engine: string;
  topSpeed?: string;
  acceleration?: string;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  chauffeurIncluded: boolean;
  vipPackage: boolean;
}

export default function LuxuryCarRentalKigaliClient() {
  const [vehicles, setVehicles] = useState<LuxuryCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [vipOnly, setVipOnly] = useState(false);
  const [chauffeurIncluded, setChauffeurIncluded] = useState(false);

  // Fetch luxury vehicles from DB
  useEffect(() => {
    const fetchLuxuryVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint specifically for luxury vehicles
        const response = await fetch("/api/cars?category=luxury&premium=true");
        const data = await response.json();

        if (data.cars && Array.isArray(data.cars)) {
          // Filter for luxury/premium vehicles only
          const luxuryCars = data.cars.filter((car: any) =>
            car.category?.toLowerCase().includes('luxury') ||
            car.category?.toLowerCase().includes('premium') ||
            car.category?.toLowerCase().includes('executive') ||
            car.brand?.toLowerCase() === 'mercedes' ||
            car.brand?.toLowerCase() === 'bmw' ||
            car.brand?.toLowerCase() === 'audi' ||
            car.brand?.toLowerCase() === 'range rover' ||
            car.brand?.toLowerCase() === 'land rover' ||
            car.brand?.toLowerCase() === 'porsche' ||
            car.brand?.toLowerCase() === 'lexus' ||
            car.brand?.toLowerCase() === 'jaguar'
          );
          setVehicles(luxuryCars);

          if (luxuryCars.length > 0) {
            const rates = luxuryCars.map((c: any) => c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching luxury vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLuxuryVehicles();
  }, []);

  // Get unique luxury brands from real data
  const luxuryBrands = ["all", ...Array.from(new Set(vehicles.map(v => v.brand)))];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand) return false;
    if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
    if (vipOnly && !vehicle.vipPackage) return false;
    if (chauffeurIncluded && !vehicle.chauffeurIncluded) return false;
    return vehicle.available;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Structured data for the visible FAQ section below (SEO)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What luxury brands do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We maintain a prestigious fleet including Mercedes-Benz S-Class and G-Wagon, BMW 7 Series and X7, Range Rover Vogue and Sport, Porsche Cayenne, Lexus LX, and Audi Q8. All vehicles are latest models with premium interiors and advanced features."
        }
      },
      {
        "@type": "Question",
        "name": "Is chauffeur service included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chauffeur service is optional but highly recommended for the complete luxury experience. Our professional drivers are trained, uniformed, and knowledgeable about Kigali and all Rwanda destinations. VIP packages include dedicated chauffeur."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum rental period for luxury cars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Luxury vehicles can be rented for a minimum of 24 hours. For special events like weddings or corporate functions, we offer 6-hour VIP packages. Long-term luxury rentals (weekly/monthly) are available with significant discounts."
        }
      },
      {
        "@type": "Question",
        "name": "Do you deliver to Kigali Airport?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide complimentary delivery to Kigali International Airport (KGL) for all luxury rentals. Our VIP meet & greet service includes a driver waiting at arrivals with a name sign, assistance with luggage, and a seamless transfer to your premium vehicle."
        }
      },
      {
        "@type": "Question",
        "name": "What is the security deposit for luxury cars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Security deposits range from $1,000 to $3,000 depending on the vehicle value. Deposits are fully refundable upon return of the vehicle in the same condition. We accept credit cards, bank transfers, or cash deposits for VIP clients."
        }
      },
      {
        "@type": "Question",
        "name": "Are there mileage limits on luxury rentals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard luxury rentals include 100km per day. Unlimited mileage is available on request for VIP packages and long-term rentals. Additional kilometers are charged at a competitive rate. Cross-border travel to Uganda, DRC, and Tanzania is permitted with prior arrangement."
        }
      }
    ]
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - LUXURY FOCUSED */}
        <div className="relative bg-gradient-to-r from-gray-900 via-[#1a1a1a] to-gray-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="text-white">Luxury Rental</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Luxury</span> Car Rental Kigali
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Experience the pinnacle of automotive excellence with Rwanda's premier luxury fleet.
                <span className="text-blue-400 font-semibold"> Mercedes-Benz • BMW • Range Rover • Porsche • Lexus</span>
              </p>

              {/* KEY LUXURY METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Luxury Vehicles</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400">8</div>
                  <div className="text-xs text-gray-300 mt-1">Premium Brands</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Concierge</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400">VIP</div>
                  <div className="text-xs text-gray-300 mt-1">Chauffeur</div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-gray-900 font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  View Luxury Fleet
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
                >
                  VIP Concierge: +250 787 619 387
                </a>
              </div>
            </div>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
        </div>

        {/* LUXURY BRANDS STRIP */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4 text-center">Trusted luxury brands in our collection</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-default">MERCEDES-BENZ</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-default">BMW</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-default">RANGE ROVER</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-default">PORSCHE</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-default">LEXUS</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-default">AUDI</span>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Luxury Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {luxuryBrands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand === 'all' ? 'All Luxury Brands' : brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Daily Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={200}
                    max={1000}
                    step={50}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-blue-500"
                  />
                  <input
                    type="range"
                    min={200}
                    max={1000}
                    step={50}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-500 mt-2"
                  />
                </div>
              </div>

              {/* VIP Options */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  VIP Services
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vipOnly}
                      onChange={(e) => setVipOnly(e.target.checked)}
                      className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">VIP Package Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chauffeurIncluded}
                      onChange={(e) => setChauffeurIncluded(e.target.checked)}
                      className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">With Chauffeur</span>
                  </label>
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{filteredVehicles.length}</div>
                <div className="text-sm text-gray-600">Luxury Vehicles</div>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setVipOnly(false);
                    setChauffeurIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="text-xs text-[#1D4ED8] hover:text-[#1E40AF] mt-2 inline-block"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Curating our luxury collection...</p>
            </div>
          )}

          {/* NO RESULTS */}
          {!loading && filteredVehicles.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No luxury vehicles match</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our VIP concierge for personalized assistance.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setVipOnly(false);
                    setChauffeurIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-blue-500 text-gray-900 font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View All Luxury Cars
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call VIP Desk
                </a>
              </div>
            </div>
          )}

          {/* LUXURY VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  The <span className="text-blue-600">Luxury Collection</span>
                </h2>
                <p className="text-sm text-gray-500">{filteredVehicles.length} exclusive vehicles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={vehicle.imageUrl}
                        alt={`${vehicle.brand} ${vehicle.model} - Luxury car rental Kigali`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/luxury-placeholder.jpg';
                        }}
                      />

                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* BRAND BADGE */}
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/20">
                        {vehicle.brand}
                      </div>

                      {/* VIP BADGE */}
                      {vehicle.vipPackage && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                          VIP
                        </div>
                      )}

                      {/* YEAR & CATEGORY */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-2xl font-bold">{vehicle.year}</div>
                        <div className="text-sm text-gray-300">{vehicle.category}</div>
                      </div>
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="p-6">
                      {/* TITLE */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Luxury {vehicle.category} • {vehicle.seats} seats</p>
                      </div>

                      {/* SPEC HIGHLIGHTS */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500">Engine</div>
                          <div className="text-sm font-bold text-gray-800 truncate">{vehicle.engine || 'V6'}</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500">Transmission</div>
                          <div className="text-sm font-bold text-gray-800">{vehicle.transmission}</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500">Fuel</div>
                          <div className="text-sm font-bold text-gray-800">{vehicle.fuelType}</div>
                        </div>
                      </div>

                      {/* LUXURY FEATURES */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features?.slice(0, 4).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                          {vehicle.chauffeurIncluded && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Chauffeur
                            </span>
                          )}
                        </div>
                      </div>

                      {/* PRICING */}
                      <div className="border-t border-gray-200 pt-4 mb-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-3xl font-bold text-blue-600">{formatCurrency(vehicle.dailyRate)}</span>
                            <span className="text-sm text-gray-500 ml-1">/day</span>
                          </div>
                          {vehicle.weeklyRate && (
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Weekly</span>
                              <div className="text-sm font-bold text-gray-800">{formatCurrency(vehicle.weeklyRate)}</div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Security deposit: {formatCurrency(vehicle.securityDeposit)} (refundable)</span>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={`/booking?vehicle=${vehicle.id}&class=luxury`}
                          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-gray-900 text-sm font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-center"
                        >
                          Reserve Now
                        </Link>
                        <Link
                          href={`/vehicles/${vehicle.id}`}
                          className="px-4 py-3 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* VIP CHAUFFEUR SECTION */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/30">
                  👑 VIP CHAUFFEUR SERVICE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Arrive in <span className="text-blue-400">Style & Elegance</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Complete your luxury experience with our professional chauffeur service.
                  Trained, uniformed, and discreet drivers who know Kigali intimately.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">English/French</div>
                      <div className="text-xs text-gray-400">Speaking drivers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Flight Tracking</div>
                      <div className="text-xs text-gray-400">We monitor delays</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Meet & Greet</div>
                      <div className="text-xs text-gray-400">At arrivals hall</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Bottled Water</div>
                      <div className="text-xs text-gray-400">Premium refreshments</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/chauffeur-service-rwanda"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-gray-900 font-bold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Learn More About VIP Service
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1557174361-f9d9a1f6c5b1?auto=format&fit=crop&w=800"
                  alt="Luxury chauffeur service Kigali - VIP driver"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <div className="text-sm">Corporate VIP Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LUXURY FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Luxury Car Rental Kigali - FAQ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about premium car hire in Rwanda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What luxury brands do you offer?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We maintain a prestigious fleet including Mercedes-Benz S-Class and G-Wagon, BMW 7 Series and X7,
                Range Rover Vogue and Sport, Porsche Cayenne, Lexus LX, and Audi Q8. All vehicles are latest models
                with premium interiors and advanced features.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is chauffeur service included?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chauffeur service is optional but highly recommended for the complete luxury experience.
                Our professional drivers are trained, uniformed, and knowledgeable about Kigali and all
                Rwanda destinations. VIP packages include dedicated chauffeur.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is the minimum rental period for luxury cars?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Luxury vehicles can be rented for a minimum of 24 hours. For special events like weddings
                or corporate functions, we offer 6-hour VIP packages. Long-term luxury rentals (weekly/monthly)
                are available with significant discounts.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you deliver to Kigali Airport?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, we provide complimentary delivery to Kigali International Airport (KGL) for all luxury rentals.
                Our VIP meet & greet service includes a driver waiting at arrivals with a name sign,
                assistance with luggage, and a seamless transfer to your premium vehicle.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is the security deposit for luxury cars?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Security deposits range from $1,000 to $3,000 depending on the vehicle value.
                Deposits are fully refundable upon return of the vehicle in the same condition.
                We accept credit cards, bank transfers, or cash deposits for VIP clients.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are there mileage limits on luxury rentals?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Standard luxury rentals include 100km per day. Unlimited mileage is available on request
                for VIP packages and long-term rentals. Additional kilometers are charged at a competitive rate.
                Cross-border travel to Uganda, DRC, and Tanzania is permitted with prior arrangement.
              </p>
            </div>
          </div>
        </div>

        {/* LUXURY DESTINATIONS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Luxury Travel Destinations in Rwanda
              </h2>
              <p className="text-gray-600">Experience Rwanda's finest destinations in premium comfort</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="font-bold text-[#1D4ED8]">Kigali City</div>
                <div className="text-xs text-gray-500">Luxury hotels & dining</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="font-bold text-[#1D4ED8]">Volcanoes NP</div>
                <div className="text-xs text-gray-500">Gorilla trekking</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="font-bold text-[#1D4ED8]">Akagera NP</div>
                <div className="text-xs text-gray-500">Big Five safari</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="font-bold text-[#1D4ED8]">Lake Kivu</div>
                <div className="text-xs text-gray-500">Beach resorts</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="font-bold text-[#1D4ED8]">Nyungwe Forest</div>
                <div className="text-xs text-gray-500">Canopy walk</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience True Luxury in Kigali
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Our VIP concierge is available 24/7 to assist with your luxury vehicle selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-blue-500 text-gray-900 font-bold rounded-lg hover:bg-blue-400 transition-colors text-lg"
              >
                VIP Hotline: +250 787 619 387
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                Request VIP Consultation
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Mercedes-Benz • BMW • Range Rover • Porsche • Lexus • Audi
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
