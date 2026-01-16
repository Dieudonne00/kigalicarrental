import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    // Skip if it's a blob URL
    if (imageUrl.startsWith("blob:")) {
      return NextResponse.json(
        { message: "Blob URL, nothing to delete" },
        { status: 200 }
      );
    }

    // Bunny CDN configuration
    const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE || "kigalicarhire";
    const BUNNY_API_KEY = process.env.BUNNY_API_KEY;

    if (!BUNNY_API_KEY) {
      console.error("Bunny CDN API key is not configured");
      return NextResponse.json(
        { error: "Bunny CDN API key not configured" },
        { status: 500 }
      );
    }

    // Extract the file path from the CDN URL
    // Example: https://kigalicarhire.b-cdn.net/cars/1763120042359-filename.jpg
    // We need: cars/1763120042359-filename.jpg
    const urlParts = imageUrl.split("/");
    const pathIndex = urlParts.findIndex((part: string) => part === "cars");

    if (pathIndex === -1) {
      console.error("Invalid image URL format:", imageUrl);
      return NextResponse.json(
        { error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    const filePath = urlParts.slice(pathIndex).join("/");
    const deleteUrl = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${filePath}`;

    console.log("Deleting file from Bunny CDN:", deleteUrl);

    const deleteResponse = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        AccessKey: BUNNY_API_KEY,
      },
    });

    if (deleteResponse.ok) {
      console.log("File deleted successfully from Bunny CDN");
      return NextResponse.json(
        { message: "File deleted successfully" },
        { status: 200 }
      );
    } else {
      const errorText = await deleteResponse.text();
      console.error("Bunny CDN delete failed:", errorText);
      return NextResponse.json(
        { error: `Failed to delete from Bunny CDN: ${deleteResponse.status}` },
        { status: deleteResponse.status }
      );
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete file" },
      { status: 500 }
    );
  }
}
