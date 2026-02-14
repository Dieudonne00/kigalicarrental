// app/rwanda-guided-transport/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

interface GuidedTourVehicle {
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
  tourGuideRate: number;
  tourGuideLanguages: string[];
  tourGuideSpecialty: string[];
  tourGuideExperience: number;
  guidedSafari: boolean;
  gorillaTrekking: boolean;
  culturalTours: boolean;
  birdWatching: boolean;
  hikingSupport: boolean;
  imageUrl: string;
  available: boolean;
  location: string;
  nationalParkAccess: string[];
  includedMeals: boolean;
  campingGear: boolean;
  binoculars: boolean;
  fieldGuides: boolean;
}

export default function RwandaGuidedTransport() {
  const [vehicles, setVehicles] = useState<GuidedTourVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTourType, setSelectedTourType] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([150, 500]);

  // Fetch guided tour vehicles from DB
  useEffect(() => {
    const fetchGuidedVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for guided tour vehicles
        const response = await fetch("/api/cars?guided=true&tours=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for vehicles with tour guide capabilities
          const guidedCars = data.cars.filter((car: any) => 
            car.guidedTours === true || 
            car.tourGuideAvailable === true ||
            car.safariReady === true ||
            car.nationalParkAccess?.length > 0
          );
          setVehicles(guidedCars);
          
          if (guidedCars.length > 0) {
            const rates = guidedCars.map((c: any) => c.dailyRate + (c.tourGuideRate || 75));
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching guided tour vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidedVehicles();
  }, []);

  // Tour types for filtering
  const tourTypes = [
    { id: "all", name: "All Tours", icon: "🌍" },
    { id: "gorilla", name: "Gorilla Trekking", icon: "🦍" },
    { id: "safari", name: "Safari Game Drives", icon: "🦁" },
    { id: "cultural", name: "Cultural Tours", icon: "🏛️" },
    { id: "birding", name: "Bird Watching", icon: "🦜" },
    { id: "hiking", name: "Hiking Support", icon: "🥾" },
    { id: "city", name: "City Guided Tours", icon: "🏙️" },
  ];

  // Duration options
  const durationOptions = [
    { id: "all", name: "Any Duration" },
    { id: "halfday", name: "Half Day (4-5 hrs)" },
    { id: "fullday", name: "Full Day (8-10 hrs)" },
    { id: "multiday", name: "Multi-Day (2-7 days)" },
    { id: "extended", name: "Extended (8+ days)" },
  ];

  // Get unique values from real data
  const languages = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.tourGuideLanguages || ['English', 'French', 'Kinyarwanda', 'Swahili'])))];
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedTourType !== "all") {
      if (selectedTourType === "gorilla" && !vehicle.gorillaTrekking) return false;
      if (selectedTourType === "safari" && !vehicle.guidedSafari) return false;
      if (selectedTourType === "cultural" && !vehicle.culturalTours) return false;
      if (selectedTourType === "birding" && !vehicle.birdWatching) return false;
      if (selectedTourType === "hiking" && !vehicle.hikingSupport) return false;
    }
    if (selectedLanguage !== "all" && !vehicle.tourGuideLanguages?.includes(selectedLanguage)) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    const totalRate = vehicle.dailyRate + (vehicle.tourGuideRate || 75);
    if (totalRate < priceRange[0] || totalRate > priceRange[1]) return false;
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
    "@type": "TouristInformationCenter",
    "name": "Rwanda Guided Transport - Tour Services with Vehicle & Guide",
    "description": "Guided transport in Rwanda with professional tour guides. Gorilla trekking, safari game drives, cultural tours, bird watching. Vehicle + guide packages including national park access.",
    "url": "https://kigalicarrental.site/rwanda-guided-transport",
    "telephone": "+250796077321",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "412"
    },
    "priceRange": "$$$",
    "areaServed": ["Kigali", "Volcanoes National Park", "Akagera National Park", "Nyungwe Forest", "Lake Kivu"],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Guided Transport Rwanda",
        "serviceType": ["Gorilla Trekking", "Safari", "Cultural Tour", "Bird Watching"]
      }
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Tours", "item": "https://kigalicarrental.site/tours"},
      {"@type": "ListItem", "position": 3, "name": "Rwanda Guided Transport", "item": "https://kigalicarrental.site/rwanda-guided-transport"}
    ]
  };

  return (
    <>
      <Head>
        <title>Rwanda Guided Transport | Gorilla Trekking & Safari Tours with Vehicle & Guide</title>
        <meta name="description" content="✅ Rwanda guided transport - Professional tour guide + vehicle packages. Gorilla trekking in Volcanoes NP, safari in Akagera, chimpanzee tracking in Nyungwe. English/French guides, 4x4 vehicles, all-inclusive tours. Book your Rwanda adventure today!" />
        <meta name="keywords" content="Rwanda guided transport, guided tours Rwanda, tour guide with vehicle, gorilla trekking transport, safari guide Rwanda, Volcanoes National Park guided tour, Akagera game drive with guide, Nyungwe forest guided hike, chimpanzee tracking Rwanda, cultural tours Rwanda, bird watching Rwanda, guided safari Rwanda, tour driver Rwanda, English speaking guide Rwanda, French speaking guide Rwanda, 4x4 safari with guide, gorilla trekking vehicle, Rwanda tour packages, guided transport Kigali, national park tours Rwanda, wildlife guide Rwanda, trekking support Rwanda, Rwanda adventure tours, guided road trips Rwanda" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kigalicarrental.site/rwanda-guided-transport" />
        <meta property="og:title" content="Rwanda Guided Transport | Gorilla Trekking & Safari Tours with Vehicle & Guide" />
        <meta property="og:description" content="Professional tour guide + vehicle packages for gorilla trekking, safari, cultural tours. English/French guides, 4x4 vehicles." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kigalicarrental.site/rwanda-guided-transport" />
        <meta property="twitter:title" content="Rwanda Guided Transport | Gorilla Trekking & Safari Tours" />
        <meta property="twitter:description" content="Professional tour guide + vehicle packages for gorilla trekking, safari, cultural tours." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kigalicarrental.site/rwanda-guided-transport" />
        
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
        <meta name="author" content="Kigali Car Rental - Rwanda Guided Transport" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - RWANDA GUIDED TRANSPORT */}
        <div className="relative bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Gorilla Trekking */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920" 
              alt="Rwanda guided transport - Gorilla trekking in Volcanoes National Park"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#D0D98D] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
                <span>›</span>
                <span className="text-white">Rwanda Guided Transport</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#D0D98D]">Rwanda Guided</span> Transport
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Professional <span className="text-[#D0D98D] font-semibold">tour guide + vehicle packages</span>. 
                Gorilla trekking, safari game drives, cultural tours, and bird watching across Rwanda's national parks.
              </p>
              
              {/* KEY TOUR METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Guided Vehicles</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">25+</div>
                  <div className="text-xs text-gray-300 mt-1">Professional Guides</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">3</div>
                  <div className="text-xs text-gray-300 mt-1">National Parks</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4.9★</div>
                  <div className="text-xs text-gray-300 mt-1">412+ Reviews</div>
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Book Guided Tour
                </Link>
                <a
                  href="tel:+250796077321"
                  className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-all text-lg"
                >
                  Tour Hotline: +250 796 077 321
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D0D98D]/10 to-transparent"></div>
        </div>

        {/* TOUR TYPE SELECTOR - STICKY */}
        <div className="bg-[#4B5320] border-y border-[#6B7F3A]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {tourTypes.map((tour) => (
                <button
                  key={tour.id}
                  onClick={() => setSelectedTourType(tour.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedTourType === tour.id
                      ? "bg-[#D0D98D] text-[#4B5320] shadow-lg"
                      : "bg-[#4B5320]/40 text-white hover:bg-[#4B5320]/60 border border-[#D0D98D]/30"
                  }`}
                >
                  <span className="mr-2">{tour.icon}</span>
                  {tour.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NATIONAL PARKS SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Rwanda's <span className="text-[#4B5320]">National Parks</span> with a Guide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our professional guides know every trail, every animal, and every story. Choose your adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Volcanoes National Park */}
            <div className="group relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800"
                alt="Volcanoes National Park guided gorilla trekking"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 text-[#D0D98D] text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Musanze • 2.5 hrs from Kigali</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Volcanoes National Park</h3>
                <p className="text-gray-200 mb-4">Home to endangered mountain gorillas. Guided gorilla trekking experiences.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Gorilla Trekking</span>
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Golden Monkeys</span>
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Volcano Hiking</span>
                </div>
              </div>
            </div>
            
            {/* Akagera National Park */}
            <div className="group relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800"
                alt="Akagera National Park guided safari"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 text-[#D0D98D] text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Eastern Province • 2.5 hrs from Kigali</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Akagera National Park</h3>
                <p className="text-gray-200 mb-4">Big Five safari destination. Guided game drives with expert trackers.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Big Five Safari</span>
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Game Drives</span>
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Boat Safari</span>
                </div>
              </div>
            </div>
            
            {/* Nyungwe Forest */}
            <div className="group relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800"
                alt="Nyungwe Forest National Park guided chimpanzee tracking"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 text-[#D0D98D] text-sm font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Southern Province • 5 hrs from Kigali</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Nyungwe Forest</h3>
                <p className="text-gray-200 mb-4">Chimpanzee tracking, canopy walk, and primate encounters.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Chimpanzee Trekking</span>
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Canopy Walk</span>
                  <span className="bg-[#4B5320] text-white text-xs px-3 py-1.5 rounded-full">Bird Watching</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GUIDED TOUR PACKAGES */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Guided Tour <span className="text-[#4B5320]">Packages</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                All-inclusive packages with vehicle, guide, park fees, and meals
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
                <p className="text-gray-600 mb-4">3-day guided gorilla trekking adventure</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$1,450</span>
                  <span className="text-gray-500">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional guide + 4x4 vehicle
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
                    All meals & park fees
                  </li>
                </ul>
                <Link
                  href="/booking/tour?package=gorilla"
                  className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
                >
                  Book Gorilla Trek
                </Link>
              </div>
              
              {/* Safari Package - MOST POPULAR */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  MOST POPULAR
                </div>
                <div className="w-16 h-16 bg-[#4B5320] rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Akagera Safari</h3>
                <p className="text-gray-600 mb-4">2-day Big Five safari with expert guide</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$850</span>
                  <span className="text-gray-500">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safari vehicle + guide
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
                  href="/booking/tour?package=safari"
                  className="block w-full text-center px-6 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3A4218] transition-all"
                >
                  Book Safari
                </Link>
              </div>
              
              {/* Chimpanzee Package */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                  <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nyungwe Chimpanzee</h3>
                <p className="text-gray-600 mb-4">3-day primate tracking + canopy walk</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$950</span>
                  <span className="text-gray-500">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
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
                    Bird watching with guide
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accommodation & meals
                  </li>
                </ul>
                <Link
                  href="/booking/tour?package=chimpanzee"
                  className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
                >
                  Book Chimpanzee Trek
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#4B5320]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Tour Type (already selected above) */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Current Tour
                </label>
                <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  {tourTypes.find(t => t.id === selectedTourType)?.name || 'All Tours'}
                </div>
              </div>
              
              {/* Guide Language Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Guide Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
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
                      {seat === 'all' ? 'Any Size' : `${seat} People`}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Duration Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Tour Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {durationOptions.map(duration => (
                    <option key={duration.id} value={duration.id}>
                      {duration.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Daily Rate (Vehicle + Guide): {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={150}
                    max={600}
                    step={25}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#4B5320]"
                  />
                  <input
                    type="range"
                    min={150}
                    max={600}
                    step={25}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#4B5320] mt-2"
                  />
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#4B5320] text-lg">{filteredVehicles.length}</span> guided tour vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedTourType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate + (v.tourGuideRate || 75));
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
              <p className="mt-6 text-gray-600 text-lg">Loading guided tour vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No guided tours match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our tour desk for custom packages.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedTourType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.dailyRate + (v.tourGuideRate || 75));
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#4B5320] text-white font-semibold rounded-lg hover:bg-[#3A4218] transition-colors"
                >
                  View All Tours
                </button>
                <a
                  href="tel:+250796077321"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Tour Desk
                </a>
              </div>
            </div>
          )}

          {/* GUIDED TOUR VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Guided <span className="text-[#4B5320]">Tour Vehicles</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles with professional guides</p>
                </div>
                <div className="bg-[#4B5320]/10 text-[#4B5320] px-4 py-2 rounded-lg text-sm font-bold border border-[#4B5320]/20">
                  {filteredVehicles.length} Ready for Tour
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const totalRate = vehicle.dailyRate + (vehicle.tourGuideRate || 75);
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#4B5320] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Guided tour vehicle Rwanda`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/safari-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* GUIDE INCLUDED BADGE */}
                        <div className="absolute top-4 left-4 bg-[#4B5320] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          TOUR GUIDE
                        </div>
                        
                        {/* TOUR TYPE BADGES */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          {vehicle.gorillaTrekking && (
                            <div className="bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              🦍 Gorilla Trek
                            </div>
                          )}
                          {vehicle.guidedSafari && (
                            <div className="bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              🦁 Safari
                            </div>
                          )}
                        </div>
                        
                        {/* VEHICLE INFO */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                          <div className="text-sm text-gray-300">{vehicle.category} • {vehicle.seats} seats</div>
                        </div>
                      </div>
                      
                      {/* DETAILS SECTION */}
                      <div className="p-6">
                        {/* GUIDE INFO */}
                        <div className="bg-[#4B5320]/5 rounded-lg p-4 mb-4 border border-[#4B5320]/20">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#4B5320] rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Professional Tour Guide</div>
                              <div className="text-xs text-gray-600">
                                {vehicle.tourGuideLanguages?.join(' • ')} • {vehicle.tourGuideExperience}+ years
                              </div>
                            </div>
                          </div>
                          
                          {/* GUIDE SPECIALTIES */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {vehicle.tourGuideSpecialty?.map((specialty, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* TOUR FEATURES */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {vehicle.nationalParkAccess?.includes('Volcanoes') && (
                            <div className="flex items-center gap-1 text-xs text-gray-700">
                              <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Volcanoes NP
                            </div>
                          )}
                          {vehicle.nationalParkAccess?.includes('Akagera') && (
                            <div className="flex items-center gap-1 text-xs text-gray-700">
                              <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Akagera NP
                            </div>
                          )}
                          {vehicle.nationalParkAccess?.includes('Nyungwe') && (
                            <div className="flex items-center gap-1 text-xs text-gray-700">
                              <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Nyungwe Forest
                            </div>
                          )}
                          {vehicle.binoculars && (
                            <div className="flex items-center gap-1 text-xs text-gray-700">
                              <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Binoculars
                            </div>
                          )}
                          {vehicle.fieldGuides && (
                            <div className="flex items-center gap-1 text-xs text-gray-700">
                              <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Field Guides
                            </div>
                          )}
                        </div>
                        
                        {/* PRICING */}
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Vehicle + Guide</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#4B5320]">{formatCurrency(totalRate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Park fees</span>
                              <div className="text-sm font-bold text-gray-800">Included</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/tour?vehicle=${vehicle.id}&tour=${selectedTourType}`}
                            className="px-4 py-3 bg-[#4B5320] text-white text-sm font-bold rounded-lg hover:bg-[#3A4218] transition-all text-center"
                          >
                            Book Guided Tour
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

        {/* WHY CHOOSE GUIDED TRANSPORT */}
        <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-[#D0D98D]">Guided Transport</span> in Rwanda
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Experience Rwanda with experts who know every trail, every animal, and every story
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Local Guides</h3>
                <p className="text-gray-300 text-sm">Certified guides with 10+ years experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">4x4 Safari Vehicles</h3>
                <p className="text-gray-300 text-sm">Comfortable, reliable, safari-ready</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">All-Inclusive Packages</h3>
                <p className="text-gray-300 text-sm">Park fees, permits, meals, accommodation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Itineraries</h3>
                <p className="text-gray-300 text-sm">Custom tours designed for you</p>
              </div>
            </div>
          </div>
        </div>

        {/* GUIDED TOUR FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guided Transport Rwanda - <span className="text-[#4B5320]">FAQ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about guided tours in Rwanda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is included in guided transport?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our guided transport packages include a professional tour guide, 4x4 vehicle, fuel, insurance, national park fees, and usually meals and accommodation. Gorilla trekking packages include the permit ($1,500 value).
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do guides speak English?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! All our guides are fluent in English. Many also speak French, Kinyarwanda, Swahili, and some German. We can arrange guides who speak your language with advance notice.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How much does a guided tour cost?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Guided tour packages range from $850 for a 2-day Akagera safari to $1,450 for a 3-day gorilla trekking adventure. Custom itineraries are available. Prices include vehicle, guide, park fees, and accommodation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can I customize my tour itinerary?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolutely! We specialize in custom itineraries. You can combine gorilla trekking with safari, add cultural village visits, extend your stay at Lake Kivu, or design your perfect Rwanda adventure.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What vehicles are used for guided tours?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use 4x4 safari vehicles including Toyota Land Cruisers, Land Rover Defenders, and Toyota Hilux. All vehicles are equipped for rough terrain, have pop-up roofs for game viewing, and carry safari essentials.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do I book a guided tour?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                You can book online through our website, call our tour desk at +250 796 077 321, or send a WhatsApp message. For gorilla trekking, please book at least 3 months in advance as permits are limited.
              </p>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-[#4B5320]">Guests Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                412+ 5-star reviews from travelers who experienced Rwanda with our guides
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
                <p className="text-gray-700 mb-4">"Our guide Jean was incredible! He spotted wildlife we would have missed and knew exactly where the gorilla family was. Made our dream trip perfect."</p>
                <div className="font-bold text-gray-900">Sarah & Michael</div>
                <div className="text-sm text-gray-500">United Kingdom • Gorilla Trek</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"5-day safari with Claude was amazing. He knew every animal, every bird, and the best spots in Akagera. The vehicle was comfortable and we felt safe the whole time."</p>
                <div className="font-bold text-gray-900">The Johnson Family</div>
                <div className="text-sm text-gray-500">USA • Akagera Safari</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Marie took us chimpanzee tracking in Nyungwe. Her knowledge of the forest and primates was incredible. The canopy walk was breathtaking. Best decision to book a guide."</p>
                <div className="font-bold text-gray-900">Emma & Thomas</div>
                <div className="text-sm text-gray-500">Australia • Chimpanzee Trek</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#D0D98D]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Rwanda Adventure?
            </h2>
            <p className="text-xl text-[#D0D98D] mb-8 max-w-2xl mx-auto">
              Book your guided tour today. Expert guides, comfortable vehicles, unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Book Guided Tour
              </Link>
              <a
                href="tel:+250796077321"
                className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-colors text-lg"
              >
                Tour Desk: +250 796 077 321
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Gorilla trekking • Safari • Chimpanzee tracking • Cultural tours • Bird watching • English/French guides
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
