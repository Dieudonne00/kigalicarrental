// app/event-transport-driver/page.tsx
import type { Metadata } from "next";
import EventTransportDriverClient from "./EventTransportDriverClient";

export const metadata: Metadata = {
  title: "Event Transport Driver Kigali | Wedding & Conference Cars",
  description:
    "Professional event transport drivers in Kigali for weddings, conferences, corporate events and parties. Luxury cars, formal attire, decoration allowed. Book today.",
  alternates: {
    canonical: "/event-transport-driver",
  },
  openGraph: {
    title: "Event Transport Driver Kigali | Wedding & Conference Cars",
    description:
      "Professional event transport drivers in Kigali for weddings, conferences, corporate events and parties. Luxury cars, formal attire, decoration allowed. Book today.",
    url: "/event-transport-driver",
    type: "website",
  },
};

export default function EventTransportDriverPage() {
  return <EventTransportDriverClient />;
}
