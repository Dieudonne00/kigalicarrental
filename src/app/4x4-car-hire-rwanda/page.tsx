import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "4x4 Car Hire Rwanda | 4x4 Rental Kigali Land Cruiser Prado - Kigali Car Rental",
  description: "Hire a 4x4 in Rwanda from $80 per day. Land Cruiser, Prado, RAV4 and more. Perfect for safaris, gorilla trekking, and national park visits. Book online now.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/4x4-car-hire-rwanda" },
  openGraph: {
    title: "4x4 Car Hire Rwanda | Land Cruiser and Prado Rental - Kigali Car Rental",
    description: "Hire a 4x4 in Rwanda from $80/day. Land Cruiser, Prado, RAV4. Ideal for safaris and national parks.",
    url: "https://kigalicarrental.site/4x4-car-hire-rwanda",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do I need a 4x4 for safari in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "A 4x4 is essential for game drives in Akagera National Park and for visiting Volcanoes National Park during rainy season. Park tracks are unpaved and can be muddy. A standard saloon car will struggle on these roads. We always recommend a Toyota Land Cruiser or Land Cruiser Prado for safari use." },
    },
    {
      "@type": "Question",
      name: "What 4x4 vehicles are available for hire in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "Kigali Car Rental offers Toyota Land Cruiser, Toyota Land Cruiser Prado, Toyota RAV4, Toyota Fortuner, and Mitsubishi Pajero. All 4x4 vehicles are well maintained and come with full insurance and 24/7 roadside assistance." },
    },
    {
      "@type": "Question",
      name: "How much does it cost to hire a 4x4 in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "4x4 car hire in Rwanda starts from $60 per day for a Toyota RAV4 and from $90 per day for a full-size Toyota Land Cruiser. Weekly and monthly rates offer significant discounts. Contact us for a custom quote." },
    },
  ],
};

export default function FourByFourCarHireRwandaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-br from-gray-800 to-[#1e3a8a]/70 text-white py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#1e3a8a] text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Safari Ready Vehicles</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">4x4 Car Hire Rwanda</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Rent a 4x4 in Rwanda for safaris, gorilla trekking, and national park adventures. Land Cruiser, Prado, RAV4 and more. All fully insured with 24/7 support.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-[#1e3a8a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#172554] transition-all">Book a 4x4</Link>
              <Link href="/fleet" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">View Fleet</Link>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Toyota RAV4", price: "From $60/day", desc: "Compact 4x4, ideal for paved roads and light off-road. Seats 5. Air conditioned." },
              { title: "Toyota Land Cruiser Prado", price: "From $90/day", desc: "Mid-size 4x4. Excellent for national parks. Seats 5-7. Very comfortable." },
              { title: "Toyota Land Cruiser", price: "From $100/day", desc: "Full-size safari 4x4. The best choice for Akagera and rough terrain. Seats 7-8." },
            ].map((car) => (
              <div key={car.title} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{car.title}</h2>
                <p className="text-[#1e3a8a] font-bold mb-3">{car.price}</p>
                <p className="text-gray-600 text-sm mb-4">{car.desc}</p>
                <Link href="/book-now" className="block w-full text-center bg-[#1e3a8a] text-white py-2 rounded-lg font-bold hover:bg-[#172554] transition-all text-sm">Book This Vehicle</Link>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Why Choose a 4x4 in Rwanda</h2>
              <p className="text-gray-600 mb-4">Rwanda may be a small country but its terrain is demanding. Known as the land of a thousand hills, Rwanda's landscape features steep roads, high altitude tracks, and national park routes that require a capable 4x4 vehicle.</p>
              <p className="text-gray-600 mb-4">Whether you are visiting Akagera National Park for a Big Five game drive, trekking to see mountain gorillas in Volcanoes National Park, or exploring Nyungwe Forest for chimpanzee tracking, a 4x4 is not optional, it is essential.</p>
              <p className="text-gray-600 mb-6">All Kigali Car Rental 4x4 vehicles are regularly serviced, fully insured, and come with a spare tyre, jack, and emergency kit. Our 24/7 roadside assistance means you are never stranded.</p>
              <div className="space-y-3">
                {["Full insurance included", "Unlimited mileage", "24/7 roadside assistance", "Free delivery in Kigali", "Spare tyre and emergency kit", "GPS available on request"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1e3a8a] flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Best 4x4 Routes in Rwanda</h3>
              <div className="space-y-4">
                {[
                  { route: "Kigali to Akagera National Park", note: "130 km - Land Cruiser recommended" },
                  { route: "Kigali to Volcanoes National Park", note: "110 km - Prado or Land Cruiser" },
                  { route: "Kigali to Nyungwe Forest", note: "225 km - 4x4 strongly recommended" },
                  { route: "Kigali to Lake Kivu", note: "160 km - RAV4 or Prado suitable" },
                  { route: "Cross-border to Uganda", note: "4x4 required for Uganda national parks" },
                ].map((item) => (
                  <div key={item.route} className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="font-semibold text-gray-900 text-sm">{item.route}</span>
                    <span className="text-gray-500 text-xs">{item.note}</span>
                  </div>
                ))}
              </div>
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

          <div className="bg-[#1e3a8a] rounded-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your 4x4 in Rwanda Today</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">Land Cruiser, Prado, RAV4 - all available now. Instant booking online or via WhatsApp.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Now</Link>
              <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1e3a8a] transition-all">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/4x4-car-hire-rwanda" />
    </>
  );
}
