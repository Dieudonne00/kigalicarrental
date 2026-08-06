import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Akagera Safari Car Hire | Self-Drive Game Drive Vehicles - Kigali Car Rental",
  description:
    "Kigali Car Rental self-drive vehicles for Akagera National Park game drives. 4x4 SUVs and Land Cruisers, insured and ready for lions, elephants, and rhinos. From $30/day.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/akagera-game-drive` },
  openGraph: {
    title: "Akagera Safari Car Hire | Self-Drive Game Drive Vehicles",
    description:
      "Self-drive vehicles for Akagera National Park game drives from Kigali Car Rental. 4x4 SUVs and Land Cruisers, fully insured.",
    url: `${SITE}/akagera-game-drive`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
  },
};

export default function AkageraGameDriveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
