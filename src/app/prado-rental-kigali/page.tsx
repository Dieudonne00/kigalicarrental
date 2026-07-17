import type { Metadata } from "next";
import PradoRentalKigaliClient from "./PradoRentalKigaliClient";

export const metadata: Metadata = {
  title: "Prado Rental Kigali | Toyota Land Cruiser Prado for Safari",
  description:
    "Toyota Land Cruiser Prado rental in Kigali for safari and gorilla trekking across Rwanda. 7-seater 4x4 SUV with pop-up roofs and camping gear included.",
  alternates: {
    canonical: "/prado-rental-kigali",
  },
  openGraph: {
    title: "Prado Rental Kigali | Toyota Land Cruiser Prado for Safari",
    description:
      "Toyota Land Cruiser Prado rental for safari and national park adventures. 7-seater luxury SUV with 4x4 capability. Pop-up roofs, camping gear.",
    url: "/prado-rental-kigali",
    type: "website",
  },
};

export default function PradoRentalKigaliPage() {
  return <PradoRentalKigaliClient />;
}
