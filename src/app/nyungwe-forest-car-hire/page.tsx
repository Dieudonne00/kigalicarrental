import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Nyungwe Forest Car Hire | Kigali to Nyungwe Transfer - Kigali Car Rental",
  description: "Car hire from Kigali to Nyungwe Forest National Park. Chimpanzee trekking transfers, canopy walk car hire, and self-drive 4x4 from $70/day. Book online today.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/nyungwe-forest-car-hire" },
  openGraph: {
    title: "Nyungwe Forest Car Hire | Kigali Car Rental",
    description: "Car hire from Kigali to Nyungwe Forest. Chimpanzee trekking transfers and self-drive 4x4 from $70/day.",
    url: "https://kigalicarrental.site/nyungwe-forest-car-hire",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How far is Nyungwe Forest from Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Nyungwe Forest National Park is approximately 225 km southwest of Kigali, about a 4 to 5 hour drive depending on the route and road conditions. The most common route goes via Butare (Huye) and Gikongoro. Part of the road passes through very scenic highland tea plantations." },
    },
    {
      "@type": "Question",
      name: "What type of car do I need to drive to Nyungwe Forest?",
      acceptedAnswer: { "@type": "Answer", text: "A 4x4 SUV is strongly recommended for the drive to Nyungwe Forest, especially in the wet season from March to May and October to December when mountain roads can become very muddy. Toyota RAV4, Prado, or Land Cruiser are the best choices." },
    },
    {
      "@type": "Question",
      name: "What can I do at Nyungwe Forest National Park?",
      acceptedAnswer: { "@type": "Answer", text: "Nyungwe offers chimpanzee trekking, the famous canopy walkway 70 metres above the forest floor, colobus monkey trekking, birdwatching with over 300 species, and guided forest hikes. It is one of the oldest and most biodiverse rainforests in Africa." },
    },
    {
      "@type": "Question",
      name: "Can I combine Nyungwe with a Lake Kivu trip?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Many visitors combine Nyungwe Forest with Lake Kivu since Cyangugu on the lake is only about 50 km from the park. Kigali Car Rental offers multi-destination packages that combine Nyungwe, Lake Kivu, and other Rwanda destinations in a single hire." },
    },
  ],
};

export default function NyungweForestCarHirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-emerald-900 to-blue-700 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Africa's Oldest Rainforest</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Nyungwe Forest Car Hire</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Hire a 4x4 from Kigali to Nyungwe Forest National Park. Chimpanzee trekking, canopy walk, and birdwatching. Self-drive or chauffeured transfers available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-emerald-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Book a 4x4</Link>
            <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-all border border-white/30">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: "Chimpanzee Trekking", desc: "Track wild chimpanzee families through ancient rainforest with expert guides." },
            { title: "Canopy Walkway", desc: "Walk 70 metres above the forest floor on the famous Nyungwe canopy walk." },
            { title: "Birdwatching", desc: "Over 300 bird species including 29 species found nowhere else in Rwanda." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border-2 border-emerald-100 p-6">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h2 className="font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Drive from Kigali to Nyungwe National Park</h2>
            <p className="text-gray-600 mb-4">Nyungwe Forest National Park is one of the oldest and largest mountain rainforests in Africa, covering over 1,000 square kilometres of the Albertine Rift in southwest Rwanda. It is home to chimpanzees, 13 primate species, over 300 bird species, and extraordinary biodiversity found nowhere else on earth.</p>
            <p className="text-gray-600 mb-4">The drive from Kigali to Nyungwe takes approximately 4 to 5 hours via the southern route through Butare. Along the way you pass through Rwanda's beautiful southern highlands, including the famous Gisakura Tea Plantation that borders the park itself.</p>
            <p className="text-gray-600 mb-4">Kigali Car Rental provides 4x4 vehicles ideal for the Nyungwe journey. The roads are generally paved but steep mountain terrain means a 4x4 with good ground clearance is always the recommended choice, especially for visitors arriving in Rwanda's two rainy seasons.</p>
            <p className="text-gray-600 mb-6">We offer self-drive hire, chauffeured day transfers, and multi-day packages that combine Nyungwe with Lake Kivu and other southwest Rwanda destinations. All vehicles come with spare tyres, emergency kits, and roadside assistance.</p>
            <Link href="/4x4-car-hire-rwanda" className="inline-block bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#172554] transition-all">View 4x4 Fleet</Link>
          </div>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Nyungwe Transfer Packages</h3>
            <div className="space-y-4">
              {[
                { pkg: "Self-Drive 4x4 RAV4", price: "From $70/day", note: "Perfect for the Kigali to Nyungwe route" },
                { pkg: "Self-Drive Prado or Land Cruiser", price: "From $120/day", note: "Best option for wet season travel" },
                { pkg: "Chauffeured Day Return", price: "From $150", note: "Driver waits at park during activities" },
                { pkg: "2 Day Nyungwe Package", price: "From $250", note: "Chimp trek plus canopy walk" },
                { pkg: "Nyungwe and Lake Kivu Combo", price: "From $350", note: "3 days combining both destinations" },
              ].map((item) => (
                <div key={item.pkg} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.pkg}</p>
                      <p className="text-gray-500 text-xs">{item.note}</p>
                    </div>
                    <span className="font-bold text-[#1e3a8a] text-sm ml-4">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/book-now" className="mt-6 block w-full text-center bg-[#1e3a8a] text-white py-3 rounded-lg font-bold hover:bg-[#172554] transition-all">Book Now</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Why Visit Nyungwe Forest?</h2>
          <p className="text-gray-600 mb-4">Nyungwe is one of the world's most important biodiversity hotspots. Unlike Volcanoes National Park where mountain gorillas attract the majority of Rwanda's wildlife visitors, Nyungwe remains relatively undiscovered, which means fewer crowds and a more intimate wildlife experience.</p>
          <p className="text-gray-600 mb-4">The Nyungwe Canopy Walkway is one of only a handful of such structures in Africa and offers a breathtaking experience walking suspended above the rainforest canopy. Below, chimpanzee tracking in Nyungwe is rated among the best in East Africa with consistently high tracking success rates.</p>
          <p className="text-gray-600">For birdwatchers, Nyungwe is a world-class destination. The park is home to 29 of the 38 Albertine Rift endemic bird species, including the Ruwenzori turaco, handsome francolin, and the rare Shelley's crimsonwing. A birding guide can arrange pre-dawn forest walks to spot the most sought-after species.</p>
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

        <div className="bg-emerald-800 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your Nyungwe Forest Car Hire</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Explore Rwanda's ancient rainforest. Book a 4x4 or chauffeured transfer from Kigali to Nyungwe Forest today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-emerald-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Online</Link>
            <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-emerald-800 transition-all">WhatsApp Us</a>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/nyungwe-forest-car-hire" />
    </div>
    </>
  );
}
