// app/akagera-safari-rental/page.tsx
import type { Metadata } from "next";
import AkageraSafariRentalClient from "./AkageraSafariRentalClient";

export const metadata: Metadata = {
  title: "Akagera Safari Rental | 4x4 Vehicles for Game Drives",
  description:
    "Rent 4x4 safari vehicles for Akagera National Park, Rwanda. Land Cruiser with pop-up roof, game viewing seats. Self-drive or guided Big Five safaris available.",
  alternates: {
    canonical: "/akagera-safari-rental",
  },
  openGraph: {
    title: "Akagera Safari Rental | 4x4 Vehicles for Game Drives",
    description:
      "Rent 4x4 safari vehicles for Akagera National Park, Rwanda. Land Cruiser with pop-up roof, game viewing seats. Self-drive or guided Big Five safaris available.",
    url: "/akagera-safari-rental",
    type: "website",
  },
};

export default function AkageraSafariRentalPage() {
  return <AkageraSafariRentalClient />;
}
