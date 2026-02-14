// app/nyungwe-forest-safari/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

interface NyungweSafariVehicle {
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
  forestTerrain: boolean;
  muddyRoadCapable: boolean;
  longDistanceComfort: boolean;
  highClearance: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  primateTracking: boolean;
  canopyWalkAccess: boolean;
  birdWatching: boolean;
  hikingSupport: boolean;
  bestFor: string[];
  guideAvailable: boolean;
  parkEntryAssistance: boolean;
}

export default function NyungweForestSafari() {
  const [vehicles, setVehicles] = useState<NyungweSafariVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([80, 280]);
  const [highClearance, setHighClearance] = useState(false);
  const [longDistance, setLongDistance] = useState(false);
  const [guideIncluded, setGuideIncluded] = useState(false);

  // Fetch Nyungwe safari vehicles from DB
  useEffect(() => {
    const fetchNyungweVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for Nyungwe Forest vehicles
        const response = await fetch("/api/cars?nyungwe=true&safari=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for vehicles suitable for Nyungwe Forest
          const nyungweCars = data.cars.filter((car: any) => 
            car.nationalParks?.includes('Nyungwe') ||
            car.bestFor?.includes('Nyungwe') ||
            car.bestFor?.includes('chimpanzee tracking') ||
            car.bestFor?.includes('bird watching') ||
            car.forestTerrain === true ||
            car.longDistanceComfort === true ||
            car.brand === 'Toyota' && (car.model?.includes('Land Cruiser') || car.model?.includes('Prado') || car.model?.includes('Hilux')) ||
            car.brand === 'Land Rover' ||
            car.brand === 'Range Rover'
          );
          setVehicles(nyungweCars);
          
          if (nyungweCars.length > 0) {
            const rates = nyungweCars.map((c: any) => c.safariRate || c.dailyRate);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching Nyungwe Forest vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNyungweVehicles();
  }, []);

  // Vehicle brands for filtering
  const vehicleBrands = ["all", ...Array.from(new Set(vehicles.map(v => v.brand)))].filter(b => b !== 'all');

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Activity options
  const activityOptions = [
    { id: "all", name: "All Activities", icon: "🌳" },
    { id: "chimpanzee", name: "Chimpanzee Tracking", icon: "🐒" },
    { id: "canopy", name: "Canopy Walk", icon: "🌉" },
    { id: "birding", name: "Bird Watching", icon: "🦜" },
    { id: "hiking", name: "Hiking", icon: "🥾" },
  ];

  // Nyungwe Forest information
  const nyungweInfo = {
    location: "Southern Province, near Cyangugu",
    distance: "220 km from Kigali • 5 hours drive",
    size: "1,019 km² of montane rainforest",
    elevation: "1,600m - 2,950m",
    attractions: "Chimpanzees, 13 primate species, 300+ bird species, canopy walk",
    bestTime: "June-August & December-January (dry seasons)",
    entryFee: "$50 per person (foreign non-resident)",
    activities: "Chimpanzee tracking, canopy walk, colobus monkey tracking, bird watching, hiking trails"
  };

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    if (selectedActivity !== "all") {
      if (selectedActivity === "chimpanzee" && !vehicle.primateTracking) return false;
      if (selectedActivity === "canopy" && !vehicle.canopyWalkAccess) return false;
      if (selectedActivity === "birding" && !vehicle.birdWatching) return false;
      if (selectedActivity === "hiking" && !vehicle.hikingSupport) return false;
    }
    const rate = vehicle.safariRate || vehicle.dailyRate;
    if (rate < priceRange[0] || rate > priceRange[1]) return false;
    if (highClearance && !vehicle.highClearance) return false;
    if (longDistance && !vehicle.longDistanceComfort) return false;
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
    "name": "Nyungwe Forest Safari - Chimpanzee Tracking & Canopy Walk Vehicles",
    "description": "Rent safari vehicles for Nyungwe Forest National Park. Toyota Land Cruiser, Prado for chimpanzee tracking, canopy walk, bird watching. Long-distance comfort for 5-hour drive from Kigali. Book your Nyungwe adventure.",
    "url": "https://kigalicarrental.site/nyungwe-forest-safari",
    "telephone": "+250796077321",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "187"
    },
    "priceRange": "$$$",
    "areaServed": ["Nyungwe Forest National Park", "Kigali", "Rwanda"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nyungwe Safari Vehicles",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser for Nyungwe"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Prado for Forest Terrain"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Comfort SUV for Long Distance"}}
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
      {"@type": "ListItem", "position": 3, "name": "Nyungwe Forest Safari", "item": "https://kigalicarrental.site/nyungwe-forest-safari"}
    ]
  };

  return (
    <>
      <Head>
        <title>Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk Vehicles | Toyota Land Cruiser Rental</title>
        <meta name="description" content="✅ Nyungwe Forest safari - Rent vehicles for chimpanzee tracking and canopy walk in Nyungwe National Park. Toyota Land Cruiser, Prado with high clearance for forest terrain. 5-hour drive from Kigali. Bird watching, colobus monkeys. Book your Nyungwe adventure today." />
        <meta name="keywords" content="nyungwe forest safari, nyungwe national park vehicle hire, chimpanzee tracking transport, nyungwe canopy walk vehicle, nyungwe forest 4x4, chimpanzee tracking car, colobus monkey tracking vehicle, nyungwe bird watching car, nyungwe forest drive, nyungwe from kigali transport, toyota land cruiser nyungwe, toyota prado nyungwe, forest terrain 4x4, muddy road capable vehicle, long distance comfort car, nyungwe forest guide, nyungwe forest entry, primate tracking rwanda, bird watching rwanda, nyungwe hiking vehicle, best vehicle for nyungwe, nyungwe wet season vehicle, nyungwe dry season safari, nyungwe accommodation transport" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kigalicarrental.site/nyungwe-forest-safari" />
        <meta property="og:title" content="Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk Vehicles" />
        <meta property="og:description" content="Rent vehicles for chimpanzee tracking and canopy walk in Nyungwe National Park. Toyota Land Cruiser with high clearance for forest terrain." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kigalicarrental.site/nyungwe-forest-safari" />
        <meta property="twitter:title" content="Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk" />
        <meta property="twitter:description" content="Rent vehicles for chimpanzee tracking and canopy walk in Nyungwe National Park." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kigalicarrental.site/nyungwe-forest-safari" />
        
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
        <meta name="author" content="Kigali Car Rental - Nyungwe Safari Specialists" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - NYUNGWE FOREST */}
        <div className="relative bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Nyungwe Forest */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920" 
              alt="Nyungwe Forest safari - Chimpanzee tracking vehicle in Nyungwe National Park"
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
                <span className="text-white">Nyungwe Forest Safari</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#D0D98D]">Nyungwe Forest</span> Safari
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-[#D0D98D] font-semibold">Chimpanzee tracking & canopy walk</span> vehicles 
                for Nyungwe National Park. Toyota Land Cruiser, Prado with high clearance for forest terrain. 
                5-hour drive from Kigali.
              </p>
              
              {/* KEY NYUNGWE METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Safari Vehicles</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">5 hrs</div>
                  <div className="text-xs text-gray-300 mt-1">From Kigali</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">13</div>
                  <div className="text-xs text-gray-300 mt-1">Primate Species</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4.8★</div>
                  <div className="text-xs text-gray-300 mt-1">187+ Reviews</div>
                </div>
              </div>
              
              {/* NYUNGWE BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#D0D98D] text-[#4B5320] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  CHIMPANZEE TRACKING • CANOPY WALK • 300+ BIRD SPECIES
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Safari Vehicles
                </Link>
                <a
                  href="tel:+250796077321"
                  className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-all text-lg"
                >
                  Nyungwe Hotline: +250 796 077 321
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D0D98D]/10 to-transparent"></div>
        </div>

        {/* NYUNGWE INFORMATION STRIP */}
        <div className="bg-[#4B5320] border-y border-[#6B7F3A]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">220 km from Kigali • 5 hrs drive</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Best time: June-August, December-January</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Park entry: $50 p/p</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVITY SELECTOR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {activityOptions.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedActivity === activity.id
                      ? "bg-[#4B5320] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{activity.icon}</span>
                  {activity.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NYUNGWE SAFARI PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nyungwe <span className="text-[#4B5320]">Safari Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete packages for chimpanzee tracking, canopy walk & bird watching
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chimpanzee Tracking Package */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Chimpanzee Tracking</h3>
              <p className="text-gray-600 mb-4">3-day  tracking adventure</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$950</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 vehicle with driver (3 days)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Chimpanzee tracking permit not included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional primate guide
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free soft drinks
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park entry fees not included
                </li>
              </ul>
              <Link
                href="/booking/nyungwe?package=chimpanzee"
                className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
              >
                Book Chimpanzee Tracking
              </Link>
            </div>
            
            {/* Canopy Walk Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#4B5320] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Canopy Walk Experience</h3>
              <p className="text-gray-600 mb-4">2-day forest adventure</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$680</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Comfortable 4x4 vehicle
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Canopy walk entry fee not included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Forest guide for walks
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  free soft drinks included 
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Colobus monkey viewing
                </li>
              </ul>
              <Link
                href="/booking/nyungwe?package=canopy"
                className="block w-full text-center px-6 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3A4218] transition-all"
              >
                Book Canopy Walk
              </Link>
            </div>
            
            {/* Bird Watching Package */}
            <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bird Watching Safari</h3>
              <p className="text-gray-600 mb-4">3-day birding expedition</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#4B5320]">$720</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Comfortable transport
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Expert birding guide
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
                  free soft drinks
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park entry fees not included
                </li>
              </ul>
              <Link
                href="/booking/nyungwe?package=birding"
                className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
              >
                Book Bird Watching
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
                  Vehicle Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  <option value="all">All Brands</option>
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
              
              {/* Activity Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Activity
                </label>
                <select
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {activityOptions.map(activity => (
                    <option key={activity.id} value={activity.id}>
                      {activity.icon} {activity.name}
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
                    max={320}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#4B5320]"
                  />
                  <input
                    type="range"
                    min={70}
                    max={320}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#4B5320] mt-2"
                  />
                </div>
              </div>
              
              {/* Vehicle Features */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Vehicle Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highClearance}
                      onChange={(e) => setHighClearance(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">High Clearance</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={longDistance}
                      onChange={(e) => setLongDistance(e.target.checked)}
                      className="w-4 h-4 text-[#4B5320] rounded border-gray-300 focus:ring-[#4B5320]"
                    />
                    <span className="text-sm text-gray-700">Long Distance Comfort</span>
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
                  <span className="font-bold text-[#4B5320] text-lg">{filteredVehicles.length}</span> Nyungwe safari vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSeats('all');
                    setSelectedActivity('all');
                    setHighClearance(false);
                    setLongDistance(false);
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
              <p className="mt-6 text-gray-600 text-lg">Loading Nyungwe safari vehicles...</p>
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
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our Nyungwe specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSeats('all');
                    setSelectedActivity('all');
                    setHighClearance(false);
                    setLongDistance(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.safariRate || v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#4B5320] text-white font-semibold rounded-lg hover:bg-[#3A4218] transition-colors"
                >
                  View All Vehicles
                </button>
                <a
                  href="tel:+250796077321"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Nyungwe Specialists
                </a>
              </div>
            </div>
          )}

          {/* NYUNGWE SAFARI VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Nyungwe <span className="text-[#4B5320]">Safari Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles ready for forest adventures</p>
                </div>
                <div className="bg-[#4B5320]/10 text-[#4B5320] px-4 py-2 rounded-lg text-sm font-bold border border-[#4B5320]/20">
                  {filteredVehicles.length} Forest Ready
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
                          alt={`${vehicle.brand} ${vehicle.model} - Nyungwe Forest safari vehicle`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/safari-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* NYUNGWE BADGE */}
                        <div className="absolute top-4 left-4 bg-[#4B5320] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          NYUNGWE SAFARI
                        </div>
                        
                        {/* ACTIVITY BADGE */}
                        {vehicle.primateTracking && (
                          <div className="absolute top-4 right-4 bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            🐒 CHIMPANZEE
                          </div>
                        )}
                        
                        {/* VEHICLE INFO */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                          <div className="text-sm text-gray-300">{vehicle.engine} • {vehicle.seats} seats</div>
                        </div>
                      </div>
                      
                      {/* DETAILS SECTION */}
                      <div className="p-6">
                        {/* VEHICLE SPECS */}
                        <div className="bg-[#4B5320]/5 rounded-lg p-4 mb-4 border border-[#4B5320]/20">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-500">Drive</div>
                              <div className="font-bold text-gray-800">{vehicle.driveType || '4x4'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Transmission</div>
                              <div className="font-bold text-gray-800">{vehicle.transmission}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Fuel</div>
                              <div className="font-bold text-gray-800">{vehicle.fuelType}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Year</div>
                              <div className="font-bold text-gray-800">{vehicle.year}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* FOREST CAPABILITIES */}
                        <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">Forest Capabilities:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.muddyRoadCapable && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🟫 Mud Roads</span>
                            )}
                            {vehicle.forestTerrain && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🌳 Forest Terrain</span>
                            )}
                            {vehicle.highClearance && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">📏 High Clearance</span>
                            )}
                            {vehicle.longDistanceComfort && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🛋️ Long Distance Comfort</span>
                            )}
                          </div>
                        </div>
                        
                        {/* ACTIVITIES */}
                        <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">Activities:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.primateTracking && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                                🐒 Chimpanzee Tracking
                              </span>
                            )}
                            {vehicle.canopyWalkAccess && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                                🌉 Canopy Walk
                              </span>
                            )}
                            {vehicle.birdWatching && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                                🦜 Bird Watching
                              </span>
                            )}
                            {vehicle.hikingSupport && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                                🥾 Hiking
                              </span>
                            )}
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
                                <span className="text-3xl font-bold text-[#4B5320]">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">+ Driver</span>
                              <div className="text-sm font-bold text-gray-800">+$55/day</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/nyungwe?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-[#4B5320] text-white text-sm font-bold rounded-lg hover:bg-[#3A4218] transition-all text-center"
                          >
                            Book Safari
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
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* NYUNGWE FOREST INFORMATION */}
        <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About <span className="text-[#D0D98D]">Nyungwe Forest</span>
                </h2>
                <div className="space-y-4 text-gray-200">
                  <p>Nyungwe Forest National Park is Rwanda's premier primate destination, home to 13 primate species including chimpanzees, colobus monkeys, and L'Hoest's monkeys. The park covers 1,019 km² of pristine montane rainforest.</p>
                  <p>Highlights include the famous canopy walk, suspended 50 meters above the forest floor, and excellent bird watching with over 300 species. The park's network of hiking trails offers everything from short nature walks to multi-day treks.</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-2xl font-bold text-[#D0D98D]">1,019 km²</div>
                      <div className="text-sm">Forest Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D0D98D]">13</div>
                      <div className="text-sm">Primate Species</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D0D98D]">300+</div>
                      <div className="text-sm">Bird Species</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D0D98D]">$50</div>
                      <div className="text-sm">Entry Fee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Safari Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#D0D98D] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#4B5320] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Chimpanzee tracking:</span> 2-4 hours, $90 permit
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#D0D98D] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#4B5320] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Canopy walk:</span> 1-2 hours, $60 entry
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#D0D98D] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#4B5320] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Best time:</span> June-August & December-January (dry seasons)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#D0D98D] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#4B5320] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Accommodation:</span> Lodges, guesthouses near Gisakura & Uwinka
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="https://www.nyungweforest.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#D0D98D] hover:underline"
                  >
                    Visit official Nyungwe website →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRIMATE SPECIES SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Primates You'll See in <span className="text-[#4B5320]">Nyungwe Forest</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From your safari vehicle or on guided forest walks
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">Chimpanzee</div>
              <div className="text-xs text-gray-500 mt-1">Star attraction</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">Angola Colobus</div>
              <div className="text-xs text-gray-500 mt-1">Black & white</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">L'Hoest's Monkey</div>
              <div className="text-xs text-gray-500 mt-1">Forest monkey</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">Silver Monkey</div>
              <div className="text-xs text-gray-500 mt-1">Rare species</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐒</div>
              <div className="font-bold text-gray-800">Vervet Monkey</div>
              <div className="text-xs text-gray-500 mt-1">Common in forest</div>
            </div>
          </div>
        </div>

        {/* NYUNGWE FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nyungwe Forest Safari - <span className="text-[#4B5320]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about safari in Nyungwe Forest
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What vehicle do I need for Nyungwe?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A comfortable 4x4 or SUV with good ground clearance is recommended for the 5-hour drive from Kigali and forest roads. We recommend Toyota Land Cruiser Prado or Hilux for the journey.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long is the drive to Nyungwe?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The drive from Kigali to Nyungwe Forest takes approximately 5 hours (220 km). Roads are generally good but can be challenging in wet weather. A comfortable vehicle is essential.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I self-drive to Nyungwe?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, self-drive is possible. The main roads are paved, but forest access roads may be rough. We recommend a 4x4 for confidence. Many visitors prefer hiring a driver for the long journey.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the best time for chimpanzee tracking?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chimpanzee tracking is available year-round, but the best time is during dry seasons (June-August, December-January) when trails are less muddy. Chimpanzees are habituated and tracked daily.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I need a guide for Nyungwe activities?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, all primate tracking and guided forest walks require a professional guide provided by the park. Our packages include these guides. Guides are knowledgeable about primate behavior and forest ecology.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I combine Nyungwe with other parks?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! Many visitors combine Nyungwe with Lake Kivu (2 hours away) or continue to Volcanoes National Park. We offer multi-park safari packages with comfortable vehicles for the journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#4B5320]">Nyungwe Guests Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              187+ 5-star reviews from Nyungwe Forest adventures
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
              <p className="text-gray-700 mb-4">"The Prado was perfect for the long drive to Nyungwe. Comfortable for 5 hours, and handled the forest roads easily. Our chimpanzee tracking experience was incredible - saw a whole family!"</p>
              <div className="font-bold text-gray-900">Primate Lovers</div>
              <div className="text-sm text-gray-500">Chimpanzee Tracking • Nyungwe</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"The canopy walk was the highlight! Our driver got us to Uwinka early, and we had the walkway almost to ourselves. The vehicle was clean, air-conditioned, and made the long journey comfortable."</p>
              <div className="font-bold text-gray-900">Adventure Couple</div>
              <div className="text-sm text-gray-500">Canopy Walk • Nyungwe</div>
            </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Booked a 3-day bird watching package. Our guide was exceptional - spotted over 100 species including the great blue turaco. The vehicle was perfect for the forest roads. Highly recommend!"</p>
              <div className="font-bold text-gray-900">Birding Enthusiast</div>
              <div className="text-sm text-gray-500">Bird Watching • Nyungwe</div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#D0D98D]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Nyungwe Forest Adventure?
            </h2>
            <p className="text-xl text-[#D0D98D] mb-8 max-w-2xl mx-auto">
              Book your safari vehicle today. Chimpanzee tracking, canopy walk, bird watching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Safari Vehicles
              </Link>
              <a
                href="tel:+250796077321"
                className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-colors text-lg"
              >
                Nyungwe Hotline: +250 796 077 321
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Chimpanzee tracking • Canopy walk • Bird watching • Colobus monkeys • Forest trails • 4x4 vehicles
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
