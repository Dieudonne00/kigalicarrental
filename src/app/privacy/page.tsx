import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Privacy Policy | Kigali Car Rental",
  description:
    "Privacy policy for Kigali Car Rental — how we collect, use and protect your personal information when you book a car rental in Rwanda.",
  alternates: { canonical: `${SITE}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | Kigali Car Rental",
    description: "How Kigali Car Rental collects, uses and protects your personal information.",
    url: `${SITE}/privacy`,
    siteName: "Kigali Car Rental",
    images: [{ url: `${SITE}/opengraph-image`, width: 1200, height: 630, alt: "Kigali Car Rental Privacy Policy" }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-10">Last updated: July 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              When you book a car with Kigali Car Rental we collect your name, phone number, email address,
              driving licence and ID/passport details, and payment information necessary to process your
              rental and refundable deposit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>
              Your information is used to confirm bookings, verify identity and driving eligibility,
              process payments, arrange airport pickups and hotel delivery, and to contact you about your
              rental. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Payment Information</h2>
            <p>
              Mobile money and bank transfer payments are processed through MTN Mobile Money, Airtel Money
              and our banking partners. Kigali Car Rental does not store your mobile money PIN or full bank
              account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Data Sharing</h2>
            <p>
              We may share limited booking details with vehicle owners for fleet management purposes, and
              with relevant authorities where required for cross-border travel permits or insurance claims.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Data Retention</h2>
            <p>
              Booking and identification records are retained for as long as needed to comply with
              Rwandan tax and business record-keeping requirements, and are then securely deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">6. Cookies &amp; Analytics</h2>
            <p>
              Our website uses cookies and analytics tools to understand how visitors use the site and to
              improve our services. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">7. Your Rights</h2>
            <p>
              You can request a copy of the personal information we hold about you, or ask us to correct
              or delete it, by contacting us at the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">8. Contact</h2>
            <p>
              For privacy questions or data requests, contact{" "}
              <a href="mailto:info@kigalicarrental.site" className="text-[#1e3a8a] font-semibold hover:underline">
                info@kigalicarrental.site
              </a>{" "}
              or WhatsApp{" "}
              <a href="https://wa.me/250787619387" className="text-[#1e3a8a] font-semibold hover:underline">
                +250 787 619 387
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
