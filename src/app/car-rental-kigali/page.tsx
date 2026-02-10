// app/car-rental-kigali/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  imageUrl: string;
}

export default function CarRentalKigali() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  // Categories for Kigali
  const categories = [
    "All",
    "Economy",
    "Compact",
    "Sedan",
    "SUV",
    "Luxury",
    "Business",
    "Hybrid",
    "Automatic"
  ];

  useEffect(() => {
    const fetchKigaliCars = async () => {
      try {
        setLoading(true);
        // Using YOUR exact API pattern from FeaturedFleet
        const response = await fetch("/api/cars?location=kigali");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          setCars(data.cars);
          setFilteredCars(data.cars);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKigaliCars();
  }, []);

  useEffect(() => {
    let filtered = cars;
    
    if (selectedCategory !== "All") {
      if (selectedCategory === "Automatic") {
        filtered = filtered.filter(car => car.transmission === "Automatic");
      } else {
        filtered = filtered.filter(car => car.category === selectedCategory);
      }
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(term) ||
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredCars(filtered);
  }, [searchTerm, selectedCategory, cars]);

  const handleBookNow = (carId: string) => {
    router.push(`/book-now?car=${carId}&location=kigali`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B5320] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles available in Kigali</h3>
          <p className="text-gray-600 mb-4">Please check back later or contact our Kigali office</p>
          <a href="tel:+250796077321" className="text-[#4B5320] font-bold hover:underline">
            +250 796 077 321
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4B5320] to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Car Rental Kigali
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Best car rental service in Rwanda's capital. Airport pickup, city delivery, and flexible rental options.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Kigali Delivery</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Kigali Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{cars.length}+</div>
                <div className="text-sm">Vehicles in Kigali</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kigali Vehicle Fleet</h2>
              <p className="text-gray-600">
                {filteredCars.length} of {cars.length} vehicles
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320]"
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320] bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cars Grid - Using YOUR EXACT structure from FeaturedFleet */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#4B5320] hover:shadow-xl transition-all duration-300"
              >
                {/* IMAGE - Using YOUR exact pattern */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 bg-[#4B5320] text-white rounded-full text-xs font-bold">
                      {car.category}
                    </span>
                  </div>
                </div>

                {/* Car Details - Using YOUR exact structure */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {car.brand} {car.model} • {car.year}
                  </p>

                  {/* Specifications - Using YOUR exact icons and layout */}
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="capitalize">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{car.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="capitalize">{car.fuelType}</span>
                    </div>
                  </div>

                  {/* Pricing - Using YOUR exact structure */}
                  <div className="mb-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#4B5320]">
                          ${car.dailyRate}
                        </span>
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                      <div className="text-right">
                        {car.weeklyRate && (
                          <div className="text-sm">
                            <span className="text-gray-600">Weekly: </span>
                            <span className="font-bold">${car.weeklyRate}</span>
                          </div>
                        )}
                        {car.monthlyRate && (
                          <div className="text-sm">
                            <span className="text-gray-600">Monthly: </span>
                            <span className="font-bold">${car.monthlyRate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Using YOUR exact structure */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleBookNow(car.id)}
                      className="flex-1 bg-gradient-to-r from-[#4B5320] to-green-700 text-white text-center px-4 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
                    >
                      Book Now
                    </button>
                    <Link
                      href={`/cars/${car.id}`}
                      className="flex-1 border-2 border-[#4B5320] text-[#4B5320] text-center px-4 py-3 rounded-lg font-bold hover:bg-[#4B5320] hover:text-white transition-colors flex items-center justify-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredCars.length === 0 && cars.length > 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow mt-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles match your search</h3>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-[#4B5320] font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Kigali Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Kigali Car Rental Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Same Day Service</h3>
              <p className="text-gray-600">Book and drive on the same day in Kigali</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Pickup Points</h3>
              <p className="text-gray-600">Airport, city center, or hotel delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Kigali Support</h3>
              <p className="text-gray-600">Local support team always available</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#4B5320] to-green-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help in Kigali?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our Kigali team is ready to assist you with vehicle selection, booking, and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+250796077321"
              className="bg-white text-[#4B5320] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Call Kigali Office
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
