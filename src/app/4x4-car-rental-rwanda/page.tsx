// app/4x4-car-rental-rwanda/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

interface FourXFourVehicle {
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
  groundClearance: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  safariRate?: number;
  offRoadCapable: boolean;
  mountainTerrain: boolean;
  mudTerrain: boolean;
  rockyTerrain: boolean;
  riverCrossing: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  nationalParkAccess: string[];
  popUpRoof: boolean;
  roofTent: boolean;
  campingGear: boolean;
  recoveryKit: boolean;
  spareTire: boolean;
  snorkel: boolean;
  bullBar: boolean;
  winch: boolean;
}

export default function FourXFourCarRentalRwanda() {
  const [vehicles, setVehicles] = useState<FourXFourVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedTerrain, setSelectedTerrain] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([80, 300]);
  const [safariReady, setSafariReady] = useState(false);
  const [campingReady, setCampingReady] = useState(false);

  // Fetch 4x4 vehicles from DB
  useEffect(() => {
    const fetchFourXFourVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for 4x4 vehicles
        const response = await fetch("/api/cars?4x4=true&offroad=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for 4x4/off-road vehicles
          const fourXFourCars = data.cars.filter((car: any) => 
            car.driveType?.toLowerCase().includes('4x4') ||
            car.driveType?.toLowerCase().includes('4wd') ||
            car.driveType?.toLowerCase().includes('all-wheel') ||
            car.category?.toLowerCase().includes('4x4') ||
            car.category?.toLowerCase().includes('off-road') ||
            car.category?.toLowerCase().includes('suv') ||
            car.brand === 'Toyota' && (car.model?.includes('Land Cruiser') || car.model?.includes('Prado') || car.model?.includes('Hilux') || car.model?.includes('Fortuner')) ||
            car.brand === 'Land Rover' ||
            car.brand === 'Range Rover' ||
            car.brand === 'Jeep' ||
            car.brand === 'Mitsubishi' && car.model?.includes('Pajero') ||
            car.brand === 'Nissan' && car.model?.includes('Patrol') ||
            car.brand === 'Ford' && car.model?.includes('Ranger')
          );
          setVehicles(fourXFourCars);
          
          if (fourXFourCars.length > 0) {
            const rates = fourXFourCars.map((c: any) => c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching 4x4 vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFourXFourVehicles();
  }, []);

  // Vehicle brands for filtering
  const vehicleBrands = ["all", ...Array.from(new Set(vehicles.map(v => v.brand)))].filter(b => b !== 'all');

  // Terrain types for filtering
  const terrainTypes = [
    { id: "all", name: "All Terrain", icon: "🌍" },
    { id: "mountain", name: "Mountain", icon: "⛰️" },
    { id: "mud", name: "Mud", icon: "🟫" },
    { id: "rocky", name: "Rocky", icon: "🪨" },
    { id: "river", name: "River Crossing", icon: "🌊" },
    { id: "safari", name: "Safari", icon: "🦁" },
  ];

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // National parks in Rwanda
  const nationalParks = [
    { name: "Akagera National Park", terrain: "Savanna, Game Drives", bestFor: "Big Five Safari", driveTime: "2.5 hrs from Kigali" },
    { name: "Volcanoes National Park", terrain: "Mountain, Forest", bestFor: "Gorilla Trekking", driveTime: "2.5 hrs from Kigali" },
    { name: "Nyungwe Forest National Park", terrain: "Rainforest, Mountains", bestFor: "Chimpanzee Tracking", driveTime: "5 hrs from Kigali" },
    { name: "Gishwati-Mukura National Park", terrain: "Forest, Hills", bestFor: "Hiking, Primates", driveTime: "3 hrs from Kigali" },
  ];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    if (selectedTerrain !== "all") {
      if (selectedTerrain === "mountain" && !vehicle.mountainTerrain) return false;
      if (selectedTerrain === "mud" && !vehicle.mudTerrain) return false;
      if (selectedTerrain === "rocky" && !vehicle.rockyTerrain) return false;
      if (selectedTerrain === "river" && !vehicle.riverCrossing) return false;
    }
    if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
    if (safariReady && !vehicle.offRoadCapable) return false;
    if (campingReady && !vehicle.roofTent && !vehicle.campingGear) return false;
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
    "name": "4x4 Car Rental Rwanda - Premium Off-Road & Safari Vehicles",
    "description": "4x4 car rental in Rwanda for safari, mountain terrain, mud, rocky roads, and river crossings. Toyota Land Cruiser, Land Rover, Range Rover, Jeep. Perfect for Akagera, Volcanoes, Nyungwe National Parks.",
    "url": "https://kigalicarrental.site/4x4-car-rental-rwanda",
    "telephone": "+250796077321",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "412"
    },
    "priceRange": "$$$",
    "areaServed": ["Kigali", "Akagera National Park", "Volcanoes National Park", "Nyungwe Forest", "Lake Kivu"],
    "brand": {
      "@type": "Brand",
      "name": "Kigali Car Rental 4x4 Collection"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "4x4 Vehicles",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Land Rover Defender"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Range Rover Vogue"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Hilux"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Jeep Wrangler"}}
      ]
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "4x4 Vehicles", "item": "https://kigalicarrental.site/4x4-vehicles"},
      {"@type": "ListItem", "position": 3, "name": "4x4 Car Rental Rwanda", "item": "https://kigalicarrental.site/4x4-car-rental-rwanda"}
    ]
  };

  return (
    <>
      <Head>
        <title>4x4 Car Rental Rwanda | Toyota Land Cruiser, Land Rover & Safari Vehicles | Off-Road Specialists</title>
        <meta name="description" content="✅ 4x4 car rental Rwanda - Specialized off-road vehicles for Akagera, Volcanoes & Nyungwe National Parks. Toyota Land Cruiser Prado, Land Rover Defender, Range Rover. Roof tents, camping gear, recovery kit. Book your safari vehicle today." />
        <meta name="keywords" content="4x4 car rental Rwanda, 4x4 hire Kigali, off-road vehicle rental Rwanda, safari car rental, Toyota Land Cruiser rental Rwanda, Land Rover Defender hire, Range Rover rental Kigali, Jeep Wrangler Rwanda, 4x4 for Akagera National Park, Volcanoes National Park 4x4, Nyungwe forest vehicle, mountain terrain 4x4, mud terrain vehicle, rocky road capable, river crossing 4x4, roof top tent car rental, camping vehicle Rwanda, overland vehicle hire, self-drive safari Rwanda, game drive vehicle, gorilla trekking transport, chimpanzee tracking vehicle, 4x4 with snorkel, bull bar 4x4, winch equipped vehicle, recovery kit included, pop-up roof 4x4, 7 seater 4x4 Rwanda, diesel 4x4 rental, automatic 4x4 Rwanda, manual 4x4 hire" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kigalicarrental.site/4x4-car-rental-rwanda" />
        <meta property="og:title" content="4x4 Car Rental Rwanda | Toyota Land Cruiser, Land Rover & Safari Vehicles" />
        <meta property="og:description" content="Specialized off-road vehicles for Akagera, Volcanoes & Nyungwe National Parks. Roof tents, camping gear, recovery kit. Book your safari vehicle today." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kigalicarrental.site/4x4-car-rental-rwanda" />
        <meta property="twitter:title" content="4x4 Car Rental Rwanda | Toyota Land Cruiser, Land Rover & Safari Vehicles" />
        <meta property="twitter:description" content="Specialized off-road vehicles for Akagera, Volcanoes & Nyungwe National Parks. Roof tents, camping gear, recovery kit." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kigalicarrental.site/4x4-car-rental-rwanda" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        
        {/* Additional SEO meta */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="Kigali Car Rental - 4x4 Specialists" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - 4X4 ADVENTURE */}
        <div className="relative bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - 4x4 Safari */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920" 
              alt="4x4 car rental Rwanda - Toyota Land Cruiser safari vehicle"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#D0D98D] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/4x4-vehicles" className="hover:text-white transition-colors">4x4 Vehicles</Link>
                <span>›</span>
                <span className="text-white">4x4 Car Rental Rwanda</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#D0D98D]">4x4 Car Rental</span> Rwanda
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Specialized <span className="text-[#D0D98D] font-semibold">off-road vehicles</span> for 
                Akagera, Volcanoes & Nyungwe National Parks. Toyota Land Cruiser, Land Rover Defender, Range Rover.
              </p>
              
              {/* KEY 4X4 METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">4x4 Vehicles</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">8+</div>
                  <div className="text-xs text-gray-300 mt-1">4x4 Brands</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4</div>
                  <div className="text-xs text-gray-300 mt-1">National Parks</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4.8★</div>
                  <div className="text-xs text-gray-300 mt-1">412+ Reviews</div>
                </div>
              </div>
              
              {/* 4x4 BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#D0D98D] text-[#4B5320] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  OFF-ROAD SPECIALISTS • SAFARI READY
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View 4x4 Fleet
                </Link>
                <a
                  href="tel:+250796077321"
                  className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-all text-lg"
                >
                  4x4 Hotline: +250 796 077 321
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D0D98D]/10 to-transparent"></div>
        </div>

        {/* NATIONAL PARKS STRIP */}
        <div className="bg-[#4B5320] border-y border-[#6B7F3A]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {nationalParks.map((park, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <svg className="w-4 h-4 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="text-sm font-semibold">{park.name}</span>
                    <span className="text-xs text-gray-300 ml-2">{park.driveTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TERRAIN TYPE SELECTOR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {terrainTypes.map((terrain) => (
                <button
                  key={terrain.id}
                  onClick={() => setSelectedTerrain(terrain.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedTerrain === terrain.id
                      ? "bg-[#4B5320] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{terrain.icon}</span>
                  {terrain.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4X4 PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              4x4 Safari <span className="text-[#4B5320]">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete off-road solutions for your Rwanda adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Self-Drive Safari */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Self-Drive Safari</h3>
              <p className="text-gray-600 mb-4">Explore national parks at your own pace</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$95</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 vehicle with recovery kit
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited mileage
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  GPS & offline maps
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 roadside assistance
                </li>
              </ul>
              <Link
                href="/booking/4x4?package=selfdrive"
                className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
              >
                Book Self-Drive
              </Link>
            </div>
            
            {/* Guided Safari - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#4B5320] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Guided Safari</h3>
              <p className="text-gray-600 mb-4">4x4 vehicle + expert safari guide</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$210</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional safari guide
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium 4x4 Land Cruiser
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pop-up roof for game viewing
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Binoculars & field guides
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park fees included
                </li>
              </ul>
              <Link
                href="/booking/4x4?package=guided"
                className="block w-full text-center px-6 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3A4218] transition-all"
              >
                Book Guided Safari
              </Link>
            </div>
            
            {/* Camping Expedition */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Camping Expedition</h3>
              <p className="text-gray-600 mb-4">Multi-day overland adventure</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$165</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 with roof top tent
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Complete camping gear
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Portable fridge & cooker
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Recovery kit & spare tires
                </li>
              </ul>
              <Link
                href="/booking/4x4?package=camping"
                className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
              >
                Book Camping Expedition
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#4B5320]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  4x4 Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  <option value="all">All 4x4 Brands</option>
                  {vehicleBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Seats Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {seatOptions.map(seat => (
                    <option key={seat} value={seat}>
                      {seat === 'all' ? 'All' : `${seat} Seats`}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Terrain Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Terrain Type
                </label>
                <select
                  value={selectedTerrain}
                  onChange={(e) => setSelectedTerrain(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {terrainTypes.map(terrain => (
                    <option key={terrain.id} value={terrain.id}>
                      {terrain.icon} {terrain.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Daily Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={70}
                    max={350}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#4B5320]"
                  />
                  <input
                    type="range"
                    min={70}
                    max={350}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#4B5320] mt-2"
                  />
                </div>
              </div>
              
              {/* 4x4 Options */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Equipment
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={safariReady}
                      onChange={(e) => setSafariReady(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Safari Ready</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={campingReady}
                      onChange={(e) => setCampingReady(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Camping Ready</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#4B5320] text-lg">{filteredVehicles.length}</span> 4x4 vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSeats('all');
                    setSelectedTerrain('all');
                    setSafariReady(false);
                    setCampingReady(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="text-sm text-[#4B5320] hover:text-[#3A4218] font-semibold underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4B5320] border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading 4x4 vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No 4x4 vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our 4x4 specialists for custom requirements.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSeats('all');
                    setSelectedTerrain('all');
                    setSafariReady(false);
                    setCampingReady(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#4B5320] text-white font-semibold rounded-lg hover:bg-[#3A4218] transition-colors"
                >
                  View All 4x4s
                </button>
                <a
                  href="tel:+250796077321"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call 4x4 Specialists
                </a>
              </div>
            </div>
          )}

          {/* 4X4 VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    4x4 <span className="text-[#4B5320]">Safari Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} off-road ready vehicles</p>
                </div>
                <div className="bg-[#4B5320]/10 text-[#4B5320] px-4 py-2 rounded-lg text-sm font-bold border border-[#4B5320]/20">
                  {filteredVehicles.length} Adventure Ready
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#4B5320] hover:shadow-2xl transition-all duration-300"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={vehicle.imageUrl}
                        alt={`${vehicle.brand} ${vehicle.model} - 4x4 car rental Rwanda`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/4x4-placeholder.jpg';
                        }}
                      />
                      
                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* 4x4 BADGE */}
                      <div className="absolute top-4 left-4 bg-[#4B5320] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        4x4
                      </div>
                      
                      {/* OFF-ROAD BADGE */}
                      {vehicle.offRoadCapable && (
                        <div className="absolute top-4 right-4 bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⛰️ OFF-ROAD
                        </div>
                      )}
                      
                      {/* VEHICLE INFO */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                        <div className="text-sm text-gray-300">{vehicle.category} • {vehicle.seats} seats • {vehicle.year}</div>
                      </div>
                    </div>
                    
                    {/* DETAILS SECTION */}
                    <div className="p-6">
                      {/* ENGINE & DRIVE INFO */}
                      <div className="bg-[#4B5320]/5 rounded-lg p-4 mb-4 border border-[#4B5320]/20">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500">Engine</div>
                            <div className="font-bold text-gray-800">{vehicle.engine || 'V6'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Drive</div>
                            <div className="font-bold text-gray-800">{vehicle.driveType || '4x4'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Clearance</div>
                            <div className="font-bold text-gray-800">{vehicle.groundClearance || 'High'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Fuel</div>
                            <div className="font-bold text-gray-800">{vehicle.fuelType}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* TERRAIN CAPABILITIES */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Terrain Capable:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.mountainTerrain && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">⛰️ Mountain</span>
                          )}
                          {vehicle.mudTerrain && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🟫 Mud</span>
                          )}
                          {vehicle.rockyTerrain && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🪨 Rocky</span>
                          )}
                          {vehicle.riverCrossing && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🌊 River</span>
                          )}
                        </div>
                      </div>
                      
                      {/* OFF-ROAD EQUIPMENT */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {vehicle.snorkel && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Snorkel">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.winch && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Winch">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                        )}
                        {vehicle.recoveryKit && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Recovery Kit">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        )}
                        {vehicle.roofTent && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Roof Tent">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2M3 6l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* NATIONAL PARK ACCESS */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">National Parks:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.nationalParkAccess?.map((park, idx) => (
                            <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                              {park}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* PRICING */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-xs text-gray-500">Daily 4x4 Rate</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold text-[#4B5320]">{formatCurrency(vehicle.dailyRate)}</span>
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
                          href={`/booking/4x4?vehicle=${vehicle.id}`}
                          className="px-4 py-3 bg-[#4B5320] text-white text-sm font-bold rounded-lg hover:bg-[#3A4218] transition-all text-center"
                        >
                          Book 4x4
                        </Link>
                        <Link
                          href={`/vehicles/${vehicle.id}`}
                          className="px-4 py-3 border-2 border-[#4B5320] text-[#4B5320] text-sm font-bold rounded-lg hover:bg-[#4B5320]/5 transition-all text-center"
                        >
                          View Details
                        </Link>
                      </div>
                      
                      {/* SAFARI NOTE */}
                      {vehicle.popUpRoof && (
                        <div className="mt-3 text-[10px] text-[#4B5320] text-center font-semibold">
                          ✓ Pop-up roof for game viewing • Safari ready
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* WHY CHOOSE 4X4 RENTAL */}
        <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our <span className="text-[#D0D98D]">4x4 Rental</span> in Rwanda
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Purpose-built vehicles for Rwanda's diverse terrain and national parks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">True 4x4 Capability</h3>
                <p className="text-gray-300 text-sm">Low-range gearing, diff locks, high ground clearance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Safari Equipped</h3>
                <p className="text-gray-300 text-sm">Pop-up roofs, game viewing seats, binoculars</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Camping Ready</h3>
                <p className="text-gray-300 text-sm">Roof tents, fridges, cookers, full camping gear</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Recovery Equipment</h3>
                <p className="text-gray-300 text-sm">Winches, snatch straps, recovery tracks, spare tires</p>
              </div>
            </div>
          </div>
        </div>

        {/* NATIONAL PARK DETAILS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rwanda's National Parks - <span className="text-[#4B5320]">4x4 Required</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Why you need a proper 4x4 for each destination
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center text-3xl">
                  🦁
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Akagera National Park</h3>
                  <p className="text-[#4B5320] font-semibold">2.5 hrs from Kigali</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">Savanna terrain with game drive tracks. 4x4 recommended for wet season and off-road game viewing. Home to Big Five.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Mud tracks</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Game viewing</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">River crossings</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center text-3xl">
                  🦍
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Volcanoes National Park</h3>
                  <p className="text-[#4B5320] font-semibold">2.5 hrs from Kigali</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">Mountain terrain with steep, rocky roads. 4x4 essential for reaching trekking start points. High clearance required.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Steep climbs</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Rocky roads</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">High altitude</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center text-3xl">
                  🐒
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Nyungwe Forest</h3>
                  <p className="text-[#4B5320] font-semibold">5 hrs from Kigali</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">Rainforest with muddy, slippery tracks. 4x4 essential in wet season. Long drive requires reliable vehicle.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Mud & rain</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Slippery tracks</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Long distance</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center text-3xl">
                  🏞️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Gishwati-Mukura</h3>
                  <p className="text-[#4B5320] font-semibold">3 hrs from Kigali</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">Forest hills with challenging terrain. 4x4 recommended for access roads and forest tracks.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Hilly terrain</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Forest tracks</span>
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">Remote access</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4X4 FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                4x4 Car Rental Rwanda - <span className="text-[#4B5320]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about off-road rental in Rwanda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I need a 4x4 for Rwanda national parks?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, strongly recommended. Volcanoes NP requires 4x4 for steep mountain roads. Akagera's game drive tracks need high clearance, especially in wet season. Nyungwe's muddy forest roads demand 4x4 capability.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What 4x4 vehicles do you offer?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toyota Land Cruiser (Prado, V8), Land Rover Defender, Range Rover Vogue, Toyota Hilux, Mitsubishi Pajero, Nissan Patrol, and Jeep Wrangler. All are genuine 4x4s with low-range gearing.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Are your 4x4s equipped for safari?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Many of our 4x4s have pop-up roofs for game viewing, safari seats, and binoculars. We also offer camping-equipped vehicles with roof tents, fridges, and full camping gear for multi-day expeditions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What recovery equipment is included?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All our 4x4s include recovery kit: snatch strap, shackles, recovery tracks, hi-lift jack, and basic tools. Premium vehicles have winches and full underbody protection. Spare tires are always included.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I take a 4x4 cross-border?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, with advance notice. We permit cross-border travel to Uganda (for gorilla trekking), DRC (Goma), Tanzania, and Burundi. Additional documentation and insurance required. Contact us for details.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer self-drive or with guide?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Both options available. Self-drive gives you freedom to explore at your pace. Guided safari includes professional driver-guide who knows the parks, animal behavior, and best spots. Choose what suits you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#4B5320]">Safari Clients Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              412+ 5-star reviews from 4x4 adventurers
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
              <p className="text-gray-700 mb-4">"The Land Cruiser Prado was perfect for Akagera. Handled mud tracks easily, pop-up roof made game viewing amazing. Vehicle was clean, well-maintained, and had full recovery kit."</p>
              <div className="font-bold text-gray-900">Michael & Family</div>
              <div className="text-sm text-gray-500">Self-drive Safari • Akagera</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Booked Land Rover Defender with guide for Volcanoes. Steep muddy roads were no problem. Guide was excellent, knew exactly where to find gorillas. Vehicle was tough and comfortable."</p>
              <div className="font-bold text-gray-900">Sarah & David</div>
              <div className="text-sm text-gray-500">Guided Safari • Volcanoes NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Rented Hilux with roof tent for 5-day camping trip. Everything was included - tent, mattress, cooking gear, fridge. Crossed into Uganda no problem. Best adventure ever!"</p>
              <div className="font-bold text-gray-900">Adventure Team</div>
              <div className="text-sm text-gray-500">Camping Expedition • Cross-border</div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#D0D98D]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Safari Adventure?
            </h2>
            <p className="text-xl text-[#D0D98D] mb-8 max-w-2xl mx-auto">
              Book your 4x4 today. Land Cruiser, Defender, Hilux - all safari ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View 4x4 Fleet
              </Link>
              <a
                href="tel:+250796077321"
                className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-colors text-lg"
              >
                4x4 Hotline: +250 796 077 321
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Toyota Land Cruiser • Land Rover Defender • Range Rover • Toyota Hilux • Jeep Wrangler • Mitsubishi Pajero
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
