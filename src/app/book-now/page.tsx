import type { Metadata } from "next";
import BookNowClient from "./BookNowClient";

export const metadata: Metadata = {
  title: "Book a Car Rental in Kigali | Free Quote in 2 Hours",
  description:
    "Book your car rental in Kigali, Rwanda in minutes. Tell us your dates, preferences, and budget, and our team will send a tailored quote within 2 hours.",
  alternates: {
    canonical: "/book-now",
  },
  openGraph: {
    title: "Book a Car Rental in Kigali | Free Quote in 2 Hours",
    description:
      "Book your car rental in Kigali, Rwanda in minutes. Tell us your dates, preferences, and budget, and our team will send a tailored quote within 2 hours.",
    url: "/book-now",
    type: "website",
  },
};

export default function BookNowPage() {
  return <BookNowClient />;
}
