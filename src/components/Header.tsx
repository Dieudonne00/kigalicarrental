"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuStructure = [
    {
      label: "Car Rental",
      href: "/car-rental-kigali",
      keywords: "Car Rental Kigali Rwanda | Cheap & Luxury Options",
      icon: "🚗",
      submenus: [
        {
          label: "Cheap Car Rental",
          href: "/services/cheap-car-rental",
          keywords: "Budget car rental Kigali Rwanda",
        },
        {
          label: "Luxury Car Rental",
          href: "/services/luxury-car-rental",
          keywords: "Premium luxury car hire Kigali",
        },
        {
          label: "4x4 Safari Rental",
          href: "/services/4x4-safari-rental",
          keywords: "Safari 4x4 rental Rwanda - Land Cruiser & Prado",
        },
        {
          label: "Self-Drive Rwanda",
          href: "/services/self-drive-rwanda",
          keywords: "Self-drive car rental Rwanda tourism",
        },
        {
          label: "Long-Term Rental",
          href: "/special/long-term-rental",
          keywords: "Extended car rental Kigali Rwanda",
        },
      ],
    },
    {
      label: "Airport Transfer",
      href: "/services/airport-transfer",
      keywords: "Kigali Airport Transfer | 24/7 Pickup Service",
      icon: "✈️",
      submenus: [
        {
          label: "Airport Pickup",
          href: "/locations/kigali-airport",
          keywords: "Kigali airport pickup service 24/7",
        },
        {
          label: "VIP Transfer",
          href: "/services/airport-transfer#vip",
          keywords: "VIP premium airport transfer Kigali",
        },
        {
          label: "Group Transfer",
          href: "/special/group-bookings",
          keywords: "Group airport transfer Kigali Rwanda",
        },
      ],
    },
    {
      label: "Our Services",
      href: "/services",
      keywords: "Car Rental Services Kigali Rwanda",
      icon: "🏢",
      submenus: [
        {
          label: "Chauffeur Service",
          href: "/services/chauffeur-service",
          keywords: "Professional chauffeur service Kigali Rwanda",
        },
        {
          label: "Wedding Car Rental",
          href: "/services/wedding-car-rental",
          keywords: "Wedding car rental Kigali Rwanda",
        },
        {
          label: "Business Transport",
          href: "/services/business-transport",
          keywords: "Corporate car rental Rwanda business transport",
        },
        {
          label: "Group Bookings",
          href: "/special/group-bookings",
          keywords: "Group car rental Rwanda team transport",
        },
      ],
    },
    {
      label: "Fleet",
      href: "/fleet",
      keywords: "Car Fleet Kigali | Economy SUV 4x4 Luxury",
      icon: "🛞",
      submenus: [
        {
          label: "Economy Cars",
          href: "/vehicles/economy-cars",
          keywords: "Budget economy car rental Kigali",
        },
        {
          label: "SUV Rental",
          href: "/vehicles/suv-rental",
          keywords: "SUV rental Kigali Rwanda families",
        },
        {
          label: "4x4 Vehicles",
          href: "/vehicles/4x4-vehicles",
          keywords: "4x4 vehicles rental off-road Rwanda",
        },
        {
          label: "Luxury Vehicles",
          href: "/vehicles/luxury-vehicles",
          keywords: "Luxury car rental premium vehicles Kigali",
        },
      ],
    },
    {
      label: "Guides",
      href: "/guides",
      keywords: "Rwanda Travel Guides | Driving Tips & FAQ",
      icon: "📍",
      submenus: [
        {
          label: "Driving in Rwanda",
          href: "/guides/driving-guide-rwanda",
          keywords: "Driving in Rwanda guide roads safety",
        },
        {
          label: "Car Rental Tips",
          href: "/guides/car-rental-tips",
          keywords: "Car rental tips advice Rwanda best practices",
        },
        {
          label: "Travel Guide",
          href: "/guides/rwanda-travel-guide",
          keywords: "Rwanda travel guide attractions tourism",
        },
        {
          label: "FAQ",
          href: "/guides/faq",
          keywords: "Frequently asked questions car rental Kigali",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      keywords: "About Kigali Car Hire | Why Choose Us",
      icon: "ℹ️",
      submenus: [
        {
          label: "Why Choose Us",
          href: "/about/why-choose-us",
          keywords: "Why choose Kigali Car Hire advantages",
        },
        {
          label: "Testimonials",
          href: "/about/testimonials",
          keywords: "Customer testimonials reviews Kigali Car Hire",
        },
        {
          label: "Contact Us",
          href: "/about/contact-us",
          keywords: "Contact Kigali Car Hire phone email location",
        },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-menu {
          animation: slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2.5px;
          background: linear-gradient(to right, #0B1F3A, #1E3A8A);
          transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .header-top-bar {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          transition: all 0.3s ease;
        }

        .header-main {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-main.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 32px rgba(11, 31, 58, 0.08);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .submenu-item {
          position: relative;
          overflow: hidden;
        }

        .submenu-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to bottom, #0B1F3A, #1E3A8A);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .submenu-item:hover::before {
          transform: scaleY(1);
        }

        .cta-button {
          background: linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(11, 31, 58, 0.3);
        }

        .top-bar-contact {
          transition: all 0.3s ease;
        }

        .top-bar-contact:hover {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .header-top-bar {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 768px) {
          .header-top-bar {
            display: none;
          }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="header-top-bar text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2.5 flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-3 lg:gap-6 flex-wrap">
            <a
              href="tel:+250787619387"
              className="top-bar-contact hover:text-blue-300"
              title="Call Kigali Car Hire for car rental booking"
            >
              📞 <span className="hidden sm:inline">+250</span> 787 619 387
            </a>
            <a
              href="mailto:booking@carrentalinkigali.com"
              className="top-bar-contact hover:text-blue-300"
              title="Email car rental inquiries"
            >
              ✉️ <span className="hidden sm:inline">booking@carrentalinkigali.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
          </div>

          <div className="text-center text-blue-200 text-[10px] lg:text-xs font-medium">
            🚗 Cheap Car Rental Kigali • 4x4 Safari • Self-Drive • 24/7 Airport Pickup
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className={`header-main ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className="flex-shrink-0 group"
              title="Kigali Car Hire - Car Rental Kigali Rwanda Airport Transfer Safari 4x4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-lg lg:text-2xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-tight">
                  Kigali Car Hire
                </span>
                <span className="text-[9px] lg:text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                  Car Rental • Safari • Airport Transfer Rwanda
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-3">
              {menuStructure.map((menu) => (
                <div
                  key={menu.label}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(menu.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={menu.href}
                    className="nav-link flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:text-blue-900 transition-colors"
                    title={menu.keywords}
                  >
                    <span className="text-base">{menu.icon}</span>
                    <span>{menu.label}</span>
                  </Link>

                  {/* DROPDOWN */}
                  <div
                    className={`dropdown-menu absolute left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      activeMenu === menu.label
                        ? "opacity-100 visible translate-y-0 pointer-events-auto"
                        : "opacity-0 invisible translate-y-3 pointer-events-none"
                    }`}
                  >
                    {menu.submenus.map((sub, idx) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="submenu-item block px-5 py-3.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-b-0"
                        title={sub.keywords}
                      >
                        <div className="font-semibold text-gray-800">{sub.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {sub.keywords}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA - DESKTOP */}
            <Link
              href="/book-now"
              className="hidden lg:block cta-button text-white px-6 py-2.5 rounded-lg font-bold text-sm relative z-10"
              title="Book a car now - Kigali car rental reservation"
            >
              Book Now
            </Link>

            {/* MOBILE MENU BTN */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              title="Open navigation menu"
            >
              <svg
                className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-1 border-t border-gray-100 pt-4">
              {menuStructure.map((menu) => (
                <div key={menu.label}>
                  <Link
                    href={menu.href}
                    className="flex items-center gap-2 px-3 py-3 font-bold text-gray-800 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    title={menu.keywords}
                  >
                    <span className="text-lg">{menu.icon}</span>
                    {menu.label}
                  </Link>

                  {/* MOBILE SUBMENU */}
                  {menu.submenus.length > 0 && (
                    <div className="pl-4 space-y-1">
                      {menu.submenus.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2.5 text-sm text-gray-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                          title={sub.keywords}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* MOBILE CTA */}
              <Link
                href="/book-now"
                className="cta-button block text-center text-white py-3 rounded-lg font-bold mt-4 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
                title="Book a car now"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
