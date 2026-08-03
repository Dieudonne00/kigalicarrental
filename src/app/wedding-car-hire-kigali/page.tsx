import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Wedding Car Hire Kigali | Bridal Car Rental Rwanda - Kigali Car Hire",
  description: "Beautiful wedding cars for hire in Kigali from $80. Mercedes, BMW, Land Cruiser and decorated vehicles available. Book your bridal car today - +250 788 892 976.",
  keywords: "wedding car hire kigali, bridal car hire kigali, wedding car rental rwanda, wedding car kigali, bridal car kigali, luxury wedding car hire rwanda, decorated car hire kigali",
  alternates: { canonical: "https://kigalicarhire.rw/wedding-car-hire-kigali" },
  openGraph: {
    title: "Wedding Car Hire Kigali | Kigali Car Hire",
    description: "Elegant wedding cars in Kigali. Mercedes, BMW, decorated vehicles from $80. Book for your special day.",
    url: "https://kigalicarhire.rw/wedding-car-hire-kigali",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What wedding cars are available in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "We offer Mercedes-Benz, BMW, Toyota Land Cruiser, and other premium vehicles for weddings in Kigali. All can be decorated with ribbons, flowers, and custom arrangements on request. We cater for both the bridal car and the full wedding convoy." },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book a wedding car in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "We recommend booking your wedding car at least 2 to 4 weeks in advance, especially for peak wedding season between June and September and around public holidays. Early booking guarantees your preferred vehicle and date." },
    },
    {
      "@type": "Question",
      name: "Do you offer a full wedding convoy service in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Kigali Car Hire can provide multiple vehicles for a full wedding convoy including the bridal car, family cars, and guest transport. We coordinate timing and routes to make sure everything runs smoothly on your wedding day." },
    },
    {
      "@type": "Question",
      name: "How much does wedding car hire cost in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Wedding car hire in Kigali starts from $80 for a half day. Full day rates and convoy packages are available. Contact us with your wedding date and requirements for a custom quote." },
    },
  ],
};

export default function WeddingCarHireKigaliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-rose-900 via-rose-800 to-rose-600 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Special Occasions</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Wedding Car Hire Kigali</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Make your wedding day unforgettable with the perfect car. Mercedes, BMW, luxury SUVs, and full convoy services available. Decorated vehicles on request.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-rose-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Book Wedding Car</Link>
            <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="bg-rose-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-rose-600 transition-all border border-white/30">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: "Bridal Car", desc: "One elegant vehicle beautifully decorated for the bride and groom. Driver included." },
            { title: "Wedding Convoy", desc: "Full convoy of vehicles for the wedding party, family, and guests. Coordinated by our team." },
            { title: "Full Day Hire", desc: "Your wedding car available for the entire day from the ceremony to the reception venue." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border-2 border-rose-100 p-6 text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">The Perfect Wedding Car in Kigali</h2>
            <p className="text-gray-600 mb-4">Your wedding day is one of the most important days of your life, and the car you arrive in sets the tone for everything that follows. Kigali Car Hire has been providing wedding car hire services across Kigali and Rwanda for years, helping couples arrive in style and comfort.</p>
            <p className="text-gray-600 mb-4">We offer a wide range of vehicles suitable for weddings in Kigali, from elegant Mercedes-Benz and BMW saloons to large Toyota Land Cruisers for church processions and photo shoots. All wedding vehicles are cleaned and polished to perfection before your special day.</p>
            <p className="text-gray-600 mb-4">Our team can decorate your wedding car with ribbons, flowers, and personalised touches. We also coordinate full wedding convoys with multiple vehicles, ensuring that the entire bridal party and family travel in comfort and arrive on schedule.</p>
            <p className="text-gray-600 mb-6">We cover all venues across Kigali including hotels, churches, mosques, and event centres. We also provide wedding transport to destinations outside Kigali for destination weddings.</p>
            <Link href="/book-now" className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-rose-700 transition-all">Book Your Wedding Car</Link>
          </div>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Wedding Car Hire Packages</h3>
            <div className="space-y-4">
              {[
                { pkg: "Bridal Car Half Day (4 hours)", price: "From $80" },
                { pkg: "Bridal Car Full Day (8 hours)", price: "From $140" },
                { pkg: "Wedding Convoy 3 Cars", price: "From $250" },
                { pkg: "Wedding Convoy 5 Cars", price: "From $400" },
                { pkg: "Decoration (ribbons and flowers)", price: "From $20" },
              ].map((item) => (
                <div key={item.pkg} className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700 text-sm">{item.pkg}</span>
                  <span className="font-bold text-[#01B000]">{item.price}</span>
                </div>
              ))}
            </div>
            <Link href="/book-now" className="mt-6 block w-full text-center bg-rose-600 text-white py-3 rounded-lg font-bold hover:bg-rose-700 transition-all">Get a Quote</Link>
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

        <div className="bg-rose-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your Wedding Car Today</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">Dates fill up fast especially during wedding season. Contact us now to secure your vehicle and make your special day perfect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-rose-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Now</Link>
            <a href="tel:+250788892976" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-rose-600 transition-all">Call +250 788 892 976</a>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/wedding-car-hire-kigali" />
    </div>
    </>
  );
}
