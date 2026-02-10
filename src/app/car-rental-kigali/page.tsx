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
  features: string[];
}

export default function CarRentalKigali() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  // Kigali-specific categories for city driving
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

  // Kigali-specific features
  const kigaliFeatures = [
    "Free Kigali Delivery",
    "Airport Pickup",
    "City Center Pickup",
    "24/7 Kigali Support",
    "GPS Navigation",
    "Child Seats Available"
  ];

  useEffect(() => {
    const fetchKigaliCars = async () => {
      try {
        setLoading(true);
        // Fetch Kigali-specific cars or all cars filtered for city use
        const response = await fetch("/api/cars?location=kigali");
        const data = await response.json();
        
        if (data.cars && Array.isArray(data.cars)) {
          setCars(data.cars);
          setFilteredCars(data.cars);
        } else {
          // Fallback: Kigali-optimized vehicles for city driving
          const kigaliCars: Car[] = [
            {
              id: "kig-1",
              name: "Toyota Corolla Hybrid",
              brand: "Toyota",
              model: "Corolla Hybrid",
              year: 2024,
              category: "Hybrid",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Hybrid",
              dailyRate: 50,
              weeklyRate: 300,
              monthlyRate: 1100,
              imageUrl: "/images/corolla-hybrid.jpg",
              features: ["Fuel Efficient", "GPS", "Free Delivery"]
            },
            {
              id: "kig-2",
              name: "Mazda CX-30",
              brand: "Mazda",
              model: "CX-30",
              year: 2023,
              category: "Compact",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 55,
              weeklyRate: 330,
              monthlyRate: 1200,
              imageUrl: "/images/mazda-cx30.jpg",
              features: ["Premium Interior", "Apple CarPlay", "Free Kigali Delivery"]
            },
            {
              id: "kig-3",
              name: "Toyota RAV4 City Edition",
              brand: "Toyota",
              model: "RAV4",
              year: 2023,
              category: "SUV",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 65,
              weeklyRate: 400,
              monthlyRate: 1450,
              imageUrl: "/images/rav4-kigali.jpg",
              features: ["Spacious", "Roof Rack", "City Parking Assist"]
            },
            {
              id: "kig-4",
              name: "Honda Civic Executive",
              brand: "Honda",
              model: "Civic",
              year: 2023,
              category: "Sedan",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 45,
              weeklyRate: 270,
              monthlyRate: 1000,
              imageUrl: "/images/honda-civic.jpg",
              features: ["Executive Package", "Leather Seats", "Business Ready"]
            },
            {
              id: "kig-5",
              name: "Suzuki Swift",
              brand: "Suzuki",
              model: "Swift",
              year: 2024,
              category: "Economy",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 35,
              weeklyRate: 210,
              monthlyRate: 750,
              imageUrl: "/images/suzuki-swift.jpg",
              features: ["Fuel Efficient", "Easy Parking", "Budget Friendly"]
            },
            {
              id: "kig-6",
              name: "Mercedes C-Class",
              brand: "Mercedes-Benz",
              model: "C-Class",
              year: 2023,
              category: "Luxury",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 120,
              weeklyRate: 750,
              monthlyRate: 2800,
              imageUrl: "/images/mercedes-c-class.jpg",
              features: ["Premium Luxury", "Chauffeur Service", "VIP Package"]
            },
            {
              id: "kig-7",
              name: "Toyota Camry Hybrid",
              brand: "Toyota",
              model: "Camry Hybrid",
              year: 2023,
              category: "Business",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Hybrid",
              dailyRate: 60,
              weeklyRate: 360,
              monthlyRate: 1300,
              imageUrl: "/images/camry-hybrid.jpg",
              features: ["Business Class", "WiFi Hotspot", "Meeting Ready"]
            },
            {
              id: "kig-8",
              name: "Hyundai Tucson",
              brand: "Hyundai",
              model: "Tucson",
              year: 2023,
              category: "SUV",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 58,
              weeklyRate: 350,
              monthlyRate: 1250,
              imageUrl: "/images/hyundai-tucson.jpg",
              features: ["Family Friendly", "Large Boot", "Safety Package"]
            },
            {
              id: "kig-9",
              name: "Nissan X-Trail",
              brand: "Nissan",
              model: "X-Trail",
              year: 2023,
              category: "SUV",
              transmission: "Automatic",
              seats: 7,
              fuelType: "Petrol",
              dailyRate: 70,
              weeklyRate: 420,
              monthlyRate: 1500,
              imageUrl: "/images/nissan-xtrail.jpg",
              features: ["7 Seater", "Family Size", "Roof Rails"]
            },
            {
              id: "kig-10",
              name: "Toyota Yaris",
              brand: "Toyota",
              model: "Yaris",
              year: 2024,
              category: "Economy",
              transmission: "Automatic",
              seats: 5,
              fuelType: "Petrol",
              dailyRate: 32,
              weeklyRate: 190,
              monthlyRate: 700,
              imageUrl: "/images/toyota-yaris.jpg",
              features: ["City Car", "Easy Drive", "Low Cost"]
            }
          ];
          setCars(kigaliCars);
          setFilteredCars(kigaliCars);
        }
      } catch (error) {
        console.error("Error fetching Kigali cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKigaliCars();
  }, []);

  useEffect(() => {
    let filtered = cars;
    
    // Apply category filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "Automatic") {
        filtered = filtered.filter(car => car.transmission === "Automatic");
      } else {
        filtered = filtered.filter(car => car.category === selectedCategory);
      }
    }
    
    // Apply search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(term) ||
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.category.toLowerCase().includes(term) ||
        car.features?.some(feature => feature.toLowerCase().includes(term))
      );
    }
    
    setFilteredCars(filtered);
  }, [searchTerm, selectedCategory, cars]);

  const handleBookNow = (carId: string) => {
    router.push(`/book-now?car=${carId}&location=kigali`);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B5320] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Kigali vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Hero Section - Kigali Specific */}
      <div className="bg-gradient-to-r from-[#4B5320] to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Car Rental Kigali - City & Airport
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Your trusted partner for car rentals in Kigali. Perfect vehicles for 
              business trips, city tours, and airport transfers across Rwanda's capital.
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
                <div className="text-2xl font-bold">KGL Airport</div>
                <div className="text-sm">Pickup Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Same Day</div>
                <div className="text-sm">Booking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kigali Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Rent With Us in Kigali?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kigaliFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Kigali Vehicle</h2>
              <p className="text-gray-600">
                {filteredCars.length} vehicles available for Kigali city driving
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Kigali vehicles..."
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

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found for Kigali</h3>
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
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 bg-[#4B5320] text-white rounded-full text-xs font-bold">
                        {car.category}
                      </span>
                    </div>
                    {car.features?.includes("Free Kigali Delivery") && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                          Free Delivery
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                        {car.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {car.brand} {car.model} • {car.year}
                      </p>
                    </div>

                    {/* Features */}
                    {car.features && car.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {car.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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

                    {/* Pricing */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-[#4B5320]">${car.dailyRate}</div>
                          <div className="text-sm text-gray-500">per day in Kigali</div>
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

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBookNow(car.id)}
                        className="flex-1 bg-gradient-to-r from-[#4B5320] to-green-700 text-white text-center px-4 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
                      >
                        Book in Kigali
                      </button>
                      <Link
                        href={`/cars/${car.id}?location=kigali`}
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

      {/* Kigali Specific Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Kigali Car Rental Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-[#4B5320] transition-colors">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Same Day Rental</h3>
              <p className="text-gray-600">Book and drive today in Kigali</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-[#4B5320] transition-colors">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Multiple Locations</h3>
              <p className="text-gray-600">Pickup from airport or city center</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-[#4B5320] transition-colors">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Business Fleet</h3>
              <p className="text-gray-600">Corporate accounts & business rates</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-[#4B5320] transition-colors">
              <div className="w-12 h-12 bg-[#4B5320]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always available for Kigali clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#4B5320] to-green-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Need a Car in Kigali Today?</h2>
              <p className="text-xl opacity-90 mb-6">
                Contact our Kigali team for immediate assistance, same-day bookings, 
                and personalized service in Rwanda's capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+250796077321"
                  className="bg-white text-[#4B5320] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-center"
                >
                  Call Kigali Office
                </a>
                <Link
                  href="/contact?location=kigali"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors text-center"
                >
                  Send Message
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Kigali Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-bold">7:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-bold">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-bold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="font-bold">Emergency After Hours:</div>
                  <a href="tel:+250796077321" className="text-lg hover:underline">
                    +250 796 077 321
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
