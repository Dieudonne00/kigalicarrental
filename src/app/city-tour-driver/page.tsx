// app/city-tour-driver/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

interface CityTourVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  tourRate: number;
  hourlyRate: number;
  dailyRate: number;
  driverLanguages: string[];
  driverExperience: number;
  tourGuideQualified: boolean;
  historicalKnowledge: boolean;
  culturalExpertise: boolean;
  monumentKnowledge: boolean;
  restaurantRecommendations: boolean;
  shoppingGuide: boolean;
  photoStopExpert: boolean;
  imageUrl: string;
  available: boolean;
  location: string;
  cityTourDuration: string[];
  popularSites: string[];
  museumTours: boolean;
  marketVisits: boolean;
  craftCenterVisits: boolean;
  genocideMemorialExpert: boolean;
}

export default function CityTourDriver() {
  const [vehicles, setVehicles] = useState<CityTourVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTourType, setSelectedTourType] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([40, 200]);

  // Fetch city tour vehicles from DB
  useEffect(() => {
    const fetchCityTourVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for city tour vehicles
        const response = await fetch("/api/cars?citytour=true&driver=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for vehicles with city tour capability
          const tourCars = data.cars.filter((car: any) => 
            car.cityTours === true || 
            car.tourGuideQualified === true ||
            car.historicalKnowledge === true
          );
          setVehicles(tourCars);
          
          if (tourCars.length > 0) {
            const rates = tourCars.map((c: any) => c.tourRate || c.dailyRate || 65);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching city tour vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityTourVehicles();
  }, []);

  // Tour types for filtering
  const tourTypes = [
    { id: "all", name: "All Tours", icon: "🌍" },
    { id: "historical", name: "Historical Tour", icon: "🏛️" },
    { id: "cultural", name: "Cultural Tour", icon: "🎭" },
    { id: "memorial", name: "Genocide Memorial", icon: "🕯️" },
    { id: "market", name: "Market & Shopping", icon: "🛍️" },
    { id: "craft", name: "Craft Centers", icon: "🎨" },
    { id: "panoramic", name: "Panoramic Views", icon: "🏞️" },
  ];

  // Duration options
  const durationOptions = [
    { id: "all", name: "Any Duration" },
    { id: "2hours", name: "2 Hours (Quick Tour)" },
    { id: "4hours", name: "Half Day (4 Hours)" },
    { id: "6hours", name: "Full Day (6 Hours)" },
    { id: "8hours", name: "Extended (8 Hours)" },
  ];

  // Get unique values from real data
  const languages = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.driverLanguages || ['English', 'French', 'Kinyarwanda', 'Swahili'])))];
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedTourType !== "all") {
      if (selectedTourType === "historical" && !vehicle.historicalKnowledge) return false;
      if (selectedTourType === "cultural" && !vehicle.culturalExpertise) return false;
      if (selectedTourType === "memorial" && !vehicle.genocideMemorialExpert) return false;
      if (selectedTourType === "market" && !vehicle.marketVisits) return false;
      if (selectedTourType === "craft" && !vehicle.craftCenterVisits) return false;
    }
    if (selectedLanguage !== "all" && !vehicle.driverLanguages?.includes(selectedLanguage)) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    const rate = vehicle.tourRate || vehicle.dailyRate || 65;
    if (rate < priceRange[0] || rate > priceRange[1]) return false;
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

  // Popular Kigali attractions
  const kigaliAttractions = [
    { name: "Kigali Genocide Memorial", time: "2-3 hours", icon: "🕯️" },
    { name: "Kimironko Market", time: "1-2 hours", icon: "🛍️" },
    { name: "Caplaki Craft Village", time: "1 hour", icon: "🎨" },
    { name: "Inema Arts Center", time: "1 hour", icon: "🖼️" },
    { name: "Mount Kigali", time: "2 hours", icon: "🏞️" },
    { name: "Presidential Palace Museum", time: "1-2 hours", icon: "🏛️" },
    { name: "Nyamirambo", time: "2 hours", icon: "🌆" },
    { name: "Kigali Convention Centre", time: "30 min", icon: "🏢" },
    { name: "Ivuka Arts Studio", time: "1 hour", icon: "🎨" },
    { name: "Camp Kigali Memorial", time: "30 min", icon: "🕊️" },
  ];

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    "name": "City Tour Driver Kigali - Explore Rwanda's Capital with Local Guides",
    "description": "Professional city tour driver service in Kigali. Explore Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village, Inema Arts Center with expert local guides. English/French speaking drivers. Customizable itineraries.",
    "url": "https://kigalicarrental.site/city-tour-driver",
    "telephone": "+250796077321",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "324"
    },
    "priceRange": "$$",
    "areaServed": "Kigali, Rwanda",
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "City Tour Driver",
        "serviceType": ["Historical Tour", "Cultural Tour", "Memorial Tour", "Market Tour", "Art Tour"]
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
      {"@type": "ListItem", "position": 3, "name": "City Tour Driver", "item": "https://kigalicarrental.site/city-tour-driver"}
    ]
  };

  return (
    <>
      <Head>
        <title>City Tour Driver Kigali | Explore Kigali with Local Guide | Genocide Memorial & Cultural Tours</title>
        <meta name="description" content="✅ City tour driver Kigali - Professional local drivers for Kigali city tours. Visit Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village, Inema Arts Center. English/French speaking guides. Custom itineraries. Book online." />
        <meta name="keywords" content="city tour driver Kigali, Kigali city tour, Kigali tour guide, Kigali genocide memorial tour, Kigali cultural tour, Kigali market tour, Kigali craft village tour, Inema arts center tour, Kigali sightseeing, Kigali guided tour, Kigali local guide, Kigali driver guide, Kigali historical tour, Kigali city highlights, Kigali photo tour, Kigali half day tour, Kigali full day tour, Kigali private tour, Kigali group tour, English speaking guide Kigali, French speaking guide Kigali, Kigali city attractions, things to do in Kigali, Kigali tourism, Rwanda capital tour" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kigalicarrental.site/city-tour-driver" />
        <meta property="og:title" content="City Tour Driver Kigali | Explore Kigali with Local Guide" />
        <meta property="og:description" content="Professional local drivers for Kigali city tours. Visit Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village, Inema Arts Center." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1557053914-d96d7c3e7a7a?auto=format&fit=crop&w=1200" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kigalicarrental.site/city-tour-driver" />
        <meta property="twitter:title" content="City Tour Driver Kigali | Explore Kigali with Local Guide" />
        <meta property="twitter:description" content="Professional local drivers for Kigali city tours. Visit Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1557053914-d96d7c3e7a7a?auto=format&fit=crop&w=1200" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kigalicarrental.site/city-tour-driver" />
        
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
        <meta name="author" content="Kigali Car Rental - City Tour Driver" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - CITY TOUR DRIVER */}
        <div className="relative bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Kigali City */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1557053914-d96d7c3e7a7a?auto=format&fit=crop&w=1920" 
              alt="City tour driver Kigali - Exploring Rwanda's capital with local guide"
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
                <span className="text-white">City Tour Driver</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#D0D98D]">City Tour Driver</span> Kigali
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Explore Kigali with <span className="text-[#D0D98D] font-semibold">expert local guides</span>. 
                Visit Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village, Inema Arts Center, and more.
              </p>
              
              {/* KEY TOUR METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Tour Vehicles</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">20+</div>
                  <div className="text-xs text-gray-300 mt-1">Local Guides</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">10+</div>
                  <div className="text-xs text-gray-300 mt-1">City Attractions</div>
                </div>
                <div className="bg-[#4B5320]/40 backdrop-blur-sm rounded-xl p-4 border border-[#D0D98D]/30">
                  <div className="text-2xl font-bold text-[#D0D98D]">4.8★</div>
                  <div className="text-xs text-gray-300 mt-1">324+ Reviews</div>
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Book City Tour
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

        {/* KIGALI ATTRACTIONS SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover <span className="text-[#4B5320]">Kigali's Top Attractions</span> with Your Driver
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your driver knows the best routes, photo spots, and local stories at every location
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kigaliAttractions.slice(0, 6).map((attraction, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-[#4B5320] transition-all hover:shadow-lg">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center text-2xl">
                    {attraction.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{attraction.name}</h3>
                    <p className="text-sm text-gray-500">{attraction.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {index === 0 && "Learn about Rwanda's history with expert guide who provides context and answers questions."}
                  {index === 1 && "Experience local life with driver who helps with bargaining and explains local products."}
                  {index === 2 && "Discover authentic Rwandan crafts with guide who knows the best artisans."}
                  {index === 3 && "Explore contemporary Rwandan art with driver who introduces you to artists."}
                  {index === 4 && "Enjoy panoramic city views with driver who knows the best photo spots."}
                  {index === 5 && "Visit the former presidential palace with guide who shares historical insights."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CITY TOUR PACKAGES */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                City Tour <span className="text-[#4B5320]">Packages</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Customizable tours with professional driver-guide. All packages include vehicle, driver, fuel, and bottled water.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Half Day Tour */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                  <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Half Day City Tour</h3>
                <p className="text-gray-600 mb-4">4 hours • Perfect introduction to Kigali</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$65</span>
                  <span className="text-gray-500">/vehicle</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kigali Genocide Memorial
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kimironko Market
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Caplaki Craft Village
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mount Kigali viewpoint
                  </li>
                </ul>
                <Link
                  href="/booking/tour?package=halfday"
                  className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
                >
                  Book Half Day Tour
                </Link>
              </div>
              
              {/* Full Day Tour - MOST POPULAR */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#4B5320] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  MOST POPULAR
                </div>
                <div className="w-16 h-16 bg-[#4B5320] rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Full Day City Tour</h3>
                <p className="text-gray-600 mb-4">8 hours • Complete Kigali experience</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$110</span>
                  <span className="text-gray-500">/vehicle</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All half day attractions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Inema Arts Center
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Presidential Palace Museum
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Nyamirambo walking tour
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Local lunch included
                  </li>
                </ul>
                <Link
                  href="/booking/tour?package=fullday"
                  className="block w-full text-center px-6 py-3 bg-[#4B5320] text-white rounded-lg font-bold hover:bg-[#3A4218] transition-all"
                >
                  Book Full Day Tour
                </Link>
              </div>
              
              {/* Custom Tour */}
              <div className="bg-white rounded-2xl border-2 border-[#4B5320]/20 p-8 hover:border-[#4B5320] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#4B5320]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4B5320] transition-colors">
                  <svg className="w-8 h-8 text-[#4B5320] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Custom Tour</h3>
                <p className="text-gray-600 mb-4">Design your own itinerary</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#4B5320]">$35</span>
                  <span className="text-gray-500">/hour</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Choose your attractions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible timing
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Expert guide recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Restaurant suggestions
                  </li>
                </ul>
                <Link
                  href="/booking/tour?package=custom"
                  className="block w-full text-center px-6 py-3 border-2 border-[#4B5320] text-[#4B5320] rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-all"
                >
                  Design Custom Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#4B5320]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Tour Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#4B5320] uppercase tracking-wider mb-2">
                  Tour Type
                </label>
                <select
                  value={selectedTourType}
                  onChange={(e) => setSelectedTourType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] focus:border-transparent bg-white"
                >
                  {tourTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Driver Language Filter */}
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
                      {seat === 'all' ? 'Any' : `${seat} People`}
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
                  Tour Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={40}
                    max={250}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#4B5320]"
                  />
                  <input
                    type="range"
                    min={40}
                    max={250}
                    step={10}
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
                  <span className="font-bold text-[#4B5320] text-lg">{filteredVehicles.length}</span> city tour vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedTourType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.tourRate || v.dailyRate || 65);
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
              <p className="mt-6 text-gray-600 text-lg">Loading city tour vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No city tour vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our tour desk for custom arrangements.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedTourType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.tourRate || v.dailyRate || 65);
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

          {/* CITY TOUR VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    City Tour <span className="text-[#4B5320]">Vehicles & Guides</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles with expert local guides</p>
                </div>
                <div className="bg-[#4B5320]/10 text-[#4B5320] px-4 py-2 rounded-lg text-sm font-bold border border-[#4B5320]/20">
                  {filteredVehicles.length} Ready for Tour
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const rate = vehicle.tourRate || vehicle.dailyRate || 65;
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#4B5320] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - City tour driver Kigali`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/citytour-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* TOUR GUIDE BADGE */}
                        <div className="absolute top-4 left-4 bg-[#4B5320] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          CITY TOUR GUIDE
                        </div>
                        
                        {/* LANGUAGE BADGE */}
                        <div className="absolute top-4 right-4 bg-[#D0D98D] text-[#4B5320] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {vehicle.driverLanguages?.slice(0, 2).join(' • ')}
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Professional Tour Guide</div>
                              <div className="text-xs text-gray-600">
                                {vehicle.driverLanguages?.join(' • ')} • {vehicle.driverExperience}+ years
                              </div>
                            </div>
                          </div>
                          
                          {/* GUIDE EXPERTISE */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {vehicle.historicalKnowledge && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">📜 History</span>
                            )}
                            {vehicle.culturalExpertise && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🎭 Culture</span>
                            )}
                            {vehicle.genocideMemorialExpert && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🕯️ Memorial</span>
                            )}
                            {vehicle.museumTours && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🏛️ Museums</span>
                            )}
                          </div>
                        </div>
                        
                        {/* TOUR HIGHLIGHTS */}
                        <div className="mb-4">
                          <div className="text-sm font-bold text-gray-700 mb-2">Popular sites:</div>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.popularSites?.slice(0, 4).map((site, idx) => (
                              <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                {site}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* DURATIONS AVAILABLE */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {vehicle.cityTourDuration?.map((duration, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                              <div className="text-xs font-bold text-[#4B5320]">{duration}</div>
                            </div>
                          ))}
                        </div>
                        
                        {/* PRICING */}
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Tour Rate (vehicle + guide)</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#4B5320]">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Hourly</span>
                              <div className="text-sm font-bold text-gray-800">{formatCurrency(vehicle.hourlyRate || 35)}/hr</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/tour?vehicle=${vehicle.id}&tour=city`}
                            className="px-4 py-3 bg-[#4B5320] text-white text-sm font-bold rounded-lg hover:bg-[#3A4218] transition-all text-center"
                          >
                            Book City Tour
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

        {/* WHY CHOOSE CITY TOUR DRIVER */}
        <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose a <span className="text-[#D0D98D]">City Tour Driver</span> in Kigali
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Experience Kigali like a local with expert guides who know every story, every corner, and every photo spot
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Local Experts</h3>
                <p className="text-gray-300 text-sm">Born and raised in Kigali, know every story</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Multilingual</h3>
                <p className="text-gray-300 text-sm">English, French, Kinyarwanda, Swahili</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Photo Spots</h3>
                <p className="text-gray-300 text-sm">Best viewpoints and photo opportunities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D0D98D]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D0D98D]/30">
                  <svg className="w-8 h-8 text-[#D0D98D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Best Value</h3>
                <p className="text-gray-300 text-sm">Fixed rates, no hidden fees, tips optional</p>
              </div>
            </div>
          </div>
        </div>

        {/* CITY TOUR FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              City Tour Driver Kigali - <span className="text-[#4B5320]">FAQ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about city tours in Kigali
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What does a city tour driver do?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your city tour driver is both a professional driver and a local guide. They drive you to all attractions, provide historical and cultural context, recommend photo spots, help with local interactions, and ensure you have a personalized experience of Kigali.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How long is a Kigali city tour?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer half-day (4 hours) and full-day (8 hours) tours. Half-day covers main attractions like Genocide Memorial, Kimironko Market, and Caplaki. Full-day adds Inema Arts Center, Presidential Palace, and Nyamirambo. Custom durations available.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do drivers speak English?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! All our city tour drivers are fluent in English. Many also speak French, Kinyarwanda, and Swahili. You can select your preferred language when booking.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How much does a city tour cost?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Half-day tours start at $65 for up to 4 people. Full-day tours are $110. Custom hourly tours are $35/hour. All prices include vehicle, driver-guide, fuel, and bottled water. Entry fees to memorial and museums are separate.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can we customize the tour?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolutely! Our tours are fully customizable. You can choose which attractions to visit, spend more time where you want, skip places, or ask your driver for recommendations based on your interests.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#4B5320] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is the Kigali Genocide Memorial included?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, all our tours include the Kigali Genocide Memorial. Your driver will provide historical context, explain the exhibits, and allow ample time for reflection. Entry is free, but donations are appreciated.
              </p>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-[#4B5320]">City Tour Guests Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                324+ 5-star reviews from travelers who explored Kigali with our driver-guides
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
                <p className="text-gray-700 mb-4">"Jean was an amazing guide! His knowledge of Kigali's history, especially at the Genocide Memorial, was profound. He took us to a local lunch spot we never would have found. Best decision we made."</p>
                <div className="font-bold text-gray-900">Sarah Thompson</div>
                <div className="text-sm text-gray-500">Canada • Full Day Tour</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"Marie took us to Kimironko Market and helped us bargain. She knew all the artisans at Caplaki. Her English was perfect and she was so patient with our questions. Highly recommend!"</p>
                <div className="font-bold text-gray-900">Michael & Lisa</div>
                <div className="text-sm text-gray-500">Australia • Half Day Tour</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="text-gray-700 mb-4">"We only had 4 hours but our driver Claude showed us so much! Memorial, market, craft village, and the viewpoint. His restaurant recommendation for lunch was the best meal we had in Rwanda."</p>
                <div className="font-bold text-gray-900">Carlos & Elena</div>
                <div className="text-sm text-gray-500">Spain • Half Day Tour</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#4B5320] to-[#3A4218] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#D0D98D]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore Kigali?
            </h2>
            <p className="text-xl text-[#D0D98D] mb-8 max-w-2xl mx-auto">
              Book your city tour driver today. Local experts, flexible itineraries, unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#D0D98D] text-[#4B5320] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Book City Tour
              </Link>
              <a
                href="tel:+250796077321"
                className="px-8 py-4 bg-transparent border-2 border-[#D0D98D] text-[#D0D98D] font-bold rounded-lg hover:bg-[#D0D98D]/10 transition-colors text-lg"
              >
                Tour Hotline: +250 796 077 321
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Kigali Genocide Memorial • Kimironko Market • Caplaki Craft Village • Inema Arts Center • Mount Kigali • English/French guides
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
