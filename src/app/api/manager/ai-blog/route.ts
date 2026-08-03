import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const maxDuration = 300;

const INTERNAL_PAGES = [
  { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
  { label: "Self-Drive Rwanda", href: "/self-drive-rwanda" },
  { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
  { label: "Gorilla Trekking Car Hire", href: "/gorilla-trekking-car-hire" },
  { label: "Wedding Car Hire Kigali", href: "/wedding-car-hire-kigali" },
  { label: "Corporate Car Hire Kigali", href: "/corporate-car-hire-kigali" },
  { label: "Luxury Car Hire Kigali", href: "/luxury-car-hire-kigali" },
  { label: "Long-Term Car Hire Kigali", href: "/long-term-car-hire-kigali" },
  { label: "NGO Car Hire Kigali", href: "/ngo-car-hire-kigali" },
  { label: "Lake Kivu Car Hire", href: "/lake-kivu-car-hire" },
  { label: "Nyungwe Forest Car Hire", href: "/nyungwe-forest-car-hire" },
  { label: "Volcanoes National Park Car Hire", href: "/volcanoes-national-park-car-hire" },
];

export async function POST(request: NextRequest) {
  try {
    const { topic, category } = await request.json();

    if (!topic || !category) {
      return new Response(
        JSON.stringify({ error: "topic and category are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY is not set. Get a free key at https://console.groq.com" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingBlogs = await prisma.blogPost.findMany({
      select: { title: true, slug: true },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    const existingTitles = existingBlogs.length
      ? existingBlogs.map((b) => `- ${b.title} (link: https://kigalicarhire.rw/blog/${b.slug})`).join("\n")
      : "No existing posts yet.";

    const internalLinks = INTERNAL_PAGES.map(
      (p) => `- ${p.label}: https://kigalicarhire.rw${p.href}`
    ).join("\n");

    const prompt = `You are an expert SEO content writer for Kigali Car Hire (kigalicarhire.rw), Rwanda's #1 car rental company. Based in Kigali, Rwanda. Cars from $30/day. Self-drive and chauffeur-driven. WhatsApp: +250788892976. Book at https://kigalicarhire.rw/book-now.

Write a complete, SEO-optimized blog post about: "${topic}"
Category: ${category}

EXISTING BLOG POSTS on our site — DO NOT duplicate topics, but DO cross-link naturally to related ones:
${existingTitles}

INTERNAL SERVICE PAGES — link to at least 3 of these naturally within the article:
${internalLinks}

WRITING RULES:
1. Use "${topic}" and natural variations as the main keyword throughout
2. Write 900-1200 words of genuinely helpful, specific content (not generic filler)
3. Mention specific Rwanda/Kigali places, roads, parks, prices where relevant
4. Use proper HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a href="...">
5. Anchor text for internal links must be natural (e.g. "hire a 4x4 in Rwanda", not just "click here")
6. End with a CTA paragraph naturally linking to https://kigalicarhire.rw/book-now
7. Tone: friendly, expert, trustworthy — like a local who knows Rwanda well

OUTPUT: Return ONLY a raw JSON object — no markdown fences, no explanation, just the JSON:
{
  "title": "Compelling SEO title 50-60 chars",
  "slug": "url-friendly-slug",
  "excerpt": "Meta excerpt 130-155 chars with main keyword",
  "content": "<h2>...</h2><p>...</p> (full HTML article body)",
  "category": "${category}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaTitle": "SEO meta title 50-60 chars including Kigali Car Hire",
  "metaDescription": "Meta description 140-160 chars with keyword and CTA",
  "metaKeywords": ["kw1", "kw2", "kw3", "kw4", "kw5", "kw6", "kw7"]
}`;

    const groq = new Groq({ apiKey });
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          let fullText = "";

          const stream = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            stream: true,
            max_tokens: 4096,
            temperature: 0.7,
          });

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullText += text;
              send("chunk", { text });
            }
          }

          // Strip markdown fences if the model wrapped the JSON
          const jsonMatch = fullText.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            send("error", { message: "AI did not return valid JSON. Try again." });
            controller.close();
            return;
          }

          let parsed: Record<string, unknown>;
          try {
            parsed = JSON.parse(jsonMatch[0]);
          } catch {
            send("error", { message: "Failed to parse AI response. Try again." });
            controller.close();
            return;
          }

          parsed.author = "Kigali Car Hire Team";
          parsed.published = false;
          parsed.featured = false;

          send("done", { result: parsed });
        } catch (err) {
          const message = err instanceof Error ? err.message : "AI generation failed";
          send("error", { message });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Request failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
