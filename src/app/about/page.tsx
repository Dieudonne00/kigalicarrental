"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://kigalicarhire.b-cdn.net/cars/1763129080028-2022-toyota-rav-4-prime-wheels-red-carprousa-1404x1112.webp)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-32">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-[family-name:var(--font-plus-jakarta)]">
            About Kigali Car Hire
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
            Your trusted partner for premium car rental services in Rwanda. Experience excellence, reliability, and convenience.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#01B000] text-white font-bold text-sm md:text-base rounded-lg hover:bg-[#019500] transition-all"
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
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get In Touch
          </a>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Our Story
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 leading-relaxed">
              <p>
                Founded with a vision to revolutionize car rental services in Rwanda, Kigali Car Hire has grown to become one of the most trusted names in the industry. We understand that whether you're a business traveler, tourist, or local resident, having access to a reliable vehicle is essential.
              </p>
              <p>
                Our journey began with a simple mission: to provide high-quality vehicles with exceptional customer service. Today, we're proud to serve thousands of satisfied customers, offering a diverse fleet that caters to every need and budget.
              </p>
              <p>
                We believe in transparency, reliability, and putting our customers first. Every vehicle in our fleet is meticulously maintained, and our team is dedicated to ensuring your rental experience is seamless from start to finish.
              </p>
            </div>
          </div>
          <div className="relative h-[200px] md:h-[400px] rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://kigalicarhire.b-cdn.net/cars/20240215_the-all_new-landcruiser-prado_2024_v2.webp)' }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-[#01B000] to-[#019500] rounded-2xl p-6 md:p-8 text-white">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Mission</h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                To provide exceptional car rental experiences that empower our customers to explore Rwanda with confidence, comfort, and convenience. We strive to deliver reliable vehicles, transparent pricing, and outstanding service that exceeds expectations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Vision</h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                To be Rwanda's leading car rental company, recognized for innovation, sustainability, and customer satisfaction. We envision a future where every journey starts with Kigali Car Hire, making mobility accessible and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Why Choose Us
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure your car rental experience is exceptional in every way.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Quality Fleet",
              description: "Modern, well-maintained vehicles from trusted brands. Every car is thoroughly inspected and cleaned before rental."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Transparent Pricing",
              description: "No hidden fees or surprise charges. What you see is what you pay, with clear breakdowns of all costs."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "24/7 Support",
              description: "Round-the-clock customer support and roadside assistance. We're here whenever you need us."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Flexible Pickup",
              description: "Convenient pickup and drop-off locations across Kigali and Rwanda. We come to you."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Fully Insured",
              description: "Comprehensive insurance coverage on all vehicles for your peace of mind and protection."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              ),
              title: "Easy Process",
              description: "Simple booking process with minimal paperwork. Get on the road quickly and hassle-free."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 p-4 md:p-6 hover:border-[#01B000] transition-all group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#01B000]/10 rounded-full flex items-center justify-center text-[#01B000] mb-3 md:mb-4 group-hover:bg-[#01B000] group-hover:text-white transition-all">
                <div className="scale-75 md:scale-100">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-1">
                {feature.title}
              </h3>
              <p className="text-[11px] md:text-base text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Our Core Values
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Kigali Car Hire.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                title: "Integrity",
                description: "We conduct business with honesty and transparency in all our dealings."
              },
              {
                title: "Excellence",
                description: "We strive for the highest standards in service quality and customer satisfaction."
              },
              {
                title: "Innovation",
                description: "We continuously improve our services and embrace new technologies."
              },
              {
                title: "Customer Focus",
                description: "Your needs and satisfaction are at the heart of everything we do."
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 md:p-6 text-center border-2 border-gray-200 hover:border-[#01B000] transition-all"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#01B000] text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-3 md:mb-4">
                  {index + 1}
                </div>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "50+", label: "Quality Vehicles" },
            { number: "5+", label: "Years Experience" },
            { number: "24/7", label: "Customer Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-5xl font-bold text-[#01B000] mb-1 md:mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-xs md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#01B000] to-[#019500] text-white py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm md:text-lg text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
            Experience the difference with Kigali Car Hire. Browse our fleet and find your perfect vehicle today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a
              href="/fleet"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-[#01B000] rounded-lg font-bold text-sm md:text-base hover:bg-gray-100 transition-all"
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
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Fleet
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white rounded-lg font-bold text-sm md:text-base hover:bg-white hover:text-[#01B000] transition-all"
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
