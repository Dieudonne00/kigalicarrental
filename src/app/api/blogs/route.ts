import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET published blog posts (for public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    const where: any = {
      published: true,
    };

    if (category && category !== "all") {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    }

    const blogs = await prisma.blogPost.findMany({
      where,
      orderBy: {
        publishedAt: "desc",
      },
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        author: true,
        category: true,
        tags: true,
        views: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
