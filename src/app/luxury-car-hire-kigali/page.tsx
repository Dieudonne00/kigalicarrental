import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Luxury Car Hire Kigali | Mercedes BMW Lexus Rental Rwanda - Kigali Car Rental",
  description: "Hire a luxury car in Kigali from $80 per day. Mercedes-Benz, BMW, Lexus and Range Rover available. Chauffeur-driven or self-drive. Perfect for business and weddings.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/luxury-car-hire-kigali" },
  openGraph: {
    title: "Luxury Car Hire Kigali | Mercedes BMW Lexus - Kigali Car Rental",
    description: "Hire a luxury car in Kigali from $80/day. Mercedes, BMW, Lexus. Self-drive or chauffeur-driven.",
    url: "https://kigalicarrental.site/luxury-car-hire-kigali",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What luxury cars are available for hire in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Kigali Car Rental offers Mercedes-Benz, BMW, Lexus, and Range Rover vehicles for luxury hire in Kigali. All vehicles are late model, immaculately maintained, and fully insured." },
    },
    {
      "@type": "Question",
      name: "Can I hire a luxury car with a chauffeur in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. All our luxury vehicles are available with a professional chauffeur for business meetings, airport transfers, weddings, and events. Our drivers are smartly dressed, discreet, and punctual." },
    },
    {
      "@type": "Question",
      name: "How much does luxury car hire cost in Kigali?",
      acceptedAnswer: { "@type": "Answer", text: "Luxury car hire in Kigali starts from $80 per day for a Lexus and from $100 per day for a Mercedes-Benz. Chauffeur service is available for an additional daily rate. Contact us for a custom quote." },
    },
  ],
};

export default function LuxuryCarHireKigaliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-block bg-yellow-500 text-gray-900 text-sm font-bold px-4 py-1 rounded-full mb-6">Premium Fleet</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">Luxury Car Hire Kigali</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Experience Kigali in style. Hire a Mercedes, BMW, Lexus, or Range Rover for business travel, airport transfers, weddings, or special occasions. Self-drive or chauffeur-driven.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all">Book a Luxury Car</Link>
              <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">WhatsApp Us</a>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { name: "Mercedes-Benz", price: "From $100/day", uses: "Business meetings, VIP transfers, weddings" },
              { name: "BMW Series", price: "From $95/day", uses: "Executive travel, corporate hire, special occasions" },
              { name: "Lexus RX", price: "From $80/day", uses: "Comfortable luxury SUV, business and leisure" },
            ].map((car) => (
              <div key={car.name} className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h2>
                <p className="text-[#1e3a8a] font-bold mb-2">{car.price}</p>
                <p className="text-gray-500 text-sm">{car.uses}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Premium Car Hire for Every Occasion in Kigali</h2>
              <p className="text-gray-600 mb-4">Kigali is a modern and rapidly growing city that attracts business executives, diplomats, conference delegates, and high-end tourists from around the world. Kigali Car Rental meets this demand with a premium fleet of luxury vehicles available for hire throughout Rwanda.</p>
              <p className="text-gray-600 mb-4">Whether you need a chauffeured Mercedes for an important business meeting in Kigali, a stylish BMW for your wedding day, or a Lexus SUV for a comfortable long-distance journey, we have the vehicle and the service to match your expectations.</p>
              <p className="text-gray-600 mb-6">All luxury vehicles are kept in immaculate condition, are fully insured, and are fitted with climate control, leather seats, and modern technology. Our chauffeurs are professionally trained, discreet, and always smartly presented.</p>
              <div className="space-y-2">
                {["Climate control and leather interiors", "Chauffeur service available", "Airport pickup and drop off", "Available 24 hours a day", "Suitable for weddings and events", "Corporate accounts available"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Popular Luxury Car Hire Services</h3>
              <div className="space-y-4">
                {[
                  { service: "Wedding Car Hire Kigali", desc: "Arrive in style on your special day" },
                  { service: "Corporate Car Hire Kigali", desc: "Executive transport for business visitors" },
                  { service: "VIP Airport Transfer", desc: "First class pickup from Kigali Airport" },
                  { service: "Conference and Event Transport", desc: "Reliable fleet hire for large groups" },
                  { service: "Long Term Luxury Rental", desc: "Monthly rates for expatriates and executives" },
                ].map((item) => (
                  <div key={item.service} className="border-b border-white/10 pb-3">
                    <p className="font-semibold text-white text-sm">{item.service}</p>
                    <p className="text-white/60 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/book-now" className="mt-6 block w-full text-center bg-yellow-500 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">Book Now</Link>
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

          <div className="bg-gray-900 rounded-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Book Your Luxury Car in Kigali</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Mercedes, BMW, Lexus and more. Available now with or without a driver. Call or WhatsApp for instant availability.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-all">Book Now</Link>
              <a href="tel:+250787619387" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-all">Call +250 787 619 387</a>
            </div>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/luxury-car-hire-kigali" />
    </>
  );
}
