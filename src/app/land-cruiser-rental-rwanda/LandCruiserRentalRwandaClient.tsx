"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LandCruiserVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
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
  popUpRoof: boolean;
  gameViewingSeats: boolean;
  roofTent: boolean;
  campingGear: boolean;
  fridge: boolean;
  snorkel: boolean;
  winch: boolean;
  bullBar: boolean;
  recoveryKit: boolean;
  spareTires: number;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  nationalParks: string[];
  terrainCapability: string[];
  bestFor: string[];
  guideAvailable: boolean;
}

export default function LandCruiserRentalRwandaClient() {
  const [vehicles, setVehicles] = useState<LandCruiserVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedPark, setSelectedPark] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([120, 400]);
  const [popUpRoof, setPopUpRoof] = useState(false);
  const [campingGear, setCampingGear] = useState(false);
  const [snorkelEquipped, setSnorkelEquipped] = useState(false);

  // Fetch Land Cruiser vehicles from DB
  useEffect(() => {
    const fetchLandCruisers = async () => {
      try {
        setLoading(true);
        // API endpoint for Land Cruiser vehicles
        const response = await fetch("/api/cars?landcruiser=true&toyota=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for Land Cruiser models
          const landCruisers = data.cars.filter((car: any) => 
            car.brand === 'Toyota' && (
              car.model?.toLowerCase().includes('land cruiser') ||
              car.model?.toLowerCase().includes('landcruiser') ||
              car.model?.toLowerCase().includes('prado') ||
              car.model?.toLowerCase().includes('v8') ||
              car.model?.toLowerCase().includes('300 series') ||
              car.model?.toLowerCase().includes('200 series')
            )
          );
          setVehicles(landCruisers);
          
          if (landCruisers.length > 0) {
            const rates = landCruisers.map((c: any) => c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching Land Cruisers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandCruisers();
  }, []);

  // Land Cruiser models
  const landCruiserModels = [
    { id: "all", name: "All Land Cruiser Models", icon: "🚙" },
    { id: "prado", name: "Land Cruiser Prado", icon: "🚙" },
    { id: "v8", name: "Land Cruiser V8", icon: "🚙" },
    { id: "300", name: "Land Cruiser 300 Series", icon: "🚙" },
    { id: "200", name: "Land Cruiser 200 Series", icon: "🚙" },
    { id: "70", name: "Land Cruiser 70 Series", icon: "🚙" },
  ];

  // Rwanda's national parks
  const nationalParks = [
    { id: "akagera", name: "Akagera National Park", terrain: "Savanna, Game Tracks" },
    { id: "volcanoes", name: "Volcanoes National Park", terrain: "Mountain, Steep Slopes" },
    { id: "nyungwe", name: "Nyungwe Forest", terrain: "Rainforest, Mud" },
    { id: "gishwati", name: "Gishwati-Mukura", terrain: "Forest Hills" },
  ];

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Get unique models from data
  const modelOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.model)))].filter(m => m !== 'all');

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedModel !== "all") {
      if (selectedModel === "prado" && !vehicle.model?.toLowerCase().includes('prado')) return false;
      if (selectedModel === "v8" && !vehicle.model?.toLowerCase().includes('v8')) return false;
      if (selectedModel === "300" && !vehicle.model?.toLowerCase().includes('300')) return false;
      if (selectedModel === "200" && !vehicle.model?.toLowerCase().includes('200')) return false;
      if (selectedModel === "70" && !vehicle.model?.toLowerCase().includes('70')) return false;
    }
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    if (selectedPark !== "all" && !vehicle.nationalParks?.includes(selectedPark)) return false;
    if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
    if (popUpRoof && !vehicle.popUpRoof) return false;
    if (campingGear && !vehicle.campingGear && !vehicle.roofTent) return false;
    if (snorkelEquipped && !vehicle.snorkel) return false;
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
    "name": "Land Cruiser Rental Rwanda - Toyota Land Cruiser for Safari & Off-Road Adventures",
    "description": "Toyota Land Cruiser rental in Rwanda for safari, gorilla trekking, and off-road adventures. Prado, V8, 300 Series, 200 Series models available. Pop-up roofs, camping gear, snorkel equipped. Perfect for Akagera, Volcanoes & Nyungwe.",
    "url": "https://kigalicarrental.site/land-cruiser-rental-rwanda",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "387"
    },
    "priceRange": "$$$",
    "areaServed": ["Akagera National Park", "Volcanoes National Park", "Nyungwe Forest", "Kigali", "Rwanda"],
    "brand": {
      "@type": "Brand",
      "name": "Toyota Land Cruiser"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Land Cruiser Models",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Prado"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser V8"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser 300 Series"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser 200 Series"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser 70 Series"}}
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
      {"@type": "ListItem", "position": 3, "name": "Land Cruiser Rental Rwanda", "item": "https://kigalicarrental.site/land-cruiser-rental-rwanda"}
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
        {/* HERO SECTION - LAND CRUISER */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Land Cruiser */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920" 
              alt="Toyota Land Cruiser rental Rwanda - Safari vehicle"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">4x4 Vehicles</span>
                <span>›</span>
                <span className="text-white">Land Cruiser Rental Rwanda</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Land Cruiser</span> Rental Rwanda
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-[#93C5FD] font-semibold">Toyota Land Cruiser</span> Prado, V8, 300 Series & 200 Series 
                for safari and off-road adventures. Pop-up roofs, camping gear, snorkel equipped.
              </p>
              
              {/* KEY LAND CRUISER METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Land Cruisers</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">5</div>
                  <div className="text-xs text-gray-300 mt-1">Models Available</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">4</div>
                  <div className="text-xs text-gray-300 mt-1">National Parks</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">4.9★</div>
                  <div className="text-xs text-gray-300 mt-1">387+ Reviews</div>
                </div>
              </div>
              
              {/* LAND CRUISER BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#93C5FD] text-[#1D4ED8] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  THE KING OF OFF-ROAD • SAFARI LEGEND
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Land Cruisers
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Land Cruiser Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* LAND CRUISER MODELS STRIP */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {landCruiserModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedModel === model.id
                      ? "bg-[#93C5FD] text-[#1D4ED8] shadow-lg"
                      : "bg-[#1D4ED8]/40 text-white hover:bg-[#1D4ED8]/60 border border-[#93C5FD]/30"
                  }`}
                >
                  <span className="mr-2">{model.icon}</span>
                  {model.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LAND CRUISER PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Land Cruiser <span className="text-[#1D4ED8]">Safari Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your Land Cruiser model and safari experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Land Cruiser Prado Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Land Cruiser Prado</h3>
              <p className="text-gray-600 mb-4">7-seater • Perfect for families & small groups</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$135</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  2.8L Diesel • Automatic
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7 seats • Leather interior
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pop-up roof option
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Perfect for gorilla trekking
                </li>
              </ul>
              <Link
                href="/booking/landcruiser?model=prado"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Rent Prado
              </Link>
            </div>
            
            {/* Land Cruiser V8 - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Land Cruiser V8</h3>
              <p className="text-gray-600 mb-4">8-seater • Ultimate safari luxury</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$195</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4.5L V8 Diesel • Automatic
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  8 seats • Premium leather
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pop-up roof standard
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Snorkel & winch equipped
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full safari package
                </li>
              </ul>
              <Link
                href="/booking/landcruiser?model=v8"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Rent V8
              </Link>
            </div>
            
            {/* Land Cruiser 300 Series */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Land Cruiser 300</h3>
              <p className="text-gray-600 mb-4">7-seater • Newest generation</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$225</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3.3L V6 Twin-Turbo Diesel
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7 seats • Luxury interior
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Latest technology
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium safari spec
                </li>
              </ul>
              <Link
                href="/booking/landcruiser?model=300"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Rent 300 Series
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Model Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Land Cruiser Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  <option value="all">All Land Cruiser Models</option>
                  {modelOptions.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              
              {/* Seats Filter */}
              <div>
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
              
              {/* National Park Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  National Park
                </label>
                <select
                  value={selectedPark}
                  onChange={(e) => setSelectedPark(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  <option value="all">All National Parks</option>
                  {nationalParks.map(park => (
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
                    min={100}
                    max={450}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={100}
                    max={450}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
              
              {/* Land Cruiser Equipment */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Equipment
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popUpRoof}
                      onChange={(e) => setPopUpRoof(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Pop-up Roof</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={campingGear}
                      onChange={(e) => setCampingGear(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Camping Gear</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={snorkelEquipped}
                      onChange={(e) => setSnorkelEquipped(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Snorkel</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> Land Cruisers available
                </span>
                <button
                  onClick={() => {
                    setSelectedModel('all');
                    setSelectedSeats('all');
                    setSelectedPark('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setSnorkelEquipped(false);
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
              <p className="mt-6 text-gray-600 text-lg">Loading Land Cruisers...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Land Cruisers match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our Land Cruiser specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedModel('all');
                    setSelectedSeats('all');
                    setSelectedPark('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setSnorkelEquipped(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Land Cruisers
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Land Cruiser Specialists
                </a>
              </div>
            </div>
          )}

          {/* LAND CRUISER GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Land Cruiser <span className="text-[#1D4ED8]">Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} Toyota Land Cruisers available</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Ready for Safari
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
                        alt={`${vehicle.brand} ${vehicle.model} - Land Cruiser rental Rwanda`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/landcruiser-placeholder.jpg';
                        }}
                      />
                      
                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* LAND CRUISER BADGE */}
                      <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        LAND CRUISER
                      </div>
                      
                      {/* MODEL BADGE */}
                      <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {vehicle.model}
                      </div>
                      
                      {/* VEHICLE INFO */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">{vehicle.brand} {vehicle.model} {vehicle.variant}</div>
                        <div className="text-sm text-gray-300">{vehicle.year} • {vehicle.seats} seats</div>
                      </div>
                    </div>
                    
                    {/* DETAILS SECTION */}
                    <div className="p-6">
                      {/* ENGINE & DRIVE INFO */}
                      <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500">Engine</div>
                            <div className="font-bold text-gray-800">{vehicle.engine}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Drive</div>
                            <div className="font-bold text-gray-800">{vehicle.driveType}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Clearance</div>
                            <div className="font-bold text-gray-800">{vehicle.groundClearance}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Fuel</div>
                            <div className="font-bold text-gray-800">{vehicle.fuelType}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* TERRAIN CAPABILITIES */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Terrain:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.terrainCapability?.map((terrain, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {terrain}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* LAND CRUISER EQUIPMENT */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {vehicle.popUpRoof && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Pop-up Roof">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.snorkel && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Snorkel">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                        )}
                        {vehicle.winch && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Winch">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        )}
                        {vehicle.recoveryKit && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Recovery Kit">
                            <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
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
                          href={`/booking/landcruiser?vehicle=${vehicle.id}`}
                          className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                        >
                          Rent Land Cruiser
                        </Link>
                        <Link
                          href={`/vehicles/${vehicle.id}`}
                          className="px-4 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
                        >
                          View Details
                        </Link>
                      </div>
                      
                      {/* SPARE TIRES NOTE */}
                      {vehicle.spareTires > 1 && (
                        <div className="mt-3 text-[10px] text-[#1D4ED8] text-center font-semibold">
                          ✓ {vehicle.spareTires} spare tires • Safari ready
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* WHY CHOOSE LAND CRUISER */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-[#93C5FD]">Land Cruiser</span> for Your Safari
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                The ultimate off-road vehicle trusted by safari operators worldwide
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12 space-y-4 text-gray-200 leading-relaxed">
              <p>
                The Land Cruiser earned its reputation the hard way. Rwanda&apos;s national parks sit at the end of
                unpaved, volcanic-soil roads that turn to deep mud in the rainy seasons (roughly March–May and
                September–November) — terrain that regularly strands standard SUVs and sedans. The Land
                Cruiser&apos;s low-range 4WD and high ground clearance keep it moving through wet clay tracks,
                rutted park access roads, and the steep approaches to Volcanoes National Park, where the trailhead
                sits well above the tarmac. Its larger fuel tank matters more than it might seem, too: on a two-day
                loop out to Akagera or a cross-border run into Uganda or DR Congo, it means fewer detours in search
                of fuel and more distance covered on a single fill.
              </p>
              <p>
                Because of this, our Land Cruisers (V8, 300 Series, 200 Series, and 70 Series) tend to be the
                vehicle of choice for serious off-road use rather than everyday city driving — professional safari
                operators lean on them for exactly that reason. With a pop-up roof fitted, passengers can stand for
                unobstructed photography during game drives in Akagera, and the extra interior room over a Prado
                makes it the practical pick for larger groups or trips carrying a lot of luggage, camping gear, or
                recovery equipment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Unmatched Reliability</h3>
                <p className="text-gray-300 text-sm">Legendary Toyota durability for remote adventures</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Proven Off-Road</h3>
                <p className="text-gray-300 text-sm">Conquers mud, rocks, mountains, and rivers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Safari Equipped</h3>
                <p className="text-gray-300 text-sm">Pop-up roofs, game viewing seats, fridge</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Spacious Comfort</h3>
                <p className="text-gray-300 text-sm">7-8 seats with ample luggage space</p>
              </div>
            </div>
          </div>
        </div>

        {/* LAND CRUISER FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Land Cruiser Rental Rwanda - <span className="text-[#1D4ED8]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about renting a Land Cruiser in Rwanda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Which Land Cruiser is best for gorilla trekking?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Land Cruiser Prado is ideal for gorilla trekking. It handles the steep, muddy roads to Volcanoes National Park perfectly, seats 7 passengers comfortably, and has high ground clearance. The V8 offers more luxury but both are excellent.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the fuel consumption of a Land Cruiser?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Land Cruiser Prado averages 10-12 km/l, while V8 models average 8-10 km/l. All our Land Cruisers are diesel, which is more economical and better for long safari drives. We provide fuel consumption estimates for trip planning.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do Land Cruisers have pop-up roofs for game viewing?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Many of our Land Cruisers, especially V8 and specially equipped Prados, have pop-up roofs for game viewing. This allows you to stand and photograph wildlife safely from the vehicle. Perfect for Akagera safaris.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I take a Land Cruiser cross-border?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, with advance notice. Land Cruisers are perfect for cross-border safaris to Uganda (Bwindi, Queen Elizabeth), DRC (Goma, Virunga), Tanzania, and Burundi. Additional documentation and insurance required.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the difference between Prado and V8?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Prado is slightly smaller, more fuel-efficient, and easier to park - ideal for mixed use. V8 is larger, more powerful, and luxurious - the ultimate safari vehicle with more space and premium features. Both are genuine 4x4s.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Are Land Cruisers available with camping gear?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! We offer Land Cruisers equipped with roof tents, fridges, cooking equipment, and full camping gear. Perfect for multi-day expeditions in Akagera or cross-border adventures. Advance booking required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LAND CRUISER MODELS COMPARISON */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Land Cruiser <span className="text-[#1D4ED8]">Model Comparison</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect Land Cruiser for your adventure
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg border border-gray-200">
              <thead>
                <tr className="bg-[#1D4ED8] text-white">
                  <th className="px-6 py-4 text-left rounded-tl-2xl">Model</th>
                  <th className="px-6 py-4 text-left">Engine</th>
                  <th className="px-6 py-4 text-left">Seats</th>
                  <th className="px-6 py-4 text-left">Fuel</th>
                  <th className="px-6 py-4 text-left">Ground Clearance</th>
                  <th className="px-6 py-4 text-left rounded-tr-2xl">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Land Cruiser Prado</td>
                  <td className="px-6 py-4">2.8L Diesel</td>
                  <td className="px-6 py-4">7 seats</td>
                  <td className="px-6 py-4">Diesel</td>
                  <td className="px-6 py-4">220mm</td>
                  <td className="px-6 py-4">Gorilla trekking, family safaris</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Land Cruiser V8</td>
                  <td className="px-6 py-4">4.5L V8 Diesel</td>
                  <td className="px-6 py-4">8 seats</td>
                  <td className="px-6 py-4">Diesel</td>
                  <td className="px-6 py-4">230mm</td>
                  <td className="px-6 py-4">Luxury safaris, big groups</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Land Cruiser 300</td>
                  <td className="px-6 py-4">3.3L V6 Diesel</td>
                  <td className="px-6 py-4">7 seats</td>
                  <td className="px-6 py-4">Diesel</td>
                  <td className="px-6 py-4">235mm</td>
                  <td className="px-6 py-4">Latest tech, premium experience</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Land Cruiser 200</td>
                  <td className="px-6 py-4">4.5L V8 Diesel</td>
                  <td className="px-6 py-4">8 seats</td>
                  <td className="px-6 py-4">Diesel</td>
                  <td className="px-6 py-4">225mm</td>
                  <td className="px-6 py-4">Proven reliability, expeditions</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Land Cruiser 70</td>
                  <td className="px-6 py-4">4.2L Diesel</td>
                  <td className="px-6 py-4">5-7 seats</td>
                  <td className="px-6 py-4">Diesel</td>
                  <td className="px-6 py-4">240mm</td>
                  <td className="px-6 py-4">Hardcore off-road, expeditions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-[#1D4ED8]">Land Cruiser Guests Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                387+ 5-star reviews from Land Cruiser adventures
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
                <p className="text-gray-700 mb-4">"The Land Cruiser V8 was incredible for our Akagera safari. Pop-up roof made game viewing perfect, and the vehicle handled mud tracks effortlessly. Luxury and capability combined."</p>
                <div className="font-bold text-gray-900">Robert & Family</div>
                <div className="text-sm text-gray-500">Land Cruiser V8 • Akagera</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Prado was perfect for gorilla trekking. Handled the steep, muddy roads to Volcanoes with ease. Comfortable for 5 adults with luggage. Would rent again without hesitation."</p>
                <div className="font-bold text-gray-900">Gorilla Trekking Group</div>
                <div className="text-sm text-gray-500">Land Cruiser Prado • Volcanoes NP</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Rented a 70 Series with roof tent for a 2-week expedition. Unstoppable vehicle, went everywhere. Camping gear was complete and quality. The ultimate overland experience."</p>
                <div className="font-bold text-gray-900">Overland Expedition</div>
                <div className="text-sm text-gray-500">Land Cruiser 70 • Cross-border</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Land Cruiser Adventure?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Rent the legendary Toyota Land Cruiser for your Rwanda safari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Land Cruisers
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Land Cruiser Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Land Cruiser Prado • Land Cruiser V8 • 300 Series • 200 Series • 70 Series • Pop-up roofs • Snorkel • Winch
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
