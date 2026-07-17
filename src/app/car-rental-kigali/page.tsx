import type { Metadata } from "next";
import CarRentalKigaliClient from "./CarRentalKigaliClient";

export const metadata: Metadata = {
  title: "Car Rental Kigali - Best Car Hire Services in Kigali, Rwanda",
  description:
    "Rent a car in Kigali with free airport delivery, 24/7 support, and 50+ vehicles to choose from. Self-drive, chauffeur, and SUV rentals at the best rates in Kigali, Rwanda.",
  alternates: {
    canonical: "/car-rental-kigali",
  },
  openGraph: {
    title: "Car Rental Kigali - Best Car Hire Services in Kigali, Rwanda",
    description:
      "Rent a car in Kigali with free airport delivery, 24/7 support, and 50+ vehicles to choose from. Self-drive, chauffeur, and SUV rentals at the best rates in Kigali, Rwanda.",
    url: "/car-rental-kigali",
    type: "website",
  },
};

export default function CarRentalKigaliPage() {
  return <CarRentalKigaliClient />;
}
