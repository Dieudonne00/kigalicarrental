import type { Metadata } from "next";
import DriverCarHireKigaliClient from "./DriverCarHireKigaliClient";

export const metadata: Metadata = {
  title: "Driver Car Hire Kigali | Professional Chauffeur Rwanda",
  description:
    "Driver car hire in Kigali with professional English & French-speaking chauffeurs. Airport transfers, city tours, safari drives, and business travel in Rwanda.",
  alternates: {
    canonical: "/driver-car-hire-kigali",
  },
  openGraph: {
    title: "Driver Car Hire Kigali | Professional Chauffeur Rwanda",
    description:
      "Driver car hire in Kigali with professional English & French-speaking chauffeurs. Airport transfers, city tours, safari drives, and business travel in Rwanda.",
    url: "/driver-car-hire-kigali",
    type: "website",
  },
};

export default function DriverCarHireKigaliPage() {
  return <DriverCarHireKigaliClient />;
}
