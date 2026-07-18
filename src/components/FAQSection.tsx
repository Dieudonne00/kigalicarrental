const faqs = [
  {
    question: "How much does Kigali car rental cost?",
    answer:
      "Kigali car rental with us starts from $25/day for an economy car, with SUVs and 4x4s from $60/day and luxury vehicles from $120/day. Weekly and monthly rates include a discount, and every price includes basic insurance - no hidden fees.",
  },
  {
    question: "What documents do I need to rent a car in Kigali?",
    answer:
      "You need a valid driver's license (an International Driving Permit is recommended alongside your national license), a passport or Rwandan ID, and a refundable security deposit. Self-drive renters must be at least 23 years old.",
  },
  {
    question: "Do you offer airport pickup and delivery?",
    answer:
      "Yes. We offer free meet-and-greet delivery at Kigali International Airport (KGL) and free delivery to hotels and addresses within central Kigali. Outside the city, delivery can be arranged for a small fee.",
  },
  {
    question: "Can I rent a car with a driver instead of self-drive?",
    answer:
      "Yes, every vehicle in our Kigali car rental fleet is available either self-drive or with a professional English-speaking chauffeur, so you can choose whichever suits your trip - a business visit, an airport transfer, or a multi-day safari.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Basic insurance is included in every Kigali car rental booking. Optional full-coverage insurance with a reduced deposit is available at checkout for extra peace of mind on longer trips.",
  },
  {
    question: "Can I rent a 4x4 for a safari to Akagera or Volcanoes National Park?",
    answer:
      "Yes. We have Toyota Land Cruisers and other 4x4s specifically maintained for safari terrain, available for Akagera game drives, Volcanoes National Park gorilla trekking trips, and Nyungwe Forest visits, with or without a driver.",
  },
];

export default function FAQSection() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Kigali Car Rental - Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know before booking your Kigali car rental
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
