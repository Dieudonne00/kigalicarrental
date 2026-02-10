// app/car-hire-rwanda/page.tsx
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

export default function CarHireRwanda() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const categories = [
    "All",
    "SUV",
    "4x4",
    "Sedan",
    "Pickup",
    "Minibus",
    "Compact SUV",
    "Economy",
    "Luxury",
    "Business"
  ];

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        setLoading(true);
        // Using your existing API endpoint structure
        const response = await fetch("/api/cars");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          setCars(data.cars);
          setFilteredCars(data.cars);
        } else {
          // Fallback to sample data if API fails
          const sampleCars: Car[] = [
            {
              id: "1",
              name: "Toyota RAV4",
              brand: "Toyota",
              model: "RAV4",
              year: 2023,
              category: "SUV",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 85,
              weeklyRate: 500,
              monthlyRate: 1800,
              imageUrl: "/images/toyota-rav4.jpg"
            },
            {
              id: "2",
              name: "Toyota Land Cruiser",
              brand: "Toyota",
              model: "Land Cruiser",
              year: 2022,
              category: "4x4",
              transmission: "Automatic",
              seats: 7,
              fuelType: "Diesel",
              dailyRate: 120,
              weeklyRate: 750,
              monthlyRate: 2800,
              imageUrl: "/images/land-cruiser.jpg"
            },
            {
              id: "3",
              name: "Toyota Hilux",
              brand: "Toyota",
              model: "Hilux",
              year: 2023,
              category: "Pickup",
              transmission: "Manual",
              seats: 5,
              fuelType: "Diesel",
              dailyRate: 65,
              weeklyRate: 400,
              monthlyRate: 1500,
              imageUrl: "/images/hilux.jpg"
            },
            {
              id: "4",
              name: "Mazda CX-5",
              brand: "Mazda",
              model: "CX-5",
              year: 2023,
              category: "SUV",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 75,
              weeklyRate: 450,
              monthlyRate: 1600,
              imageUrl: "/images/mazda-cx5.jpg"
            },
            {
              id: "5",
              name: "Toyota Hiace",
              brand: "Toyota",
              model: "Hiace",
              year: 2022,
              category: "Minibus",
              transmission: "Manual",
              seats: 14,
              fuelType: "Diesel",
              dailyRate: 95,
              weeklyRate: 600,
              monthlyRate: 2200,
              imageUrl: "/images/hiace.jpg"
            },
            {
              id: "6",
              name: "Suzuki Vitara",
              brand: "Suzuki",
              model: "Vitara",
              year: 2023,
              category: "Compact SUV",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 60,
              weeklyRate: 350,
              monthlyRate: 1300,
              imageUrl: "/images/vitara.jpg"
            },
            {
              id: "7",
              name: "Toyota Corolla",
              brand: "Toyota",
              model: "Corolla",
              year: 2023,
              category: "Sedan",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 55,
              weeklyRate: 320,
              monthlyRate: 1200,
              imageUrl: "/images/corolla.jpg"
            },
            {
              id: "8",
              name: "Land Rover Defender",
              brand: "Land Rover",
              model: "Defender",
              year: 2022,
              category: "4x4",
              transmission: "Automatic",
              seats: 7,
              fuelType: "Diesel",
              dailyRate: 150,
              weeklyRate: 900,
              monthlyRate: 3200,
              imageUrl: "/images/defender.jpg"
            }
          ];
          setCars(sampleCars);
          setFilteredCars(sampleCars);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCars();
  }, []);

  useEffect(() => {
    let filtered = cars;
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(car => car.category === selectedCategory);
    }
    
    // Apply search filter
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
    router.push(`/book-now?car=${carId}`);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B5320] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading our Rwanda fleet...</p>
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
              Car Hire Rwanda - Complete Fleet
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Browse our extensive collection of vehicles available for rental across Rwanda. 
              From compact city cars to rugged 4x4 safari vehicles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{cars.length}+</div>
                <div className="text-sm">Vehicles Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Kigali Delivery</div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Vehicle</h2>
              <p className="text-gray-600">
                Showing {filteredCars.length} of {cars.length} vehicles
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, brand, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B5320]"
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Category Filter */}
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

        {/* Cars Grid - Using YOUR exact component structure */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
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
                  {/* Car Image */}
                  <div className="relative h-48 overflow-hidden">
                    {car.imageUrl ? (
                      <img
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback image if URL fails
                          (e.target as HTMLImageElement).src = "/images/car-placeholder.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 bg-[#4B5320] text-white rounded-full text-xs font-bold">
                        {car.category}
                      </span>
                    </div>
                  </div>

                  {/* Car Details - Matching YOUR component structure */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                        {car.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {car.brand} {car.model} • {car.year}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className="capitalize">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{car.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="capitalize">{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{car.category}</span>
                      </div>
                    </div>

                    {/* Pricing - Matching YOUR structure */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-[#4B5320]">${car.dailyRate}</div>
                          <div className="text-sm text-gray-500">per day</div>
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

                    {/* Action Buttons - Matching YOUR component */}
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
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-[#4B5320] to-green-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our Rwanda experts can help you select the perfect vehicle for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#4B5320] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Contact Our Team
            </Link>
            <a
              href="tel:+250796077321"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Call +250 796 077 321
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
