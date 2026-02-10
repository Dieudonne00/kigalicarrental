// app/kigali-airport-car-rental/page.tsx
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

export default function KigaliAirportCarRental() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  // Airport-specific categories
  const categories = [
    "All",
    "SUV",
    "Sedan",
    "Luxury",
    "Business",
    "Minivan",
    "4x4",
    "Economy"
  ];

  useEffect(() => {
    const fetchAirportCars = async () => {
      try {
        setLoading(true);
        // Using YOUR exact API pattern
        const response = await fetch("/api/cars?location=airport");
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

    fetchAirportCars();
  }, []);

  useEffect(() => {
    let filtered = cars;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(car => car.category === selectedCategory);
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
    router.push(`/book-now?car=${carId}&pickup=airport`);
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

  return (
    <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Hero Section - Airport Specific */}
      <div className="bg-gradient-to-r from-[#4B5320] to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kigali Airport Car Rental
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Meet & greet service at Kigali International Airport (KGL). 
              Your rental car ready when you land.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Meet & Greet</div>
                <div className="text-sm">At Arrivals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Airport Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Airport Pickup</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Same Flight</div>
                <div className="text-sm">Delayed? We Wait</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Services Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Airport Pickup Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4B5320] font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Book Online</h3>
              <p className="text-gray-600">Provide flight details & arrival time</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4B5320] font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">We Meet You</h3>
              <p className="text-gray-600">Our agent waits at arrivals with your name</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4B5320] font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Drive Away</h3>
              <p className="text-gray-600">Quick paperwork, then start your journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Airport Rental Fleet</h2>
              <p className="text-gray-600">
                {filteredCars.length} vehicles available for airport pickup
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search airport vehicles..."
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

        {/* Cars Grid - Using YOUR exact structure */}
        {filteredCars.length === 0 && cars.length > 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
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
        ) : (
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
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                        Airport Ready
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

                    {/* Specifications - Using YOUR exact icons */}
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
                        Book Airport Pickup
                      </button>
                      <Link
                        href={`/cars/${car.id}?pickup=airport`}
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
        )}

        {cars.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-xl shadow mt-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No airport vehicles available</h3>
            <p className="text-gray-600 mb-4">Contact us for airport rental options</p>
            <a href="tel:+250796077321" className="text-[#4B5320] font-bold hover:underline">
              +250 796 077 321
            </a>
          </div>
        )}
      </div>

      {/* Airport Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            KGL Airport Rental Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Meeting Point</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Arrivals Hall</p>
                    <p className="text-gray-600">Our agent waits with your name sign</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Flight Delays</p>
                    <p className="text-gray-600">We monitor flights and adjust pickup time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Parking Location</p>
                    <p className="text-gray-600">Vehicle parked in short-term parking area</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Valid driver's license</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Passport or ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Credit card for deposit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">International license if required</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-bold">Note:</span> Please have documents ready for quick airport processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#4B5320] to-green-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Arriving at KGL Airport?</h2>
              <p className="text-xl opacity-90 mb-6">
                Book your airport pickup in advance for a seamless arrival experience.
                Provide your flight details and we'll handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book-now?pickup=airport"
                  className="bg-white text-[#4B5320] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-center"
                >
                  Book Airport Pickup
                </Link>
                <a
                  href="tel:+250796077321"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors text-center"
                >
                  Airport Hotline
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Airport Contact</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-bold">Airport Operations:</div>
                  <a href="tel:+250796077321" className="text-lg hover:underline">
                    +250 796 077 321
                  </a>
                </div>
                <div>
                  <div className="font-bold">Emergency After Hours:</div>
                  <a href="tel:+250796077321" className="text-lg hover:underline">
                    +250 796 077 321
                  </a>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="font-bold">Email for Flight Details:</div>
                  <a href="mailto:booking@kigalicarrental.com" className="hover:underline">
                    booking@kigalicarrental.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
