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

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs?featured=true&limit=3")
      .then((r) => r.json())
      .then((data) => setBlogs(data.blogs || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01B000] mx-auto" />
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Kigali Car Hire Blog & Travel Guides
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, guides and insights about renting a car in Kigali and travelling across Rwanda.
          </p>
        </div>

        {/* Blog Grid — 1 col mobile, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden shrink-0">
                <BlogFeaturedImage
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#01B000] text-white text-xs font-semibold rounded-full">
                  {formatCategory(blog.category)}
                </span>
              </div>

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
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#01B000] transition-colors line-clamp-2 leading-snug font-[family-name:var(--font-plus-jakarta)]">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-50">
                  <span className="inline-flex items-center gap-1.5 text-[#01B000] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Read article
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#01B000] text-white font-bold rounded-xl hover:bg-[#019500] transition-all shadow-lg hover:shadow-xl"
          >
            View All Rwanda Travel Guides
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
