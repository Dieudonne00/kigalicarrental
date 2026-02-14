// app/safari-car-rental-rwanda/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

interface SafariVehicle {
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
  safariRate?: number;
  popUpRoof: boolean;
  gameViewingSeats: boolean;
  roofTent: boolean;
  campingGear: boolean;
  fridge: boolean;
  binoculars: boolean;
  fieldGuides: boolean;
  spotlights: boolean;
  chargingPoints: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  nationalParks: string[];
  wildlifeSpecialty: string[];
  bestFor: string[];
  guideAvailable: boolean;
}

export default function SafariCarRentalRwanda() {
  const [vehicles, setVehicles] = useState<SafariVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPark, setSelectedPark] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([90, 350]);
  const [popUpRoof, setPopUpRoof] = useState(false);
  const [campingGear, setCampingGear] = useState(false);
  const [guideIncluded, setGuideIncluded] = useState(false);

  // Fetch safari vehicles from DB
  useEffect(() => {
    const fetchSafariVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for safari vehicles
        const response = await fetch("/api/cars?safari=true&gameview=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for safari-ready vehicles
          const safariCars = data.cars.filter((car: any) => 
            car.safariReady === true ||
            car.gameViewing === true ||
            car.popUpRoof === true ||
            car.nationalParks?.length > 0 ||
            car.wildlifeSpecialty?.length > 0 ||
            car.brand === 'Toyota' && (car.model?.includes('Land Cruiser') || car.model?.includes('Prado')) ||
            car.brand === 'Land Rover' ||
            car.brand === 'Range Rover'
          );
          setVehicles(safariCars);
          
          if (safariCars.length > 0) {
            const rates = safariCars.map((c: any) => c.safariRate || c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching safari vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafariVehicles();
  }, []);

  // Rwanda's national parks for safari
  const nationalParks = [
    { id: "akagera", name: "Akagera National Park", wildlife: "Big Five (Lion, Leopard, Elephant, Buffalo, Rhino)", bestTime: "June-September", icon: "🦁" },
    { id: "volcanoes", name: "Volcanoes National Park", wildlife: "Mountain Gorillas, Golden Monkeys", bestTime: "June-September & December-February", icon: "🦍" },
    { id: "nyungwe", name: "Nyungwe Forest National Park", wildlife: "Chimpanzees, Colobus Monkeys, 300+ Bird Species", bestTime: "June-August & December-January", icon: "🐒" },
    { id: "gishwati", name: "Gishwati-Mukura National Park", wildlife: "Chimpanzees, Golden Monkeys, Birds", bestTime: "June-September", icon: "🌳" },
  ];

  // Wildlife specialties for filtering
  const wildlifeSpecialties = [
    { id: "all", name: "All Wildlife", icon: "🦓" },
    { id: "gorilla", name: "Gorilla Trekking", icon: "🦍" },
    { id: "bigfive", name: "Big Five Safari", icon: "🦁" },
    { id: "chimpanzee", name: "Chimpanzee Tracking", icon: "🐒" },
    { id: "birding", name: "Bird Watching", icon: "🦜" },
    { id: "primate", name: "Primates", icon: "🐒" },
  ];

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Get unique national parks from data
  const parkOptions = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.nationalParks || [])))];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedPark !== "all" && !vehicle.nationalParks?.includes(selectedPark)) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    if (selectedSpecialty !== "all") {
      if (selectedSpecialty === "gorilla" && !vehicle.wildlifeSpecialty?.includes('gorilla') && !vehicle.bestFor?.includes('gorilla')) return false;
      if (selectedSpecialty === "bigfive" && !vehicle.wildlifeSpecialty?.includes('bigfive') && !vehicle.bestFor?.includes('bigfive')) return false;
      if (selectedSpecialty === "chimpanzee" && !vehicle.wildlifeSpecialty?.includes('chimpanzee') && !vehicle.bestFor?.includes('chimpanzee')) return false;
      if (selectedSpecialty === "birding" && !vehicle.wildlifeSpecialty?.includes('birding') && !vehicle.bestFor?.includes('birding')) return false;
    }
    const rate = vehicle.safariRate || vehicle.dailyRate;
    if (rate < priceRange[0] || rate > priceRange[1]) return false;
    if (popUpRoof && !vehicle.popUpRoof) return false;
    if (campingGear && !vehicle.campingGear && !vehicle.roofTent) return false;
    if (guideIncluded && !vehicle.guideAvailable) return false;
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
    "name": "Safari Car Rental Rwanda - Game Drive Vehicles for Gorilla Trekking & Big Five Safari",
    "description": "Safari car rental in Rwanda for Akagera, Volcanoes & Nyungwe National Parks. Toyota Land Cruiser with pop-up roof, game viewing seats, camping gear. Gorilla trekking vehicles, Big Five safari cars.",
    "url": "https://kigalicarrental.site/safari-car-rental-rwanda",
    "telephone": "+250796077321",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "523"
    },
    "priceRange": "$$$",
    "areaServed": ["Akagera National Park", "Volcanoes National Park", "Nyungwe Forest", "Kigali"],
    "brand": {
      "@type": "Brand",
      "name": "Kigali Car Rental Safari Collection"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Safari Vehicles",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Safari"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Land Rover Safari Vehicle"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Safari Jeep with Pop-up Roof"}}
      ]
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Safari", "item": "https://kigalicarrental.site/safari"},
      {"@type": "ListItem", "position": 3, "name": "Safari Car Rental Rwanda", "item": "https://kigalicarrental.site/safari-car-rental-rwanda"}
    ]
  };

  return (
    <>
      <Head>
        <title>Safari Car Rental Rwanda | Toyota Land Cruiser for Gorilla Trekking & Big Five Safari | Game Drive Vehicles</title>
        <meta name="description" content="✅ Safari car rental Rwanda - Specialized game drive vehicles for Akagera, Volcanoes & Nyungwe National Parks. Toyota Land Cruiser with pop-up roof, game viewing seats, camping gear. Gorilla trekking, chimpanzee tracking, Big Five safari. Book your adventure today." />
        <meta name="keywords" content="safari car rental Rwanda, safari vehicle hire Kigali, game drive vehicle Rwanda, gorilla trekking transport, chimpanzee tracking vehicle, Akagera safari car, Volcanoes National Park 4x4, Nyungwe forest vehicle, Big Five safari Rwanda, pop-up roof safari car, game viewing seats, safari jeep rental, Land Cruiser safari Rwanda, land rover safari vehicle, safari with guide Rwanda, self-drive safari, camping safari vehicle, roof tent safari car, wildlife viewing vehicle, bird watching safari car, primate tracking vehicle, mountain gorilla transport, safari car with fridge, binoculars included safari, field guides safari vehicle, spotlights for night game drive, 4x4 safari rental Rwanda, off-road safari vehicle, national park safari car" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kigalicarrental.site/safari-car-rental-rwanda" />
        <meta property="og:title" content="Safari Car Rental Rwanda | Toyota Land Cruiser for Gorilla Trekking & Big Five Safari" />
        <meta property="og:description" content="Specialized game drive vehicles for Akagera, Volcanoes & Nyungwe National Parks. Pop-up roof, game viewing seats, camping gear. Book your safari adventure." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kigalicarrental.site/safari-car-rental-rwanda" />
        <meta property="twitter:title" content="Safari Car Rental Rwanda | Toyota Land Cruiser for Gorilla Trekking & Big Five Safari" />
        <meta property="twitter:description" content="Specialized game drive vehicles for Akagera, Volcanoes & Nyungwe National Parks. Pop-up roof, game viewing seats." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kigalicarrental.site/safari-car-rental-rwanda" />
        
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
        <meta name="author" content="Kigali Car Rental - Safari Specialists" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - SAFARI ADVENTURE */}
        <div className="relative bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Safari Vehicle */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920" 
              alt="Safari car rental Rwanda - Land Cruiser for gorilla trekking"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#D0D98D] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/safari" className="hover:text-white transition-colors">Safari</Link>
                <span>›</span>
                <span className="text-white">Safari Car Rental Rwanda</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#D0D98D]">Safari Car Rental</span> Rwanda
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Specialized <span className="text-[#D0D98D] font-semibold">game drive vehicles</span> for 
                Akagera, Volcanoes & Nyungwe National Parks. Toyota Land Cruiser with pop-up roof, 
                game viewing seats, and camping gear.
              </p>
              
              {/* KEY SAFARI METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Safari Vehicles</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4</div>
                  <div className="text-xs text-gray-300 mt-1">National Parks</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">100%</div>
                  <div className="text-xs text-gray-300 mt-1">Pop-up Roof Option</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4.9★</div>
                  <div className="text-xs text-gray-300 mt-1">523+ Reviews</div>
                </div>
              </div>
              
              {/* SAFARI BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#D0D98D] text-[#4B5320] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  GORILLA TREKKING • BIG FIVE • CHIMPANZEE TRACKING
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Safari Fleet
                </Link>
                <a
                  href="tel:+250796077321"
                  className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-all text-lg"
                >
                  Safari Hotline: +250 796 077 321
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D0D98D]/10 to-transparent"></div>
        </div>

        {/* NATIONAL PARKS SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rwanda's <span className="text-[#4B5320]">National Parks</span> for Safari
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each park offers unique wildlife experiences. Choose your adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalParks.map((park, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-[#4B5320] hover:shadow-xl transition-all group">
                <div className="h-32 bg-gradient-to-r from-[#4B5320] to-[#3A4218] flex items-center justify-center text-5xl">
                  {park.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#4B5320] transition-colors">
                    {park.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Wildlife:</span> {park.wildlife}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Best Time:</span> {park.bestTime}
                  </p>
                  <button
                    onClick={() => setSelectedPark(park.id)}
                    className="text-sm text-[#4B5320] font-semibold hover:underline"
                  >
                    View vehicles for this park →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAFARI PACKAGES */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Safari <span className="text-[#4B5320]">Experience Packages</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete safari solutions with vehicle, guide, and equipment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Gorilla Trekking Package */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                  <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gorilla Trekking</h3>
                <p className="text-gray-600 mb-4">3-day Volcanoes National Park expedition</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$1,450</span>
                  <span className="text-gray-500">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safari vehicle with pop-up roof
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional gorilla trekking guide
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Gorilla permit included ($1,500 value)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2 nights accommodation
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Binoculars & field guides
                  </li>
                </ul>
                <Link
                  href="/booking/safari?package=gorilla"
                  className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
                >
                  Book Gorilla Safari
                </Link>
              </div>
              
              {/* Big Five Safari - MOST POPULAR */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  MOST POPULAR
                </div>
                <div className="w-16 h-16 bg-[#4B5320] rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Big Five Safari</h3>
                <p className="text-gray-600 mb-4">3-day Akagera wildlife adventure</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$890</span>
                  <span className="text-gray-500">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safari vehicle with pop-up roof
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Expert safari guide/tracker
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Morning & evening game drives
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Boat safari on Lake Ihema
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Park fees & accommodation
                  </li>
                </ul>
                <Link
                  href="/booking/safari?package=bigfive"
                  className="block w-full text-center px-6 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3A4218] transition-all"
                >
                  Book Big Five Safari
                </Link>
              </div>
              
              {/* Chimpanzee Tracking Package */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                  <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chimpanzee Tracking</h3>
                <p className="text-gray-600 mb-4">4-day Nyungwe Forest expedition</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$950</span>
                  <span className="text-gray-500">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    4x4 safari vehicle
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Primate tracking guide
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Chimpanzee tracking permit
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Canopy walk experience
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accommodation & meals
                  </li>
                </ul>
                <Link
                  href="/booking/safari?package=chimpanzee"
                  className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
                >
                  Book Chimpanzee Safari
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#4B5320]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
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
                  {parkOptions.filter(p => p !== 'all').map(park => (
                    <option key={park} value={park}>{park}</option>
                  ))}
                </select>
              </div>
              
              {/* Wildlife Specialty Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Wildlife Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {wildlifeSpecialties.map(specialty => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.icon} {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Seats Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Group Size
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {seatOptions.map(seat => (
                    <option key={seat} value={seat}>
                      {seat === 'all' ? 'Any' : `${seat} People`}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Safari Vehicle Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={80}
                    max={400}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#4B5320]"
                  />
                  <input
                    type="range"
                    min={80}
                    max={400}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#4B5320] mt-2"
                  />
                </div>
              </div>
              
              {/* Safari Equipment */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Safari Equipment
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
                      checked={guideIncluded}
                      onChange={(e) => setGuideIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Guide Available</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#4B5320] text-lg">{filteredVehicles.length}</span> safari vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedPark('all');
                    setSelectedSpecialty('all');
                    setSelectedSeats('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.safariRate || v.dailyRate);
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
              <p className="mt-6 text-gray-600 text-lg">Loading safari vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No safari vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our safari specialists for custom requirements.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedPark('all');
                    setSelectedSpecialty('all');
                    setSelectedSeats('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.safariRate || v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#4B5320] text-white font-semibold rounded-lg hover:bg-[#3A4218] transition-colors"
                >
                  View All Safari Vehicles
                </button>
                <a
                  href="tel:+250796077321"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Safari Specialists
                </a>
              </div>
            </div>
          )}

          {/* SAFARI VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Safari <span className="text-[#4B5320]">Vehicle Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} safari-ready vehicles</p>
                </div>
                <div className="bg-[#4B5320]/10 text-[#4B5320] px-4 py-2 rounded-lg text-sm font-bold border border-[#4B5320]/20">
                  {filteredVehicles.length} Ready for Safari
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const rate = vehicle.safariRate || vehicle.dailyRate;
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#4B5320] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Safari car rental Rwanda`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/safari-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* SAFARI BADGE */}
                        <div className="absolute top-4 left-4 bg-[#4B5320] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          SAFARI READY
                        </div>
                        
                        {/* POP-UP ROOF BADGE */}
                        {vehicle.popUpRoof && (
                          <div className="absolute top-4 right-4 bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            🏕️ POP-UP ROOF
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
                              <div className="text-xs text-gray-500">Fuel</div>
                              <div className="font-bold text-gray-800">{vehicle.fuelType}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Transmission</div>
                              <div className="font-bold text-gray-800">{vehicle.transmission}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* NATIONAL PARKS */}
                        <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">National Parks:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.nationalParks?.map((park, idx) => (
                              <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                                {park}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* SAFARI EQUIPMENT */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {vehicle.popUpRoof && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Pop-up Roof">
                              <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.gameViewingSeats && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Game Viewing Seats">
                              <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.fridge && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Fridge">
                              <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.binoculars && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Binoculars">
                              <svg className="w-4 h-4 text-[#4B5320] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* WILDLIFE SPECIALTY */}
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
                              <span className="text-xs text-gray-500">Safari Vehicle Rate</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#4B5320]">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Guide Available</span>
                              <div className="text-sm font-bold text-gray-800">{vehicle.guideAvailable ? '✓ Yes' : '✗ Self-drive'}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/safari?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-[#4B5320] text-white text-sm font-bold rounded-lg hover:bg-[#3A4218] transition-all text-center"
                          >
                            Book Safari Vehicle
                          </Link>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="px-4 py-3 border-2 border-[#4B5320] text-[#4B5320] text-sm font-bold rounded-lg hover:bg-[#4B5320]/5 transition-all text-center"
                          >
                            View Details
                          </Link>
                        </div>
                        
                        {/* SAFARI NOTE */}
                        {vehicle.spotlights && (
                          <div className="mt-3 text-[10px] text-[#4B5320] text-center font-semibold">
                            ✓ Night game drive spotlights • Full safari equipment
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* WHY CHOOSE SAFARI CAR RENTAL */}
        <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our <span className="text-[#D0D98D]">Safari Vehicles</span>
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Purpose-built for wildlife viewing and Rwanda's national parks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Pop-up Roofs</h3>
                <p className="text-gray-300 text-sm">Stand-up game viewing, 360° wildlife photography</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Game Viewing Seats</h3>
                <p className="text-gray-300 text-sm">Raised seats for optimal wildlife viewing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Binoculars Included</h3>
                <p className="text-gray-300 text-sm">High-quality binoculars for every passenger</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Camping Ready</h3>
                <p className="text-gray-300 text-sm">Roof tents, fridges, full camping gear available</p>
              </div>
            </div>
          </div>
        </div>

        {/* SAFARI FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Safari Car Rental Rwanda - <span className="text-[#4B5320]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about safari vehicle rental in Rwanda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What makes a vehicle safari-ready?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Safari-ready vehicles have pop-up roofs for game viewing, raised seats, 4x4 capability for off-road tracks, and are equipped with binoculars, field guides, and charging points. Many also have fridges for drinks and snacks during long game drives.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Which vehicle is best for gorilla trekking?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toyota Land Cruiser or Land Rover Defender are ideal for gorilla trekking. They handle the steep, muddy roads to trekking start points and have high ground clearance. Pop-up roofs aren't needed for gorillas but are great for other game viewing.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer guided safari packages?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! We offer fully guided safari packages with experienced driver-guides who know the parks, animal behavior, and best viewing spots. Packages include vehicle, guide, park fees, accommodation, and meals.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What camping equipment is available?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our camping-equipped vehicles include roof tents, sleeping bags, mattresses, portable fridges, cooking equipment, tables, chairs, and lighting. Perfect for multi-day safari expeditions in Akagera or cross-border adventures.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I self-drive in national parks?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, self-drive is allowed in Akagera National Park. The park has well-marked tracks and maps. Volcanoes and Nyungwe require guides for trekking activities, but you can self-drive to the park gates. We provide detailed park information.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is included in the safari package price?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Safari package prices include vehicle rental, professional guide, park entry fees, activity permits (gorilla/chimpanzee), accommodation, meals, and drinking water. Prices vary by package duration and inclusions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SAFARI WILDLIFE GALLERY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wildlife You'll See on <span className="text-[#4B5320]">Rwanda Safari</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From mountain gorillas to the Big Five - all from your safari vehicle
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦍</div>
              <div className="font-bold text-gray-800">Mountain Gorilla</div>
              <div className="text-xs text-gray-500 mt-1">Volcanoes NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦁</div>
              <div className="font-bold text-gray-800">Lion</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐘</div>
              <div className="font-bold text-gray-800">Elephant</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦏</div>
              <div className="font-bold text-gray-800">Rhino</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐆</div>
              <div className="font-bold text-gray-800">Leopard</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦓</div>
              <div className="font-bold text-gray-800">Zebra</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦒</div>
              <div className="font-bold text-gray-800">Giraffe</div>
              <div className="text-xs text-gray-500 mt-1">Akagera NP</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">Chimpanzee</div>
              <div className="text-xs text-gray-500 mt-1">Nyungwe NP</div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-[#4B5320]">Safari Guests Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                523+ 5-star reviews from unforgettable safari experiences
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
                <p className="text-gray-700 mb-4">"The Land Cruiser with pop-up roof was perfect for Akagera. We saw lions, elephants, and giraffes up close. Standing through the roof for photos was amazing. Vehicle was clean and well-equipped."</p>
                <div className="font-bold text-gray-900">Jennifer & Mark</div>
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
                <p className="text-gray-700 mb-4">"Our gorilla trekking package was incredible. The vehicle handled the steep muddy roads perfectly. Guide Jean knew exactly where to go. Seeing gorillas in the wild was life-changing."</p>
                <div className="font-bold text-gray-900">Gorilla Trekking Group</div>
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
                <p className="text-gray-700 mb-4">"Rented a Land Cruiser with roof tent for a week. Camped inside Akagera - woke up to zebras outside! The fridge kept our food cold, and the pop-up roof was great for evening game viewing. Best adventure ever!"</p>
                <div className="font-bold text-gray-900">Adventure Couple</div>
                <div className="text-sm text-gray-500">Camping Safari • Akagera</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#D0D98D]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Rwanda Safari?
            </h2>
            <p className="text-xl text-[#D0D98D] mb-8 max-w-2xl mx-auto">
              Book your safari vehicle today. Gorilla trekking, Big Five, chimpanzee tracking - we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Safari Fleet
              </Link>
              <a
                href="tel:+250796077321"
                className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-colors text-lg"
              >
                Safari Hotline: +250 796 077 321
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Gorilla trekking • Big Five safari • Chimpanzee tracking • Pop-up roofs • Game viewing seats • Camping gear
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
