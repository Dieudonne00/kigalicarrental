export default function AboutSection() {
  const stats = [
    {
      title: "Fully Insured Fleet",
      value: "100%",
      description:
        "Every car in our Kigali car rental fleet is fully insured and serviced before it goes out for self-drive or chauffeured hire.",
    },
    {
      title: "Customer Support",
      value: "24/7",
      description:
        "Reachable by phone and WhatsApp any time — for pickup, delivery, roadside help, or a last-minute booking change.",
    },
    {
      title: "Starting Daily Rate",
      value: "$30",
      description:
        "Economy sedans start from $30/day, with SUVs, 4x4 Land Cruisers, and minibuses available across every budget.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12">
          {/* Left column */}
          <div className="flex items-start">
            <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              About Us
            </h2>
          </div>

          {/* Right column */}
          <div>
            <div className="mb-10">
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight font-[family-name:var(--font-plus-jakarta)]"
                style={{ lineHeight: "1.2" }}
              >
                Kigali Car Rental — a Kigali car rental service built on transparent
                pricing, a quality fleet, and 24/7 customer support.
              </h3>
              <p className="mt-5 text-gray-600 text-lg leading-relaxed">
                We are a Kigali-based car hire company offering self-drive and chauffeur-driven
                vehicles for tourists, business travellers, NGOs, and residents across Rwanda.
                Whether you need a car for a day in Kigali, a week-long safari to Akagera, or a
                permanent monthly hire, we have the right vehicle at the right price.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#1e3a8a] transition-all duration-300"
                >
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    {stat.title}
                  </h4>
                  <p className="text-3xl font-bold text-[#1e3a8a] mb-2 font-[family-name:var(--font-plus-jakarta)]">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
