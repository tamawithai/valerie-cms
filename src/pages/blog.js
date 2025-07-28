import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar'; // <-- Menggunakan Navbar yang benar
import Footer from '../../src/components/Footer'; // <-- Menggunakan Footer yang benar

export default function Blog() {
  // Data dummy dengan tambahan properti 'image'
  const articles = [
    {
      id: 1,
      title: "Tips Memulai Usaha Kecil",
      excerpt: "Panduan lengkap untuk memulai usaha kecil dengan modal minimal.",
      date: "15 Mei 2025",
      author: "Admin Valerie",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 2,
      title: "Strategi Pemasaran Digital untuk UKM",
      excerpt: "Cara efektif memasarkan produk UKM di era digital yang kompetitif.",
      date: "10 Mei 2025",
      author: "Admin Valerie",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 3,
      title: "Manajemen Keuangan Sederhana",
      excerpt: "Teknik dasar mengelola keuangan usaha kecil agar tetap sehat dan berkembang.",
      date: "5 Mei 2025",
      author: "Admin Valerie",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 4,
      title: "Membangun Brand yang Kuat",
      excerpt: "Langkah-langkah untuk membangun identitas brand yang menarik pelanggan.",
      date: "1 Mei 2025",
      author: "Contributor",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
  ];

  return (
    <div className="relative overflow-x-hidden">
      <Head>
        <title>Blog - Valerie CMS</title>
        <meta name="description" content="Artikel dan informasi untuk pengembangan UKM" />
      </Head>
      
      {/* Efek bola cahaya di latar belakang */}
      <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>

      <Navbar />

      <main className="pt-24">
        <section id="blog-list" className="py-20">
          <div className="container">
            <div className="text-center mb-16 slide-up">
              <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block">
                ← Kembali ke beranda
              </Link>
              <h1 className="section-title">Blog Valerie CMS</h1>
              <p className="section-subtitle">
                Kumpulan artikel, tips, dan wawasan untuk membantu pengembangan UKM Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <Link key={article.id} href={`/blog/${article.id}`} legacyBehavior>
                  <a className="block glass-card p-4 overflow-hidden glass-card-hover slide-up" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="relative mb-4">
                      <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div className="p-2">
                      <h3 className="text-xl font-bold text-white mb-2 leading-snug">{article.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{article.excerpt}</p>
                      <div className="border-t border-white/10 pt-3">
                        <p className="text-gray-400 text-xs">{article.date} • {article.author}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}