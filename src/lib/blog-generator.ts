import { prisma } from "@/lib/prisma";
import { groqChatJSON } from "@/lib/groq";
import { BLOG_TOPICS, BlogTopic } from "@/lib/blog-topics";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";

const SITE_URL = "https://www.kigalicarrental.site";

// Groq has no image-generation endpoint, so the featured image is a real
// photo from the actual fleet rather than a fabricated/stock one - picked to
// match the topic where possible (safari/4x4 topics get an SUV, luxury/
// business topics get a luxury car), falling back to any featured car, then
// any available car, then a generic placeholder as a last resort.
async function pickFeaturedImage(topic: BlogTopic): Promise<string | null> {
  const text = `${topic.key} ${topic.brief} ${topic.primaryKeyword}`.toLowerCase();
  let preferredCategory: string | null = null;
  if (/luxury|wedding|vip|business|executive|conference/.test(text)) {
    preferredCategory = "luxury";
  } else if (/4x4|safari|akagera|volcanoes|nyungwe|camping|rooftop|gorilla|land cruiser|prado|suv/.test(text)) {
    preferredCategory = "suv";
  }

  const baseWhere = { available: true, images: { isEmpty: false } };

  let candidates = preferredCategory
    ? await prisma.car.findMany({ where: { ...baseWhere, category: preferredCategory }, select: { images: true } })
    : [];

  if (candidates.length === 0) {
    candidates = await prisma.car.findMany({ where: { ...baseWhere, featured: true }, select: { images: true } });
  }
  if (candidates.length === 0) {
    candidates = await prisma.car.findMany({ where: baseWhere, select: { images: true } });
  }
  if (candidates.length === 0) return null;

  const car = candidates[Math.floor(Math.random() * candidates.length)];
  return car.images[Math.floor(Math.random() * car.images.length)];
}

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

function mentionsSiteKeyword(text: string): boolean {
  return /kigali\s+car\s+rental/i.test(text);
}

function countSubheadings(html: string): number {
  return (html.match(/<h[23][ >]/gi) || []).length;
}

function buildBlogPrompts(topic: BlogTopic, corrective?: string) {
  const systemPrompt = `You are a senior travel and automotive content writer for Kigali Car Rental (kigalicarrental.site), a real car rental company operating in Kigali, Rwanda. You write genuinely useful, locally accurate, specific articles - never generic filler, never keyword-stuffed. Respond with ONLY a single valid JSON object, no markdown fences, no commentary, matching exactly this shape:
{
  "title": "string, specific and compelling, MUST contain the exact phrase \\"Kigali car rental\\" AND naturally work in this post's own angle/keyword",
  "excerpt": "string, 1-2 sentences, plain text, no HTML",
  "metaTitle": "string, under 60 characters, MUST contain the exact phrase \\"Kigali car rental\\"",
  "metaDescription": "string, under 155 characters, MUST contain the exact phrase \\"Kigali car rental\\", reads naturally, not stuffed",
  "tags": ["5 to 8 short SEO tag strings"],
  "metaKeywords": ["5 to 8 short SEO keyword phrases, the first one must be \\"Kigali car rental\\""],
  "content": "string of clean HTML using only <h2>, <h3>, <p>, <ul>, <li>, <strong> tags - 900 to 1300 words, with AT LEAST 4 <h2> subheadings (not 2 or 3 - four minimum), no <html>/<body> wrapper, no images, no links. The exact phrase \\"Kigali car rental\\" must appear naturally in the opening paragraph and again in the closing paragraph, plus 2-4 more times spread through the body - never back-to-back, never forced into a sentence where it reads awkwardly"
}
Every single post exists to reinforce "Kigali car rental" as this site's core commercial phrase, regardless of the specific angle each post covers - a post about driving tips or chauffeur etiquette still needs to read as being from, and pointing back to, a Kigali car rental company. That said, never sacrifice natural, specific, locally-accurate writing to hit a keyword count - work the phrase into sentences that would read naturally even without an SEO goal.`;

  const userPrompt = `Write a blog post for this angle: "${topic.brief}".
This post's own specific keyword/angle: "${topic.primaryKeyword}" - weave this in naturally alongside the required site keyword "Kigali car rental".
Category: ${topic.category}.
Do not include any links or anchor tags in the content - links will be added separately. Do not repeat the exact same opening sentence structure that generic AI travel blogs use ("Nestled in the heart of...", "Are you planning a trip to..."). Get specific and concrete fast.${corrective ? `\n\nIMPORTANT CORRECTION NEEDED: ${corrective}` : ""}`;

  return { systemPrompt, userPrompt };
}

async function writeWithGroq(topic: BlogTopic): Promise<GeneratedContent> {
  const { systemPrompt, userPrompt } = buildBlogPrompts(topic);
  const raw = await groqChatJSON(systemPrompt, userPrompt);
  if (!isGeneratedContent(raw)) {
    throw new Error("Groq response did not match the expected blog post shape");
  }

  // Groq doesn't always follow the keyword/structure instructions on the
  // first try - rather than silently publishing a post that dilutes the
  // site's core keyword (exactly the bug this replaces), validate the
  // actual output and give the model one corrective retry with the specific
  // problem named, instead of hoping the prompt alone is enough.
  const problems: string[] = [];
  if (!mentionsSiteKeyword(raw.title)) problems.push('the title is missing the exact phrase "Kigali car rental"');
  if (!mentionsSiteKeyword(raw.metaDescription)) problems.push('the metaDescription is missing the exact phrase "Kigali car rental"');
  if (!mentionsSiteKeyword(raw.content)) problems.push('the article body never mentions the exact phrase "Kigali car rental"');
  if (countSubheadings(raw.content) < 4) problems.push(`the content only has ${countSubheadings(raw.content)} <h2>/<h3> subheadings - needs at least 4`);

  if (problems.length === 0) {
    return raw;
  }

  const { systemPrompt: retrySystem, userPrompt: retryUser } = buildBlogPrompts(
    topic,
    `Your previous attempt had these specific problems, fix them: ${problems.join("; ")}.`
  );
  const retryRaw = await groqChatJSON(retrySystem, retryUser);
  if (!isGeneratedContent(retryRaw)) {
    throw new Error("Groq response did not match the expected blog post shape on retry");
  }
  return retryRaw;
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

  const [otherPostsPool, featuredImage] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 8,
      select: { slug: true, title: true },
    }),
    pickFeaturedImage(topic),
  ]);
  const otherPosts = otherPostsPool.sort(() => Math.random() - 0.5).slice(0, 2);

  const content = generated.content + buildInternalLinksBlock(topic, otherPosts);
  const slug = await uniqueSlug(slugify(generated.title));
  const now = new Date();

  const post = await prisma.blogPost.create({
    data: {
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content,
      featuredImage: featuredImage || CAR_IMAGE_FALLBACK,
      author: "Kigali Car Rental Team",
      category: topic.category,
      tags: generated.tags,
      metaTitle: generated.metaTitle,
      metaDescription: generated.metaDescription,
      metaKeywords: generated.metaKeywords,
      published: true,
      featured: false,
      publishedAt: now,
    },
  });

  return { post, liveUrl: `${SITE_URL}/blog/${post.slug}` };
}
