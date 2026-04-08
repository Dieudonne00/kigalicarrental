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
      href: "/car-hire-rwanda",
      submenus: [
        { label: "Car Rental Kigali", href: "/car-rental-kigali" },
        { label: "Airport Car Rental", href: "/kigali-airport-car-rental" },
        { label: "Cheap Car Rental", href: "/cheap-car-rental-kigali" },
        { label: "Luxury Car Rental", href: "/luxury-car-rental-kigali" },
        { label: "Long Term Rental", href: "/long-term-car-rental-rwanda" },
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
      ],
    },
    {
      label: "4x4 & Safari",
      href: "/4x4-car-rental-rwanda",
      submenus: [
        { label: "Safari Car Rental", href: "/safari-car-rental-rwanda" },
        { label: "Land Cruiser Rental", href: "/land-cruiser-rental-rwanda" },
        { label: "Prado Rental Kigali", href: "/prado-rental-kigali" },
        { label: "Rooftop Tent Cars", href: "/rooftop-tent-car-rental-rwanda" },
        { label: "Akagera Safari", href: "/akagera-safari-rental" },
        { label: "Nyungwe Forest Trips", href: "/nyungwe-forest-safari" },
      ],
    },
    {
      label: "Airport Transfer",
      href: "/kigali-airport-transfer",
      submenus: [
        { label: "Airport Pickup Kigali", href: "/airport-pickup-kigali" },
        { label: "Hotel Delivery", href: "/hotel-delivery-car-rental-kigali" },
        { label: "VIP Transfer", href: "/vip-airport-service" },
        { label: "24/7 Airport Service", href: "/24-7-airport-service" },
      ],
    },
    {
      label: "Travel Guide",
      href: "/driving-in-rwanda-guide",
      submenus: [
        { label: "Driving in Rwanda", href: "/driving-in-rwanda-guide" },
        { label: "Car Rental Tips", href: "/car-rental-tips-rwanda" },
        { label: "Travel Cost Guide", href: "/rwanda-travel-cost-guide" },
        { label: "Safety Guide", href: "/self-drive-safety-rwanda" },
      ],
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-white/90 backdrop-blur-md py-3"
      } border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex flex-col">
            <div className="text-xl md:text-2xl font-black text-[#0B1F3A]">
              Kigali Car Hire
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">
              Premium Rwanda Mobility
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden xl:flex items-center gap-6">

            {menuStructure.map((menu) => (
              <div
                key={menu.label}
                className="relative group"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={menu.href}
                  className="relative text-gray-700 font-semibold text-sm"
                >
                  <span className="group-hover:text-[#1E3A8A] transition">
                    {menu.label}
                  </span>
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#1E3A8A] group-hover:w-full transition-all"></span>
                </Link>

                {/* DROPDOWN */}
                {activeMenu === menu.label && (
                  <div className="absolute top-full left-0 mt-4 w-64 bg-white rounded-xl shadow-2xl border p-4 animate-fadeIn">
                    {menu.submenus.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-[#1E3A8A] transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA */}
            <Link
              href="/book-now"
              className="relative bg-[#0B1F3A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1E3A8A] transition flex items-center gap-2"
            >
              Book Now
              <span className="text-sm">→</span>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="xl:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 bg-white rounded-xl shadow-lg p-4 space-y-3">
            {menuStructure.map((menu) => (
              <div key={menu.label}>
                <Link
                  href={menu.href}
                  className="block font-bold text-gray-800 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {menu.label}
                </Link>
                <div className="pl-3">
                  {menu.submenus.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block text-sm text-gray-600 py-1"
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
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
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}
