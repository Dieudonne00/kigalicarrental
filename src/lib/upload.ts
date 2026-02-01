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
  return new Promise((resolve, reject) => {
    // Convert to Buffer first
    const buffer = Buffer.from(
      fileBuffer instanceof Buffer ? fileBuffer : new Uint8Array(fileBuffer as ArrayBuffer)
    );
    
    const base64String = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    
    cloudinary.uploader.upload(
      base64String,
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
