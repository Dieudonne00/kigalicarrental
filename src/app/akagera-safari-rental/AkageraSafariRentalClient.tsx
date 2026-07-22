// app/akagera-safari-rental/AkageraSafariRentalClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AkageraSafariVehicle {
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
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  bestFor: string[];
  guideAvailable: boolean;
  parkEntryIncluded: boolean;
  gameDriveExperience: string;
}

export default function AkageraSafariRentalClient({ initialCars }: { initialCars: any[] }) {
  const [vehicles, setVehicles] = useState<AkageraSafariVehicle[]>(initialCars);
  const [loading, setLoading] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([90, 350]);
  const [popUpRoof, setPopUpRoof] = useState(false);
  const [campingGear, setCampingGear] = useState(false);
  const [guideIncluded, setGuideIncluded] = useState(false);

  // Derive vehicles suitable for Akagera from the server-rendered initial cars
  useEffect(() => {
    const safariCars = initialCars.filter((car: any) =>
      car.nationalParks?.includes('Akagera') ||
      car.bestFor?.includes('Akagera') ||
      car.bestFor?.includes('safari') ||
      car.category?.includes('4x4') ||
      car.category?.includes('SUV') ||
      car.popUpRoof === true ||
      car.gameViewingSeats === true
    );
    setVehicles(safariCars);

    if (safariCars.length > 0) {
      const rates = safariCars.map((c: any) => c.safariRate || c.dailyRate);
      setPriceRange([Math.min(...rates), Math.max(...rates)]);
    }
  }, [initialCars]);

  // Vehicle types for filtering
  const vehicleTypes = [
    { id: "all", name: "All Safari Vehicles", icon: "🚙" },
    { id: "popup", name: "Pop-up Roof", icon: "🏕️" },
    { id: "camping", name: "Camping Equipped", icon: "⛺" },
    { id: "luxury", name: "Luxury Safari", icon: "✨" },
    { id: "budget", name: "Budget Safari", icon: "💰" },
  ];

  // Duration options
  const durationOptions = [
    { id: "all", name: "Any Duration" },
    { id: "fullday", name: "Full Day (8 hrs)" },
    { id: "overnight", name: "Overnight Safari" },
    { id: "2day", name: "2 Days / 1 Night" },
    { id: "3day", name: "3 Days / 2 Nights" },
    { id: "weekend", name: "Weekend Safari" },
  ];

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedVehicleType !== "all") {
      if (selectedVehicleType === "popup" && !vehicle.popUpRoof) return false;
      if (selectedVehicleType === "camping" && !vehicle.campingGear && !vehicle.roofTent) return false;
      if (selectedVehicleType === "luxury" && vehicle.dailyRate < 200) return false;
      if (selectedVehicleType === "budget" && vehicle.dailyRate > 150) return false;
    }
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
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

  // Akagera National Park information
  const akageraInfo = {
    size: "1,122 km²",
    wildlife: "Big Five (Lion, Leopard, Elephant, Buffalo, Rhino) plus Zebra, Giraffe, Hippo, Crocodile, 500+ bird species",
    bestTime: "June-September (dry season) • December-February",
    entryFee: "$50 per person (foreign non-resident)",
    gameDrive: "Self-drive or guided safari available",
    camping: "Designated campsites with facilities",
    distance: "135 km from Kigali • 2.5 hours drive",
    activities: "Game drives, boat safari on Lake Ihema, night game drives, bird watching, fishing"
  };

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Akagera Safari Rental - 4x4 Vehicles for Akagera National Park Game Drives",
    "description": "Rent safari vehicles for Akagera National Park. Toyota Land Cruiser with pop-up roof, game viewing seats, camping gear. Self-drive or guided safaris. Big Five game viewing vehicles.",
    "url": "https://kigalicarrental.site/akagera-safari-rental",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "priceRange": "$$$",
    "areaServed": ["Akagera National Park", "Kigali", "Rwanda"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Akagera Safari Vehicles",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser Safari"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Land Rover Safari Vehicle"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "4x4 with Pop-up Roof"}}
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
      {"@type": "ListItem", "position": 3, "name": "Akagera Safari Rental", "item": "https://kigalicarrental.site/akagera-safari-rental"}
    ]
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - AKAGERA SAFARI */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Akagera Safari */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920" 
              alt="Akagera safari rental - 4x4 vehicle for game drives in Akagera National Park"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">Safari</span>
                <span>›</span>
                <span className="text-white">Akagera Safari Rental</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Akagera Safari</span> Rental
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-[#93C5FD] font-semibold">4x4 safari vehicles</span> for Akagera National Park. 
                Toyota Land Cruiser with pop-up roof, game viewing seats. Self-drive or guided safaris. 
                Big Five game viewing.
              </p>
              
              {/* KEY AKAGERA METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-blue-50 backdrop-blur-sm rounded-xl p-4 border border-blue-100/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Safari Vehicles</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">1,122</div>
                  <div className="text-xs text-gray-300 mt-1">km² Park Size</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">Big Five</div>
                  <div className="text-xs text-gray-300 mt-1">Lion, Leopard, Elephant, Buffalo, Rhino</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Customer Support</div>
                </div>
              </div>
              
              {/* AKAGERA BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-200 text-blue-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  RWANDA'S BIG FIVE DESTINATION • 2.5 HOURS FROM KIGALI
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-blue-200 text-blue-600 font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View Safari Vehicles
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Safari Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* AKAGERA INFORMATION STRIP */}
        <div className="bg-blue-600 border-y border-blue-800/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">135 km from Kigali • 2.5 hrs drive</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Best time: June-September</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Park entry: $50 p/p</span>
              </div>
            </div>
          </div>
        </div>

        {/* AKAGERA SAFARI PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Akagera <span className="text-blue-600">Safari Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your perfect Akagera experience - from day trips to multi-day camping safaris
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Self-Drive Day Safari */}
            <div className="bg-white rounded-2xl border-2 border-blue-100 p-8 hover:border-blue-600 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Self-Drive Day Safari</h3>
              <p className="text-gray-600 mb-4">Explore Akagera at your own pace</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-blue-600">$95</span>
                <span className="text-gray-500">/vehicle</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 safari vehicle
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pop-up roof option available
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park map & guide included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Binoculars provided
                </li>
              </ul>
              <Link
                href="/booking/akagera?package=selfdrive"
                className="block w-full text-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all"
              >
                Book Self-Drive Safari
              </Link>
            </div>
            
            {/* Guided Safari - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Guided Safari</h3>
              <p className="text-gray-600 mb-4">Expert guide + 4x4 vehicle</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$210</span>
                <span className="text-gray-500">/vehicle</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional safari guide
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium 4x4 with pop-up roof
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Binoculars & field guides
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Best wildlife spotting
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park entry included
                </li>
              </ul>
              <Link
                href="/booking/akagera?package=guided"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Book Guided Safari
              </Link>
            </div>
            
            {/* Overnight Camping Safari */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Overnight Camping</h3>
              <p className="text-gray-600 mb-4">2-day safari with camping gear</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$285</span>
                <span className="text-gray-500">/vehicle</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 with roof tent
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Complete camping gear
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Portable fridge & cooker
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Morning & evening game drives
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Campsite fees included
                </li>
              </ul>
              <Link
                href="/booking/akagera?package=camping"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Camping Safari
              </Link>
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
              
              {/* Duration Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Safari Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
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
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Daily Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={70}
                    max={400}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={70}
                    max={400}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
              
              {/* Safari Features */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Safari Features
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
                      checked={guideIncluded}
                      onChange={(e) => setGuideIncluded(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Guide Included</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> Akagera safari vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedVehicleType('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.safariRate || v.dailyRate);
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
              <p className="mt-6 text-gray-600 text-lg">Loading Akagera safari vehicles...</p>
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
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our Akagera safari specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedVehicleType('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    setPopUpRoof(false);
                    setCampingGear(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.safariRate || v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-colors"
                >
                  View All Safari Vehicles
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Safari Specialists
                </a>
              </div>
            </div>
          )}

          {/* AKAGERA SAFARI VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Akagera <span className="text-[#1D4ED8]">Safari Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles ready for Akagera game drives</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Safari Ready
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const rate = vehicle.safariRate || vehicle.dailyRate;
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Akagera safari rental vehicle`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/safari-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* SAFARI BADGE */}
                        <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          AKAGERA SAFARI
                        </div>
                        
                        {/* POP-UP ROOF BADGE */}
                        {vehicle.popUpRoof && (
                          <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            🏕️ POP-UP ROOF
                          </div>
                        )}
                        
                        {/* VEHICLE INFO */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                          <div className="text-sm text-gray-300">{vehicle.seats} seats • {vehicle.transmission} • {vehicle.fuelType}</div>
                        </div>
                      </div>
                      
                      {/* DETAILS SECTION */}
                      <div className="p-6">
                        {/* VEHICLE SPECS */}
                        <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-500">Engine</div>
                              <div className="font-bold text-gray-800">{vehicle.engine || '2.8L'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Drive</div>
                              <div className="font-bold text-gray-800">{vehicle.driveType || '4x4'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Seats</div>
                              <div className="font-bold text-gray-800">{vehicle.seats}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Year</div>
                              <div className="font-bold text-gray-800">{vehicle.year}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* SAFARI FEATURES GRID */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {vehicle.popUpRoof && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Pop-up Roof">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.gameViewingSeats && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Game Viewing Seats">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.binoculars && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Binoculars">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.spotlights && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Spotlights">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* SAFARI FEATURES */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {vehicle.fridge && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                                🧊 Fridge
                              </span>
                            )}
                            {vehicle.campingGear && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                                ⛺ Camping Gear
                              </span>
                            )}
                            {vehicle.guideAvailable && (
                              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                                👤 Guide Available
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
                        
                        {/* GAME DRIVE EXPERIENCE */}
                        {vehicle.gameDriveExperience && (
                          <div className="mb-4 text-xs text-gray-600 italic">
                            "{vehicle.gameDriveExperience}"
                          </div>
                        )}
                        
                        {/* PRICING */}
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Safari Rate</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#1D4ED8]">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Park Entry</span>
                              <div className="text-sm font-bold text-gray-800">{vehicle.parkEntryIncluded ? '✓ Included' : '$50 p/p'}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/akagera?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                          >
                            Book Safari
                          </Link>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="px-4 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
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

        {/* AKAGERA NATIONAL PARK INFORMATION */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About <span className="text-[#93C5FD]">Akagera National Park</span>
                </h2>
                <div className="space-y-4 text-gray-200">
                  <p>Akagera National Park is Rwanda's premier Big Five safari destination. Covering 1,122 km² of savanna, woodland, wetlands, and lakes, it's home to lions, leopards, elephants, buffalo, rhinos, and over 500 bird species.</p>
                  <p>The park has been successfully restocked with lions and rhinos in recent years, making it one of Africa's greatest conservation success stories. Self-drive safaris are popular, and boat safaris on Lake Ihema offer hippo and crocodile viewing.</p>
                  <p>Akagera sits in Rwanda's Eastern Province near the Tanzania border, and unlike the mountain gorilla parks, it's reached on a fully paved road the whole way — about 2.5 to 3 hours from Kigali, which makes it one of the most accessible savanna parks in East Africa for a day trip or overnight run. Lions were reintroduced in 2015 after roughly a 20-year absence from the park, and both black and white rhino followed in 2017 and 2019, completing the Big Five alongside the park's existing elephant, buffalo, and leopard populations. Self-drive is permitted on Akagera's marked network of game-viewing tracks — unusual for Rwanda's park system — though a 4x4 still matters once the clay-heavy sections soften in the rains, and a vehicle with a raised or pop-top roof makes a real difference for standing to watch and photograph game.</p>
                  <p className="text-sm text-gray-300">
                    Official park information:{" "}
                    <a href="https://visitrwanda.com/destinations/akagera-national-park/" target="_blank" rel="noopener noreferrer" className="underline text-[#93C5FD] hover:text-white">
                      Visit Rwanda
                    </a>{" "}
                    &middot;{" "}
                    <a href="https://www.africanparks.org/the-parks/akagera" target="_blank" rel="noopener noreferrer" className="underline text-[#93C5FD] hover:text-white">
                      African Parks
                    </a>
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-2xl font-bold text-[#93C5FD]">{akageraInfo.size}</div>
                      <div className="text-sm">Park Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#93C5FD]">500+</div>
                      <div className="text-sm">Bird Species</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#93C5FD]">2.5 hrs</div>
                      <div className="text-sm">From Kigali</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#93C5FD]">$50</div>
                      <div className="text-sm">Entry Fee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Essential Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#93C5FD] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#1D4ED8] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Wildlife:</span> Big Five plus zebra, giraffe, hippo, crocodile
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#93C5FD] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#1D4ED8] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Best Time:</span> June-September (dry season) • December-February
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#93C5FD] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#1D4ED8] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Activities:</span> Game drives, boat safari, night drives, bird watching
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#93C5FD] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-[#1D4ED8] text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Accommodation:</span> Campsites, lodges, tented camps
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="https://www.akagera.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#93C5FD] hover:underline"
                  >
                    Visit official Akagera website →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AKAGERA SAFARI FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Akagera Safari - <span className="text-[#1D4ED8]">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about renting a safari vehicle for Akagera
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I need a 4x4 for Akagera?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, a 4x4 is recommended, especially during wet season (March-May, October-November). The road from Kigali itself is paved the whole way in, but once you're on the park's internal game-viewing tracks, the clay-heavy sections turn slick fast, and high clearance is needed. A raised or pop-top roof is also worth having so you can stand for game viewing and photos. All our safari vehicles are genuine 4x4s.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I self-drive in Akagera?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Akagera is one of the few parks where self-drive safaris are permitted and popular. We provide detailed maps and guides. Alternatively, you can book a guided safari with our expert drivers.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the best vehicle for Akagera?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toyota Land Cruiser with pop-up roof is ideal for Akagera. The pop-up roof allows excellent game viewing and photography. Land Rover Defender and Toyota Hilux are also excellent choices.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How much does a safari vehicle cost?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Self-drive safari vehicles start at $95/day. Guided safaris with vehicle and guide are $210/day. Camping packages with roof tents and full gear are $285/day. Park entry fees are extra.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I camp overnight in Akagera?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Akagera has designated campsites with facilities. We offer camping-equipped vehicles with roof tents, fridges, and cooking gear. Perfect for multi-day safaris and experiencing the park at night.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What wildlife will I see in Akagera?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Akagera is home to the Big Five (lion, leopard, elephant, buffalo, rhino) plus giraffe, zebra, hippo, crocodile, and over 500 bird species. The park has excellent game viewing year-round.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AKAGERA WILDLIFE SHOWCASE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wildlife You'll See on <span className="text-[#1D4ED8]">Akagera Safari</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From your safari vehicle with pop-up roof
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦁</div>
              <div className="font-bold text-gray-800">Lion</div>
              <div className="text-xs text-gray-500 mt-1">Big Five</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐆</div>
              <div className="font-bold text-gray-800">Leopard</div>
              <div className="text-xs text-gray-500 mt-1">Big Five</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐘</div>
              <div className="font-bold text-gray-800">Elephant</div>
              <div className="text-xs text-gray-500 mt-1">Big Five</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🦏</div>
              <div className="font-bold text-gray-800">Rhino</div>
              <div className="text-xs text-gray-500 mt-1">Big Five</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
              <div className="text-5xl mb-3">🐃</div>
              <div className="font-bold text-gray-800">Buffalo</div>
              <div className="text-xs text-gray-500 mt-1">Big Five</div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Akagera Safari?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Book your safari vehicle today and experience Rwanda's Big Five.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View Safari Vehicles
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Safari Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Self-drive • Guided • Camping • Pop-up roofs • Game viewing seats • Big Five guaranteed
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
