// src/pages/api/users/index.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Tambahkan ini

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // --- GET: Mendapatkan semua user ---
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("API Error fetching users:", error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }

  // --- POST: Membuat user baru ---
  } else if (req.method === 'POST') {
    try {
      const { name, email, password, role = 'Contributor', status = 'Active' } = req.body;

      // Validasi input dasar
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      // Validasi format email (opsional tapi bagus)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }

      // Cek apakah email sudah ada
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }

      // Hash password sebelum disimpan
      const saltRounds = 10; // Semakin tinggi, semakin aman tapi lambat
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Buat user baru
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword, // Simpan hash, bukan password asli
          role,
          status,
        },
        // Jangan kirim password kembali ke client
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        }
      });

      res.status(201).json(newUser); // 201 Created
    } catch (error) {
      console.error("API Error creating user:", error);
      res.status(500).json({ message: 'Failed to create user', error: error.message });
    } finally {
      await prisma.$disconnect();
    }

  } else {
    // Method tidak diizinkan
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}