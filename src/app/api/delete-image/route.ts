export const runtime = "nodejs";
import { NextResponse } from "next/server";

const MEDIA_BASE = "https://media.kigalicarhire.rw";
const MEDIA_SECRET = process.env.MEDIA_SECRET || "kch-media-2026";

export async function POST(request: Request) {
  try {
    const { imageUrl, videoUrl } = await request.json();
    const url = imageUrl || videoUrl;

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    if (!url.includes("media.kigalicarhire.rw")) {
      console.log("Skipping delete for non-VPS URL:", url);
      return NextResponse.json({ success: true, skipped: true });
    }

    const isVideo = url.includes("/videos/");
    const filename = url.split("/").pop();

    if (!filename) {
      return NextResponse.json({ error: "Could not parse filename" }, { status: 400 });
    }

    const response = await fetch(`${MEDIA_BASE}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": MEDIA_SECRET,
      },
      body: JSON.stringify({ filename, type: isVideo ? "video" : "image" }),
    });

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: true, warning: "Delete failed silently" });
  }
}
