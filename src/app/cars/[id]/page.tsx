"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";

interface Car {
  id: string;
  name: string;
  description: string | null;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  mileage: string | null;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number | null;
  monthlyRate: number | null;
  images: string[];
  available: boolean;
  featured: boolean;
  hasActiveBooking?: boolean;
}

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const carId = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(true);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    returnLocation: "",
    specialRequests: "",
  });
  const [rentalDuration, setRentalDuration] = useState("daily");
  const [rentalQuantity, setRentalQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) {
          throw new Error("Car not found");
        }
        const data = await response.json();
        setCar(data.car);
      } catch (error) {
        console.error("Error fetching car:", error);
        setErrorMessage("Failed to load car details");
        setShowErrorModal(true);
        setTimeout(() => router.push("/"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId, router]);

  // Calculate total cost and return date based on duration
  useEffect(() => {
    if (bookingData.pickupDate && car && rentalQuantity > 0) {
      const pickup = new Date(bookingData.pickupDate);
      let returnDate = new Date(pickup);
      let cost = 0;

      if (rentalDuration === "daily") {
        returnDate.setDate(returnDate.getDate() + rentalQuantity);
        cost = car.dailyRate * rentalQuantity;
      } else if (rentalDuration === "weekly" && car.weeklyRate) {
        returnDate.setDate(returnDate.getDate() + rentalQuantity * 7);
        cost = car.weeklyRate * rentalQuantity;
      } else if (rentalDuration === "monthly" && car.monthlyRate) {
        returnDate.setMonth(returnDate.getMonth() + rentalQuantity);
        cost = car.monthlyRate * rentalQuantity;
      }

      setTotalCost(cost);
      setBookingData((prev) => ({
        ...prev,
        returnDate: returnDate.toISOString().split("T")[0],
      }));
    }
  }, [bookingData.pickupDate, rentalDuration, rentalQuantity, car]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car) return;

    setBookingLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carId: car.id,
          ...bookingData,
          pickupLocation: "To be confirmed",
          returnLocation: "To be confirmed",
          totalCost,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setBookingData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        pickupDate: "",
        returnDate: "",
        pickupLocation: "",
        returnLocation: "",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to create booking");
      setShowErrorModal(true);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <div className="mb-6">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Info Skeleton */}
            <div className="lg:col-span-2">
              {/* Main Image Skeleton */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
                <div className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                {/* Thumbnails Skeleton */}
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Car Information Skeleton */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>

                {/* Rental Rates Skeleton */}
                <div className="mb-6 pb-6 border-b-2 border-gray-200">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="flex gap-4">
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Description Skeleton */}
                <div className="mb-6">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Specifications Skeleton */}
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-8">
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  ))}
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Car not found
          </h1>
          <Link
            href="/"
            className="text-[#01B000] hover:underline font-bold"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const validImages = car.images.filter((img) => img && !img.startsWith("blob:"));

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-gray-600 hover:text-[#01B000]">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-bold">{car.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden mb-6">
              {/* Main Image */}
              <div className="relative h-96 bg-gray-100">
                <img
                  src={
                    validImages[selectedImage] || "/placeholder-car.jpg"
                  }
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {car.hasActiveBooking && (
                    <span className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-bold">
                      Booked
                    </span>
                  )}
                  {car.featured && (
                    <span className="inline-block px-4 py-2 bg-[#01B000] text-white rounded-full text-sm font-bold">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {validImages.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {validImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#01B000]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${car.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Information */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-plus-jakarta)]">
                {car.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {car.brand} {car.model} • {car.year}
              </p>

              {/* Rental Rates */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Rental Rates
                </h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#01B000]">
                      ${car.dailyRate}
                    </span>
                    <span className="text-gray-600">/day</span>
                  </div>
                  {car.weeklyRate && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#01B000]">
                        ${car.weeklyRate}
                      </span>
                      <span className="text-gray-600">/week</span>
                    </div>
                  )}
                  {car.monthlyRate && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#01B000]">
                        ${car.monthlyRate}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  )}
                </div>
              </div>

              {car.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {car.description}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#01B000]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-bold text-gray-900 capitalize">
                        {car.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#01B000]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Transmission</p>
                      <p className="font-bold text-gray-900 capitalize">
                        {car.transmission}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#01B000]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Seats</p>
                      <p className="font-bold text-gray-900">{car.seats}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#01B000]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Fuel Type</p>
                      <p className="font-bold text-gray-900 capitalize">
                        {car.fuelType}
                      </p>
                    </div>
                  </div>

                  {car.mileage && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        className="w-5 h-5 text-[#01B000]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Mileage</p>
                        <p className="font-bold text-gray-900">{car.mileage}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#01B000]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Availability</p>
                      <p
                        className={`font-bold ${
                          car.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {car.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">
                Book This Car
              </h2>

              {!showBookingForm ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  disabled={!car.available}
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                    car.available
                      ? "bg-[#01B000] hover:bg-[#019500]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {car.available ? "Book Now" : "Not Available"}
                </button>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={bookingData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={bookingData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={bookingData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={bookingData.pickupDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Rental Duration *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={rentalDuration}
                        onChange={(e) => setRentalDuration(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                        required
                      >
                        <option value="daily">Daily</option>
                        {car?.weeklyRate && <option value="weekly">Weekly</option>}
                        {car?.monthlyRate && <option value="monthly">Monthly</option>}
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={rentalQuantity}
                        onChange={(e) => setRentalQuantity(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                        required
                      />
                    </div>
                    {bookingData.pickupDate && bookingData.returnDate && (
                      <p className="text-sm text-gray-600 mt-2">
                        Return date: {new Date(bookingData.returnDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    />
                  </div>

                  {totalCost > 0 && (
                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-gray-900">
                          Total Cost
                        </span>
                        <span className="text-2xl font-bold text-[#01B000]">
                          ${totalCost.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 py-3 border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="flex-1 py-3 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] transition-all disabled:opacity-50"
                    >
                      {bookingLoading ? "Submitting..." : "Submit Booking"}
                    </button>
                  </div>

                  {/* WhatsApp Order Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3 text-center">
                      Or book instantly via WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/250796077321?text=${encodeURIComponent(
                        `Hi! I'm interested in renting the ${car?.name || "car"}.\n\nDetails:\n- Pickup: ${bookingData.pickupDate || "Not specified"}\n- Return: ${bookingData.returnDate || "Not specified"}\n- Duration: ${rentalQuantity} ${rentalDuration}\n- Estimated Cost: $${totalCost}\n\nCar: https://www.kigalicarhire.rw/cars/${carId}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Book via WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Booking Request Submitted!"
        message="We will contact you shortly to confirm your booking."
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Booking Error"
        message={errorMessage}
      />
    </div>
  );
}
