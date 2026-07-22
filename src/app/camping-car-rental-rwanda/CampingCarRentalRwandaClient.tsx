"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CampingCar {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  transmission: string;
  seats: number;
  sleepingCapacity: number;
  fuelType: string;
  engine: string;
  driveType: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  kitchen: boolean;
  kitchenEquipment: string[];
  fridge: boolean;
  freezer: boolean;
  toilet: boolean;
  shower: boolean;
  waterTank: number;
  wasteTank: number;
  awning: boolean;
  outdoorShower: boolean;
  roofVent: boolean;
  heating: boolean;
  solarPanels: boolean;
  batterySystem: string;
  inverter: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  nationalParks: string[];
  bestFor: string[];
  crossBorderAllowed: boolean;
  length: string;
  height: string;
  weight: string;
}

export default function CampingCarRentalRwandaClient({ initialCars }: { initialCars: any[] }) {
  const [vehicles, setVehicles] = useState<CampingCar[]>(initialCars);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedSleeping, setSelectedSleeping] = useState<string>("all");
  const [selectedPark, setSelectedPark] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([180, 450]);
  const [toiletShower, setToiletShower] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [solarIncluded, setSolarIncluded] = useState(false);

  // Derive camping cars from server-rendered initial data
  useEffect(() => {
    const campingCars = initialCars.filter((car: any) =>
      car.type?.toLowerCase().includes('camper') ||
      car.type?.toLowerCase().includes('motorhome') ||
      car.type?.toLowerCase().includes('rv') ||
      car.kitchen === true ||
      car.toilet === true ||
      car.sleepingCapacity > 0
    );
    setVehicles(campingCars);

    if (campingCars.length > 0) {
      const rates = campingCars.map((c: any) => c.dailyRate);
      setPriceRange([Math.min(...rates), Math.max(...rates)]);
    }
  }, [initialCars]);

  // Camping car types
  const campingTypes = [
    { id: "all", name: "All Camping Cars", icon: "🚐" },
    { id: "motorhome", name: "Motorhomes", icon: "🚐" },
    { id: "campervan", name: "Campervans", icon: "🚐" },
    { id: "4x4_camper", name: "4x4 Campers", icon: "🚙" },
    { id: "luxury", name: "Luxury RVs", icon: "🚐✨" },
  ];

  // Sleeping capacity options
  const sleepingOptions = [
    { id: "all", name: "Any Capacity", icon: "🛏️" },
    { id: "2", name: "2 Persons", icon: "👥" },
    { id: "3", name: "3 Persons", icon: "👥" },
    { id: "4", name: "4 Persons", icon: "👥👥" },
    { id: "5", name: "5 Persons", icon: "👥👥👥" },
    { id: "6", name: "6+ Persons", icon: "👥👥👥" },
  ];

  // Rwanda's national parks for camping
  const campingParks = [
    { id: "akagera", name: "Akagera National Park", camping: "Designated campsites", icon: "🦁" },
    { id: "kivu", name: "Lake Kivu", camping: "Lakeside campsites", icon: "🏞️" },
    { id: "volcanoes", name: "Volcanoes National Park", camping: "Lodge camping", icon: "🦍" },
    { id: "nyungwe", name: "Nyungwe Forest", camping: "Forest campsites", icon: "🐒" },
  ];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedType !== "all") {
      if (selectedType === "motorhome" && !vehicle.type?.toLowerCase().includes('motorhome')) return false;
      if (selectedType === "campervan" && !vehicle.type?.toLowerCase().includes('camper')) return false;
      if (selectedType === "4x4_camper" && vehicle.driveType !== '4x4') return false;
      if (selectedType === "luxury" && vehicle.dailyRate < 300) return false;
    }
    if (selectedSleeping !== "all") {
      const capacity = vehicle.sleepingCapacity || 2;
      if (selectedSleeping === "2" && capacity < 2) return false;
      if (selectedSleeping === "3" && capacity < 3) return false;
      if (selectedSleeping === "4" && capacity < 4) return false;
      if (selectedSleeping === "5" && capacity < 5) return false;
      if (selectedSleeping === "6" && capacity < 6) return false;
    }
    if (selectedPark !== "all" && !vehicle.nationalParks?.includes(selectedPark)) return false;
    if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
    if (toiletShower && (!vehicle.toilet || !vehicle.shower)) return false;
    if (kitchen && !vehicle.kitchen) return false;
    if (solarIncluded && !vehicle.solarPanels) return false;
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
    "name": "Camping Car Rental Rwanda - Self-Contained Campervans & Motorhomes for Safari",
    "description": "Camping car rental in Rwanda for the ultimate safari adventure. Self-contained campervans and motorhomes with kitchen, toilet, shower, fridge. Perfect for Akagera, Lake Kivu, and cross-border expeditions. Sleep under the stars with all comforts.",
    "url": "https://kigalicarrental.site/camping-car-rental-rwanda",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "priceRange": "$$$",
    "areaServed": ["Akagera National Park", "Lake Kivu", "Volcanoes National Park", "Nyungwe Forest", "Rwanda", "Uganda", "Tanzania"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Camping Cars",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Vehicle", "name": "Motorhome 4-6 Persons"}},
        {"@type": "Offer", "itemOffered": {"@type": "Vehicle", "name": "Campervan 2-3 Persons"}},
        {"@type": "Offer", "itemOffered": {"@type": "Vehicle", "name": "4x4 Camper"}}
      ]
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Camping", "item": "https://kigalicarrental.site/camping"},
      {"@type": "ListItem", "position": 3, "name": "Camping Car Rental Rwanda", "item": "https://kigalicarrental.site/camping-car-rental-rwanda"}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - CAMPING CAR */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Campervan */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1920" 
              alt="Camping car rental Rwanda - Self-contained campervan for safari"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">Camping</span>
                <span>›</span>
                <span className="text-white">Camping Car Rental Rwanda</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Camping Car</span> Rental Rwanda
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-[#93C5FD] font-semibold">Self-contained campervans and motorhomes</span> for 
                the ultimate safari adventure. Complete kitchen, toilet, shower, fridge. Sleep 2-6 persons.
              </p>
              
              {/* KEY CAMPING METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Camping Cars</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">2-6</div>
                  <div className="text-xs text-gray-300 mt-1">Sleeping Capacity</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">Full</div>
                  <div className="text-xs text-gray-300 mt-1">Kitchen & Bathroom</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Customer Support</div>
                </div>
              </div>
              
              {/* CAMPING CAR BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#93C5FD] text-[#1D4ED8] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  YOUR HOME ON WHEELS • SELF-CONTAINED • FREE SPIRIT
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Camping Cars
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Camper Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* CAMPING CAR TYPES STRIP */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {campingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedType === type.id
                      ? "bg-[#93C5FD] text-[#1D4ED8] shadow-lg"
                      : "bg-[#1D4ED8]/40 text-white hover:bg-[#1D4ED8]/60 border border-[#93C5FD]/30"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CAMPING CAR PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Camping Car <span className="text-[#1D4ED8]">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your home on wheels for the ultimate Rwanda adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Campervan Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Campervan</h3>
              <p className="text-gray-600 mb-4">Perfect for couples & small groups</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$195</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sleeps 2-3 persons
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kitchen with sink & cooker
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Portable fridge
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Awning • Outdoor shower
                </li>
              </ul>
              <Link
                href="/booking/campingcar?package=campervan"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Rent Campervan
              </Link>
            </div>
            
            {/* Motorhome Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Motorhome</h3>
              <p className="text-gray-600 mb-4">Complete self-contained for families</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$295</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sleeps 4-6 persons
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full kitchen • Gas cooker
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Toilet & shower
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fridge/freezer • Water tanks
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Solar panels • Battery system
                </li>
              </ul>
              <Link
                href="/booking/campingcar?package=motorhome"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Rent Motorhome
              </Link>
            </div>
            
            {/* 4x4 Camper Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4x4 Camper</h3>
              <p className="text-gray-600 mb-4">Off-road capable for remote camping</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$345</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 drive • Off-road capable
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sleeps 2-4 persons
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Compact kitchen
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Roof tent option
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cross-border ready
                </li>
              </ul>
              <Link
                href="/booking/campingcar?package=4x4"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Rent 4x4 Camper
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Camping Car Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {campingTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.icon} {type.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Sleeping Capacity Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Sleeping Capacity
                </label>
                <select
                  value={selectedSleeping}
                  onChange={(e) => setSelectedSleeping(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {sleepingOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.icon} {option.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Camping Destination */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Destination
                </label>
                <select
                  value={selectedPark}
                  onChange={(e) => setSelectedPark(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  <option value="all">All Destinations</option>
                  {campingParks.map(park => (
                    <option key={park.id} value={park.id}>{park.icon} {park.name}</option>
                  ))}
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
                    min={150}
                    max={500}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={150}
                    max={500}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
              
              {/* Camper Features */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Must Have
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toiletShower}
                      onChange={(e) => setToiletShower(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Toilet & Shower</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={kitchen}
                      onChange={(e) => setKitchen(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Full Kitchen</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={solarIncluded}
                      onChange={(e) => setSolarIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Solar Panels</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> camping cars available
                </span>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedSleeping('all');
                    setSelectedPark('all');
                    setToiletShower(false);
                    setKitchen(false);
                    setSolarIncluded(false);
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
              <p className="mt-6 text-gray-600 text-lg">Loading camping cars...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No camping cars match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our camping car specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedSleeping('all');
                    setSelectedPark('all');
                    setToiletShower(false);
                    setKitchen(false);
                    setSolarIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Camping Cars
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Camper Specialists
                </a>
              </div>
            </div>
          )}

          {/* CAMPING CAR GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Camping Car <span className="text-[#1D4ED8]">Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} self-contained camping vehicles</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Ready to Roll
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={vehicle.imageUrl}
                        alt={`${vehicle.brand} ${vehicle.model} - Camping car rental Rwanda`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/camper-placeholder.jpg';
                        }}
                      />
                      
                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* CAMPING CAR BADGE */}
                      <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        CAMPING CAR
                      </div>
                      
                      {/* SLEEPING CAPACITY */}
                      <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🛏️ Sleeps {vehicle.sleepingCapacity}
                      </div>
                      
                      {/* VEHICLE INFO */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                        <div className="text-sm text-gray-300">{vehicle.type} • {vehicle.seats} seats</div>
                      </div>
                    </div>
                    
                    {/* DETAILS SECTION */}
                    <div className="p-6">
                      {/* VEHICLE SPECS */}
                      <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500">Length</div>
                            <div className="font-bold text-gray-800">{vehicle.length || '5-6m'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Height</div>
                            <div className="font-bold text-gray-800">{vehicle.height || '2.5-3m'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Drive</div>
                            <div className="font-bold text-gray-800">{vehicle.driveType || '2WD'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Transmission</div>
                            <div className="font-bold text-gray-800">{vehicle.transmission}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* CAMPING FEATURES GRID */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {vehicle.kitchen && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Kitchen">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.fridge && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Fridge">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.toilet && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Toilet">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.shower && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Shower">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* TANKS & SYSTEMS */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {vehicle.waterTank > 0 && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              💧 {vehicle.waterTank}L Fresh
                            </span>
                          )}
                          {vehicle.wasteTank > 0 && (
                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                              🚽 {vehicle.wasteTank}L Waste
                            </span>
                          )}
                          {vehicle.solarPanels && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              ☀️ Solar
                            </span>
                          )}
                          {vehicle.awning && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              ⛱️ Awning
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* EQUIPMENT LIST */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Kitchen Equipment:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.kitchenEquipment?.map((item, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* NATIONAL PARKS */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Recommended for:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.nationalParks?.map((park, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              {park}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* PRICING */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-xs text-gray-500">Daily Rate</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold text-[#1D4ED8]">{formatCurrency(vehicle.dailyRate)}</span>
                              <span className="text-sm text-gray-500">/day</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">Weekly</span>
                            <div className="text-sm font-bold text-gray-800">{formatCurrency(vehicle.weeklyRate || vehicle.dailyRate * 6)}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* ACTION BUTTONS */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={`/booking/campingcar?vehicle=${vehicle.id}`}
                          className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                        >
                          Rent Camping Car
                        </Link>
                        <Link
                          href={`/vehicles/${vehicle.id}`}
                          className="px-4 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
                        >
                          View Details
                        </Link>
                      </div>
                      
                      {/* CROSS BORDER NOTE */}
                      {vehicle.crossBorderAllowed && (
                        <div className="mt-3 text-[10px] text-[#1D4ED8] text-center font-semibold">
                          ✓ Cross-border camping allowed • Uganda, Tanzania, DRC
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* WHY CHOOSE CAMPING CAR */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose a <span className="text-[#93C5FD]">Camping Car</span> in Rwanda
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                The ultimate freedom: your accommodation travels with you
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2M3 6l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sleep Anywhere</h3>
                <p className="text-gray-300 text-sm">Campsites, lakesides, national parks - your choice</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Save Time</h3>
                <p className="text-gray-300 text-sm">No hotel check-in/out • Pack/unpack once</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Save Money</h3>
                <p className="text-gray-300 text-sm">Cook your own meals • No accommodation costs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Total Freedom</h3>
                <p className="text-gray-300 text-sm">Change plans anytime • Stay longer where you love</p>
              </div>
            </div>
          </div>
        </div>

        {/* CAMPING CAR VS OTHER CAMPING OPTIONS - UNIQUE CONTENT */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Is a Camping Car the Right Choice for Your Rwanda Trip?
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                A camping car (motorhome or campervan) is a fully self-contained vehicle: it has its own built-in sleeping area and, on most of our units, a small kitchen and fridge. That's the key difference from a rooftop tent 4x4 — with a camping car, you don't fold anything down or set anything up each evening. You park, and the living space is already there. The trade-off is size and weight: motorhomes are longer and heavier than a standard 4x4, so they demand more driving confidence on Rwanda's hilly, winding roads, particularly on the approach roads into Volcanoes and Nyungwe where switchbacks are tight and shoulders are narrow.
              </p>
              <p>
                Where a camping car earns its keep is on multi-park road trips where you don't want to be locked into booking a lodge every single night. Akagera National Park has a public campsite, which makes it a natural anchor point for a self-contained vehicle — you can stay a night or two there, cook your own meals, and keep driving the next morning. A common itinerary for renters is Kigali → Akagera → Volcanoes → Nyungwe, and having your own kitchen and bed removes a lot of the lodge-availability and budget pressure that comes with trying to book accommodation in three regions at once, especially in high season.
              </p>
              <p>
                If your priority is off-road capability for tracking wildlife rather than a self-sufficient base to sleep in, our <Link href="/safari-car-rental-rwanda" className="text-[#1D4ED8] font-semibold hover:underline">safari vehicles</Link> are built specifically for game viewing rather than overnight comfort. If you want something closer to a standard 4x4 that's easier to drive on tight mountain roads while still sleeping outdoors, our <Link href="/rooftop-tent-car-rental-rwanda" className="text-[#1D4ED8] font-semibold hover:underline">rooftop tent vehicles</Link> are the middle ground — the same off-road ability as a standard safari 4x4, with a tent that folds out on the roof rack instead of a built-in cabin.
              </p>
            </div>
          </div>
        </div>

        {/* CAMPING CAR FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Camping Car Rental Rwanda - <span className="text-[#1D4ED8]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about camping car hire in Rwanda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What's included in a camping car?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our camping cars come fully equipped with kitchen (sink, cooker, utensils), fridge/freezer, toilet, shower, water tanks, bedding, and awning. Premium vehicles include solar panels, dual batteries, and inverters.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Where can I camp with a camping car?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Akagera National Park has designated campsites with facilities. Lake Kivu has beautiful lakeside camping. There are also private campsites near Volcanoes and Nyungwe. We provide a list of recommended campsites.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I need a special license to drive a camping car?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A regular car license is sufficient for most camping cars (up to 3.5 tons). For larger motorhomes, we'll advise you. We provide a full orientation before departure.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How do water and waste tanks work?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fresh water tank (40-100L) supplies kitchen and shower. Waste tank collects grey/black water. We'll show you how to fill and empty at campsites or service points. Very simple!
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I take a camping car cross-border?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Many of our camping cars are approved for cross-border travel to Uganda, Tanzania, and DRC. Advance notice required for permits and insurance. Perfect for East African overland trips.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is there 24/7 support for camping car rentals?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! Our camping car hotline is available 24/7. We can assist with any issues, questions, or emergencies. We also have partnerships with campsites across Rwanda and East Africa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CAMPSITES SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-[#1D4ED8]">Campsites</span> in Rwanda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perfect spots to park your camping car and enjoy nature
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🦁</div>
              <div className="font-bold text-gray-800">Akagera Game Lodge Campsite</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP • Showers, toilets, restaurant</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🏞️</div>
              <div className="font-bold text-gray-800">Paradis Malahide</div>
              <div className="text-xs text-gray-500 mt-1">Lake Kivu • Beach camping, bar, restaurant</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🦍</div>
              <div className="font-bold text-gray-800">Kinigi Guesthouse Campsite</div>
              <div className="text-xs text-gray-500 mt-1">Volcanoes NP • Hot showers, meals</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">Gisakura Campsite</div>
              <div className="text-xs text-gray-500 mt-1">Nyungwe Forest • Basic facilities</div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Camping Car Adventure?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Your home on wheels awaits. Explore Rwanda with total freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Camping Cars
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Camper Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Motorhomes • Campervans • 4x4 Campers • Kitchen • Toilet • Shower • Solar • Cross-border
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
