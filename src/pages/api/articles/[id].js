// src/pages/api/articles/[id].js (Versi Final yang Mempertahankan Semua Fitur)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const articleId = parseInt(id);

  if (req.method === 'GET') {
    try {
      const article = await prisma.article.findUnique({
        where: { id: articleId },
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
        },
      });
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(200).json(article);
    } catch (error) {
      console.error("API Error fetching article:", error);
      res.status(500).json({ message: 'Failed to fetch article', error: error.message });
    } finally {
      // FUNGSI DIKEMBALIKAN: Memastikan koneksi ditutup
      await prisma.$disconnect();
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, excerpt, content, categoryId, tags, status, thumbnail } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
      
      const updateData = { title, excerpt, content, tags, status };
       if (thumbnail) {
         updateData.thumbnail = thumbnail;
       }
       if (categoryId) {
         updateData.category = {
          connect: { id: parseInt(categoryId) }
         };
      }
      
      const updatedArticle = await prisma.article.update({
        where: { id: articleId },
        data: updateData,
      });

      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error("API Error updating article:", error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(500).json({ message: 'Failed to update article', error: error.message });
    } finally {
      // FUNGSI DIKEMBALIKAN: Memastikan koneksi ditutup
      await prisma.$disconnect();
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.article.delete({ where: { id: articleId } });
      res.status(204).end();
    } catch (error) {
      console.error("API Error deleting article:", error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(500).json({ message: 'Failed to delete article', error: error.message });
    } finally {
      // FUNGSI DIKEMBALIKAN: Memastikan koneksi ditutup
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}