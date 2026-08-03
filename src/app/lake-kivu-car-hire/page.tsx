import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Lake Kivu Car Hire | Kigali to Lake Kivu Transfer - Kigali Car Hire",
  description: "Car hire from Kigali to Lake Kivu from $50 per day. Explore Gisenyi, Kibuye, and Cyangugu by car. Self-drive or chauffeur available. Book online now.",
  keywords: "lake kivu car hire, kigali to lake kivu car hire, gisenyi car hire, rubavu car hire, lake kivu transfer kigali, car hire gisenyi rwanda, kibuye car hire rwanda",
  alternates: { canonical: "https://kigalicarhire.rw/lake-kivu-car-hire" },
  openGraph: {
    title: "Lake Kivu Car Hire | Kigali Car Hire",
    description: "Car hire from Kigali to Lake Kivu. Explore Gisenyi, Kibuye, and Cyangugu by car from $50/day.",
    url: "https://kigalicarhire.rw/lake-kivu-car-hire",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How far is Lake Kivu from Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Lake Kivu stretches along Rwanda's western border with the Democratic Republic of Congo. The main towns on Lake Kivu are Gisenyi (Rubavu) at 165 km from Kigali, Kibuye (Karongi) at 115 km, and Cyangugu (Rusizi) at 225 km. The drive to Gisenyi takes about 2.5 hours on well-maintained roads." },
    },
    {
      "@type": "Question",
      name: "What is the best car for driving to Lake Kivu?",
      acceptedAnswer: { "@type": "Answer", text: "The main road from Kigali to Lake Kivu is paved and well maintained. A standard sedan or SUV is perfectly suitable. If you plan to explore smaller roads around the lake or combine your trip with Nyungwe Forest, a 4x4 is recommended." },
    },
    {
      "@type": "Question",
      name: "What can I do at Lake Kivu?",
      acceptedAnswer: { "@type": "Answer", text: "Lake Kivu offers beautiful scenery, boat trips, kayaking, beach relaxation, and excellent fresh fish restaurants. Gisenyi is the most popular base with a lively waterfront, while Kibuye is quieter and more scenic. You can also visit the Congo Nile Trail for cycling and hiking." },
    },
  ],
};

export default function LakeKivuCarHirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Rwanda's Most Beautiful Lake</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Lake Kivu Car Hire</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Explore Lake Kivu and Rwanda's western highlands with a hire car from Kigali. Gisenyi, Kibuye, and Cyangugu are all within easy driving distance. Self-drive and chauffeured options available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Book a Car</Link>
            <Link href="/fleet" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all border border-white/30">View Fleet</Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Drive from Kigali to Lake Kivu</h2>
            <p className="text-gray-600 mb-4">Lake Kivu is one of the African Great Lakes and one of Rwanda's most beautiful natural attractions. Stretching along the border between Rwanda and the Democratic Republic of Congo, the lake offers stunning views, clear waters, and a relaxed atmosphere that is very different from busy Kigali.</p>
            <p className="text-gray-600 mb-4">The drive from Kigali to Gisenyi on the northern shore of Lake Kivu is one of the most scenic roads in Africa. You pass through rolling hills, tea plantations, and mountain villages before descending to the sparkling blue waters of the lake.</p>
            <p className="text-gray-600 mb-4">Kigali Car Hire provides affordable car hire for exploring Lake Kivu and Rwanda's western province. All major routes around the lake are paved and a standard car or SUV is suitable for most journeys. For those wanting to explore the Congo Nile Trail or more remote lakeside areas, a 4x4 is advisable.</p>
            <p className="text-gray-600 mb-6">We offer one-way hire between Kigali and Lake Kivu, multi-day rental packages, and chauffeured transfers for those who prefer to sit back and enjoy the scenery.</p>
            <Link href="/fleet" className="inline-block bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">View Available Cars</Link>
          </div>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Lake Kivu Distances from Kigali</h3>
            <div className="space-y-4">
              {[
                { dest: "Gisenyi (Rubavu)", km: "165 km", time: "2.5 hours", road: "Paved road, good condition" },
                { dest: "Kibuye (Karongi)", km: "115 km", time: "2 hours", road: "Paved, scenic mountain route" },
                { dest: "Cyangugu (Rusizi)", km: "225 km", time: "3.5 hours", road: "Paved via Butare or Kibuye" },
                { dest: "Nyungwe Forest", km: "225 km", time: "4 hours", road: "4x4 recommended in wet season" },
              ].map((d) => (
                <div key={d.dest} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{d.dest}</span>
                    <span className="text-[#01B000] font-bold text-sm">{d.km}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">{d.road}</span>
                    <span className="text-gray-500 text-xs">{d.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/book-now" className="mt-6 block w-full text-center bg-[#01B000] text-white py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">Book Now</Link>
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

        <div className="bg-blue-800 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your Lake Kivu Car Hire</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Explore Lake Kivu at your own pace. Book a self-drive car or chauffeured transfer from Kigali today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Online</Link>
            <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-all">WhatsApp Us</a>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/lake-kivu-car-hire" />
    </div>
    </>
  );
}
