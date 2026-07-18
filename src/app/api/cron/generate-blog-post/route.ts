import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/blog-generator";
import { sendBlogDraftNotification } from "@/lib/email";

// Triggered 3x/day by a VPS crontab hitting this URL. Protected by the same
// shared-secret pattern as /api/cron/daily-report. Generates ONE draft post
// per call (three cron triggers a day = three posts a day) and always saves
// as an unpublished draft - a human reviews and publishes it in
// /manager/blogs, so a bad generation never reaches a live visitor.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || request.headers.get("x-cron-secret");

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { post, editUrl } = await generateBlogPost();

    await sendBlogDraftNotification({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      editUrl,
    });

    return NextResponse.json({
      success: true,
      id: post.id,
      slug: post.slug,
      title: post.title,
    });
  } catch (error) {
    console.error("Error generating AI blog post:", error);
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 });
  }
}
