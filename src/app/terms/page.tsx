import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kigali Car Rental",
  description:
    "Terms and conditions for renting a vehicle from Kigali Car Rental — Rwanda's trusted car rental service. Booking, payment, deposit, insurance and cancellation policy.",
  alternates: { canonical: `${SITE}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms & Conditions | Kigali Car Rental",
    description: "Booking, payment, deposit, insurance and cancellation terms for Kigali Car Rental rentals.",
    url: `${SITE}/terms`,
    siteName: "Kigali Car Rental",
    images: [{ url: `${SITE}/opengraph-image`, width: 1200, height: 630, alt: "Kigali Car Rental Terms & Conditions" }],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
          Terms &amp; Conditions
        </h1>
        <p className="text-gray-500 mb-10">Last updated: July 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Booking &amp; Confirmation</h2>
            <p>
              A booking with Kigali Car Rental is confirmed once we send written confirmation by WhatsApp,
              phone or email. Bookings can be made online at kigalicarrental.site/book-now, by phone/WhatsApp
              on +250 787 619 387, or by email at info@kigalicarrental.site. We confirm all requests
              within 30 minutes during business hours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Eligibility &amp; Documents</h2>
            <p>
              Renters must be at least 23 years old and hold a valid driving licence (an International
              Driving Permit is recommended for foreign visitors) plus a passport or national ID. Drivers
              without a full licence cannot be added to a self-drive rental.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Payment &amp; Deposit</h2>
            <p>
              We accept MTN Mobile Money, Airtel Money, bank transfer and cash. A refundable security
              deposit is required for self-drive rentals and is returned in full at the end of the rental
              period, subject to the vehicle being returned in its original condition with a full fuel tank.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Insurance</h2>
            <p>
              All rentals include third-party insurance. The renter is responsible for any damage caused
              by negligence, reckless driving, or driving under the influence of alcohol or drugs, which
              is not covered by insurance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Fuel Policy</h2>
            <p>
              Vehicles are provided with a full tank of fuel and must be returned with a full tank. A
              refuelling charge plus service fee applies if the vehicle is returned with less fuel than
              at pickup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">6. Cancellations</h2>
            <p>
              Cancellations made more than 48 hours before the pickup time receive a full refund of any
              deposit paid. Cancellations within 48 hours of pickup may be subject to a cancellation fee
              to cover vehicle preparation costs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">7. Cross-Border Travel</h2>
            <p>
              Cross-border travel to Uganda, Tanzania, Kenya, Burundi or DRC must be approved in advance
              so we can arrange the correct permits and cross-border insurance. Unauthorised cross-border
              travel voids insurance coverage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">8. Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
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
