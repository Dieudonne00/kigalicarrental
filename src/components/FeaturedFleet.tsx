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
  featured?: boolean;
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
        
        if (data.cars && Array.isArray(data.cars)) {
          setCars(data.cars);
        }
      } catch (error) {
        console.error("Error:", error);
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A] mx-auto"></div>
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
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
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

        .fleet-heading {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        .fleet-card {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        .fleet-card:nth-child(1) { animation-delay: 0.1s; }
        .fleet-card:nth-child(2) { animation-delay: 0.2s; }
        .fleet-card:nth-child(3) { animation-delay: 0.3s; }
        .fleet-card:nth-child(4) { animation-delay: 0.4s; }
        .fleet-card:nth-child(5) { animation-delay: 0.5s; }
        .fleet-card:nth-child(6) { animation-delay: 0.6s; }

        .car-card {
          background: white;
          border: 2px solid #e5e7eb;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .car-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #1E3A8A, #0B1F3A);
          transition: left 0.3s ease;
          z-index: 10;
        }

        .car-card:hover::before {
          left: 100%;
        }

        .car-card:hover {
          border-color: #1E3A8A;
          box-shadow: 0 12px 32px rgba(30, 58, 138, 0.15);
          transform: translateY(-4px);
        }

        .featured-badge {
          background: linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.5px;
        }

        .booked-badge {
          background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.5px;
        }

        .car-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        @media (min-width: 768px) {
          .car-specs {
            gap: 0.75rem;
          }
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6b7280;
          font-size: 10px;
        }

        @media (min-width: 768px) {
          .spec-item {
            font-size: 14px;
            gap: 0.375rem;
          }
        }

        .spec-icon {
          width: 12px;
          height: 12px;
          color: #1E3A8A;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .spec-icon {
            width: 16px;
            height: 16px;
          }
        }

        .price-section {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .price-amount {
          font-size: 20px;
          font-weight: 700;
          color: #0B1F3A;
        }

        @media (min-width: 768px) {
          .price-amount {
            font-size: 24px;
          }
        }

        .price-period {
          font-size: 10px;
          color: #9ca3af;
        }

        @media (min-width: 768px) {
          .price-period {
            font-size: 13px;
          }
        }

        .view-details-btn {
          background: #0B1F3A;
          color: white;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .view-details-btn:hover {
          background: #1E3A8A;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(11, 31, 58, 0.2);
        }

        .view-all-link {
          color: #0B1F3A;
          font-weight: 700;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .view-all-link:hover {
          color: #1E3A8A;
          transform: translateX(4px);
        }
      `}</style>

      <div className="container mx-auto px-4">
        {/* SECTION HEADING */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="fleet-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] mb-3 md:mb-4">
            Featured Fleet
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore our premium selection of <strong>cheap car rental</strong>, <strong>luxury SUVs</strong>, and <strong>4x4 safari vehicles</strong> available for self-drive or chauffeur service in Kigali Rwanda.
          </p>
        </div>

        {/* CARS GRID */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
            {cars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className="fleet-card car-card rounded-xl overflow-hidden block group"
              >
                {/* CAR IMAGE */}
                <div className="relative h-32 md:h-48 bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model} - Car rental Kigali Rwanda`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      title={`${car.name} - ${car.category} Car Rental in Kigali Rwanda`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <svg
                        className="w-12 h-12 md:w-16 md:h-16 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* BADGES */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 z-20 flex gap-1 md:gap-2">
                    {car.hasActiveBooking && (
                      <span className="booked-badge inline-block px-2 md:px-3 py-1 text-white rounded-full">
                        Booked
                      </span>
                    )}
                    <span className="featured-badge inline-block px-2 md:px-3 py-1 text-white rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* YEAR BADGE */}
                  <div className="absolute bottom-2 left-2 z-20">
                    <span className="inline-block px-2 md:px-3 py-0.5 bg-white/90 text-[#0B1F3A] rounded-full text-[9px] md:text-xs font-bold">
                      {car.year}
                    </span>
                  </div>

                  {/* CATEGORY TAG */}
                  <div className="absolute bottom-2 right-2 z-20">
                    <span className="inline-block px-2 md:px-3 py-0.5 bg-white/90 text-[#0B1F3A] rounded-full text-[9px] md:text-xs font-bold capitalize">
                      {car.category}
                    </span>
                  </div>
                </div>

                {/* CAR INFO */}
                <div className="p-3 md:p-4 lg:p-5">
                  {/* NAME */}
                  <h3 className="text-sm md:text-lg lg:text-xl font-black text-[#0B1F3A] mb-0.5 md:mb-1 line-clamp-1 group-hover:text-[#1E3A8A] transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-1 font-medium">
                    {car.brand} {car.model}
                  </p>

                  {/* SPECIFICATIONS */}
                  <div className="car-specs mb-2 md:mb-4">
                    {/* TRANSMISSION */}
                    <div className="spec-item">
                      <svg className="spec-icon" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="capitalize hidden md:inline">{car.transmission}</span>
                      <span className="capitalize md:hidden">{car.transmission.substring(0, 4)}</span>
                    </div>

                    {/* SEATS */}
                    <div className="spec-item">
                      <svg className="spec-icon" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{car.seats} <span className="hidden md:inline">Seats</span></span>
                    </div>

                    {/* FUEL */}
                    <div className="spec-item">
                      <svg className="spec-icon" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="capitalize hidden md:inline">{car.fuelType}</span>
                      <span className="capitalize md:hidden">{car.fuelType.substring(0, 3)}</span>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="mb-2 md:mb-4 pt-2 md:pt-3 border-t border-gray-200" />

                  {/* PRICING */}
                  <div className="mb-3 md:mb-4">
                    <div className="price-section">
                      <span className="price-amount">${car.dailyRate}</span>
                      <span className="price-period">/day</span>
                    </div>
                    {car.weeklyRate && (
                      <div className="text-[9px] md:text-xs text-gray-500 mt-1">
                        Weekly: ${car.weeklyRate}
                      </div>
                    )}
                    {car.monthlyRate && (
                      <div className="text-[9px] md:text-xs text-gray-500">
                        Monthly: ${car.monthlyRate}
                      </div>
                    )}
                  </div>

                  {/* CTA BUTTON */}
                  <div className="view-details-btn block w-full text-center px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold">
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* VIEW ALL CARS CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/cars"
            className="view-all-link text-lg hover:text-[#1E3A8A]"
            title="View all car rentals available in Kigali Rwanda - Cheap, Luxury & 4x4 Safari"
          >
            View All Cars
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
