export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Our Story */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Story in Rwanda
              </h2>
              <div className="w-20 h-1 bg-[#4B5320] mb-6"></div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded in the heart of Kigali, <span className="font-semibold text-gray-800">Kigali Car Rentals</span> began with a simple mission: to provide reliable, safe, and comfortable transportation solutions for both locals and visitors exploring Rwanda.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                What started as a small fleet of two vehicles has grown into one of Rwanda's most trusted car rental services, serving thousands of satisfied customers from across the globe.
              </p>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl border-l-4 border-[#4B5320]">
                <p className="text-gray-700 italic">
                  "Our commitment goes beyond just renting cars. We're part of your Rwanda experience, ensuring every journey is smooth, safe, and memorable."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Values & Location */}
          <div>
            {/* Core Values */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4B5320] text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Rwandan Expertise</h4>
                    <p className="text-gray-600 text-sm">
                      Local knowledge of roads, routes, and best practices for driving in Rwanda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4B5320] text-lg">🚗</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Well-Maintained Fleet</h4>
                    <p className="text-gray-600 text-sm">
                      Regular servicing and safety checks on all vehicles for your peace of mind.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4B5320] text-lg">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Customer First</h4>
                    <p className="text-gray-600 text-sm">
                      Personalized service with 24/7 support for any questions or assistance needed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4B5320] text-lg">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Central Kigali Location</h4>
                    <p className="text-gray-600 text-sm">
                      Easily accessible from anywhere in the city with free delivery in Kigali.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Contact */}
            


             
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4B5320] mb-2">10+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4B5320] mb-2">1,500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4B5320] mb-2">50+</div>
            <div className="text-gray-600">Vehicles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4B5320] mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
