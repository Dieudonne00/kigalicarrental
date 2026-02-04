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
      label: "Car Fleet",
      href: "/fleet",
      submenus: [
        { label: "Economy Cars", href: "/fleet/economy", keywords: ["budget car hire", "cheap car rental", "affordable vehicles"] },
        { label: "SUV Rentals", href: "/fleet/suvs", keywords: ["4x4 rental", "family SUV hire", "off-road vehicles"] },
        { label: "Luxury Vehicles", href: "/fleet/luxury", keywords: ["premium car hire", "luxury sedan rental", "executive cars"] },
        { label: "7-Seater MPVs", href: "/fleet/7-seaters", keywords: ["family van rental", "people carrier hire", "group transport"] },
        { label: "Hybrid & Electric", href: "/fleet/eco-friendly", keywords: ["EV rental Kigali", "hybrid car hire", "electric vehicles"] },
        { label: "4x4 Safari Vehicles", href: "/fleet/safari", keywords: ["safari car rental", "game drive vehicles", "Akagera tours"] },
        { label: "Business Rentals", href: "/fleet/business", keywords: ["corporate car hire", "business vehicle rental", "company cars"] },
        { label: "Long Term Leasing", href: "/fleet/long-term", keywords: ["monthly car rental", "extended lease", "long term hire"] },
        { label: "Latest Models 2024", href: "/fleet/new-models", keywords: ["new car rental", "2024 vehicles", "latest fleet"] },
        { label: "Compare Vehicles", href: "/fleet/compare", keywords: ["car comparison", "vehicle specs", "rental options"] },
      ]
    },
    {
      label: "Destinations",
      href: "/destinations",
      submenus: [
        { label: "Kigali Airport Pickup", href: "/destinations/kigali-airport", keywords: ["KGL airport rental", "airport car hire"] },
        { label: "City Center Rentals", href: "/destinations/kigali-city", keywords: ["downtown car rental", "city center pickup"] },
        { label: "Volcanoes National Park", href: "/destinations/volcanoes", keywords: ["gorilla trekking transport", "Musanze car hire"] },
        { label: "Akagera Game Drives", href: "/destinations/akagera", keywords: ["safari vehicle rental", "game park transport"] },
        { label: "Nyungwe Forest", href: "/destinations/nyungwe", keywords: ["canopy walk transport", "rainforest tours"] },
        { label: "Lake Kivu", href: "/destinations/lake-kivu", keywords: ["beach resort transport", "Gisenyi car hire"] },
        { label: "Cross-Border Trips", href: "/destinations/cross-border", keywords: ["Uganda Rwanda border", "DRC transport"] },
        { label: "Business Districts", href: "/destinations/business", keywords: ["Kacyiru rental", "Nyarutarama car hire"] },
        { label: "Event Transport", href: "/destinations/events", keywords: ["conference transport", "wedding car rental"] },
        { label: "Hotel Pickup Services", href: "/destinations/hotels", keywords: ["hotel car delivery", "accommodation transport"] },
      ]
    },
    {
      label: "Services",
      href: "/services",
      submenus: [
        { label: "Airport Transfers", href: "/services/airport-transfers", keywords: ["KGL airport taxi", "meet and greet"] },
        { label: "Chauffeur Service", href: "/services/chauffeur", keywords: ["driver hire Rwanda", "professional chauffeur"] },
        { label: "Corporate Accounts", href: "/services/corporate", keywords: ["business car rental", "company accounts"] },
        { label: "Wedding Car Hire", href: "/services/weddings", keywords: ["bridal cars", "wedding transport"] },
        { label: "Tour Packages", href: "/services/tours", keywords: ["guided tours Rwanda", "sightseeing packages"] },
        { label: "One-Way Rentals", href: "/services/one-way", keywords: ["different location return", "flexible drop-off"] },
        { label: "24/7 Roadside Assistance", href: "/services/roadside", keywords: ["breakdown service", "emergency support"] },
        { label: "Child Seat Rentals", href: "/services/child-seats", keywords: ["baby car seats", "child safety"] },
        { label: "GPS Navigation", href: "/services/gps", keywords: ["satellite navigation", "Rwanda maps"] },
        { label: "Insurance Options", href: "/services/insurance", keywords: ["car rental insurance", "coverage plans"] },
      ]
    },
    {
      label: "Booking",
      href: "/booking",
      submenus: [
        { label: "Instant Online Booking", href: "/book-now", keywords: ["reserve car online", "quick booking"] },
        { label: "Modify Reservation", href: "/booking/modify", keywords: ["change booking", "update rental"] },
        { label: "Cancellation Policy", href: "/booking/cancellation", keywords: ["free cancellation", "refund policy"] },
        { label: "Payment Options", href: "/booking/payment", keywords: ["credit card rental", "mobile money"] },
        { label: "Special Offers", href: "/booking/deals", keywords: ["discount car rental", "promotional rates"] },
        { label: "Group Discounts", href: "/booking/group", keywords: ["multiple car discount", "bulk rental"] },
        { label: "Long Term Rates", href: "/booking/long-term", keywords: ["monthly discounts", "extended rental"] },
        { label: "Fuel Policy", href: "/booking/fuel", keywords: ["full-to-full", "fuel options"] },
        { label: "Driver Requirements", href: "/booking/requirements", keywords: ["license needed", "rental criteria"] },
        { label: "Booking FAQ", href: "/booking/faq", keywords: ["rental questions", "booking help"] },
      ]
    },
    {
      label: "About",
      href: "/about",
      submenus: [
        { label: "Company Overview", href: "/about/company", keywords: ["Kigali Car Hire story", "our mission"] },
        { label: "Management Team", href: "/about/team", keywords: ["experienced staff", "professional team"] },
        { label: "Customer Reviews", href: "/about/reviews", keywords: ["client testimonials", "rental feedback"] },
        { label: "Safety Standards", href: "/about/safety", keywords: ["vehicle maintenance", "safety checks"] },
        { label: "Environmental Policy", href: "/about/environment", keywords: ["green car rental", "eco-friendly"] },
        { label: "Community Projects", href: "/about/community", keywords: ["Rwanda tourism support", "local projects"] },
        { label: "Awards & Recognition", href: "/about/awards", keywords: ["best car rental", "industry awards"] },
        { label: "Partnerships", href: "/about/partners", keywords: ["hotel partnerships", "travel agencies"] },
        { label: "Careers", href: "/about/careers", keywords: ["join our team", "employment"] },
        { label: "Contact Offices", href: "/about/contact", keywords: ["Kigali office location", "contact details"] },
      ]
    },
    {
      label: "Resources",
      href: "/resources",
      submenus: [
        { label: "Rwanda Driving Guide", href: "/resources/driving-guide", keywords: ["driving in Rwanda", "road rules"] },
        { label: "Tourist Attractions", href: "/resources/attractions", keywords: ["places to visit", "Rwanda tourism"] },
        { label: "Road Trip Planner", href: "/resources/road-trips", keywords: ["itinerary planning", "route maps"] },
        { label: "Weather & Best Time", href: "/resources/weather", keywords: ["Rwanda seasons", "travel timing"] },
        { label: "Currency & Costs", href: "/resources/costs", keywords: ["Rwandan francs", "travel budget"] },
        { label: "Visa Requirements", href: "/resources/visa", keywords: ["entry requirements", "travel documents"] },
        { label: "Emergency Numbers", href: "/resources/emergency", keywords: ["police ambulance", "emergency contacts"] },
        { label: "Car Rental Glossary", href: "/resources/glossary", keywords: ["rental terms", "industry vocabulary"] },
        { label: "Travel Blog", href: "/blog", keywords: ["Rwanda travel tips", "car hire advice"] },
        { label: "News & Updates", href: "/resources/news", keywords: ["industry news", "company updates"] },
      ]
    },
  ];

  // ADDITIONAL KEYWORD-RICH LINKS
  const quickLinks = [
    { label: "Last Minute Deals", href: "/deals/last-minute", badge: "HOT" },
    { label: "Weekly Specials", href: "/deals/weekly", badge: "SAVE 10%" },
    { label: "Monthly Rental", href: "/long-term/monthly" },
    { label: "Safari Packages", href: "/safari/packages" },
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
              <span className="text-gray-700">Free Delivary</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">BEST</span>
              <span className="text-gray-700">Best Price Guarantee</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+250788123456" className="text-gray-700 hover:text-[#4B5320] font-medium">
               +250 796 077 321
            </a>
            <a href="mailto:book@kigalicarhire.com" className="text-gray-700 hover:text-[#4B5320] font-medium">
              kigalicarrentals2004@gmail.com
            </a>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="flex items-center justify-between">
          {/* LOGO WITH SEO TEXT */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dxn12qcje/image/upload/v1770132530/mylogo-removebg-preview_mpcp0n.png"
              alt="Kigali Car Hire - Best Car Rental in Rwanda | Airport Pickup | SUV & 4x4 Rental"
              width={140}
              height={50}
              className="h-12 w-auto"
              priority
              
            />
            

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
                <a href="tel:+250788123456" className="block mt-1 text-gray-800 font-bold">
                  +250 796 077 321
                </a>
                <a href="mailto:book@kigalicarhire.com" className="block mt-1 text-gray-800">
                  kigalicarrentals2004@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* BREADCRUMB/PROMO BAR */}
        
      </div>
    </header>
  );
}
