import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// 🔴 TEMP CONFIG – CHANGE LATER
cloudinary.config({
  cloud_name: "dxn12qcje",
  api_key: "636422866527858",
  api_secret: "aT5qJbGJ5NZdL7mEVi27XLPveaA",
  secure: true,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file → base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: "cars",
      resource_type: "image",
    });

    // ✅ RETURN WHAT FRONTEND NEEDS
    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url, // USE THIS TO DISPLAY
      publicId: result.public_id,  // USE THIS TO DELETE
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}

