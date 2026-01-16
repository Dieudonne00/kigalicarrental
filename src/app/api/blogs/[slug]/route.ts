import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single published blog post by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blogPost.findFirst({
      where: {
        slug,
        published: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: blog.id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
