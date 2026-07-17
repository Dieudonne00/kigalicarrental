// app/kigali-airport-car-rental/page.tsx
import type { Metadata } from "next";
import KigaliAirportCarRentalClient from "./KigaliAirportCarRentalClient";

export const metadata: Metadata = {
  title: "Kigali Airport Car Rental | KGL Meet & Greet Pickup",
  description:
    "Rent a car at Kigali International Airport (KGL) with free meet & greet pickup. Your vehicle ready when you land, 24/7 airport service. Book now.",
  alternates: {
    canonical: "/kigali-airport-car-rental",
  },
  openGraph: {
    title: "Kigali Airport Car Rental | KGL Meet & Greet Pickup",
    description:
      "Rent a car at Kigali International Airport (KGL) with free meet & greet pickup. Your vehicle ready when you land, 24/7 airport service. Book now.",
    url: "/kigali-airport-car-rental",
    type: "website",
  },
};

export default function KigaliAirportCarRentalPage() {
  return <KigaliAirportCarRentalClient />;
}
