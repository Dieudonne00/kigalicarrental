import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Kigali Car Rental",
  description:
    "Contact Kigali Car Rentals for bookings, quotes, or support. Call, email, or send a message and our Rwanda-based team will respond promptly, 24/7.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Kigali Car Rental",
    description:
      "Contact Kigali Car Rentals for bookings, quotes, or support. Call, email, or send a message and our Rwanda-based team will respond promptly, 24/7.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
