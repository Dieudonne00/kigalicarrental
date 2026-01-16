"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?featured=true&limit=3");
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Latest from Our Blog
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Tips, guides, and insights about car rentals and traveling in Rwanda
          </p>
        </div>

        {/* Blog Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#01B000] transition-all duration-300 hover:shadow-xl"
            >
              {/* Featured Image */}
              {blog.featuredImage ? (
                <div className="relative h-32 md:h-56 overflow-hidden">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 md:top-4 left-2 md:left-4">
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-[#01B000] text-white text-[10px] md:text-sm font-bold rounded-full">
                      {blog.category
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative h-32 md:h-56 bg-gradient-to-br from-[#01B000] to-[#019500] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 md:w-20 md:h-20 text-white/30"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <div className="absolute top-2 md:top-4 left-2 md:left-4">
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white text-[#01B000] text-[10px] md:text-sm font-bold rounded-full">
                      {blog.category
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-3 md:p-6">
                {/* Meta - hide on mobile */}
                <div className="hidden md:flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{blog.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-[#01B000] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[10px] md:text-base text-gray-600 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center text-[#01B000] font-bold text-[10px] md:text-base group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <svg
                    className="w-3 h-3 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#01B000] text-white font-bold text-sm md:text-base rounded-lg hover:bg-[#019500] transition-all shadow-lg hover:shadow-xl"
          >
            <span>View All Blog Posts</span>
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
