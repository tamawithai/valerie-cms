// src/pages/api/articles/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  // Validasi ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid article ID' });
  }

  const articleId = parseInt(id);

  if (req.method === 'GET') {
    // --- GET: Mendapatkan satu artikel ---
    try {
      const article = await prisma.article.findUnique({
        where: { id: articleId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
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
      await prisma.$disconnect();
    }

  } else if (req.method === 'PUT') {
    // --- PUT: Memperbarui artikel ---
    try {
      const { title, excerpt, content, categoryId, tags, status } = req.body;

      // Validasi input dasar (bisa diperluas)
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const updatedArticle = await prisma.article.update({
        where: { id: articleId },
        data: {
          title,
          excerpt,
          content,
          categoryId: categoryId ? parseInt(categoryId) : null,
          tags,
          status,
          // updatedAt akan otomatis terupdate oleh Prisma karena @updatedAt
        },
      });

      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error("API Error updating article:", error);
      if (error.code === 'P2025') { // Record not found
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(500).json({ message: 'Failed to update article', error: error.message });
    } finally {
      await prisma.$disconnect();
    }

  } else if (req.method === 'DELETE') {
    // --- DELETE: Menghapus artikel ---
    try {
      await prisma.article.delete({
        where: { id: articleId },
      });
      res.status(204).end(); // No Content
    } catch (error) {
      console.error("API Error deleting article:", error);
      if (error.code === 'P2025') { // Record not found
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(500).json({ message: 'Failed to delete article', error: error.message });
    } finally {
      await prisma.$disconnect();
    }

  } else {
    // Method tidak diizinkan
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}