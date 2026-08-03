import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single blog post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Generate new slug if title changed
    let slug = existingBlog.slug;
    if (data.title && data.title !== existingBlog.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Update published date if status changed to published
    let publishedAt = existingBlog.publishedAt;
    if (data.published && !existingBlog.published) {
      publishedAt = new Date();
    }

    // Update blog post
    const blog = await prisma.blogPost.update({
      where: { id },
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
        publishedAt: publishedAt,
      },
    });

    return NextResponse.json(
      { message: "Blog post updated successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Delete blog post
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
