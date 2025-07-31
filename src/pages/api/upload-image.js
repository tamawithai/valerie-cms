// src/pages/api/upload-image.js

// Nonaktifkan bodyParser Next.js agar Formidable bisa parse multipart
export const config = {
  api: {
    bodyParser: false,
  },
};

import { IncomingForm } from 'formidable';
import fs from 'fs';
import { uploadImage } from '../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Buat instance Formidable
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Error parsing form', error: err.message });
    }

    // files.file bisa Array atau single File
    let file = files.file;
    if (Array.isArray(file)) file = file[0];

    // Dapatkan filepath (Formidable v2) atau path (Formidable v1)
    const filepath = file?.filepath || file?.path;
    if (!filepath) {
      console.error('Invalid file object:', file);
      return res.status(400).json({ message: 'No valid file path found' });
    }

    try {
      // Baca file sementara ke buffer
      const fileBuffer = fs.readFileSync(filepath);

      // Upload ke Cloudinary
      const result = await uploadImage(fileBuffer);

      // (Opsional) hapus file sementara
      // fs.unlinkSync(filepath);

      // Kembalikan URL & public_id
      return res.status(200).json({
        url:       result.url,
        public_id: result.public_id,
      });
    } catch (uploadErr) {
      console.error('Upload to Cloudinary failed:', uploadErr);
      return res.status(500).json({ message: 'Upload failed', error: uploadErr.message });
    }
  });
}
