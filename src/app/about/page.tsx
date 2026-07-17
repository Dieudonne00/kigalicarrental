import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Kigali Car Rental",
  description:
    "Learn about Kigali Car Rentals, Rwanda's trusted provider of premium, affordable car hire — reliable vehicles, transparent pricing, and 24/7 support.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Kigali Car Rental",
    description:
      "Learn about Kigali Car Rentals, Rwanda's trusted provider of premium, affordable car hire — reliable vehicles, transparent pricing, and 24/7 support.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
