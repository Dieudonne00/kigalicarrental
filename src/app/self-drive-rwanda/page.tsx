import type { Metadata } from "next";
import SelfDriveRwandaClient from "./SelfDriveRwandaClient";

export const metadata: Metadata = {
  title: "Self Drive Car Rental Rwanda | No Chauffeur Needed",
  description:
    "Rent a self-drive car in Rwanda with unlimited mileage, free GPS, and 24/7 roadside support. Explore Kigali, Volcanoes NP, Akagera, and Lake Kivu at your own pace.",
  alternates: {
    canonical: "/self-drive-rwanda",
  },
  openGraph: {
    title: "Self Drive Car Rental Rwanda | No Chauffeur Needed",
    description:
      "Rent a self-drive car in Rwanda with unlimited mileage, free GPS, and 24/7 roadside support. Explore Kigali, Volcanoes NP, Akagera, and Lake Kivu at your own pace.",
    url: "/self-drive-rwanda",
    type: "website",
  },
};

export default function SelfDriveRwandaPage() {
  return <SelfDriveRwandaClient />;
}
