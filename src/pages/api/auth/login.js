// src/pages/api/auth/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // JANGAN kirim password ke client
    const { password: _, ...userWithoutPassword } = user;

    // --- BAGIAN BARU: Mengatur Cookie ---
    // Untuk kesederhanaan, kita bisa menyimpan ID user di cookie.
    // Di produksi, sebaiknya gunakan token JWT yang aman dan signed.
    res.setHeader('Set-Cookie', `userId=${user.id}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`); // 1 hari

    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}