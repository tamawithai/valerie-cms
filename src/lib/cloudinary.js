// src/lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary saat module di-load
if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Cloudinary credentials not found. Image upload will be disabled.');
}

/**
 * Upload gambar ke Cloudinary
 * @param {Buffer | string} fileBuffer - Buffer file atau path file
 * @param {string} publicId - Nama unik untuk file di Cloudinary (opsional)
 * @param {string} folder - Folder di Cloudinary (opsional)
 * @returns {Promise<Object>} Hasil upload dari Cloudinary
 */
export async function uploadImage(fileBuffer, publicId = null, folder = 'valerie_cms') {
  if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('Cloudinary is not configured. Please check environment variables.');
  }

  try {
    const uploadOptions = {
      folder,
      use_filename: true,
      unique_filename: !publicId,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(fileBuffer);
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
}

/**
 * Hapus gambar dari Cloudinary
 * @param {string} publicId - Public ID file di Cloudinary
 * @returns {Promise<Object>} Hasil penghapusan
 */
export async function deleteImage(publicId) {
  if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('Cloudinary is not configured.');
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
}