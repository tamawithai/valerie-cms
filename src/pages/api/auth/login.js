// src/pages/api/auth/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Untuk membandingkan password

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Bandingkan password (pastikan password di database sudah di-hash saat dibuat)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Jika login berhasil, kirim data user (tanpa password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      // Di sini biasanya kita akan membuat dan mengirimkan token (JWT) atau session cookie
      // Untuk kesederhanaan sekarang, kita kirim data user langsung
      // DAN MENYIMPAN USER ID DI COOKIE (akan dibahas di langkah berikutnya)
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}