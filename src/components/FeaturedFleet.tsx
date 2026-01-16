"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  images: string[];
  hasActiveBooking?: boolean;
}

export default function FeaturedFleet() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch("/api/cars?featured=true");
        const data = await response.json();
        setCars(data.cars || []);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured fleet...</p>
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Featured Fleet
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium vehicles, ready for your next adventure
          </p>
        </div>

        {/* Grid of Cars - 2 columns on mobile, 3 on desktop */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#01B000] transition-all duration-300 group"
              >
                {/* Car Image */}
                <div className="relative h-32 md:h-48 overflow-hidden">
                  <img
                    src={car.images[0] || "/placeholder-car.jpg"}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 flex gap-1 md:gap-2">
                    {car.hasActiveBooking && (
                      <span className="inline-block px-2 md:px-3 py-1 bg-yellow-500 text-white rounded-full text-[10px] md:text-xs font-bold">
                        Booked
                      </span>
                    )}
                    <span className="inline-block px-2 md:px-3 py-1 bg-[#01B000] text-white rounded-full text-[10px] md:text-xs font-bold">
                      Featured
                    </span>
                  </div>
                  {car.images.length > 1 && (
                    <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3">
                      <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-black/70 text-white rounded text-[10px] md:text-xs font-bold">
                        <svg
                          className="w-2.5 h-2.5 md:w-3 md:h-3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {car.images.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Car Info */}
                <div className="p-3 md:p-6">
                  <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-[family-name:var(--font-plus-jakarta)] line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-[10px] md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-1">
                    {car.brand} {car.model} • {car.year}
                  </p>

                  {/* Specifications */}
                  <div className="flex flex-wrap gap-1.5 md:gap-3 mb-2 md:mb-4 text-[10px] md:text-sm text-gray-600">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="capitalize hidden md:inline">{car.transmission}</span>
                      <span className="capitalize md:hidden">{car.transmission.substring(0, 4)}</span>
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{car.seats}</span>
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="capitalize hidden md:inline">{car.fuelType}</span>
                      <span className="capitalize md:hidden">{car.fuelType.substring(0, 3)}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-2 md:mb-4 pt-2 md:pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-0.5 md:gap-1">
                        <span className="text-base md:text-2xl font-bold text-[#01B000]">
                          ${car.dailyRate}
                        </span>
                        <span className="text-[10px] md:text-sm text-gray-500">/day</span>
                      </div>
                      <div className="hidden md:flex flex-col text-right text-xs text-gray-500">
                        {car.weeklyRate && (
                          <span>${car.weeklyRate}/week</span>
                        )}
                        {car.monthlyRate && (
                          <span>${car.monthlyRate}/month</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-[#01B000] text-white px-3 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-base font-bold hover:bg-[#019500] transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Cars Button */}
        <div className="text-center mt-12">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-[#01B000] font-bold text-lg hover:gap-3 transition-all"
          >
            View All Cars
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
