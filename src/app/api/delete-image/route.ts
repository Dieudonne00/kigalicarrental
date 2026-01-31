import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxn12qcje',
  api_key: process.env.CLOUDINARY_API_KEY || '636422866527858',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ZyNMrPei3OH-U0eOxWSTvysypj0',
  secure: true
});

export async function POST(request: Request) {
  try {
    const { imageUrl, publicId } = await request.json();

    // Option 1: If we have publicId (preferred)
    if (publicId) {
      console.log("Deleting file from Cloudinary using publicId:", publicId);
      
      const deleteResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.destroy(
          publicId,
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });

      console.log("Cloudinary delete result:", deleteResult);
      
      if (deleteResult.result === "ok") {
        return NextResponse.json(
          { message: "File deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to delete file from Cloudinary" },
          { status: 500 }
        );
      }
    }

    // Option 2: If we only have imageUrl, extract publicId
    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL or publicId provided" },
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

    // Extract public_id from Cloudinary URL
    // Example: https://res.cloudinary.com/dxn12qcje/image/upload/v1748892837/cars/1748892836256-filename.jpg
    // We need: cars/1748892836256-filename
    
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      
      // Find the index after "upload"
      const uploadIndex = pathParts.findIndex(part => part === 'upload');
      
      if (uploadIndex === -1) {
        throw new Error("Invalid Cloudinary URL");
      }
      
      // Get everything after "upload" but before any transformations
      // Skip version if present (v1748892837)
      const afterUpload = pathParts.slice(uploadIndex + 1);
      const publicIdParts = afterUpload.filter((part, index) => {
        // Skip version markers (v1234567890)
        if (index === 0 && part.startsWith('v') && /^v\d+$/.test(part)) {
          return false;
        }
        return true;
      });
      
      const extractedPublicId = publicIdParts.join('/').replace(/\.[^/.]+$/, ""); // Remove extension
      
      console.log("Extracted publicId from URL:", extractedPublicId);
      
      // Delete using extracted publicId
      const deleteResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.destroy(
          extractedPublicId,
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });

      console.log("Cloudinary delete result:", deleteResult);
      
      if (deleteResult.result === "ok") {
        return NextResponse.json(
          { message: "File deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to delete file from Cloudinary" },
          { status: 500 }
        );
      }
      
    } catch (parseError) {
      console.error("Error parsing URL:", parseError);
      return NextResponse.json(
        { error: "Invalid Cloudinary URL format" },
        { status: 400 }
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
