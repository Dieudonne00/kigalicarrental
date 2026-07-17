"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface RooftopTentVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  engine: string;
  driveType: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  rooftopTent: boolean;
  tentBrand?: string;
  tentType: string;
  sleepingCapacity: number;
  mattressIncluded: boolean;
  beddingIncluded: boolean;
  awning: boolean;
  campingChairs: boolean;
  campingTable: boolean;
  portableFridge: boolean;
  cookingEquipment: boolean;
  waterTank: boolean;
  solarPanel: boolean;
  batterySystem: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  nationalParks: string[];
  bestFor: string[];
  crossBorderAllowed: boolean;
}

export default function RooftopTentCarRentalRwandaClient() {
  const [vehicles, setVehicles] = useState<RooftopTentVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSleeping, setSelectedSleeping] = useState<string>("all");
  const [selectedPark, setSelectedPark] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([150, 350]);
  const [awningIncluded, setAwningIncluded] = useState(false);
  const [fridgeIncluded, setFridgeIncluded] = useState(false);
  const [solarIncluded, setSolarIncluded] = useState(false);

  // Fetch rooftop tent vehicles from DB
  useEffect(() => {
    const fetchRooftopTentVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for rooftop tent equipped vehicles
        const response = await fetch("/api/cars?rooftoptent=true&camping=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for vehicles with rooftop tents
          const tentCars = data.cars.filter((car: any) => 
            car.rooftopTent === true ||
            car.roofTent === true ||
            car.tentType?.length > 0 ||
            car.campingGear === true
          );
          setVehicles(tentCars);
          
          if (tentCars.length > 0) {
            const rates = tentCars.map((c: any) => c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching rooftop tent vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooftopTentVehicles();
  }, []);

  // Vehicle brands for filtering
  const vehicleBrands = ["all", ...Array.from(new Set(vehicles.map(v => v.brand)))].filter(b => b !== 'all');

  // Sleeping capacity options
  const sleepingOptions = [
    { id: "all", name: "Any Capacity", icon: "🛏️" },
    { id: "2", name: "2 Persons", icon: "👥" },
    { id: "3", name: "3 Persons", icon: "👥" },
    { id: "4", name: "4 Persons", icon: "👥👥" },
    { id: "5", name: "5+ Persons", icon: "👥👥👥" },
  ];

  // Rwanda's national parks for camping
  const campingParks = [
    { id: "akagera", name: "Akagera National Park", camping: "Designated campsites, bush camping", icon: "🦁" },
    { id: "volcanoes", name: "Volcanoes National Park", camping: "Limited camping, lodge options", icon: "🦍" },
    { id: "nyungwe", name: "Nyungwe Forest", camping: "Forest campsites", icon: "🐒" },
    { id: "kivu", name: "Lake Kivu", camping: "Beach camping, lakeside sites", icon: "🏞️" },
  ];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand) return false;
    if (selectedSleeping !== "all") {
      const capacity = vehicle.sleepingCapacity || 2;
      if (selectedSleeping === "2" && capacity < 2) return false;
      if (selectedSleeping === "3" && capacity < 3) return false;
      if (selectedSleeping === "4" && capacity < 4) return false;
      if (selectedSleeping === "5" && capacity < 5) return false;
    }
    if (selectedPark !== "all" && !vehicle.nationalParks?.includes(selectedPark)) return false;
    if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
    if (awningIncluded && !vehicle.awning) return false;
    if (fridgeIncluded && !vehicle.portableFridge) return false;
    if (solarIncluded && !vehicle.solarPanel) return false;
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
    "name": "Rooftop Tent Car Rental Rwanda - Overland Camping Vehicles for Safari Adventures",
    "description": "Rooftop tent car rental in Rwanda for overland camping safaris. Toyota Land Cruiser, Hilux, Land Rover with roof tents. Complete camping equipment: awnings, fridges, solar panels. Perfect for Akagera, Lake Kivu, cross-border expeditions.",
    "url": "https://kigalicarrental.site/rooftop-tent-car-rental-rwanda",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "178"
    },
    "priceRange": "$$$",
    "areaServed": ["Akagera National Park", "Lake Kivu", "Volcanoes National Park", "Nyungwe Forest", "Rwanda", "Uganda", "Tanzania"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Rooftop Tent Vehicles",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser with Roof Tent"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Hilux with Roof Tent"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Land Rover with Roof Tent"}}
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
      {"@type": "ListItem", "position": 3, "name": "Rooftop Tent Car Rental Rwanda", "item": "https://kigalicarrental.site/rooftop-tent-car-rental-rwanda"}
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
        {/* HERO SECTION - ROOFTOP TENT */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Rooftop Tent Camping */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1920" 
              alt="Rooftop tent car rental Rwanda - Overland camping vehicle"
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
                <span className="text-white">Rooftop Tent Car Rental Rwanda</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Rooftop Tent</span> Car Rental Rwanda
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-[#93C5FD] font-semibold">Complete overland camping vehicles</span> for 
                safari adventures. Toyota Land Cruiser, Hilux, Land Rover with roof tents. Includes awnings, 
                fridges, solar panels, and full camping equipment.
              </p>
              
              {/* KEY CAMPING METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Rooftop Tent Vehicles</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">2-5</div>
                  <div className="text-xs text-gray-300 mt-1">Sleeping Capacity</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">4+</div>
                  <div className="text-xs text-gray-300 mt-1">Camping Parks</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">4.9★</div>
                  <div className="text-xs text-gray-300 mt-1">178+ Reviews</div>
                </div>
              </div>
              
              {/* CAMPING BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#93C5FD] text-[#1D4ED8] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  COMPLETE OVERLAND PACKAGE • SLEEP UNDER THE STARS
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Camping Fleet
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Camping Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* CAMPING DESTINATIONS STRIP */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {campingParks.map((park, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPark(park.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    selectedPark === park.id
                      ? "bg-[#93C5FD] text-[#1D4ED8]"
                      : "text-white hover:bg-[#1D4ED8]/60 border border-[#93C5FD]/30"
                  }`}
                >
                  <span className="text-lg">{park.icon}</span>
                  <span className="text-sm font-semibold">{park.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CAMPING PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rooftop Tent <span className="text-[#1D4ED8]">Camping Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete overland setups for the ultimate camping safari
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Weekend Adventure Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Weekend Adventure</h3>
              <p className="text-gray-600 mb-4">2-3 day camping safari • Perfect for Akagera</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$185</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rooftop tent • Sleeps 2-3
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Awning • Camping chairs & table
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic cooking equipment
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ideal for Akagera camping
                </li>
              </ul>
              <Link
                href="/booking/camping?package=weekend"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Weekend Package
              </Link>
            </div>
            
            {/* Complete Overland Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Overland</h3>
              <p className="text-gray-600 mb-4">Fully equipped for multi-day expeditions</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$245</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Roof top tent • Sleeps 4
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Portable fridge/freezer
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Solar panel & battery system
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full cooking equipment
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Water tank • Awning
                </li>
              </ul>
              <Link
                href="/booking/camping?package=overland"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Book Overland Package
              </Link>
            </div>
            
            {/* Expedition Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Expedition Ready</h3>
              <p className="text-gray-600 mb-4">Cross-border • Long-term overland</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$295</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Heavy duty roof tent • Sleeps 5
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dual battery system
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Extra fuel & water capacity
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cross-border documentation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Satellite phone option
                </li>
              </ul>
              <Link
                href="/booking/camping?package=expedition"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Expedition
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Vehicle Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  <option value="all">All Brands</option>
                  {vehicleBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
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
                  Camping Destination
                </label>
                <select
                  value={selectedPark}
                  onChange={(e) => setSelectedPark(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  <option value="all">All Destinations</option>
                  {campingParks.map(park => (
                    <option key={park.id} value={park.id}>{park.name}</option>
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
                    min={120}
                    max={400}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={120}
                    max={400}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
              
              {/* Camping Equipment */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Equipment
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={awningIncluded}
                      onChange={(e) => setAwningIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Awning</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fridgeIncluded}
                      onChange={(e) => setFridgeIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Portable Fridge</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={solarIncluded}
                      onChange={(e) => setSolarIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Solar Panel</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> rooftop tent vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSleeping('all');
                    setSelectedPark('all');
                    setAwningIncluded(false);
                    setFridgeIncluded(false);
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
              <p className="mt-6 text-gray-600 text-lg">Loading rooftop tent vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No rooftop tent vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our camping specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSleeping('all');
                    setSelectedPark('all');
                    setAwningIncluded(false);
                    setFridgeIncluded(false);
                    setSolarIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Camping Vehicles
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Camping Specialists
                </a>
              </div>
            </div>
          )}

          {/* ROOFTOP TENT VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Rooftop Tent <span className="text-[#1D4ED8]">Camping Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles with roof tents & camping gear</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Ready to Camp
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
                        alt={`${vehicle.brand} ${vehicle.model} - Rooftop tent car rental Rwanda`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/camping-placeholder.jpg';
                        }}
                      />
                      
                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* ROOFTOP TENT BADGE */}
                      <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        ROOFTOP TENT
                      </div>
                      
                      {/* SLEEPING CAPACITY */}
                      <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🛏️ Sleeps {vehicle.sleepingCapacity || 2}
                      </div>
                      
                      {/* VEHICLE INFO */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                        <div className="text-sm text-gray-300">{vehicle.engine} • {vehicle.seats} seats</div>
                      </div>
                    </div>
                    
                    {/* DETAILS SECTION */}
                    <div className="p-6">
                      {/* TENT & VEHICLE SPECS */}
                      <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500">Tent Type</div>
                            <div className="font-bold text-gray-800">{vehicle.tentType || 'Hard Shell'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Sleeps</div>
                            <div className="font-bold text-gray-800">{vehicle.sleepingCapacity || 2} Persons</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Drive</div>
                            <div className="font-bold text-gray-800">{vehicle.driveType}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Transmission</div>
                            <div className="font-bold text-gray-800">{vehicle.transmission}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* CAMPING EQUIPMENT GRID */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {vehicle.awning && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Awning">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2M3 6l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2" />
                            </svg>
                          </div>
                        )}
                        {vehicle.portableFridge && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Portable Fridge">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.solarPanel && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Solar Panel">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.cookingEquipment && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Cooking Equipment">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* CAMPING FEATURES */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {vehicle.mattressIncluded && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              ✅ Mattress
                            </span>
                          )}
                          {vehicle.beddingIncluded && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              ✅ Bedding
                            </span>
                          )}
                          {vehicle.waterTank && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              💧 Water Tank
                            </span>
                          )}
                          {vehicle.batterySystem && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              🔋 Dual Battery
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* NATIONAL PARKS */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Camping Destinations:</div>
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
                          href={`/booking/camping?vehicle=${vehicle.id}`}
                          className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                        >
                          Rent Camping Vehicle
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

        {/* WHY CHOOSE ROOFTOP TENT CAMPING */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-[#93C5FD]">Rooftop Tent Camping</span> in Rwanda
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                The ultimate freedom for your African safari adventure
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sleep Anywhere</h3>
                <p className="text-gray-300 text-sm">Set up camp in minutes at any campsite or wild spot</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
                <p className="text-gray-300 text-sm">Rooftop tent deploys in under 5 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Safe from Wildlife</h3>
                <p className="text-gray-300 text-sm">Sleep elevated and secure in national parks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Freedom</h3>
                <p className="text-gray-300 text-sm">No hotel bookings • Go where the adventure takes you</p>
              </div>
            </div>
          </div>
        </div>

        {/* ROOFTOP TENT VS OTHER CAMPING OPTIONS - UNIQUE CONTENT */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Rooftop Tent or Motorhome? What You're Actually Renting
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                A rooftop tent vehicle is a standard 4x4 — usually a Toyota Land Cruiser or Hilux — with a tent fitted to the roof rack that pops or folds open above the vehicle. Unlike a <Link href="/camping-car-rental-rwanda" className="text-[#1D4ED8] font-semibold hover:underline">motorhome or campervan</Link>, nothing is built into the cabin: the inside of the vehicle stays free for luggage, camera gear, or extra passengers, and you drive it exactly like any other 4x4 during the day. At camp, the tent unfolds in a few minutes and packs away just as fast the next morning — considerably quicker than pitching and striking a ground tent, and it keeps you off the ground and away from insects and overnight moisture.
              </p>
              <p>
                The real advantage over a motorhome conversion is that a rooftop tent doesn't cost you any off-road capability. The vehicle underneath is unchanged — same ground clearance, same weight distribution, same ability to handle the rougher tracks inside Akagera or the steep, rutted roads leading into Volcanoes National Park. A heavier motorhome trades some of that agility for the comfort of a built-in kitchen and bathroom.
              </p>
              <p>
                That combination is exactly why this is a popular middle-ground pick for travelers stringing together a gorilla trek in Volcanoes with a few days of game drives in Akagera on the same trip: you get genuine 4x4 capability for both destinations, plus the flexibility to camp overnight without booking a lodge, without taking on the size and driving demands of a full motorhome. If your trip is built around wildlife viewing rather than overnight self-sufficiency — for example lodge-based safaris — our <Link href="/safari-car-rental-rwanda" className="text-[#1D4ED8] font-semibold hover:underline">dedicated safari vehicles</Link> with pop-up viewing roofs and elevated seating are a better fit.
              </p>
            </div>
          </div>
        </div>

        {/* CAMPING FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Rooftop Tent Car Rental - <span className="text-[#1D4ED8]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about camping vehicle rental in Rwanda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What's included with a rooftop tent rental?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our rooftop tent vehicles include the tent with mattress, bedding, awning, camping chairs and table, basic cooking equipment, and water container. Premium packages add portable fridge, solar panel, and dual battery system.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How easy is it to set up the rooftop tent?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Very easy! Most tents are pop-up or fold-out designs that deploy in 2-5 minutes. We provide a full demonstration when you collect the vehicle, and all tents come with detailed instructions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Where can I camp with a rooftop tent in Rwanda?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Akagera National Park has designated campsites. Lake Kivu has beach and lakeside camping. There are also private campsites near Volcanoes and Nyungwe. Wild camping is possible with permission in some areas.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What vehicles have rooftop tents?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We offer Toyota Land Cruiser (Prado, V8, 70 Series), Toyota Hilux, and Land Rover Defender with rooftop tents. All are 4x4 diesel vehicles perfect for overland camping.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I take a rooftop tent vehicle cross-border?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Many of our camping vehicles are approved for cross-border travel to Uganda (for gorilla trekking), Tanzania, and DRC. Advance notice required for cross-border permits and insurance.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is the camping equipment included in the price?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, all camping equipment shown in the package is included in the daily rate. There are no hidden fees for tents, awnings, chairs, tables, or cooking equipment. Just bring your personal items and food!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CAMPING GEAR SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete <span className="text-[#1D4ED8]">Camping Gear</span> Included
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for the perfect camping safari
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🏕️</div>
              <div className="font-bold text-gray-800">Rooftop Tent</div>
              <div className="text-xs text-gray-500 mt-1">With mattress & bedding</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">⛱️</div>
              <div className="font-bold text-gray-800">Awning</div>
              <div className="text-xs text-gray-500 mt-1">Shade & rain protection</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🪑</div>
              <div className="font-bold text-gray-800">Camping Chairs</div>
              <div className="text-xs text-gray-500 mt-1">Comfortable seating</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🧊</div>
              <div className="font-bold text-gray-800">Portable Fridge</div>
              <div className="text-xs text-gray-500 mt-1">Keep food & drinks cold</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🍳</div>
              <div className="font-bold text-gray-800">Cooking Equipment</div>
              <div className="text-xs text-gray-500 mt-1">Stove, pots, utensils</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🔋</div>
              <div className="font-bold text-gray-800">Solar Panel</div>
              <div className="text-xs text-gray-500 mt-1">Charge devices off-grid</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">💧</div>
              <div className="font-bold text-gray-800">Water Tank</div>
              <div className="text-xs text-gray-500 mt-1">20L fresh water</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-4xl mb-3">🔦</div>
              <div className="font-bold text-gray-800">LED Lighting</div>
              <div className="text-xs text-gray-500 mt-1">Camp illumination</div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-[#1D4ED8]">Camping Guests Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                178+ 5-star reviews from overland camping adventures
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"The Hilux with rooftop tent was perfect for our Akagera camping trip. Tent set up in minutes, fridge kept everything cold, and we even had solar to charge cameras. Woke up to zebras grazing nearby!"</p>
                <div className="font-bold text-gray-900">Camping Family</div>
                <div className="text-sm text-gray-500">Akagera • 3 nights</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Took a Land Cruiser with roof tent to Lake Kivu for a week. Camped right on the beach, cooked our own meals, and the dual battery system kept our devices charged. Freedom like no other!"</p>
                <div className="font-bold text-gray-900">Overland Couple</div>
                <div className="text-sm text-gray-500">Lake Kivu • 7 nights</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Crossed into Uganda with our rooftop tent vehicle for gorilla trekking. The team arranged all permits and paperwork. Camped near Bwindi - an unforgettable experience. Vehicle was perfect."</p>
                <div className="font-bold text-gray-900">Adventure Group</div>
                <div className="text-sm text-gray-500">Uganda • Cross-border</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Camping Adventure?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Rent a rooftop tent vehicle and sleep under the stars in Rwanda's wild places.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Camping Fleet
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Camping Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Rooftop tents • Awnings • Fridges • Solar panels • Full camping gear • Cross-border permitted
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
