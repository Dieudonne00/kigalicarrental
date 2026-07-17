// app/business-driver-service/page.tsx
import type { Metadata } from "next";
import BusinessDriverServiceClient from "./BusinessDriverServiceClient";

export const metadata: Metadata = {
  title: "Business Driver Service Kigali | Executive Chauffeur Rwanda",
  description:
    "Professional business driver service in Kigali. Executive chauffeurs for meetings, airport transfers and conferences. Luxury cars, WiFi, flight tracking included.",
  alternates: {
    canonical: "/business-driver-service",
  },
  openGraph: {
    title: "Business Driver Service Kigali | Executive Chauffeur Rwanda",
    description:
      "Professional business driver service in Kigali. Executive chauffeurs for meetings, airport transfers and conferences. Luxury cars, WiFi, flight tracking included.",
    url: "/business-driver-service",
    type: "website",
  },
};

export default function BusinessDriverServicePage() {
  return <BusinessDriverServiceClient />;
}
