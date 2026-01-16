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

        // Calculate how much of the image is visible in the viewport
        const imageTop = rect.top;
        const imageHeight = rect.height;

        // When image enters viewport from bottom, scale from 1 to 1.2
        // When scrolling down, zoom in; when scrolling up, zoom out
        if (imageTop < windowHeight && imageTop > -imageHeight) {
          // Calculate scroll progress (0 to 1)
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight - imageTop) / (windowHeight + imageHeight)));
          // Scale from 1 to 1.2 based on scroll progress
          const scale = 1 + (scrollProgress * 0.2);
          setImageScale(scale);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://kigalicarhire.b-cdn.net/kgl%20.png)' }}
      />

      {/* White Overlay - 85% opacity for subtle background */}
      <div className="absolute inset-0 bg-white/[0.85]" />

      {/* Yellow Gradient - Top Right Corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-200/15 via-yellow-100/8 to-transparent" />
      </div>

      {/* Glass Effect Gradient on Right Side */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-[#01B000]/12 via-[#01B000]/6 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Description Section */}
        <div className="text-center mb-8 pt-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] font-[family-name:var(--font-plus-jakarta)] tracking-tight">
            Flexible car rentals for business, tourism, and everything in between.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Experience seamless travel in Rwanda with our wide selection of quality vehicles. From airport pickups to cross-country adventures, we've got you covered.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book-now"
              className="w-full sm:w-auto bg-[#01B000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#019500] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Book Now
            </Link>
            <Link
              href="/fleet"
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-[#01B000] flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View Fleet
            </Link>
          </div>
        </div>

        {/* Car Image */}
        <div ref={imageRef} className="flex justify-center">
          <Image
            src="https://kigalicarhire.b-cdn.net/hero%20section%20cars.png"
            alt="Available Cars"
            width={1200}
            height={400}
            className="w-full max-w-5xl h-auto rounded-2xl transition-transform duration-300 ease-out"
            style={{ transform: `scale(${imageScale})`, transformOrigin: 'center center' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
