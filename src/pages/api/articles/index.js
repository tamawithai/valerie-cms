// src/pages/api/articles/index.js (Versi Final yang Mempertahankan Semua Fitur)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany({
        include: {
          author: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(articles);
    } catch (error) {
      console.error("API Error fetching articles:", error);
      res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
    } finally {
      // FUNGSI DIKEMBALIKAN: Memastikan koneksi ditutup
      await prisma.$disconnect();
    }
  } else if (req.method === 'POST') {
    try {
      const articleData = req.body;

      // FUNGSI DIKEMBALIKAN: Validasi author diperbaiki & disesuaikan
      const authorId = articleData.author?.connect?.id;
      if (!articleData.title || !articleData.content || !authorId) {
        return res.status(400).json({ message: 'Title, content, and author are required.' });
      }

      const authorExists = await prisma.user.findUnique({
        where: { id: parseInt(authorId) },
      });

      if (!authorExists) {
        return res.status(400).json({ message: 'Invalid authorId' });
      }

      if (!authorId || !articleData.categoryId) {
        return res
          .status(400)
          .json({ message: "authorId dan categoryId wajib ada!" });
      }

      const newArticle = await prisma.article.create({
        data: {
          title: articleData.title,
          excerpt: articleData.excerpt,
          content: articleData.content,
          thumbnail: articleData.thumbnail,
          tags: articleData.tags,
          status: articleData.status,
          author: { connect: { id: Number(authorId) } },
          category: { connect: { id: Number(articleData.categoryId) } },
        },
      });

      res.status(201).json(newArticle);
    } catch (error) {
      console.error("API Error creating article:", error);
      res.status(500).json({ message: 'Failed to create article', error: error.message });
    } finally {
      // FUNGSI DIKEMBALIKAN: Memastikan koneksi ditutup
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}