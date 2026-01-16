"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ManagerSidebar from "@/components/ManagerSidebar";
import RichTextEditor from "@/components/RichTextEditor";
import SuccessModal from "@/components/SuccessModal";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  author: string;
  category: string;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
  published: boolean;
  featured: boolean;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: null,
    author: "Kigali Car Hire Team",
    category: "car-rental-tips",
    tags: [],
    metaTitle: null,
    metaDescription: null,
    metaKeywords: [],
    published: false,
    featured: false,
  });

  const suggestedKeywords = [
    "car rental Rwanda",
    "Kigali car hire",
    "rent a car Kigali",
    "Rwanda car rental",
    "affordable car rental Rwanda",
    "luxury car hire Kigali",
    "4x4 rental Rwanda",
    "self drive Rwanda",
    "chauffeur driven cars Kigali",
    "car rental Kigali airport",
    "Rwanda safari car rental",
    "Akagera game drive vehicles",
  ];

  useEffect(() => {
    fetchBlogPost();
  }, [blogId]);

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/manager/blogs/${blogId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }
      const data = await response.json();
      setFormData(data.blog);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      alert("Failed to load blog post");
      router.push("/manager/blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/manager/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating blog post:", error);
      alert("Failed to update blog post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeywordAdd = (keyword: string) => {
    if (!formData.metaKeywords.includes(keyword)) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, keyword],
      });
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    setFormData({
      ...formData,
      metaKeywords: formData.metaKeywords.filter((k) => k !== keyword),
    });
  };

  const handleTagAdd = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <ManagerSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Blog Post
            </h1>
            <p className="text-gray-600">Update your blog post details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Enter blog post title"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Brief description of the blog post"
                  />
                </div>

                {/* Category */}
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  >
                    <option value="car-rental-tips">Car Rental Tips</option>
                    <option value="travel-guides">Travel Guides</option>
                    <option value="rwanda-tourism">Rwanda Tourism</option>
                    <option value="driving-in-rwanda">Driving in Rwanda</option>
                    <option value="company-news">Company News</option>
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Author name"
                  />
                </div>

                {/* Featured Image URL */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featuredImage: e.target.value || null,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <img
                        src={formData.featuredImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Blog Content *
              </h2>
              <RichTextEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData({ ...formData, content })
                }
              />
            </div>

            {/* Tags Card */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Type a tag and press Enter"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        handleTagAdd(input.value.trim());
                        input.value = "";
                      }
                    }
                  }}
                />
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* SEO Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                SEO Settings
              </h2>

              <div className="space-y-4">
                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaTitle: e.target.value || null,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Leave empty to use post title"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value || null,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Leave empty to use excerpt"
                  />
                </div>

                {/* Meta Keywords */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Keywords (SEO)
                  </label>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Suggested Keywords (click to add):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedKeywords.map((keyword) => (
                        <button
                          key={keyword}
                          type="button"
                          onClick={() => handleKeywordAdd(keyword)}
                          disabled={formData.metaKeywords.includes(keyword)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            formData.metaKeywords.includes(keyword)
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-[#01B000] text-white hover:bg-[#019500] cursor-pointer"
                          }`}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Type a keyword and press Enter"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900 mb-3"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          handleKeywordAdd(input.value.trim());
                          input.value = "";
                        }
                      }
                    }}
                  />

                  {formData.metaKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.metaKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-4 py-2 bg-[#01B000] text-white rounded-full text-sm font-medium flex items-center gap-2"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleKeywordRemove(keyword)}
                            className="text-white hover:text-red-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Publishing Options Card */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Publishing Options
              </h2>

              <div className="space-y-4">
                {/* Published */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-5 h-5 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <label
                    htmlFor="published"
                    className="text-sm font-bold text-gray-700"
                  >
                    Publish this post (make it visible to the public)
                  </label>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-5 h-5 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-bold text-gray-700"
                  >
                    Feature this post (show on homepage)
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-4 bg-[#01B000] text-white font-bold rounded-lg hover:bg-[#019500] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating..." : "Update Blog Post"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/manager/blogs")}
                className="px-6 py-4 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/manager/blogs");
        }}
        title="Success!"
        message="Your blog post has been updated successfully."
      />
    </div>
  );
}
