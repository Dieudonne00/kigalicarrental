"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManagerSidebar from "@/components/ManagerSidebar";
import RichTextEditor from "@/components/RichTextEditor";
import SuccessModal from "@/components/SuccessModal";

export default function AddBlogPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "Kigali Car Hire Team",
    category: "car-tips",
    tags: [] as string[],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [] as string[],
    published: false,
    featured: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const categories = [
    { value: "car-tips", label: "Car Tips" },
    { value: "travel-guides", label: "Travel Guides" },
    { value: "company-news", label: "Company News" },
    { value: "rwanda-tourism", label: "Rwanda Tourism" },
    { value: "car-maintenance", label: "Car Maintenance" },
  ];

  // Suggested SEO keywords for car rental in Rwanda
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData({ ...formData, featuredImage: data.url });
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const addKeyword = (keyword: string) => {
    if (!formData.metaKeywords.includes(keyword)) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, keyword],
      });
    }
  };

  const addCustomKeyword = () => {
    if (keywordInput.trim() && !formData.metaKeywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      metaKeywords: formData.metaKeywords.filter((k) => k !== keyword),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/manager/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          metaTitle: formData.metaTitle || formData.title,
          metaDescription: formData.metaDescription || formData.excerpt,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Failed to create blog post"}`);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Error creating blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ManagerSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
              Add New Blog Post
            </h1>
            <p className="mt-2 text-gray-600">
              Create SEO-optimized content for your car rental blog
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
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
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="10 Essential Tips for Renting a Car in Rwanda"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Excerpt (Short Description) *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900 resize-none"
                    placeholder="A brief summary of your blog post (150-160 characters for SEO)"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.excerpt.length} characters (recommended: 150-160)
                  </p>
                </div>

                {/* Category & Author */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

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
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Content</h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Blog Content *
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) =>
                    setFormData({ ...formData, content })
                  }
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use the toolbar above to format your content. The editor supports headings, bold, italic, lists, links, and more.
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Featured Image
              </h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                  disabled={uploadingImage}
                />
                {uploadingImage && (
                  <p className="text-sm text-[#01B000] mt-2">Uploading...</p>
                )}
                {formData.featuredImage && (
                  <div className="mt-4">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full max-w-md h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Add Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-[#01B000] text-white rounded-lg hover:bg-[#019500] transition-all"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SEO Optimization */}
            <div className="bg-white rounded-xl border-2 border-[#01B000] p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                SEO Optimization
              </h2>

              <div className="space-y-4">
                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Title (Leave empty to use post title)
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, metaTitle: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                    placeholder="SEO-optimized title (50-60 characters)"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.metaTitle.length}/60 characters
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Description (Leave empty to use excerpt)
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900 resize-none"
                    placeholder="SEO meta description (150-160 characters)"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>

                {/* SEO Keywords */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    SEO Keywords
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Quick add suggested keywords:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        onClick={() => addKeyword(keyword)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          formData.metaKeywords.includes(keyword)
                            ? "bg-[#01B000] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {formData.metaKeywords.includes(keyword) ? "✓ " : "+ "}
                        {keyword}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addCustomKeyword())
                      }
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none text-gray-900"
                      placeholder="Add custom keyword"
                    />
                    <button
                      type="button"
                      onClick={addCustomKeyword}
                      className="px-4 py-2 bg-[#01B000] text-white rounded-lg hover:bg-[#019500] transition-all"
                    >
                      Add
                    </button>
                  </div>

                  {formData.metaKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.metaKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#01B000]/10 text-[#01B000] rounded-full text-sm font-medium"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="hover:text-[#019500]"
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

            {/* Publishing Options */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Publishing Options
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4 text-[#01B000] border-gray-300 rounded focus:ring-[#01B000]"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Publish immediately (visible to public)
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
                    Featured post (show on homepage)
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/manager/blogs")}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-[#01B000] text-white rounded-lg font-bold hover:bg-[#019500] transition-all disabled:opacity-50"
              >
                {submitting ? "Creating Post..." : "Create Blog Post"}
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
        message="Your blog post has been created successfully."
      />
    </div>
  );
}
