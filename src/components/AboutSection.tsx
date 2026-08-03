export default function AboutSection() {
  const stats = [
    {
      title: "Years in Rwanda",
      value: "35+",
      description:
        "Kigali Car Hire has been providing trusted car rental services in Rwanda since 1990 — decades of local expertise you can rely on.",
    },
    {
      title: "Happy Customers",
      value: "1,000+",
      description:
        "Over a thousand satisfied customers — tourists, business travellers, and locals who trust us for reliable car hire in Kigali.",
    },
    {
      title: "Cars in Our Fleet",
      value: "50+",
      description:
        "From compact city cars to rugged 4x4 SUVs, our growing fleet covers every need across Rwanda — maintained, insured, and ready to go.",
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
                Kigali Car Hire — Rwanda&apos;s most trusted car rental service, with transparent
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
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#01B000] transition-all duration-300"
                >
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    {stat.title}
                  </h4>
                  <p className="text-3xl font-bold text-[#01B000] mb-2 font-[family-name:var(--font-plus-jakarta)]">
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
