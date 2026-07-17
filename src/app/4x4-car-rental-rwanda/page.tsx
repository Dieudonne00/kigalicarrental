import type { Metadata } from "next";
import FourXFourCarRentalRwandaClient from "./FourXFourCarRentalRwandaClient";

export const metadata: Metadata = {
  title: "4x4 Car Rental Rwanda | Land Cruiser, Land Rover & Safari 4x4s",
  description:
    "Specialized 4x4 and off-road vehicle rental in Rwanda for Akagera, Volcanoes & Nyungwe National Parks. Toyota Land Cruiser, Land Rover Defender, Range Rover. Camping gear & recovery kit included.",
  alternates: {
    canonical: "/4x4-car-rental-rwanda",
  },
  openGraph: {
    title: "4x4 Car Rental Rwanda | Land Cruiser, Land Rover & Safari 4x4s",
    description:
      "Specialized off-road vehicles for Akagera, Volcanoes & Nyungwe National Parks. Roof tents, camping gear, recovery kit. Book your safari vehicle today.",
    url: "/4x4-car-rental-rwanda",
    type: "website",
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200"],
  },
};

export default function FourXFourCarRentalRwandaPage() {
  return <FourXFourCarRentalRwandaClient />;
}
