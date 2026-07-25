import type { Metadata } from "next";
import FindMyReviewClient from "./FindMyReviewClient";

export const metadata: Metadata = {
  title: "Find Your Booking to Leave a Review | Kigali Car Rental",
  description: "Rented with us before? Enter the email you booked with to find your review link.",
  robots: { index: false },
};

export default function FindMyReviewPage() {
  return <FindMyReviewClient />;
}
