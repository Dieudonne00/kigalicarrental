// app/event-transport-driver/EventTransportDriverClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface EventTransportVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  eventRate: number;
  hourlyRate: number;
  dailyRate: number;
  packageRate?: number;
  driverLanguages: string[];
  driverExperience: number;
  eventUniform: boolean;
  formalAttire: boolean;
  decorationAllowed: boolean;
  champagneService: boolean;
  redCarpet: boolean;
  photoOpportunity: boolean;
  flexibleTiming: boolean;
  multiStop: boolean;
  waitingService: boolean;
  imageUrl: string;
  available: boolean;
  location: string;
  eventTypes: string[];
  weddingExperience: boolean;
  conferenceExperience: boolean;
  concertExperience: boolean;
  festivalExperience: boolean;
  corporateEvent: boolean;
  privateParty: boolean;
}

export default function EventTransportDriverClient() {
  const [vehicles, setVehicles] = useState<EventTransportVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [formalAttire, setFormalAttire] = useState(false);
  const [decorationAllowed, setDecorationAllowed] = useState(false);

  // Fetch event transport vehicles from DB
  useEffect(() => {
    const fetchEventVehicles = async () => {
      try {
        setLoading(true);
        // API endpoint for event transport vehicles
        const response = await fetch("/api/cars?event=true&transport=true");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          // Filter for vehicles with event transport capability
          const eventCars = data.cars.filter((car: any) => 
            car.weddings === true || 
            car.corporateEvents === true ||
            car.eventTransport === true ||
            car.weddingExperience === true ||
            car.conferenceExperience === true
          );
          setVehicles(eventCars);
          
          if (eventCars.length > 0) {
            const rates = eventCars.map((c: any) => c.eventRate || c.packageRate || c.dailyRate || 85);
            setPriceRange([Math.min(...rates), Math.max(...rates)]);
          }
        }
      } catch (error) {
        console.error("Error fetching event transport vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventVehicles();
  }, []);

  // Event types for filtering
  const eventTypes = [
    { id: "all", name: "All Events", icon: "🎉" },
    { id: "wedding", name: "Weddings", icon: "💍" },
    { id: "conference", name: "Conferences", icon: "🎤" },
    { id: "corporate", name: "Corporate Events", icon: "💼" },
    { id: "concert", name: "Concerts", icon: "🎵" },
    { id: "festival", name: "Festivals", icon: "🎪" },
    { id: "private", name: "Private Parties", icon: "🥂" },
    { id: "graduation", name: "Graduations", icon: "🎓" },
  ];

  // Duration options
  const durationOptions = [
    { id: "all", name: "Any Duration" },
    { id: "hourly", name: "Hourly (1-4 hrs)" },
    { id: "halfday", name: "Half Day (4 hrs)" },
    { id: "fullday", name: "Full Day (8 hrs)" },
    { id: "weekend", name: "Weekend Package" },
    { id: "multiday", name: "Multi-Day Event" },
  ];

  // Get unique values from real data
  const languages = ["all", ...Array.from(new Set(vehicles.flatMap(v => v.driverLanguages || ['English', 'French', 'Kinyarwanda', 'Swahili'])))];
  const seatOptions = ["all", ...Array.from(new Set(vehicles.map(v => v.seats.toString())))].sort();

  // Filter vehicles based on criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedEventType !== "all") {
      if (selectedEventType === "wedding" && !vehicle.weddingExperience && !vehicle.eventTypes?.includes('wedding')) return false;
      if (selectedEventType === "conference" && !vehicle.conferenceExperience && !vehicle.eventTypes?.includes('conference')) return false;
      if (selectedEventType === "corporate" && !vehicle.corporateEvent && !vehicle.eventTypes?.includes('corporate')) return false;
      if (selectedEventType === "concert" && !vehicle.concertExperience && !vehicle.eventTypes?.includes('concert')) return false;
      if (selectedEventType === "festival" && !vehicle.festivalExperience && !vehicle.eventTypes?.includes('festival')) return false;
      if (selectedEventType === "private" && !vehicle.privateParty && !vehicle.eventTypes?.includes('private')) return false;
    }
    if (selectedLanguage !== "all" && !vehicle.driverLanguages?.includes(selectedLanguage)) return false;
    if (selectedSeats !== "all" && vehicle.seats.toString() !== selectedSeats) return false;
    const rate = vehicle.eventRate || vehicle.packageRate || vehicle.dailyRate || 85;
    if (rate < priceRange[0] || rate > priceRange[1]) return false;
    if (formalAttire && !vehicle.formalAttire && !vehicle.eventUniform) return false;
    if (decorationAllowed && !vehicle.decorationAllowed) return false;
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
    "name": "Event Transport Driver Kigali - Professional Transportation for Weddings, Conferences & Special Occasions",
    "description": "Professional event transport driver service in Kigali for weddings, conferences, corporate events, concerts, festivals, and private parties. Luxury vehicles, formal attire drivers, decoration allowed, champagne service, red carpet options.",
    "url": "https://kigalicarrental.site/event-transport-driver",
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
      "@type": "City",
      "name": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "312"
    },
    "priceRange": "$$$",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "50",
      "highPrice": "500",
      "offerCount": vehicles.length
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Event Transport Services",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Wedding Transport"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Conference Shuttle"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Corporate Event Transport"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Concert & Festival Transport"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Private Party Driver"}}
      ]
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kigalicarrental.site/"},
      {"@type": "ListItem", "position": 2, "name": "Event Services", "item": "https://kigalicarrental.site/event-services"},
      {"@type": "ListItem", "position": 3, "name": "Event Transport Driver", "item": "https://kigalicarrental.site/event-transport-driver"}
    ]
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION - EVENT TRANSPORT DRIVER */}
        <div className="relative bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          
          {/* Hero Image - Wedding Car */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920" 
              alt="Event transport driver Kigali - Wedding car with chauffeur"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumbs for SEO */}
              <div className="flex items-center gap-2 text-sm text-[#93C5FD] mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="hover:text-white transition-colors">Event Services</span>
                <span>›</span>
                <span className="text-white">Event Transport Driver</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-[#93C5FD]">Event Transport</span> Driver Kigali
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Professional <span className="text-[#93C5FD] font-semibold">event transportation</span> for weddings, conferences, 
                corporate events, concerts & private parties. Luxury vehicles, formal attire drivers, decoration allowed.
              </p>
              
              {/* KEY EVENT METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">{vehicles.length}+</div>
                  <div className="text-xs text-gray-300 mt-1">Event Vehicles</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">30+</div>
                  <div className="text-xs text-gray-300 mt-1">Event Drivers</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">8</div>
                  <div className="text-xs text-gray-300 mt-1">Event Types</div>
                </div>
                <div className="bg-[#1D4ED8]/40 backdrop-blur-sm rounded-xl p-4 border border-[#93C5FD]/30">
                  <div className="text-2xl font-bold text-[#93C5FD]">4.9★</div>
                  <div className="text-xs text-gray-300 mt-1">312+ Reviews</div>
                </div>
              </div>
              
              {/* EVENT BADGE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#93C5FD] text-[#1D4ED8] px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                  ALL EVENT TYPES WELCOME
                </div>
              </div>
              
              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#fleet"
                  className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Book Event Transport
                </Link>
                <a
                  href="tel:+250787619387"
                  className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-all text-lg"
                >
                  Event Hotline: +250 787 619 387
                </a>
              </div>
            </div>
          </div>
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#93C5FD]/10 to-transparent"></div>
        </div>

        {/* EVENT TYPE SELECTOR - STICKY */}
        <div className="bg-[#1D4ED8] border-y border-[#3B82F6]/30 py-4 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {eventTypes.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEventType(event.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedEventType === event.id
                      ? "bg-[#93C5FD] text-[#1D4ED8] shadow-lg"
                      : "bg-[#1D4ED8]/40 text-white hover:bg-[#1D4ED8]/60 border border-[#93C5FD]/30"
                  }`}
                >
                  <span className="mr-2">{event.icon}</span>
                  {event.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EVENT PACKAGES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Event Transport <span className="text-[#1D4ED8]">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tailored transportation solutions for every special occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wedding Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Wedding Package</h3>
              <p className="text-gray-600 mb-4">Make your special day unforgettable</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$180</span>
                <span className="text-gray-500">/4 hours</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Formal attire chauffeur
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Decoration allowed
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Champagne service
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Red carpet option
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Photo opportunity stops
                </li>
              </ul>
              <Link
                href="/booking/event?package=wedding"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Wedding Transport
              </Link>
            </div>
            
            {/* Conference Package - MOST POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Conference Package</h3>
              <p className="text-gray-600 mb-4">Full-day delegate transport</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$320</span>
                <span className="text-gray-500">/8 hours</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional corporate driver
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multiple hotel pickups
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Convention center transfers
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Airport transfers included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Evening event shuttle
                </li>
              </ul>
              <Link
                href="/booking/event?package=conference"
                className="block w-full text-center px-6 py-3 bg-[#1D4ED8] text-white rounded-lg font-bold hover:bg-[#1E40AF] transition-all"
              >
                Book Conference Transport
              </Link>
            </div>
            
            {/* Concert/Festival Package */}
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8]/20 p-8 hover:border-[#1D4ED8] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D4ED8] transition-colors">
                <svg className="w-8 h-8 text-[#1D4ED8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Concert & Festival</h3>
              <p className="text-gray-600 mb-4">Group transport for music events</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#1D4ED8]">$140</span>
                <span className="text-gray-500">/vehicle</span>
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
                  Flexible pickup/dropoff
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Waiting service included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Late night return
                </li>
              </ul>
              <Link
                href="/booking/event?package=concert"
                className="block w-full text-center px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg font-bold hover:bg-[#1D4ED8] hover:text-white transition-all"
              >
                Book Concert Transport
              </Link>
            </div>
          </div>
        </div>

        {/* WEDDING CONVOYS AND CONFERENCE LOGISTICS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Wedding and Conference Transport Isn't a Single Transfer
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl">
              <p>
                A Kigali wedding day is rarely one trip in one car. It's usually a convoy moving between a church or ceremony venue, one or more photo locations, and a reception venue — common choices include Kigali Serena Hotel, Ubumwe Grande Hotel, Radisson Blu, or one of the city's garden and outdoor venues. Coordinating that means timing several vehicles against each other so the bridal party, family, and guests all arrive where they need to be without one car holding up the schedule. That's a different problem than booking a single transfer, which is why wedding bookings are handled as a coordinated package rather than separate one-off trips.
              </p>
              <p>
                Conferences and corporate events at venues like the Kigali Convention Centre have the opposite challenge: instead of a small group moving between a few stops, it's often dozens of delegates on a fixed schedule who all need to be in the same place at the same time — picked up from different hotels in the morning and shuttled to an evening event afterward. That calls for pre-planned pickup windows and enough vehicles on standby to absorb a group running a few minutes behind, rather than a single car and driver.
              </p>
              <p>
                On decoration: for weddings, simple ribbon and flower arrangements on the vehicle are standard and included — just tell us your color scheme in advance. If you're planning something more elaborate, mention it when booking so we can confirm the extra setup time needed before the vehicle goes back into general use.
              </p>
            </div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="fleet">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1D4ED8]/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
              {/* Event Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Event Type
                </label>
                <select
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white"
                >
                  {eventTypes.map(type => (
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
                  Capacity
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
              
              {/* Duration Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Duration
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
                  Package Rate: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="pt-3">
                  <input
                    type="range"
                    min={50}
                    max={600}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1D4ED8]"
                  />
                  <input
                    type="range"
                    min={50}
                    max={600}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1D4ED8] mt-2"
                  />
                </div>
              </div>
              
              {/* Special Options */}
              <div>
                <label className="block text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                  Special Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formalAttire}
                      onChange={(e) => setFormalAttire(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Formal Attire Driver</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={decorationAllowed}
                      onChange={(e) => setDecorationAllowed(e.target.checked)}
                      className="w-4 h-4 text-[#1D4ED8] rounded border-gray-300 focus:ring-[#1D4ED8]"
                    />
                    <span className="text-sm text-gray-700">Decoration Allowed</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Results and Reset */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-[#1D4ED8] text-lg">{filteredVehicles.length}</span> event vehicles available
                </span>
                <button
                  onClick={() => {
                    setSelectedEventType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    setFormalAttire(false);
                    setDecorationAllowed(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.eventRate || v.packageRate || v.dailyRate || 85);
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
              <p className="mt-6 text-gray-600 text-lg">Loading event transport vehicles...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No event vehicles match your criteria</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Please adjust your filters or contact our event desk for custom requirements.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedEventType('all');
                    setSelectedLanguage('all');
                    setSelectedSeats('all');
                    setSelectedDuration('all');
                    setFormalAttire(false);
                    setDecorationAllowed(false);
                    if (vehicles.length > 0) {
                      const rates = vehicles.map(v => v.eventRate || v.packageRate || v.dailyRate || 85);
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
                  Call Event Desk
                </a>
              </div>
            </div>
          )}

          {/* EVENT VEHICLE GRID */}
          {!loading && filteredVehicles.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Event Transport <span className="text-[#1D4ED8]">Fleet</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredVehicles.length} vehicles with professional event drivers</p>
                </div>
                <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-4 py-2 rounded-lg text-sm font-bold border border-[#1D4ED8]/20">
                  {filteredVehicles.length} Ready for Events
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const rate = vehicle.eventRate || vehicle.packageRate || vehicle.dailyRate || 85;
                  
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#1D4ED8] hover:shadow-2xl transition-all duration-300"
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={vehicle.imageUrl}
                          alt={`${vehicle.brand} ${vehicle.model} - Event transport driver Kigali`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/event-placeholder.jpg';
                          }}
                        />
                        
                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* EVENT BADGE */}
                        <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                          </svg>
                          EVENT READY
                        </div>
                        
                        {/* FORMAL ATTIRE BADGE */}
                        {vehicle.formalAttire && (
                          <div className="absolute top-4 right-4 bg-[#93C5FD] text-[#1D4ED8] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            👔 FORMAL
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
                        {/* DRIVER INFO */}
                        <div className="bg-[#1D4ED8]/5 rounded-lg p-4 mb-4 border border-[#1D4ED8]/20">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#1D4ED8] rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Event Driver</div>
                              <div className="text-xs text-gray-600">
                                {vehicle.driverLanguages?.join(' • ')} • {vehicle.driverExperience}+ years
                              </div>
                            </div>
                          </div>
                          
                          {/* EVENT EXPERIENCE */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {vehicle.weddingExperience && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">💍 Weddings</span>
                            )}
                            {vehicle.conferenceExperience && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🎤 Conferences</span>
                            )}
                            {vehicle.corporateEvent && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">💼 Corporate</span>
                            )}
                            {vehicle.concertExperience && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">🎵 Concerts</span>
                            )}
                          </div>
                        </div>
                        
                        {/* EVENT FEATURES */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {vehicle.decorationAllowed && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Decoration Allowed">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                          )}
                          {vehicle.champagneService && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Champagne Service">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.redCarpet && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Red Carpet">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          )}
                          {vehicle.photoOpportunity && (
                            <div className="bg-gray-50 rounded-lg p-2 text-center" title="Photo Stops">
                              <svg className="w-4 h-4 text-[#1D4ED8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* EVENT TYPES */}
                        <div className="mb-4">
                          <div className="text-xs font-bold text-gray-700 mb-2">Perfect for:</div>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.eventTypes?.slice(0, 5).map((type, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* PRICING */}
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xs text-gray-500">Event Package Rate</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-[#1D4ED8]">{formatCurrency(rate)}</span>
                                <span className="text-sm text-gray-500">/package</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Hourly</span>
                              <div className="text-sm font-bold text-gray-800">{formatCurrency(vehicle.hourlyRate || 45)}/hr</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/booking/event?vehicle=${vehicle.id}`}
                            className="px-4 py-3 bg-[#1D4ED8] text-white text-sm font-bold rounded-lg hover:bg-[#1E40AF] transition-all text-center"
                          >
                            Book for Event
                          </Link>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="px-4 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] text-sm font-bold rounded-lg hover:bg-[#1D4ED8]/5 transition-all text-center"
                          >
                            View Details
                          </Link>
                        </div>
                        
                        {/* EVENT NOTE */}
                        {vehicle.flexibleTiming && (
                          <div className="mt-3 text-[10px] text-[#1D4ED8] text-center font-semibold">
                            ✓ Flexible timing • Multi-stop service available
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

        {/* WHY CHOOSE EVENT TRANSPORT DRIVER */}
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] text-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our <span className="text-[#93C5FD]">Event Transport Service</span>
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Making your special occasions seamless, stylish, and stress-free
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Wedding Specialists</h3>
                <p className="text-gray-300 text-sm">Experienced with bridal parties, photo stops, and timing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Corporate Events</h3>
                <p className="text-gray-300 text-sm">Professional service for conferences and business gatherings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Concerts & Festivals</h3>
                <p className="text-gray-300 text-sm">Group transport with flexible pickup/dropoff times</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#93C5FD]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#93C5FD]/30">
                  <svg className="w-8 h-8 text-[#93C5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Packages</h3>
                <p className="text-gray-300 text-sm">Customized to your event needs and budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* EVENT FAQ SECTION - SEO BOOST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Event Transport Driver - <span className="text-[#1D4ED8]">FAQ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about event transportation in Kigali
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What types of events do you cover?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We cover all event types including weddings, conferences, corporate events, concerts, festivals, private parties, graduations, anniversaries, and any special occasion requiring professional transportation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can we decorate the vehicle for weddings?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolutely! Wedding vehicles can be decorated with ribbons, flowers, and other decorations. Just let us know your requirements in advance. We also offer champagne service and red carpet options.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do drivers wear formal attire for events?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! For weddings and formal events, our drivers wear suits or formal attire. For corporate events, they wear professional business attire. You can specify your preference when booking.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How do conference shuttles work?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We coordinate with your event team to manage delegate transfers between hotels, the convention center, airport, and evening events. Multiple vehicles can be arranged for large conferences with real-time coordination.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What vehicles are available for events?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer luxury sedans for weddings, SUVs for VIP guests, minivans for small groups, and minibuses for up to 14 passengers. All vehicles are immaculately cleaned and prepared for events.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-[#1D4ED8] transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can you accommodate multi-stop itineraries?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
              Yes! We specialize in complex event logistics including multiple pickups, photo stops, venue changes, and staggered dropoffs. Our drivers are experienced with event timing and coordination.
              </p>
            </div>
          </div>
        </div>

        {/* EVENT GALLERY / INSPIRATION */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Perfect for Every Occasion
              </h2>
              <p className="text-gray-600">From intimate gatherings to large-scale events</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">💍</div>
                <div className="font-bold text-gray-800">Weddings</div>
                <div className="text-xs text-gray-500 mt-1">Bridal party transport</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">🎤</div>
                <div className="font-bold text-gray-800">Conferences</div>
                <div className="text-xs text-gray-500 mt-1">Delegate shuttles</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">💼</div>
                <div className="font-bold text-gray-800">Corporate Events</div>
                <div className="text-xs text-gray-500 mt-1">Executive transport</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">🎵</div>
                <div className="font-bold text-gray-800">Concerts</div>
                <div className="text-xs text-gray-500 mt-1">Group pickup/dropoff</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">🎪</div>
                <div className="font-bold text-gray-800">Festivals</div>
                <div className="text-xs text-gray-500 mt-1">Shuttle services</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">🥂</div>
                <div className="font-bold text-gray-800">Private Parties</div>
                <div className="text-xs text-gray-500 mt-1">Guest transport</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">🎓</div>
                <div className="font-bold text-gray-800">Graduations</div>
                <div className="text-xs text-gray-500 mt-1">Family celebrations</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">🎉</div>
                <div className="font-bold text-gray-800">Anniversaries</div>
                <div className="text-xs text-gray-500 mt-1">Special milestones</div>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#1D4ED8]">Event Clients Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              312+ 5-star reviews from weddings, conferences, and special events
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
              <p className="text-gray-700 mb-4">"Our wedding day was perfect thanks to the amazing team. The car was beautifully decorated, the driver was in a suit, and he even had champagne ready. Made our entrance so special!"</p>
              <div className="font-bold text-gray-900">Clarisse & David</div>
              <div className="text-sm text-gray-500">Wedding • Kigali</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Managed transport for our 3-day conference with 200 delegates. Flawless coordination between hotels and convention center. Drivers were professional and always on time."</p>
              <div className="font-bold text-gray-900">International NGO</div>
              <div className="text-sm text-gray-500">Conference • Kigali Convention Centre</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <p className="text-gray-700 mb-4">"Booked a minibus for our group of 12 to a music festival. Driver waited for us, helped with coordination, and got us home safely. Will definitely use again for our next event."</p>
              <div className="font-bold text-gray-900">Festival Crew</div>
              <div className="text-sm text-gray-500">Concert Transport • Group Booking</div>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#93C5FD]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planning a Special Event?
            </h2>
            <p className="text-xl text-[#93C5FD] mb-8 max-w-2xl mx-auto">
              Let us handle the transportation. Professional drivers, luxury vehicles, seamless service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#fleet"
                className="px-8 py-4 bg-[#93C5FD] text-[#1D4ED8] font-bold rounded-lg hover:bg-white transition-colors text-lg"
              >
                Book Event Transport
              </Link>
              <a
                href="tel:+250787619387"
                className="px-8 py-4 bg-transparent border-2 border-[#93C5FD] text-[#93C5FD] font-bold rounded-lg hover:bg-[#93C5FD]/10 transition-colors text-lg"
              >
                Event Hotline: +250 787 619 387
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Weddings • Conferences • Corporate Events • Concerts • Festivals • Private Parties • Graduations
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
