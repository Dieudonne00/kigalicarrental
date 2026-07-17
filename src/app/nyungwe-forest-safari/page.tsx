import type { Metadata } from "next";
import NyungweForestSafariClient from "./NyungweForestSafariClient";

export const metadata: Metadata = {
  title: "Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk Vehicles",
  description:
    "Rent safari vehicles for Nyungwe Forest National Park, Rwanda. Toyota Land Cruiser & Prado for chimpanzee tracking, canopy walk, bird watching. 5-hour drive from Kigali. Book today.",
  alternates: {
    canonical: "/nyungwe-forest-safari",
  },
  openGraph: {
    title: "Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk Vehicles",
    description:
      "Rent vehicles for chimpanzee tracking and canopy walk in Nyungwe National Park. Toyota Land Cruiser with high clearance for forest terrain.",
    url: "/nyungwe-forest-safari",
    type: "website",
    images: ["https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200"],
  },
};

export default function NyungweForestSafariPage() {
  return <NyungweForestSafariClient />;
}
