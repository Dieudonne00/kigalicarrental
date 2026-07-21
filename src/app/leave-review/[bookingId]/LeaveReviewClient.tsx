"use client";

import { useState } from "react";

interface Props {
  bookingId: string;
  carLabel: string;
  pickupDate: string;
  returnDate: string;
  rentalEnded: boolean;
  alreadyReviewed: boolean;
}

export default function LeaveReviewClient({
  bookingId,
  carLabel,
  pickupDate,
  returnDate,
  rentalEnded,
  alreadyReviewed,
}: Props) {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, customerEmail: email, rating, comment }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit review");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Leave a Review</h1>
        <p className="text-gray-600 mb-6">
          {carLabel} &middot; {formatDate(pickupDate)} - {formatDate(returnDate)}
        </p>

        {alreadyReviewed ? (
          <p className="text-gray-700">You've already submitted a review for this booking. Thank you!</p>
        ) : !rentalEnded ? (
          <p className="text-gray-700">
            You'll be able to leave a review once your rental period ends on {formatDate(returnDate)}.
          </p>
        ) : submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✓</div>
            <p className="text-gray-900 font-bold mb-1">Thank you for your feedback!</p>
            <p className="text-gray-600 text-sm">
              Your review will appear on the site once it's been checked.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="review-email" className="block text-sm font-bold text-gray-700 mb-1">
                Email used for this booking
              </label>
              <input
                id="review-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

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
                placeholder="Tell us about your experience..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
