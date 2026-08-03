export const runtime = "nodejs";
import { NextResponse } from "next/server";

const MEDIA_BASE = "https://media.kigalicarhire.rw";
const MEDIA_SECRET = process.env.MEDIA_SECRET || "kch-media-2026";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isVideo = file.type.startsWith("video/");
    const endpoint = isVideo ? "/upload/video" : "/upload/image";

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const response = await fetch(`${MEDIA_BASE}${endpoint}`, {
      method: "POST",
      headers: { "x-secret-key": MEDIA_SECRET },
      body: uploadForm,
    });

    const rawText = await response.text();

    if (!response.ok) {
      throw new Error(`VPS upload failed: ${response.status} - ${rawText}`);
    }

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error(`Invalid JSON from VPS: ${rawText}`);
    }

    if (!result.url) {
      throw new Error(`No URL returned: ${rawText}`);
    }

    return NextResponse.json({ url: result.url, publicId: result.filename }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
