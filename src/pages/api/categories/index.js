// src/pages/api/categories/index.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === 'GET') {
    // Mengambil semua kategori
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
      });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil kategori', error: error.message });
    }
  } else if (req.method === 'POST') {
    // Membuat kategori baru
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Nama kategori wajib diisi.' });
      }
      const newCategory = await prisma.category.create({
        data: { name },
      });
      res.status(201).json(newCategory);
    } catch (error) {
       if (error.code === 'P2002') { // Kode error untuk unique constraint violation
        return res.status(409).json({ message: 'Kategori dengan nama tersebut sudah ada.' });
       }
      res.status(500).json({ message: 'Gagal membuat kategori', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}