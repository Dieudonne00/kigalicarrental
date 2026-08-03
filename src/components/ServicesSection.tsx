"use client";

import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      title: "Car Rental in Kigali",
      description:
        "Self-drive car rental — also known as car hire — in Kigali with daily, weekly and monthly rates. Wide selection of cars from economy to luxury SUVs — no hidden fees.",
      features: ["Self-Drive Available", "Flexible Pickup & Drop-off", "No Hidden Fees"],
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Rwanda Tours & Safaris",
      description:
        "Guided and self-drive tours to Akagera National Park, Volcanoes National Park, Lake Kivu, Nyungwe Forest and more across Rwanda.",
      features: ["Expert Local Guides", "Custom Safari Routes", "All-Inclusive Packages"],
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Kigali Airport Transfers",
      description:
        "24/7 airport pickup and drop-off at Kigali International Airport. Meet & greet service with flight tracking — fixed rates, no surprises.",
      features: ["Meet & Greet at Arrivals", "Flight Tracking", "Fixed Transparent Pricing"],
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Chauffeur Services Kigali",
      description:
        "Professional licensed drivers for corporate events, business meetings, MICE delegations and VIP leisure travel in Rwanda.",
      features: ["Licensed Professional Drivers", "Luxury & Executive Vehicles", "Corporate & Event Ready"],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Car Rental & Transport Services in Kigali
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From self-drive car rental in Kigali to Rwanda safari tours and airport transfers —
            we have the right service for every journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 p-4 md:p-8 hover:border-[#01B000] transition-all duration-300 hover:shadow-lg group"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-green-50 rounded-xl flex items-center justify-center text-[#01B000] mb-3 md:mb-6 group-hover:bg-[#01B000] group-hover:text-white transition-all duration-300">
                <div className="scale-75 md:scale-100">{service.icon}</div>
              </div>

              <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3 font-[family-name:var(--font-plus-jakarta)] line-clamp-2">
                {service.title}
              </h3>

              <p className="text-[11px] md:text-base text-gray-600 mb-3 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                {service.description}
              </p>

              <ul className="space-y-1 md:space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-[10px] md:text-sm">
                    <svg className="w-3 h-3 md:w-5 md:h-5 text-[#01B000] mr-1 md:mr-2 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              Need a Custom Car Rental Package?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Group bookings, long-term car hire in Kigali, NGO contracts, or corporate accounts —
              contact us and we will tailor the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+250788892976"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#01B000] text-white font-bold rounded-lg hover:bg-[#019500] transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: +250 788 892 976
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-900 font-bold rounded-lg hover:border-[#01B000] hover:bg-[#01B000] hover:text-white transition-all"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
