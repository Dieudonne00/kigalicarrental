'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

const navItems: NavItem[] = [
  {
    name: 'Our Fleet',
    href: '/fleet',
    submenu: [
      { name: 'All Cars', href: '/fleet', description: 'Browse our entire collection' },
      { name: 'SUVs', href: '/fleet/suv', description: 'Spacious and powerful' },
      { name: 'Sedans', href: '/fleet/sedan', description: 'Comfort and efficiency' },
      { name: 'Luxury', href: '/fleet/luxury', description: 'Premium experience' },
      { name: '4x4 Safari', href: '/fleet/4x4', description: 'For Rwanda adventures' },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Self-Drive', href: '/services/self-drive', description: 'Explore at your own pace' },
      { name: 'With Driver', href: '/services/chauffeur', description: 'Professional chauffeurs' },
      { name: 'Airport Transfer', href: '/services/airport-transfer', description: 'KGL airport pickup' },
      { name: 'Long-term Rental', href: '/services/long-term', description: 'Monthly packages' },
      { name: 'Corporate', href: '/services/corporate', description: 'Business solutions' },
    ],
  },
  {
    name: 'Kigali',
    href: '/locations/kigali',
    submenu: [
      { name: 'City Center', href: '/locations/kigali/city-center', description: 'Downtown pickup' },
      { name: 'Kigali Airport', href: '/locations/kigali/airport', description: 'KGL arrivals' },
      { name: 'Kimihurura', href: '/locations/kigali/kimihurura', description: 'Embassy district' },
      { name: 'Nyarutarama', href: '/locations/kigali/nyarutarama', description: 'Residential area' },
      { name: 'Kacyiru', href: '/locations/kigali/kacyiru', description: 'Business hub' },
    ],
  },
  {
    name: 'Destinations',
    href: '/destinations',
    submenu: [
      { name: 'Volcanoes National Park', href: '/destinations/volcanoes', description: 'Gorilla trekking' },
      { name: 'Akagera Safari', href: '/destinations/akagera', description: 'Big Five experience' },
      { name: 'Lake Kivu', href: '/destinations/lake-kivu', description: 'Beach & relaxation' },
      { name: 'Nyungwe Forest', href: '/destinations/nyungwe', description: 'Canopy walk & chimps' },
    ],
  },
  {
    name: 'About',
    href: '/about',
    submenu: [
      { name: 'Our Story', href: '/about', description: 'Who we are' },
      { name: 'Why Choose Us', href: '/about/why-us', description: 'The Kigali difference' },
      { name: 'FAQ', href: '/faq', description: 'Common questions' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sky-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-sky-600 leading-tight">Kigali</span>
              <span className="text-sm text-gray-500 leading-tight">Car Rental</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-sky-600 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-sky-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 rounded-lg hover:bg-sky-50 transition-colors duration-150"
                        >
                          <div className="font-medium text-gray-800">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-sm text-gray-500 mt-0.5">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/booking"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-sky-200 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-sky-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-sky-100 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-sky-50 last:border-0">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:text-sky-600 rounded-lg transition-colors"
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {item.submenu && activeDropdown === item.name && (
                    <div className="pl-4 pr-2 pb-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <div className="font-medium">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-400">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/booking"
                className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-medium rounded-full text-center hover:shadow-lg transition-all"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
