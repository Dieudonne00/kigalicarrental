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
    
    { label: "Monthly Rental", href: "/long-term/monthly" , badge: "SAVE 15%" },
    
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* TOP BAR - Promotions & Contact */}
        <div className="hidden md:flex justify-between items-center py-2 border-b border-gray-100 mb-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">24/7</span>
              <span className="text-gray-700">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">FREE</span>
              <span className="text-gray-700">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">BEST</span>
              <span className="text-gray-700">Best Price Guarantee</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+250796077321" className="text-gray-700 hover:text-[#4B5320] font-medium">
              +250 796 077 321
            </a>
            <a href="mailto:kigalicarrentals2004@gmail.com" className="text-gray-700 hover:text-[#4B5320] font-medium">
              kigalicarrentals2004@gmail.com
            </a>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="flex items-center justify-between">
          {/* LOGO WITH SEO TEXT - FIXED: Added closing </Link> tag */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dxn12qcje/image/upload/v1770132530/mylogo-removebg-preview_mpcp0n.png"
              alt="Kigali Car Hire - Best Car Rental in Rwanda | Airport Pickup | SUV & 4x4 Rental"
              width={140}
              height={50}
              className="h-12 w-auto"
              priority
            />
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
                  className="px-4 py-3 text-gray-800 hover:text-[#4B5320] font-semibold hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
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
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-[#4B5320] border-b pb-2">
                          {menu.label} Services
                        </h3>
                        {menu.submenus.slice(0, 5).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group/sub"
                            title={sub.keywords?.join(", ")}
                          >
                            <div className="font-medium text-gray-800 group-hover/sub:text-[#4B5320]">
                              {sub.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {sub.keywords?.slice(0, 2).join(" • ")}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-[#4B5320] border-b pb-2">
                          More Options
                        </h3>
                        {menu.submenus.slice(5, 10).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group/sub"
                            title={sub.keywords?.join(", ")}
                          >
                            <div className="font-medium text-gray-800 group-hover/sub:text-[#4B5320]">
                              {sub.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {sub.keywords?.slice(0, 2).join(" • ")}
                            </div>
                          </Link>
                        ))}
                        {/* FEATURED OFFER */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-[#4B5320] to-green-800 rounded-lg text-white">
                          <div className="font-bold">SPECIAL OFFER</div>
                          <div className="text-sm">Book 7+ days get 15% discount</div>
                          <Link
                            href="/deals/long-term"
                            className="inline-block mt-2 bg-white text-[#4B5320] px-4 py-1 rounded text-sm font-bold"
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
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            
            <div className="relative">
              <Link
                href="/book-now"
                className="bg-gradient-to-r from-[#4B5320] to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center gap-2"
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
            className="xl:hidden p-3 bg-gray-100 rounded-lg"
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
          <div className="xl:hidden mt-4 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 max-h-[80vh] overflow-y-auto">
            {/* QUICK ACTIONS MOBILE */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="font-medium text-sm">{link.label}</div>
                  {link.badge && (
                    <div className="text-xs text-red-600 font-bold mt-1">{link.badge}</div>
                  )}
                </Link>
              ))}
            </div>

            {/* MOBILE MENU ITEMS */}
            <div className="space-y-2">
              {menuStructure.map((menu) => (
                <div key={menu.label} className="border-b border-gray-100 pb-2">
                  <Link
                    href={menu.href}
                    className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-bold text-gray-800">{menu.label}</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  {/* MOBILE SUBMENU */}
                  <div className="pl-4 grid grid-cols-2 gap-2 mt-2">
                    {menu.submenus.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded"
                        onClick={() => setIsMobileMenuOpen(false)}
                        title={sub.keywords?.join(", ")}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE CTA */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#4B5320] to-green-700 rounded-xl text-white">
              <div className="text-center">
                <div className="font-bold text-lg">Ready to Book?</div>
                <div className="text-sm opacity-90 mt-1">Best Rates Guaranteed</div>
                <Link
                  href="/book-now"
                  className="inline-block mt-3 bg-white text-[#4B5320] px-6 py-2 rounded-lg font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reserve Your Car
                </Link>
              </div>
            </div>

            {/* CONTACT INFO MOBILE */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <div className="font-bold">24/7 Support</div>
                <a href="tel:+250796077321" className="block mt-1 text-gray-800 font-bold">
                  +250 796 077 321
                </a>
                <a href="mailto:booking@carrentalinkigali.com" className="block mt-1 text-gray-800">
                  booking@carrentalinkigali.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
