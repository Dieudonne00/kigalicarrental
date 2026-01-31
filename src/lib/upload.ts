import { cloudinary } from './cloudinary';

// For server-side uploads (Buffer/FilePath)
export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder: string = 'uploads'
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileBuffer,
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result!.secure_url,
          publicId: result!.public_id
        });
      }
    );
  });
}

// Simple function to get Cloudinary URL
export function getCloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
}
