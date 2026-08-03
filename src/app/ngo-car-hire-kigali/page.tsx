import { Metadata } from "next";
import Link from "next/link";
import ServicePageFooter from "@/components/ServicePageFooter";

const SITE = "https://kigalicarhire.rw";

export const metadata: Metadata = {
  title: "NGO Car Hire Kigali | UN Agency Vehicle Hire Rwanda | Embassy Car Rental - Kigali Car Hire",
  description:
    "NGO car hire in Kigali for UN agencies, INGOs, embassies, and diplomatic missions in Rwanda. Monthly contracts, fleet hire, VAT exemption invoicing, and 24/7 support. Kigali Car Hire — trusted by the international community since 1990.",
  keywords:
    "ngo car hire kigali, un car hire rwanda, embassy car hire kigali, ingo vehicle hire rwanda, humanitarian car hire kigali, ngo car rental rwanda, un agency car hire kigali, ngo transport kigali, diplomatic car hire rwanda, humanitarian vehicle rwanda, ngo fleet hire kigali, unhcr car hire rwanda, undp car hire rwanda, world bank car hire kigali, red cross car hire rwanda, ngo car hire rwanda monthly, international organisation car hire kigali, programme vehicle hire rwanda",
  alternates: { canonical: `${SITE}/ngo-car-hire-kigali` },
  openGraph: {
    title: "NGO Car Hire Kigali | UN Agency Vehicle Hire Rwanda | Embassy Car Rental",
    description:
      "NGO and UN agency car hire in Kigali. Monthly contracts, fleet hire, and VAT exemption invoicing for humanitarian and diplomatic organisations in Rwanda.",
    url: `${SITE}/ngo-car-hire-kigali`,
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
      name: "Do you offer NGO car hire contracts in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Hire has dedicated vehicle hire contracts for NGOs, INGOs, UN agencies, and humanitarian organisations working in Rwanda. We offer monthly invoicing, consolidated billing for multi-vehicle fleets, and documentation for VAT exemption for qualifying international organisations.",
      },
    },
    {
      "@type": "Question",
      name: "Which UN agencies and NGOs do you work with in Rwanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kigali Car Hire provides vehicles for staff from UNHCR, UNDP, UNICEF, WFP, WHO, the African Development Bank, the World Bank, Oxfam, Save the Children, MSF, Partners In Health, GIZ, USAID implementing partners, and many other international organisations operating in Rwanda.",
      },
    },
    {
      "@type": "Question",
      name: "Can you provide programme vehicles for NGO field work in Rwanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We supply rugged 4x4 programme vehicles — including Toyota Land Cruiser and Land Cruiser Prado — for NGO field operations throughout Rwanda. Programme vehicles can be hired with or without a professional driver and are available for long-term monthly contracts or short-term project deployments.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide VAT exemption documentation for NGO car hire in Rwanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Hire works with the Rwanda Revenue Authority exemption process and can provide documentation supporting VAT exemption claims for qualifying international organisations and diplomatic missions. Contact us with your organisation's exemption letter and we will process the required paperwork.",
      },
    },
    {
      "@type": "Question",
      name: "Can we hire a fleet of cars for a humanitarian operation in Rwanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Hire can supply fleets of 2 to 20 vehicles for NGO operations, emergency responses, and large-scale field missions anywhere in Rwanda. Fleet contracts include a dedicated operations coordinator, consolidated monthly invoicing, and a replacement vehicle guarantee.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kigali Car Hire", item: SITE },
    { "@type": "ListItem", position: 2, name: "NGO Car Hire Kigali", item: `${SITE}/ngo-car-hire-kigali` },
  ],
};

const orgs = [
  "UNHCR — UN Refugee Agency",
  "UNDP — UN Development Programme",
  "UNICEF — UN Children's Fund",
  "WFP — World Food Programme",
  "WHO — World Health Organisation",
  "World Bank and IFC",
  "African Development Bank (AfDB)",
  "African Union (AU) delegations",
  "East African Community (EAC)",
  "USAID and implementing partners",
  "GIZ — German Development Agency",
  "Oxfam, Save the Children, CARE",
  "MSF — Medecins Sans Frontieres",
  "Partners In Health (PIH)",
  "International Committee of the Red Cross (ICRC)",
  "EU delegations and missions",
];

const vehicles = [
  { name: "Toyota Land Cruiser 78 / 79 Series", desc: "Heavy-duty 4x4 for remote field operations, upcountry, and off-road routes", price: "From $1,800/month" },
  { name: "Toyota Land Cruiser Prado", desc: "Comfortable programme vehicle for field supervisors and country directors", price: "From $1,400/month" },
  { name: "Toyota RAV4 / Prado 120", desc: "Versatile SUV for city and light off-road use", price: "From $900/month" },
  { name: "Toyota Hilux Double Cabin", desc: "Pick-up truck for logistics, equipment transport, and field support", price: "From $1,200/month" },
  { name: "Super Custom 14-Seater", desc: "Minibus for team transport, airport runs, and stakeholder visits", price: "From $1,600/month" },
  { name: "Economy Saloon (Corolla / Vitz)", desc: "City transport for programme officers and admin staff", price: "From $600/month" },
];

export default function NgoCarHireKigaliPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-700 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white">NGO Car Hire Kigali</li>
            </ol>
          </nav>
          <span className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-6 border border-white/20">
            For NGOs, UN Agencies and Embassies
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">
            NGO Car Hire Kigali
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
            Dedicated vehicle hire for UN agencies, INGOs, embassies, and humanitarian organisations in Rwanda. Monthly contracts, fleet hire, and programme vehicles.
          </p>
          <p className="text-base text-white/75 max-w-2xl mx-auto mb-10">
            Trusted by the international community in Rwanda. VAT exemption documentation available. 24/7 operations support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg">
              Request NGO Quote
            </Link>
            <a href="mailto:kigalicarhire1990@gmail.com" className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all border border-white/30">
              Email Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "35+", label: "Years in Rwanda" },
              { num: "4.9/5", label: "Google Rating" },
              { num: "38", label: "Verified Reviews" },
              { num: "24/7", label: "Operations Support" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-blue-700">{s.num}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle fleet */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
              Programme Vehicles for NGOs in Rwanda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From rugged field 4x4s to comfortable programme vehicles and airport minibuses — all available on monthly NGO contracts with full insurance and maintenance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map((v) => (
              <div key={v.name} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-400 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{v.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{v.desc}</p>
                <p className="text-blue-700 font-bold text-sm">{v.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5 font-[family-name:var(--font-plus-jakarta)]">
                Rwanda's Trusted NGO Vehicle Hire Service
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Kigali is home to over 300 international NGOs, UN agencies, and humanitarian organisations — making it one of Africa's busiest aid and development hubs. Kigali Car Hire has been providing <strong className="text-gray-900">NGO vehicle hire in Rwanda</strong> since 1990 and understands the specific requirements of the international community.
                </p>
                <p>
                  Our <strong className="text-gray-900">NGO car hire contracts</strong> are structured around the way humanitarian organisations work: monthly billing cycles, consolidated invoices for multi-vehicle fleets, replacement vehicle guarantees so your programme never loses transport, and documentation supporting VAT exemption for qualifying international organisations.
                </p>
                <p>
                  Programme vehicles — especially Toyota Land Cruiser 4x4s — are available for long-term deployment to field offices across Rwanda. We supply vehicles to organisations working in Musanze, Rubavu, Huye, Nyamata, Kayonza, and all provincial towns. Our drivers hold professional licences and are background-checked for sensitivity-appropriate deployments.
                </p>
                <p>
                  For <strong className="text-gray-900">embassy and diplomatic mission car hire in Kigali</strong>, we offer white-plate and personalised-registration vehicles with professional uniformed drivers where required. All diplomatic vehicles are maintained to the highest standard and can be fitted with additional safety equipment on request.
                </p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/book-now" className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all">
                  Request Fleet Quote
                </Link>
                <Link href="/long-term-car-hire-kigali" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:border-blue-500 hover:text-blue-700 transition-all">
                  Monthly Rate Table
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg font-[family-name:var(--font-plus-jakarta)]">
                  Organisations We Serve
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {orgs.map((org) => (
                    <div key={org} className="flex items-start gap-2 text-xs text-gray-700">
                      <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                      {org}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">NGO Contract Benefits</h3>
                <ul className="space-y-3">
                  {[
                    "Monthly invoicing and end-of-month consolidated billing",
                    "VAT exemption documentation for qualifying organisations",
                    "Replacement vehicle within 4 hours if breakdown occurs",
                    "Dedicated account manager for your organisation",
                    "Fleet scaling — add or remove vehicles mid-contract",
                    "Professional, background-checked drivers available",
                    "Vehicles can be branded with organisation logo",
                    "24/7 operations support via phone and WhatsApp",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-plus-jakarta)]">
            Frequently Asked Questions — NGO Car Hire Kigali
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

      {/* Internal links */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-bold text-gray-900 mb-4">Related Kigali Car Hire Services</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Corporate Car Hire Kigali", href: "/corporate-car-hire-kigali" },
              { label: "Long Term Car Hire Kigali", href: "/long-term-car-hire-kigali" },
              { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
              { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
              { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Set Up Your NGO Car Hire Contract Today
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Contact our team with your organisation name, required vehicles, and deployment dates. We respond within 2 hours with a full proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:kigalicarhire1990@gmail.com" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg">
              Email Our Operations Team
            </a>
            <a href="https://wa.me/250788892976" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition-all">
              WhatsApp +250 788 892 976
            </a>
          </div>
        </div>
      </section>
      <ServicePageFooter current="/ngo-car-hire-kigali" />
    </div>
  );
}
