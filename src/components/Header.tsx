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
      keywords: "kigali car rentals | kigali car hire | rwanda car rental | kigali airport car rental | car rental near me",
      icon: "",
      submenus: [
        {
          label: "Cheap Car Rental",
          href: "/cheap-car-rental-kigali",
          keywords: "kigali car rentals | kigali car hire | rwanda car rental | kigali airport car rental | car rental near me",
        },
        {
          label: "Luxury Car Rental",
          href: "/luxury-car-rental-kigali",
          keywords: "kigali car rentals | kigali car hire | rwanda car rental | kigali airport car rental | car rental near me",
        },
        {
          label: "Self-Drive Rwanda",
          href: "/self-drive-rwanda",
          keywords: "kigali car rentals | kigali car hire | rwanda car rental | kigali airport car rental | car rental near me | rwanda car rental",
        },
        {
          label: "Car Hire Rwanda",
          href: "/car-hire-rwanda",
          keywords: "Vehicle hire across Rwanda",
        },
      ],
    },
    {
      label: "Safari 4x4",
      href: "/4x4-car-rental-rwanda",
      keywords: "4x4 Safari Car Rental Rwanda | Land Cruiser Prado",
      icon: "",
      submenus: [
        {
          label: "Land Cruiser Rental",
          href: "/land-cruiser-rental-rwanda",
          keywords: "Toyota Land Cruiser rental Rwanda safari",
        },
        {
          label: "Prado Rental",
          href: "/prado-rental-kigali",
          keywords: "Toyota Prado rental Kigali Rwanda",
        },
        {
          label: "Safari Vehicle Rental",
          href: "/safari-car-rental-rwanda",
          keywords: "Professional safari car rental Rwanda tourism",
        },
      ],
    },
    {
      label: "Airport Transfer",
      href: "/kigali-airport-transfer",
      keywords: "Kigali Airport Transfer | 24/7 Pickup Service",
      icon: "",
      submenus: [
        {
          label: "Airport Pickup Service",
          href: "/airport-pickup-kigali",
          keywords: "Kigali international airport pickup service",
        },
        {
          label: "VIP Airport Transfer",
          href: "/vip-airport-service",
          keywords: "VIP premium airport transfer Kigali",
        },
        {
          label: "24/7 Airport Service",
          href: "/24-7-airport-service",
          keywords: "24/7 airport transfer service Kigali Rwanda",
        },
      ],
    },
    {
      label: "Travel Guides",
      href: "/driving-in-rwanda-guide",
      keywords: "Rwanda Travel Guide | Driving Tips & Cost",
      icon: "",
      submenus: [
        {
          label: "Driving in Rwanda",
          href: "/driving-in-rwanda-guide",
          keywords: "Complete driving guide Rwanda roads safety",
        },
        {
          label: "Rental Tips & Advice",
          href: "/car-rental-tips-rwanda",
          keywords: "Car rental tips Rwanda best practices",
        },
        {
          label: "Travel Cost Guide",
          href: "/rwanda-travel-cost-guide",
          keywords: "Rwanda travel budget guide costs",
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
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
          background: linear-gradient(to right, #1e40af, #dc2626);
          transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu-item {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
        }

        .mobile-menu-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-menu-item:nth-child(2) { animation-delay: 0.1s; }
        .mobile-menu-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-menu-item:nth-child(4) { animation-delay: 0.2s; }
        .mobile-menu-item:nth-child(5) { animation-delay: 0.25s; }

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
          box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08);
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
          background: linear-gradient(to bottom, #1e40af, #dc2626);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .submenu-item:hover::before {
          transform: scaleY(1);
        }

        .cta-button {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
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
          box-shadow: 0 12px 24px rgba(30, 58, 138, 0.3);
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

      {/* TOP BAR - CONTACTS & TAGLINE */}
      <div className="header-top-bar text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2.5 flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-3 lg:gap-6 flex-wrap">
            <a
              href="tel:+250787619387"
              className="top-bar-contact hover:text-blue-300"
              title="Call Kigali Car Hire for car rental booking"
            >
               <span className="hidden sm:inline">+250</span> 787 619 387
            </a>
            <a
              href="mailto:booking@carrentalinkigali.com"
              className="top-bar-contact hover:text-blue-300"
              title="Email car rental inquiries"
            >
               <span className="hidden sm:inline">booking@carrentalinkigali.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
          </div>

          <div className="text-center text-blue-200 text-[10px] lg:text-xs font-medium">
             Best Kigali Car Rental Company • Save Big 10% Off • Kigali car rentals • Self Drive & Airport Pickup Rwanda
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className={`header-main ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* LOGO & BRANDING */}
            <Link
              href="/"
              className="flex-shrink-0 group"
              title="Kigali Car Rental - Car Rental Rwanda Kigali Airport Transfer Safari 4x4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-lg lg:text-2xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-tight">
                  Kigali Car Rentals
                </span>
                <span className="text-[9px] lg:text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                  Car Rental • Safari • Airport Transfer Rwanda
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
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

                  {/* DESKTOP DROPDOWN */}
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

            {/* CTA BUTTON - DESKTOP */}
            <Link
              href="/book-now"
              className="hidden lg:block cta-button text-white px-6 py-2.5 rounded-lg font-bold text-sm relative z-10"
              title="Book a car now - Kigali car rental reservation"
            >
              Book Now
            </Link>

            {/* MOBILE MENU BUTTON */}
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
              {menuStructure.map((menu, menuIdx) => (
                <div key={menu.label} className="mobile-menu-item">
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
