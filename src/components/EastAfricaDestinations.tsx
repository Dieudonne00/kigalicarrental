import Link from "next/link";

const rwandaRoutes = [
  { destination: "Volcanoes National Park", distance: "110 km", time: "2.5 hrs", from: "$80", link: "/volcanoes-national-park-car-hire", tag: "Gorilla Trekking" },
  { destination: "Akagera National Park", distance: "125 km", time: "2 hrs", from: "$70", link: "/akagera-game-drive", tag: "Safari" },
  { destination: "Lake Kivu / Gisenyi", distance: "165 km", time: "2.5 hrs", from: "$90", link: "/lake-kivu-car-hire", tag: "Beach" },
  { destination: "Nyungwe Forest", distance: "225 km", time: "4 hrs", from: "$90", link: "/nyungwe-forest-car-hire", tag: "Chimp Trek" },
  { destination: "Musanze / Northern Rwanda", distance: "110 km", time: "2 hrs", from: "$60", link: "/gorilla-trekking-car-hire", tag: "Day Trip" },
  { destination: "Butare / Southern Rwanda", distance: "135 km", time: "2 hrs", from: "$60", link: "/self-drive-rwanda", tag: "Culture" },
];

const crossBorderRoutes = [
  { destination: "Kampala, Uganda", distance: "515 km", time: "8 hrs", from: "$200", tag: "Cross-Border" },
  { destination: "Bujumbura, Burundi", distance: "270 km", time: "3.5 hrs", from: "$120", tag: "Cross-Border" },
  { destination: "Nairobi, Kenya", distance: "1,400 km", time: "2 days", from: "$350", tag: "Long Distance" },
  { destination: "Dar es Salaam, Tanzania", distance: "1,500 km", time: "2 days", from: "$400", tag: "Long Distance" },
  { destination: "Goma, DR Congo", distance: "175 km", time: "3 hrs", from: "$150", tag: "Cross-Border" },
  { destination: "Arusha, Tanzania", distance: "1,100 km", time: "14 hrs", from: "$320", tag: "Long Distance" },
];

export default function EastAfricaDestinations() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block bg-[#01B000]/10 text-[#01B000] text-sm font-bold px-4 py-2 rounded-full mb-4">
            Kigali Car Rental Routes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            Where Can You Go with Kigali Car Rental?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Book a car rental in Kigali and reach any destination in Rwanda or East Africa. All routes include a professional driver option.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

          {/* Rwanda Routes */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-[#01B000] px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg font-[family-name:var(--font-plus-jakarta)]">
                  Car Rental Within Rwanda
                </h3>
                <p className="text-white/80 text-xs">Self-drive or chauffeur from Kigali</p>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {rwandaRoutes.map((route) => (
                <Link
                  key={route.destination}
                  href={route.link}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#01B000] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#01B000] transition-colors truncate">
                        Kigali to {route.destination}
                      </p>
                      <p className="text-xs text-gray-500">{route.distance} · {route.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    <span className="hidden sm:inline-block bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                      {route.tag}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#01B000]">{route.from}</p>
                      <p className="text-[10px] text-gray-400">per day</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#01B000] transition-colors" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
              <Link
                href="/fleet"
                className="text-sm font-bold text-[#01B000] hover:underline flex items-center gap-1"
              >
                View all cars available in Kigali
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* East Africa Cross-Border */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg font-[family-name:var(--font-plus-jakarta)]">
                  East Africa Cross-Border Car Rental
                </h3>
                <p className="text-white/60 text-xs">Permits and insurance handled by us</p>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {crossBorderRoutes.map((route) => (
                <div
                  key={route.destination}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        Kigali to {route.destination}
                      </p>
                      <p className="text-xs text-gray-500">{route.distance} · {route.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    <span className="hidden sm:inline-block bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                      {route.tag}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{route.from}</p>
                      <p className="text-[10px] text-gray-400">transfer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">Custom quotes for all cross-border routes</p>
              <a
                href="https://wa.me/250788892976"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#01B000] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#019500] transition-all whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get Quote
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-6 bg-[#01B000] rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white text-center sm:text-left">
            <p className="font-bold text-lg font-[family-name:var(--font-plus-jakarta)]">
              Ready to book your Kigali car rental?
            </p>
            <p className="text-white/80 text-sm">Free hotel delivery in Kigali. 24/7 availability. No hidden fees.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/book-now"
              className="bg-white text-[#01B000] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all whitespace-nowrap"
            >
              Book Now
            </Link>
            <a
              href="tel:+250788892976"
              className="border-2 border-white text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-white hover:text-[#01B000] transition-all whitespace-nowrap"
            >
              Call Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
