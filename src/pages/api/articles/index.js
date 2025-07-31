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

      // Ambil langsung authorId & categoryId dari body
     const {
       title,
       excerpt,
       content,
       thumbnail,
       tags,
       status,
       authorId,
       categoryId
     } = req.body;

      // FUNGSI DIKEMBALIKAN: Validasi author diperbaiki & disesuaikan
     if (!title || !content || !authorId) {
       return res.status(400).json({ message: 'Title, content, and author are required.' });
     }
     if (!categoryId) {
        return res.status(400).json({ message: 'Category is required.' });
     }

      const authorExists = await prisma.user.findUnique({
        where: { id: parseInt(authorId) },
      });

      if (!authorExists) {
        return res.status(400).json({ message: 'Invalid authorId' });
      }

          // (Opsional) validasi kategori
     const categoryExists = await prisma.category.findUnique({
       where: { id: parseInt(categoryId) },
    });
      if (!categoryExists) {
       return res.status(400).json({ message: 'Invalid categoryId' });
     }

          const newArticle = await prisma.article.create({
        data: {
          title,
          excerpt,
          content,
          thumbnail,
          tags,
          status,
          author:   { connect: { id: parseInt(authorId)   } },
          category: { connect: { id: parseInt(categoryId) } },
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