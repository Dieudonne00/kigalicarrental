import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Corporate Car Hire Kigali | Business Car Rental Rwanda - Kigali Car Rental",
  description: "Corporate car hire in Kigali for businesses, NGOs, embassies, and conference delegates. Fleet rates, monthly contracts, and dedicated account managers. Call +250 787 619 387.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/corporate-car-hire-kigali" },
  openGraph: {
    title: "Corporate Car Hire Kigali | Kigali Car Rental",
    description: "Corporate car hire for businesses and NGOs in Kigali. Fleet rates and monthly contracts available.",
    url: "https://kigalicarrental.site/corporate-car-hire-kigali",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you offer corporate accounts for car hire in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Kigali Car Rental offers dedicated corporate accounts for businesses, NGOs, embassies, and international organisations based in Rwanda. Corporate accounts receive preferential rates, monthly invoicing, and a dedicated account manager." },
    },
    {
      "@type": "Question",
      name: "Can you provide a fleet of cars for a conference in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We regularly supply fleets of vehicles for conferences, summits, and large events in Kigali including CHOGM, AU summits, and international business conferences. We provide drivers, coordinators, and a dedicated operations team for large events." },
    },
    {
      "@type": "Question",
      name: "Do you offer long-term monthly car hire in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We offer monthly car hire contracts for expatriates, NGO staff, embassy personnel, and businesses relocating to Rwanda. Monthly rates are significantly discounted compared to daily rates and include maintenance, insurance, and 24/7 support." },
    },
  ],
};

export default function CorporateCarHireKigaliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">For Businesses and NGOs</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Corporate Car Hire Kigali</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Reliable corporate car hire solutions for businesses, NGOs, embassies, and conference delegates in Rwanda. Fleet rates, monthly contracts, and dedicated account managers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Request a Quote</Link>
            <a href="tel:+250787619387" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all border border-white/30">Call Us Now</a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Corporate Accounts", desc: "Monthly invoicing, preferential rates, and dedicated account manager." },
            { title: "Fleet Hire", desc: "Multiple vehicles for large organisations, events, and conferences." },
            { title: "Monthly Contracts", desc: "Long-term hire with full maintenance and insurance included." },
            { title: "24/7 Support", desc: "Round the clock assistance for corporate clients and their staff." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h2 className="font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Rwanda's Leading Corporate Car Hire Company</h2>
            <p className="text-gray-600 mb-4">Kigali is one of Africa's fastest growing business destinations, hosting major international conferences, UN agencies, NGO headquarters, diplomatic missions, and multinational corporations. Kigali Car Rental understands the demands of corporate travel in Rwanda and provides solutions built specifically for organisations.</p>
            <p className="text-gray-600 mb-4">Our corporate car hire service covers everything from single executive airport transfers to supplying a full fleet for a week-long international summit. We work with embassies, the African Union, the East African Community, international NGOs, and global corporations operating in Rwanda.</p>
            <p className="text-gray-600 mb-4">All corporate vehicles are maintained to the highest standard, fully insured, and staffed by professional, background-checked drivers. Our operations team manages all logistics so your team can focus on their work.</p>
            <p className="text-gray-600 mb-6">Monthly car hire contracts are available for organisations posting staff to Rwanda. Contracts include full vehicle maintenance, insurance, and a replacement vehicle in case of breakdown.</p>
            <Link href="/book-now" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all">Request Corporate Quote</Link>
          </div>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Corporate Clients We Serve</h3>
            <div className="space-y-3">
              {["International NGOs and charities", "UN agencies and programmes", "Embassies and diplomatic missions", "Private sector multinationals", "Event and conference organisers", "Hotel and hospitality groups", "Medical and health organisations", "Mining, construction, and engineering firms"].map((client) => (
                <div key={client} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                  <span className="text-gray-700 text-sm">{client}</span>
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

        <div className="bg-blue-800 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Set Up Your Corporate Account Today</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Get preferential rates, dedicated support, and flexible billing. Contact our corporate team to discuss your organisation's requirements.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Request Quote</Link>
            <a href="mailto:info@kigalicarrental.site" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-all">Email Our Team</a>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/corporate-car-hire-kigali" />
    </div>
    </>
  );
}
