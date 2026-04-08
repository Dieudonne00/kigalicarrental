"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // COMPREHENSIVE CAR RENTAL MENU WITH 10+ SUBS EACH
  const menuStructure = [
    {
      label: "CAR RENTAL",
      href: "/car-hire-rwanda",
      submenus: [
        { label: "Car Hire Rwanda", href: "/car-hire-rwanda", keywords: ["car rental Rwanda", "vehicle hire Rwanda", "best car rental Rwanda"] },
        { label: "Car Rental Kigali", href: "/car-rental-kigali", keywords: ["Kigali car hire", "Kigali rental cars", "affordable car rental Kigali"] },
        { label: "Kigali Airport Car Rental", href: "/kigali-airport-car-rental", keywords: ["airport pickup", "KGL airport rental", "arrival car rental"] },
        { label: "Cheap Car Rental Kigali", href: "/cheap-car-rental-kigali", keywords: ["budget car hire", "affordable rental", "economy cars Rwanda"] },
        { label: "Long Term Car Rental Rwanda", href: "/long-term-car-rental-rwanda", keywords: ["monthly rental", "extended lease", "long term car hire"] },
        { label: "Luxury Car Rental Kigali", href: "/luxury-car-rental-kigali", keywords: ["premium cars", "executive vehicles", "luxury car hire Rwanda"] },
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda", keywords: ["self drive rental", "drive yourself", "independent travel Rwanda"] },
        { label: "Driver Car Hire Kigali", href: "/driver-car-hire-kigali", keywords: ["chauffeur service", "driver hire", "car with driver Kigali"] },
        { label: "Self Drive Car Rental Kigali", href: "/self-drive-car-rental-kigali", keywords: ["rental without driver", "self-drive option", "no driver needed"] },
        { label: "Chauffeur Service Rwanda", href: "/chauffeur-service-rwanda", keywords: ["professional driver", "private chauffeur", "executive driver"] },
      ]
    },
    {
      label: "SELF DRIVE & DRIVER",
      href: "/self-drive-rwanda",
      submenus: [
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda", keywords: ["drive yourself Rwanda", "independent travel", "self-drive tours"] },
        { label: "Driver Car Hire Kigali", href: "/driver-car-hire-kigali", keywords: ["car with driver", "hire car with driver", "chauffeur driven"] },
        { label: "Self Drive Car Rental Kigali", href: "/self-drive-car-rental-kigali", keywords: ["no driver rental", "self-drive option", "rental car without driver"] },
        { label: "Chauffeur Service Rwanda", href: "/chauffeur-service-rwanda", keywords: ["luxury chauffeur", "professional driving", "VIP driver service"] },
        { label: "Private Driver Kigali", href: "/private-driver-kigali", keywords: ["personal driver", "dedicated chauffeur", "full-time driver"] },
        { label: "Rwanda Guided Transport", href: "/rwanda-guided-transport", keywords: ["guided tours", "tourist transport", "sightseeing driver"] },
        { label: "Airport Driver Service", href: "/airport-driver-service", keywords: ["airport chauffeur", "meet and greet driver", "arrival transfer"] },
        { label: "City Tour Driver", href: "/city-tour-driver", keywords: ["Kigali tour driver", "sightseeing chauffeur", "city exploration"] },
        { label: "Business Driver Service", href: "/business-driver-service", keywords: ["corporate driver", "executive chauffeur", "business travel"] },
        { label: "Event Transport Driver", href: "/event-transport-driver", keywords: ["wedding driver", "conference transport", "special event chauffeur"] },
      ]
    },
    {
      label: "SAFARI 4X4",
      href: "/4x4-car-rental-rwanda",
      submenus: [
        { label: "4x4 Car Rental Rwanda", href: "/4x4-car-rental-rwanda", keywords: ["four-wheel drive", "off-road rental", "safari vehicle Rwanda"] },
        { label: "Safari Car Rental Rwanda", href: "/safari-car-rental-rwanda", keywords: ["game drive vehicles", "safari tours", "wildlife safari rental"] },
        { label: "Land Cruiser Rental Rwanda", href: "/land-cruiser-rental-rwanda", keywords: ["Toyota Land Cruiser", "safari vehicle", "rugged 4x4 rental"] },
        { label: "Prado Rental Kigali", href: "/prado-rental-kigali", keywords: ["Toyota Prado", "luxury SUV rental", "premium 4x4 Kigali"] },
        { label: "Rooftop Tent Car Rental", href: "/rooftop-tent-car-rental-rwanda", keywords: ["camping car", "rooftop tent", "overland vehicle"] },
        { label: "Camping Car Rental Rwanda", href: "/camping-car-rental-rwanda", keywords: ["camping equipment", "outdoor rental", "adventure vehicle"] },
        { label: "Akagera Safari Rental", href: "/akagera-safari-rental", keywords: ["game park vehicle", "wildlife tour", "Akagera National Park"] },
        { label: "Volcanoes 4x4 Rental", href: "/volcanoes-4x4-rental", keywords: ["gorilla trekking transport", "mountain vehicle", "Volcanoes National Park"] },
        { label: "Nyungwe Forest Safari", href: "/nyungwe-forest-safari", keywords: ["rainforest vehicle", "canopy walk transport", "Nyungwe tours"] },
        { label: "Safari Package Deals", href: "/safari-package-deals", keywords: ["complete safari packages", "all-inclusive safari", "gorilla trekking package"] },
      ]
    },
    {
      label: "AIRPORT TRANSFER",
      href: "/kigali-airport-transfer",
      submenus: [
        { label: "Kigali Airport Transfer", href: "/kigali-airport-transfer", keywords: ["airport taxi", "airport shuttle", "KGL airport transfer"] },
        { label: "Airport Pickup Kigali", href: "/airport-pickup-kigali", keywords: ["meet at airport", "arrival service", "airport meet and greet"] },
        { label: "One Way Car Rental", href: "/one-way-car-rental-rwanda", keywords: ["different location drop-off", "flexible return", "one way hire"] },
        { label: "Hotel Delivery Service", href: "/hotel-delivery-car-rental-kigali", keywords: ["hotel pickup", "accommodation delivery", "hotel car delivery"] },
        { label: "Business Travel Car Hire", href: "/business-travel-car-hire-kigali", keywords: ["corporate rental", "business transport", "executive travel"] },
        { label: "Conference Transport", href: "/conference-transport-rwanda", keywords: ["event transport", "conference shuttle", "group transport"] },
        { label: "VIP Airport Service", href: "/vip-airport-service", keywords: ["premium airport service", "fast track", "luxury airport transfer"] },
        { label: "24/7 Airport Service", href: "/24-7-airport-service", keywords: ["late night arrival", "early morning flight", "anytime pickup"] },
      ]
    },
    {
      label: "RWANDA DESTINATIONS",
      href: "/car-rental-kigali-city",
      submenus: [
        { label: "Car Rental Kigali City", href: "/car-rental-kigali-city", keywords: ["city rental", "urban car hire", "Kigali city transport"] },
        { label: "Car Hire Musanze", href: "/car-hire-musanze", keywords: ["Volcanoes National Park", "gorilla trekking base", "Musanze car rental"] },
        { label: "Nyungwe Forest Rental", href: "/car-rental-nyungwe-forest", keywords: ["rainforest transport", "Nyungwe tours", "Nyungwe car hire"] },
        { label: "Akagera Park Car Hire", href: "/car-hire-akagera-national-park", keywords: ["safari park vehicle", "game drive", "Akagera car rental"] },
        { label: "Lake Kivu Car Rental", href: "/gisenyi-lake-kivu-car-rental", keywords: ["beach resort transport", "lake transport", "Gisenyi car hire"] },
        { label: "Rwanda Road Trip", href: "/rwanda-road-trip-car-hire", keywords: ["cross-country rental", "scenic routes", "road trip Rwanda"] },
      ]
    },
    {
      label: "TRAVEL GUIDE",
      href: "/driving-in-rwanda-guide",
      submenus: [
        { label: "Driving in Rwanda", href: "/driving-in-rwanda-guide", keywords: ["road rules Rwanda", "driving regulations", "Rwanda traffic laws"] },
        { label: "Car Rental Tips", href: "/car-rental-tips-rwanda", keywords: ["rental advice", "hiring tips", "car rental guide Rwanda"] },
        { label: "Travel Cost Guide", href: "/rwanda-travel-cost-guide", keywords: ["budget planning", "travel expenses", "Rwanda trip cost"] },
        { label: "Safety Guide", href: "/self-drive-safety-rwanda", keywords: ["safe driving", "road safety", "Rwanda driving safety"] },
        { label: "Best Roads Rwanda", href: "/best-roads-in-rwanda", keywords: ["scenic routes", "road conditions", "beautiful drives"] },
        { label: "Travel Requirements", href: "/rwanda-travel-requirements", keywords: ["visa information", "entry documents", "travel documents Rwanda"] },
      ]
    },
  ];

  // FLASH DEALS & PROMOTIONS
  const flashDeals = [
    { label: "🔥 LAST MINUTE", discount: "30% OFF", href: "/deals/last-minute", color: "from-red-600 to-orange-600" },
    { label: "🎯 WEEKEND", discount: "20% OFF", href: "/deals/weekend", color: "from-purple-600 to-pink-600" },
    { label: "⭐ LONG TERM", discount: "15% OFF", href: "/long-term-car-rental-rwanda", color: "from-blue-600 to-cyan-600" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white shadow-2xl py-2" 
        : "bg-white/95 backdrop-blur-md py-3"
    } border-b border-gray-100`}>
      
      {/* TOP ALERT BAR - 10% OFF FLASH SALE */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-2.5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <span className="bg-white text-red-600 px-3 py-1 rounded-full text-xs font-black animate-bounce">
                  🚨 FLASH SALE
                </span>
                <span className="font-bold text-sm md:text-base">
                  GET 10% OFF ON ALL BOOKINGS! USE CODE: 
                </span>
                <span className="bg-black/30 px-4 py-1.5 rounded-lg font-mono font-bold tracking-wider text-sm md:text-base backdrop-blur-sm">
                  RENTAL10
                </span>
                <span className="text-xs md:text-sm">
                  ✓ Valid for all vehicles ✓ No hidden fees
                </span>
              </div>
              
              <div className="flex gap-2">
                <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">
                  ⏰ Limited Time
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">
                  🚗 Only 50 Bookings Left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* MAIN NAVIGATION */}
        <nav className="flex items-center justify-between">
          {/* WORDMARK LOGO - TEXT BASED */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <div className="text-3xl">🚗</div>
                <div>
                  <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#4B5320] to-green-700 bg-clip-text text-transparent">
                    KIGALI CAR RENTALS
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Rwanda • East Africa
                  </div>
                </div>
              </div>
              <div className="hidden lg:block text-[9px] text-gray-400 font-semibold tracking-wide mt-0.5">
                BEST CAR HIRE SERVICES IN RWANDA | AIRPORT PICKUP | SELF DRIVE | SAFARI 4X4
              </div>
            </div>
          </Link>

          {/* DESKTOP MEGA MENU */}
          <div className="hidden xl:flex items-center gap-1">
            {menuStructure.map((menu) => (
              <div
                key={menu.label}
                className="relative group"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={menu.href}
                  className="px-4 py-3 text-gray-700 hover:text-[#4B5320] font-semibold hover:bg-gradient-to-r hover:from-gray-50 to-transparent rounded-lg transition-all duration-300 flex items-center gap-1 text-sm"
                  title={`${menu.label} - Best Car Rental Services in Rwanda | Affordable & Luxury Vehicle Hire`}
                >
                  {menu.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* MEGA SUBMENU */}
                {activeMenu === menu.label && (
                  <div className="absolute left-0 top-full pt-2 w-screen max-w-5xl animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="grid grid-cols-2 gap-0">
                        {/* Left Column - Main Links */}
                        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                          <h3 className="font-black text-lg bg-gradient-to-r from-[#4B5320] to-green-700 bg-clip-text text-transparent mb-4">
                            {menu.label} Services
                          </h3>
                          <div className="space-y-1">
                            {menu.submenus.slice(0, 6).map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center justify-between p-3 hover:bg-white rounded-xl transition-all group/sub"
                                title={sub.keywords?.join(", ")}
                              >
                                <div>
                                  <div className="font-semibold text-gray-800 group-hover/sub:text-[#4B5320] text-sm">
                                    {sub.label}
                                  </div>
                                  <div className="text-[11px] text-gray-400 mt-0.5">
                                    {sub.keywords?.slice(0, 2).join(" • ")}
                                  </div>
                                </div>
                                <svg className="w-4 h-4 text-gray-400 group-hover/sub:text-[#4B5320] translate-x-0 group-hover/sub:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Right Column - More Options + Special Offer */}
                        <div className="p-6 bg-white">
                          <h3 className="font-black text-gray-700 mb-4">More Options</h3>
                          <div className="space-y-1 mb-6">
                            {menu.submenus.slice(6, 10).map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block p-3 hover:bg-gray-50 rounded-xl transition"
                              >
                                <div className="font-medium text-gray-700 text-sm">{sub.label}</div>
                                <div className="text-[10px] text-gray-400">{sub.keywords?.[0]}</div>
                              </Link>
                            ))}
                          </div>

                          {/* 10% OFF SPECIAL OFFER */}
                          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4B5320] to-green-800 p-5 text-white">
                            <div className="absolute top-0 right-0 text-6xl opacity-10">💰</div>
                            <div className="relative">
                              <div className="text-xs font-bold uppercase tracking-wider">Limited Time Offer</div>
                              <div className="text-2xl font-black mt-1">10% OFF</div>
                              <div className="text-sm opacity-90 mt-1">on all car rentals</div>
                              <div className="flex items-center gap-2 mt-3">
                                <code className="bg-white/20 px-3 py-1 rounded text-xs font-mono">RENTAL10</code>
                                <Link
                                  href="/book-now"
                                  className="bg-white text-[#4B5320] px-4 py-1.5 rounded-lg text-sm font-bold hover:shadow-lg transition"
                                >
                                  Book Now →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SECTION - DEALS & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Flash Deal Badges */}
            {flashDeals.map((deal) => (
              <Link
                key={deal.label}
                href={deal.href}
                className={`group relative overflow-hidden px-3 py-2 rounded-xl bg-gradient-to-r ${deal.color} text-white hover:shadow-lg transition-all duration-300`}
              >
                <div className="relative z-10">
                  <div className="text-[9px] font-bold uppercase tracking-wider">{deal.label}</div>
                  <div className="text-xs font-black">{deal.discount}</div>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"></div>
              </Link>
            ))}

            {/* MAIN CTA - 10% OFF BUTTON */}
            <div className="relative">
              <Link
                href="/book-now?promo=RENTAL10"
                className="group relative overflow-hidden bg-gradient-to-r from-[#4B5320] via-green-700 to-[#4B5320] text-white px-8 py-3.5 rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider">Save Big</div>
                    <div className="text-sm font-black">GET 10% OFF</div>
                  </div>
                  <div className="h-8 w-px bg-white/30 mx-2"></div>
                  <div>
                    <div className="text-xs">Book Now</div>
                    <div className="text-[10px] opacity-75">Limited Slots</div>
                  </div>
                </div>
              </Link>
              
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                HOT
              </div>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="xl:hidden p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:shadow-md transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* MOBILE MEGA MENU */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 max-h-[80vh] overflow-y-auto animate-slideDown">
            {/* 10% OFF MOBILE BANNER */}
            <div className="mb-6 p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white text-center">
              <div className="text-xs font-bold uppercase tracking-wider">🎉 Special Promotion</div>
              <div className="text-2xl font-black mt-1">10% OFF</div>
              <div className="text-sm mt-1">Use Code: <span className="font-mono bg-white/20 px-2 py-0.5 rounded">RENTAL10</span></div>
              <Link
                href="/book-now"
                className="inline-block mt-3 bg-white text-red-600 px-6 py-2 rounded-xl font-bold text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Claim 10% Discount →
              </Link>
            </div>

            {/* Flash Deals Mobile */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {flashDeals.map((deal) => (
                <Link
                  key={deal.label}
                  href={deal.href}
                  className={`p-3 text-center rounded-xl bg-gradient-to-r ${deal.color} text-white`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="text-[9px] font-bold">{deal.label}</div>
                  <div className="text-xs font-black">{deal.discount}</div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Items */}
            <div className="space-y-3">
              {menuStructure.map((menu) => (
                <div key={menu.label} className="border-b border-gray-100 pb-3">
                  <Link
                    href={menu.href}
                    className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl font-bold text-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {menu.label}
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="pl-4 grid grid-cols-2 gap-2 mt-2">
                    {menu.submenus.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Contact & Second 10% OFF */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center space-y-3">
                <div className="flex justify-center gap-4 text-sm">
                  <a href="tel:+250787619387" className="text-gray-800 font-bold hover:text-[#4B5320]">📞 +250 787 619 387</a>
                  <a href="mailto:booking@carrentalinkigali.com" className="text-gray-800 hover:text-[#4B5320]">✉️ Email Us</a>
                </div>
                
                <Link
                  href="/book-now?promo=RENTAL10"
                  className="block bg-gradient-to-r from-[#4B5320] to-green-700 text-white py-3 rounded-xl font-black text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🚗 BOOK NOW & SAVE 10% 🚗
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
