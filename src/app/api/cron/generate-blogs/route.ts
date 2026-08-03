import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const maxDuration = 300;

const ALL_TOPICS: { topic: string; category: string }[] = [
  // Travel Guides
  { topic: "Best Places to Visit in Rwanda by Car in 2025", category: "travel-guides" },
  { topic: "Kigali to Lake Kivu Road Trip: Complete Self-Drive Guide", category: "travel-guides" },
  { topic: "Gorilla Trekking Volcanoes National Park: Car Hire Guide", category: "travel-guides" },
  { topic: "Nyungwe Forest National Park: How to Get There by Car", category: "travel-guides" },
  { topic: "Akagera National Park Self-Drive Safari Guide", category: "travel-guides" },
  { topic: "Top 10 Weekend Getaways from Kigali by Car", category: "travel-guides" },
  { topic: "Rwanda East Africa Road Trip: Kigali to Nairobi", category: "travel-guides" },
  { topic: "Kigali to Musanze Drive Guide: Road, Distance and Tips", category: "travel-guides" },
  { topic: "Best Scenic Routes in Rwanda for a Road Trip", category: "travel-guides" },
  { topic: "Golden Monkey Trekking Rwanda: How to Get There by Car", category: "travel-guides" },
  { topic: "Kigali to Gisenyi Drive: Lake Kivu Beach Road Guide", category: "travel-guides" },
  { topic: "Rwanda Rainy Season Road Trip: What to Know", category: "travel-guides" },
  { topic: "Best Waterfalls in Rwanda You Can Visit by Car", category: "travel-guides" },
  { topic: "Rwanda Tea Plantation Tour by Car from Kigali", category: "travel-guides" },
  { topic: "Kigali to Butare Road Trip: Southern Rwanda Guide", category: "travel-guides" },
  { topic: "Rwanda Safari Circuit Road Trip: Complete Itinerary", category: "travel-guides" },
  { topic: "Kigali to Rubavu Drive Guide: Distance and Road Tips", category: "travel-guides" },
  { topic: "Rwanda Top 5 National Parks: Self-Drive Guide", category: "travel-guides" },
  { topic: "Rwanda Coffee Farm Tour by Car from Kigali", category: "travel-guides" },
  { topic: "Kigali to Uganda Border by Car: Katuna Crossing Guide", category: "travel-guides" },
  { topic: "Rwanda Southern Province Road Trip Itinerary", category: "travel-guides" },
  { topic: "Rwanda Eastern Province Safari Drive: Akagera Guide", category: "travel-guides" },
  { topic: "Rwanda Chimpanzee Trekking Nyungwe: Car Hire Guide", category: "travel-guides" },
  { topic: "Rwanda Birding Safari by Car: Top Birding Spots", category: "travel-guides" },
  { topic: "Rwanda Honeymoon Road Trip: Romantic Getaways by Car", category: "travel-guides" },
  // Car Tips
  { topic: "How to Hire a Car in Kigali: Step-by-Step Guide", category: "car-tips" },
  { topic: "Self-Drive Rwanda: Everything Visitors Need to Know", category: "car-tips" },
  { topic: "4x4 vs Saloon Car: Which is Best for Rwanda Roads?", category: "car-tips" },
  { topic: "International Driving Permit Rwanda: Do You Need One?", category: "car-tips" },
  { topic: "Car Hire Kigali Airport: What to Expect on Arrival", category: "car-tips" },
  { topic: "Rwanda Road Rules and Driving Tips for Tourists", category: "car-tips" },
  { topic: "How Much Does Car Hire Cost in Kigali? 2025 Price Guide", category: "car-tips" },
  { topic: "Best Car for Gorilla Trekking in Rwanda", category: "car-tips" },
  { topic: "Kigali Car Rental with Driver vs Self-Drive: Which to Choose", category: "car-tips" },
  { topic: "Rwanda Car Hire Requirements: Documents You Need", category: "car-tips" },
  { topic: "How to Book a Hire Car Online in Kigali", category: "car-tips" },
  { topic: "Car Hire Payment Methods in Rwanda: MoMo, Cash and More", category: "car-tips" },
  { topic: "Rwanda Car Hire Insurance Explained for Tourists", category: "car-tips" },
  { topic: "Tips for Driving in Kigali City Traffic", category: "car-tips" },
  { topic: "Driving at Night in Rwanda: Safety Tips", category: "car-tips" },
  { topic: "Fuel Stations in Rwanda: Petrol, Diesel and Prices", category: "car-tips" },
  { topic: "Monthly Car Hire in Kigali: Rates and What to Know", category: "car-tips" },
  { topic: "Corporate Car Hire in Kigali: Benefits for Business Travellers", category: "car-tips" },
  { topic: "NGO and UN Car Hire in Kigali: Complete Guide", category: "car-tips" },
  { topic: "Wedding Car Hire Kigali: How to Plan and Book", category: "car-tips" },
  { topic: "Long Term Car Hire Kigali vs Buying a Car in Rwanda", category: "car-tips" },
  { topic: "Luxury Car Hire Kigali: Top Vehicles and What They Cost", category: "car-tips" },
  { topic: "Rwanda Car Hire Age Requirements and Restrictions", category: "car-tips" },
  { topic: "Kigali Car Rental vs Taxi App: Which is Cheaper for Long Trips", category: "car-tips" },
  { topic: "What Happens If You Damage a Hire Car in Rwanda", category: "car-tips" },
  // Rwanda Tourism
  { topic: "Rwanda Tourism 2025: Complete Travel Guide", category: "rwanda-tourism" },
  { topic: "Kigali City Tour: Top 15 Attractions to Visit by Car", category: "rwanda-tourism" },
  { topic: "Kigali Genocide Memorial: Planning a Respectful Visit", category: "rwanda-tourism" },
  { topic: "Rwanda Gorilla Permits 2025: How to Book and What It Costs", category: "rwanda-tourism" },
  { topic: "Rwanda vs Uganda: Which Country for Gorilla Trekking?", category: "rwanda-tourism" },
  { topic: "Best Hotels in Kigali: Location, Access and Getting Around", category: "rwanda-tourism" },
  { topic: "Rwanda MICE Tourism: Conference and Event Car Hire", category: "rwanda-tourism" },
  { topic: "Rwanda Visa on Arrival: Complete Tourist Entry Guide", category: "rwanda-tourism" },
  { topic: "Is Rwanda Safe to Visit in 2025? Tourist Safety Guide", category: "rwanda-tourism" },
  { topic: "Kigali Restaurants and Nightlife: Getting Around by Car", category: "rwanda-tourism" },
  { topic: "Rwanda Culture and Heritage Tour by Car", category: "rwanda-tourism" },
  { topic: "Rwanda Adventure Tourism: Hiking, Biking and 4x4 Safaris", category: "rwanda-tourism" },
  { topic: "Rwanda Eco-Tourism: Sustainable Travel by Car", category: "rwanda-tourism" },
  { topic: "Rwanda Business Travel Guide: Car Hire for Professionals", category: "rwanda-tourism" },
  { topic: "Rwanda Conservation Areas: A Car Hire Tour Guide", category: "rwanda-tourism" },
  { topic: "Kigali as Africa's Cleanest City: A Visitor's Guide", category: "rwanda-tourism" },
  { topic: "Rwanda Expat Guide: Car Hire for Long-Term Residents", category: "rwanda-tourism" },
  { topic: "Kigali Convention Centre: Getting There and Car Hire", category: "rwanda-tourism" },
  { topic: "Rwanda Before and After: History and Reconciliation Tour", category: "rwanda-tourism" },
  { topic: "Rwanda Family Travel Guide: Car Hire with Kids", category: "rwanda-tourism" },
  { topic: "Rwanda Solo Travel Guide: Hiring a Car as a Solo Traveller", category: "rwanda-tourism" },
  { topic: "Rwanda Photography Tour: Best Spots Accessible by Car", category: "rwanda-tourism" },
  { topic: "Rwanda Budget Travel: Affordable Car Hire Options", category: "rwanda-tourism" },
  { topic: "Kigali Inema Arts Centre and Cultural Sites by Car", category: "rwanda-tourism" },
  { topic: "Rwanda Public Holidays 2025: Travel and Car Hire Tips", category: "rwanda-tourism" },
  // Car Maintenance
  { topic: "What to Check Before Your Rwanda Self-Drive Trip", category: "car-maintenance" },
  { topic: "Rwanda Rainy Season Driving: Safety Tips for Wet Roads", category: "car-maintenance" },
  { topic: "What to Do If Your Hire Car Breaks Down in Rwanda", category: "car-maintenance" },
  { topic: "Rwanda Mountain Roads: Driving High Altitude Routes Safely", category: "car-maintenance" },
  { topic: "Rwanda Road Conditions by Season: Dry vs Wet Season Driving", category: "car-maintenance" },
  { topic: "Driving on Rwanda Dirt Roads and Unpaved Tracks: Tips", category: "car-maintenance" },
  { topic: "Emergency Contacts Every Driver Needs in Rwanda", category: "car-maintenance" },
  { topic: "Rwanda Car Accident Procedure: What to Do Step by Step", category: "car-maintenance" },
  { topic: "Petrol vs Diesel Cars in Rwanda: Which is Better for Safari", category: "car-maintenance" },
  { topic: "Rwanda Police Checkpoints: What Drivers Need to Know", category: "car-maintenance" },
  { topic: "Spare Tyre and Emergency Kit for Rwanda Road Trips", category: "car-maintenance" },
  { topic: "Driving Rwanda's Congo Nile Trail: 4x4 Tips and Safety", category: "car-maintenance" },
  { topic: "Kigali Parking Tips: Zones, Costs and Rules", category: "car-maintenance" },
  { topic: "GPS and Navigation in Rwanda: Best Apps for Drivers", category: "car-maintenance" },
  { topic: "Rwanda Road Signs Explained for International Drivers", category: "car-maintenance" },
  // Company News
  { topic: "Why Kigali Car Rental is Rwanda's Most Trusted Car Rental", category: "company-news" },
  { topic: "Kigali Car Rental Fleet 2025: New Cars Now Available", category: "company-news" },
  { topic: "How Kigali Car Rental Supports Rwanda Tourism", category: "company-news" },
  { topic: "Kigali Car Rental Special Offers and Discounts 2025", category: "company-news" },
  { topic: "Our Airport Transfer Service: Fast and Reliable from KGL", category: "company-news" },
  { topic: "Kigali Car Rental vs Other Rwanda Car Rental Companies", category: "company-news" },
  { topic: "How to Contact Kigali Car Rental: WhatsApp, Phone and Email", category: "company-news" },
  { topic: "Kigali Car Rental Customer Reviews: What Our Clients Say", category: "company-news" },
  { topic: "Our Commitment to Safe and Clean Vehicles in Rwanda", category: "company-news" },
  { topic: "Kigali Car Rental: Serving Tourists, NGOs and Businesses Since 2015", category: "company-news" },
  // Car Rental (primary keyword topics)
  { topic: "Kigali Car Rental Guide: Everything Visitors Need to Know", category: "car-tips" },
  { topic: "Car Rental Kigali Airport: What to Expect on Arrival", category: "car-tips" },
  { topic: "How Much Does Car Rental Cost in Kigali? 2026 Price Guide", category: "car-tips" },
  { topic: "Best Car Rental Company in Kigali: What to Look For", category: "car-tips" },
  { topic: "Car Rental vs Car Hire in Rwanda: Is There a Difference?", category: "car-tips" },
  { topic: "Monthly Car Rental in Kigali: Rates and What to Know", category: "car-tips" },
  { topic: "Cheap Car Rental Kigali: Budget Options for Every Traveller", category: "car-tips" },
  { topic: "Car Rental Insurance in Kigali Explained", category: "car-tips" },
  { topic: "Car Rental Kigali for Tourists: A Complete Guide", category: "travel-guides" },
  { topic: "Kigali to Lake Kivu Car Rental: Self-Drive Guide", category: "travel-guides" },
  { topic: "Car Rental for Gorilla Trekking in Rwanda: What You Need", category: "travel-guides" },
  { topic: "Car Rental Kigali Reviews: Why Choose a Trusted Company", category: "company-news" },
];

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

export async function GET(request: NextRequest) {
  // Verify Vercel cron secret
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "GROQ_API_KEY not set" }, { status: 500 });
  }

  try {
    // Pick next topic by cycling through the list based on total blog count
    const [existingCount, existingBlogs] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.findMany({
        select: { title: true, slug: true },
        orderBy: { createdAt: "desc" },
        take: 30,
      }),
    ]);

    const topicIndex = existingCount % ALL_TOPICS.length;
    const { topic, category } = ALL_TOPICS[topicIndex];

    const existingTitles = existingBlogs.length
      ? existingBlogs.map((b) => `- ${b.title} (link: https://kigalicarrental.site/blog/${b.slug})`).join("\n")
      : "No existing posts yet.";

    const internalLinks = INTERNAL_PAGES.map(
      (p) => `- ${p.label}: https://kigalicarrental.site${p.href}`
    ).join("\n");

    const prompt = `You are an expert SEO content writer for Kigali Car Rental (kigalicarrental.site), Rwanda's #1 car rental company. Based in Kigali, Rwanda. Cars from $30/day. Self-drive and chauffeur-driven. WhatsApp: +250787619387. Book at https://kigalicarrental.site/book-now.

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
5. Anchor text for internal links must be natural (not just "click here")
6. End with a CTA paragraph naturally linking to https://kigalicarrental.site/book-now
7. Tone: friendly, expert, trustworthy — like a local who knows Rwanda well

OUTPUT: Return ONLY a raw JSON object — no markdown fences, no explanation:
{
  "title": "Compelling SEO title 50-60 chars",
  "slug": "url-friendly-slug",
  "excerpt": "Meta excerpt 130-155 chars with main keyword",
  "content": "<h2>...</h2><p>...</p> (full HTML article body)",
  "category": "${category}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaTitle": "SEO meta title 50-60 chars including Kigali Car Rental",
  "metaDescription": "Meta description 140-160 chars with keyword and CTA",
  "metaKeywords": ["kw1", "kw2", "kw3", "kw4", "kw5", "kw6", "kw7"]
}`;

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096,
      temperature: 0.7,
    });

    const fullText = completion.choices[0]?.message?.content ?? "";

    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "AI did not return valid JSON", topicIndex, topic }, { status: 500 });
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return Response.json({ error: "JSON parse failed", topicIndex, topic }, { status: 500 });
    }

    const slug = (parsed.slug as string)
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ?? topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const blog = await prisma.blogPost.create({
      data: {
        title: (parsed.title as string) || topic,
        slug,
        excerpt: (parsed.excerpt as string) || "",
        content: (parsed.content as string) || "",
        featuredImage: null,
        author: "Kigali Car Rental Team",
        category,
        tags: (parsed.tags as string[]) || [],
        metaTitle: (parsed.metaTitle as string) || topic,
        metaDescription: (parsed.metaDescription as string) || "",
        metaKeywords: (parsed.metaKeywords as string[]) || [],
        published: true,
        featured: false,
        publishedAt: new Date(),
      },
    });

    return Response.json({
      success: true,
      slug: blog.slug,
      title: blog.title,
      topicIndex,
      totalBlogs: existingCount + 1,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
