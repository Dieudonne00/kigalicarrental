// app/prado-rental-kigali/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

interface PradoVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  generation: string;
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
  bullBar: boolean;
  leatherSeats: boolean;
  sunroof: boolean;
  bluetooth: boolean;
  reverseCamera: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  nationalParks: string[];
  bestFor: string[];
  guideAvailable: boolean;
}

export default function PradoRentalKigali() {
  const [vehicles, setVehicles] = useState<PradoVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGeneration, setSelectedGeneration] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedPark, setSelectedPark] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([120, 250]);
  const [popUpRoof, setPopUpRoof] = useState(false);
  const [campingGear, setCampingGear] = useState(false);
  const [leatherSeats, setLeatherSeats] = useState(false);

  // Fetch Prado vehicles from DB
  useEffect(() => {
    const fetchPradoVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for Prado vehicles
        const response = await fetch("/api/cars?prado=true&landcruiser=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for Prado models
          const pradoCars = data.cars.filter((car: any) => 
            car.brand === 'Toyota' && (
              car.model?.toLowerCase().includes('prado') ||
              car.name?.toLowerCase().includes('prado') ||
              car.model?.toLowerCase().includes('land cruiser prado')
            )
          );
          setVehicles(pradoCars);
          
          if (pradoCars.length > 0) {
            const rates = pradoCars.map((c: any) => c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching Prado vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPradoVehicles();
  }, []);

  // Prado generations
  const pradoGenerations = [
    { id: "all", name: "All Prado Generations", icon: "🚙" },
    { id: "150", name: "Prado 150 Series (2010-2024)", icon: "🚙" },
    { id: "120", name: "Prado 120 Series (2003-2009)", icon: "🚙" },
    { id: "90", name: "Prado 90 Series (1996-2002)", icon: "🚙" },
  ];

  // Rwanda's national parks
  const nationalParks = [
    { id: "akagera", name: "Akagera National Park" },
    { id: "volcanoes", name: "Volcanoes National Park" },
    { id: "nyungwe", name: "Nyungwe Forest" },
    { id: "gishwati", name: "Gishwati-Mukura" },
  ];

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedGeneration !== "all") {
      if (selectedGeneration === "150" && !vehicle.generation?.includes('150') && vehicle.year >= 2010) return false;
      if (selectedGeneration === "120" && vehicle.year >= 2003 && vehicle.year <= 2009) return true;
      if (selectedGeneration === "90" && vehicle.year <= 2002) return true;
    }
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    if (selectedPark !== "all" && !vehicle.nationalParks?.includes(selectedPark)) return false;
    if (vehicle.dailyRate < priceRange[0] || vehicle.dailyRate > priceRange[1]) return false;
    if (popUpRoof && !vehicle.popUpRoof) return false;
    if (campingGear && !vehicle.campingGear && !vehicle.roofTent) return false;
    if (leatherSeats && !vehicle.leatherSeats) return false;
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
    "name": "Prado Rental Kigali - Toyota Land Cruiser Prado for Safari & Gorilla Trekking",
    "description": "Toyota Land Cruiser Prado rental in Kigali for safari, gorilla trekking, and national park adventures. 7-seater luxury SUV with 4x4 capability. Pop-up roofs, camping gear, leather interiors. Perfect for Akagera, Volcanoes & Nyungwe.",
    "url": "https://kigalicarrental.site/prado-rental-kigali",
    "telephone": "+250796077321",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "312"
    },
    "priceRange": "$$$",
    "areaServed": ["Kigali", "Akagera National Park", "Volcanoes National Park", "Nyungwe Forest", "Rwanda"],
    "brand": {
      "@type": "Brand",
      "name": "Toyota Land Cruiser Prado"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Prado Models",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Prado 150 Series"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Prado 120 Series"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Prado TX"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Prado VX"}}
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
      {"@type": "ListItem", "position": 3, "name": "Prado Rental Kigali", "item": "https://kigalicarrental.site/prado-rental-kigali"}
    ]
  };

  return (
    <>
      <Head>
        <title>Prado Rental Kigali | Toyota Land Cruiser Prado for Safari & Gorilla Trekking | 4x4 SUV Hire Rwanda</title>
        <meta name="description" content="✅ Prado rental Kigali - Toyota Land Cruiser Prado for safari, gorilla trekking & national park adventures. 7-seater luxury SUV with 4x4 capability. Pop-up roofs, camping gear, leather interiors. Perfect for Akagera, Volcanoes & Nyungwe. Book your Prado today." />
        <meta name="keywords" content="prado rental Kigali, Toyota Prado hire Rwanda, Land Cruiser Prado rental, Prado for gorilla trekking, Prado safari vehicle, 4x4 Prado Kigali, 7 seater Prado rental, luxury SUV Rwanda, Prado Akagera, Prado Volcanoes National Park, Prado Nyungwe, Prado with pop-up roof, Prado with roof tent, camping equipped Prado, leather interior Prado, automatic Prado rental, diesel Prado Rwanda, Prado TX rental, Prado VX rental, Prado 150 series, Prado for family safari, best Prado rental Kigali, affordable Prado hire, luxury Prado safari, self-drive Prado, guided safari Prado" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kigalicarrental.site/prado-rental-kigali" />
        <meta property="og:title" content="Prado Rental Kigali | Toyota Land Cruiser Prado for Safari & Gorilla Trekking" />
        <meta property="og:description" content="Toyota Land Cruiser Prado rental for safari and national park adventures. 7-seater luxury SUV with 4x4 capability. Pop-up roofs, camping gear." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kigalicarrental.site/prado-rental-kigali" />
        <meta property="twitter:title" content="Prado Rental Kigali | Toyota Land Cruiser Prado for Safari" />
        <meta property="twitter:description" content="Toyota Land Cruiser Prado rental for safari and national park adventures. 7-seater luxury SUV with 4x4 capability." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kigalicarrental.site/prado-rental-kigali" />
        
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
        <meta name="author" content="Kigali Car Rental - Prado Specialists" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - PRADO */}
        <div className="relative bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Prado */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920" 
              alt="Toyota Land Cruiser Prado rental Kigali - Safari vehicle"
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
                <span className="text-white">Prado Rental Kigali</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#D0D98D]">Prado Rental</span> Kigali
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-[#D0D98D] font-semibold">Toyota Land Cruiser Prado</span> - The perfect 
                4x4 SUV for safari, gorilla trekking, and national park adventures. 7-seater luxury with 
                legendary reliability.
              </p>
              
              {/* KEY PRADO METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Prado Vehicles</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">3</div>
                  <div className="text-xs text-gray-300 mt-1">Generations</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">7</div>
                  <div className="text-xs text-gray-300 mt-1">Seats</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4.8★</div>
                  <div className="text-xs text-gray-300 mt-1">312+ Reviews</div>
                </div>
              </div>
              
              {/* PRADO BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#D0D98D] text-[#4B5320] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  RWANDA'S FAVORITE SAFARI SUV
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Prado Fleet
                </Link>
                <a
                  href="tel:+250796077321"
                  className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-all text-lg"
                >
                  Prado Hotline: +250 796 077 321
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D0D98D]/10 to-transparent"></div>
        </div>

        {/* PRADO GENERATIONS STRIP */}
        <div className="bg-[#4B5320] border-y border-[#6B7F3A]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {pradoGenerations.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => setSelectedGeneration(gen.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedGeneration === gen.id
                      ? "bg-[#D0D98D] text-[#4B5320] shadow-lg"
                      : "bg-[#4B5320]/40 text-white hover:bg-[#4B5320]/60 border border-[#D0D98D]/30"
                  }`}
                >
                  <span className="mr-2">{gen.icon}</span>
                  {gen.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRADO PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prado <span className="text-[#4B5320]">Safari Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your Prado experience - from gorilla trekking to luxury safaris
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prado Standard Package */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prado Standard</h3>
              <p className="text-gray-600 mb-4">Reliable 4x4 for gorilla trekking & parks</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$125</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  2.8L Diesel • Automatic
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7 seats • Fabric interior
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Bluetooth • Reverse camera
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Perfect for Volcanoes NP
                </li>
              </ul>
              <Link
                href="/booking/prado?package=standard"
                className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
              >
                Rent Standard Prado
              </Link>
            </div>
            
            {/* Prado Safari Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#4B5320] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prado Safari</h3>
              <p className="text-gray-600 mb-4">Pop-up roof • Game viewing • Safari ready</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$165</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
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
                  Raised safari seats
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fridge • Binoculars included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ideal for Akagera safaris
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Leather interior • Sunroof
                </li>
              </ul>
              <Link
                href="/booking/prado?package=safari"
                className="block w-full text-center px-6 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3A4218] transition-all"
              >
                Rent Safari Prado
              </Link>
            </div>
            
            {/* Prado Luxury Package */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prado Luxury</h3>
              <p className="text-gray-600 mb-4">Executive comfort with camping gear</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$195</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium leather interior
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Roof tent • Camping gear
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fridge • Cooking equipment
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-day expedition ready
                </li>
              </ul>
              <Link
                href="/booking/prado?package=luxury"
                className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
              >
                Rent Luxury Prado
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#4B5320]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Generation Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Prado Generation
                </label>
                <select
                  value={selectedGeneration}
                  onChange={(e) => setSelectedGeneration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {pradoGenerations.map(gen => (
                    <option key={gen.id} value={gen.id}>{gen.name}</option>
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
              
              {/* National Park Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  National Park
                </label>
                <select
                  value={selectedPark}
                  onChange={(e) => setSelectedPark(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  <option value="all">All National Parks</option>
                  {nationalParks.map(park => (
                    <option key={park.id} value={park.id}>{park.name}</option>
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
                    min={100}
                    max={280}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#4B5320]"
                  />
                  <input
                    type="range"
                    min={100}
                    max={280}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#4B5320] mt-2"
                  />
                </div>
              </div>
              
              {/* Prado Features */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popUpRoof}
                      onChange={(e) => setPopUpRoof(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Pop-up Roof</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={campingGear}
                      onChange={(e) => setCampingGear(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Camping Gear</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={leatherSeats}
                      onChange={(e) => setLeatherSeats(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Leather Seats</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#4B5320] text-lg">{filteredVehicles.length}</span> Prado vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedGeneration('all');
                    setSelectedSeats('all');
                    setSelectedPark('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setLeatherSeats(false);
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
              <p className="mt-6 text-gray-600 text-lg">Loading Prado vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Prado vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our Prado specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedGeneration('all');
                    setSelectedSeats('all');
                    setSelectedPark('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setLeatherSeats(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#4B5320] text-white font-semibold rounded-lg hover:bg-[#3A4218] transition-colors"
                >
                  View All Prados
                </button>
                <a
                  href="tel:+250796077321"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Prado Specialists
                </a>
              </div>
            </div>
          )}

          {/* PRADO GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Prado <span className="text-[#4B5320]">Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} Toyota Land Cruiser Prado vehicles available in Kigali</p>
                </div>
                <div className="bg-[#4B5320]/10 text-[#4B5320] px-4 py-2 rounded-lg text-sm font-bold border border-[#4B5320]/20">
                  {filteredVehicles.length} Ready for Safari
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
                        alt={`Toyota Land Cruiser Prado ${vehicle.variant} - Prado rental Kigali`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/prado-placeholder.jpg';
                        }}
                      />
                      
                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* PRADO BADGE */}
                      <div className="absolute top-4 left-4 bg-[#4B5320] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        PRADO
                      </div>
                      
                      {/* YEAR BADGE */}
                      <div className="absolute top-4 right-4 bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {vehicle.year}
                      </div>
                      
                      {/* VEHICLE INFO */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">Toyota Land Cruiser Prado {vehicle.variant}</div>
                        <div className="text-sm text-gray-300">{vehicle.engine} • {vehicle.seats} seats</div>
                      </div>
                    </div>
                    
                    {/* DETAILS SECTION */}
                    <div className="p-6">
                      {/* ENGINE & SPECS */}
                      <div className="bg-[#4B5320]/5 rounded-lg p-4 mb-4 border border-[#4B5320]/20">
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
                            <div className="text-xs text-gray-500">Fuel</div>
                            <div className="font-bold text-gray-800">{vehicle.fuelType}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Transmission</div>
                            <div className="font-bold text-gray-800">{vehicle.transmission}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* PRADO FEATURES */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {vehicle.popUpRoof && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Pop-up Roof">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.leatherSeats && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Leather Seats">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.sunroof && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Sunroof">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                        )}
                        {vehicle.fridge && (
                          <div className="bg-gray-50 rounded-lg p-2 text-center" title="Fridge">
                            <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* NATIONAL PARKS */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Perfect for:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.nationalParks?.map((park, idx) => (
                            <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                              {park}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* BEST FOR */}
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-700 mb-2">Best for:</div>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.bestFor?.map((item, idx) => (
                            <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                              {item}
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
                          href={`/booking/prado?vehicle=${vehicle.id}`}
                          className="px-4 py-3 bg-[#4B5320] text-white text-sm font-bold rounded-lg hover:bg-[#3A4218] transition-all text-center"
                        >
                          Rent Prado
                        </Link>
                        <Link
                          href={`/vehicles/${vehicle.id}`}
                          className="px-4 py-3 border-2 border-[#4B5320] text-[#4B5320] text-sm font-bold rounded-lg hover:bg-[#4B5320]/5 transition-all text-center"
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

        {/* WHY CHOOSE PRADO */}
        <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-[#D0D98D]">Prado</span> for Your Rwanda Adventure
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                The perfect balance of luxury, capability, and comfort for Rwandan roads
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Perfect Size</h3>
                <p className="text-gray-300 text-sm">7 seats • Comfortable for families and groups</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Proven Reliability</h3>
                <p className="text-gray-300 text-sm">Legendary Toyota durability for remote areas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Luxury Comfort</h3>
                <p className="text-gray-300 text-sm">Leather seats, climate control, premium sound</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Safari Ready</h3>
                <p className="text-gray-300 text-sm">Pop-up roofs, camping gear, fridge available</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRADO FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prado Rental Kigali - <span className="text-[#4B5320]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about renting a Prado in Kigali
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is Prado good for gorilla trekking?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! The Prado is the most popular vehicle for gorilla trekking in Volcanoes National Park. Its size is perfect for the steep, muddy roads, and it offers excellent comfort for the 2-3 hour drive from Kigali.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How many people fit in a Prado?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Prado comfortably seats 7 passengers with luggage. For gorilla trekking, we recommend 5-6 passengers plus luggage for optimal comfort. The third row folds to create ample cargo space.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the fuel consumption of a Prado?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Prado diesel models average 10-12 km/l, making them economical for long safaris. A full tank gives you approximately 800-900 km range - enough for Kigali to Akagera and back with plenty to spare.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I get a Prado with pop-up roof?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Many of our Prados have pop-up roofs installed for game viewing. Perfect for Akagera safaris where you can stand to photograph wildlife. Just select the "Pop-up Roof" filter to see available vehicles.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the difference between Prado TX and VX?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  TX is the standard version with fabric seats and essential features. VX adds leather seats, sunroof, climate control, and premium sound system. Both have the same powerful engine and 4x4 capability.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is Prado good for self-drive safari?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! The Prado is the perfect self-drive safari vehicle. It's easy to drive, has great visibility, and handles all road conditions. We provide detailed route guides and 24/7 support for self-drive clients.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRADO VS OTHER VEHICLES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prado vs Other <span className="text-[#4B5320]">Safari Vehicles</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Why the Prado is Rwanda's most popular safari rental
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg border border-gray-200">
              <thead>
                <tr className="bg-[#4B5320] text-white">
                  <th className="px-6 py-4 text-left rounded-tl-2xl">Vehicle</th>
                  <th className="px-6 py-4 text-left">Seats</th>
                  <th className="px-6 py-4 text-left">Fuel Economy</th>
                  <th className="px-6 py-4 text-left">Off-Road</th>
                  <th className="px-6 py-4 text-left">Comfort</th>
                  <th className="px-6 py-4 text-left">Price/Day</th>
                  <th className="px-6 py-4 text-left rounded-tr-2xl">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 hover:bg-gray-50 bg-[#4B5320]/5">
                  <td className="px-6 py-4 font-bold text-[#4B5320]">Toyota Prado</td>
                  <td className="px-6 py-4">7 seats</td>
                  <td className="px-6 py-4">⭐ 10-12 km/l</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐⭐</td>
                  <td className="px-6 py-4 font-bold">$125-195</td>
                  <td className="px-6 py-4">All-rounder • Most popular</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Toyota Land Cruiser V8</td>
                  <td className="px-6 py-4">8 seats</td>
                  <td className="px-6 py-4">8-10 km/l</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">$195-250</td>
                  <td className="px-6 py-4">Large groups, luxury</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Toyota Hilux</td>
                  <td className="px-6 py-4">5 seats</td>
                  <td className="px-6 py-4">12-14 km/l</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">⭐⭐⭐</td>
                  <td className="px-6 py-4">$85-120</td>
                  <td className="px-6 py-4">Budget, camping</td>
                </tr>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">Land Rover Defender</td>
                  <td className="px-6 py-4">5-7 seats</td>
                  <td className="px-6 py-4">8-10 km/l</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">⭐⭐⭐⭐</td>
                  <td className="px-6 py-4">$165-220</td>
                  <td className="px-6 py-4">Classic safari style</td>
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
                What Our <span className="text-[#4B5320]">Prado Guests Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                312+ 5-star reviews from Prado adventures
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
                <p className="text-gray-700 mb-4">"Our Prado was perfect for gorilla trekking. Handled the muddy roads easily, plenty of space for 5 of us with luggage. Comfortable ride and great fuel economy. Highly recommend!"</p>
                <div className="font-bold text-gray-900">The Mitchell Family</div>
                <div className="text-sm text-gray-500">Gorilla Trekking • Volcanoes NP</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Rented a Prado VX for our Akagera safari. The pop-up roof was amazing for game viewing, leather seats were luxurious, and the fridge kept our drinks cold. Best safari vehicle we've driven."</p>
                <div className="font-bold text-gray-900">Safari Enthusiasts</div>
                <div className="text-sm text-gray-500">Akagera • Self-drive Safari</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Used a Prado for our 5-day trip combining Volcanoes, Akagera, and Nyungwe. Never missed a beat, comfortable for long drives, and the team at Kigali Car Rental was incredibly helpful. Will rent again."</p>
                <div className="font-bold text-gray-900">Adventure Travelers</div>
                <div className="text-sm text-gray-500">Multi-park safari</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#D0D98D]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Prado Adventure?
            </h2>
            <p className="text-xl text-[#D0D98D] mb-8 max-w-2xl mx-auto">
              Rent the legendary Toyota Land Cruiser Prado for your Rwanda journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Prado Fleet
              </Link>
              <a
                href="tel:+250796077321"
                className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-colors text-lg"
              >
                Prado Hotline: +250 796 077 321
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Prado 150 Series • Prado 120 Series • Prado TX • Prado VX • Pop-up roofs • Leather seats • Safari ready
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
