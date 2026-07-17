import type { Metadata } from "next";
import Link from "next/link";
import ModernLayout from "@/components/ModernLayout";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ - Car Rental Kigali Questions Answered | Kigali Car Rental",
  description:
    "Answers to common questions about renting a car in Kigali, Rwanda: documents needed, airport pickup, self-drive vs chauffeur, payment, insurance, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Car Rental Kigali Questions Answered",
    description:
      "Answers to common questions about renting a car in Kigali, Rwanda: documents needed, airport pickup, self-drive vs chauffeur, payment, insurance, and more.",
    url: "/faq",
    type: "website",
  },
};

const faqs = [
  {
    question: "What documents do I need to rent a car in Kigali?",
    answer:
      "You'll need a valid driving license (an International Driving Permit is recommended for foreign visitors, alongside your home license), a valid passport or national ID, and a means of payment. For self-drive rentals, you must be at least 23 years old with at least 2 years of driving experience.",
  },
  {
    question: "Do you offer airport pickup at Kigali International Airport (KGL)?",
    answer:
      "Yes. We offer pickup and delivery at Kigali International Airport. Provide your flight details when booking and our team will meet you on arrival.",
  },
  {
    question: "What's the difference between self-drive and chauffeur-driven rental?",
    answer:
      "Self-drive means you drive the vehicle yourself for the duration of your rental. Chauffeur-driven means one of our professional drivers drives you, which is popular for airport transfers, business travel, and multi-day safari trips where local road knowledge is valuable.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, mobile money, and bank transfer. Contact us in advance if you need to arrange a specific payment method for a corporate or long-term booking.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Every vehicle in our fleet includes basic insurance coverage. Additional coverage options are available on request — ask our team when booking if you'd like more comprehensive protection.",
  },
  {
    question: "Can I rent a car for one-way travel or cross-border trips?",
    answer:
      "One-way rentals within Rwanda and cross-border trips (e.g. to Uganda or Tanzania) may be possible depending on the vehicle and season. Contact us directly to confirm availability, required permits, and any additional fees before booking.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-3 days in advance, especially during peak tourist season (June-September and December-February) or if you need a specific vehicle type such as a 4x4 for gorilla trekking or safari travel.",
  },
  {
    question: "Do you offer long-term or monthly car rental?",
    answer:
      "Yes, we offer discounted weekly and monthly rates for long-term rentals. See our monthly rental page or contact us for a custom corporate rate.",
  },
];

export default function FaqPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <ModernLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about renting a car with us in Kigali, Rwanda."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
            <h2 className="text-xl font-bold text-blue-900 mb-2">{faq.question}</h2>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Still have questions?</h2>
        <p className="text-gray-600 mb-4">
          Call us at{" "}
          <a href={`tel:${CONTACT.PHONE}`} className="font-semibold text-blue-600">
            {CONTACT.PHONE}
          </a>{" "}
          or reach out online.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </ModernLayout>
  );
}
