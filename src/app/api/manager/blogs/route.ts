import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all blog posts (for manager)
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Validate required fields
    const requiredFields = ["title", "excerpt", "content", "category"];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create blog post
    const blog = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage || null,
        author: data.author || "Kigali Car Hire Team",
        category: data.category,
        tags: data.tags || [],
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt,
        metaKeywords: data.metaKeywords || [],
        published: data.published !== undefined ? data.published : false,
        featured: data.featured !== undefined ? data.featured : false,
        publishedAt: data.published ? new Date() : null,
      },
    });

    return NextResponse.json(
      { message: "Blog post created successfully", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
