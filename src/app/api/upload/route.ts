
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

<<<<<<< HEAD
// Configure Cloudinary
=======
>>>>>>> 2629653 (Fix cloudinary dependency and email import)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxn12qcje',
  api_key: process.env.CLOUDINARY_API_KEY || '636422866527858',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ZyNMrPei3OH-U0eOxWSTvysypj0',
  secure: true
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("Upload request received for file:", file.name);

<<<<<<< HEAD
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert buffer to base64 for Cloudinary
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // Upload to Cloudinary
=======
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

>>>>>>> 2629653 (Fix cloudinary dependency and email import)
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String,
        {
          folder: "cars",
<<<<<<< HEAD
          public_id: filename.split('.')[0], // Remove extension
=======
          public_id: filename.split('.')[0],
>>>>>>> 2629653 (Fix cloudinary dependency and email import)
          resource_type: "auto",
          overwrite: false,
          unique_filename: true
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    console.log("Upload successful. Cloudinary URL:", uploadResult.secure_url);

    return NextResponse.json(
      { 
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
}
