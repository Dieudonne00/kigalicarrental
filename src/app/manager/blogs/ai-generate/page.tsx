"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const CATEGORIES = [
  { value: "car-tips", label: "Car Tips" },
  { value: "travel-guides", label: "Travel Guides" },
  { value: "company-news", label: "Company News" },
  { value: "rwanda-tourism", label: "Rwanda Tourism" },
  { value: "car-maintenance", label: "Car Maintenance" },
];

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
  { topic: "5 Reasons Travellers Choose Kigali Car Rental", category: "company-news" },
  { topic: "Kigali Car Rental Fleet 2025: New Cars Now Available", category: "company-news" },
  { topic: "How Kigali Car Rental Supports Rwanda Tourism", category: "company-news" },
  { topic: "Kigali Car Rental Special Offers and Discounts 2025", category: "company-news" },
  { topic: "Our Airport Transfer Service: Fast and Reliable from KGL", category: "company-news" },
  { topic: "Kigali Car Rental vs Other Rwanda Car Rental Companies", category: "company-news" },
  { topic: "How to Contact Kigali Car Rental: WhatsApp, Phone and Email", category: "company-news" },
  { topic: "Kigali Car Rental Customer Reviews: What Our Clients Say", category: "company-news" },
  { topic: "Our Commitment to Safe and Clean Vehicles in Rwanda", category: "company-news" },
  { topic: "Kigali Car Rental: Serving Tourists, NGOs and Businesses Since 2015", category: "company-news" },
];

interface BulkStatus {
  topic: string;
  category: string;
  state: "pending" | "generating" | "publishing" | "done" | "error";
  error?: string;
  slug?: string;
}

interface GeneratedBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  author: string;
  published: boolean;
  featured: boolean;
}

type Mode = "single" | "bulk";
type SingleStatus = "idle" | "generating" | "done" | "publishing" | "published" | "error";

const DELAY_MS = 25000; // 25s between requests to stay within Groq rate limit

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateAndPublish(
  topic: string,
  category: string,
  onChunk: (text: string) => void
): Promise<{ ok: true; slug: string } | { ok: false; error: string }> {
  const res = await fetch("/api/manager/ai-blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, category }),
  });

  if (!res.ok || !res.body) return { ok: false, error: `HTTP ${res.status}` };

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result: GeneratedBlog | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const eventLine = part.split("\n").find((l) => l.startsWith("event: "));
      const dataLine = part.split("\n").find((l) => l.startsWith("data: "));
      if (!eventLine || !dataLine) continue;
      const event = eventLine.slice(7).trim();
      let data: { text?: string; result?: GeneratedBlog; message?: string };
      try { data = JSON.parse(dataLine.slice(6)); } catch { continue; }

      if (event === "chunk" && data.text) onChunk(data.text);
      else if (event === "done" && data.result) result = data.result;
      else if (event === "error") return { ok: false, error: data.message ?? "Generation failed" };
    }
  }

  if (!result) return { ok: false, error: "No result received" };

  const pubRes = await fetch("/api/manager/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...result, published: true }),
  });
  if (!pubRes.ok) {
    const err = await pubRes.json().catch(() => ({}));
    return { ok: false, error: err.error ?? `Publish HTTP ${pubRes.status}` };
  }
  const { blog } = await pubRes.json();
  return { ok: true, slug: blog.slug };
}

export default function AIBlogGeneratePage() {
  const [mode, setMode] = useState<Mode>("single");

  // Single mode state
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("car-tips");
  const [singleStatus, setSingleStatus] = useState<SingleStatus>("idle");
  const [streamText, setStreamText] = useState("");
  const [result, setResult] = useState<GeneratedBlog | null>(null);
  const [singleError, setSingleError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");
  const [featured, setFeatured] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  // Bulk mode state
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkFilter, setBulkFilter] = useState("all");
  const [bulkStatuses, setBulkStatuses] = useState<BulkStatus[]>([]);
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkDone, setBulkDone] = useState(0);
  const [bulkTotal, setBulkTotal] = useState(0);
  const [currentStream, setCurrentStream] = useState("");
  const stopRef = useRef(false);

  const filteredTopics = bulkFilter === "all"
    ? ALL_TOPICS
    : ALL_TOPICS.filter((t) => t.category === bulkFilter);

  const toggleSelect = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(filteredTopics.map((_, i) => ALL_TOPICS.indexOf(filteredTopics[i]))));
  const selectNone = () => setSelected(new Set());

  const startBulk = async () => {
    const queue = Array.from(selected).map((i) => ALL_TOPICS[i]);
    if (!queue.length) return;

    stopRef.current = false;
    setBulkRunning(true);
    setBulkDone(0);
    setBulkTotal(queue.length);
    setBulkStatuses(queue.map((q) => ({ topic: q.topic, category: q.category, state: "pending" })));

    for (let i = 0; i < queue.length; i++) {
      if (stopRef.current) break;

      const { topic, category } = queue[i];

      setBulkStatuses((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], state: "generating" };
        return next;
      });
      setCurrentStream("");

      const genResult = await generateAndPublish(topic, category, (text) => {
        setCurrentStream((p) => p + text);
      });

      if (genResult.ok) {
        setBulkStatuses((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], state: "done", slug: genResult.slug };
          return next;
        });
      } else {
        setBulkStatuses((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], state: "error", error: genResult.error };
          return next;
        });
      }

      setBulkDone((d) => d + 1);

      if (i < queue.length - 1 && !stopRef.current) {
        await delay(DELAY_MS);
      }
    }

    setBulkRunning(false);
    setCurrentStream("");
  };

  // Single mode handlers
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(async () => {
    if (!topic.trim()) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setSingleStatus("generating");
    setStreamText("");
    setResult(null);
    setSingleError("");

    try {
      const response = await fetch("/api/manager/ai-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), category }),
        signal: abortRef.current.signal,
      });

      if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const eventLine = part.split("\n").find((l) => l.startsWith("event: "));
          const dataLine = part.split("\n").find((l) => l.startsWith("data: "));
          if (!eventLine || !dataLine) continue;
          const event = eventLine.slice(7).trim();
          let data: { text?: string; result?: GeneratedBlog; message?: string };
          try { data = JSON.parse(dataLine.slice(6)); } catch { continue; }

          if (event === "chunk" && data.text) {
            setStreamText((prev) => prev + data.text);
            if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
          } else if (event === "done" && data.result) {
            setResult(data.result);
            setSingleStatus("done");
          } else if (event === "error") {
            setSingleError(data.message ?? "Generation failed");
            setSingleStatus("error");
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setSingleError(err instanceof Error ? err.message : "Generation failed");
      setSingleStatus("error");
    }
  }, [topic, category]);

  const publish = useCallback(async () => {
    if (!result) return;
    setSingleStatus("publishing");
    try {
      const res = await fetch("/api/manager/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result, featured, published: true }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error ?? `HTTP ${res.status}`); }
      const { blog } = await res.json();
      setPublishedSlug(blog.slug);
      setSingleStatus("published");
    } catch (err) {
      setSingleError(err instanceof Error ? err.message : "Publish failed");
      setSingleStatus("error");
    }
  }, [result, featured]);

  const resetSingle = () => {
    abortRef.current?.abort();
    setSingleStatus("idle");
    setStreamText("");
    setResult(null);
    setSingleError("");
    setPublishedSlug("");
    setTopic("");
  };

  const bulkSuccessCount = bulkStatuses.filter((s) => s.state === "done").length;
  const bulkErrorCount = bulkStatuses.filter((s) => s.state === "error").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/manager/blogs" className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Blog Writer</h1>
              <p className="text-sm text-gray-500">Powered by Groq — Llama 3.3 70B — Free</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-200">
              100 topics ready
            </span>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {(["single", "bulk"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${
                  mode === m
                    ? "border-[#1e3a8a] text-[#1e3a8a]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {m === "single" ? "Single Article" : "Bulk Generate (100 blogs)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── SINGLE MODE ── */}
        {mode === "single" && (
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">Article Topic</h2>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="E.g. How to hire a car in Kigali for gorilla trekking..."
                  rows={3}
                  disabled={singleStatus === "generating"}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 resize-none disabled:opacity-50"
                />
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={singleStatus === "generating"}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-[#1e3a8a] focus:outline-none disabled:opacity-50"
                  >
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <button
                  onClick={generate}
                  disabled={!topic.trim() || singleStatus === "generating"}
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#172554] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {singleStatus === "generating" ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Writing...</>
                  ) : "Generate Article"}
                </button>
              </div>

              {/* Topic Suggestions */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-1">Topic Ideas</h2>
                <p className="text-xs text-gray-500 mb-4">Click to auto-fill</p>
                <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
                  {ALL_TOPICS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setTopic(s.topic); setCategory(s.category); setSingleStatus("idle"); setResult(null); }}
                      className={`w-full text-left rounded-lg border px-3 py-2.5 text-xs transition-all hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5 ${topic === s.topic ? "border-[#1e3a8a] bg-[#1e3a8a]/5 text-[#1e3a8a] font-medium" : "border-gray-100 bg-gray-50 text-gray-700"}`}
                    >
                      {s.topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-5">
              {singleStatus === "idle" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-[#1e3a8a]/10 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#1e3a8a]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to write</h3>
                  <p className="text-sm text-gray-500 max-w-xs">Pick a topic or type your own, then hit Generate.</p>
                </div>
              )}

              {singleStatus === "generating" && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-orange-50">
                    <svg className="w-4 h-4 text-orange-600 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    <span className="text-sm font-semibold text-orange-700">Writing with Groq AI...</span>
                    <span className="ml-auto text-xs text-gray-400">{streamText.length} chars</span>
                  </div>
                  <div ref={streamRef} className="p-6 h-[520px] overflow-y-auto font-mono text-xs text-gray-600 leading-relaxed whitespace-pre-wrap bg-gray-50">
                    {streamText}
                    <span className="inline-block w-2 h-4 bg-orange-500 animate-pulse ml-0.5 align-middle" />
                  </div>
                </div>
              )}

              {singleStatus === "error" && (
                <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                  <p className="font-semibold text-red-700">Failed</p>
                  <p className="text-sm text-red-600 mt-1">{singleError}</p>
                  <button onClick={() => setSingleStatus("idle")} className="mt-3 text-sm font-medium text-red-700 underline">Try again</button>
                </div>
              )}

              {singleStatus === "published" && (
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                  <p className="font-bold text-blue-800">Published!</p>
                  <div className="flex gap-3 mt-3">
                    <a href={`/blog/${publishedSlug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-700 underline">View post</a>
                    <button onClick={resetSingle} className="text-sm font-semibold text-gray-600 underline">Write another</button>
                  </div>
                </div>
              )}

              {(singleStatus === "done" || singleStatus === "publishing") && result && (
                <>
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-blue-50">
                      <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-semibold text-blue-700">Article ready — review before publishing</span>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{result.title}</h2>
                        <p className="text-sm text-gray-400 mt-1 font-mono">/blog/{result.slug}</p>
                      </div>
                      <p className="text-sm text-gray-600">{result.excerpt}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">Meta Title</p>
                          <p className="text-sm text-gray-800">{result.metaTitle}</p>
                          <p className={`text-xs mt-1 ${result.metaTitle.length > 60 ? "text-red-500" : "text-blue-600"}`}>{result.metaTitle.length} chars</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">Category</p>
                          <p className="text-sm text-gray-800 capitalize">{result.category.replace("-", " ")}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">Meta Description</p>
                        <p className="text-sm text-gray-800">{result.metaDescription}</p>
                        <p className={`text-xs mt-1 ${result.metaDescription.length > 160 ? "text-red-500" : "text-blue-600"}`}>{result.metaDescription.length} chars</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.tags?.map((tag) => <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{tag}</span>)}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <div onClick={() => setFeatured((f) => !f)} className={`relative w-10 h-6 rounded-full transition-colors ${featured ? "bg-[#1e3a8a]" : "bg-gray-200"}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${featured ? "left-5" : "left-1"}`} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Featured</span>
                        </label>
                        <div className="flex gap-3">
                          <button onClick={resetSingle} className="text-sm text-gray-500 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300">Start over</button>
                          <button onClick={publish} disabled={singleStatus === "publishing"} className="flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#172554] disabled:opacity-70">
                            {singleStatus === "publishing" ? "Publishing..." : "Publish Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-700">Article Preview</h3></div>
                    <div
                      className="p-6 max-h-[500px] overflow-y-auto [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-5 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1 [&_li]:text-gray-700 [&_a]:text-[#1e3a8a] [&_a]:underline [&_strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: result.content }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── BULK MODE ── */}
        {mode === "bulk" && (
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left: Topic selector */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-gray-900">Select Topics</h2>
                  <span className="text-sm font-bold text-[#1e3a8a]">{selected.size} selected</span>
                </div>

                {/* Category filter */}
                <select
                  value={bulkFilter}
                  onChange={(e) => setBulkFilter(e.target.value)}
                  disabled={bulkRunning}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#1e3a8a] focus:outline-none mb-3 disabled:opacity-50"
                >
                  <option value="all">All Categories ({ALL_TOPICS.length} topics)</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label} ({ALL_TOPICS.filter((t) => t.category === c.value).length})
                    </option>
                  ))}
                </select>

                <div className="flex gap-2 mb-3">
                  <button onClick={selectAll} disabled={bulkRunning} className="flex-1 text-xs font-bold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg py-2 hover:bg-[#1e3a8a]/5 disabled:opacity-50">Select All</button>
                  <button onClick={selectNone} disabled={bulkRunning} className="flex-1 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg py-2 hover:bg-gray-50 disabled:opacity-50">Clear</button>
                </div>

                <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                  {filteredTopics.map((t, fi) => {
                    const globalIdx = ALL_TOPICS.indexOf(t);
                    const isSelected = selected.has(globalIdx);
                    const status = bulkStatuses[Array.from(selected).indexOf(globalIdx)];
                    return (
                      <button
                        key={globalIdx}
                        onClick={() => !bulkRunning && toggleSelect(globalIdx)}
                        disabled={bulkRunning}
                        className={`w-full text-left rounded-lg border px-3 py-2 text-xs transition-all flex items-center gap-2 ${isSelected ? "border-[#1e3a8a] bg-[#1e3a8a]/5" : "border-gray-100 bg-gray-50 hover:border-gray-200"} disabled:cursor-default`}
                      >
                        <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center ${isSelected ? "bg-[#1e3a8a] border-[#1e3a8a]" : "border-gray-300"}`}>
                          {isSelected && <svg className="w-2.5 h-2.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`flex-1 leading-snug ${isSelected ? "text-gray-900 font-medium" : "text-gray-600"}`}>{t.topic}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Start button */}
                <div className="mt-5 space-y-2">
                  {!bulkRunning ? (
                    <button
                      onClick={startBulk}
                      disabled={selected.size === 0}
                      className="w-full flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#172554] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Generate & Publish {selected.size} Articles
                    </button>
                  ) : (
                    <button
                      onClick={() => { stopRef.current = true; setBulkRunning(false); }}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-all"
                    >
                      Stop Generation
                    </button>
                  )}
                  {selected.size > 0 && !bulkRunning && (
                    <p className="text-center text-xs text-gray-400">
                      ~{Math.ceil(selected.size * DELAY_MS / 60000)} min to complete • auto-published
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Progress and live stream */}
            <div className="lg:col-span-3 space-y-5">

              {/* Progress bar */}
              {(bulkRunning || bulkStatuses.length > 0) && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-gray-900">
                      {bulkRunning ? `Generating... ${bulkDone}/${bulkTotal}` : `Completed ${bulkDone}/${bulkTotal}`}
                    </h3>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-blue-600 font-bold">{bulkSuccessCount} published</span>
                      {bulkErrorCount > 0 && <span className="text-red-500 font-bold">{bulkErrorCount} failed</span>}
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-[#1e3a8a] transition-all duration-500"
                      style={{ width: `${bulkTotal ? (bulkDone / bulkTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Live stream of current article */}
              {bulkRunning && currentStream && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 bg-orange-50">
                    <svg className="w-4 h-4 text-orange-600 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    <span className="text-sm font-semibold text-orange-700">Writing article {bulkDone + 1}...</span>
                  </div>
                  <div className="p-4 h-40 overflow-y-auto font-mono text-xs text-gray-500 whitespace-pre-wrap bg-gray-50">
                    {currentStream}
                  </div>
                </div>
              )}

              {/* Status list */}
              {bulkStatuses.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700">Article Status</h3>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                    {bulkStatuses.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 px-6 py-3">
                        <div className="flex-shrink-0">
                          {s.state === "pending" && <div className="w-5 h-5 rounded-full bg-gray-200" />}
                          {s.state === "generating" && <svg className="w-5 h-5 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                          {s.state === "publishing" && <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                          {s.state === "done" && <svg className="w-5 h-5 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                          {s.state === "error" && <svg className="w-5 h-5 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 truncate">{s.topic}</p>
                          {s.state === "error" && <p className="text-xs text-red-500 mt-0.5">{s.error}</p>}
                          {s.state === "done" && s.slug && (
                            <a href={`/blog/${s.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#1e3a8a] hover:underline">
                              /blog/{s.slug}
                            </a>
                          )}
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                          s.state === "done" ? "bg-blue-100 text-blue-700" :
                          s.state === "error" ? "bg-red-100 text-red-700" :
                          s.state === "generating" ? "bg-orange-100 text-orange-700" :
                          s.state === "publishing" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {s.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!bulkRunning && bulkStatuses.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-orange-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Select topics to bulk generate</h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Pick any or all 100 topics. Each article is written by AI, auto-published, with internal links and SEO metadata. Keep this tab open while it runs.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
