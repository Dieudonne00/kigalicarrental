"use client";

import { useState } from "react";
import Link from "next/link";

interface BookingResult {
  bookingId: string;
  carLabel: string;
  pickupDate: string;
  returnDate: string;
  alreadyReviewed: boolean;
}

export default function FindMyReviewClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [bookings, setBookings] = useState<BookingResult[]>([]);
  const [error, setError] = useState("");

  // Review-form state, used once we know exactly which booking is being
  // reviewed (either the single match, or one picked from a list).
  const [activeBooking, setActiveBooking] = useState<BookingResult | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/find-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      setBookings(data.bookings);
      setSearched(true);

      // One eligible, unreviewed match - skip straight to the review form
      // instead of making them click through a list of one.
      const reviewable = data.bookings.filter((b: BookingResult) => !b.alreadyReviewed);
      if (reviewable.length === 1) {
        setActiveBooking(reviewable[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: activeBooking.bookingId, customerEmail: email, rating, comment }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit review");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const reviewableCount = bookings.filter((b) => !b.alreadyReviewed).length;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Leave a Review</h1>

        {!activeBooking ? (
          <>
            <p className="text-gray-600 mb-6">
              Rented with us before? Enter the email you booked with and we&apos;ll find your completed rentals.
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="find-email" className="block text-sm font-bold text-gray-700 mb-1">
                  Email used for your booking
                </label>
                <input
                  id="find-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Searching..." : "Find My Bookings"}
              </button>
            </form>

            {searched && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                {bookings.length === 0 ? (
                  <p className="text-gray-700 text-sm">
                    We couldn&apos;t find a completed rental for that email. If you just returned your car, it can
                    take a day or two to show up here - or you can wait for the review link we&apos;ll email you.
                  </p>
                ) : reviewableCount === 0 ? (
                  <p className="text-gray-700 text-sm">
                    You&apos;ve already reviewed every completed rental on this email. Thank you!
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-2">You have a few - pick which one to review:</p>
                    {bookings
                      .filter((b) => !b.alreadyReviewed)
                      .map((b) => (
                        <div
                          key={b.bookingId}
                          className="flex items-center justify-between gap-3 border-2 border-gray-100 rounded-lg p-4"
                        >
                          <div>
                            <p className="font-bold text-gray-900">{b.carLabel}</p>
                            <p className="text-xs text-gray-500">
                              {formatDate(b.pickupDate)} - {formatDate(b.returnDate)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveBooking(b)}
                            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                          >
                            Review This
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✓</div>
            <p className="text-gray-900 font-bold mb-1">Thank you for your feedback!</p>
            <p className="text-gray-600 text-sm">Your review will appear on the site once it&apos;s been checked.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              {activeBooking.carLabel} &middot; {formatDate(activeBooking.pickupDate)} -{" "}
              {formatDate(activeBooking.returnDate)}
            </p>
            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div>
                <span className="block text-sm font-bold text-gray-700 mb-2">Your rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      className={`text-3xl leading-none ${n <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-comment" className="block text-sm font-bold text-gray-700 mb-1">
                  Your review
                </label>
                <textarea
                  id="review-comment"
                  required
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience with this car..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

              <div className="flex gap-3">
                {bookings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveBooking(null)}
                    className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </>
        )}

        <p className="text-xs text-gray-400 mt-6 text-center">
          Reviews are tied to a real completed booking so every rating you see on the site is genuine.{" "}
          <Link href="/contact" className="underline hover:text-gray-600">
            Booking under a different email?
          </Link>
        </p>
      </div>
    </main>
  );
}
