import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Bunny CDN configuration
    const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE || "kigalicarhire";
    const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
    const BUNNY_HOSTNAME = process.env.BUNNY_HOSTNAME || "kigalicarhire.b-cdn.net";

    console.log("Upload request received for file:", file.name);
    console.log("BUNNY_API_KEY exists:", !!BUNNY_API_KEY);
    console.log("BUNNY_STORAGE_ZONE:", BUNNY_STORAGE_ZONE);
    console.log("BUNNY_HOSTNAME:", BUNNY_HOSTNAME);

    if (!BUNNY_API_KEY) {
      console.error("Bunny CDN API key is not configured");
      return NextResponse.json(
        { error: "Bunny CDN API key not configured. Please add BUNNY_API_KEY to your .env file." },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const uploadPath = `cars/${filename}`;

    // Upload to Bunny CDN
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadUrl = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${uploadPath}`;

    console.log("Uploading to URL:", uploadUrl);

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_API_KEY,
        "Content-Type": file.type,
      },
      body: buffer,
    });

    console.log("Upload response status:", uploadResponse.status);

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Bunny CDN upload failed:", errorText);
      throw new Error(`Failed to upload to Bunny CDN: ${uploadResponse.status} - ${errorText}`);
    }

    // Return the CDN URL
    const cdnUrl = `https://${BUNNY_HOSTNAME}/${uploadPath}`;
    console.log("Upload successful. CDN URL:", cdnUrl);

    return NextResponse.json({ url: cdnUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
}
