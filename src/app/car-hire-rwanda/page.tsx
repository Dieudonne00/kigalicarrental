// app/car-hire-rwanda/page.tsx
import type { Metadata } from "next";
import CarHireRwandaClient from "./CarHireRwandaClient";

export const metadata: Metadata = {
  title: "Car Hire Rwanda | Nationwide Vehicle Rental Fleet",
  description:
    "Hire a car anywhere in Rwanda from Kigali. Wide fleet of SUVs, 4x4s, sedans, and minibuses with free delivery and 24/7 support. Book your Rwanda car hire today.",
  alternates: {
    canonical: "/car-hire-rwanda",
  },
  openGraph: {
    title: "Car Hire Rwanda | Nationwide Vehicle Rental Fleet",
    description:
      "Hire a car anywhere in Rwanda from Kigali. Wide fleet of SUVs, 4x4s, sedans, and minibuses with free delivery and 24/7 support. Book your Rwanda car hire today.",
    url: "/car-hire-rwanda",
    type: "website",
  },
};

export default function CarHireRwandaPage() {
  return <CarHireRwandaClient />;
}
