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
      label: "Car Rental Kigali",
      href: "/car-rental-kigali",
      submenus: [
        { label: "Cheap Car Rental Kigali", href: "/cheap-car-rental-kigali" },
        { label: "Luxury Car Rental Kigali", href: "/luxury-car-rental-kigali" },
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
        { label: "Car Hire Rwanda", href: "/car-hire-rwanda" },
      ],
    },
    {
      label: "4x4 Safari Rental",
      href: "/4x4-car-rental-rwanda",
      submenus: [
        { label: "Land Cruiser Rental Rwanda", href: "/land-cruiser-rental-rwanda" },
        { label: "Prado Rental Kigali", href: "/prado-rental-kigali" },
        { label: "Safari Car Rental Rwanda", href: "/safari-car-rental-rwanda" },
      ],
    },
    {
      label: "Airport Transfer Kigali",
      href: "/kigali-airport-transfer",
      submenus: [
        { label: "Kigali Airport Pickup", href: "/airport-pickup-kigali" },
        { label: "VIP Airport Transfer", href: "/vip-airport-service" },
        { label: "24/7 Airport Transfer Kigali", href: "/24-7-airport-service" },
      ],
    },
    {
      label: "Travel Guide Rwanda",
      href: "/driving-in-rwanda-guide",
      submenus: [
        { label: "Driving in Rwanda Guide", href: "/driving-in-rwanda-guide" },
        { label: "Car Rental Tips Rwanda", href: "/car-rental-tips-rwanda" },
        { label: "Rwanda Travel Cost Guide", href: "/rwanda-travel-cost-guide" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* 🔵 TOP BAR */}
      <div className="bg-[#0B1F3A] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center flex-wrap gap-2">
          
          <div className="flex gap-4">
            <a href="tel:+250787619387" className="hover:underline">
              📞 +250 787 619 387
            </a>
            <a href="mailto:booking@carrentalinkigali.com" className="hover:underline">
              ✉️ booking@carrentalinkigali.com
            </a>
          </div>

          <div className="font-semibold">
            🚗 Best Car Rental Kigali • Self Drive Rwanda • Airport Pickup • Safari 4x4 Rental Rwanda
          </div>
        </div>
      </div>

      {/* 🔵 MAIN NAV */}
      <div className={`transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-md py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-black text-[#0B1F3A]">
              Kigali Car Hire
            </span>
            <span className="text-[10px] text-gray-500 uppercase">
              Car Rental Kigali • Rwanda
            </span>
          </Link>

          {/* NAV */}
          <div className="hidden xl:flex items-center gap-6">

            {menuStructure.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={menu.href}
                  className="relative font-semibold text-gray-700 text-sm"
                  title={`${menu.label} | Best Car Rental Kigali Rwanda`}
                >
                  <span className="hover:text-[#1E3A8A] transition">
                    {menu.label}
                  </span>
                </Link>

                {/* DROPDOWN */}
                <div
                  className={`absolute top-full left-0 mt-3 w-64 bg-white shadow-xl rounded-xl border transition-all duration-200 ${
                    activeMenu === menu.label
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2"
                  }`}
                >
                  {menu.submenus.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1E3A8A]"
                      title={`${sub.label} Rwanda | Cheap & Luxury Car Hire Kigali`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <Link
              href="/book-now"
              className="bg-[#0B1F3A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1E3A8A] transition"
            >
              Book Car Now
            </Link>
          </div>

          {/* MOBILE BTN */}
          <button
            className="xl:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white shadow-lg p-4 space-y-3">
            {menuStructure.map((menu) => (
              <div key={menu.label}>
                <Link
                  href={menu.href}
                  className="block font-bold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {menu.label}
                </Link>
                <div className="pl-3">
                  {menu.submenus.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block text-sm py-1 text-gray-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href="/book-now"
              className="block text-center bg-[#0B1F3A] text-white py-3 rounded-lg font-bold"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
