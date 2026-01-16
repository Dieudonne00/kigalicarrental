"use client";

import { useState, useEffect } from "react";
import ManagerSidebar from "@/components/ManagerSidebar";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import ConfirmModal from "@/components/ConfirmModal";

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  images: string[];
  category: string;
}

interface Booking {
  id: string;
  carId: string;
  car: Car;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string | null;
  totalCost: number;
  status: string;
  specialRequests: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const url = `/api/manager/bookings${
        statusFilter !== "all" ? `?status=${statusFilter}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setErrorMessage("Failed to fetch bookings");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setUpdatingBookingId(bookingId);
    try {
      const response = await fetch(`/api/manager/bookings?id=${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update booking");
      }

      // Refresh bookings
      await fetchBookings();
      setSuccessMessage("Booking status updated successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating booking:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to update booking");
      setShowErrorModal(true);
    } finally{
      setUpdatingBookingId(null);
    }
  };

  const handleDelete = async (bookingId: string) => {
    setDeleteBookingId(bookingId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteBookingId) return;

    setDeletingBookingId(deleteBookingId);
    setShowDeleteConfirm(false);

    try {
      const response = await fetch(`/api/manager/bookings?id=${deleteBookingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      // Refresh bookings
      await fetchBookings();
      setSuccessMessage("Booking deleted successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setErrorMessage("Failed to delete booking");
      setShowErrorModal(true);
    } finally {
      setDeletingBookingId(null);
      setDeleteBookingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                Bookings Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage customer bookings and reservations
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              <label className="font-bold text-gray-700">Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          {!loading && bookings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
                <div className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Pending</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {bookings.filter((b) => b.status === "pending").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Confirmed</div>
                <div className="text-2xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-[#01B000]">
                  $
                  {bookings
                    .filter((b) => b.status === "confirmed")
                    .reduce((sum, b) => sum + b.totalCost, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Bookings Table */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600">
                {statusFilter !== "all"
                  ? `No ${statusFilter} bookings available`
                  : "No bookings have been made yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Car
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Total Cost
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-900">
                            {booking.id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                booking.car.images[0] || "/placeholder-car.jpg"
                              }
                              alt={booking.car.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="text-sm font-bold text-gray-900">
                                {booking.car.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {booking.car.brand} {booking.car.model}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            {booking.customerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.customerEmail}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.customerPhone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="font-bold">
                              {formatDate(booking.pickupDate)}
                            </div>
                            <div className="text-xs text-gray-500">to</div>
                            <div className="font-bold">
                              {formatDate(booking.returnDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="font-bold">
                              {booking.pickupLocation}
                            </div>
                            {booking.returnLocation &&
                              booking.returnLocation !== booking.pickupLocation && (
                                <div className="text-xs text-gray-500">
                                  Return: {booking.returnLocation}
                                </div>
                              )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-[#01B000]">
                            ${booking.totalCost.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusUpdate(booking.id, e.target.value)
                            }
                            disabled={updatingBookingId === booking.id}
                            className={`px-3 py-1 rounded-full text-xs font-bold border-2 focus:outline-none ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500">
                            {formatDateTime(booking.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(booking.id)}
                            disabled={deletingBookingId === booking.id}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message={successMessage}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message={errorMessage}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteBookingId(null);
        }}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </div>
  );
}
