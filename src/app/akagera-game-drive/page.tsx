import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import AkageraGameDriveClient from "./AkageraGameDriveClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

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

export default async function AkageraGameDrivePage() {
  const cars = await prisma.car.findMany({
    where: { available: true, gameDrive: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return (
    <>
      <AkageraGameDriveClient initialCars={initialCars} />
      <HomeLinkCTA before="Planning more than a game drive? See the full" after="lineup for your Rwanda trip." />
    </>
  );
}
