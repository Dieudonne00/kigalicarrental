const steps = [
  {
    number: "01",
    title: "Browse Our Fleet",
    description:
      "Explore the Kigali Car Rental fleet and filter by category, seats, transmission, or price. Every car shows real photos and specs up front.",
    icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  },
  {
    number: "02",
    title: "Select Your Car",
    description:
      "Check availability and daily, weekly, or monthly rates for the vehicle you want. No hidden fees — the price shown is the price you pay.",
    icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    number: "03",
    title: "Confirm via WhatsApp or Online",
    description:
      "Send your pickup date, return date, and location by WhatsApp or our booking form. We confirm availability and lock in your rate within minutes.",
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    ),
  },
  {
    number: "04",
    title: "Pick Up Your Car",
    description:
      "We deliver to Kigali International Airport or your hotel, free of charge. Present your driving licence and passport, and we'll do a quick joint vehicle inspection before you drive off.",
    icon: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
  },
  {
    number: "05",
    title: "Enjoy Your Journey",
    description:
      "Hit the road and explore Rwanda at your own pace. Every vehicle is fully insured, regularly serviced, and ready for city driving or upcountry travel.",
    icon: <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />,
  },
  {
    number: "06",
    title: "Return the Vehicle",
    description:
      "Return the car at the agreed time and location, or arrange free drop-off. We inspect the vehicle together and settle any final charges on the spot.",
    icon: <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />,
  },
];

export default function HowToBook() {
  return (
    <section className="py-14 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            How Kigali Car Rental Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            No paperwork at the counter, no waiting in line — Kigali car rental made simple from your phone, start to finish.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-7 hover:border-[#1e3a8a]/40 hover:shadow-md transition-all">
              <span className="text-5xl font-extrabold text-gray-200 leading-none font-[family-name:var(--font-plus-jakarta)]">
                {step.number}
              </span>
              <div className="w-11 h-11 rounded-xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a] mt-4 mb-4">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {step.icon}
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 font-[family-name:var(--font-plus-jakarta)]">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/250787619387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all"
          >
            Start on WhatsApp
          </a>
          <a
            href="/book-now"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
          >
            Book Online
          </a>
        </div>
      </div>
    </section>
  );
}
