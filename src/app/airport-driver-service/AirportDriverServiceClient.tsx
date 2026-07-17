"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AirportDriverVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  airportTransferRate: number;
  hourlyRate: number;
  dailyRate: number;
  driverLanguages: string[];
  driverExperience: number;
  meetAndGreet: boolean;
  flightTracking: boolean;
  waitingTimeMinutes: number;
  luggageCapacity: string;
  childSeatsAvailable: boolean;
  wifiIncluded: boolean;
  bottledWater: boolean;
  imageUrl: string;
  available: boolean;
  location: string;
  airportCode: string;
  terminalService: string[];
  signHeld: boolean;
  parkingIncluded: boolean;
  flightDelayProtection: boolean;
}

export default function AirportDriverServiceClient() {
  const [vehicles, setVehicles] = useState<AirportDriverVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([35, 150]);

  // Fetch airport driver vehicles from DB
  useEffect(() => {
    const fetchAirportVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for airport transfer vehicles
        const response = await fetch("/api/cars?airport=true&driver=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for vehicles with airport transfer capability
          const airportCars = data.cars.filter((car: any) => 
            car.airportTransfers === true || 
            car.airportPickup === true ||
            car.meetAndGreet === true
          );
          setVehicles(airportCars);
          
          if (airportCars.length > 0) {
            const rates = airportCars.map((c: any) => c.airportTransferRate || 45);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching airport driver vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirportVehicles();
  }, []);

  // Vehicle types for filtering
  const vehicleTypes = [
    { id: "all", name: "All Vehicles", icon: "🚗" },
    { id: "economy", name: "Economy", icon: "🚙" },
    { id: "sedan", name: "Sedan", icon: "🚗" },
    { id: "suv", name: "SUV", icon: "🚙" },
    { id: "luxury", name: "Luxury", icon: "✨" },
    { id: "minivan", name: "Minivan", icon: "🚐" },
    { id: "bus", name: "Minibus", icon: "🚌" },
  ];

  // Service options
  const serviceOptions = [
    { id: "all", name: "All Services" },
    { id: "arrival", name: "Arrival Transfer" },
    { id: "departure", name: "Departure Transfer" },
    { id: "roundtrip", name: "Round Trip" },
    { id: "waiting", name: "Waiting Service" },
    { id: "courtesy", name: "Courtesy Vehicle" },
  ];

  // Get unique values from real data
  const languages = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.driverLanguages || ['English', 'French', 'Kinyarwanda'])))];
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedVehicleType !== "all") {
      if (selectedVehicleType === "economy" && !vehicle.category?.toLowerCase().includes('economy')) return false;
      if (selectedVehicleType === "sedan" && !vehicle.category?.toLowerCase().includes('sedan')) return false;
      if (selectedVehicleType === "suv" && !vehicle.category?.toLowerCase().includes('suv')) return false;
      if (selectedVehicleType === "luxury" && !vehicle.category?.toLowerCase().includes('luxury')) return false;
      if (selectedVehicleType === "minivan" && vehicle.seats < 7) return false;
      if (selectedVehicleType === "bus" && vehicle.seats < 10) return false;
    }
    if (selectedLanguage !== "all" && !vehicle.driverLanguages?.includes(selectedLanguage)) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    const rate = vehicle.airportTransferRate || 45;
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

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Airport Driver Service Kigali - Meet & Greet Chauffeur KGL",
    "description": "Professional airport driver service at Kigali International Airport (KGL). Meet & greet with name sign, flight tracking, 60 minutes free waiting. English/French speaking drivers. Book your airport transfer online.",
    "url": "https://kigalicarrental.site/airport-driver-service",
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
      "@type": "Airport",
      "name": "Kigali International Airport",
      "iataCode": "KGL",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kigali",
        "addressCountry": "RW"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "856"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "35",
      "highPrice": "150",
      "offerCount": vehicles.length
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Airport Services", "item": "https://kigalicarrental.site/airport-services"},
      {"@type": "ListItem", "position": 3, "name": "Airport Driver Service", "item": "https://kigalicarrental.site/airport-driver-service"}
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
        {/* HERO SECTION - AIRPORT DRIVER SERVICE */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Airport */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1577720580479-5f97b5e09f1d?auto=format&fit=crop&w=1920" 
              alt="Airport driver service Kigali - Meet and greet at KGL Airport"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">Airport Services</span>
                <span>›</span>
                <span className="text-white">Airport Driver Service</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Airport Driver</span> Service Kigali
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Professional <span className="text-[#93C5FD] font-semibold">meet & greet service</span> at Kigali International Airport (KGL). 
                Flight tracking, name sign, 60 minutes free waiting. English & French speaking drivers.
              </p>
              
              {/* KEY AIRPORT METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Airport Vehicles</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">60</div>
                  <div className="text-xs text-gray-300 mt-1">Min Free Waiting</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Flight Tracking</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">4.9★</div>
                  <div className="text-xs text-gray-300 mt-1">856+ Reviews</div>
                </div>
              </div>
              
              {/* AIRPORT CODE BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#93C5FD] text-[#1D4ED8] px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                  KGL
                </div>
                <div className="text-lg text-gray-200">Kigali International Airport • Arrivals Hall</div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Book Airport Driver
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Airport Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* AIRPORT SERVICE HIGHLIGHTS - STICKY */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Meet & Greet with Name Sign</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Flight Tracking Included</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">60 Min Free Waiting</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Flight Delay Protection</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Free Cancellation</span>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS - AIRPORT PROCESS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our <span className="text-[#1D4ED8]">Airport Driver Service</span> Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, reliable, professional - from arrival to destination
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#1D4ED8]/20">
                <span className="text-3xl font-bold text-[#1D4ED8]">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book Online</h3>
              <p className="text-gray-600 text-sm">Provide flight number, arrival time, and destination</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#1D4ED8]/20">
                <span className="text-3xl font-bold text-[#1D4ED8]">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">We Track Your Flight</h3>
              <p className="text-gray-600 text-sm">We monitor delays and adjust pickup time automatically</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#1D4ED8]/20">
                <span className="text-3xl font-bold text-[#1D4ED8]">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Meet & Greet</h3>
              <p className="text-gray-600 text-sm">Driver waits at arrivals with your name sign</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#1D4ED8]/20">
                <span className="text-3xl font-bold text-[#1D4ED8]">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Relax & Arrive</h3>
              <p className="text-gray-600 text-sm">Professional driver takes you to your destination</p>
            </div>
          </div>
        </div>

        {/* AIRPORT TRANSFER PACKAGES */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Airport Transfer <span className="text-[#1D4ED8]">Packages</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fixed rates, no surprises. All packages include meet & greet, flight tracking, and bottled water.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Economy Package */}
              <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                  <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Economy Transfer</h3>
                <p className="text-gray-600 mb-4">Affordable, comfortable sedan for 1-3 passengers</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#1D4ED8]">$35</span>
                  <span className="text-gray-500">/trip</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Meet & greet with name sign
                  </li>
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
                    60 minutes free waiting
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Bottled water included
                  </li>
                </ul>
                <Link
                  href="/booking/airport?package=economy"
                  className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
                >
                  Book Economy Transfer
                </Link>
              </div>
              
              {/* Executive Package - MOST POPULAR */}
              <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  MOST POPULAR
                </div>
                <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Executive Transfer</h3>
                <p className="text-gray-600 mb-4">Luxury sedan or SUV for VIP travelers</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#1D4ED8]">$65</span>
                  <span className="text-gray-500">/trip</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Luxury vehicle (Mercedes, BMW, Range Rover)
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
                    Priority meet & greet
                  </li>
                </ul>
                <Link
                  href="/booking/airport?package=executive"
                  className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
                >
                  Book Executive Transfer
                </Link>
              </div>
              
              {/* Group Package */}
              <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                  <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Group Transfer</h3>
                <p className="text-gray-600 mb-4">Minivan or minibus for 7-14 passengers</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#1D4ED8]">$85</span>
                  <span className="text-gray-500">/trip</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 14 passengers
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Luggage for all passengers
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multiple meet & greet signs
                  </li>
                </ul>
                <Link
                  href="/booking/airport?package=group"
                  className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
                >
                  Book Group Transfer
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT TO EXPECT AT KGL ARRIVALS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What Arriving at Kigali International Airport Is Actually Like
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl">
              <p>
                KGL is a small, easy-to-navigate airport, and once you're through immigration and baggage claim the arrivals hall is only a short walk from where ground transport waits. That's exactly where our driver will be standing, holding a sign with your name. For a first-time visitor to Rwanda, that matters more than it sounds: the moto-taxi and local taxi setup outside the terminal isn't always obvious to someone who has just landed, and figuring out fares, payment, and which vehicle is legitimate is one more thing to deal with after a long flight. Having your transport already arranged and waiting removes that decision entirely.
              </p>
              <p>
                Most travelers reaching Kigali arrive on connecting flights through hubs like Addis Ababa, Nairobi, or Brussels, and delays or tight connections on those routes are common. A generic promise of "flight tracking" is easy to write and hard to verify, so here's what it actually means in practice: we follow your specific flight number, not just the arrival time you booked weeks ago, and we adjust when the driver leaves for the airport based on when the plane actually lands. If your connection runs two hours late, your driver isn't sitting idle the whole time, and you're not stuck outside arrivals wondering if anyone is coming — or overpaying a stranger for a ride because your original pickup gave up on you.
              </p>
              <p>
                Once you're in the car, the drive itself is short. Central Kigali and most hotel areas are roughly 15 to 25 minutes from KGL depending on the time of day and how far into the city your destination is, so this service isn't built around a long transfer — it's built around removing the friction of the first half hour after you land.
              </p>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Vehicle Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Vehicle Type
                </label>
                <select
                  value={selectedVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {vehicleTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
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
                      {seat === 'all' ? 'Any' : `${seat} Seats`}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {serviceOptions.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Transfer Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={30}
                    max={200}
                    step={5}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={30}
                    max={200}
                    step={5}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> airport vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedVehicleType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedService('all');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.airportTransferRate || 45);
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
              <p className="mt-6 text-gray-600 text-lg">Loading airport vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No airport vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our airport desk for immediate assistance.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedVehicleType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedService('all');
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.airportTransferRate || 45);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Vehicles
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Airport Desk
                </a>
              </div>
            </div>
          )}

          {/* AIRPORT VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Airport <span className="text-[#1D4ED8]">Driver Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles with meet & greet service</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Ready at KGL
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const rate = vehicle.airportTransferRate || 45;
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Airport driver service Kigali`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/airport-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* MEET & GREET BADGE */}
                        <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          MEET & GREET
                        </div>
                        
                        {/* AIRPORT CODE BADGE */}
                        <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          ✈️ KGL
                        </div>
                        
                        {/* VEHICLE INFO */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                          <div className="text-sm text-gray-300">{vehicle.category} • {vehicle.seats} seats</div>
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
                              <div className="font-bold text-gray-900">Airport Driver</div>
                              <div className="text-xs text-gray-600">
                                {vehicle.driverLanguages?.join(' • ')} • {vehicle.driverExperience}+ years
                              </div>
                            </div>
                          </div>
                          
                          {/* AIRPORT FEATURES */}
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
                                Name Sign
                              </div>
                            )}
                            {vehicle.childSeatsAvailable && (
                              <div className="flex items-center gap-1 text-xs text-gray-700">
                                <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Child Seats
                              </div>
                            )}
                            {vehicle.wifiIncluded && (
                              <div className="flex items-center gap-1 text-xs text-gray-700">
                                <svg className="w-3 h-3 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                WiFi
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* SERVICE HIGHLIGHTS */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <div className="text-xs text-gray-500">Waiting Time</div>
                            <div className="font-bold text-[#1D4ED8]">{vehicle.waitingTimeMinutes} min</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <div className="text-xs text-gray-500">Luggage</div>
                            <div className="font-bold text-[#1D4ED8]">{vehicle.luggageCapacity || '3+ bags'}</div>
                          </div>
                        </div>
                        
                        {/* PRICING */}
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Airport Transfer</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#1D4ED8]">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/trip</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Hourly</span>
                              <div className="text-sm font-bold text-gray-800">{formatCurrency(vehicle.hourlyRate || 25)}/hr</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/airport?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                          >
                            Book Airport Driver
                          </Link>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="px-4 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
                          >
                            View Details
                          </Link>
                        </div>
                        
                        {/* FLIGHT DELAY PROTECTION */}
                        {vehicle.flightDelayProtection && (
                          <div className="mt-3 text-[10px] text-blue-600 text-center font-semibold">
                            ✓ Flight delay protection • We monitor & wait
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

        {/* WHY CHOOSE AIRPORT DRIVER SERVICE */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our <span className="text-[#93C5FD]">Airport Driver Service</span>
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Stress-free airport transfers with professional drivers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Meet & Greet</h3>
                <p className="text-gray-300 text-sm">Driver waiting with your name sign at arrivals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Flight Tracking</h3>
                <p className="text-gray-300 text-sm">We monitor delays, adjust pickup automatically</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">60 Min Free Waiting</h3>
                <p className="text-gray-300 text-sm">Enough time for baggage claim & customs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fixed Rates</h3>
                <p className="text-gray-300 text-sm">No surge pricing • Pay what you book</p>
              </div>
            </div>
          </div>
        </div>

        {/* AIRPORT FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Airport Driver Service Kigali - <span className="text-[#1D4ED8]">FAQ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about airport transfers in Kigali
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How does meet & greet work at KGL Airport?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your driver will be waiting at the arrivals hall holding a sign with your name. After clearing customs and baggage claim, you'll see them immediately. They'll assist with luggage and escort you to the vehicle. We track your flight so we're there even if you're delayed.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What if my flight is delayed?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No worries! We track all flights in real-time, which matters most on connecting itineraries — many travelers reach KGL via Addis Ababa, Nairobi, or Brussels, and delays or missed connections on those legs are common. Your driver monitors the actual flight status and adjusts pickup time accordingly, rather than working off the schedule you booked weeks ago. You get 60 minutes of free waiting from your actual landing time, so you never pay extra for a delay that wasn't your fault.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How much does airport transfer cost?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Economy transfers start at $35 for 1-3 passengers. Executive luxury transfers are $65. Group transfers for up to 14 passengers are $85. All prices include meet & greet, flight tracking, waiting time, and bottled water.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do drivers speak English?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! All our airport drivers are fluent in English. Many also speak French and Kinyarwanda. You can specifically request an English, French, or multilingual driver when booking.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can I book a round-trip airport transfer?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolutely! We offer round-trip packages with a 10% discount. Your driver will pick you up from the airport on arrival, and return to take you back for departure. You can specify departure pickup time or request us to recommend timing based on your flight.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What vehicles are available for airport transfer?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer sedans (Toyota Corolla, Camry), SUVs (RAV4, Highlander), luxury vehicles (Mercedes, BMW), and minivans/minibuses for groups up to 14 passengers. All vehicles are air-conditioned, clean, and well-maintained.
              </p>
            </div>
          </div>
        </div>

        {/* AIRPORT DESTINATIONS */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Popular Destinations from Kigali Airport
              </h2>
              <p className="text-gray-600">Fixed rates to all major locations</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Kigali City Center</div>
                <div className="text-xs text-gray-500">15 min • $35</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Kimihurura</div>
                <div className="text-xs text-gray-500">20 min • $40</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Kacyiru</div>
                <div className="text-xs text-gray-500">20 min • $40</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Nyarutarama</div>
                <div className="text-xs text-gray-500">25 min • $45</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Gacuriro</div>
                <div className="text-xs text-gray-500">30 min • $50</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Remera</div>
                <div className="text-xs text-gray-500">25 min • $45</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Kabeza</div>
                <div className="text-xs text-gray-500">20 min • $40</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center hover:border-[#1D4ED8] hover:shadow-md transition-all border border-transparent">
                <div className="font-bold text-[#1D4ED8]">Gikondo</div>
                <div className="text-xs text-gray-500">25 min • $45</div>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#1D4ED8]">Airport Guests Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              856+ 5-star reviews from satisfied airport transfer customers
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
              <p className="text-gray-700 mb-4">"After a 14-hour flight, seeing my name on a sign was such a relief. Driver was professional, car was clean, and he knew the hotel. Flight was delayed 2 hours but he was still there. Great service!"</p>
              <div className="font-bold text-gray-900">David Chen</div>
              <div className="text-sm text-gray-500">Singapore • Business Traveler</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Booked a luxury transfer for our honeymoon. Mercedes was spotless, driver in suit with our names. Even had cold water waiting. Made a great first impression of Rwanda. Worth every dollar."</p>
              <div className="font-bold text-gray-900">James & Sarah</div>
              <div className="text-sm text-gray-500">UK • Honeymoon</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Traveling with 3 kids and lots of luggage. Driver helped with all bags, had child seats installed, van was spacious. Easy WhatsApp communication before arrival. Will use again."</p>
              <div className="font-bold text-gray-900">Maria Gonzalez</div>
              <div className="text-sm text-gray-500">Spain • Family Travel</div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Arriving at Kigali Airport?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Book your airport driver now. Meet & greet, flight tracking, 60 min free waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Book Airport Driver
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Airport Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Kigali International Airport (KGL) • Meet & greet • Flight tracking • 60 min free waiting • English/French drivers
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
