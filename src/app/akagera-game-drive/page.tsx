"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Car {
  id: string;
  name: string;
  description: string | null;
  brand: string;
  model: string;
  year: number;
  category: string;
  fuelType: string;
  transmission: string;
  seats: number;
  dailyRate: number;
  weeklyRate: number | null;
  images: string[];
  available: boolean;
  gameDrive: boolean;
}

export default function AkageraGameDrivePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDriveCars = async () => {
      try {
        const response = await fetch("/api/cars?gameDrive=true");
        if (response.ok) {
          const data = await response.json();
          setCars(data.cars);
        }
      } catch (error) {
        console.error("Error fetching game drive cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDriveCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://kigalicarhire.b-cdn.net/game-drive-akagera.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-32">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Akagera Game Drive
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
            Experience the wildlife of Akagera National Park with our self-drive game drive vehicles.
            Drive yourself through Rwanda's premier safari destination and discover lions, elephants,
            rhinos, and more in their natural habitat.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#01B000] text-white font-bold text-sm md:text-base rounded-lg hover:bg-[#019500] transition-all shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need More Info? Contact Us
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-50 rounded-xl flex items-center justify-center text-[#01B000] mb-4 md:mb-6">
              <svg
                className="w-8 h-8 md:w-10 md:h-10"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 font-[family-name:var(--font-plus-jakarta)]">
              Self-Drive Experience
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Explore Akagera National Park at your own pace. Our 4x4 vehicles are perfect for
              navigating the park's terrain while you search for the Big Five and other incredible wildlife.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Drive yourself through the park</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Flexible timing - stay as long as you want</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Perfect for photography enthusiasts</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-[#01B000] mb-6">
              <svg
                className="w-10 h-10"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
              What You Need to Know
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Valid driver's license required</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Park entrance fees paid separately</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">4x4 vehicles recommended</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Park opens at 6:00 AM, closes at 6:00 PM</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#01B000] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Stay in your vehicle at all times</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Available Vehicles */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center font-[family-name:var(--font-plus-jakarta)]">
            Available Vehicles for Game Drive
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]"></div>
              <p className="mt-4 text-gray-600 text-sm md:text-base">Loading vehicles...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-8 md:py-12 bg-white rounded-xl border-2 border-gray-200">
              <p className="text-gray-600 text-sm md:text-base mb-4">No game drive vehicles currently available.</p>
              <p className="text-gray-500 text-sm md:text-base">Please contact us for more information.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#01B000] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-32 md:h-48">
                    <img
                      src={car.images[0] || "/placeholder-car.jpg"}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 md:top-4 right-2 md:right-4">
                      <span className="bg-[#01B000] text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm font-bold">
                        Game Drive
                      </span>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-[family-name:var(--font-plus-jakarta)] line-clamp-1">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 text-[10px] md:text-sm mb-2 md:mb-4">
                      {car.brand} {car.model} • {car.year}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {car.seats} Seats
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {car.fuelType}
                      </span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-[#01B000]">
                            ${car.dailyRate}
                          </span>
                          <span className="text-gray-600 ml-1">/day</span>
                        </div>
                      </div>

                      <Link
                        href={`/cars/${car.id}`}
                        className="block w-full text-center bg-[#01B000] text-white py-3 rounded-lg font-bold hover:bg-[#019500] transition-all"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Ready for Your Safari Adventure?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us to book your Akagera game drive vehicle or for more information about park conditions and recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+250788892976"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#01B000] text-white font-bold rounded-lg hover:bg-[#019500] transition-all"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us: +250 788 892 976
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-900 font-bold rounded-lg hover:border-[#01B000] hover:bg-[#01B000] hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
