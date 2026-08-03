import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

const SITE = "https://kigalicarhire.rw";

export const metadata: Metadata = {
  title: "Long Term Car Hire Kigali | Monthly and Weekly Car Rental Rwanda - Kigali Car Hire",
  description:
    "Long term car hire in Kigali from $600/month. Weekly and monthly car rental in Rwanda for expats, NGO staff, embassy personnel and businesses. Full insurance, maintenance and 24/7 support included. Kigali Car Hire.",
  keywords:
    "long term car hire kigali, monthly car hire kigali, weekly car hire kigali, monthly car rental rwanda, long term car rental rwanda, expat car hire kigali, car hire kigali 1 month, car hire rwanda monthly rate, long stay car hire rwanda, weekly car rental kigali, ngo long term car hire rwanda, monthly vehicle hire rwanda, kigali car hire monthly, car rental kigali 30 days, extended car hire rwanda",
  alternates: { canonical: `${SITE}/long-term-car-hire-kigali` },
  openGraph: {
    title: "Long Term Car Hire Kigali | Monthly and Weekly Car Rental Rwanda",
    description:
      "Long term car hire in Kigali from $600/month. Full insurance, maintenance and 24/7 support included for expats, NGOs and businesses.",
    url: `${SITE}/long-term-car-hire-kigali`,
    siteName: "Kigali Car Hire",
    type: "website",
    locale: "en_RW",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does long term car hire in Kigali cost per month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Long term car hire in Kigali starts from $600 per month for economy saloons, $900 per month for SUVs like the RAV4, and from $1,200 per month for 4x4 Land Cruisers. Monthly rates include insurance, maintenance, and 24/7 roadside support. The longer the rental, the lower the daily rate.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire a car in Kigali for a full month without a driver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Hire offers self-drive monthly car hire for customers with a valid driving licence. You can hire a car in Kigali for one month, three months, or longer and drive yourself with no daily mileage limit.",
      },
    },
    {
      "@type": "Question",
      name: "Does the monthly car hire price include insurance and maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All long term car hire contracts from Kigali Car Hire include comprehensive third-party insurance, scheduled vehicle maintenance, and 24/7 roadside assistance. If the vehicle breaks down during your rental, we provide a replacement car at no extra cost.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer long term car hire for NGOs and embassies in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Hire has dedicated long term contracts for NGOs, UN agencies, embassies, and diplomatic missions in Rwanda. We provide monthly invoicing, VAT exemption documentation for qualifying organisations, and fleet management for multi-vehicle contracts.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need for long term car hire in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For monthly car hire in Kigali you need a valid driving licence (international driving permit recommended for foreign nationals), a passport or national ID, and a signed rental agreement. A refundable security deposit is required at the start of the contract.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire a car in Kigali for 3 months or more?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Hire offers long term contracts of 1 month, 3 months, 6 months, and 12 months. The longer the contract, the better the daily rate. We can also negotiate a custom contract for organisations that need a vehicle for a specific project duration.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kigali Car Hire", item: SITE },
    { "@type": "ListItem", position: 2, name: "Long Term Car Hire Kigali", item: `${SITE}/long-term-car-hire-kigali` },
  ],
};

const rates = [
  { car: "Economy Saloon (Toyota Vitz / Corolla)", weekly: "$210", monthly: "$600", icon: "sedan" },
  { car: "Compact SUV (Toyota RAV4 / CRV)", weekly: "$350", monthly: "$900", icon: "suv" },
  { car: "4x4 Land Cruiser Prado", weekly: "$560", monthly: "$1,400", icon: "4x4" },
  { car: "4x4 Land Cruiser 70 / 80 Series", weekly: "$700", monthly: "$1,800", icon: "4x4" },
  { car: "Minibus (14-Seater Super Custom)", weekly: "$630", monthly: "$1,600", icon: "minibus" },
  { car: "Luxury Sedan (Mercedes / BMW)", weekly: "$700", monthly: "$2,000", icon: "luxury" },
];

const benefits = [
  { title: "No Mileage Limit", desc: "Drive as far as you need within Rwanda. No odometer caps, no surprise charges." },
  { title: "Insurance Included", desc: "Comprehensive third-party insurance is bundled into every monthly contract at no extra cost." },
  { title: "Free Maintenance", desc: "Scheduled servicing, oil changes, and tyre rotations are handled by our team throughout your contract." },
  { title: "Replacement Vehicle", desc: "If your hired car needs repair, we deliver a replacement to you within hours — no downtime." },
  { title: "24/7 Roadside Support", desc: "Call or WhatsApp our team at any time for assistance anywhere in Rwanda or East Africa." },
  { title: "Flexible Payments", desc: "Monthly invoicing accepted. Pay by mobile money, bank transfer, or cash — no credit card required." },
];

const whoFor = [
  "Expatriates posted to Kigali who need a vehicle before buying",
  "NGO and INGO staff on 3-to-12 month deployments in Rwanda",
  "UN agency personnel (UNHCR, UNDP, WFP, UNICEF, WHO) based in Kigali",
  "Embassy and diplomatic mission staff in Rwanda",
  "Consultants and researchers on long-term Rwanda assignments",
  "Businesses opening operations in Rwanda who need a vehicle fleet",
  "Journalists and documentary crews on extended Rwanda shoots",
  "Medical volunteers with MSF, Partners In Health, or similar organisations",
];

export default function LongTermCarHireKigaliPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-500 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white">Long Term Car Hire Kigali</li>
            </ol>
          </nav>
          <span className="inline-block bg-amber-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-6 border border-white/20">
            Weekly and Monthly Rates
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Long Term Car Hire Kigali
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
            Monthly car hire in Kigali from $600/month. Weekly car rental from $210/week. Full insurance and maintenance included — no hidden costs.
          </p>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-10">
            Trusted by expats, NGOs, UN agencies, embassies, and businesses posted to Rwanda. Self-drive or with a professional driver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-amber-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-all shadow-lg">
              Get Monthly Quote
            </Link>
            <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all border border-white/30">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Rate Table */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              Long Term Car Hire Rates in Kigali
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All weekly and monthly car hire rates include insurance, maintenance, and unlimited mileage within Rwanda. Prices in USD.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Vehicle</th>
                  <th className="px-6 py-4 text-center font-bold">Weekly Rate</th>
                  <th className="px-6 py-4 text-center font-bold">Monthly Rate</th>
                  <th className="px-6 py-4 text-center font-bold">Book</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rates.map((r, i) => (
                  <tr key={r.car} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{r.car}</td>
                    <td className="px-6 py-4 text-center text-amber-700 font-bold">{r.weekly}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">{r.monthly}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link href="/book-now" className="text-amber-600 font-semibold hover:underline text-xs">
                        Request Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Rates are indicative. Final pricing depends on vehicle availability, rental duration, and pickup location. Contact us for an exact quote.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              What Is Included in Long Term Car Hire in Kigali
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Every weekly and monthly car hire contract from Kigali Car Hire includes the following at no extra charge.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-amber-300 transition-colors">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
                Who Uses Long Term Car Hire in Kigali?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Kigali is one of Africa's fastest growing business and humanitarian hubs. Thousands of expatriates, diplomats, NGO workers, and corporate executives are posted to Rwanda every year — often for 3, 6, or 12 months at a time. Buying a car for a short posting makes no financial sense. Long term car hire in Kigali is the practical, cost-effective solution.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Monthly car rental in Kigali is also increasingly popular for businesses launching operations in Rwanda who need a vehicle fleet before committing to purchase. Our long term hire contracts give you the flexibility to scale up or down as your needs change.
              </p>
              <ul className="space-y-3">
                {whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="bg-white rounded-xl border-2 border-amber-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg font-[family-name:var(--font-plus-jakarta)]">
                  How to Start a Monthly Car Hire Contract
                </h3>
                <ol className="space-y-4">
                  {[
                    { step: "1", text: "Contact us by WhatsApp, phone, or email with your required dates and vehicle type" },
                    { step: "2", text: "We send you a quote within 2 hours with the exact monthly rate and included services" },
                    { step: "3", text: "Sign the rental agreement and pay a refundable security deposit" },
                    { step: "4", text: "We deliver the car to your hotel, office, or Kigali International Airport" },
                    { step: "5", text: "Drive with full insurance, maintenance, and 24/7 support for the duration" },
                  ].map((s) => (
                    <li key={s.step} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {s.step}
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed pt-0.5">{s.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">Documents Required</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {["Valid driving licence (international permit for foreign nationals)", "Passport or national ID", "Organisation letter (for NGO and embassy clients)", "Refundable security deposit (mobile money, bank transfer, or cash)"].map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keyword content block */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Long Term Car Hire in Kigali — What You Need to Know
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p>
              <strong className="text-gray-900">Long term car hire in Kigali</strong> is the most cost-effective way for expatriates, NGO workers, and business travellers to have reliable personal transport in Rwanda without the upfront cost of purchasing a vehicle. Kigali Car Hire offers flexible weekly and monthly car hire contracts tailored to the unique needs of the international community based in Rwanda.
            </p>
            <p>
              Our <strong className="text-gray-900">monthly car rental in Kigali</strong> starts from $600 per month for a comfortable economy saloon, $900 per month for compact SUVs such as the Toyota RAV4, and from $1,200 per month for rugged 4x4 vehicles needed for upcountry travel. All monthly car hire rates include unlimited mileage within Rwanda, comprehensive insurance, scheduled maintenance, and 24/7 roadside assistance.
            </p>
            <p>
              For organisations that need multiple vehicles — a fleet of cars for an NGO project, a programme vehicle for a UN agency field mission, or transport for a conference delegation — Kigali Car Hire offers fleet contracts with volume discounts and consolidated monthly billing. We are experienced in supplying vehicles to international humanitarian organisations across Rwanda and East Africa.
            </p>
            <p>
              <strong className="text-gray-900">Weekly car hire in Kigali</strong> is also available for medium-length stays of one to four weeks. Weekly rates are significantly cheaper than calculating the equivalent daily rate, making them the smart choice for researchers, consultants, journalists, and visitors spending 7 to 30 days in Rwanda.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
              { label: "Corporate Car Hire", href: "/corporate-car-hire-kigali" },
              { label: "NGO Car Hire Kigali", href: "/ngo-car-hire-kigali" },
              { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
              { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-plus-jakarta)]">
            Frequently Asked Questions — Long Term Car Hire Kigali
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Start Your Long Term Car Hire in Kigali Today
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Get a same-day quote for weekly or monthly car hire in Kigali. Delivery to any hotel, office, or airport address in Rwanda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-amber-700 px-8 py-4 rounded-lg font-bold hover:bg-amber-50 transition-all shadow-lg">
              Request Monthly Quote
            </Link>
            <a href="tel:+250788892976" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-amber-700 transition-all">
              Call +250 788 892 976
            </a>
          </div>
        </div>
      </section>
      <ServicePageFooter current="/long-term-car-hire-kigali" />
    </div>
  );
}
