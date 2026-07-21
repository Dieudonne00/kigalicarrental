"use client";

import { useState, useEffect } from "react";
import ManagerSidebar from "@/components/ManagerSidebar";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import ConfirmModal from "@/components/ConfirmModal";

interface ReviewRow {
  id: string;
  rating: number;
  comment: string;
  customerName: string;
  published: boolean;
  createdAt: string;
  car: { id: string; name: string; brand: string; model: string; year: number };
  booking: { customerEmail: string; pickupDate: string; returnDate: string };
}

export default function ManagerReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/manager/reviews?status=${statusFilter}`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setErrorMessage("Failed to fetch reviews");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const setPublished = async (id: string, published: boolean) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/manager/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
      if (!response.ok) throw new Error("Failed to update review");
      await fetchReviews();
      setSuccessMessage(published ? "Review approved and now live" : "Review hidden");
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to update review");
      setShowErrorModal(true);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteReviewId) return;
    setShowDeleteConfirm(false);
    try {
      const response = await fetch(`/api/manager/reviews/${deleteReviewId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete review");
      await fetchReviews();
      setSuccessMessage("Review deleted");
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage("Failed to delete review");
      setShowErrorModal(true);
    } finally {
      setDeleteReviewId(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              Customer Reviews
            </h1>
            <p className="text-gray-600 mt-1">
              Approve or reject reviews before they appear publicly on the site
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              <label className="font-bold text-gray-700">Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="pending">Pending Approval</option>
                <option value="published">Published</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">
                {statusFilter === "pending"
                  ? "No reviews are waiting for approval right now."
                  : "No reviews match this filter."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{review.customerName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            review.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {review.published ? "Published" : "Pending"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.car.brand} {review.car.model} {review.car.year} &middot; rented{" "}
                        {formatDate(review.booking.pickupDate)} - {formatDate(review.booking.returnDate)}
                      </div>
                      <div className="text-sm text-gray-500">{review.booking.customerEmail}</div>
                    </div>
                    <div className="text-yellow-500 font-bold whitespace-nowrap">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <div className="flex gap-3">
                    {!review.published ? (
                      <button
                        onClick={() => setPublished(review.id, true)}
                        disabled={updatingId === review.id}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-all disabled:opacity-50"
                      >
                        Approve &amp; Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => setPublished(review.id, false)}
                        disabled={updatingId === review.id}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-300 transition-all disabled:opacity-50"
                      >
                        Unpublish
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setDeleteReviewId(review.id);
                        setShowDeleteConfirm(true);
                      }}
                      className="px-4 py-2 text-red-600 rounded-lg font-bold text-sm hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Success" message={successMessage} />
      <ErrorModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} title="Error" message={errorMessage} />
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteReviewId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Review"
        message="Are you sure you want to delete this review? This cannot be undone."
      />
    </div>
  );
}
