"use client";

import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      title: "Car Rental",
      subtitle: "Self-Drive & Chauffeur",
      description:
        "Affordable daily, weekly, and monthly car rental packages in Kigali Rwanda. Choose from budget-friendly economy cars to luxury SUVs with flexible pickup options and no hidden fees.",
      keywords: "cheap car rental Kigali | self drive Rwanda | daily car hire",
      features: ["Flexible Pickup Times", "Discounted Long-Term Rates", "No Hidden Fees", "Free Mileage"],
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Safari 4x4 Rental",
      subtitle: "Adventure & Exploration",
      description:
        "Premium Land Cruiser and Prado 4x4 vehicles for safari adventures across Rwanda. Perfect for national parks, mountain drives, and off-road exploration with experienced guides.",
      keywords: "4x4 safari rental Rwanda | Land Cruiser rental | Prado rental Kigali",
      features: ["Professional Guides", "Well-Maintained Vehicles", "Safari-Ready Equipment", "Flexible Itineraries"],
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Airport Transfer",
      subtitle: "24/7 Pickup Service",
      description:
        "24/7 Kigali International Airport pickup and drop-off services with meet & greet, real-time flight tracking, and fixed transparent pricing. No waiting fees, no surprises.",
      keywords: "airport transfer Kigali | airport pickup service | 24/7 airport transport Rwanda",
      features: ["Meet & Greet Service", "Real-Time Flight Tracking", "Fixed Pricing", "Professional Drivers"],
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Chauffeur Services",
      subtitle: "Professional Drivers",
      description:
        "Premium chauffeur services for business meetings, events, and leisure travel in Kigali. Licensed, experienced drivers in luxury vehicles with VIP amenities and discretion.",
      keywords: "chauffeur service Kigali | luxury driver Rwanda | VIP transport service",
      features: ["Licensed Professional Drivers", "Luxury Vehicles", "Event-Ready Service", "Flexible Hours"],
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "City & Country Tours",
      subtitle: "Guided Experiences",
      description:
        "Guided and self-drive tours exploring Kigali's attractions, Rwandan countryside, volcanoes, and hidden gems. Customize your itinerary with expert local guides and flexible scheduling.",
      keywords: "Rwanda tours Kigali | guided tours Rwanda | country tours self-drive",
      features: ["Expert Local Guides", "Customizable Routes", "All-Inclusive Packages", "Photography Tours"],
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Business Transport",
      subtitle: "Corporate Solutions",
      description:
        "Reliable corporate car rental and transportation solutions for business meetings, conferences, and employee transport in Kigali Rwanda. Flexible contracts and volume discounts available.",
      keywords: "corporate car rental Rwanda | business transport Kigali | fleet rental",
      features: ["Corporate Accounts", "Volume Discounts", "Flexible Contracts", "Invoice Options"],
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Special Requirements",
      subtitle: "Custom Solutions",
      description:
        "Tailored car rental and transportation solutions for weddings, events, group bookings, and unique travel needs. Contact our team to discuss your specific requirements.",
      keywords: "wedding car rental Rwanda | group car rental | special events transport",
      features: ["Custom Packages", "Group Bookings", "Event Planning", "Special Occasions"],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F8FAFC]">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .section-header {
          animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        .service-card {
          animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        .service-card:nth-child(1) { animation-delay: 0.1s; }
        .service-card:nth-child(2) { animation-delay: 0.15s; }
        .service-card:nth-child(3) { animation-delay: 0.2s; }
        .service-card:nth-child(4) { animation-delay: 0.25s; }
        .service-card:nth-child(5) { animation-delay: 0.3s; }
        .service-card:nth-child(6) { animation-delay: 0.35s; }
        .service-card:nth-child(7) { animation-delay: 0.4s; }
        .service-card:nth-child(8) { animation-delay: 0.45s; }

        .service-card {
          background: white;
          border: 2px solid #e5e7eb;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #0B1F3A, #1E3A8A);
          transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }

        .service-card:hover::before {
          left: 100%;
        }

        .service-card:hover {
          border-color: #1E3A8A;
          box-shadow: 0 16px 40px rgba(30, 58, 138, 0.12);
          transform: translateY(-6px);
        }

        .service-icon-bg {
          background: linear-gradient(135deg, #0B1F3A/8 0%, #1E3A8A/8 100%);
          transition: all 0.35s ease;
        }

        .service-card:hover .service-icon-bg {
          background: linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%);
          box-shadow: 0 8px 20px rgba(30, 58, 138, 0.2);
          transform: scale(1.1);
        }

        .service-icon {
          color: #1E3A8A;
          transition: color 0.35s ease;
        }

        .service-card:hover .service-icon {
          color: white;
        }

        .keyword-badge {
          background: linear-gradient(135deg, #f0f9ff 0%, #fef3c7 100%);
          border: 1px solid #bfdbfe;
          color: #0B1F3A;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .cta-primary {
          background: linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%);
          color: white;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(30, 58, 138, 0.25);
        }

        .cta-primary:hover::before {
          left: 100%;
        }

        .cta-secondary {
          border: 2px solid #e5e7eb;
          color: #0B1F3A;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .cta-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0B1F3A, #1E3A8A);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.35s ease;
        }

        .cta-secondary:hover {
          border-color: #1E3A8A;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(30, 58, 138, 0.15);
        }

        .cta-secondary:hover::before {
          opacity: 1;
        }

        .feature-check {
          color: #1E3A8A;
          transition: transform 0.3s ease;
        }

        .service-card:hover .feature-check {
          transform: scale(1.2);
        }

        .cta-section {
          animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards;
          background: linear-gradient(135deg, #0B1F3A/5 0%, #1E3A8A/5 100%);
          border: 2px solid #e5e7eb;
          transition: all 0.35s ease;
        }

        .cta-section:hover {
          border-color: #1E3A8A;
          box-shadow: 0 16px 40px rgba(30, 58, 138, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #0B1F3A, #1E3A8A);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .service-card {
            border-radius: 12px;
          }

          .keyword-badge {
            font-size: 9px;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="section-header text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="keyword-badge px-4 py-2 rounded-full">
              Complete Transportation Solutions
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1F3A] mb-4 md:mb-6 leading-tight">
            Comprehensive <span className="gradient-text">Car Rental</span> Services
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From affordable <strong>car rental in Kigali</strong> and <strong>luxury 4x4 safari vehicles</strong> to <strong>24/7 airport transfer</strong> and professional chauffeur services — we deliver reliable transportation solutions across Rwanda.
          </p>
        </div>

        {/* SERVICES GRID - 2 columns mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card rounded-xl p-5 md:p-7 flex flex-col group"
              title={service.keywords}
            >
              {/* ICON */}
              <div className="service-icon-bg w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 flex-shrink-0">
                <div className="service-icon scale-90 md:scale-100">
                  {service.icon}
                </div>
              </div>

              {/* TITLE & SUBTITLE */}
              <h3 className="text-lg md:text-xl font-black text-[#0B1F3A] mb-1 md:mb-2 line-clamp-2">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 font-semibold mb-3 md:mb-4">
                {service.subtitle}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-5 leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* KEYWORDS */}
              <div className="mb-4 md:mb-5 pt-3 md:pt-4 border-t border-gray-200">
                <p className="text-[10px] md:text-xs text-gray-600 font-medium mb-2">
                  Services:
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {service.keywords.split(" | ").slice(0, 2).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="keyword-badge px-2.5 md:px-3 py-1 rounded-full text-[9px] md:text-xs"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* FEATURES */}
              <ul className="space-y-2 md:space-y-2.5">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 md:gap-3">
                    <svg
                      className="feature-check w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs md:text-sm text-gray-700 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA SECTION */}
        <div className="cta-section rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black text-[#0B1F3A] mb-3 md:mb-4">
            Ready to Book?
          </h3>
          <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
            Contact Kigali Car Hire today for <strong>affordable car rental</strong>, <strong>airport transfer service</strong>, or custom transportation solutions. Available 24/7 for all your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <a
              href="tel:+250787619387"
              className="cta-primary px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-lg transition"
              title="Call Kigali Car Hire - Car rental booking Kigali Rwanda"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.79l.291 1.991a1 1 0 01-.963 1.177h-.5a.5.5 0 00-.5.5v1.5a3 3 0 006 0v-1.5a.5.5 0 00-.5-.5h-.5a1 1 0 01-.963-1.177l.291-1.991A1 1 0 0113.847 2H16a1 1 0 011 1v2.5a.5.5 0 00.5.5H18a2 2 0 012 2v4a2 2 0 01-2 2h-1.5a.5.5 0 00-.5.5v1.5a3 3 0 11-6 0v-1.5a.5.5 0 00-.5-.5H4a2 2 0 01-2-2V7a2 2 0 012-2h1.5a.5.5 0 00.5-.5V3z" />
              </svg>
              +250 787 619 387
            </a>

            <a
              href="mailto:booking@carrentalinkigali.com"
              className="cta-secondary px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              title="Email booking inquiry - Car rental Kigali Rwanda"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Us
            </a>

            <Link
              href="/book-now"
              className="cta-primary px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              title="Book car rental now - Reserve your vehicle Kigali Rwanda"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Book Now
            </Link>
          </div>
        </div>

        {/* SEO KEYWORD FOOTER */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-gray-200 text-center">
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            <strong>Kigali car hire </strong> Car Rental Kigali • Cheap Car Rental Rwanda • Luxury 4x4 Safari Rental • Self-Drive Rwanda • 
            Airport Transfer Kigali • 24/7 Airport Pickup • Chauffeur Service Rwanda • Professional Drivers • Business Transport Kigali • 
            Group Car Rental • Wedding Car Rental • Corporate Fleet Rental Rwanda
          </p>
        </div>
      </div>
    </section>
  );
}
