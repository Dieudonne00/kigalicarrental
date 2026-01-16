export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import ManagerSidebar from "@/components/ManagerSidebar";
import Link from "next/link";
import { format } from "date-fns";

async function getDashboardData() {
  // Get all stats in parallel
  const [
    totalCars,
    availableCars,
    totalBookings,
    activeBookings,
    newBookingRequests,
    unreadMessages,
    recentBookingRequests,
    recentMessages,
    popularCars,
  ] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { available: true } }),
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        status: "confirmed",
        returnDate: { gte: new Date() },
      },
    }),
    prisma.bookingRequest.count({ where: { status: "new" } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.bookingRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.car.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      where: { available: true },
    }),
  ]);

  // Calculate total revenue from bookings
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ["confirmed", "completed"] } },
  });
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalCost, 0);

  return {
    totalCars,
    availableCars,
    totalBookings,
    activeBookings,
    newBookingRequests,
    unreadMessages,
    totalRevenue,
    recentBookingRequests,
    recentMessages,
    popularCars,
  };
}

export default async function ManagerDashboard() {
  const data = await getDashboardData();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ManagerSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's what's happening with your car rental business.
          </p>
        </div>

        {/* Alert Cards for New Items */}
        {(data.newBookingRequests > 0 || data.unreadMessages > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {data.newBookingRequests > 0 && (
              <Link
                href="/manager/booking-requests"
                className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 hover:bg-yellow-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {data.newBookingRequests} New Booking {data.newBookingRequests === 1 ? "Request" : "Requests"}
                    </p>
                    <p className="text-sm text-gray-600">Click to review</p>
                  </div>
                </div>
              </Link>
            )}
            {data.unreadMessages > 0 && (
              <Link
                href="/manager/messages"
                className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 hover:bg-blue-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-400 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {data.unreadMessages} Unread {data.unreadMessages === 1 ? "Message" : "Messages"}
                    </p>
                    <p className="text-sm text-gray-600">Click to view</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#01B000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                  Total Cars
                </p>
                <p className="mt-2 text-3xl font-bold text-[#01B000] font-[family-name:var(--font-plus-jakarta)]">
                  {data.totalCars}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-[#01B000] opacity-50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#01B000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                  Active Bookings
                </p>
                <p className="mt-2 text-3xl font-bold text-[#01B000] font-[family-name:var(--font-plus-jakarta)]">
                  {data.activeBookings}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-[#01B000] opacity-50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#01B000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                  Available Cars
                </p>
                <p className="mt-2 text-3xl font-bold text-[#01B000] font-[family-name:var(--font-plus-jakarta)]">
                  {data.availableCars}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-[#01B000] opacity-50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#01B000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                  Total Revenue
                </p>
                <p className="mt-2 text-3xl font-bold text-[#01B000] font-[family-name:var(--font-plus-jakarta)]">
                  ${data.totalRevenue.toLocaleString()}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-[#01B000] opacity-50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Booking Requests */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                Recent Booking Requests
              </h2>
              <Link
                href="/manager/booking-requests"
                className="text-[#01B000] hover:text-[#019500] text-sm font-semibold"
              >
                View All →
              </Link>
            </div>
            {data.recentBookingRequests.length > 0 ? (
              <div className="space-y-3">
                {data.recentBookingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#01B000] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{request.fullName}</p>
                        <p className="text-sm text-gray-600">{request.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              request.status === "new"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "contacted"
                                ? "bg-blue-100 text-blue-800"
                                : request.status === "converted"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {request.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(request.createdAt), "MMM d, h:mm a")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No booking requests yet</p>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                Recent Messages
              </h2>
              <Link
                href="/manager/messages"
                className="text-[#01B000] hover:text-[#019500] text-sm font-semibold"
              >
                View All →
              </Link>
            </div>
            {data.recentMessages.length > 0 ? (
              <div className="space-y-3">
                {data.recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#01B000] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{message.name}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              message.status === "new"
                                ? "bg-yellow-100 text-yellow-800"
                                : message.status === "read"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {message.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(message.createdAt), "MMM d, h:mm a")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No messages yet</p>
            )}
          </div>
        </div>

        {/* Popular Cars & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Cars */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
                Recent Cars
              </h2>
              <Link
                href="/manager/cars"
                className="text-[#01B000] hover:text-[#019500] text-sm font-semibold"
              >
                View All →
              </Link>
            </div>
            {data.popularCars.length > 0 ? (
              <div className="space-y-3">
                {data.popularCars.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#01B000] transition-all"
                  >
                    {car.images[0] && (
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{car.name}</p>
                      <p className="text-sm text-gray-600">
                        ${car.dailyRate}/day
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        car.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No cars yet</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/manager/cars/add"
                className="w-full bg-[#01B000] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all shadow-md text-left flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 4v16m8-8H4" />
                </svg>
                Add New Car
              </Link>
              <Link
                href="/manager/cars"
                className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all border-2 border-gray-200 text-left flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View All Cars
              </Link>
              <Link
                href="/manager/booking-requests"
                className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all border-2 border-gray-200 text-left flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Manage Booking Requests
              </Link>
              <Link
                href="/manager/blogs/add"
                className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all border-2 border-gray-200 text-left flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Write Blog Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
