import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handle(req, res) {
  // Hanya izinkan method GET dan POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Jika method adalah POST, simpan/update data
  if (req.method === 'POST') {
    try {
      const newContent = req.body;

      // Menggunakan upsert: update jika ada, buat baru jika tidak ada.
      // Sempurna untuk data yang hanya ada satu baris.
      const updatedContent = await prisma.landingPage.upsert({
        where: { id: 1 },
        update: { content: newContent },
        create: { id: 1, content: newContent },
      });

      return res.status(200).json({ message: 'Content updated successfully', data: updatedContent.content });
    } catch (error) {
      console.error("Error updating landing page content:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Jika method adalah GET, ambil data
  if (req.method === 'GET') {
    try {
      const landingPage = await prisma.landingPage.findFirst({
        where: { id: 1 },
      });

      if (landingPage) {
        // Jika data ada di DB, kirimkan
        return res.status(200).json(landingPage.content);
      } else {
        // Jika DB kosong (misalnya saat pertama kali dijalankan),
        // kirim struktur data default agar halaman admin tidak error.
        return res.status(200).json({
          hero: { title: "", description: "", buttonText: "", buttonLink: "", backgroundImage: "" },
          sliders: [],
          about: { title: "", content: "", image: "" },
          services: [],
          testimonials: [],
          contact: { title: "", description: "", email: "", phone: "", address: "" }
        });
      }
    } catch (error) {
      console.error("Error fetching landing page content:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}