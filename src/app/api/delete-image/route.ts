import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxn12qcje',
  api_key: process.env.CLOUDINARY_API_KEY || '636422866527858',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'aT5qJbGJ5NZdL7mEVi27XLPveaA',
});

export async function POST(request: Request) {
  try {
    const { imageUrl, publicId } = await request.json();

    if (publicId) {
      console.log("Deleting from Cloudinary:", publicId);
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image"
      });
      return NextResponse.json({ success: true, result });
    }

    if (imageUrl) {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const uploadIndex = pathParts.findIndex(p => p === 'upload');
      
      if (uploadIndex === -1) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
      }

      const afterUpload = pathParts.slice(uploadIndex + 1);
      const publicIdParts = afterUpload.filter((part, idx) => {
        if (idx === 0 && part.startsWith('v') && /^v\d+$/.test(part)) {
          return false;
        }
        return true;
      });

      const extractedId = publicIdParts.join('/').replace(/\.[^/.]+$/, "");
      console.log("Extracted ID:", extractedId);

      const result = await cloudinary.uploader.destroy(extractedId, {
        resource_type: "image"
      });
      return NextResponse.json({ success: true, result });
    }

    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
