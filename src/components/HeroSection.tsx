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
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dxn12qcje/image/upload/kgl%20.png)' }}
      />

      {/* White Overlay - 85% opacity for subtle background */}
      <div className="absolute inset-0 bg-white/[0.85]" />

      {/* Army Green Gradient - Top Right Corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#4B5320]/15 via-[#4B5320]/8 to-transparent" />
      </div>

      {/* Glass Effect Gradient with Army Green on Right Side */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-[#4B5320]/12 via-[#4B5320]/6 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Description Section */}
        <div className="text-center mb-8 pt-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] font-[family-name:var(--font-plus-jakarta)] tracking-tight">
            Discover Rwanda with Confidence - Premium Car Rentals for Every Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the Land of a Thousand Hills in comfort and style. Whether you're exploring Kigali's vibrant streets, 
            embarking on a safari adventure, or traveling for business, our reliable fleet is ready for your Rwandan journey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book-now"
              className="w-full sm:w-auto bg-[#4B5320] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#3a4218] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Reserve Your Car
            </Link>
            <Link
              href="/fleet"
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-[#4B5320] flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Explore Our Fleet
            </Link>
          </div>
        </div>

        {/* Car Image - Updated Banner */}
       
      </div>
    </section>
  );
}
