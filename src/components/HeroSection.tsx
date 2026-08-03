"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [imageScale, setImageScale] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const imageTop = rect.top;
        const imageHeight = rect.height;
        if (imageTop < windowHeight && imageTop > -imageHeight) {
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight - imageTop) / (windowHeight + imageHeight)));
          setImageScale(1 + scrollProgress * 0.2);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden py-24">
      {/* Subtle background pattern instead of heavy PNG (was causing LCP 5s+) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50/30" />

      {/* Accent gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-200/15 via-yellow-100/8 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-[#01B000]/12 via-[#01B000]/6 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 pt-8 max-w-4xl mx-auto">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-[#01B000]/10 border border-[#01B000]/20 text-[#01B000] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#01B000] rounded-full animate-pulse" />
            #1 Trusted Car Rental in Kigali, Rwanda
          </div>

          {/* H1 — primary keyword front and center */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[1.1] font-[family-name:var(--font-plus-jakarta)] tracking-tight">
            Kigali Car Rental
          </h1>

          {/* Keyword-rich subheading */}
          <p className="text-xl sm:text-2xl font-semibold text-[#01B000] mb-4">
            Kigali Car Hire — Self-Drive, Chauffeur & Airport Transfers
          </p>

          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Explore Rwanda your way. We offer quality vehicles for car rental in Kigali — business trips,
            tourist adventures, airport transfers and cross-country journeys — available 24/7 with
            free Kigali city delivery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/book-now"
              className="w-full sm:w-auto bg-[#01B000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#019500] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Book a Car Now
            </Link>
            <Link
              href="/fleet"
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-[#01B000] flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View Our Fleet
            </Link>
            <a
              href="https://wa.me/250788892976"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#22bc5c] transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Trust stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { value: "1,000+", label: "Happy Customers" },
              { value: "50+", label: "Cars Available" },
              { value: "24/7", label: "Airport Pickup" },
              { value: "Since 1990", label: "Years Serving Rwanda" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl px-3 py-3 shadow-sm">
                <div className="text-lg font-bold text-[#01B000]">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Car showcase image */}
        <div ref={imageRef} className="flex justify-center mt-6">
          <Image
            src="https://kigalicarhire.b-cdn.net/hero%20section%20cars.png"
            alt="Kigali Car Hire fleet — quality cars available for rental in Rwanda"
            width={1200}
            height={400}
            className="w-full max-w-5xl h-auto rounded-2xl transition-transform duration-300 ease-out"
            style={{ transform: `scale(${imageScale})`, transformOrigin: "center center" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

