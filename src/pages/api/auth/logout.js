// src/pages/api/auth/logout.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Hapus cookie userId
    res.setHeader('Set-Cookie', 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error("Logout error:", error);
    // Tetap kirim respons sukses karena client juga akan menghapus cookie
    res.status(200).json({ message: 'Logged out (server error)' });
  }
}