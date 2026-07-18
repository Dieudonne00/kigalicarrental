// app/cheap-car-rental-kigali/page.tsx
import type { Metadata } from "next";
import CheapCarRentalKigaliClient from "./CheapCarRentalKigaliClient";

export const metadata: Metadata = {
  title: "Cheap Car Rental Kigali | Budget Cars From $25/Day",
  description:
    "Affordable Kigali car rental from $25/day. Budget-friendly economy cars, free delivery, no hidden fees, and full insurance included. Book cheap today.",
  alternates: {
    canonical: "/cheap-car-rental-kigali",
  },
  openGraph: {
    title: "Cheap Car Rental Kigali | Budget Cars From $25/Day",
    description:
      "Affordable Kigali car rental from $25/day. Budget-friendly economy cars, free delivery, no hidden fees, and full insurance included. Book cheap today.",
    url: "/cheap-car-rental-kigali",
    type: "website",
  },
};

export default function CheapCarRentalKigaliPage() {
  return <CheapCarRentalKigaliClient />;
}
