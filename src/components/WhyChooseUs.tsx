const reasons = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Fully Insured Vehicles",
    description:
      "Every car in our Kigali hire fleet comes with comprehensive third-party insurance. Drive with complete peace of mind across Rwanda.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Transparent Pricing",
    description:
      "No hidden fees. What you see is what you pay. Our car rental rates in Kigali are clear from the start — daily, weekly and monthly options.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "24/7 Customer Support",
    description:
      "Our team is available around the clock — call, WhatsApp or email us any time for bookings, questions or roadside support in Rwanda.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Free Kigali City Delivery",
    description:
      "We deliver your rental car directly to your hotel, home or office anywhere in Kigali at no extra charge. Convenient car rental, your way.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Easy Online Booking",
    description:
      "Book your car rental in Kigali online in minutes. Instant confirmation, flexible rescheduling and easy cancellation — no stress.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Trusted Since 1990",
    description:
      "Over 35 years serving visitors and residents in Rwanda. Thousands of happy customers choose Kigali Car Rental for reliable, quality service.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Why Choose Kigali Car Rental?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are Rwanda&apos;s most trusted car rental company — here is why thousands of
            customers choose us every year.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-[#1e3a8a]/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-300">
                {r.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1 font-[family-name:var(--font-plus-jakarta)]">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#172554] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-1 font-[family-name:var(--font-plus-jakarta)]">
              Ready to rent a car in Kigali?
            </h3>
            <p className="text-white/80">
              Call us or book online — we confirm within minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+250787619387"
              className="px-6 py-3 bg-white text-[#1e3a8a] font-bold rounded-xl hover:bg-gray-50 transition-all shadow text-center"
            >
              +250 787 619 387
            </a>
            <a
              href="/book-now"
              className="px-6 py-3 bg-white/10 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#1e3a8a] transition-all text-center"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
