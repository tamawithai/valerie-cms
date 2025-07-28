import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { articleId, status } = req.body;

  // Validasi input
  if (!articleId || !status) {
    return res.status(400).json({ message: 'articleId dan status wajib diisi.' });
  }

  if (!['Published', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid. Harus "Published" atau "Rejected".' });
  }

  try {
    const updatedArticle = await prisma.article.update({
      where: {
        id: parseInt(articleId, 10),
      },
      data: {
        status: status,
      },
    });

    return res.status(200).json(updatedArticle);

  } catch (error) {
    console.error("Error updating article status:", error);
    // Cek jika artikel tidak ditemukan
    if (error.code === 'P2025') {
      return res.status(404).json({ message: `Artikel dengan ID ${articleId} tidak ditemukan.` });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
}