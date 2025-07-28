// src/pages/api/categories/[id].js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handle(req, res) {
  const categoryId = req.query.id;

  if (req.method === 'DELETE') {
    try {
      // Cek dulu apakah ada artikel yang menggunakan kategori ini
      const articlesUsingCategory = await prisma.article.count({
        where: { categoryId: parseInt(categoryId) },
      });

      if (articlesUsingCategory > 0) {
        return res.status(400).json({ message: 'Tidak dapat menghapus kategori karena masih digunakan oleh artikel.' });
      }

      const deletedCategory = await prisma.category.delete({
        where: { id: parseInt(categoryId) },
      });
      res.status(200).json(deletedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Gagal menghapus kategori', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}