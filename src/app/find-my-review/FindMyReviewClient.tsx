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

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Leave a Review</h1>
        <p className="text-gray-600 mb-6">
          Rented with us before? Enter the email you booked with and we&apos;ll find your completed rentals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                We couldn&apos;t find a completed rental for that email. If you just returned your car, it can take a
                day or two to show up here - or you can wait for the review link we&apos;ll email you.
              </p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
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
                    {b.alreadyReviewed ? (
                      <span className="text-xs font-bold text-gray-400">Already reviewed</span>
                    ) : (
                      <Link
                        href={`/leave-review/${b.bookingId}`}
                        className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                      >
                        Leave a Review
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
