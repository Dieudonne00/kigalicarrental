import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

export const metadata: Metadata = {
  title: "Gorilla Trekking Car Hire Rwanda | 4x4 Car Hire Volcanoes National Park - Kigali Car Hire",
  description: "Hire a 4x4 car for gorilla trekking in Rwanda from $80 per day. Self-drive or chauffeur to Volcanoes National Park from Kigali. Book now - +250 788 892 976.",
  keywords: "gorilla trekking car hire, gorilla trekking rwanda car hire, car hire volcanoes national park, 4x4 hire gorilla trekking, kigali to volcanoes national park car hire, rwanda gorilla safari car hire",
  alternates: { canonical: "https://kigalicarhire.rw/gorilla-trekking-car-hire" },
  openGraph: {
    title: "Gorilla Trekking Car Hire Rwanda | Kigali Car Hire",
    description: "4x4 car hire for gorilla trekking in Rwanda. Self-drive or chauffeured to Volcanoes National Park from $80/day.",
    url: "https://kigalicarhire.rw/gorilla-trekking-car-hire",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What type of car do I need for gorilla trekking in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "A 4x4 vehicle is strongly recommended for gorilla trekking in Rwanda. The roads to Volcanoes National Park can be rough especially during rainy season. We recommend a Toyota Land Cruiser, Toyota Prado, or Toyota RAV4 for the journey from Kigali to the park." },
    },
    {
      "@type": "Question",
      name: "How far is Kigali from Volcanoes National Park?",
      acceptedAnswer: { "@type": "Answer", text: "Volcanoes National Park is approximately 110 kilometres from Kigali, a drive of around 2 to 2.5 hours depending on road conditions. We recommend departing Kigali by 5:30 AM to reach the park briefing at 7:00 AM." },
    },
    {
      "@type": "Question",
      name: "Can I get a driver to take me to gorilla trekking in Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Kigali Car Hire offers chauffeured transfers to Volcanoes National Park for gorilla trekking. Your driver will pick you up from your hotel in Kigali, wait at the park while you trek, and drive you back. This is the most comfortable and stress-free option." },
    },
    {
      "@type": "Question",
      name: "How much does car hire for gorilla trekking in Rwanda cost?",
      acceptedAnswer: { "@type": "Answer", text: "Car hire for gorilla trekking in Rwanda starts from $80 per day for a 4x4 SUV. A chauffeured round trip from Kigali to Volcanoes National Park starts from $120. Contact us for a custom quote based on your dates and vehicle preference." },
    },
  ],
};

export default function GorillaTrekkingCarHirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-br from-green-900 via-green-800 to-[#01B000]/70 text-white py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">Most Popular Rwanda Experience</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">
              Gorilla Trekking Car Hire Rwanda
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Hire a reliable 4x4 for your gorilla trekking experience in Rwanda. Self-drive or chauffeur-driven from Kigali to Volcanoes National Park. Safe, affordable, and dependable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-white text-green-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">Book a 4x4 Now</Link>
              <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="bg-[#01B000] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#019500] transition-all">WhatsApp Us</a>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">

          <div className="grid md:grid-cols-2 gap-10 mb-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">Car Hire for Gorilla Trekking in Rwanda</h2>
              <p className="text-gray-600 mb-4">Rwanda is home to more than half of the world's remaining mountain gorillas, all living in Volcanoes National Park in the northwest of the country. Every year thousands of visitors travel from Kigali to Musanze to experience gorilla trekking, one of the most extraordinary wildlife encounters on earth.</p>
              <p className="text-gray-600 mb-4">Kigali Car Hire provides 4x4 vehicles specifically chosen for the Kigali to Volcanoes National Park route. Our cars are well maintained, fully insured, and equipped with everything you need for a comfortable drive through Rwanda's beautiful landscape.</p>
              <p className="text-gray-600 mb-4">You can choose to self-drive your 4x4 to the park, giving you full freedom to stop and explore along the way. Alternatively, our experienced chauffeurs can drive you there and back, so you can relax and prepare for your trek without worrying about navigation.</p>
              <p className="text-gray-600 mb-6">We also offer multi-day packages combining gorilla trekking with golden monkey trekking, Akagera safari, and Nyungwe chimpanzee tracking. Contact us to build your custom Rwanda itinerary.</p>
              <Link href="/fleet" className="inline-block bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">View 4x4 Fleet</Link>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Gorilla Trekking Car Hire Packages</h3>
              <div className="space-y-4">
                {[
                  { name: "Self-Drive 4x4 Daily Rate", desc: "Toyota RAV4, Prado or Land Cruiser", price: "From $80/day" },
                  { name: "Kigali to Volcanoes - Return Transfer", desc: "Driver included, wait at park", price: "From $120" },
                  { name: "2 Day Gorilla Trek Package", desc: "Car hire + driver for 2 days", price: "From $200" },
                  { name: "Custom Multi-Day Safari", desc: "Gorillas, Akagera, Nyungwe", price: "Contact Us" },
                ].map((pkg) => (
                  <div key={pkg.name} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{pkg.name}</p>
                        <p className="text-gray-500 text-xs">{pkg.desc}</p>
                      </div>
                      <span className="font-bold text-[#01B000] text-sm whitespace-nowrap ml-4">{pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/book-now" className="mt-6 block w-full text-center bg-[#01B000] text-white py-3 rounded-lg font-bold hover:bg-[#019500] transition-all">Book Now</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">What to Expect on the Drive to Volcanoes National Park</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Distance from Kigali", desc: "Approximately 110 km, taking around 2 to 2.5 hours by road through Rwanda's famous thousand hills landscape." },
                { title: "Best Vehicle", desc: "A 4x4 is recommended especially in rainy season when roads can become muddy. A Land Cruiser or Prado offers the most comfort." },
                { title: "Departure Time", desc: "We recommend leaving Kigali by 5:30 AM to arrive at the park briefing at 7:00 AM. Our drivers know the route perfectly." },
              ].map((item) => (
                <div key={item.title}>
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
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-plus-jakarta)]">Ready for Your Gorilla Trek?</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">Book your 4x4 car hire for gorilla trekking today. We handle everything so you can focus on the experience of a lifetime.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-now" className="bg-white text-[#01B000] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">Book Online</Link>
              <a href="tel:+250788892976" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#01B000] transition-all">Call +250 788 892 976</a>
            </div>
          </div>
        </div>
      </div>
      <ServicePageFooter current="/gorilla-trekking-car-hire" />
    </>
  );
}
