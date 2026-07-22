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

function countSiteKeywordMentions(text: string): number {
  return (text.match(/kigali\s+car\s+rental/gi) || []).length;
}

function countSubheadings(html: string): number {
  return (html.match(/<h[23][ >]/gi) || []).length;
}

// At least one subheading should carry the phrase (or the post's own topic
// keyword) - a keyword buried only in body prose is weaker than one that
// also shows up in a heading Google weights more heavily.
function subheadingsText(html: string): string {
  return (html.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi) || []).join(" ");
}

function countWords(html: string): number {
  return html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
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
  "content": "string of clean HTML using only <h2>, <h3>, <p>, <ul>, <li>, <strong> tags - 900 to 1300 words, with AT LEAST 4 <h2> subheadings (not 2 or 3 - four minimum), no <html>/<body> wrapper, no images, no links. The exact phrase \\"Kigali car rental\\" must appear naturally in the opening paragraph, again in the closing paragraph, in the text of AT LEAST ONE <h2> or <h3> subheading (not just body prose), and at least 5 times total across the whole piece - never back-to-back, never forced into a sentence where it reads awkwardly"
}
Every single post exists to reinforce "Kigali car rental" as this site's core commercial phrase, regardless of the specific angle each post covers - a post about driving tips or chauffeur etiquette still needs to read as being from, and pointing back to, a Kigali car rental company. That said, never sacrifice natural, specific, locally-accurate writing to hit a keyword count - work the phrase into sentences that would read naturally even without an SEO goal.`;

  const userPrompt = `Write a blog post for this angle: "${topic.brief}".
This post's own specific keyword/angle: "${topic.primaryKeyword}" - weave this in naturally alongside the required site keyword "Kigali car rental".
Category: ${topic.category}.
Do not include any links or anchor tags in the content - links will be added separately. Do not repeat the exact same opening sentence structure that generic AI travel blogs use ("Nestled in the heart of...", "Are you planning a trip to..."). Get specific and concrete fast.${corrective ? `\n\nIMPORTANT CORRECTION NEEDED: ${corrective}` : ""}`;

  return { systemPrompt, userPrompt };
}

function findProblems(content: GeneratedContent): string[] {
  const problems: string[] = [];
  if (!mentionsSiteKeyword(content.title)) problems.push('the title is missing the exact phrase "Kigali car rental"');
  if (!mentionsSiteKeyword(content.metaDescription)) problems.push('the metaDescription is missing the exact phrase "Kigali car rental"');
  const mentionCount = countSiteKeywordMentions(content.content);
  if (mentionCount < 5) problems.push(`the article body only mentions the exact phrase "Kigali car rental" ${mentionCount} time(s) - needs at least 5, spread naturally through the piece, not clustered`);
  if (countSubheadings(content.content) < 4) problems.push(`the content only has ${countSubheadings(content.content)} <h2>/<h3> subheadings - needs at least 4`);
  if (!mentionsSiteKeyword(subheadingsText(content.content))) problems.push('none of the <h2>/<h3> subheadings contain the exact phrase "Kigali car rental" - at least one heading needs it, not just body paragraphs');
  const wordCount = countWords(content.content);
  if (wordCount < 850) problems.push(`the content is only ${wordCount} words - needs to be 900-1300 words. Do not add filler - add one more concrete <h2> section with specific, useful detail (a real tip, a real place, a real number) to reach length naturally`);
  return problems;
}

const MAX_WRITE_ATTEMPTS = 3;
const MAX_EXPAND_ATTEMPTS = 2;

// Regenerating from scratch is a gamble on length every time - Groq tends to
// systematically undershoot the word target regardless of how many fresh
// attempts it gets. Extending the best existing draft (a concrete anchor to
// build on) converges far more reliably than hoping a new draft lands longer.
async function expandContent(topic: BlogTopic, content: GeneratedContent): Promise<GeneratedContent> {
  const expandSystemPrompt = `You are a senior travel and automotive content writer for Kigali Car Rental (kigalicarrental.site), a real car rental company in Kigali, Rwanda. Respond with ONLY a single valid JSON object, no markdown fences, no commentary, matching exactly this shape: { "content": "string" }`;

  const expandUserPrompt = `Here is an existing draft blog post body (clean HTML, <h2>/<h3>/<p>/<ul>/<li>/<strong> only):

${content.content}

This is currently about ${countWords(content.content)} words but needs to reach 900-1300 words total. Add ONE additional <h2> section with genuinely concrete, useful, specific detail about "${topic.brief}" (a real practical tip, a real place in Kigali/Rwanda, a real number or price range) - not filler, not repetition of what's already covered. Weave in the exact phrase "Kigali car rental" naturally within the new section. Insert the new section right before the final closing paragraph so the piece still ends on a conclusion. Do not alter, shorten, remove, or rephrase any existing sentence - return the COMPLETE updated body (all existing HTML plus the new section) as one HTML string in the "content" field.`;

  const raw = await groqChatJSON(expandSystemPrompt, expandUserPrompt);
  if (!raw || typeof raw !== "object" || typeof (raw as Record<string, unknown>).content !== "string") {
    return content;
  }
  return { ...content, content: (raw as Record<string, unknown>).content as string };
}

async function writeWithGroq(topic: BlogTopic): Promise<GeneratedContent> {
  // Groq doesn't reliably follow every instruction (keyword placement,
  // subheading count, word count) on the first try - rather than silently
  // publishing a post that dilutes the site's core keyword or runs thin
  // (exactly the bugs this replaces), validate the actual output and loop
  // with a corrective prompt naming the specific gap, up to a few attempts.
  // Unattended 4x/day generation needs this to be enforced, not hoped for.
  let best: GeneratedContent | null = null;
  let bestProblems: string[] = [];
  let corrective: string | undefined;

  for (let attempt = 1; attempt <= MAX_WRITE_ATTEMPTS; attempt++) {
    const { systemPrompt, userPrompt } = buildBlogPrompts(topic, corrective);
    const raw = await groqChatJSON(systemPrompt, userPrompt);
    if (!isGeneratedContent(raw)) {
      throw new Error(`Groq response did not match the expected blog post shape (attempt ${attempt})`);
    }

    const problems = findProblems(raw);
    console.log(`[blog-generator] attempt ${attempt}/${MAX_WRITE_ATTEMPTS} for "${topic.key}": ${problems.length === 0 ? "PASSED" : problems.length + " problem(s) - " + problems.join(" | ")}`);

    if (problems.length === 0) {
      return raw;
    }
    if (best === null || problems.length < bestProblems.length) {
      best = raw;
      bestProblems = problems;
    }
    corrective = `Your previous attempt had these specific problems, fix them: ${problems.join("; ")}.`;
  }

  let current = best as GeneratedContent;
  let currentProblems = bestProblems;
  for (
    let expandAttempt = 1;
    expandAttempt <= MAX_EXPAND_ATTEMPTS && currentProblems.some((p) => p.includes("word"));
    expandAttempt++
  ) {
    const expanded = await expandContent(topic, current);
    const problems = findProblems(expanded);
    console.log(`[blog-generator] expand attempt ${expandAttempt}/${MAX_EXPAND_ATTEMPTS} for "${topic.key}": ${problems.length === 0 ? "PASSED" : problems.length + " problem(s) - " + problems.join(" | ")}`);
    current = expanded;
    currentProblems = problems;
    if (problems.length === 0) {
      return expanded;
    }
  }

  if (currentProblems.length > 0) {
    console.warn(`[blog-generator] "${topic.key}" never fully passed validation, publishing closest attempt (${currentProblems.length} remaining issue(s)): ${currentProblems.join(" | ")}`);
  }
  return current;
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
