"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Hardcoded image path - make sure your logo is in /public folder
// If your logo is elsewhere, adjust this path or create the imageUrl function
const LOGO_PATH = "/mylogo-removebg-preview_mpcp0n.png";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuStructure = [
    {
      label: "Car Rental",
      href: "/car-hire-rwanda",
      submenus: [
        { label: "Car Rental Kigali", href: "/car-rental-kigali" },
        { label: "Kigali Airport Car Rental", href: "/kigali-airport-car-rental" },
        { label: "Cheap Car Rental Kigali", href: "/cheap-car-rental-kigali" },
        { label: "Luxury Car Rental Kigali", href: "/luxury-car-rental-kigali" },
        { label: "Long Term Car Rental", href: "/long-term-car-rental-rwanda" },
        { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
      ],
    },
    {
      label: "Safari 4x4",
      href: "/4x4-car-rental-rwanda",
      submenus: [
        { label: "4x4 Car Rental Rwanda", href: "/4x4-car-rental-rwanda" },
        { label: "Land Cruiser Rental", href: "/land-cruiser-rental-rwanda" },
        { label: "Prado Rental Kigali", href: "/prado-rental-kigali" },
        { label: "Akagera Safari Rental", href: "/akagera-safari-rental" },
        { label: "Nyungwe Forest Safari", href: "/nyungwe-forest-safari" },
      ],
    },
    {
      label: "Airport & Transfer",
      href: "/kigali-airport-transfer",
      submenus: [
        { label: "Kigali Airport Transfer", href: "/kigali-airport-transfer" },
        { label: "Airport Pickup Kigali", href: "/airport-pickup-kigali" },
        { label: "Hotel Delivery", href: "/hotel-delivery-car-rental-kigali" },
        { label: "VIP Airport Service", href: "/vip-airport-service" },
      ],
    },
    {
      label: "Travel Guide",
      href: "/driving-in-rwanda-guide",
      submenus: [
        { label: "Driving in Rwanda", href: "/driving-in-rwanda-guide" },
        { label: "Car Rental Tips", href: "/car-rental-tips-rwanda" },
        { label: "Travel Cost Rwanda", href: "/rwanda-travel-cost-guide" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0B1E3A]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP BAR */}
        <div className="hidden md:flex justify-between text-sm py-2 text-white/80">
          <div className="flex gap-6">
            <span>🚗 Kigali Car Rental Experts</span>
            <span>✔ Self Drive Rwanda</span>
            <span>✔ Airport Pickup Kigali</span>
          </div>

          <div className="flex gap-4 font-medium">
            <a href="tel:+250787619387">+250 787 619 387</a>
            <a href="mailto:booking@carrentalinkigali.com">booking@carrentalinkigali.com</a>
          </div>
        </div>

        {/* NAV */}
        <div className="flex items-center justify-between py-3">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={LOGO_PATH}
              alt="Kigali Car Rental Rwanda - Best Car Hire Kigali Airport"
              width={140}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-6 items-center">
            {menuStructure.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={menu.href}
                  className="text-white font-medium hover:text-blue-300 transition"
                >
                  {menu.label}
                </Link>

                {activeMenu === menu.label && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white text-gray-900 rounded-xl shadow-xl p-4 space-y-2">
                    {menu.submenus.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block p-2 rounded hover:bg-gray-100 text-sm"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/book-now"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-md transition"
            >
              Book Now
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-white text-gray-900 rounded-xl p-4 space-y-4 mb-4">
            {menuStructure.map((menu) => (
              <div key={menu.label}>
                <Link
                  href={menu.href}
                  className="font-bold block mb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {menu.label}
                </Link>
                <div className="pl-3 space-y-1">
                  {menu.submenus.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block text-sm text-gray-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href="/book-now"
              className="block text-center bg-blue-600 text-white py-3 rounded-lg font-bold"
              onClick={() => setMobileOpen(false)}
            >
              Book Your Car
            </Link>

            <div className="text-center text-sm mt-4">
              <a href="tel:+250787619387" className="block font-bold">
                +250 787 619 387
              </a>
              <a href="mailto:booking@carrentalinkigali.com">
                booking@carrentalinkigali.com
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
