"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SelfDriveCar {
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
  mileageLimit: string;
  features: string[];
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  airConditioning: boolean;
  gpsIncluded: boolean;
  bluetooth: boolean;
  usbPort: boolean;
  spareTire: boolean;
  toolKit: boolean;
}

export default function SelfDriveCarRentalKigaliClient() {
  const [vehicles, setVehicles] = useState<SelfDriveCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([30, 200]);
  const [gpsOnly, setGpsOnly] = useState(false);
  const [acOnly, setAcOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Fetch all self-drive vehicles from DB
  useEffect(() => {
    const fetchSelfDriveCars = async () => {
      try {
        setLoading(true);
        // API endpoint for all available cars
        const response = await fetch("/api/cars?selfdrive=true&all=true");
        const data = await response.json();

        if (data.cars && Array.isArray(data.cars)) {
          // All cars are available for self-drive
          setVehicles(data.cars);

          if (data.cars.length > 0) {
            const rates = data.cars.map((c: any) => c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching self-drive cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfDriveCars();
  }, []);

  // Get unique values from real data
  const categories = ["all", ...Array.from(new Set(vehicles.map(v => v.category)))];
  const transmissions = ["all", ...Array.from(new Set(vehicles.map(v => v.transmission)))];
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => {
      if (selectedCategory !== "all" && vehicle.category !== selectedCategory) return false;
      if (selectedTransmission !== "all" && vehicle.transmission !== selectedTransmission) return false;
      if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
      if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
      if (gpsOnly && !vehicle.gpsIncluded) return false;
      if (acOnly && !vehicle.airConditioning) return false;
      return vehicle.available;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.dailyRate - b.dailyRate;
      if (sortBy === "price-high") return b.dailyRate - a.dailyRate;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // recommended (default order)
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

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Self Drive Car Rental Kigali - Drive Yourself Rwanda",
    "description": "Self drive Kigali car rental. Rent a car without a driver and explore Rwanda at your own pace. Economy cars, SUVs, 4x4s, sedans. Unlimited mileage options. Free delivery in Kigali.",
    "url": "https://kigalicarrental.site/self-drive-car-rental-kigali",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "priceRange": "$$",
    "areaServed": "Kigali, Rwanda",
    "openingHours": "Mo-Su 07:00-22:00",
    "amenityFeature": [
      {"@type": "LocationFeatureSpecification", "name": "Free Delivery"},
      {"@type": "LocationFeatureSpecification", "name": "Airport Pickup"},
      {"@type": "LocationFeatureSpecification", "name": "GPS Navigation"},
      {"@type": "LocationFeatureSpecification", "name": "Child Seats Available"}
    ]
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Self Drive Car Rental Kigali", "item": "https://kigalicarrental.site/self-drive-car-rental-kigali"}
    ]
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - SELF DRIVE FOCUSED */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>

          {/* Hero Image Overlay */}
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1920"
              alt="Self drive car rental Kigali - Rwanda road trip"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="text-white">Self Drive</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Self Drive</span> Car Rental Kigali
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Rent a car <span className="text-[#93C5FD] font-semibold">without driver</span> and explore Rwanda at your own pace.
                Economy cars, SUVs, 4x4s – all with <span className="text-[#93C5FD] font-semibold">unlimited mileage options</span>.
              </p>

              {/* KEY SELF-DRIVE METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Self Drive Cars</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{formatCurrency(35)}</div>
                  <div className="text-xs text-gray-300 mt-1">Starting Rate/Day</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">Free</div>
                  <div className="text-xs text-gray-300 mt-1">Kigali Delivery</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Roadside Support</div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Browse All Self Drive Cars
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  24/7 Support: +250 787 619 387
                </a>
              </div>
            </div>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* SELF DRIVE BENEFITS STRIP */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-6 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">No Driver Required</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Unlimited Mileage</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Free GPS Included</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Airport Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Free Delivery Kigali</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Category Filter */}
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Vehicle Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Vehicles' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Transmission
                </label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {transmissions.map(trans => (
                    <option key={trans} value={trans}>
                      {trans === 'all' ? 'All' : trans}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seats Filter */}
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {seatOptions.map(seat => (
                    <option key={seat} value={seat}>
                      {seat === 'all' ? 'All' : `${seat} Seats`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year">Year: Newest First</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Daily Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gpsOnly}
                    onChange={(e) => setGpsOnly(e.target.checked)}
                    className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                  />
                  <span className="text-sm text-gray-700">GPS Included</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acOnly}
                    onChange={(e) => setAcOnly(e.target.checked)}
                    className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                  />
                  <span className="text-sm text-gray-700">Air Conditioning</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTransmission('all');
                    setSelectedSeats('all');
                    setGpsOnly(false);
                    setAcOnly(false);
                    setSortBy('recommended');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="text-sm text-[#1D4ED8] hover:text-[#1E40AF] font-semibold underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1D4ED8] border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading our self-drive fleet...</p>
            </div>
          )}

          {/* NO RESULTS */}
          {!loading && filteredVehicles.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-2 border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Try adjusting your filters or browse our complete fleet below.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTransmission('all');
                  setSelectedSeats('all');
                  setGpsOnly(false);
                  setAcOnly(false);
                  if (vehicles.length > 0) {
                    const rates = vehicles.map(v => v.dailyRate);
                    setPriceRange([Math.min(...rates), Math.max(...rates)]);
                  }
                }}
                className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
              >
                View All Vehicles
              </button>
            </div>
          )}

          {/* SELF-DRIVE VEHICLE GRID - FULL FLEET LISTING */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Complete <span className="text-[#1D4ED8]">Self-Drive Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Choose from {filteredVehicles.length} vehicles ready for self-drive</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Available
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="group bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={vehicle.imageUrl}
                        alt={`${vehicle.brand} ${vehicle.model} - Self drive car rental Kigali`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/car-placeholder.jpg';
                        }}
                      />

                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* CATEGORY BADGE */}
                      <div className="absolute top-3 right-3 bg-[#1D4ED8] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        {vehicle.category}
                      </div>

                      {/* YEAR BADGE */}
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                        {vehicle.year}
                      </div>

                      {/* TRANSMISSION BADGE */}
                      <div className="absolute bottom-3 right-3 bg-[#93C5FD] text-[#1D4ED8] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        {vehicle.transmission}
                      </div>
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="p-5">
                      {/* TITLE */}
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1D4ED8] transition-colors line-clamp-1">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-500">{vehicle.seats} seats • {vehicle.fuelType}</p>
                      </div>

                      {/* FEATURES ICONS */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.airConditioning && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1" title="Air Conditioning">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16" />
                            </svg>
                            AC
                          </span>
                        )}
                        {vehicle.gpsIncluded && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1" title="GPS Included">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            GPS
                          </span>
                        )}
                        {vehicle.bluetooth && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1" title="Bluetooth">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5-6l3 3-3 3" />
                            </svg>
                            BT
                          </span>
                        )}
                        {vehicle.usbPort && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1" title="USB Port">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            USB
                          </span>
                        )}
                      </div>

                      {/* KEY SPECS */}
                      <div className="grid grid-cols-3 gap-2 mb-4 py-2 border-y border-gray-100">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Fuel</div>
                          <div className="text-sm font-bold text-gray-800">{vehicle.fuelType}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Seats</div>
                          <div className="text-sm font-bold text-gray-800">{vehicle.seats}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Mileage</div>
                          <div className="text-sm font-bold text-gray-800">{vehicle.mileageLimit || 'Unlimited'}</div>
                        </div>
                      </div>

                      {/* PRICING */}
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-[#1D4ED8]">{formatCurrency(vehicle.dailyRate)}</span>
                          <span className="text-sm text-gray-500 ml-1">/day</span>
                        </div>
                        {vehicle.weeklyRate && (
                          <div className="text-right">
                            <span className="text-xs text-gray-500">Weekly</span>
                            <div className="text-sm font-bold text-gray-800">{formatCurrency(vehicle.weeklyRate)}</div>
                          </div>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/booking/self-drive?vehicle=${vehicle.id}`}
                          className="px-4 py-2.5 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                        >
                          Book Now
                        </Link>
                        <Link
                          href={`/vehicles/${vehicle.id}`}
                          className="px-4 py-2.5 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
                        >
                          Details
                        </Link>
                      </div>

                      {/* SECURITY DEPOSIT NOTE */}
                      <div className="mt-3 text-[10px] text-gray-400 text-center">
                        Security deposit: {formatCurrency(vehicle.securityDeposit)} (refundable)
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FLEET COUNT NOTE */}
              <div className="mt-8 text-center text-sm text-gray-500">
                Showing {filteredVehicles.length} of {vehicles.length} self-drive vehicles in Kigali
              </div>
            </>
          )}
        </div>

        {/* SELF DRIVE GUIDE SECTION */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-[#1D4ED8] text-white rounded-full text-sm font-bold mb-6">
                  🚗 SELF DRIVE GUIDE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Everything You Need to Know About <span className="text-[#1D4ED8]">Self Drive in Rwanda</span>
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  This fleet is for visitors and residents who'd rather have their own set of wheels and set their own schedule than book
                  a driver for every trip. If you'd prefer someone else to handle the driving instead, our{" "}
                  <Link href="/driver-car-hire-kigali" className="text-[#1D4ED8] font-semibold hover:underline">driver car hire</Link> and{" "}
                  <Link href="/private-driver-kigali" className="text-[#1D4ED8] font-semibold hover:underline">private driver</Link> pages
                  cover that instead — this page is for driving yourself.
                </p>
                <p className="text-gray-600 text-lg mb-6">
                  Driving in Rwanda is on the right-hand side of the road. Kigali's layout follows its hills: the main arteries connecting
                  the different sectors are wide and well paved, but turn off onto a residential street and you'll often meet steeper,
                  narrower roads with tighter bends — manageable in any of our cars, though a higher-clearance option is worth considering
                  if your accommodation sits up one of the steeper hills. Major junctions are usually roundabouts rather than traffic-light
                  intersections, so give way to traffic already circulating and take your exit rather than cutting across lanes. Here's
                  what else you need to know:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Driver's License:</span>
                      <span className="text-gray-600 ml-2">International Driving Permit recommended, but foreign licenses accepted</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Speed Limits:</span>
                      <span className="text-gray-600 ml-2">40km/h in cities, 80km/h on highways</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Fuel Stations:</span>
                      <span className="text-gray-600 ml-2">Abundant in cities, plan ahead for rural areas</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Police Checkpoints:</span>
                      <span className="text-gray-600 ml-2">Routine and low-friction — officers periodically wave cars over to check documents, so keep your license and rental agreement in the vehicle rather than in the boot</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">City Center Parking:</span>
                      <span className="text-gray-600 ml-2">Widely available — most hotels and shopping malls have their own parking areas</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Emergency:</span>
                      <span className="text-gray-600 ml-2">Police 112, Ambulance 912, our 24/7 support +250 787 619 387</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center px-6 py-3 bg-[#1D4ED8] text-white font-bold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  Download Complete Self Drive Guide
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800"
                  alt="Self drive road trip Rwanda - Scenic drive"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-[#1D4ED8]">500+</div>
                    <div className="text-sm text-gray-600">Happy self-drive customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POPULAR SELF-DRIVE ROUTES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-[#1D4ED8]">Self-Drive Routes</span> from Kigali
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore Rwanda's stunning landscapes with your rental car. Here are our top recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden shadow-xl h-64">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800"
                alt="Self drive to Volcanoes National Park - Musanze"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-[#93C5FD] text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>2.5 HOURS • 110 KM</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Kigali to Musanze</h3>
                <p className="text-white/80 text-sm">Volcanoes National Park • Gorilla trekking • Scenic hills</p>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-xl h-64">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800"
                alt="Self drive to Akagera National Park - Safari"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-[#93C5FD] text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>2.5 HOURS • 135 KM</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Kigali to Akagera</h3>
                <p className="text-white/80 text-sm">Big Five safari • Game drives • Bush camping</p>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-xl h-64">
              <img
                src="https://images.unsplash.com/photo-1507525425514-59bd992c8a4d?auto=format&fit=crop&w=800"
                alt="Self drive to Lake Kivu - Gisenyi"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-[#93C5FD] text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>3.5 HOURS • 155 KM</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Kigali to Lake Kivu</h3>
                <p className="text-white/80 text-sm">Gisenyi • Kibuye • Beach resorts • Coffee tours</p>
              </div>
            </div>
          </div>
        </div>

        {/* SELF DRIVE FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Self Drive Car Rental Kigali - <span className="text-[#1D4ED8]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Answers to common questions about self-drive rentals in Rwanda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is self-drive car rental?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Self-drive means you rent the car without a driver. You drive yourself, giving you complete freedom to explore at your own pace. Perfect for independent travelers, business visitors, and anyone who prefers to drive themselves.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are the requirements for self-drive in Rwanda?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You need a valid driver's license from your home country. An International Driving Permit is recommended but not mandatory. Minimum age is 23 years, and you must have had your license for at least 2 years.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is driving in Kigali difficult for a first-timer?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Not especially, but it helps to know what to expect: traffic keeps to the right, most major junctions are roundabouts rather
                  than traffic lights, and because the city is built across hills, some residential roads are steeper and narrower than the
                  main avenues. Roads are well-maintained and Rwandan drivers are generally courteous, so once you're used to the roundabouts
                  it's a straightforward city to navigate.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer unlimited mileage?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Most of our self-drive rentals include unlimited mileage. Some economy packages may have a daily limit, but you can upgrade to unlimited for a small fee. Perfect for road trips and exploring Rwanda.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I pick up the car at Kigali Airport?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! We offer free airport delivery at Kigali International Airport (KGL). Our representative will meet you at arrivals with your name sign and hand over the keys. You can start your self-drive adventure immediately.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What insurance is included?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All self-drive rentals include third-party liability insurance. Collision Damage Waiver (CDW) is optional but recommended. Theft protection is also available. Ask about our comprehensive packages for full peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore Rwanda on Your Own?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Book your self-drive car now and get free delivery in Kigali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Browse Self-Drive Fleet
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                24/7 Support: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Economy • Compact • SUV • 4x4 • Sedan • Automatic • Manual • Unlimited mileage • Free delivery
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
