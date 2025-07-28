import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'; // <-- Menggunakan Navbar yang benar
import Footer from '../../components/Footer'; // <-- Menggunakan Footer yang benar

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Data dummy untuk artikel detail (dengan tambahan gambar)
  const article = {
    id: id || 1,
    title: "Tips Memulai Usaha Kecil yang Sukses",
    content: `
      <p>Memulai usaha kecil memang membutuhkan perencanaan yang matang. Berikut beberapa tips yang bisa Anda terapkan agar usaha Anda tidak hanya bertahan, tetapi juga berkembang pesat di tengah persaingan.</p>
      
      <h3>1. Identifikasi Peluang Pasar</h3>
      <p>Cari tahu kebutuhan masyarakat di sekitar Anda yang belum terpenuhi. Peluang bisnis seringkali ada di hal-hal sederhana yang sering diabaikan. Lakukan riset kecil-kecilan untuk memvalidasi ide Anda.</p>
      
      <h3>2. Rencana Bisnis yang Jelas</h3>
      <p>Buat rencana bisnis sederhana yang mencakup target pasar, analisis kompetitor, strategi pemasaran, dan proyeksi keuangan. Dokumen ini akan menjadi peta jalan Anda.</p>
      
      <h3>3. Mulai dengan Modal Kecil</h3>
      <p>Jangan terlalu memaksakan diri dengan modal besar. Mulailah dengan skala kecil untuk menguji pasar dan model bisnis Anda. Tingkatkan secara bertahap seiring dengan pertumbuhan pendapatan.</p>
      
      <h3>4. Manfaatkan Teknologi</h3>
      <p>Gunakan media sosial, marketplace, dan platform digital lainnya untuk mempromosikan produk Anda. Sebuah website atau blog yang dikelola dengan baik menggunakan Valerie CMS bisa menjadi aset berharga untuk membangun kredibilitas.</p>
      
      <p>Dengan konsistensi, kemauan untuk belajar, dan kerja keras, usaha kecil Anda memiliki potensi besar untuk berkembang menjadi bisnis yang sukses. Semangat terus!</p>
    `,
    date: "15 Mei 2025",
    author: "Admin Valerie",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    tags: ["UKM", "Tips", "Bisnis"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  return (
    <div className="relative overflow-x-hidden">
      <Head>
        <title>{article.title} - Valerie CMS</title>
        <meta name="description" content="Artikel tentang tips memulai usaha kecil" />
      </Head>

      {/* Efek bola cahaya di latar belakang */}
      <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>

      <Navbar />

      <main className="pt-24">
        <section className="py-10 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors inline-block">
                  ← Kembali ke semua artikel
                </Link>
              </div>

              <div className="glass-card p-6 md:p-10">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                    {article.title}
                  </h1>
                  <div className="flex items-center text-gray-400">
                    <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full mr-3" />
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>
                </header>

                <img src={article.image} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-xl mb-8" />

                {/* Konten artikel dengan styling otomatis dari plugin 'prose' */}
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-h3:text-white"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <footer className="border-t border-white/10 mt-10 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                            {tag}
                            </span>
                        ))}
                    </div>
                </footer>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}