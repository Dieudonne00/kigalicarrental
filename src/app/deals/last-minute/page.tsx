import type { Metadata } from "next";
import LastMinuteDealsClient from "./LastMinuteDealsClient";

export const metadata: Metadata = {
  title: "Last Minute Car Rental Kigali | 30-Min Delivery Deals",
  description:
    "Need a car right now? Last-minute car rental deals in Kigali, Rwanda with 30-minute delivery anywhere in the city. Premium vehicles, professional driver included. Book instantly.",
  alternates: {
    canonical: "/deals/last-minute",
  },
  openGraph: {
    title: "Last Minute Car Rental Kigali | 30-Min Delivery Deals",
    description:
      "Last-minute car rental deals in Kigali with 30-minute delivery anywhere in the city. Premium vehicles, professional driver included.",
    url: "/deals/last-minute",
    type: "website",
  },
};

export default function LastMinuteDealsPage() {
  return <LastMinuteDealsClient />;
}
