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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4B5320]/20 border-t-[#4B5320]"></div>
            </div>
            <p className="mt-4 text-gray-500">Loading latest articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Enhanced */}
        <div className="text-center mb-12 md:mb-16">
          {/* Decorative element */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#4B5320] rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)] tracking-tight">
            Travel Insights & Guides
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tips, local guides, and everything you need to know about 
            <span className="text-[#4B5320] font-semibold"> car rental in Rwanda</span>
          </p>
          
          {/* Optional: Decorative icon */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4B5320]/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4B5320]/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4B5320]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4B5320]/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4B5320]/40"></div>
          </div>
        </div>

        {/* Blog Grid - Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Image Container */}
              <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-[#4B5320]/10 to-[#4B5320]/5">
                {blog.featuredImage ? (
                  <>
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Dark overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 md:w-24 md:h-24 text-[#4B5320]/20"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                
                {/* Category Badge - Enhanced */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-[#4B5320] text-white text-xs font-bold rounded-lg shadow-md backdrop-blur-sm bg-opacity-90">
                    {blog.category
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                </div>
                
                {/* Reading time indicator - Optional */}
                <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    5 min read
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 md:p-6 bg-white">
                {/* Author & Stats Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-6 h-6 rounded-full bg-[#4B5320]/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#4B5320]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-400">
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
                    <span>{blog.views.toLocaleString()} views</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#4B5320] transition-colors duration-300 line-clamp-2 leading-tight">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center text-[#4B5320] font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                    <span>Continue Reading</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  
                  {/* Publish date indicator */}
                  <div className="text-xs text-gray-400">
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button - Enhanced */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#4B5320] text-white font-bold text-base rounded-xl hover:bg-[#3a4218] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
          >
            <span>Explore All Articles</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          {/* Optional: Newsletter CTA below button */}
          <p className="text-sm text-gray-500 mt-4">
            Get travel tips straight to your inbox — 
            <Link href="/newsletter" className="text-[#4B5320] hover:underline font-semibold ml-1">
              Subscribe to our newsletter
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
