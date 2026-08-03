import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Volcanoes National Park Car Hire | Kigali to Volcanoes Transfer - Kigali Car Hire",
  description: "Car hire from Kigali to Volcanoes National Park from $80. Self-drive or chauffeur for gorilla trekking, golden monkey trekking, and Dian Fossey hikes. Book now.",
  keywords: "volcanoes national park car hire, kigali to volcanoes national park, car hire volcanoes national park rwanda, musanze car hire, volcanoes park transfer kigali, car hire gorilla trekking volcanoes",
  alternates: { canonical: "https://kigalicarhire.rw/volcanoes-national-park-car-hire" },
  openGraph: {
    title: "Volcanoes National Park Car Hire | Kigali Car Hire",
    description: "Car hire from Kigali to Volcanoes National Park from $80/day. Gorilla trekking transfers available.",
    url: "https://kigalicarhire.rw/volcanoes-national-park-car-hire",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I get from Kigali to Volcanoes National Park?",
      acceptedAnswer: { "@type": "Answer", text: "Volcanoes National Park is 110 km from Kigali, about a 2.5 hour drive via the Kigali to Musanze road. Kigali Car Hire provides self-drive 4x4 hire and chauffeured transfers for the journey. We recommend departing Kigali by 5:30 AM to reach the park briefing at 7:00 AM." },
    },
    {
      "@type": "Question",
      name: "What car do I need to drive to Volcanoes National Park?",
      acceptedAnswer: { "@type": "Answer", text: "A 4x4 SUV is recommended for the drive to Volcanoes National Park, especially during the rainy season from March to May and October to December when roads can become muddy. Toyota RAV4, Land Cruiser Prado, and Toyota Land Cruiser are all suitable options." },
    },
    {
      "@type": "Question",
      name: "Can I hire a driver to take me to Volcanoes National Park?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Our chauffeured transfer service will pick you up from your hotel in Kigali, drive you to the park, wait during your trek, and drive you back. This is the most convenient option and starts from $120 for a return trip." },
    },
  ],
};

export default function VolcanoesNationalParkCarHirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Gorilla Trekking Transfers</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Volcanoes National Park Car Hire</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Hire a car from Kigali to Volcanoes National Park for gorilla trekking, golden monkey trekking, and the Dian Fossey trail. Self-drive or chauffeured transfers available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-green-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Book Transfer</Link>
            <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition-all">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Getting from Kigali to Volcanoes National Park</h2>
            <p className="text-gray-600 mb-4">Volcanoes National Park in northwest Rwanda is home to the Virunga mountain gorillas, one of the most extraordinary wildlife encounters on earth. The park is located near the town of Musanze (formerly Ruhengeri), approximately 110 km from Kigali.</p>
            <p className="text-gray-600 mb-4">The drive from Kigali to Volcanoes National Park takes between 2 and 2.5 hours via well-maintained tarmac roads. The route passes through Rwanda's famous thousand hills landscape, offering spectacular views throughout the journey.</p>
            <p className="text-gray-600 mb-4">Kigali Car Hire provides reliable and affordable car hire for the Kigali to Volcanoes National Park journey. Choose from self-drive 4x4 hire, chauffeured day transfers, or multi-day hire packages that combine gorilla trekking with other Rwanda destinations.</p>
            <p className="text-gray-600 mb-6">All vehicles are equipped for the journey with spare tyres, emergency kits, and GPS. Our chauffeurs know the route and park regulations perfectly.</p>
            <Link href="/4x4-car-hire-rwanda" className="inline-block bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">View 4x4 Fleet</Link>
          </div>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Transfer Options from Kigali</h3>
            <div className="space-y-4">
              {[
                { type: "Self-Drive 4x4 Daily Hire", price: "From $80/day", note: "Toyota RAV4, Prado or Land Cruiser" },
                { type: "Chauffeured Day Return", price: "From $120", note: "Driver waits at park during trek" },
                { type: "2 Day Trek Package", price: "From $200", note: "Driver and car for 2 full days" },
                { type: "Multi-Day Rwanda Safari", price: "Custom", note: "Gorillas plus Akagera or Nyungwe" },
              ].map((opt) => (
                <div key={opt.type} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{opt.type}</p>
                      <p className="text-gray-500 text-xs">{opt.note}</p>
                    </div>
                    <span className="font-bold text-[#01B000] text-sm ml-4">{opt.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/book-now" className="mt-6 block w-full text-center bg-[#01B000] text-white py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">Book Now</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">What to Do at Volcanoes National Park</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { activity: "Gorilla Trekking", desc: "Trek through the Virunga mountains to spend one hour with a wild mountain gorilla family. Permits are $1,500 per person." },
              { activity: "Golden Monkey Trekking", desc: "A more affordable alternative to gorilla trekking. Golden monkey permits cost $100 and the trek takes 2 to 4 hours." },
              { activity: "Dian Fossey Hike", desc: "Visit the research camp and grave of the famous gorilla researcher Dian Fossey. A challenging but rewarding 5 hour hike." },
            ].map((act) => (
              <div key={act.activity}>
                <h3 className="font-bold text-gray-900 mb-2">{act.activity}</h3>
                <p className="text-gray-600 text-sm">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.name}</h3>
                <p className="text-gray-600 text-sm">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-800 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your Volcanoes National Park Transfer</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Ready for gorilla trekking? Book your car hire or chauffeured transfer from Kigali today. We ensure you arrive on time and in comfort.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-green-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Now</Link>
            <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-800 transition-all">WhatsApp Us</a>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/volcanoes-national-park-car-hire" />
    </div>
    </>
  );
}
