export default function AboutSection() {
  const stats = [
    {
      title: "Years Operating in Rwanda",
      value: "10+",
      description:
        "Providing professional car rental services across Kigali, national parks, and major cities in Rwanda.",
    },
    {
      title: "Successful Rentals",
      value: "1,500+",
      description:
        "Trusted by tourists, NGOs, business travelers, and local clients for safe and reliable transport.",
    },
    {
      title: "Fleet Availability",
      value: "50+",
      description:
        "Well-maintained economy cars, executive sedans, and 4x4 SUVs ready for self-drive or chauffeur service.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12">
          
          {/* Left Column */}
          <div className="flex items-start">
            <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              Why Clients Trust Kigali Car Rentals
            </h2>
          </div>

          {/* Right Column */}
          <div>

            {/* Main Heading */}
            <div className="mb-6">
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight font-[family-name:var(--font-plus-jakarta)]"
                style={{ lineHeight: "1.2" }}
              >
                Kigali Car Rentals delivers reliable, safe, and locally trusted car hire services across Rwanda — from Kigali International Airport pickups to national park safaris and corporate mobility solutions.
              </h3>
            </div>

            {/* Supporting Content */}
            <div className="mb-10 text-gray-600 text-base leading-relaxed space-y-4">
              <p>
                Based in Kigali, we specialize in self-drive and chauffeur-driven
                rentals tailored for tourists, business professionals, NGOs,
                and long-term visitors exploring Rwanda. Our team understands
                local travel needs — whether navigating city routes, corporate
                schedules, or safari journeys to Akagera, Volcanoes, and Nyungwe.
              </p>

              <p>
                Every vehicle is regularly inspected, fully insured, and supported
                by responsive customer service to ensure peace of mind on every
                trip. From airport transfers and executive transport to rugged
                4x4 adventures, we focus on comfort, transparency, and dependable
                service built on real local experience.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#4B5320] transition-all duration-300"
                >
                  <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                    {stat.title}
                  </h4>
                  <p className="text-3xl font-bold text-[#4B5320] mb-2 font-[family-name:var(--font-plus-jakarta)]">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
