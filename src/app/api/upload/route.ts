export const runtime = "nodejs";
import { NextResponse } from "next/server";

const CPANEL_UPLOAD_URL = "https://carrentalinkigali.com/upload.php";
const CPANEL_SECRET_KEY = "aS7xJfu326";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64 and send as JSON — most reliable for server-to-server
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const response = await fetch(CPANEL_UPLOAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: CPANEL_SECRET_KEY,
        file: base64,
        name: file.name || "upload.jpg",
        type: file.type || "image/jpeg",
      }),
    });

    const rawText = await response.text();
    console.log("cPanel response status:", response.status);
    console.log("cPanel response body:", rawText);

    if (!response.ok) {
      throw new Error(`cPanel upload failed: ${response.status} - ${rawText}`);
    }

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error(`Invalid JSON from cPanel: ${rawText}`);
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
