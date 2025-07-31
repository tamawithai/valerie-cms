// KODE DIMULAI
import nextConnect from 'next-connect';
import multer from 'multer';
import { uploadImage } from '../../lib/cloudinary';

// Konfigurasi multer (in-memory)
const upload = multer({ storage: multer.memoryStorage() });

// Helper untuk disable bodyParser default Next.js (agar file bisa diproses)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handler Next.js API dengan next-connect + multer
const handler = nextConnect();

// Middleware multer (field: 'file')
handler.use(upload.single('file'));

// POST handler
handler.post(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload ke Cloudinary (buffer)
    const cloudinaryRes = await uploadImage(req.file.buffer);

    res.status(200).json({ url: cloudinaryRes.url, public_id: cloudinaryRes.public_id });
  } catch (error) {
    console.error('Upload API error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default handler;
// KODE DI AKHIRI
