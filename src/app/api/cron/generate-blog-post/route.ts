import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/blog-generator";
import { sendBlogPublishedNotification } from "@/lib/email";

const POSTS_PER_RUN = 4;

// Triggered once a day at 8am by a VPS crontab hitting this URL. Protected
// by the same shared-secret pattern as /api/cron/daily-report. Generates
// and PUBLISHES 4 posts per run, fully automatically - no manager review
// step. If one generation fails, the rest still proceed; a single summary
// email covers whatever published plus how many failed.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || request.headers.get("x-cron-secret");

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const published: { id: string; slug: string; title: string }[] = [];
  const notified: { title: string; category: string; excerpt: string; liveUrl: string }[] = [];
  let failedCount = 0;

  for (let i = 0; i < POSTS_PER_RUN; i++) {
    try {
      const { post, liveUrl } = await generateBlogPost();
      published.push({ id: post.id, slug: post.slug, title: post.title });
      notified.push({ title: post.title, category: post.category, excerpt: post.excerpt, liveUrl });
    } catch (error) {
      failedCount += 1;
      console.error(`Error generating AI blog post (${i + 1}/${POSTS_PER_RUN}):`, error);
    }
  }

  await sendBlogPublishedNotification(notified, failedCount);

  return NextResponse.json({
    success: published.length > 0,
    publishedCount: published.length,
    failedCount,
    posts: published,
  });
}
