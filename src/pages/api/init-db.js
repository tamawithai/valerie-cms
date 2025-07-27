// src/pages/api/init-db.js
import { initializeDatabase } from '../../lib/db';

export default async function handler(req, res) {
  // Hanya izinkan method POST dan tambahkan proteksi sederhana
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // TODO: Tambahkan autentikasi admin di sini untuk keamanan
  // Untuk sekarang, kita izinkan dari localhost saja
  const isLocalhost = req.headers.host?.includes('localhost');
  if (!isLocalhost) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    await initializeDatabase();
    res.status(200).json({ message: 'Database initialized successfully!' });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ message: 'Failed to initialize database', error: error.message });
  }
}