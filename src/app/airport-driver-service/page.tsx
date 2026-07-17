import type { Metadata } from "next";
import AirportDriverServiceClient from "./AirportDriverServiceClient";

export const metadata: Metadata = {
  title: "Airport Driver Service Kigali | Meet & Greet KGL Chauffeur",
  description:
    "Professional airport driver service at Kigali International Airport (KGL). Meet & greet with name sign, flight tracking, 60 minutes free waiting. English & French speaking drivers. Book online 24/7.",
  alternates: {
    canonical: "/airport-driver-service",
  },
  openGraph: {
    title: "Airport Driver Service Kigali | Meet & Greet KGL Chauffeur",
    description:
      "Professional airport driver service at Kigali International Airport. Meet & greet, flight tracking, 60 min free waiting. Book your airport transfer online.",
    url: "/airport-driver-service",
    type: "website",
  },
};

export default function AirportDriverServicePage() {
  return <AirportDriverServiceClient />;
}
