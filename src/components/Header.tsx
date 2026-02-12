"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // COMPREHENSIVE CAR RENTAL MENU WITH 10+ SUBS EACH
  const menuStructure = [
    {
      label: "CAR RENTAL",
      href: "/car-hire-rwanda",
      submenus: [
        { label: "Car Hire Rwanda", href: "/car-hire-rwanda", keywords: ["car rental Rwanda", "vehicle hire Rwanda"] },
        { label: "Car Rental Kigali", href: "/car-rental-kigali", keywords: ["Kigali car hire", "Kigali rental cars"] },
        { label: "Kigali Airport Car Rental", href: "/kigali-airport-car-rental", keywords: ["airport pickup", "KGL airport rental"] },
        { label: "Cheap Car Rental Kigali", href: "/cheap-car-rental-kigali", keywords: ["budget car hire", "affordable rental"] },
        { label: "Long Term Car Rental Rwanda", href: "/long-term-car-rental-rwanda", keywords: ["monthly rental", "extended lease"] },
        { label: "Luxury Car Rental Kigali", href: "/luxury-car-rental-kigali", keywords: ["premium cars", "executive vehicles"] },
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda", keywords: ["self drive rental", "drive yourself"] },
        { label: "Driver Car Hire Kigali", href: "/driver-car-hire-kigali", keywords: ["chauffeur service", "driver hire"] },
        { label: "Self Drive Car Rental Kigali", href: "/self-drive-car-rental-kigali", keywords: ["rental without driver"] },
        { label: "Chauffeur Service Rwanda", href: "/chauffeur-service-rwanda", keywords: ["professional driver", "private chauffeur"] },
      ]
    },
    {
      label: "SELF DRIVE & DRIVER",
      href: "/self-drive-rwanda",
      submenus: [
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda", keywords: ["drive yourself Rwanda", "independent travel"] },
        { label: "Driver Car Hire Kigali", href: "/driver-car-hire-kigali", keywords: ["car with driver", "hire car with driver"] },
        { label: "Self Drive Car Rental Kigali", href: "/self-drive-car-rental-kigali", keywords: ["no driver rental", "self-drive option"] },
        { label: "Chauffeur Service Rwanda", href: "/chauffeur-service-rwanda", keywords: ["luxury chauffeur", "professional driving"] },
        { label: "Private Driver Kigali", href: "/private-driver-kigali", keywords: ["personal driver", "dedicated chauffeur"] },
        { label: "Rwanda Guided Transport", href: "/rwanda-guided-transport", keywords: ["guided tours", "tourist transport"] },
        { label: "Airport Driver Service", href: "/airport-driver-service", keywords: ["airport chauffeur", "meet and greet driver"] },
        { label: "City Tour Driver", href: "/city-tour-driver", keywords: ["Kigali tour driver", "sightseeing chauffeur"] },
        { label: "Business Driver Service", href: "/business-driver-service", keywords: ["corporate driver", "executive chauffeur"] },
        { label: "Event Transport Driver", href: "/event-transport-driver", keywords: ["wedding driver", "conference transport"] },
      ]
    },
    {
      label: "SAFARI RENTALS",
      href: "/4x4-car-rental-rwanda",
      submenus: [
        { label: "4x4 Car Rental Rwanda", href: "/4x4-car-rental-rwanda", keywords: ["four-wheel drive", "off-road rental"] },
        { label: "Safari Car Rental Rwanda", href: "/safari-car-rental-rwanda", keywords: ["game drive vehicles", "safari tours"] },
        { label: "Land Cruiser Rental Rwanda", href: "/land-cruiser-rental-rwanda", keywords: ["Toyota Land Cruiser", "safari vehicle"] },
        { label: "Prado Rental Kigali", href: "/prado-rental-kigali", keywords: ["Toyota Prado", "luxury SUV rental"] },
        { label: "Rooftop Tent Car Rental Rwanda", href: "/rooftop-tent-car-rental-rwanda", keywords: ["camping car", "rooftop tent"] },
        { label: "Camping Car Rental Rwanda", href: "/camping-car-rental-rwanda", keywords: ["camping equipment", "outdoor rental"] },
        { label: "Akagera Safari Rental", href: "/akagera-safari-rental", keywords: ["game park vehicle", "wildlife tour"] },
        { label: "Volcanoes 4x4 Rental", href: "/volcanoes-4x4-rental", keywords: ["gorilla trekking transport", "mountain vehicle"] },
        { label: "Nyungwe Forest Safari", href: "/nyungwe-forest-safari", keywords: ["rainforest vehicle", "canopy walk transport"] },
        { label: "Safari Package Deals", href: "/safari-package-deals", keywords: ["complete safari packages", "all-inclusive"] },
      ]
    },
    {
      label: "AIRPORT & CITY",
      href: "/kigali-airport-transfer",
      submenus: [
        { label: "Kigali Airport Transfer", href: "/kigali-airport-transfer", keywords: ["airport taxi", "airport shuttle"] },
        { label: "Airport Pickup Kigali", href: "/airport-pickup-kigali", keywords: ["meet at airport", "arrival service"] },
        { label: "One Way Car Rental Rwanda", href: "/one-way-car-rental-rwanda", keywords: ["different location drop-off", "flexible return"] },
        { label: "Hotel Delivery Car Rental Kigali", href: "/hotel-delivery-car-rental-kigali", keywords: ["hotel pickup", "accommodation delivery"] },
        { label: "Business Travel Car Hire Kigali", href: "/business-travel-car-hire-kigali", keywords: ["corporate rental", "business transport"] },
        { label: "Conference Transport Rwanda", href: "/conference-transport-rwanda", keywords: ["event transport", "conference shuttle"] },
        { label: "City Center Delivery", href: "/city-center-delivery", keywords: ["downtown pickup", "central location"] },
        { label: "Corporate Account Services", href: "/corporate-account-services", keywords: ["business accounts", "company contracts"] },
        { label: "VIP Airport Service", href: "/vip-airport-service", keywords: ["premium airport service", "fast track"] },
        { label: "24/7 Airport Service", href: "/24-7-airport-service", keywords: ["late night arrival", "early morning flight"] },
      ]
    },
    {
      label: "DESTINATIONS IN RWANDA",
      href: "/car-rental-kigali-city",
      submenus: [
        { label: "Car Rental in Kigali City", href: "/car-rental-kigali-city", keywords: ["city rental", "urban car hire"] },
        { label: "Car Hire in Musanze", href: "/car-hire-musanze", keywords: ["Volcanoes National Park", "gorilla trekking base"] },
        { label: "Car Rental Nyungwe Forest", href: "/car-rental-nyungwe-forest", keywords: ["rainforest transport", "Nyungwe tours"] },
        { label: "Car Hire Akagera National Park", href: "/car-hire-akagera-national-park", keywords: ["safari park vehicle", "game drive"] },
        { label: "Gisenyi & Lake Kivu Car Rental", href: "/gisenyi-lake-kivu-car-rental", keywords: ["beach resort transport", "lake transport"] },
        { label: "Rwanda Road Trip Car Hire", href: "/rwanda-road-trip-car-hire", keywords: ["cross-country rental", "scenic routes"] },
        { label: "Huye Car Rental", href: "/huye-car-rental", keywords: ["southern Rwanda", "Butare transport"] },
        { label: "Rubavu Car Hire", href: "/rubavu-car-hire", keywords: ["western Rwanda", "border transport"] },
        { label: "East Rwanda Transport", href: "/east-rwanda-transport", keywords: ["eastern province", "rural transport"] },
        { label: "Cross-Border Rwanda", href: "/cross-border-rwanda", keywords: ["Uganda border", "Tanzania transport"] },
      ]
    },
    {
      label: "TRAVEL & BLOG",
      href: "/driving-in-rwanda-guide",
      submenus: [
        { label: "Driving in Rwanda Guide", href: "/driving-in-rwanda-guide", keywords: ["road rules Rwanda", "driving regulations"] },
        { label: "Car Rental Tips Rwanda", href: "/car-rental-tips-rwanda", keywords: ["rental advice", "hiring tips"] },
        { label: "Rwanda Travel Cost Guide", href: "/rwanda-travel-cost-guide", keywords: ["budget planning", "travel expenses"] },
        { label: "Self Drive Safety Rwanda", href: "/self-drive-safety-rwanda", keywords: ["safe driving", "road safety"] },
        { label: "Best Roads in Rwanda", href: "/best-roads-in-rwanda", keywords: ["scenic routes", "road conditions"] },
        { label: "Rwanda Travel Requirements", href: "/rwanda-travel-requirements", keywords: ["visa information", "entry documents"] },
        { label: "Weather Guide Rwanda", href: "/weather-guide-rwanda", keywords: ["best time to visit", "climate information"] },
        { label: "Accommodation Guide", href: "/accommodation-guide", keywords: ["hotels Rwanda", "lodging options"] },
        { label: "Tourist Attractions Guide", href: "/tourist-attractions-guide", keywords: ["things to do", "sightseeing"] },
        { label: "Emergency Information", href: "/emergency-information", keywords: ["emergency contacts", "medical services"] },
      ]
    },
  ];

  // ADDITIONAL KEYWORD-RICH LINKS
  const quickLinks = [
    { label: "Last Minute Deals", href: "/deals/last-minute", badge: "HOT" },
    { label: "Monthly Rental", href: "/long-term/monthly", badge: "SAVE 15%" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-gradient-to-b from-[#1a1e0b] to-[#2a3315] shadow-xl border-b border-[#5a6b2c]/30">
      <div className="max-w-7xl mx-auto">
        {/* TOP BAR - Promotions & Contact */}
        <div className="hidden md:flex justify-between items-center py-2 border-b border-[#6b7c3a]/30 mb-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-[#f5b042] text-[#1a1e0b] px-2 py-1 rounded text-xs font-bold">24/7</span>
              <span className="text-white/90 font-medium">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#4a9b9b] text-white px-2 py-1 rounded text-xs font-bold">FREE</span>
              <span className="text-white/90 font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#d4a373] text-[#1a1e0b] px-2 py-1 rounded text-xs font-bold">BEST</span>
              <span className="text-white/90 font-medium">Best Price Guarantee</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+250796077321" className="text-white/90 hover:text-[#f5b042] font-medium transition-colors">
              +250 796 077 321
            </a>
            <a href="mailto:kigalicarrentals2004@gmail.com" className="text-white/90 hover:text-[#f5b042] font-medium transition-colors">
              kigalicarrentals2004@gmail.com
            </a>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="flex items-center justify-between">
          {/* LOGO WITH SEO TEXT */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white/95 p-1 rounded-lg shadow-md">
              <Image
                src="https://res.cloudinary.com/dxn12qcje/image/upload/v1770132530/mylogo-removebg-preview_mpcp0n.png"
                alt="Kigali Car Hire - Best Car Rental in Rwanda | Airport Pickup | SUV & 4x4 Rental"
                width={140}
                height={50}
                className="h-12 w-auto"
                priority
              />
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
                  className="px-4 py-3 text-white/95 hover:text-[#f5b042] font-semibold hover:bg-white/10 rounded-lg transition-all flex items-center gap-1"
                  title={`${menu.label} - Car Rental Services Rwanda`}
                >
                  {menu.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* MEGA SUBMENU */}
                {activeMenu === menu.label && (
                  <div className="absolute left-0 top-full pt-2 w-screen max-w-4xl">
                    <div className="bg-[#1a1e0b] rounded-xl shadow-2xl border border-[#5a6b2c] p-6 grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-[#f5b042] border-b border-[#5a6b2c] pb-2">
                          {menu.label} Services
                        </h3>
                        {menu.submenus.slice(0, 5).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block p-3 hover:bg-[#2a3315] rounded-lg transition-colors group/sub"
                            title={sub.keywords?.join(", ")}
                          >
                            <div className="font-medium text-white/95 group-hover/sub:text-[#f5b042]">
                              {sub.label}
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              {sub.keywords?.slice(0, 2).join(" • ")}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-[#f5b042] border-b border-[#5a6b2c] pb-2">
                          More Options
                        </h3>
                        {menu.submenus.slice(5, 10).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block p-3 hover:bg-[#2a3315] rounded-lg transition-colors group/sub"
                            title={sub.keywords?.join(", ")}
                          >
                            <div className="font-medium text-white/95 group-hover/sub:text-[#f5b042]">
                              {sub.label}
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              {sub.keywords?.slice(0, 2).join(" • ")}
                            </div>
                          </Link>
                        ))}
                        {/* FEATURED OFFER */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-[#f5b042] to-[#d4a373] rounded-lg text-[#1a1e0b]">
                          <div className="font-bold">SPECIAL OFFER</div>
                          <div className="text-sm font-medium">Book 7+ days get 15% discount</div>
                          <Link
                            href="/deals/long-term"
                            className="inline-block mt-2 bg-[#1a1e0b] text-white px-4 py-1 rounded text-sm font-bold hover:bg-[#2a3315] transition-colors"
                          >
                            Claim Offer →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS & BOOKING */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white/95 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 bg-[#f5b042] text-[#1a1e0b] text-xs px-1.5 py-0.5 rounded font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            
            <div className="relative">
              <Link
                href="/book-now"
                className="bg-gradient-to-r from-[#f5b042] to-[#e3a030] text-[#1a1e0b] px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(245,176,66,0.5)] transition-all flex items-center gap-2"
                title="Book Car Rental Online - Instant Confirmation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                BOOK NOW
              </Link>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="xl:hidden p-3 bg-[#f5b042] text-[#1a1e0b] rounded-lg hover:bg-[#e3a030] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* MOBILE MEGA MENU - COMPLETELY REDESIGNED FOR BETTER VISIBILITY */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[88px] bottom-0 bg-[#1a1e0b] z-50 overflow-y-auto">
            <div className="p-5 pb-20">
              {/* QUICK ACTIONS MOBILE */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-4 bg-[#2a3315] rounded-xl text-center hover:bg-[#3a4520] transition-colors border border-[#5a6b2c]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="font-bold text-white">{link.label}</div>
                    {link.badge && (
                      <div className="text-xs bg-[#f5b042] text-[#1a1e0b] font-bold px-2 py-1 rounded-full mt-2 inline-block">
                        {link.badge}
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* MOBILE MENU ACCORDIONS */}
              <div className="space-y-3">
                {menuStructure.map((menu, index) => (
                  <div key={menu.label} className="bg-[#2a3315] rounded-xl border border-[#5a6b2c] overflow-hidden">
                    {/* Menu Header */}
                    <Link
                      href={menu.href}
                      className="flex justify-between items-center p-4 bg-[#1a1e0b]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-bold text-white text-lg">{menu.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[#f5b042] text-[#1a1e0b] px-2 py-1 rounded-full font-bold">
                          {menu.submenus.length}
                        </span>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </Link>
                    
                    {/* Submenu Items - Full visibility */}
                    <div className="p-4 grid grid-cols-2 gap-2">
                      {menu.submenus.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="p-3 bg-[#1a1e0b] hover:bg-[#3a4520] rounded-lg transition-all border border-[#5a6b2c]/50 hover:border-[#f5b042] group"
                          onClick={() => setIsMobileMenuOpen(false)}
                          title={sub.keywords?.join(", ")}
                        >
                          <div className="font-medium text-white text-sm group-hover:text-[#f5b042]">
                            {sub.label}
                          </div>
                          {sub.keywords && (
                            <div className="text-xs text-white/60 mt-1 line-clamp-1">
                              {sub.keywords[0]}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* MOBILE CTA */}
              <div className="mt-6 p-6 bg-gradient-to-r from-[#f5b042] to-[#d4a373] rounded-xl">
                <div className="text-center">
                  <div className="font-bold text-2xl text-[#1a1e0b]">Ready to Book?</div>
                  <div className="text-[#1a1e0b] mt-2 font-medium">Best Rates Guaranteed</div>
                  <Link
                    href="/book-now"
                    className="inline-block mt-4 bg-[#1a1e0b] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#2a3315] transition-colors w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reserve Your Car 🚗
                  </Link>
                </div>
              </div>

              {/* CONTACT INFO MOBILE */}
              <div className="mt-6 pt-6 border-t border-[#5a6b2c]">
                <div className="text-center">
                  <div className="font-bold text-xl text-white">24/7 Customer Support</div>
                  <div className="mt-4 space-y-3">
                    <a href="tel:+250796077321" className="block text-[#f5b042] text-2xl font-bold hover:text-white transition-colors">
                      +250 796 077 321
                    </a>
                    <a href="mailto:kigalicarrentals2004@gmail.com" className="block text-white/90 text-lg hover:text-[#f5b042] transition-colors">
                      kigalicarrentals2004@gmail.com
                    </a>
                  </div>
                  <div className="mt-4 text-white/70 text-sm">
                    📍 Kigali, Rwanda • Available 24/7
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed bottom-5 left-5 right-5 bg-[#f5b042] text-[#1a1e0b] py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#e3a030] transition-colors"
              >
                CLOSE MENU ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
