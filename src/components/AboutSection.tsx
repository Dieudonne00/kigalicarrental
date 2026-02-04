export default function AboutSection() {
  const valueMetrics = [
    {
      title: "Price Transparency",
      value: "From 40,000 RWF",
      description: "Daily rental starting price. No hidden fees, all taxes included. Compare with: Uganda $40, Kenya $45, Tanzania $50.",
      icon: "💰",
      cta: "View Pricing"
    },
    {
      title: "Fuel Efficiency",
      value: "1,200 RWF/km",
      description: "Average fuel cost for our Toyota fleet (petrol). Diesel options: 900 RWF/km. Hybrids: 800 RWF/km.",
      icon: "⛽",
      cta: "Fuel Calculator"
    },
    {
      title: "24/7 Support",
      value: "250 796 077 321",
      description: "Call anytime for roadside assistance, booking changes, or emergencies. WhatsApp available.",
      icon: "📞",
      cta: "Call Now"
    },
    {
      title: "Free Extras",
      value: "4+ Inclusions",
      description: "Free delivery in Kigali, child seats, GPS, insurance. Optional: driver +15,000 RWF/day.",
      icon: "🎁",
      cta: "View Inclusions"
    },
    {
      title: "Flexible Payment",
      value: "6+ Methods",
      description: "Mobile Money (MTN/Airtel), Credit Cards, Bank Transfer, Cash USD/RWF. No deposit for locals.",
      icon: "💳",
      cta: "Payment Options"
    },
    {
      title: "Vehicle Age",
      value: "< 3 Years",
      description: "All vehicles 2021 or newer. Regular maintenance, full service history available.",
      icon: "🚗",
      cta: "See Fleet"
    }
  ];

  // SEO-OPTIMIZED CONTENT FOR RWANDA MARKET
  const seoContent = {
    title: "Kigali Car Rentals: Rwanda's Most Transparent & Affordable Car Hire Service",
    description: "Compare our rates: RAV4 from 60,000 RWF/day, Land Cruiser from 120,000 RWF/day. All-inclusive pricing with free Kigali delivery. Serving Kigali, Musanze, Gisenyi, Akagera since 2014.",
    keyFeatures: [
      "🇷🇼 Rwandan-owned & operated",
      "🛡️ Full comprehensive insurance included",
      "📋 No hidden charges - price shown is price paid",
      "🚗 Newest fleet in Rwanda (2021-2024 models)",
      "🎯 Airport pickup at KGL (20,000 RWF extra)",
      "📞 English/French/Kinyarwanda support"
    ],
    areasServed: [
      { area: "Kigali City", time: "30 min delivery" },
      { area: "Kigali Airport (KGL)", time: "Meet & greet" },
      { area: "Musanze (Volcanoes)", time: "3 hours" },
      { area: "Gisenyi (Lake Kivu)", time: "3.5 hours" },
      { area: "Akagera National Park", time: "2.5 hours" },
      { area: "Huye & Butare", time: "2 hours" }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12">
          
          {/* Left Column - SEO Title */}
          <div className="flex items-start">
            <h2 className="text-2xl font-bold text-gray-900">
              Why We're Rwanda's #1 Car Rental Choice
            </h2>
          </div>

          {/* Right Column - SEO Content */}
          <div>
            {/* SEO-Optimized Heading */}
            <div className="mb-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {seoContent.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {seoContent.description}
              </p>
            </div>

            {/* Key Features - Rwanda Focused */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {seoContent.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-xl">{feature.split(' ')[0]}</span>
                  <span className="text-gray-700 text-sm">{feature.substring(feature.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>

            {/* Value Metrics - ANSWER CUSTOMER QUESTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {valueMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#4B5320] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{metric.icon}</span>
                    <h3 className="font-bold text-gray-800">{metric.title}</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#4B5320] mb-2">{metric.value}</p>
                  <p className="text-gray-600 text-sm mb-4">{metric.description}</p>
                  <button className="text-[#4B5320] text-sm font-semibold hover:underline">
                    {metric.cta} →
                  </button>
                </div>
              ))}
            </div>

            {/* Areas Served - LOCAL SEO */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Areas We Serve in Rwanda</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {seoContent.areasServed.map((area, index) => (
                  <div key={index} className="text-center">
                    <div className="font-bold text-gray-800">{area.area}</div>
                    <div className="text-sm text-gray-600">{area.time}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                *Delivery times from Kigali. Cross-border to Uganda/DRC available (+48h notice).
              </div>
            </div>

            {/* Call to Action - CONVERSION OPTIMIZED */}
            <div className="mt-10 p-6 bg-gradient-to-r from-[#4B5320] to-green-800 rounded-xl text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Book Your Rwanda Adventure?</h3>
                  <p className="text-white/90">Get instant confirmation & best price guarantee</p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <a 
                    href="tel:+250796077321" 
                    className="bg-white text-[#4B5320] px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
                  >
                    Call: +250 796 077 321
                  </a>
                  <a 
                    href="/book-now" 
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10"
                  >
                    Book Online
                  </a>
                </div>
              </div>
            </div>

            {/* SEO Footer - Keywords for Rwanda */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                Search terms: <span className="font-semibold">car rental Kigali • Rwanda car hire prices • SUV rental Rwanda • 
                cheap car hire Kigali • airport car rental KGL • 4x4 Rwanda safari • monthly car rental Rwanda • 
                best car hire Rwanda • Toyota RAV4 rental • Land Cruiser hire Rwanda</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
