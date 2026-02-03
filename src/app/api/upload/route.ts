import { NextResponse } from "next/server";

// ✅ REMOVED: export const runtime = "nodejs";
// ✅ Vercel automatically uses correct runtime

// ✅ Use environment variables - SAFER
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dxn12qcje",
  api_key: process.env.CLOUDINARY_API_KEY || "636422866527858",
  api_secret: process.env.CLOUDINARY_API_SECRET || "aT5qJbGJ5NZdL7mEVi27XLPveaA",
  secure: true,
});

export async function POST(request: Request) {
  try {
    // ✅ Check Cloudinary config
    console.log("Cloudinary config check:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dxn12qcje",
      has_api_key: !!process.env.CLOUDINARY_API_KEY,
      has_api_secret: !!process.env.CLOUDINARY_API_SECRET
    });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file" },
        { status: 400 }
      );
    }

    console.log("Uploading file:", file.name, "Size:", file.size, "Type:", file.type);

    // ✅ Convert file properly
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // ✅ IMPORTANT: Use correct MIME type for base64
    const base64String = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
    
    console.log("Base64 length:", base64String.length);

    // ✅ Upload with timeout
    const uploadPromise = cloudinary.uploader.upload(base64String, {
      folder: "cars",
      resource_type: "auto", // ✅ Changed from "image" to "auto"
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });

    // Set timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Upload timeout")), 30000)
    );

    const result = await Promise.race([uploadPromise, timeoutPromise]) as any;
    
    console.log("✅ Upload success:", {
      url: result.secure_url,
      public_id: result.public_id,
      bytes: result.bytes
    });

    // ✅ Verify the image exists
    const verify = await fetch(result.secure_url, { method: 'HEAD' });
    console.log("Image verification:", verify.status);

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height
    });

  } catch (error: any) {
    console.error("❌ UPLOAD ERROR:", error.message || error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Upload failed",
        error: error.toString()
      },
      { status: 500 }
    );
  }
}
