"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ManagerSidebar from "@/components/ManagerSidebar";
import { Car } from "@/types/car";

export default function CarsPage() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingCarId, setDeletingCarId] = useState<string | null>(null);

  // Fetch cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/manager/cars");
      const data = await response.json();
      setCars(data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Delete car
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      setDeletingCarId(id);
      const response = await fetch(`/api/manager/cars/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCars();
      } else {
        alert("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Error deleting car");
    } finally {
      setDeletingCarId(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ManagerSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              Car Management
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your fleet of rental vehicles.
            </p>
          </div>
          <button
            onClick={() => router.push("/manager/cars/add")}
            className="bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all shadow-md flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            Add New Car
          </button>
        </div>

        {/* Cars List */}
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading cars...
            </div>
          ) : cars.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">
                No cars added yet. Click "Add New Car" to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Car
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Transmission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Seats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Daily Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {car.images.length > 0 ? (
                            <img
                              src={car.images[0]}
                              alt={car.name}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-900">{car.name}</p>
                            <p className="text-sm text-gray-500">
                              {car.brand} {car.model} • {car.year}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 capitalize">
                          {car.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                        {car.transmission}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {car.seats}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        ${car.dailyRate}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            car.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {car.available ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => router.push(`/manager/cars/${car.id}/edit`)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          disabled={deletingCarId === car.id}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                        >
                          {deletingCarId === car.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
