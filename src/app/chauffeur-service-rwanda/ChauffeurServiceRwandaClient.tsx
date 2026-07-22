"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ChauffeurVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  chauffeurRate: number;
  chauffeurLanguages: string[];
  chauffeurExperience: number;
  uniformedDriver: boolean;
  flightTracking: boolean;
  meetAndGreet: boolean;
  bottledWater: boolean;
  wifiIncluded: boolean;
  imageUrl: string;
  available: boolean;
  location: string;
  airportTransfers: boolean;
  corporateEvents: boolean;
  weddings: boolean;
  cityTours: boolean;
  safariDrives: boolean;
}

export default function ChauffeurServiceRwandaClient({ initialCars }: { initialCars: any[] }) {
  const [vehicles, setVehicles] = useState<ChauffeurVehicle[]>(initialCars);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([80, 400]);
  const [uniformedOnly, setUniformedOnly] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(false);

  // Derive chauffeur vehicles from server-rendered initial data
  useEffect(() => {
    const chauffeurCars = initialCars.filter((car: any) =>
      car.chauffeurAvailable === true ||
      car.chauffeurIncluded === true ||
      car.category?.toLowerCase().includes('luxury') ||
      car.category?.toLowerCase().includes('executive')
    );
    setVehicles(chauffeurCars);

    if (chauffeurCars.length > 0) {
      const rates = chauffeurCars.map((c: any) => c.dailyRate + (c.chauffeurRate || 50));
      setPriceRange([Math.min(...rates), Math.max(...rates)]);
    }
  }, [initialCars]);

  // Service types for filtering
  const serviceTypes = [
    { id: "all", name: "All Services", icon: "🚗" },
    { id: "airport", name: "Airport Transfer", icon: "✈️" },
    { id: "corporate", name: "Corporate Travel", icon: "💼" },
    { id: "wedding", name: "Wedding Chauffeur", icon: "💍" },
    { id: "city", name: "City Tour", icon: "🏙️" },
    { id: "safari", name: "Safari Driver", icon: "🦁" },
  ];

  // Get unique values from real data
  const languages = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.chauffeurLanguages || ['English', 'French', 'Kinyarwanda'])))];
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedService !== "all") {
      if (selectedService === "airport" && !vehicle.airportTransfers) return false;
      if (selectedService === "corporate" && !vehicle.corporateEvents) return false;
      if (selectedService === "wedding" && !vehicle.weddings) return false;
      if (selectedService === "city" && !vehicle.cityTours) return false;
      if (selectedService === "safari" && !vehicle.safariDrives) return false;
    }
    if (selectedLanguage !== "all" && !vehicle.chauffeurLanguages?.includes(selectedLanguage)) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    const totalRate = vehicle.dailyRate + (vehicle.chauffeurRate || 50);
    if (totalRate < priceRange[0] || totalRate > priceRange[1]) return false;
    if (uniformedOnly && !vehicle.uniformedDriver) return false;
    if (wifiOnly && !vehicle.wifiIncluded) return false;
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
    "@type": "Service",
    "name": "Chauffeur Service Rwanda - Professional Driver Hire Kigali",
    "description": "Premium chauffeur service in Rwanda. Professional English-speaking drivers for airport transfers, corporate travel, weddings, city tours, and safaris. Uniformed chauffeurs, flight tracking, meet & greet.",
    "url": "https://kigalicarrental.site/chauffeur-service-rwanda",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Kigali Car Rental",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kigali",
        "addressCountry": "RW"
      },
      "telephone": "+250787619387"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Rwanda"
    },
    "serviceType": "Chauffeur Service, Private Driver, Executive Transport",
        "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "80",
      "highPrice": "400",
      "offerCount": vehicles.length
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://kigalicarrental.site/services"},
      {"@type": "ListItem", "position": 3, "name": "Chauffeur Service Rwanda", "item": "https://kigalicarrental.site/chauffeur-service-rwanda"}
    ]
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - CHAUFFEUR SERVICE LUXURY */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>

          {/* Hero Image Overlay - Professional Chauffeur */}
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1558009250-d3db5c5f9803?auto=format&fit=crop&w=1920"
              alt="Professional chauffeur service Rwanda - Executive driver Kigali"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">Services</span>
                <span>›</span>
                <span className="text-white">Chauffeur Service Rwanda</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Chauffeur</span> Service Rwanda
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Professional <span className="text-[#93C5FD] font-semibold">English & French speaking chauffeurs</span>.
                Uniformed drivers, flight tracking, meet & greet. Executive travel across Rwanda.
                Booked as a single transfer, a full day, or a weekly retainer — a professional driver rather than a tour guide, for business travelers and diplomatic missions.
              </p>

              {/* KEY CHAUFFEUR METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Chauffeur Vehicles</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">50+</div>
                  <div className="text-xs text-gray-300 mt-1">Professional Drivers</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Chauffeur Dispatch</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">100%</div>
                  <div className="text-xs text-gray-300 mt-1">Licensed Drivers</div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Book a Chauffeur
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Chauffeur Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* SERVICE TYPE SELECTOR - STICKY */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedService === service.id
                      ? "bg-[#93C5FD] text-[#1D4ED8] shadow-lg"
                      : "bg-[#1D4ED8]/40 text-white hover:bg-[#1D4ED8]/60 border border-[#93C5FD]/30"
                  }`}
                >
                  <span className="mr-2">{service.icon}</span>
                  {service.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHAUFFEUR PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chauffeur <span className="text-[#1D4ED8]">Service Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect chauffeur service for your needs. All packages include professional driver, fuel, and insurance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10 text-gray-700 text-sm md:text-base leading-relaxed space-y-3">
            <p>
              This is a driver-first service rather than a guided tour: chauffeurs are trained on punctuality, formal etiquette, and discreet service rather than on commentary and sightseeing. That distinction matters for business travelers, conference delegates, and diplomatic missions who want a reliable driver on standby, not a narrated itinerary.
            </p>
            <p>
              Beyond single trips and single days, we run daily and weekly retainer arrangements where the same chauffeur and vehicle are held for your full stay — common for embassy staff, visiting executives, and multi-city itineraries that move between Kigali, Musanze, and the Lake Kivu towns of Gisenyi and Kibuye. Retainer clients get one point of contact for scheduling changes instead of booking each leg separately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Airport Transfer Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Airport Transfer</h3>
              <p className="text-gray-600 mb-4">Meet & greet at KGL with name sign. Flight tracking included.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$45</span>
                <span className="text-gray-500">/trip</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flight tracking included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  60 min waiting time
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Meet & greet included
                </li>
              </ul>
              <Link
                href="/booking/chauffeur?service=airport"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Airport Transfer
              </Link>
            </div>

            {/* Corporate Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Corporate Chauffeur</h3>
              <p className="text-gray-600 mb-4">Full-day executive driver for business meetings & events</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$95</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  8 hours service
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Uniformed chauffeur
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  WiFi & bottled water
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Corporate billing available
                </li>
              </ul>
              <Link
                href="/booking/chauffeur?service=corporate"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Book Corporate Chauffeur
              </Link>
            </div>

            {/* Wedding Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Wedding Chauffeur</h3>
              <p className="text-gray-600 mb-4">Make your special day elegant with a dedicated chauffeur</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$120</span>
                <span className="text-gray-500">/4 hours</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Formal uniform/black suit
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Champagne & decorations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flexible timing
                </li>
              </ul>
              <Link
                href="/booking/chauffeur?service=wedding"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Wedding Chauffeur
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Service Type (already selected above) */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Current Service
                </label>
                <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  {serviceTypes.find(s => s.id === selectedService)?.name || 'All Services'}
                </div>
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

              {/* Seats Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Passenger Capacity
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

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Daily Rate (Car + Chauffeur)
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={80}
                    max={500}
                    step={20}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={80}
                    max={500}
                    step={20}
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

              {/* Premium Options */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Premium Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={uniformedOnly}
                      onChange={(e) => setUniformedOnly(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Uniformed Chauffeur</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wifiOnly}
                      onChange={(e) => setWifiOnly(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">WiFi in Vehicle</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> chauffeur vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedService('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setUniformedOnly(false);
                    setWifiOnly(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate + (v.chauffeurRate || 50));
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
              <p className="mt-6 text-gray-600 text-lg">Finding available chauffeurs...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No chauffeurs match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our chauffeur dispatch for immediate assistance.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedService('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setUniformedOnly(false);
                    setWifiOnly(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate + (v.chauffeurRate || 50));
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Chauffeurs
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Chauffeur Dispatch
                </a>
              </div>
            </div>
          )}

          {/* CHAUFFEUR VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional <span className="text-[#1D4ED8]">Chauffeur Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles with professional drivers</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Ready Now
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const totalRate = vehicle.dailyRate + (vehicle.chauffeurRate || 50);

                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Chauffeur service Rwanda`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/luxury-placeholder.jpg';
                          }}
                        />

                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                        {/* CHAUFFEUR INCLUDED BADGE */}
                        <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          CHAUFFEUR
                        </div>

                        {/* UNIFORMED BADGE */}
                        {vehicle.uniformedDriver && (
                          <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            UNIFORMED
                          </div>
                        )}

                        {/* VEHICLE CATEGORY */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                          <div className="text-sm text-gray-300">{vehicle.category} • {vehicle.year}</div>
                        </div>
                      </div>

                      {/* DETAILS SECTION */}
                      <div className="p-6">
                        {/* DRIVER INFO */}
                        <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#1D4ED8] rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Professional Chauffeur</div>
                              <div className="text-xs text-gray-600">
                                {vehicle.chauffeurLanguages?.join(' • ')} • {vehicle.chauffeurExperience}+ years
                              </div>
                            </div>
                          </div>

                          {/* CHAUFFEUR FEATURES */}
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {vehicle.flightTracking && (
                              <div className="flex items-center gap-1 text-xs text-gray-700">
                                <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Flight Tracking
                              </div>
                            )}
                            {vehicle.meetAndGreet && (
                              <div className="flex items-center gap-1 text-xs text-gray-700">
                                <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Meet & Greet
                              </div>
                            )}
                            {vehicle.bottledWater && (
                              <div className="flex items-center gap-1 text-xs text-gray-700">
                                <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Bottled Water
                              </div>
                            )}
                            {vehicle.wifiIncluded && (
                              <div className="flex items-center gap-1 text-xs text-gray-700">
                                <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                WiFi Included
                              </div>
                            )}
                          </div>
                        </div>

                        {/* SERVICE TAGS */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {vehicle.airportTransfers && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              ✈️ Airport
                            </span>
                          )}
                          {vehicle.corporateEvents && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              💼 Corporate
                            </span>
                          )}
                          {vehicle.weddings && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              💍 Wedding
                            </span>
                          )}
                          {vehicle.cityTours && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              🏙️ City Tour
                            </span>
                          )}
                          {vehicle.safariDrives && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                              🦁 Safari
                            </span>
                          )}
                        </div>

                        {/* VEHICLE SPECS */}
                        <div className="grid grid-cols-3 gap-2 mb-4 py-2 border-y border-gray-100">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Seats</div>
                            <div className="text-sm font-bold text-gray-800">{vehicle.seats}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Transmission</div>
                            <div className="text-sm font-bold text-gray-800">{vehicle.transmission}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Fuel</div>
                            <div className="text-sm font-bold text-gray-800">{vehicle.fuelType}</div>
                          </div>
                        </div>

                        {/* PRICING */}
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Car + Chauffeur</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#1D4ED8]">{formatCurrency(totalRate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Hourly</span>
                              <div className="text-lg font-bold text-gray-800">{formatCurrency(vehicle.hourlyRate || 25)}/hr</div>
                            </div>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/chauffeur?vehicle=${vehicle.id}&service=${selectedService}`}
                            className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                          >
                            Book Chauffeur
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

        {/* WHY CHOOSE OUR CHAUFFEURS */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our <span className="text-[#93C5FD]">Chauffeur Service</span>
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Professional, reliable, and discreet - our chauffeurs set the standard for executive travel in Rwanda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Multilingual</h3>
                <p className="text-gray-300 text-sm">English, French & Kinyarwanda speaking drivers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Vetted & Trained</h3>
                <p className="text-gray-300 text-sm">Background checked, uniformed professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Flight Tracking</h3>
                <p className="text-gray-300 text-sm">We monitor delays, adjust pickup time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Local Experts</h3>
                <p className="text-gray-300 text-sm">Deep knowledge of Rwanda's roads & culture</p>
              </div>
            </div>
          </div>
        </div>

        {/* CHAUFFEUR FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chauffeur Service Rwanda - <span className="text-[#1D4ED8]">FAQ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about professional chauffeur services in Rwanda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is included in chauffeur service?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our chauffeur service includes a professional driver, luxury vehicle, fuel, insurance, bottled water, and meet & greet at airports. Optional amenities include WiFi, child seats, and refreshments.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How much does a chauffeur cost in Rwanda?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chauffeur service starts at $45 for airport transfers, $95 for full-day corporate service, and $120 for wedding packages (4 hours). Multi-day bookings receive discounted rates.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do your chauffeurs speak English?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! All our chauffeurs are fluent in English. Many also speak French and Kinyarwanda. We can arrange drivers who speak German, Italian, Chinese, or other languages with advance notice.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do I book a chauffeur in Kigali?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                You can book online through our website, call our 24/7 chauffeur dispatch at +250 787 619 387, or send a WhatsApp message. For same-day bookings, please call for immediate availability.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do chauffeurs wear uniforms?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, our professional chauffeurs wear uniforms - smart suits for corporate and wedding events, and branded attire for airport transfers and city tours. You can request uniformed drivers specifically.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can I book a chauffeur for multiple days?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolutely! We offer daily and weekly retainer arrangements for business trips, conferences, and diplomatic missions — the same chauffeur and vehicle held for your full stay rather than booking separate trips each day. Multi-day bookings include driver accommodation outside Kigali and discounted daily rates. Contact us for custom quotes.
              </p>
            </div>
          </div>
        </div>

        {/* CHAUFFEUR DESTINATIONS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Chauffeur Services Across Rwanda
              </h2>
              <p className="text-gray-600">Professional drivers available nationwide</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Kigali City</div>
                <div className="text-xs text-gray-500">Corporate & airport</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Musanze</div>
                <div className="text-xs text-gray-500">Volcanoes National Park</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Akagera</div>
                <div className="text-xs text-gray-500">Safari game drives</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Lake Kivu</div>
                <div className="text-xs text-gray-500">Gisenyi, Kibuye</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Professional Chauffeur?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Our chauffeur dispatch is available 24/7. Book now for immediate service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Book a Chauffeur
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Chauffeur Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Airport transfers • Corporate travel • Weddings • City tours • Safaris • English • French • Kinyarwanda
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
