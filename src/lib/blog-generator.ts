import { prisma } from "@/lib/prisma";
import { groqChatJSON } from "@/lib/groq";
import { BLOG_TOPICS, BlogTopic } from "@/lib/blog-topics";

const SITE_URL = "https://www.kigalicarrental.site";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function pickTopic(): Promise<BlogTopic> {
  const recent = await prisma.generatedTopicLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 25,
    select: { topicKey: true },
  });
  const recentKeys = new Set(recent.map((r) => r.topicKey));
  const available = BLOG_TOPICS.filter((t) => !recentKeys.has(t.key));
  const pool = available.length > 0 ? available : BLOG_TOPICS;
  const topic = pool[Math.floor(Math.random() * pool.length)];

  await prisma.generatedTopicLog.create({ data: { topicKey: topic.key } });
  return topic;
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || `kigali-car-rental-guide-${Date.now()}`;
  let attempt = 0;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = `${base}-${attempt + 1}`;
  }
  return slug;
}

interface GeneratedContent {
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  metaKeywords: string[];
  content: string;
}

function isGeneratedContent(value: unknown): value is GeneratedContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.title === "string" &&
    typeof v.excerpt === "string" &&
    typeof v.content === "string" &&
    Array.isArray(v.tags) &&
    Array.isArray(v.metaKeywords)
  );
}

async function writeWithGroq(topic: BlogTopic): Promise<GeneratedContent> {
  const systemPrompt = `You are a senior travel and automotive content writer for Kigali Car Rental (kigalicarrental.site), a real car rental company operating in Kigali, Rwanda. You write genuinely useful, locally accurate, specific articles - never generic filler, never keyword-stuffed. The exact phrase "Kigali car rental" is the site's main target keyword, so prefer that exact phrasing (not "car rental in Kigali" or "Kigali car hire") the majority of the times you reference the business or the service, while still allowing occasional natural variation so the text doesn't read like it's repeating one phrase, and you write like someone who actually knows Rwanda's roads, parks and travel logistics. Respond with ONLY a single valid JSON object, no markdown fences, no commentary, matching exactly this shape:
{
  "title": "string, specific and compelling, includes the primary keyword naturally",
  "excerpt": "string, 1-2 sentences, plain text, no HTML",
  "metaTitle": "string, under 60 characters, includes the primary keyword",
  "metaDescription": "string, under 155 characters, includes the primary keyword",
  "tags": ["5 to 8 short SEO tag strings"],
  "metaKeywords": ["5 to 8 short SEO keyword phrases"],
  "content": "string of clean HTML using only <h2>, <h3>, <p>, <ul>, <li>, <strong> tags - 900 to 1300 words, well structured with 3-5 subheadings, no <html>/<body> wrapper, no images, no links"
}`;

  const userPrompt = `Write a blog post for this angle: "${topic.brief}".
Primary keyword to target naturally: "${topic.primaryKeyword}".
Category: ${topic.category}.
Do not include any links or anchor tags in the content - links will be added separately. Do not repeat the exact same opening sentence structure that generic AI travel blogs use ("Nestled in the heart of...", "Are you planning a trip to..."). Get specific and concrete fast.`;

  const raw = await groqChatJSON(systemPrompt, userPrompt);
  if (!isGeneratedContent(raw)) {
    throw new Error("Groq response did not match the expected blog post shape");
  }
  return raw;
}

function buildInternalLinksBlock(topic: BlogTopic, otherPosts: { slug: string; title: string }[]): string {
  const relatedLinks = topic.linkTargets
    .map((t) => `<li><a href="${t.path}">${t.label}</a></li>`)
    .join("\n");

  const morePosts = otherPosts.length
    ? `<h3>More Kigali Car Rental Guides</h3>
<ul>
${otherPosts.map((p) => `<li><a href="/blog/${p.slug}">${p.title}</a></li>`).join("\n")}
</ul>`
    : "";

  return `
<h3>Plan Your Trip with Kigali Car Rental</h3>
<ul>
<li><a href="/fleet">Browse our full fleet of rental cars in Kigali</a></li>
${relatedLinks}
<li><a href="/book-now">Book your Kigali car rental today</a></li>
</ul>
${morePosts}`;
}

export async function generateBlogPost() {
  const topic = await pickTopic();
  const generated = await writeWithGroq(topic);

  const otherPostsPool = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 8,
    select: { slug: true, title: true },
  });
  const otherPosts = otherPostsPool.sort(() => Math.random() - 0.5).slice(0, 2);

  const content = generated.content + buildInternalLinksBlock(topic, otherPosts);
  const slug = await uniqueSlug(slugify(generated.title));

  const post = await prisma.blogPost.create({
    data: {
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content,
      author: "Kigali Car Rental Team",
      category: topic.category,
      tags: generated.tags,
      metaTitle: generated.metaTitle,
      metaDescription: generated.metaDescription,
      metaKeywords: generated.metaKeywords,
      published: false,
      featured: false,
    },
  });

  return { post, editUrl: `${SITE_URL}/manager/blogs/${post.id}/edit` };
}
