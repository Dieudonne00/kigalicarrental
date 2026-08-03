import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Airport Transfer Kigali | Car Hire Kigali International Airport - Kigali Car Hire",
  description: "Book a reliable airport transfer in Kigali from $30. We meet you at Kigali International Airport arrivals 24/7 with a name board. Fixed prices, no hidden fees. Call +250 788 892 976.",
  keywords: "airport transfer kigali, kigali airport car hire, kigali international airport transfer, airport pickup kigali, kigali airport taxi, car hire kigali airport, airport drop off kigali",
  alternates: { canonical: "https://kigalicarhire.rw/airport-transfer-kigali" },
  openGraph: {
    title: "Airport Transfer Kigali | Kigali Car Hire",
    description: "Meet and greet at Kigali International Airport 24/7. Fixed rates from $30. Book online or WhatsApp +250 788 892 976.",
    url: "https://kigalicarhire.rw/airport-transfer-kigali",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an airport transfer from Kigali International Airport cost?",
      acceptedAnswer: { "@type": "Answer", text: "Airport transfers from Kigali International Airport start from $30 for Kigali city centre. Rates vary by destination and vehicle type. All prices are fixed with no hidden fees." },
    },
    {
      "@type": "Question",
      name: "Do you offer 24 hour airport pickup in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Kigali Car Hire provides 24 hour airport pickup and drop off at Kigali International Airport. Our driver will meet you at arrivals with a name board regardless of your flight time." },
    },
    {
      "@type": "Question",
      name: "How do I book an airport transfer in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "You can book your Kigali airport transfer online via our booking form, by calling +250 788 892 976, or by sending a WhatsApp message. We recommend booking at least 24 hours in advance." },
    },
    {
      "@type": "Question",
      name: "Will you wait if my flight is delayed?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We monitor all incoming flights and adjust pickup time automatically if your flight is delayed. You will not be charged extra for flight delays." },
    },
  ],
};

export default function AirportTransferKigaliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#01B000]/80 text-white py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#01B000] text-white text-sm font-bold px-4 py-1 rounded-full mb-6">24/7 Available</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">
              Airport Transfer Kigali
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Reliable car hire and airport pickup at Kigali International Airport. Fixed rates, professional drivers, meet and greet service available round the clock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-[#01B000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#019500] transition-all">Book Airport Transfer</Link>
              <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">WhatsApp Us</a>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Fixed Rates", desc: "No surge pricing. No hidden fees. The price we quote is the price you pay for your Kigali airport transfer." },
              { title: "Flight Tracking", desc: "We monitor your flight in real time. If your flight is delayed we adjust the pickup time at no extra charge." },
              { title: "Meet and Greet", desc: "Your driver will be waiting at arrivals holding a name board. No need to search for a taxi or negotiate fares." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#01B000]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Kigali International Airport Car Hire and Transfers</h2>
              <p className="text-gray-600 mb-4">Kigali International Airport (KGL) is Rwanda's main international gateway, located just 10 kilometres from Kigali city centre. Whether you have arrived for business, tourism, or a gorilla trekking safari, Kigali Car Hire offers the most reliable and affordable airport transfer service in Rwanda.</p>
              <p className="text-gray-600 mb-4">Our drivers are professional, punctual, and fully licensed. Every vehicle is clean, well maintained, and insured. We serve all terminals at Kigali International Airport and cover all destinations across Rwanda including Volcanoes National Park, Akagera, Nyungwe, and Lake Kivu.</p>
              <p className="text-gray-600 mb-6">If you prefer to drive yourself, we also offer self-drive car hire at the airport. Choose from economy cars, SUVs, 4x4 Land Cruisers, and luxury vehicles. All cars come with full insurance and 24/7 roadside support.</p>
              <Link href="/fleet" className="inline-block bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">View Available Cars</Link>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Airport Transfer Rates from Kigali Airport</h3>
              <div className="space-y-3">
                {[
                  ["Kigali City Centre", "From $30"],
                  ["Kigali to Musanze (Volcanoes)", "From $80"],
                  ["Kigali to Akagera National Park", "From $70"],
                  ["Kigali to Lake Kivu (Gisenyi)", "From $90"],
                  ["Kigali to Nyungwe Forest", "From $110"],
                  ["Kigali to Rubavu", "From $85"],
                ].map(([dest, price]) => (
                  <div key={dest} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 text-sm">{dest}</span>
                    <span className="font-bold text-[#01B000]">{price}</span>
                  </div>
                ))}
              </div>
              <Link href="/book-now" className="mt-6 block w-full text-center bg-[#01B000] text-white py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">Book Now</Link>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-[family-name:var(--font-plus-jakarta)]">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Book Online", desc: "Fill in your flight details, pickup location, and destination on our booking form." },
                { step: "2", title: "Confirmation", desc: "Receive a booking confirmation via WhatsApp or email within 30 minutes." },
                { step: "3", title: "Driver Assigned", desc: "A professional driver is assigned to your transfer and will monitor your flight." },
                { step: "4", title: "Pickup at Airport", desc: "Your driver meets you at arrivals with a name board. No waiting, no stress." },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center">
                  <div className="w-10 h-10 bg-[#01B000] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{item.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
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

          <div className="bg-[#01B000] rounded-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your Kigali Airport Transfer Today</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">Available 24 hours a day, 7 days a week. Call, WhatsApp, or book online. Our team responds within minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-white text-[#01B000] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Online</Link>
              <a href="tel:+250788892976" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#01B000] transition-all">Call +250 788 892 976</a>
            </div>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/airport-transfer-kigali" />
    </>
  );
}
