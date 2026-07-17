import type { Metadata } from "next";
import ModernLayout from "@/components/ModernLayout";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Kigali Car Rental",
  description:
    "How Kigali Car Rental collects, uses, and protects your personal information when you book or inquire about our car rental services in Kigali, Rwanda.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ModernLayout title="Privacy Policy" subtitle="How we collect, use, and protect your information.">
      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Information We Collect</h2>
          <p>
            When you book a vehicle, request a quote, or contact us, we collect information such
            as your name, email address, phone number, and trip details (pickup/return dates and
            locations) so we can process your booking and communicate with you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">How We Use Your Information</h2>
          <p>
            We use the information you provide to confirm bookings, respond to inquiries, send
            booking-related updates, and improve our services. We do not sell your personal
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Data Sharing</h2>
          <p>
            We may share your information with trusted service providers who help us operate our
            business (for example, payment processing or email delivery), and only to the extent
            necessary to provide our services to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Data Security</h2>
          <p>
            We take reasonable steps to protect the personal information you share with us from
            unauthorized access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Your Choices</h2>
          <p>
            You can contact us at any time to ask what information we hold about you, to correct
            it, or to request that it be deleted, subject to any records we are required to keep
            for legal or accounting purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Contact</h2>
          <p>
            Questions about this policy can be directed to us at{" "}
            <a href={`mailto:${CONTACT.EMAIL}`} className="text-blue-600 font-semibold">
              {CONTACT.EMAIL}
            </a>{" "}
            or{" "}
            <a href={`tel:${CONTACT.PHONE}`} className="text-blue-600 font-semibold">
              {CONTACT.PHONE}
            </a>
            .
          </p>
        </section>
      </div>
    </ModernLayout>
  );
}
