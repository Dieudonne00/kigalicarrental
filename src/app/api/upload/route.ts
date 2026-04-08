import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const originalName = file.name.replace(/\s/g, "-");
    const fileName = `${timestamp}-${randomString}-${originalName}`;
    
    // All images go to myimages folder
    const uploadDir = "myimages";
    const publicDir = path.join(process.cwd(), "public", uploadDir);
    
    // Create directory if it doesn't exist
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Full file path
    const filePath = path.join(publicDir, fileName);
    
    // Convert file to buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // Generate URL for the uploaded image
    const imageUrl = `/${uploadDir}/${fileName}`;
    
    return NextResponse.json(
      {
        url: imageUrl,
        fileName: fileName,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
