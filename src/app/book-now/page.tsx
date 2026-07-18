import type { Metadata } from "next";
import BookNowClient from "./BookNowClient";

export const metadata: Metadata = {
  title: "Book Kigali Car Rental | Free Quote in 2 Hours",
  description:
    "Book your Kigali car rental in minutes. Tell us your dates, preferences, and budget, and our team will send a tailored quote within 2 hours.",
  alternates: {
    canonical: "/book-now",
  },
  openGraph: {
    title: "Book Kigali Car Rental | Free Quote in 2 Hours",
    description:
      "Book your Kigali car rental in minutes. Tell us your dates, preferences, and budget, and our team will send a tailored quote within 2 hours.",
    url: "/book-now",
    type: "website",
  },
};

export default function BookNowPage() {
  return <BookNowClient />;
}
