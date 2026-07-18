"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // COMPREHENSIVE CAR RENTAL MENU WITH 10+ SUBS EACH
  const menuStructure = [
    {
      label: "CAR RENTAL",
      href: "/car-hire-rwanda",
      submenus: [
        { label: "Car Hire Rwanda", href: "/car-hire-rwanda", keywords: ["car rental Rwanda", "vehicle hire Rwanda"] },
        { label: "Car Rental Kigali", href: "/car-rental-kigali", keywords: ["Kigali car rental", "Kigali rental cars"] },
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
      ]
    },
  ];

  // ADDITIONAL KEYWORD-RICH LINKS
  const quickLinks = [
    { label: "Last Minute Deals", href: "/deals/last-minute", badge: "HOT" },
    { label: "Monthly Rental", href: "/long-term/monthly", badge: "SAVE 15%" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-blue-100">
      {/* DESKTOP TOP BAR - large screens navigate via the left icon rail instead,
          so this is just branding + phone + the primary CTA, no nav menu */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <Link href="/" className="text-blue-600 font-bold text-xl hover:text-blue-700 transition-colors">
          Kigali Car Rental
        </Link>
        <div className="flex items-center gap-6">
          <a href="tel:+250787619387" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            +250 787 619 387
          </a>
          <Link
            href="/book-now"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            BOOK CAR NOW
          </Link>
        </div>
      </div>

      {/* MOBILE / TABLET HEADER - full nav menu, only below the lg breakpoint */}
      <div className="lg:hidden max-w-7xl mx-auto px-4">
        {/* TOP CONTACT BAR - BLUE THEME - desktop only, mobile menu has contact info */}
        <div className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-b-lg">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold">24/7</span>
                <span>Car Rental Support Kigali Rwanda</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold">FREE</span>
                <span>Airport Delivery Kigali</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold">BEST</span>
                <span>Car Rental Rates Kigali</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="tel:+250787619387" className="flex items-center gap-2 hover:text-blue-200 transition-colors font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>Call: +250 787 619 387</span>
              </a>
              <a href="mailto:hi@rwandatours.co.rw" className="hover:text-blue-200 transition-colors font-semibold">
                hi@rwandatours.co.rw
              </a>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION - WHITE BACKGROUND */}
        <nav className="flex items-center justify-between py-4">
          {/* LOGO REMOVED - SPACE SAVED FOR MOBILE MENU BUTTON */}
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 font-bold text-xl hover:text-blue-700 transition-colors">
              Kigali Car Rental
            </Link>
          </div>

          {/* MOBILE MENU BUTTON - BLUE THEME */}
          <button
            className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu - Car Rental Kigali"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* MOBILE MEGA MENU - BLUE THEME */}
        {isMobileMenuOpen && (
          <div className="mt-4 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl p-4 max-h-[80vh] overflow-y-auto">
            {/* QUICK ACTIONS MOBILE */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 border border-blue-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="font-semibold text-sm text-blue-700">{link.label}</div>
                  {link.badge && (
                    <div className="text-xs text-red-600 font-bold mt-1 bg-red-100 px-2 py-1 rounded-full">{link.badge}</div>
                  )}
                </Link>
              ))}
            </div>

            {/* MOBILE MENU ITEMS */}
            <div className="space-y-3">
              {menuStructure.map((menu) => (
                <div key={menu.label} className="border-b border-blue-100 pb-3">
                  <Link
                    href={menu.href}
                    className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-lg border-l-4 border-transparent hover:border-blue-400 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-bold text-gray-900">{menu.label}</span>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* MOBILE SUBMENU */}
                  <div className="pl-4 grid grid-cols-2 gap-2 mt-3">
                    {menu.submenus.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="p-3 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium border border-blue-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        title={`${sub.label} - ${sub.keywords?.join(", ")} | Car Rental Kigali`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE CTA - BLUE THEME */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white shadow-lg">
              <div className="text-center">
                <div className="font-bold text-lg">Ready to Book Car Rental?</div>
                <div className="text-sm opacity-90 mt-1">Best Car Hire Rates in Kigali Rwanda</div>
                <Link
                  href="/book-now"
                  className="inline-block mt-3 bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reserve Your Car Now
                </Link>
              </div>
            </div>

            {/* CONTACT INFO MOBILE */}
            <div className="mt-6 pt-4 border-t border-blue-100">
              <div className="text-center text-sm">
                <div className="font-bold text-blue-600 mb-2">24/7 Car Rental Support Kigali</div>
                <a href="tel:+250787619387" className="flex items-center justify-center gap-2 text-gray-900 font-bold hover:text-blue-600 transition-colors mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call: +250 787 619 387
                </a>
                <a href="mailto:hi@rwandatours.co.rw" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  hi@rwandatours.co.rw
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
