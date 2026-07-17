import type { Metadata } from "next";
import CityTourDriverClient from "./CityTourDriverClient";

export const metadata: Metadata = {
  title: "City Tour Driver Kigali | Local Guide & Memorial Tours",
  description:
    "Professional city tour driver service in Kigali. Visit the Genocide Memorial, Kimironko Market, Caplaki Craft Village & Inema Arts Center with local guides.",
  alternates: {
    canonical: "/city-tour-driver",
  },
  openGraph: {
    title: "City Tour Driver Kigali | Local Guide & Memorial Tours",
    description:
      "Professional local drivers for Kigali city tours. Visit Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village, Inema Arts Center.",
    url: "/city-tour-driver",
    type: "website",
  },
};

export default function CityTourDriverPage() {
  return <CityTourDriverClient />;
}
