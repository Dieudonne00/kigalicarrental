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
    <section className="bg-[#F8FAFC] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-[#0B1F3A]">
            Car Rental Kigali Rwanda – 
            <span className="block text-[#1E3A8A]">
              Cheap, Luxury & 4x4 Safari Vehicles
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            Book reliable <strong>car rental in Kigali</strong> with flexible options —
            <strong> self drive Rwanda</strong>, chauffeur services, and 
            <strong> airport pickup at Kigali International Airport</strong>. 
            Affordable pricing, fast booking, and trusted service.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/book-now"
              className="bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
            >
               Book Car Now
            </Link>

            <Link
              href="/fleet"
              className="border border-gray-300 hover:border-[#1E3A8A] px-8 py-4 rounded-xl font-semibold text-gray-800 hover:text-[#1E3A8A] transition"
            >
              View Available Cars
            </Link>
          </div>

          {/* TRUST */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <div className="text-2xl font-bold text-[#0B1F3A]">500+</div>
              <div className="text-sm text-gray-500">Bookings</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-[#0B1F3A]">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-[#0B1F3A]">4.9★</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <div
            ref={imageRef}
            style={{ transform: `scale(${scale})` }}
            className="transition-transform duration-300 w-full max-w-md"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border">
              <Image
                src="https://res.cloudinary.com/dxn12qcje/image/upload/kgl%20.png"
                alt="Car rental Kigali Rwanda - self drive, airport transfer, safari vehicles"
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTACT SEO BOOST */}
      <div className="mt-20 text-center border-t pt-10">
        <p className="text-gray-600 text-sm">
          Cheap Car Rental Kigali • Luxury 4x4 Rwanda • Self Drive Rwanda • Airport Pickup Kigali
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <a
            href="tel:+250787619387"
            className="text-[#1E3A8A] font-bold"
          >
             +250 787 619 387
          </a>

          <a
            href="mailto:booking@carrentalinkigali.com"
            className="text-[#1E3A8A] font-bold"
          >
             booking@carrentalinkigali.com
          </a>
        </div>
      </div>
    </section>
  );
}
