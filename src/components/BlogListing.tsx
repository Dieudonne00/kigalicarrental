"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogFeaturedImage from "@/components/BlogFeaturedImage";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  author: string;
  category: string;
  publishedAt: string;
  views: number;
}

function formatCategory(cat: string) {
  return cat.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const BLOGS_PER_PAGE = 9;

export default function BlogListing() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => setBlogs(data.blogs || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "car-rental-tips", label: "Car Rental Tips" },
    { value: "travel-guides", label: "Travel Guides" },
    { value: "rwanda-tourism", label: "Rwanda Tourism" },
    { value: "driving-in-rwanda", label: "Driving in Rwanda" },
    { value: "company-news", label: "Company News" },
  ];

  const filtered = blogs.filter((b) => {
    const catOk = selectedCategory === "all" || b.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const searchOk = !q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
  const start = (currentPage - 1) * BLOGS_PER_PAGE;
  const paginated = filtered.slice(start, start + BLOGS_PER_PAGE);

  const goToPage = (n: number) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:border-[#01B000] focus:outline-none focus:ring-2 focus:ring-[#01B000]/10 bg-white shadow-sm text-gray-800 placeholder-gray-400"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:border-[#01B000] focus:outline-none focus:ring-2 focus:ring-[#01B000]/10 bg-white shadow-sm text-gray-700 sm:w-56"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {filtered.length === 0 ? "No posts found" : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}${selectedCategory !== "all" || searchQuery ? " (filtered)" : ""}`}
          </p>
        </div>

        {/* Blog Grid */}
        {paginated.length > 0 ? (
          <>
            {/* Featured first post — full width on first page with no filter */}
            {currentPage === 1 && !searchQuery && selectedCategory === "all" && paginated.length > 0 && (
              <Link
                href={`/blog/${paginated[0].slug}`}
                className="group block mb-8 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
              >
                <div className="md:flex">
                  <div className="relative h-64 md:h-auto md:w-1/2 md:min-h-[360px] overflow-hidden">
                    <BlogFeaturedImage
                      src={paginated[0].featuredImage}
                      alt={paginated[0].title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#01B000] text-white text-xs font-bold rounded-full">
                      {formatCategory(paginated[0].category)}
                    </span>
                  </div>
                  <div className="p-6 md:p-10 md:w-1/2 flex flex-col justify-center">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Featured Article</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#01B000] transition-colors font-[family-name:var(--font-plus-jakarta)]">
                      {paginated[0].title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{paginated[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <span>{paginated[0].author}</span>
                      <span>·</span>
                      <span>{new Date(paginated[0].publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[#01B000] font-semibold text-sm group-hover:gap-3 transition-all">
                      Read article
                      <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentPage === 1 && !searchQuery && selectedCategory === "all"
                ? paginated.slice(1)
                : paginated
              ).map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden shrink-0">
                    <BlogFeaturedImage
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#01B000] text-white text-xs font-bold rounded-full">
                      {formatCategory(blog.category)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span>{blog.author}</span>
                      <span>·</span>
                      <span>
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <span>{blog.views.toLocaleString()} views</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#01B000] transition-colors line-clamp-2 leading-snug font-[family-name:var(--font-plus-jakarta)]">
                      {blog.title}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed flex-1">
                      {blog.excerpt}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-50">
                      <span className="inline-flex items-center gap-1.5 text-[#01B000] text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Read more
                        <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-[#01B000] hover:text-[#01B000] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === page
                        ? "bg-[#01B000] text-white"
                        : "border border-gray-200 text-gray-600 hover:border-[#01B000] hover:text-[#01B000]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-[#01B000] hover:text-[#01B000] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setCurrentPage(1); }}
              className="px-6 py-3 bg-[#01B000] text-white font-semibold rounded-xl hover:bg-[#019500] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
