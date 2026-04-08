"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [scale, setScale] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / windowHeight;
        setScale(1 + Math.min(progress * 0.08, 0.08));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#F8FAFC] pt-24 pb-16 md:pt-28 md:pb-20">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-heading {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s backwards;
        }

        .hero-subtext {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards;
        }

        .hero-buttons {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;
        }

        .hero-image {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s backwards;
        }

        .hero-stats {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards;
        }

        .cta-primary {
          background: #0B1F3A;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-primary:hover {
          background: #1E3A8A;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(11, 31, 58, 0.2);
        }

        .cta-secondary {
          border-color: #d1d5db;
          color: #1f2937;
          transition: all 0.3s ease;
          position: relative;
        }

        .cta-secondary:hover {
          border-color: #1E3A8A;
          color: #1E3A8A;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(30, 58, 138, 0.1);
        }

        .stat-value {
          color: #0B1F3A;
        }

        .stat-label {
          color: #6b7280;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* HEADLINE - COMPACT */}
          <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-[#0B1F3A]">
            Car Rental Kigali Rwanda – 
            <span className="block text-[#1E3A8A] mt-2">
              Cheap, Luxury & 4x4 Safari
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="hero-subtext mt-4 text-base sm:text-lg text-gray-700 max-w-lg leading-relaxed">
            Book reliable <strong>car rental in Kigali</strong> with flexible options — <strong>self drive Rwanda</strong>, chauffeur services, and <strong>airport pickup at Kigali International Airport</strong>. Affordable pricing, fast booking, and trusted service.
          </p>

          {/* CTA BUTTONS */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 mt-7">
            <Link
              href="/book-now"
              className="cta-primary text-white px-7 py-3 rounded-lg font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 w-full sm:w-auto"
              title="Book car rental in Kigali Rwanda - Reserve your vehicle"
            >
               Book Car Now
            </Link>

            <Link
              href="/fleet"
              className="cta-secondary border-2 px-7 py-3 rounded-lg font-semibold text-base transition flex items-center justify-center gap-2 w-full sm:w-auto"
              title="View available cars - Cheap car rental, luxury 4x4 safari vehicles Kigali"
            >
              View Available Cars
            </Link>
          </div>

          {/* TRUST SECTION */}
          <div className="hero-stats grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-200">
            <div>
              <div className="stat-value text-2xl font-bold">500+</div>
              <div className="stat-label text-sm font-medium">Bookings</div>
            </div>

            <div>
              <div className="stat-value text-2xl font-bold">24/7</div>
              <div className="stat-label text-sm font-medium">Support</div>
            </div>

            <div>
              <div className="stat-value text-2xl font-bold">4.9★</div>
              <div className="stat-label text-sm font-medium">Rating</div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE - RAV4 */}
        <div className="hero-image flex justify-center lg:justify-end">
          <div
            ref={imageRef}
            style={{ transform: `scale(${scale})` }}
            className="transition-transform duration-300 w-full max-w-md"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 flex items-center justify-center min-h-[400px]">
                {/* High Quality RAV4 2025 Image */}
                <Image
                  src="https://www.toyota.com.sa/-/media/feature/toyotaksa/vehicle/suv/rav4/2026/new-colors/available-on-all-grades-except-the-xse/urban-rock-1170x395.png?h=395&w=1170&la=en&hash=AE6B69709A426524FB01C6A1A8DDF92BD21FC2BD"
                  alt="Best Kigali Car Rental Company • Save Big 10% Off • Kigali car rentals • Self Drive rwanda"
                  width={500}
                  height={400}
                  priority
                  className="w-full h-auto object-contain drop-shadow-lg"
                  title="Best Kigali Car Rental Company • Save Big 10% Off • Kigali car rentals • Self Drive & Airport Pickup Rwanda"
                />
              </div>

              {/* INFO BADGE */}
              <div className="bg-white px-5 py-4 border-t border-gray-100">
                <div className="text-sm font-bold text-[#0B1F3A]">
                   Save Big 10% Off
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Best Kigali Car Rental Company • Save Big 10% Off • Kigali car rentals • Self Drive & Airport Pickup Rwanda
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SEO & CONTACT */}
      <div className="mt-16 pt-12 border-t border-gray-200 text-center max-w-7xl mx-auto px-4">
        <p className="text-gray-700 text-sm font-medium mb-6">
          <strong>Cheap Car Rental Kigali</strong> • <strong>Luxury 4x4 Rwanda</strong> • <strong>Self Drive Rwanda</strong> • <strong>Airport Pickup Kigali</strong>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
          <a
            href="tel:+250787619387"
            className="text-[#1E3A8A] font-bold text-base hover:text-[#0B1F3A] transition"
            title="Call Kigali Car Hire for car rental booking"
          >
             +250 787 619 387
          </a>

          <span className="hidden sm:block text-gray-300">|</span>

          <a
            href="mailto:booking@carrentalinkigali.com"
            className="text-[#1E3A8A] font-bold text-base hover:text-[#0B1F3A] transition"
            title="Email booking inquiry for car rental Kigali"
          >
             booking@carrentalinkigali.com
          </a>
        </div>
      </div>
    </section>
  );
}
