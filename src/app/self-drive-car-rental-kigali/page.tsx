import type { Metadata } from "next";
import SelfDriveCarRentalKigaliClient from "./SelfDriveCarRentalKigaliClient";

export const metadata: Metadata = {
  title: "Self Drive Car Rental Kigali | Rent Without Driver",
  description:
    "Self drive Kigali car rental. Rent a car without a driver and explore Rwanda freely - economy cars, SUVs, and 4x4s with unlimited mileage and free delivery.",
  alternates: {
    canonical: "/self-drive-car-rental-kigali",
  },
  openGraph: {
    title: "Self Drive Car Rental Kigali | Rent Without Driver",
    description:
      "Self drive Kigali car rental. Rent a car without a driver and explore Rwanda freely - economy cars, SUVs, and 4x4s with unlimited mileage and free delivery.",
    url: "/self-drive-car-rental-kigali",
    type: "website",
  },
};

export default function SelfDriveCarRentalKigaliPage() {
  return <SelfDriveCarRentalKigaliClient />;
}
