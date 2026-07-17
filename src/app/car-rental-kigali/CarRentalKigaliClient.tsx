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

export default function CarRentalKigaliClient() {
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
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        const fetchedCars = data.cars || [];
        setCars(fetchedCars);
        setFilteredCars(fetchedCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKigaliCars();
  }, []);

  useEffect(() => {
    let filtered = cars;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(car => car.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  }, [cars, selectedCategory, searchTerm]);

  const handleBookNow = (carId: string) => {
    router.push(`/cars/${carId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section - BLUE THEME */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Best Car Rental Kigali Rwanda | Airport Pickup Available
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Car Rental Kigali
            <span className="block text-blue-100">
              Best Car Hire Services Rwanda
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium car rental services in Kigali Rwanda. Airport pickup, city delivery, SUVs & luxury cars.
            Self drive car rental Kigali, chauffeur services, 4x4 safari vehicles. Best rates guaranteed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              🚗 Free Airport Delivery Kigali
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              ⏰ 24/7 Car Rental Support Rwanda
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              📍 50+ Car Rental Vehicles Kigali
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section - BLUE THEME */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-white to-blue-50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-12 border border-blue-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Find Your Perfect Car Rental Kigali Rwanda
            </h2>
            <p className="text-blue-600 text-lg">
              Search our premium fleet of cars for hire in Kigali. Airport pickup, self-drive, chauffeur services available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Search Car Rental Kigali Rwanda
              </label>
              <input
                type="text"
                placeholder="Search Toyota Prado, Land Cruiser, SUVs, Luxury Cars - Car Hire Rwanda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                Car Rental Category Kigali
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-6 py-4 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category} Car Rental Kigali</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 text-sm text-blue-600 bg-blue-100 px-6 py-3 rounded-full">
              <span className="flex items-center gap-1">
                <span className="text-blue-500">✓</span> Airport Pickup Available
              </span>
              <span className="flex items-center gap-1">
                <span className="text-blue-500">✓</span> 24/7 Support
              </span>
              <span className="flex items-center gap-1">
                <span className="text-blue-500">✓</span> Best Rates Kigali
              </span>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
              <div className="relative h-56 bg-gradient-to-br from-blue-50 to-blue-100">
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model} ${car.year} - Best Car Rental Kigali Rwanda`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-car.jpg';
                  }}
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                  {car.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Available Now
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {car.brand} {car.model} {car.year}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span className="text-blue-500">🚗</span> {car.transmission}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-blue-500">👥</span> {car.seats} seats
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-blue-500">⛽</span> {car.fuelType}
                  </span>
                </div>
                <div className="space-y-3 mb-6 bg-blue-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Daily Rate:</span>
                    <span className="font-bold text-2xl text-blue-600">${car.dailyRate}</span>
                  </div>
                  {car.weeklyRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Weekly Rate:</span>
                      <span className="font-bold text-xl text-blue-600">${car.weeklyRate}</span>
                    </div>
                  )}
                  {car.monthlyRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Monthly Rate:</span>
                      <span className="font-bold text-xl text-blue-600">${car.monthlyRate}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleBookNow(car.id)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Book Car Now
                  </button>
                  <Link
                    href={`/cars/${car.id}`}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold text-center shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
          </div>
        )}

        {/* Services Section - BLUE THEME */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-xl p-10 mb-12 border border-blue-200">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">
            Premium Car Rental Services Kigali Rwanda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl">
                📅
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Same Day Car Rental Kigali</h3>
              <p className="text-gray-700 text-lg">Book and drive on the same day in Kigali Rwanda. Instant car hire services available 24/7.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl">
                📍
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Airport & Hotel Pickup Kigali</h3>
              <p className="text-gray-700 text-lg">Free airport delivery, city center pickup, hotel delivery. Convenient car rental locations across Rwanda.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl">
                🕒
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">24/7 Car Rental Support Rwanda</h3>
              <p className="text-gray-700 text-lg">Local Kigali support team always available. Professional chauffeur services, self-drive options.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section - BLUE THEME */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl p-12 text-center mb-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Book Your Car Rental Kigali?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Get the best car hire services in Rwanda. Premium vehicles, competitive rates, excellent service.
            Airport pickup, self-drive, chauffeur services available. Book now and save on car rental Kigali!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                🚗 Best Car Rental Rates Kigali
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                🏆 Premium Fleet Rwanda
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                📞 24/7 Support Available
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                ✈️ Airport Pickup Service
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+250787619387"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📞 Call +250 787 619 387 Now
            </a>
            <a
              href="mailto:booking@carrentalinkigali.com"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📧 Email: booking@carrentalinkigali.com
            </a>
            <a
              href="/book-now"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🚗 Book Car Rental Online
            </a>
          </div>
        </div>

        {/* Contact Section - BLUE THEME */}
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-2xl p-10 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Need Help with Car Rental Kigali Rwanda?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experienced Kigali team is ready to assist you with vehicle selection, booking, and support.
            Get the best car hire services in Rwanda with professional service and competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+250787619387"
              className="bg-white text-blue-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📞 Call Kigali Office: +250 787 619 387
            </a>
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📧 Contact Us Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
