import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Book Now | Kigali Car Rental",
  description:
    "Book your Kigali car rental online in minutes. Choose your vehicle, pickup date, and location — self-drive or chauffeur-driven, from $35/day.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/book-now` },
  openGraph: {
    title: "Book Now | Kigali Car Rental",
    description: "Book your Kigali car rental online in minutes. Self-drive or chauffeur-driven, from $35/day.",
    url: `${SITE}/book-now`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
  },
};

export default function BookNowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
