import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Self Drive Rwanda | Self Drive Car Hire Kigali - Kigali Car Rental",
  description: "Self drive car hire in Rwanda from $30 per day. Explore Rwanda at your own pace with a fully insured car. Economy, SUV, 4x4 and luxury cars available. Book now.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/self-drive-rwanda" },
  openGraph: {
    title: "Self Drive Rwanda | Kigali Car Rental",
    description: "Self drive car hire in Rwanda from $30/day. Fully insured, 24/7 support. Explore Rwanda your way.",
    url: "https://kigalicarrental.site/self-drive-rwanda",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can foreigners self drive in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Foreign visitors can self drive in Rwanda with a valid driving licence from their home country. An International Driving Permit (IDP) is recommended but not always required. Rwanda drives on the right side of the road." },
    },
    {
      "@type": "Question",
      name: "What documents do I need to self drive in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "You need a valid driving licence, your passport or national ID, and a deposit. We recommend carrying your International Driving Permit if you have one. All drivers must be at least 23 years old." },
    },
    {
      "@type": "Question",
      name: "Is it safe to self drive in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "Rwanda is one of the safest countries in Africa for self drive travel. Roads in Kigali and between major towns are well maintained. We provide 24/7 roadside assistance and all cars are fitted with GPS tracking for your safety." },
    },
    {
      "@type": "Question",
      name: "What is the best car for self drive in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "For Kigali and paved roads, a sedan or economy car works well. For national parks like Akagera, Volcanoes, or Nyungwe, a 4x4 SUV such as a Toyota RAV4, Land Cruiser Prado, or Land Cruiser is strongly recommended." },
    },
  ],
};

export default function SelfDriveRwandaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-br from-gray-900 to-[#1e3a8a]/80 text-white py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#1e3a8a] text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Explore Rwanda Your Way</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Self Drive Rwanda</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Hire a car in Rwanda and explore at your own pace. Full insurance, 24/7 roadside support, and free Kigali delivery included. Economy cars to 4x4 Land Cruisers available.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fleet" className="bg-[#1e3a8a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#172554] transition-all">Browse Cars</Link>
              <Link href="/book-now" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Book Now</Link>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Self Drive Car Hire in Rwanda</h2>
              <p className="text-gray-600 mb-4">Rwanda is a compact and incredibly beautiful country that rewards self drive exploration. With well-maintained roads connecting Kigali to all major destinations, it is easy to hire a car and discover Rwanda on your own schedule.</p>
              <p className="text-gray-600 mb-4">Kigali Car Rental offers the widest range of self drive vehicles in Rwanda. From budget-friendly economy cars for city driving to robust 4x4 Land Cruisers for national park adventures, we have the right car for every journey.</p>
              <p className="text-gray-600 mb-4">All our self drive cars come with comprehensive insurance, unlimited mileage, and 24/7 roadside assistance. We deliver your car anywhere in Kigali at no extra cost. Simply book online, and we bring the car to you.</p>
              <p className="text-gray-600 mb-6">Rwanda drives on the right side of the road. Traffic in Kigali is manageable and the main roads between cities are in excellent condition. Most Rwandan roads are paved and well signposted.</p>
              <Link href="/fleet" className="inline-block bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all">View All Cars</Link>
            </div>
            <div className="space-y-4">
              {[
                { title: "Economy Cars from $30/day", desc: "Toyota Vitz, Honda Fit, and similar compact cars. Perfect for Kigali city driving and short trips." },
                { title: "SUVs from $60/day", desc: "Toyota RAV4, Hyundai Tucson, and similar. Comfortable for long drives and light off-road use." },
                { title: "4x4 Land Cruisers from $90/day", desc: "Toyota Land Cruiser and Prado. Essential for national parks and rough terrain." },
                { title: "Luxury Cars from $80/day", desc: "Mercedes, BMW, and Lexus options for business travel and special occasions." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border-2 border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">Top Self Drive Destinations in Rwanda</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Volcanoes National Park", dist: "110 km from Kigali", tip: "Gorilla trekking. 4x4 recommended. 2.5 hour drive." },
                { name: "Akagera National Park", dist: "130 km from Kigali", tip: "Big Five safari. 4x4 essential. 2.5 hour drive." },
                { name: "Lake Kivu - Gisenyi", dist: "160 km from Kigali", tip: "Beautiful lake views. Paved road. 2.5 hour drive." },
                { name: "Nyungwe Forest", dist: "225 km from Kigali", tip: "Chimpanzee trekking. 4x4 recommended. 4 hour drive." },
                { name: "Rubavu", dist: "165 km from Kigali", tip: "Border town. Good paved road. 2.5 hour drive." },
                { name: "Huye (Butare)", dist: "135 km from Kigali", tip: "National Museum. Paved road. 2 hour drive." },
              ].map((dest) => (
                <div key={dest.name} className="border border-gray-100 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{dest.name}</h3>
                  <p className="text-[#1e3a8a] text-sm font-semibold mb-1">{dest.dist}</p>
                  <p className="text-gray-600 text-xs">{dest.tip}</p>
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

          <div className="bg-[#1e3a8a] rounded-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Start Your Self Drive Rwanda Adventure</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">Browse our full fleet and book your self drive car today. Free delivery anywhere in Kigali.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fleet" className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Browse Cars</Link>
              <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1e3a8a] transition-all">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/self-drive-rwanda" />
    </>
  );
}
