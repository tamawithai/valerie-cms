// KODE DIMULAI
import nc from 'next-connect';
import multer from 'multer';
import { uploadImage } from '../../lib/cloudinary';

// Matikan bodyParser default agar multer bisa menangani multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Inisialisasi multer dengan penyimpanan in-memory
const upload = multer({ storage: multer.memoryStorage() });

// Buat handler dengan next-connect
const handler = nc();

// Middleware multer untuk field 'file'
handler.use(upload.single('file'));

// POST handler untuk upload-image
handler.post(async (req, res) => {
  // Debug: cek apakah Cloudinary env sudah terbaca
  console.log('⚙️ CLOUDINARY ENV:',
    'KEY?',    !!process.env.CLOUDINARY_API_KEY,
    'SECRET?', !!process.env.CLOUDINARY_API_SECRET,
    'CLOUD?',  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );
  // Debug: cek metadata file yang diterima
  console.log('📁 REQ.FILE meta:', {
    originalname: req.file?.originalname,
    mimetype:     req.file?.mimetype,
    size:         req.file?.size,
    bufferLen:    req.file?.buffer?.length
  });

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload ke Cloudinary menggunakan helper
    const cloudinaryRes = await uploadImage(req.file.buffer);

    // Kembalikan URL dan public_id
    return res.status(200).json({
      url:       cloudinaryRes.url,
      public_id: cloudinaryRes.public_id,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default handler;
// KODE DI AKHIRI
