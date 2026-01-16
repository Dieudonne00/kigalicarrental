export default function AboutSection() {
  const stats = [
    {
      title: "Experience",
      value: "150+",
      description: "Our great team of more than 150 software experts.",
    },
    {
      title: "Clients served",
      value: "1000+",
      description: "We'll help you test bold new ideas while sharing your.",
    },
    {
      title: "Stock Cars",
      value: "50+",
      description: "We help businesses elevate their value.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Layout: 25% Left, 75% Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12">
          {/* Left Column - About Us Title */}
          <div className="flex items-start">
            <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              About Us
            </h2>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Top Row - Commitment Heading */}
            <div className="mb-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight font-[family-name:var(--font-plus-jakarta)]" style={{ lineHeight: '1.2' }}>
                Our commitment is customer satisfaction. With transparent pricing, flexible rental plans.
              </h3>
            </div>

            {/* Bottom Row - Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#01B000] transition-all duration-300"
                >
                  <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                    {stat.title}
                  </h4>
                  <p className="text-3xl font-bold text-[#01B000] mb-2 font-[family-name:var(--font-plus-jakarta)]">
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
