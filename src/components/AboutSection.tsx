export default function AboutSection() {
  const stats = [
    {
      title: "Years of Experience",
      value: "10+",
      description: "Serving Kigali and all of Rwanda with reliable and professional car rental services.",
    },
    {
      title: "Happy Clients",
      value: "1,500+",
      description: "Trusted by locals, tourists, and corporate clients for premium car rentals.",
    },
    {
      title: "Available Vehicles",
      value: "50+",
      description: "A well-maintained fleet ranging from economy cars to luxury SUVs.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12">
          
          {/* Left Column */}
          <div className="flex items-start">
            <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              Why we deserve your trust
            </h2>
          </div>

          {/* Right Column */}
          <div>
            {/* Heading */}
            <div className="mb-10">
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight font-[family-name:var(--font-plus-jakarta)]"
                style={{ lineHeight: "1.2" }}
              >
                Kigali Car Rentals is your trusted partner for premium, reliable, and affordable car rental services in Rwanda — where comfort, safety, and customer satisfaction come first.
              </h3>
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
