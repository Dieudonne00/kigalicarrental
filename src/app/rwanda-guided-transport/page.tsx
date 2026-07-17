import type { Metadata } from "next";
import RwandaGuidedTransportClient from "./RwandaGuidedTransportClient";

export const metadata: Metadata = {
  title: "Rwanda Guided Transport | Gorilla Trekking & Safari Tours",
  description:
    "Professional tour guide plus vehicle packages for Rwanda. Gorilla trekking in Volcanoes NP, safari in Akagera, chimpanzee tracking in Nyungwe with local guides.",
  alternates: {
    canonical: "/rwanda-guided-transport",
  },
  openGraph: {
    title: "Rwanda Guided Transport | Gorilla Trekking & Safari Tours",
    description:
      "Professional tour guide + vehicle packages for gorilla trekking, safari, cultural tours. English/French guides, 4x4 vehicles.",
    url: "/rwanda-guided-transport",
    type: "website",
  },
};

export default function RwandaGuidedTransportPage() {
  return <RwandaGuidedTransportClient />;
}
