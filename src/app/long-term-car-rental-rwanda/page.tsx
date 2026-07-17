import type { Metadata } from "next";
import LongTermCarRentalRwandaClient from "./LongTermCarRentalRwandaClient";

export const metadata: Metadata = {
  title: "Long Term Car Rental Rwanda | Monthly Rates from $800",
  description:
    "Monthly and quarterly car rental in Rwanda from $800/month, all-inclusive with free maintenance and insurance. Ideal for NGOs, embassies, corporates, and expats in Kigali.",
  alternates: {
    canonical: "/long-term-car-rental-rwanda",
  },
  openGraph: {
    title: "Long Term Car Rental Rwanda | Monthly Rates from $800",
    description:
      "Monthly and quarterly car rental in Rwanda from $800/month, all-inclusive with free maintenance and insurance. Ideal for NGOs, embassies, corporates, and expats in Kigali.",
    url: "/long-term-car-rental-rwanda",
    type: "website",
  },
};

export default function LongTermCarRentalRwandaPage() {
  return <LongTermCarRentalRwandaClient />;
}
