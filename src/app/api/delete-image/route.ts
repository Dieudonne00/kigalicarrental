import { NextResponse } from "next/server";

const MEDIA_API_URL = process.env.MEDIA_API_URL || "https://media.kigalicarhire.rw";
const MEDIA_SECRET = process.env.MEDIA_SECRET || "kch-media-2026";

export async function POST(request: Request) {
  try {
    const { imageUrl, publicId } = await request.json();

    let filename = publicId as string | undefined;

    // Older records may still store a full Cloudinary URL/publicId rather
    // than a media-api filename - only proceed with a real media-api
    // filename (ends in an image extension, no slashes), otherwise there's
    // nothing on our own host to delete.
    if (!filename && imageUrl) {
      const url = new URL(imageUrl);
      filename = url.pathname.split("/").pop();
    }

    if (!filename || filename.includes("/") || !/\.(webp|jpg|jpeg|png)$/i.test(filename)) {
      return NextResponse.json({ success: true, skipped: "not a media-api asset" });
    }

    const deleteResponse = await fetch(`${MEDIA_API_URL}/delete`, {
      method: "POST",
      headers: {
        "x-secret-key": MEDIA_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    });

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error("media-api delete failed:", deleteResponse.status, errorText);
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    const result = await deleteResponse.json();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
