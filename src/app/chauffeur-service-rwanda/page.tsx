import type { Metadata } from "next";
import ChauffeurServiceRwandaClient from "./ChauffeurServiceRwandaClient";

export const metadata: Metadata = {
  title: "Chauffeur Service Rwanda | Professional Driver Hire",
  description:
    "Premium chauffeur service across Rwanda. Professional English-speaking drivers for airport transfers, corporate travel, weddings, city tours, and safaris.",
  alternates: {
    canonical: "/chauffeur-service-rwanda",
  },
  openGraph: {
    title: "Chauffeur Service Rwanda | Professional Driver Hire",
    description:
      "Premium chauffeur service across Rwanda. Professional English-speaking drivers for airport transfers, corporate travel, weddings, city tours, and safaris.",
    url: "/chauffeur-service-rwanda",
    type: "website",
  },
};

export default function ChauffeurServiceRwandaPage() {
  return <ChauffeurServiceRwandaClient />;
}
