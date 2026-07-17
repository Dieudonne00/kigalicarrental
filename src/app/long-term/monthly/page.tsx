import type { Metadata } from "next";
import MonthlyRentalClient from "./MonthlyRentalClient";

export const metadata: Metadata = {
  title: "Monthly Car Rental Kigali | Flexible Rwanda Rental Plans",
  description:
    "Monthly car rental in Kigali, Rwanda with flexible 1-12 month terms. All-inclusive rates with maintenance and insurance, save 15-30% vs daily rates. Corporate & NGO rates available.",
  alternates: {
    canonical: "/long-term/monthly",
  },
  openGraph: {
    title: "Monthly Car Rental Kigali | Flexible Rwanda Rental Plans",
    description:
      "Flexible monthly car rental subscriptions in Kigali, Rwanda. No long-term commitment. All-inclusive rates with maintenance and insurance.",
    url: "/long-term/monthly",
    type: "website",
  },
};

export default function MonthlyRentalPage() {
  return <MonthlyRentalClient />;
}
