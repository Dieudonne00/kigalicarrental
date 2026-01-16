"use client";

import { useState, useEffect } from "react";
import ManagerSidebar from "@/components/ManagerSidebar";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import ConfirmModal from "@/components/ConfirmModal";

interface BookingRequest {
  id: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: string;
  dropoffLocation: string | null;
  carType: string | null;
  transmission: string | null;
  seats: string | null;
  budget: string | null;
  purpose: string | null;
  additionalRequirements: string | null;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  status: string;
  assignedCarId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BookingRequestsPage() {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [notesUpdate, setNotesUpdate] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState<string | null>(null);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
  const [deletingRequestId, setDeletingRequestId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookingRequests();
  }, [statusFilter]);

  const fetchBookingRequests = async () => {
    try {
      setLoading(true);
      const url =
        statusFilter === "all"
          ? "/api/booking-requests"
          : `/api/booking-requests?status=${statusFilter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBookingRequests(data.bookingRequests);
      }
    } catch (error) {
      console.error("Error fetching booking requests:", error);
      setErrorMessage("Failed to fetch booking requests");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const openDetailModal = (request: BookingRequest) => {
    setSelectedRequest(request);
    setStatusUpdate(request.status);
    setNotesUpdate(request.notes || "");
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedRequest(null);
    setShowDetailModal(false);
    setStatusUpdate("");
    setNotesUpdate("");
  };

  const handleUpdateStatus = async () => {
    if (!selectedRequest) return;

    setUpdatingRequestId(selectedRequest.id);
    try {
      const response = await fetch(`/api/booking-requests/${selectedRequest.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statusUpdate,
          notes: notesUpdate,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update booking request");
      }

      closeDetailModal();
      await fetchBookingRequests();
      setSuccessMessage("Booking request updated successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating booking request:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to update booking request");
      setShowErrorModal(true);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteRequestId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteRequestId) return;

    setDeletingRequestId(deleteRequestId);
    setShowDeleteConfirm(false);

    try {
      const response = await fetch(`/api/booking-requests/${deleteRequestId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking request");
      }

      await fetchBookingRequests();
      setSuccessMessage("Booking request deleted successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting booking request:", error);
      setErrorMessage("Failed to delete booking request");
      setShowErrorModal(true);
    } finally {
      setDeletingRequestId(null);
      setDeleteRequestId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "quoted":
        return "bg-purple-100 text-purple-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                Booking Requests
              </h1>
              <p className="text-gray-600 mt-1">
                Manage customer booking requests and inquiries
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
                <option value="all">All Requests</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="converted">Converted</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          {!loading && bookingRequests.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Total Requests</div>
                <div className="text-2xl font-bold text-gray-900">
                  {bookingRequests.length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">New</div>
                <div className="text-2xl font-bold text-blue-600">
                  {bookingRequests.filter((r) => r.status === "new").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">In Progress</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    bookingRequests.filter(
                      (r) => r.status === "contacted" || r.status === "quoted"
                    ).length
                  }
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Converted</div>
                <div className="text-2xl font-bold text-green-600">
                  {bookingRequests.filter((r) => r.status === "converted").length}
                </div>
              </div>
            </div>
          )}

          {/* Booking Requests Table */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]"></div>
            </div>
          ) : bookingRequests.length === 0 ? (
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
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No booking requests found
              </h3>
              <p className="text-gray-600">
                {statusFilter !== "all"
                  ? `No ${statusFilter} requests available`
                  : "No booking requests have been submitted yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Trip Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Preferences
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
                    {bookingRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-900">
                            {request.id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            {request.fullName}
                          </div>
                          <div className="text-xs text-gray-500">{request.email}</div>
                          <div className="text-xs text-gray-500">{request.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="font-bold">
                              {request.pickupDate} @ {request.pickupTime}
                            </div>
                            <div className="text-xs text-gray-500">to</div>
                            <div className="font-bold">
                              {request.returnDate} @ {request.returnTime}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {request.pickupLocation}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {request.carType && (
                              <div className="text-xs">Type: {request.carType}</div>
                            )}
                            {request.seats && (
                              <div className="text-xs">Seats: {request.seats}</div>
                            )}
                            {request.budget && (
                              <div className="text-xs">Budget: {request.budget}</div>
                            )}
                            {request.purpose && (
                              <div className="text-xs">Purpose: {request.purpose}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500">
                            {formatDateTime(request.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openDetailModal(request)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-bold text-[#01B000] hover:bg-green-50 rounded-lg transition-all mr-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(request.id)}
                            disabled={deletingRequestId === request.id}
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

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                  Booking Request Details
                </h2>
                <button
                  onClick={closeDetailModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <p className="text-gray-900">{selectedRequest.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Phone</label>
                    <p className="text-gray-900">{selectedRequest.phone}</p>
                  </div>
                  {selectedRequest.whatsapp && (
                    <div>
                      <label className="text-sm font-bold text-gray-700">WhatsApp</label>
                      <p className="text-gray-900">{selectedRequest.whatsapp}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trip Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Trip Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700">
                      Pickup Date & Time
                    </label>
                    <p className="text-gray-900">
                      {selectedRequest.pickupDate} @ {selectedRequest.pickupTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">
                      Return Date & Time
                    </label>
                    <p className="text-gray-900">
                      {selectedRequest.returnDate} @ {selectedRequest.returnTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">
                      Pickup Location
                    </label>
                    <p className="text-gray-900">{selectedRequest.pickupLocation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">
                      Drop-off Location
                    </label>
                    <p className="text-gray-900">
                      {selectedRequest.dropoffLocation || "Same as pickup"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedRequest.carType && (
                    <div>
                      <label className="text-sm font-bold text-gray-700">Car Type</label>
                      <p className="text-gray-900">{selectedRequest.carType}</p>
                    </div>
                  )}
                  {selectedRequest.transmission && (
                    <div>
                      <label className="text-sm font-bold text-gray-700">
                        Transmission
                      </label>
                      <p className="text-gray-900">{selectedRequest.transmission}</p>
                    </div>
                  )}
                  {selectedRequest.seats && (
                    <div>
                      <label className="text-sm font-bold text-gray-700">
                        Number of Seats
                      </label>
                      <p className="text-gray-900">{selectedRequest.seats}</p>
                    </div>
                  )}
                  {selectedRequest.budget && (
                    <div>
                      <label className="text-sm font-bold text-gray-700">Budget</label>
                      <p className="text-gray-900">{selectedRequest.budget}</p>
                    </div>
                  )}
                  {selectedRequest.purpose && (
                    <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700">Purpose</label>
                      <p className="text-gray-900">{selectedRequest.purpose}</p>
                    </div>
                  )}
                </div>
                {selectedRequest.additionalRequirements && (
                  <div className="mt-4">
                    <label className="text-sm font-bold text-gray-700">
                      Additional Requirements
                    </label>
                    <p className="text-gray-900">
                      {selectedRequest.additionalRequirements}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Update Status</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="converted">Converted</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Admin Notes
                    </label>
                    <textarea
                      id="notes"
                      value={notesUpdate}
                      onChange={(e) => setNotesUpdate(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900 resize-none"
                      placeholder="Add notes about this booking request..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t-2 border-gray-200 flex gap-4">
              <button
                onClick={handleUpdateStatus}
                disabled={updatingRequestId === selectedRequest.id}
                className="flex-1 bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all disabled:opacity-50"
              >
                {updatingRequestId === selectedRequest.id ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={closeDetailModal}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
          setDeleteRequestId(null);
        }}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this booking request? This action cannot be undone."
      />
    </div>
  );
}
