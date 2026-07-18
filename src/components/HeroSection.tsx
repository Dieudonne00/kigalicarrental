"use client";

import Image from "next/image";
import Link from "next/link";

const trustBadges = [
  { label: "Free Airport Pickup" },
  { label: "24/7 Support" },
  { label: "No Hidden Fees" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Decorative background accents - subtle, don't compete with content */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold mb-6 border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
              Trusted Car Rental in Kigali, Rwanda
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-[1.1] font-[family-name:var(--font-plus-jakarta)] tracking-tight">
              Car Rental Kigali
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Best Car Hire in Rwanda
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Premium SUVs, 4x4s, and luxury cars with free airport pickup, self-drive or
              chauffeur options, and 24/7 local support across Kigali and Rwanda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Book Car Rental Now
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-50 transition-all border-2 border-blue-200 hover:border-blue-400 shadow-md"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Fleet
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="relative order-first lg:order-last">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dxn12qcje/image/upload/cars/2024-toyota-land-cruiser-164-6616f45021cc9.avif"
                alt="Toyota Land Cruiser available for car rental in Kigali, Rwanda"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl px-4 sm:px-6 py-3 sm:py-4 border border-blue-100">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">50+</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Vehicles Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
