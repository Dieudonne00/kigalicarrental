"use client";

import BlogListing from "@/components/BlogListing";
import { imageUrl } from "@/lib/images";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl("cars/1763129080028-2022-toyota-rav-4-prime-wheels-red-carprousa-1404x1112.webp")})`,
          }}
        >
          <div className="absolute inset-0 bg-black/65"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-32">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Rwanda Car Rental Blog & Travel Insights
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Powerful travel guides, smart car rental tips, and local insights from
            <span className="text-[#FF6B35] font-semibold"> Kigali Car Rentals </span>
            to help you explore Rwanda with confidence, comfort, and class.
          </p>

          {/* Accent Line */}
          <div className="mt-8 flex justify-center">
            <span className="w-24 h-1 bg-[#FF6B35] rounded-full"></span>
          </div>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="relative">
        {/* Decorative Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B]" />
        <BlogListing />
      </section>
    </main>
  );
}
