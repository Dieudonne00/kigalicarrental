"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DriverCar {
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
  driverRate?: number;
  driverLanguage: string[];
  driverExperience: number;
  driverIncluded: boolean;
  imageUrl: string;
  available: boolean;
  location: string;
  airportPickup: boolean;
  crossBorder: boolean;
}

export default function DriverCarHireKigaliClient() {
  const [vehicles, setVehicles] = useState<DriverCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [airportOnly, setAirportOnly] = useState(false);
  const [crossBorderOnly, setCrossBorderOnly] = useState(false);

  // Fetch driver-included vehicles from DB
  useEffect(() => {
    const fetchDriverCars = async () => {
      try {
        setLoading(true);
        // API endpoint for vehicles with driver option
        const response = await fetch("/api/cars?driver=true&withDriver=true");
        const data = await response.json();

        if (data.cars && Array.isArray(data.cars)) {
          // Only include cars that have driver option
          const driverCars = data.cars.filter((car: any) =>
            car.driverIncluded === true || car.driverAvailable === true
          );
          setVehicles(driverCars);

          if (driverCars.length > 0) {
            const rates = driverCars.map((c: any) => c.dailyRate + (c.driverRate || 20));
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching driver cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverCars();
  }, []);

  // Get unique values from real data
  const categories = ["all", ...Array.from(new Set(vehicles.map(v => v.category)))];
  const languages = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.driverLanguage || ['English'])))];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedCategory !== "all" && vehicle.category !== selectedCategory) return false;
    if (selectedLanguage !== "all" && !vehicle.driverLanguage?.includes(selectedLanguage)) return false;
    const totalRate = vehicle.dailyRate + (vehicle.driverRate || 20);
    if (totalRate < priceRange[0] || totalRate > priceRange[1]) return false;
    if (airportOnly && !vehicle.airportPickup) return false;
    if (crossBorderOnly && !vehicle.crossBorder) return false;
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

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Driver Car Hire Kigali - Professional Chauffeur Service Rwanda",
    "description": "Car with driver hire in Kigali. English & French speaking professional drivers. Airport transfers, city tours, safari drives, cross-border trips. Safe, reliable, affordable.",
    "url": "https://kigalicarrental.site/driver-car-hire-kigali",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "priceRange": "$$",
    "areaServed": "Kigali, Rwanda",
    "serviceType": "Chauffeur Service, Car With Driver, Private Driver Hire"
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - ARMY GREEN DOMINANCE */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="text-white">Driver Hire</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Driver</span> Car Hire Kigali
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Professional <span className="text-[#93C5FD] font-semibold">English & French speaking drivers</span>.
                Car with driver for airport transfers, city tours, business travel, and safari adventures.
              </p>

              {/* KEY DRIVER METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Cars with Driver</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">50+</div>
                  <div className="text-xs text-gray-300 mt-1">Professional Drivers</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Driver Dispatch</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">100%</div>
                  <div className="text-xs text-gray-300 mt-1">Local Knowledge</div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl"
                >
                  Find Driver + Car
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all"
                >
                  Driver Dispatch: +250 787 619 387
                </a>
              </div>
            </div>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* DRIVER BENEFITS STRIP - ARMY GREEN */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">English Speaking</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">French Speaking</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Kinyarwanda Speaking</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Airport Meet & Greet</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Cross Border Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* DRIVER PACKAGES - ARMY GREEN THEME */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Driver <span className="text-[#1D4ED8]">Packages & Rates</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect driver service for your needs. All packages include professional driver, fuel, and insurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hourly Driver Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hourly Driver</h3>
              <p className="text-gray-600 mb-4">Perfect for meetings, shopping, city errands</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$15</span>
                <span className="text-gray-500">/hour</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Minimum 3 hours
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kigali city only
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fuel & driver included
                </li>
              </ul>
              <Link
                href="/booking/driver?package=hourly"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Hourly Driver
              </Link>
            </div>

            {/* Full Day Driver - POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Full Day Driver</h3>
              <p className="text-gray-600 mb-4">8 hours with vehicle & driver</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$65</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited mileage
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Rwanda destinations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fuel & driver included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Airport pickup included
                </li>
              </ul>
              <Link
                href="/booking/driver?package=fullday"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Book Full Day Driver
              </Link>
            </div>

            {/* Multi-Day Safari Driver */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Multi-Day Safari</h3>
              <p className="text-gray-600 mb-4">3+ days with dedicated driver</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$55</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Driver accommodation included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Safari & game drives
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cross-border available
                </li>
              </ul>
              <Link
                href="/booking/driver?package=safari"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Safari Driver
              </Link>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE A DRIVER - CONTEXT SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Book a Car <span className="text-[#1D4ED8]">With a Driver</span> in Kigali
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kigali's main roads are well paved, but the arteries in and out of the city center, around Nyabugogo, and along the airport road
              can get dense at rush hour in the early morning and early evening. Many junctions are managed by roundabouts rather than traffic
              lights, and merging into them takes some local judgment. Booking a car with a driver removes that problem: someone who drives
              these roads every day handles the route, the timing, and the parking, while you focus on why you're actually in Kigali.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The other everyday way to get around the city is by moto — the motorbike taxis found on almost every corner. They're fast and cheap
              for a single rider with no luggage, but fares are negotiated on the spot rather than metered, helmets and safety gear vary, and
              they simply don't work for airport runs, group travel, business meetings, or anyone carrying bags. A car with driver covers exactly
              the trips a moto can't: airport pickups, all-day schedules, multi-stop errands, and longer trips outside the city.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This page covers our standard driver-hire bookings — by the hour, the day, or for a multi-day trip — where a driver is dispatched
              for that specific booking. If you're in Kigali for an extended stay and would rather keep the same driver every day so they learn
              your schedule, your preferred routes, and how you like to work, our{" "}
              <Link href="/private-driver-kigali" className="text-[#1D4ED8] font-semibold hover:underline">
                private driver service
              </Link>{" "}
              is built for that dedicated, retainer-style arrangement instead.
            </p>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Category Filter */}
              <div>
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

              {/* Driver Language Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Driver Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang === 'all' ? 'All Languages' : lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Daily Rate (Car + Driver)
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={50}
                    max={250}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={50}
                    max={250}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="font-bold text-[#1D4ED8]">{formatCurrency(priceRange[0])}</span>
                    <span className="text-gray-400">—</span>
                    <span className="font-bold text-[#1D4ED8]">{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Service Options */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Service Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={airportOnly}
                      onChange={(e) => setAirportOnly(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Airport Pickup Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={crossBorderOnly}
                      onChange={(e) => setCrossBorderOnly(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Cross-Border Ready</span>
                  </label>
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-[#1D4ED8]/5 rounded-lg p-4 text-center border border-[#1D4ED8]/20">
                <div className="text-3xl font-bold text-[#1D4ED8]">{filteredVehicles.length}</div>
                <div className="text-sm text-gray-600">Cars with Driver</div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLanguage('all');
                    setAirportOnly(false);
                    setCrossBorderOnly(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate + (v.driverRate || 20));
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="text-xs text-[#1D4ED8] hover:text-[#1E40AF] mt-2 inline-block font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1D4ED8] border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Finding available drivers...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No drivers match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our driver dispatch for immediate assistance.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLanguage('all');
                    setAirportOnly(false);
                    setCrossBorderOnly(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate + (v.driverRate || 20));
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Drivers
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Driver Dispatch
                </a>
              </div>
            </div>
          )}

          {/* DRIVER CAR GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Available <span className="text-[#1D4ED8]">Cars with Driver</span>
                </h2>
                <p className="text-sm text-gray-500">{filteredVehicles.length} vehicles ready</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const totalRate = vehicle.dailyRate + (vehicle.driverRate || 20);

                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} with driver - Car hire Kigali`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/driver-car-placeholder.jpg';
                          }}
                        />

                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                        {/* DRIVER INCLUDED BADGE */}
                        <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          DRIVER INCLUDED
                        </div>

                        {/* AIRPORT BADGE */}
                        {vehicle.airportPickup && (
                          <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            AIRPORT
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
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1D4ED8] transition-colors">
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {vehicle.transmission} • {vehicle.seats} seats • {vehicle.fuelType}
                          </p>
                        </div>

                        {/* DRIVER INFO */}
                        <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-[#1D4ED8] rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Professional Driver</div>
                              <div className="text-xs text-gray-600">
                                {vehicle.driverLanguage?.join(' • ')} • {vehicle.driverExperience}+ years
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* FEATURES */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {vehicle.airportPickup && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Meet & Greet
                            </span>
                          )}
                          {vehicle.crossBorder && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Cross Border
                            </span>
                          )}
                        </div>

                        {/* PRICING */}
                        <div className="border-t border-gray-200 pt-4 mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Car + Driver</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#1D4ED8]">{formatCurrency(totalRate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Car only</span>
                              <div className="text-sm text-gray-400 line-through">{formatCurrency(vehicle.dailyRate)}</div>
                            </div>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/driver?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                          >
                            Book with Driver
                          </Link>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="px-4 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* DRIVER FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Driver Car Hire Kigali - <span className="text-[#1D4ED8]">FAQ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about hiring a car with driver in Rwanda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is driver car hire in Kigali?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Driver car hire means you get a professional driver along with the vehicle for a specific booking — an hour, a day, or a
                multi-day trip — rather than a retained driver you keep for weeks. It suits visitors who prefer not to navigate Kigali traffic
                or negotiate moto fares themselves, need a local guide, or require airport transfers. Our drivers are English, French, and
                Kinyarwanda speaking professionals.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How much does a driver cost per day?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Full day driver service (8 hours) starts at $65 including vehicle, fuel, and professional driver. Hourly rates from $15/hour. Multi-day safari packages from $55/day including driver accommodation. All rates include insurance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do drivers speak English?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! All our drivers are fluent in English. Many also speak French and Kinyarwanda. We can also arrange drivers who speak German, Italian, or Chinese upon request with advance booking.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can I hire a driver for airport pickup?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolutely. Our airport transfer service includes a professional driver waiting for you at Kigali International Airport (KGL) arrivals hall with a name sign. We monitor flight delays and include 60 minutes of waiting time free of charge.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do drivers handle cross-border trips?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, many of our drivers are experienced with cross-border travel to Uganda (Kampala, Entebbe), DRC (Goma), and Tanzania. Cross-border trips require advance notice and additional documentation. Contact us for details.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do I book a driver in Kigali?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                You can book online through our website, call our 24/7 driver dispatch at +250 787 619 387, or send a WhatsApp message. For same-day bookings, please call for immediate availability.
              </p>
            </div>
          </div>
        </div>

        {/* DRIVER DESTINATIONS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Popular Driver Services in Rwanda
              </h2>
              <p className="text-gray-600">Our drivers know every corner of Rwanda</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Kigali Airport</div>
                <div className="text-xs text-gray-500">Meet & greet transfers</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Volcanoes NP</div>
                <div className="text-xs text-gray-500">Gorilla trekking driver</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Akagera NP</div>
                <div className="text-xs text-gray-500">Safari game drives</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Lake Kivu</div>
                <div className="text-xs text-gray-500">Gisenyi, Kibuye</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Nyungwe Forest</div>
                <div className="text-xs text-gray-500">Canopy walk</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA - ARMY GREEN */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Driver in Kigali Right Now?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Our driver dispatch is available 24/7. Call us for immediate booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Driver Dispatch: +250 787 619 387
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Request Driver Online
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              English • French • Kinyarwanda speaking drivers • Airport transfers • City tours • Safari • Cross-border
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
