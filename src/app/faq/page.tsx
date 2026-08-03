import { Metadata } from "next";
import FAQSection from "@/components/FAQSection";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "FAQ | Kigali Car Rental — Car Rental Questions Answered",
  description:
    "Answers to common questions about car hire in Kigali — pricing, self-drive, airport pickup, required documents, hotel delivery and cross-border travel.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/faq` },
  openGraph: {
    title: "FAQ | Kigali Car Rental",
    description: "Answers to common questions about car hire in Kigali, Rwanda.",
    url: `${SITE}/faq`,
    siteName: "Kigali Car Rental",
    images: [{ url: `${SITE}/opengraph-image`, width: 1200, height: 630, alt: "Kigali Car Rental FAQ" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does car hire in Kigali cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kigali Car Rental prices start from $30 per day for economy cars. SUVs and 4x4s range from $60 to $120 per day. Discounted weekly and monthly rates are available.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer self-drive car hire in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Rental offers self-drive rentals to customers with a valid driving licence, so you can explore Rwanda at your own pace.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get an airport pickup from Kigali International Airport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kigali Car Rental provides 24/7 airport pickup and drop-off at Kigali International Airport with fixed pricing and no surprise fees.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need to rent a car in Kigali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A valid driving licence (International Driving Permit recommended for foreign visitors), a passport or national ID, and a deposit paid by mobile money, bank transfer or cash.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="text-center pt-16 md:pt-24 px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Everything you need to know about renting a car with Kigali Car Rental.
          </p>
        </div>
        <FAQSection />
      </div>
    </>
  );
}
