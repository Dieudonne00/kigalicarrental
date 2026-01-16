"use client";

import { useState, useEffect } from "react";
import ManagerSidebar from "@/components/ManagerSidebar";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import ConfirmModal from "@/components/ConfirmModal";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);
  const [updatingMessageId, setUpdatingMessageId] = useState<string | null>(null);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url =
        statusFilter === "all"
          ? "/api/contact"
          : `/api/contact?status=${statusFilter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setErrorMessage("Failed to fetch messages");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const openDetailModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedMessage(null);
    setShowDetailModal(false);
  };

  const handleStatusUpdate = async (messageId: string, newStatus: string) => {
    setUpdatingMessageId(messageId);
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update message");
      }

      await fetchMessages();
      setSuccessMessage("Message status updated successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating message:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to update message");
      setShowErrorModal(true);
    } finally {
      setUpdatingMessageId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteMessageId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteMessageId) return;

    setDeletingMessageId(deleteMessageId);
    setShowDeleteConfirm(false);

    try {
      const response = await fetch(`/api/contact/${deleteMessageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      closeDetailModal();
      await fetchMessages();
      setSuccessMessage("Message deleted successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting message:", error);
      setErrorMessage("Failed to delete message");
      setShowErrorModal(true);
    } finally {
      setDeletingMessageId(null);
      setDeleteMessageId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                Contact Messages
              </h1>
              <p className="text-gray-600 mt-1">
                View and respond to customer inquiries
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
                <option value="all">All Messages</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          {!loading && messages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Total Messages</div>
                <div className="text-2xl font-bold text-gray-900">
                  {messages.length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">New</div>
                <div className="text-2xl font-bold text-blue-600">
                  {messages.filter((m) => m.status === "new").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Replied</div>
                <div className="text-2xl font-bold text-green-600">
                  {messages.filter((m) => m.status === "replied").length}
                </div>
              </div>
            </div>
          )}

          {/* Messages Table */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]"></div>
            </div>
          ) : messages.length === 0 ? (
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No messages found
              </h3>
              <p className="text-gray-600">
                {statusFilter !== "all"
                  ? `No ${statusFilter} messages available`
                  : "No messages have been received yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Message ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Message
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
                    {messages.map((message) => (
                      <tr key={message.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-900">
                            {message.id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            {message.name}
                          </div>
                          <div className="text-xs text-gray-500">{message.email}</div>
                          {message.phone && (
                            <div className="text-xs text-gray-500">{message.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate">
                            {message.message}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={message.status}
                            onChange={(e) =>
                              handleStatusUpdate(message.id, e.target.value)
                            }
                            disabled={updatingMessageId === message.id}
                            className={`px-3 py-1 rounded-full text-xs font-bold border-2 focus:outline-none ${getStatusColor(
                              message.status
                            )}`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500">
                            {formatDateTime(message.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openDetailModal(message)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-bold text-[#01B000] hover:bg-green-50 rounded-lg transition-all mr-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(message.id)}
                            disabled={deletingMessageId === message.id}
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
      {showDetailModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                  Message Details
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
                    <label className="text-sm font-bold text-gray-700">Name</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <p className="text-gray-900">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-[#01B000] hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm font-bold text-gray-700">Phone</label>
                      <p className="text-gray-900">
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="text-[#01B000] hover:underline"
                        >
                          {selectedMessage.phone}
                        </a>
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-bold text-gray-700">Received</label>
                    <p className="text-gray-900">
                      {formatDateTime(selectedMessage.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Message</h3>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t-2 border-gray-200 flex gap-4">
              <button
                onClick={closeDetailModal}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Close
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
          setDeleteMessageId(null);
        }}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this message? This action cannot be undone."
      />
    </div>
  );
}
