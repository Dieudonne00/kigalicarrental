export const runtime = "nodejs";

import { NextResponse } from "next/server";

// Cloudinary's account was disabled ("cloud_name is disabled" on every
// upload call) - new images now go to our own self-hosted media-api
// service on the VPS (/var/www/media-api), which resizes/converts to
// WebP via sharp and serves the result from media.kigalicarhire.rw.
const MEDIA_API_URL = process.env.MEDIA_API_URL || "https://media.kigalicarhire.rw";
const MEDIA_SECRET = process.env.MEDIA_SECRET || "kch-media-2026";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const forwardData = new FormData();
    forwardData.append("file", file, file.name);

    const uploadResponse = await fetch(`${MEDIA_API_URL}/upload/image`, {
      method: "POST",
      headers: { "x-secret-key": MEDIA_SECRET },
      body: forwardData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("media-api upload failed:", uploadResponse.status, errorText);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const result = await uploadResponse.json();

    return NextResponse.json(
      { url: result.url, publicId: result.filename },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
