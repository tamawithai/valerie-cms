// src/pages/api/articles/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // --- GET: Mendapatkan daftar artikel ---
    try {
      const articles = await prisma.article.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json(articles);
    } catch (error) {
      console.error("API Error fetching articles:", error);
      res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
    } finally {
      await prisma.$disconnect();
    }

  } else if (req.method === 'POST') {
    // --- POST: Membuat artikel baru ---
    try {
      const { title, excerpt, content, authorId, categoryId, tags, status = 'Draft' } = req.body;

      // Validasi input dasar
      if (!title || !content || !authorId) {
        return res.status(400).json({ message: 'Title, content, and authorId are required' });
      }

      // Validasi authorId
      const authorExists = await prisma.user.findUnique({
        where: { id: parseInt(authorId) },
      });

      if (!authorExists) {
        return res.status(400).json({ message: 'Invalid authorId' });
      }

      const newArticle = await prisma.article.create({
        data: {
          title,
          excerpt,
          content,
          author: { // Relasi ke User
            connect: { id: parseInt(authorId) }
          },
          categoryId: categoryId ? parseInt(categoryId) : null,
          tags,
          status,
        },
      });

      res.status(201).json(newArticle); // 201 Created
    } catch (error) {
      console.error("API Error creating article:", error);
      res.status(500).json({ message: 'Failed to create article', error: error.message });
    } finally {
      await prisma.$disconnect();
    }

  } else {
    // Method tidak diizinkan
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}