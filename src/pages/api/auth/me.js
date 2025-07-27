// src/pages/api/auth/me.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Hanya izinkan GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // --- BAGIAN BARU: Memverifikasi Cookie ---
  // Dapatkan userId dari cookie
  const userId = req.cookies.userId; // Ini memerlukan middleware cookie parser, yang sudah built-in di Next.js API Routes

  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // Cari user berdasarkan ID dari cookie
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      // Jika user dengan ID tersebut tidak ditemukan, kemungkinan cookie tidak valid
      res.setHeader('Set-Cookie', 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'); // Hapus cookie
      return res.status(401).json({ message: 'Invalid session' });
    }

    if (user.status !== 'Active') {
        return res.status(403).json({ message: 'Account is not active' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}