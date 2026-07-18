import type { Metadata } from "next";
import ModernLayout from "@/components/ModernLayout";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kigali Car Rental",
  description:
    "Terms and conditions for renting a vehicle from Kigali Car Rental in Rwanda, including eligibility, payment, insurance, and cancellation policy.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ModernLayout title="Terms & Conditions" subtitle="Please read these terms carefully before renting a vehicle from us.">
      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">1. Rental Eligibility</h2>
          <p>
            To rent a vehicle, you must be at least 23 years of age, hold a valid driving license
            (an International Driving Permit is required for most foreign visitors in addition to
            your home license), and provide a valid passport or national ID at the time of pickup.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">2. Booking &amp; Payment</h2>
          <p>
            Bookings are confirmed once a deposit or full payment has been received, as agreed at
            the time of booking. Rates quoted are in USD unless otherwise stated and cover the
            vehicle only, unless additional services (driver, extra insurance, delivery) are
            specified.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">3. Insurance &amp; Liability</h2>
          <p>
            All vehicles include basic insurance coverage. The renter is responsible for the
            vehicle during the rental period and liable for damage, loss, or traffic violations
            incurred while the vehicle is in their possession, except where covered by the
            applicable insurance policy. Additional coverage options are available on request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">4. Fuel &amp; Mileage</h2>
          <p>
            Vehicles are provided with a full tank of fuel and should be returned with a full
            tank, unless otherwise agreed. Any specific mileage limits will be communicated
            clearly at the time of booking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">5. Cancellations &amp; Changes</h2>
          <p>
            Cancellation and refund terms depend on how far in advance you cancel relative to your
            pickup date. Contact us as early as possible if your plans change so we can advise on
            the applicable policy for your booking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">6. Vehicle Return</h2>
          <p>
            Vehicles must be returned on the agreed date, time, and location in the same condition
            as at pickup, ordinary wear and tear excepted. Late returns may incur additional
            charges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">7. Contact</h2>
          <p>
            Questions about these terms can be directed to us at{" "}
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
