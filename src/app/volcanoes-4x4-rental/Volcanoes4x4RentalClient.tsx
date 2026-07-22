"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Volcanoes4x4Vehicle {
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
  trekkingRate?: number;
  mountainTerrain: boolean;
  steepSlopeCapable: boolean;
  muddyRoadCapable: boolean;
  rockyTerrainCapable: boolean;
  highClearance: boolean;
  lowRangeGearing: boolean;
  diffLock: boolean;
  imageUrl: string;
  imageGallery?: string[];
  available: boolean;
  location: string;
  trekkingStartPoints: string[];
  bestFor: string[];
  guideAvailable: boolean;
  parkEntryAssistance: boolean;
}

export default function Volcanoes4x4RentalClient({ initialCars }: { initialCars: any[] }) {
  // Filter server-provided cars for vehicles suitable for Volcanoes terrain
  const volcanoesInitialCars = initialCars.filter((car: any) =>
    car.nationalParks?.includes('Volcanoes') ||
    car.bestFor?.includes('gorilla trekking') ||
    car.bestFor?.includes('Volcanoes') ||
    car.mountainTerrain === true ||
    car.steepSlopeCapable === true ||
    car.highClearance === true ||
    car.brand === 'Toyota' && (car.model?.includes('Land Cruiser') || car.model?.includes('Prado') || car.model?.includes('Hilux')) ||
    car.brand === 'Land Rover' ||
    car.brand === 'Range Rover'
  );

  const [vehicles, setVehicles] = useState<Volcanoes4x4Vehicle[]>(volcanoesInitialCars);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 300]);
  const [highClearance, setHighClearance] = useState(false);
  const [lowRange, setLowRange] = useState(false);
  const [guideIncluded, setGuideIncluded] = useState(false);

  // Derive the initial price range from the server-provided Volcanoes 4x4 vehicles
  useEffect(() => {
    if (volcanoesInitialCars.length > 0) {
      const rates = volcanoesInitialCars.map((c: any) => c.trekkingRate || c.dailyRate);
      setPriceRange([Math.min(...rates), Math.max(...rates)]);
    }
  }, []);

  // Vehicle brands for filtering
  const vehicleBrands = ["all", ...Array.from(new Set(vehicles.map(v => v.brand)))].filter(b => b !== 'all');

  // Seat options
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Transmission options
  const transmissionOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.transmission)))];

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    if (selectedTransmission !== "all" && vehicle.transmission !== selectedTransmission) return false;
    const rate = vehicle.trekkingRate || vehicle.dailyRate;
    if (rate < priceRange[0] || rate > priceRange[1]) return false;
    if (highClearance && !vehicle.highClearance) return false;
    if (lowRange && !vehicle.lowRangeGearing) return false;
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

  // Volcanoes National Park information
  const volcanoesInfo = {
    location: "Musanze District, Northern Province",
    distance: "110 km from Kigali • 2.5 hours drive",
    elevation: "2,500m - 4,500m",
    attractions: "Mountain gorillas, golden monkeys, Mount Bisoke, Mount Karisimbi",
    bestTime: "June-September & December-February",
    entryFee: "$1,500 for gorilla permit (included in trekking packages)",
    terrain: "Steep slopes, muddy trails, high altitude, volcanic soil",
    accommodation: "Luxury lodges, hotels, campsites in Musanze town"
  };

  // Trekking start points
  const trekkingStartPoints = [
    { name: "Kinigi", elevation: "2,500m", popular: true },
    { name: "Bisoke", elevation: "3,000m", popular: false },
    { name: "Karisimbi", elevation: "3,500m", popular: false },
    { name: "Sabyinyo", elevation: "2,800m", popular: false }
  ];

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Volcanoes 4x4 Rental - Specialized Vehicles for Gorilla Trekking in Volcanoes National Park",
    "description": "4x4 rental for Volcanoes National Park gorilla trekking. Toyota Land Cruiser, Prado, Land Rover with high clearance, low-range gearing. Perfect for steep slopes, muddy roads, mountain terrain. Book your gorilla trekking transport.",
    "url": "https://kigalicarrental.site/volcanoes-4x4-rental",
    "telephone": "+250787619387",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "priceRange": "$$$",
    "areaServed": ["Volcanoes National Park", "Musanze", "Kigali", "Rwanda"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Volcanoes 4x4 Vehicles",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Land Cruiser for Gorilla Trekking"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Toyota Prado for Volcanoes"}},
        {"@type": "Offer", "itemOffered": {"@type": "Car", "name": "Land Rover Defender Mountain Terrain"}}
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
      {"@type": "ListItem", "position": 3, "name": "Volcanoes 4x4 Rental", "item": "https://kigalicarrental.site/volcanoes-4x4-rental"}
    ]
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - VOLCANOES 4X4 */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Gorilla Trekking */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920" 
              alt="Volcanoes 4x4 rental - Gorilla trekking vehicle in Volcanoes National Park"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">4x4 Vehicles</span>
                <span>›</span>
                <span className="text-white">Volcanoes 4x4 Rental</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-blue-200">Volcanoes 4x4</span> Rental
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                <span className="text-blue-200 font-semibold">Specialized 4x4 vehicles</span> for gorilla trekking 
                in Volcanoes National Park. Toyota Land Cruiser, Prado, Land Rover with high clearance, 
                low-range gearing. Perfect for steep slopes and muddy mountain roads.
              </p>
              
              {/* KEY VOLCANOES METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-blue-50 backdrop-blur-sm rounded-xl p-4 border border-blue-100/30">
                  <div className="text-2xl font-bold text-blue-200">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">4x4 Vehicles</div>
                </div>
                <div className="bg-blue-50 backdrop-blur-sm rounded-xl p-4 border border-blue-100/30">
                  <div className="text-2xl font-bold text-blue-200">2.5 hrs</div>
                  <div className="text-xs text-gray-300 mt-1">From Kigali</div>
                </div>
                <div className="bg-blue-50 backdrop-blur-sm rounded-xl p-4 border border-blue-100/30">
                  <div className="text-2xl font-bold text-blue-200">4,500m</div>
                  <div className="text-xs text-gray-300 mt-1">Peak Elevation</div>
                </div>
                <div className="bg-blue-50 backdrop-blur-sm rounded-xl p-4 border border-blue-100/30">
                  <div className="text-2xl font-bold text-blue-200">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Customer Support</div>
                </div>
              </div>
              
              {/* VOLCANOES BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-200 text-blue-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  GORILLA TREKKING SPECIALISTS • 4X4 ESSENTIAL
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-blue-200 text-blue-600 font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  View 4x4 Fleet
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-blue-200 text-blue-200 font-bold rounded-lg hover:bg-blue-200/10 transition-all text-lg"
                >
                  Trekking Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-200/10 to-transparent"></div>
        </div>

        {/* VOLCANOES INFORMATION STRIP */}
        <div className="bg-blue-600 border-y border-blue-800/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">Musanze • 2.5 hrs from Kigali</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Best time: June-September</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Gorilla permit: $1,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* VOLCANOES TREKKING PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gorilla Trekking <span className="text-blue-600">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete packages with 4x4 vehicle, driver, and gorilla permit
            </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transport Only Package */}
            <div className="bg-white rounded-2xl border-2 border-blue-100 p-8 hover:border-blue-600 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4x4 Transport Only</h3>
              <p className="text-gray-600 mb-4">Vehicle for your gorilla trekking</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-blue-600">$120</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Toyota Land Cruiser or Prado
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  High clearance • 4x4 capability
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pickup from Kigali or Musanze
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park entry assistance
                </li>
              </ul>
              <Link
                href="/booking/volcanoes?package=transport"
                className="block w-full text-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all"
              >
                Book 4x4 Transport
              </Link>
            </div>
            
            {/* 4x4 + Driver Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4x4 + Driver</h3>
              <p className="text-gray-600 mb-4">Professional driver who knows the terrain</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-blue-600">$185</span>
                <span className="text-gray-500">/day</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium 4x4 vehicle
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Experienced mountain driver
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Knows all trekking start points
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Waits during your trek
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flexible return timing
                </li>
              </ul>
              <Link
                href="/booking/volcanoes?package=driver"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                Book 4x4 + Driver
              </Link>
            </div>
            
            {/* Complete Trekking Package */}
            <div className="bg-white rounded-2xl border-2 border-blue-100 p-8 hover:border-blue-600 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Trekking</h3>
              <p className="text-gray-600 mb-4">3-day package</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-blue-600">$1,650</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  4x4 vehicle + driver (3 days)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gorilla permit not included ($1,500 value)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  free soft drinks 
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Park entry fees not included
                </li>
              </ul>
              <Link
                href="/booking/volcanoes?package=complete"
                className="block w-full text-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all"
              >
                Book Complete Package
              </Link>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Vehicle Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  <option value="all">All Brands</option>
                  {vehicleBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Seats Filter */}
              <div>
                <label className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  {seatOptions.map(seat => (
                    <option key={seat} value={seat}>
                      {seat === 'all' ? 'All' : `${seat} Seats`}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Transmission Filter */}
              <div>
                <label className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Transmission
                </label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  {transmissionOptions.map(trans => (
                    <option key={trans} value={trans}>
                      {trans === 'all' ? 'All' : trans}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Daily Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={90}
                    max={350}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-blue-600"
                  />
                  <input
                    type="range"
                    min={90}
                    max={350}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-600 mt-2"
                  />
                </div>
              </div>
              
              {/* Terrain Features */}
              <div>
                <label className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Terrain Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highClearance}
                      onChange={(e) => setHighClearance(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
                    />
                    <span className="text-sm text-gray-700">High Clearance</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lowRange}
                      onChange={(e) => setLowRange(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
                    />
                    <span className="text-sm text-gray-700">Low-Range Gearing</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guideIncluded}
                      onChange={(e) => setGuideIncluded(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
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
                  <span className="font-bold text-blue-600 text-lg">{filteredVehicles.length}</span> 4x4 vehicles available for Volcanoes
                </span>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSeats('all');
                    setSelectedTransmission('all');
                    setHighClearance(false);
                    setLowRange(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.trekkingRate || v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading Volcanoes 4x4 vehicles...</p>
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
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our Volcanoes trekking specialists.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedSeats('all');
                    setSelectedTransmission('all');
                    setHighClearance(false);
                    setLowRange(false);
                    setGuideIncluded(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.trekkingRate || v.dailyRate);
                      setPriceRange([Math.min(...rates), Math.max(...rates)]);
                    }
                  }}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All 4x4 Vehicles
                </button>
                <a
                  href="tel:+250787619387"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call Trekking Specialists
                </a>
              </div>
            </div>
          )}

          {/* VOLCANOES 4X4 VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Volcanoes <span className="text-blue-600">4x4 Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles ready for gorilla trekking</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold border border-blue-100">
                  {filteredVehicles.length} Trekking Ready
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const rate = vehicle.trekkingRate || vehicle.dailyRate;
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Volcanoes 4x4 rental for gorilla trekking`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/4x4-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* VOLCANOES BADGE */}
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          VOLCANOES 4X4
                        </div>
                        
                        {/* TERRAIN BADGE */}
                        <div className="absolute top-4 right-4 bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⛰️ MOUNTAIN TERRAIN
                        </div>
                        
                        {/* VEHICLE INFO */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-lg font-bold">{vehicle.brand} {vehicle.model}</div>
                          <div className="text-sm text-gray-300">{vehicle.engine} • {vehicle.seats} seats</div>
                        </div>
                      </div>
                      
                        {/* DETAILS SECTION */}
                        <div className="p-6">
                        {/* VEHICLE SPECS */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-500">Clearance</div>
                              <div className="font-bold text-gray-800">{vehicle.groundClearance || 'High'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Drive</div>
                              <div className="font-bold text-gray-800">{vehicle.driveType}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Transmission</div>
                              <div className="font-bold text-gray-800">{vehicle.transmission}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Fuel</div>
                              <div className="font-bold text-gray-800">{vehicle.fuelType}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* TERRAIN CAPABILITIES */}
                        <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">Terrain Capabilities:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.steepSlopeCapable && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">⛰️ Steep Slopes</span>
                            )}
                            {vehicle.muddyRoadCapable && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🟫 Mud</span>
                            )}
                            {vehicle.rockyTerrainCapable && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🪨 Rocky</span>
                            )}
                            {vehicle.diffLock && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🔒 Diff Lock</span>
                            )}
                          </div>
                        </div>
                        
                        {/* TREKKING START POINTS */}
                        <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">Trekking Start Points:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.trekkingStartPoints?.map((point, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
                                {point}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* BEST FOR */}
                          <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">Best for:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.bestFor?.map((item, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
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
                                <span className="text-3xl font-bold text-blue-600">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/day</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">+ Driver</span>
                              <div className="text-sm font-bold text-gray-800">+$65/day</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/volcanoes?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all text-center"
                          >
                            Book 4x4
                          </Link>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="px-4 py-3 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all text-center"
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

        {/* VOLCANOES NATIONAL PARK INFORMATION */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About <span className="text-blue-200">Volcanoes National Park</span>
                </h2>
                <div className="space-y-4 text-gray-200">
                  <p>Volcanoes National Park is Rwanda's premier gorilla trekking destination. Home to endangered mountain gorillas and golden monkeys, the park covers 160 km² of lush montane forest and bamboo zones across five volcanoes.</p>
                  <p>The park is part of the Virunga Massif, shared with Uganda and DRC. Trekking starts early morning from Kinigi headquarters, with experienced guides leading small groups to habituated gorilla families.</p>
                  <p>Volcanoes sits just outside Musanze town in Rwanda's Northern Province, about 2 to 2.5 hours from Kigali on a well-maintained paved road — one of the easier park approaches in the country. Your vehicle's real job here is less about the trek itself, which is done entirely on foot with a park guide up steep, often muddy volcanic slopes, and more about getting you comfortably to park headquarters in Kinigi and to your lodge. Many lodges sit on unpaved, volcanic-soil access roads that soften considerably during the rainy periods (roughly March-May and September-November), which is where a 4x4 actually earns its keep on this trip. Gorilla permits are issued by the Rwanda Development Board at a fixed per-person fee, currently in the region of $1,500, and should be confirmed and booked well in advance since daily permit numbers are limited.</p>
                  <p className="text-sm text-gray-300">
                    Official park information:{" "}
                    <a href="https://visitrwanda.com/destinations/volcanoes-national-park/" target="_blank" rel="noopener noreferrer" className="underline text-blue-200 hover:text-white">
                      Visit Rwanda
                    </a>
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-2xl font-bold text-blue-200">160 km²</div>
                      <div className="text-sm">Park Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-200">4,507m</div>
                      <div className="text-sm">Mt. Karisimbi</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-200">12+</div>
                      <div className="text-sm">Gorilla Families</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-200">$1,500</div>
                      <div className="text-sm">Gorilla Permit</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Trekking Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Duration:</span> 2-6 hours depending on gorilla location
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Difficulty:</span> Moderate to strenuous
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">Start Time:</span> 7:00 AM from Kinigi
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <span className="font-bold">What to bring:</span> Hiking boots, rain jacket, gloves, lunch, water
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="https://www.volcanoesnationalpark.rw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-200 hover:underline"
                  >
                    Visit official Volcanoes website →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TREKKING START POINTS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trekking <span className="text-blue-600">Start Points</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your 4x4 will take you to these trailheads
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trekkingStartPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-gray-200">
                <div className="text-4xl mb-3">⛰️</div>
                <div className="font-bold text-gray-800">{point.name}</div>
                <div className="text-sm text-blue-600 font-semibold mt-1">{point.elevation}</div>
                {point.popular && (
                  <div className="mt-2 text-xs bg-blue-200 text-blue-600 px-2 py-1 rounded-full inline-block">
                    Most Popular
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* VOLCANOES FAQ SECTION - SEO BOOST */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Volcanoes 4x4 Rental - <span className="text-blue-600">FAQ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about 4x4 rental for gorilla trekking
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-600 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I need a 4x4 for Volcanoes National Park?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, absolutely. The main road from Kigali to Musanze is good tarmac, but the roads to Kinigi park headquarters and onward to many lodges run over unpaved volcanic soil that gets soft and rutted in the rainy months (roughly March-May and September-November). A high-clearance 4x4 with low-range gearing is essential for these access roads, even though the trek itself is done on foot. We recommend Toyota Land Cruiser or Prado.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-600 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the best vehicle for gorilla trekking?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toyota Land Cruiser Prado or V8 are ideal. They offer excellent ground clearance, low-range gearing, and comfortable seating for the 2.5-hour drive from Kigali. Land Rover Defender is also excellent.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-600 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I drive myself to the trekking start?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, self-drive is possible if you're confident in mountain terrain. However, we recommend hiring a local driver who knows the roads and can navigate the challenging conditions safely.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-600 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long does it take from Kigali to Volcanoes?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The drive from Kigali to Musanze (base town for Volcanoes NP) takes approximately 2.5 hours (110 km). From Musanze to trekking start points is another 30-60 minutes on rough roads.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-600 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer 4x4 with driver?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! Our most popular option is 4x4 with professional driver. They know the roads, wait during your trek, and ensure you return safely. Driver rates are $65/day extra.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-600 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is included in the complete trekking package?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our 3-day complete package includes 4x4 with driver, gorilla permit ($1,500), 2 nights accommodation in Musanze, and park entry fees. Everything organized for a stress-free experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl border border-blue-200/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Gorilla Trekking Adventure?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Book your 4x4 vehicle today. Specialized for Volcanoes National Park terrain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-blue-200 text-blue-600 font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                View 4x4 Fleet
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-blue-200 text-blue-200 font-bold rounded-lg hover:bg-blue-200/10 transition-colors text-lg"
              >
                Trekking Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Toyota Land Cruiser • Prado • Land Rover • High clearance • Low-range • Diff lock • Mountain terrain specialists
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
