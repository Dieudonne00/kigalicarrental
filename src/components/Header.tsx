"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // YOUR ACTUAL CONTACT INFO
  const contactInfo = {
    phone: "+250 788 888 026",
    whatsapp: "+250 788 888 026",
    email: "kigalicarrentals2004@gmail.com",
    address: "Kigali, Rwanda"
  };

  // CAR RENTAL KEYWORD-RICH MENU STRUCTURE
  const menuItems = [
    { 
      label: "Home", 
      href: "/",
      keywords: ["car rental Rwanda", "Kigali car hire", "vehicle rental service"]
    },
    { 
      label: "Our Cars", 
      href: "/fleet",
      submenus: [
        { label: "Toyota RAV4", href: "/fleet/toyota-rav4", keywords: ["RAV4 rental Kigali", "SUV hire Rwanda", "Toyota car rental"] },
        { label: "Land Cruiser Prado", href: "/fleet/land-cruiser", keywords: ["Prado rental", "4x4 hire Rwanda", "Land Cruiser safari"] },
        { label: "Toyota Hiace", href: "/fleet/toyota-hiace", keywords: ["Hiace van rental", "group transport", "minibus hire"] },
        { label: "Hilux Pickup", href: "/fleet/hilux", keywords: ["pickup truck rental", "Hilux 4x4", "utility vehicle hire"] },
        { label: "Economy Cars", href: "/fleet/economy", keywords: ["budget car rental", "cheap car hire", "affordable vehicles"] },
        { label: "Luxury Sedans", href: "/fleet/luxury", keywords: ["premium car rental", "executive vehicles", "VIP transport"] },
        { label: "7-Seater SUVs", href: "/fleet/7-seater", keywords: ["family SUV rental", "people carrier", "group travel"] },
        { label: "4x4 Safari Vehicles", href: "/fleet/safari", keywords: ["safari car rental", "game drive vehicles", "Akagera transport"] },
        { label: "Hybrid Cars", href: "/fleet/hybrid", keywords: ["fuel efficient rental", "eco-friendly cars", "hybrid vehicle hire"] },
        { label: "All Vehicles", href: "/fleet/all", keywords: ["complete fleet", "all car models", "vehicle selection"] }
      ]
    },
    { 
      label: "How It Works", 
      href: "/how-it-works",
      submenus: [
        { label: "Booking Process", href: "/how-it-works/booking", keywords: ["how to rent car", "reservation steps", "booking procedure"] },
        { label: "Requirements", href: "/how-it-works/requirements", keywords: ["driver license Rwanda", "rental criteria", "documents needed"] },
        { label: "Payment Methods", href: "/how-it-works/payment", keywords: ["car rental payment", "mobile money", "credit card accepted"] },
        { label: "Pickup & Return", href: "/how-it-works/pickup", keywords: ["vehicle delivery", "Kigali pickup", "return process"] },
        { label: "Insurance Options", href: "/how-it-works/insurance", keywords: ["car rental insurance", "coverage plans", "protection options"] },
        { label: "Fuel Policy", href: "/how-it-works/fuel", keywords: ["fuel rental policy", "petrol diesel", "refueling instructions"] },
        { label: "Driver Options", href: "/how-it-works/driver", keywords: ["with driver hire", "self drive", "chauffeur service"] },
        { label: "Cross Border", href: "/how-it-works/cross-border", keywords: ["Uganda Rwanda border", "international travel", "East Africa rental"] },
        { label: "Long Term Rental", href: "/how-it-works/long-term", keywords: ["monthly car hire", "extended rental", "lease options"] },
        { label: "FAQ", href: "/how-it-works/faq", keywords: ["frequently asked questions", "rental queries", "help center"] }
      ]
    },
    { 
      label: "Blog", 
      href: "/blog",
      submenus: [
        { label: "Travel Tips Rwanda", href: "/blog/travel-tips", keywords: ["Rwanda travel guide", "tourist information", "visit Rwanda"] },
        { label: "Road Safety", href: "/blog/road-safety", keywords: ["driving in Rwanda", "road conditions", "safety guidelines"] },
        { label: "Car Maintenance", href: "/blog/maintenance", keywords: ["vehicle care", "car maintenance tips", "rental vehicle care"] },
        { label: "Tourist Attractions", href: "/blog/attractions", keywords: ["places to visit Rwanda", "gorilla trekking", "national parks"] },
        { label: "Event Transport", href: "/blog/events", keywords: ["conference transport", "wedding cars", "event vehicle hire"] },
        { label: "Business Travel", href: "/blog/business", keywords: ["corporate transport", "business car rental", "executive travel"] },
        { label: "Safari Guides", href: "/blog/safari", keywords: ["Akagera National Park", "Volcanoes National Park", "safari planning"] },
        { label: "Cost Saving Tips", href: "/blog/saving-tips", keywords: ["budget car rental", "money saving", "affordable travel"] },
        { label: "Seasonal Deals", href: "/blog/deals", keywords: ["special offers", "discount periods", "promotional rates"] },
        { label: "Customer Stories", href: "/blog/stories", keywords: ["client experiences", "rental reviews", "testimonials"] }
      ]
    },
    { 
      label: "About Us", 
      href: "/about",
      submenus: [
        { label: "Our Company", href: "/about/company", keywords: ["Kigali Car Rentals story", "about our business", "company history"] },
        { label: "Our Team", href: "/about/team", keywords: ["experienced staff", "professional drivers", "management team"] },
        { label: "Our Fleet", href: "/about/fleet", keywords: ["vehicle collection", "car models available", "fleet details"] },
        { label: "Safety Standards", href: "/about/safety", keywords: ["vehicle maintenance", "safety checks", "reliable cars"] },
        { label: "Customer Reviews", href: "/about/reviews", keywords: ["client feedback", "testimonials", "satisfied customers"] },
        { label: "Contact Us", href: "/about/contact", keywords: ["get in touch", "contact details", "office location"] },
        { label: "Careers", href: "/about/careers", keywords: ["job opportunities", "join our team", "employment"] },
        { label: "Partners", href: "/about/partners", keywords: ["hotel partnerships", "travel agencies", "business partners"] },
        { label: "Terms & Conditions", href: "/about/terms", keywords: ["rental agreement", "terms of service", "policy"] },
        { label: "Privacy Policy", href: "/about/privacy", keywords: ["data protection", "privacy terms", "information security"] }
      ]
    },
    { 
      label: "Contact", 
      href: "/contact",
      submenus: [
        { label: "Phone Booking", href: "tel:+250788888026", keywords: ["call to book", "phone reservation", "telephone booking"] },
        { label: "WhatsApp", href: "https://wa.me/250788888026", keywords: ["WhatsApp booking", "message to book", "instant chat"] },
        { label: "Email Inquiry", href: "mailto:kigalicarrentals@gmail.com", keywords: ["email booking", "send inquiry", "email contact"] },
        { label: "Office Location", href: "/contact/location", keywords: ["Kigali office", "physical address", "visit us"] },
        { label: "Airport Pickup", href: "/contact/airport", keywords: ["KGL airport pickup", "airport meeting", "arrival service"] },
        { label: "Hotel Delivery", href: "/contact/hotel", keywords: ["hotel pickup", "accommodation delivery", "hotel service"] },
        { label: "Emergency Contact", href: "/contact/emergency", keywords: ["24/7 support", "breakdown assistance", "emergency help"] },
        { label: "Feedback", href: "/contact/feedback", keywords: ["customer feedback", "suggestions", "comments"] },
        { label: "Quote Request", href: "/contact/quote", keywords: ["get quotation", "price estimate", "cost calculation"] },
        { label: "Live Chat", href: "/contact/chat", keywords: ["instant chat", "online support", "real-time help"] }
      ]
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        {/* TOP CONTACT BAR - YOUR ACTUAL INFO */}
        <div className="hidden md:flex justify-between items-center bg-[#4B5320] text-white px-6 py-2 rounded-t-lg text-sm mb-1">
          <div className="flex items-center gap-6">
            <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 hover:text-gray-200">
              📞 {contactInfo.phone}
            </a>
            <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-gray-200">
              💬 WhatsApp: {contactInfo.whatsapp}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-gray-200">
              ✉️ {contactInfo.email}
            </a>
          </div>
          <div className="text-sm">
            🕒 24/7 Available • Cancellation Available
          </div>
        </div>

        {/* MAIN NAVIGATION - YOUR ORIGINAL DESIGN */}
        <nav className="bg-white/95 backdrop-blur-sm rounded-full border-2 border-gray-200 px-6 py-3 flex items-center justify-between">
          {/* Logo - KEPT YOUR EXACT STYLE */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dxn12qcje/image/upload/v1770132530/mylogo-removebg-preview_mpcp0n.png"
              alt="Kigali Car Rentals - Best Car Hire in Rwanda | SUV Rental | Airport Pickup | 4x4 Vehicles"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - ENHANCED WITH SUBMENUS */}
          <ul className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-[#4B5320] transition-colors font-bold py-2"
                  title={item.keywords?.join(" • ")}
                >
                  {item.label}
                  {item.submenus && (
                    <span className="ml-1 text-xs">▼</span>
                  )}
                </Link>
                
                {/* SUBMENU DROPDOWN */}
                {item.submenus && (
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      {item.submenus.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#4B5320] text-sm border-b border-gray-100 last:border-b-0"
                          title={sub.keywords?.join(" • ")}
                        >
                          <div className="font-medium">{sub.label}</div>
                          <div className="text-xs text-gray-500 mt-1 truncate">
                            {sub.keywords?.slice(0, 2).join(" • ")}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button - Desktop - YOUR ORIGINAL STYLE */}
          <div className="hidden lg:block">
            <Link
              href="/book-now"
              className="bg-[#4B5320] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#3a4218] transition-colors"
              title="Book Car Rental Online - Instant Confirmation - Kigali Car Rentals"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button - KEPT YOUR EXACT STYLE */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu - ENHANCED WITH SUBMENUS */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-gray-200 p-6">
            {/* MOBILE CONTACT INFO */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="space-y-2">
                <a href={`tel:${contactInfo.phone}`} className="block text-gray-700 font-bold">
                  📞 {contactInfo.phone}
                </a>
                <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}`} className="block text-gray-700">
                  💬 WhatsApp: {contactInfo.whatsapp}
                </a>
                <a href={`mailto:${contactInfo.email}`} className="block text-gray-700">
                  ✉️ {contactInfo.email}
                </a>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                🕒 24/7 Available • Cancellation Available
              </div>
            </div>

            <ul className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[#4B5320] transition-colors font-bold block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    title={item.keywords?.join(" • ")}
                  >
                    {item.label}
                  </Link>
                  
                  {/* MOBILE SUBMENUS */}
                  {item.submenus && (
                    <div className="ml-4 mt-2 mb-4 grid grid-cols-2 gap-2">
                      {item.submenus.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="text-sm text-gray-600 hover:text-[#4B5320] bg-gray-50 p-2 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                          title={sub.keywords?.join(" • ")}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <li className="pt-2">
                <Link
                  href="/book-now"
                  className="bg-[#4B5320] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#3a4218] transition-colors block text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Book Car Rental Online - Instant Confirmation"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
