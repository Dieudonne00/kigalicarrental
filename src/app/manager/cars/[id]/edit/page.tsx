"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ManagerSidebar from "@/components/ManagerSidebar";
import { Car } from "@/types/car";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const carId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "sedan",
    brand: "",
    year: new Date().getFullYear(),
    fuelType: "petrol",
    transmission: "automatic",
    seats: 5,
    dailyRate: 0,
    weeklyRate: 0,
    monthlyRate: 0,
    images: [] as string[],
    available: true,
    featured: false,
    gameDrive: false,
  });

  const [thumbnail, setThumbnail] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  // Track CDN URLs separately from preview URLs
  const [thumbnailCdnUrl, setThumbnailCdnUrl] = useState<string>("");
  const [galleryCdnUrls, setGalleryCdnUrls] = useState<string[]>([]);

  // Fetch car data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/manager/cars/${carId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch car");
        }

        const data = await response.json();
        const car: Car = data.car;

        // Populate form with car data
        setFormData({
          name: car.name,
          description: car.description || "",
          category: car.category,
          brand: car.brand,
          year: car.year,
          fuelType: car.fuelType,
          transmission: car.transmission,
          seats: car.seats,
          dailyRate: car.dailyRate,
          weeklyRate: car.weeklyRate || 0,
          monthlyRate: car.monthlyRate || 0,
          images: car.images,
          available: car.available,
          featured: car.featured,
          gameDrive: car.gameDrive || false,
        });

        // Set images - filter out broken blob URLs
        const validImages = car.images.filter(
          (img) => img && !img.startsWith("blob:")
        );
        if (validImages.length > 0) {
          setThumbnail(validImages[0]);
          setThumbnailCdnUrl(validImages[0]); // Store original CDN URL
          setThumbnailLoaded(true);
          if (validImages.length > 1) {
            const gallery = validImages.slice(1);
            setGalleryImages(gallery);
            setGalleryCdnUrls(gallery); // Store original CDN URLs
          }
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        alert("Failed to load car data");
        router.push("/manager/cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId, router]);

  // Helper function to delete image from Bunny CDN
  const deleteFromBunny = async (imageUrl: string) => {
    if (!imageUrl || imageUrl.startsWith("blob:")) return;

    try {
      const response = await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        console.log("Image deleted from Bunny CDN:", imageUrl);
      } else {
        console.error("Failed to delete image from Bunny CDN");
      }
    } catch (error) {
      console.error("Error deleting image from Bunny CDN:", error);
    }
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const oldThumbnailUrl = thumbnailCdnUrl;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setThumbnail(localUrl);
    setThumbnailLoaded(true);
    setUploadingThumbnail(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Starting thumbnail upload for:", file.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed with error:", errorData);
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      console.log("Thumbnail uploaded successfully to:", data.url);

      // Store new CDN URL
      setThumbnailCdnUrl(data.url);

      // Delete old thumbnail from Bunny CDN
      if (oldThumbnailUrl) {
        await deleteFromBunny(oldThumbnailUrl);
      }
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      console.log("Keeping local preview despite upload error");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Show local previews immediately
    const localUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setGalleryImages((prev) => [...prev, ...localUrls]);
    setUploadingGallery(true);

    try {
      console.log(`Starting upload of ${files.length} gallery images`);

      const uploadPromises = Array.from(files).map(async (file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Upload failed for ${file.name}:`, errorData);
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        console.log(`Gallery image ${index + 1} uploaded to:`, data.url);

        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log("All gallery images uploaded successfully");

      // Store CDN URLs
      setGalleryCdnUrls((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Gallery upload error:", error);
      console.log("Keeping local previews despite upload error");
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = async (index: number) => {
    const imageToDelete = galleryCdnUrls[index];

    // Remove from state
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryCdnUrls((prev) => prev.filter((_, i) => i !== index));

    // Delete from Bunny CDN
    if (imageToDelete) {
      await deleteFromBunny(imageToDelete);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use CDN URLs for database storage
    const allImages = thumbnailCdnUrl
      ? [thumbnailCdnUrl, ...galleryCdnUrls]
      : galleryCdnUrls;

    if (allImages.length === 0) {
      alert("Please upload at least one image (thumbnail or gallery)");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        images: allImages,
        model: formData.brand,
        hourlyRate: formData.dailyRate / 8,
        mileage: null,
      };

      const response = await fetch(`/api/manager/cars/${carId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/manager/cars");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update car");
      }
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Error updating car");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <ManagerSidebar />
        <div className="flex-1 lg:ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading car data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ManagerSidebar />

      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
            Edit Car
          </h1>
          <p className="mt-2 text-gray-600">
            Update the details for this vehicle.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Car Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="e.g., Toyota Camry 2024"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Enter car description, features, and highlights..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  >
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  >
                    <option value="">Select a brand</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Isuzu">Isuzu</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Range Rover">Range Rover</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Kia">Kia</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Renault">Renault</option>
                    <option value="Subaru">Subaru</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    min="2000"
                    max={new Date().getFullYear() + 1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <select
                    required
                    value={formData.fuelType}
                    onChange={(e) =>
                      setFormData({ ...formData, fuelType: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Transmission *
                  </label>
                  <select
                    required
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Seats *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.seats}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seats: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    min="2"
                    max="12"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Daily Rate ($) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.dailyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dailyRate: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Weekly Rate ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.weeklyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weeklyRate: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Monthly Rate ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.monthlyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        monthlyRate: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Images</h3>

              {/* Thumbnail Upload */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Car Thumbnail *
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (Main image shown in listings)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    disabled={uploadingThumbnail}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                      uploadingThumbnail
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-[#01B000] bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadingThumbnail ? (
                        <>
                          <svg
                            className="w-10 h-10 mb-3 text-[#01B000] animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <p className="text-sm text-[#01B000] font-bold">
                            Uploading thumbnail...
                          </p>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-10 h-10 mb-3 text-[#01B000]"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mb-2 text-sm font-bold text-gray-700">
                            <span className="text-[#01B000]">Click to upload</span> or
                            drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (Single file)
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Thumbnail Preview */}
                {thumbnail && (
                  <div className="mt-4">
                    <div className="relative inline-block group">
                      <img
                        src={thumbnail}
                        alt="Car thumbnail"
                        className="w-64 h-48 object-cover rounded-lg border-2 border-[#01B000]"
                        onLoad={() => setThumbnailLoaded(true)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnail("");
                          setThumbnailLoaded(false);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <svg
                          className="w-4 h-4"
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
                )}
              </div>

              {/* Gallery Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Car Gallery
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (Additional images for detail view)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    disabled={uploadingGallery}
                    className="hidden"
                    id="gallery-upload"
                  />
                  <label
                    htmlFor="gallery-upload"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                      uploadingGallery
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-blue-500 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadingGallery ? (
                        <>
                          <svg
                            className="w-10 h-10 mb-3 text-blue-500 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <p className="text-sm text-blue-500 font-bold">
                            Uploading gallery images...
                          </p>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-10 h-10 mb-3 text-blue-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2 text-sm font-bold text-gray-700">
                            <span className="text-blue-500">Click to upload</span> or
                            drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (Multiple files allowed)
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Gallery Preview Grid */}
                {galleryImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {galleryImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-4 h-4"
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
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                placeholder="Add a detailed description of the car..."
              />
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Availability
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) =>
                      setFormData({ ...formData, available: e.target.checked })
                    }
                    className="w-4 h-4 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Available for rent
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Featured car (show on homepage)
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.gameDrive}
                    onChange={(e) =>
                      setFormData({ ...formData, gameDrive: e.target.checked })
                    }
                    className="w-4 h-4 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Available for Akagera Game Drive
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/manager/cars")}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating Car..." : "Update Car"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
