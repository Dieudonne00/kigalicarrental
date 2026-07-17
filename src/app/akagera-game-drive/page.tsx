import type { Metadata } from "next";
import AkageraGameDriveClient from "./AkageraGameDriveClient";

export const metadata: Metadata = {
  title: "Akagera Game Drive Car Rental | Self-Drive Safari Rwanda",
  description:
    "Rent a self-drive 4x4 for Akagera National Park, Rwanda. Explore lions, elephants, and rhinos at your own pace. Book your Akagera game drive vehicle today.",
  alternates: {
    canonical: "/akagera-game-drive",
  },
  openGraph: {
    title: "Akagera Game Drive Car Rental | Self-Drive Safari Rwanda",
    description:
      "Rent a self-drive 4x4 for Akagera National Park, Rwanda. Explore lions, elephants, and rhinos at your own pace. Book your Akagera game drive vehicle today.",
    url: "/akagera-game-drive",
    type: "website",
  },
};

export default function AkageraGameDrivePage() {
  return <AkageraGameDriveClient />;
}
