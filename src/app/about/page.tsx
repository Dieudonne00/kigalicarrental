"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://res.cloudinary.com/dxn12qcje/image/upload/cars/1763129080028-2022-toyota-rav-4-prime-wheels-red-carprousa-1404x1112.webp)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)]">
            About Kigali Car Rentals
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Kigali Car Rentals provides trusted, premium, and affordable car rental services in Rwanda — designed for comfort, safety, and complete peace of mind.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#4B5320] text-white font-bold rounded-lg hover:bg-[#3E451A] transition-all"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Built for Your Journey
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Kigali Car Rentals was created to offer dependable car rental solutions for visitors, professionals, and residents across Rwanda. We understand that every journey matters — whether it’s business, tourism, or daily mobility.
              </p>
              <p>
                Our fleet is carefully selected and professionally maintained to ensure safety, comfort, and reliability. From airport pickups to long-distance travel, we make your experience smooth and stress-free.
              </p>
              <p>
                We believe premium service should feel simple, transparent, and respectful — that’s why our customers trust us again and again.
              </p>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://res.cloudinary.com/dxn12qcje/image/upload/cars/20240215_the-all_new-landcruiser-prado_2024_v2.webp)' }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#4B5320] to-[#3E451A] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To deliver reliable, secure, and high-quality car rental services that allow our customers to explore Rwanda with confidence and comfort.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
              To become Rwanda’s most trusted and preferred car rental company by consistently delivering exceptional customer experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Customers Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We focus on what matters most — reliability, transparency, and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Premium Fleet", "Well-maintained vehicles suitable for city driving and long-distance travel."],
            ["Clear Pricing", "No hidden fees. Simple, honest, and transparent pricing."],
            ["24/7 Support", "We’re available anytime for assistance and roadside support."],
            ["Flexible Delivery", "Airport pickup, hotel delivery, or anywhere in Kigali."],
            ["Fully Insured", "Every vehicle comes with comprehensive insurance coverage."],
            ["Fast Booking", "Easy reservation process with minimal paperwork."]
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-[#4B5320] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["500+", "Satisfied Clients"],
            ["50+", "Available Vehicles"],
            ["5+", "Years of Trust"],
            ["24/7", "Customer Support"]
          ].map(([num, label], i) => (
            <div key={i}>
              <div className="text-5xl font-bold text-[#4B5320]">{num}</div>
              <div className="text-gray-600 mt-2">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#4B5320] to-[#3E451A] py-16 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Start Your Journey with Confidence</h2>
        <p className="max-w-2xl mx-auto mb-8 text-white/90">
          Book your car today with Kigali Car Rentals and experience trusted mobility across Rwanda.
        </p>
        <a
          href="/fleet"
          className="inline-block px-8 py-4 bg-white text-[#4B5320] font-bold rounded-lg hover:bg-gray-100 transition-all"
        >
          Browse Our Fleet
        </a>
      </section>
    </div>
  );
}
