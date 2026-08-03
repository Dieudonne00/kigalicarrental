// No fabricated reviews here. The previous version of this section invented six
// customer names, star ratings, and a "4.9/5, 38 reviews" claim, plus linked to a
// Google share URL that actually resolves to a page referencing "Kigali car hire" -
// a different brand identity, not this one. Add real reviews back once a genuine
// review pipeline is wired up for this business.
export default function Testimonials({ fleetCount }: { fleetCount: number }) {
  const points = [
    {
      title: "Fully Insured Fleet",
      text: `Every one of our ${fleetCount} vehicles is fully insured and regularly serviced before it goes out for Kigali car rental.`,
      icon: (
        <path d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    {
      title: "Free Airport & Hotel Delivery",
      text: "Book your Kigali car rental online or via WhatsApp and we deliver the car to Kigali International Airport or your hotel at no extra charge.",
      icon: (
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
    },
    {
      title: "Transparent Pricing",
      text: "No hidden fees. The price you see for each car is the price you pay - insurance included, deposit terms explained upfront.",
      icon: (
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      ),
    },
    {
      title: "24/7 Support Across Rwanda",
      text: "Whether you're self-driving to Nyungwe or Volcanoes National Park, our team is reachable by phone and WhatsApp any time of day.",
      icon: (
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
            Why Rent With Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            What to Expect From Kigali Car Rental
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We&apos;re building our track record one rental at a time - here&apos;s what every customer gets, every time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {points.map((p) => (
            <div key={p.title} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#1e3a8a]/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#1e3a8a]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {p.icon}
                </svg>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1.5">{p.title}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="font-bold text-gray-900 text-lg font-[family-name:var(--font-plus-jakarta)]">
              Rented with us? Be one of our first reviewers.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Real feedback from real customers helps other travellers choose confidently.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://wa.me/250787619387"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1e3a8a] text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-[#172554] transition-all whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share Feedback on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
