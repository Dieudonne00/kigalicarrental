import Link from "next/link";

export default function KigaliCarHireContent() {
  return (
    <section className="py-14 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — main content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">
              Kigali Car Rental — Everything You Need to Know
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              <strong className="text-gray-900">Kigali Car Rental</strong> is a car rental service based in Kigali, operating across the entire country. Whether you are visiting Rwanda for gorilla trekking, attending a business conference, relocating as an expat, or simply exploring the city, renting a car in Kigali gives you the freedom to travel on your own schedule.
            </p>

            <p className="text-gray-600 mb-4 leading-relaxed">
              We offer two main types of car rental in Kigali: <strong className="text-gray-900">self-drive car rental</strong>, where you drive yourself with a valid driving licence, and <strong className="text-gray-900">chauffeur-driven car rental</strong>, where a professional local driver handles all navigation while you sit back and enjoy Rwanda. Both options are available for any duration — from a single day to a full month or longer.
            </p>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Our Kigali car rental fleet spans every category: economy saloons for budget travellers, rugged 4x4 SUVs for safari and off-road adventures, luxury cars for executives and weddings, and minibuses for groups and corporate events. Every vehicle is fully insured, regularly serviced, and delivered clean and ready.
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              <strong className="text-gray-900">Car rental in Kigali starts from just $35 per day</strong> for economy vehicles and $60 per day for 4x4 SUVs. Weekly and monthly rates offer significant discounts. We offer free car delivery to any hotel or address in Kigali city, with 24/7 phone and WhatsApp support for all customers throughout their rental.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all"
              >
                Book a Car in Kigali
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
              >
                View Full Fleet
              </Link>
            </div>
          </div>

          {/* Right — structured info */}
          <div className="space-y-5">

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
                Who Rents a Car in Kigali?
              </h3>
              <ul className="space-y-2">
                {[
                  "Tourists visiting Volcanoes National Park, Akagera and Lake Kivu",
                  "Business travellers and conference delegates attending events in Kigali",
                  "NGO staff, UN workers, and embassy personnel based in Rwanda",
                  "Expats relocating to Kigali who need a car before buying",
                  "Wedding couples and bridal parties needing decorated vehicles",
                  "Families visiting Rwanda who want flexibility without depending on taxis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#1e3a8a] flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
                Requirements for Car Rental in Kigali
              </h3>
              <ul className="space-y-2">
                {[
                  "Valid driving licence (international permit recommended for visitors)",
                  "Passport or national ID for identity verification",
                  "Minimum age 23 years for self-drive hire",
                  "Deposit payable by mobile money, bank transfer or cash",
                  "No credit card required — we accept all local payment methods",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#1e3a8a] flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1e3a8a]/5 rounded-xl p-6 border border-[#1e3a8a]/20">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-plus-jakarta)]">
                Popular Kigali Car Rental Services
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
                  { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
                  { label: "4x4 Hire Rwanda", href: "/4x4-car-hire-rwanda" },
                  { label: "Gorilla Trekking Car Hire", href: "/gorilla-trekking-car-hire" },
                  { label: "Wedding Car Hire Kigali", href: "/wedding-car-hire-kigali" },
                  { label: "Corporate Car Hire", href: "/corporate-car-hire-kigali" },
                  { label: "Luxury Car Hire Kigali", href: "/luxury-car-hire-kigali" },
                  { label: "Lake Kivu Car Hire", href: "/lake-kivu-car-hire" },
                  { label: "Long Term Car Hire", href: "/long-term-car-hire-kigali" },
                  { label: "NGO Car Hire Kigali", href: "/ngo-car-hire-kigali" },
                  { label: "Car Hire 2026", href: "/car-hire-kigali-2026" },
                  { label: "Nyungwe Car Hire", href: "/nyungwe-forest-car-hire" },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-sm text-[#1e3a8a] font-medium hover:underline flex items-center gap-1"
                  >
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
