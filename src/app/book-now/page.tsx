"use client";

import { useState } from "react";

export default function BookNowPage() {
  const [formData, setFormData] = useState({
    // Trip Details
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    pickupLocation: "",
    dropoffLocation: "",

    // Preferences
    carType: "",
    transmission: "",
    seats: "",
    budget: "",

    // Additional Requirements
    purpose: "",
    additionalRequirements: "",

    // Contact Information
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  const [sameAsPickup, setSameAsPickup] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "success", // "success" or "error"
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setModalContent({
          type: "success",
          message: "Thank you for your booking request! We'll contact you shortly to confirm your reservation and provide vehicle recommendations.",
        });
        setShowModal(true);

        // Reset form
        setFormData({
          pickupDate: "",
          pickupTime: "",
          returnDate: "",
          returnTime: "",
          pickupLocation: "",
          dropoffLocation: "",
          carType: "",
          transmission: "",
          seats: "",
          budget: "",
          purpose: "",
          additionalRequirements: "",
          fullName: "",
          email: "",
          phone: "",
          whatsapp: "",
        });
      } else {
        setModalContent({
          type: "error",
          message: data.error || "Failed to submit booking request. Please try again.",
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error submitting booking request:", error);
      setModalContent({
        type: "error",
        message: "An error occurred. Please try again or contact us directly.",
      });
      setShowModal(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://res.cloudinary.com/dxn12qcje/image/upload/cars/2024-toyota-land-cruiser-164-6616f45021cc9.avif)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Book Your Perfect Car
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Not sure which car to choose? Fill out the form below and let us help you find the perfect vehicle for your needs.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip Details Card */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Trip Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Date */}
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-bold text-gray-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  required
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label htmlFor="pickupTime" className="block text-sm font-bold text-gray-700 mb-2">
                  Pickup Time *
                </label>
                <input
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  required
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Return Date */}
              <div>
                <label htmlFor="returnDate" className="block text-sm font-bold text-gray-700 mb-2">
                  Return Date *
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  required
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Return Time */}
              <div>
                <label htmlFor="returnTime" className="block text-sm font-bold text-gray-700 mb-2">
                  Return Time *
                </label>
                <input
                  type="time"
                  id="returnTime"
                  name="returnTime"
                  required
                  value={formData.returnTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Pickup Location */}
              <div className="md:col-span-2">
                <label htmlFor="pickupLocation" className="block text-sm font-bold text-gray-700 mb-2">
                  Pickup Location *
                </label>
                <input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  required
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="e.g., Kigali International Airport, Hotel name, Address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Same as Pickup Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsPickup}
                    onChange={(e) => {
                      setSameAsPickup(e.target.checked);
                      if (e.target.checked) {
                        setFormData({ ...formData, dropoffLocation: "" });
                      }
                    }}
                    className="w-5 h-5 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Drop-off at the same location
                  </span>
                </label>
              </div>

              {/* Dropoff Location */}
              {!sameAsPickup && (
                <div className="md:col-span-2">
                  <label htmlFor="dropoffLocation" className="block text-sm font-bold text-gray-700 mb-2">
                    Drop-off Location *
                  </label>
                  <input
                    type="text"
                    id="dropoffLocation"
                    name="dropoffLocation"
                    required={!sameAsPickup}
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    placeholder="e.g., Kigali International Airport, Hotel name, Address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Car Preferences Card */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Your Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Type */}
              <div>
                <label htmlFor="carType" className="block text-sm font-bold text-gray-700 mb-2">
                  Preferred Car Type
                </label>
                <select
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                >
                  <option value="">Any type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="4x4">4x4</option>
                  <option value="minivan">Minivan</option>
                  <option value="luxury">Luxury</option>
                  <option value="economy">Economy</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label htmlFor="transmission" className="block text-sm font-bold text-gray-700 mb-2">
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                >
                  <option value="">No preference</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              {/* Number of Seats */}
              <div>
                <label htmlFor="seats" className="block text-sm font-bold text-gray-700 mb-2">
                  Number of Passengers
                </label>
                <select
                  id="seats"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                >
                  <option value="">Select number</option>
                  <option value="2">2 passengers</option>
                  <option value="4">4 passengers</option>
                  <option value="5">5 passengers</option>
                  <option value="7">7 passengers</option>
                  <option value="8+">8+ passengers</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-bold text-gray-700 mb-2">
                  Daily Budget (USD)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                >
                  <option value="">Select budget</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-150">$100 - $150</option>
                  <option value="150-200">$150 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>

              {/* Purpose */}
              <div className="md:col-span-2">
                <label htmlFor="purpose" className="block text-sm font-bold text-gray-700 mb-2">
                  Purpose of Rental
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                >
                  <option value="">Select purpose</option>
                  <option value="business">Business Trip</option>
                  <option value="tourism">Tourism / Sightseeing</option>
                  <option value="safari">Safari / Game Drive</option>
                  <option value="wedding">Wedding / Event</option>
                  <option value="airport">Airport Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Additional Requirements */}
              <div className="md:col-span-2">
                <label htmlFor="additionalRequirements" className="block text-sm font-bold text-gray-700 mb-2">
                  Additional Requirements or Special Requests
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about any special requirements: child seats, GPS, driver, luggage space, etc."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>

              {/* WhatsApp */}
              <div className="md:col-span-2">
                <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-700 mb-2">
                  WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="If different from phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#01B000] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#019500] transition-all shadow-lg hover:shadow-xl"
            >
              Submit Booking Request
            </button>
            <button
              type="button"
              onClick={() => window.location.href = '/fleet'}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-bold hover:border-[#01B000] hover:text-[#01B000] transition-all"
            >
              Browse Fleet Instead
            </button>
          </div>

          {/* Info Text */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Our team will review your booking request within 2 hours</li>
                  <li>• We'll recommend the best vehicles that match your needs and budget</li>
                  <li>• You'll receive a detailed quote via email or WhatsApp</li>
                  <li>• Once you confirm, we'll reserve your vehicle and send booking details</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Why Book With Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 font-[family-name:var(--font-plus-jakarta)]">
            Why Book With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#01B000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Recommendations</h3>
              <p className="text-gray-600">
                Our team will suggest the perfect vehicle based on your specific needs and preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#01B000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We'll provide competitive rates and work within your budget to find the best deal.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#01B000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Get a response within 2 hours with vehicle options and detailed quotations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success/Error Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              modalContent.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}>
              {modalContent.type === "success" ? (
                <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            {/* Title */}
            <h3 className={`text-2xl font-bold text-center mb-3 ${
              modalContent.type === "success" ? "text-green-600" : "text-red-600"
            }`}>
              {modalContent.type === "success" ? "Success!" : "Error"}
            </h3>

            {/* Message */}
            <p className="text-gray-700 text-center mb-6 leading-relaxed">
              {modalContent.message}
            </p>

            {/* Action button */}
            <button
              onClick={() => setShowModal(false)}
              className={`w-full px-6 py-3 rounded-lg font-bold text-white transition-all ${
                modalContent.type === "success"
                  ? "bg-[#01B000] hover:bg-[#019500]"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {modalContent.type === "success" ? "Great!" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
