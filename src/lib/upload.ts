import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxn12qcje',
  api_key: process.env.CLOUDINARY_API_KEY || '636422866527858',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ZyNMrPei3OH-U0eOxWSTvysypj0',
  secure: true,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer | ArrayBuffer,
  folder: string = 'cars'
): Promise<{ url: string; publicId: string }> {
  try {
    // Convert buffer to base64 string
    let buffer: Buffer;
    if (fileBuffer instanceof Buffer) {
      buffer = fileBuffer;
    } else {
      buffer = Buffer.from(fileBuffer);
    }
    
    const base64String = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String, // Pass base64 string instead of buffer
        { 
          folder, 
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          } else {
            reject(new Error('Upload failed: No result returned'));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error converting buffer to base64:', error);
    throw error;
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else if (result?.result === 'ok') resolve();
        else reject(new Error('Deletion failed'));
      }
    );
  });
}

